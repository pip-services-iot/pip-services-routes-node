import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class RoutesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/routes');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-routes', 'controller', 'default', '*', '1.0'));
    }
}