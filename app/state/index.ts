import {ICounterState} from './counter.state';
import {IRouterState} from './router.state';

export interface IRootState extends
    ICounterState,
    IRouterState
{
}
