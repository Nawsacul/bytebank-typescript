### Migrando de JavaScript para TypeScript

#### Situação: Acessando Elementos HTML

- **Problema no JavaScript:**
  - Acesso a elementos HTML sem verificação de erros em tempo de desenvolvimento. Erros somente são identificados em tempo de execução.
  - Exemplo:
    ```javascript
    let saldo = 3000;
    const elementoSaldo = document.querySelector(".saldo-valor .valor");
    elementoSaldo.textContent = saldo;
    ```

- **Migração para TypeScript:**
  - TypeScript aponta erros de tipagem e possíveis valores nulos que não são capturados pelo JavaScript em tempo de desenvolvimento.
  - Problemas identificados:
    1. `elementoSaldo` pode ser `null`.
    2. Atribuição de um tipo `Number` a um tipo esperado `String`.

- **Soluções:**
  - **Para o problema de valor nulo:**
    1. Usar `as HTMLElement` para assegurar que o elemento não é nulo.
    2. Verificar se `elementoSaldo` existe antes de acessar suas propriedades.
    3. Utilizar `!` para forçar a não nulidade (analogia com `!important` do CSS).
  - **Para a questão de tipos:**
    - Converter `saldo` para `String` usando `.toString()`.

  ```typescript
  let saldo = 3000;
  const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
  if (elementoSaldo) {
    elementoSaldo.textContent = saldo.toString();
  }
  ```

#### Transpilação de TypeScript para JavaScript

- **Comando básico:**
  - `tsc nomedoarquivo.ts`: Transpila o arquivo TypeScript para JavaScript.

- **Estruturação de Pastas:**
  - `dist`: Contém arquivos para produção (CSS, JS, imagens).
  - `src`: Contém arquivos em desenvolvimento (ex.: `bytebank.ts`).

- **Configuração Automática (tsconfig.json):**
  - Define opções como versão do ECMAScript, diretório de saída e inclusão de arquivos TypeScript.
  - Comando para transpilação automática: `tsc -w`.

#### Boas Práticas de Tipagem no TypeScript

- **Tipagem Explícita:**
  - Sempre declare o tipo da variável.
  - Evite o uso de `any`, exceto quando necessário, pois ele reintroduz a flexibilidade do JavaScript, podendo levar a erros.

- **Exemplos:**
  ```typescript
  let valor: number = 3000;
  let nome: string = "Lucas";
  let isPago: boolean = false;
  let qualquer: any = "inicial";
  qualquer = true; // Permitido com 'any'
  ```

- **Arrays e Tipos Personalizados:**
  - Uso de `number[]` para arrays de números.
  - `Type Alias` para definir tipos personalizados.

- **Enums:**
  - Facilitam a legibilidade do código ao substituir valores constantes por nomes significativos.
  - Boa prática: Nomear Enums com letra inicial maiúscula.

#### Organização de Arquivos em Projetos

- **Exemplo de Aplicação: Site de Controle de Transações**
  - `nova-transacao-component.ts`: Controle de novas transações.
  - `saldo-component.ts`: Controle do saldo.

### Modularização no TypeScript

#### Uso de Arquivos Separados para Tipos e Enums

- **Boa Prática:** Para cada tipo (`type`) ou enumeração (`enum`), criar um arquivo específico. Isso melhora a organização do código e facilita a manutenção.

- **Exemplo com `Transacao.ts`:**
  ```typescript
  type Transacao = {
      tipoTransacao: TipoTransacao;
      valor: number;
      data: Date;
  }
  ```
- **Exemplo com `TipoTransacao.ts`:**
  ```typescript
  enum TipoTransacao {
    DEPOSITO = "Depósito",
    TRANSFERENCIA = "Transferência",
    PAGAMENTO_BOLETO = "Pagamento de Boleto",
  }
  ```

#### Importação de Enums e Adaptação de Tipos

- **Ajuste de Tipos:** Ao receber uma string e precisar convertê-la para um enum, é importante garantir que o valor atribuído esteja dentre os valores possíveis do enum.

- **Exemplo de Conversão:**
  ```typescript
  let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
  ```

### Formatação de Moeda e Data

#### Utilização de Funções de Formatação

- **Arquivo `formatters.ts`:** Centraliza as funções de formatação, como moeda e data, promovendo reuso e simplificando ajustes futuros.

