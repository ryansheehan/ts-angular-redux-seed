import {IStateProvider, IUrlRouterProvider, IState, IStateParamsService} from 'angular-ui-router';
import {ILocationProvider, IAngularEvent, IRootScopeService} from 'angular';
import {registerRoutes} from './routes/index';
import {INgRedux} from "ng-redux";
import {stateGo} from "redux-ui-router";
import {IRouterState} from "./routes/state.interface";

export let routerErrorManager = ['$rootScope', 'ROUTE_HOME_NAME', '$ngRedux',
    ($rootScope: IRootScopeService, ROUTE_HOME_NAME:string, $ngRedux:INgRedux) => {
        function errorHandler(event: IAngularEvent, toState: IState, toParams: IStateParamsService, fromState: IState, fromParams: IStateParamsService, error:Error) {
            event.preventDefault();
            const state = toState as IRouterState;
            const redirectTo = state && state.data && state.data.redirectTo ? state.data.redirectTo : ROUTE_HOME_NAME;
            $ngRedux.dispatch(stateGo(redirectTo));
        }

        $rootScope.$on('$stateChangeError', errorHandler);
    }
];

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
