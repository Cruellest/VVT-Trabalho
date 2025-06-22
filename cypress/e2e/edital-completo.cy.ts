import { getCurrentDateTime } from '../helpers/date.helper';


const delay = 100
const qntRubricas = 9;
const qntInfoComplementares = 5;
const qntFaixas = 5;
const qntDocumentos = 2;
const qntDocumentosPessoais = 5;
const qntPerguntas = 5;
const qntBolsasNiveis = 5;

describe('Teste E2E - Edital Completo (E.C.)', () => {
  beforeEach(() => {
    cy.typelogin(
      'https://novo-sig.ledes.net',
      'grupo13_gestor@sig.com',
      'Grupo13@sig'
    );
  });


  it('Cria um Edital Completo conforme especificações', () => {
    // Acessa Editais
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();

    // Identificação do Edital
    cy.get('[data-cy="nome"]').type(
      'Grupo-13 E.C. 008/2025 gabriel-paes', { delay: 0 }
    );

    // Restrições
    cy.get('[data-cy="restricoes"]').click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('24');
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();
    cy.get('[data-cy="next-button"]').click();
    cy.get('.css-jir0u').click();

    // Termo de Aceite
    cy.get('[data-cy="termoDeAceite"]').click();
    cy.get('.ck-content').then(el => {
    
    // @ts-ignore
      const editor = el[0].ckeditorInstance;
      editor.setData('Este é o termo de aceite para o edital completo.');
    });
    cy.get('.ck-content').invoke('change');
    cy.get('[data-cy="next-button"]').click();

    // Texto do Edital
    cy.get('[data-cy="texto"]').click();
    cy.get('.ck-content').then(el => {
        //@ts-ignore
      const editor = el[0].ckeditorInstance;
      editor.setData('Este é o texto do edital completo.');
    });
    cy.get('.ck-content').invoke('change');
    cy.get('[data-cy="next-button"]').click();

    // Abrangência
    cy.get('[data-cy="estado-todos"]').click();
    cy.get('[data-cy="abrangencia"]').click();

    // Informações Complementares
    cy.get('[data-cy="informacoes-complementares"]').click();
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();

    //Bug Visual na tela de informações complementares ao adicionar pergunta

    cy.get('[data-cy="informacaoComplementarPergunta--remover"]').click();

    for (let i = 1; i <= qntInfoComplementares; i++) {
    const downArrows = '{downArrow}'.repeat(i);
    cy.get('[data-cy="perguntaInfoId"]').type(`${downArrows}{enter}`);
    cy.wait(delay);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();
    }

    // Cronograma > Período de Submissão
    cy.get('[data-cy="cronograma"]').click();
    cy.get('[data-cy="periodo-de-submissao"]').click();
    cy.get('[data-cy="add-button"]').click();
    const inicio = getCurrentDateTime();
    const termino = getCurrentDateTime({ addMonths: 6 });
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(inicio);
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(termino);
    cy.get('[data-cy="chamada-confirmar"]').click();


    // Orçamento > Programa
    cy.get('[data-cy="orcamento"]').click();
    cy.get('[data-cy="programa"]').click();
    cy.get('[data-cy="programaId"]').click();
    cy.get('[data-cy-index="programaId-item-0"]').click();



    // Rubricas
    cy.get('[data-cy="rubricas"]').click();
    
    for(let i = 1; i <= qntRubricas; i++){
        const downs = '{downArrow}'.repeat(Number(Math.floor(Number(Math.random().toPrecision(1))*3)+1))
        cy.wait(delay);
        cy.get('[data-cy="add-button"]').click();
        cy.wait(delay);
        cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').type('{downArrow}{enter}',{delay: delay})
        cy.wait(delay);
        cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').type(`${downs}{enter}`,{delay: delay})
        cy.wait(delay);
        cy.get('[data-cy="editalRubrica-confirmar"]').click();
    }

    // Faixas de Financiamento
    cy.get('[data-cy="faixas-de-financiamento"]').click();
    for (let i = 1; i <= qntFaixas; i++) {
      cy.get('[data-cy="add-button"]').click();
      
      cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(`Faixa ${i}`,{delay: 0})

      //O Valor minimo persiste entre a criação de diversas faixas, isso vai virar issue:
      cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type(`${'{backspace}'.repeat(5)} ${i * 1000}`,{delay: 0});
      cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type(`${(i * 1000) + 500}`,{delay: 0});
      cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type(`Observação ${i}`,{delay: 0})
      cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();
    }

    
    // Documentos
    cy.get('[data-cy="documentos"]').click();
    
    // Documentos da Proposta
    cy.get('[data-cy="documentos-da-proposta"]').click();
    
    
    for (let i = 0; i < qntDocumentos; i++) {
        cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();
        
        cy.get('[data-cy="documentoPropostaEdital--expandable-item"] > .MuiAccordionSummary-root').click();
        cy.get(`[data-cy="documentoPropostaEdital.${i}.nome"]`).type(`Documento de Proposta ${i+1}`, { delay: 0 });
        cy.get(`[data-cy="documentoPropostaEdital.${i}.descricao"]`).type(`Descrição do Documento de Proposta ${i+1}`, { delay: 0 });
        cy.get(`[data-cy="documentoPropostaEdital.${i}.tamanhoArquivo"]`).type(`${5}`);

        //Issue: Falta especificar o tipo GB? mb? kb?
        cy.get(`[data-cy="documentoPropostaEdital.${i}.formatoArquivo"]`).type('{downArrow}{enter}', { delay: 0});
        cy.wait(delay);
    }

    // Documentos Pessoais
    cy.get('[data-cy="documentos-pessoais"]').click();

    //Issue: O campo de nome do documento não retira os itens disponiveis de forma dinamica, e sincronizada (tipo no primeiro eu tenho todas as opções disponiveis, já no segundo eu tenho todas menos a do primeiro mas se eu selecionar no segundo e voltar ao primeiro poderei selecionar duas opcões repitidas)
    for (let i = 0; i < qntDocumentosPessoais; i++) {
        cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();
        cy.wait(delay);
        cy.get(`[data-cy="documentoPessoalEdital.${i}.documentoPessoalId"]`).type(`${"{downArrow}".repeat(i+1)}{enter}`, { delay: delay });
    }

    // Perguntas
    cy.get('[data-cy="perguntas"]').click();

    //Descrição do Projeto
    cy.get('[data-cy="descricao-do-projeto"]').click();
    
    
        for (let i = 0; i < qntPerguntas; i++) {
        cy.get('[data-cy="pergunta-adicionar"]').click();
        
        cy.get('[data-cy="pergunta--expandable-item"] > .MuiAccordionSummary-root').click();
        cy.get(`[data-cy="pergunta.${i}.pergunta"]`).type(`Pergunta Descrição do Projeto ${i+1}`, { delay: 0 });
        cy.get(`[data-cy="pergunta.${i}.tipoResposta"]`).type(`${'{downArrow}'.repeat(1)}{enter}`, { delay: delay });
        cy.get(`[data-cy="pergunta.${i}.descritiva.tipoRestricao"]`).type(`${'{downArrow}'.repeat(1)}{enter}`, { delay: delay });
        cy.get(`[data-cy="pergunta.${i}.descritiva.maximo"]`).type('{backspace}144', { delay: 0 });
        cy.get(`[data-cy="pergunta.${i}.descritiva.minimo"]`).type('{backspace}1', { delay: 0 });

        cy.wait(delay);
        }

    // Indicadores de Produção
    cy.get('[data-cy="indicadores-de-producao"]').click();
    const indicadores = ['Produção Bibliográfica', 'Produção Cultural', 'Produção Técnica'];
    indicadores.forEach(indicador => {
      cy.get('[data-cy="add-button"]').click();
      cy.get('[data-cy="indicadorProducaoUnsaved.id"]').type(`${indicador}{downArrow}{enter}`);
      cy.wait(delay);
      cy.get('[data-cy="indicadorProducao-confirmar"]').click();
    });


    // Bolsas

    cy.get('[data-cy="bolsas-do-edital"]').click();
    cy.get('[data-cy="bolsas"]').click();
    
    for (let i = 0; i < qntBolsasNiveis; i++) {
    
        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').type(`${'{downArrow}'.repeat(i+1)}{enter}`, { delay: delay });
        cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').type(`${'{downArrow}'.repeat(i+1)}{enter}`, { delay: delay });
        cy.wait(delay);
        cy.get('[data-cy="bolsaEdital-confirmar"]').click();
    }

    // Finalizar
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();

    });
});
