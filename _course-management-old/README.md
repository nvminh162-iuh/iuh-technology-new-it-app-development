```
https://eggplant-hamster-2cc.notion.site/T-i-Li-u-H-ng-D-n-Th-c-H-nh-M-n-C-ng-Ngh-M-i-Tu-n-4-5-6-7a088ab66da54697b23606922511a4b0#fb8c82f48c7e45d78c545f6eab00a8cd
```

### Tổng quan

```bash
npm i @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb ejs express express-session body-parser dotenv multer uuid

yarn add @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb ejs express express-session body-parser dotenv multer uuid
```

```bash
npm i nodemon --savedev 

yarn add nodemon --dev
```

---

### 1. `express`

- **Chức năng**: Framework web cho Node.js, giúp tạo server HTTP, định nghĩa route, middleware rất dễ.
- **Dùng để**:  
  - Tạo API (REST API)  
  - Xử lý request/response (GET, POST, PUT, DELETE, …)  
- **Ví dụ ngắn**:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.listen(3000);
```

---

### 2. `express-session`

- **Chức năng**: Quản lý session trong Express (lưu thông tin người dùng giữa các request).
- **Dùng để**:
  - Lưu trạng thái đăng nhập (login session)
  - Lưu giỏ hàng, thông tin tạm của người dùng
- **Ví dụ ngắn**:

```js
const session = require('express-session');

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.get('/set', (req, res) => {
  req.session.username = 'Minh';
  res.send('Đã set session');
});
```

---

### 3. `body-parser`

- **Chức năng**: Middleware để đọc dữ liệu body của request (form, JSON, …).
- **Dùng để**:
  - Lấy dữ liệu từ form HTML (`application/x-www-form-urlencoded`)
  - Lấy dữ liệu JSON từ client
- **Lưu ý**: Trong phiên bản Express mới, `express.json()` và `express.urlencoded()` đã thay thế được `body-parser`, nhưng nhiều code cũ vẫn dùng.

```js
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  console.log(req.body); // đọc dữ liệu gửi lên
  res.send('OK');
});
```

---

### 4. `ejs`

- **Chức năng**: Template engine (View engine) cho Express, giúp render HTML động từ server.
- **Dùng để**:
  - Tạo file `.ejs` chứa HTML + code nhúng `<%= %>`
  - Render trang HTML với dữ liệu từ server
- **Ví dụ ngắn**:

```js
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  res.render('index', { name: 'Minh' });
});
```

Trong `views/index.ejs`:

```ejs
<h1>Xin chào <%= name %></h1>
```

---

### 5. `dotenv`

- **Chức năng**: Đọc biến môi trường từ file `.env` vào `process.env`.
- **Dùng để**:
  - Lưu các giá trị nhạy cảm: mật khẩu DB, API key, secret, …
  - Tách config ra khỏi code
- **Ví dụ ngắn**:

```js
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
```

File `.env`:

```env
DB_PASSWORD=123456
```

---

### 6. `@aws-sdk/client-s3`, `@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`

- **Chức năng**: AWS SDK v3 cho Node.js (thay thế `aws-sdk` v2 đã end-of-support).
- **Dùng để**:
  - Làm việc với S3 (upload/download file)
  - Làm việc với DynamoDB (CRUD)
- **Ví dụ với S3**:

```js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({ region: 'ap-southeast-1' });

await s3.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'file.jpg',
  Body: fileBuffer,
}));
```

- **Ví dụ với DynamoDB**:

```js
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'ap-southeast-1' });
const dynamodb = DynamoDBDocumentClient.from(client);

const result = await dynamodb.send(new ScanCommand({ TableName: 'subjects' }));
console.log(result.Items);
```
