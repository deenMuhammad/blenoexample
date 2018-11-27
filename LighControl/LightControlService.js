const bleno = require("bleno");
const Light_service_UUID = "ea87e794-ec03-11e8-8eb2-f2801f1b9fd1";
const TurnLeftUUID = "ea87ea50-ec03-11e8-8eb2-f2801f1b9fd1";
const TurnRightUUID = "ea87eba4-ec03-11e8-8eb2-f2801f1b9fd1";
const StopUUID = "ea87ecda-ec03-11e8-8eb2-f2801f1b9fd1";

class StopCharacteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: StopUUID,
            properties: ["read"],
            value: null,
            descriptors: [
                new bleno.Descriptor({
                    uuid: "2901",
                    value: "Stop Button"
                })
            ]
        });
    }
    onReadRequest(offset, callback) {
        try {
            const result = 1; //hard coded result
            console.log('Stop Button Pressed');//here comes code for raspberry hardware control code
            let data = new Buffer(1);
            data.writeUInt8(result, 0);
            callback(this.RESULT_SUCCESS, data);
        } catch (err) {
            console.error(err);
            callback(this.RESULT_UNLIKELY_ERROR);
        }
    }
}
class TurnRightCharacteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: TurnRightUUID,
            properties: ["read"],
            value: null,
            descriptors: [
                new bleno.Descriptor({
                    uuid: "2901",
                    value: "Turn Right Button"
                })
            ]
        });
    }
    onReadRequest(offset, callback) {
        try {
            const result = 1; //hard coded result
            console.log('Turn Right Button Pressed');//here comes code for raspberry hardware control code
            let data = new Buffer(1);
            data.writeUInt8(result, 0);
            callback(this.RESULT_SUCCESS, data);
        } catch (err) {
            console.error(err);
            callback(this.RESULT_UNLIKELY_ERROR);
        }
    }
}

class TurnLeftCharacteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: TurnLeftUUID,
            properties: ["read"],
            value: null,
            descriptors: [
                new bleno.Descriptor({
                    uuid: "2901",
                    value: "Turn Left Button"
                })
            ]
        });
    }
    onReadRequest(offset, callback) {
        try {
            const result = 1; //hard coded result
            console.log('Turn Left Button Pressed');//here comes code for raspberry hardware control code
            let data = new Buffer(1);
            data.writeUInt8(result, 0);
            callback(this.RESULT_SUCCESS, data);
        } catch (err) {
            console.error(err);
            callback(this.RESULT_UNLIKELY_ERROR);
        }
    }
}

bleno.on("advertisingStart", err => {
    console.log("Configuring services...");

    if (err) {
        console.error(err);
        return;
    }
    let stopChar = new StopCharacteristic();
    let rightChar = new TurnRightCharacteristic();
    let leftChar = new TurnLeftCharacteristic();
    let LightService = new bleno.PrimaryService({
        uuid: Light_service_UUID,
        characteristics: [
            stopChar,
            rightChar,
            leftChar
        ]
    });
    bleno.setServices([LightService], err => {
        if (err)
            console.log(err);
        else
            console.log("Services configured");
    });
});
bleno.on("stateChange", state => {
    if (state === "poweredOn") {

        bleno.startAdvertising("LightService", [Light_service_UUID], err => {
            if (err) console.log(err);
        });
    } else {
        console.log("Stopping...");
        bleno.stopAdvertising();
    }
});