const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contact', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Define the endpoint to handle form submissions
app.post('/api/contact', (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save()
        .then(() => res.status(201).json({ message: 'Contact saved successfully!' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
