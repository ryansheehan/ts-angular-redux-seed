import {IState} from "angular-ui-router";

export class HomeRoute implements IState {
    name = 'home';
    url = '/home';
    template = `<tar-home></tar-home>`;
}