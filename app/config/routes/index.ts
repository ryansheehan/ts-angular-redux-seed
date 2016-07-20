import {IStateProvider} from 'angular-ui-router';
import {HomeRoute} from './home.route';
import {AboutRoute} from './about.route';
import {UsersRoute} from './users.route';
import {UserRoute} from './user.route';
import {IState} from "angular-ui-router";

export namespace States {
    export const HOME = new HomeRoute();
    export const ABOUT = new AboutRoute();
    export const USERS = new UsersRoute();
    export const USER = new UserRoute();
}

export function registerRoutes($stateProvider: IStateProvider) {
    Object.keys(States)
        .filter(key => !!((<any>States)[key] as IState))
        .forEach(key=>$stateProvider.state(<IState>((<any>States)[key])))
}


