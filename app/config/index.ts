import {IModule} from 'angular';
import RouterConfig from './router.config';
import ReduxConfig from './redux.config';
import {registerConstants} from './routes/index';


export function registerConfigurations(module: IModule) {
    registerConstants(module);
    module
        .config(RouterConfig)
        .config(ReduxConfig);
}


