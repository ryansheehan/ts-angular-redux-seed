export interface IRouterState extends angular.ui.IState {
    data: { [key:string]:any; redirectTo: string}
}