- **Formatação de Moeda:**
  ```typescript
  const formatarMoeda = (valor: number): string => {
      return valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
      });
  };
  ```

- **Formatação de Data:**
  ```typescript
  const formatarData = (data: Date, formato: FormatoData = FormatoData.PADRAO): string => {
      // Implementação com condicionais para diferentes formatos
  };
  ```

- **Composição de Formatações:**
  ```typescript
  const formatarInformacoes = (valor: number, data: Date, formatoData: FormatoData): string => {
      const dataFormatada = formatarData(data, formatoData);
      const valorFormatado = formatarMoeda(valor);
      return `${dataFormatada} - ${valorFormatado}`;
  };
  ```

#### Tipos Personalizados para Formatação

- Considerar a criação de um `enum` ou `type` para diferentes formatos de data, facilitando a extensibilidade e leitura do código.

### Módulos ES6

- **Simplificação de Importações:** Utilizar um arquivo principal (`main.js`) como ponto de entrada dos módulos, indicando no HTML através do atributo `type="module"`.

- **Exemplo de Uso em HTML:**
  ```html
  <script type="module" src="js/main.js"></script>
  ```

- **Vantagens:**
  - Facilita a organização do código em módulos independentes.
  - Promove a encapsulação de funcionalidades.
  - Permite carregamento assíncrono e dependências claras entre os arquivos.

### Complementos

- **Testes de Tipagem:** Realizar testes para garantir que as conversões de tipos, principalmente de string para enums, estejam corretas.
- **Validação de Dados:** Implementar verificações de dados nas funções de formatação para evitar erros em runtime.

### Estruturação de Projeto e Gerenciamento de Estados com TypeScript

#### Separação de Responsabilidades

- **Módulo "Conta"**:
  - Centraliza as informações relacionadas à conta do usuário, como saldo, registro de transações e histórico.
  - É fundamental para a manutenção do estado da aplicação e interação com o `localStorage` para persistência dos dados.

- **Componentes**:
  - **Nova Transação**: Responsável por coletar dados do formulário e repassar ao módulo "Conta".
  - **Saldo**: Exibe informações de saldo e data de acesso, acessando os dados através do módulo "Conta".

#### Implementação do Módulo "Conta"

- **Funcionalidades**:
  - Gerenciamento de saldo com validação para depósitos e saques.
  - Registro e agrupamento de transações por data.
  - Formatação e exibição de resumos de transações.

- **Código de Exemplo**:
  ```typescript
  // Importações relevantes
  import { Transacao } from "./Transacao.js";
  
  let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
  // Demais implementações...
  
  const Conta = {
    // Métodos para gerenciamento de saldo, transações, etc.
  };

  export default Conta;
  ```

#### Armazenamento Local e Modularização

- **localStorage**:
  - Utilizado para persistir informações como saldo e transações.
  - Importante para manter o estado da aplicação entre sessões.

- **Modularização**:
  - Divisão do código em módulos específicos para facilitar a manutenção e o desenvolvimento.
  - Uso de `import`/`export` para organizar dependências entre os arquivos.

### Revisão das Aulas

- **Aula 1**: Introdução ao TypeScript, configuração do ambiente, e vantagens sobre o JavaScript.
- **Aula 2**: Aprofundamento em `tsconfig.json`, tipos definidos, `Type Alias`, arrays tipados, e enums.
- **Aula 3 & 4**: Reorganização de arquivos, aplicação de formatação de dados, e identificação de problemas solucionáveis com módulos.
- **Aula 5**: Uso do `localStorage` para armazenamento, agrupamento de transações, modificação de datas para exibição, e construção da lógica de componentes.

### Complementos e Boas Práticas

- **Armazenamento e Recuperação de Dados**:
  - A prática de converter dados para o formato correto durante a recuperação (ex.: conversão de strings para `Date`) é crucial para a consistência do estado da aplicação.

- **Segurança e Integridade de Dados**:
  - A validação de entradas (ex.: valores de transações) é essencial para prevenir estados inválidos e garantir a robustez da aplicação.

- **Usabilidade e Experiência do Usuário**:
  - Formatações de moeda e data melhoram a legibilidade e a experiência do usuário, reforçando a importância de funções dedicadas para essas tarefas.