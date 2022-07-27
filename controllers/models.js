const connection = require("../dbs/sqlconect");

const updateModel = async (req, res) => {
  const conect = await connection();
  const modelId = req.params.id;
  let { average_price } = req.body;
  if (!average_price) {
    res.status(422).send({
      msg: `The 'average price' of model is required.`,
    });
    return;
  }
  if (average_price < 100000) {
    res.status(422).send({
      msg: `The average price '${average_price}' is not more than 100,000.`,
    });
    return;
  }

  const [models] = await conect.execute(
    `SELECT id FROM models WHERE id = ${modelId}`
  );
  if (!models.length) {
    res.status(422).send({
      msg: `The model '${modelId}' not exists in our database.`,
    });
    return;
  }

  await conect.execute(
    `UPDATE models SET average_price = ${average_price} WHERE id = ${modelId}`
  );

  res.send({
    msg: `The model '${modelId}' was updated.`,
  });
};

const getModelsByFilters = async (req, res) => {
  const greater = req.query.greater;
  const lower = req.query.lower;
  const conect = await connection();
  let query = `SELECT id, name, FLOOR(average_price) as average_price FROM models`;
  if (greater && !lower) {
    query += ` WHERE average_price >= ${greater}`;
  }
  if (!greater && lower) {
    query += ` WHERE average_price <= ${lower}`;
  }

  if (greater && lower) {
    query += ` WHERE average_price >= ${greater} AND average_price <= ${lower}`;
  }
  const [models] = await conect.execute(query);
  res.send(models);
};

const modelsController = {
  updateModel,
  getModelsByFilters,
};

module.exports = modelsController;
