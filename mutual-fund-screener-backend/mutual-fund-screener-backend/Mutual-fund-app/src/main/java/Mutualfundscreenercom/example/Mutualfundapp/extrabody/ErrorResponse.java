package Mutualfundscreenercom.example.Mutualfundapp.extrabody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Data
@Component
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ErrorResponse {
    private String error;
}
