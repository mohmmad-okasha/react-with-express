import express from "express"
const router = express.Router(); // Create a router instance

//import users model file
const userModel = (await import('../models/Users.js')).default; // Destructure and await

router.get('/', async (request, response) => {
    const data = await userModel.find();
    response.json(data);
});

router.post('/', async (request, response) => {
    const newUser = new userModel({
        _id: new global.db.Types.ObjectId(), // to generate a value for id
        ...request.body, //to get all data from request.body
    })
    await newUser.save()
    response.send("ok")
})

router.put('/', async (request, response) => {
    try {
        const id = request.body._id;// get id for updated record

        const { name, email, password, roles } = request.body;//get the new data

        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name,
            email,
            password,
            roles
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

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    console.log(id)
    const deletedItem = await userModel.findByIdAndDelete(id);
    if (deletedItem) {
        response.status(200).json({ message: 'user deleted successfully' });
    } else {
        response.status(404).json({ message: 'user not found' });
    }
})

export default router;