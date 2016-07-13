import {Action} from 'redux';
//import {Dispatch} from 'ng-redux';
import {/*IUserListState,*/ IUserState} from '../state/users.state';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export interface UsersListAction extends Action {
    payload: {
        newUser: IUserState,
        oldUser: IUserState
    };
}

export function addUser(user:IUserState): UsersListAction {
    return { type: ADD_USER, payload: {newUser: user, oldUser: undefined} };
}

export function deleteUser(user:IUserState): UsersListAction {
    return {type: DELETE_USER, payload: {newUser: undefined, oldUser: user}};
}

export function updateUser(oldUser:IUserState, newUser:IUserState): UsersListAction {
    return {type: UPDATE_USER, payload: {oldUser, newUser}};
}