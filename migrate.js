const connection = require("./dbs/sqlconect");
const dbjson = require("./dbs/jsonconect");

const migrate = async () => {
  const data = dbjson.getData("/");
  const conect = await connection();

  // test connection
  try {
    await conect.execute("SELECT 1");
  } catch (error) {
    if (error) throw error;
  }

  //create and seeder brands table
  try {
    await conect.execute("DROP TABLE IF EXISTS `brands`");
    const brandsTable =
      "CREATE TABLE IF NOT EXISTS brands (`id` int(11) NOT NULL auto_increment, `name` varchar(100) NOT NULL default '', `average_price` decimal(12,2) NOT NULL default 0, PRIMARY KEY (`id`))";
    await conect.execute(brandsTable);

    const allBrands = data.map((dat) => dat.brand_name);
    const uniquesBrands = [...new Set(allBrands)];
    uniquesBrands.forEach(async (brand) => {
      const models = data.filter((dat) => dat.brand_name == brand);
      const average_price =
        models.reduce((carry, model) => carry + model.average_price, 0) /
        models.length;
      await conect.execute(
        `INSERT INTO brands (name, average_price) VALUES ('${brand}', ${average_price})`
      );
    });
  } catch (error) {
    if (error) throw error;
  }

  //create and seeder models table
  try {
    await conect.execute("DROP TABLE IF EXISTS `models`");
    const modelsTable =
      "CREATE TABLE IF NOT EXISTS `models` ( `id` int(11) NOT NULL auto_increment, `brand_id` int(11) NOT NULL, `name` varchar(100) NOT NULL default '', `average_price` decimal(12,2) NOT NULL default 0, PRIMARY KEY (`id`) )";
    await conect.execute(modelsTable);

    const [rows] = await conect.execute("SELECT * FROM brands");

    rows.forEach(async (brand) => {
      const models = data.filter((dat) => dat.brand_name == brand.name);
      models.forEach(async (model) => {
        await conect.execute(
          `INSERT INTO models (brand_id, name, average_price) VALUES (${brand.id}, '${model.name}', '${model.average_price}')`
        );
      });
    });
  } catch (error) {
    if (error) throw error;
  }
};

module.exports = migrate;
