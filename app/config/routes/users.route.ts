import {IState} from "angular-ui-router";
import {USERS_SERVICE, IUsersService} from "../../services/users.service";
import {IStateParamsService} from "angular-ui-router";
import {INgRedux} from "ng-redux/index";
import {IRootState} from "../../state/index";
import {findUser} from "../../actions/users.actions";

export class UsersRoute implements IState {
    name = 'users';
    url = '/users';
    template = `<tar-users flex layout="column"></tar-users>`;
    resolve = {
        __: [USERS_SERVICE, (usersService: IUsersService) => usersService.fetch()],
        user: ($stateParams: IStateParamsService, $ngRedux:INgRedux) => {
            let state = $ngRedux.getState() as IRootState;
            let users = state.users;
            let username = $stateParams['username'];
            return findUser(users, username);
        }
    };
}
