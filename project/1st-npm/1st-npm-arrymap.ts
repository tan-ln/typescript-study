const arrayMap = <T, U>(arr: T[], callback: (item: T, index: number, array: ReadonlyArray<T>) => U ): U[] => {
  let i = -1
  const len = arr.length
  const res = []
  while(++i < len) {
    res.push(callback(arr[i], i, arr))
  }
  return res
}

export = arrayMap
