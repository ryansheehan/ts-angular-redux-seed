System.config({
    baseURL: "/",
    defaultJSExtensions: true,

	map: {
		'app': 'app',
		'angular': 'node_modules/angular',
		'redux': 'node_modules/redux/dist',
		'redux-thunk': 'node_modules/redux-thunk/dist',
        'ng-redux': 'node_modules/ng-redux/dist',
		'angular-ui-router': 'node_modules/angular-ui-router/release',
		'redux-ui-router': 'node_modules/redux-ui-router/src',
		'immutable': 'node_modules/immutable/dist',
		'moment': 'node_modules/moment',
		'angular-material': 'node_modules/angular-material',
		'angular-animate': 'node_modules/angular-animate',
		'angular-aria': 'node_modules/angular-aria'
	},

	packages: {
		'app': { main: 'app.module.js' },
		'angular': { main: 'index.js' },
		'redux': { main: 'redux.js' },
		'redux-thunk': { main: 'redux-thunk.js' },
        'ng-redux': { main: 'ng-redux.js' },
		'angular-ui-router': { main: 'angular-ui-router.js' },
		'redux-ui-router': { main: 'index.js' },
		'immutable': { main: 'immutable.js' },
		'moment': { main: 'moment.js' },
		'angular-material': { main: 'index.js' },
		'angular-animate': { main: 'index.js' },
		'angular-aria': { main: 'index.js' }
	}


});