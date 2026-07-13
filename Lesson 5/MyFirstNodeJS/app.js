const http = require('http');

const server = http.createServer((req, res) => {
    //res.end('Hello, World!\n');
    res.write('<h1> Welcome to Reynald\'s first nodeJS page!!! </h1>')
    res.write ('<b> Name:</b> Reynald Quek<br>')
    res.write ('<b> School:</b> Retarded Polytechnic<br>')
    res.write ('<b> Diploma:</b> Diploma in Cyber Secuity<br>');
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});