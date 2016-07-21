import {INgRedux} from 'ng-redux';
import {stateGo} from 'redux-ui-router';
import {addUsers, deleteUsers} from '../../actions/users.actions';
import {IUserListState, IUserState, User} from '../../state/users.state';

class UsersController {
    static $inject = ['$ngRedux'];

    unsubscribe:Function;

    $onDestroy() {
        this.unsubscribe();
    }

    createUser(): void {
        this.$ngRedux.dispatch(addUsers(User.generate()));
    }

    users: IUserState[];

    constructor(private $ngRedux:INgRedux) {
        this.unsubscribe = this.$ngRedux.connect(
            (state:IUserListState) => {
                return {users: state.users};
            },
            {addUsers, deleteUsers, stateGo}
        )(this);

    }
}

export class UsersComponent implements angular.IComponentOptions {
    templateUrl = "app/components/users/users.template.html";
    controller = UsersController;
    controllerAs = "vm";
}

