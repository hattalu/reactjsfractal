import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';

const MyOrders = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState([
    { id: 1, orderNumber: 'ORD-001', date: '2023-05-19', productCount: 2, finalPrice: 100.0 },
    { id: 2, orderNumber: 'ORD-002', date: '2023-05-18', productCount: 3, finalPrice: 150.0 },
    { id: 3, orderNumber: 'ORD-003', date: '2023-05-17', productCount: 4, finalPrice: 120.0 }
  ]);

  const deleteOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const confirmDeleteOrder = () => {
    const updatedOrders = orders.filter(order => order.id !== selectedOrderId);
    setOrders(updatedOrders);
    setSelectedOrderId(null);
  };

  return (
    <div>
    <h2>My Orders</h2>
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order #</th>
            <th>Date</th>
            <th># Products</th>
            <th>Final Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.productCount}</td>
              <td>{order.finalPrice}</td>
              <td>
                <Link to={`/add-edit/${order.id}`}><BsPencilFill /></Link>
                <button onClick={() => deleteOrder(order.id)}><BsTrashFill /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {selectedOrderId && (
          <div className="modalm">
            <div className="modalm-content">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this order?</p>
              <button onClick={confirmDeleteOrder}>Delete</button>
              <button onClick={() => setSelectedOrderId(null)}>Cancel</button>
            </div>
          </div>
      )}

      <button className='btn1'>
        <Link to="/add-edit">Add New Order</Link>
      </button>
    
    </div>
  );
};

export default MyOrders;