// src/utils/googleAuth.ts
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''; // Lấy từ Google Console
const client = new OAuth2Client(CLIENT_ID);

export const verifyGoogleToken = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload; // chứa email, name, picture, sub (Google ID)
};
