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
function mergeSort(arr) {

}
shellSort(demoArray)
console.log(demoArray)