import {INgReduxProvider} from 'ng-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function createStore($ngReduxProvider: INgReduxProvider):void {
    $ngReduxProvider.createStoreWith(rootReducer, [thunk], []);
}