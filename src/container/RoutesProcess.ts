import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { RoutesServiceFactory } from '../build/RoutesServiceFactory';

export class RoutesProcess extends ProcessContainer {

    public constructor() {
        super("routes", "Object routes microservice");
        this._factories.add(new RoutesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
