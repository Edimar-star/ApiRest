import bcrypt from 'bcryptjs' //TODO: <--- 😎

//TODO: Encriptamos!!
export const encrypt = async (textPlain) => { //TODO: 123456
    return await bcrypt.hash(textPlain, 10) //0404o4ofoto4o
}

//TODO: Comparamos!!
export const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}