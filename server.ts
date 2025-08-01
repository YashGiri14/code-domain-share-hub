
import express from 'express';
import axios from 'axios';
import cors from 'cors';

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

interface SendOTPRequest {
    mobile: string;
}

interface VerifyOTPRequest {
    sessionId: string;
    otp: string;
}

interface APIResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
}

// Send OTP (Force SMS delivery)
app.post('/send-otp', async (req: express.Request<{}, APIResponse, SendOTPRequest>, res: express.Response<APIResponse>) => {
    try {
        const { mobile } = req.body;
        
        if (!mobile) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number is required'
            });
        }
        
        // Extract just the 10-digit number from mobile (remove +91 prefix if present)
        const cleanMobile = mobile.replace(/^\+91/, '').replace(/\D/g, '');
        
        if (cleanMobile.length !== 10) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid 10-digit mobile number'
            });
        }
        
        // Use AUTOGEN (without the 2) to force SMS during activation period
        // This endpoint specifically sends SMS even during the 24-hour activation period
        const url = `${API_CONFIG.baseURL}/${API_CONFIG.apiKey}/SMS/${cleanMobile}/AUTOGEN/${API_CONFIG.template}`;
        
        console.log('Sending OTP via SMS to:', cleanMobile);
        console.log('API URL:', url);
        
        const response = await axios.get(url);
        
        console.log('OTP API Response:', response.data);
        
        res.json({
            success: true,
            message: 'OTP sent successfully via SMS',
            data: response.data
        });
        
    } catch (error: any) {
        console.error('Error sending OTP:', error.response?.data || error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
            error: error.response?.data || error.message
        });
    }
});

// Verify OTP
app.post('/verify-otp', async (req: express.Request<{}, APIResponse, VerifyOTPRequest>, res: express.Response<APIResponse>) => {
    try {
        const { sessionId, otp } = req.body;
        
        if (!sessionId || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Session ID and OTP are required'
            });
        }
        
        const url = `${API_CONFIG.baseURL}/${API_CONFIG.apiKey}/SMS/VERIFY/${sessionId}/${otp}`;
        
        console.log('Verifying OTP for session:', sessionId);
        
        const response = await axios.get(url);
        
        console.log('OTP Verification Response:', response.data);
        
        res.json({
            success: true,
            message: 'OTP verified successfully',
            data: response.data
        });
        
    } catch (error: any) {
        console.error('Error verifying OTP:', error.response?.data || error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP',
            error: error.response?.data || error.message
        });
    }
});

// Auto-send OTP on server request (Force SMS)
app.get('/auto-send-otp', async (req: express.Request, res: express.Response<APIResponse>) => {
    try {
        // Use AUTOGEN (without the 2) to force SMS during activation period
        const url = `${API_CONFIG.baseURL}/${API_CONFIG.apiKey}/SMS/${API_CONFIG.phoneNumber}/AUTOGEN/${API_CONFIG.template}`;
        
        console.log('Auto-sending OTP via SMS...');
        
        const response = await axios.get(url);
        
        console.log('Auto OTP Response:', response.data);
        
        res.json({
            success: true,
            message: 'OTP sent automatically via SMS',
            data: response.data
        });
        
    } catch (error: any) {
        console.error('Error in auto OTP:', error.response?.data || error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send auto OTP',
            error: error.response?.data || error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response<APIResponse>) => {
    res.json({
        success: true,
        message: 'OTP Server is running',
        data: {
            timestamp: new Date().toISOString(),
            nodeVersion: process.version
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 OTP Server is running on port ${PORT}`);
    console.log(`📱 Configured for phone number: ${API_CONFIG.phoneNumber}`);
    console.log(`🔗 Available endpoints:`);
    console.log(`   - POST /send-otp - Send OTP via SMS (forced)`);
    console.log(`   - POST /verify-otp - Verify OTP`);
    console.log(`   - GET /auto-send-otp - Auto send OTP via SMS`);
    console.log(`   - GET /health - Health check`);
    console.log(`📝 Using AUTOGEN endpoint to force SMS delivery during activation period`);
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
