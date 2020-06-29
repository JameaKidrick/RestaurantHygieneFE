/* global cy */

describe('Restaurant search form renders', () => {
  it('Cypress can visit find restaurant page', () => {
    cy.visit('/findrestaurant')
    cy.get('div').contains('Find a Restaurant')
  })
})

describe('Checks to see if form parts work', () => {
  it('Button should be disabled since form is not complete', () => {
    cy.get('button').should('have.attr', 'disabled', 'disabled')
  })

  it('Typing into and getting values from inputs work', () => {
    cy.get('form').within(() => {
      cy.get('input[name=userAddress]').type('123 Main Street').should('have.value', '123 Main Street')
      cy.get('input[name=userCity]').type('Boston').should('have.value', 'Boston')
      cy.get('select[name=userState]').select('Massachusetts').should('have.value', 'Massachusetts')
      cy.get('select[name=radius]').select('5 miles').should('have.value', '10000')
      cy.get('input[name=query]').type('pizza').should('have.value', 'pizza')
    })
  })

  it('Button should be enabled since form is complete', () => {
    cy.get('button').should('not.have.attr', 'disabled')
  })

  it('Checks that the submit button sends off information and results show', () => {
    cy.get('button').click()
    cy.get('.restaurant > h3').should((places) => {
      expect(places, '20').to.have.length(20)
    })
  })
})

describe('Unique form results', () => {
  it('No restaurant found', () => {
    cy.visit('/findrestaurant')
    cy.get('form').within(() => {
      cy.get('input[name=userCity]').type('New Orleans').should('have.value', 'New Orleans')
      cy.get('select[name=userState]').select('Ohio').should('have.value', 'Ohio')
      cy.get('select[name=radius]').select('5 miles').should('have.value', '10000')
      cy.get('input[name=query]').type('in-n-out').should('have.value', 'in-n-out')
    })
    cy.get('button').click()
    cy.get('#noResultsError').contains('No restaurants found within the desired radius.')
  })

  it('Data persists after no results', () => {
    cy.get('form').within(() => {
      cy.get('input[name=userCity]').should('have.value', 'New Orleans')
      cy.get('select[name=userState]').should('have.value', 'Ohio')
      cy.get('select[name=radius]').should('have.value', '10000')
      cy.get('input[name=query]').should('have.value', 'in-n-out')
    })
  })
})