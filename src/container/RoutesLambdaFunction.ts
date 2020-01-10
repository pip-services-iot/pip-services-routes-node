import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { RoutesServiceFactory } from '../build/RoutesServiceFactory';

export class RoutesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("routes", "Object routes function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-routes', 'controller', 'default', '*', '*'));
        this._factories.add(new RoutesServiceFactory());
    }
}

export const handler = new RoutesLambdaFunction().getHandler();