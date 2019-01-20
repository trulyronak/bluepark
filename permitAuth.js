const bleno = require('../blue/bleno/')
const verifyId = require('./verifyId.js')

// hardware
// const Gpio = require('onoff').Gpio
// let LED = new Gpio(4, 'out')

function PermitAuthRequestCharacteristic(parkingSpot) {
	this.parkingSpot = parkingSpot
	bleno.Characteristic.call(this, {
		uuid: '13333333333333333333333333330001',
		properties: [
			"write", "read"
		]
	})
}

PermitAuthRequestCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
	if (offset) {
		callback(this.RESULT_ATTR_NOT_LONG);
	} else if (data.length !== 2) {
		callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
	} else {
		if (offset) {
			callback(this.RESULT_ATTR_NOT_LONG);
		}
		else if (data.length !== 1) {
			callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
		}
		else {
			let id = data.readUInt8(0);
			if (verifyId(id)) {
				confirmSpot(this.parkingSpot.location, id)
				// LED.writeSync(0)
			} else {
				// LED.writeSync(1)
			}
		}
	}
}

PermitAuthRequestCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = PermitAuthRequestCharacteristic