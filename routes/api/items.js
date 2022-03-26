const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

//item Model
const Item = require('../../models/Item');

//@ route GET api/items
//@desc GET all Items
// @access Public
router.get('/', (req, res) => { 
    Item.find()
     .sort({ date: -1})
     .then(items => res.json(items))   
});

//@ route post api/items
//@desc create a item
// @access Public
router.post('/', (req, res) => { 
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item))   
});


//@ route delete api/items
//@desc delete a item
// @access Public
router.delete('/:id', (req, res) => { 
    Item.findById(req.params.id)
     .then(item => item
    .remove()
    .then(() =>  res.json({success: true}))) 
    .catch(err => res.status(404).json({success:false}));
})
 

module.exports = router;