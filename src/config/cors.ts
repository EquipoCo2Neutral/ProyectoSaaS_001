import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = [process.env.FRONTEND_URL];

    // Permite peticiones sin origen (Postman, servidores internos)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Bloqueado por CORS: ${origin}`);
      callback(null, false); // No lanza error, solo bloquea la petición
    }
  },
  credentials: true,
};
