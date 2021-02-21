describe('Integration test', () => {
    it('visits the root url', () => {
        cy.visit('/');
    });

    it('renders the navigation bar', () => {
        cy.contains('nav .navbar-brand', 'Stringulator');
        cy.contains('nav .nav-link', 'back2string.art');
    });

    it('renders the main area', () => {
        cy.get('input').should('have.length', 18);
        cy.get('main canvas').should('exist');
    });

    it('renders the footer', () => {
        cy.contains('footer button', 'Download');
    });
});
