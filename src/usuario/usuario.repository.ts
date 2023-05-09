import { UsuarioEntity } from "./usuario.entity"

export class UsuarioRepository {

    private usuarios: Array<UsuarioEntity> = []

    async buscar() {
        return this.usuarios
    }
    
    private buscaPorId(id: string) {
        const usuario = this.usuarios.find(usuario => usuario.id === id)

        if(!usuario) throw new Error("Usuário não encontrado")

        return usuario
    }

    async atualizar(id: string, dadosUsuario: Partial<UsuarioEntity>) {
        
        const usuarioParaAtualizar = this.buscaPorId(id)

        if(!usuarioParaAtualizar) throw new Error("Usuário não encontrado")

        Object.entries(dadosUsuario).forEach(([chave, valor]) => {
            if(chave === "id") return

            usuarioParaAtualizar[chave] = valor   
        })

        return usuarioParaAtualizar
    }

    async salvar(usuario : UsuarioEntity) {
        this.usuarios.push(usuario)
        console.log(this.usuarios);        
    }

    async deletar(id: string) {
        const usuarioParaDeletar = this.buscaPorId(id)

        if(!usuarioParaDeletar) throw new Error("Usuário não encontrado")
        
        const index = this.usuarios.indexOf(usuarioParaDeletar)
        this.usuarios.splice(index, 1)

        return usuarioParaDeletar
    }

    async existeEmail(email: string) {
        const usuarioExistente = this.usuarios.find(usuario => usuario.email === email)
        return usuarioExistente !== undefined
    }
}

function validatorConstraint(): (target: typeof UsuarioRepository) => void | typeof UsuarioRepository {
    throw new Error("Function not implemented.")
}
