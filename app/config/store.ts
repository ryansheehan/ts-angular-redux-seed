import {Action} from 'redux';
import {INgReduxProvider} from 'ng-redux';
import thunk from 'redux-thunk';
//noinspection TypeScriptCheckImport
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

export default function createStore($ngReduxProvider: INgReduxProvider):void {
    const logger = createLogger({
        predicate: (getState: any, action: Action) => {
            switch(action.type) {
                case '@@reduxUiRouter/$stateChangeStart':
                case '@@reduxUiRouter/$stateChangeSuccess':
                    return false;
            }
            return true;
        }
    });

    $ngReduxProvider.createStoreWith(rootReducer, ['ngUiRouterMiddleware', thunk, logger], []);
}