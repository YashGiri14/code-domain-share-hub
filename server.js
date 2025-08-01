const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Your 2Factor API configuration
const API_CONFIG = {
    baseURL: 'https://2factor.in/API/V1',
    apiKey: 'e4ab37d4-6eba-11f0-a562-0200cd936042',
    phoneNumber: '8251048284',
    template: 'OTPTemplate'
};

// Send OTP (SMS with voice fallback handled by 2Factor)
app.post('/send-otp', async (req, res) => {
    try {
        const url = `${API_CONFIG.baseURL}/${API_CONFIG.apiKey}/SMS/${API_CONFIG.phoneNumber}/AUTOGEN2/${API_CONFIG.template}`;
        
        console.log('Sending OTP to:', API_CONFIG.phoneNumber);
        console.log('API URL:', url);
        
        const response = await axios.get(url);
        
        console.log('OTP API Response:', response.data);
        
        res.json({
            success: true,
            message: 'OTP sent successfully (SMS with voice fallback)',
            data: response.data
        });
        
    } catch (error) {
        console.error('Error sending OTP:', error.response?.data || error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
            error: error.response?.data || error.message
        });
    }
});

// Verify OTP
app.post('/verify-otp', async (req, res) => {
    try {
        const { sessionId, otp } = req.body;
        
        if (!sessionId || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Session ID and OTP are required'
            });
        }
        
        const url = `${API_CONFIG.baseURL}/${API_CONFIG.apiKey}/VOICE/VERIFY/${sessionId}/${otp}`;
        
        console.log('Verifying OTP for session:', sessionId);
        
        const response = await axios.get(url);
        
        console.log('OTP Verification Response:', response.data);
        
        res.json({
            success: true,
            message: 'OTP verified successfully',
            data: response.data
        });
        
    } catch (error) {
        console.error('Error verifying OTP:', error.response?.data || error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP',
            error: error.response?.data || error.message
        });
    }
});

// Auto-send OTP on server start (as requested)
app.get('/auto-send-otp', async (req, res) => {
    try {
        const url = `${API_CONFIG.baseURL}/${API_CONFIG.apiKey}/SMS/${API_CONFIG.phoneNumber}/AUTOGEN2/${API_CONFIG.template}`;
        
        console.log('Auto-sending OTP on server request...');
        
        const response = await axios.get(url);
        
        console.log('Auto OTP Response:', response.data);
        
        res.json({
            success: true,
            message: 'OTP sent automatically (SMS with voice fallback)',
            data: response.data
        });
        
    } catch (error) {
        console.error('Error in auto OTP:', error.response?.data || error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send auto OTP',
            error: error.response?.data || error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'OTP Server is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 OTP Server is running on port ${PORT}`);
    console.log(`📱 Configured for phone number: ${API_CONFIG.phoneNumber}`);
    console.log(`🔗 Available endpoints:`);
    console.log(`   - POST /send-otp - Send OTP (SMS with voice fallback)`);
    console.log(`   - POST /verify-otp - Verify OTP`);
    console.log(`   - GET /auto-send-otp - Auto send OTP`);
    console.log(`   - GET /health - Health check`);
    
    // Auto-send OTP when server starts (uncomment if needed)
    // setTimeout(async () => {
    //     try {
    //         const url = `${API_CONFIG.baseURL}/${API_CONFIG.apiKey}/SMS/${API_CONFIG.phoneNumber}/AUTOGEN2/${API_CONFIG.template}`;
    //         const response = await axios.get(url);
    //         console.log('🎯 Auto OTP sent on startup:', response.data);
    //     } catch (error) {
    //         console.error('❌ Failed to auto-send OTP on startup:', error.message);
    //     }
    // }, 2000);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Server shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Server interrupted, shutting down...');
    process.exit(0);
});