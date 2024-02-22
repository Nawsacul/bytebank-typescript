import { TipoTransacao } from "./TipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) || [];
const erroModificarValor = (tipo) => {
    throw new Error(`O valor a ser ${tipo} deve ser maior que zero!`);
};
const debitar = (valor) => {
    if (valor <= 0) {
        erroModificarValor("debitado");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
};
const depositar = (valor) => {
    if (valor <= 0) {
        erroModificarValor("depositado");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
};
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(transacoes); //comando novo que copia, um deepclone, de toda a estrutura do objeto. Isso é feito para evitar manipulações por scripts externos e que a transacoes originais não seja modificada.
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: [],
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    },
    getResumoTransacoes() {
        const listaTransacoes = structuredClone(transacoes);
        const resumo = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0,
        };
        for (let transacao of listaTransacoes) {
            if (transacao.tipoTransacao == TipoTransacao.DEPOSITO) {
                resumo.totalDepositos += transacao.valor;
            }
            else if (transacao.tipoTransacao == TipoTransacao.TRANSFERENCIA) {
                resumo.totalTransferencias += transacao.valor;
            }
            else if (transacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
                resumo.totalPagamentosBoleto += transacao.valor;
            }
        }
        return resumo;
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
            novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    },
};
Conta.getResumoTransacoes();
export default Conta;
