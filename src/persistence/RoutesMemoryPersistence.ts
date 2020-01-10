let _ = require('lodash');
let async = require('async');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { ObjectRouteV1 } from '../data/version1/ObjectRouteV1';
import { IRoutesPersistence } from './IRoutesPersistence';

export class RoutesMemoryPersistence 
    extends IdentifiableMemoryPersistence<ObjectRouteV1, string> 
    implements IRoutesPersistence {

    constructor() {
        super();
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let objectId = filter.getAsNullableString('object_id');
        let orgId = filter.getAsNullableString('org_id');
        let type = filter.getAsNullableString('type');
        let objectIds = filter.getAsObject('object_ids');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        
        // Process ids filter
        if (_.isString(objectIds))
            objectIds = objectIds.split(',');
        if (!_.isArray(objectIds))
            objectIds = null;
        
        return (item) => {
            if (objectId && item.object_id != objectId) 
                return false;
            if (objectIds && _.indexOf(objectIds, item.object_id) < 0)
                return false;
            if (orgId && item.org_id != orgId) 
                return false;
            if (type && item.type != type) 
                return false;
            if (fromTime && item.end_time.getTime() < fromTime.getTime()) 
                return false;
            if (toTime && item.start_time.getTime() >= toTime.getTime()) 
                return false;
            return true;
        };
    }
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ObjectRouteV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter),
            paging, null, null, callback);
    }

    public setBatch(correlationId: string, routes: ObjectRouteV1[],
        callback: (err: any) => void): void {

        async.each(routes, (route, callback) => {
            this.set(
                correlationId,
                route,
                callback
            );
        }, callback);
    }
    
    public deleteByFilter(correlationId: string, filter: FilterParams,
        callback: (err: any) => void): void {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }

}
