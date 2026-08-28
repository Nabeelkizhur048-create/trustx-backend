import TronWeb from 'tronweb';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const tronWeb = new TronWeb({ fullHost: 'https://api.trongrid.io' });
    const account = await tronWeb.createAccount();
    
    console.log("NEW WALLET CREATED:", account.address.base58);

    return res.status(200).json({
      success: true,
      address: account.address.base58,
      network: "TRC20",
      message: "Real Wallet Ready!"
    });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
}
