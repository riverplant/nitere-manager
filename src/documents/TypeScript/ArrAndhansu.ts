const list1: number[] = [1, 2, 3]

const list2: Array<number> = [1, 2, 3]

const list3: [number, string, boolean] = [1, '2', true]

const list4: [{ name: string; age: number }] = [{ name: 'jack', age: 30 }]

const list5: Array<{ name: string; age: number }> = [{ name: 'jack', age: 30 }]

interface User {
  name: string
  age: number
}

const list6: Array<User> = [{ name: 'jack', age: 30 }]

function add1(a: number, b: number): number {
  return a + b
}

function addWithError(a: number, b: number): unknown {
  throw new Error('Error')
}

const add4 = (a: number, b: number): number => {
  return a + b
}

const add5: (a: number, b: number) => number = (a, b) => {
  return a + b
}

//不确定类型
let id: number | string = 1

//交叉类型
type UserType = { id: number; name: string }
type AgeType = { age: number }

const user: UserType & AgeType = { id: 1, name: 'Jack', age: 30 }

export default {}
