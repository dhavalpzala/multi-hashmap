import test from 'ava';
import { MultiHashMap } from '../multi-hashmap';

test('should import MultiHashMap class',(t) => {
    t.is(typeof MultiHashMap === 'function', true);
});

test('Approach 1: should insert records',(t) => {
    var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');

    t.deepEqual(players.getAll(), [[1, 'Sachin', 'Tendulkar', 'cricket'], [2, 'Pusarla', 'Sindhu', 'badminton'], [3, 'Roger', 'Federer', 'tennis']]);
});

test('Approach 1: should find records',(t) => {
    var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');

    t.deepEqual(players.find('id', 2), [2, 'Pusarla', 'Sindhu', 'badminton']);
    t.deepEqual(players.find('firstName', 'Sachin'), [1, 'Sachin', 'Tendulkar', 'cricket']);
    t.deepEqual(players.find('sport', 'tennis'), [3, 'Roger', 'Federer', 'tennis']);
});

test('Approach 1: should find all records',(t) => {
    var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');
    players.insert(4, 'Saina', 'Nehwal', 'badminton');

    t.deepEqual(players.findAll('sport', 'badminton'), [[2, 'Pusarla', 'Sindhu', 'badminton'], [4, 'Saina', 'Nehwal', 'badminton']]);
});

test('Approach 2: should insert records',(t) => {
    var players = new MultiHashMap(['id', 'firstName'], ['lastName', 'sport']);
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');

    t.deepEqual(players.getAll(), [[1, 'Sachin', 'Tendulkar', 'cricket'], [2, 'Pusarla', 'Sindhu', 'badminton'], [3, 'Roger', 'Federer', 'tennis']]);
});

test('Approach 2: should find records',(t) => {
    var players = new MultiHashMap(['id', 'firstName'], ['lastName', 'sport']);
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');

    t.deepEqual(players.find('id', 2), [2, 'Pusarla', 'Sindhu', 'badminton']);
    t.deepEqual(players.find('firstName', 'Sachin'), [1, 'Sachin', 'Tendulkar', 'cricket']);
});

test('Approach 2: should find all records',(t) => {
    var players = new MultiHashMap(['id', 'firstName'], ['lastName', 'sport']);
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');
    players.insert(4, 'Sachin', 'Baby', 'cricket');

    t.deepEqual(players.findAll('firstName', 'Sachin'), [[1, 'Sachin', 'Tendulkar', 'cricket'], [4, 'Sachin', 'Baby', 'cricket']]);
});

test('should remove records',(t) => {
    var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');
    players.insert(4, 'Saina', 'Nehwal', 'badminton');

    t.deepEqual(players.find('id', 3), [3, 'Roger', 'Federer', 'tennis']);

    players.remove([3, 'Roger', 'Federer', 'tennis']);
    players.remove([1, 'Sachin', 'Tendulkar', 'cricket']);

    t.deepEqual(players.getAll(), [[2, 'Pusarla', 'Sindhu', 'badminton'], [4, 'Saina', 'Nehwal', 'badminton']]);
    t.deepEqual(players.find('id', 3), null);
});
