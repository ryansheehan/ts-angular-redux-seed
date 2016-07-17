import {IUserListState} from "../state/users.state";
import {User} from "../state/users.state";
import {INgRedux} from "ng-redux/index";
import {setUsers} from "../actions/users.actions";

export interface IUsersService {
    fetch: ()=> IUserListState;
}

export class UsersService implements IUsersService {
    static $inject = ['$ngRedux'];

    constructor(private $ngRedux: INgRedux) {

    }

    fetch(): IUserListState {
        let users = User.generate(10);
        this.$ngRedux.dispatch(setUsers(users));
        return this.$ngRedux.getState() as IUserListState;
    }
}

