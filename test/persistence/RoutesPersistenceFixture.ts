let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ObjectRouteV1 } from '../../src/data/version1/ObjectRouteV1';

import { IRoutesPersistence } from '../../src/persistence/IRoutesPersistence';
import { RouteTypeV1 } from '../../src/data/version1';

let now = new Date().getTime();
let interval = 300000;
let time1 = new Date(now);
let time2 = new Date(now + interval);
let time3 = new Date(now + 2 * interval);
let point1 = new Date(now);
let point2 = new Date(now + (interval / 2));
let point3 = new Date(now + interval);

export class RoutesPersistenceFixture {
    private _persistence: IRoutesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateRoutes(done) {
        async.series([
        // Create one route
            (callback) => {
                this._persistence.create(
                    null,
                    { id: '1', org_id: '1', object_id: '1', type: RouteTypeV1.Travel, start_time: time1, end_time: time2, duration: 1000, positions: [] },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Set other routes
            (callback) => {
                this._persistence.setBatch(
                    null,
                    [
                        { id: '2', org_id: '1', object_id: '1', type: RouteTypeV1.Stop, start_time: time1, end_time: time2, duration: 1000, positions: [] },
                        { id: '3', org_id: '1', object_id: '1', type: RouteTypeV1.Stay, start_time: time2, end_time: time3, duration: 1000, positions: [] },
                        { id: '4', org_id: '2', object_id: '2', type: RouteTypeV1.Travel, start_time: time1, end_time: time2, duration: 1000, positions: [] }
                    ],
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let route1: ObjectRouteV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateRoutes(callback);
            },
        // Get all routes
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 4);

                        route1 = page.data[0];

                        callback();
                    }
                );
            },
        // Delete route
            (callback) => {
                this._persistence.deleteById(
                    null,
                    '1',
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete routes
            (callback) => {
                this._persistence.getOneById(
                    null,
                    '1',
                    (err, route) => {
                        assert.isNull(err);

                        assert.isNull(route || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create routes
            (callback) => {
                this.testCreateRoutes(callback);
            },
        // Get routes filtered by organization
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, routes) => {
                        assert.isNull(err);

                        assert.isObject(routes);
                        assert.lengthOf(routes.data, 3);

                        callback();
                    }
                );
            },
        // Get routes by object_ids
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        object_ids: '2'
                    }),
                    new PagingParams(),
                    (err, routes) => {
                        assert.isNull(err);

                        assert.isObject(routes);
                        assert.lengthOf(routes.data, 1);

                        callback();
                    }
                );
            },
        // Get routes filtered time
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        from_time: time1,
                        to_time: time2
                    }),
                    new PagingParams(),
                    (err, routes) => {
                        assert.isNull(err);

                        assert.isObject(routes);
                        assert.lengthOf(routes.data, 3);

                        callback();
                    }
                );
            },
            // Get routes filtered by type
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        type: RouteTypeV1.Travel
                    }),
                    new PagingParams(),
                    (err, routes) => {
                        assert.isNull(err);

                        assert.isObject(routes);
                        assert.lengthOf(routes.data, 2);

                        callback();
                    }
                );
            },
        ], done);
    }
    
}
