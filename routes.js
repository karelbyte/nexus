const brandsControllers = require("./controllers/brands");
const modelsController = require('./controllers/models');

const routerManager = (app) => {
  app.group("/brands", (router) => {
    router.get("/", brandsControllers.getAll);
    router.get("/:id/models", brandsControllers.getModelsByBrandId);
    router.post("/:id/models", brandsControllers.storeModel);
    router.post("/", brandsControllers.storeBrand);
  });

  app.group("/models", (router) => {
    router.put("/:id", modelsController.updateModel);
    router.get("/", modelsController.getModelsByFilters);
  });
};

module.exports = routerManager;
