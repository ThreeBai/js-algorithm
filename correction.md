# JavaScript算法一书 纠错

## 第2章  排序算法

### page 18 (insertSort2代码块)

    说明: 变量j的初始值错误
    正确代码如下:
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
  修改： 应为 5------1
