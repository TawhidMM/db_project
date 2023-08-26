const db
    = require('../orclConnection') ;
const connection = require("../orclConnection");
const secretKey = 'slkdfsl' ;

const jwt = require('jsonwebtoken');
async function loginUser(req,res){

    res.cookie('login',false,{httpOnly:true});

    try {
        const {nid, password} = req.body

        const query = `SELECT PATIENT_ID, FIRST_NAME, LAST_NAME, PASSWORD
                              FROM PATIENT
                              WHERE PATIENT_ID = 'P${nid}'`

        const data = await db.executeQuery(query)
        // data = array of object containing selected
        // attributes
        const {
            PATIENT_ID : id,
            FIRST_NAME : firstName,
            LAST_NAME : lastName,
            PASSWORD : actualPass
        } = data[0]

        const fullName = firstName + ' ' + lastName

        if(actualPass !== password)
            return res.status(400).json({ success:false,message:"wrong credentials" });

        const token = jwt.sign({id:id},secretKey,{expiresIn:"1d"});

        res.cookie('login',token,{httpOnly:true});

        return res.status(200).json({success:true,message:"accepted",id,fullName});

    } catch (error){
        console.log('error in api /patient/login')
        console.log(error)
    }


}

module.exports = {loginUser};