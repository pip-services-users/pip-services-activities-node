let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { IActivitiesBusinessLogic } from '../../logic/IActivitiesBusinessLogic';

export class ActivitiesSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the ActivitiesSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-activities", "seneca", "1.0"
	);

    private _logic: IActivitiesBusinessLogic;

    constructor() {
        super(ActivitiesSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IActivitiesBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-activities", "*", "*")
		);

		super.link(components);		

        this.registerCommands('activities', this._logic.getCommands());
	}
}
