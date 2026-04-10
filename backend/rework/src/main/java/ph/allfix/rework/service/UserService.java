package ph.allfix.rework.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ph.allfix.rework.entity.User;
import ph.allfix.rework.repository.UserRepository;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminAddUserToGroupRequest;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CognitoIdentityProviderClient cognitoClient;

    @Value("${cognito.user.pool.id}")
    private String userPoolId;

    public UserService(UserRepository userRepository, 
                       @Value("${aws.access.key.id}") String accessKey,
                       @Value("${aws.secret.access.key}") String secretKey,
                       @Value("${aws.region}") String regionStr) {
        this.userRepository = userRepository;
        
        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        this.cognitoClient = CognitoIdentityProviderClient.builder()
                .region(Region.of(regionStr))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();
    }

    public User registerCustomer(String email) {
        // 1. Add user to "customer" group in AWS Cognito
        try {
            AdminAddUserToGroupRequest request = AdminAddUserToGroupRequest.builder()
                    .userPoolId(userPoolId)
                    .username(email)
                    .groupName("customers") // Ensure this group exists in Cognito
                    .build();
            cognitoClient.adminAddUserToGroup(request);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to add user to Cognito group. User might not be confirmed or group 'customers' might not exist.");
            // Decide if we should throw or just continue to save to DB anyway
        }

        // 2. Save user in Supabase PostgreSQL database
        if (userRepository.findByEmail(email).isPresent()) {
           return userRepository.findByEmail(email).get(); // User already exists
        }

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setRole("customer");
        return userRepository.save(newUser);
    }
}
