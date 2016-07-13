import {ADD_USER, DELETE_USER, UPDATE_USER, UsersListAction} from '../actions/users.actions';
import {IUserState} from '../state/users.state';

function checkUserDataValid(user:IUserState): boolean {
    return user && user.username && user.password
}

function addUser(state: IUserState[], action: UsersListAction): IUserState[] {
    if(!(action.payload && checkUserDataValid(action.payload.newUser))) {
        return state;
    }

    let found = false;
    for(var i = 0; i < state.length && !found; i++) {
        if(state[i].username === action.payload.newUser.username) {
            found = true;
        }
    }

    if(!found) {
        return state.concat(action.payload.newUser);
    }

    return state;
}

function removeUser(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    if(!(action.payload && checkUserDataValid(action.payload.oldUser))) {
        return state;
    }

    let found = false;
    for(var i = 0; i < state.length && !found; i++) {
        if(state[i].username == action.payload.oldUser.username) {
            return [...state.slice(0, i), ...state.slice(i+1)];
        }
    }

    return state;
}

function updateUser(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    if(action.payload && checkUserDataValid(action.payload.newUser) && checkUserDataValid(action.payload.oldUser)) {
        return state;
    }

    let found = false;
    for(var i = 0; i < state.length && !found; i++) {
        if(state[i].username === action.payload.oldUser.username) {
            return [...state.slice(0, i), action.payload.newUser, ...state.slice(i+1)];
        }
    }

    return state;
}

export default function usersReducer(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    switch(action.type) {
        case ADD_USER:      return addUser(state, action);
        case DELETE_USER:   return removeUser(state, action);
        case UPDATE_USER:   return updateUser(state, action);
        default:            return state;
    }
}

