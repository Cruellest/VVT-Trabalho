import { delay } from "cypress/types/bluebird";

describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    cy.typelogin(
      "https://novo-sig.ledes.net",
      "grupo13_pesq@sig.com",
      "Grupo13@sig"
    );
  });
  // Seção  Caracterização

  const iniciarProposta = () => {
    // Informações Iniciais
    cy.get('[data-cy="breadcrumb-home"]').click();
    cy.get('[data-cy="editais-ver-mais"]').click();
    cy.get(
      ":nth-child(15) > .MuiListItem-root > .e1w0rc4q5 > .e1w0rc4q2 > .MuiButtonBase-root"
    ).click();
    cy.wait(300);
    cy.get('[data-cy="criar-proposta"]').click();
    cy.get('[data-cy="tituloDoProjeto"]')
      .type("Submissão de Proposta Cypress Médio", { delay: 0 })
      .should("have.value", "Submissão de Proposta Cypress Médio");
    cy.get('[data-cy="next-button"]').click();
  };

  const preencherAbrangencia = () => {
    cy.get('[data-cy="abrangencia-adicionar"]').click();
    cy.get('[data-cy="abrangencia.0.estadoId"]').click();
    cy.contains("li", "São Paulo").click();
    cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click();
    cy.contains("li", "Aguaí").find('input[type="checkbox"]').check();
    cy.contains("li", "Adolfo").find('input[type="checkbox"]').check();

    // Parte Adicionada
    cy.get('[data-cy="abrangencia-adicionar"]').click();
    cy.get('[data-cy="abrangencia.1.estadoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="abrangencia.1.abrangenciaMunicipio"]').click();
    cy.contains("li", "Dourados").find('input[type="checkbox"]').check();

    cy.get('[data-cy="abrangencia-adicionar"]').click();
    cy.get('[data-cy="abrangencia.2.estadoId"]').click();
    cy.contains("li", "Mato Grosso").click();
    cy.get('[data-cy="abrangencia.2.abrangenciaMunicipio"]').click();
    cy.contains("li", "Água Boa").find('input[type="checkbox"]').check();
    cy.get('[data-cy="next-button"]').click();
  };

  const preencherCoordenacao = () => {
    for (let i = 0; i < 3; i++) {
      // Pula "Dados Pessoais" e "Endereço" por serem seções carregadas pela própria página
      cy.wait(10); // Tempo de espera para aparecer visibilidade de botão
      cy.get('[data-cy="next-button"]').click();
    }
    cy.get('[data-cy="criadoPor.possuiVinculoInstitucional"]').check();
    cy.get(
      ':nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click();
    cy.contains("li", "Bolsista").click();
    cy.get('[data-cy="next-button"]').click();
  };

  // Seção Apresentação

  const preencherIndicadores = () => {
    //  Define dos dados para cada indicador de produção
    const dadosIndicadores = {
      "Artigo completo publicado, aceito ou submetido em periódicos científicos especializados com corpo editorial":
        { nacional: 5, internacional: 2 },
      "Livros e capítulos publicados com corpo editorial e ISBN": {
        nacional: 3,
        internacional: 1,
      },
      "Organização e editoração de livros e periódicos com corpo editorial": {
        nacional: 1,
        internacional: 0,
      },
      "Comunicações em anais de congressos e periódicos": {
        nacional: 15,
        internacional: 8,
      },
      "Resumo publicado em eventos científicos": {
        nacional: 20,
        internacional: 10,
      },
      "Texto em jornal ou revista (magazine)": {
        nacional: 4,
        internacional: 0,
      },
      "Trabalho publicado em anais de evento": {
        nacional: 7,
        internacional: 3,
      },
      "Partitura musical (canto, coral, orquestra, outra)": {
        nacional: 2,
        internacional: 1,
      },
      "Tradução de livros, artigos, ou outros documentos com corpo editorial": {
        nacional: 1,
        internacional: 1,
      },
      "Prefácio, posfácio, apresentação ou introdução de livros, revistas, periódicos ou outros meios":
        { nacional: 6, internacional: 0 },
      "Participação em publicações científicas internacionais em coautoria com pesquisadores de instituições estrangeiras":
        { nacional: 0, internacional: 4 },
      Outra: { nacional: 1, internacional: 1 },
    };

    // Loop prenche os campos de indicadores de produção
    Object.entries(dadosIndicadores).forEach(([descricao, valores]) => {
      cy.contains(descricao)
        .parents("tr")
        .within(() => {
          cy.get("input")
            .eq(0)
            .type(valores.nacional.toString())
            .should("have.value", valores.nacional.toString());

          cy.get("input")
            .eq(1)
            .type(valores.internacional.toString())
            .should("have.value", valores.internacional.toString());
        });
    });

    cy.get('[data-cy="next-button"]').click();
  };

  const finalizarSubmissao = () => {
    for (let i = 0; i < 2; i++) {
      cy.get('[data-cy="next-button"]').click();
    }
    // Termo de Aceite
    cy.get('[data-cy="termoDeAceiteAceito"]').check();
    cy.get(".ex40wuf1").click();
    cy.get(".ex40wuf2").click();
    cy.get(".ex40wuf2 > .MuiButtonBase-root").click();
  };

  it("Realiza login no sistema e submete uma proposta de forma modular", () => {
    // O corpo do teste agora é uma sequência de chamadas para as funções auxiliares.

    iniciarProposta();
    cy.wait(300);
    preencherAbrangencia();
    cy.wait(300);
    preencherCoordenacao();
    cy.wait(300);
    preencherIndicadores();
    cy.wait(300);
    finalizarSubmissao();
  });
});
