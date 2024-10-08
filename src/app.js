require('dotenv').config()
var express=require("express");
var app=express();
var PORT=process.env.PORT || 6000;
require("../connect/conn.js");

var admin=require("../schema/Registration/admin.js");
var product=require("../schema/product/productItem.js");

app.use(express.json());

app.get("/",async(req,res)=>{
     res.send("connected success");
      
});



app.patch("/update/:id/:itemId", async (req, res) => {
    try {
      const { id, itemId } = req.params; // Extract user_id and itemId from the URL
  
      // Find the product with the matching user_id
      const data = await product.findOne({ user_id: id });
      if (!data) {
        return res.status(404).send("User not found");
      }
  
      // Find the item to update within the items array
      const itemIndex = data.items.findIndex((item) => item._id.toString() === itemId);
      if (itemIndex === -1) {
        return res.status(404).send("Item not found");
      }
  
      // Update the item with the new data from req.body
      data.items[itemIndex] = { ...data.items[itemIndex], ...req.body };
  
      // Save the updated product
      const updatedProduct = await data.save();
     
      res.status(200).send(updatedProduct);
    } catch (e) {
      console.error(e);
      res.status(500).send("Error while updating item");
    }
  });

app.get("/admin",async(req,res)=>{
   try{
          var data=await admin.find();
         res.send(data);
   }catch(e){
        res.send(e);
   }
});

app.post("/admin",async(req,res)=>{
      console.log("post admin");
      console.log(req.body);
       try{
            var adminuser=new admin(req.body);
            var getdata=await adminuser.save();
            var id=getdata._id;
            var item=new product({
               user_id:id,
            });
            var pro=await item.save();
            res.send(getdata);
       }catch(e){
          console.log(e);
           res.send("error an able to add data")
       }
});



app.get("/admin/display/:userid",async(req,res)=>{
    console.log(req.params);
    try{
         var {userid}=req.params;
         var data=await product.find({user_id:userid});
         console.log(data[0].items);
         res.send(data[0]);
    }catch(e){
       console.log("error while getting data => "+e)

    }
});

app.get("/admin/payment/:userid",async(req,res)=>{
    console.log(req.params);
    try{
         var {userid}=req.params;
         var data=await product.find({user_id:userid});
         console.log(data[0].payment);
         res.send(data[0]);
    }catch(e){
       console.log("error while getting data => "+e)

    }
});

app.get("/admin/:id/:pass",async(req,res)=>{
       try{
        var {id}=req.params;
        var {pass}=req.params;
            var getuser=await admin.find({emailadress:id,password:pass});
             res.status(200).send(getuser[0]);
       }catch(e){
            res.status(400).send("error an able to add data ")
       }
});


app.post("/additem/:id",async(req,res)=>{
    try{
        var {id}=req.params;
        var data=await product.find({user_id:id});
        var arr=data[0].items;
        arr.push(req.body);
        var pro=await product.findOneAndUpdate({user_id:id},{items:arr},{new:true})
        res.send(pro);
    }catch(e){
        res.send("error while adding item");
    }
});

app.post("/payment/:id",async(req,res)=>{
     console.log("additem called payemnt");
    try{
        var {id}=req.params;
        var data=await product.find({user_id:id});
        var arr=data[0].payment;
        arr.push(req.body);
        var pro=await product.findOneAndUpdate({user_id:id},{payment:arr},{new:true})
        res.send(pro);
    }catch(e){
        res.send("error while adding item");
    }
});





app.delete("/admin/:userid/:itemid",async(req,res)=>{
    try{
        var {userid}=req.params;
        var {itemid}=req.params;
        var getuserdata=await product.find({user_id:userid});
        getuserdata=getuserdata[0];
        var item=getuserdata.items.filter((i)=>i._id!=itemid);
        console.log(item);
        var filterdata=await product.findOneAndUpdate({user_id:userid},{items:item},{new:true});
        console.log(filterdata);
        res.send(item);
    }catch(e)
    {
        console.log(e);
      res.send("error while deleting the item"+e);
    }
});

app.delete("/admin/payment/:userid/:itemid",async(req,res)=>{
    try{
        var {userid}=req.params;
        var {itemid}=req.params;
        var getuserdata=await product.find({user_id:userid});
        getuserdata=getuserdata[0];
        var payment=getuserdata.payment.filter((i)=>i._id!=itemid);
        console.log(payment);
        var filterdata=await product.findOneAndUpdate({user_id:userid},{payment:payment},{new:true});
        console.log(filterdata);
        res.send(payment);
    }catch(e)
    {
        console.log(e);
      res.send("error while deleting the item"+e);
    }
});

app.patch("/admin/:userid/:itemid",async(req,res)=>{
    try{
        var {userid}=req.params;
        var {itemid}=req.params;
        var body=req.body;
        var getuserdata=await product.find({user_id:userid});
        getuserdata=getuserdata[0];
        var item=getuserdata.items.filter((i)=>i._id!=itemid);
        item.push(body);
        var updatedData=await product.findOneAndUpdate({user_id:userid},{items:item},{new:true});
        console.log(updatedData);
        res.send("updated item "+updatedData);
    }catch(e)
    {
        console.log(e);
      res.send("error while updateing the item"+e);
    }
});


const hostname = "192.168.224.190"; //192.168.121.190 192.168.224.190
// 192.168.205.190



app.listen(PORT,()=>{
      console.log("listing to port no 6000");
})
