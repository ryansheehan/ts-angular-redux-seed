import 'angular';
import 'angular-ui-router';
import 'ng-redux';
//import 'redux-ui-router';
import {registerRoutes} from './config/routes';
import createStore from './config/store';
import {registerComponents} from './components/index';

//'ngReduxUiRouter'

let app = angular.module('app', ['ui.router', 'ngRedux'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', registerRoutes])
    .config(['$ngReduxProvider', createStore]);

registerComponents(app);

export default app;
    


