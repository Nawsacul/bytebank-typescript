import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;

elementoFormulario.addEventListener("submit", (event) => {
  try {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
      alert("Por favor, preencha todos os campos da transação!");
      return;
    }

    //* Coleta de dados do formulário
    const inputTipoTransacao = elementoFormulario.querySelector(
      "#tipoTransacao"
    ) as HTMLSelectElement;
    const inputValor = elementoFormulario.querySelector(
      "#valor"
    ) as HTMLInputElement;
    const inputData = elementoFormulario.querySelector(
      "#data"
    ) as HTMLInputElement;

    let tipoTransacao: TipoTransacao =
      inputTipoTransacao.value as TipoTransacao; // A string vinda no tipoTransacao precisa ser um das definidas no TipoTransacao
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value + " 00:00:00");

    //* Montar o objeto transação para representar a nova transação
    const novaTransacao: Transacao = {
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
  } catch (e) {
    alert(e.message);
  }
});
