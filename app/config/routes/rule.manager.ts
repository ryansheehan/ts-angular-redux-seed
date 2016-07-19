import {IRootScopeService, IAngularEvent} from 'angular';
import {IState, IStateParamsService, IStateOptions} from 'angular-ui-router';
import {INgRedux} from 'ng-redux';
import {stateGo} from 'redux-ui-router';

export interface IRouteRuleResult {
    name?: string,
    params?: IStateParamsService,
    options?: IStateOptions
}

export class RouteRuleResult implements IRouteRuleResult {
    get name() { return this._name }
    get params() { return this._params}
    get options() { return this._options}

    constructor(private _name: string,
                private _params: IStateParamsService = null,
                private _options: IStateOptions = {notify: false}) {
    }
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

export interface IStateWithRules extends IState {
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

                let state = toState as IStateWithRules;
                if(state && state.data && state.data.rules) {
                    let rules = state.data.rules;
                    for(let i = 0; i < rules.length; i++) {
                        let rule = rules[i];
                        let result = rule($ngRedux, toState, toParams, fromState, fromParams, options);
                        if(result) {
                            stateGo(result.name, result.params, result.options);
                        }
                    }
                }
            }
        );
    }
}
