const express = require('express');
const path = require('path');
const router = express.Router();
const Tourist = require('../models/cTourist');



router.get('/', async (req, res) => {
    try {
      const tourists = await Tourist.find();
      // console.log(tourists)
      res.render(path.join(__dirname,'../public','cTourist/cTourist.ejs'),{tourists:tourists})
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','cTourist/cTourist.ejs'),{message:'error'});
    }
  });

router.get('/add', (req, res) => {
    try {
      res.render(path.join(__dirname,'../public','cTourist/addTourist.ejs'))
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','cTourist/addTourist.ejs'),{message:'error'});
    }
});

router.post('/add',async (req, res) => {
    try {
        const tourist = await Tourist.create(req.body)
        res.render(path.join(__dirname,'../public','cTourist/addTourist.ejs'),{message:'tourist added successfully'})
        console.log(req.body)
    } catch (error) {
        // console.log(req.body)
        res.status(500).render(path.join(__dirname,'../public','cTourist/addTourist.ejs'),{message:'error',invalidData:req.body});
    }
});

router.get('/update', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','cTourist/updateTourist.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cTourist/updateTourist.ejs'),{message:'error'});
  }
});

router.post('/update/find', async (req, res) => {
  try {
    const tourist = await Tourist.findById(req.body._id);
    if(tourist==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cTourist/updateTourist.ejs'),{message:'',id:req.body._id, tourist:tourist});
    // console.log(req.body._id);
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cTourist/updateTourist.ejs'),{message:'error',invalidId: req.body._id});
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const tourist = await Tourist.findByIdAndUpdate(id,req.body);
    if(tourist==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cTourist/updateTourist.ejs'),{message:'tourist updated successfully'})
    // console.log(tourist);
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cTourist/updateTourist.ejs'),{message:'error'});
  }
});

router.get('/delete', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','cTourist/deleteTourist.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cTourist/deleteTourist.ejs'),{message:'error'});
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const id = req.body._id;
    const tourist = await Tourist.findByIdAndDelete(id);
    if(tourist==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cTourist/deleteTourist.ejs'),{message:'tourist deleted successfully'})
    console.log(tourist);
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cTourist/deleteTourist.ejs'),{message:'error',invalidId: req.body._id});
  }
});



module.exports= router;