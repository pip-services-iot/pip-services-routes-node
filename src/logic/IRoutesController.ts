import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ObjectRouteV1 } from '../data/version1/ObjectRouteV1';

export interface IRoutesController {
    getRoutes(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ObjectRouteV1>) => void): void;
        
    getRouteById(correlationId: string, route_id: string, 
        callback: (err: any, route: ObjectRouteV1) => void): void;

    createRoute(correlationId: string, route: ObjectRouteV1, 
        callback: (err: any, route: ObjectRouteV1) => void): void;

    setRoute(correlationId: string, route: ObjectRouteV1,
        callback?: (err: any, route: ObjectRouteV1) => void): void;

    setRoutes(correlationId: string, routes: ObjectRouteV1[],
        callback?: (err: any) => void): void;
            
    updateRoute(correlationId: string, route: ObjectRouteV1, 
        callback: (err: any, route: ObjectRouteV1) => void): void;

    deleteRouteById(correlationId: string, route_id: string,
        callback: (err: any, route: ObjectRouteV1) => void): void;
                        
    deleteRoutes(correlationId: string, filter: FilterParams,
        callback?: (err: any) => void): void;
}
