/// <reference types="cypress" />
import '@4tw/cypress-drag-drop';

describe("visit constructor page", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("open and close ingredient modal", () => {
    cy.get("h1").should("contain", "те бургер");
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733c7"]').click();
    cy.get('[data-test-id=close-modal]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733c6"]').click();
    cy.get('[data-test-id=close-modal]').click();
    /* ==== End Cypress Studio ==== */
  })

  it('should dragndrop', () => {
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733cd"]')
      .drag("[data-test-id=constructor-container]")
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733c7"]')
      .drag("[data-test-id=constructor-container]")
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733cd"]')
      .drag("[data-test-id=constructor-container]")
  })

  it('should drag-n-drop, push order btn, login, push order => open modal, close modal', () => {
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733c7"]')
      .drag("[data-test-id=constructor-container]")
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733cd"]')
      .drag("[data-test-id=constructor-container]")

    cy.contains('Оформить заказ').click();
    cy.get(':nth-child(2) > .input > .input__textfield').clear();
    cy.get(':nth-child(2) > .input > .input__textfield').type('rere1@yandex.ru');
    cy.get(':nth-child(3) > .input > .input__textfield').clear();
    cy.get(':nth-child(3) > .input > .input__textfield').type('1{enter}');
    cy.contains('Оформить заказ').click();
    cy.get('[data-test-id=close-modal]').click();
  })
})
