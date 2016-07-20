import {IState} from "angular-ui-router";

export interface IRouterState extends IState {
    data: { [key:string]:any; redirectTo: string}
}
