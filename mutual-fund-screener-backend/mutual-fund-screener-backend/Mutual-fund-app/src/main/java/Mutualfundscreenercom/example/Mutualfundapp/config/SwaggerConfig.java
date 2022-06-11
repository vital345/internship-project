package Mutualfundscreenercom.example.Mutualfundapp.config;

//import org.assertj.core.internal.Predicates;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.function.Predicate;

import static springfox.documentation.builders.PathSelectors.*;

@Configuration
@EnableSwagger2
//@ConfigurationProperties("app.api")
//@ConditionalOnProperty(name="app.api.swagger.enable", havingValue = "true", matchIfMissing = false)
public class SwaggerConfig {
    private String version;
    private String title;
    private String description;
    private String basePackage;
    private String contactName;
    private String contactEmail;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo()).select().apis(Predicate.not(RequestHandlerSelectors.basePackage("org.springframework.boot"))).build();
//                .select()
//                .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.any())
//                .paths(Predicate.not(PathSelectors.regex("/error.*")))
//                .build()
//                .directModelSubstitute(LocalDate.class, Date.class)
//                .directModelSubstitute(LocalDateTime.class, java.util.Date.class)
//                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(title)
                .description(description)
                .version(version)
                .contact(new Contact(contactName, null, contactEmail))
                .build();
    }
}
