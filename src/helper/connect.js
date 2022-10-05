
const { MongoClient, ServerApiVersion } = require('mongodb');

const db = {}
function constructURI() {
    const DB_PREFIX = 'mongodb+srv://'
    const DB_SUFFIX = '?retryWrites=true&w=majority'
    const DB_USERNAME = process.env.DB_USERNAME
    const DB_PASSWORD = process.env.DB_PASSWORD
    const DB_HOST = process.env.DB_HOST
    return 'mongodb+srv://quang-rn:DnhZqEK8PJ9POWR8@cluster0.avf5iyr.mongodb.net/?retryWrites=true&w=majority'
    return `${DB_PREFIX}${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_SUFFIX}`
}

function connectDB() {
    return new Promise((resolve, reject) => {
        const uri = constructURI()
        console.log(uri)
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        //const DB_NAME = process.env.DB_NAME
        const DB_NAME = "RN21TC"

        client.connect(err => {
            if (err) {
                reject(err)
                client.close()
            }
            db.db = client.db(DB_NAME)
            resolve(
                //client.db(DB_NAME)
                client
            )
        });

    })
}

module.exports = { connectDB: connectDB }
// mongodb+srv://mindx-sonlh-56:DnhZqEK8PJ9POWR8@mymongodb-sonlh.rosho.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://mindx-sonlh-56:IUt6SsFX7ZmeXlyw@mymongodb-sonlh.rosho.mongodb.net/?retryWrites=true&w=majority


//mongodb+srv://quang-rn:DnhZqEK8PJ9POWR8@cluster0.avf5iyr.mongodb.net/?retryWrites=true&w=majority