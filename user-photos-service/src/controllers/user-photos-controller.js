const catchAsync = require("../utils/catchAsync");

exports.getUserPhotos = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "hello world",
  });
});
