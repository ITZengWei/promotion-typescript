type MiddlePerson = {
  name: string
  age: number
  address: string
  sex: number
}

/** ReturnType 函数返回类型 */
{
  type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

  type Fn = () => Promise<string | number>

  type FnReturn = MyReturnType<Fn> // Promise<string | number>
}

/** Omit 移除 TODO */
{

  type MyExclude<T, U> = T extends U ? never : T

  // type MyOmit<T, K extends PropertyKey> = {
  //   [k in MyExclude<keyof T, K>]: T[k]
  // }

  type MyPick<T, K extends keyof T> = {
    [k in K]: T[k]
  } 

  type MyOmit<T, K extends PropertyKey> = MyPick<T, MyExclude<keyof T, K>>
  
  type PersonWithOmit = MyOmit<MiddlePerson, 'name'> 
}

/** ReadOnly(按需 Readonly) TODO */
{
  type MyReadOnly<T, K extends keyof T = keyof T> = T & {
    readonly [k in K]: T[k]
  }

  type PersonWithReadonly = MyReadOnly<MiddlePerson, 'age'> 

  const personWithReadonly: PersonWithReadonly = {
   name: 'Bill',
   age: 18,
   address: '抚州',
   sex: 18
  }

  personWithReadonly.name = '阿斯顿发顺丰'

  console.log(personWithReadonly)
}