import {ADD_USERS, DELETE_USERS, UPDATE_USERS, SET_USERS, UsersListAction} from '../actions/users.actions';
import {IUserState} from '../state/users.state';


function addUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    let newUsers: IUserState[] = [];

    for(const newUser of action.payload.newUsers) {
        let found = false;
        for(const user of state) {
            if(user.username === newUser.username) {
                found = true;
                break;
            }
        }
        if(!found) {
            newUsers.push(newUser)
        }
    }

    return state.concat(newUsers);
}

function removeUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    let start = 0;
    const slices: IUserState[][] = [];
    for(const [i, user] of state.entries()) {
        for(const oldUser of action.payload.oldUsers) {
            if(user.username === oldUser.username) {
                slices.push(state.slice(start, i));
                start = i+1;
                break;
            }
        }
    }
    if(start < state.length) {
        slices.push(state.slice(start));
    }

    const [first, ...more] = slices;
    return first.concat(...more);
}

function updateUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    //make sure new and old match so there are even swaps
    const {newUsers, oldUsers} = action.payload;
    if(newUsers.length != oldUsers.length) {
        return state;
    }

    const result: IUserState[] = [];
    for(const user of state) {
        let push = user;
        for(const [i, oldUser] of oldUsers.entries()) {
            if(user.username === oldUser.username) {
                push = newUsers[i];
                break;
            }
        }
        result.push(push);
    }

    return result;
}

function setUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    return action.payload.newUsers;
}

export default function usersReducer(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    switch(action.type) {
        case ADD_USERS:      return addUsers(state, action);
        case DELETE_USERS:   return removeUsers(state, action);
        case UPDATE_USERS:   return updateUsers(state, action);
        case SET_USERS:      return setUsers(state, action);
        default:             return state;
    }
}

