/* global cy */

let username = ''

describe('Register form renders', () => {
  it('Cypress can visit registration page', () => {
    cy.visit('/register')
    cy.get('#goToLogin').contains('Click to login')
  })
})

describe('Checks to see if form parts work', () => {
  let num = Math.random()
  username = `JaneDoe${num}`
  it('Button should be disabled since form is not complete', () => {
    cy.visit('/register')
    cy.get('button').should('have.attr', 'disabled', 'disabled')
  })
  
  it('Typing into and getting values from inputs work', () => {
    cy.get('form').within(() => {
      cy.get('input[name=first_name]').type('Jane').should('have.value', 'Jane')
      cy.get('input[name=last_name]').type('Doe').should('have.value', 'Doe')
      cy.get('input[name=username]').type(username).should('have.value', username)
      cy.get('input[name=password]').type('password').should('have.value', 'password')
    })
  })
  
  it('Button should be enabled since form is complete', () => {
    cy.get('button').should('not.have.attr', 'disabled')
  })
  
  it('Checks that the submit button sends off information and the page redirects', () => {
    cy.get('button').click()
    cy.url().should('match', /[http://localhost:3000]/)
  })
})

describe('Form errors', () => {
  it('Username already in use error', () => {
    cy.visit('/register')
    cy.get('form').within(() => {
      cy.get('input[name=first_name]').type('Jane').should('have.value', 'Jane')
      cy.get('input[name=last_name]').type('Doe').should('have.value', 'Doe')
      cy.get('input[name=username]').type(`user1`).should('have.value', `user1`)
      cy.get('input[name=password]').type('password').should('have.value', 'password')
    })
    cy.get('button').click()
    cy.get('#registerError').contains('There is already a user with that username in the database. Please choose a new username.')
  })
  
  it('Data persists after username error', () => {
    cy.get('form').within(() => {
      cy.get('input[name=first_name]').should('have.value', 'Jane')
      cy.get('input[name=last_name]').should('have.value', 'Doe')
      cy.get('input[name=username]').should('have.value', `user1`)
      cy.get('input[name=password]').should('have.value', 'password')
    })
  })
})