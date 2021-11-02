import { version } from '../../../package.json';

describe('Integration test', () => {
    it('visits the root url', () => {
        cy.visit('/');
    });

    it('renders the navigation bar', () => {
        cy.contains('nav .navbar-brand', 'Stringulator');
        cy.contains('nav .text-muted', 'Quick & dirty circular string art simulator');
        cy.get('nav .nav-link').should('have.attr', 'title', 'Github');
    });

    it('renders the main area', () => {
        cy.get('main input').should('have.length', 22);
        cy.get('main button').should('have.length', 4);
        cy.get('main canvas').should('exist');
    });

    it('renders the footer', () => {
        cy.contains('footer .StringulatorFooter__Lines', '600 lines');
        cy.contains('footer .StringulatorFooter__Version', version);
    });

    it('supports download', () => {
        cy.get('button[type="submit"]').click({ force: true });
        cy.get('a[download]').should('have.attr', 'download', 'stringulator-4c23d1dc.png')
            .should('have.attr', 'href')
            .and('match', /^data:image\/png;base64/);
    });

    it('supports sharing', () => {
        cy.get('.toast').should('not.be.visible');
        cy.get('button.CopyToClipboard').click({ force: true });
        cy.get('.toast').should('be.visible')
            .contains('Share link copied to clipboard.');

        // To properly wait for the toast to hide, we have to pipe the click and continue clicking until it works.
        //   In some test runs, the runner will try to click 17 times on the button, until it works!
        //   More info here: https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
        const click = $el => $el.click();
        cy.get('button.btn-close').pipe(click)
            .should('not.be.visible').then(() => {
                cy.get('.toast').should('not.be.visible');
            });
    });

    it('supports resetting', () => {
        cy.get('.InputRange--ParamN input.InputRange__NumberField')
            .clear({ force: true })
            .type('180', { force: true });
        cy.get('.InputRange--ParamL input.InputRange__NumberField')
            .clear({ force: true })
            .type('12', { force: true });
        cy.get('.InputRange--ParamLL input.InputRange__NumberField')
            .clear({ force: true })
            .type('45', { force: true });
        cy.get('.InputColor--ParamC input').eq(0)
            .invoke('val', '#fd89fd')
            .trigger('input');
        cy.get('.InputRadio--ParamMSingle input')
            .click({ force: true });
        cy.get('.InputRange--ParamN1 input.InputRange__NumberField')
            .clear({ force: true })
            .type('2', { force: true });
        cy.get('.InputRange--ParamN2 input.InputRange__NumberField')
            .clear({ force: true })
            .type('5', { force: true });

        cy.get('button[type="reset"]').click({ force: true });

        cy.get('.InputRange--ParamN input.InputRange__NumberField')
            .should('have.value', '120');
        cy.get('.InputRange--ParamL input.InputRange__NumberField')
            .should('have.value', '10');
        cy.get('.InputRange--ParamLL input.InputRange__NumberField')
            .should('have.value', '60');
        cy.get('.InputColor--ParamC input')
            .should('have.value', '#fd7f7c');
        cy.get('.InputRadio--ParamMMultiple input')
            .should('have.value', 'multiple');
        cy.get('.InputRange--ParamN1 input.InputRange__NumberField')
            .should('have.value', '1');
        cy.get('.InputRange--ParamN2 input.InputRange__NumberField')
            .should('have.value', '3');
    });
});
