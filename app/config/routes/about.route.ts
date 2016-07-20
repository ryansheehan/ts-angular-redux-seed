import {IRouterState} from "./state.interface";

export class AboutRoute implements IRouterState {
    name = 'about';
    url = '/about';
    template = `<tar-about></tar-about>`;
    data = {
        redirectTo: ''
    }
}
