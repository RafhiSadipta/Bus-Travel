const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const agenRoutes = require('./routes/agenRoutes');
const terminalRoutes = require('./routes/terminalRoutes');
const ruteRoutes = require('./routes/ruteRoutes');
const fasilitasRoutes = require('./routes/fasilitasRoutes');
const busRoutes = require('./routes/busRoutes');
const tiketRoutes = require('./routes/tiketRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/uploads', express.static('uploads')); // Untuk akses file statis
app.use('/agen', agenRoutes);
app.use('/api/terminals', terminalRoutes);
app.use('/api/rutes', ruteRoutes);
app.use('/api/fasilitas', fasilitasRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/tikets', tiketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
