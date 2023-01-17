import React from 'react'
import Details from './index'
import { capitalize } from 'lib'

describe('<Details />', () => {
  const pokemon = 'bulbasaur'
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Details />)
    cy.get('p').should('have.text', 'Select a pokemon from the dropdown above')
  })
  it('renders Pokemon passed in pokemon prop', () => {
    cy.mount(<Details pokemon={pokemon}/>)
    cy.get('p').should('have.text', 'loading...')
    cy.get('h1').should('contain.text', capitalize(pokemon) )
  })
  it('Displays Pokemon abilities and stats', () => {
    cy.mount(<Details pokemon={pokemon}/>)
    cy.get('p').should('have.text', 'loading...')
    cy.get('h2').should('contain.text', 'Abilities')
    cy.get('li').should('contain.text', 'chlorophyll')
    cy.get('h2').should('contain.text', 'Stats')
    cy.get('li').should('contain.text', 'HP')
  })
})