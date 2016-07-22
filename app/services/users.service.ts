import {IUserListState, IUserState} from "../state/users.state";
import {User} from "../state/users.state";
import {INgRedux} from "ng-redux/index";
import {setUsers} from "../actions/users.actions";

export let USERS_SERVICE = 'usersService';

export interface IUsersService {
    fetch: ()=> Promise<IUserListState>;
}

export class UsersService implements IUsersService {
    static $inject = ['$ngRedux', '$timeout'];

    _users: IUserState[];
    get users() {
        return JSON.parse(JSON.stringify(this._users)) as IUserState[];
    }
    set users(value: IUserState[]) {
        this._users = value;
        //update server with new user?
    }

    constructor(private $ngRedux: INgRedux, private $timeout: angular.ITimeoutService) {
        this.$ngRedux.connect(
            (state:IUserListState) => {
                return {users: state.users};
            }
        )(this);
    }

    static first = true;
    fetch(): Promise<IUserListState> {
        return new Promise((resolve, reject)=>{
            //simulate a request to the server
            this.$timeout(() => {
                const users = UsersService.first ? User.generate(10) : this.users;
                UsersService.first = false;
                this.$ngRedux.dispatch(setUsers(users));
                resolve(this.$ngRedux.getState() as IUserListState);
            }, 200);
        });
    }
}

