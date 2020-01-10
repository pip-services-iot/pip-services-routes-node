import { ConfigParams } from 'pip-services3-commons-node';

import { RoutesFilePersistence } from '../../src/persistence/RoutesFilePersistence';
import { RoutesPersistenceFixture } from './RoutesPersistenceFixture';

suite('RoutesFilePersistence', ()=> {
    let persistence: RoutesFilePersistence;
    let fixture: RoutesPersistenceFixture;
    
    setup((done) => {
        persistence = new RoutesFilePersistence('./data/routes.test.json');

        fixture = new RoutesPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});