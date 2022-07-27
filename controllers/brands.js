const connection = require("../dbs/sqlconect");

const getAll = async (req, res) => {
  const conect = await connection();
  const [rows] = await conect.execute(
    "SELECT id, name, FLOOR(average_price) as average_price FROM brands"
  );
  res.send(rows);
};

const getModelsByBrandId = async (req, res) => {
  const brandId = req.params.id;
  const conect = await connection();
  const [brands] = await conect.execute(
    `SELECT id, name, FLOOR(average_price) as average_price FROM models WHERE brand_id = ${brandId}`
  );
  if (!brands.length) {
    res.status(422).send({
      msg: `The brand by id '${brandId}' not exists in our database.`,
    });
    return;
  }
  res.send(brands);
};

const storeBrand = async (req, res) => {
  const { name } = req.body;
  const conect = await connection();
  const [brands] = await conect.execute(
    `SELECT * FROM brands WHERE name = '${name}'`
  );
  if (brands.length) {
    res.status(422).send({
      msg: `The brand '${name}' exists in our database, the brands are unique.`,
    });
    return;
  }
  await conect.execute(`INSERT INTO brands (name) VALUES ('${name}')`);
  res.send({
    msg: `The brand '${name}' store!.`,
  });
};

const storeModel = async (req, res) => {
  const brandId = req.params.id;
  let { name, average_price } = req.body;
  if (!name) {
    res.status(422).send({
      msg: `The 'name' of model is required.`,
    });
    return;
  }

  const conect = await connection();
  const [brands] = await conect.execute(
    `SELECT id FROM brands WHERE id = ${brandId}`
  );
  if (!brands.length) {
    res.status(422).send({
      msg: `The brand by id '${brandId}' not exists in our database.`,
    });
    return;
  }

  const [models] = await conect.execute(
    `SELECT * FROM models WHERE brand_id = ${brandId} and name = '${name}'`
  );
  if (models.length) {
    res.status(422).send({
      msg: `The model '${name}' exists in our database for this brand.`,
    });
    return;
  }

  if (average_price && average_price < 100000) {
    res.status(422).send({
      msg: `The average price '${average_price}' is not more than 100,000.`,
    });
    return;
  }

  if (!average_price) {
    average_price = 0;
  }

  await conect.execute(
    `INSERT INTO models (brand_id, name, average_price) VALUES (${brandId}, '${name}', '${average_price}')`
  );
  res.send({
    msg: `The model '${name}' is store!.`,
  });
};

const brandsControllers = {
  getAll,
  getModelsByBrandId,
  storeBrand,
  storeModel,
};

module.exports = brandsControllers;

