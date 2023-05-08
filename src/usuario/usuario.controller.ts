import { Body, Controller, Head, Post, Get } from "@nestjs/common"
import { UsuarioRepository } from "./usuario.repository"
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto"

@Controller('/usuarios')
export class UsuarioController {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) {
        
    }

    @Get()
    async buscaUsuarios() {
        return this.usuarioRepository.buscar()
    }

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) { 
        this.usuarioRepository.salvar(dadosDoUsuario)
        return dadosDoUsuario
    }
    
}