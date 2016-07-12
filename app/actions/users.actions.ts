import {Action} from 'redux';
//import {Dispatch} from 'ng-redux';
import {/*IUserListState,*/ IUserState} from '../state/users.state';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
//export const EDIT_USER_NAME = 'EDIT_USER_NAME';
//export const EDIT_USER_PASSWORD = 'EDIT_USER_PASSWORD';

export interface AddUserAction extends Action {
    payload: IUserState;
}

export interface DeleteUserAction extends Action {
    payload: string;
}

export function addUser(user:IUserState): AddUserAction {
    return { type: ADD_USER, payload: user };
}

export function deleteUser(username:string): DeleteUserAction {
    return {type: DELETE_USER, payload: username};
}