import { delay } from "cypress/types/bluebird";

describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    cy.typelogin(
      "https://novo-sig.ledes.net",
      "grupo13_pesq@sig.com",
      "Grupo13@sig"
    );
  });

  const iniciarProposta = () => {
    cy.get('[data-cy="breadcrumb-home"]').click();
    cy.get('[data-cy="editais-ver-mais"]').click();
    cy.contains(".MuiListItem-root", "Grupo-13 E.C. 008/2025 gabriel-paes")
      .find("button")
      .click();
    cy.wait(300);
    cy.get('[data-cy="criar-proposta"]').click();
    cy.get('[data-cy="tituloDoProjeto"]')
      .type("Submissão de Proposta Cypress Modular", { delay: 0 })
      .should("have.value", "Submissão de Proposta Cypress Modular");
    cy.get('[data-cy="next-button"]').click();
  };

  const preencherCaracterizacao = () => {
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-23-item-ods04-garantir-o"]'
    ).click();
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-energias-renovav"]'
    ).click(); // Esse componente impende a submissão # Issue 12.
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-26"]'
    ).type("23/06/2025", { delay: 0 });
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-27"]'
    ).type("Análise de dados aplicada ao campo da Biologia.", { delay: 0 });
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-24-item-media-faturament"] > .MuiListItemIcon-root > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).click();
    cy.get('[data-cy="next-button"]').click();
  };

  const preencherAbrangencia = () => {
    cy.get('[data-cy="abrangencia-adicionar"]').click();
    cy.get('[data-cy="abrangencia.0.estadoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click();
    cy.contains("li", "Campo Grande").find('input[type="checkbox"]').check();
    cy.contains("li", "Dourados").find('input[type="checkbox"]').check();
    cy.get("body").click({ force: true });
    cy.get('[data-cy="next-button"]').click();
  };

  const preencherCoordenacao = () => {
    for (let i = 0; i < 2; i++) {
      // Pula "Dados Pessoais" e "Endereço" por serem seções carregadas pela própria página
      cy.get('[data-cy="next-button"]').click();
    }
    cy.get(
      ":nth-child(2) > .MuiGrid-container > :nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.contains("li", "FACOM/Faculdade de computação").click();
    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-cy="criadoPor.possuiVinculoInstitucional"]').check();
    cy.get(
      ':nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click();
    cy.contains("li", "Bolsista").click();
    cy.get('[data-cy="next-button"]').click();
  };

  const preencherApresentacao = () => {
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-93"]').type(
      "Explicação de interesse no projeto.",
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-94"]').type(
      "Objetivos do projeto.",
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-95"]').type(
      "Áreas de conhecimento do projeto.",
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-96"]').type(
      "Quantidade de bolsistas limitado.",
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-97"]').type(
      "Aceita mais de um participante?",
      { delay: 0 }
    );
    cy.get('[data-cy="next-button"]').click();
  };

  const preencherIndicadores = () => {
    cy.get("#mui-81").type("5", { delay: 0 });
    cy.get("#mui-82").type("6", { delay: 0 });
    cy.get("#mui-83").type("11", { delay: 0 });
    cy.get("#mui-84").type("23", { delay: 0 });
    cy.get("#mui-89").type("2", { delay: 0 });
    cy.get("#mui-90").type("12", { delay: 0 });
    cy.get("#mui-115").type("20", { delay: 0 });
    cy.get('[data-cy="next-button"]').click();
  };

  const preencherOrcamento = () => {
    cy.get('[data-cy="next-button"]').click(); // Pula Membros
    cy.get('[data-cy="next-button"]').click(); // Pula Atividades

    cy.get('[data-cy="faixaFinanciamentoId"]').click();
    cy.contains("li", "Faixa 5").click();
    cy.get('[data-cy="next-button"]').click();

    // Diárias
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaDiariaUnsaved.estadoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="rubricaDiariaUnsaved.municipio"]').click();
    cy.contains("li", "Campo Grande").click();
    cy.get('[data-cy="rubricaDiariaUnsaved.numeroDiaria"]').type("1");
    cy.get('[data-cy="rubricaDiariaUnsaved.custoUnitario"]').type("10,00");
    cy.get('[data-cy="rubricaDiariaUnsaved.mesPrevisto"]').click();
    cy.contains("li", "6").click();
    cy.get('[data-cy="rubricaDiaria-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // Material de Consumo
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.especificacao"]').type(
      "ABC",
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.unidadeMedida"]').click();
    cy.contains("li", "Quilograma").click();
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.quantidade"]').type("2");
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.custoUnitario"]').type(
      "2,00"
    );
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.mesPrevisto"]').click();
    cy.contains("li", "6").click();
    cy.get('[data-cy="rubricaMaterialConsumo-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // Material Permanente
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.especificacao"]').type(
      "DEF",
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.tipoOrigem"]').click();
    cy.contains("li", "Nacional").click();
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.quantidade"]').type("5"); // Issue 11 replicada - não salva os dados de quantidade
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.custoUnitario"]').type(
      "2,00"
    );
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.mesPrevisto"]').click();
    cy.contains("li", "7").click();
    cy.get('[data-cy="rubricaMaterialPermanente-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();

    // Passagens
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaPassagemUnsaved.trecho"]').click();
    cy.contains("li", "Nacional").click();
    cy.get('[data-cy="rubricaPassagemUnsaved.estadoOrigemId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="rubricaPassagemUnsaved.municipioOrigem"]').click();
    cy.contains("li", "Campo Grande").click();
    cy.get('[data-cy="rubricaPassagemUnsaved.estadoDestinoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="rubricaPassagemUnsaved.municipioDestino"]').click();
    cy.contains("li", "Dourados").click();
    cy.get('[data-cy="rubricaPassagemUnsaved.tipo"]').click();
    cy.contains("li", "Aérea").click();
    cy.get('[data-cy="rubricaPassagemUnsaved.custoUnitario"]').type("7,00");
    cy.get('[data-cy="rubricaPassagemUnsaved.quantidade"]').type("1");
    cy.get('[data-cy="rubricaPassagemUnsaved.mesPrevisto"]').click();
    cy.contains("li", "7").click();
    cy.get('[data-cy="rubricaPassagem-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();

    // Hospedagem e Alimentação
    cy.get('[data-cy="add-button"]').click();
    cy.wait(20); // Espera informação ser carregada completamente
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.estadoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.municipio"]').click();
    cy.contains("li", "Campo Grande").click();
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.especificacao"]'
    ).type("GFI");
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.quantidade"]').type(
      "1"
    );
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.custoUnitario"]'
    ).type("12,00");
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.mesPrevisto"]'
    ).click();
    cy.contains("li", "6").click();
    cy.get('[data-cy="rubricaHospedagemAlimentacao-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // Serviços de Terceiros
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.especificacao"]')
      .type("JKL", { delay: 0 })
      .should("have.value", "JKL");
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.tipo"]').click();
    cy.contains("li", "Pessoa Física").click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.mesPrevisto"]').click();
    cy.contains("li", "9").click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.valorTotal"]').type("5,00");
    cy.get('[data-cy="rubricaServicoTerceiro-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // Pessoal
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaPessoalUnsaved.funcao"]').type(
      "Pesquisador Sênior",
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoalUnsaved.formacaoProfissional"]').type(
      "Doutorado em Biologia",
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoalUnsaved.perfilDesejado"]').type(
      "Experiência com análise de dados genéticos",
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoalUnsaved.mesInicio"]').click();
    cy.contains("li", "6").click();
    cy.get('[data-cy="rubricaPessoalUnsaved.duracao"]').click();
    cy.contains("li", "12").click();
    cy.get('[data-cy="rubricaPessoalUnsaved.cargaHorariaSemanal"]').click();
    cy.contains("li", "20").click();
    cy.get('[data-cy="rubricaPessoalUnsaved.custoHoraCustoMes"]').type("5,00");
    cy.get('[data-cy="rubricaPessoalUnsaved.valorTotal"]').type("10,00");
    cy.get('[data-cy="rubricaPessoalUnsaved.justificativa"]').type(
      "Profissional essencial para a execução da análise.",
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoal-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // Encargos
    cy.get('[data-cy="add-rubrica-encargo"]').click();
    cy.get('[data-cy="rubricaEncargoUnsaved.especificacao"]').type("ABC", {
      delay: 0,
    });
    cy.get('[data-cy="rubricaEncargoUnsaved.valorTotal"]').type("5,00");
    cy.get('[data-cy="rubricaEncargoUnsaved.mesPrevisto"]').click();
    cy.contains("li", "7").click();
    cy.get('[data-cy="rubricaEncargo-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // Bolsas
    cy.get('[data-cy="add-bolsas"]').click();
    cy.get('[data-cy="rubricaBolsaUnsaved.modalidadeBolsaId"]').click();
    cy.contains("li", "EXP").click();
    cy.get('[data-cy="rubricaBolsaUnsaved.nivelBolsaId"]').click();
    cy.get('li[role="option"]').eq(0).click();
    cy.get('[data-cy="rubricaBolsaUnsaved.quantidade"]') // Issue 11  - não salva os dados de quantidade impendindo etapa completa de bolsa
      .type("2")
      .should("have.value", "2");
    cy.get('[data-cy="rubricaBolsaUnsaved.duracao"]').click();
    cy.contains("li", "12").click();
    cy.get('[data-cy="rubricaBolsa-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();
  };

  const finalizarSubmissao = () => {
    for (let i = 0; i < 2; i++) {
      // Pula Etapas de Consolidação e Solicitação a fundação por serem seções carregadas pela própria página
      cy.get('[data-cy="next-button"]').click();
    }

    // Anexo Documentos Pessoais
    const DocPessoais = [];
    cy.get("#select-categories").click();
    cy.get('li[role="option"]')
      .each(($item) => {
        DocPessoais.push($item.text().trim());
      })
      .then(() => {
        cy.get("body").click();
      });
    cy.wrap(DocPessoais).each((nomeDoc) => {
      cy.get("#select-categories").click();
      cy.contains('li[role="option"]', nomeDoc).click();
      cy.get('input[type="file"]').selectFile("cypress/fixtures/T1.pdf", {
        force: true,
      });
    });
    cy.get('[data-cy="next-button"]').click();

    // Anexo Documentos da Proposta
    const DocPropostas = [];
    cy.get("#select-categories").click();
    cy.get("li[role=option]")
      .each(($item) => {
        DocPropostas.push($item.text().trim());
      })
      .then(() => {
        cy.get("body").click();
      });
    cy.wrap(DocPropostas).each((nomeDoc) => {
      cy.get("#select-categories").click();
      cy.contains('li[role="option"]', nomeDoc).click();
      cy.get('input[type="file"]').selectFile("cypress/fixtures/T2.csv", {
        force: true,
      });
    });
    cy.get('[data-cy="next-button"]').click();

    // Termo de Aceite
    cy.get('[data-cy="termoDeAceiteAceito"]').check();
    cy.get(".ex40wuf1").click();
    cy.get(".ex40wuf2").click();
  };

  it("Realiza login no sistema e submete uma proposta de forma modular", () => {
    // O corpo do teste agora é uma sequência de chamadas para as funções auxiliares.

    iniciarProposta();
    preencherCaracterizacao();
    preencherAbrangencia();
    preencherCoordenacao();
    preencherApresentacao();
    preencherIndicadores();
    preencherOrcamento();
    finalizarSubmissao();

    // Assertiva Final
    cy.contains("h1", "Proposta submetida com sucesso").should("be.visible"); // Por causa da issue 12 Submissão não é concluída.
  });
});
