"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const AddressV1Schema_1 = require("./AddressV1Schema");
const PositionV1Schema_1 = require("./PositionV1Schema");
class ObjectRouteV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('object_id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('type', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('start_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('start_addr', new AddressV1Schema_1.AddressV1Schema());
        this.withRequiredProperty('end_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('end_addr', new AddressV1Schema_1.AddressV1Schema());
        this.withRequiredProperty('duration', pip_services3_commons_node_3.TypeCode.Long);
        this.withOptionalProperty('positions', new pip_services3_commons_node_2.ArraySchema(new PositionV1Schema_1.PositionV1Schema()));
    }
}
exports.ObjectRouteV1Schema = ObjectRouteV1Schema;
//# sourceMappingURL=ObjectRouteV1Schema.js.map