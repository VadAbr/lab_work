import express from 'express';

const app = express();

let count = 0;

app
.get('/', (r, res) => res.send(`${count}`))
.get('/stat', (r, res) => {
    const oldValue = count++;
    res.send(`${oldValue}`)
})
.get("/about", (r, res)=>{
    res.setHeader("Content-Type", "text/html");
    res.send(`
    <h3>Hello, it's Vadim Abramov!</h3>
    <b>Hostname:</b> ${r.headers.host}<br/>
    `)
})

app.listen(8080, ()=>console.log('started'));
