describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.typelogin(
      'https://novo-sig.ledes.net',
      'grupo13_pesq@sig.com',
      'Grupo13@sig'
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });
  it('Realiza login no sistema e submete uma proposta', () => {
    cy.get('[data-cy="breadcrumb-home"]').click(); //Clica no botão "Home" para retornar à página anterior
    cy.get('[data-cy="editais-ver-mais"]').click();

    //Acessa o edital específico:
    cy.get(':nth-child(15) > .MuiListItem-root > .e1w0rc4q5 > .e1w0rc4q2 > .MuiButtonBase-root').click();
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente
    cy.get('[data-cy="criar-proposta"]').click(); //Clica no botão "Criar Proposta" para iniciar o processo de criação de uma nova proposta
    cy.get('[data-cy="tituloDoProjeto"]').type(
        'Submissão de Proposta Cypress',
        { delay: 0 },
    );

    // Preenchimento de campos obrigatórios
    cy.get('[data-cy="tituloDoProjeto"]').clear().type('Submissão de Proposta Simples Cypress', { delay: 0 });  // Preenchendo o titulo do projeto
    cy.get('[data-cy="duracao"]').type('{backspace}8'); // Limpa o campo de descrição do projeto
    cy.get('[data-cy="instituicaoExecutoraId"]').click(); // Clica no campo de instituição executora
    cy.get('#mui-7-option-3').click(); // Selecionando a instituição executora
    
    cy.get('[data-cy="unidadeExecutoraId"]').click();
    cy.get('.MuiAutocomplete-noOptions').click(); // Selecionando a unidade executora
    
    cy.get('[data-cy="areaDeConhecimento-adicionar"]').click();
    cy.get('.MuiAccordionSummary-root').click(); // Clica no botão para adicionar área de conhecimento

    cy.get('[data-cy="areaDeConhecimento.0.grandeAreaId"]').click(); // Clica no campo de grande área de conhecimento
    cy.get('#mui-13-option-2').click(); // Seleciona a grande área de conhecimento

    cy.get('[data-cy="areaDeConhecimento.0.areaId"]').click(); // Clica no campo de área de conhecimento
    cy.get('#mui-15-option-11').click(); // Seleciona a área de conhecimento

    cy.get('[data-cy="areaDeConhecimento.0.subAreaId"]').click(); // Clica no campo de subárea de conhecimento
    cy.get('#mui-17-option-4').click(); // Seleciona a sub

    cy.get('[data-cy="areaDeConhecimento.0.especialidadeId"]').click(); // Clica no campo de especialidade de conhecimento
    cy.get('#mui-19-option-2').click(); // Seleciona a especialidade de conhecimento

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente

    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-bioeconomia"]').click(); // Marca a opção de bioeconomia
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-smart-city"]').click(); // Marca a opção de smart city

    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-26"]').click(); // Clica no campo de data
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-26"]').type('{backspace}22-06-2025'); // Preenche a data com o valor desejado

    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-27"]').click(); // Clica no campo de descrição do projeto
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-27"]').type('{backspace}Lorem ipsum dolor...'); // Preenche a descrição do projeto com o texto desejado

    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-23-item-ods01-erradicar"]').click(); // Marca a opção de ODS 01 - Erradicar a Pobreza

    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-24-item-grande-faturamen"]').click(); // Marca a opção de Grande Faturamento  

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente

    cy.get('[data-cy="abrangencia-adicionar"]').click(); // Clica no botão para adicionar abrangência
    cy.get('.MuiFormControl-root').click(); // Clica no campo de Estado
    cy.get('#mui-35-option-23').click(); // Seleciona o estado de MS
    cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click(); // Clica no campo de Município
    cy.get('#mui-37-option-19').click(); // Seleciona o município de MS

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente

    cy.get('[data-cy="criadoPor.nomeSocial"]').type('{backspace}Grupo 13'); // Preenche o campo de nome social
    cy.get('[data-cy="criadoPor.racaCorId"]').click(); // Clica no campo de raça/cor
    cy.get('#mui-44-option-0').click(); // Seleciona a raça 
    cy.get('[data-cy="criadoPor.paisId"]').click(); // Clica no campo de país
    cy.get('#mui-46-option-0').click(); // Seleciona o país

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente

    cy.get('[data-cy="criadoPor.endereco.estado"]').click(); // Clica no campo de estado
    cy.get('#mui-53-option-0').click(); // Seleciona o estado
    cy.get('[data-cy="criadoPor.endereco.municipio"]').click(); // Clica no campo de município


    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente

    cy.get('[data-cy="criadoPor.instituicaoId"]').click(); // Clica no campo de instituição
    


    // Submeter a proposta
    cy.get('[data-cy="enviar-proposta"]').click();
    

    // Validar sucesso
    cy.contains('Proposta enviada com sucesso').should('be.visible');
    // Ou, alternativamente, verificar se aparece na Home
    cy.get('[data-cy="breadcrumb-home"]').click();
    cy.get('[data-cy="propostas-lista"]').should('contain', 'Submissão de Proposta Cypress');
  }); 
});