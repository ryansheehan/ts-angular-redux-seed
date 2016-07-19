import {IState} from "angular-ui-router";
import {USERS_SERVICE, IUsersService} from "../../services/users.service";


export class UsersRoute implements IState {
    static get NAME() { return 'users' };
    static get URL() { return '/users' };

    name = UsersRoute.NAME;
    url = UsersRoute.URL;
    template = `<tar-users flex layout="column"></tar-users>`;
    resolve = {
        __: [USERS_SERVICE, (usersService: IUsersService) => usersService.fetch()],
    };
}
