# MultiHashMap

[multi-hashmap](https://npmjs.org/package/multi-hashmap) package provides a linking between multiple hashmaps and gives a single entity.

##Getting Started

### Installation

Using [npm](https://npmjs.org/package/multi-hashmap):

    $ npm install multi-hashmap

### Constructor
- `new MultiHashMap(dimension1: string, dimension2: string, ...)` Define the dimensions in the constructor.
   
- `new MultiHashMap([mappedDim1: string, mappedDim2: string, ...], [nonMappedDim1: string, nonMappedDim2: string, ...])`       Define the mapped and non mapped dimensions in the constructor. Non mapped dimensions are not valid for find method.

### Methods
- `insert(value1:*, value2:*, ...) : void` Insert the records
- `find(dimension: string, value: *) : []` Returns the records associated with that dimension and value.
- `getRecords : []` Returns all the records.

### Example
```js
var MultiHashMap = require('multi-hashmap').MultiHashMap;

var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
players.insert(3, 'Roger', 'Federer', 'tennis');

players.find('id', 2) // --> [2, 'Pusarla', 'Sindhu', 'badminton']
players.find('firstName', 'Sachin') // --> [1, 'Sachin', 'Tendulkar', 'cricket']
players.find('sport', 'tennis') // --> [3, 'Roger', 'Federer', 'tennis']
```

```js
var MultiHashMap = require('multi-hashmap').MultiHashMap;

// id and firstName are mapped dimensions. lastName and sport are non mapped dimensions

var players = new MultiHashMap(['id', 'firstName'], ['lastName', 'sport']);
players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
players.insert(3, 'Roger', 'Federer', 'tennis');

players.find('id', 2) // --> [2, 'Pusarla', 'Sindhu', 'badminton']
players.find('firstName', 'Sachin') // --> [1, 'Sachin', 'Tendulkar', 'cricket']
players.find('sport', 'tennis') // --> Error: Invalid dimension
```

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
