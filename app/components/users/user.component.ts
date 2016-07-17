import {IComponentOptions} from 'angular';
import {INgRedux} from 'ng-redux';
import {stateGo} from 'redux-ui-router';
import {updateUsers, findUser} from '../../actions/users.actions';
import {IUserListState, IUserState} from '../../state/users.state';
import {IUsersService} from "../../services/users.service";

class UserController {
    static $inject = ['$ngRedux', 'usersService'];

    unsubscribe:Function;

    $onDestroy() {
        this.unsubscribe();
    }

    users: IUserState[];
    username: string;

    private _original: IUserState;
    private _user: IUserState;
    get user():IUserState { return this._user; };
    set user(u:IUserState) {
        this._original = u;
        if(u) {
            this._user = {
                username: u.username,
                password: u.password
            }
        }
    }

    update() {
        this.$ngRedux.dispatch(updateUsers([this._original], [this._user]));
        this.$ngRedux.dispatch(stateGo('users'));
    }

    constructor(private $ngRedux:INgRedux, private usersService: IUsersService) {
        this.unsubscribe = this.$ngRedux.connect(
            (state:IUserListState) => {
                return {users: state.users};
            },
            {updateUsers, stateGo}
        )(this);

        //attempt to find the user
        if(!this.user) {
            console.log(this.username);
            this.user = findUser(this.users, this.username);
        }

        //still no user?  then redirect back to the list
        if(!this.user) {
            this.$ngRedux.dispatch(stateGo('users'));
        }
    }
}

export class UserComponent implements IComponentOptions {
    templateUrl = "app/components/users/user.template.html";
    controller = UserController;
    controllerAs = "vm";
    bindings: {[binding: string]: string} = {
        'user': '<',
        'username': '<'
    };
}

