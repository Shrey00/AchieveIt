import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
    userData: {
        todo: [
            {text : String, deadline : Date, check: Boolean}
        ],
        doing: [
            {text : String, deadline : Date, check: Boolean}
        ],
        done: [
            {text : String, deadline : Date, check:Boolean}
        ],
    },
    goals: [
        {text : String, deadline : Date, note: String, check: Boolean, actionSteps: [{text:String, check: Boolean}]}
    ],
},{ collection: 'Users'});

const User = mongoose.model('User', userSchema);
export default User;
