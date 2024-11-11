// src/controllers/authController.ts
import { Request, Response } from 'express';
import { findOrCreateUser } from '../services/oauth.service';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, name, oauthProvider, oauthId } = req.body;

  try {
    const user = await findOrCreateUser(email, name, oauthProvider, oauthId);
    req.session.loggedInAs = user.email;
    res.cookie('loggedInAs', user.email, { httpOnly: true });
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy((err: Error) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('loggedInAs');
    res.json({ message: 'Logout successful' });
  });
};