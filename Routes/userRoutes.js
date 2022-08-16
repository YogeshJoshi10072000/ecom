const express=require('express');
const { register, login, update, getallusers, deleteUser, getoneuser, followuser, unfollowuser, getfriends } = require('../Controller/UserController');
const router=express.Router();


// router.get('/',(req,res)=>{
//     res.send("route");
// })

router.route('/allusers').get(getallusers);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id/update').put(update);

router.route('/:id/delete').delete(deleteUser);
router.route('/').get(getoneuser);

router.route('/:id/follow').put(followuser);

router.route('/:id/unfollow').put(unfollowuser);
router.route('/friends/:userid').get(getfriends);
module.exports=router;
