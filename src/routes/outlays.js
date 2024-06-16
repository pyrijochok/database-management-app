const express = require('express');
const path = require('path');
const router = express.Router();
const Outlay = require('../models/vOutlay');



router.get('/', async (req, res) => {
    try {
      const outlays = await Outlay.find();
      res.render(path.join(__dirname,'../public','vOutlay/vOutlay.ejs'),{outlays:outlays})
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','vOutlay/vOutlay.ejs'),{message:'error'});
    }
  });

router.get('/add', (req, res) => {
    try {
      res.render(path.join(__dirname,'../public','vOutlay/addOutlay.ejs'))
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','vOutlay/addOutlay.ejs'),{message:'error'});
    }
});

router.post('/add',async (req, res) => {
  // console.log(req.body)
    try {
        const outlay = await Outlay.create(req.body)
        res.render(path.join(__dirname,'../public','vOutlay/addOutlay.ejs'),{message:'outlay added successfully'})
    } catch (error) {
        res.status(500).render(path.join(__dirname,'../public','vOutlay/addOutlay.ejs'),{message:'error',invalidData:req.body});
    }
});

router.get('/update', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','vOutlay/updateOutlay.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'vOutlay/updateOutlay.ejs'),{message:'error'});
  }
});

router.post('/update/find', async (req, res) => {
  try {
    const outlay = await Outlay.findById(req.body._id);
    if(outlay==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','vOutlay/updateOutlay.ejs'),{id:req.body._id, outlay:outlay});
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cService_type/updateService.ejs'),{message:'error',invalidId: req.body._id});
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const outlay = await Outlay.findByIdAndUpdate(id,req.body);
    if(outlay==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','vOutlay/addOutlay.ejs'),{message:'outlay updated successfully'})
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','vOutlay/updateOutlay.ejs'),{message:'error'});
  }
});

router.get('/delete', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','vOutlay/deleteOutlay.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','vOutlay/deleteOutlay.ejs'),{message:'error'});
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const id = req.body._id;
    const outlay = await Outlay.findByIdAndDelete(id);
    if(outlay==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','vOutlay/deleteOutlay.ejs'),{message:'outlay deleted successfully'})
    // console.log(service);
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','vOutlay/deleteOutlay.ejs'),{message:'error',invalidId: req.body._id});
  }
});


module.exports= router;