var dataset = require('./dataset.json');
console.log('get started');

var bankBalances = dataset.bankBalances;

function round(){
  return Math.round(amt *100)/ 100;
}

function roundToCent(amt){
  return parseFloat(round(amt).toFixed(2));
}

function calcInterest(amt){
  return amt * 0.189;
}
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;

 hundredThousandairs = bankBalances.filter(function(balance){
  return balance.amount > 100000;
 });
 

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/

  // singular name passed into fuction is a good naming convention so balances an balance. etc

var datasetWithRoundedDollar = bankBalances.map(function(e){ 
    // console.log(parseInt(Math.round(e.amount)));
  return {
    "amount": e.amount,
    "state": e.state,
    "rounded": Math.round(e.amount)
  };
 });

// each bank object new object


// 'amount' and 'state' transfer to new object.

// this is new object ' ' amount rounded to nearest dollar.'

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
// console.log("start round to dime");

var datasetWithRoundedDime = bankBalances.map(function(e){ 
    // console.log(e);
  return {
    "amount": e.amount,
    "state": e.state,
    "roundedDime": Math.round(e.amount * 10)/ 10
  };
 });

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = bankBalances.reduce(function(sum, current){
  return sum + parseFloat(current.amount);
}, 0);

var sumOfBankBalances = parseFloat(sumOfBankBalances.toFixed(2));


  // from each of the following states:
  //   Wisconsin
  //   Illinois
  //   Wyoming
  //   Ohio
  //   Georgia
  //   Delaware
  // take each `amount` and add 18.9% interest to it rounded to the nearest cent
  // and then sum it all up into one value saved to `sumOfInterests`
 
console.log("initiate sum of interests");
// isolate states form obbj
// add interst to amount
// return sum of new amount 
 
var sumOfInterests = parseFloat(bankBalances.reduce(bumpDatInterest, 0).toFixed(2));

function bumpDatInterest(previous, current, index, array) {
 
 var searchArray = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
 var amount = 0;
 if (searchArray.includes(current.state)) {
  amount = parseFloat(((current.amount) * 0.189).toFixed(2));
 } 
 return previous + amount;
}
/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */

 console.log("StateSums");

// declare function and object to store the new array with the value keys of the object
var stateSums = bankBalances.reduce(collectStateSums, {});

// function to delcare and calculate the previous amount 
function collectStateSums(previous, current) {
  if (current.state in previous) {
    previous[current.state] += parseFloat(current.amount);
    previous[current.state] = Math.round(previous[current.state] * 100)/ 100;
  } else {
    previous[current.state] = parseFloat(current.amount);
  }
  return previous;
}

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it
  only sum values greater than 50,000 and save it to `sumOfInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */

 
  var sumOfHighInterests = null; //roundToCent(Object.key(stateSums))
  // .filter(function(state){
  //   return stateSubset.indexOf(state) > - 1;
  // })
  // .filter(function(state) {
  //   // body...
  //   return calcInterest(stateSums[state] > 50000;
    
  // });

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */

var stateSumsArray = Object.keys(stateSums)
.map(function (state){
  return {
    state: state,
    stateSum: stateSums[state]
  };
});

var lowerSumStates = stateSumsArray
.filter(function(state){
  return state.stateSum < 1000000;
})
.map(function(state){
  return state.state;
});

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = stateSumsArray.filter(function(state){
  // {}
  return state.stateSum > 1000000;
})
.reduce(function(sum, state){
  return sum += state.stateSum;
});

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = stateSumsArray
.filter(function(state){
  return stateSumsArray.includes(state.state);
})
.every(function(state){
  return state.stateSum > 2550000;
});


/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */

var anyStatesInHigherStateSum = null;

var areStatesInHigherStateSum = stateSumsArray
.filter(function(state){
  return stateSubset.includes(state.state);
})
.some(function(state){
  return state.stateSum > 2550000;
});


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
