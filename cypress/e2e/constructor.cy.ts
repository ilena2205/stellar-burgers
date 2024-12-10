import * as order from '../fixtures/order.json';

const dataCyOrderButton = '[data-cy-orderButton]';
const dataCyIngredients = '[data-cy-ingredients]';
const modals = '#modals';

describe('проверка приложения магазина бургеров', function() {

    beforeEach(() => {
        cy.visit('http://localhost:4000');
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' })
    });

    it('сервис должен быть доступен по адресу localhost:4000', () => {
        cy.visit('http://localhost:4000'); 
    });

    it('ингредиенты загрузились', () => {
        cy.get('[data-cy="bun"]').should('have.length', 1);
        cy.get('[data-cy="main"]').should('have.length', 1);
        cy.get('[data-cy="sauce"]').should('have.length', 1);
    });

    it('добавление ингредиентов', () => {
      cy.get('[data-cy="bun"] button').click();
      cy.get(`${dataCyIngredients} div:nth-of-type(1)`).should('not.have.text');
      cy.get('[data-cy="main"] button').click();
      cy.get(`${dataCyIngredients} div:nth-of-type(2)`).should('not.have.text');
    });

    describe('открытие модального окна', () => {
        it('открытие карточки', () => {
          cy.get('[data-cy="bun"]').click();
          cy.get(modals).children().should('have.length', 2);
        });
    });

    describe('закрытие модального окна', () => {
        it('Кнопка закрыть', () => {
          cy.get('[data-cy="bun"]').click();
          cy.get(`${modals} button`).click();
          cy.get(modals).children().should('have.length', 0);
        });
  
        it('Нажать вне окна', () => {
          cy.get('[data-cy="bun"]').click();
          cy.get(`${modals}>div:nth-of-type(2)`).click({ force: true });
          cy.get(modals).children().should('have.length', 0);
        });
    });

      

    describe('оформление заказа', () => {
      beforeEach(() => {
        cy.setCookie('accessToken', 'ACCESS_TOKEN');
        localStorage.setItem('refreshToken', 'REFRESH_TOKEN');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
        cy.intercept('POST', 'api/orders', { fixture: 'order' });
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
        cy.visit('http://localhost:4000');
      });
    
      it('оформить', () => {
          cy.get('[data-cy="bun"] button').click();
          cy.get(`${dataCyIngredients} div:nth-of-type(1)`).should('not.have.text');
          cy.get('[data-cy="main"] button').click();
          cy.get(`${dataCyIngredients} div:nth-of-type(2)`).should('not.have.text')
          cy.get(dataCyOrderButton).click();
          cy.get(modals).children().should('have.length', 2);
          cy.get(`${modals} h2:first-of-type`).should(
            'have.text',
            order.order.number
          );
          cy.get(`${modals} button`).click();
          cy.get(`${dataCyIngredients} div:nth-of-type(1)`).should('have.text',
            'Выберите булкиВыберите начинку0');
          cy.get(`${dataCyIngredients} div:nth-of-type(2)`).should('have.text',
            'Выберите булки')
      });
    
      afterEach(() => {
          cy.clearCookie('accessToken');
          localStorage.removeItem('refreshToken');
        });
      });
}); 