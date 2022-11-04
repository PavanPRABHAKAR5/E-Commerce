const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PORT = 8080;
const app  = express();
const cors = require('cors');
const json = require('body-parser').json;
const session = require('express-session')

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST'],
    credentials: true
}))
app.use(json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

const productSchema = new Schema({
    name:  {type:String, required:true}, 
    category: {type:String, required:true},
    price:   {type:Number, required:true},
    rating: {type:Number, required:true},
    color: 'red' | 'green' | 'black',
    size: 'S' | 'M' | 'L',
    details: Object,
    image : {type:String, required:true},
    images : {type:[String], required:true},
  }, {timestamps: true});

const cartSchema = new Schema({
    items:  {type:[Object], required:true, default:[]}, 
    userId: {type: String, default:1}
}, {timestamps: true});

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    addresses : {type:[Object], default:[]},
    orders :[{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, {timestamps: true});

// const orderSchema = new Schema({
//     items: [Object],
//     shipping_charges: Number,
//     discount_in_percent: Number,
//     shipping_address: Object,
//     total_items: Number,
//     total_cost: Number,
// }, {timestamps: true}) 

const Product = new mongoose.model('Product',productSchema);  
const Cart = new mongoose.model('Cart',cartSchema);



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('Server Connected');

}


app.get('/createProduct',(req,res)=>{
    let product = new Product({
        name: "Apple iPhone 11",
        price: 799.75,
        category: "Mobile",
        rating: 4,
        color: "black",
        size: "",
        details: {
            product: "",
            warrenty: "",
            merchant: ""
        },
        image: "product-3-square",
        images: ["product-3-square", "product-3-square", "product-3-square"],
    
    
    })
    product.save().then((success)=>{
        res.send(success)
    }).catch(err=>{
        res.error(err)
    })

    
})


app.get('/product',(req,res)=>{
   Product.find({}).then(result=>{
       res.send(result);
   })
});

app.post('/cart',(req,res)=>{
    
    const userId = req.session.user._id;  
    const item = req.body.item;
    if(!item.quantity){
        item.quantity =1;
    }
    Cart.findOne({userId:userId}).then(result=>{
        if(result){
            const itemIndex = result.items.findIndex(it=>it._id==item._id);
            if(itemIndex>=0){
                result.items.splice(itemIndex,1,item);
            } else{
                result.items.push(item);
            }
            result.save().then(cart=>{
                res.send(cart);
            })   
        } else{
            let cart = new Cart();
            cart.userId = userId;
            cart.items = [item];
            cart.save().then(cart=>{
                res.send(cart);
            })    
        }
        
       
    })
 });
app.get('/cart',(req,res)=>{
    
    const userId = req.session.user._id;
    Cart.findOne({userId:userId}).then(result=>{
        if(result){
            res.send(result)
        } else {
            res.send({userId:1, items: []}) 
        }  
    });

 });
app.post('/removeItem',(req,res)=>{
    
    const userId = req.session.user._id;
    const item = req.body.item;
    Cart.findOne({userId:userId}).then(result=>{

        const itemIndex = result.items.findIndex(it=>it._id==item._id);
        result.items.splice(itemIndex,1);
        result.save().then(cart=>{
            res.send(cart)
        })
    });

 });
app.post('/emptyCart',(req,res)=>{
    
    const userId = req.session.user._id;
    Cart.findOne({userId:userId}).then(result=>{
        result.items = [];
        result.save().then(cart=>{
            res.send(cart)
        })
    });

 });




app.listen(PORT, ()=>{
   console.log('listen on PORT:', PORT)
})