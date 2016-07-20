import {IQService, ITimeoutService, IPromise} from 'angular';
import {IUserListState, IUserState} from "../state/users.state";
import {User} from "../state/users.state";
import {INgRedux} from "ng-redux/index";
import {setUsers} from "../actions/users.actions";

export let USERS_SERVICE = 'usersService';

export interface IUsersService {
    fetch: ()=> IPromise<IUserListState>;
}

export class UsersService implements IUsersService {
    static $inject = ['$ngRedux', '$q', '$timeout'];

    _users: IUserState[];
    get users() {
        return JSON.parse(JSON.stringify(this._users));
    }
    set users(value: IUserState[]) {
        this._users = value;
        //update server with new user?
    }

    constructor(private $ngRedux: INgRedux, private $q: IQService, private $timeout: ITimeoutService) {
        this.$ngRedux.connect(
            (state:IUserListState) => {
                return {users: state.users};
            }
        )(this);
    }

    static first = true;
    fetch(): IPromise<IUserListState> {
        const defer = this.$q.defer<IUserListState>();

        // simulate a delay
        this.$timeout(()=> {
            const users = UsersService.first ? User.generate(10) : this.users;
            if(UsersService.first) UsersService.first = false;
            this.$ngRedux.dispatch(setUsers(users));

            defer.resolve(this.$ngRedux.getState() as IUserListState)
        }, 60);

        return defer.promise;
    }
}

