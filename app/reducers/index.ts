import {combineReducers, Reducer} from 'redux';
import {counter} from './counter.reducer';
import {IRootState} from '../state/index';
import {router} from 'redux-ui-router';

const rootReducer:Reducer<IRootState> = combineReducers<IRootState>({
    counter,
    router
});

export default rootReducer;