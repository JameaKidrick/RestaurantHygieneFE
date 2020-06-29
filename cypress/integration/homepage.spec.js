/* global cy */

describe('Home page renders', () => {
  it('Cypress can visit homepage', () => {
    cy.visit('/')
    cy.get('#hello-world').contains('Hello World!')
  })
})