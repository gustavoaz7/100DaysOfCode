// NODE
/*
Pathnames:
  './' - Current directory
  '..'/ - One directory up
  '/' - Root of the file system
*/



// Content negotiation, again
/*
In Chapter 17, the first exercise was to make several requests to eloquentjavascript.net/author, 
asking for different types of content by passing different Accept headers.
Do this again, using Node’s http.request function. Ask for at least the media types text/plain, 
text/html, and application/json. Remember that headers to a request can be given as an object, 
in the headers property of http.request’s first argument.
Write out the content of the responses to each request.
*/
const http = require('http');
function readStream(stream, cb) {
  let content = '';
  stream.on('data', (body) => content += body);
  stream.on('end', () => cb(null, content));
}

const types = ['text/plain', 'text/html', 'application/json'];
types.forEach(type => {
  http.request({
    hostname: 'eloquentjavascript.net',
    parth: '/author',
    headers: {Accept: type}
  }, response => {
    if (response.statusCode != 200) {
      console.log(`Fail on request for ${type}: ${response.statusMessage}`);
      return;
    }
    readStream(response, (content) => console.log(`Type ${type}: ${content}`))
  }).end();
});




// Fixing a leak
/*
For easy remote access to some files, I might get into the habit of having the file server defined in this 
chapter running on my machine, in the /home/marijn/public directory. 
Then, one day, I find that someone has gained access to all the passwords I stored in my browser.
What happened?
If it isn’t clear to you yet, think back to the urlToPath function, defined like this:
    function urlToPath(url) {
      var path = require("url").parse(url).pathname;
      return "." + decodeURIComponent(path);
    }
Now consider the fact that paths passed to the "fs" functions can be relative—they may contain "../" to go 
up a directory. What happens when a client sends requests to URLs like the ones shown here?
    http://myhostname:8000/../.config/config/google-chrome/Default/Web%20Data
    http://myhostname:8000/../.ssh/id_dsa
    http://myhostname:8000/../../../etc/passwd
Change urlToPath to fix this problem. Take into account the fact that Node on Windows allows both forward 
slashes and backslashes to separate directories.
Also, meditate on the fact that as soon as you expose some half-baked system on the Internet, 
the bugs in that system might be used to do bad things to your machine.
*/
function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  let decoded = `.${decodeURIComponent(path)}`;
  while (decoded.includes('..')) {decoded = decoded.replace(/(\/|\\)\.\.(\/|\\|$)/, '/')}
  return decoded;
};




// Creating directories
/*
Though the DELETE method is wired up to delete directories (using fs.rmdir), the file server currently 
does not provide any way to create a directory.
Add support for a method MKCOL, which should create a directory by calling fs.mkdir. 
MKCOL is not one of the basic HTTP methods, but it does exist, for this same purpose, 
in the WebDAV standard, which specifies a set of extensions to HTTP, 
making it suitable for writing resources, not just reading them.
*/
methods.MKCOL = (path, respond) => {
  fs.stat(path, (error, stats) => {
    if (error && error.code == "ENOENT") fs.mkdir(path, respondErrorOrNothing(respond))
    else if (error) respond(500, error.toString())
    else if (stats.isDirectory()) respond(204)
    else respond(400, "File exists");
  })
}
