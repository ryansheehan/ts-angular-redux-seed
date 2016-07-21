import {AppMainComponent} from './main/main.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user.component';

export function registerComponents(module:angular.IModule) {
    module
        .component('appMain', new AppMainComponent())
        .component('tarAbout', new AboutComponent())
        .component('tarHome', new HomeComponent())
        .component('tarCounter', new CounterComponent())
        .component('tarUsers', new UsersComponent())
        .component('tarUser', new UserComponent());
}


