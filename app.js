(() => {
  const CONFIG = window.APP_CONFIG || {};
  const MAX_ATTACHMENT_MB = Number(CONFIG.attachmentMaxMB || 2);
  const VALID_STATUS = ["已完成", "進行中", "規劃中", "待解決"];
  const VALID_PRIORITY = ["高", "中", "低"];

  const DEFAULT_ITEMS = [
    { id:"s1-01", stage:"第一階段", stageTitle:"遴選結果公告至 7 月 31 日上任前", dimension:"人際關係", title:"初任校長拜訪策略", situation:"聯繫現任校長及到校拜訪時機及注意事項。", strategy:"儘速拜訪現任校長，瞭解校務現況；表達感謝，建立良好承接關係；涉入校務切忌操之過急。" },
    { id:"s1-02", stage:"第一階段", stageTitle:"遴選結果公告至 7 月 31 日上任前", dimension:"團隊建立", title:"校務推動與人際原則", situation:"新學年度主任安排、職務分配、校事會議、性平、霸凌等棘手人事案件如何因應。", strategy:"尊重現任校長決定，建立信任關係；初期不宜大幅調整職務；處理棘手案件時，強調公平性並依法啟動程序。" },
    { id:"s1-03", stage:"第一階段", stageTitle:"遴選結果公告至 7 月 31 日上任前", dimension:"人際關係", title:"參與校務活動準則", situation:"現任校長邀請參加新學校活動、餐會、會議等，要注意哪些事項。", strategy:"展現謙遜與自信；多聽、多觀察，建立良好第一印象；避免凸顯個人表現，尊重現任校長。" },
    { id:"s1-04", stage:"第一階段", stageTitle:"遴選結果公告至 7 月 31 日上任前", dimension:"團隊建立", title:"關懷師生與行政團隊", situation:"與新學校行政團隊、老師等見面時，談論內容或話題應注意哪些。", strategy:"主動關懷老師與行政團隊；透過對話瞭解現況；避免評論既有校務運作；著重建立團隊信任與親和力。" },
    { id:"s1-05", stage:"第一階段", stageTitle:"遴選結果公告至 7 月 31 日上任前", dimension:"人際關係", title:"校長交接典禮實務", situation:"辦理校長交接典禮，含賓客名單、致詞貴賓、日期、流程等準備事項。", strategy:"交換典禮籌備慣例、費用與校內協商；建議日期落在 7 月底至 8 月初或市府發布後；與現任校長商討流程與賓客名單；展現教育薪傳與經驗傳承精神。" },
    { id:"s1-06", stage:"第一階段", stageTitle:"遴選結果公告至 7 月 31 日上任前", dimension:"人際關係", title:"掌握列管事項與規劃", situation:"現任校長交接學校重要待辦事項，包含計畫、專案、經費、工程、控案等。", strategy:"適時瞭解列管事項；虛心請益現任校長；詢問即將接手的校務與可協助的人選。" },
    { id:"s1-07", stage:"第一階段", stageTitle:"遴選結果公告至 7 月 31 日上任前", dimension:"人際關係", title:"建立外部關係網絡", situation:"拜訪家長會會長、地方民代、仕紳、里長、宮廟代表時，見面時機、方式與內容。", strategy:"主動聯繫現任校長陪同拜訪；傾聽社區現況與對學校期待；透過地方人士引薦，建立外部關係網絡。" },
    { id:"s1-08", stage:"第一階段", stageTitle:"遴選結果公告至 7 月 31 日上任前", dimension:"人際關係", title:"領導風格", situation:"遇特殊狀況，可以向誰求助。", strategy:"面對突發狀況，切勿獨自承擔或妄斷；多方求援，如教育局處、師傅校長等；以理性態度回應問題，依法行政。" },

    { id:"s2-01", stage:"第二階段", stageTitle:"8 月 1 日上任至開學前", dimension:"人際關係", title:"校長拜會社區", situation:"拜會榮譽會長、民代等地方仕紳，有何注意事項。", strategy:"尊重在地文化，建立合作關係；保持熱情、不多問、不輕易承諾；面對抱怨耐心傾聽；會後主動致謝並持續追蹤。" },
    { id:"s2-02", stage:"第二階段", stageTitle:"8 月 1 日上任至開學前", dimension:"人際關係", title:"校長暑期準備", situation:"8 月上任後，如何做好暑期準備並掌握學校脈絡。", strategy:"掌握人力配置與學生概況；巡視校園並研讀校務資料；瀏覽會議紀錄並與同仁交流；不急於指導，專注為新學年做好準備。" },
    { id:"s2-03", stage:"第二階段", stageTitle:"8 月 1 日上任至開學前", dimension:"團隊建立", title:"首次行政會議", situation:"召開第一次行政會議時，如何分享經營理念並邀約團隊展現專業。", strategy:"掌握學校願景，盤點校內外資源；營造溫馨氛圍；聚焦具體可行目標；透過雙向溝通與激勵建立互信。" },
    { id:"s2-04", stage:"第二階段", stageTitle:"8 月 1 日上任至開學前", dimension:"團隊建立", title:"校務共商原則", situation:"傾聽行政團隊、教師會、重要意見領袖對校務期待與建議時，應嚴守哪些原則。", strategy:"以學生為核心；遵循依法行政、平等參與、公開透明與重視回饋；透過定期討論兼顧包容互信；攜手合作落實策略。" },
    { id:"s2-05", stage:"第二階段", stageTitle:"8 月 1 日上任至開學前", dimension:"學校文化", title:"校長室擺設", situation:"校長室的擺設方位與空間氛圍規劃。", strategy:"以舒適與動線順暢為原則；兼顧功能與形象，呈現學校特色；營造溫馨氛圍，讓人願意安心交流。" },
    { id:"s2-06", stage:"第二階段", stageTitle:"8 月 1 日上任至開學前", dimension:"團隊建立", title:"初任校長領導", situation:"凝聚行政團隊、同仁、社區間信任之關鍵因素。", strategy:"以學生與學校為中心；維持一致且公正的處事態度；透過會議清楚傳達理念；尊重支持同仁；積極參與校內外活動，提升能見度與信任。" },
    { id:"s2-07", stage:"第二階段", stageTitle:"8 月 1 日上任至開學前", dimension:"重大事項", title:"校園環境之檢視", situation:"開學前檢視校園環境的安全性與教育性。", strategy:"完成安全巡檢並立即改善缺失；校園空間配合學生課程與學習需求；校園維護系統化，分工清楚、定期檢視。" },
    { id:"s2-08", stage:"第二階段", stageTitle:"8 月 1 日上任至開學前", dimension:"團隊建立", title:"期初校務會議", situation:"期初校務會議，是分享教育與經營理念的契機。", strategy:"分享教育理念與經營方針；肯定既有成果並提出未來發展方向；以真誠溝通建立信任與合作，避免急於改革。" },

    { id:"s3-01", stage:"第三階段", stageTitle:"開學後 1 個月", dimension:"學校文化", title:"開學典禮", situation:"開學典禮及兒童朝會致詞，校長分享理念與價值。", strategy:"尊重認知差異，強調學校簡單的核心價值；透過開學故事和朗朗上口的口號推動理念；連結學校願景，傳達有意義的內容。" },
    { id:"s3-02", stage:"第三階段", stageTitle:"開學後 1 個月", dimension:"人際關係", title:"家長會互動", situation:"校長與家長會的互動模式，以及家長日宣導學校教育理念。", strategy:"家長是辦學助力，是教育合夥人；秉持開放、誠信原則互動；多元管道徵詢意見；家長日展示教學成果與理念，建立信任與共識。" },
    { id:"s3-03", stage:"第三階段", stageTitle:"開學後 1 個月", dimension:"學校文化", title:"數位學習營造", situation:"校長如何掌握數位學習、載具應用、AI 結合等元素，營造智慧學習校園。", strategy:"以學習為本，從教師需求出發，提供增能培訓；成立教師專業學習社群；校長以身作則；強調智慧校園核心在於文化與價值。" },
    { id:"s3-04", stage:"第三階段", stageTitle:"開學後 1 個月", dimension:"重大事項", title:"多元議題融入", situation:"數位學習、雙語教學、環保、SDGs 等多元議題，初任校長如何帶領教師正向面對挑戰。", strategy:"面對挑戰不急躁；盤點資源並建立共同願景；從小規模、熟悉的議題開始推動；爭取外部資源；促進教師專業成長。" },
    { id:"s3-05", stage:"第三階段", stageTitle:"開學後 1 個月", dimension:"重大事項", title:"資源整合", situation:"盤點校內外資源、引進外部資源，支援校務推動的管道與策略。", strategy:"優先確保安全，提供充足教學支援；瞭解基金、計畫目標及資源現況；開源節流，蒐集並整合資源；適時尋求外援。" },
    { id:"s3-06", stage:"第三階段", stageTitle:"開學後 1 個月", dimension:"重大事項", title:"掌握一天關鍵事項", situation:"校長忙碌的一天，該如何掌握關鍵事項。", strategy:"以校務行事曆為依據，依輕重緩急處理校務；善用科技工具如 Google 日曆共享行程；有效率提供資訊，確保校務井然有序。" },
    { id:"s3-07", stage:"第三階段", stageTitle:"開學後 1 個月", dimension:"人際關係", title:"教師晨會／午會的溝通", situation:"如何運用教師晨會或午會，讓課程教學與行政工作做最好的溝通。", strategy:"會議著重溝通與解決問題；遇重大事件應掌握資訊；多肯定師生表現；一會一重點，精準溝通與調整。" },
    { id:"s3-08", stage:"第三階段", stageTitle:"開學後 1 個月", dimension:"困難問題", title:"危機管理", situation:"洞悉潛藏危機，讓麻煩的小事就是小事，悄悄落幕。", strategy:"敏於察覺，關注特殊學生與同仁身心狀況；與家長、社區及教育局處保持聯繫；即時處理校園事件，避免危機蔓延。" }
  ];

  const SEED_NOTES = [
    { id:"note-1", title:"可共用的領導表述", content:"我會先理解學校既有文化與努力成果，再和團隊一起確認下一步。初任階段不急於改變，而是先建立互信、掌握關鍵資料、把安全與學生學習放在最前面。", attachments:[] },
    { id:"note-2", title:"待補充的校本策略", content:"可在此加入學校願景、社區特色、行政團隊分工、家長會互動紀錄、媒體回應草稿或會議備忘。", attachments:[] }
  ];

  const state = {
    backend: null,
    mode: "local",
    user: null,
    data: null,
    activeStage: "全部",
    saveTimer: null
  };

  const $ = (id) => document.getElementById(id);

  function escapeHtml(str = "") {
    return String(str).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]));
  }

  function makeDefaultState() {
    return {
      version: 4,
      updatedAt: new Date().toISOString(),
      items: DEFAULT_ITEMS.map(item => ({
        ...item,
        status: "規劃中",
        priority: "中",
        dueDate: "",
        owner: "",
        note: "",
        attachments: [],
        isCustom: false
      })),
      notes: SEED_NOTES.map(n => ({...n, attachments: []}))
    };
  }

  function normalizeData(raw) {
    const base = makeDefaultState();
    const data = raw && typeof raw === "object" ? raw : {};
    const savedItems = Array.isArray(data.items) ? data.items : [];
    const savedById = new Map(savedItems.map(item => [item.id, item]));
    const mergedItems = base.items.map(item => {
      const saved = savedById.get(item.id) || {};
      const merged = { ...item, ...saved };
      delete merged.evidenceLink;
      merged.status = VALID_STATUS.includes(merged.status) ? merged.status : "規劃中";
      merged.priority = VALID_PRIORITY.includes(merged.priority) ? merged.priority : "中";
      merged.attachments = Array.isArray(merged.attachments) ? merged.attachments : [];
      return merged;
    });
    savedItems.filter(item => item && item.isCustom && !savedById.has(item.id + "__never")).forEach(item => {
      if (!mergedItems.some(x => x.id === item.id)) {
        const custom = { ...item };
        delete custom.evidenceLink;
        custom.status = VALID_STATUS.includes(custom.status) ? custom.status : "規劃中";
        custom.priority = VALID_PRIORITY.includes(custom.priority) ? custom.priority : "中";
        custom.attachments = Array.isArray(custom.attachments) ? custom.attachments : [];
        mergedItems.push(custom);
      }
    });
    const notes = Array.isArray(data.notes) && data.notes.length
      ? data.notes.map(n => ({ id: n.id || `note-${Date.now()}-${Math.random()}`, title: n.title || "補充策略", content: n.content || "", attachments: Array.isArray(n.attachments) ? n.attachments : [] }))
      : base.notes;
    return { version: 4, updatedAt: data.updatedAt || new Date().toISOString(), items: mergedItems, notes };
  }

  function hasSupabaseConfig() {
    return Boolean(CONFIG.supabaseUrl && CONFIG.supabaseAnonKey && window.supabase && typeof window.supabase.createClient === "function");
  }

  function localBackend() {
    const USERS_KEY = "ntpc_principal_checklist_users";
    const SESSION_KEY = "ntpc_principal_checklist_session";
    const dataKey = email => `ntpc_principal_checklist_data:${email}`;
    const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    const setUsers = users => localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return {
      label: "本機示範模式",
      async currentUser() {
        const email = localStorage.getItem(SESSION_KEY);
        if (!email) return null;
        const users = getUsers();
        return users[email] ? { id: email, email, name: users[email].name || email } : null;
      },
      async register(email, password, name) {
        const users = getUsers();
        if (users[email]) throw new Error("此帳號已存在，請直接登入。 ");
        users[email] = { password, name, createdAt: new Date().toISOString() };
        setUsers(users);
        localStorage.setItem(SESSION_KEY, email);
        return { id: email, email, name };
      },
      async login(email, password) {
        const users = getUsers();
        if (!users[email] || users[email].password !== password) throw new Error("帳號或密碼不正確。 ");
        localStorage.setItem(SESSION_KEY, email);
        return { id: email, email, name: users[email].name || email };
      },
      async logout() { localStorage.removeItem(SESSION_KEY); },
      async loadData(user) {
        const raw = localStorage.getItem(dataKey(user.email));
        return normalizeData(raw ? JSON.parse(raw) : null);
      },
      async saveData(user, data) {
        localStorage.setItem(dataKey(user.email), JSON.stringify({ ...data, updatedAt: new Date().toISOString() }));
      }
    };
  }

  function supabaseBackend() {
    const client = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
    return {
      label: "Supabase 雲端帳號模式",
      async currentUser() {
        const { data, error } = await client.auth.getUser();
        if (error || !data.user) return null;
        return { id: data.user.id, email: data.user.email, name: data.user.user_metadata?.display_name || data.user.email };
      },
      async register(email, password, name) {
        const { data, error } = await client.auth.signUp({ email, password, options: { data: { display_name: name } } });
        if (error) throw error;
        if (!data.user) throw new Error("帳號建立失敗，請稍後再試。 ");
        return { id: data.user.id, email: data.user.email, name };
      },
      async login(email, password) {
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return { id: data.user.id, email: data.user.email, name: data.user.user_metadata?.display_name || data.user.email };
      },
      async logout() { await client.auth.signOut(); },
      async loadData(user) {
        const { data, error } = await client.from("checklist_data").select("data").eq("user_id", user.id).maybeSingle();
        if (error) throw error;
        if (!data) {
          const fresh = makeDefaultState();
          await this.saveData(user, fresh);
          return fresh;
        }
        return normalizeData(data.data);
      },
      async saveData(user, data) {
        const payload = { user_id: user.id, data: { ...data, updatedAt: new Date().toISOString() }, updated_at: new Date().toISOString() };
        const { error } = await client.from("checklist_data").upsert(payload, { onConflict: "user_id" });
        if (error) throw error;
      }
    };
  }

  function setMessage(text, isError = true) {
    const el = $("authMessage");
    el.textContent = text || "";
    el.style.color = isError ? "#c53030" : "#16803c";
  }

  function setSaveLabel(text) {
    $("saveLabel").textContent = text;
  }

  async function enterApp(user) {
    state.user = user;
    $("authView").classList.add("hidden");
    $("appView").classList.remove("hidden");
    $("userLabel").textContent = `${user.name || user.email}`;
    setSaveLabel("讀取資料中…");
    state.data = await state.backend.loadData(user);
    renderAll();
    setSaveLabel("已載入");
  }

  async function saveNow() {
    if (!state.user || !state.data) return;
    try {
      setSaveLabel("儲存中…");
      await state.backend.saveData(state.user, state.data);
      setSaveLabel(`已儲存 ${new Date().toLocaleTimeString("zh-TW", { hour:"2-digit", minute:"2-digit" })}`);
    } catch (err) {
      console.error(err);
      setSaveLabel("儲存失敗：請匯出備份");
      alert("儲存失敗：" + (err.message || err));
    }
  }

  function scheduleSave() {
    setSaveLabel("有未儲存變更…");
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(saveNow, 650);
  }

  function statusClass(status) {
    return status === "已完成" ? "done" : status === "進行中" ? "doing" : status === "待解決" ? "block" : "plan";
  }

  function renderStats() {
    const items = state.data.items;
    const counts = Object.fromEntries(VALID_STATUS.map(s => [s, items.filter(i => i.status === s).length]));
    const total = items.length;
    const doneRate = total ? Math.round((counts["已完成"] / total) * 100) : 0;
    $("stats").innerHTML = `
      <div class="stat"><div class="num">${total}</div><div class="label">總項目</div></div>
      <div class="stat"><div class="num">${doneRate}%</div><div class="label">完成率</div></div>
      <div class="stat"><div class="num">${counts["已完成"]}</div><div class="label">已完成</div></div>
      <div class="stat"><div class="num">${counts["進行中"]}</div><div class="label">進行中</div></div>
      <div class="stat"><div class="num">${counts["待解決"]}</div><div class="label">待解決</div></div>
    `;
  }

  function renderItems() {
    const container = $("itemsContainer");
    const filtered = state.activeStage === "全部" ? state.data.items : state.data.items.filter(item => item.stage === state.activeStage);
    if (!filtered.length) {
      container.innerHTML = `<div class="empty">目前沒有項目。請切換階段或新增校本任務。</div>`;
      return;
    }
    container.innerHTML = filtered.map((item, idx) => itemCard(item, idx)).join("");
  }

  function itemCard(item) {
    return `
      <article class="item-card" data-id="${escapeHtml(item.id)}">
        <div class="item-head">
          <div>
            <span class="stage-pill">${escapeHtml(item.stage)}｜${escapeHtml(item.stageTitle || "")}</span>
            <div class="item-title">${escapeHtml(item.title)}</div>
          </div>
          <span class="status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
        </div>
        <div class="item-body">
          <div class="meta-grid">
            <div class="field"><label>勾稽狀態
              <select data-field="status">${VALID_STATUS.map(s => `<option ${item.status === s ? "selected" : ""}>${s}</option>`).join("")}</select>
            </label></div>
            <div class="field"><label>優先序
              <select data-field="priority">${VALID_PRIORITY.map(s => `<option ${item.priority === s ? "selected" : ""}>${s}</option>`).join("")}</select>
            </label></div>
            <div class="field"><label>處理日期
              <input data-field="dueDate" type="date" value="${escapeHtml(item.dueDate || "")}" />
            </label></div>
            <div class="field"><label>負責／協力人員
              <input data-field="owner" type="text" value="${escapeHtml(item.owner || "")}" placeholder="例如：教務主任、總務主任" />
            </label></div>
          </div>
          <div class="meta-grid">
            <div class="field"><label>階段
              <select data-field="stage">
                ${["第一階段","第二階段","第三階段"].map(s => `<option ${item.stage === s ? "selected" : ""}>${s}</option>`).join("")}
              </select>
            </label></div>
            <div class="field"><label>面向
              <input data-field="dimension" type="text" value="${escapeHtml(item.dimension || "")}" />
            </label></div>
            <div class="field" style="grid-column:span 2"><label>檢核項目
              <input data-field="title" type="text" value="${escapeHtml(item.title || "")}" />
            </label></div>
          </div>
          <div class="field"><label>情境／檢核重點
            <textarea data-field="situation">${escapeHtml(item.situation || "")}</textarea>
          </label></div>
          <div class="field"><label>文字策略
            <textarea data-field="strategy">${escapeHtml(item.strategy || "")}</textarea>
          </label></div>
          <div class="field"><label>備註筆記
            <textarea data-field="note" placeholder="可記錄處理歷程、會議重點、提醒事項或後續追蹤。">${escapeHtml(item.note || "")}</textarea>
          </label></div>
          <div class="attachment-box">
            <div class="actions-row">
              <strong>附件</strong><span class="small">可手動新增檔案；建議單檔 ${MAX_ATTACHMENT_MB}MB 以下。</span>
              <label class="file-button">新增附件<input type="file" multiple data-attach-scope="item" data-id="${escapeHtml(item.id)}" /></label>
              ${item.isCustom ? `<button class="mini danger" type="button" data-delete-item="${escapeHtml(item.id)}">刪除此校本任務</button>` : ""}
            </div>
            <div class="attachment-list">${renderAttachments(item.attachments || [], "item", item.id)}</div>
          </div>
        </div>
      </article>`;
  }

  function renderNotes() {
    const container = $("notesContainer");
    if (!state.data.notes.length) {
      container.innerHTML = `<div class="empty">尚未新增補充策略。請按「新增補充策略」。</div>`;
      return;
    }
    container.innerHTML = state.data.notes.map(note => `
      <article class="note-card" data-note-id="${escapeHtml(note.id)}">
        <div class="note-head">
          <input data-note-field="title" type="text" value="${escapeHtml(note.title || "補充策略")}" />
          <button class="mini danger" type="button" data-delete-note="${escapeHtml(note.id)}">刪除</button>
        </div>
        <div class="note-body">
          <textarea data-note-field="content" placeholder="請輸入可複用的文字策略、會議說法、提醒事項或校本紀錄。">${escapeHtml(note.content || "")}</textarea>
          <div class="attachment-box">
            <div class="actions-row">
              <strong>筆記附件</strong>
              <label class="file-button">新增附件<input type="file" multiple data-attach-scope="note" data-id="${escapeHtml(note.id)}" /></label>
            </div>
            <div class="attachment-list">${renderAttachments(note.attachments || [], "note", note.id)}</div>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderAttachments(attachments, scope, parentId) {
    if (!attachments.length) return `<div class="small">尚未加入附件。</div>`;
    return attachments.map(att => `
      <div class="attachment-row">
        <a class="attachment-name" href="${escapeHtml(att.dataUrl || "#")}" download="${escapeHtml(att.name || "attachment")}">${escapeHtml(att.name || "未命名附件")}</a>
        <span class="attachment-meta">${formatBytes(att.size || 0)}</span>
        <button type="button" class="mini danger" data-delete-attachment="${escapeHtml(att.id)}" data-scope="${scope}" data-parent="${escapeHtml(parentId)}">刪除</button>
      </div>`).join("");
  }

  function renderAll() {
    renderStats();
    renderItems();
    renderNotes();
  }

  function findItem(id) { return state.data.items.find(item => item.id === id); }
  function findNote(id) { return state.data.notes.find(note => note.id === id); }

  function updateItemField(card, field, value) {
    const item = findItem(card.dataset.id);
    if (!item) return;
    item[field] = value;
    if (field === "status") {
      const pill = card.querySelector(".status-pill");
      pill.textContent = value;
      pill.className = `status-pill ${statusClass(value)}`;
      renderStats();
    }
    if (field === "title") {
      const title = card.querySelector(".item-title");
      if (title) title.textContent = value;
    }
    scheduleSave();
  }

  function updateNoteField(card, field, value) {
    const note = findNote(card.dataset.noteId);
    if (!note) return;
    note[field] = value;
    scheduleSave();
  }

  function formatBytes(bytes) {
    if (!bytes) return "0 KB";
    const units = ["B", "KB", "MB", "GB"];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0)} ${units[i]}`;
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function addAttachments(input) {
    const scope = input.dataset.attachScope;
    const id = input.dataset.id;
    const files = Array.from(input.files || []);
    input.value = "";
    if (!files.length) return;
    const maxBytes = MAX_ATTACHMENT_MB * 1024 * 1024;
    const accepted = [];
    for (const file of files) {
      if (file.size > maxBytes) {
        alert(`「${file.name}」超過 ${MAX_ATTACHMENT_MB}MB，請改用較小檔案或外部雲端連結。`);
        continue;
      }
      const dataUrl = await fileToDataUrl(file);
      accepted.push({ id: `att-${Date.now()}-${Math.random().toString(16).slice(2)}`, name: file.name, size: file.size, type: file.type, createdAt: new Date().toISOString(), dataUrl });
    }
    if (!accepted.length) return;
    if (scope === "item") {
      const item = findItem(id);
      if (item) item.attachments = [...(item.attachments || []), ...accepted];
    } else {
      const note = findNote(id);
      if (note) note.attachments = [...(note.attachments || []), ...accepted];
    }
    renderAll();
    scheduleSave();
  }

  function deleteAttachment(button) {
    const scope = button.dataset.scope;
    const parent = button.dataset.parent;
    const attId = button.dataset.deleteAttachment;
    const target = scope === "item" ? findItem(parent) : findNote(parent);
    if (!target) return;
    target.attachments = (target.attachments || []).filter(att => att.id !== attId);
    renderAll();
    scheduleSave();
  }

  function addCustomItem() {
    const stage = state.activeStage === "全部" ? "第一階段" : state.activeStage;
    const title = prompt("請輸入新增校本任務名稱：", "校本補充任務");
    if (!title) return;
    const stageTitle = stage === "第一階段" ? "遴選結果公告至 7 月 31 日上任前" : stage === "第二階段" ? "8 月 1 日上任至開學前" : "開學後 1 個月";
    state.data.items.push({
      id: `custom-${Date.now()}`,
      stage,
      stageTitle,
      dimension: "校本補充",
      title,
      situation: "請輸入情境／檢核重點。",
      strategy: "請輸入文字策略。",
      status: "規劃中",
      priority: "中",
      dueDate: "",
      owner: "",
      note: "",
      attachments: [],
      isCustom: true
    });
    renderAll();
    scheduleSave();
  }

  function addNote() {
    state.data.notes.unshift({ id: `note-${Date.now()}`, title: "新增補充策略", content: "", attachments: [] });
    renderNotes();
    scheduleSave();
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `三階段檢核表備份_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importBackup(file) {
    if (!file) return;
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      state.data = normalizeData(parsed);
      renderAll();
      await saveNow();
      alert("匯入完成。 ");
    } catch (err) {
      alert("匯入失敗：檔案格式不是有效 JSON。 ");
    }
  }

  function resetDefault() {
    if (!confirm("確定要恢復預設三階段 24 項？現有填寫內容會被清除。建議先匯出備份。")) return;
    state.data = makeDefaultState();
    renderAll();
    scheduleSave();
  }

  function bindEvents() {
    $("loginTab").addEventListener("click", () => {
      $("loginTab").classList.add("active"); $("registerTab").classList.remove("active");
      $("loginForm").classList.remove("hidden"); $("registerForm").classList.add("hidden");
      setMessage("");
    });
    $("registerTab").addEventListener("click", () => {
      $("registerTab").classList.add("active"); $("loginTab").classList.remove("active");
      $("registerForm").classList.remove("hidden"); $("loginForm").classList.add("hidden");
      setMessage("");
    });
    $("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      setMessage("登入中…", false);
      try {
        const user = await state.backend.login($("loginEmail").value.trim(), $("loginPassword").value);
        await enterApp(user);
      } catch (err) { setMessage(err.message || String(err)); }
    });
    $("registerForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      setMessage("建立帳號中…", false);
      try {
        const user = await state.backend.register($("registerEmail").value.trim(), $("registerPassword").value, $("registerName").value.trim());
        await enterApp(user);
      } catch (err) { setMessage(err.message || String(err)); }
    });
    $("logoutBtn").addEventListener("click", async () => {
      await saveNow();
      await state.backend.logout();
      location.reload();
    });
    document.querySelectorAll(".stage-btn").forEach(btn => btn.addEventListener("click", () => {
      document.querySelectorAll(".stage-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeStage = btn.dataset.stage;
      renderItems();
    }));
    $("addItemBtn").addEventListener("click", addCustomItem);
    $("addNoteBtn").addEventListener("click", addNote);
    $("exportBtn").addEventListener("click", exportBackup);
    $("importInput").addEventListener("change", e => importBackup(e.target.files[0]));
    $("resetBtn").addEventListener("click", resetDefault);

    $("itemsContainer").addEventListener("input", (e) => {
      const field = e.target.dataset.field;
      if (!field) return;
      const card = e.target.closest(".item-card");
      if (card) updateItemField(card, field, e.target.value);
    });
    $("itemsContainer").addEventListener("change", (e) => {
      if (e.target.dataset.attachScope) return addAttachments(e.target);
      const field = e.target.dataset.field;
      if (!field) return;
      const card = e.target.closest(".item-card");
      if (card) updateItemField(card, field, e.target.value);
    });
    $("itemsContainer").addEventListener("click", (e) => {
      const delAtt = e.target.closest("[data-delete-attachment]");
      if (delAtt) return deleteAttachment(delAtt);
      const delItem = e.target.closest("[data-delete-item]");
      if (delItem && confirm("確定刪除此校本任務？")) {
        state.data.items = state.data.items.filter(item => item.id !== delItem.dataset.deleteItem);
        renderAll(); scheduleSave();
      }
    });

    $("notesContainer").addEventListener("input", (e) => {
      const field = e.target.dataset.noteField;
      if (!field) return;
      const card = e.target.closest(".note-card");
      if (card) updateNoteField(card, field, e.target.value);
    });
    $("notesContainer").addEventListener("change", (e) => {
      if (e.target.dataset.attachScope) return addAttachments(e.target);
    });
    $("notesContainer").addEventListener("click", (e) => {
      const delAtt = e.target.closest("[data-delete-attachment]");
      if (delAtt) return deleteAttachment(delAtt);
      const delNote = e.target.closest("[data-delete-note]");
      if (delNote && confirm("確定刪除此補充策略筆記？")) {
        state.data.notes = state.data.notes.filter(note => note.id !== delNote.dataset.deleteNote);
        renderNotes(); scheduleSave();
      }
    });
  }

  async function init() {
    state.mode = hasSupabaseConfig() ? "supabase" : "local";
    state.backend = state.mode === "supabase" ? supabaseBackend() : localBackend();
    $("modeBadge").textContent = state.mode === "supabase" ? "雲端帳號模式：已啟用 Supabase" : "本機示範模式：可直接試用，正式多人使用請設定 Supabase";
    bindEvents();
    const user = await state.backend.currentUser();
    if (user) await enterApp(user);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
