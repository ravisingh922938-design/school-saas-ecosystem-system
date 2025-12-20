const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'gmvtctj1',
    api_key: '588937491721956',
    api_secret: '1-ZkjF9woLHgO88vC6lYD-fV9iI',
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'school_saas_data',
        resource_type: 'auto', // Isse Video aur PDF dono upload honge
    },
});

module.exports = { cloudinary, storage };