import { IStringIdentifiable } from 'pip-services3-commons-node';
import { PositionV1 } from './PositionV1';
import { AddressV1 } from './AddressV1';

export class ObjectRouteV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public object_id: string;
    public type: string;
    public start_time: Date;
    public start_addr?: AddressV1;
    public end_time: Date;
    public end_addr?: AddressV1;
    public duration: number;
    public positions: PositionV1[];
}
