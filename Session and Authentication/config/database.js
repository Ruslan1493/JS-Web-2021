const mongoose = require('mongoose');

function initDB() {
    mongoose.connect('mongodb://localhost:27017/cube', {
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.once('open', (err)=>{
        if(err){
            console.log(err);
        };
        console.log('Database connected!');
    });
    db.on('error', errorMsg => {
        console.log(errorMsg);
    });
}

module.exports = initDB;