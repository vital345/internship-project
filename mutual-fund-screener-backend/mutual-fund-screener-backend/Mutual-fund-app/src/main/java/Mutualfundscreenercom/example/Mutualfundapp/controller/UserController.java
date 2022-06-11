package Mutualfundscreenercom.example.Mutualfundapp.controller;

import Mutualfundscreenercom.example.Mutualfundapp.config.TokenProvider;
import Mutualfundscreenercom.example.Mutualfundapp.entities.Users;
import Mutualfundscreenercom.example.Mutualfundapp.extrabody.*;
import Mutualfundscreenercom.example.Mutualfundapp.repository.UserRepository;
import Mutualfundscreenercom.example.Mutualfundapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping("/mutual-fund")
@CrossOrigin(origins = "https://mutual-fund-screener-frontend-urtjok3rza-wl.a.run.app/", maxAge = 36000)
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ReturnUserDetails returnUserDetails;

    @RequestMapping(value = "/log-in", method = RequestMethod.POST)
    public ResponseEntity<?> generateTokenController(@RequestBody LoginUser loginUser) throws AuthenticationException {
        System.out.println(loginUser);
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenProvider.generateToken(authentication);
        System.out.println(token);
        LoginResponse loginResponse = new LoginResponse();
//        loginResponse.setJwtToken(token);
        Users users = userRepository.findByUsername(loginUser.getUsername());
        
        if (!users.getIs_active()) {
            return ResponseEntity.status(404).body("No user found!");
        }

        if (!users.getEmailConfirmed()) {
            return ResponseEntity.status(401).body("Confirm your email before logging in!");
        }

        returnUserDetails.setId(users.getId());
        returnUserDetails.setUserName(users.getUsername());
        returnUserDetails.setEmail(users.getEmail());
        returnUserDetails.setWishList(List.copyOf(users.getMutualFundWatchList()));
        returnUserDetails.setIsActive(users.getIs_active());
        returnUserDetails.setToken(token);
        returnUserDetails.setRoles(List.copyOf(users.getRoles()));

        loginResponse.setReturnUserDetails(returnUserDetails);
        System.out.println(returnUserDetails);
        return ResponseEntity.ok(loginResponse);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUserController(@RequestBody UserExtraBody user) throws MessagingException {
        return userService.saveUserService(user);
    }


    @RequestMapping(value = "/activate-account/", method = RequestMethod.PUT)
    public ResponseEntity<?> activateUserController(@RequestBody UserExtraBody user) {
        return userService.verifyEmailService(user);
    }

//     @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/user/{userId}/add-mutualFund-to-watchlist/{mutualFundId}", method = RequestMethod.POST)
    public ResponseEntity<?> addMutualFundToUserWishList(@PathVariable("mutualFundId") Long mutualFundId, @PathVariable("userId") Long userId) {
        return userService.addMutualFundToWatchList(userId, mutualFundId);
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/remove-mutual-fund/{userId}/from-user/{mutualFundId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> removeMutualFundFromUserWishList(@PathVariable("mutualFundId") Long mutualFundId, @PathVariable("userId") Long userId,@RequestHeader("Authorization") String token) {
        return userService.removeMutualFunFromUser(mutualFundId, userId, token);
    }


    @RequestMapping(value = "/update-password/{token}",method=RequestMethod.PUT)
    public ResponseEntity<?> updatePassword(@PathVariable("token") String token,@RequestBody NewPassword newPassword){
        return userService.saveNewPassword(token, newPassword.getNewPassword());
    }
    //post mehtod we will be using
    @RequestMapping(value = "/forgot-password/", method = RequestMethod.POST)
    public ResponseEntity<?> resetPasswordController(@RequestBody ResetPassword resetPassword) throws MessagingException {
        return userService.resetPasswordService(resetPassword);
    }

    //put method we are using
    @RequestMapping(value ="/set-confirm-email/{userName}",method = RequestMethod.PUT)
    public ResponseEntity<?> setConfirmationEmail(@PathVariable("userName") String userName){
        return userService.setEmailConfirmSerivce(userName);
    }

}
