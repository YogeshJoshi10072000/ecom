const express=require('express');
const { createpost, deletepost, updatepost, likepost, dislikepost, getallpost, timeline, getapost, getallPostOfuser } = require('../Controller/PostController');

const router=express.Router();



router.get('/',(req,res)=>{
    res.send("post route");
})

router.route('/allposts').get(getallpost);
router.route('/getpost').get(getapost);
router.route('/create').post(createpost);

router.route('/:id/delete').post(deletepost);
router.route('/:id/update').post(updatepost);
router.route('/:id/like').put(likepost);
router.route('/:id/dislike').put(dislikepost);

router.route('/timeline/:id').get(timeline);
router.route('/posts/:username').get(getallPostOfuser);
module.exports=router;