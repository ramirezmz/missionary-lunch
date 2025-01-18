import bcrypt from 'bcrypt'

export async function hashedPassword(password: string) {
  const hashed = await bcrypt.hash(password, 10)
  return hashed
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword)
}