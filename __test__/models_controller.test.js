const modelsControllers = require ('../controllers/models');

test("check method in models controller", () => {
 
  expect(modelsControllers).toBeDefined();

  expect(modelsControllers.updateModel).toBeDefined();

  expect(modelsControllers.getModelsByFilters).toBeDefined();


  expect(typeof modelsControllers.updateModel).toBe('function');

  expect(typeof modelsControllers.getModelsByFilters).toBe('function');

});

