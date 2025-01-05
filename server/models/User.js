const mongoose = require('mongoose');

// const bcryptjs = require('bcryptjs');

const  userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        // pic: {
        //     type: String,
        //     required: true,
        //     // default: "https://i.pinimg.com/originals/5f/22/7b/5f227b4a46f94823e678efe1aaed3948.jpg",
        //     default: "https://i.pinimg.com/originals/75/ee/62/75ee62dd2cf3ded21b9c15738b0654da.jpg",
        // },
        isAdmin: {
            //  if there is admin
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamps: true
    }
);

// userSchema.pre('save', async function(next){
//     if(!this.isModified('password')){
//         next()
//     }

//     const salt = await bcryptjs.genSalt(10);
//     this.password = await bcryptjs.hash(this.password,salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword){
//     return await bcryptjs.compare(enteredPassword, this.password);
// }

const User = mongoose.model('User',userSchema);

module.exports= User;