import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {

		supportFile: 'cypress/support/e2e.js',
		baseUrl: 'http://localhost:5173',
	},
	component: {
		devServer: {
			framework: "react",
			bundler: "vite",
		},
	},
});