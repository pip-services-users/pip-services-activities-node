let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';

import { IActivitiesBusinessLogic } from '../../logic/IActivitiesBusinessLogic';

export class ActivitiesRestService extends RestService {       
	/**
	 * Unique descriptor for the ActivitiesRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-activities", "rest", "1.0"
	);
    
	private _logic: IActivitiesBusinessLogic;

    constructor() {
        super(ActivitiesRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IActivitiesBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-activities", "*", "*")
		);

		super.link(components);		
	}
    
    private getPartyActivities(req, res) {
        let filterParams = _.clone(req.params);
        
        if (req.params.partyId)
          filterParams.party_id = req.params.partyId;
        
        this._logic.getPartyActivities(
            req.params.correlation_id,
            FilterParams.fromValue(filterParams),
            PagingParams.fromValue(req.params),
            this.sendResult(req, res)
        );
    }

    private logPartyActivity(req, res) {
        this._logic.logPartyActivity(
            req.params.correlation_id,
            req.body,
            this.sendResult(req, res)
        );
    }
        
    private batchPartyActivities(req, res) {
        this._logic.batchPartyActivities(
            req.params.correlation_id,
            req.body,
            this.sendResult(req, res)
        );
    }

    private deletePartyActivities(req, res) {
        this._logic.deletePartyActivities(
            req.params.correlation_id,
            new FilterParams(req.body),
            this.sendResult(req, res)
        );
    }

    protected register() {
        this.registerRoute('get', '/activities', this.getPartyActivities);
        this.registerRoute('get', '/activities/:partyId', this.getPartyActivities);
        this.registerRoute('post', '/activities', this.logPartyActivity);
        this.registerRoute('post', '/activities/batch', this.batchPartyActivities);
        this.registerRoute('delete', '/activities/', this.deletePartyActivities);
    }
}
