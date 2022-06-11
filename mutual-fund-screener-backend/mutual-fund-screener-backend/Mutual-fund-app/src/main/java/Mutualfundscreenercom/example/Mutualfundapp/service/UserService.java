package Mutualfundscreenercom.example.Mutualfundapp.service;

import Mutualfundscreenercom.example.Mutualfundapp.entities.MutualFund;
import Mutualfundscreenercom.example.Mutualfundapp.entities.Roles;
import Mutualfundscreenercom.example.Mutualfundapp.entities.Users;
import Mutualfundscreenercom.example.Mutualfundapp.extrabody.*;
import Mutualfundscreenercom.example.Mutualfundapp.repository.MutualFundRepository;
import Mutualfundscreenercom.example.Mutualfundapp.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import javax.mail.MessagingException;
import java.util.*;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    @Lazy
    private BCryptPasswordEncoder bcryptEncoder;
    @Autowired
    private RoleService roleService;

    @Autowired
    private MutualFundRepository mutualFundRepository;

    @Autowired
    private ErrorResponse errorResponse;

    @Autowired
    private LoggedInUserDeatils loggedInUserDeatils;

    @Autowired
    private EmailService emailService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        if (!user.getIs_active()) {
            throw new UsernameNotFoundException("User is not activated!");
        }
        return new User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(Users user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }

    private List<Users> addToListIfUserActive(List<Users> list) {
        List<Users> result = new ArrayList<>();
        for (Users user : list) {
            if (user.getIs_active()) {
                result.add(user);
            }
        }
        return result;
    }

    //get all the users altogether on admin dashboard
    @CacheEvict(value = "Get-all-users",key="'AllUsersCache'",beforeInvocation = true)
    @Cacheable(value="Get-all-users",key="'AllUsersCache'")
    public List<Users> findAll() {
        List<Users> list = new ArrayList<>();
        userRepository.findAll().iterator().forEachRemaining(list::add);
        return addToListIfUserActive(list);
    }

    public ResponseEntity<?> findOne(String userEmail) {
        Users user = userRepository.findByEmail(userEmail);
        if (!user.getIs_active()) {
            return ResponseEntity.status(404).body("user is deleted!");
        }
        return ResponseEntity.ok().body(user);
    }

    public ResponseEntity<?> saveUserService(UserExtraBody user) throws MessagingException {

        if (user.getUsername() == null || user.getUsername().length() <= 0) {
            return ResponseEntity.status(401).body("username is empty!");
        }

        if (user.getEmail() == null || user.getEmail().length() <= 0) {
            return ResponseEntity.status(401).body("Email is empty!");
        }

        if (user.getPassword() == null || user.getPassword().length() <= 0) {
            return ResponseEntity.status(401).body("password is empty!");
        }

        if(userRepository.existsByUsername(user.getUsername())) {
            Users newUser = userRepository.findByUsername(user.getUsername());
            newUser.setIs_active(true);
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
            sendConfirmEmailService(user.getUsername());
            return ResponseEntity.ok().body(userRepository.save(newUser));
        }

        Users nUser = user.getUserFromExtraBody();
        nUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        Roles role = roleService.findByName("USER");
        Set<Roles> roleSet = new HashSet<>();
        roleSet.add(role);
        nUser.setRoles(roleSet);
        userRepository.save(nUser);
        sendConfirmEmailService(nUser.getUsername());
        return ResponseEntity.ok().body("Email has been sent");
    }

    public ResponseEntity<?> verifyEmailService(UserExtraBody user) {
        if (user == null) {
            return ResponseEntity.status(401).body("bad request!");
        }
        Users userFromDB = userRepository.findByEmail(user.getEmail());
        if (Objects.equals(userFromDB.getPassword(), bcryptEncoder.encode(user.getPassword()))) {
            userFromDB.setIs_active(true);
            userRepository.save(userFromDB);
            return ResponseEntity.ok().body("Account Activated!");
        } else {
            return ResponseEntity.status(401).body(new UnSuccessfull("Bad credentials!"));
        }
    }

    public ResponseEntity<?> deleteAccountService(Long userId) {
        Optional<Users> users = userRepository.findById(userId);
        if (users.isEmpty()) {
            return ResponseEntity.status(404).body("User does not exist!");
        }
        Users fetched = users.get();
        fetched.setIs_active(false);
        userRepository.save(fetched);
        return ResponseEntity.ok().body("Deleted the user!");
    }

    public ResponseEntity<?> addMutualFundToWatchList(Long userId, Long mutualFundId) {


        if (!userRepository.existsById(userId) || !mutualFundRepository.existsById(mutualFundId)) {
            return ResponseEntity.status(404).body("cannot add non existing mutual or user");
        }

        Users users = userRepository.getById(userId);
        MutualFund mutualFund = mutualFundRepository.getById(mutualFundId);

        Set<MutualFund> mutualFunds = new HashSet<>(users.getMutualFundWatchList());
        mutualFunds.add(mutualFund);
        users.getMutualFundWatchList().clear();
        users.setMutualFundWatchList(mutualFunds);
        userRepository.save(users);
        return ResponseEntity.ok().body(userRepository.getById(userId));
    }

    public ResponseEntity<?> removeMutualFunFromUser(Long mutualFundId, Long userId, String token) {
        if (!Objects.equals(("Bearer" + loggedInUserDeatils.getToken()), token)) {
            return ResponseEntity.status(401).body("The Jwt token is not yours!");
        }

        if (!Objects.equals(loggedInUserDeatils.getUserId(), userId)) {
            return ResponseEntity.status(401).body("you cannot remove other users watchlist!");
        }

        Users users = userRepository.getById(userId);
        MutualFund mutualFund = mutualFundRepository.getById(mutualFundId);
        if (!userRepository.existsById(userId) || !mutualFundRepository.existsById(mutualFundId)) {
            return ResponseEntity.status(404).body("cannot add non existing mutual fund or user!");
        }
        Set<MutualFund> mutualFunds = new HashSet<>(users.getMutualFundWatchList());
        users.getMutualFundWatchList().clear();
        mutualFunds.remove(mutualFund);

        users.setMutualFundWatchList(mutualFunds);
        userRepository.save(users);
        return ResponseEntity.ok().body(userRepository.getById(userId));
    }

    public ResponseEntity<?> resetPasswordService(ResetPassword resetPassword) throws MessagingException {
        if(!userRepository.existsByUsername(resetPassword.getUserName())) {
            return ResponseEntity.status(404).body("No such user! try signing up!");
        }

        Users user = userRepository.findByUsername(resetPassword.getUserName());
        user.setResetPasswordToken(resetPassword.getToken());
        userRepository.save(user);
        if(!Objects.equals(user.getEmail(), resetPassword.getUserEmail())) {
            return ResponseEntity.status(401).body("email provided does not match!");
        }

        // TODO: change url to deployed one.
        final String url = "https://mutual-fund-screener-frontend-urtjok3rza-wl.a.run.app/reset-password/" + user.getResetPasswordToken();
        final String message = "This is from mutual fund screener\n"
                + "Click the link below to reset your password!\n" + url;

        final String subject = "This is to reset your password!";
        emailService.sendEmailService(user.getUsername(), message, false, subject);

        return ResponseEntity.ok().body("email has been sent!");
    }


    public ResponseEntity<?> sendConfirmEmailService(String username) throws MessagingException {
        if(!userRepository.existsByUsername(username)){
            return ResponseEntity.status(404).body("No such user is present try signing up!");
        }
        Users users=userRepository.findByUsername(username);
        if(users.getEmail()==null){
            return ResponseEntity.status(404).body("No such email address is exist!");
        }
        final String url="https://mutual-fund-screener-frontend-urtjok3rza-wl.a.run.app/confirm-email/"+users.getUsername();
        final String message="This is from mutual fund screener\n"+
                "click the link below to confirm your address\n"+url;
        final String subject="This is to confirm email address";

        emailService.sendEmailService(users.getUsername(), message, true, subject);
        return ResponseEntity.ok().body("email has been sent!");
    }

    public ResponseEntity<?> setEmailConfirmSerivce(String userName){
        Users user=userRepository.findByUsername(userName);
        user.setEmailConfirmed(true);
        userRepository.save(user);
        return ResponseEntity.ok().body("email confirmed");
    }

    public ResponseEntity<?> saveNewPassword(String token,String newPassword){
        Users users = userRepository.findByResetPasswordToken(token);
        users.setPassword(bcryptEncoder.encode(newPassword));
        users.setResetPasswordToken(null);
        userRepository.save(users);
        System.out.println(newPassword);
        return ResponseEntity.ok().body("password updated!");
    }


}
