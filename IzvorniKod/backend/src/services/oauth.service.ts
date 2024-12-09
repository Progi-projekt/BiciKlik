import { AppUser } from '../models/appuser.model';
import { OAuth2Client } from 'google-auth-library';

export class OAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
  }

  public async verifyGoogleToken(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token');
    }

    console.log('Payload:', payload); // Log the payload for debugging

    const { email, name, sub: oauthId } = payload;

    if (!email) {
      throw new Error('Email not found in token payload');
    }

    return this.findOrCreateUser(email, name || '', 'google', oauthId);
  }

  private async findOrCreateUser(email: string, name: string, oauthProvider: string, oauthId: string) {
    let user = await AppUser.findOne({ where: { email } });
    if (!user) {
      user = await AppUser.create({ email, name, oauthProvider, oauthId });
    }
    return user;
  }
}