/// <reference types="cypress" />
import '@4tw/cypress-drag-drop';

describe("visit constructor page", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("open and close ingredient modal", () => {
    cy.get("h1").should("contain.text", "те бургер");
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733c7"] > img').click();
    cy.get('.modal_close__1Iez6 > svg').click();
    /* ==== End Cypress Studio ==== */
    // cy.not.contains('Pay electric bill')
  })

  it('should dragndrop', () => {
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733cd"] > img')
      .drag(".burger-constructor_cart__36NRg")
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733c7"] > img')
      .drag(".burger-constructor_cart__36NRg")
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733cd"] > img')
      .drag(".burger-constructor_cart__36NRg")
  })

  it('should drag-n-drop, push order btn, login, push order => open modal, close modal', () => {
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733c7"] > img')
      .drag(".burger-constructor_cart__36NRg")
    cy.get('[href="#/ingredients/60d3b41abdacab0026a733cd"] > img')
      .drag(".burger-constructor_cart__36NRg")

    cy.get('.button_button__33qZ0').click();
    cy.get(':nth-child(2) > .input > .input__textfield').clear();
    cy.get(':nth-child(2) > .input > .input__textfield').type('rere1@yandex.ru');
    cy.get(':nth-child(3) > .input > .input__textfield').clear();
    cy.get(':nth-child(3) > .input > .input__textfield').type('1{enter}');
    cy.contains('Оформить заказ').click();
    cy.get('.modal_close__1Iez6 > svg').click();
  })
})
