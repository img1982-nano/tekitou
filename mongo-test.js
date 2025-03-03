const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.40.80:27017');

const userSchema = new mongoose.Schema({
    name: String,
    type: String,
    id: Number
});

const User = mongoose.model('User', userSchema);

const newUser = new User({name: 'あじらも',type: "Fish",id: 1});
const newUser1 = new User({name: 'ずんだもん',type: "Zunda",id: 2});
newUser.save();

User.find({id: 1})
    .then(users => console.log(users));
