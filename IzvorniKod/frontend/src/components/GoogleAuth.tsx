import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProps {
  onSuccess: (credentialResponse: any) => void;
  onError: () => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onSuccess, onError }) => {
  const clientId: string = '275750400697-9tccn9u34elddsla5gaf6j4f2m2opher.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
