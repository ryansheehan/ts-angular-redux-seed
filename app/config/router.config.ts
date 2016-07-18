import {IStateProvider, IUrlRouterProvider, IStateParamsService} from 'angular-ui-router';
import {ILocationProvider} from 'angular';
import {INgRedux} from "ng-redux/index";
import {IRootState} from "../state/index";
import {findUser} from "../actions/users.actions";
import {USERS_SERVICE, IUsersService} from '../services/users.service';

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

export default class RouterConfig {
    static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    constructor($stateProvider: IStateProvider,
                $urlRouterProvider: IUrlRouterProvider,
                $locationProvider: ILocationProvider) {

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
                resolve: {
                    __: [USERS_SERVICE, (usersService: IUsersService) => usersService.fetch()]
                }
            })
            .state('user', {
                url: "/users/{username}",
                template: `<tar-user user="$resolve.user"></tar-user>`,
                resolve: {
                    __: [USERS_SERVICE, (usersService: IUsersService) => usersService.fetch()],
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
        //      fromParams: IStateParamsService,
        //      options: IStateOptions):void => {
        //
        //         console.log({e, toState, toParams, fromState, fromParams, options});
        //
        // })

    }
}
