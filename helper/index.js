exports.commonResponse = (res, status = 200, message, data, success = true) => {
  res.status(status).json({
    success,
    message,
    data,
  });
};
