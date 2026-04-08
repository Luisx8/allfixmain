const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || 'ap-southeast-2_p7mounHZf',
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '61106lhm2fgpp3aqo2ighth8hd',
      signUpVerificationMethod: 'code',
    }
  }
};

export default awsConfig;
