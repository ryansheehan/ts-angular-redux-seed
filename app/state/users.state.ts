export interface IUserState {
    username: string;
    password: string;
}

export class User implements IUserState {
    static idGen = 100;
    static generate(count = 1): IUserState[] {
        let list: IUserState[]  = [];
        for(var i = 0; i < count; i++) {
            list.push(new User('user' + User.idGen, 'password'));
            User.idGen += 1;
        }

        return list;
    }

    constructor(public username: string = 'user', public password: string = 'password') {}
}


export interface IUserListState {
    users: IUserState[];
}
