import React from 'react'
import DayCard from './DayCard'

describe('<DayCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DayCard />)
  })
})