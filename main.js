const User = require('./models/User');

const express = require('express');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json())

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)

    .then(() => { console.log('connact to mongodb') })
    .catch((e) => { console.log(e) })


app.get('/user', async (req, res) => {
    const user = await User.find()
    res.json(user)
})

app.post('/user', async (req, res) => {
    const { name, email, password } = req.body
    const user = new User({ name, email, password })
    await user.save()
    res.json(user)

})

app.put('user/:id', async (req, res) => {
    const { name, email, passord } = req.body
    const UpDateUser = await User.findById(req.params.id)
    res.json(UpDateUser)

}
)
app.delete('/user/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user)
} 
);


app.listen(port, () => {
    console.log(`server is runnig on port ${port}`)
})