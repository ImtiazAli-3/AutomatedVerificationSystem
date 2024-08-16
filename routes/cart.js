const express = require('express');
const db = require('../config/database');
const mysql = require('mysql2/promise');
const router = express.Router();

// check if the user is authenticated o rnot
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}
router.post('/add-to-basket', isAuthenticated, async (req, res) => {
    const { itemId, quantity } = req.body;
    const userId = req.user.id;
  
    try {
      // Check if item exists in  basket
      const [existingItem] = await db.query('SELECT * FROM basket WHERE user_id = ? AND item_id = ?', [userId, itemId]);
      
      if (existingItem.length > 0) {
        // Item exists, update the quantity
        const newQuantity = existingItem[0].quantity + quantity;
        await db.query('UPDATE basket SET quantity = ? WHERE user_id = ? AND item_id = ?', [newQuantity, userId, itemId]);
        res.json({ message: 'Quantity updated' });
      } else {
        // Item doesnot exist, insert a new entry
        await db.query('INSERT INTO basket (user_id, item_id, quantity) VALUES (?, ?, ?)', [userId, itemId, quantity]);
        res.json({ message: 'Item added to basket' });
      }
    } catch (err) {
      console.error('Error during database operation:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });
  


  router.get('/cart', isAuthenticated, async (req, res) => {
    const userId = req.user.id;
    try {
      const [cartItems] = await db.query(`
        SELECT basket.id, basket.quantity, items.name, items.price, items.image
        FROM basket
        JOIN items ON basket.item_id = items.id
        WHERE basket.user_id = ?
      `, [userId]);
  
      let shippingCost = 5.00; 
      let taxRate = 0.20; //extras
    
      let subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      let estimatedTax = subtotal * taxRate;
      let cartTotal = subtotal + shippingCost + estimatedTax;
      
  
      res.render('cart', {
        cartItems,
        subtotal: subtotal.toFixed(2),
        shippingCost: shippingCost.toFixed(2),
        estimatedTax: estimatedTax.toFixed(2),
        cartTotal: cartTotal.toFixed(2)
      });
    } catch (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).send('Error fetching cart items');
    }
  });
  
//post method for update cart. items can be removed or increased within the cart. updates the table and page without refresh
router.post('/update-cart', isAuthenticated, async (req, res) => {
    const { itemId, newQuantity } = req.body;
    const userId = req.user.id; 
  
    try {
      await db.query('UPDATE basket SET quantity = ? WHERE id = ? AND user_id = ?', [newQuantity, itemId, userId]);
      res.json({ message: 'Cart updated' });
    } catch (err) {
      console.error('Error updating cart:', err);
      res.status(500).json({ error: 'Error updating cart', details: err.message });
    }
  });
  
  router.post('/remove-from-cart', isAuthenticated, async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user.id;
  
    try {
      await db.query('DELETE FROM basket WHERE id = ? AND user_id = ?', [itemId, userId]);
      res.json({ message: 'Item removed from cart' });
    } catch (err) {
      console.error('Error removing item from cart:', err);
      res.status(500).json({ error: 'Error removing item from cart', details: err.message });
    }
  });
      
  

module.exports = router;
