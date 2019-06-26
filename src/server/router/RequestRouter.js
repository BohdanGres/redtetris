import fs  from 'fs';
import debug from 'debug';

const logerror = debug('tetris:error');

export default function initRequestRouter(req, res) {
  // if (req.url == 'test')
  const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
  fs.readFile(__dirname + file, (err, data) => {
    if (err) {
      logerror(err);
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200)
    res.end(data)
  })
}
