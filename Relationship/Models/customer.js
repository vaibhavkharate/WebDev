const mongoose = require("mongoose")
const {Schema} = mongoose;

// one to few relation - 2nd approache

main()
.then(() => console.log ("connection sucessfull"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect ("mongodb://127.0.0.1:27017/relationDemo")
}

const orderSchema = new Schema({
    item : String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type : Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});

// mongoose middleware

// customerSchema.pre("findOneAndDelete", async(customer)=> {
// console.log("PRE MIDDLEWARE");
// });

// customerSchema.post("findOneAndDelete", async(customer)=> {
//     if(customer.orders.length){
//        let res = await Order.deleteMany({_id: {$in: customer.orders}});
//        console.log(res);
//     };
// });

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);


const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result);
    
};

// findCustomer();

const delCust = async () => {
    let data = await Customer.findByIdAndDelete("6841a553d257b736b196edc8")
    console.log(data);
    
};

delCust();

// const addCustomer = async () => {
//     let cust1 = new Customer({
//             name: "Vaibhav",
//         });

//     let order1 = await Order.findOne({ item: "Chips"});
//     let order2 = await Order.findOne({ item:"Chocolate"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result = await cust1.save();
    
//     console.log(result);
    
// };

// addCustomer();

// const addOrders = async () => {
//     let res = await Order.insertMany(
//         {item: "Samosa", price: 12},
//         {item: "Chips", price:10},
//         {item: "Chocolate", price: 40},
//     );

//     console.log(res);
// };

// addOrders();
