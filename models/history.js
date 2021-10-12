const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    temp:{
        type: String
    },
    humidity:{
        type:String
    },
    pressure: {
        type: String
    },
    name: {
        type: String
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('History', HistorySchema);


