const express = require('express');
const path = require('path');
const router = express.Router();
const Service = require('../models/vService');
const ServiceType = require('../models/cService_type');




router.get('/', async (req, res) => {
    try {
      const incomes = await Service.find();
      res.render(path.join(__dirname,'../public','vService/vService.ejs'),{incomes:incomes})
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','vService/vService.ejs'),{message:'error'});
    }
  });

router.get('/add', (req, res) => {
    try {
      res.render(path.join(__dirname,'../public','vService/addIncome.ejs'))
    } catch (error) {
      res.status(500).render(path.join(__dirname,'../public','vService/addIncome.ejs'),{message:'error'});
    }
});

router.post('/add',async (req, res) => {
  // console.log(req.body)
    try {
        const income = await Service.create(req.body)
        res.render(path.join(__dirname,'../public','vService/addIncome.ejs'),{message:'income added successfully'})
    } catch (error) {
        res.status(500).render(path.join(__dirname,'../public','vService/addIncome.ejs'),{message:'error',invalidData:req.body});
    }
});

router.get('/update', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','vService/updateIncome.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'vService/updateIncome.ejs'),{message:'error'});
  }
});

router.post('/update/find', async (req, res) => {
  try {
    const income = await Service.findById(req.body._id);
    if(income==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','vService/updateIncome.ejs'),{id:req.body._id, income:income});
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','vService/updateIncome.ejs'),{message:'error',invalidId: req.body._id});
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const income = await Service.findByIdAndUpdate(id,req.body);
    if(income==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','vService/updateIncome.ejs'),{message:'income updated successfully'})
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','vService/updateIncome.ejs'),{message:'error'});
  }
});

router.get('/delete', (req, res) => {
  try {
    res.render(path.join(__dirname,'../public','vService/deleteIncome.ejs'))
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','vService/deleteIncome.ejs'),{message:'error'});
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const id = req.body._id;
    const income = await Service.findByIdAndDelete(id);
    if(income==null){
      throw 'error'
    }
    res.render(path.join(__dirname,'../public','vService/deleteIncome.ejs'),{message:'income deleted successfully'})
    // console.log(service);
  } catch (error) {
    res.status(500).render(path.join(__dirname,'../public','vService/deleteIncome.ejs'),{message:'error',invalidId: req.body._id});
  }
});


module.exports= router;