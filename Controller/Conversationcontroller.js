const express=require('express');
const Conversation=require('../Models/Conversation');
const bcrypt=require('bcrypt');

exports.createconversation=async (req,res,next)=>{

//  console.log(req.body)
    const newconversation=new Conversation({
        members:[req.body.senderid,req.body.receiverid]
    })

try {
    const savedconversation=await newconversation.save();
    res.status(200).json(savedconversation);

} catch (error) {
    res.send(500).json(error);
    
}

}
exports.getconversationofuser= async (req, res) => {
    try {
        // console.log("hello");
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
    //   console.log(conversation);
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.getconversationofTwouser= async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.senderid, req.params.receiverid] },
      });
  console.log(conversation);
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  };



  exports.getallconversation= async(req, res) => {
    
    try {
    
      const conv=await Conversation.find({});
      // console.log(posts);
  
  res.status(200).json(conv);
  } catch (error) {
      res.status(500).json(error);
      
  }
  };

  exports.deleteallconversation= async(req, res) => {
    try {
      const conversation = await Conversation.findOneAndDelete({ _id:req.params.id });
  
      res.status(200).json("deleted sucessfully")
    } catch (err) {
      res.status(500).json(err);
    }
  };