import {ADD_USER, DELETE_USER, UsersListAction} from '../actions/users.actions';
import {IUserState} from '../state/users.state';

function addUser(state: IUserState[], action: UsersListAction): IUserState[] {
    if(!(action.payload && action.payload.username && action.payload.password)) {
        return state;
    }

    let found = false;
    for(var i = 0; i < state.length && !found; i++) {
        if(state[i].username === action.payload.username) {
            found = true;
        }
    }

    if(!found) {
        return state.concat(action.payload);
    }

    return state;
}

function removeUser(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    if(!(action.payload && action.payload.username)) {
        return state;
    }

    let found = false;
    for(var i = 0; i < state.length && !found; i++) {
        if(state[i].username == action.payload.username) {
            return [...state.slice(0, i), ...state.slice(i+1)];
        }
    }

    return state;
}

export default function usersReducer(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    switch(action.type) {
        case ADD_USER:      return addUser(state, action);
        case DELETE_USER:   return removeUser(state, action);

        default:            return state;
    }
}

