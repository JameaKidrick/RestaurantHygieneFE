/* global cy */

let username = ''

describe('Log in form renders', () => {
  it('Cypress can visit log in page', () => {
    cy.visit('/login')
    cy.get('#goToRegister').contains('Click to register')
  })
})

describe('Checks to see if form parts work', () => {
  let num = Math.random()
  username = `JaneDoe${num}`
  it('Creating a user to test login', () => {
    cy.visit('/register')
    cy.get('form').within(() => {
      cy.get('input[name=first_name]').type('Jane').should('have.value', 'Jane')
      cy.get('input[name=last_name]').type('Doe').should('have.value', 'Doe')
      cy.get('input[name=username]').type(`JaneDoe${num}`).should('have.value', `JaneDoe${num}`)
      cy.get('input[name=password]').type('password').should('have.value', 'password')
    })
    cy.get('button').click()
    cy.contains('Log out').click()
  })

  it('Button should be disabled since form is not complete', () => {
    cy.visit('/login')
    cy.get('button').should('have.attr', 'disabled', 'disabled')
  })

  it('Typing into and getting values from inputs work', () => {
    cy.get('form').within(() => {
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
  it('Username is incorrect', () => {
    cy.visit('/login')
    cy.get('form').within(() => {
      cy.get('input[name=username]').type('WrongUsername').should('have.value', 'WrongUsername')
      cy.get('input[name=password]').type('password').should('have.value', 'password')
    })
    cy.get('button').click()
    cy.get('#loginError').contains('Invalid credentials: Please check your username and try again.')
  })

  it('Data persists after username error', () => {
    cy.get('form').within(() => {
      cy.get('input[name=username]').should('have.value', `WrongUsername`)
      cy.get('input[name=password]').should('have.value', 'password')
    })
  })

  it('Password is incorrect', () => {
    cy.visit('/login')
    cy.get('form').within(() => {
      cy.get('input[name=username]').type(username).should('have.value', username)
      cy.get('input[name=password]').type('WrongPassword').should('have.value', 'WrongPassword')
    })
    cy.get('button').click()
    cy.get('#loginError').contains('Invalid credentials: Please check your password and try again.')
  })

  it('Data persists after password error', () => {
    cy.get('form').within(() => {
      cy.get('input[name=username]').should('have.value', username)
      cy.get('input[name=password]').should('have.value', 'WrongPassword')
    })
  })
})