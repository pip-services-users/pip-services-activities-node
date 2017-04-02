let ActivitiesProcess = require('../obj/src/container/ActivitiesProcess').ActivitiesProcess;

try {
    new ActivitiesProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
