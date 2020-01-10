import { ConfigParams } from 'pip-services3-commons-node';

import { RoutesMemoryPersistence } from '../../src/persistence/RoutesMemoryPersistence';
import { RoutesPersistenceFixture } from './RoutesPersistenceFixture';

suite('RoutesMemoryPersistence', ()=> {
    let persistence: RoutesMemoryPersistence;
    let fixture: RoutesPersistenceFixture;
    
    setup((done) => {
        persistence = new RoutesMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new RoutesPersistenceFixture(persistence);
        
        persistence.open(null, done);
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