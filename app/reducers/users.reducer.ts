import {ADD_USERS, DELETE_USERS, UPDATE_USERS, SET_USERS, UsersListAction} from '../actions/users.actions';
import {IUserState} from '../state/users.state';


function addUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    let newUsers: IUserState[] = [];
    for(var a = 0; a < action.payload.newUsers.length; a++) {
        let found = false;
        let newUser = action.payload.newUsers[a];
        for(var i = 0; i < state.length && !found; i++) {
            let user = state[i];
            if(user.username === newUser.username) {
                found = true;
            }
        }
        if(!found) {
            newUsers.push(newUser);
        }
    }

    return state.concat(newUsers);
}

function removeUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    let start = 0;
    let slices: IUserState[][] = [];
    for(var i = 0; i < state.length; i++) {
        let user = state[i];
        let found = false;
        for(var d = 0; d < action.payload.oldUsers.length && !found; d++) {
            let oldUser = action.payload.oldUsers[d];
            if(user.username === oldUser.username) {
                found = true;
                slices.push(state.slice(start, i));
                start = i+1;
            }
        }
    }

    let result: IUserState[] = [];
    result.concat(...slices);
    return result;
}

function updateUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    //make sure new and old match so there are even swaps
    if(action.payload.newUsers.length != action.payload.oldUsers.length) {
        return state;
    }

    let result: IUserState[] = [];
    for(var i = 0; i < state.length; i++) {
        let sample = state[i];
        let found = false;
        for(var o = 0; o < action.payload.oldUsers.length && !found; o++) {
            let oldUser = action.payload.oldUsers[o];
            if(sample.username === oldUser.username) {
                result.push(action.payload.newUsers[o]);
                found = true;
            }
        }
        if(!found) {
            result.push(sample);
        }
    }

    return result;
}

function setUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    return action.payload.newUsers;
}

export default function usersReducer(state: IUserState[], action: UsersListAction): IUserState[] {
    // if(!state) {
    //     state = [{username: 'default', password: 'user'}];
    // }

    if(state === undefined) {
        state = [];
    }

    switch(action.type) {
        case ADD_USERS:      return addUsers(state, action);
        case DELETE_USERS:   return removeUsers(state, action);
        case UPDATE_USERS:   return updateUsers(state, action);
        case SET_USERS:      return setUsers(state, action);
        default:             return state;
    }
}

