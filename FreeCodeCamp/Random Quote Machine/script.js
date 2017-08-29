
var quoteMsge = $('#generator')
var quoteStyle = document.querySelectorAll('.fa-quote-left');

$(document).ready(function() {
  quoteMsge.click(function () {
    $.ajax({
			url: "https://api.forismatic.com/api/1.0/",
			jsonp: "jsonp",
			dataType: "jsonp",
			data: {
				method: "getQuote",
				lang: "en",
				format: "jsonp"
			},
			success: function(quote) {
				$("#quote").text(quote.quoteText);
				$("#author").text(quote.quoteAuthor || 'Anonymmous');
				var tweet = quote.quoteText+"\nBy: "+ (quote.quoteAuthor || 'Anonymous');
				$('#twitter').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet));       
				if (tweet.length > 140) $('#twitter').click((e) => {
					alert('Tweet is not possible. This quote is over 140 characters.'); 
					e.preventDefault()
				});
        quoteStyle.forEach(x => x.style.visibility = 'visible')
			}
    });
  });
});

