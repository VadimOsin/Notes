const Router=require('express')
const router=new Router()
const postController=require('../controller/post.Controller')
const userController = require("../controller/user.controller");

router.post('/post',postController.createPost)
router.get('/post',postController.getPostByUser)
router.put('/post',postController.updatePost)
router.delete('/post/:id',postController.deletePost)

module.exports=router