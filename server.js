import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Admin Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const mailOptions = {
        from: '"SMEC Global Innovators Conclave" <' + process.env.EMAIL_USER + '>',
        to: email, // Send to the user who subscribed
        subject: 'Welcome to the SMEC Global Innovators Conclave!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h1 style="color: #d4a853;">Thank You for Subscribing!</h1>
                <p>Dear Innovator,</p>
                <p>We are thrilled to have you interested in the <strong>SMEC Global Innovators Conclave 2026</strong>.</p>
                <p>Attached to this email, please find the event brochure containing all the details about the sessions, speakers, and agenda.</p>
                <p><strong>Date:</strong> Feb 27-28, 2026<br>
                <strong>Location:</strong> Hyderabad, India</p>
                <p>We look forward to seeing you there!</p>
                <br>
                <p>Best Regards,<br>
                The SMEC Conclave Team</p>
                <hr>
                <small>You received this email because you subscribed on our website.</small>
            </div>
        `,
        attachments: [
            {
                filename: 'SMEC_Conclave_Brochure.pdf',
                path: path.join(__dirname, 'public', 'brochure.pdf'), // Ensure this file exists
                contentType: 'application/pdf'
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', email);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Registration endpoint with Supabase
app.post('/register', async (req, res) => {
    const { fullName, phoneNumber, email, password, gender, dateOfBirth, country, state, pincode, profession, collegeName, companyName } = req.body;

    // Validation
    if (!fullName || !phoneNumber || !email || !password || !gender || !dateOfBirth || !country || !state || !pincode || !profession) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    if (profession === 'student' && !collegeName) {
        return res.status(400).json({ error: 'College name is required for students' });
    }

    if (profession === 'professional' && !companyName) {
        return res.status(400).json({ error: 'Company name is required for professionals' });
    }

    try {
        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true, // Set to true to require email verification
            user_metadata: {
                full_name: fullName
            }
        });

        if (authError) {
            console.error('Supabase auth error:', authError);
            if (authError.message.includes('already registered')) {
                return res.status(400).json({ error: 'Email already registered' });
            }
            return res.status(400).json({ error: authError.message });
        }

        // Insert user profile data
        const { error: profileError } = await supabaseAdmin
            .from('user_profiles')
            .insert({
                id: authData.user.id,
                full_name: fullName,
                phone: phoneNumber,
                email: email,
                gender: gender,
                date_of_birth: dateOfBirth,
                profession: profession,
                college_name: profession === 'student' ? collegeName : null,
                company_name: profession === 'professional' ? companyName : null,
                country: country,
                state: state,
                pincode: pincode
            });

        if (profileError) {
            console.error('Profile creation error:', profileError);
            // Delete the auth user if profile creation fails
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            return res.status(500).json({ error: 'Failed to create user profile' });
        }

        console.log('Registration successful:', email);
        res.status(200).json({
            message: 'Registration successful! Please check your email to verify your account.',
            requiresEmailVerification: false
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login endpoint with Supabase
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Login error:', error);
            if (error.message.includes('Email not confirmed')) {
                return res.status(401).json({
                    error: 'Please verify your email before logging in',
                    requiresEmailVerification: true
                });
            }
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Get user profile
        const { data: profileData, error: profileError } = await supabaseAdmin
            .from('user_profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError) {
            console.error('Profile fetch error:', profileError);
        }

        console.log('Login successful:', email);
        res.status(200).json({
            message: 'Login successful',
            session: data.session,
            user: profileData || { email: data.user.email }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Logout endpoint
app.post('/logout', async (req, res) => {
    const { accessToken } = req.body;

    try {
        const { error } = await supabaseAdmin.auth.admin.signOut(accessToken);

        if (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ error: 'Logout failed' });
        }

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
});

// Password reset request endpoint
app.post('/reset-password-request', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/reset-password'
        });

        if (error) {
            console.error('Password reset request error:', error);
            return res.status(500).json({ error: 'Failed to send reset email' });
        }

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error during password reset request:', error);
        res.status(500).json({ error: 'Failed to send reset email' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
