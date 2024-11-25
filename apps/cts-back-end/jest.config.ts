export default {
	displayName: 'cts-back-end',
	preset: '../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	moduleNameMapper: {
		'@cts-shared': '<rootDir>/../../libs/cts-shared/index.ts',
		'@cts-shared/(.*)': '<rootDir>/../../libs/cts-shared/$1',
	},
	coverageDirectory: '../../coverage/apps/cts-back-end',
};
