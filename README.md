# Crypto Exchange API

ระบบแลกเปลี่ยนเหรียญ Cryptocurrency (เช่น BTC, ETH) ด้วยเงิน Fiat (THB, USD) พัฒนาโดยใช้ Node.js, Express.js และ Sequelize (MySQL)

# รายละเอียดโจทย์

- ระบบสามารถตั้งคำสั่ง **ซื้อ-ขายเหรียญ (BTC, ETH, XRP, DOGE)**
- ผู้ใช้สามารถ **โอนเหรียญภายในระบบ หรือโอนไปภายนอกระบบ**
- ระบบมี **บัญชีผู้ใช้และกระเป๋าเงินคริปโต**
- มีการบันทึก **ธุรกรรม** ทุกการซื้อขายและโอนเหรียญ
- ใช้ **ER Diagram** เป็นพื้นฐานในการออกแบบระบบ


# Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- dotenv

1. การติดตั้ง

    ```bash
    git clone https://github.com/Narongrit2544/exchange-app.git
    cd exchange-app
    npm install

2. เลือกไฟล์ .env เพื่อเชื่อมต่อกับ MySQL:
    
    ```bash
        DB_USER=root
        DB_PASSWORD=เปลี่ยนPassword ตรงนี้
        DB_NAME=crypto_exchange
        DB_HOST=127.0.0.1
        DB_DIALECT=mysql
        PORT=5000
3. ติดตั้ง Dependencies
    ```bash
        npm install
4. การ Seed ข้อมูล 
    ```bash
        node seeders/seed.js
5. การรันเซิร์ฟเวอร์
    ```bash 
        npm run dev

## 📡 API Endpoint หลัก

| Method | Endpoint            | รายละเอียด                              |
|--------|---------------------|-------------------------------------------|
| GET    | `/api/users`        | ดึงรายชื่อผู้ใช้                        |
| GET    | `/api/currencies`   | ดึงรายการเหรียญ (BTC, ETH)              |
| GET    | `/api/wallets`      | ดูยอดเงินในกระเป๋า                      |
| GET    | `/api/orders`       | ดูคำสั่งซื้อ-ขายทั้งหมด                 |
| POST   | `/api/orders`       | สร้างคำสั่งซื้อขายใหม่                  |
| GET    | `/api/transactions` | ดูธุรกรรมทั้งหมด                        |
| POST   | `/api/transactions` | สร้างธุรกรรมใหม่ (โอนภายใน/ภายนอก)    |

6. ตัวอย่างทดสอบ API  
- ดูเหรียญทั้งหมด
    ```bash
        curl http://localhost:5000/api/currencies
- สร้างคำสั่งซื้อขาย
    ```bash
        curl -X POST http://localhost:5000/api/orders \
        -H "Content-Type: application/json" \
        -d '{"buyer_id":1,"seller_id":2,"currency_id":2,"amount":1.5,"price":120000,"status":"pending"}'
- โอนเหรียญ
    ```bash
        curl -X POST http://localhost:5000/api/transactions \
        -H "Content-Type: application/json" \
        -d '{"order_id":1,"payment_id":1,"amount":120000,"recipient_address":"0xabc123","status":"confirmed","is_internal":true}'
