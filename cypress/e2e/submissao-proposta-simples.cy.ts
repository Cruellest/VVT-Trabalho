import { getCurrentDateTime } from '../helpers/date.helper';

describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
  beforeEach(() => {
    cy.typelogin(
      'https://novo-sig.ledes.net',
      'grupo13_pesq@sig.com',
      'Grupo13@sig'
    );
  });

  // Seção: Caracterização

  const iniciarProposta = () => {
    cy.get('[data-cy="breadcrumb-home"]').click();
    cy.get('[data-cy="editais-ver-mais"]').click();
    cy.get('[data-cy="visualizar-edital-grupo-13-e-s-006"]').click();
    c
    cy.get('[data-cy="criar-proposta"]').click();
    cy.get('[data-cy="tituloDoProjeto"]')
      .clear()
      .type('Submissão de Proposta Simples Cypress', { delay: 0 })
      .should('have.value', 'Submissão de Proposta Simples Cypress');
    cy.get('[data-cy="instituicaoExecutoraId"]').click();
    cy.get('#mui-7-option-1').click();
    cy.get('[data-cy="unidadeExecutoraId"]').click();
    cy.get('#mui-9-option-1').click();
    cy.get('[data-cy="next-button"]').click();
    cy.wait(300);
  };

  const preencherAbrangencia = () => {
    cy.get('[data-cy="abrangencia-adicionar"]').click();
    cy.get('[data-cy="abrangencia.0.estadoId"]').type('{downarrow}{enter}');
    cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').type('{downarrow}{enter}');
    cy.wait(300);
    cy.get('[data-cy="next-button"]').click();
    cy.wait(300);
  };

  const preencherDadosPessoaisEEndereco = () => {
    cy.get('[data-cy="criadoPor.nomeSocial"]').clear().type('Grupo 13');
    cy.get('[data-cy="criadoPor.racaCorId"]').type('{downarrow}{enter}');
    cy.get('[data-cy="criadoPor.paisId"]').type('{downarrow}{enter}');
    cy.get('[data-cy="next-button"]').click();
    cy.wait(300);
    cy.get('[data-cy="criadoPor.endereco.estado"]').type('{downarrow}{enter}');
    cy.get('[data-cy="criadoPor.endereco.municipio"]').type('{downarrow}{enter}');
    cy.get('[data-cy="next-button"]').click();
    cy.wait(300);
  };

  const preencherDadosAcademicos = () => {
    cy.get('[data-cy="criadoPor.nivelAcademicoId"]').type('{downarrow}{enter}');
    cy.get('[data-cy="next-button"]').click();
    cy.wait(300);
  };

  const preencherDadosProfissionaisEMembros = () => {
    cy.get('[data-cy="next-button"]').click();
    cy.wait(300);
    cy.get('[data-cy="next-button"]').click();
    cy.wait(300);
  };

  const preencherAtividades = () => {
    cy.get('[data-cy="next-button"]').click();
    cy.wait(300);
  };

  // Seção: Apresentação

  const aceitarTermo = () => {
    cy.get('[data-cy="termoDeAceiteAceito"]').click();
    cy.get('[data-cy="menu-verificar-penden"]').click();
    cy.get('.ex40wuf2 > .MuiButtonBase-root').click();
  };

  // Seção: Execução do Fluxo Modular

  it('Realiza login no sistema e submete uma proposta de forma modular', () => {
    iniciarProposta();
    preencherAbrangencia();
    preencherDadosPessoaisEEndereco();
    preencherDadosAcademicos();
    preencherDadosProfissionaisEMembros();
    preencherAtividades();
    aceitarTermo();

    // Submissão da proposta (descomente se quiser enviar)
    // cy.get('[data-cy="enviar-proposta"]').click();

    // Validação (descomente para validar sucesso)
    // cy.contains('Proposta enviada com sucesso').should('be.visible');
    // cy.get('[data-cy="breadcrumb-home"]').click();
    // cy.get('[data-cy="propostas-lista"]').should('contain', 'Submissão de Proposta Cypress');
  });
});
