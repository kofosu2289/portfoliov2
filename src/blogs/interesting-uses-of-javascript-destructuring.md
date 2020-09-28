---
title: Interesting Uses of JavaScript Destructuring
date: "2020-09-28"
---

Looking at my regular JavaScript code, I see that destructuring assignments are everywhere.

Reading object properties and accessing array items are frequent operations. THe destructuring assignments make these operations so much easier and concise.

In this post, I will describe 5 interesting uses of destructuring in JavaScript beyond the basic usage.

# 1. Swap Variables

The usual way to swap 2 variables requires an additional temporary variable. Let's see a simple scenario:

```javascript
let a = 1;
let b = 2;
let temp;

temp = a;
a = b;
b = temp;

a; // => 2
b; // => 1
```
temp is a temporary variable that holds the value of a. THen a is assigned with the value of b, and consequently b is assigned with temp.

The destructuring assignment makes the variables swapping simple, without any need of a temporary variable:

```javascript
let a = 1;
let b = 2;

[a, b] = [b, a];

a; // => 2
b; // => 1
```
`[a, b] = [b, a]` is a destructuring assignment. On the right side, an array is created `[b, a]`, that is `[2, 1]`. The first item of this array `2` is assigned to `a` and the second item `1` is assigned to `b`.

Although you still create a temporary array, swapping variables using destructuring assignment is more concise. 

This is not the limit. You can swap more than 2 variables at the same time. Let's try that:

```javascript
let zero = 2;
let one = 1;
let two = 0;

[zero, one, two] = [two, one, zero];

zero; // => 0
one; // => 1
two; // =>@
```

You can swap as many variables as you want! Although, swapping 2 variables is the most common scenario.

# 2. Access array item

You have an array of items that potentially can be empty. You want to access the first, second, or nth item of the array, but if the item does not exist, get a default value.

Normally you would use the length property of the array:

```javascript
const colors = [];

let firstColor = 'white';
if (colors.length > 0) {
  firstColor = colors[0];
}


firstColor; // => 'white'
```
Fortunately, array destructuring helps you achieve the same way shorter:

```javascript
const colors = ['white', 'black'];

const [firstColor = 'red'] = colors;

firstColor; // => 'white'
```
`const [firstColor] = colors` destructuring assigns to `firstColor` variable the first element of the `colors` array. If the array doesn’t have any element at the index `0`, the `'red'` default value is assigned.

But there’s a lot more flexibility. If you want to access the second element only, that’s possible too:

```javascript
const colors = ['white', 'black'];

const [, secondColor = 'blue'] = colors;

secondColor; // => 'black'
```
Note the comma on the left side of the destructuring: it means that the first element is ignored. `secondColor` is assigned with the element at index `1` from the `colors` array.

# 3. Immutable operations
When I started using React, and later Redux, I was forced to write code that respects immutability. While having some difficulties at the start, later I saw its benefits: it’s easier to deal with data that flows in one direction only.

Immutability forbids mutating objects. Fortunately, destructuring helps you achieve some operations in an immutable manner easily.

The destructuring in combination with the `...` rest operator removes elements from the beginning of an array:

```javascript
const numbers = [1, 2, 3];

const [, ...fooNumbers] = numbers;

fooNumbers; // => [2, 3]
numbers; // => [1, 2, 3]
```
The destructuring `[, ...fooNumbers] = numbers` creates a new array `fooNumbers` that contains the items from `numbers` but the first one.

`numbers` array is not mutated, keeping the operation immutable.

In the same immutable manner you can delete properties from objects. Let’s try to delete `foo` property from the object `big`:

```javascript
const big = {
 foo: 'value Foo',
 bar: 'value Bar'
};

const { foo, ...small } = big;

small; // => { bar: 'value Bar' }
big; // => { foo: 'value Foo', bar: 'value Bar' }
```
The destructuring assignment in combination with the object rest operator creates a new object `small` with all properties from `big`, only without `foo`.

# 4. Destructuring iterables
In the previous sections, the destructuring was applied to arrays. But you can destructure any object that implements the iterable protocol.

Many native primitive types and objects are iterable: arrays, strings, typed arrays, sets, and maps.

For example, you can destructure a string to characters:

```javascript
const str = 'cheese';

const [firstChar = ''] = str;

firstChar; // => 'c'
```
You’re not limited to native types. Destructuring logic can be customized by implementing the iterable protocol.

`movies` holds a list of movie objects. When destructuring `movies`, it would be great to get the movie title as a string. Let’s implement a custom iterator:

```javascript
const movies = {
  list: [
    { title: 'Heat' }, 
    { title: 'Interstellar' }
  ],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.list.length) {
          const value = this.list[index++].title;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
};

const [firstMovieTitle] = movies;
console.log(firstMovieTitle); // => 'Heat'
```
The `movies` object implements the iterable protocol by defining the `Symbol.iterator` method. The iterator iterates over the titles of movies.

Conforming to an iterable protocol allows the destructuring of the `movies` object into titles, specifically by reading the title of the first movie: `const [firstMovieTitle] = movies`.

The sky is the limit when using destructuring with iterators.

# 5. Destructuring dynamic properties
In my experience, the destructuring of an object by properties happens more often than arrays destructuring.

The destructuring of an object looks pretty simple:

```javascript
const movie = { title: 'Heat' };

const { title } = movie;

title; // => 'Heat'
```
`const { title } = movie` creates a variable `title` and assigns to it the value of property `movie.title`.

When first reading about objects destructuring, I was a bit surprised that you don’t have to know the property name statically. You can destructure an object with a dynamic property name!

To see how dynamic destructuring works, let’s write a greeting function:

```javascript
function greet(obj, nameProp) {
 const { [nameProp]: name = 'Unknown' } = obj;
 return `Hello, ${name}!`;
}

greet({ name: 'Batman' }, 'name'); // => 'Hello, Batman!'
greet({ }, 'name'); // => 'Hello, Unknown!'
```
The `greet()` function is called with 2 arguments: the object and the property name.

Inside `greet()`, the destructuring assignment `const { [nameProp]: name = 'Unknown' } = obj` reads the dynamic property name using square brackets `[nameProp]`. The `name` variable receives the dynamic property value.

Even better you can specify a default value `'Unknown'` in case if the property does not exist.

# 6. Conclusion
Destructuring works great if you want to access object properties and array items.

On top of the basic usage, array destructuring is convinient to swap variables, access array items, perform some immutable operations.

JavaScript offers even greater possibilities because you can define custom destructuring logic using iterators.