const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/indexapp/dist/indexapp'));

mongoose.connect('mongodb://localhost/beltexamDb');

var uniqueValidator = require("mongoose-unique-validator");
const PetSchema = new mongoose.Schema({

    name: { type: String, required: [true, "Pet must have a name"], minlength: [3, "Name must be longer than 3 characters"], unique: [true, "This name already exists"]},
    type: { type: String, required: [true, "Pet must have a Type"], minlength: [2, "Type must be longer than 2 characters"]},
    description: { type: String, required: [true, "Pet must have a Description"], minlength: [7, "Description must be longer than 7 characters"]},
    skill1: {type: String},
    skill2: { type: String},
    skill3: { type: String},
    likes: {type: Number, default: 0}
}, { timestamps: true });

PetSchema.plugin(uniqueValidator);

const Pet = mongoose.model('Pet', PetSchema);

// 1. Retrieve all Pets
app.get('/pet', function (req, res) {
    Pet.find({}, function (err, data) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json(data);
        }
    });
});

app.get('/pet/:id/edit', function (req, res) {
    Pet.find({}, function (err, data) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json(data);
        }
    });
});

app.get('/pet/:id', function (req, res) {
    Pet.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json(data);
        }
    });
});
// 2. Create new pet
app.post('/addpet', function (req, res) {
    console.log("POST /addpet");
    console.log(req.body);
    var pet = new Pet(req.body);

    pet.save(function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success", data: Pet })
        }
    })

})
// 3. Update a Pet by ID
app.put('/pet/:id/edit', function (req, res) {
    var obj = {};
    if (req.body.name) { //if in the body your passing a new firstName.
        obj['name'] = req.body.name;
    }
    if (req.body.type) {
        obj['type'] = req.body.type;
    }
    if (req.body.description) {
        obj['description'] = req.body.description;
    }
    if (req.body.skills) {
        obj['skill1'] = req.body.skill1;
    }
    if (req.body.skills) {
        obj['skill2'] = req.body.skill2;
    }
    if (req.body.skills) {
        obj['skill3'] = req.body.skill3;
    }
    
    Pet.update({ _id: req.params.id }, {
        $set: obj
    }, function (err, data) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success", data: data })
        }
    });
})

// 4. Delete a Pet by ID
app.delete('/pet/:id', function (req, res) {
    Pet.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success" })
        }
    });
})

// catch all for angular routes
app.all("**", (req, res, next) => {
    res.sendFile(path.resolve("./indexapp/dist/indexapp/index.html"))
})
// tell your server which port to run on
app.listen(4200);
// print to terminal window
console.log("Running in localhost at port 4200");