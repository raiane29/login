import Users from "../model/usersModel.js";
import bcrypt from 'bcrypt'

export const createUser = (request, response) => {

    const {username, email, password} = request.body

    try {
        Users.create({
            username,
            email,
            password
        })
        response.status(201).json("Usuário cadastrado com sucesso!")
    } catch (error) {
        response.status(400).json("Não foi possível cadastrar o usuário!")
    }
}

export const loginUser = async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await Users.findOne({ where: {email}})
        if(!user){
            return response.status(404).json("O usuário não foi encontrado!")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return response.status(400).json("A senha está incorreta!")
        }

        response.status(200).json("Login realizado com sucesso!")
    } catch (error) {
        response.status(500).json(error)
    }
}