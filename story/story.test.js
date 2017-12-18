jest.mock('../lib/db.js');
const Story = require('./story.js');

const STORYSCHEMA = ["userId", "uuid", "title", "subtitle", "steps"].sort();

const POSTDATA = {
  uuid: "12345",
  userId: "6789",
  title: "my cool title",
  subtitle: "my cool subtitle",
  steps: [
    {
      stepKey: 0,
      headline: "my headline",
      description: "a good description",
      image: {
        id: "98765",
        userId: "6789",
        url: "url!"
      }
    },
    {
      stepKey: 1,
      headline: "my headline",
      description: "a good description",
      image: {
        id: "98765",
        userId: "6789",
        url: "url!"
      }
    }
  ]
}

describe('#validate', () => {
  function generateParams(steps) {
    return {
      userId: "1", 
      uuid: "2", 
      title: "title",
      subtitle: "subtitle",
      steps: steps
    }
  }
  const goodStep = {headline: 1, description: 2, image: 3, stepKey: 4}
  const goodParams = generateParams([goodStep])
  const badParams = {drop: "all tables", destroy: "mankind"}

  it('should accept stories that match the schema', () => {
    const resp = Story.validate(goodParams)
    expect(resp).toBeTruthy();
  });

  it('should reject stories that do not match the schema', () => {
    const resp = Story.validate(badParams)
    expect(resp).toBeFalsy();
  });
  
});

describe('#createNewStory', () => {
  
  it('should create a story with valid attributes', async () => {
    expect.assertions(2);
    const resp = await Story.createNewStory(POSTDATA);
    const storyKeys = Object.keys(resp.result).sort();

    expect(resp.success).toBeTruthy();
    expect(storyKeys).toMatchObject(STORYSCHEMA);
  });
    
});
