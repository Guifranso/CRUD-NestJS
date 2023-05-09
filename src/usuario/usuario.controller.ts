import { Body, Controller, Head, Post, Get, Put, Param, Delete } from "@nestjs/common"
import { UsuarioRepository } from "./usuario.repository"
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto"
import { UsuarioEntity } from "./usuario.entity"
import { v4 as uuid } from "uuid"
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto"
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto"

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Get()
    async buscaUsuarios() {
        const usuarios = await this.usuarioRepository.buscar()
        const usuariosLista = usuarios.map(usuario => new ListaUsuarioDTO(
            usuario.id, 
            usuario.nome
        ))

        return usuariosLista
    }

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) { 
        // Validação ocorre antes dos dados chegarem até aqui
        const usuarioEntity = new UsuarioEntity()

        usuarioEntity.id = uuid()
        usuarioEntity.nome = dadosDoUsuario.nome
        usuarioEntity.email = dadosDoUsuario.email
        usuarioEntity.senha = dadosDoUsuario.senha

        this.usuarioRepository.salvar(usuarioEntity)
        return new ListaUsuarioDTO(
            usuarioEntity.id, 
            usuarioEntity.nome
        )
    }

    @Put("/:id")
    async atualizaUsuario(@Param("id") id: string, @Body() dadosUsuario: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualizar(id, dadosUsuario)

        return {
            usuario: usuarioAtualizado,
            message: "usuário atualizado com sucesso"
        }
    }

    @Delete("/:id")
    async removeUsuario(@Param("id") id: string) {
        const usuarioDeletado = await this.usuarioRepository.deletar(id)

        return {
            message: "Usuário deletado com sucesso",
            usuario: usuarioDeletado
        }
    }
    
}