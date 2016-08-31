# MultiHashMap

[multi-hashmap](https://npmjs.org/package/multi-hashmap) package provides a linking between multiple hashmaps and gives a single entity.

##Getting Started

### Installation

Using [npm](https://npmjs.org/package/multi-hashmap):

    $ npm install multi-hashmap

### Constructor
- `new MultiHashMap(dimension1: string, dimension2: string, ...)` define the dimesions in the constructor.

### Methods
- `insert(value1:*, value2:*, ...) : void` insert the records
- `find(dimension: string, value: *) : []` returns the records associated with that dimension and value.

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
