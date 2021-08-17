const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ganjamcovidDB_test',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true, useFindAndModify: false }
).then(()=>{
    console.log('DB connection successful!')
}).catch((e)=>{
    console.log('DB connection failed!')
})