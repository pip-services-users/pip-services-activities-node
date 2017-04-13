import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { ActivitiesFactory } from '../build/ActivitiesFactory';

export class ActivitiesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("activities", "Party activities function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-activities', 'controller', 'default', '*', '*'));
        this._factories.add(new ActivitiesFactory());
    }
}

export const handler = new ActivitiesLambdaFunction().getHandler();