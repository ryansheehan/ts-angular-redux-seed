import {INgReduxProvider} from 'ng-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';
import {reduxLoggingConfig as cfg} from './log.config';

export default class ReduxConfig {
    static $inject = ['$ngReduxProvider'];

    constructor($ngReduxProvider: INgReduxProvider) {
        const logger = createLogger({
            predicate: (getState: any, action: Redux.Action) => {
                switch(action.type) {
                    case '@@reduxUiRouter/$stateChangeStart':
                    case '@@reduxUiRouter/$stateChangeSuccess':
                    case '@@reduxUiRouter/stateGo':
                    case '@@reduxUiRouter/stateReload':
                    case '@@reduxUiRouter/stateTransitionTo':
                        if(!cfg.showRouteLogging) {
                            return false;
                        }
                }
                return true;
            },
        });

        let middleWare: any[] = ['ngUiRouterMiddleware', thunk];
        if(cfg.enabled) {
            middleWare.push(logger);
        }

        $ngReduxProvider.createStoreWith(rootReducer, middleWare, []);
    }
}