"use client";

import { useState } from "react";

import { areaFees, extras, products, splitAC, windowAC, type FeeItem } from "./pricing-data";
const money = (value: number) => `NT$ ${value.toLocaleString("zh-TW")}`;
const wallGroup = (item: FeeItem) => item.id.startsWith("tv-own-") ? "own"
  : item.id.startsWith("tv-kit-") ? "kit"
  : item.id === "tv-existing" || item.id === "tv-special-wall" ? "other"
  : null;
const wallGroupLabel = (group: ReturnType<typeof wallGroup>) => group === "own" ? "自備架"
  : group === "kit" ? "含架安裝"
  : group === "other" ? "特殊施工"
  : null;
const areaOptions = Object.entries(areaFees).flatMap(([fee, info]) =>
  info.places.split("、").map((place) => ({
    value: `${fee}:${place}`,
    fee: info.price,
    place,
  })),
);
const quickProductIds = ["tv55", "washer12", "fridge399", "split36", "window32"];
type ProductCategory = "電視" | "冰箱" | "洗衣機" | "冷氣" | "小家電" | "影音";
const productCategories: Array<{ id: ProductCategory; hint: string }> = [
  { id: "電視", hint: "液晶電視" },
  { id: "冰箱", hint: "單雙門／對開" },
  { id: "洗衣機", hint: "直立／滾筒" },
  { id: "冷氣", hint: "分離／窗型" },
  { id: "小家電", hint: "廚電／生活" },
  { id: "影音", hint: "劇院／音響" },
];
const preferredExtras: Record<"appliance" | "split" | "window", string[]> = {
  appliance: ["door", "fridge-door", "washer-stack", "tv-own-fixed59", "tv-existing"],
  split: ["ac-remove11", "pipe23", "duct80", "hole25", "galv-small", "socket"],
  window: ["window-frame", "window-hang", "window-cover", "socket", "awning-small", "iron-hollow"],
};

