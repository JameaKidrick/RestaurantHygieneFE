/* global cy */

describe('Check that nav links work', () => {
  it('Find a Restaurant link works', () => {
    cy.visit('/')
    cy.contains('Find a Restaurant').click()
    cy.url().should('include', 'findrestaurant')
  })

  it('Signup link works', () => {
    cy.contains('Signup').click()
    cy.url().should('include', 'register')
  })

  it('Log in link works', () => {
    cy.contains('Log in').click()
    cy.url().should('include', 'login')
  })

  it('Home link works', () => {
    cy.contains('Home').click()
    cy.url().should('match', /[http://localhost:3000]/)
  })
})