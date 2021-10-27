const router = require("express").Router();
const profileDataModel = require("../models/profile")
const DataModel = require("../models/calculator")

// set profile
router.get("/profile", async(req, res) => {
    wallet = req.query.wallet;

    await profileDataModel.find({ wallet: wallet})
    .then((result) => {
        if(result.length == 0) addWallet();
    }).catch((err) => {
        return res.json({err});
    });

    async function addWallet() {
        await new profileDataModel({
            wallet: wallet
        }).save()
        .then((result) => {
            console.log(result);
            return res.json({result});
        }).catch((err) => {
            console.log(err);
            return res.json({err});
        });
    }
})
router.get("/getData", async(req, res) => {
    wallet = req.query.wallet;
    console.log("get data");
    await DataModel.find({ wallet: wallet},{value: 1}).sort({_id: -1}).limit(3)
    .then((result) => {
        return res.json({result});
    }).catch((err) => {
        return res.json({err});
    });

})

router.post("/saveData", async(req, res, next) => {
    _wallet = req.body.wallet;
    value = req.body.value;
    transaction = req.body.transaction;

    console.log(req.body);

    await profileDataModel.find({ wallet: _wallet})
    .then((result) => {
        // console.log(result);
        if(result.length > 0) {
            addWallet()
        }else{
            return res.json("Wallet Not registered")
        }
    }).catch((err) => {
        return res.json({err});
    });

    async function addWallet() {
        await new DataModel({
            wallet: _wallet,
            value: value,
            transaction: transaction
        })
        .save()
        .then((result) => {
            console.log(result);
            return res.json({result});
            return res.send("result");
        }).catch((err) => {
            console.log(err);
            return res.json({err});
        });
    }
})

module.exports = router