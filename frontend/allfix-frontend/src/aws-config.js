const awsConfig = {
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: 'ap-southeast-2_p7mounHZf',
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: '7lv1c4r14gnr5he18r9vg70veg',
      // REQUIRED only if you use the identity pool
      // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: 'code',
    }
  }
};

export default awsConfig;
