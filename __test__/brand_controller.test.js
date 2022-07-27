const brandsControllers = require ('../controllers/brands');

test("check method in brands controller", () => {
 
  expect(brandsControllers).toBeDefined();

  expect(brandsControllers.getAll).toBeDefined();

  expect(brandsControllers.getModelsByBrandId).toBeDefined();

  expect(brandsControllers.storeBrand).toBeDefined();

  expect(brandsControllers.storeModel).toBeDefined();


  expect(typeof brandsControllers.getAll).toBe('function');

  expect(typeof brandsControllers.getModelsByBrandId).toBe('function');

  expect(typeof brandsControllers.storeBrand).toBe('function');

  expect(typeof brandsControllers.storeModel).toBe('function');

});
