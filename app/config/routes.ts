import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';
import {ILocationProvider} from 'angular';

export function registerRoutes($stateProvider: IStateProvider,
                               $urlRouterProvider: IUrlRouterProvider,
                               $locationProvider: ILocationProvider){
    
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            template: `<tar-home></tar-home>`
        })
        .state('about', {
            url: "/about",
            template: `<tar-about></tar-about>`
        });

    $locationProvider.html5Mode(true);
}
