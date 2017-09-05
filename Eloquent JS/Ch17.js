// HTTP - Hypertext Transfer Protocol
/*
{FLASHBACK
  TCP - Transmission Control Protocol
        Server - Computer listening
        Client - Computer connecting
        Port - number related to a specific type of protocol (Web - port 80 - HTTP)
  URL - Uniform Resource Locator
      http://eloquentjavascript.net/12_browser.html
      |      |                      |               |
      protocol      server (IP)           path
}

Steps on sending a request to a website (aka What happens when you type an address and hit Enter in your browser?)
Browser tries to open a TCP connection to the server.
If success:
A 'request' (by the client) is sent to the server.        GET /17_http.html HTTP/1.1
  The request has a 'method' (GET, DELETE, PUT, POST)     Host: eloquentjavascript.net
                                                          User-Agent: Your browser's name
  The server response starts with   HTTP/1.1 200 OK
    Status starting with '2' means success. '4' means something wrong with the resquest (404)
      '5' means something wrong with the server (nothing wrong with the request)

'Query string' is a encoded format used by browser in the URL
'?' indicates the beginning of a query string and '&' separates the pairs 
  Ex: /website.html?what=todo&next=action
encondeURIComponent and decodeURIComponent are JS functions to work with that.


Sending a Request
  var req = new XMLHttpRequest()
  req.open('GET', 'example/data.txt, false)   (false - send returns only after response to request was recieved)
  req.send(null)
obj.responseTex  to read the response body
obj.statusText   to read the status
obj.getResponseHeader(xx)   to read the header
For a better reading and writting:  JSON.parse(obj.responseText)  










*From Youtube video. // Check for details and actual procedure later
DNS - Domain Name System
Browser asks the Operating System for the IP of that website's name. ( cache )
If they both can't resolve this:
OS asks (query) the Resolving Name Server. (It might resolve via cache aswell)
If not:
Root Name Server redirects to Top Level Domain (.com) which redirects to Authoratative Name
  Server (thanks to the Registrar - Registry, responsable to update the TLD with new purchased domain names)
  which gives the IP address to be used (server)
The Resolving Name Server replies to the OS which gives the IP to the browser which connect to that server