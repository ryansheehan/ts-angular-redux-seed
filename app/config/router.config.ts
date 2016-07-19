import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';
import {ILocationProvider} from 'angular';
import {registerRoutes} from './routes/index';

export default class RouterConfig {
    static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'ROUTE_HOME_URL'];

    constructor($stateProvider: IStateProvider,
                $urlRouterProvider: IUrlRouterProvider,
                $locationProvider: ILocationProvider,
                ROUTE_HOME_URL: string) {

        $urlRouterProvider.otherwise(ROUTE_HOME_URL);

        registerRoutes($stateProvider);

        $locationProvider.html5Mode(true);
    }
}
