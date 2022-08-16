const express=require('express');
const { createconversation, getconversationofuser, getconversationofTwouser, getallconversation, deleteallconversation } = require('../Controller/Conversationcontroller');



const router=express.Router();


// console.log(__dirname);
router.get('/',(req,res)=>{
    res.send("post route");
})

router.route('/').post(createconversation);
router.route('/all').get(getallconversation);
router.route('/delete/:id').delete(deleteallconversation);
router.route('/:userId').get(getconversationofuser);
router.route('/find/:senderid/:receiverid').get(getconversationofTwouser);

module.exports=router;