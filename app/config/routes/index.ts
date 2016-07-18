import {IStateProvider} from "angular-ui-router";
import {HomeRoute} from './home.route';
import {AboutRoute} from './about.route';
import {UsersRoute} from './users.route';
import {UserRoute} from './user.route';

export {HOME_ROUTE} from './home.route';

export function registerRoutes($stateProvider: IStateProvider) {
    $stateProvider.state(new HomeRoute());
    $stateProvider.state(new AboutRoute());
    $stateProvider.state(new UsersRoute());
    $stateProvider.state(new UserRoute());
}


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
