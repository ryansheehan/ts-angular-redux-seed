import {USERS_SERVICE, IUsersService} from "../../services/users.service";
import {IUserListState, IUserState, User} from "../../state/users.state";
import {IRouterState} from "./state.interface";
import {States} from "./index";

export class UserRoute implements IRouterState {
    name = 'user';
    url = '/users/{username}';
    template = `<tar-user user="$resolve.user"></tar-user>`;
    resolve = {
        user: ['$stateParams', USERS_SERVICE,
            ($stateParams: angular.ui.IStateParamsService, usersService: IUsersService): Promise<IUserState> => {
                const username = $stateParams['username'] as string;
                this.data.redirectTo = States.USERS.name;

                return new Promise<IUserState>((resolve, reject) => {
                    usersService.fetch()
                        .then((state:IUserListState) => {
                            const users = state.users;
                            const user = users.find(u=>u.username === username);
                            return user ?
                                resolve(new User(user.username, user.password)) :
                                reject(Error(`'${username}' is not a valid username`));
                        })
                })
            }
        ]
    };
    data = {
        redirectTo: ''
    };
}