import rek from './rekcontroller';

describe('rekcontroller test suite', () => {
  test('"hide the pain Harold" is tagged correctly', done => {
    const params = {
      Image: {
        S3Object: {
          Bucket: 'pdie-unit-test',
          Name: '8a9.png'
        }
      }
    };

    rek.detectLabels(params, (err, data) => {
      const testNames = [
        'People',
        'Person',
        'Human',
        'Computer',
        'Electronics',
        'LCD Screen',
        'Laptop',
        'Pc',
        'Senior Citizen',
        'Worker',
      ];

      const names = [];
      data.Labels.forEach(({ Confidence, Name }) => {
        names.push(Name);
      });

      expect(testNames).toEqual(names);
      done();
    });
  });
});
