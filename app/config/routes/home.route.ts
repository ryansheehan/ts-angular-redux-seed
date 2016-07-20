import {IRouterState} from "./state.interface";

export class HomeRoute implements IRouterState {
    name = 'home';
    url = '/home';
    template = `<tar-home></tar-home>`;
    data = {
        redirectTo: ''
    }
}