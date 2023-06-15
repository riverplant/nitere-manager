const name: string = 'jack'

const age: number = 30

const isTrue: boolean = true

let a: undefined

let b: null = null

let user: object = {}

let big: bigint = 100n

const sym: symbol = Symbol('hepan')

//void

function fn(): void {
  console.log('')
}

//never: 永远不存在的值的类型，用于抛出异常或者错误
function error(): never {
  throw new Error('Error.....')
}

function loop(): never {
  while (true) {
    console.log('dead loop......')
  }
}

//any

//unknow

//<a href="javascript:void;"></a>"

export default {}
