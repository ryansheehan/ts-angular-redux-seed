import {IComponentOptions} from 'angular';
import {INgRedux} from 'ng-redux';
import {stateGo} from 'redux-ui-router';
import {addUsers, deleteUsers} from '../../actions/users.actions';
import {IUserListState, IUserState, User} from '../../state/users.state';
import {IUsersService} from "../../services/users.service";

class UsersController {
    static $inject = ['$ngRedux', 'usersService'];

    unsubscribe:Function;

    $onDestroy() {
        this.unsubscribe();
    }

    createUser(): void {
        addUsers(User.generate());
    }

    users: IUserState[];

    static first = false;
    constructor(private $ngRedux:INgRedux, private usersService: IUsersService) {
        this.unsubscribe = this.$ngRedux.connect(
            (state:IUserListState) => {
                return {users: state.users};
            },
            {addUsers, deleteUsers, stateGo}
        )(this);

        if(!UsersController.first) {
            UsersController.first = true;
            usersService.fetch();
        }
    }
}

export class UsersComponent implements IComponentOptions {
    templateUrl = "app/components/users/users.template.html";
    controller = UsersController;
    controllerAs = "vm";
}

