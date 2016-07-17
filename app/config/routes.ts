import {IStateProvider, IUrlRouterProvider, IStateParamsService, IStateOptions} from 'angular-ui-router';
import {ILocationProvider, IRootScopeService, IAngularEvent} from 'angular';
import {INgRedux} from "ng-redux/index";
import {IRootState} from "../state/index";
import {findUser} from "../actions/users.actions";
import {IState} from "angular-ui-router";


/*
function checkFreshNavigation($ngRedux:INgRedux): boolean {
    let routerState = this.$ngRedux.getState() as IRouterState;
    let lastRouterState = routerState.router.prevState as IState;

    // if we come freshly navigated to the component then fetch the users
    if(lastRouterState.name === "" && lastRouterState.url === "^" && lastRouterState.views === null && lastRouterState.abstract === true) {
        return true;
    }
    return false;
}
*/

export function registerRoutes($stateProvider: IStateProvider,
                               $urlRouterProvider: IUrlRouterProvider,
                               $locationProvider: ILocationProvider,
                               $rootScope: IRootScopeService){
    
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            template: `<tar-home></tar-home>`
        })
        .state('about', {
            url: "/about",
            template: `<tar-about></tar-about>`
        })
        .state('users', {
            url: "/users",
            template: `<tar-users flex layout="column"></tar-users>`,
        })
        .state('user', {
            url: "/users/{username}",
            template: `<tar-user user="$resolve.user"></tar-user>`,
            resolve: {
                user: ($stateParams: IStateParamsService, $ngRedux:INgRedux) => {
                    let state = $ngRedux.getState() as IRootState;
                    let users = state.users;
                    let username = $stateParams['username'];
                    return findUser(users, username);
                }
            }
        });

    $locationProvider.html5Mode(true);

    // $rootScope.$on('$stateChangeStart',
    //     (e: IAngularEvent,
    //      toState: IState,
    //      toParams: IStateParamsService,
    //      fromState: IState,
    //      fromParmas: IStateParamsService,
    //      options: IStateOptions):void => {
    //
    //
    //
    // })
}
