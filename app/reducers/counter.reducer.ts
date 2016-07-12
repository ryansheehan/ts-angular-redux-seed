import {INCREMENT_COUNTER, DECREMENT_COUNTER, CounterAction} from '../actions/counter.actions';

export default function counterReducer(state: number = 0, action: CounterAction): number {
    switch(action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        default:
            return state;
    }
}
