"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const pip_services3_commons_node_9 = require("pip-services3-commons-node");
const ObjectRouteV1Schema_1 = require("../data/version1/ObjectRouteV1Schema");
class RoutesCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
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
    makeGetRoutesCommand() {
        return new pip_services3_commons_node_2.Command("get_routes", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_8.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_9.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getRoutes(correlationId, filter, paging, callback);
        });
    }
    makeGetRouteByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_route_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('route_id', pip_services3_commons_node_7.TypeCode.String), (correlationId, args, callback) => {
            let route_id = args.getAsString("route_id");
            this._logic.getRouteById(correlationId, route_id, callback);
        });
    }
    makeCreateRouteCommand() {
        return new pip_services3_commons_node_2.Command("create_route", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('route', new ObjectRouteV1Schema_1.ObjectRouteV1Schema()), (correlationId, args, callback) => {
            let route = args.get("route");
            this._logic.createRoute(correlationId, route, callback);
        });
    }
    makeSetRouteCommand() {
        return new pip_services3_commons_node_2.Command("set_route", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('route', new ObjectRouteV1Schema_1.ObjectRouteV1Schema()), (correlationId, args, callback) => {
            let route = args.get("route");
            this._logic.setRoute(correlationId, route, callback);
        });
    }
    makeSetRoutesCommand() {
        return new pip_services3_commons_node_2.Command("set_routes", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('routes', new pip_services3_commons_node_6.ArraySchema(new ObjectRouteV1Schema_1.ObjectRouteV1Schema())), (correlationId, args, callback) => {
            let routes = args.get("routes");
            this._logic.setRoutes(correlationId, routes, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
    makeUpdateRouteCommand() {
        return new pip_services3_commons_node_2.Command("update_route", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('route', new ObjectRouteV1Schema_1.ObjectRouteV1Schema()), (correlationId, args, callback) => {
            let route = args.get("route");
            this._logic.updateRoute(correlationId, route, callback);
        });
    }
    makeDeleteRouteByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_route_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('route_id', pip_services3_commons_node_7.TypeCode.String), (correlationId, args, callback) => {
            let routeId = args.getAsNullableString("route_id");
            this._logic.deleteRouteById(correlationId, routeId, callback);
        });
    }
    makeDeleteRoutesCommand() {
        return new pip_services3_commons_node_2.Command("delete_routes", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_8.FilterParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.deleteRoutes(correlationId, filter, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
}
exports.RoutesCommandSet = RoutesCommandSet;
//# sourceMappingURL=RoutesCommandSet.js.map