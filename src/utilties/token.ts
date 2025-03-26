import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const generateToken = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const SECRET_KEY = process.env.JWT_SECRET; // Usa variables de entorno
if (!SECRET_KEY) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno.');
}
export const generateTokenInvitation = (
  email: string,
  rol: string,
  inquilinoId: string,
) => {
  return jwt.sign({ email, rol, inquilinoId }, SECRET_KEY, {
    expiresIn: '1d',
  }); // Token válido por 1 día
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // Retorna null si el token es inválido o expiró
  }
};
