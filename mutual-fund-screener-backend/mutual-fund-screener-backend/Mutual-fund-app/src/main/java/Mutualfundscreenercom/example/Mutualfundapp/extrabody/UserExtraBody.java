package Mutualfundscreenercom.example.Mutualfundapp.extrabody;

import Mutualfundscreenercom.example.Mutualfundapp.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class UserExtraBody {
    private String username;
    private String password;
    private String email;
    private String verification_code;
    private String createdAt;

    public Users getUserFromExtraBody(){
        Users user = new Users();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setCreatedAt(createdAt);
        return user;
    }
}
