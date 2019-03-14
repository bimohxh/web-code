module.exports = {
  get_index: async (req, res) => {
    res.send(req.query)
  }
}
