let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { RouteTypeV1 } from '../../src/data/version1/RouteTypeV1';
import { ObjectRouteV1 } from '../../src/data/version1/ObjectRouteV1';
import { RoutesMemoryPersistence } from '../../src/persistence/RoutesMemoryPersistence';
import { RoutesController } from '../../src/logic/RoutesController';
import { RoutesLambdaFunction } from '../../src/container/RoutesLambdaFunction';

let now = new Date().getTime();
let interval = 300000;
let time1 = new Date(now);
let time2 = new Date(now + interval);
let time3 = new Date(now + 2 * interval);
let point1 = new Date(now);
let point2 = new Date(now + (interval / 2));
let point3 = new Date(now + interval);

suite('RoutesLambdaFunction', ()=> {
    let lambda: RoutesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-routes:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-routes:controller:default:default:1.0'
        );

        lambda = new RoutesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let route1: ObjectRouteV1;

        async.series([
        // Create one route
            (callback) => {
                lambda.act(
                    {
                        cmd: 'set_route',
                        route: { id: '1', org_id: '1', object_id: '1', type: RouteTypeV1.Travel, start_time: time1, end_time: time2, duration: 1000, positions: [] }
                    },
                    (err, result) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Create other routes
            (callback) => {
                lambda.act(
                    {
                        cmd: 'set_routes',
                        routes: [
                            { id: '2', org_id: '1', object_id: '1', type: RouteTypeV1.Stop, start_time: time1, end_time: time2, duration: 1000, positions: [] },
                            { id: '3', org_id: '1', object_id: '1', type: RouteTypeV1.Stay, start_time: time2, end_time: time3, duration: 1000, positions: [] },
                            { id: '4', org_id: '2', object_id: '2', type: RouteTypeV1.Travel, start_time: time1, end_time: time2, duration: 1000, positions: [] }
                        ]
                    },
                    (err, result) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get all routes
            (callback) => {
                lambda.act(
                    {
                        cmd: 'get_routes',
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 4);

                        callback();
                    }
                );
            },
        // Delete route
            (callback) => {
                lambda.act(
                    {
                        cmd: 'delete_route_by_id',
                        route_id: '1'
                    },
                    (err, result) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete routes
            (callback) => {
                lambda.act(
                    {
                        cmd: 'get_route_by_id',
                        route_id: '1'
                    },
                    (err, route) => {
                        assert.isNull(err);

                        assert.isNull(route || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});