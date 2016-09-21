# MultiHashMap

[![Build Status](https://travis-ci.org/dhavalpzala/multi-hashmap.svg?branch=master)](https://travis-ci.org/dhavalpzala/multi-hashmap)

[multi-hashmap](https://npmjs.org/package/multi-hashmap) package provides a linking between multiple hashmaps and gives a single entity. It gives fast searching mechanism as internally it uses hashmap and its similar to add indexing to database column for quick search.

##Getting Started

### Why to use

 - Provides faster search on data (similar to database indexing concept).
 - Easy to configure mapped and non mapped dimensions. So, Its internal memory space is optimized.
 - Alternative to browser local database table.

### Installation

Using [npm](https://npmjs.org/package/multi-hashmap):

    $ npm install multi-hashmap

### Constructors
- `new MultiHashMap(dimension1: string, dimension2: string, ...)` Define the dimensions in the constructor.

- `new MultiHashMap([mappedDim1: string, mappedDim2: string, ...], [nonMappedDim1: string, nonMappedDim2: string, ...])`       Define the mapped and non mapped dimensions in the constructor. Non mapped dimensions are not valid for find method.

### Methods
- `insert(value1:*, value2:*, ...) : void` Insert the records
- `find(dimension: string, value: *) : any` Returns the first record associated with that dimension and value.
- `findAll(dimension: string, value: *) : []` Returns the all records associated with that dimension and value.
- `getAll : []` Returns all the records.

### Examples
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
```

```js
var MultiHashMap = require('multi-hashmap').MultiHashMap;

// id and firstName are mapped dimensions. lastName and sport are non mapped dimensions

var players = new MultiHashMap(['id', 'firstName'], ['lastName', 'sport']);
players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
players.insert(3, 'Roger', 'Federer', 'tennis');
players.insert(4, 'Saina', 'Nehwal', 'badminton');

players.find('id', 2) // --> [2, 'Pusarla', 'Sindhu', 'badminton']
players.find('firstName', 'Sachin') // --> [1, 'Sachin', 'Tendulkar', 'cricket']
players.find('sport', 'tennis') // --> Error: Invalid dimension
players.findAll('sport', 'tennis') // --> Error: Invalid dimension
```
### Wants to contribute

PRs are very much welcome and appreciated.

If you would like to contribute, you can get in touch with me at dhaval.zala@live.com
### License

```
Copyright 2016 Dhaval Zala <dhaval.zala@live.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
