var Benchmark = require('benchmark');
var MultiHashMap = require('../multi-hashmap').MultiHashMap;
var mockData = require('./mock-data');

var suite = new Benchmark.Suite;

// create columns
var columns = [];
for (var key in mockData[0]) {
  columns.push(key);
}

var multiHashMap = new MultiHashMap(columns);

// test variables
var firstColumn = columns[0],
  lastColumn = columns[columns.length - 1],
  randomColumn = columns[Math.floor(Math.random() * columns.length)],
  firstValue = mockData[0][firstColumn],
  lastValue = mockData[mockData.length - 1][lastColumn],
  randomValue = mockData[Math.floor(Math.random() * mockData.length)][randomColumn];

// add tests
suite.add('insert ' + mockData.length + ' records (each has '+ columns.length +' columns)', function() {
    mockData.forEach( function(item) {
      var values = [];
      for (var key in item) {
        values.push(item[key]);
      }
      multiHashMap.insert.apply(multiHashMap, values);
    });
  })
  .add('get all ' + mockData.length + ' records (each has '+ columns.length +' columns)', function() {
    multiHashMap.getAll();
  })
  .add('find last record', function() {
    multiHashMap.find(lastColumn, lastValue);
  })
  .add('find first record', function() {
    multiHashMap.find(firstColumn, firstValue);
  })
  .add('find random record', function() {
    multiHashMap.find(randomColumn, randomValue);
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  // run async
  .run({ 'async': true });
