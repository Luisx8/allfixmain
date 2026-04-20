const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || 'ap-southeast-2_p7mounHZf',
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '61106lhm2fgpp3aqo2ighth8hd',
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_COGNITO_DOMAIN || 'ap-southeast-2p7mounhzf.auth.ap-southeast-2.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: [
            import.meta.env.VITE_COGNITO_REDIRECT_SIGN_IN || `${window.location.origin}/auth/callback`,
          ],
          redirectSignOut: [
            import.meta.env.VITE_COGNITO_REDIRECT_SIGN_OUT || window.location.origin,
          ],
          responseType: 'code',
        },
      },
    }
  }
};

export default awsConfig;
