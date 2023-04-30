const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const adminSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    openTickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Repair'
      }],
    closedTickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Repair'
      }],
  },
  
 
);

const Admin = model("User", adminSchema);

module.exports = Admin;
