import {IComponentOptions} from 'angular';
import {INgRedux} from 'ng-redux';
import {IRouterState} from '../../state/router.state';
import {IState} from 'angular-ui-router';

class AppMainController {
    static $inject = ['$ngRedux'];

    unsubscribe: Function;

    $onDestroy() {
        this.unsubscribe();
    }

    constructor(private $ngRedux: INgRedux) {
        this.unsubscribe = this.$ngRedux.connect(
            (state: IRouterState)=>{ 
                let route: IState = <IState>state.router.currentState;
                return { route: route.name };
            }
        )(this);
    }
}

export class AppMainComponent implements IComponentOptions {
    templateUrl = 'app/components/main/main.template.html';
    controllerAs = 'vm';
    controller = AppMainController;
}
