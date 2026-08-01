import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../../serviceAccountKey.json" with { type: 'json' };
import type { IAuthAdapter, ITokenPayload } from "../interfaces/IAuthAdapter.ts";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
});

export const authFirebase = getAuth();



export class FirebaseAuthAdapter implements IAuthAdapter {
    async verifyToken(token: string): Promise<ITokenPayload | null> {
        try {
            const decodedToken = await authFirebase.verifyIdToken(token);
            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                role: decodedToken.role as string | undefined
            };
        } catch (error) {
            console.error('Error verifying token:', error);
            return null;
        }
    }
}