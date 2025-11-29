const cron = require('node-cron');
const Tenant = require('../models/Tenant');
const Invoice = require('../models/Invoice');
const sendEmail = require('../utils/sendEmail');
const logger = require('../utils/logger');

// Constants
const MONTHLY_AMOUNT = 5000; // Default monthly amount

/**
 * Generate invoices for all active subscription tenants
 */
const generateMonthlyInvoices = async () => {
  try {
    logger.info('Starting monthly billing process...');
    
    // Find all active tenants with subscription model
    const tenants = await Tenant.find({
      status: 'Active',
      'revenueModel.type': 'Subscription'
    });

    let successCount = 0;
    const errors = [];

    // Process each tenant
    for (const tenant of tenants) {
      try {
        // Create invoice
        const invoice = new Invoice({
          tenant: tenant._id,
          amount: tenant.revenueModel.amount || MONTHLY_AMOUNT,
          status: 'Pending'
        });

        await invoice.save();

        // Send email notification
        await sendEmail({
          to: tenant.email,
          subject: `Monthly Invoice - ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`,
          text: `Dear ${tenant.name},\n\nYour monthly invoice of ₹${invoice.amount} has been generated.\n\n` +
                `Invoice #: ${invoice._id}\n` +
                `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}\n\n` +
                'Please make the payment before the due date.\n\n' +
                'Thank you for your business!\n' +
                'SchoolSaaS Team'
        });

        successCount++;
        logger.info(`Invoice sent to ${tenant.name} (${tenant.email})`);
      } catch (error) {
        errors.push({
          tenant: tenant._id,
          error: error.message
        });
        logger.error(`Error processing tenant ${tenant._id}:`, error);
      }
    }

    // Log summary
    logger.info(`Monthly billing completed. Success: ${successCount}, Errors: ${errors.length}`);
    
    if (errors.length > 0) {
      logger.error('Errors during billing:', errors);
    }
  } catch (error) {
    logger.error('Error in monthly billing job:', error);
  }
};

// Schedule the job to run at 00:00 on the 1st of every month
const monthlyBillingJob = cron.schedule(
  '0 0 1 * *', // At 00:00 on day-of-month 1
  generateMonthlyInvoices,
  {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  }
);

// For testing: Uncomment to run immediately
// generateMonthlyInvoices();

module.exports = monthlyBillingJob;
