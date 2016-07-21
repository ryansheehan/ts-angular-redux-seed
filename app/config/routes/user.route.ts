import {USERS_SERVICE, IUsersService} from "../../services/users.service";
import {IStateParamsService} from "angular-ui-router";
import {IPromise} from 'angular';
import {IUserListState, IUserState} from "../../state/users.state";
import IQService = angular.IQService;
import IQResolveReject = angular.IQResolveReject;
import {IRouterState} from "./state.interface";
import {States} from "./index";

export class UserRoute implements IRouterState {
    name = 'user';
    url = '/users/{username}';
    template = `<tar-user user="$resolve.user"></tar-user>`;
    resolve = {
        user: ['$stateParams', '$q', USERS_SERVICE,
            ($stateParams: IStateParamsService, $q: IQService, usersService: IUsersService): IPromise<IUserState> => {
                const deferred = $q.defer<IUserState>();
                const username = $stateParams['username'] as string;
                this.data.redirectTo = States.USERS.name;
                usersService.fetch().then(
                    (state:IUserListState) => {
                        const users = state.users;
                        const user = users.find(u=>u.username === username);
                        if(user) {
                            return deferred.resolve({username: user.username, password: user.password});
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
}