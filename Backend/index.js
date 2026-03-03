import e from "express";
import cors from "cors";
import jwt from "jsonwebtoken"; 
import cookieParser from "cookie-parser";
// MongoDB exports are provided via CommonJS, so import the default and extract
// the helpers we need.  The named "ObjectID" export no longer exists which was
// causing the runtime SyntaxError you were seeing.
import mongodbPkg from "mongodb";
const { ObjectId } = mongodbPkg;

import { collectionName, connectToMongo } from './dbConfig.js';
const app = e();
const port = 5000;
app.use(e.json());
app.use(cors(
    {
        origin: "https://todo-app-mern-app.vercel.app",
        credentials: true
    }
));
app.use(cookieParser());

// helper alias to make the rest of the code unchanged
const objectId = ObjectId;

//API to add a task-data to the database
app.post("/add-task",verifyToken, async (req, res) => {
    try {
        const database = await connectToMongo();
        await database.collection(collectionName).insertOne(req.body);
        res.send("Task added successfully!");
    } catch (err) {
        console.error("Failed to add task", err);
        res.status(500).send({ error: "Unable to add task" });
    }
});
//API to get all the task-data from the database
app.get("/tasks",verifyToken, async (req, res) => {
    const database = await connectToMongo();
    const taskData = await database.collection(collectionName).find().toArray();
    //console.log(taskData);
    const cookieValue = req.cookies['token'];
    console.log("cooke-",cookieValue);
    res.send({ taskData });
});

app.delete("/delete-task/:id",verifyToken, async (req, res) => {
    const database = await connectToMongo();
    const dltTask = await database.collection(collectionName).deleteOne({ _id: new objectId(req.params.id) });
    //console.log(dltTask);
    res.send({ dltTask });
});


app.get("/update/:id",verifyToken, async (req, res) => {
    const database = await connectToMongo();
    const taskData = await database.collection(collectionName).findOne({ _id: new objectId(req.params.id) })
    //console.log(taskData);
    res.send({ taskData });
});

app.put("/update-task/",verifyToken, async (req, res) => {
    const database = await connectToMongo();
    const collection = database.collection(collectionName)
    const {_id,...fields} = req.body
    const update = {$set:fields}

    const result = await collection.updateOne
    ({_id: new objectId(_id) },update)
    res.send({ "msg": "Task updated successfully","success": "true", "updatedTask": result });

});

app.post("/signup", async (req, res) => {
    const database = await connectToMongo();
    const collection = database.collection("user");
    const userData = req.body;
    console.log(userData);
    const existingUser = await collection.insertOne(userData);
    

    jwt.sign(userData, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            console.error("Error signing JWT", err);
            return res.status(500).send({ error: "Failed to generate token" });
        }
        res.send({"msg": "Signup successful","success": "true", "token": token });
    });
});


app.post("/login", async (req, res) => {
    const database = await connectToMongo();
    const collection = database.collection("user");
    const userData = req.body;
    console.log(userData);
    const existingUser = await collection.findOne({email: userData.email, password: userData.password});
    if (!existingUser) {
        return res.status(401).send({ error: "Invalid email or password" });
    }

    jwt.sign(existingUser, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            console.error("Error signing JWT", err);
            return res.status(500).send({ error: "Failed to generate token" });
        }
        res.send({"msg": "Login successful","success": "true", "token": token });
    });
});


//varify token
function verifyToken(req, res, next) {
    const token = req.cookies['token'];
    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Error verifying JWT", err);
            return res.status(401).send({ error: "Invalid token" });
        }   
        req.decoded = decoded;
        console.log("Decoded JWT:", decoded);
        next();
    });
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});