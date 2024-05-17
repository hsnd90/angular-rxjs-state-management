export const categories = [
  { id: 1, name: 'Produce' },
  { id: 2, name: 'Dairy' },
  { id: 3, name: 'Meat' },
  { id: 4, name: 'Beverages' },
  { id: 5, name: 'Seafood' },
];

export const subcategories = [
  { id: 1, name: 'Fruits', parentId: 1 },
  { id: 2, name: 'Vegetables', parentId: 1 },
  { id: 3, name: 'Dairy', parentId: 2 },
  { id: 4, name: 'Meat', parentId: 3 },
  { id: 5, name: 'Beverages', parentId: 4 },
  { id: 6, name: 'Seafood', parentId: 5 },
];
