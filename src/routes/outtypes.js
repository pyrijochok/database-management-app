const express = require('express');
const path = require('path');
const router = express.Router();
const OutType = require('../models/cOut_type');



router.get('/', async (req, res) => {
    try {
      const outtypes = await OutType.find();
      res.render(path.join(__dirname,'../public','cOut_type/cOut_type.ejs'),{outtypes:outtypes})
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','cOut_type/cOut_type.ejs'),{message:'error'});
    }
  });

  router.get('/add', (req, res) => {
    try {
      res.render(path.join(__dirname,'../public','cOut_type/addOuttype.ejs'))
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','cOut_type/addOuttype.ejs'),{message:'error'});
    }
});

router.post('/add',async (req, res) => {
    try {
        const outtype = await OutType.create(req.body)
        res.render(path.join(__dirname,'../public','cOut_type/addOuttype.ejs'),{message:'outtype added successfully'})
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','cOut_type/addOuttype.ejs'),{message:'error',invalidData:req.body});
    }
});

router.get('/update', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','cOut_type/updateOuttype.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'cOut_type/updateOuttype.ejs'),{message:'error'});
  }
});

router.post('/update/find', async (req, res) => {
  try {
    const outtype = await OutType.findById(req.body._id);
    if(outtype==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cOut_type/updateOuttype.ejs'),{id:req.body._id, outtype:outtype});
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cOut_type/updateOuttype.ejs'),{message:'error',invalidId: req.body._id});
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const outtype = await OutType.findByIdAndUpdate(id,req.body);
    if(outtype==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cOut_type/updateOuttype.ejs'),{message:'outtype updated successfully'})
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cOut_type/updateOuttype.ejs'),{message:'error'});
  }
});

router.get('/delete', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','cOut_type/deleteOuttype.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cOut_type/deleteOuttype.ejs'),{message:'error'});
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const id = req.body._id;
    const outtype = await OutType.findByIdAndDelete(id);
    if(outtype==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cOut_type/deleteOuttype.ejs'),{message:'outtype deleted successfully'})
    // console.log(outtype);
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cOut_type/deleteOuttype.ejs'),{message:'error',invalidId: req.body._id});
  }
});

module.exports= router;