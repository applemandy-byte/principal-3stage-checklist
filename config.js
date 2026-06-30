// 開源網站版設定檔
// 1. 不填 Supabase 設定：系統會使用「本機示範模式」，帳號與資料只存在同一台裝置的瀏覽器。
// 2. 填入 Supabase 設定：系統會啟用真正的多人帳號登入與雲端資料同步。
//    請先依 README.md 建立 Supabase 專案與資料表。
window.APP_CONFIG = {
  supabaseUrl: "https://yvpiyqoajhucqrdherqk.supabase.co",
  supabaseAnonKey: "sb_publishable_qipAs5g41tYe29wqWsX4eA_F_p-sNUi",
  appName: "初任校長三階段電子檢核表",
  attachmentMaxMB: 10
};
