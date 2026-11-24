const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
app.use(cors());

const APP_ID = process.env.AGORA_APP_ID;
const APP_CERT = process.env.AGORA_APP_CERT;
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('RDC token server OK');
});

app.get('/token', (req, res) => {
  const channel = req.query.channel;
  const uid = parseInt(req.query.uid || '0', 10);
  if (!channel) return res.status(400).json({ error: 'missing channel' });

  const expire = Math.floor(Date.now() / 1000) + 3600;
  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERT, channel, uid, RtcRole.PUBLISHER, expire);
  res.json({ token, uid, channel, appId: APP_ID });
});

app.listen(PORT, () => console.log('Server en ' + PORT));
