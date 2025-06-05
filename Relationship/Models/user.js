const mongoose = require("mongoose")
const {Schema} = mongoose;

// one to few relation

main()
.then(() => console.log ("connection sucessfull"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect ("mongodb://127.0.0.1:27017/relationDemo")
}

const userSchema = new Schema({
    username : String,
    addresses: [
        {   
            _id : false,
            location: String,
            city: String,
        },
    ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async() => {
    let user1 = new User({
        username: "sherlockhomes",
        addresses: [
            {
                location: "2218 Baker Street",
                city: "London",
            },
        ],
    });

    user1.addresses.push({location: "P32 Wallstreet", city:"London"});
    let result = await user1.save();
    console.log (result);
};

addUsers();