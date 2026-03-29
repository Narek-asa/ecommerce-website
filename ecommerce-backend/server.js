import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import productRoutes from './routes/products.js';
import deliveryOptionRoutes from './routes/deliveryOptions.js';
import cartItemRoutes from './routes/cartItems.js';
import orderRoutes from './routes/orders.js';
import resetRoutes from './routes/reset.js';
import paymentSummaryRoutes from './routes/paymentSummary.js';
import { Product } from './models/Product.js';
import { DeliveryOption } from './models/DeliveryOption.js';
import { CartItem } from './models/CartItem.js';
import { Order } from './models/Order.js';
import { defaultProducts } from './defaultData/defaultProducts.js';
import { defaultDeliveryOptions } from './defaultData/defaultDeliveryOptions.js';
import { defaultCart } from './defaultData/defaultCart.js';
import { defaultOrders } from './defaultData/defaultOrders.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

let initializePromise;

function initializeDatabase() {
  if (initializePromise) return initializePromise;

  initializePromise = (async () => {
    await sequelize.sync();

    const productCount = await Product.count();

    if (productCount === 0) {
      const timestamp = Date.now();

      const productsWithTimestamps = defaultProducts.map((product, index) => ({
        ...product,
        createdAt: new Date(timestamp + index),
        updatedAt: new Date(timestamp + index),
      }));

      const deliveryOptionsWithTimestamps = defaultDeliveryOptions.map((option, index) => ({
        ...option,
        createdAt: new Date(timestamp + index),
        updatedAt: new Date(timestamp + index),
      }));

      const cartItemsWithTimestamps = defaultCart.map((item, index) => ({
        ...item,
        createdAt: new Date(timestamp + index),
        updatedAt: new Date(timestamp + index),
      }));

      const ordersWithTimestamps = defaultOrders.map((order, index) => ({
        ...order,
        createdAt: new Date(timestamp + index),
        updatedAt: new Date(timestamp + index),
      }));

      await Product.bulkCreate(productsWithTimestamps);
      await DeliveryOption.bulkCreate(deliveryOptionsWithTimestamps);
      await CartItem.bulkCreate(cartItemsWithTimestamps);
      await Order.bulkCreate(ordersWithTimestamps);

      console.log('Default data added to the database.');
    }
  })();

  return initializePromise;
}

app.use(async (req, res, next) => {
  try {
    await initializeDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/products', productRoutes);
app.use('/api/delivery-options', deliveryOptionRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reset', resetRoutes);
app.use('/api/payment-summary', paymentSummaryRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;