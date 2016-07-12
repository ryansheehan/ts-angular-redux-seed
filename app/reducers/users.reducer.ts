import {ADD_USER, DELETE_USER, AddUserAction, DeleteUserAction} from '../actions/users.actions';
import {Action} from 'redux';
import {IUserState} from '../state/users.state';

export default function usersReducer(state: IUserState[], action: Action): IUserState[] {
    switch(action.type) {
        case ADD_USER:
            let addAction = <AddUserAction>action;
            if(!(addAction && addAction.payload && addAction.payload.username && addAction.payload.password)) {
                break;
            }

            let found = false;
            for(var i = 0; i < state.length && !found; i++) {
                if(state[i].username === addAction.payload.username) {
                    found = true;
                }
            }

            if(!found) {
                return state.concat(addAction.payload);
            }

            break;

        case DELETE_USER:
            let deleteAction = <DeleteUserAction>action;
            if(!(deleteAction && deleteAction.payload)) {
                break;
            }

            let found = false;
            let i = 0;
            for(; i < state.length && !found; i++) {
                if(state[i].username === deleteAction.payload) {
                    found = true;
                }
            }

            if(found) {
                return [...state.slice(0, i), ...state.slice(i+1)];
            }

            break;

        default:
            return state;
    }
    return state;
}

