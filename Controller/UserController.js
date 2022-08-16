const express=require('express');
const User=require('../Models/Usermodels');
const bcrypt=require('bcrypt');


exports.register=async (req,res,next)=>{
// console.log(req.body);
  

    try {
        const salt=await bcrypt.genSalt(10);
        const hasedpassword=await bcrypt.hash(req.body.password,salt);
          req.body.password=hasedpassword;


    const reguserinfo=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        profilePicture:req.body.profilePicture,
        

    });
         const user=await reguserinfo.save();
      
         res.status(200).json(user);
       

    } catch (error) {
        console.log(error);
        res.send({sucess:false,message:error});
    }



}



exports.login=async (req,res,next)=>{
//    console.log(req.body);
    try {
        
   
    const user=await User.findOne({email:req.body.email});
    if(!user)
    {
        res.status(404).json("Invalid password or Email");

    }
    const isvalidpassword=await bcrypt.compare(req.body.password,user.password);
    if(!isvalidpassword)
    {
        res.status(404).json("Invalid password or Email");
    }
    // console.log(user);
    res.status(200).json(user);

} catch (error) {
    res.status(500).json(error);
}

  

    
    }




exports.update=async (req,res,next)=>{
    
    // console.log(req.params.id);
        if(req.body._id===req.params.id)
        {
            console.log(req.body);

            try {
                
           
            if(req.body.password)
            {
                const salt=await bcrypt.genSalt(10);
                const hashedpassword=await bcrypt.hash(req.body.password,salt);
                req.body.password=hashedpassword;

            }
        }
         catch (error) {
                res.status(403).json(error);
        }

        try {
          
            const user=await User.findOne({_id:req.body._id});
            
    const reguserinfo=new User({
        _id:user._id,
        username:req.body.username||user.username,
        email:req.body.email||user.email,
        password:req.body.password||user.password,
        profilePicture:req.body.profilePicture||user.profilePicture,
        coverPicture:req.body.coverPicture||user.coverPicture,
        desc:req.body.desc||user.desc,
        city:req.body.city||user.city,
        from:req.body.from||user.from,
        relationship:req.body.relationship||user.relationship

    });
            const updateduser=await User.findByIdAndUpdate(req.params.id,{ $set :reguserinfo });
//   console.log(reguserinfo);
                 res.status(200).json(updateduser);
        } catch (error) {
         
            console.log(error);
        }

        }
        else
        {
            
            res.status(403).json({"message":"You are not athorized person to edit profile"});
        }
      
    
        
        }



 exports.getallusers=async (req,res,next)=>{
// console.log("checking");
// res.send("checkig")
            try {
                
           const users=await User.find({});
           res.status(200).json(users)

            } catch (error) {
                // console.log(error)
             res.status(200).json(error);   
            }
        
            
     }


 exports.getoneuser=async (req,res,next)=>{
    // console.log("reguest from frontend");
    // res.send(0);
    const userid = req.query.userid;
    const username = req.query.username;
    // if(!userid && username)
    // {
    //     res.send(500).json("no obj found")
    // }
    // console.log(userid+" "+username);
                try {
                    
                    const user = userid ? await User.findById({_id:userid}) : await User.findOne({ username: username });
            //    console.log("user info" + user);
                    const {password,updatedAt,...other}=user._doc;
            //    console.log(other);
               res.status(200).json(user);
    
                } catch (error) 
                {
                    // console.log(error);
                 res.status(500).json(error);   
                }
            
                
                }

 exports.deleteUser=async (req,res,next)=>{
                if(req.body.userid===req.params.id|| req.body.isAdmin)
                {
        
                    try {
                        
                   const u=await User.findById(req.body.userid);
                   if(!u)
                   {
                    res.status(403).json("Account has already been deleted sucessfully");

                   }
                   const user=await User.deleteOne(req.body.params);
                //    console.log(user);
                   res.status(200).json("Account has been deleted sucessfully");
                }
                 catch (error) 
                 {
                        res.status(403).json(error);
                }
        
            }
            
            res.send("You Can delete only your account ")
                
                }
        

exports.followuser=async (req,res,next)=>{
    // console.log("in follwing backend");
               if(req.body.userid!=req.params.id)
               {
 

        try {
            
       
               const user=await User.findById(req.params.id);
               const currentuser=await User.findById(req.body.userid);

              if(!user.followers.includes(req.body.userid))
              {
                     await user.updateOne({ $push : {followers:req.body.userid}});
                     await currentuser.updateOne({ $push : {followings:req.params.id}});
                //  console.log(currentuser);
                     res.status(200).json("Followed sucessfully");
              }
              else{
                //   console.log("already following");
         res.status(403).json("already following");
              }

            } catch (error) {
                // console.log(error);
            res.status(403).json(error);
            }
                   
                    
                    }
                    else{
                        res.status(403).json("You cannot follow Yourself");
                    }



                }


exports.unfollowuser=async (req,res,next)=>{
    // console.log("in unfoloowwing user");
                    if(req.body.userid!=req.params.id)
                    {
      
     
             try {
                 
            
                    const user=await User.findById(req.params.id);
                    const currentuser=await User.findById(req.body.userid);
     
                   if(user.followers.includes(req.body.userid))
                   {
                          await user.updateOne({ $pull : {followers:req.body.userid}});
                          await currentuser.updateOne({ $pull : {followings:req.params.id}});
     
                          res.status(200).json("unFollowed sucessfully");
                        //   console.log("unfoloowed sucessfuly ");
                   }
                   else{
              res.status(403).json("already not following");
                   }
     
                 } catch (error) {
                    //  console.log(error);
                 res.status(403).json(error);
                 }
                        
                         
                         }
                         else{
                             res.status(403).json("You cannot do this operation");
                         }
     
     
     
                     }          
                     
exports.getfriends=async (req,res,next)=>
{
    try {
        const user = await User.findById(req.params.userid);
        const friends = await Promise.all(
          user.followings.map((friendId) => {
            return User.findById(friendId);
          })
        );
        let friendList = [];
        friends.map((friend) => {
          const { _id, username, profilePicture } = friend;
          friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
      } catch (err) {
        res.status(500).json(err);
      }
         
                       
}          