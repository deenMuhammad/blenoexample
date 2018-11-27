const LIGHTSERVICEUUID = "ef1b45f6-f227-11e8-8eb2-f2801f1b9fd1";
var bleno = require("bleno");
var StopCharacteristic = require('./stopCharacterstic');
var TurnRightCharacteristic = require('./turnRightCharacteristic');
var TurnLeftCharacteristic = require('./turnLeftCharctersitic');

bleno.on("advertisingStart", err => {
console.log("Configuring services...");
    
if(err) {
    console.error(err);
    return;
} 

let lightService = new bleno.PrimaryService({
    uuid: LIGHTSERVICEUUID,
    characteristics: [
        StopCharacteristic,
        TurnRightCharacteristic,
        TurnLeftCharacteristic
    ]
});
bleno.setServices([lightService], err => {
    if(err)
        console.log(err);
    else
        console.log("Services configured");
});
});
bleno.on("stateChange", state => {
if (state === "poweredOn") {
    
    bleno.startAdvertising("Calculator", [CALCULATOR_SERVICE_UUID], err => {
        if (err) console.log(err);
    });
} else {
    console.log("Stopping...");
    bleno.stopAdvertising();
}        
});