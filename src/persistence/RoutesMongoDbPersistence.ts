let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { ObjectRouteV1 } from '../data/version1/ObjectRouteV1';
import { IRoutesPersistence } from './IRoutesPersistence';

export class RoutesMongoDbPersistence
    extends IdentifiableMongoDbPersistence<ObjectRouteV1, string>
    implements IRoutesPersistence {

    constructor() {
        super('routes');
        super.ensureIndex({ org_id: 1, object_id: 1, start_time: -1, end_time: -1 });
        super.ensureIndex({ type: 1 });
    }

    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });

        let objectId = filter.getAsNullableString('object_id');
        if (objectId != null)
            criteria.push({ object_id: objectId });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });

        // Filter ids
        let objectIds = filter.getAsObject('object_ids');
        if (_.isString(objectIds))
            objectIds = objectIds.split(',');
        if (_.isArray(objectIds))
            criteria.push({ object_id: { $in: objectIds } });

        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ end_time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ start_time: { $lt: toTime } });

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ObjectRouteV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter),
            paging, "-start_time",  null, callback);
    }

    public setBatch(correlationId: string, routes: ObjectRouteV1[],
        callback: (err: any) => void): void {

        if (routes == null || routes.length == 0) {
            if (callback) callback(null);
            return;
        }

        let batch = this._collection.initializeUnorderedBulkOp();

        for (let route of routes) {
            let routeId = route.id || IdGenerator.nextLong();
            route = _.omit(route, "id");

            batch
                .find({
                    _id: routeId
                })
                .upsert()
                .updateOne({
                    $set: route
                });
        }

        batch.execute((err) => {
            if (!err)
                this._logger.trace(correlationId, "Set " + routes.length + " routes");

            if (callback) callback(null);
        });
    }

    public deleteByFilter(correlationId: string, filter: FilterParams,
        callback: (err: any) => void): void {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }

}
