import {USERS_SERVICE, IUsersService} from "../../services/users.service";
import {IRouterState} from "./state.interface";


export class UsersRoute implements IRouterState {
    name = 'users';
    url = '/users';
    template = `<tar-users flex layout="column"></tar-users>`;
    resolve = {
        __: [USERS_SERVICE, (usersService: IUsersService) => usersService.fetch()],
    };
    data = {
        redirectTo: ''
    }
}
