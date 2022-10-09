// Template for further use
const express = require('express');
const app = express();
let ejs = require('ejs');
const port = 3000;
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// main code

// mongoose initializing
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://raphlamingo:Hallelcollege1@cluster0.7fa4mck.mongodb.net/todolistdb');

const itemschema= new mongoose.Schema({
    name:String
});
const Item= mongoose.model('Item', itemschema);


app.get('/', (req, res) => {
    var today = new Date();
    var options= {
        weekday :"long",
        day: "numeric",
        month :"long"
    };

    var day= today.toLocaleDateString('en-US',options);

    Item.find(function(err,items){
        res.render("list",{listTitle: day,new_stuff: items})


    })

})
app.post('/', function(req,res){
    var add= req.body.new_to_do;
    var new_Stuffs= new Item({
        name:add
    })
    new_Stuffs.save()
    res.redirect('/')

})

app.get('/work',function(req,res){
    res.render("list",{listTitle: "Work list", new_stuff: work_list})
})

app.post('/delete/:item', function(req,res){
    // var checkbox= req.body.checky
    check= req.body.bod
    del= req.params.item
    if (check==='on'){
        Item.deleteOne({name:del}, function(err){
            if (err){
                console.log(err)
            }
        })
        res.redirect('/')
    }

})
app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`);
})
