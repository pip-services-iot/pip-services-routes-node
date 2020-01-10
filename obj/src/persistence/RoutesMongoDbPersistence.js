"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class RoutesMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('routes');
        super.ensureIndex({ org_id: 1, object_id: 1, start_time: -1, end_time: -1 });
        super.ensureIndex({ type: 1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "-start_time", null, callback);
    }
    setBatch(correlationId, routes, callback) {
        if (routes == null || routes.length == 0) {
            if (callback)
                callback(null);
            return;
        }
        let batch = this._collection.initializeUnorderedBulkOp();
        for (let route of routes) {
            let routeId = route.id || pip_services3_commons_node_2.IdGenerator.nextLong();
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
            if (callback)
                callback(null);
        });
    }
    deleteByFilter(correlationId, filter, callback) {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }
}
exports.RoutesMongoDbPersistence = RoutesMongoDbPersistence;
//# sourceMappingURL=RoutesMongoDbPersistence.js.map