/* TODO:
1.Create a matchmaing system based on the users in the tournament ladder 
(if not enough users for pairs, just give a random user a free win or a break this week)
2.Retreive match list of the first 5 ranked games (solo 5v5) after a certain point between a certain point.
*/

var startDate = new Date("May 12, 2017 00:00:00"); // Your timezone!
var startEpoch = startDate.getTime();
console.log(startEpoch);

var endDate = new Date("May 19, 2017 00:00:00"); // Your timezone!
var endEpoch = endDate.getTime();
console.log(endEpoch);