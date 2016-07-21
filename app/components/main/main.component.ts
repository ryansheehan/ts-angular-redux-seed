import {INgRedux} from 'ng-redux';
import {IRouterState} from '../../state/router.state';

class AppMainController {
    static $inject = ['$ngRedux'];

    unsubscribe: Function;

    $onDestroy() {
        this.unsubscribe();
    }

    constructor(private $ngRedux: INgRedux) {
        this.unsubscribe = this.$ngRedux.connect(
            (state: IRouterState)=>{ 
                let route: angular.ui.IState = <angular.ui.IState>state.router.currentState;
                return { route: route.name };
            }
        )(this);
    }
}

export class AppMainComponent implements angular.IComponentOptions {
    templateUrl = 'app/components/main/main.template.html';
    controllerAs = 'vm';
    controller = AppMainController;
}
