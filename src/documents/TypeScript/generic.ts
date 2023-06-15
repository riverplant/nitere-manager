function identity<T>(arg: T): T {
  return arg
}
identity<number>(1)

function identity2<T, U>(x: T, y: U): T {
  return x
}
//定义任意属性: key固定为string类型，value可能是各种类型
interface Person {
  [k: string]: string | number | boolean
}

//Pick
interface User {
  id: number
  name: string
  age: number
}

type AgeType = Pick<User, 'age' | 'name'>

let Jack: AgeType = {
  age: 50,
  name: 'Jack',
}

//keyof: 取key值
type keys = keyof User

type J = typeof Jack
const Tom: J = { age: 55, name: 'Tom' }

//in: 遍历枚举类型
type Keys = 'id' | 'name' | 'age'

type UserKes = {
  [k in Keys]: any
}
export default {}
