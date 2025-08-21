# 💰 Expense Tracker App

ระบบบันทึกและติดตามค่าใช้จ่าย (Expense Tracker) ที่พัฒนาด้วย **Next.js + Supabase**  
พร้อม Dashboard สำหรับสรุปรายจ่ายและการแสดงผลแบบกราฟ  

---

## 🚀 คุณสมบัติ (Features)

- ✅ เพิ่ม / ลบ รายการค่าใช้จ่าย  
- ✅ จัดหมวดหมู่ค่าใช้จ่าย (Categories)  
- ✅ Filter ตามช่วงวันที่ และหมวดหมู่  
- ✅ Dashboard แสดงผลรวมรายจ่ายทั้งหมด  
- ✅ กราฟวงกลม (Pie Chart) แสดงสัดส่วนค่าใช้จ่ายแต่ละหมวด  
- ✅ รองรับ Dark / Light Theme  
- ✅ Responsive ใช้งานได้ทั้งมือถือและ Desktop  

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend**: [Next.js 14](https://nextjs.org/) + React + TailwindCSS  
- **Backend**: [Supabase](https://supabase.com/) (Database + API)  
- **Chart**: [Recharts](https://recharts.org/)  
- **Deployment**: [Vercel](https://vercel.com/) 

---

## 📦 การติดตั้ง (Installation)

1. Clone โปรเจกต์
   ```bash
   git clone https://github.com/koiri-tehmalo/expense-tracker.git
   cd expense-tracker
2. ติดตั้ง dependencies
   ```bash
   npm install
   # หรือ
   yarn install
3. ตั้งค่า environment variables
   สร้างไฟล์ .env.local และใส่ค่า:
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
5. รันโปรเจกต์
   ```bash
   npm run dev
   # หรือ
   yarn dev

👨‍💻 ผู้พัฒนา
  ชื่อผู้พัฒนา: มูฮัมหมัดคอยรี เต๊ะมาลอ
  คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์
  📧 Email: khayreetehmalo@gmail.com
