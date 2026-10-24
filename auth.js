import {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models.js';
const router=Router();
function tokenFor(user){return jwt.sign({id:String(user._id),email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});}
router.post('/register',async(req,res,next)=>{try{
 const name=String(req.body.name||'').trim(),email=String(req.body.email||'').trim().toLowerCase(),password=String(req.body.password||'');
 if(name.length<2)return res.status(400).json({error:'Name must contain at least 2 characters'});
 if(!/^\S+@\S+\.\S+$/.test(email))return res.status(400).json({error:'Enter a valid email address'});
 if(password.length<8)return res.status(400).json({error:'Password must be at least 8 characters'});
 if(!User.db.readyState)return res.status(503).json({error:'Database is not connected. Configure MONGODB_URI before creating accounts.'});
 if(await User.findOne({email}))return res.status(409).json({error:'An account with this email already exists'});
 const user=await User.create({name,email,passwordHash:await bcrypt.hash(password,12)});
 res.status(201).json({token:tokenFor(user),user:{id:user.id,name:user.name,email:user.email,role:user.role}});
 }catch(e){next(e);}});
router.post('/login',async(req,res,next)=>{try{
 const email=String(req.body.email||'').trim().toLowerCase(),password=String(req.body.password||'');
 if(!User.db.readyState)return res.status(503).json({error:'Database is not connected. Configure MONGODB_URI first.'});
 const user=await User.findOne({email});if(!user||!(await bcrypt.compare(password,user.passwordHash)))return res.status(401).json({error:'Invalid email or password'});
 res.json({token:tokenFor(user),user:{id:user.id,name:user.name,email:user.email,role:user.role}});
 }catch(e){next(e);}});
export default router;
