import express from "express"
import bcrypt from "bcrypt"

const router = express.Router(); // Create a router instance

//import users model file
const userModel = (await import('../models/Users.js')).default; // Destructure and await

router.get('/', async (request, response) => {
    const data = await userModel.find();
    response.json(data);
});

router.post('/', async (request, response) => {

    const { name, password } = request.body
    const finded = await userModel.findOne({ name }) // search if name exist
    if (finded) return (response.json({ message: finded.name + ' Already Exist!' }))

    const newUser = new userModel({
        _id: new global.db.Types.ObjectId(), // to generate a value for id
        password: bcrypt.hashSync(request.body.password,10) , // to hash the password
        name: request.body.name ,
        roles: request.body.roles ,
        email: request.body.email ,
       // ...request.body, //to get all data from request.body
    })
    await newUser.save()
    response.json({ message: 'Saved!' })
})

router.put('/', async (request, response) => {
    try {
        const id = request.body._id;// get id for updated record

        const { name, email, password, roles } = request.body;//get the new data
        const finded = await userModel.findOne({ name }) // search if name exist
        if (finded) return (response.json({ message: finded.name + ' Already Exist!' }))


        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name,
            email,
            password,
            roles
        }, { new: true }); // Return the updated document

        if (!updatedUser) {
            response.json({ message: 'User not found!' })
        }

        response.json({ message: 'Updated!' })

    } catch (err) {
        response.json({ message: 'Error updating user: ', err })
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