describe('demo-e2e', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('測試標題', () => {
		cy.get(`[data-name="sssss"]`)
			.should('have.attr', 'limit-value')
			.and('equal', 'aaaaaaaaaa');
	});
});
