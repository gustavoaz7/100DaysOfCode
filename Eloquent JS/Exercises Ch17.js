// Content negotiation
/*
One of the things that HTTP can do, but that we have not discussed in this chapter, is called content negotiation.
The Accept header for a request can be used to tell the server what type of document the client would like to get.
Many servers ignore this header, but when a server knows of various ways to encode a resource, 
it can look at this header and send the one that the client prefers.
The URL eloquentjavascript.net/author is configured to respond with either plaintext, HTML, or JSON, 
depending on what the client asks for. These formats are identified by the standardized media types text/plain,
text/html, and application/json.
Send requests to fetch all three formats of this resource. Use the setRequestHeader method of your 
XMLHttpRequest object to set the header named Accept to one of the media types given earlier. 
Make sure you set the header after calling open but before calling send.
Finally, try asking for the media type application/rainbows+unicorns and see what happens.
*/
// Your code here.
function request(type) {
  let req = new XMLHttpRequest();
  req.open('GET', 'http://eloquentjavascript.net/author', false);
  req.setRequestHeader('Accept', type);
  req.send(null);
  return req.responseText;
}

let type = ['text/plain', 'text/html', 'application/json', 'application/rainbows+unicorns'];

type.forEach(type => {
  console.log(request(type));
});




// Waiting for multiple promises
/*
The Promise constructor has an all method that, given an array of promises, returns a promise that waits 
for all of the promises in the array to finish. It then succeeds, yielding an array of result values. 
If any of the promises in the array fail, the promise returned by all fails too (with the failure 
value from the failing promise).
Try to implement something like this yourself as a regular function called all.
Note that after a promise is resolved (has succeeded or failed), it can’t succeed or fail again, 
and further calls to the functions that resolve it are ignored. 
This can simplify the way you handle failure of your promise.
*/
function all(promises) {
  return new Promise(function(success, fail) {
    // Your code here
    let data = [], left = promises.length;
    if (left > 0) {
    	promises.forEach((promise, i) => {
        promise.then(response => {
        	data[i] = response;
          left--;
          if (!left) success(data);
        }, err => fail(err))
      })
    } else success(data)
  });
}