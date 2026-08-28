import TronWeb from 'tronweb';

export default async function handler(req, res) {
  // CORS Allow ചെയ്യുന്നു - നിന്റെ Frontend-ന് വേണ്ടി
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io'
    });

    // Real TRC20 Wallet Generate!
    const account = await tronWeb.createAccount();
    
    return res.status(200).json({
      success: true,
      status: "TrustX Backend Running!",
      wallet: {
        address: account.address.base58,
        privateKey: account.privateKey,
        note: "ഇത് Real TRC20 Address ആണ്! Binance-ൽ നിന്ന് USDT TRC20 അയക്കാം!"
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
