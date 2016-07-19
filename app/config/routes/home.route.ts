import {IState} from "angular-ui-router";

export class HomeRoute implements IState {
    static get NAME() { return 'home' };
    static get URL() { return '/home' };

    name = HomeRoute.NAME;
    url = HomeRoute.URL;
    template = `<tar-home></tar-home>`;
}