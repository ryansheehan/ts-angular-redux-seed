export interface IUserState {
    username: string;
    password: string;
}

export interface IUserListState {
    users: IUserState[];
}