
describe('It Renders', () => {


	it('renders', () => {
		cy.visit('/');
		cy.get('body', { timeout: 1000 }).should('be.visible');

		cy.get('h1', { timeout: 1000 }).then(($h1) => {
			console.log('H1 Text:', $h1.text());
			const text = $h1.text().trim();
			expect(text).to.match(/Min vecka/i);
		});
	});
});

describe('It adds a new todo item', () => {

	it('should add a new todo', () => {
		cy.visit('/)');
		cy.wait(500);
		cy.contains('h2', 'Måndag').parents('.day').within(() => {
			cy.get('input[name="title"]').type('Title');
			cy.get('textarea[name="desc"]').type('Description');
			cy.get('input[name="day"]').type('Monday', { force: true });
			cy.get('button[type="submit"]').click();
			cy.wait(2500); // so we can watch what happens, because man these tests are fast heh
		});
	});
});

describe('It edits a todo item', () => {
	it('should edit a todo item', () => {
		cy.visit('/)');
		cy.wait(500);
		cy.get('.prio-item').first().within(() => {
			cy.get('.btn.edit').contains('Ändra').click();
			cy.get('input[name="title"]').clear().type('update');
			cy.wait(1000);
			cy.get('textarea[name="desc"]').clear().type('refactor some code and stuff');
			cy.get('.btn.edit').contains('Spara').click();
			cy.wait(2500);
		});
	});
});

describe('It marks a todo item as done', () => {
	it('should mark a todo item as done', () => {
		cy.visit('/)');
		cy.wait(500);
		cy.get('.prio-item').first().within(() => {
			cy.get('.btn.complete').click();
			cy.wait(2500);
		});
	});
});

describe('It postpones a todo item', () => {
	it('should postpone a todo item', () => {
		cy.visit('/');
		cy.wait(500);
		cy.get('.prio-item').first().within(() => {
			cy.get('.btn.postpone').click();
			cy.wait(250);
		});
		// find the item in day task container, not the prio list.
		cy.contains('h3', 'Tisdag').next('.prio-items').within(() => {
			cy.get('.prio-item').should('exist');
			cy.wait(2500);
		});
	});
});

describe('It prioritizes a todo item', () => {
	it('should prioritize a todo item', () => {
		cy.visit('/');
		cy.wait(500);
		cy.contains('h3', 'Tisdag').next('.prio-items').within(() => {
			cy.get('.prio-item').first().within(() => {
				cy.get('.btn.prioritize').click();
				cy.wait(2500);
			});
		});
	});
});

describe('It deletes a todo item', () => {
	it('should delete the second item', () => {
		cy.visit('/');
		cy.wait(500);
		cy.contains('h3', 'Måndag').next('.prio-items').within(() => {
			cy.get('.prio-item').should('have.length.greaterThan', 1).eq(1).within(() => {
				cy.get('.btn.delete').click();
				cy.wait(2500);
			});
		});
	});
});


describe('clear the entire week by wiping the database', () => {
	it('should clear the week', () => {
		cy.visit('/');
		cy.wait(500);
		cy.get('.restart-week').click();
		cy.wait(2500);
		cy.get('.prio-item').each(($item) => {
			cy.wrap($item).find('.btn.complete').should('contain.text', 'Klar');
		});
	});
});
