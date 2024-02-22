import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", (event) => {
    try {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }
        //* Coleta de dados do formulário
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
        const inputValor = elementoFormulario.querySelector("#valor");
        const inputData = elementoFormulario.querySelector("#data");
        let tipoTransacao = inputTipoTransacao.value; // A string vinda no tipoTransacao precisa ser um das definidas no TipoTransacao
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + " 00:00:00");
        //* Montar o objeto transação para representar a nova transação
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        //* Chamar o modulo conta importado do módulo Conta.js chamando o método registrarTransacao
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        Conta.getResumoTransacoes();
        elementoFormulario.reset();
    }
    catch (e) {
        alert(e.message);
    }
});
