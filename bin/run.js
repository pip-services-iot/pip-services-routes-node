let RoutesProcess = require('../obj/src/container/RoutesProcess').RoutesProcess;

try {
    new RoutesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
