const initialArray = [1,2,3,4,5];

// say you want to make transformations on your data
initialArray
  .map((x) => x + 10) // creates an intermediate array
  .filter((x) => x > 12) // creates an intermediate array
  .reduce((acc, x) => acc + x, 0)

// as we chain .map .filter and .reduce on our data structure we create
// intermediate data structures for every operation

// current state:
// [...].map(...) => [...].filter(...) => [...].reduce(...)

// what we want to do is perform one transformation function
// reduce is our method to transform our array to any other data structure
// (including another array)
// [...].reduce(.............) => any_data_structure

// Abstractions:
// 1. iteration - we will use .reduce
// 2. transformation/evaluation - this is our core logic
// 3. reducing - reducing function that builds our data structure

// What is a reducing function?
// Simple a function that takes an accumulator and result and returns a data
// type that is the same as accumulator to be used in the next iteration
// ReducingFunction :: a -> b -> a
const concat = (acc, result) => acc.concat([result]);

// this would return an array of the same items as initialArray
initialArray.reduce(concat, []);
// [1,2,3,4,5]

// To achieve our goal of having one transformation function, we need to switch
// from a chain of transformations on data structures to transforming our
// reducing functions. We need to right our functions as HOF that take reducing
// functions and return reducing functions.
//
// :: Welcome to Transducers ::
// Transducers are simply higher order functions that take a reducing function,
// transforms it and returns another reducing function

// Lets write map to transform concat
const mapping = (transform) => (reducing) => (acc, result) =>
  reducing(acc, transform(result));

const inc = (x) => x + 1;
initialArray.reduce(mapping(inc)(concat), [])
// [2,3,4,5,6]

// Lets write filter to transform concat
const filtering = (predicate) => (reducing) => (acc, result) =>
  (predicate(result) ? reducing(acc, result) : acc);

const gt2 = (x) => x > 2;
initialArray.reduce(filtering(gt2)(concat), [])
// [3,4,5]

// note since filtering and mapping ultimately return reducing functions, they
// can be passed into each other. This function reduces over the array and
// filters the result by gt2 then maps inc on the result
initialArray.reduce(filtering(gt2)(mapping(inc)(concat)),[])
// [4,5,6]

// compose/pipe the everything
// compose applies from right to left : (f.g)(x) => f(g(x))
const compose = (fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)
// pipe applies from left to right : (f.g)(x) => g(f(x))
const pipe = (fns) => x => fns.reduce((acc, fn) => fn(acc), x)

// map then filter
const combined1 = compose(filtering(gt2), mapping(inc));
initialArray.reduce(
  compose([
    filtering(gt2),
    mapping(inc)
  ])(concat),
[]);
// [4,5,6]

// filter then map
initialArray.reduce(
  pipe([
    filtering(gt2),
    mapping(inc)
  ])(concat),
[]);
// [3,4,5,6]
