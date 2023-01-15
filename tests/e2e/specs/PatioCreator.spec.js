describe('PatioCreator', () => {
    beforeEach(function () {
      cy.visit('http://localhost:8080/#/patio-creator/new')
    })
  
    it(`should NOT save too short project name`, () => {
      cy.get('[data-cy-name-input]').type('abc')
      cy.get('[data-cy-save-project-btn]').click()
      cy.contains('name is too short')
    })

    it(`should NOT save too long project name`, () => {
      cy.get('[data-cy-name-input]').type('too long name for a project')
      cy.get('[data-cy-save-project-btn]').click()
      cy.contains('name is too long')
    })

    it(`should check if user can save project with containing numbers && letters`, () => {
      cy.get('[data-cy-name-input]').type('My Patio11')
      cy.get('[data-cy-save-project-btn]').click()
      cy.contains('Project Saved')
    })

    it(`should check if user is redirected to projects list after save`, () => {
      cy.get('[data-cy-name-input]').type('My Patio12')
      cy.get('[data-cy-save-project-btn]').click()
      cy.url().should('include', '/projects')
    })
  })