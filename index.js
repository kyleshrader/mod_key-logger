'use strict';
var breach = require('breach_module')
var common = require('./lib/common.js');
var key_handler;

breach.init(function() {
    breach.register('core', 'tabs:keyboard');
    breach.register('core', 'controls:keyboard');

    breach.expose('init', function(src, args, cb_) {
        breach.module('core').on('tabs:keyboard', key_handler);
        breach.module('core').on('controls:keyboard', key_handler);
        return cb_();
    });

    breach.expose('kill', function(args, cb_) {
        common.exit(0);
    });
});

process.on('uncaughtException', function(err) {
    common.fatal(err);
});

key_handler = function(evt) {
    common.log.out(JSON.stringify(evt));
};
