# ts-angular-redux-seed

###  Key Libraries Used:

- TypeScript
- systemJS
- Angular 1.5
- ui-angular-router
- angular-material
- redux
    - redux-ui-router
    - redux-thunk
    - redux-logger
    
#### Included but not utilized:
- moment
- immutable

### App Structure
- heirarchy of components
- routing just uses a component

## How to use this seed

### Add a Component
1. Create a new folder in `app/components`
2. Create component file(s)
3. Create component template partial(s)
4. Register component in `app/components/index.ts`
    1. Find `function registerComponents(module:IModule)`
    2. Add to list with `.Component('myComponent', new MyComponent())`
    3. Now your `<my-component/>` is available in your app
    
### Register a new route
1. Create new route state in `app/config/routes/`
    * Use registered component for the template
    * define any state requirements under the `resolve` object
    * define any state rules for rejecting the route
2. Add new router state in `app/config/routes/index.ts` under `registerRoutes($stateProvider: IStateProvider)`    
3. Add menu item to `app/components/main/main.template.html`
    1. Under `<md-navbar ... \>`
    2. Add `<md-nav-item md-nav-sref="myRouteKey" name="myRouteName">My Route Nave</md-nav-item>`
   
### Add new application data 
*_All business data and component state should be captured by redux store_*

#### Business Data
1. Export related business data interface in a file under `app/state`
2. In `app/state/index.ts` extend `IRootState` with your new interface

#### Application State
1. Export component state interface in component folder
2. In `app/state/index.ts` extend `IRootState` with your new interface

### Add business logic

#### Create Actions
1. Create new action file in `app/actions`
2. Create new action interfaces by extending redux `Action` interface
    - Add additional payload identifiers
3. \[Recommended\] Create functions to dispatch the action
    - Function can return the Action object
    - Function can return a function which takes the redux dispatch method and the getState method and the method definition calls dispatch with a pointer to a function that returns an action.
        
        ```typescript
        import {Action} from 'redux';
        import {Dispatch} from 'ng-redux';
        import {ICounterState} from '../state/counter.state';
        
        /*
        interface ICounterState {
            counter: number
        }
         */
        
        // unique key
        export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
        
        // Add payload properties if they are required by the reducer
        export interface CounterAction extends Action {}
        
        export function increment(): CounterAction {
            return {type: INCREMENT_COUNTER};
        }
        
        // example that takes the getState() function as an argument
        export function incrementIfOdd() {
            return (dispatch:Dispatch<CounterAction>, getState: ()=>ICounterState) => {
                const {counter} = getState();
        
                if(counter % 2 == 0) {
                    return;
                }
        
                dispatch(increment());
            }
        }
        
        // possible thanks to redux-thunk
        export function incrementAsync(delay = 1000) {
            return (dispatch:Dispatch<Action>):void => {
                setTimeout(() => dispatch(increment()), delay);
            }
        }
        ```

#### Create Reducers
1. Create new reducer file in `app/reducers`
2. Export your reducer method that handles your actions and updates the application to the new state
    
    ```typescript
    // import the strings defined in our actions fle
    import {INCREMENT_COUNTER, DECREMENT_COUNTER} from '../actions/counter.actions';
    import {Action} from 'redux'
    
    // reducer function for the set of business/application data
    export default function counterReducer(state: number = 0, action: Action): number {
        switch(action.type) {
            case INCREMENT_COUNTER:
                return state + 1;
            case DECREMENT_COUNTER:
                return state - 1;
            default:
                return state;
        }
    }
    ```
3. Register reducer function with the root reducer in `app/reducers/index.ts`
    - **Note:** The key used in the rootReducer is what components will match against to suck in the action functions
    
#### \[Optional\] Patch component controller with relavent redux store state and action functions
1. In a component controller, use ng-redux to call connect method
2. Remember to unhook from store events when the component is destroyed
    
    ```typescript
    import {INgRedux} from 'ng-redux';  
    import {increment, incrementAsync, incrementIfOdd} from '../../actions/counter.actions';
    import {ICounterState} from '../../state/counter.state';

    /*
    interface ICounterState {
        counter: number;
    }
     */

    class ComponentController {
        static $inject = ['$ngRedux'];
    
        unsubscribe: Function;
        
        // $onDestroy available in angular 1.5.3
        // otherwise inject $scope and use $scope.$on('$destroy', unsubscribe);
        // in the constructor
        $onDestroy() {
            this.unsubscribe();
        }
    
        constructor(private $ngRedux: INgRedux) {
        
            // $ngRedux.connect() injects and updates properties defined
            // in the redux store
            this.unsubscribe = this.$ngRedux.connect(
                // function to extract the desired portion of the state in
                // in the store.  The return structure defines what property
                // on the controller will be created.
                
                // in this case, a "value" property will be added to the controller
                // and it is bound to the stores root level property "counter"
                // anytime a reducer updates "counter" in the redux store
                // the "value" property will be updated.
                (state: ICounterState)=>{ return { value: state.counter}; },
                
                // this argument is optional, but it is an object which values
                // are the methods declared in our actions file.  The keys become
                // the names of the functions that added to the controller.
                // This voodoo magic is very convenient when hooking up to
                // the template.
                { increment, incrementAsync, incrementIfOdd}
                
            // very important is that $ngRedux.connect() actually returns a function
            // what we are doing making the controller the target for the injection
            // of state properties and action methods
            )(this);
        }
    }
    ```
3. If the action methods are connected to controller, then they can be called from the view off the controller.

    ```html
    <div>Count: {{vm.counter}}</div>
    <md-button ng-click="vm.increment()">Increment Count</md-button>
    ```

### Addition Items
 
#### redux-logger
Helper flags reside in `app/config/log.config.ts` on the `reduxLoggingConfig` object
    - enabled \[boolean\]: enables or disables redux-logger from logging state changes to the console
    - showRouteLogging \[boolean\]: shows  or not show routing state changes in the log


    
## Todo
- setup systemJS Builder
- setup unit testing infrastructure
- setup immutable data examples in redux
- setup ng-annotate