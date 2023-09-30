exports.update = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User updated",
  });
};

exports.delete = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User deleted",
  });
};
