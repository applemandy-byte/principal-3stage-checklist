# 初任校長三階段電子檢核表｜Open Source 網站版

這是一份可自行部署的開源網站版檢核表，適合放在 GitHub Pages、Netlify、Vercel 或學校自有主機。

## 已完成的需求

- 三階段 24 項檢核完整保留，第二、第三階段會正常呈現。
- 每項可編輯：階段、面向、檢核項目、情境／檢核重點、文字策略、備註筆記、處理日期、負責／協力人員。
- 勾稽欄改為四種狀態：`已完成`、`進行中`、`規劃中`、`待解決`。
- 已去除每項原本的「佐證連結」欄位。
- 補充策略與備註筆記可手動增加附件。
- 每個檢核項目也可手動增加附件。
- 支援匯出 JSON 備份與匯入備份。
- 支援本機示範模式與 Supabase 雲端帳號模式。

## 重要說明

直接打開 `index.html` 時，系統會使用「本機示範模式」。此模式可建立帳號，但帳號與資料只存在同一台裝置、同一個瀏覽器中，適合測試，不適合正式給多人跨裝置使用。

若要讓大家都可以用自己的帳號登入、各自保存檢核結果，請設定 Supabase。

## 檔案說明

- `index.html`：主網站頁面。
- `style.css`：版面樣式。
- `app.js`：檢核表、登入、附件、匯入匯出功能。
- `config.js`：Supabase 設定。
- `database.sql`：Supabase 資料表與權限設定。
- `LICENSE`：MIT 授權。

## 啟用 Supabase 雲端帳號模式

1. 建立 Supabase 專案。
2. 在 Supabase SQL Editor 執行 `database.sql`。
3. 開啟 Supabase Authentication 的 Email/Password 登入。
4. 複製 Supabase Project URL 與 anon public key。
5. 修改 `config.js`：

```js
window.APP_CONFIG = {
  supabaseUrl: "https://你的專案.supabase.co",
  supabaseAnonKey: "你的 anon public key",
  appName: "初任校長三階段電子檢核表",
  attachmentMaxMB: 2
};
```

6. 將整個資料夾上傳至 GitHub Pages 或其他靜態網站服務。

## 附件限制

本版為了保持部署簡單，附件會以 Base64 形式儲存在個人檢核資料中。建議每個檔案 2MB 以下，適合放入小型圖片、PDF、會議紀錄、備忘截圖。若未來要大量上傳檔案，建議進一步改用 Supabase Storage 或 Google Drive API。

## 建議正式發布方式

- 將此資料夾上傳到 GitHub repository。
- Repository 可設為 Public，作為 Open Source 專案。
- GitHub Pages 指向根目錄，即可取得公開網址。
- 若有啟用 Supabase，使用者可建立自己的帳號登入並保存檢核資料。

## 資安提醒

- 本機示範模式不適合正式帳號密碼管理。
- Supabase 模式下，請務必執行 `database.sql` 開啟 Row Level Security，讓每個使用者只能存取自己的檢核資料。
- 不建議在附件中上傳敏感個資、未公開校務資料或機密文件。
