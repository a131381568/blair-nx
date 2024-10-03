import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
	e2e: {
		...(nxE2EPreset(__filename, {
			cypressDir: 'src',
			bundler: 'vite',
		}) as Cypress.ConfigOptions['e2e']),
		baseUrl: 'http://localhost:4200',
		retries: {
			runMode: 0,
			openMode: 0,
		},
		viewportWidth: 1920,
		viewportHeight: 1080,
		video: false,
		videoCompression: 32,
		experimentalMemoryManagement: true,
		chromeWebSecurity: false,
		experimentalWebKitSupport: true,
		screenshotOnRunFailure: false,
		trashAssetsBeforeRuns: true,
		experimentalInteractiveRunEvents: true,
		defaultCommandTimeout: 10000,
		execTimeout: 60000,
		pageLoadTimeout: 60000,
		requestTimeout: 15000,
		responseTimeout: 15000,
		numTestsKeptInMemory: 0,
		experimentalOriginDependencies: true,
		experimentalModifyObstructiveThirdPartyCode: true,
	},
});
