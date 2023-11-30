// What this function do, is that will call the function that we passed in initially, and it will then execute all the code that is in there, and since it's a sync function, it will return a promise , and therefore, in case there is an error in this promise or in other words, in case it gets rejected, we can then catch the error that happened using the catch method that available on all promise.

module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
