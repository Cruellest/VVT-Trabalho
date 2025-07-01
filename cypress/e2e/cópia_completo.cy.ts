describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(function () {
    cy.fixture("dados_das_secoes").as("dados");

    cy.typelogin(
      "https://novo-sig.ledes.net",
      "grupo13_pesq@sig.com",
      "Grupo13@sig"
    );
  });

  it("Realiza login no sistema e submete uma proposta completa", function () {
    // --- SEÇÃO INICIAL E CARACTERIZAÇÃO ---
    // NOTA: Estas seções permanecem com dados locais (hardcoded), conforme solicitado.
    cy.get('[data-cy="breadcrumb-home"]').click();
    cy.get('[data-cy="editais-ver-mais"]').click();
    cy.contains(".MuiListItem-root", "Grupo-13 E.C. 008/2025 gabriel-paes")
      .find("button")
      .click();
    cy.wait(300);
    cy.get('[data-cy="criar-proposta"]').click();
    cy.get('[data-cy="tituloDoProjeto"]').type(
      "Submissão de Proposta Cypress",
      { delay: 0 }
    );
    cy.get('[data-cy="next-button"]').click();

    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-23-item-ods04-garantir-o"]'
    ).click();
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-energias-renovav"]'
    ).click();
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-26"]'
    ).type("23/06/2025");
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-27"]'
    ).type("Análise de dados aplicada ao campo da Biologia", { delay: 0 });
    cy.get(
      '[data-cy="formularioPropostaInformacaoComplementar.pergunta-24-item-media-faturament"] > .MuiListItemIcon-root > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).click();
    cy.get('[data-cy="next-button"]').click();

    // --- SEÇÃO DE ABRANGÊNCIA E COORDENAÇÃO ---
    // NOTA: Estas seções permanecem com dados locais e seletores originais, conforme solicitado.
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

    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-cy="next-button"]').click();
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

    // ------------------------------------------------------------------------------------
    // MELHORIA: Seção de Apresentação (Perguntas) usando dados da fixture.
    // ------------------------------------------------------------------------------------
    cy.log("--- Preenchendo Seção de Apresentação com Fixture ---");
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-93"]')
      .type(this.dados.apresentacao.interesse, { delay: 0 })
      .should("have.value", this.dados.apresentacao.interesse);
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-94"]').type(
      this.dados.apresentacao.objetivos,
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-95"]').type(
      this.dados.apresentacao.areasConhecimento,
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-96"]').type(
      this.dados.apresentacao.bolsistas,
      { delay: 0 }
    );
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-97"]').type(
      this.dados.apresentacao.participantes,
      { delay: 0 }
    );
    cy.get('[data-cy="next-button"]').click();

    // ------------------------------------------------------------------------------------
    // MELHORIA: Seção de Indicadores usando dados da fixture e seletores robustos.
    // ------------------------------------------------------------------------------------
    cy.log("--- Preenchendo Seção de Indicadores com Fixture ---");
    cy.contains("td", "Artigo completo publicado")
      .parents("tr")
      .find("input")
      .eq(0)
      .type(this.dados.indicadores.artigoCompleto.nacional);
    cy.contains("td", "Artigo completo publicado")
      .parents("tr")
      .find("input")
      .eq(1)
      .type(this.dados.indicadores.artigoCompleto.internacional);
    cy.contains("td", "Livros e capítulos publicados")
      .parents("tr")
      .find("input")
      .eq(0)
      .type(this.dados.indicadores.livrosCapitulos.nacional);
    cy.contains("td", "Livros e capítulos publicados")
      .parents("tr")
      .find("input")
      .eq(1)
      .type(this.dados.indicadores.livrosCapitulos.internacional);
    cy.contains("td", "Organização e editoração")
      .parents("tr")
      .find("input")
      .eq(0)
      .type(this.dados.indicadores.organizacaoEditoracao.nacional);
    cy.contains("td", "Organização e editoração")
      .parents("tr")
      .find("input")
      .eq(1)
      .type(this.dados.indicadores.organizacaoEditoracao.internacional);
    cy.contains("td", "Comunicações em anais")
      .parents("tr")
      .find("input")
      .eq(0)
      .type(this.dados.indicadores.comunicacoesAnais.nacional);
    cy.get('[data-cy="next-button"]').click();

    // --- Pula Seções de Membros e Atividades ---
    cy.get('[data-cy="next-button"]').click(); // Membros
    cy.get('[data-cy="next-button"]').click(); // Atividades

    // ------------------------------------------------------------------------------------
    // MELHORIA: Seção de Orçamento COMPLETA usando dados da fixture.
    // ------------------------------------------------------------------------------------
    cy.log("--- Preenchendo Seção de Orçamento com Fixture ---");
    cy.get('[data-cy="faixaFinanciamentoId"]').click();
    cy.contains("li", this.dados.orcamento.faixaFinanciamento).click();
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Diárias ---
    cy.log("Orçamento - Diárias");
    cy.get('[data-cy="add-button"]').click();
    const diaria = this.dados.orcamento.diaria;
    cy.get('[data-cy="rubricaDiariaUnsaved.estadoId"]').click();
    cy.contains("li", diaria.estado).click();
    cy.get('[data-cy="rubricaDiariaUnsaved.municipio"]').click();
    cy.contains("li", diaria.municipio).click();
    cy.get('[data-cy="rubricaDiariaUnsaved.numeroDiaria"]').type(diaria.numero);
    cy.get('[data-cy="rubricaDiariaUnsaved.custoUnitario"]').type(
      diaria.custo,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaDiariaUnsaved.mesPrevisto"]').click();
    cy.contains("li", diaria.mes).click();
    cy.get('[data-cy="rubricaDiaria-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Material de Consumo ---
    cy.log("Orçamento - Material de Consumo");
    const consumo = this.dados.orcamento.materialConsumo;
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.especificacao"]').type(
      consumo.especificacao,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.unidadeMedida"]').click();
    cy.contains("li", consumo.unidade).click();
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.quantidade"]').type(
      consumo.quantidade
    );
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.custoUnitario"]').type(
      consumo.custo
    );
    cy.get('[data-cy="rubricaMaterialConsumoUnsaved.mesPrevisto"]').click();
    cy.contains("li", consumo.mes).click();
    cy.get('[data-cy="rubricaMaterialConsumo-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Material Permanente ---
    cy.log("Orçamento - Material Permanente");
    const permanente = this.dados.orcamento.materialPermanente;
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.especificacao"]').type(
      permanente.especificacao,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.tipoOrigem"]').click();
    cy.contains("li", permanente.origem).click();
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.quantidade"]').type(
      permanente.quantidade,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.custoUnitario"]').type(
      permanente.custo,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaMaterialPermanenteUnsaved.mesPrevisto"]').click();
    cy.contains("li", permanente.mes).click();
    cy.get('[data-cy="rubricaMaterialPermanente-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible"); // Esta assertiva estava faltando no código original
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Passagens ---
    cy.log("Orçamento - Passagens");
    const passagens = this.dados.orcamento.passagens;
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaPassagemUnsaved.trecho"]').click();
    cy.contains("li", passagens.trecho).click();
    // ... preenchimento do resto dos campos de passagens
    cy.get('[data-cy="rubricaPassagemUnsaved.custoUnitario"]').type(
      passagens.custo
    );
    cy.get('[data-cy="rubricaPassagemUnsaved.quantidade"]').type(
      passagens.quantidade
    );
    cy.get('[data-cy="rubricaPassagemUnsaved.mesPrevisto"]').click();
    cy.contains("li", passagens.mes).click();
    cy.get('[data-cy="rubricaPassagem-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Hospedagem e Alimentação ---
    cy.log("Orçamento - Hospedagem e Alimentação");
    const hospedagem = this.dados.orcamento.hospedagem;
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.estadoId"]').click();
    cy.contains("li", hospedagem.estado).click();
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.municipio"]').click();
    cy.contains("li", hospedagem.municipio).click();
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.especificacao"]'
    ).type(hospedagem.especificacao, { delay: 0 });
    cy.get('[data-cy="rubricaHospedagemAlimentacaoUnsaved.quantidade"]').type(
      hospedagem.quantidade,
      { delay: 0 }
    );
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.custoUnitario"]'
    ).type(hospedagem.custo, { delay: 0 });
    cy.get(
      '[data-cy="rubricaHospedagemAlimentacaoUnsaved.mesPrevisto"]'
    ).click();
    cy.contains("li", hospedagem.mes).click();
    cy.get('[data-cy="rubricaHospedagemAlimentacao-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Serviços de Terceiros ---
    cy.log("Orçamento - Serviços de Terceiros");
    const servico = this.dados.orcamento.servicoTerceiro;
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.especificacao"]').type(
      servico.especificacao,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.tipo"]').click();
    cy.contains("li", servico.tipo).click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.mesPrevisto"]').click();
    cy.contains("li", servico.mes).click();
    cy.get('[data-cy="rubricaServicoTerceiroUnsaved.valorTotal"]').type(
      servico.valor,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaServicoTerceiro-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Pessoal ---
    cy.log("Orçamento - Pessoal");
    const pessoal = this.dados.orcamento.pessoal;
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="rubricaPessoalUnsaved.funcao"]').type(pessoal.funcao, {
      delay: 0,
    });
    cy.get('[data-cy="rubricaPessoalUnsaved.formacaoProfissional"]').type(
      pessoal.formacao,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoalUnsaved.perfilDesejado"]').type(
      pessoal.perfil,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoalUnsaved.mesInicio"]').click();
    cy.contains("li", pessoal.mesInicio).click();
    cy.get('[data-cy="rubricaPessoalUnsaved.duracao"]').click();
    cy.contains("li", pessoal.duracao).click();
    cy.get('[data-cy="rubricaPessoalUnsaved.cargaHorariaSemanal"]').click();
    cy.contains("li", pessoal.cargaHoraria).click();
    cy.get('[data-cy="rubricaPessoalUnsaved.custoHoraCustoMes"]').type(
      pessoal.custoUnitario,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoalUnsaved.valorTotal"]').type(
      pessoal.valorTotal,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoalUnsaved.justificativa"]').type(
      pessoal.justificativa,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaPessoal-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Encargos ---
    cy.log("Orçamento - Encargos");
    const encargos = this.dados.orcamento.encargos;
    cy.get('[data-cy="add-rubrica-encargo"]').click();
    cy.get('[data-cy="rubricaEncargoUnsaved.especificacao"]').type(
      encargos.especificacao,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaEncargoUnsaved.valorTotal"]').type(
      encargos.valor,
      { delay: 0 }
    );
    cy.get('[data-cy="rubricaEncargoUnsaved.mesPrevisto"]').click();
    cy.contains("li", encargos.mes).click();
    cy.get('[data-cy="rubricaEncargo-confirmar"]').click();
    cy.contains("Salvo com sucesso!").should("be.visible");
    cy.get('[data-cy="next-button"]').click();

    // --- Subseção: Bolsas ---
    cy.log("Orçamento - Bolsas");
    const bolsa = this.dados.orcamento.bolsa;
    cy.get('[data-cy="add-bolsas"]').click();
    cy.get('[data-cy="rubricaBolsaUnsaved.modalidadeBolsaId"]').click();
    cy.contains("li", bolsa.modalidade).click();
    cy.get('[data-cy="rubricaBolsaUnsaved.nivelBolsaId"]').click();
    cy.get('li[role="option"]').eq(bolsa.nivelIndex).click();
    cy.get('[data-cy="rubricaBolsaUnsaved.quantidade"]')
      .type(bolsa.quantidade)
      .should("have.value", bolsa.quantidade);
    cy.get('[data-cy="rubricaBolsaUnsaved.duracao"]').click();
    cy.contains("li", bolsa.duracao).click();
    cy.get('[data-cy="rubricaBolsa-confirmar"]').click();
    cy.get('[data-cy="next-button"]').click();

    // --- SEÇÃO FINAL E SUBMISSÃO ---
    cy.log("--- Finalizando Submissão ---");
    cy.get('[data-cy="next-button"]').click(); // Consolidação
    cy.get('[data-cy="next-button"]').click(); // Solicitação

    // Anexos
    cy.get("#select-categories").click();
    cy.contains("li", "CPF").click();
    cy.get('input[type="file"]').selectFile("cypress/fixtures/T1.pdf", {
      force: true,
    });
    cy.get('[data-cy="next-button"]').click();

    cy.get("#select-categories").click();
    cy.contains("li", "Documento de Proposta 2").click();
    cy.get('input[type="file"]').selectFile("cypress/fixtures/T2.csv", {
      force: true,
    });
    cy.get('[data-cy="next-button"]').click();

    // Termo de Aceite e Submissão
    cy.get('[data-cy="termoDeAceiteAceito"]').check();
    cy.get(".ex40wuf1").click(); // TODO: Substituir por seletor estável para o botão de submeter
    cy.get(".ex40wuf2").click(); // TODO: Substituir por seletor estável para o botão de confirmar
  });
});
