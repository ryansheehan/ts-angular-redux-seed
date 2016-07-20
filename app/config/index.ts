import {IModule} from 'angular';
import RouterConfig, {routerErrorManager} from './router.config';
import ReduxConfig from './redux.config';

export function registerConfigurations(module: IModule) {
    module
        .config(RouterConfig)
        .config(ReduxConfig)
        .run(routerErrorManager);
}


