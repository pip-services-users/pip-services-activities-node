import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { ActivitiesMicroservice } from '../run/ActivitiesMicroservice';
import { IActivitiesBusinessLogic } from '../logic/IActivitiesBusinessLogic';

export class ActivitiesLambdaFunction extends LambdaFunction {
    private _logic: IActivitiesBusinessLogic;

    constructor() {
        super(new ActivitiesMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <IActivitiesBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-activities", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}