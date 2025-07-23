import React, { useState } from 'react';
import { Search, Plus, X, AlertTriangle, CheckCircle } from 'lucide-react';

const YeastTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({ name: '', category: '', isSafe: true });
  const [showAddForm, setShowAddForm] = useState(false);

  // Initial food database with common items
  const [foodItems, setFoodItems] = useState([
    // Breads & Baked Goods
    { id: 1, name: 'White Bread', category: 'Breads & Baked Goods', isSafe: false },
    { id: 2, name: 'Sourdough Bread', category: 'Breads & Baked Goods', isSafe: false },
    { id: 3, name: 'Pizza Dough', category: 'Breads & Baked Goods', isSafe: false },
    { id: 4, name: 'Bagels', category: 'Breads & Baked Goods', isSafe: false },
    { id: 5, name: 'Unleavened Bread/Matzo', category: 'Breads & Baked Goods', isSafe: true },
    { id: 6, name: 'Tortillas (Corn)', category: 'Breads & Baked Goods', isSafe: true },
    
    // Beverages
    { id: 7, name: 'Beer', category: 'Beverages', isSafe: false },
    { id: 8, name: 'Wine', category: 'Beverages', isSafe: false },
    { id: 9, name: 'Kombucha', category: 'Beverages', isSafe: false },
    { id: 10, name: 'Fresh Fruit Juice', category: 'Beverages', isSafe: true },
    { id: 11, name: 'Water', category: 'Beverages', isSafe: true },
    
    // Dairy & Alternatives
    { id: 12, name: 'Aged Cheese', category: 'Dairy & Alternatives', isSafe: false },
    { id: 13, name: 'Blue Cheese', category: 'Dairy & Alternatives', isSafe: false },
    { id: 14, name: 'Fresh Milk', category: 'Dairy & Alternatives', isSafe: true },
    { id: 15, name: 'Fresh Mozzarella', category: 'Dairy & Alternatives', isSafe: true },
    
    // Condiments & Seasonings
    { id: 16, name: 'Nutritional Yeast', category: 'Condiments & Seasonings', isSafe: false },
    { id: 17, name: 'Soy Sauce', category: 'Condiments & Seasonings', isSafe: false },
    { id: 18, name: 'Miso Paste', category: 'Condiments & Seasonings', isSafe: false },
    { id: 19, name: 'Salt', category: 'Condiments & Seasonings', isSafe: true },
    { id: 20, name: 'Pure Herbs & Spices', category: 'Condiments & Seasonings', isSafe: true },
    
    // Supplements & Vitamins
    { id: 21, name: 'B-Complex Vitamins', category: 'Supplements & Vitamins', isSafe: false },
    { id: 22, name: 'Brewers Yeast Supplements', category: 'Supplements & Vitamins', isSafe: false },
    { id: 23, name: 'Vitamin C (Pure)', category: 'Supplements & Vitamins', isSafe: true },
    
    // Fresh Foods
    { id: 24, name: 'Fresh Fruits', category: 'Fresh Foods', isSafe: true },
    { id: 25, name: 'Fresh Vegetables', category: 'Fresh Foods', isSafe: true },
    { id: 26, name: 'Fresh Meat', category: 'Fresh Foods', isSafe: true },
    { id: 27, name: 'Fresh Fish', category: 'Fresh Foods', isSafe: true }
  ]);

  // Filter items based on search term
  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group items by category
  const groupedItems = filteredItems.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {});

  // Add new item
  const addItem = () => {
    if (newItem.name.trim() && newItem.category.trim()) {
      const newId = Math.max(...foodItems.map(item => item.id), 0) + 1;
      setFoodItems([...foodItems, {
        id: newId,
        name: newItem.name.trim(),
        category: newItem.category.trim(),
        isSafe: newItem.isSafe
      }]);
      setNewItem({ name: '', category: '', isSafe: true });
      setShowAddForm(false);
    }
  };

  // Remove item
  const removeItem = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Yeast Allergy Tracker</h1>
        <p className="text-gray-600 mb-6">Track foods that are safe or potentially unsafe due to yeast content</p>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search foods or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Add New Item Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Food Item
        </button>

        {/* Add New Item Form */}
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
            <h3 className="text-lg font-semibold mb-3">Add New Food Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Food name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={newItem.isSafe === true}
                  onChange={() => setNewItem({...newItem, isSafe: true})}
                  className="text-green-600"
                />
                <CheckCircle className="w-4 h-4 text-green-600" />
                Safe
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={newItem.isSafe === false}
                  onChange={() => setNewItem({...newItem, isSafe: false})}
                  className="text-red-600"
                />
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Potentially Unsafe
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addItem}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Item
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Food Categories */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border-2 flex items-center justify-between ${
                  item.isSafe
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.isSafe ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-medium">{item.name}</span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  title="Remove item"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* No Results Message */}
      {filteredItems.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <p className="text-gray-600">No items found matching your search.</p>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Safe - No yeast content</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Potentially Unsafe - Contains or may contain yeast</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-3">
          Always consult with your healthcare provider and read ingredient labels carefully.
        </p>
      </div>
    </div>
  );
};

export default YeastTracker;