import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
export declare class ActivitiesProcess extends ProcessContainer {
    protected initReferences(references: IReferences): void;
    runWithArguments(args: string[]): void;
}
