function renameId(doc) {
  const { _id, ...rest } = doc.toJSON();

  return { id: _id, ...rest };
}


module.exports = {
  renameId,
};
