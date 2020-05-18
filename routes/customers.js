const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Customer, validateInput} = require('../models/customer');

// GET REQUEST HANDLER
router.get('/' , async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// GET SPECIFIC ID REQUEST HANDLER
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('ID Not found');
    res.send(customer);
});

// POST REQUEST HANDLER
router.post('/' , async (req,res) => {
const result = validateInput(req.body);
if (result.error) {
    // Bad Request = 400
    res.status(400).send(result.error.details[0].message);
    return;
}

let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
});

customer = await customer.save();
res.send(customer);
});

// UPDATE REQUEST HANDLER
router.put('/:id', async (req, res) => {
    const result = validateInput(req.body);
    if(result.error){
        // Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {
            isGold : req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
    }, {new: true});
    res.send(customer);
});

// DELETE REQUEST HANDLER
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('ID Not found');
    res.send('Deleted')
});

module.exports = router;