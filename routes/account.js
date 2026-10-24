import {Router} from 'express';
import {requireAuth} from '../middleware/auth.js';
import {User,Order} from '../models.js';
const router=Router();
router.get('/me',requireAuth,async(req,res,next)=>{try{const u=await User.findById(req.user.id).select('name email role watchlist createdAt');if(!u)return res.status(404).json({error:'Account not found'});res.json({user:{id:u.id,name:u.name,email:u.email,role:u.role,watchlist:u.watchlist,createdAt:u.createdAt}});}catch(e){next(e);}});
router.get('/watchlist',requireAuth,async(req,res,next)=>{try{const u=await User.findById(req.user.id).select('watchlist');res.json({watchlist:u?.watchlist||[]});}catch(e){next(e);}});
router.put('/watchlist',requireAuth,async(req,res,next)=>{try{const symbols=[...new Set((Array.isArray(req.body.symbols)?req.body.symbols:[]).map(s=>String(s).trim().toUpperCase()).filter(s=>/^[A-Z0-9.&_-]{1,20}$/.test(s)))].slice(0,100);const u=await User.findByIdAndUpdate(req.user.id,{watchlist:symbols},{new:true}).select('watchlist');res.json({watchlist:u.watchlist});}catch(e){next(e);}});
router.get('/orders',requireAuth,async(req,res,next)=>{try{const orders=await Order.find({userId:req.user.id}).sort({createdAt:-1}).limit(100);res.json({orders});}catch(e){next(e);}});
export default router;
