const pool =require('../db');
const path = require('path')
const fileLocation = path.join(__dirname,'..','..','/front-end/public/')

const getBlogs= async(req,res)=>{
    try{
        const allBlogs = await pool.query("SELECT *  FROM blog order by likes desc;");
        
        res.json(allBlogs.rows);
    }catch(error){
        console.error(error.message);
    }
}

const delBlogs= async(req,res)=>{
    try{
        const allBlogs = await pool.query("delete FROM blog where blog_id=$1;",[req.params.id]);
        const setBlogs = await pool.query("delete FROM post where blog_id=$1;",[req.params.id]);
        res.json(allBlogs.rows);
    }catch(error){
        console.error(error.message);
    }
}

const getuserBlogs= async(req,res)=>{
    try{
        const allBlogs = await pool.query("SELECT *  FROM blog where user_id=$1 order by likes desc;",[req.params.id]);
        res.json(allBlogs.rows);
    }catch(error){
        console.error(error.message);
    }
}

const updateLike=async(req,res)=>{
    try{
        const rel =await pool.query("select * from post where user_id=$1 and blog_id=$2",[req.params.user,req.params.id]);
        
        if(rel.rows.length==0)
        {
            const newLike=await pool.query("insert into post values($1,$2);",[req.params.user,req.params.id]);
            const newCount=await pool.query("Update blog set likes=likes+1 where blog_id=$1 Returning *;",[req.params.id]);
            res.json(newCount.rows[0].likes);
        }
        if(rel.rows.length==1)
        {
            const newLike=await pool.query("delete from post where user_id=$1 and blog_id=$2;",[req.params.user,req.params.id]);
            const newCount=await pool.query("Update blog set likes=likes-1 where blog_id=$1 Returning *;",[req.params.id]);
            res.json(newCount.rows[0].likes);
        }
        
    }catch(error){
        console.error(error.message);
    }
}

const createBlog =async(req,res)=>{
    try{
        const {title, desp, user_id }=req.body;
        
        const newBlog = await pool.query(
            "INSERT INTO blog (title,desp,user_id,likes) VALUES ($1,$2,$3,0) RETURNING *",
            [title,desp,user_id ]
        )
        res.json(newBlog.rows[0]);
    }catch(err){
        console.error(err.message);
    }
}

const updateBlogs =async(req,res)=>{
    try{
        const {title, desp, blog_id }=req.body;
        
        const newBlog = await pool.query(
            "UPDATE blog set title=$1, desp=$2 where blog_id=$3 RETURNING *",
            [title,desp,blog_id ]
        )
        res.json(newBlog.rows[0]);
    }catch(err){
        console.error(err.message);
    }
}
const getuserList=async(req,res)=>{
    try{
        const id=req.params.id;
        
        const newBlog = await pool.query(
            "select user_name from users where user_id in (select user_id from post where blog_id =$1)",
            [id ]
        )
        res.json(newBlog.rows);
    }catch(err){
        console.error(err.message);
    }
}

const upload = async (req, res) => {
    try{
        if (!req.files) {
            return res.status(500).send({ msg: "file is not found" })
        }
        // accessing the file
        const myFile = req.files.file;
        
    //  mv() method places the file inside public directory
        // myFile.name 
        
        myFile.mv(`${fileLocation}${myFile.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
        
        });
        const filename= `/${myFile.name}`
            const newBlog = await pool.query(
                "Update blog set img=$1 where blog_id=$2 RETURNING *",
                [filename,req.params.id ]
            )
    }catch(err){
        console.error(err.message);
    }
  }
module.exports={getBlogs,createBlog,getuserBlogs,updateLike,delBlogs,updateBlogs,getuserList,upload}