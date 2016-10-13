# MultiHashMap

[![Build Status](https://travis-ci.org/dhavalpzala/multi-hashmap.svg?branch=master)](https://travis-ci.org/dhavalpzala/multi-hashmap)

[multi-hashmap](https://npmjs.org/package/multi-hashmap) package provides a linking between multiple hashmaps and gives a single entity. It gives fast searching mechanism as internally it uses hashmap and its similar to add indexing to database column for quick search.

##Getting Started

### Why to use

 - Provides faster search on data (similar to database indexing concept).
 - Easy to configure mapped and non mapped dimensions. So, Its internal memory space is optimized.
 - Alternative to browser local database table.

### Install

```
$ npm install --save multi-hashmap
```

### Constructors
- Define all the dimensions in the constructor.

 `new MultiHashMap(dimension1: string, dimension2: string, ...)`

- Define mapped and non mapped dimensions in the constructor (won't find on non mapped keys).

 `new MultiHashMap([mappedDim1: string, ...], [nonMappedDim1: string, ...])`

### Methods
- Insert the record

 `insert(value1: *, value2: *, ...) : void`
 
- Find the first record.

 `find(dimension: string, value: *) : Array`
 
- Find all the records

 `findAll(dimension: string, value: *) : Array<Array>`
 
- Get all the records.

 `getAll() : Array<Array>`
 
- Remove the record

 `remove(record: Array) : void`

### Usage
```js
var MultiHashMap = require('multi-hashmap').MultiHashMap;

var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
players.insert(3, 'Roger', 'Federer', 'tennis');
players.insert(4, 'Saina', 'Nehwal', 'badminton');

players.find('id', 2) // --> [2, 'Pusarla', 'Sindhu', 'badminton']
players.find('firstName', 'Sachin') // --> [1, 'Sachin', 'Tendulkar', 'cricket']
players.find('sport', 'badminton') // --> [2, 'Pusarla', 'Sindhu', 'badminton']
players.findAll('firstName', 'Sachin') // --> [[1, 'Sachin', 'Tendulkar', 'cricket']]
players.findAll('sport', 'badminton') // --> [[2, 'Pusarla', 'Sindhu', 'badminton'], [4, 'Saina', 'Nehwal', 'badminton']]

players.remove([3, 'Roger', 'Federer', 'tennis']);
players.remove([1, 'Sachin', 'Tendulkar', 'cricket']);

players.getAll() // --> [[2, 'Pusarla', 'Sindhu', 'badminton'], [4, 'Saina', 'Nehwal', 'badminton']]

players.find('id', 3) // --> null

```

```js
var MultiHashMap = require('multi-hashmap').MultiHashMap;

// id and firstName are mapped dimensions. lastName and sport are non mapped dimensions

var players = new MultiHashMap(['id', 'firstName'], ['lastName', 'sport']);
players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
players.insert(2, 'Pusarla', 'Sindhu', 'badminton');

players.find('id', 2) // --> [2, 'Pusarla', 'Sindhu', 'badminton']
players.find('firstName', 'Sachin') // --> [1, 'Sachin', 'Tendulkar', 'cricket']
players.find('sport', 'badminton') // --> Error: Invalid dimension
players.findAll('sport', 'badminton') // --> Error: Invalid dimension
```
### Benchmarks using benchmark.js
```
Benchmark: insert 1000 records (each has 10 columns)  x 129 ops/sec ±22.10% (34 runs sampled)
Benchmark: get all 1000 records (each has 10 columns) x 69,918,627 ops/sec ±3.33% (67 runs sampled)
Benchmark: find last record                           x 6,341,050 ops/sec ±2.99% (72 runs sampled)
Benchmark: find first record                          x 30,428,729 ops/sec ±1.42% (73 runs sampled)
Benchmark: find random record                         x 18,452,618 ops/sec ±3.35% (74 runs sampled)
Benchmark: remove random record                       x 12.11 ops/sec ±11.23% (34 runs sampled)
```
### Want to contribute
Check our [developer guide](DEVELOPMENT.md) to get started. PRs are very much welcome and appreciated.

If you would like to contribute, you can get in touch with me at dhaval.zala@live.com

### License

This project is available under [MIT License](LICENSE)
