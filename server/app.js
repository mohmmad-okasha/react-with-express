
import express, { request, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
const port = 3001

//start express app
const app = express()
app.use(cors())// for db connection
app.use(express.json())//to receive json data


//connect to DB
const
    user_name = "swpl",
    password = "123456sw",
    db_name = "test"
mongoose.connect(`mongodb+srv://${user_name}:${password}@cluster0.nljjhtw.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`)

//import users model file
const userModel = (await import('./models/Users.js')).default; // Destructure and await


app.get('/users', async (request, response) => {

    //const userModel = (await import('./models/Users.js')).default; // Destructure and await
    const data = await userModel.find();
    response.json(data);

});

app.post('/users', async (request, response) => {
    const newUser = new userModel({
        _id: new mongoose.Types.ObjectId(), // to generate a value for id
        ...request.body, //to get all data from request.body
    })
    await newUser.save()
    response.send("ok")
})

app.put('/users', async (request, response) => {
    try {
        const id = request.body._id;
        const name = request.body.name;
        console.log(request.body)
        const {  email, age } = request.body;
return
        const updatedUser = await User.findByIdAndUpdate(id, {
            name,
            email,
            age
        }, { new: true }); // Return the updated document

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        response.json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        response.status(500).send('Error updating user');
    }
});

app.delete('/users/:id', async (request, response) => {
    const { id } = request.params;
    console.log(id)
    const deletedItem = await userModel.findByIdAndDelete(id);
    if (deletedItem) {
        response.status(200).json({ message: 'user deleted successfully' });
    } else {
        response.status(404).json({ message: 'user not found' });
    }
})







app.listen(port, () => {
    console.log(`running on ${port}`);
});



//MongoDB swpl 123456sw