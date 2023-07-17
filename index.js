const express = require("express");
const mongodb = require("mongodb"); // mongo db



const { MongoClient } = mongodb; // to connect mongodb
const app = express(); // backend in a variable
app.use(express.json());

const port = process.env.PORT || 4000;

const url =
    "mongodb+srv://WEBTOON:NTDNTDNTD@cluster0.wxtmufn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const ObjectId = mongodb.ObjectId;
async function server() {
    try {
        // connecting with mongodb
        await client.connect();
        // getting database
        const database = client.db("API");
        // getting the collections/ tables.
        const plant = database.collection("Plant")
        //crud
        app.get("/plant/:name", async (req, res) => {
            const name = req.params.name;
            const filter = {
                common_name: name,
            };
            const result = await plant.findOne(filter)
            res.json(result);
        })


    } finally {
    }
}
server().catch(console.dir);

app.get("/", (req, res) => {
    res.json("Hello world");
});

app.listen(port, () => {
    console.log(port);
});
