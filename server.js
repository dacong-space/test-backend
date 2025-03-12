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
  

// **添加 Render 健康检查路由**
app.get("/", (req, res) => {
  res.send("Backend is running! 🚀");
});

// **确保 Render 正确监听端口**
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});