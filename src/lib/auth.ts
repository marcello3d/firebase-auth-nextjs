import Auth from 'firebase-auth-lite';

export const auth =
  typeof window !== 'undefined'
    ? new Auth({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        redirectUri: `${location.protocol}//${location.host}/auth/callback`,
      })
    : undefined;
type NumericTimestampMillis = number;
type StringTimestampSec = string;
type StringTimestampMillis = string;
type IsoDate = string;

export type User = {
  localId: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  passwordHash?: string;
  emailVerified: boolean;
  passwordUpdatedAt?: NumericTimestampMillis;
  providerUserInfo: {
    providerId: string;
    federatedId: string;
    photoUrl?: string;
    email?: string;
    rawId: string;
  }[];
  validSince: StringTimestampSec;
  lastLoginAt: StringTimestampMillis;
  createdAt: StringTimestampMillis;
  emailLinkSignin?: boolean;
  lastRefreshAt: IsoDate;
  tokenManager: {
    idToken: string;
    refreshToken: string;
    expiresAt?: NumericTimestampMillis;
    kind?: string;
    localId?: string;
    email?: string;
    displayName?: '';
    registered?: true;
    expiresIn?: '3600';
  };
};
