import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { ObjectRouteV1 } from '../data/version1/ObjectRouteV1';
import { ObjectRouteV1Schema } from '../data/version1/ObjectRouteV1Schema';
import { IRoutesController } from './IRoutesController';

export class RoutesCommandSet extends CommandSet {
    private _logic: IRoutesController;

    constructor(logic: IRoutesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetRoutesCommand());
		this.addCommand(this.makeGetRouteByIdCommand());
		this.addCommand(this.makeCreateRouteCommand());
		this.addCommand(this.makeSetRouteCommand());
		this.addCommand(this.makeSetRoutesCommand());
		this.addCommand(this.makeUpdateRouteCommand());
		this.addCommand(this.makeDeleteRouteByIdCommand());
		this.addCommand(this.makeDeleteRoutesCommand());
    }

	private makeGetRoutesCommand(): ICommand {
		return new Command(
			"get_routes",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getRoutes(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetRouteByIdCommand(): ICommand {
		return new Command(
			"get_route_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('route_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let route_id = args.getAsString("route_id");
                this._logic.getRouteById(correlationId, route_id, callback);
            }
		);
	}
	
	private makeCreateRouteCommand(): ICommand {
		return new Command(
			"create_route",
			new ObjectSchema(true)
				.withRequiredProperty('route', new ObjectRouteV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let route = args.get("route");
                this._logic.createRoute(correlationId, route, callback);
            }
		);
	}

	private makeSetRouteCommand(): ICommand {
		return new Command(
			"set_route",
			new ObjectSchema(true)
				.withRequiredProperty('route', new ObjectRouteV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let route = args.get("route");
			    this._logic.setRoute(correlationId, route, callback);
            }
		);
	}

	private makeSetRoutesCommand(): ICommand {
		return new Command(
			"set_routes",
			new ObjectSchema(true)
				.withRequiredProperty('routes', new ArraySchema(new ObjectRouteV1Schema())),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let routes = args.get("routes");
			    this._logic.setRoutes(correlationId, routes, (err) => {
				   	if (callback) callback(err, null);
			   });
            }
		);
	}
	
	private makeUpdateRouteCommand(): ICommand {
		return new Command(
			"update_route",
			new ObjectSchema(true)
				.withRequiredProperty('route', new ObjectRouteV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let route = args.get("route");
                this._logic.updateRoute(correlationId, route, callback);
            }
		);
	}
	
	private makeDeleteRouteByIdCommand(): ICommand {
		return new Command(
			"delete_route_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('route_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let routeId = args.getAsNullableString("route_id");
                this._logic.deleteRouteById(correlationId, routeId, callback);
			}
		);
	}
	
	private makeDeleteRoutesCommand(): ICommand {
		return new Command(
			"delete_routes",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                this._logic.deleteRoutes(correlationId, filter, (err) => {
				   if (callback) callback(err, null);
			   });
			}
		);
	}

}