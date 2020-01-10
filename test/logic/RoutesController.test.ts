let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';

import { RouteTypeV1 } from '../../src/data/version1/RouteTypeV1';
import { ObjectRouteV1 } from '../../src/data/version1/ObjectRouteV1';
import { RoutesMemoryPersistence } from '../../src/persistence/RoutesMemoryPersistence';
import { RoutesController } from '../../src/logic/RoutesController';

let now = new Date().getTime();
let interval = 300000;
let time1 = new Date(now);
let time2 = new Date(now + interval);
let time3 = new Date(now + 2 * interval);
let point1 = new Date(now);
let point2 = new Date(now + (interval / 2));
let point3 = new Date(now + interval);

suite('RoutesControllerV1', () => {
    let persistence: RoutesMemoryPersistence;
    let controller: RoutesController;

    suiteSetup(() => {
        persistence = new RoutesMemoryPersistence();
        controller = new RoutesController();

        controller.configure(ConfigParams.fromTuples(
            'options.interval', 5 // Set interval to 5 mins
        ));

        let references: References = References.fromTuples(
            new Descriptor('pip-services-routes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-routes', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
    });

    setup((done) => {
        persistence.clear(null, done);
    });

    test('CRUD Operations', (done) => {
        let route1: ObjectRouteV1;

        async.series([
            // Create one route
            (callback) => {
                let route = { id: '1', org_id: '1', object_id: '1', type: RouteTypeV1.Travel, start_time: time1, end_time: time2, duration: 1000, positions: [] }

                route.positions.push({ time: new Date(123), lat: 1, lng: 1 });
                route.positions.push({ time: new Date(124), lat: 1, lng: 1 });
                route.positions.push({ time: new Date(125), lat: 1, lng: 1 });
                route.positions.push({ time: new Date(126), lat: 1, lng: 1 });
                route.positions.push({ time: new Date(127), lat: 1, lng: 1 });
                controller.setRoute(
                    null,
                    route,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Create other routes
            (callback) => {
                controller.setRoutes(
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
            },
            // Get all routes
            (callback) => {
                controller.getRoutes(
                    null,
                    null,
                    null,
                    (err, page) => {
                        assert.isNull(err);
                        assert.isObject(page);
                        assert.lengthOf(page.data, 4);

                        callback();
                    }
                );
            },
            // Get all routes and compress positions
            (callback) => {
                controller.getRoutes(
                    null,
                    FilterParams.fromValue({
                        compress: 3
                    }),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 4);

                        let route = page.data[0]; 
                        assert.lengthOf(route.positions, 3);
 
                        callback();
                    }
                );
            },
            // Delete route
            (callback) => {
                controller.deleteRouteById(
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
                controller.getRouteById(
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
    });
});