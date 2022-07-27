const { existsSync } = require('fs');

const path = '../dbs/models.json'

test("check if file models.json exist ", () => {
  const found = existsSync(path)
  expect(true).toBe(found);
});
