const Mongoose  =  require("mongoose");

const DataShcema = new Mongoose.Schema({
    value: {type: Number, required: true},
    wallet: {type: String, required: true},
    transaction: {type: Array},
    timestamp: {type: Date, default: Date.now(), required: true}
})

const DataModel = Mongoose.model("datas", DataShcema);
module.exports = DataModel;