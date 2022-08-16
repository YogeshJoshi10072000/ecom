const mongoose = require('mongoose');

connectdb().catch(err => console.log(err));

async function connectdb() {
  await mongoose.connect(process.env.DB_URL);
}

module.exports=connectdb;

