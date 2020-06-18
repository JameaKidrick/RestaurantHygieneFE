/* global cy */

let username = ''

describe('Register form renders', () => {
  it('Cypress can visit registration page', () => {
    cy.visit('/register')
    // cy.get('#hello-world').contains('Hello World!')
  })
})

describe('Checks to see if form parts work', () => {
  let num = Math.random()
  username = `JaneDoe${num}`
  it('Typing into and getting values from inputs work', () => {
    cy.visit('/register')
    cy.get('form').within(() => {
      cy.get('input[name=first_name]').type('Jane').should('have.value', 'Jane')
      cy.get('input[name=last_name]').type('Doe').should('have.value', 'Doe')
      cy.get('input[name=username]').type(`JaneDoe${num}`).should('have.value', `JaneDoe${num}`)
      cy.get('input[name=password]').type('password').should('have.value', 'password')
    })
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
})