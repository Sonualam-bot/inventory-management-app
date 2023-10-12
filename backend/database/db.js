const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Inventory"
    }).then((data) => {
        console.log(`Connected to MongoDb server: ${data.connection.host}`);
    }).catch(error =>  {
        console.error("Error connecting to MongoDb:", error);
    });
}

module.exports = connectDatabase;