/*
Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

The function must accept a non-negative integer. If it is zero, it just returns "now". 
Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.

It is much easier to understand with an example:

  formatDuration(62)    // returns "1 minute and 2 seconds"
  formatDuration(3662)  // returns "1 hour, 1 minute and 2 seconds"
Note that spaces are important.

Detailed rules

The resulting expression is made of components like 4 seconds, 1 year, etc. 
In general, a positive integer and one of the valid units of time, separated by a space. 
The unit of time is used in plural if the integer is greater than 1.

The components are separated by a comma and a space (", "). Except the last component, which is separated by " and ", just like it would be written in English.

A more significant units of time will occur before than a least significant one. Therefore, 1 second and 1 year is not correct, but 1 year and 1 second is.

Different components have different unit of times. So there is not repeated units like in 5 seconds and 1 second.

A component will not appear at all if its value happens to be zero. Hence, 1 minute and 0 seconds is not valid, but it should be just 1 minute.

A unit of time must be used "as much as possible". It means that the function should not return 61 seconds, but 1 minute and 1 second instead. 
Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.

For the purpose of this Kata, a year is 365 days and a day is 24 hours.

*/



function formatDuration (seconds) {
  // Complete this function
  const timeS = ["year", "day", "hour", "minute", "second"];
  const time = [31536000, 86400 ,3600, 60, 1];
  var ans = [], and = "and", i = -1;
  if (!seconds) {return "now"} else {
    do {
      i++;
      var floor = Math.floor(seconds/time[i]);
      if (floor == 0) {continue} else
      if (floor > 1) {ans.push(`${floor} ${timeS[i]}s`)}
      else {ans.push(`${floor} ${timeS[i]}`)};
      seconds = seconds%time[i];
    } while (seconds > 0)
    if (ans.length > 1) {
      for (i=0; i<ans.length-2; i++) {ans[i] += ","}
      ans.splice(ans.length-1,0,and)}
    return ans.join(" ");
  }
}



formatDuration(1)
formatDuration(62)
formatDuration(120)
formatDuration(3600)
formatDuration(3662)
