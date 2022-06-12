const ExpressError = require("../express-routing-solution/expressError");


function defaultFunc(req, res, operation) {
  if (!req.query.nums) {
    throw new ExpressError("Please pass a query of comma-separated numbers")
  }
    let numsAsString = req.query.nums.split(',');
    let nums = convertQueryType(numsAsString)
    let returnVal
    switch(operation) {
      case "mode":
        returnVal = mode(nums)
        break;
      case "median":
        returnVal = median(nums)
        break;
      case "mean":
          returnVal = mean(nums)
          break;
    }

    let result = {
        operation: operation,
        result: returnVal
      }
    
      return res.send(result);
}

function convertQueryType(arr) {
  let newArr = [];
    for (num of arr) {
        if (isNaN(num)) {
          throw new ExpressError("Query must contain only numbers");
        }
        else {
          newArr.push(parseInt(num));
        }
    }
    return newArr
}

function mean(arr) {
    sum = arr.reduce((a,b) => a + b, 0 )
    return (sum/arr.length);
}

function median(arr) {
    let middeIndex = Math.floor(arr.length / 2)
    nums = arr.sort((a, b) => a - b)
    return arr.length % 2 !== 0 ? nums[middeIndex] : (nums[middeIndex - 1] + nums[middeIndex]) / 2
}

function mode(arr) {
    const mode = {}
    let max = 0
    let count = 0
  
    for(let i = 0; i < arr.length; i++) {
      const num = arr[i]
      
      if(mode[num]) {
        mode[num]++
      } else {
        mode[num] = 1
      }
      
      if(count < mode[num]) {
        max = num
        count = mode[num]
      } else if (count == 1) {
        max = "There is no mode"
      }
    }
     
    return max
}


module.exports = {
  defaultFunc
};