/// <reference types="cypress" />

context('API Testing', () => {
    beforeEach(() => {
        cy.fixture('cars').then((cars) => {
            cy.request('POST', '/reset', cars);
        })
    });

    it('should test cars json schema - GET /cars', () => {
        // Alias
        cy.request('GET', '/cars').as('cars');
        cy.get('@cars').should((response) => {
            expect(response.status).to.eq(200);

            response.body.forEach(car => {
                expect(car).to.have.all.keys(
                    'id', 
                    'brand', 
                    'model', 
                    'color',
                    'year'
                );
            });
        });
    });

    it('should add a car - POST /cars', () => {
        cy.fixture('car').then((car) => {
            cy.request('POST', '/cars', car);
        })
    });
});