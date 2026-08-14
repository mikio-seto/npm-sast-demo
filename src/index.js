// Entry point — wires vulnerable routes so taint sources reach sinks.
const express = require('express');

const app = express();
app.use(express.json());

app.use('/sql',     require('./sql-injection'));
app.use('/cmd',     require('./command-injection'));
app.use('/xss',     require('./xss'));
app.use('/lfi',     require('./path-traversal'));
app.use('/ssrf',    require('./ssrf'));
app.use('/code',    require('./code-injection'));
app.use('/nosql',   require('./nosql-injection'));
app.use('/redir',   require('./open-redirect'));
app.use('/proto',   require('./prototype-pollution'));
app.use('/redos',   require('./regex-dos'));

app.get('/', (req, res) => res.send('npm SAST test project'));

app.listen(3000, () => console.log('http://localhost:3000'));
