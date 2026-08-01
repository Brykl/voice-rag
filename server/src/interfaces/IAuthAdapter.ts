export interface ITokenPayload {
    uid: string;
    email?: string;
    role?: string;
}

export interface IAuthAdapter {
  verifyToken(token: string): Promise<ITokenPayload | null>;
}