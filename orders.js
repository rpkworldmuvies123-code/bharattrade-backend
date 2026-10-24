import {Router} from 'express';
import {requireAuth} from '../middleware/auth.js';
import {Order} from '../models.js';
import {getQuote} from '../services/marketData.js';
const router=Router();
router.post('/paper',requireAuth,async(req,res,next)=>{try{
 const symbol=String(req.body.symbol||'').trim().toUpperCase(),side=String(req.body.side||'').toUpperCase(),quantity=Number(req.body.quantity);
 if(!/^[A-Z0-9.&_-]{1,20}$/.test(symbol))return res.status(400).json({error:'Invalid stock symbol'});
 if(!['BUY','SELL'].includes(side))return res.status(400).json({error:'Side must be BUY or SELL'});
 if(!Number.isSafeInteger(quantity)||quantity<1||quantity>1000000)return res.status(400).json({error:'Quantity must be a positive whole number'});
 const quote=await getQuote(symbol);if(!quote)return res.status(404).json({error:'No quote found for this symbol in the current demo dataset'});
 const order=await Order.create({userId:req.user.id,symbol,side,quantity,price:quote.price,mode:'paper',status:'PAPER_FILLED'});
 res.status(201).json({order,notice:'Paper order recorded only. No real broker order was sent.'});
 }catch(e){next(e);}});
router.post('/live',requireAuth,(_req,res)=>res.status(501).json({error:'Live trading is not enabled.',message:'A supported broker integration, credentials, account authorization, order validation, and compliance review are required. This endpoint deliberately does not place live orders.'}));
export default router;
