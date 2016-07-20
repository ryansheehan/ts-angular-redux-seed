import {USERS_SERVICE, IUsersService} from "../../services/users.service";
import {IStateParamsService} from "angular-ui-router";
import {IPromise} from 'angular';
import {IUserListState, IUserState} from "../../state/users.state";
import IQService = angular.IQService;
import IQResolveReject = angular.IQResolveReject;
import {IRouterState} from "./state.interface";

export class UserRoute implements IRouterState {
    name = 'user';
    url = '/users/{username}';
    template = `<tar-user user="$resolve.user"></tar-user>`;
    resolve = {
        user: ['$stateParams', '$q', USERS_SERVICE, 'ROUTE_USERS_NAME',
            ($stateParams: IStateParamsService, $q: IQService, usersService: IUsersService, ROUTE_USERS_NAME: string): IPromise<IUserState> => {
                const deferred = $q.defer<IUserState>();
                const username = $stateParams['username'] as string;
                this.data.redirectTo = ROUTE_USERS_NAME;
                usersService.fetch().then(
                    (state:IUserListState) => {
                        const users = state.users;
                        const user = UserRoute.findUser(users, username);
                        if(user) {
                            return deferred.resolve(user);
                        } else {
                            return deferred.reject(null);
                        }
                    }
                );

                return deferred.promise;
            }
        ]
    };
    data = {
        redirectTo: ''
    };

    static findUser(users: IUserState[], username: string): IUserState {
        let user:IUserState = null;
        for(let i = 0; i < users.length && !user; i++) {
            if(users[i].username === username) {
                user = {
                    username: users[i].username,
                    password: users[i].password
                };
            }
        }
        return user;
    }
}