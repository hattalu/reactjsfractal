import { useParams } from "react-router-dom"
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import React, { useState } from 'react';

export default function OrderDetails() {
  const { orderId } = useParams();
  const isNewOrder = Boolean(orderId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', unitPrice: 10.0, quantity: 1 },
    { id: 2, name: 'Product 2', unitPrice: 20.0, quantity: 2 },
    { id: 3, name: 'Product 3', unitPrice: 30.0, quantity: 3 },
  ]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleSaveProduct = () => {
    const productToAdd = {
      id: selectedProduct,
      name: `Product ${selectedProduct}`,
      unitPrice: 0.0,
      quantity: quantity,
    };
    setProducts((prevProducts) => [...prevProducts, productToAdd]);
    setSelectedProduct('');
    setQuantity(0);
    setIsModalOpen(false);
  };

  const editProduct = (productId) => {
    console.log('Editing product:', productId);
  };

  const removeProduct = (productId) => {
    console.log('Removing product:', productId);
  };

  const saveOrder = () => {
    console.log('Saving order');
  };

  return (
    <div>
      <h2>{isNewOrder ? 'Edit Order' : 'Add Order'}</h2>
      <form className="table-container">
        <label>
          Order #:
          <input type="text" disabled={isNewOrder} />
        </label>
        <label>
          Date:
          <input type="text" disabled value={new Date().toLocaleDateString()} />
        </label>
        <label>
          # Products:
          <input type="text" disabled value={products.length} />
        </label>
        <label>
          Final Price:
          <input
            type="text"
            disabled
            value={products.reduce((total, product) => total + product.unitPrice * product.quantity, 0)}
          />
        </label>
      </form>

      <button className="btn3" onClick={handleOpenModal}>Add New Product</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Product</h2>
            <form>
              <div>
                <label>Select Product:</label>
                <select value={selectedProduct} onChange={handleProductChange}>
                  <option value="">Select a product</option>
                </select>
              </div>
              <div>
                <label>Quantity:</label>
                <input type="number" value={quantity} onChange={handleQuantityChange} />
              </div>
              <button type="button" onClick={handleSaveProduct}>
                Save
              </button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Unit Price</th>
            <th>Qty</th>
            <th>Total Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.unitPrice}</td>
              <td>{product.quantity}</td>
              <td>{product.unitPrice * product.quantity}</td>
              <td>
                <button onClick={() => editProduct(product.id)}><BsPencilFill /></button>
                <button onClick={() => removeProduct(product.id)}><BsTrashFill /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button className="btn2" onClick={saveOrder}>{isNewOrder ? 'Save Order' : 'Create Order'}</button>
    </div>
  );
}