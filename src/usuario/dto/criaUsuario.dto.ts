import { Injectable } from "@nestjs/common"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { EmailUnico } from "../validacao/emailUnico.validator"

@Injectable()
export class CriaUsuarioDTO {

    @IsNotEmpty({message: "O nome não pode ser vazio"})
    nome: string

    @IsEmail(undefined, {message: "O email é inválido"})
    @EmailUnico({message: "Email já existe"})
    email: string
    
    @MinLength(6, {message: "A senha precisa ter pelo menos 6 caracteres"})
    senha: string
}