import {IState} from "angular-ui-router";
import {USERS_SERVICE, IUsersService} from "../../services/users.service";

export class UserRoute implements IState {
    name = 'users';
    url = '/users';
    template = `<tar-user user="$resolve.user"></tar-user>`;
    resolve = {
        __: [USERS_SERVICE, (usersService: IUsersService) => usersService.fetch()],

    };
}