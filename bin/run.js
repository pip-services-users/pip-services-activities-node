/**
 * @file Party activities process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var ActivitiesProcessRunner = require('../lib/src/run/ActivitiesProcessRunner').ActivitiesProcessRunner;

var runner = new ActivitiesProcessRunner();
runner.startWithDefaultConfig('../config/config.json');