const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes'); // ตรวจสอบชื่อไฟล์ให้ถูกต้อง
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

app.use('/orders', orderRoutes);
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
