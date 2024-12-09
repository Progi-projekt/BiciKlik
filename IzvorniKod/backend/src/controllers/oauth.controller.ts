import { Request, Response } from 'express';
import { OAuthService } from '../services/oauth.service';

export class OAuthController {
  private oauthService: OAuthService;

  constructor() {
    this.oauthService = new OAuthService();
  }

  public googleCallback = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    try {
      const user = await this.oauthService.verifyGoogleToken(token);
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
}