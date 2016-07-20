import {IStateProvider, IUrlRouterProvider, IState, IStateParamsService} from 'angular-ui-router';
import {ILocationProvider, IAngularEvent, IRootScopeService} from 'angular';
import {registerRoutes, States} from './routes/index';
import {INgRedux} from "ng-redux";
import {stateGo} from "redux-ui-router";
import {IRouterState} from "./routes/state.interface";

export let routerErrorManager = ['$rootScope', '$ngRedux',
    ($rootScope: IRootScopeService, $ngRedux:INgRedux) => {
        function errorHandler(event: IAngularEvent, toState: IState, toParams: IStateParamsService, fromState: IState, fromParams: IStateParamsService, error:Error) {
            event.preventDefault();
            const state = toState as IRouterState;
            const redirectTo = state && state.data && state.data.redirectTo ? state.data.redirectTo : States.HOME.name;
            $ngRedux.dispatch(stateGo(redirectTo));
        }

        $rootScope.$on('$stateChangeError', errorHandler);
    }
];

export default class RouterConfig {
    static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    constructor($stateProvider: IStateProvider,
                $urlRouterProvider: IUrlRouterProvider,
                $locationProvider: ILocationProvider) {

        $urlRouterProvider.otherwise(States.HOME.url);

        registerRoutes($stateProvider);

        $locationProvider.html5Mode(true);
    }
}
