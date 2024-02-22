import { formatarMoeda } from "../utils/formatters.js";
import Conta from "../types/Conta.js";

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

//* Buscar os dados do Conta.ts e exibir na tela
const renderizarSaldo = (): void => {
  if (elementoSaldo != null) {
    elementoSaldo!.textContent = formatarMoeda(Conta.getSaldo());
  }
};

renderizarSaldo();

//* Objeto que vai ter um método para chamar a renderizarSaldo
const SaldoComponent = {
  atualizar() {
    renderizarSaldo();
  },
};

export default SaldoComponent;
