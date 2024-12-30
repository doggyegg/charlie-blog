# Uniapp 跨端开发踩坑合集

1. Uni.xx 原生函数在编译时做的是词法解析替换，所以 uni.xx .和 xx 之间不能有空格，不然会导致拿到的是 undefined
   ![alt text](spaceRight.png)
   ![alt text](spaceError.png)
