describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.get('select').select('bulbasaur')
    cy.get('button').click()
    cy.get('input.input-number').type('123')
    cy.get('input.input-submit').click()
    cy.get('.error').should('exist')
  })
})

//fixes ts error
export {}