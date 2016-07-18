import {IState} from "angular-ui-router";

export class AboutRoute implements IState {
    name = 'about';
    url = '/about';
    template = `<tar-about></tar-about>`;
}
