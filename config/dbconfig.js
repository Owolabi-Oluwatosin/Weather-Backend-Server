
module.exports = {
    dburl:`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ybmxa.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
};