const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        return res.status(403).json({ error: 'Acesso negado. Token ausente.' });
    }

    try {
        jwt.verify(accessToken, "qRzU8sXwY5vF3tG7hB1nM");
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Acesso negado. Token inválido.' });
    }
};