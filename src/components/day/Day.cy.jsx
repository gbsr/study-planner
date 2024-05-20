import React from 'react'
import Day from './Day'

describe('<Day />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Day />)
  })
})