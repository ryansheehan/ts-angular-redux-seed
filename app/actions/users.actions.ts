import {Action} from 'redux';
//import {Dispatch} from 'ng-redux';
import {/*IUserListState,*/ IUserState} from '../state/users.state';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
//export const EDIT_USER_NAME = 'EDIT_USER_NAME';
//export const EDIT_USER_PASSWORD = 'EDIT_USER_PASSWORD';

export interface UsersListAction extends Action {
    payload: IUserState;
}

export function addUser(user:IUserState): UsersListAction {
    return { type: ADD_USER, payload: user };
}

export function deleteUser(user:IUserState): UsersListAction {
    return {type: DELETE_USER, payload: user};
}