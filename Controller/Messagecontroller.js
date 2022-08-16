const express=require('express');
const Message=require("../Models/Message");
const bcrypt=require('bcrypt');

//add

exports.newmessage= async (req, res) => {
    const newMessage = new Message(req.body);
    // console.log(req.body);
  
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      // console.log(err);
      res.status(500).json(err);
    }
  };
  
  //get
  
exports.getmessage= async (req, res) => {
  // console.log("req messages from client "+req.params.conversationId);
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.getallmessageinasite= async (req, res) => {
    // console.log("hello");
    try {
      const messages = await Message.find({});
      // console.log(messages);
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.updateusermessages= async (req, res) => {
    console.log("hello updation processing");
    try {
      const messages = await Message.findOneAndUpdate({conversationId:req.params.id},req.body);
      console.log(messages);
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  };
