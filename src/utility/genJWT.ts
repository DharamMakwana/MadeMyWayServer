import jwt, { SignOptions, VerifyErrors, JwtPayload } from "jsonwebtoken"

const JWT_SECRET = "OKOIjkdmfekr83495rijfdkfls'OFRKEOFKml,drbhfjgeryi"

export const generateJWT = (
  payload: JwtPayload,
  options?: SignOptions
): string => {
  try {
    const token = jwt.sign(payload, JWT_SECRET as string, options)
    return token
  } catch (error) {
    throw new Error(`Error generating JWT: ${(error as Error).message}`)
  }
}

export const verifyJWT = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    return decoded
  } catch (error) {
    throw new Error(`Error verifying JWT: ${(error as VerifyErrors).message}`)
  }
}
