describe('Teste de Checkout', () => {
    const URL_CHECKOUT = 'https://teste.homolog.payt.site/checkout';
    let tempos = {};

    it('Checkout', () => {
        cy.viewport(1280, 1500);
        cy.then(() => {
            tempos = {};
            // carrega a página
            const startCarregamento = performance.now();
            cy.visit(URL_CHECKOUT);
            cy.get('#full_name').should('be.visible').then(() => {
                tempos.carregamentoPagina = (performance.now() - startCarregamento) / 1000;
            });
        });

        // preenche dos dados do usuário
        cy.then(() => {
            const startPreenchimento = performance.now();
            cy.get('#full_name').type('Teste Usuário', { delay: 100 });
            cy.get('#email').type('teste@email.com', { delay: 100 });
            cy.get('#phone').type('11999999999', { delay: 100 });
            cy.get('#zipcode').type('99999-999', { delay: 100 }).then(() => {
                // (defeito-01) verifica se os campos de endereço continuam desabilitados 
                cy.get('#street').should('be.disabled');
                cy.get('#neighborhood').should('be.disabled');
                cy.get('#city').should('be.disabled');
                cy.get('#state').should('be.disabled');
            });
            cy.get('#number').type('123', { delay: 100 });
            cy.get('#complement').type('portão azul', { delay: 100 }).then(() => {
                tempos.preenchimentoDados = (performance.now() - startPreenchimento) / 1000;
            });
        });

        // seleciona método de pagamento
        cy.then(() => {
            const startSelecaoPagamento = performance.now();
            cy.get('#__BVID__43___BV_tab_button__').click().then(() => {
                tempos.selecaoPagamento = (performance.now() - startSelecaoPagamento) / 1000;
            });
        });

        // preenche os dados do cartão de crédito
        cy.then(() => {
            const startInsercaoCartao = performance.now();
            cy.get('#card_number').type('4111111111111111', { delay: 100 });
            cy.get('#card_name').type('Teste Usuário', { delay: 100 });
            cy.get('#document').type('68095498033', { delay: 100 });
            cy.get('#card_expiration_month').select('12');
            cy.get('#card_expiration_year').select('2026');
            cy.get('#card_cvv').type('123', { delay: 100 }).then(() => {
                tempos.insercaoCartao = (performance.now() - startInsercaoCartao) / 1000;
            });
        });

        // finaliza a compra
        cy.then(() => {
            const startFinalizacao = performance.now();
            cy.get('button').contains('Comprar Agora').click().then(() => {
                tempos.finalizacaoCompra = (performance.now() - startFinalizacao) / 1000;
            });
        });

        // retorna o tempo de resposta no console
        cy.then(() => {
            cy.log('Tempos de execução:', tempos);
            console.log('Tempos de execução:', tempos);
        });
    });
});
