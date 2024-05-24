describe('Study Planner', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('renders', () => {
		cy.get('body', { timeout: 1000 }).should('be.visible');

		cy.get('h1', { timeout: 1000 }).then(($h1) => {
			console.log('H1 Text:', $h1.text());
			const text = $h1.text().trim();
			expect(text).to.match(/Min vecka/i);
		});
	});

	it('should add a new todo', () => {
		cy.contains('h2', 'Måndag').parents('.day').within(() => {
			cy.get('input[name="title"]').type('Test Title');
			cy.get('textarea[name="desc"]').type('Test Description');
			cy.get('input[name="day"]').type('Monday', { force: true });
			cy.get('button[type="submit"]').click();
		});
	});

	it('should edit a todo item', () => {
		cy.get('.prio-item').first().within(() => {
			cy.get('.btn.edit').contains('Ändra').click();
			cy.get('input[name="title"]').clear().type('Edited Title');
			cy.get('textarea[name="desc"]').clear().type('Edited Description');
			cy.get('.btn.edit').contains('Spara').click();
		});
	});

	it('should mark a todo item as done', () => {
		cy.get('.prio-item').first().within(() => {
			cy.get('.btn.complete').click();
		});
	});

	it('should postpone a todo item', () => {
		cy.get('.prio-item').first().within(() => {
			cy.get('.btn.postpone').click();
		});
	});

	it('should prioritize a todo item', () => {
		cy.get('.prio-item').first().within(() => {
			cy.get('.btn.prioritize').click();
		});
	});

	it('should postpone an item', () => {
		cy.get('.prio-item').first().within(() => {
			cy.get('.btn.postpone').click();
		});
	});

	it('should delete the second item', () => {
		cy.get('.prio-item').eq(1).within(() => {
			cy.get('.btn.delete').click();
		});
	});
});