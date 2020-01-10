let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { RouteTypeV1 } from '../../../src/data/version1/RouteTypeV1';
import { ObjectRouteV1 } from '../../../src/data/version1/ObjectRouteV1';
import { RoutesMemoryPersistence } from '../../../src/persistence/RoutesMemoryPersistence';
import { RoutesController } from '../../../src/logic/RoutesController';
import { RoutesHttpServiceV1 } from '../../../src/services/version1/RoutesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let now = new Date().getTime();
let interval = 300000;
let time1 = new Date(now);
let time2 = new Date(now + interval);
let time3 = new Date(now + 2 * interval);
let point1 = new Date(now);
let point2 = new Date(now + (interval / 2));
let point3 = new Date(now + interval);

suite('RoutesHttpServiceV1', ()=> {    
    let service: RoutesHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new RoutesMemoryPersistence();
        let controller = new RoutesController();

        controller.configure(ConfigParams.fromTuples(
            'options.interval', 5 // Set interval to 5 mins
        ));

        service = new RoutesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-routes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-routes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-routes', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let route1: ObjectRouteV1;

        async.series([
        // Create one route
            (callback) => {
                rest.post('/v1/routes/set_route',
                    {
                        route: { id: '1', org_id: '1', object_id: '1', type: RouteTypeV1.Travel, start_time: time1, end_time: time2, duration: 1000, positions: [] }
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Create other routes
            (callback) => {
                rest.post('/v1/routes/set_routes',
                    {
                        routes: [
                            { id: '2', org_id: '1', object_id: '1', type: RouteTypeV1.Stop, start_time: time1, end_time: time2, duration: 1000, positions: [] },
                            { id: '3', org_id: '1', object_id: '1', type: RouteTypeV1.Stay, start_time: time2, end_time: time3, duration: 1000, positions: [] },
                            { id: '4', org_id: '2', object_id: '2', type: RouteTypeV1.Travel, start_time: time1, end_time: time2, duration: 1000, positions: [] }
                        ]
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get all routes
            (callback) => {
                rest.post('/v1/routes/get_routes',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 4);

                        callback();
                    }
                );
            },
        // Delete route
            (callback) => {
                rest.post('/v1/routes/delete_route_by_id',
                    {
                        route_id: '1'
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete routes
            (callback) => {
                rest.post('/v1/routes/get_route_by_id',
                    {
                        route_id: '1'
                    },
                    (err, req, res, route) => {
                        assert.isNull(err);

                        // assert.isNull(route || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});