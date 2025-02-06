## mongo command

启动和禁用服务
```powershell
sc config MongoDB start= auto
sc config MongoDB start= disable
net start MongoDB
net stop MongoDB
```

mongosh
### **1️⃣ 启动 MongoDB Shell**
如果你已经安装了 `mongosh`，打开命令行并输入：
```sh
mongosh
```
这将会启动 MongoDB Shell，你会看到类似的输出：
```
test>
```
表示你已经成功连接到默认的 `test` 数据库。

### **2️⃣ 显示所有数据库**
在 MongoDB Shell 中，可以使用以下命令查看当前的所有数据库：
```sh
show databases
```
这会列出所有已经存在的数据库。

### **3️⃣ 切换数据库**
切换到你想要操作的数据库，假设要切换到 `mydb`：
```sh
use mydb
```
如果该数据库不存在，MongoDB 会创建一个空数据库。

### **4️⃣ 显示当前数据库的所有集合（表）**
在当前数据库中查看所有集合：
```sh
show collections
```
这个命令会列出数据库中所有的集合。

### **5️⃣ 创建一个新集合并插入数据**
假设你想创建一个名为 `products` 的集合，并插入一条数据：
```sh
db.products.insertOne({ name: "Product1", price: 100 })
```
这会在 `products` 集合中插入一条数据。

### **6️⃣ 查询数据**
查询 `products` 集合中的所有数据：
```sh
db.products.find()
```
如果你只想查询价格为 100 的产品：
```sh
db.products.find({ price: 100 })
```

### **7️⃣ 更新数据**
假设你想更新 `products` 集合中 `name` 为 `"Product1"` 的记录，修改它的 `price` 为 150：
```sh
db.products.updateOne(
    { name: "Product1" },
    { $set: { price: 150 } }
)
```

### **8️⃣ 删除数据**
删除 `products` 集合中 `name` 为 `"Product1"` 的记录：
```sh
db.products.deleteOne({ name: "Product1" })
```

### **9️⃣ 删除集合**
如果你想删除整个 `products` 集合：
```sh
db.products.drop()
```

### **🔟 查看数据统计信息**
查看当前集合的统计信息（例如记录数等）：
```sh
db.products.stats()
```