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

    cy.get(seletorDeTodosOsItens)
      .eq(4) // Pega o quinto item da lista (lembre-se: o índice é 4)
      .click(); // Ou .check(), se for um radio button ou checkbox.
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
    cy.contains("li", "Mato Grosso do Sul").click(); // Opções vazia por alguns segundos pode virar issue

    cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click();
    cy.contains("li", "Campo Grande").find('input[type="checkbox"]').check();

    // Passo 3: Encontra "Dourados" e também marca a sua checkbox.
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

    cy.get('[data-cy="add-button"]').click();
    // Diárias
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
    cy.get('[data-cy="rubricaDiaria-confirmar"]').click();
    cy.get('[data-cy="add-button"]').click();

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
    cy.get('[data-cy="rubricaMaterialConsumo-confirmar"]').click();
    cy.get('[data-cy="add-button"]').click();
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
    cy.get('[data-cy="rubricaMaterialPermanente-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();
    //Passagens

    cy.get('[data-cy="add-button"]').click();

    cy.get('[data-cy="rubricaPassagemUnsaved.trecho"]').click();
    cy.contains("li", "Nacional").click();

    cy.get('[data-cy="rubricaPassagemUnsaved.tipo"]').click();
    cy.contains("li", "Aérea").click();

    cy.get('[data-cy="rubricaPassagemUnsaved.custoUnitario"]').type("7,00");

    cy.get('[data-cy="rubricaPassagemUnsaved.quantidade"]').type("10");

    cy.get('[data-cy="rubricaPassagemUnsaved.mesPrevisto"]').click();
    cy.contains("li", "7").click();
    cy.get('[data-cy="rubricaPassagem-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();
    // Hospedagem e Alimentação
    cy.get('[data-cy="add-button"]').click();

    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.estadoId"]').click();
    cy.contains("li", "Mato Grosso do Sul").click();
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.municipio"]').click();
    cy.contains("li", "Campo Grande");
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
    cy.contains("li", "6");

    cy.get('[data-cy="rubricaHospedagemAlimentacao-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();
  });
});
