package Mutualfundscreenercom.example.Mutualfundapp.service;

import Mutualfundscreenercom.example.Mutualfundapp.entities.Users;
import Mutualfundscreenercom.example.Mutualfundapp.repository.UserRepository;
import org.hibernate.pretty.MessageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;


    public void sendEmailService(String userName,String message,Boolean confirm,String subject) throws MessagingException {

        if(!userRepository.existsByUsername(userName)){
            ResponseEntity.status(404).body("no user found! try signing up with the new user");
            return;
        }
        Users user = userRepository.findByUsername(userName);
        if(!user.getIs_active()){
            ResponseEntity.status(404).body("no user found! try signing up with the new user");
            return;
        }
        if(!confirm && !user.getEmailConfirmed()){
            ResponseEntity.status(404).body("try confrming the the user email address by clicking on the giving link sent to you!");
        }
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);
        mimeMessageHelper.setFrom("tushananyvital@gmail.com");
        mimeMessageHelper.setTo(user.getEmail());
        mimeMessageHelper.setText(message);
        mimeMessageHelper.setSubject(subject);
        javaMailSender.send(mimeMessage);
        ResponseEntity.ok().body("email has been sent to the user!");


    }
}
