import {IRootScopeService, IAngularEvent} from 'angular';
import {IState, IStateParamsService, IStateOptions} from 'angular-ui-router';
import {INgRedux} from 'ng-redux';
import {stateGo} from 'redux-ui-router';

export interface IRouteRuleResult {
    redirect: boolean,
    name?: string,
    params?: IStateParamsService,
    options?: IStateOptions
}

export interface IRouteRule extends Function {
    ($ngRedux: INgRedux,
     toState: IState,
     toParams: IStateParamsService,
     fromState: IState,
     fromParams: IStateParamsService,
     options: IStateOptions): IRouteRuleResult
}

export interface IDataRouteRules {
    rules?: IRouteRule[]
}

export interface IRuleState extends IState {
    data?: IDataRouteRules
}

class RouteRuleManager {
    static $inject = ['$rootScope', '$ngRedux'];

    constructor($rootScope: IRootScopeService, $ngRedux: INgRedux) {
        $rootScope.$on('$stateChangeStart',
            (e: IAngularEvent,
             toState: IState,
             toParams: IStateParamsService,
             fromState: IState,
             fromParams: IStateParamsService,
             options: IStateOptions) => {
                let state = toState as IRuleState;
                if(state && state.data && state.data.rules) {
                    let rules = state.data.rules;
                    for(let i = 0; i < rules.length; i++) {
                        let rule = rules[i];
                        let result = rule($ngRedux, toState, toParams, fromState, fromParams, options);
                        if(result.redirect) {
                            stateGo(result.name, result.params, result.options);
                        }
                    }
                }
            }
        );
    }
}
