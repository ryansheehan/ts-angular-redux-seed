import {INCREMENT_COUNTER, DECREMENT_COUNTER} from '../actions/counter.actions';
import {Action} from 'redux'

export default function counterReducer(state: number = 0, action: Action): number {
    switch(action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        default:
            return state;
    }
}
