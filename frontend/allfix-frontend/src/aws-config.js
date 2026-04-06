const awsConfig = {
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: 'XX-XXXX-X_abcd1234',
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
      // REQUIRED only if you use the identity pool
      // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: 'code',
    }
  }
};

export default awsConfig;
