const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
app.use(cors());

const APP_ID = process.env.APP_ID || 'TU_APP_ID';
const APP_CERT = process.env.APP_CERT || 'TU_APP_CERT';

app.get('/token', (req, res) => {
  const channel = req.query.channel;
  const uid = parseInt(req.query.uid || '0');
  if (!channel) return res.json({ error: 'falta channel' });

  const expire = 3600;
  const now = Math.floor(Date.now() / 1000);
  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERT, channel, uid, RtcRole.PUBLISHER, now + expire);
  res.json({ token, appId: APP_ID, channel, uid });
});

app.get('/', (req, res) => res.send('RDC token server OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server en ' + PORT));
