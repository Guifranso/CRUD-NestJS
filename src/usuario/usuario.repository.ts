import { Injectable } from "@nestjs/common"
import { ValidatorConstraint } from "class-validator"

export class UsuarioRepository {

    private usuarios = []

    async buscar() {
        return this.usuarios
    }
    
    async salvar(usuario) {
        this.usuarios.push(usuario)
        console.log(this.usuarios);        
    }

    async existeEmail(email: string) {
        const usuarioExistente = this.usuarios.find(usuario => usuario.email === email)
        return usuarioExistente !== undefined
    }
}

function validatorConstraint(): (target: typeof UsuarioRepository) => void | typeof UsuarioRepository {
    throw new Error("Function not implemented.")
}
