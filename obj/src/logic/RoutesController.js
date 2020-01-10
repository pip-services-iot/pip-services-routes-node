"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let moment = require('moment');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const RoutesCommandSet_1 = require("./RoutesCommandSet");
const version1_1 = require("../data/version1");
class RoutesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(RoutesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new RoutesCommandSet_1.RoutesCommandSet(this);
        return this._commandSet;
    }
    // public getRoutes(correlationId: string, filter: FilterParams, paging: PagingParams, 
    //     callback: (err: any, page: DataPage<ObjectRouteV1>) => void): void {
    //     this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    // }
    compressPositions(positions, compressVal) {
        let newPositions = [];
        let i;
        for (i = 0; i < positions.length; i = i + compressVal) {
            newPositions.push(positions[i]);
        }
        // add last position
        if (i - compressVal != positions.length - 1) {
            newPositions.push(positions[positions.length - 1]);
        }
        return newPositions;
    }
    getRoutes(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, (err, page) => {
            if (err) {
                callback(err, page);
                return;
            }
            // check the need for compression
            if (!filter || !filter.getAsLong('compress')) {
                callback(err, page);
                return;
            }
            // check data
            if (!page || !page.data || page.data.length == 0) {
                callback(err, page);
                return;
            }
            let compressVal = filter.getAsLong('compress');
            // make compression
            _.each(page.data, (route) => {
                if (route.type == version1_1.RouteTypeV1.Travel && route.positions && route.positions.length > 2) {
                    route.positions = this.compressPositions(route.positions, compressVal);
                }
            });
            callback(err, page);
        });
    }
    getRouteById(correlationId, route_id, callback) {
        this._persistence.getOneById(correlationId, route_id, callback);
    }
    fixRoute(route) {
        route.id = pip_services3_commons_node_1.IdGenerator.nextLong();
        route.type = route.type || version1_1.RouteTypeV1.Travel;
        route.start_time = pip_services3_commons_node_3.DateTimeConverter.toDateTime(route.start_time);
        route.end_time = pip_services3_commons_node_3.DateTimeConverter.toDateTimeWithDefault(route.end_time, route.start_time);
        route.duration = route.end_time.getTime() - route.start_time.getTime();
        for (let pos of route.positions) {
            pos.time = pip_services3_commons_node_3.DateTimeConverter.toDateTimeWithDefault(pos.time, route.start_time);
        }
        return route;
    }
    createRoute(correlationId, route, callback) {
        route = this.fixRoute(route);
        this._persistence.create(correlationId, route, callback);
    }
    setRoute(correlationId, route, callback) {
        route = this.fixRoute(route);
        this._persistence.set(correlationId, route, callback);
    }
    setRoutes(correlationId, routes, callback) {
        if (routes == null || routes.length == 0) {
            if (callback)
                callback(null);
            return;
        }
        for (let route of routes) {
            route = this.fixRoute(route);
        }
        this._persistence.setBatch(correlationId, routes, callback);
    }
    updateRoute(correlationId, route, callback) {
        route = this.fixRoute(route);
        this._persistence.update(correlationId, route, callback);
    }
    deleteRouteById(correlationId, route_id, callback) {
        this._persistence.deleteById(correlationId, route_id, callback);
    }
    deleteRoutes(correlationId, filter, callback) {
        this._persistence.deleteByFilter(correlationId, filter, callback);
    }
}
exports.RoutesController = RoutesController;
RoutesController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-routes:persistence:*:*:1.0');
//# sourceMappingURL=RoutesController.js.map