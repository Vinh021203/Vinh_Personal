import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export const createToken = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(secret);
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, secret);
  return payload;
};
