import 'angular';
import 'angular-ui-router';
import {registerRoutes} from './config/routes';
import {registerComponents} from './components/index';

let app = angular.module('app', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', registerRoutes]);

registerComponents(app);

export default app;
    


