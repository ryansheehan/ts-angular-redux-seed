import {ICounterState} from './counter.state';
import {ReduxUIRouterState} from 'redux-ui-router';

export interface IRootState extends
    ICounterState
{
    router: ReduxUIRouterState
}
