import { Request, Response } from 'express';
import { findOrCreateUser } from '../services/oauth.service';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

export const googleCallback = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }

    console.log('Payload:', payload); // Log the payload for debugging

    const { email, name, sub: oauthId } = payload;

    if (!email) {
      res.status(400).json({ message: 'Email not found in token payload' });
      return;
    }

    const user = await findOrCreateUser(email, name || '', 'google', oauthId);
    req.session.loggedInAs = user.email;
    res.cookie('loggedInAs', user.email, { httpOnly: true });
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during Google OAuth callback:', error); // Log the error for debugging

    if (error instanceof Error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    } else {
      res.status(500).json({ message: 'Login failed', error: 'Unknown error' });
    }
  }
};