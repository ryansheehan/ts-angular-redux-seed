import {IModule} from 'angular';
import {IStateProvider} from 'angular-ui-router';
import {HomeRoute} from './home.route';
import {AboutRoute} from './about.route';
import {UsersRoute} from './users.route';
import {UserRoute} from './user.route';

let states = [
    HomeRoute,
    AboutRoute,
    UsersRoute,
    UserRoute
];

export function registerRoutes($stateProvider: IStateProvider) {
    states.forEach((state) => $stateProvider.state(new state()));
}

export function registerConstants(module:IModule) {
    states.forEach((state) => {
        const stateName = <string>state.NAME;
        const stateUrl = <string>state.URL;
        const stateNameUC = stateName.toUpperCase();

        module
            .constant(`ROUTE_${stateNameUC}_NAME`, stateName)
            .constant(`ROUTE_${stateNameUC}_URL`, stateUrl);
    });
}



