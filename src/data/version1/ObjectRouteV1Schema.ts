import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { AddressV1Schema } from './AddressV1Schema';
import { PositionV1Schema } from './PositionV1Schema';

export class ObjectRouteV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('org_id', TypeCode.String);
        this.withRequiredProperty('object_id', TypeCode.String);
        this.withRequiredProperty('type', TypeCode.String);
        this.withRequiredProperty('start_time', TypeCode.DateTime);
        this.withOptionalProperty('start_addr', new AddressV1Schema());
        this.withRequiredProperty('end_time', TypeCode.DateTime);
        this.withOptionalProperty('end_addr', new AddressV1Schema());
        this.withRequiredProperty('duration', TypeCode.Long);
        this.withOptionalProperty('positions', new ArraySchema(new PositionV1Schema()));
    }
}
