const {dbConnection} = require('./dbconfig.js');
const express = require('express');
const app = express();
const port = 5000;


app.use(express.json())


app.use('/api/user',require('./Routes/userRoute.js'));
app.use('/api/post',require('./Routes/postRoute.js'))

app.listen(port, () => {
    dbConnection;

    console.log(`Server is running on ${port} number.`)
})