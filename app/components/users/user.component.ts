import {IComponentOptions} from 'angular';
import {INgRedux} from 'ng-redux';
import {stateGo} from 'redux-ui-router';
import {updateUsers} from '../../actions/users.actions';
import {IUserListState, IUserState} from '../../state/users.state';

class UserController {
    static $inject = ['$ngRedux', 'ROUTE_USERS_NAME'];

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
        this.$ngRedux.dispatch(stateGo(this.ROUTE_HOME_URL));
    }

    constructor(private $ngRedux:INgRedux, private ROUTE_HOME_URL: string) {
        this.unsubscribe = this.$ngRedux.connect(
            (state:IUserListState) => {
                return {users: state.users};
            },
            {updateUsers, stateGo}
        )(this);
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

