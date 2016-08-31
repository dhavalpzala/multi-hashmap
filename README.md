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
var MultiHashMap = require('multi-hashmap');

var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
players.insert(2, 'Pusarla', 'Sindhu', 'badminton'); 
players.insert(3, 'Roger', 'Federer', 'tennis');

players.find('id', 2) // --> [2, 'Pusarla', 'Sindhu', 'badminton']
players.find('firstName', 'Sachin') // --> [1, 'Sachin', 'Tendulkar', 'cricket']
player.find('sport', 'tennis') // --> [3, 'Roger', 'Federer', 'tennis']
```



