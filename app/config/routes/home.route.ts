import {IState} from "angular-ui-router";

export let HOME_ROUTE = '/home';

export class HomeRoute implements IState {
    name = 'home';
    url = HOME_ROUTE;
    template = `<tar-home></tar-home>`;
}