//var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var Room = require('./room');
var utils = require('../util/utils');

var request = require('request');
var roomDao = module.exports;
var sqldata = require('../../../shared/config/sqldata.json')

var settings = require('../../config/settings.json')

/**
 * Create Bag
 *
 * @param {Number} playerId Player Id
 * @param {function} cb Call back function
 */
roomDao.getRoomByAppcode = function(appcode, cb) {
	var self = this;
	var args = [appcode];
	
	pomelo.app.get('dbclient').insert(sqldata.queryroomlist, args, function(err, res) {
		if (err) {
//			logger.error('create bag for roomDao failed! ' + err.stack);
			utils.invokeCallback(cb, err, null);
		} else {
            if (res && res.length === 1) {
                var result = res[0];
                var room = new Room(JSON.parse(result.romeinfo));
                room['timeline']=result.timeline;
                cb(null, room);
            } else {
                request(settings.moguurl+'?appcode='+appcode,function(error,response,body){
                    if(!error && response.statusCode == 200){
                        self.createRoom(appcode,body,cb);
                    }else{
                        utils.invokeCallback(cb, err, null);
                    }
                });
            }
		}
	});
};


roomDao.createRoom = function(appcode,roominfo, cb) {
    if(typeof roominfo !== 'string'){
        roominfo = JSON.stringify(items);
    }
    var args = [appcode, roominfo, new Date().getTime()];

    pomelo.app.get('dbclient').insert(sqldata.createroomlist, args, function(err, res) {
        if (err) {
            utils.invokeCallback(cb, err, null);
        } else {
            var room = new Room(JSON.parse(romeinfo));
            room['timeline']=args[2];
            utils.invokeCallback(cb, null, room);
        }
    });
};

/**
 * Update bag
 * @param {Object} bag Bag object.
 * @param {function} cb Call back function.
 */
roomDao.update = function(appcode,roominfo, cb) {
    var args = [roominfo, new Date().getTime(),appcode];

    pomelo.app.get('dbclient').insert(sqldata.updateroomlist, args, function(err, res) {
        if (err) {
            utils.invokeCallback(cb, err, null);
        } else {
            var room = new Room(JSON.parse(romeinfo));
            room['timeline']=args[1];
            utils.invokeCallback(cb, null, room);
        }
    });
};


