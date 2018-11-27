var bleno = require("bleno");



const STOP_CHARCTERISTIC_UUID = "ef1b3f7a-f227-11e8-8eb2-f2801f1b9fd1";
class StopCharacteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: STOP_CHARCTERISTIC_UUID,
            properties: ["read"],
            value: null,
            descriptors: [
                new bleno.Descriptor({
                    uuid: "2901",
                    value: "Stop characterstic"
                  })
            ]
        });
    }
    onReadRequest(offset, callback) {
        try {
            const result =1;//this is hardcoded 
            //here possibly we will have the python code for committing the desired stop light command
            console.log(`Returning result: ${result}`);
            let data = new Buffer(1);
            data.writeUInt8(result, 0);
            callback(this.RESULT_SUCCESS, data);
        } catch (err) {
            console.error(err);
            callback(this.RESULT_UNLIKELY_ERROR);
        }
    }
}

const  TURN_RIGHT_CHARCTERISTIC_UUID = "ef1b433a-f227-11e8-8eb2-f2801f1b9fd1";
class TurnRightCharactersitic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: TURN_RIGHT_CHARCTERISTIC_UUID,
            properties: ["read"],
            value: null,
            descriptors: [
                new bleno.Descriptor({
                    uuid: "2901",
                    value: "turn right characterstic"
                  })
            ]
        });
    }
    onReadRequest(offset, callback) {
        try {
            const result =1;//this is hardcoded 
            //here possibly we will have the python code for committing the desired turn right light command
            console.log(`Returning result: ${result}`);
            let data = new Buffer(1);
            data.writeUInt8(result, 0);
            callback(this.RESULT_SUCCESS, data);
        } catch (err) {
            console.error(err);
            callback(this.RESULT_UNLIKELY_ERROR);
        }
    }
}

const  TURN_LEFT_CHARCTERISTIC_UUID = "ef1b44c0-f227-11e8-8eb2-f2801f1b9fd1";
class TurnLeftCharactersitic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: TURN_LEFT_CHARCTERISTIC_UUID,
            properties: ["read"],
            value: null,
            descriptors: [
                new bleno.Descriptor({
                    uuid: "2901",
                    value: "turn left characterstic"
                  })
            ]
        });
    }
    onReadRequest(offset, callback) {
        try {
            const result =1;//this is hardcoded 
            //here possibly we will have the python code for committing the desired turn left light command
            console.log(`Returning result: ${result}`);
            let data = new Buffer(1);
            data.writeUInt8(result, 0);
            callback(this.RESULT_SUCCESS, data);
        } catch (err) {
            console.error(err);
            callback(this.RESULT_UNLIKELY_ERROR);
        }
    }
}

const LIGHTSERVICEUUID = "ef1b45f6-f227-11e8-8eb2-f2801f1b9fd1";

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
        TurnRightCharactersitic,
        TurnLeftCharactersitic
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
    
    bleno.startAdvertising("Light Service", [LIGHTSERVICEUUID], err => {
        if (err) console.log(err);
    });
} else {
    console.log("Stopping...");
    bleno.stopAdvertising();
}        
});