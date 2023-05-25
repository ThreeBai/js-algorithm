class Node {
  constructor(data) {
    this.data = data
    this.next = null
    this.prev = null
  }
}

// 双向链表
class DoubleList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  size() {
    return this.length
  }
  clear() {
    this.constructor()
  }
  // 寻找某个结点
  findIndex(index) {
    let n = this.length
    if(index > n) {
      throw `${index}超出链表长度${n}`
    }
    let dir = index > (n >> 1)
    let node = dir? this.tail : this.head
    let prop = dir? "prev" : "next"
    let add = dir? -1 : 1
    let i = dir? n - 1 : 0
    while(node) {
      if(index === i) { return node }
      node = node[prop]
      i = i + add
    }
    // return ?
    return null
  }
  // 遍历
  forEach(cb) {
    let node = this.head, i = 0
    while(node) {
      cb(node.data, i)
      node  = node.next
      i++
    }
  }
  // 插入一个结点
  insertAt(index, value) {
    if(index <= this.length) {
      let node  =  new Node(value)
      if(index === 0) {
        if(this.head) {
          let next = this.head
          this.head = node
          node.next = next
        }else {
          this.tail = this.head = node
        }
      }else {
        let prev = this.findIndex(index - 1)
        let next = prev.next
        prev.next = node
        node.prev = prev
        node.next = next
        if(next) {
          next.prev = node
        }else {
          // 如果是在最后插入，插入完成后还需将node设置为tail
          this.tail = node
        }
      }
      this.length++
    }else {
      throw `${index}超出链表长度${this.length}`
    }
  }
  // 移除一个节点
  removeAt(index) {
    if(this.head && index <= this.length) {
      let curr = this.findIndex(index)
      let prev = curr.prev
      let next
      if(!prev) {
        next = this.head = curr.next
      }else {
        next = prev.next = curr.next
      }
      if(next) {
        next.prev = prev
      }else {
        this.tail = next
      }
      this.length--
    }else {
      throw `${index}超出链表长度${this.length}`
    }
  }
}
// 有序链表
// 核心点：find方法
// 存在两种使用场景： 普通查找和插入时寻找，插入寻找时无法使用全等判断，需要寻找第一个大于value的位置，因此给find方法添加第二个参数用于区分使用场景
// useByInset仅作为一个标识用来区分find方法的使用场景是否是插入时find
let useByInset = {}
class SortedList extends DoubleList {
  find(value, mode) {
    let node = this.head
    let i = 0
    while(node) {
      if(mode === useByInset? node.data > value : node.data === value) {
        return node
      }
      node = node.next
      i++
    }
  }
  insert(value) {
    let next = this.find(value, useByInset)
    let node = new Node(value)
    if(next) {// 插入到非尾部
      let prev = next.prev
      if(prev) {// 插入到非尾部非头部
        node.prev = next.prev
        prev.next = node
      }else {// 插入到头部
        this.head = node
      }
      node.next = next
      next.prev = node
    }else {// 插入到尾部
      let last = this.tail
      this.tail = node
      if(last) { // 原链表存在tail
        node.prev = last
        last.next = node
      }else {// 原链表不存在tail，即原链表为空
        this.head = node
      }
    }
    this.length++
  }
  remove(value) {
    let node = this.find(value)
    if(node) {
      let prev = node.prev
      let next = node.next
      if(prev) {
        if(next) {// 删除非头部且非尾部结点
          prev.next = next
          next.prev = prev
        }else {// 删除尾部结点
          this.tail = prev
          prev.next = null
        }
      }else {// 删除头部结点
        this.head = next
        next.prev = null
      }
      this.length--
    }
    else {
      throw `链表中无此结点`
    }
  }
}

// 以下代码可用于测试SortedList
// let demoList = new SortedList()
// demoList.insert(1)
// demoList.insert(4)
// demoList.insert(2)
// demoList.insert(3)
// demoList.insert(7)
// demoList.insert(5)

// demoList.forEach((item, index) => {console.log('oitem:', item,'oindex:', index)})
// demoList.remove(1)
// demoList.insert(6)

// demoList.forEach((item, index) => {console.log('afteritem:', item,'afterindex:', index)})
// console.log(demoList,'demoList')

// 双向循环链表
class CircularList {
  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }
  size() {
    return this.length
  }
  clear() {
    this.constructor()
  }
  forEach(cb) {
    let node = this.head, i = 0
    let first = this.head
    while(node) {
      cb(node.data, i)
      node = node.next
      i++
      if(node === first) { break}
    }
  }
  findIndex(index) {
    let n = this.length
    if(index > n) { return }
    
  }

}