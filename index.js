const express = require('express');
const app = express();

app.get('',(req,res)=>{
  res.send("Hello This is an Homepage");
})

app.listen(5000);