import {USERS_SERVICE, IUsersService} from "../../services/users.service";
import {IStateParamsService} from "angular-ui-router";
import {INgRedux} from "ng-redux/index";
import {IUserListState, IUserState} from "../../state/users.state";
import {IStateWithRules, IRouteRuleResult, RouteRuleResult} from "./rule.manager";
import {IState} from "angular-ui-router";

export class UserRoute implements IStateWithRules {
    static get NAME() { return 'user' };
    static get URL() { return '/users/{username}' };

    name = UserRoute.NAME;
    url = UserRoute.URL;
    template = `<tar-user user="$resolve.user"></tar-user>`;
    resolve = {
        __: [USERS_SERVICE, (usersService: IUsersService) => usersService.fetch()],
        user: ($stateParams: IStateParamsService, $ngRedux:INgRedux) => {
            let state = $ngRedux.getState() as IUserListState;
            let users = state.users;
            let username = $stateParams['username'];
            return UserRoute.findUser(users, username);
        }
    };
    data = {
      rules: [
          ($ngRedux: INgRedux, toState: IState, toParams: IStateParamsService): IRouteRuleResult => {
              let state = $ngRedux.getState() as IUserListState;
              let users = state.users;
              let username: string = toParams['username'];

              if(UserRoute.findUser(users, username)) {
                  return null;
              }

              return new RouteRuleResult('users')
          }
      ]
    };

    static findUser(users: IUserState[], username: string): IUserState {
        let user:IUserState = null;
        for(let i = 0; i < users.length && !user; i++) {
            if(users[i].username === username) {
                user = {
                    username: users[i].username,
                    password: users[i].password
                };
            }
        }
        return user;
    }
}