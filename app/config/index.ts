import IModule = angular.IModule;
import RouterConfig from './router.config';
import ReduxConfig from './redux.config';


export function registerConfigurations(module: IModule) {
    module
        .config(RouterConfig)
        .config(ReduxConfig);
}
