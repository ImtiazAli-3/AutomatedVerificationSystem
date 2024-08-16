const pool = require('../config/database');
//for the items
async function fetchItemById(itemId) {
  try {
    const query = 'SELECT * FROM items WHERE id = ?';
    const [rows] = await pool.query(query, [itemId]);
    if (rows.length > 0) {
      return rows[0]; // Return the first item in the rows array
    }
    return null; // Return null if no item found
  } catch (err) {
    throw err; // Rethrow any caught error
  }
}

async function fetchItemsByCategory(category, excludeItemId) {
  const query = 'SELECT * FROM items WHERE category = ? AND id != ? ORDER BY RAND() LIMIT 5';
  const [similarItems] = await pool.query(query, [category, excludeItemId, 5]); 
  return similarItems;
}

module.exports = {
  fetchItemById,
  fetchItemsByCategory
};
