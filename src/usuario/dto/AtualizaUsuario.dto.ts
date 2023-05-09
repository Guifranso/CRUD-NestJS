import { Injectable, Optional } from "@nestjs/common"
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { EmailUnico } from "../validacao/emailUnico.validator"

@Injectable()
export class AtualizaUsuarioDTO {

    @IsOptional()
    @IsNotEmpty({message: "O nome não pode ser vazio"})
    nome: string

    @IsOptional()
    @IsEmail(undefined, {message: "O email é inválido"})
    @EmailUnico({message: "Email já existe"})
    email: string
    
    @IsOptional()
    @MinLength(6, {message: "A senha precisa ter pelo menos 6 caracteres"})
    senha: string
}