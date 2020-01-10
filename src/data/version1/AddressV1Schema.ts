import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class AddressV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('line1', TypeCode.String);
        this.withRequiredProperty('line2', TypeCode.String);
        this.withRequiredProperty('city', TypeCode.String);
        this.withRequiredProperty('state', TypeCode.String);
        this.withRequiredProperty('postal_code', TypeCode.String);
        this.withRequiredProperty('country_code', TypeCode.String);
    }
}
