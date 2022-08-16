const express=require('express');
const { newmessage, getmessage, getallmessageinasite } = require('../Controller/Messagecontroller');




const router=express.Router();


router.get('/',(req,res)=>{
    res.send("post route");
})

router.route('/').post(newmessage);
router.route('/:conversationId').get(getmessage);
router.route('/admin/h1').get(getallmessageinasite);
router.route('/update/:id').put(getallmessageinasite);

module.exports=router;