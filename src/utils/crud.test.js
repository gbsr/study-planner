import { test, expect, vi } from 'vitest';
import { addTodo, getTodos, updateTodo } from './crud';
import { addDoc, collection, doc, updateDoc, query, orderBy, getDocs } from 'firebase/firestore';

// Mock fireastore so I don't need to use actual firestore database for test cases
vi.mock('firebase/firestore', () => ({
	addDoc: vi.fn(),
	collection: vi.fn(() => ({ id: 'todos', path: 'todos' })),
	doc: vi.fn(() => ({ id: 'todoId', path: 'todos/todoId' })),
	updateDoc: vi.fn(),
	getFirestore: vi.fn(() => ({ db: 'mockedDbInstance' })),
	query: vi.fn(),
	orderBy: vi.fn(),
	getDocs: vi.fn(),
}));

// mock db instance
const mockDb = { db: 'mockedDbInstance' };

test('should be able to add a todo item', async () => {
	const mockAddDoc = vi.mocked(addDoc);
	const mockCollection = vi.mocked(collection);

	const todo = {
		title: 'title',
		desc: 'desc',
		done: 'done',
		late: 'late',
		date: 'date',
		dayOfWeek: 'dayOfWeek',
	};

	const expectedTodoDoc = {
		title: todo.title,
		desc: todo.desc,
		done: todo.done,
		late: todo.late,
		date: todo.date,
		dayOfWeek: todo.dayOfWeek,
	};

	await addTodo(todo);

	expect(mockCollection).toHaveBeenCalledWith(mockDb, "todos");
	expect(mockAddDoc).toHaveBeenCalledWith({ id: 'todos', path: 'todos' }, expectedTodoDoc);
});

test('should be able to update a todo item', async () => {
	const mockDoc = vi.mocked(doc);
	const mockUpdateDoc = vi.mocked(updateDoc);

	const todo = {
		id: 'todoId',
		title: 'title',
		desc: 'desc',
		done: 'done',
		late: 'late',
		date: 'date',
		dayOfWeek: 'dayOfWeek',
	};

	const expectedTodoDoc = {
		title: todo.title,
		desc: todo.desc,
		done: todo.done,
		late: todo.late,
		date: todo.date,
		dayOfWeek: todo.dayOfWeek,
	};

	await updateTodo(todo);

	expect(mockDoc).toHaveBeenCalledWith(mockDb, "todos", todo.id);
	expect(mockUpdateDoc).toHaveBeenCalledWith({ id: 'todoId', path: 'todos/todoId' }, expectedTodoDoc);
});

test('should be able to get all todo items', async () => {
	const mockGetDocs = vi.mocked(getDocs);

	// Setup mock documents as Firestore would return them
	const mockTodos = [
		{ id: 'todoId1', data: () => ({ title: 'title1', desc: 'desc1', done: 'done1', late: 'late1', date: 'date1', dayOfWeek: 'dayOfWeek1' }) },
		{ id: 'todoId2', data: () => ({ title: 'title2', desc: 'desc2', done: 'done2', late: 'late2', date: 'date2', dayOfWeek: 'dayOfWeek2' }) },
	];

	const mockQuerySnapshot = {
		forEach: (callback) => mockTodos.forEach(doc => callback(doc)),
	};

	mockGetDocs.mockResolvedValue(mockQuerySnapshot);

	// Perform the actual test
	const todos = await getTodos();

	const expectedTodos = mockTodos.map(doc => ({ id: doc.id, ...doc.data() }));

	expect(todos).toEqual(expectedTodos);
});
