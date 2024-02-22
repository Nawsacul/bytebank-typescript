import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarData } from "../utils/formatters.js";
const elementoDataAcesso = document.querySelector(".block-saldo time");
const renderizarData = () => {
    if (elementoDataAcesso != null) {
        elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
    }
};
renderizarData();
