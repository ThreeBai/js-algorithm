/**
 * 
 * @author: ThreeBai
 *  
 */

// 根据已有数组生成完全乱序数组
function shuffle(arr) {
  let len = arr.length;
  for (let i = 0; i < len-1; i++) {
    let index = parseInt(Math.random() * (len-i))
   
    let temp = arr[index]
    arr[index] = arr[len-i-1]
    arr[len-i-1] = temp
  }
}
// 根据数组长度生成部分乱序数组
function generatePatialOrderdArray(num) {
  let arr = []
  for (let i = 0; i < num; i++) {
    if(i <= num/2) {
      arr[i] = num/2 - i
    }else {
      arr[i] = i
    }
  }
  return arr
}

// 生成一个完全无序的值为0-29的数组
let demoArray = generatePatialOrderdArray(30)
shuffle(demoArray)

// 交换数组中的两个已知index的元素
function swap( arr, a, b) { 
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

// 冒泡排序法（算法设计： 1.使用已排序标识避免无效循环 2. 记录最后一个交换位置节省循环开销）
function bubbleSort(arr) {
  let len = arr.length, k = len -1, swapPosition = 0
  for(let i = 1; i < len; i++) {
    let hasSort  = true
    for(let j = 0; j < k; j++) {
      if(arr[j] > arr[j + 1]) {
        swap(arr, j, j +1)
        hasSort = false
        swapPosition = j
      }
    }
    if(hasSort) { break }
    k = swapPosition
  }
}

// 双端冒泡排序
function doubleBubbleSort(arr) {
  let index = 0, len = arr.length, left = index, right = len - 1
  while(left < right) {
    let hasSort = true
    for(let i = left; i < right; i++) {
      if(arr[i] > arr[i + 1]) {
        swap(arr, i,  i + 1)
        index = i
        hasSort = false
      }
    }
    right = index
    for(let i = right; i > left; i--) {
      if(arr[i] < arr[i - 1]){
        swap(arr, i, i - 1)
        index = i
        hasSort = false
      }
    }
    left = index
    if(hasSort) break
  }
}

// 选择排序-遍历数组取最小值放在首位，算法设计：使用一个变量来保存最小值的索引
function selectSort (arr){
  let len = arr.length
  for(let i = 0; i < len; i++) {
    let minIndex = i
    for(let j = i + 1; j < len; j++) {
      if(arr[j] < arr[minIndex]){
        minIndex = j
      }
    }
    if(i !== minIndex) {
      swap(arr, i, minIndex)
    }
  }
}

// 插入排序-遍历数组，依次取出目标数据插入到合适的位置。 
// 算法设计：1. j是目标元素排完序后所在索引-1，由于内层循环之外也要使用此变量以及js作用域问题，需要在外层循环中定义
// 2. target是目标元素，以目标元素为分割点，之前均为有序区，之后为无序区
// 3. 插入元素时需要逆向遍历依次向后移动索引
function insertSort(arr) {
  let len = arr.length
  for(let i = 1; i < len; i++) {
    let target = arr[i]
    let j
    for(j = i - 1; j >= 0; j--){
      if(target > arr[j]) {
        break
      }
    }
    if(j !== i - 1){
      for(let k = i - 1; k > j ; k--){
        arr[k + 1] = arr[k]
      }
      arr[j + 1] = target
    }
  }
}
// 插入排序-写法优化，使用while合并循环
function insertSortPlus(arr) {
  let len = arr.length
  for( let i =1; i < len; i++) {
    let target = arr[i], j = i
    while( j > 0 && arr[j -1] > target) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = target
  }
}

// 希尔排序- 将数组根据增量公式（有多种）分为多个索引等差的小数组，每个小数组再进行插入排序
class generateAddSeq {
  constructor(arrLength){
    this.arrLength = arrLength;
  }
  // 根据数组长度生成增量公式-Sedgewick
  getSedgewickSeq(){
    let start1 = 0, start2 = 2, arr = []
    for (let i = 0; i < this.arrLength; i++) {
      if(i % 2 == 0) {
        arr[i] = 9 * Math.pow(4, start1) - 9 * Math.pow(2, start1) + 1
        start1++
      }else{
        arr[i] = Math.pow(4, start2) - 3 * Math.pow(2, start2) + 1
        start2++
      }
      if(arr[i] >= this.arrLength) {
        arr.pop()
        break
      }
    }
    return arr
  }
  // 根据数组长度生成增量公式-Shell
  getShellSeq() {
    let arr = [], item = this.arrLength
    while(item !==1) {
      item = item >> 1
      arr.unshift(item)
    }
    return arr
  }
  // 根据数组长度生成增量公式-Hibbard
  getHibbardSeq() {
    let arr = []
    for(let i = 1; i < this.arrLength; i++) {
      arr[i -1] = Math.pow(2, i) - 1
      if(arr[i -1 ] >= this.arrLength) { 
        arr.pop()
        break 
      }
    }
    return arr
  }
   // 根据数组长度生成增量公式-Knuth
   getKnuthSeq() {
    let arr = []
    for(let i = 1; i < this.arrLength; i++) {
      arr[i -1] = (Math.pow(3, i) - 1) / 2
      if(arr[i -1 ] >= this.arrLength) { 
        arr.pop()
        break 
      }
    }
    return arr
   }
}
// 以Sedgewick序列为例实现希尔排序
// 算法设计： 1. 通过出栈依次获取增量序列中的索引增量gap，根据索引增量生成多个不同小数组
// 2. 对每个小数组执行插入排序，这些小数组每个元素的索引都相差gap
function shellSort(arr){
  let len = arr.length
  const sedgewickSequence = new generateAddSeq(len).getSedgewickSeq()
  while(gap = sedgewickSequence.pop()) {
    for(let g = 0; g < gap; g++) {
      for(let i = g + gap; i < len; i+=gap) {
        let target = arr[i], j = i
        while(j >0 && arr[j - gap] > target){
          arr[j] = arr[j - gap]
          j -= gap
        }
        arr[j] = target
      }
    }
  }
}

// 归并排序-将数组向下分解为子数组，子数组元素个数为1，再将相邻的两个子数组组合成有序数组，向上递归

// 合并有序数组
function mergeArrayByIndex(arr, start1, end1, start2, end2) {
  let  indexA = start1, indexB = start2, indexMerged = 0, mergedArray  = []
  while(indexA <= end1 && indexB <= end2) {
    mergedArray[indexMerged++] = arr[indexA] < arr[indexB] ? arr[indexA++] : arr[indexB++]
  }
  while (indexA <= end1) { mergedArray[indexMerged++] = arr[indexA++] }
  while (indexB <= end2) { mergedArray[indexMerged++] = arr[indexB++] 
  }
  return mergedArray
}
function mergeSort(arr) {
  function sort(arr, start, end) {
    if(start !== end) {
      let middle = start + ((end - start) >> 1)
      sort(arr, start, middle)
      sort(arr, middle + 1, end)
      let temp = mergeArrayByIndex(arr, start, middle, middle + 1, end)
      for(let i = 0; i < temp.length; i++) {
        arr[start + i] = temp[i]
      }
    }
  }
  sort(arr, 0, arr.length - 1)
  return arr
}

// 快速排序- 取枢轴pivot， 每次将数组切割成两部分，左侧都小于pivot，右侧都大于pivot，递归分割直到数组长度为1，原数组即有序。
// 算法设计：1. 核心在于划分子区间，即分割排序方法partition的实现
// 2. 优化点：枢轴pivot的选择非常重要，通常可使用三数取中法（取左、右、中三个数中的中间数);小数组和部分有序使用插入法要比快速排序更好

// 使用左右指针法实现partition
function partitionOne(arr, left, right) {
  let pivot = arr[right]
  pivotIndex = right
  while(left < right) {
    while(left < right && arr[left] <= pivot) {
      left++
    }
    while(left < right && arr[right] >= pivot) {
      right--
    }
    swap(arr, left, right)
  }
  swap(arr, left, pivotIndex)
  return left
}
// 使用挖坑法实现partition
function partitionTwo(arr, left, right) {
  let pivot = arr[right]
  while(left < right) {
    while(left < right && arr[left] <= pivot) {
      left++
    }
    arr[right] = arr[left]
    while(left < right && arr[right] >= pivot) {
      right--
    }
    arr[left] = arr[right]
  }
  arr[right] = pivot
  return left
}
// 使用前后指针法实现partition，支持对链表进行排序
function partitionThree(arr, left, right) {
  let cur = left, pre = cur - 1, pivot = arr[right]
  while(cur <= right) {
    if(arr[cur] <= pivot && ++pre !== cur)
      swap(arr, cur, pre)
    cur++
  } 
  return pre
}
// 使用递归实现的快速排序
function quickSort(arr) {
  function sort(arr, left, right) {
    if(left < right) {
      let index = partitionThree(arr, left, right)
      sort(arr, left, index - 1)
      sort(arr, index + 1, right)
    }
  }
  sort(arr, 0, arr.length - 1)
  return arr
}
// 使用栈（用来保存区间）实现的快速排序，递归本身就一个压栈的过程
function quickSortUseStack(arr, start, end){
  let stack = []
  stack.push(end)
  stack.push(start)
  while(stack.length) {
    let l = stack.pop()
    let r = stack.pop()
    let index = partitionThree(arr, l, r)
    if(l < index - 1){
      stack.push(index - 1)
      stack.push(l)
    }
    if(r > index + 1) {
      stack.push(right)
      stack.push(index + 1)
    }
  }
}


// 计数排序-
function countSort(arr) {
  let max = arr[0], min = arr[0], len = arr.length
  for(let i = 0; i < len; i++) {
    if(arr[i] > max) { max = arr[i] }
    if(arr[i] < min) { min = arr[i] }
  }
  let size = max - min + 1
  let buckets = new Array(size).fill(0)
  for(let i = 0; i < len; i++) {
    buckets[arr[i] - min]++
  }
  for(let i = 1; i < size; i++) {
    buckets[i] += buckets[i - 1]
  }
  let ret = []
  for (let i = len - 1; i >= 0; i--) {
    buckets[arr[i] - min]--
    ret[buckets[arr[i] -min]] = arr[i]
  }
  return ret
}


// 桶排序-是一种特殊的分治法,参数num需要小于原数组长度
function bucketSort(arr, num) {
  if(arr.length <= 1){ return arr }
  let n = arr.length, min = Math.min.apply(0, arr), max = Math.max.apply(0, arr)
  if(min === max) { return arr }
  let compacity = (max - min +1) / num
  let buckets = new Array(max - min + 1)
  for (let i = 0; i < n; i++) {
    let el = arr[i]
    let index = Math.floor((el - min) / compacity)
    let bucket = buckets[index]
    if(bucket) {
      let jn = bucket.length
      if(el >= bucket[jn - 1]) {
        bucket[jn] = el
      }else {
        for (let j = 0; j < jn; j++) {
          if(bucket[j] > el) {
            while(jn > j) {
              bucket[jn] = bucket[jn - 1]
              jn--
            }
            bucket[j] = el
            break
          }
        }
      }
    }else {
      buckets[index] = [el]
    }
  }
  let index = 0
  for (let i = 0; i < num; i++) {
    let bucket = buckets[i]
    for (let k = 0, kn = bucket.length; k < kn; k++) {
      arr[index++] = bucket[k]
    }
  }
  return arr
}

// 基数排序-非比较型整数排序算法，按整数的每个位数上的值进行分组，分为LSD（从低位到高位）和MSD（从高位到低位）两种
// 获取数字位数
function getLoopTimes(num) {
  let digit = 0
  do {
    if(num > 1) { digit++ }else { break}
  }while ((num = num / 10))
  return digit
}
// 获取数字某个位数的值
function getNumber(num, i) {
  // return Math.floor((num / Math.pow(10, i- 1)) % 10)
  return num.toString().reverse()[i]
}
// lsd划分
function lsdRadix(arr, buckets, len, radix) {
  for( let i = 0; i < len; i++) {
    let el = arr[i]
    let index  = getNumber(el, radix)
    buckets[index].push(el)
  }
  let k = 0
  for (let i = 0; i < 10; i++) {
    let bucket = buckets[i]
    for(let j = 0; j < bucket.length; j++) {
      arr[k++] = bucket[j]
    }
    bucket.length = 0
  }
}
function radixLsdSort(arr) {
  let max  = Math.max.apply(null, arr)
  let times = getLoopTimes(max), len = arr.length,  buckets = [[],[],[],[],[],[],[],[],[],[]]
  for (let radix = 1; radix <= times; radix++) { 
    lsdRadix(arr, buckets, len, radix)
  }
}

// msd划分
function msdRadix(arr,len, radix) {
  let buckets = [[],[],[],[],[],[],[],[],[],[]]
  for( let i = 0; i < len; i++) {
    let el = arr[i]
    let index  = getNumber(el, radix)
    buckets[index].push(el)
  }
  // 递归子桶
  for( let i = 0; i <10; i++) {
    let el = buckets[i]
    if(el.length > 1 && radix - 1) {
      msdRadix(el, el.length, radix -1)
    }
  }
  // 重写桶
  let k = 0
  for (let i = 0; i < 10; i++) {
    let bucket = buckets[i]
    for(let j = 0; j < bucket.length; j++) {
      arr[k++] = bucket[j]
    }
    bucket.length = 0
  }
}
function radixMsdSort(arr) {
  let max = Math.max.apply(null, arr), times = getLoopTimes(max), len = arr.length
  msdRadix(arr, len, times )
}
radixMsdSort(demoArray)
console.log(demoArray)

// 排序使用场景
// 大数组： 快速、归并  
// 中数组： 希尔
// 小数组： 冒泡、选择、希尔
// 无序性高： 快速、希尔  无序性低： 插入、冒泡