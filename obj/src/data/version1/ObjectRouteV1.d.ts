import { IStringIdentifiable } from 'pip-services3-commons-node';
import { PositionV1 } from './PositionV1';
import { AddressV1 } from './AddressV1';
export declare class ObjectRouteV1 implements IStringIdentifiable {
    id: string;
    org_id: string;
    object_id: string;
    type: string;
    start_time: Date;
    start_addr?: AddressV1;
    end_time: Date;
    end_addr?: AddressV1;
    duration: number;
    positions: PositionV1[];
}
