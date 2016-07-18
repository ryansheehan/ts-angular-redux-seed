import {Action} from 'redux';
import {IUserState} from '../state/users.state';

export const SET_USERS = 'SET_USERS';
export const ADD_USERS = 'ADD_USER';
export const DELETE_USERS = 'DELETE_USER';
export const UPDATE_USERS = 'UPDATE_USER';

export interface UsersListAction extends Action {
    payload: {
        newUsers: IUserState[],
        oldUsers: IUserState[]
    };
}

export function addUsers(users:IUserState[]): UsersListAction {
    return { type: ADD_USERS, payload: {newUsers: users, oldUsers: []} };
}

export function deleteUsers(users:IUserState[]): UsersListAction {
    return {type: DELETE_USERS, payload: {newUsers: [], oldUsers: users}};
}

export function updateUsers(oldUsers:IUserState[], newUsers:IUserState[]): UsersListAction {
    return {type: UPDATE_USERS, payload: {oldUsers, newUsers}};
}

export function setUsers(users: IUserState[]): UsersListAction {
    return {type: SET_USERS, payload: {newUsers: users, oldUsers: []}};
}

