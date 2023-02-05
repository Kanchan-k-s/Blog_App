const pool =require('../db');

const jwtTokens = require ('../utils/jwt-helper')

const login=async(req,res)=>{
    try{
        const users = await pool.query("SELECT * FROM users where user_id=$1 and user_password=$2;",[req.body.user_id,req.body.user_password]);
        if(users.rows.length===0) return res.status(404).json({error:"Id or Password is incorrect"});
        let tokens= jwtTokens(users.rows[0]);
        res.cookie('refresh_token',tokens.refreshtoken,{httpOnly:true});
        res.json({tokens,users});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const createUser =async(req,res)=>{
    try{
        const {user_id,user_name,user_password}=req.body;
        const users = await pool.query("SELECT user_id FROM users WHERE user_id=$1 ;",
        [user_id]);
        if(users.rows.length!==0) return res.status(400).json({error:"Id Already Exists"});
       
        const newUser = await pool.query(
            "insert into users (user_id,user_name,user_password) values ($1,$2,$3) RETURNING *;",
            [user_id,user_name,user_password]
        )
        
        
        let tokens= jwtTokens(newUser.rows[0]);
        let user=newUser.rows[0];
        
        res.cookie('refresh_token',tokens.refreshtoken,{httpOnly:true});
        res.json({tokens,user});
    }catch(error){
        res.status(500).json({error:error.message});

    }
};

module.exports={login,createUser}