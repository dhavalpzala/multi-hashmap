import test from 'ava';
import { MultiHashMap } from './multi-hashmap';

test('should import MultiHashMap class',(t) => {
    t.is(typeof MultiHashMap === 'function', true);
});

test('should insert records',(t) => {
    var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');

    t.deepEqual(players.getRecords(), [[1, 'Sachin', 'Tendulkar', 'cricket'], [2, 'Pusarla', 'Sindhu', 'badminton'], [3, 'Roger', 'Federer', 'tennis']]);
});

test('should find records',(t) => {
    var players = new MultiHashMap('id', 'firstName', 'lastName', 'sport');
    players.insert(1, 'Sachin', 'Tendulkar', 'cricket');
    players.insert(2, 'Pusarla', 'Sindhu', 'badminton');
    players.insert(3, 'Roger', 'Federer', 'tennis');

    t.deepEqual(players.find('id', 2), [2, 'Pusarla', 'Sindhu', 'badminton']);
    t.deepEqual(players.find('firstName', 'Sachin'), [1, 'Sachin', 'Tendulkar', 'cricket']);
    t.deepEqual(players.find('sport', 'tennis'), [3, 'Roger', 'Federer', 'tennis']);
});
