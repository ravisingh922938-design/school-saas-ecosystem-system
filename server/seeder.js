const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tenant = require('./models/Tenant');

dotenv.config();

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolsaas';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected for Seeder...'))
.catch(err => {
    console.error('MongoDB connection error for Seeder:', err);
    process.exit(1);
});

const generateRandomTenant = () => {
    const types = ['School', 'Coaching', 'College'];
    const revenueModels = ['Subscription', 'Commission'];
    const statuses = ['Active', 'Blocked'];

    const randomName = (prefix) => `${prefix} ${Math.floor(Math.random() * 1000)}`;
    const randomEmail = (name) => `${name.toLowerCase().replace(/ /g, '.')}@example.com`;

    const type = types[Math.floor(Math.random() * types.length)];
    const name = randomName(type === 'School' ? 'Alpha School' : type === 'Coaching' ? 'Beta Coaching' : 'Gamma College');

    return {
        name,
        email: randomEmail(name),
        type,
        studentCount: Math.floor(Math.random() * (5000 - 100 + 1)) + 100,
        revenueModel: revenueModels[Math.floor(Math.random() * revenueModels.length)],
        commercials: {
            platformFee: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
            admissionFee: Math.floor(Math.random() * (500 - 50 + 1)) + 50,
        },
        features: {
            transport: Math.random() > 0.5,
            library: Math.random() > 0.5,
            hostel: Math.random() > 0.5,
            sms: Math.random() > 0.5,
        },
        status: Math.random() < 0.9 ? 'Active' : 'Blocked',
        createdAt: new Date(),
    };
};

const importData = async () => {
    try {
        await Tenant.deleteMany({});
        console.log('Existing tenants cleared.');

        const tenants = [];
        for (let i = 0; i < 50; i++) {
            tenants.push(generateRandomTenant());
        }

        await Tenant.insertMany(tenants);
        console.log('50 dummy tenants imported!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();

