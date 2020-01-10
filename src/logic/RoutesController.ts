let _ = require('lodash');
let async = require('async');
let moment = require('moment');

import { ConfigParams, IdGenerator } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { ObjectRouteV1 } from '../data/version1/ObjectRouteV1';
import { IRoutesPersistence } from '../persistence/IRoutesPersistence';
import { IRoutesController } from './IRoutesController';
import { RoutesCommandSet } from './RoutesCommandSet';
import { RouteTypeV1, PositionV1 } from '../data/version1';

export class RoutesController implements  IConfigurable, IReferenceable, ICommandable, IRoutesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-routes:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(RoutesController._defaultConfig);
    private _persistence: IRoutesPersistence;
    private _commandSet: RoutesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IRoutesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new RoutesCommandSet(this);
        return this._commandSet;
    }
    
    // public getRoutes(correlationId: string, filter: FilterParams, paging: PagingParams, 
    //     callback: (err: any, page: DataPage<ObjectRouteV1>) => void): void {
    //     this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    // }
    
    private compressPositions(positions: PositionV1[], compressVal: number): PositionV1[] {
        let newPositions: PositionV1[] = [];
        let i: number;
        for (i = 0; i < positions.length; i = i + compressVal) {
            newPositions.push(positions[i]);
        }

        // add last position
        if (i - compressVal != positions.length - 1) {
            newPositions.push(positions[positions.length - 1])
        }

        return newPositions;
    }

    public getRoutes(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ObjectRouteV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, (err: any, page: DataPage<ObjectRouteV1>) => {
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

            let compressVal: number = filter.getAsLong('compress');
            // make compression
            _.each(page.data, (route: ObjectRouteV1) => {
                if (route.type == RouteTypeV1.Travel && route.positions && route.positions.length > 2) {
                    route.positions = this.compressPositions(route.positions, compressVal);
                }
            });

            callback(err, page);
        });
    }

    public getRouteById(correlationId: string, route_id: string, 
        callback: (err: any, route: ObjectRouteV1) => void): void {
        this._persistence.getOneById(correlationId, route_id, callback);
    }

    private fixRoute(route: ObjectRouteV1): ObjectRouteV1 {
        route.id = IdGenerator.nextLong();
        route.type = route.type || RouteTypeV1.Travel;
        route.start_time = DateTimeConverter.toDateTime(route.start_time);
        route.end_time = DateTimeConverter.toDateTimeWithDefault(route.end_time, route.start_time);
        route.duration = route.end_time.getTime() - route.start_time.getTime();

        for (let pos of route.positions) {
            pos.time = DateTimeConverter.toDateTimeWithDefault(pos.time, route.start_time);
        }

        return route;
    }

    public createRoute(correlationId: string, route: ObjectRouteV1, 
        callback: (err: any, route: ObjectRouteV1) => void): void {
        route = this.fixRoute(route);
        this._persistence.create(correlationId, route, callback);
    }

    public setRoute(correlationId: string, route: ObjectRouteV1,
        callback?: (err: any, route: ObjectRouteV1) => void): void {
        route = this.fixRoute(route);
        this._persistence.set(correlationId, route, callback);
    }

    public setRoutes(correlationId: string, routes: ObjectRouteV1[],
        callback?: (err: any) => void): void {
        
        if (routes == null || routes.length == 0) {
            if (callback) callback(null);
            return;
        }

        for (let route of routes) {
            route = this.fixRoute(route);
        }

        this._persistence.setBatch(correlationId, routes, callback);
    }

    public updateRoute(correlationId: string, route: ObjectRouteV1, 
        callback: (err: any, route: ObjectRouteV1) => void): void {
        route = this.fixRoute(route);
        this._persistence.update(correlationId, route, callback);
    }

    public deleteRouteById(correlationId: string, route_id: string,
        callback: (err: any, route: ObjectRouteV1) => void): void {
        this._persistence.deleteById(correlationId, route_id, callback);
    }
    
    public deleteRoutes(correlationId: string, filter: FilterParams,
        callback?: (err: any) => void): void {  
        this._persistence.deleteByFilter(correlationId, filter, callback);
    }

}
