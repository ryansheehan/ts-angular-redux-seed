import 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'ng-redux';
import 'redux-ui-router';
import {registerRoutes} from './config/routes';
import createStore from './config/store';
import {registerComponents} from './components/index';
import {registerServices} from "./services/index";


let app = angular.module('app', ['ngMaterial', 'ui.router', 'ngRedux', 'ng-ui-router-middleware'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', registerRoutes])
    .config(['$ngReduxProvider', createStore]);

registerServices(app);
registerComponents(app);

export default app;
    


