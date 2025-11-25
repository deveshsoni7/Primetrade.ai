const axios = require('axios');

const testRegistration = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test User',
            email: 'testuser' + Date.now() + '@example.com',
            password: 'password123'
        });
        console.log('Registration Success:', response.data);
    } catch (error) {
        console.error('Registration Failed:', error.response ? error.response.data : error.message);
    }
};

testRegistration();
