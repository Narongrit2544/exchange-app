const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes'); // ตรวจสอบชื่อไฟล์ให้ถูกต้อง

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
