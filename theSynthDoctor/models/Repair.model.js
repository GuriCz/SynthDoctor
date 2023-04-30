const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const repairSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brand: {
        type: String,
        required: true,
      },
    urgency:{ // (1 low, 2 normal, 3 high)
        type: Number
    },
    droppOffDate:{
        type: Date,
    },
    pickUpDate:{
        type: Date,
    },
    calculatedPrice:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    hours:{
        type:Number
    },
    status:{ // (1 waiting approval, 2 accepted , 2.1 delivered, 3 working on 4 ready)
        type:String
    },
    componentRequired:{// will see if use api from Mouser.com or not
    },
    componentUsed:{// will see if use api from Mouser.com or not
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Product = model("User", productSchema);

module.exports = Product;
