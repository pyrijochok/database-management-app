const express = require('express');
const path = require('path');
const router = express.Router();
const ServiceType = require('../models/cService_type');



router.get('/', async (req, res) => {
    try {
      const services = await ServiceType.find();
      res.render(path.join(__dirname,'../public','cService_type/cService_type.ejs'),{services:services})
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','cService_type/cService_type.ejs'),{message:'error'});
    }
  });

router.get('/add', (req, res) => {
    try {
      res.render(path.join(__dirname,'../public','cService_type/addService.ejs'))
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','cService_type/addService.ejs'),{message:'error'});
    }
});

router.post('/add',async (req, res) => {
  // console.log(req.body)
    try {
        const service = await ServiceType.create(req.body)
        res.render(path.join(__dirname,'../public','cService_type/addService.ejs'),{message:'service added successfully'})
    } catch (error) {
        res.status(500).render(path.join(__dirname,'../public','cService_type/addService.ejs'),{message:'error',invalidData:req.body});
    }
});

router.get('/update', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','cService_type/updateService.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'cService_type/updateService.ejs'),{message:'error'});
  }
});

router.post('/update/find', async (req, res) => {
  try {
    const service = await ServiceType.findById(req.body._id);
    if(service==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cService_type/updateService.ejs'),{id:req.body._id, service:service});
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cService_type/updateService.ejs'),{message:'error',invalidId: req.body._id});
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const service = await ServiceType.findByIdAndUpdate(id,req.body);
    if(service==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cService_type/updateService.ejs'),{message:'servise updated successfully'})
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cService_type/updateService.ejs'),{message:'error'});
  }
});

router.get('/delete', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','cService_type/deleteService.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cService_type/deleteService.ejs'),{message:'error'});
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const id = req.body._id;
    const service = await ServiceType.findByIdAndDelete(id);
    if(service==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','cService_type/deleteService.ejs'),{message:'service deleted successfully'})
    // console.log(service);
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','cService_type/deleteService.ejs'),{message:'error',invalidId: req.body._id});
  }
});


module.exports= router;