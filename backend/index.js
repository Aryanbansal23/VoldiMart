require('dotenv').config({
  path: __dirname + '/.env'
});

const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const seedDB = require('./seed/productSeeds');
const syncPinecone = require('./sync/syncPinecone');

const productRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const {
  setupSwaggerUi,
  setupSwaggerJson
} = require('./docs/swagger');

// Create Express App
const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect root to API documentation
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Setup Swagger
setupSwaggerJson(app);
setupSwaggerUi(app);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/search', require('./routes/search'));
app.use('/api/auth', authRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');

    // Seed database
    const skipSeed = process.env.SKIP_SEED_ON_START === 'true';

    if (!skipSeed) {
      try {
        const forceSeed =
          process.env.FORCE_SEED_ON_START === 'true';

        const result = await seedDB({
          force: forceSeed,
          skipIfExists: !forceSeed
        });

        if (result?.seeded) {
          console.log('🪴 Database seeded');
        } else if (result?.skipped) {
          console.log('🌱 Seed skipped (existing products retained)');
        }
      } catch (err) {
        console.error('❌ Seeding error:', err);
      }
    } else {
      console.log(
        '🌱 SKIP_SEED_ON_START enabled. Existing products preserved.'
      );
    }

    // Sync recommendation engine
    try {
      await syncPinecone();
      console.log('✅ Pinecone synced');
    } catch (err) {
      console.error(
        '❌ Pinecone sync error (continuing with fallbacks):',
        err
      );
    }

    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server ready on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;