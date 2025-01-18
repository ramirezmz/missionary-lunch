import jwt from 'jsonwebtoken';

export function generateToken(userId: string) {
  const runtimeConfig = useRuntimeConfig();
  return jwt.sign({ userId }, runtimeConfig.apiSecret.development.jwt_secret);
}

export function verifyToken(token: string) {
  const runtimeConfig = useRuntimeConfig();
  return jwt.verify(token, runtimeConfig.apiSecret.development.jwt_secret);
}