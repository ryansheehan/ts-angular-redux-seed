import {IStateProvider} from 'angular-ui-router';
import {HomeRoute} from './home.route';
import {AboutRoute} from './about.route';
import {UsersRoute} from './users.route';
import {UserRoute} from './user.route';

export {HOME_ROUTE} from './home.route';

let states = [
    new HomeRoute(),
    new AboutRoute(),
    new UsersRoute(),
    new UserRoute()
];

export function registerRoutes($stateProvider: IStateProvider) {
    states.forEach((state) => $stateProvider.state(state));
}


