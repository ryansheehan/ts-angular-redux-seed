System.config({
	map: {
		app: 'app',
		angular: 'node_modules/angular',
		redux: 'node_modules/redux/src',
		angular-ui-router: 'node_modules/angular-ui-router/release',
		redux-ui-router: 'node_modules/redux-ui-router/src',
		immutable: 'node_modules/immutable/dist',
		moment: 'node_modules/moment'
	},

	packages: {
		'app': { main: 'app.js', format: 'cjs', defaultExtension: 'js' },
		'angular': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
		'redux': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
		'angular-ui-router': { main: 'angular-ui-router.js', format: 'global', defaultExtension: 'js'},
		'redux-ui-router': { main: 'index.js', format: 'cjs', defaultExtension:'js' },
		'immutable': { main: 'immutable.js', format: 'global', defaultExtension:'js' },
		'moment': { main: 'moment.js', format: 'global', defaultExtension:'js' }
	}
});