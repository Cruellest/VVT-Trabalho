import { getCurrentDateTime } from '../helpers/date.helper';

describe('Teste E2E - Edital Médio', () => {
  beforeEach(() => {

    //Cara por algum motivo não tenho confirmação se o email está errado ou não

    cy.typelogin(
      'https://novo-sig.ledes.net',
      'grupo13_gestor@sig.com',
      'Grupo13@sig'
    );
  });

  it('Cria um Edital Médio conforme especificações', () => {
    // Acessa Editais
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();

    // Identificação do Edital
    cy.get('[data-cy="nome"]').type(
      'Grupo-13 E.M. 007/2025 gabriel-paes', { delay: 0 }
    );

    // Restrições
    cy.get('[data-cy="restricoes"]').click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('12');
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();
    cy.get('[data-cy="next-button"]').click();
    cy.get('.css-jir0u').click();

    // Termo de Aceite

    //Lembrete esse componente dificulta a automação, passivel de colocar em uma issue
    cy.get('[data-cy="termoDeAceite"]').click();
    cy.get('.ck-content').then(el => {
        //@ts-ignore
        const editor = el[0].ckeditorInstance
        editor.setData('Cara editar esse componente de texto é sacanagem');
    })
    cy.get('.ck-content').invoke('change');
    cy.get('[data-cy="next-button"]').click();


    // Texto do Edital
    cy.get('[data-cy="texto"]').click();
    cy.get('.ck-content').then(el => {
        //@ts-ignore
        const editor = el[0].ckeditorInstance
        editor.setData('Esse aqui tambem é duro');
    })
    cy.get('.ck-content').invoke('change');
    cy.get('[data-cy="next-button"]').click();

    // Abrangência
    cy.get('[data-cy="estado-roraima"]').click();
    cy.get('[data-cy="estado-mato-grosso-do-s"]').click();

    // Cronograma > Período de Submissão
    cy.get('[data-cy="cronograma"]').click();
    cy.get('[data-cy="periodo-de-submissao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(
      getCurrentDateTime()
    );
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(
      getCurrentDateTime({addMonths: 12})
    );
    cy.get('[data-cy="chamada-confirmar"]').click();



    // Orçamento > Programa
    cy.get('[data-cy="orcamento"]').click();
    cy.get('[data-cy="programa"]').click();
    cy.get('[data-cy="programaId"]').click();
    cy.get('[data-cy-index="programaId-item-0"]').click();


    // Perguntas > Indicadores de Produção
    cy.get('[data-cy="perguntas"]').click();
    cy.get('[data-cy="indicadores-de-producao"]').click();

    //Nesse input aqui é possivel colocar a pergunta como null, se a seleção for rapida demais.

    //PS: Isso é um inferno para automatizar, o componente é muito ruim de lidar, e não tem como colocar o valor direto no input, é necessário selecionar a opção com o teclado.

    //Pergunta 1
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').type("Produção Bibliográfica{DownArrow}{enter}");
    cy.wait(500); // Espera meio segundo para garantir que o input foi preenchido corretamente
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();
    //Pergunta 2
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').type("Produção Cultural{DownArrow}{enter}");
    cy.wait(500); // Espera meio segundo para garantir que o input foi preenchido corretamente
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();
    //Pergunta 3
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').type("Produção Técnica{DownArrow}{enter}");
    cy.wait(500); // Espera meio segundo para garantir que o input foi preenchido corretamente
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    // Finalizar
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();

  });
});
