import React, { useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10, status: 'Pending' },
    { id: 2, name: 'Product 2', price: 20, status: 'InProgress' },
    { id: 3, name: 'Product 3', price: 30, status: 'Completed' },
  ]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');

  const handleEditProduct = (productId) => {
    const product = products.find((product) => product.id === productId);
    if (product.status !== 'Completed') {
      setEditingProductId(productId);
      setEditedProductName(product.name);
    }
  };

  const handleSaveProduct = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, name: editedProductName } : product
    );
    setProducts(updatedProducts);
    setEditingProductId(null);
    setEditedProductName('');
  };

  const handleAddProduct = () => {
    const newProductId = products.length + 1;
    const newProduct = { id: newProductId, name: `Product ${newProductId}`, price: 0, status: 'Pending' };
    setProducts([...products, newProduct]);
  };

  const handleChangeProductStatus = (productId, newStatus) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, status: newStatus } : product
    );
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <button className='btn3' onClick={handleAddProduct}>Add Product</button>
      <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={editedProductName}
                    onChange={(e) => setEditedProductName(e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>{product.price}</td>
              <td>{product.status}</td>
              <td>
                {editingProductId === product.id ? (
                  <button onClick={() => handleSaveProduct(product.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    {product.status !== 'Completed' && (
                      <div>
                        <button onClick={() => handleChangeProductStatus(product.id, 'Pending')}>
                          Set Pending
                        </button>
                        <button onClick={() => handleChangeProductStatus(product.id, 'InProgress')}>
                          Set InProgress
                        </button>
                        <button onClick={() => handleChangeProductStatus(product.id, 'Completed')}>
                          Set Completed
                        </button>
                      </div>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ProductList;
