import {IState} from "angular-ui-router";

export class AboutRoute implements IState {
    static get NAME() { return 'about' };
    static get URL() { return '/about'};

    name = AboutRoute.NAME;
    url = AboutRoute.URL;
    template = `<tar-about></tar-about>`;
}
