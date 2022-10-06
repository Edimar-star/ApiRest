import bcryptjs from 'bcryptjs'

export const encryptKey = async (key) => {
    return await bcryptjs.hash(key, process.env.KEY_SALTOS)
}

export const compareKey = async (key, pass) => {
    return await bcryptjs.compare(key, pass)
}