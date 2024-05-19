import { test, assert } from 'vitest';
import { getCurrentDate } from './date';

test('getCurrentDate returns the current date in YYYY-MM-DD format', () => {
	const currentDate = getCurrentDate();
	assert(currentDate.length === 10);
	assert(currentDate[4] === '-');
	assert(currentDate[7] === '-');
});

// also regex version for brevity
test('getCurrentDate returns the current date in YYYY-MM-DD format by regex expression', () => {
	const currentDate = getCurrentDate();
	const expectedFormat = /^\d{4}-\d{2}-\d{2}$/;
	assert(expectedFormat.test(currentDate));
});

