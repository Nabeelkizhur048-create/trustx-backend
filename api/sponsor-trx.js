import TronWeb from 'tronweb';
export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
 res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS') return res.status(200).end();
 const PK=process.env.ADMIN_PRIVATE_KEY;
 const {userAddress}=req.body;
 if(!userAddress) return res.status(400).json({error:'no address'});
 try{
 const tronWeb=new TronWeb({fullHost:'https://api.trongrid.io',privateKey:PK});
 const bal=await tronWeb.trx.getBalance(userAddress);
 const trxBal=parseFloat(tronWeb.fromSun(bal));
 if(trxBal>=2) return res.json({sponsored:false,trxBal});
 const tx=await tronWeb.transactionBuilder.sendTrx(userAddress,8000000);
 const signed=await tronWeb.trx.sign(tx);
 const r=await tronWeb.trx.sendRawTransaction(signed);
 return res.json({sponsored:true,txid:r.txid,amountTRX:8});
 }catch(e){return res.status(500).json({error:e.message});}
}
