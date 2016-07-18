import IModule = angular.IModule;
import {UsersService, USERS_SERVICE} from "./users.service";

export function registerServices(module:IModule) {
    module
        .service(USERS_SERVICE, UsersService);
}

