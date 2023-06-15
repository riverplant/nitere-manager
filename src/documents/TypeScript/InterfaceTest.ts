interface Person {
  name: string
  age?: number
}

const jack: Person = {
  name: 'tom',
  age: 30,
}

interface P {
  readonly name: string
  age: number
  [k: string]: string | number // 可以增加任意属性,[k: string]定义key为string, string | number： value 可以使用任意类型!!!!!!!!!!!
}

const lily: P = {
  name: 'lily',
  age: 20,
  id: 1,
  edu: '本科',
}

//通过接口定义函数
interface Sum {
  (x: number, y: number): number // 接收两个参数，返回一个值
}

const add: Sum = (x, y) => {
  return x + y
}

type Sum2 = (x: number, y: number) => number

type U1 = { id: number; name: string }

type Person1 = { age: number } & U1

const tim: Person1 = {
  id: 1,
  name: 'time',
  age: 30,
}

export default {}
