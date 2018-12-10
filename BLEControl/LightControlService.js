const bleno = require("bleno");
const Light_service_UUID = "ea87e794-ec03-11e8-8eb2-f2801f1b9fd1";
const TurnLeftUUID = "ea87ea50-ec03-11e8-8eb2-f2801f1b9fd1";
const TurnRightUUID = "ea87eba4-ec03-11e8-8eb2-f2801f1b9fd1";
const StopUUID = "ea87ecda-ec03-11e8-8eb2-f2801f1b9fd1";
const COUNTER_CHAR_UUID = "ef1b472c-f227-11e8-8eb2-f2801f1b9fd1";


class CounterCharacteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: COUNTER_CHAR_UUID,
            properties: ["notify"],
            value: null
        });

        this.counter = 0;
    }

    onSubscribe(maxValueSize, updateValueCallback) {
        console.log(`Counter subscribed, max value size is ${maxValueSize}`);
        this.updateValueCallback = updateValueCallback;
        this.start();
    }

    onUnsubscribe() {
        console.log("Counter unsubscribed");
        this.updateValueCallback = null;
    }    

    sendNotification(value) {
        if(this.updateValueCallback) {
            console.log(`Sending notification with value ${value}`);

            const notificationBytes = new Buffer(2);
            notificationBytes.writeInt16LE(value);

            this.updateValueCallback(notificationBytes);
        }
    }

    start() {
        console.log("Starting counter");
        this.handle = setInterval(() => {
            var spawn = require("child_process").spawn;
            var process = spawn('python',["./python/detectspeed.py"]);
            var data

            process.stdout.on('data',function(chunk){

                var textChunk = parseInt(chunk.toString('utf8'));// buffer to string
                data = textChunk
            });
            this.counter = (data) % 0xFFFF;
            this.sendNotification(this.counter);
        }, 2000);
    }

    stop() {
        console.log("Stopping counter");
        clearInterval(this.handle);
        this.handle = null;
    }
}

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
            const spawn = require("child_process").spawn;
            const pythonProcess = spawn('python',["./python/test.py"]);

            pythonProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            
            pythonProcess.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });
            
            pythonProcess.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
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
    let speed = new CounterCharacteristic();
    let LightService = new bleno.PrimaryService({
        uuid: Light_service_UUID,
        characteristics: [
            stopChar,
            rightChar,
            speed,
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

        bleno.startAdvertising("Raspberry BLE Conrol", [Light_service_UUID], err => {
            if (err) console.log(err);
        });
    } else {
        console.log("Stopping...");
        bleno.stopAdvertising();
    }
});