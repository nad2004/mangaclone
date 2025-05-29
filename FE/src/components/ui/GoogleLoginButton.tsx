// GoogleLoginButton.tsx
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
interface GooglePayload {
  email: string;
  name: string;
  picture: string;
  sub: string; // googleId
}

const GoogleLoginButton = () => {
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => {
    setClientReady(true);
  }, []);
  const navigate = useNavigate();
  const handleSuccess = async ({ credential }: CredentialResponse) => {
    if (!credential) return;

    const { sub, email, name, picture } = jwtDecode<GooglePayload>(credential);

    try {
      const res = await axios.post(
        'http://localhost:8080/api/users/google-login',
        { googleId: sub, email, name, avatar: picture, credential }, // gửi luôn credential để BE verify
        { withCredentials: true },
      );
      if (res.data.error) {
        console.log(res.data.error);
        return;
      }
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login with Google successful!');
      navigate('/');
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  return <>
  {clientReady && (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error('Login fail')}
    />
  )}</>;
};

export default GoogleLoginButton;
