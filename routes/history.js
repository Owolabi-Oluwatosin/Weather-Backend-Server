const express = require("express");
const mongoose = require("mongoose");
const History = require('../models/history');
const router = express.Router();
mongoose.set('useFindAndModify', false);

//getting data from the database and displaying data in our chart on the frontend
router.get("/get-all-history", (req, res) => {
    History.find({})
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            console.log(err);
        });
});

//getting data from the frontend and saving it in our database
router.post(`/create-history`, (req, res) => {
    const { temp, humidity, pressure } = req.body;
    if (!temp && !humidity && !pressure) {
        return res.status(422).json({ error: "Something went wrong" });
    } else {
        const _History = new History({
            temp,
            humidity,
            pressure
        });
        _History.save().then(data => {
            if(data){
                res.status(200).json({ 
                    message: "Weather history created"
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
});

/*authomating weather history delete from our database
  creating deleteHistory function,
  search if there is weather history in our database
  then clear database
*/
const deleteHistory = () => {
    History.findOne({})
        .exec((history) => {
            if(history){
                history.remove({}, function(err, removed){
                    if(err){
                        res.status(422).json({ error: err })
                    }
                    if(removed){
                        res.status(200).json({
                            removed,
                            message: "Weather history clear"
                        })
                    }
                })
            }
        })
}

//calling deleteHistory function created above after every 30 days
setInterval(() => {
    deleteHistory();
}, 5000);


module.exports = router;