import {ADD_USERS, DELETE_USERS, UPDATE_USERS, SET_USERS, UsersListAction} from '../actions/users.actions';
import {IUserState} from '../state/users.state';

function addUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    let newUsers: IUserState[] = [];

    for(const newUser of action.payload.newUsers) {
        state.findIndex(user => user.username === newUser.username) === -1 ?
            newUsers.push(newUser) : angular.noop();
    }

    return state.concat(newUsers);
}

function removeUsers(state: IUserState[] = [], action: UsersListAction): IUserState[] {
    let start = 0;
    const slices: IUserState[][] = [];
    for(const oldUser of action.payload.oldUsers) {
        const i = state.findIndex(user => user.username === oldUser.username);
        if(i >= 0) {
            slices.push(state.slice(start, i));
            start = i + 1;
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
        const i = oldUsers.findIndex(oldUser => oldUser.username === user.username);
        const push = i > -1 ? newUsers[i] : user;
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

