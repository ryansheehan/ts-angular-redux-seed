import {INgRedux} from 'ng-redux';
import {increment, decrement, incrementAsync, incrementIfOdd} from '../../actions/counter.actions';
import {ICounterState} from '../../state/counter.state';

class CounterController {
    static $inject = ['$ngRedux'];

    unsubscribe: Function;
    
    
    $onDestroy() {
        this.unsubscribe();
    }

    constructor(private $ngRedux: INgRedux) {
        this.unsubscribe = this.$ngRedux.connect(
            (state: ICounterState)=>{ return { counter: state.counter}; },
            { increment, decrement, incrementAsync, incrementIfOdd}
        )(this);
    }
}

export class CounterComponent implements angular.IComponentOptions {
    templateUrl = "app/components/counter/counter.template.html";
    controllerAs = "vm";
    controller = CounterController;
}
