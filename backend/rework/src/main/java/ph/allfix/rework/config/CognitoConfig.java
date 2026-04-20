package ph.allfix.rework.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.lambda.LambdaClient;

/**
 * AWS Cognito client configuration.
 */
@Configuration
public class CognitoConfig {

    @Value("${cognito.region}")
    private String cognitoRegion;

    @Value("${AWS_ACCESS_KEY_ID:}")
    private String awsAccessKeyId;

    @Value("${AWS_SECRET_ACCESS_KEY:}")
    private String awsSecretAccessKey;

    @Value("${AWS_SESSION_TOKEN:}")
    private String awsSessionToken;

    @Bean
    public CognitoIdentityProviderClient cognitoIdentityProviderClient() {
        return CognitoIdentityProviderClient.builder()
            .region(Region.of(cognitoRegion))
            .credentialsProvider(resolveCredentialsProvider())
            .build();
    }

    @Bean
    public LambdaClient lambdaClient() {
        return LambdaClient.builder()
            .region(Region.of(cognitoRegion))
            .credentialsProvider(resolveCredentialsProvider())
            .build();
    }

    private AwsCredentialsProvider resolveCredentialsProvider() {
        if (awsAccessKeyId != null && !awsAccessKeyId.isBlank()
            && awsSecretAccessKey != null && !awsSecretAccessKey.isBlank()) {

            if (awsSessionToken != null && !awsSessionToken.isBlank()) {
                return StaticCredentialsProvider.create(
                    AwsSessionCredentials.create(
                        awsAccessKeyId.trim(),
                        awsSecretAccessKey.trim(),
                        awsSessionToken.trim()
                    )
                );
            }

            return StaticCredentialsProvider.create(
                AwsBasicCredentials.create(awsAccessKeyId.trim(), awsSecretAccessKey.trim())
            );
        }

        return DefaultCredentialsProvider.create();
    }
}