import {IModule} from 'angular';
import {AppMainComponent} from './main/main.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';

export function registerComponents(module:IModule) {
    let componentList = [
        AppMainComponent,
        AboutComponent,
        HomeComponent
    ];
    
    componentList.forEach((c)=>{module.component(c.CID, new c())});
}
