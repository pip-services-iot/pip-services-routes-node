import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter, ISetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { ObjectRouteV1 } from '../data/version1/ObjectRouteV1';

export interface IRoutesPersistence extends IGetter<ObjectRouteV1, string>,
    ISetter<ObjectRouteV1>, IWriter<ObjectRouteV1, string> {
    
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ObjectRouteV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: ObjectRouteV1) => void): void;

    create(correlationId: string, item: ObjectRouteV1, 
        callback: (err: any, item: ObjectRouteV1) => void): void;

    set(correlationId: string, item: ObjectRouteV1, 
        callback: (err: any, item: ObjectRouteV1) => void): void;

    setBatch(correlationId: string, items: ObjectRouteV1[], 
        callback: (err: any) => void): void;
            
    update(correlationId: string, item: ObjectRouteV1, 
        callback: (err: any, item: ObjectRouteV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: ObjectRouteV1) => void): void;
            
    deleteByFilter(correlationId: string, filter: FilterParams,
        callback: (err: any) => void): void;
}
