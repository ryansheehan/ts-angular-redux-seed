import RouterConfig, {routerErrorManager} from './router.config';
import ReduxConfig from './redux.config';

export function registerConfigurations(module: angular.IModule) {
    module
        .config(RouterConfig)
        .config(ReduxConfig)
        .run(routerErrorManager);
}


