const bleno = require("bleno");
const CALCULATOR_SERVICE_UUID = "ea87e794-ec03-11e8-8eb2-f2801f1b9fd1";
const ARGUMENT_1_UUID = "ea87ea50-ec03-11e8-8eb2-f2801f1b9fd1";
const ARGUMENT_2_UUID = "ea87eba4-ec03-11e8-8eb2-f2801f1b9fd1";
const RESULT_UUID = "ea87ecda-ec03-11e8-8eb2-f2801f1b9fd1";

class ArgumentCharacteristic extends bleno.Characteristic {
constructor(uuid, name) {
super({
uuid: uuid,
properties: ["write"],;
value: null,
descriptors: [
new bleno.Descriptor({
uuid: "2901",
value: name
})
]
});
this.argument = 0;
this.name = name;
}
onWriteRequest(data, offset, withoutResponse, callback) {
try {
if(data.length != 1) {
callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
return;
}
this.argument = data.readUInt8();
console.log(Argument ${this.name} is now ${this.argument});
callback(this.RESULT_SUCCESS);
} catch (err) {
console.error(err);
callback(this.RESULT_UNLIKELY_ERROR);
}
}
}

class ResultCharacteristic extends bleno.Characteristic {
constructor(calcResultFunc) {
super({
uuid: RESULT_UUID,
properties: ["read"],
value: null,
descriptors: [
new bleno.Descriptor({
uuid: "2901",
value: "Calculation result"
})
]
});
this.calcResultFunc = calcResultFunc;
}
onReadRequest(offset, callback) {
try {
const result = this.calcResultFunc();
console.log(Returning result: ${result});
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

if(err) {
    console.error(err);
    return;
}
let argument1 = new ArgumentCharacteristic(ARGUMENT_1_UUID, "Argument 1");
let argument2 = new ArgumentCharacteristic(ARGUMENT_2_UUID, "Argument 2");
let result = new ResultCharacteristic(() => argument1.argument + argument2.argument);
let calculator = new bleno.PrimaryService({
    uuid: CALCULATOR_SERVICE_UUID,
    characteristics: [
        argument1,
        argument2,
        result
    ]
});
bleno.setServices([calculator], err => {
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