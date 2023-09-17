export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res).catch(error => {
      return res.status(500).json({ msg: "Catch Error", error: error.stack })
    })
  }
}