import {INgReduxProvider} from 'ng-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

export default function createStore($ngReduxProvider: INgReduxProvider):void {
    const logger = createLogger();

    $ngReduxProvider.createStoreWith(rootReducer, ['ngUiRouterMiddleware', thunk, logger], []);
}