import {combineReducers, Reducer} from 'redux';
import {counter} from './counter.reducer';
import {IRootState} from '../state/index';

const rootReducer:Reducer<IRootState> = combineReducers<IRootState>({
    counter
});

export default rootReducer;