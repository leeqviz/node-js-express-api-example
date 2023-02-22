import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoder = jwt.verify(token, 'secret-word');
            req.userId = decoder.id;
            next();
        }
        catch (err) {
            return res.status(403).json({
                message: 'access denied'
            });
        }
    }
    else {
        return res.status(403).json({
            message: 'access denied'
        });
    }
}