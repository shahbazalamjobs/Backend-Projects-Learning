import express from 'express';
import { loginUser, registerUser } from './controller/authController.js'
import { protect, authorizeRole } from './middlewares/authMiddleware.js'

const router = express.router();

router.post('/login', loginUser);
router.post('/register', registerUser);

router.get('/profile', protect, (req, res) => {
    res.json(req.user);
})

router.get('/admin', protect, authorizeRole('admin'), (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
})

export default router;