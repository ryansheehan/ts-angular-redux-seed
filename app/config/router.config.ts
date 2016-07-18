import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';
import {ILocationProvider} from 'angular';
import {registerRoutes, HOME_ROUTE} from './routes/index';

export default class RouterConfig {
    static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    constructor($stateProvider: IStateProvider,
                $urlRouterProvider: IUrlRouterProvider,
                $locationProvider: ILocationProvider) {

        $urlRouterProvider.otherwise(HOME_ROUTE);

        registerRoutes($stateProvider);

        $locationProvider.html5Mode(true);
    }
}
