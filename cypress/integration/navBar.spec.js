/* global cy */

let username = ''

/************************* LOGGED OUT *************************/
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

/************************* LOGGED IN *************************/
describe('Creating a user to login with', () => {
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
  })
})

describe('Check that nav links work', () => {
  it('Find a Restaurant link works', () => {
    cy.contains('Find a Restaurant').click()
    cy.url().should('include', 'findrestaurant')
  })
  
  it('Home link works', () => {
    cy.contains('Home').click()
    cy.url().should('match', /[http://localhost:3000]/)
  })

  it('Log out link works', () => {
    cy.contains('Log out').click()
    cy.url().should('match', /[http://localhost:3000]/)
  })
})