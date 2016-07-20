import {IComponentOptions} from 'angular';
import {INgRedux} from 'ng-redux';
import {stateGo} from 'redux-ui-router';
import {updateUsers} from '../../actions/users.actions';
import {IUserListState, IUserState} from '../../state/users.state';
import {States} from "../../config/routes/index";

class UserController {
    static $inject = ['$ngRedux'];

    unsubscribe:Function;

    $onDestroy() {
        this.unsubscribe();
    }

    users: IUserState[];

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
        this.$ngRedux.dispatch(stateGo(States.USERS.name));
    }

    constructor(private $ngRedux:INgRedux) {
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
    };
}

