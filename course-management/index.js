const express = require('express');

const app = express(); 

/* 
Middleware để parse dữ liệu JSON từ request body
Khi client gửi request với Content-Type: application/json, dữ liệu sẽ được chuyển thành object JavaScript
*/
app.use(express.json()); 

/* 
Middleware để parse dữ liệu form từ request body
extended: true cho phép parse dữ liệu phức tạp (object, array)
Khi client gửi form với Content-Type: application/x-www-form-urlencoded, dữ liệu sẽ được convert thành object
==================================================================================
VÍ DỤ đơn giản:
  Raw data: name=John&age=25&city=HCM
  Parse thành: { name: 'John', age: '25', city: 'HCM' }
VÍ DỤ phức tạp (extended: true):
  Raw data: user[name]=John&user[age]=25&hobbies[0]=game&hobbies[1]=coding
  Parse thành: { user: { name: 'John', age: '25' }, hobbies: ['game', 'coding'] }
 */
app.use(express.urlencoded({ extended: true }));

// Tạo server lắng nghe port 3000
app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000/`);
});
