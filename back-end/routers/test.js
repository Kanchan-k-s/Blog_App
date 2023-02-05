const express = require('express')
const pool =require('../db');

const path = require('path')
const fileLocation = path.join(__dirname,'..','..','/front-end/public/')

const test = express.Router();

test.get('/',async(req,res)=>{
    try{
        const getBlog=await pool.query("Select * from test;");
        res.json(getBlog.rows);
    }catch(e){
        console.error(err.message);
    }
})

test.post('/',async (req, res)=>{
    const {title, desp, user_id }=req.body;
    const newBlog = await pool.query(
        "INSERT INTO test (title,desp,user_id,likes) VALUES ($1,$2,$3,0) RETURNING *",
        [title,desp,user_id ]
    )
    res.json(newBlog.rows[0]);
})

test.post('/upload/:id',async (req, res) => {
    try{
        
        
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
        const myFile = req.files.file;
        // const {title, desp, user_id }=req.body.blog;
    //  mv() method places the file inside public directory
    myFile.mv(`${fileLocation}${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
    
    });
    const filename= `/${myFile.name}`
    
        const newBlog = await pool.query(
            "Update test set img=$1 where blog_id=$2 RETURNING *",
            [filename,req.params.id ]
        )
        
        
    }catch(err){
        console.error(err.message);
    }
  })



module.exports=test;