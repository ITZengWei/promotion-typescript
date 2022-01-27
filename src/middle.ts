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

/** 深度 DeepReadonly */
{
  type DeepReadonly<T> = {
    readonly [k in keyof T]: T[k] extends Record<PropertyKey, any> ? DeepReadonly<T[k]> : T[k]
  }

  type StudentScore = {
    name: string,
    score: {
      math: number,
      chinese: number
    }
  }

  /** 默认readonly */
  type StudentScoreWithDefaultReadonly = Readonly<StudentScore>

  /** 深度readonly */
  type StudentScoreWithDeepReadonly = DeepReadonly<StudentScore>
}

/** 元祖转联合类型 TODO */
{
  type TupleToUnion1<T extends any[]> = T[number]

  type TupleToUnion2<T> = T extends [infer F, ...infer O] ? F | TupleToUnion2<O> : never

  type Result1 = TupleToUnion1<['1', '2', '3']> // '1' | '2' | '3'
  type Result2 = TupleToUnion2<['1', '2', '3']> // '1' | '2' | '3'
}

/** 数组最后一个元素 */
{
  /** 索引思想 */
  type Last1<T extends any[]> = T extends [infer F, ...infer O] ? T[O['length']] : never

  /** 后占位思想 TODO JS 里面没有这种写法 */
  type Last2<T> = T extends [...infer O, infer L] ? L : never

  type Result1 = Last1<[1, 2, 3]> // 3
  type Result2 = Last2<[1, 2, 3]> // 3
}

/** Promise All TODO */
{


  // Sum(1, 2)

  // const fn: Sum

  // type PromiseAllType<T> = {
  //   [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]
  // }

  // declare function PromiseAll<T extends any[]>(values: T) : PromiseAllType<T>
  // type Result = typeof PromiseAll([1, 2, Promise.resolve(3)]) // Promise<[number, number, number]>
}

/** Trim、TrimLeft、TrimRight */
{
  type Space = ' ' | '\n' | '\t'
  type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S
  type TrimRight<S extends string> = S extends `${infer R}${Space}` ? TrimLeft<R> : S
  type Trim<S extends string> = S extends  `${infer R}${Space}` | `${Space}${infer R}` ? Trim<R> : S

  
  type T1 = TrimLeft<'   str'>  // 'str'
  type T2 = TrimRight<'str     '>  // 'str'
  type T3 = Trim<'   str  '>
}

/** 首字母大小写 TODO */
{
  /** 首字母大写 */
  type Capitalize<T extends string> = T extends `${infer C}${infer O}` ? `${ Uppercase<C> }${ O }` : never
  type UnCapitalize<T extends string> = T extends `${infer C}${infer O}` ? `${ Lowercase<C> }${ O }` : never

  // type Demo<T extends any[]> = T extends [infer F, infer S] ? S : never

  // type D1 = Demo<[1, 2, 3]>

  type T1 = 'hello'

  type CapitalizeHello = Capitalize<T1>
  type UnCapitalizeHello = UnCapitalize<CapitalizeHello>
}

/** Replace 和 ReplaceAll TODO */
{
  type Replace<S extends string, from extends string, to extends string> = S extends `${infer L}${ from }${infer R}`
   ? from extends '' ? S : `${L}${to}${R}` 
   : S 

   type ReplaceAll<S extends string, from extends string, to extends string> = S extends Replace<S, from, to> ? S : ReplaceAll<Replace<S, from, to>, from, to>

   type T1 = Replace<'foobarbar', 'bar', 'foo'>    // 'foofoobar'

   type T2 = ReplaceAll<'foobarbar', 'bar', 'foo'>    // 'foofoofoo'
}

/** 追加参数 AppendArgument */
{
  type AppendArgument<T extends (...args: any[]) => any, A> = T extends (...args: infer Args) => infer R ?  (...args: [...Args, A]) => R : never

  type Result = AppendArgument<(a: number) => number, number> // (a: number, b: number) => number
}