import { CommandSet } from 'pip-services3-commons-node';
import { IRoutesController } from './IRoutesController';
export declare class RoutesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IRoutesController);
    private makeGetRoutesCommand;
    private makeGetRouteByIdCommand;
    private makeCreateRouteCommand;
    private makeSetRouteCommand;
    private makeSetRoutesCommand;
    private makeUpdateRouteCommand;
    private makeDeleteRouteByIdCommand;
    private makeDeleteRoutesCommand;
}
