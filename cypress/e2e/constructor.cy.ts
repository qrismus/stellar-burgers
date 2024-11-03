describe('проверяем доступность приложения', () => {
    const testUrl = 'http://localhost:4000';
    it('сервис должен быть доступен по адресу localhost:4000', () => {
      cy.visit(testUrl);
    });
    beforeEach(() => {
        cy.visit(testUrl);
    
        cy.intercept('GET', 'api/ingredients', {
          fixture: 'ingredients.json'
        }).as(`${'getIngredients'}`);

        cy.intercept('GET', 'api/auth/user', {
            fixture: 'user.json'
          }).as(`${'getUser'}`);
        
        cy.wait('@getIngredients');
    });
    
    it('добавление ингредиента в конструктор', () => {
      const bun = cy.get('h3').contains('Булки').next('ul').contains('Добавить');
      const main = cy.get('h3').contains('Начинки').next('ul').contains('Добавить');
      bun.click();
      main.click();
    })

    it ('модалка', () => {
      const ingredient = cy.get('[data-cy="ingredients"]').find('li').first();
      ingredient.should('exist');
      ingredient.click();
      const button = cy.get(`[data-cy="closeButton"]`)
      button.click();
      ingredient.should('not.exist');
    })

    it('оформление заказа', () => {
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'user.json'
      }).as(`${'checkUserAuth'}`);
      cy.intercept('POST', 'api/orders', {
          fixture: 'order.json'
      }).as(`${'buildOrder'}`);
  
      cy.setCookie('accessToken', 'testToken');
      localStorage.setItem('refreshToken', 'testToken');
      localStorage.setItem('accessToken', 'testToken');
  
      cy.visit(testUrl);
  
      const bun = cy.get('h3').contains('Булки').next('ul').contains('Добавить');
      const main = cy.get('h3').contains('Начинки').next('ul').contains('Добавить');
      bun.click();
      main.click();
  
      const orderButton = cy.contains('Оформить заказ');
      orderButton.click();
      cy.contains('3127');
      cy.get('[data-cy="closeButton"]').click();
      cy.contains('37843').should('not.exist');
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    }); 
})
