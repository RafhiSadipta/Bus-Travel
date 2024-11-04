const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const agenRoutes = require('./routes/agenRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/uploads', express.static('uploads')); // Untuk akses file statis
app.use('/agen', agenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
