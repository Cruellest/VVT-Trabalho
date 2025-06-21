# CYPRESS SIGFAP

# Pré-requisitos

 Para a realização do trabalho, serão  necessários conhecimentos prévios e a instalação de algumas ferramentas, listadas abaixo.

## Ferramentas

Antes de começar, certifique-se de que as seguintes ferramentas estejam instaladas em seu computador.

- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- npm
- [Visual Studio Code](https://code.visualstudio.com/)

> **Obs.1:** Ao instalar o Node.js, o npm é instalado junto. 
>
> **Obs.2:** Para verificar as versões do git, Node.js e npm instaladas em seu computador, execute o comando `git --version && node --version && npm --version` em seu terminal de linha de comando.
>
> **Obs.3:** Recomendamos a utilização do Visual Studio Code, entretanto, também poderá ser utilizada uma IDE de sua preferência.
>
> **Obs.4:** Caso utilize o Visual Studio Code, recomendamos a instalação da Extensão `Prettier - Code formatter`.

## Conhecimentos

É necessário que você possua ao menos conhecimentos básicos de:

- JavaScript e TypeScript
- Seletores CSS
- Linha de comando
- git

# Clone do projeto [OBS: Revisar e definir] 

1. Abra o navegador e visite a URL [\[ACESSO AO PROJETO\]](https://git.ledes.net/ledes/sig-cypress)

2. Faça baixem o do projeto via HTTPS.

3. No projeto, clique no botão **Code**, escolha a opção _clone via HTTPS_ e copie o link de clone do projeto.

4. Em seu terminal de linha de comando (em uma pasta onde você armazena seus projetos de software), execute o comando `git clone [cole-o-link-copiado-aqui]`.

5. Após clonar o projeto, acesse o diretório recém-clonado (`cd sig-cypress/`).


# Instalação e inicialização do [Cypress](https://cypress.io)

1. Na raiz do projeto, execute o comando `npm init -y` para inicializar um projeto npm, isso é feito para que o projeto contenha um arquivo `package.json`
2. Na raiz do projeto, execute o comando `npm install cypress --save-dev` (ou `npm i cypress -D` para a versão curta).
3. Execute o comando `npx cypress open` para abrir o Cypress pela primeira vez, o ambiente e2e de testes já está configurado.
4. Este será o ambiente de testes Cypress, antes de iniciar os testes feche o _Cypress_App_ e faça a leitura das instruções abaixo.

> **Obs.:** Quando o _Cypress App_ é iniciado pela primeira vez sem ser previamente configurado, o Cypress mostra opções de inicialização recomendadas.

# Começando o trabalho

## Explicando o teste exemplo - Edital Simples

1. Abra o arquivo `edital-simples.cy.ts`, este é um teste e2e (end to end) que cria um Edital Simples no sistema.
    - O bloco `describe` define a suite de testes e o bloco `it` define o caso de teste.
    - `cy.typelogin` é uma função customizada cypress criada dentro do arquivo `/support/commands.ts`.
    - `getCurrentDateTime()` é uma função para trazer a data atual, podendo ser utilizada para definir datas anteriores ou posteriores para auxílio nos testes.

> Obs: Este arquivo foi comentado linha a linha para facilitar a compreensão básica do funcionamento do teste com cypress.

---

## Introdução - Solicitação do Edital Simples:

## Teste de E.S. (Edital Simples)

1. Em Informações do Edital
- Em Identificação do Edital
    - Titulo do Edital
    > Utilizar: `[grupoalunos-numero] [E.S.] [código]/[ano] [nomealuno-sobrenomealuno]`
    >
    > Exemplo: Grupo-01 E.S. 005/2025 joão-neves
    >
    > [GrupoAlunos-numero]: Número do Grupo definido pelo Professor (01 a 99)
    >
    > [E.S.]: Edital Simples
    >
    > [código]: Código de 3 digitos (000 a 999)
    >
    > [ano]: Ano de criação do Edital
    >
    > [nomealuno-sobrenomealuno]: nome e sobrenome do acadêmico
- Restrições
    - Opções de Restrições [Checkbox]
    > Marcar a opção "Definir a duração do projeto em meses" e adicionar uma duração em quantidade de meses.
2. Em Cronograma
- Em Período de Submissão
    - Adicionar a data inicial e final (formato: DD/MM/YYYY hh:mm:ss).
    > A data final sempre deve ser posterior a data inicial.
3. Em Orçamento
- Em Programa
    - Adicionar um programa a este Edital
    > Selecionar um dos programas da `Caixa de Seleção`. 
4. Finalizar
    - Clicar no botão Salvar.
    - Clicar no botão Finalizar.


**Resultado esperado:**

Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.

## Passo a passo:

1. Abra o arquivo `edital-simples.cy.ts` e edite `[URL do sistema]`, `[E-mail do usuário]` e `[Senha do usuário]` estes dados serão informados pelo Professor.
2. No mesmo arquivo edite `Titulo do Edital` conforme o padrão descrito na solicitação.
3. Salve o arquivo, abra o terminal e execute o comando `npx cypress open`, clique em `E2E Testing`, escolha o navegador de sua preferência e clique em `Start E2E Testing`. 
4. Uma janela do navegador escolhido será aberta, em seguida clique em: `edital-simples.cy.ts` e então o teste será iniciado, acompanhe a execução do teste pelo Cypress que realizará a criação de um Edital Simples no sistema.

> Obs: Diante da leitura e compreensão básica do teste `edital-simples.cy.ts` e do texto da solicitação agora vamos ao trabalho.

---

## Atividade 1 - Realizar o Teste Edital Médio

1. Crie um novo teste e2e: `edital-medio.cy.ts`.
2. Neste teste resolva a solicitação abaixo:

## Teste de E.M. (Edital Médio)

1. Em Informações do Edital
- Em Identificação do Edital
    - Titulo do Edital
    > Utilizar: `[grupoalunos-numero] [E.M.] [código]/[ano] [nomealuno-sobrenomealuno]`
    >
    > Exemplo: Grupo-01 E.M. 005/2025 joão-neves
    >
    > [grupoalunos-numero]: Número do Grupo definido pelo Professor (01 a 99)
    >
    > [E.M.]: Edital Médio
    >
    > [código]: Código de 3 digitos (000 a 999)
    >
    > [ano]: Ano de criação do Edital
    >
    > [nomealuno-sobrenomealuno]: nome e sobrenome do acadêmico
- Em Restrições
    - Opções de Restrições [Checkbox]
    > Marcar a opção "Definir a duração do projeto em meses" e adicionar uma duração em quantidade de meses.
    >
    > Marcar a opção "Pesquisador pode submeter mais de uma proposta".
- Em Termo de Aceite
    - Adicionar um texto de Termo de Aceite
- Em Texto do Edital
    - Adicionar um Texto do Edital
- Em Abrangência
    - Adicionar mais de duas Abrangências (Escolha de preferência)
2. Em Cronograma
- Em Período de Submissão
    - Adicionar a data inicial e final.
    > formato de data: DD/MM/YYYY hh:mm:ss
    >
    > A data final sempre deve ser posterior a data inicial.
3. Em Orçamento
- Em Programa
    - Adicionar um Programa a este Edital
    > Selecionar um dos programas da `Caixa de Seleção`. 
4. Em Perguntas
- Em Indicadores de Produção
    - Adicionar os três Indicadores de Produção
5. Finalizar
    - Clicar no botão Salvar.
    - Clicar no botão Finalizar.

**Resultado esperado:**

Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.

---

## Atividade 2 - Realizar o Teste Edital Completo

1. Crie um novo teste e2e: `edital-completo.cy.ts`.
2. Neste teste resolva a solicitação abaixo:

## Teste E.C. (Edital Completo):

1. Em Informações do Edital
- Em Identificação do Edital
    - Titulo do Edital
    > Utilizar: `[grupoalunos-numero] [E.C.] [código]/[ano] [nomealuno-sobrenomealuno]`
    >
    > Exemplo: Grupo-01 E.C. 005/2025 joão-neves
    >
    > [grupoalunos-numero]: Número do Grupo definido pelo Professor (01 a 99)
    >
    > [E.C.]: Edital Completo
    >
    > [código]: Código de 3 digitos (000 a 999)
    >
    > [ano]: Ano de criação do Edital
    >
    > [nomealuno-sobrenomealuno]: nome e sobrenome do acadêmico
- Em Restrições
    - Opções de Restrições [Checkbox]
    > Marcar a opção "Definir a duração do projeto em meses" e adicionar uma duração em quantidade de meses.

    > Marcar a opção "Pesquisador pode submeter mais de uma proposta" e adicionar uma duração em quantidade de meses.
- Em Termo de Aceite
    - Adicionar um texto de Termo de Aceite
- Em Texto do Edital
    - Adicionar um Texto do Edital
- Em Abrangência
    - Marcar a opção "Todos" em Abrangência
- Em Informações Complementares
    - Adicionar 5 ou mais perguntas de Informações Complementares
2. Em Cronograma
- Em Período de Submissão
    - Adicionar a data inicial e final.
    > formato de data: DD/MM/YYYY hh:mm:ss

    > A data final sempre deve ser posterior a data inicial.
3. Em Orçamento
- Em Programa
    - Adicionar um Programa a este Edital
    > Selecionar um dos programas da `Caixa de Seleção`. 
    - Selecionar um Programa com Rubricas
- Em Rubricas
    - Adicionar todas as Rubricas
    > Para adicionar uma Rubrica unitária Clique no botão "Adicionar", selecione uma Rubrica e uma Natureza Despesa e clique no botão "Confirmar".
- Em Faixas de Financiamento
    - Adicionar pelo menos 5 faixas de Financiamento
4. Em Documentos
- Em Documentos da Proposta
    - Criar pelo menos dois documentos da proposta
- Em Documentos Pessoais
    - Adicionar 5 ou mais Documentos Pessoais
5. Em Perguntas
    - Adicionar 5 ou mais perguntas de Descrição do Projeto
    - Adicionar os três Indicadores de Produção
6. Em Bolsas do Edital
- Em Bolsas
    - Adicionar pelo menos 5 modalidades e níveis de bolsas
7. Finalizar
    - Clicar no botão Salvar.
    - Clicar no botão Finalizar.

**Resultado esperado:**

Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.

---

## Atividade 3 - Realizar o Teste de Submissão de Proposta do E.S. (Edital Simples)

1. Abra o teste e2e: `submissao-proposta-simples.cy.ts`.
2. Neste teste resolva a solicitação abaixo:

## Teste de Submissão de Proposta

### Solicitação:

1. A partir do Edital Simples criado com status "em Andamento" (visualizado na Home do sistema: Seção `Editais`), crie um teste de submissão da proposta. 
2. O teste Cypress deve entrar na área de criação da proposta, preenchendo todos os campos da Proposta e então realizando a submissão da proposta.

**Resultado esperado:**

Após a realização do Teste Cypress se espera que a Proposta tenha sido criada com sucesso e apareça na Home do sistema: Seção `Propostas`.

### Passo a passo:

1. Abra o arquivo `submissao-proposta-simples.cy.ts` e edite `[URL do sistema]`, `[E-mail do usuário]` e `[Senha do usuário]` estes dados serão informados pelo Professor.
2. Edite o comando da `linha 15` alterando para clicar no seu edital simples criado.
> Obs: Recomendamos extrair elementos utilizando a ferramenta [Seletor Playground Cypress](https://www.youtube.com/watch?v=LmxU-a3J3bk&ab_channel=QAACTION)
3. Siga o fluxo, extraindo os elementos para preencher todos os campos da Proposta.

---

## Atividade 4 - Realizar o Teste de Submissão de Proposta do E.M. (Edital Médio)

1. Crie o teste e2e: `submissao-proposta-medio.cy.ts`.
2. Neste teste resolva a solicitação abaixo:

## Teste de Submissão de Proposta

### Solicitação:

1. A partir do Edital Médio criado com status "em Andamento" (visualizado na Home do sistema: Seção `Editais`), crie um teste de submissão da proposta. 
2. O teste Cypress deve entrar na área de criação da proposta, preenchendo todos os campos da Proposta e então realizando a submissão da proposta.

**Resultado esperado:**

Após a realização do Teste Cypress se espera que a Proposta tenha sido criada com sucesso e apareça na Home do sistema: Seção `Propostas`.

---

## Atividade 5 - Realizar o Teste de Submissão de Proposta do E.C. (Edital Completo)

1. Crie o teste e2e: `submissao-proposta-completo.cy.ts`.
2. Neste teste resolva a solicitação abaixo:

## Teste de Submissão de Proposta

### Solicitação:

1. A partir do Edital Completo criado com status "em Andamento" (visualizado na Home do sistema: Seção `Editais`), crie um teste de submissão da proposta. 
2. O teste Cypress deve entrar na área de criação da proposta, preenchendo todos os campos da Proposta e então realizando a submissão da proposta.

**Resultado esperado:**

Após a realização do Teste Cypress se espera que a Proposta tenha sido criada com sucesso e apareça na Home do sistema: Seção `Propostas`.

---

# Entregas

1. O Aluno/Grupo deve entregar os arquivos `edital-medio.cy.ts` e `edital-completo.cy.ts` e demais arquivos complementares<u>, se houverem,</u> dentro de suas respectivas pastas, em sua Fork de desenvolvimento.


