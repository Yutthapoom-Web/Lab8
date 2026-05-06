const db = require('./Model');
const fs = require('fs');

// แสดงรายการสินค้า
exports.index = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
        res.render('index', { products: rows });
    } catch (err) { res.status(500).send(err.message); }
};

// หน้าฟอร์มเพิ่มสินค้า
exports.addPage = (req, res) => {
    res.render('add-product');
};

// บันทึกสินค้าใหม่
exports.store = async (req, res) => {
    const { name, category, price, stock } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
        await db.query('INSERT INTO products (name, category, price, stock, image) VALUES (?,?,?,?,?)', 
                      [name, category, price, stock, image]);
        res.redirect('/');
    } catch (err) { res.status(500).send(err.message); }
};

// ลบสินค้าและรูปภาพ
exports.delete = async (req, res) => {
    try {
        const [row] = await db.query('SELECT image FROM products WHERE id = ?', [req.params.id]);
        if (row[0].image) {
            const path = './public/uploads/' + row[0].image;
            if (fs.existsSync(path)) fs.unlinkSync(path);
        }
        await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.redirect('/');
    } catch (err) { res.status(500).send(err.message); }
};