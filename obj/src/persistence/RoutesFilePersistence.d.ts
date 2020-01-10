import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { RoutesMemoryPersistence } from './RoutesMemoryPersistence';
import { ObjectRouteV1 } from '../data/version1/ObjectRouteV1';
export declare class RoutesFilePersistence extends RoutesMemoryPersistence {
    protected _persister: JsonFilePersister<ObjectRouteV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
