import IModule = angular.IModule;
import {UsersService} from "./users.service";

export function registerServices(module:IModule) {
    module
        .service('usersService', UsersService);
}
