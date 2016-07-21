import {UsersService, USERS_SERVICE} from "./users.service";

export function registerServices(module: angular.IModule) {
    module
        .service(USERS_SERVICE, UsersService);
}

