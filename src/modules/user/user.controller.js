export const profile = async (req, res) => {
  return res.json({ msg: 'success', user: req.user });
};
