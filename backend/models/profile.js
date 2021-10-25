const Mongoose  =  require("mongoose");

const profileShcema = new Mongoose.Schema({
    wallet: {type:  String, required: true},
    timestamp: {type: Date, default: Date.now(), required: true}
})

const profileDataModel = Mongoose.model("profiles", profileShcema);
module.exports = profileDataModel;