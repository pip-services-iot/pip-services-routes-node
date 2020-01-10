import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { ObjectRouteV1 } from '../data/version1/ObjectRouteV1';
import { IRoutesPersistence } from './IRoutesPersistence';
export declare class RoutesMongoDbPersistence extends IdentifiableMongoDbPersistence<ObjectRouteV1, string> implements IRoutesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ObjectRouteV1>) => void): void;
    setBatch(correlationId: string, routes: ObjectRouteV1[], callback: (err: any) => void): void;
    deleteByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
}
