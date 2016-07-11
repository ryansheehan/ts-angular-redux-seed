import {combineReducers, Reducer} from 'redux';
import counterReducer from './counter.reducer';
import {IRootState} from '../state/index';
import {router} from 'redux-ui-router';

const rootReducer:Reducer<IRootState> = combineReducers<IRootState>({
    counter: counterReducer,
    router
});

export default rootReducer;