import {IComponentOptions} from 'angular';
import {INgRedux} from 'ng-redux';
import {addUser, deleteUser} from '../../actions/users.actions';
import {IUserListState} from '../../state/users.state';

class UsersController {
  static $inject = ['$ngRedux'];

  unsubscribe: Function;

  $onDestroy() {
    this.unsubscribe();
  }

  private idGen = 0;

  addRandomUser() {
    let id = this.idGen;
    this.idGen += 1;

    this.$ngRedux.dispatch(addUser({username: 'user' + id, password: "foobar"}));
  }

  constructor(private $ngRedux: INgRedux) {
    this.unsubscribe = this.$ngRedux.connect(
      (state: IUserListState) => {
        return { users: state.users };
      },
      {addUser, deleteUser}
    )(this);
  }
}

export class UsersComponent implements IComponentOptions {
  templateUrl = "app/components/users/users.template.html";
  controller = UsersController;
  controllerAs = "vm";
}

