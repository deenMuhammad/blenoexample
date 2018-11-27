var bleno = require("bleno");


const STOP_CHARCTERISTIC_UUID = "ef1b3f7a-f227-11e8-8eb2-f2801f1b9fd1"
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

module.exports = StopCharacteristic;