import jwt from 'jsonwebtoken' //TODO : 😎

export const tokenSign = async (user) => { //TODO: Genera Token
    return jwt.sign(
        {
            _id: user.id, //TODO: <---
            role: user.rol
        }, //TODO: Payload ! Carga útil
        process.env.JWT_SECRET, //TODO ENV 
        {
            expiresIn: "2h", //TODO tiempo de vida
        }
    );
}

export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

export const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}