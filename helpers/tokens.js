import jwt from "jsonwebtoken"
import dotenv from 'dotenv' 
dotenv.config({path: '.env'});



export const idGenera = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

export const JWTGenera = (info)=> 
    jwt.sign(
        {
            id:info.user_id,
            nombre:info.email,
        },
        process.env.SC_JWT,{
        expiresIn:'1d'
    })
export default {
    idGenera, JWTGenera
}