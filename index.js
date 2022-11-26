const express =  require ('express');
const mongoose = require ('mongoose')
const CountSchema = new mongoose.Schema({
    count: Number
})

const UsersConnection = new mongoose.Schema({
    dateTime: String,
    userInfo: String
})

const CountModel = mongoose.model("Count", CountSchema)
const UsersConnectionModel = mongoose.model("Users", UsersConnection)

mongoose.connect('mongodb://mongodbuser:mongodbpassword@mongo:27017/', {useNewUrlParser: true})
mongoose.connection.on('error', (e)=>console.log(e))
mongoose.connection.once('open', ()=>console.log('CONNECTED'))

const app = express();

const userHandle = (r) => {
    const newUser = new UsersConnectionModel({dateTime: (new Date()).toDateString(), userInfo: r.headers['user-agent']})
    newUser.save((e, user)=>{
        console.log("USER", user)
    })
}

app
.get('/', async (r, res) => {
    const count = await CountModel.findOne()
    userHandle(r)
    if(count) {
        res.send(`${count.count}`)
        return
    }

    const newCount = new CountModel({count: 0})
    newCount.save((err, newCount)=>{
        console.log("NEW COUNT", newCount)
        res.send(`${newCount.count}`)
    })
})
.get('/stat', async (r, res) => {
    userHandle(r)
    const count = await CountModel.findOne()
    await CountModel.updateOne({_id: count._id}, {count: count.count + 1})
    res.send(`${count.count + 1}`)
})
.get("/about", (r, res)=>{
    userHandle(r)
    res.setHeader("Content-Type", "text/html");
    res.send(`
    <h3>Hello, it's Vadim Abramov!</h3>
    <b>Hostname:</b> ${r.headers['user-agent']}<br/>
    `)
})
  .get("/test", (r, res)=>{
      res.status(200)
      res.send('end test')
  })

app.listen(5000, ()=>console.log('STARTED SERVER'));

module.exports = app