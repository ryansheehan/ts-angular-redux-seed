import 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'ng-redux';
import 'redux-ui-router';

import {registerConfigurations} from './config/index';
import {registerComponents} from './components/index';
import {registerServices} from "./services/index";


let app = angular.module('app', ['ngMaterial', 'ui.router', 'ngRedux', 'ng-ui-router-middleware']);

registerServices(app);
registerConfigurations(app);
registerComponents(app);

export default app;
