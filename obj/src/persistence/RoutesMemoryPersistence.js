"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class RoutesMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    setBatch(correlationId, routes, callback) {
        async.each(routes, (route, callback) => {
            this.set(correlationId, route, callback);
        }, callback);
    }
    deleteByFilter(correlationId, filter, callback) {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }
}
exports.RoutesMemoryPersistence = RoutesMemoryPersistence;
//# sourceMappingURL=RoutesMemoryPersistence.js.map