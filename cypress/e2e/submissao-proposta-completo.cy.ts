import { delay } from "cypress/types/bluebird";

describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.typelogin(
      "https://novo-sig.ledes.net", // [URL do sistema]
      "grupo13_pesq@sig.com", // [E-mail do usuário]
      "Grupo13@sig" // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });
  it("Realiza login no sistema e submete uma proposta", () => {
    cy.get('[data-cy="breadcrumb-home"]').click(); //Clica no botão "Home" para retornar à página anterior
    cy.get('[data-cy="editais-ver-mais"]').click(); //Clica no botão "Ver Mais" para acessar a página de Editais

    cy.contains(".MuiListItem-root", "Grupo-13 E.C. 008/2025 gabriel-paes")
      .find("button")
      .click();

    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente
    cy.get('[data-cy="criar-proposta"]').click(); //Clica no botão "Criar Proposta" para iniciar o processo de criação de uma nova proposta
    cy.get('[data-cy="tituloDoProjeto"]').type(
      "Submissão de Proposta Cypress", //Preenche o campo "Título do Projeto" com o valor "Submissão de Proposta de Teste"
      { delay: 0 }
    );
    /* As informações estão sendo carregadas automaticamente -- Não deveria?????
    cy.get(
      ":nth-child(5) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();
    cy.get(
      ":nth-child(6) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();
    //  cy.contains("li", "FACOM/Faculdade de computação").click(); // Está carregando automaticamente mas não deveria
    
    */
    cy.get('[data-cy="next-button"]').click();
    // Seção Caracterização
    // informações complementares
    const seletorDeTodosOsItens =
      '[data-cy^="formularioPropostaInformacaoComplementar.pergunta-23-item-"]';

    cy.get(seletorDeTodosOsItens).eq(4).click();
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-energias-renovav"]'
    ).click();

    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-26"]'
    ).type("23/06/2025");
    const texto = "Texto Longo";
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-27"]'
    ).type(texto, { delay: 0 }); // aqui a inserção de texto está bem demorado

    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-24-item-media-faturament"] > .MuiListItemIcon-root > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).click();
    cy.get('[data-cy="next-button"]').click();
    // abrangência

    cy.get('[data-cy="abrangencia-adicionar"]').click();
    cy.get('[data-cy="abrangencia.0.estadoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();

    cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click();
    cy.contains("li", "Campo Grande").find('input[type="checkbox"]').check();

    cy.contains("li", "Dourados").find('input[type="checkbox"]').check();

    cy.get('[data-cy="abrangencia-adicionar"]').click();
    cy.get('[data-cy="abrangencia.1.estadoId"]').click();
    cy.contains("li", "Rio Grande do Sul").click();
    cy.get('[data-cy="abrangencia.1.abrangenciaMunicipio"]').click();

    cy.contains("li", "André da Rocha").find('input[type="checkbox"]').check();

    cy.get('[data-cy="next-button"]').click();

    // Sessão Cordenação
    //  Dados Pessoais
    cy.get('[data-cy="next-button"]').click();

    // Endereço
    cy.get('[data-cy="next-button"]').click(); // campo de endereço sem o estado "Apenas objeto"

    // Dados Acadêmicos
    cy.get(
      ":nth-child(2) > .MuiGrid-container > :nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.contains("li", "FACOM/Faculdade de computação").click();
    cy.get('[data-cy="next-button"]').click();

    // Dados Profissionais
    cy.get('[data-cy="criadoPor.possuiVinculoInstitucional"]').check();
    cy.get(
      ':nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click();
    cy.contains("li", "Bolsista").click();
    cy.get('[data-cy="next-button"]').click();

    // Seção Apresentação - Perguntas obrigatórias
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-93"]').type(
      "Explicação de interesse no projeto",
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-94"]').type(
      "Objetivos do projeto",
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-95"]').type(
      "Áreas de conhecimento do projeto",
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-96"]').type(
      "Quantidade de bolsistas limitado",
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-97"]').type(
      "Aceita mais de um participante?",
      { delay: 0 }
    );
    cy.get('[data-cy="next-button"]').click();

    // Indicadores de produção
    cy.get("#mui-81").type("5");
    cy.get("#mui-82").type("6");
    cy.get("#mui-83").type("11");
    cy.get("#mui-84").type("23");
    cy.get("#mui-89").type("2");
    cy.get("#mui-90").type("12");

    cy.get("#mui-115").type("20");
    cy.get('[data-cy="next-button"]').click();

    // Membros
    cy.get('[data-cy="next-button"]').click();

    //Atividades - Não fui adiante por solicitar membros e não avançar na seção - Sem opção de membros
    /*
    cy.get('[data-cy="propostaAtividade-adicionar"]').click();

    cy.get('[data-cy="propostaAtividade.0.titulo"]').type(
      "Testes Automatizados",
      { delay: 0 }
    );
    cy.get(
      ":nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.contains("li", "6").click();
    cy.get('[data-cy="propostaAtividade.0.duracao"]').click();
    cy.contains("li", "12 meses").click();
    cy.get('[data-cy="propostaAtividade.0.cargaHorariaSemanal"]').click();
    cy.contains("li", "8 horas").click();
    cy.get('[data-cy="propostaAtividade.0.membroResponsavelId"]').type(
      "Maria Fernanda",
      { delay: 0 }
    );

    cy.get('[data-cy="propostaAtividade-adicionar"]').click();
    cy.get('[data-cy="propostaAtividade.1.titulo"]').type("Documentação", {
      delay: 0,
    });
    cy.get('[data-cy="propostaAtividade.1.mesInicio"]').click();
    cy.contains("li", "8").click();
    cy.get('[data-cy="propostaAtividade.1.duracao"]').click();
    cy.contains("li", "8 meses").click();
    cy.get('[data-cy="propostaAtividade.1.cargaHorariaSemanal"]').click();
    cy.contains("li", "4 horas").click();
    cy.get('[data-cy="propostaAtividade.1.membroResponsavelId"]').type(
      "Maria Fernanda",
      { delay: 0 }
    );
    
    */

    cy.get('[data-cy="next-button"]').click();
    // Orçamento - Rubricas
    cy.get('[data-cy="faixaFinanciamentoId"]').click();
    cy.contains("li", "Faixa 3").click();
    cy.get('[data-cy="next-button"]').click();

    // Diárias
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaDiariaUnsaved.estadoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="rubricaDiariaUnsaved.municipio"]').click();
    cy.contains("li", "Campo Grande").click();
    cy.get('[data-cy="rubricaDiariaUnsaved.numeroDiaria"]').type("5");
    cy.get('[data-cy="rubricaDiariaUnsaved.custoUnitario"]').type("10,00", {
      delay: 0,
    });
    cy.get('[data-cy="rubricaDiariaUnsaved.mesPrevisto"]').click();
    cy.contains("li", "6").click();

    // Confirmar e Avançar Seção
    cy.get('[data-cy="rubricaDiaria-confirmar"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();
    // Material de Consumo
    cy.get('[data-cy="add-button"]').click();

    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.especificacao"]').type(
      "ABC",
      {
        delay: 0,
      }
    );
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.unidadeMedida"]').click();
    cy.contains("li", "Quilograma").click();

    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.quantidade"]').type("5");
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.custoUnitario"]').type(
      "2,00"
    );
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.mesPrevisto"]').click();
    cy.contains("li", "6").click();

    // Confirmar e Avançar Seção
    cy.get('[data-cy="rubricaMaterialConsumo-confirmar"]').click();
    cy.get('[data-cy="add-button"]').click();
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
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.quantidade"]').type(
      "5",
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.custoUnitario"]').type(
      "2,00",
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.mesPrevisto"]').click();
    cy.contains("li", "7").click();

    // Confirmar e Avançar Seção
    cy.get('[data-cy="rubricaMaterialPermanente-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();

    //Passagens
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

    cy.get('[data-cy="rubricaPassagemUnsaved.quantidade"]').type("10");

    cy.get('[data-cy="rubricaPassagemUnsaved.mesPrevisto"]').click();
    cy.contains("li", "7").click();

    // Confirmar e Avançar Seção
    cy.get('[data-cy="rubricaPassagem-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();

    // Hospedagem e Alimentação
    cy.get('[data-cy="add-button"]').click();

    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.estadoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.municipio"]').click();
    cy.contains("li", "Campo Grande").click();
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.especificacao"]'
    ).type("GFI", { delay: 0 });
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.quantidade"]').type(
      "5",
      { delay: 0 }
    );
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.custoUnitario"]'
    ).type("20,00", { delay: 0 });
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.mesPrevisto"]'
    ).click();
    cy.contains("li", "6").click();

    //Confirmar e Avançar Seção
    cy.get('[data-cy="rubricaHospedagemAlimentacao-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // Serviços de terceiros
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.especificacao"]')
      .type("JKL", { delay: 0 })
      .should("have.value", "JKL");
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.tipo"]').click();
    cy.contains("li", "Pessoa Física").click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.mesPrevisto"]').click();
    cy.contains("li", "9").click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.valorTotal"]').type(
      "10,00",
      { delay: 0 }
    );

    //Confirmar e Avançar Seção
    cy.get('[data-cy="rubricaServicoTerceiro-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");

    //Pessoal
    cy.get('[data-cy="add-button"]').click();

    // Preenche os campos de texto
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

    // Seleciona opções nos dropdowns
    cy.get('[data-cy="rubricaPessoalUnsaved.mesInicio"]').click();
    cy.contains("li", "6").click(); // Seleciona o Mês 6

    cy.get('[data-cy="rubricaPessoalUnsaved.duracao"]').click();
    cy.contains("li", "12").click(); // Seleciona Duração de 12 meses

    cy.get('[data-cy="rubricaPessoalUnsaved.cargaHorariaSemanal"]').click();
    cy.contains("li", "40").click(); // Seleciona 40 horas semanais

    // Preenche os campos de custo
    // NOTA: Seu código original tinha um seletor duplicado. Assumi que o segundo era para o campo "Valor".
    cy.get('[data-cy="rubricaPessoalUnsaved.custoHoraCustoMes"]').type(
      "50,00",
      { delay: 0 }
    );

    // TODO: O seletor para o campo "Valor" provavelmente é diferente. Verifique no inspetor.
    cy.get('[data-cy="rubricaPessoalUnsaved.valorTotal"]').type("700,00", {
      delay: 0,
    });

    // Preenche a justificativa
    // TODO: Verifique o seletor real para este campo.
    cy.get('[data-cy="rubricaPessoalUnsaved.justificativa"]').type(
      "Profissional essencial para a execução da análise principal do projeto.",
      { delay: 0 }
    );

    // Confirmar e Avançar Seção
    cy.get('[data-cy="rubricaPessoal-confirmar"]').click(); // TODO: Verifique o seletor do botão de confirmar
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // Encargos
    cy.get('[data-cy="add-rubrica-encargo"]').click();
    cy.get('[data-cy="rubricaEncargoUnsaved.especificacao"]').type("ABC", {
      delay: 0,
    });
    cy.get('[data-cy="rubricaEncargoUnsaved.valorTotal"]').type("20,00", {
      delay: 0,
    });
    cy.get('[data-cy="rubricaEncargoUnsaved.mesPrevisto"]').click();
    cy.contains("li", "7").click();
    cy.get('[data-cy="rubricaEncargo-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    //Bolsas
    // 1. Clica no botão para abrir o formulário de adição de bolsa
    cy.get('[data-cy="add-bolsas"]').click();

    // 2. Seleciona a Modalidade da Bolsa
    cy.get('[data-cy="rubricaBolsaUnsaved.modalidadeBolsaId"]').click();
    cy.contains("li", "EXP").click();

    // 3. Seleciona o Nível da Bolsa
    cy.get('[data-cy="rubricaBolsaUnsaved.nivelBolsaId"]').click();
    cy.get('li[role="option"]').eq(0).click();

    // 4. Preenche a Quantidade
    cy.get('[data-cy="rubricaBolsaUnsaved.quantidade"]')
      .type("2")
      .should("have.value", "2"); // VERIFICAÇÃO

    // 5. Seleciona a Duração
    cy.get('[data-cy="rubricaBolsaUnsaved.duracao"]').click();
    cy.contains("li", "12").click();

    //Confirmar e Avançar Seção
    cy.get('[data-cy="rubricaBolsa-confirmar"]').click();
    // cy.contains("Salvo com sucesso!").should("be.visible"); // Etapa incosistente documentada na issue 11.
    cy.get('[data-cy="next-button"]').click();

    //   Consolidação
    cy.get('[data-cy="next-button"]').click();
    // Solicitação a fundação
    cy.get('[data-cy="next-button"]').click();
    // Anexo - Documentos Pessoais
    cy.get("#select-categories").click();
    cy.contains("li", "CPF").click();
    cy.get('input[type="file"]').selectFile("cypress/fixtures/T1.pdf", {
      force: true,
    });
    cy.get('[data-cy="next-button"]').click();
    // Anexo Documentos da proposta
    cy.get("#select-categories").click();
    cy.contains("li", "Documento de Proposta 2").click();
    cy.get('input[type="file"]').selectFile("cypress/fixtures/T2.csv", {
      force: true,
    });
    cy.get('[data-cy="next-button"]').click();

    // Termo de Aceite
    cy.get('[data-cy="termoDeAceiteAceito"]').check();
    cy.get(".ex40wuf1").click();
    cy.get(".ex40wuf2").click();
  });
});
