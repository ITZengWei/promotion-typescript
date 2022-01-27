type Person = {
  name: string
  age: number
  address: string
  sex: number
}

/** 摘取 */
{
  type MyPick<T, K extends keyof T> = {
    [k in K]: T[k]
  }

  type PlainPerson = MyPick<Person, 'name' | 'sex'>
}

/** 只读 & 可变 */
{
  type ReadOnly<T> = {
    readonly [k in keyof T]: T[k]
  }

  type Mutable<T> = {
    -readonly [k in keyof T]: T[k]
  }

  type PersonWithReadOnly = ReadOnly<Person>

  type PersonWithMutable = Mutable<PersonWithReadOnly>
}

/** 元组转对象 */
{
  type TupleToObject<T extends any[]> = {
    /** T[number] 获取索引的元素 */
    [k in T[number]]: k
  } 

  type Result = TupleToObject<['Bill', 18]>
}

/** First 数组第一个元素 */
{
  type FirstEle1<T> = T extends any [] ? T[0] : never

  type Res1 = FirstEle1<['吃饭', '睡觉', 18]>

  type FirstEle2<T extends any[]> = T extends [infer R, ...infer O] ? R : never 

  type Res2 = FirstEle2<['吃饭', '睡觉', 18]>
}

/** Length */
{
  // type Len<T> = T extends { length: any } ? T['length'] : never
  type Len<T> = T extends Record<'length', any> ? T['length'] : never

  type ArrLen = Len<[100]>

  type ObjLen = Len<{ 0: 'a', 1: 'b', length: 100 }>
}

/** 排除 Exclude */
{
  type Exclude<T, U> = T extends U ? never : T

  type Result = Exclude<'name' | 'age' | 'gender', 'age' | 'nickname'>
}

/** PromiseType */
{
  type PromiseType<T> = T extends Promise<infer R> ? R : never

  type Fn = () => Promise<string | number>

  type FnReturn = ReturnType<Fn>

  type PickResult = PromiseType<FnReturn> // string | number
}

/** IF 判断 */
{
  type If<C extends boolean, T, F> = F extends true ? T : F

  type Result = If<true, 'woman', 'man'> // woman
}

/** Concat 数组(concat)方法 */
{
  type Concat<T extends any[], U extends any[]> = [...T, ...U]

  type Result = Concat<[1, 2], [3, 4]> // [1, 2, 3, 4]
}

/** Includes 数组 include 方法 TODO */
{
  // type Includes<A extends any[], T> = T extends A[number] ? true : false

  type Includes<T, U> = T extends [infer F, ...infer O] 
    ?  
    F extends U ? true : Includes<O, U> 
    :
    false

  type Result = Includes<[1, 2], 1> // [1, 2, 3, 4]
}

/** Push、Pop、shift、unshift 数组方法 TODO */
{
  type Push<T extends any[], U> = [...T, U] 
  type Unshift<T extends any[], U> = [U, ...T] 
  type Shift<T extends any[]> =  T extends [infer F, ...infer O] ? O : never
  
  type Pop<T> = T extends [...infer O, infer L] ? O : never

  type PushResult = Push<[1, 2, 3], 4> // [1, 2, 3, 4]
  type UnshiftResult = Unshift<[1, 2, 3], 0> // [0, 1, 2, 3]
  type ShiftResult = Shift<[1, 2, 3]> // [2, 3]
  type PopResult = Pop<[1, 2, 3]> // [1, 2]
}

/** Parameters 函数参数类型 TODO */
{
  // type Parameters<T> = T extends (...p infer P) => any ? P : never 
  type MyParameters<T> = T extends (...args: infer P) => any ? P : never 

  type AddParams = MyParameters<(a: number, b: string) => void> // [a: number, b: string]
}

/** Partial 可填 + Required 必填  */
{
  type MyPartial<T> = {
    [k in keyof T]?: T[k]
  }

  type MyRequired<T> = {
    [k in keyof T]-?: T[k]
  }

  type PersonWithPartial = MyPartial<Person>
  type PersonWithRequired = MyRequired<PersonWithPartial>
}

/** Record 构造  TODO*/
{
  type MyRecord<K extends PropertyKey, V> = {
    [k in K]: V
  }

  type Animate = MyRecord<'type' | 'eat', string | (() => void)>

  const dog: Animate = {
    type: 'dog',
    eat: () => {}
  }
}

/** Extract 交集 */
{
  type MyExtract<T, U> = T extends U ? T : never

  type ExtractResult = MyExtract<keyof Person, 'age'|'address'|'nickname'>
}
