const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // ลอง 'root' ถ้าไม่ได้ให้เปลี่ยนเป็น '' (ค่าว่าง)
    password: 'root', 
    database: 'supermarket_db',
    // MAMP บน Windows ส่วนใหญ่ใช้ 3306 หรือ 8889
    // ให้เช็คในหน้าโปรแกรม MAMP ตรงคำว่า MySQL Port
    port: 3306 
});

db.connect((err) => {
    if (err) {
        console.error('❌ เชื่อมต่อฐานข้อมูลไม่สำเร็จ!');
        console.error('เหตุผล:', err.message);
        console.error('คำแนะนำ: เช็คว่าเปิด MAMP หรือยัง? หรือ Port ตรงกับใน MAMP มั้ย?');
    } else {
        console.log('✅ เชื่อมต่อ MAMP MySQL สำเร็จแล้ว!');
    }
});

module.exports = db.promise();