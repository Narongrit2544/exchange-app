const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes'); // ตรวจสอบชื่อไฟล์ให้ถูกต้อง
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
