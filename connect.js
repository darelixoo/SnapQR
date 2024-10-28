const mongoose = require('mongoose');

async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = {
    connectToMongoDB,
};
