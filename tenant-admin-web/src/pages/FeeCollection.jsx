import React, { useState } from 'react';

const FeeCollection = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [invoice, setInvoice] = useState(null);

  const platformFee = 20;

  const handleCollectFee = (e) => {
    e.preventDefault();
    if (amount) {
      const totalAmount = paymentMethod === 'Online Link' ? parseFloat(amount) + platformFee : parseFloat(amount);
      setInvoice({
        id: 'INV-' + Date.now(),
        date: new Date().toLocaleDateString(),
        amount: parseFloat(amount).toFixed(2),
        platformFee: paymentMethod === 'Online Link' ? platformFee.toFixed(2) : '0.00',
        totalAmount: totalAmount.toFixed(2),
        paymentMethod,
      });
    }
  };

  return (
    <div className="fee-collection-container">
      <h2>Fee Collection</h2>
      <form onSubmit={handleCollectFee} className="fee-form">
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Method</option>
            <option value="Cash">Cash</option>
            <option value="Online Link">Online Link</option>
            <option value="Card">Card</option>
          </select>
        </div>

        {paymentMethod === 'Online Link' && (
          <p className="platform-fee-text">Platform Fee ₹{platformFee} will be added</p>
        )}

        <button type="submit" className="collect-fee-button">Collect Fee</button>
      </form>

      {invoice && (
        <div className="invoice-preview">
          <h3>Invoice Preview</h3>
          <p><strong>Invoice ID:</strong> {invoice.id}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Amount:</strong> ₹{invoice.amount}</p>
          {invoice.platformFee !== '0.00' && <p><strong>Platform Fee:</strong> ₹{invoice.platformFee}</p>}
          <p><strong>Total Amount:</strong> ₹{invoice.totalAmount}</p>
          <p><strong>Payment Method:</strong> {invoice.paymentMethod}</p>
          <button onClick={() => alert('Invoice Printed/Saved!')} className="print-invoice-button">Print Invoice</button>
        </div>
      )}
    </div>
  );
};

export default FeeCollection;
