/**
 * @file Party activities seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var ActivitiesSenecaPlugin = require('../lib/src/run/ActivitiesSenecaPlugin').ActivitiesSenecaPlugin;
var plugin = new ActivitiesSenecaPlugin();

module.exports = plugin.entry();