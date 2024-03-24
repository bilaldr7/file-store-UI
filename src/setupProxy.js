const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8180',
      // target: 'http://darouich.miage23.jayblanc.fr',
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        console.log(req.method + " " + req.url);
        // req.method === 'OPTIONS' && proxyRes.statusCode === 302
        if (req.method === 'OPTIONS' && proxyRes.statusCode === 302) {
          res.writeHead(200, proxyRes.headers);
          res.end();
        }
      }
    })
  );
};
