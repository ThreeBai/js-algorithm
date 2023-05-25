# JavaScript算法一书 纠错

## 第2章  排序算法

### page 18 (insertSort2代码块)

    说明: 变量j的初始值错误
    修正:
  ``` javascript
  function insertSort2(array) {
      let n = array.length
      for( let i =1; i < n; i++) {
        let target = array[i]
        let j = i
        while( j > 0 && array[j - 1] > target) {
          array[j] = array[j - 1]
          j--
        }
        array[j] = target
      }
    }
  ```

### page 19 (图2-9 以4为增量分组)
  说明： 增量为4的第一组数据3-----1错误
  修正： 应为 5------1

### page 30  (图2-17 快速排序第一列)
  说明： 第一列数据第八个数错误
  修正： 将10修改为0

### page 31 (挖坑法步骤一)
  说明： “这里选择第1个元素”错误
  修正： 应为“选择最后1个元素”

### page42 (getBucketNumber方法)
  说明： 代码逻辑错误
  修正： 
  ```javascript
  function getBucketNumber(num, i) {
    return Math.floor((num / Math.pow(10, i - 1)) % 10)
  }
  ```
## 第3章  链表
### page56 (双向链表的插入insertAt方法)
  说明： 缺少在非空链表头部插入的逻辑
  修正： 
  ```javascript
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
  ```