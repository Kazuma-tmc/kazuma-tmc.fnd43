'use strict'
// 1行目に記載している 'use strict' は削除しないでください


// 中級
/**
 * @param {{ [key: string]: number }} inputObject
 * @returns {{ [key: string]: number }} 与えられたオブジェクトと同じキーと値のペアを持つオブジェクト。ただし、値が数値の場合には 1 が足された値となる。
 */
// function incrementNumbers(inputObject) {
//   const reslutObject = {};
//   for (const key in inputObject) {
//     const objectValue = inputObject[key];
//     if (typeof objectValue === "number") {
//       reslutObject[key] = objectValue + 1;
//     } else {
//       reslutObject[key] = objectValue;
//     }
//   }
//   return reslutObject;
// }
function incrementNumbers(inputObject) {
  for (const key in inputObject) {
    if (typeof inputObject[key] === "number") {
      inputObject[key] += 1;
    }
  }
  return inputObject;
}


test(incrementNumbers({ a: 1, b: 2, 1: 3, d: "hello" }), {
  a: 2,
  b: 3,
  1: 4,
  d: "hello",
});
test(incrementNumbers({ a: 2, b: 3, 1: 4, d: "hello" }), {
  a: 3,
  b: 4,
  1: 5,
  d: "hello",
});

// ナイトメア
console.log("ナイトメア")
/**
 * @param {any} actual - 比較する値
 * @param {any} expected - 比較するもう 1 つの値
 * @returns {boolean} 与えられた 2 つの値が等しいかどうか
 */
function isEqual(actual, expected) {
  let bool = false;
  return actual === expected;
}

test(isEqual(1, 1), true);
test(isEqual(1, "1"), false);
test(isEqual(1, 2), false);
test(isEqual(true, true), true);
test(isEqual(false, true), false);
test(isEqual("string", "string"), true);
test(isEqual("string", "differentString"), false);
test(isEqual([1, 2, 3], [1, 2, 3]), true);
test(isEqual([1, 2, 3], [1, 2]), false);
test(isEqual({ a: "A", b: "B" }, { b: "B", a: "A" }), true);

test(isEqual([1, { a: "A" }], [2, { a: "A" }]), false);
test(isEqual([{ a: "A" }, 1], [{ a: "A" }, 2]), false);

const arrayOfObjects = [
  { a: "A", b: "B" },
  { b: "B", a: "A" },
];
const sameArrayOfObjects = [
  { a: "A", b: "B" },
  { b: "B", a: "A" },
];
const differentArrayOfObjects = [
  { z: "Z", b: "B" },
  { b: "B", a: "A" },
];

test(isEqual(arrayOfObjects, sameArrayOfObjects), true);
test(isEqual(arrayOfObjects, differentArrayOfObjects), false);

const objectWithManyProperties = {
  array: [
    { a: "A", b: "B" },
    { b: "B", a: "A" },
  ],
  boolean: true,
  number: 6,
  object: { z: "Z", b: "B" },
  string: "hello",
};
const objectWithSamePropertiesInDifferentOrder = {
  string: "hello",
  object: { z: "Z", b: "B" },
  number: 6,
  boolean: true,
  array: [
    { a: "A", b: "B" },
    { b: "B", a: "A" },
  ],
};
const objectWithManyPropertiesButOneDifferentValue = {
  array: [
    { a: "A", b: "B" },
    { b: "B", a: "Z" },
  ],
  boolean: true,
  number: 6,
  object: { z: "Z", b: "B" },
  string: "hello",
};

test(
  isEqual(
    objectWithManyProperties,
    objectWithSamePropertiesInDifferentOrder
  ),
  true
);
test(
  isEqual(
    objectWithManyProperties,
    objectWithManyPropertiesButOneDifferentValue
  ),
  false
);