import {ICounterState} from './counter.state';
import {IUserListState} from './users.state';
import {IRouterState} from './router.state';

export interface IRootState extends
    ICounterState,
    IUserListState,
    IRouterState
{
}
