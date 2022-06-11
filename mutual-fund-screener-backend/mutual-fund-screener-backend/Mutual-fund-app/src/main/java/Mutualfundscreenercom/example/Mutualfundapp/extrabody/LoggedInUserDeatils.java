package Mutualfundscreenercom.example.Mutualfundapp.extrabody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Component
public class LoggedInUserDeatils {
    private  Long userId;
    private  String token;


}
