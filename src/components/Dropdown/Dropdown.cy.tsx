import React from 'react'
import Dropdown from './index'

describe('<Dropdown />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dropdown selectHandler={() => {}}/>)
  })
  it('Shows a loading message when waiting for response', () => {
    cy.mount(<Dropdown selectHandler={() => {}}/>)
    cy.get('div').should('contain.text', 'Loading')
  })
  it('Shows a dropdown with 20 entries', () => {
    cy.mount(<Dropdown selectHandler={() => {}}/>)
    cy.get('option').should('have.length', 20)
  })
})