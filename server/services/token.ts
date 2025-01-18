import jwt from 'jsonwebtoken';

export function generateToken(userId: string) {
  const runtimeConfig = useRuntimeConfig();
  return jwt.sign({ userId }, runtimeConfig.apiSecret.development.jwt_secret);
}