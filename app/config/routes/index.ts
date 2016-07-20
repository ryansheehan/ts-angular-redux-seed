import {IModule} from 'angular';
import {IStateProvider} from 'angular-ui-router';
import {HomeRoute} from './home.route';
import {AboutRoute} from './about.route';
import {UsersRoute} from './users.route';
import {UserRoute} from './user.route';

export const states = [
    new HomeRoute(),
    new AboutRoute(),
    new UsersRoute(),
    new UserRoute()
];

export function registerRoutes($stateProvider: IStateProvider) {
    states.forEach((state) => $stateProvider.state(state));
}

export function registerConstants(module:IModule) {
    states.forEach(s=> {
        const nameUC = s.name.toUpperCase();
        module
            .constant(`ROUTE_${nameUC}_NAME`, s.name)
            .constant(`ROUTE_${nameUC}_URL`, s.url);
    });
}



