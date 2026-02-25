const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/register-patient', (req, res) => {
    const patientData = req.body;
    console.log("New Patient Received:", patientData);
    res.status(200).send({ message: "Registration successful! Welcome to VitalSigns Portal." });
});

app.listen(PORT, () => {
    console.log(`VitalSigns server running on http://localhost:${PORT}`);
});