export default function Home() {
  const [mode, setMode] = useState<"appliance" | "split" | "window">("appliance");
  const [productCategory, setProductCategory] = useState<ProductCategory>("電視");
  const [productId, setProductId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [area, setArea] = useState(areaOptions[0].value);
  const [noElevator, setNoElevator] = useState(false);
  const [floor, setFloor] = useState(3);
  const [showAllExtras, setShowAllExtras] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});
  const [globalQuery, setGlobalQuery] = useState("");
  const [feeQuery, setFeeQuery] = useState("");
  const [feeFilter, setFeeFilter] = useState("全部");
  const [showAllFees, setShowAllFees] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const currentList = productCategory === "電視" ? products.filter((item) => item.category === "電視")
    : productCategory === "冰箱" ? products.filter((item) => item.category === "冰箱")
    : productCategory === "洗衣機" ? products.filter((item) => item.category === "洗衣")
    : productCategory === "小家電" ? products.filter((item) => item.category === "小型家電")
    : productCategory === "影音" ? products.filter((item) => item.category === "影音")
    : [...splitAC, ...windowAC];
  const current = currentList.find((item) => item.id === productId) ?? currentList[0];

  const switchCategory = (next: ProductCategory) => {
    const list = next === "電視" ? products.filter((item) => item.category === "電視")
      : next === "冰箱" ? products.filter((item) => item.category === "冰箱")
      : next === "洗衣機" ? products.filter((item) => item.category === "洗衣")
      : next === "小家電" ? products.filter((item) => item.category === "小型家電")
      : next === "影音" ? products.filter((item) => item.category === "影音")
      : [...splitAC, ...windowAC];
    setProductCategory(next);
    setMode(next === "冷氣" ? "split" : "appliance");
    setProductId(list[0].id);
  };

  const selectProduct = (id: string) => {
    setProductId(id);
    if (splitAC.some((item) => item.id === id)) setMode("split");
    else if (windowAC.some((item) => item.id === id)) setMode("window");
    else setMode("appliance");
  };

  const extraTotal = Object.entries(selectedExtras).reduce((sum, [id, qty]) => {
    const fee = extras.find((item) => item.id === id);
    return sum + (fee?.price ?? 0) * qty;
  }, 0);
  const orderableItems = [...products, ...splitAC, ...windowAC];
  const cartRows = Object.entries(cart)
    .map(([id, qty]) => ({ item: orderableItems.find((entry) => entry.id === id), qty }))
    .filter((row): row is { item: FeeItem; qty: number } => Boolean(row.item));
  const cartHasSplit = cartRows.some((row) => splitAC.some((item) => item.id === row.item.id));
  const cartHasWindow = cartRows.some((row) => windowAC.some((item) => item.id === row.item.id));
  const cartHasAppliance = cartRows.some((row) => products.some((item) => item.id === row.item.id));
  const extraCategories = new Set<string>();
  if (mode === "appliance" || cartHasAppliance) ["一般加項", "電視壁掛", "電視安裝", "影音安裝"].forEach((value) => extraCategories.add(value));
  if (mode === "split" || cartHasSplit) ["分離式冷氣", "冷氣共用"].forEach((value) => extraCategories.add(value));
  if (mode === "window" || cartHasWindow) ["窗型冷氣", "冷氣共用"].forEach((value) => extraCategories.add(value));
  const relevantExtras = extras.filter((item) => extraCategories.has(item.category));
  const preferredIds = Array.from(new Set([
    ...Object.keys(selectedExtras),
    ...preferredExtras[mode],
    ...(cartHasAppliance ? preferredExtras.appliance : []),
    ...(cartHasSplit ? preferredExtras.split : []),
    ...(cartHasWindow ? preferredExtras.window : []),
  ]));
  const sortedExtras = [...relevantExtras].sort((a, b) => {
    const aIndex = preferredIds.indexOf(a.id);
    const bIndex = preferredIds.indexOf(b.id);
    return (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex);
  });
  const availableExtras = showAllExtras ? sortedExtras : sortedExtras.slice(0, 6);
  const baseTotal = cartRows.reduce((sum, row) => sum + (row.item.price ?? 0) * row.qty, 0);
  const selectedArea = areaOptions.find((option) => option.value === area) ?? areaOptions[0];
  const areaTotal = cartRows.length ? (selectedArea.fee ?? 0) : 0;
  const stairUnits = noElevator ? Math.max(0, floor - 2) : 0;
  const stairTotal = cartRows.reduce(
    (sum, row) => sum + (row.item.stairRate ?? 0) * stairUnits * row.qty,
    0,
  );
  const total = baseTotal + areaTotal + stairTotal + extraTotal;

  const allFees = [...products, ...splitAC, ...windowAC, ...extras];
  const filterOptions = ["全部", ...Array.from(new Set(allFees.map((item) => item.category)))];
  const filteredFees = allFees.filter((item) => {
    const haystack = `${item.category}${item.name}${item.note ?? ""}`.toLowerCase();
    return (feeFilter === "全部" || item.category === feeFilter) && haystack.includes(feeQuery.toLowerCase());
  });
  const feeLimit = showAllFees || feeQuery || feeFilter !== "全部" ? 80 : 12;

  const normalizedGlobalQuery = globalQuery.trim().toLowerCase();
  const globalResults = normalizedGlobalQuery ? [
    ...orderableItems.map((item) => ({
      kind: "商品" as const,
      id: item.id,
      title: item.name,
      meta: item.category,
      price: item.price,
      value: item.id,
      searchText: `${item.category}${item.name}${item.note ?? ""}`.toLowerCase(),
    })),
    ...areaOptions.map((option) => ({
      kind: "地區" as const,
      id: `area-${option.value}`,
      title: option.place,
      meta: "跨區配送",
      price: option.fee,
      value: option.value,
      searchText: `${option.place}跨區配送`.toLowerCase(),
    })),
    ...extras.map((item) => ({
      kind: "施工" as const,
      id: `extra-${item.id}`,
      title: item.name,
      meta: item.category,
      price: item.price,
      value: item.id,
      searchText: `${item.category}${item.name}${item.note ?? ""}`.toLowerCase(),
    })),
  ].filter((result) => result.searchText.includes(normalizedGlobalQuery)).slice(0, 8) : [];

  const setExtra = (id: string, value: number) => {
    setSelectedExtras((prev) => {
      const next = { ...prev };
      if (value <= 0) delete next[id];
      else next[id] = value;
      return next;
    });
  };

  const addToCart = () => {
    setCart((prev) => ({ ...prev, [current.id]: (prev[current.id] ?? 0) + quantity }));
    setQuantity(1);
  };

  const addQuickItem = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const goToCalculator = () => {
    window.setTimeout(() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const applyGlobalResult = (result: (typeof globalResults)[number]) => {
    if (result.kind === "商品") {
      const item = orderableItems.find((entry) => entry.id === result.value);
      if (!item) return;
      const nextCategory: ProductCategory = item.category === "電視" ? "電視"
        : item.category === "冰箱" ? "冰箱"
        : item.category === "洗衣" ? "洗衣機"
        : item.category === "小型家電" ? "小家電"
        : item.category === "影音" ? "影音"
        : "冷氣";
      setProductCategory(nextCategory);
      selectProduct(item.id);
      addQuickItem(item.id);
    } else if (result.kind === "地區") {
      setArea(result.value);
    } else {
      setShowAllExtras(true);
      setExtra(result.value, 1);
    }
    setGlobalQuery("");
    goToCalculator();
  };

  const setCartQuantity = (id: string, value: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (value <= 0) delete next[id];
      else next[id] = value;
      return next;
    });
  };

  const selectedExtraRows = Object.entries(selectedExtras)
    .map(([id, qty]) => ({ item: extras.find((fee) => fee.id === id), qty }))
    .filter((row): row is { item: FeeItem; qty: number } => Boolean(row.item));
  const hasQuoteItems = selectedArea.fee === null || selectedExtraRows.some((row) => row.item.price === null);
  const hasEstimateItems = cartRows.length > 0 || selectedExtraRows.length > 0;

  const copyEstimate = async () => {
    const lines = [
      "【家電配送安裝試算明細】",
      `配送地點：${selectedArea.place}`,
      `搬運方式：${noElevator ? `無電梯 ${floor} 樓` : "有電梯（免樓層費）"}`,
      "",
      ...cartRows.map(({ item, qty }) => `商品｜${item.name} × ${qty}｜${money((item.price ?? 0) * qty)}`),
      ...(cartRows.length ? [
        `跨區費｜${selectedArea.fee === null ? "另議" : money(areaTotal)}`,
        ...(stairTotal > 0 ? [`樓層搬運費｜${money(stairTotal)}`] : []),
      ] : []),
      ...selectedExtraRows.map(({ item, qty }) => `加項｜${item.name} × ${qty}｜${item.price === null ? "另議" : money(item.price * qty)}`),
      "",
      `${hasQuoteItems ? "已知費用合計" : "預估合計"}｜${money(total)}`,
      ...(hasQuoteItems ? ["提醒｜另議項目未計入合計"] : []),
      "實際收費以門市與現場施工評估為準。",
    ];

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    window.setTimeout(() => setCopyStatus("idle"), 2200);
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddFromTable = (item: FeeItem) => {
    if (products.some((p) => p.id === item.id) || splitAC.some((p) => p.id === item.id) || windowAC.some((p) => p.id === item.id)) {
      addQuickItem(item.id);
      setToastMessage(`已將「${item.name}」加入清單`);
    } else {
      setExtra(item.id, (selectedExtras[item.id] ?? 0) + 1);
      setToastMessage(`已將「${item.name}」加入施工加項`);
    }
    window.setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <main>
      {toastMessage && (
        <div className="toast-pill" role="status" aria-live="polite">
          <span>{toastMessage}</span>
          <a href="#calculator" onClick={() => setToastMessage(null)}>查看明細 →</a>
        </div>
      )}
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到頁首">
          <span>家電配送安裝費試算</span>
        </a>
        <nav aria-label="主要導覽">
          <a href="#calculator">費用試算</a>
          <a href="#fees">完整價目</a>
          <a href="#notes">計費說明</a>
        </nav>
      </header>

      <section className="calculator-section hero-app-section" id="calculator">
        <div className="section-heading">
          <p className="eyebrow"><span /> 配送安裝計費 · 價格含稅</p>
          <h2>家電配送安裝費用試算</h2>
          <p>選擇商品規格、配送地點與樓層，系統即時計算運費及施工加項，同址配送跨區費只計一次。</p>

          <div className="universal-search-wrap">
            <label className="universal-search">
              <span aria-hidden="true">⌕</span>
              <input
                value={globalQuery}
                onChange={(event) => setGlobalQuery(event.target.value)}
                placeholder="快速搜尋商品型號、配送鄉鎮或施工項目…"
                aria-label="快速搜尋"
                aria-expanded={globalResults.length > 0}
                aria-controls="universal-results"
                aria-autocomplete="list"
                role="combobox"
                autoComplete="off"
              />
              {globalQuery && <button type="button" onClick={() => setGlobalQuery("")} aria-label="清除搜尋">×</button>}
            </label>
            {globalQuery && (
              <div className="universal-results" id="universal-results" role="listbox" aria-label="萬用搜尋結果">
                {globalResults.length > 0 ? globalResults.map((result) => (
                  <button key={`${result.kind}-${result.id}`} type="button" onClick={() => applyGlobalResult(result)} role="option" aria-selected="false">
                    <span className={`result-kind kind-${result.kind}`}>{result.kind}</span>
                    <span className="result-copy"><b>{result.title}</b><small>{result.meta}</small></span>
                    <span className="result-price">{result.price === null ? "另議" : money(result.price)}</span>
                    <span className="result-action">{result.kind === "商品" ? "＋加入清單" : result.kind === "地區" ? "帶入地點" : "選取加項"} →</span>
                  </button>
                )) : <p>查無相符項目，可嘗試搜尋「冰箱」、「楠梓」或「壁掛」。</p>}
              </div>
            )}
            <div className="search-shortcuts" aria-label="常用搜尋">
              <span>快速篩選：</span>
              {["冰箱", "分離式", "電視", "洗衣機", "楠梓", "壁掛"].map((word) => (
                <button key={word} type="button" onClick={() => setGlobalQuery(word)}>{word}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="category-tabs" role="tablist" aria-label="商品分類">
          {productCategories.map((category) => (
            <button
              key={category.id}
              className={productCategory === category.id ? "category-tab active" : "category-tab"}
              onClick={() => switchCategory(category.id)}
              role="tab"
              aria-selected={productCategory === category.id}
            >
              <span>{category.id}</span><small>{category.hint}</small>
            </button>
          ))}
        </div>

        <div className="calculator-grid">
          <div className="calculator-form">
            {/* Step 01 */}
            <div className="step-block">
              <div className={`step-title ${cartRows.length > 0 ? "completed" : ""}`}>
                <b>{cartRows.length > 0 ? "✓" : "01"}</b>
                <div>
                  <h3>選擇商品</h3>
                  <p>{cartRows.length > 0 ? `已加入 ${cartRows.reduce((sum, row) => sum + row.qty, 0)} 件商品（可繼續加入其他規格）` : "點選規格膠囊或選單加入清單"}</p>
                </div>
              </div>

              {/* 規格按鈕膠囊 (Spec Chips) */}
              <div className="spec-chips-wrap">
                <span className="spec-chips-label">{productCategory}常用規格：</span>
                <div className="spec-chips">
                  {currentList.slice(0, 6).map((item) => (
                    <button
                      key={`chip-${item.id}`}
                      type="button"
                      className={`spec-chip ${productId === item.id ? "active" : ""}`}
                      onClick={() => selectProduct(item.id)}
                    >
                      {item.name.replace(/^液晶電視 |^冰箱／冷凍櫃 |^滾筒洗衣機 |^洗衣機 |^1 對 1｜|^窗型／直立式｜/, "")} · {item.price ? money(item.price) : "另議"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-grid add-grid">
                <label className="field wide">
                  <span>{productCategory}完整型號規格</span>
                  <select value={productId} onChange={(e) => selectProduct(e.target.value)}>
                    {productCategory === "冷氣" ? (
                      <>
                        <optgroup label="分離式冷氣">
                          {splitAC.map((item) => <option key={item.id} value={item.id}>{item.name} — {money(item.price ?? 0)}</option>)}
                        </optgroup>
                        <optgroup label="窗型／直立式／移動式冷氣">
                          {windowAC.map((item) => <option key={item.id} value={item.id}>{item.name} — {money(item.price ?? 0)}</option>)}
                        </optgroup>
                      </>
                    ) : (
                      <optgroup label={productCategory}>
                        {currentList.map((item) => <option key={item.id} value={item.id}>{item.name} — {money(item.price ?? 0)}</option>)}
                      </optgroup>
                    )}
                  </select>
                </label>
                <label className="field">
                  <span>數量</span>
                  <div className="stepper">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="減少數量">−</button>
                    <input aria-label="商品數量" min="1" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))} />
                    <button onClick={() => setQuantity(quantity + 1)} aria-label="增加數量">＋</button>
                  </div>
                </label>
                <button className="add-product" onClick={addToCart}>＋ 加入清單</button>
              </div>
              {current.note && <p className="inline-note">{current.note}</p>}
              
              <div className="cart-stack" aria-label="本次配送商品清單">
                {cartRows.length === 0 ? (
                  <div className="cart-empty"><b>尚未加入商品</b><span>請選擇上方規格與數量後點擊「＋加入清單」</span></div>
                ) : cartRows.map(({ item, qty }) => (
                  <div className="cart-row" key={`cart-${item.id}`}>
                    <div className="cart-index">{String(cartRows.findIndex((row) => row.item.id === item.id) + 1).padStart(2, "0")}</div>
                    <div className="cart-name"><b>{item.name}</b><small>{money(item.price ?? 0)}／{item.unit}</small></div>
                    <div className="mini-stepper cart-stepper">
                      <button onClick={() => setCartQuantity(item.id, qty - 1)} aria-label={`減少${item.name}`}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => setCartQuantity(item.id, qty + 1)} aria-label={`增加${item.name}`}>＋</button>
                    </div>
                    <strong>{money((item.price ?? 0) * qty)}</strong>
                    <button className="remove-product" onClick={() => setCartQuantity(item.id, 0)} aria-label={`移除${item.name}`}>移除</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 02 */}
            <div className="step-block">
              <div className="step-title completed">
                <b>02</b>
                <div>
                  <h3>配送地點與樓層</h3>
                  <p>送達 <b>{selectedArea.place}</b> ｜ 搬運：{noElevator ? `無電梯 ${floor} 樓` : "有電梯（免樓層費）"}</p>
                </div>
              </div>
              <div className="field-grid two">
                <label className="field">
                  <span>鄉鎮／區域</span>
                  <select value={area} onChange={(e) => setArea(e.target.value)}>
                    {areaOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.place}｜跨區費 {option.fee === null ? "另議" : `+${money(option.fee)}`}</option>
                    ))}
                  </select>
                </label>
                <div className="field">
                  <span>搬運方式</span>
                  <div className="delivery-switch" role="group" aria-label="搬運方式">
                    <button className={!noElevator ? "active" : ""} onClick={() => setNoElevator(false)}>有電梯（免樓層費）</button>
                    <button className={noElevator ? "active" : ""} onClick={() => setNoElevator(true)}>無電梯</button>
                  </div>
                  {noElevator && (
                    <label className="floor-select">
                      <span>送達</span>
                      <select value={floor} onChange={(e) => setFloor(Number(e.target.value))}>
                        {[3,4,5,6,7,8,9,10].map((value) => <option key={value} value={value}>{value} 樓</option>)}
                      </select>
                    </label>
                  )}
                </div>
              </div>
              <p className="condition-summary">配送至 <b>{selectedArea.place}</b> ｜ 跨區運費：{selectedArea.fee === null ? "另議" : money(selectedArea.fee)} ｜ 搬運：{noElevator ? `無電梯 ${floor} 樓` : "有電梯（免樓層費）"}</p>
            </div>

            {/* Step 03 */}
            <div className="step-block">
              <div className={`step-title ${selectedExtraRows.length > 0 ? "completed" : ""}`}>
                <b>{selectedExtraRows.length > 0 ? "✓" : "03"}</b>
                <div>
                  <h3>施工與安裝加項</h3>
                  <p>{selectedExtraRows.length > 0 ? `已選取 ${selectedExtraRows.length} 項加項施工` : "如需壁掛、拆舊機、拉管線等特殊施工可在此勾選（可略過）"}</p>
                </div>
              </div>
              <div className="extras-grid">
                {availableExtras.map((item) => {
                  const qty = selectedExtras[item.id] ?? 0;
                  const needsQuote = item.price === null;
                  const group = wallGroup(item);
                  return (
                    <div className={`${qty > 0 ? "extra-card selected" : "extra-card"}${needsQuote ? " quote-only" : ""}${group ? ` wall-${group}` : ""}`} key={item.id}>
                      <button className="extra-info" onClick={() => setExtra(item.id, qty > 0 ? 0 : 1)} aria-pressed={qty > 0}>
                        <span className="check-mark">{qty > 0 ? "✓" : needsQuote ? "詢" : "+"}</span>
                        <span>{group && <em className="wall-group-badge">{wallGroupLabel(group)}</em>}<b>{item.name}</b><small>{needsQuote ? (qty > 0 ? "已加入 · 現場報價" : "點此加入另議清單") : `${item.price !== null ? money(item.price) : "另議"}／${item.unit}`}</small></span>
                      </button>
                      {qty > 0 && !needsQuote && (
                        <div className="mini-stepper">
                          <button onClick={() => setExtra(item.id, qty - 1)} aria-label={`減少${item.name}`}>−</button>
                          <span>{qty}</span>
                          <button onClick={() => setExtra(item.id, qty + 1)} aria-label={`增加${item.name}`}>＋</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {sortedExtras.length > 6 && (
                <button className="more-extras" onClick={() => setShowAllExtras((value) => !value)}>
                  {showAllExtras ? "收起加項" : `展開其餘 ${sortedExtras.length - 6} 項`}
                </button>
              )}
            </div>
          </div>

          <aside className="estimate-card" id="estimate" aria-live="polite">
            <div className="estimate-label"><span className="live-dot">費用試算明細</span><small>價格含稅</small></div>
            <h3>{cartRows.length ? `同址配送（共 ${cartRows.reduce((sum, row) => sum + row.qty, 0)} 件）` : "尚未選擇商品"}</h3>
            <div className="estimate-total"><small>{hasQuoteItems ? "已知費用合計" : "預估合計"}</small><strong>{money(total)}</strong></div>
            <div className="estimate-lines">
              {cartRows.map(({ item, qty }) => (
                <div key={`summary-${item.id}`}><span>{item.name} × {qty}</span><b>{money((item.price ?? 0) * qty)}</b></div>
              ))}
              {cartRows.length > 0 && <div className="summary-subtotal"><span>商品基本費小計</span><b>{money(baseTotal)}</b></div>}
              {cartRows.length > 0 && <div><span>{selectedArea.place}跨區費（同址一次）</span><b>{selectedArea.fee === null ? "另議" : money(areaTotal)}</b></div>}
              {stairTotal > 0 && <div><span>樓層搬運費</span><b>{money(stairTotal)}</b></div>}
              {selectedExtraRows.map(({ item, qty }) => (
                <div key={item.id}><span>{item.name} × {qty}</span><b>{item.price === null ? "另議" : money(item.price * qty)}</b></div>
              ))}
            </div>
            {hasQuoteItems && <p className="quote-warning"><b>另議項目未計入合計</b><br />特殊施工與未列項目，費用依現場評估確認為準。</p>}
            <div className="estimate-footer">
              <p><b>計費說明</b><br />同址多件商品跨區費僅收一次；實際收費依合約標準及現場施工條件為準。</p>
              <div className="estimate-actions">
                <button className="copy-quote" onClick={copyEstimate} disabled={!hasEstimateItems}>{copyStatus === "copied" ? "已複製明細 ✓" : copyStatus === "error" ? "複製失敗，請重試" : "複製報價明細"}</button>
                <button onClick={() => { setCart({}); setQuantity(1); setArea(areaOptions[0].value); setNoElevator(false); setFloor(3); setSelectedExtras({}); setCopyStatus("idle"); }}>清空清單</button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {cartRows.length > 0 && (
        <a className="mobile-total" href="#estimate">
          <span>{cartRows.reduce((sum, row) => sum + row.qty, 0)} 件商品</span>
          <b>{money(total)}{hasQuoteItems && <small>＋另議</small>}</b>
          <em>明細 ↑</em>
        </a>
      )}

      <section className="fees-section" id="fees">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow"><span /> 價目明細</p>
            <h2>完整服務收費標準</h2>
            <p className="section-subtext">所有收費項目皆清楚條列，點擊「＋加入」可直接帶入上方試算工具。</p>
          </div>
          <div className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={feeQuery} onChange={(e) => setFeeQuery(e.target.value)} placeholder="搜尋價目表：冷氣、冰箱、壁掛、管線…" aria-label="搜尋完整價目" />
          </div>
        </div>

        <div className="filter-row" aria-label="價目分類">
          {filterOptions.map((filter) => (
            <button key={filter} className={feeFilter === filter ? "filter active" : "filter"} onClick={() => setFeeFilter(filter)}>{filter}</button>
          ))}
        </div>

        <div className="fee-table-wrap">
          <table className="fee-table">
            <thead>
              <tr>
                <th style={{ width: "110px" }}>分類</th>
                <th style={{ width: "260px" }}>項目／規格</th>
                <th>施工與計價備註</th>
                <th style={{ width: "150px", textAlign: "right" }}>單價（含稅）</th>
                <th style={{ width: "100px", textAlign: "center" }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.slice(0, feeLimit).map((item) => {
                const group = wallGroup(item);
                const isQuote = item.price === null;
                const inCart = Boolean(cart[item.id]) || (selectedExtras[item.id] ?? 0) > 0;
                return (
                  <tr key={`fee-${item.id}`} className={inCart ? "row-selected" : ""}>
                    <td>
                      <span className={`table-badge${group ? ` badge-${group}` : ""}`}>
                        {group ? wallGroupLabel(group) : item.category}
                      </span>
                    </td>
                    <td>
                      <strong className="item-title">{item.name}</strong>
                    </td>
                    <td>
                      <span className="item-note">{item.note || "標準施工規範"}</span>
                    </td>
                    <td className="item-price-cell">
                      {isQuote ? (
                        <span className="price-quote">現場另議</span>
                      ) : (
                        <>
                          <span className="price-num">{money(item.price!)}</span>
                          {item.unit && <small className="price-unit">／{item.unit}</small>}
                        </>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        className="table-add-btn"
                        onClick={() => handleAddFromTable(item)}
                        aria-label={`將 ${item.name} 加入試算`}
                      >
                        ＋ 加入
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredFees.length === 0 && <p className="empty-state">查無相符項目。</p>}
        </div>
        {filteredFees.length > feeLimit && feeLimit === 80 && <p className="list-note">共 {filteredFees.length} 筆，請使用分類或關鍵字篩選。</p>}

        {!feeQuery && feeFilter === "全部" && filteredFees.length > 12 && (
          <button className="show-all-fees" type="button" onClick={() => setShowAllFees((value) => !value)}>
            {showAllFees ? "收起價目表" : `展開全部 ${filteredFees.length} 筆項目`}
          </button>
        )}
      </section>

      <section className="area-section">
        <div className="area-intro">
          <p className="eyebrow"><span /> 運費標準</p>
          <h2>各區域跨區運費</h2>
          <p>跨區費依送達區域計收，同址訂單只計一次；未列出之區域費用另議。</p>
          <a href="#calculator" className="text-link">前往試算 ↑</a>
        </div>
        <div className="area-table">
          {Object.entries(areaFees).map(([key, info]) => (
            <div key={key}>
              <strong>{info.price === null ? "另議" : `+${money(info.price)}`}</strong>
              <span>{info.places}</span>
            </div>
          ))}
          <div className="area-other"><strong>其他偏遠地區</strong><span>超出表列區域費用另議</span></div>
        </div>
      </section>

      <section className="notes-section" id="notes">
        <div className="section-heading">
          <p className="eyebrow"><span /> 服務說明</p>
          <h2>配送與施工注意事項</h2>
        </div>
        <div className="note-cards">
          <article><span>01</span><h3>廢四機免費回收</h3><p>購買電視、冰箱、洗衣機、冷氣，同品項、同數量、同時間地點享免費回收舊機（不含拆機工資與危險施工）。</p></article>
          <article><span>02</span><h3>樓層搬運費</h3><p>無電梯 3 樓（含）以上加收樓層費，依商品尺寸每層加收 50～100 元，冷氣機型依標準計費。</p></article>
          <article><span>03</span><h3>特殊與危險施工</h3><p>高空作業、外牆懸掛、無立足點或特殊結構施工，須經現場評估確認，費用另議。</p></article>
          <article><span>04</span><h3>額外施工先報價</h3><p>超出標準安裝之管線延長、改電、洗洞或特殊壁掛等，施工前皆會先報價經同意後施作。</p></article>
        </div>
        <div className="source-note">
          <div><p><b>收費依據</b><br />依據標準家電配送安裝合約費率計收。</p></div>
          <p>試算結果僅供參考，實際收費以門市合約與現場施工評估為準。</p>
        </div>
      </section>

      <footer>
        <div className="brand"><span>家電配送安裝費試算</span></div>
        <p>家電配送安裝費用線上試算工具</p>
        <a href="#top">回到頁首 ↑</a>
      </footer>
    </main>
  );
}

