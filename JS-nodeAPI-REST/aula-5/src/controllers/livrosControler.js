import livros from "../models/Livro.js";

class LivroController {

    static buscarLivro = (req, res) => {
        const { id } = req.params;

        livros.findById(id)
            .populate('autor', 'nome')
            .populate('editora')
            .exec((err, livro) => {
            if(!err){
                res.status(200).send(livro)
            } else {
                res.status(400).send(err)
            }
        })
    }

    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .populate('editora')
            .exec((err, livros) => {
                res.status(200).json(livros)
            })       
    }

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body)

        livro.save((err) => {
            if(err){
                res.status(500).send({message: ` ${err.message} Falha ao cadastrar livro`})
            } else {
                res.status(201).send(livro.toJSON())
            }
        })

    }

    static atualizarLivro = (req, res) => {
        const { id } = req.params;

        livros.findByIdAndUpdate(id, {$set: req.body}, err => {
            if(!err) {
                res.status(200).send({message: 'Livro atualizado com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} Erro de atualização`})
            }
        })
    }

    static deletarLivro = (req, res) => {
        const { id } = req.params

        livros.findByIdAndDelete(id, err => {
            if(err) {
                res.status(500).send(err.message)
            } else {
                res.status(200).send({message: 'Livro excluido com sucesso'})
            }
        })
    }

}

export default LivroController;