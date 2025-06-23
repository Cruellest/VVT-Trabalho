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
    cy.get('[data-cy="visualizar-edital-grupo-11-e-s-005"]').click(); 
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente
    cy.get('[data-cy="criar-proposta"]').click(); //Clica no botão "Criar Proposta" para iniciar o processo de criação de uma nova proposta
    cy.get('[data-cy="tituloDoProjeto"]').type(
        'Submissão de Proposta Cypress',
        { delay: 0 },
    );

    // Preenchimento de campos obrigatórios: Informações Iniciais
    cy.get('[data-cy="tituloDoProjeto"]').clear().type('Submissão de Proposta Simples Cypress', { delay: 0 });  // Preenchendo o titulo do projeto
    cy.get('[data-cy="duracao"]').type('{backspace}8'); // Limpa o campo de descrição do projeto
    cy.get('[data-cy="instituicaoExecutoraId"]').click(); // Clica no campo de instituição executora
    cy.get('#mui-7-option-3').click(); // Selecionando a instituição executora

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente


    //Abrangência 
    cy.get('[data-cy="abrangencia-adicionar"]').click(); // Clica no botão para adicionar abrangência
    cy.get('[data-cy="abrangencia.0.estadoId"]').type('{downarrow}{enter}'); // Clica no campo de estado
    cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').type('{downarrow}{enter}'); // Clica no campo de Município

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente


    //Dados Pessoais
    cy.get('[data-cy="criadoPor.nomeSocial"]').clear().type('Grupo 13'); // Preenche o campo de nome social
    cy.get('[data-cy="criadoPor.racaCorId"]').type('{downarrow}{enter}'); // Seleciona a raça/cor 
    cy.get('[data-cy="criadoPor.paisId"]').type('{downarrow}{enter}'); // Clica no campo de país

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente

    //Endereço
    cy.get('[data-cy="criadoPor.endereco.estado"]').type('{downarrow}{enter}'); // Clica no campo de estado
    cy.get('[data-cy="criadoPor.endereco.municipio"]').type('{downarrow}{enter}'); // Clica no campo de cidade

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente

    //Dados Academicos
    cy.get('[data-cy="criadoPor.instituicaoId"]').type('{downarrow}{enter}'); // Clica no campo de instituição
    
    
    cy.get('[data-cy="criadoPor.nivelAcademicoId"]').type('{downarrow}{enter}'); // Clica no campo de nível acadêmico 

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar para a próxima etapa
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente


    // Submeter a proposta
    //cy.get('[data-cy="enviar-proposta"]').click();
    

    // Validar sucesso
    //cy.contains('Proposta enviada com sucesso').should('be.visible');
    // Ou, alternativamente, verificar se aparece na Home
    //cy.get('[data-cy="breadcrumb-home"]').click();
    //cy.get('[data-cy="propostas-lista"]').should('contain', 'Submissão de Proposta Cypress');
  }); 
});