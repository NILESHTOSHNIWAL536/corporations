var mongoose=require("mongoose");

var product=new mongoose.Schema(
    {
      user_id:String,
      payment:[
        {
          name:String,
          amount:String,
          date:String,
          transport:String,
          contactno:String,
        }
    ],
      items:[
        {
        ricemill:String,
        party:String,
        lorry:String,
        Dateobj:String,
        district:String,
        phoneNo:String,
        transport:String,
        kiraya:String,
        advance:String,
        discount:String,
        paid:Boolean,
        Bill:[
               {
                   rice:String,
                   kg:Number,
                   rate:Number,
                   Bags:Number,
                
               }
        ],
      }
      ]
    }
);


// console.log(Dateobj);
// console.log(ricemill);
// console.log(party);
// console.log(lorry);
// console.log(district);
// console.log(Bill);



var products=new mongoose.model("product",product);


module.exports=products;
