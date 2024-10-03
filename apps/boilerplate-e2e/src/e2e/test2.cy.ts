describe('demo-e2e-test', () => {
	beforeEach(() => {
		cy.visit('/welcome');
	});

	it('驗證色碼', () => {
		cy.get('#welcome').children('h2')
			.should('contain.text', '#1D988A');
	});

	it('驗證引入組件', () => {
		cy.get('#welcome').prev('p')
			.should('contain.text', '我是標題');
	});
});
