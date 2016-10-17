System.register("state/counter.state", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("actions/counter.actions", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var INCREMENT_COUNTER, DECREMENT_COUNTER;
    function increment() {
        return { type: INCREMENT_COUNTER };
    }
    exports_2("increment", increment);
    function decrement() {
        return { type: DECREMENT_COUNTER };
    }
    exports_2("decrement", decrement);
    function incrementIfOdd() {
        return (dispatch, getState) => {
            const { counter } = getState();
            if (counter % 2 == 0) {
                return;
            }
            dispatch(increment());
        };
    }
    exports_2("incrementIfOdd", incrementIfOdd);
    function incrementAsync(delay = 1000) {
        return (dispatch) => {
            setTimeout(() => dispatch(increment()), delay);
        };
    }
    exports_2("incrementAsync", incrementAsync);
    return {
        setters:[],
        execute: function() {
            exports_2("INCREMENT_COUNTER", INCREMENT_COUNTER = 'INCREMENT_COUNTER');
            exports_2("DECREMENT_COUNTER", DECREMENT_COUNTER = 'DECREMENT_COUNTER');
        }
    }
});
System.register("state/users.state", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = class User {
                constructor(username = 'user', password = 'password') {
                    this.username = username;
                    this.password = password;
                }
                static generate(count = 1) {
                    const list = [];
                    for (let i = 0; i < count; i++) {
                        list.push(new User('user' + User.idGen, 'password'));
                        User.idGen += 1;
                    }
                    return list;
                }
            };
            User.idGen = 100;
            exports_3("User", User);
        }
    }
});
System.register("actions/users.actions", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var SET_USERS, ADD_USERS, DELETE_USERS, UPDATE_USERS;
    function addUsers(users) {
        return { type: ADD_USERS, payload: { newUsers: users, oldUsers: [] } };
    }
    exports_4("addUsers", addUsers);
    function deleteUsers(users) {
        return { type: DELETE_USERS, payload: { newUsers: [], oldUsers: users } };
    }
    exports_4("deleteUsers", deleteUsers);
    function updateUsers(oldUsers, newUsers) {
        return { type: UPDATE_USERS, payload: { oldUsers, newUsers } };
    }
    exports_4("updateUsers", updateUsers);
    function setUsers(users) {
        return { type: SET_USERS, payload: { newUsers: users, oldUsers: [] } };
    }
    exports_4("setUsers", setUsers);
    return {
        setters:[],
        execute: function() {
            exports_4("SET_USERS", SET_USERS = 'SET_USERS');
            exports_4("ADD_USERS", ADD_USERS = 'ADD_USER');
            exports_4("DELETE_USERS", DELETE_USERS = 'DELETE_USER');
            exports_4("UPDATE_USERS", UPDATE_USERS = 'UPDATE_USER');
        }
    }
});
System.register("config/routes/state.interface", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("config/routes/home.route", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var HomeRoute;
    return {
        setters:[],
        execute: function() {
            HomeRoute = class HomeRoute {
                constructor() {
                    this.name = 'home';
                    this.url = '/home';
                    this.template = `<tar-home></tar-home>`;
                    this.data = {
                        redirectTo: ''
                    };
                }
            };
            exports_6("HomeRoute", HomeRoute);
        }
    }
});
System.register("config/routes/about.route", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var AboutRoute;
    return {
        setters:[],
        execute: function() {
            AboutRoute = class AboutRoute {
                constructor() {
                    this.name = 'about';
                    this.url = '/about';
                    this.template = `<tar-about></tar-about>`;
                    this.data = {
                        redirectTo: ''
                    };
                }
            };
            exports_7("AboutRoute", AboutRoute);
        }
    }
});
System.register("services/users.service", ["state/users.state", "actions/users.actions"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var users_state_1, users_actions_1;
    var USERS_SERVICE, UsersService;
    return {
        setters:[
            function (users_state_1_1) {
                users_state_1 = users_state_1_1;
            },
            function (users_actions_1_1) {
                users_actions_1 = users_actions_1_1;
            }],
        execute: function() {
            exports_8("USERS_SERVICE", USERS_SERVICE = 'usersService');
            UsersService = class UsersService {
                constructor($ngRedux, $timeout) {
                    this.$ngRedux = $ngRedux;
                    this.$timeout = $timeout;
                    this.$ngRedux.connect((state) => {
                        return { users: state.users };
                    })(this);
                }
                get users() {
                    return JSON.parse(JSON.stringify(this._users));
                }
                set users(value) {
                    this._users = value;
                    //update server with new user?
                }
                fetch() {
                    return new Promise((resolve, reject) => {
                        //simulate a request to the server
                        this.$timeout(() => {
                            const users = UsersService.first ? users_state_1.User.generate(10) : this.users;
                            UsersService.first = false;
                            this.$ngRedux.dispatch(users_actions_1.setUsers(users));
                            resolve(this.$ngRedux.getState());
                        }, 200);
                    });
                }
            };
            UsersService.$inject = ['$ngRedux', '$timeout'];
            UsersService.first = true;
            exports_8("UsersService", UsersService);
        }
    }
});
System.register("config/routes/users.route", ["services/users.service"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var users_service_1;
    var UsersRoute;
    return {
        setters:[
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            UsersRoute = class UsersRoute {
                constructor() {
                    this.name = 'users';
                    this.url = '/users';
                    this.template = `<tar-users flex layout="column"></tar-users>`;
                    this.resolve = {
                        __: [users_service_1.USERS_SERVICE, (usersService) => usersService.fetch()],
                    };
                    this.data = {
                        redirectTo: ''
                    };
                }
            };
            exports_9("UsersRoute", UsersRoute);
        }
    }
});
System.register("config/routes/user.route", ["services/users.service", "state/users.state", "config/routes/index"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var users_service_2, users_state_2, index_1;
    var UserRoute;
    return {
        setters:[
            function (users_service_2_1) {
                users_service_2 = users_service_2_1;
            },
            function (users_state_2_1) {
                users_state_2 = users_state_2_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            UserRoute = class UserRoute {
                constructor() {
                    this.name = 'user';
                    this.url = '/users/{username}';
                    this.template = `<tar-user user="$resolve.user"></tar-user>`;
                    this.resolve = {
                        user: ['$stateParams', users_service_2.USERS_SERVICE,
                                ($stateParams, usersService) => {
                                const username = $stateParams['username'];
                                this.data.redirectTo = index_1.States.USERS.name;
                                return new Promise((resolve, reject) => {
                                    usersService.fetch()
                                        .then((state) => {
                                        const users = state.users;
                                        const user = users.find(u => u.username === username);
                                        return user ?
                                            resolve(new users_state_2.User(user.username, user.password)) :
                                            reject(Error(`'${username}' is not a valid username`));
                                    });
                                });
                            }
                        ]
                    };
                    this.data = {
                        redirectTo: ''
                    };
                }
            };
            exports_10("UserRoute", UserRoute);
        }
    }
});
System.register("config/routes/index", ["config/routes/home.route", "config/routes/about.route", "config/routes/users.route", "config/routes/user.route"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var home_route_1, about_route_1, users_route_1, user_route_1;
    var States;
    function registerRoutes($stateProvider) {
        Object.keys(States)
            .filter(key => !!States[key])
            .forEach(key => $stateProvider.state((States[key])));
    }
    exports_11("registerRoutes", registerRoutes);
    return {
        setters:[
            function (home_route_1_1) {
                home_route_1 = home_route_1_1;
            },
            function (about_route_1_1) {
                about_route_1 = about_route_1_1;
            },
            function (users_route_1_1) {
                users_route_1 = users_route_1_1;
            },
            function (user_route_1_1) {
                user_route_1 = user_route_1_1;
            }],
        execute: function() {
            (function (States) {
                States.HOME = new home_route_1.HomeRoute();
                States.ABOUT = new about_route_1.AboutRoute();
                States.USERS = new users_route_1.UsersRoute();
                States.USER = new user_route_1.UserRoute();
            })(States = States || (States = {}));
            exports_11("States", States);
        }
    }
});
System.register("config/router.config", ["config/routes/index", "redux-ui-router"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var index_2, redux_ui_router_1;
    var routerErrorManager, RouterConfig;
    return {
        setters:[
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (redux_ui_router_1_1) {
                redux_ui_router_1 = redux_ui_router_1_1;
            }],
        execute: function() {
            exports_12("routerErrorManager", routerErrorManager = ['$rootScope', '$ngRedux',
                    ($rootScope, $ngRedux) => {
                    function errorHandler(event, toState, toParams, fromState, fromParams, error) {
                        event.preventDefault();
                        console.error(error);
                        const state = toState;
                        const redirectTo = state && state.data && state.data.redirectTo ? state.data.redirectTo : index_2.States.HOME.name;
                        $ngRedux.dispatch(redux_ui_router_1.stateGo(redirectTo));
                    }
                    $rootScope.$on('$stateChangeError', errorHandler);
                }
            ]);
            RouterConfig = class RouterConfig {
                constructor($stateProvider, $urlRouterProvider, $locationProvider) {
                    $urlRouterProvider.otherwise(index_2.States.HOME.url);
                    index_2.registerRoutes($stateProvider);
                    $locationProvider.html5Mode(true);
                }
            };
            RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
            exports_12("default", RouterConfig);
        }
    }
});
System.register("reducers/counter.reducer", ["actions/counter.actions"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var counter_actions_1;
    function counterReducer(state = 0, action) {
        switch (action.type) {
            case counter_actions_1.INCREMENT_COUNTER:
                return state + 1;
            case counter_actions_1.DECREMENT_COUNTER:
                return state - 1;
            default:
                return state;
        }
    }
    exports_13("default", counterReducer);
    return {
        setters:[
            function (counter_actions_1_1) {
                counter_actions_1 = counter_actions_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("reducers/users.reducer", ['angular', "actions/users.actions"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var angular, users_actions_2;
    function addUsers(state = [], action) {
        let newUsers = [];
        for (const newUser of action.payload.newUsers) {
            state.findIndex(user => user.username === newUser.username) === -1 ?
                newUsers.push(newUser) : angular.noop();
        }
        return state.concat(newUsers);
    }
    function removeUsers(state = [], action) {
        let start = 0;
        const slices = [];
        for (const oldUser of action.payload.oldUsers) {
            const i = state.findIndex(user => user.username === oldUser.username);
            if (i >= 0) {
                slices.push(state.slice(start, i));
                start = i + 1;
            }
        }
        if (start < state.length) {
            slices.push(state.slice(start));
        }
        const [first, ...more] = slices;
        return first.concat(...more);
    }
    function updateUsers(state = [], action) {
        //make sure new and old match so there are even swaps
        const { newUsers, oldUsers } = action.payload;
        if (newUsers.length != oldUsers.length) {
            return state;
        }
        const result = [];
        for (const user of state) {
            const i = oldUsers.findIndex(oldUser => oldUser.username === user.username);
            const push = i > -1 ? newUsers[i] : user;
            result.push(push);
        }
        return result;
    }
    function setUsers(state = [], action) {
        return action.payload.newUsers;
    }
    function usersReducer(state = [], action) {
        switch (action.type) {
            case users_actions_2.ADD_USERS: return addUsers(state, action);
            case users_actions_2.DELETE_USERS: return removeUsers(state, action);
            case users_actions_2.UPDATE_USERS: return updateUsers(state, action);
            case users_actions_2.SET_USERS: return setUsers(state, action);
            default: return state;
        }
    }
    exports_14("default", usersReducer);
    return {
        setters:[
            function (angular_1) {
                angular = angular_1;
            },
            function (users_actions_2_1) {
                users_actions_2 = users_actions_2_1;
            }],
        execute: function() {
        }
    }
});
System.register("state/router.state", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("state/index", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("reducers/index", ['redux', "reducers/counter.reducer", "reducers/users.reducer", 'redux-ui-router'], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var redux_1, counter_reducer_1, users_reducer_1, redux_ui_router_2;
    var rootReducer;
    return {
        setters:[
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (counter_reducer_1_1) {
                counter_reducer_1 = counter_reducer_1_1;
            },
            function (users_reducer_1_1) {
                users_reducer_1 = users_reducer_1_1;
            },
            function (redux_ui_router_2_1) {
                redux_ui_router_2 = redux_ui_router_2_1;
            }],
        execute: function() {
            rootReducer = redux_1.combineReducers({
                counter: counter_reducer_1.default,
                users: users_reducer_1.default,
                router: redux_ui_router_2.router
            });
            exports_17("default",rootReducer);
        }
    }
});
System.register("config/log.config", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var reduxLoggingConfig;
    return {
        setters:[],
        execute: function() {
            exports_18("reduxLoggingConfig", reduxLoggingConfig = {
                enabled: true,
                showRouteLogging: false
            });
        }
    }
});
System.register("config/redux.config", ['redux-thunk', 'redux-logger', "reducers/index", "config/log.config"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var redux_thunk_1, redux_logger_1, index_3, log_config_1;
    var ReduxConfig;
    return {
        setters:[
            function (redux_thunk_1_1) {
                redux_thunk_1 = redux_thunk_1_1;
            },
            function (redux_logger_1_1) {
                redux_logger_1 = redux_logger_1_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (log_config_1_1) {
                log_config_1 = log_config_1_1;
            }],
        execute: function() {
            ReduxConfig = class ReduxConfig {
                constructor($ngReduxProvider) {
                    const logger = redux_logger_1.default({
                        predicate: (getState, action) => {
                            switch (action.type) {
                                case '@@reduxUiRouter/$stateChangeStart':
                                case '@@reduxUiRouter/$stateChangeSuccess':
                                case '@@reduxUiRouter/stateGo':
                                case '@@reduxUiRouter/stateReload':
                                case '@@reduxUiRouter/stateTransitionTo':
                                    if (!log_config_1.reduxLoggingConfig.showRouteLogging) {
                                        return false;
                                    }
                            }
                            return true;
                        },
                    });
                    let middleWare = ['ngUiRouterMiddleware', redux_thunk_1.default];
                    if (log_config_1.reduxLoggingConfig.enabled) {
                        middleWare.push(logger);
                    }
                    $ngReduxProvider.createStoreWith(index_3.default, middleWare, []);
                }
            };
            ReduxConfig.$inject = ['$ngReduxProvider'];
            exports_19("default", ReduxConfig);
        }
    }
});
System.register("config/index", ["config/router.config", "config/redux.config"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var router_config_1, redux_config_1;
    function registerConfigurations(module) {
        module
            .config(router_config_1.default)
            .config(redux_config_1.default)
            .run(router_config_1.routerErrorManager);
    }
    exports_20("registerConfigurations", registerConfigurations);
    return {
        setters:[
            function (router_config_1_1) {
                router_config_1 = router_config_1_1;
            },
            function (redux_config_1_1) {
                redux_config_1 = redux_config_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("components/main/main.component", [], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var AppMainController, AppMainComponent;
    return {
        setters:[],
        execute: function() {
            AppMainController = class AppMainController {
                constructor($ngRedux) {
                    this.$ngRedux = $ngRedux;
                    this.unsubscribe = this.$ngRedux.connect((state) => {
                        let route = state.router.currentState;
                        return { route: route.name };
                    })(this);
                }
                $onDestroy() {
                    this.unsubscribe();
                }
            };
            AppMainController.$inject = ['$ngRedux'];
            AppMainComponent = class AppMainComponent {
                constructor() {
                    this.templateUrl = 'app/components/main/main.template.html';
                    this.controllerAs = 'vm';
                    this.controller = AppMainController;
                }
            };
            exports_21("AppMainComponent", AppMainComponent);
        }
    }
});
System.register("components/about/about.component", [], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var AboutController, AboutComponent;
    return {
        setters:[],
        execute: function() {
            AboutController = class AboutController {
                constructor() {
                    this.description = "Fill in a some stuff.";
                }
            };
            AboutComponent = class AboutComponent {
                constructor() {
                    this.templateUrl = "app/components/about/about.template.html";
                    this.controller = AboutController;
                    this.controllerAs = "vm";
                }
            };
            exports_22("AboutComponent", AboutComponent);
        }
    }
});
System.register("components/home/home.component", [], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var HomeController, HomeComponent;
    return {
        setters:[],
        execute: function() {
            HomeController = class HomeController {
                constructor() {
                    this.now = new Date();
                }
            };
            HomeComponent = class HomeComponent {
                constructor() {
                    this.templateUrl = 'app/components/home/home.template.html';
                    this.controllerAs = "vm";
                    this.controller = HomeController;
                }
            };
            exports_23("HomeComponent", HomeComponent);
        }
    }
});
System.register("components/counter/counter.component", ["actions/counter.actions"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var counter_actions_2;
    var CounterController, CounterComponent;
    return {
        setters:[
            function (counter_actions_2_1) {
                counter_actions_2 = counter_actions_2_1;
            }],
        execute: function() {
            CounterController = class CounterController {
                constructor($ngRedux) {
                    this.$ngRedux = $ngRedux;
                    this.unsubscribe = this.$ngRedux.connect((state) => { return { counter: state.counter }; }, { increment: counter_actions_2.increment, decrement: counter_actions_2.decrement, incrementAsync: counter_actions_2.incrementAsync, incrementIfOdd: counter_actions_2.incrementIfOdd })(this);
                }
                $onDestroy() {
                    this.unsubscribe();
                }
            };
            CounterController.$inject = ['$ngRedux'];
            CounterComponent = class CounterComponent {
                constructor() {
                    this.templateUrl = "app/components/counter/counter.template.html";
                    this.controllerAs = "vm";
                    this.controller = CounterController;
                }
            };
            exports_24("CounterComponent", CounterComponent);
        }
    }
});
System.register("components/users/users.component", ['redux-ui-router', "actions/users.actions", "state/users.state"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var redux_ui_router_3, users_actions_3, users_state_3;
    var UsersController, UsersComponent;
    return {
        setters:[
            function (redux_ui_router_3_1) {
                redux_ui_router_3 = redux_ui_router_3_1;
            },
            function (users_actions_3_1) {
                users_actions_3 = users_actions_3_1;
            },
            function (users_state_3_1) {
                users_state_3 = users_state_3_1;
            }],
        execute: function() {
            UsersController = class UsersController {
                constructor($ngRedux) {
                    this.$ngRedux = $ngRedux;
                    this.unsubscribe = this.$ngRedux.connect((state) => {
                        return { users: state.users };
                    }, { addUsers: users_actions_3.addUsers, deleteUsers: users_actions_3.deleteUsers, stateGo: redux_ui_router_3.stateGo })(this);
                }
                $onDestroy() {
                    this.unsubscribe();
                }
                createUser() {
                    this.$ngRedux.dispatch(users_actions_3.addUsers(users_state_3.User.generate()));
                }
            };
            UsersController.$inject = ['$ngRedux'];
            UsersComponent = class UsersComponent {
                constructor() {
                    this.templateUrl = "app/components/users/users.template.html";
                    this.controller = UsersController;
                    this.controllerAs = "vm";
                }
            };
            exports_25("UsersComponent", UsersComponent);
        }
    }
});
System.register("components/users/user.component", ['redux-ui-router', "actions/users.actions", "config/routes/index"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var redux_ui_router_4, users_actions_4, index_4;
    var UserController, UserComponent;
    return {
        setters:[
            function (redux_ui_router_4_1) {
                redux_ui_router_4 = redux_ui_router_4_1;
            },
            function (users_actions_4_1) {
                users_actions_4 = users_actions_4_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            }],
        execute: function() {
            UserController = class UserController {
                constructor($ngRedux) {
                    this.$ngRedux = $ngRedux;
                    this.unsubscribe = this.$ngRedux.connect((state) => {
                        return { users: state.users };
                    }, { updateUsers: users_actions_4.updateUsers, stateGo: redux_ui_router_4.stateGo })(this);
                }
                $onDestroy() {
                    this.unsubscribe();
                }
                get user() { return this._user; }
                ;
                set user(u) {
                    this._original = u;
                    if (u) {
                        this._user = {
                            username: u.username,
                            password: u.password
                        };
                    }
                }
                update() {
                    this.$ngRedux.dispatch(users_actions_4.updateUsers([this._original], [this._user]));
                    this.$ngRedux.dispatch(redux_ui_router_4.stateGo(index_4.States.USERS.name));
                }
            };
            UserController.$inject = ['$ngRedux'];
            UserComponent = class UserComponent {
                constructor() {
                    this.templateUrl = "app/components/users/user.template.html";
                    this.controller = UserController;
                    this.controllerAs = "vm";
                    this.bindings = {
                        'user': '<',
                    };
                }
            };
            exports_26("UserComponent", UserComponent);
        }
    }
});
System.register("components/index", ["components/main/main.component", "components/about/about.component", "components/home/home.component", "components/counter/counter.component", "components/users/users.component", "components/users/user.component"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var main_component_1, about_component_1, home_component_1, counter_component_1, users_component_1, user_component_1;
    function registerComponents(module) {
        module
            .component('appMain', new main_component_1.AppMainComponent())
            .component('tarAbout', new about_component_1.AboutComponent())
            .component('tarHome', new home_component_1.HomeComponent())
            .component('tarCounter', new counter_component_1.CounterComponent())
            .component('tarUsers', new users_component_1.UsersComponent())
            .component('tarUser', new user_component_1.UserComponent());
    }
    exports_27("registerComponents", registerComponents);
    return {
        setters:[
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (counter_component_1_1) {
                counter_component_1 = counter_component_1_1;
            },
            function (users_component_1_1) {
                users_component_1 = users_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("services/index", ["services/users.service"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var users_service_3;
    function registerServices(module) {
        module
            .service(users_service_3.USERS_SERVICE, users_service_3.UsersService);
    }
    exports_28("registerServices", registerServices);
    return {
        setters:[
            function (users_service_3_1) {
                users_service_3 = users_service_3_1;
            }],
        execute: function() {
        }
    }
});
System.register("app.module", ['angular', 'angular-aria', 'angular-animate', 'angular-material', 'angular-ui-router', 'redux-ui-router', 'redux', 'ng-redux', "config/index", "components/index", "services/index"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var angular, index_5, index_6, index_7;
    var app;
    return {
        setters:[
            function (angular_2) {
                angular = angular_2;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (_5) {},
            function (_6) {},
            function (_7) {},
            function (index_5_1) {
                index_5 = index_5_1;
            },
            function (index_6_1) {
                index_6 = index_6_1;
            },
            function (index_7_1) {
                index_7 = index_7_1;
            }],
        execute: function() {
            app = angular.module('app', ['ngMaterial', 'ui.router', 'ngRedux', 'ng-ui-router-middleware']);
            index_7.registerServices(app);
            index_5.registerConfigurations(app);
            index_6.registerComponents(app);
            exports_29("default",app);
        }
    }
});
//# sourceMappingURL=build.js.map