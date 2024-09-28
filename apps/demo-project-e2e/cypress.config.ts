import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
	e2e: {
		...(nxE2EPreset(__filename, {
			cypressDir: 'src',
			bundler: 'vite',
		}) as Cypress.ConfigOptions['e2e']),
		baseUrl: 'http://localhost:4200',
	},
});
