import {IState} from "angular-ui-router";
import {USERS_SERVICE, IUsersService} from "../../services/users.service";


export class UsersRoute implements IState {
    name = 'users';
    url = '/users';
    template = `<tar-users flex layout="column"></tar-users>`;
    resolve = {
        __: [USERS_SERVICE, (usersService: IUsersService) => usersService.fetch()],
    };
}
