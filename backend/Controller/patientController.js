const db = require('../orclConnection') ;
const jwt = require('jsonwebtoken');

async function getDetails(req,res){


}


async function getMedicine(req, res){
    console.log(req.access_id+" get medicine of USER");
    return res.json({success: true});
}

module.exports = {getDetails,getMedicine};

