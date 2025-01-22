const jwt = require('jsonwebtoken');
const CIFRADO_LLAVE = process.env.JWT_SECRET || 'llavedecifradolacualessecreta'; // Usa variables de entorno para mayor seguridad

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('Se necesita autenticación. No se encontró el encabezado Authorization.');
        error.statusCode = 401; // Unauthorized
        return next(error);
    }

    const token = authHeader.split(' ')[1]; // Suponiendo formato "Bearer <token>"
    if (!token) {
        const error = new Error('Formato de token inválido. Se esperaba "Bearer <token>".');
        error.statusCode = 401; // Unauthorized
        return next(error);
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, CIFRADO_LLAVE);
    } catch (err) {
        err.message = 'Error al verificar el token.';
        err.statusCode = 401; // Unauthorized
        return next(err);
    }

    if (!decodedToken) {
        const error = new Error('Autenticación fallida. El token no es válido o ha expirado.');
        error.statusCode = 401; // Unauthorized
        return next(error);
    }

    // Asigna los datos decodificados del token al objeto req
    req.idUsuario = decodedToken.idUsuario;
    req.isAdmin = decodedToken.isAdmin;

    // Continúa al siguiente middleware o ruta
    next();
};
