describe('Snapshot test', () => {
    it('visits the root url', () => {
        cy.visit('/');
    });

    it('renders canvas that matches the default state', () => {
        // Remove the navigation bar because its offset messes up with the canvas screenshot below.
        cy.get('nav').then(($el) => $el.remove());

        cy.get('main canvas').toMatchImageSnapshot({
            name: 'canvas_snapshot',
        });
    });

    it('renders canvas that matches the modified paramN state', () => {
        cy.get('.InputRange--ParamN input.InputRange__NumberField')
            .clear({ force: true })
            .type('180', { force: true });

        cy.get('main canvas').toMatchImageSnapshot({
            name: 'canvas_snapshot',
        });
    });

    it('renders canvas that matches the modified paramL state', () => {
        cy.get('.InputRange--ParamL input.InputRange__NumberField')
            .clear({ force: true })
            .type('12', { force: true });

        cy.get('main canvas').toMatchImageSnapshot({
            name: 'canvas_snapshot',
        });
    });

    it('renders canvas that matches the modified paramLL state', () => {
        cy.get('.InputRange--ParamLL input.InputRange__NumberField')
            .clear({ force: true })
            .type('45', { force: true });

        cy.get('main canvas').toMatchImageSnapshot({
            name: 'canvas_snapshot',
        });
    });

    it('renders canvas that matches the modified paramM state', () => {
        cy.get('.InputRadio--ParamMSingle input')
            .click({ force: true });

        cy.get('main canvas').toMatchImageSnapshot({
            name: 'canvas_snapshot',
        });
    });

    it('renders canvas that matches the modified paramC state', () => {
        cy.get('.InputColor--ParamC input')
            .invoke('val', '#FD89FD')
            .trigger('input');

        cy.get('main canvas').toMatchImageSnapshot({
            name: 'canvas_snapshot',
        });
    });

    it('renders canvas that matches the modified paramN1 state', () => {
        cy.get('.InputRange--ParamN1 input.InputRange__NumberField')
            .clear({ force: true })
            .type('2', { force: true });

        cy.get('main canvas').toMatchImageSnapshot({
            name: 'canvas_snapshot',
        });
    });

    it('renders canvas that matches the modified paramN2 state', () => {
        cy.get('.InputRange--ParamN2 input.InputRange__NumberField')
            .clear({ force: true })
            .type('5', { force: true });

        cy.get('main canvas').toMatchImageSnapshot({
            name: 'canvas_snapshot',
        });
    });
});
