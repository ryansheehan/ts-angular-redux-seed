import {Dispatch, Action} from 'redux';
import {ICounterState} from '../state/counter.state';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

interface CounterAction extends Action {}

export function increment(): CounterAction {
    return {type: INCREMENT_COUNTER};
}

export function decrement(): CounterAction {
    return {type: DECREMENT_COUNTER};
}

export function incrementIfOdd() {
    return (dispatch:Dispatch<CounterAction>, getState: ()=>ICounterState) => {
        const {counter} = getState();

        if(counter % 2 == 0) {
            return;
        }

        dispatch(increment());
    }
}

export function incrementAsync(delay = 1000) {
    return (dispatch:Dispatch<Action>):void => {
        setTimeout(() => dispatch(increment()), delay);
    }
}