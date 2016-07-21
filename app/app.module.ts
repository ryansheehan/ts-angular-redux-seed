import 'angular';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-ui-router';
import 'redux-ui-router';
import 'redux';
import 'ng-redux';

import {registerConfigurations} from './config/index';
import {registerComponents} from './components/index';
import {registerServices} from "./services/index";

let app = angular.module('app', ['ngMaterial', 'ui.router', 'ngRedux', 'ng-ui-router-middleware']);

registerServices(app);
registerConfigurations(app);
registerComponents(app);

export default app;
