import {registerRoutes, States} from './routes/index';
import {INgRedux} from "ng-redux";
import {stateGo} from "redux-ui-router";
import {IRouterState} from "./routes/state.interface";
import * as angular from "angular";

export let routerErrorManager = ['$rootScope', '$ngRedux',
    ($rootScope: angular.IRootScopeService, $ngRedux:INgRedux) => {
        function errorHandler(event: angular.IAngularEvent,
                              toState: angular.ui.IState,
                              toParams: angular.ui.IStateParamsService,
                              fromState: angular.ui.IState,
                              fromParams: angular.ui.IStateParamsService,
                              error:Error) {
            event.preventDefault();
            console.error(error);
            const state = toState as IRouterState;
            const redirectTo = state && state.data && state.data.redirectTo ? state.data.redirectTo : States.HOME.name;
            $ngRedux.dispatch(stateGo(redirectTo));
        }

        $rootScope.$on('$stateChangeError', errorHandler);
    }
];

export default class RouterConfig {
    static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    constructor($stateProvider: angular.ui.IStateProvider,
                $urlRouterProvider: angular.ui.IUrlRouterProvider,
                $locationProvider: angular.ILocationProvider) {

        $urlRouterProvider.otherwise(States.HOME.url);

        registerRoutes($stateProvider);

        $locationProvider.html5Mode(true);
    }
}
