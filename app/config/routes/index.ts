import {HomeRoute} from './home.route';
import {AboutRoute} from './about.route';
import {UsersRoute} from './users.route';
import {UserRoute} from './user.route';

export namespace States {
    export const HOME = new HomeRoute();
    export const ABOUT = new AboutRoute();
    export const USERS = new UsersRoute();
    export const USER = new UserRoute();
}

export function registerRoutes($stateProvider: angular.ui.IStateProvider) {
    Object.keys(States)
        .filter(key => !!((<any>States)[key] as angular.ui.IState))
        .forEach(key=>$stateProvider.state(<angular.ui.IState>((<any>States)[key])))
}


