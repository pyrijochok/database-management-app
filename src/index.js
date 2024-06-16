const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Tourist = require('./models/cTourist');
const ServiceType = require('./models/cService_type');
const OutType = require('./models/cOut_type');
const Outlay = require('./models/vOutlay');
const Service = require('./models/vService');
const path = require('path');
const touristsRoutes = require('./routes/tourists');
const servicesRoutes = require('./routes/services');
const outtypesRoutes = require('./routes/outtypes');
const outlaysRoutes = require('./routes/outlays');
const incomesRoutes = require('./routes/incomes');

// Create an Express application
const app = express();

//middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded());
app.use(express.json());
app.use(methodOverride('_method'));

//routers
app.use('/tourists',touristsRoutes);
app.use('/services',servicesRoutes);
app.use('/outtypes',outtypesRoutes);
app.use('/outlays',outlaysRoutes);
app.use('/incomes',incomesRoutes);


// Connection URL
const url = 'mongodb://localhost:27017/coursework';
// Connect to MongoDB using Mongoose
mongoose.
connect(url)
.then(()=>{
  console.log('Connected successfully to MongoDB')
  // Start the server and listen on port 3000
  app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
}).catch((err)=>{
  console.log(err)
});


// Define a route handler for the root URL
app.get('/',  (req, res) => {
  try {
    res.render(path.join(__dirname,'public','index.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'public','index.ejs'),{message:'error'});
  }
});




