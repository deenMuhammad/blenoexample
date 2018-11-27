const LIGHTSERVICEUUID = "ef1b45f6-f227-11e8-8eb2-f2801f1b9fd1";
var bleno = require("bleno");
var StopCharacteristic = require('./stopCharacterstic');
var TurnRightCharacteristic = require('./turnRightCharacteristic');
var TurnLeftCharacteristic = require('./turnLeftCharctersitic');

var util = require('util');


function LightService() {
    bleno.PrimaryService.call(this, {
        uuid: LIGHTSERVICEUUID,
        characteristics: [
            StopCharacteristic,
            TurnRightCharacteristic,
            TurnLeftCharacteristic
        ]
    });
}

util.inherits(LightService, bleno.PrimaryService);

module.exports = LightService;