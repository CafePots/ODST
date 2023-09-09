const path = require('path');
const fs = require('fs/promises');


async function store(req, res) {
  await fs.rename(req.file.path, `${req.file.destination}/${req.file.originalname}`);

  const extension = path.extname(req.file.originalname);

  res.json({
    extension,
    name: req.file.originalname.replace(extension, ''),
    path: `${req.file.destination}/${req.file.originalname}`,
    src: `uploads/${req.file.originalname}`,
  });
}


module.exports = {
  store,
};
