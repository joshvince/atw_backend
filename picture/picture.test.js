jest.mock('../lib/db.js');
const Picture = require('./picture.js');

const PICTURESCHEMA = ["userId", "uuid", "url"].sort();

describe('#validate', () => {
  const goodParams = {userId: "1", uuid: "2", url: "http://example.com"}
  const badParams = {drop: "all tables", destroy: "mankind"}

  it('should reject pictures that do not match the schema', () => {
    const resp = Picture.validate(goodParams)
    expect(resp).toBeTruthy();
  });

  it('should accept pictures that match the schema', () => {
    const resp = Picture.validate(badParams)
    expect(resp).toBeFalsy();
  });
  
});


describe('#create', () => {
  const POSTDATA = {url: "12345", userId: "6789", uuid: "987654321"}
    
  it('should create a Picture with valid params', async () => {
    expect.assertions(2);

    const resp = await Picture.create(POSTDATA);
    const keys = Object.keys(resp.result).sort();

    expect(resp.success).toBeTruthy();
    expect(keys).toMatchObject(PICTURESCHEMA);
  });
  
});

