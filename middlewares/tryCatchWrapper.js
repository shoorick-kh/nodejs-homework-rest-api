function tryCatchWrapper(endPointFunc) {
  return async (req, res, next) => {
    try {
      await endPointFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  tryCatchWrapper,
};
