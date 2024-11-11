import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProps {
  onSuccess: (credentialResponse: any) => void;
  onError: () => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onSuccess, onError }) => {
  const clientId: string = "Your_Google_Client_ID";

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