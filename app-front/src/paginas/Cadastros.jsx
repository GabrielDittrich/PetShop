import "./Cadastros.css"

import axios from "axios";
import { useState, useEffect } from "react";

function Cadastros() {

    const [pessoa, setCliente] = useState(null);
    const [clientes, setClientes] = useState([]);

    function getClientes() {
        axios.get("http://localhost:5119/pessoas")
            .then((resposta) => {
                setClientes(resposta.data);
            });
    }

    useEffect(getClientes, []);


    function novoCliente() {
        setCliente(
            {
                nome: "",
                telefone: "",
                email: ""
            }
        );
    }

    function cancelar() {
        setCliente(null);
    }

    function refresh() {
        cancelar();
        getClientes();
    }

    function onChangeCliente(campo, valor, id) {
        pessoa[campo] = valor;
        setCliente({
            ...pessoa,
        });
    }

    function salvarCliente() {
        if (pessoa.id) {
            axios.put("http://localhost:5119/pessoas/" + pessoa.id, pessoa)
                .then(() => {
                    refresh();
                });
        } else {
            axios.post("http://localhost:5119/pessoas", pessoa)
                .then(() => {
                    refresh();
                });
        }
    }


    function getFormulario() {
        return (
            <form>
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome"
                    value={pessoa.nome}
                    onChange={(e) => {
                        onChangeCliente(e.target.name, e.target.value, pessoa.id);
                    }}
                />
                <label for="telefone">Telefone</label>
                <input type="text" id="telefone" name="telefone"
                    value={pessoa.telefone}
                    onChange={(e) => {
                        onChangeCliente(e.target.name, e.target.value, pessoa.id);
                    }}
                />
                <label for="email">E-mail</label>
                <input type="text" id="email" name="email"
                    value={pessoa.email}
                    onChange={(e) => {
                        onChangeCliente(e.target.name, e.target.value, pessoa.id);
                    }}
                />
                <button onClick={() => { cancelar(); }}>Cancelar</button>
                <button onClick={() => { salvarCliente(); }} >Salvar</button>
            </form>
        );
    }

    function excluirCliente(id) {
        axios.delete("http://localhost:5119/pessoas/" + id).then(
            () => {
                getClientes();
            }
        );
    }

    function editarCliente(pessoa) {
        setCliente(pessoa);
    }


    function getLinha(pessoa) {
        return (
            <tr>
                <td>{pessoa.id}</td>
                <td>{pessoa.nome}</td>
                <td>{pessoa.telefone}</td>
                <td>{pessoa.email}</td>
                <td>
                    <button onClick={
                        () => {
                            excluirCliente(pessoa.id);
                        }
                    }>Excluir</button>
                    <button onClick={() => { editarCliente(pessoa); }}>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhas() {
        const linhasDaTabela = [];
        for (let i = 0; i < clientes.length; i++) {
            const cliente = clientes[i];
            linhasDaTabela[i] = getLinha(cliente);
        }
        return linhasDaTabela;
    }

    function getTabela() {
        return (
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
                {getLinhas()}
            </table>
        );
    }




    function getConteudo() {
        if (pessoa == null) {
            return (
                <>
                    <button onClick={() => { novoCliente(); }}>Novo</button>
                    {getTabela()}
                </>
            );

        } else {
            return getFormulario();
        }
    }

    return (
        <div>
            <h1>Cadastro de clientes</h1>
            {getConteudo()}
        </div>

    );
}

export default Cadastros;
