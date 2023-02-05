const express = require('express')
const {getBlogs,createBlog,getuserBlogs,updateLike,delBlogs,updateBlogs,getuserList,upload} = require('../controller/blogHandler')


const blog = express.Router();

blog.get('/',getBlogs);
blog.put('/',updateBlogs);
blog.post('/',createBlog);
blog.get('/:id',getuserBlogs);
blog.get('/userlist/:id',getuserList);
blog.get('/like/:id/:user',updateLike);
blog.delete('/:id',delBlogs);
blog.post('/upload/:id',upload)


module.exports=blog;