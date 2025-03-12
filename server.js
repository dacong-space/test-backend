const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "admin_users.json";

// 读取管理员账户
const getUsers = () => {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
};

// 登录 API
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const adminUsers = getUsers();
  
    const validUser = adminUsers.find(
      (user) => user.username === username && user.password === password
    );
  
    if (validUser) {
      res.json({ success: true, message: "Login successful" }); // ✅ 确保返回 JSON
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });
  

// 启动服务器
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
