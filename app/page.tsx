"use client";

import { useState } from "react";
import { areaFees, extras, products, splitAC, windowAC, type FeeItem } from "./pricing-data";

const money = (value: number) => `NT$ ${value.toLocaleString("zh-TW")}`;

// Apple SF-Symbols 風格極簡向量圖標系統
const TvIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="13" rx="2.5" />
    <path d="M12 17v4" />
    <path d="M8 21h8" />
  </svg>
);

const FridgeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2.5" />
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="8" y1="5" x2="8" y2="7" />
    <line x1="8" y1="12" x2="8" y2="15" />
  </svg>
);

const WasherIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2.5" />
    <circle cx="12" cy="13" r="5" />
    <path d="M12 15a2 2 0 1 0 0-4" />
    <circle cx="7" cy="5.5" r="0.8" fill="currentColor" />
    <circle cx="10" cy="5.5" r="0.8" fill="currentColor" />
  </svg>
);

const AcIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="8" rx="2" />
    <line x1="6" y1="9" x2="10" y2="9" />
    <path d="M6 16c1.5 2 3.5 2 5 0s3.5-2 5 0" />
    <path d="M7 19c1.5 2 3.5 2 5 0s3.5-2 5 0" />
  </svg>
);

const KitchenIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v5" />
    <path d="M7 7h10a3 3 0 0 1 3 3v2a8 8 0 0 1-16 0v-2a3 3 0 0 1 3-3Z" />
    <path d="M8 18v3" />
    <path d="M16 18v3" />
  </svg>
);

const AudioIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <circle cx="12" cy="7" r="2" />
    <circle cx="12" cy="15" r="3.5" />
    <circle cx="12" cy="15" r="1.2" fill="currentColor" />
  </svg>
);

const AllIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const TagCheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
    <path d="m9 14 2 2 4-4" />
  </svg>
);

const RecycleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
    <path d="M11 19h8.2a1.8 1.8 0 0 0 1.58-.88 1.78 1.78 0 0 0 .02-1.79l-2.7-4.66" />
    <path d="m14 4-2.8 4.7" />
    <path d="m9.7 7.7 2.4-4a1.8 1.8 0 0 1 3.1 0l3.8 6.4" />
    <path d="m4.5 13 2.5 6-3.5 1" />
  </svg>
);

const StairsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 20h-4v-4h-4v-4H8V8H4V4" />
    <path d="M4 20h16" />
  </svg>
);

const ShieldCheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export type MainCategory = "全部" | "電視" | "冰箱" | "洗衣" | "冷氣" | "廚電";

const mainCategoryFilters: Array<{ id: MainCategory; label: string; Icon: React.ComponentType<{ className?: string }> }> = [
  { id: "全部", label: "全部項目", Icon: AllIcon },
  { id: "電視", label: "電視與壁掛", Icon: TvIcon },
  { id: "冰箱", label: "冰箱與冷凍", Icon: FridgeIcon },
  { id: "洗衣", label: "洗衣與乾衣", Icon: WasherIcon },
  { id: "冷氣", label: "冷氣與施工", Icon: AcIcon },
  { id: "廚電", label: "生活與廚房", Icon: KitchenIcon },
];

const getItemMainCategory = (item: FeeItem): MainCategory => {
  if (item.category === "電視" || item.category === "電視壁掛" || item.category === "電視安裝" || item.category === "影音") return "電視";
  if (item.category === "冰箱" || item.id === "fridge-door" || item.id === "door") return "冰箱";
  if (item.category === "洗衣" || item.id === "washer-stack") return "洗衣";
  if (item.category === "分離式冷氣" || item.category === "窗型冷氣" || item.category === "冷氣共用") return "冷氣";
  if (item.category === "小型家電") return "廚電";
  return "全部";
};

const getItemSubBadge = (item: FeeItem): { text: string; type: string } => {
  if (item.id.startsWith("tv-own-")) return { text: "自備架安裝", type: "mount" };
  if (item.id.startsWith("tv-kit-")) return { text: "含架安裝", type: "mount" };
  if (item.id === "tv-existing" || item.id === "tv-special-wall") return { text: "特殊施工", type: "special" };
  if (item.category === "電視安裝") return { text: "線材天線", type: "part" };
  if (item.category === "影音") return { text: "劇院音響", type: "audio" };
  if (item.category === "電視") return { text: "基本運送", type: "delivery" };

  if (item.id === "fridge-door" || item.id === "door") return { text: "拆門過窗", type: "special" };
  if (item.category === "冰箱") return { text: "基本運送", type: "delivery" };

  if (item.id === "washer-stack") return { text: "乾衣堆疊", type: "special" };
  if (item.id === "tower") return { text: "運送＋安裝", type: "install" };
  if (item.category === "洗衣") return { text: "基本運送", type: "delivery" };

  if (item.category === "分離式冷氣" && item.price && item.price >= 3000 && !item.id.startsWith("pipe") && !item.id.startsWith("duct") && !item.id.startsWith("ac-remove")) return { text: "基本安裝", type: "install" };
  if (item.category === "窗型冷氣" && item.price && item.price >= 800 && !item.id.startsWith("window-") && item.id !== "mobile") return { text: "基本安裝", type: "install" };
  if (item.id.includes("recycle")) return { text: "拆機回收(免費)", type: "install" };
  if (item.id.startsWith("ac-remove") || item.id.startsWith("window-remove")) return { text: "自留拆機", type: "special" };
  if (item.id.startsWith("pipe") || item.id === "flush") return { text: "銅管延長", type: "pipe" };
  if (item.id.startsWith("duct")) return { text: "管槽配件", type: "pipe" };
  if (item.id.startsWith("hole")) return { text: "洗孔工程", type: "hole" };
  if (item.id.startsWith("galv-") || item.id.startsWith("steel-") || item.id === "floor-rack") return { text: "室外機支架", type: "bracket" };
  if (item.id.startsWith("wire") || item.id === "socket" || item.id === "plug" || item.id === "box" || item.id === "panel" || item.id === "breaker") return { text: "水電配線", type: "electric" };
  if (item.id.startsWith("pump-") || item.id === "drain") return { text: "排水設備", type: "drain" };
  if (item.id.startsWith("awning-")) return { text: "遮雨棚", type: "part" };
  if (item.id.startsWith("iron-") || item.id === "steel-window") return { text: "剪窗工程", type: "special" };
  if (item.id.startsWith("window-")) return { text: "窗型加項", type: "part" };
  if (item.category === "冷氣共用" || item.category === "分離式冷氣" || item.category === "窗型冷氣") return { text: "冷氣施工", type: "install" };

  return { text: "運送定位", type: "delivery" };
};

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
const productCategories: Array<{ id: ProductCategory; hint: string; Icon: React.ComponentType<{ className?: string }> }> = [
  { id: "電視", hint: "液晶電視", Icon: TvIcon },
  { id: "冰箱", hint: "單雙門／對開", Icon: FridgeIcon },
  { id: "洗衣機", hint: "直立／滾筒", Icon: WasherIcon },
  { id: "冷氣", hint: "分離／窗型", Icon: AcIcon },
  { id: "小家電", hint: "廚電／生活", Icon: KitchenIcon },
  { id: "影音", hint: "劇院／音響", Icon: AudioIcon },
];

const preferredExtras: Record<"appliance" | "split" | "window", string[]> = {
  appliance: ["door", "fridge-door", "washer-stack", "tv-own-fixed59", "tv-existing"],
  split: ["ac-remove-recycle", "ac-remove11", "pipe23", "duct80", "hole25", "galv-small", "socket"],
  window: ["window-remove-recycle", "window-remove-self", "window-frame", "window-hang", "window-cover", "socket", "awning-small", "iron-hollow"],
};

export default function Home() {
  const [mode, setMode] = useState<"appliance" | "split" | "window">("appliance");
  const [productCategory, setProductCategory] = useState<ProductCategory>("電視");
  const [productId, setProductId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);
  const [isOver10k, setIsOver10k] = useState(true);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [over10kMap, setOver10kMap] = useState<Record<string, boolean>>({});
  const [area, setArea] = useState(areaOptions[0].value);
  const [noElevator, setNoElevator] = useState(false);
  const [floor, setFloor] = useState(3);
  const [showAllExtras, setShowAllExtras] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});
  const [globalQuery, setGlobalQuery] = useState("");
  const [feeQuery, setFeeQuery] = useState("");
  const [feeFilter, setFeeFilter] = useState<MainCategory>("全部");
  const [showAllFees, setShowAllFees] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    setIsOver10k(true);
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
    .map(([id, qty]) => ({
      item: orderableItems.find((entry) => entry.id === id),
      qty,
      isOver10k: over10kMap[id] ?? true,
    }))
    .filter((row): row is { item: FeeItem; qty: number; isOver10k: boolean } => Boolean(row.item));

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

  // 滿萬免基本運送安裝費之計算
  const originalBaseTotal = cartRows.reduce((sum, row) => sum + (row.item.price ?? 0) * row.qty, 0);
  const baseTotal = cartRows.reduce((sum, row) => sum + (row.isOver10k ? 0 : (row.item.price ?? 0)) * row.qty, 0);
  const discountTotal = originalBaseTotal - baseTotal;

  const selectedArea = areaOptions.find((option) => option.value === area) ?? areaOptions[0];
  const areaTotal = cartRows.length ? (selectedArea.fee ?? 0) : 0;
  const stairUnits = noElevator ? Math.max(0, floor - 2) : 0;
  const stairTotal = cartRows.reduce(
    (sum, row) => sum + (row.item.stairRate ?? 0) * stairUnits * row.qty,
    0,
  );
  const total = baseTotal + areaTotal + stairTotal + extraTotal;

  const allFees = [...products, ...splitAC, ...windowAC, ...extras];
  const getCategoryCount = (catId: MainCategory) => {
    if (catId === "全部") return allFees.length;
    return allFees.filter((item) => getItemMainCategory(item) === catId).length;
  };

  const filteredFees = allFees.filter((item) => {
    const mainCat = getItemMainCategory(item);
    const matchCategory = feeFilter === "全部" || mainCat === feeFilter;
    const haystack = `${item.category}${item.name}${item.note ?? ""}`.toLowerCase();
    return matchCategory && haystack.includes(feeQuery.toLowerCase());
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
    setOver10kMap((prev) => ({ ...prev, [current.id]: isOver10k }));
    setQuantity(1);
  };

  const addQuickItem = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    setOver10kMap((prev) => ({ ...prev, [id]: prev[id] ?? true }));
  };

  const toggleItemOver10k = (id: string) => {
    setOver10kMap((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
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
      ...cartRows.map(({ item, qty, isOver10k: item10k }) => `商品｜${item.name} × ${qty}｜${item10k ? "NT$ 0 (單機滿萬·免基本費)" : money((item.price ?? 0) * qty)}`),
      ...(cartRows.length ? [
        `跨區費｜${selectedArea.fee === null ? "另議" : money(areaTotal)}`,
        ...(stairTotal > 0 ? [`樓層搬運費｜${money(stairTotal)}`] : []),
      ] : []),
      ...selectedExtraRows.map(({ item, qty }) => `加項｜${item.name} × ${qty}｜${item.price === null ? "另議" : money(item.price * qty)}`),
      "",
      `${hasQuoteItems ? "已知費用合計" : "預估合計"}｜${money(total)}`,
      ...(discountTotal > 0 ? [`已享滿萬免運折抵｜${money(discountTotal)}`] : []),
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
          <div className="brand-icon-squircle" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <path d="M7 12h10M12 7v10" />
            </svg>
          </div>
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

        {/* 分類 Segmented Tabs (含 Apple 質感圖標) */}
        <div className="category-tabs" role="tablist" aria-label="商品分類">
          {productCategories.map((category) => {
            const IconComponent = category.Icon;
            return (
              <button
                key={category.id}
                className={productCategory === category.id ? "category-tab active" : "category-tab"}
                onClick={() => switchCategory(category.id)}
                role="tab"
                aria-selected={productCategory === category.id}
              >
                <div className="tab-icon-wrap">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span>{category.id}</span>
                <small>{category.hint}</small>
              </button>
            );
          })}
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

              <label className="checkbox-10k">
                <input
                  type="checkbox"
                  checked={isOver10k}
                  onChange={(e) => setIsOver10k(e.target.checked)}
                />
                <span>單機金額達 NT$ 10,000 以上（享免基本運送安裝費）</span>
              </label>

              {current.note && <p className="inline-note">{current.note}</p>}
              
              <div className="cart-stack" aria-label="本次配送商品清單">
                {cartRows.length === 0 ? (
                  <div className="cart-empty"><b>尚未加入商品</b><span>請選擇上方規格與數量後點擊「＋加入清單」</span></div>
                ) : cartRows.map(({ item, qty, isOver10k: item10k }) => (
                  <div className="cart-row" key={`cart-${item.id}`}>
                    <div className="cart-index">{String(cartRows.findIndex((row) => row.item.id === item.id) + 1).padStart(2, "0")}</div>
                    <div className="cart-name">
                      <b>{item.name}</b>
                      <small>
                        {item10k ? (
                          <>原基本費 {money(item.price ?? 0)}／{item.unit}</>
                        ) : (
                          <>{money(item.price ?? 0)}／{item.unit}</>
                        )}
                      </small>
                      {item10k && <span className="badge-free">滿萬免運</span>}
                      <div>
                        <button
                          type="button"
                          className="toggle-10k-btn"
                          onClick={() => toggleItemOver10k(item.id)}
                        >
                          {item10k ? "改為未滿萬自付" : "改為滿萬免基本費"}
                        </button>
                      </div>
                    </div>
                    <div className="mini-stepper cart-stepper">
                      <button onClick={() => setCartQuantity(item.id, qty - 1)} aria-label={`減少${item.name}`}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => setCartQuantity(item.id, qty + 1)} aria-label={`增加${item.name}`}>＋</button>
                    </div>
                    <strong>
                      {item10k ? (
                        <>
                          <del className="strikethrough-price">{money((item.price ?? 0) * qty)}</del>
                          <span className="free-price">NT$ 0</span>
                        </>
                      ) : (
                        money((item.price ?? 0) * qty)
                      )}
                    </strong>
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
            
            {discountTotal > 0 && (
              <div className="discount-pill">
                <span>滿萬免基本運費折抵</span>
                <b>−{money(discountTotal)}</b>
              </div>
            )}

            <div className="estimate-total"><small>{hasQuoteItems ? "已知費用合計" : "預估合計"}</small><strong>{money(total)}</strong></div>
            <div className="estimate-lines">
              {cartRows.map(({ item, qty, isOver10k: item10k }) => (
                <div key={`summary-${item.id}`}>
                  <span>{item.name} × {qty} {item10k && <small className="tag-free">（滿萬免運）</small>}</span>
                  <b>{item10k ? "NT$ 0" : money((item.price ?? 0) * qty)}</b>
                </div>
              ))}
              {cartRows.length > 0 && (
                <div className="summary-subtotal">
                  <span>商品基本費小計</span>
                  <b>{money(baseTotal)}{discountTotal > 0 && <small className="tag-free">（已折抵 {money(discountTotal)}）</small>}</b>
                </div>
              )}
              {cartRows.length > 0 && <div><span>{selectedArea.place}跨區費（同址一次）</span><b>{selectedArea.fee === null ? "另議" : money(areaTotal)}</b></div>}
              {stairTotal > 0 && <div><span>樓層搬運費</span><b>{money(stairTotal)}</b></div>}
              {selectedExtraRows.map(({ item, qty }) => (
                <div key={item.id}><span>{item.name} × {qty}</span><b>{item.price === null ? "另議" : money(item.price * qty)}</b></div>
              ))}
            </div>
            {hasQuoteItems && <p className="quote-warning"><b>另議項目未計入合計</b><br />特殊施工與未列項目，費用依現場評估確認為準。</p>}
            <div className="estimate-footer">
              <p><b>計費說明</b><br />單機滿萬元享免基本運送安裝費；同址多件商品跨區費僅收一次；特殊加項依現場條件為準。</p>
              <div className="estimate-actions">
                <button className="copy-quote" onClick={copyEstimate} disabled={!hasEstimateItems}>{copyStatus === "copied" ? "已複製明細 ✓" : copyStatus === "error" ? "複製失敗，請重試" : "複製報價明細"}</button>
                <button onClick={() => { setCart({}); setOver10kMap({}); setQuantity(1); setArea(areaOptions[0].value); setNoElevator(false); setFloor(3); setSelectedExtras({}); setCopyStatus("idle"); }}>清空清單</button>
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

      {/* 完整價目明細表 */}
      <section className="fees-section" id="fees">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow"><span /> 價目明細</p>
            <h2>完整服務收費標準</h2>
            <p className="section-subtext">所有收費項目清楚條列，單機滿萬元享免基本運送安裝費。點擊「＋加入」可直接帶入試算。</p>
          </div>
          <div className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={feeQuery} onChange={(e) => setFeeQuery(e.target.value)} placeholder="搜尋價目表：冷氣、冰箱、壁掛、管線…" aria-label="搜尋完整價目" />
          </div>
        </div>

        {/* 6 大結構化主分類 Tab (含 SF Pro 圖標) */}
        <div className="filter-row" aria-label="價目分類">
          {mainCategoryFilters.map((filter) => {
            const FilterIcon = filter.Icon;
            return (
              <button
                key={filter.id}
                className={feeFilter === filter.id ? "filter active" : "filter"}
                onClick={() => setFeeFilter(filter.id)}
              >
                <FilterIcon className="w-4 h-4" />
                <span>{filter.label}</span>
                <span className="filter-count">({getCategoryCount(filter.id)})</span>
              </button>
            );
          })}
        </div>

        <div className="fee-table-wrap">
          <table className="fee-table">
            <thead>
              <tr>
                <th style={{ width: "130px" }}>分類／屬性</th>
                <th style={{ width: "260px" }}>項目／規格</th>
                <th>施工與計價備註</th>
                <th style={{ width: "150px", textAlign: "right" }}>單價（含稅）</th>
                <th style={{ width: "100px", textAlign: "center" }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.slice(0, feeLimit).map((item) => {
                const subBadge = getItemSubBadge(item);
                const isQuote = item.price === null;
                const inCart = Boolean(cart[item.id]) || (selectedExtras[item.id] ?? 0) > 0;
                return (
                  <tr key={`fee-${item.id}`} className={inCart ? "row-selected" : ""}>
                    <td className="fee-td-badge">
                      <span className={`table-badge badge-${subBadge.type}`}>
                        {subBadge.text}
                      </span>
                    </td>
                    <td className="fee-td-name">
                      <strong className="item-title">{item.name}</strong>
                    </td>
                    <td className="fee-td-note">
                      <span className="item-note">{item.note || "標準施工規範；單機滿萬免基本運送安裝"}</span>
                    </td>
                    <td className="fee-td-price item-price-cell">
                      {isQuote ? (
                        <span className="price-quote">現場另議</span>
                      ) : (
                        <>
                          <span className="price-num">{money(item.price!)}</span>
                          {item.unit && <small className="price-unit">／{item.unit}</small>}
                        </>
                      )}
                    </td>
                    <td className="fee-td-action" style={{ textAlign: "center" }}>
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

      {/* 服務說明與保障 (含 Apple 質感圖標) */}
      <section className="notes-section" id="notes">
        <div className="section-heading">
          <p className="eyebrow"><span /> 服務說明</p>
          <h2>配送與施工注意事項</h2>
        </div>
        <div className="note-cards">
          <article>
            <div className="note-icon-squircle">
              <TagCheckIcon className="w-5 h-5" />
            </div>
            <span>01 優惠條款</span>
            <h3>單機滿萬免基本費</h3>
            <p>購買單機金額達 NT$ 10,000 以上商品，享免基本運送安裝費；跨區費、樓層費與額外施工另計。</p>
          </article>
          <article>
            <div className="note-icon-squircle">
              <RecycleIcon className="w-5 h-5" />
            </div>
            <span>02 環保與拆機</span>
            <h3>冷氣拆舊機與回收</h3>
            <p>冷氣拆舊機交由安裝人員回收享「免收拆機工資（NT$ 0）」；若拆下後顧客需自行保留舊機才計收工資。同品項享廢四機免費回收。</p>
          </article>
          <article>
            <div className="note-icon-squircle">
              <StairsIcon className="w-5 h-5" />
            </div>
            <span>03 搬運規範</span>
            <h3>樓層搬運費</h3>
            <p>無電梯 3 樓（含）以上加收樓層費，依商品尺寸每層加收 50～100 元，冷氣機型依標準計費。</p>
          </article>
          <article>
            <div className="note-icon-squircle">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <span>04 透明保障</span>
            <h3>特殊施工先報價</h3>
            <p>高空危險施工、超出標準安裝之管線延長、改電、洗洞或特殊壁掛等，施工前皆會先報價經同意後施作。</p>
          </article>
        </div>
        <div className="source-note">
          <div><p><b>收費依據</b><br />依據標準家電配送安裝合約費率計收。</p></div>
          <p>試算結果僅供參考，實際收費以門市合約與現場施工評估為準。</p>
        </div>
      </section>

      <footer>
        <div className="brand">
          <div className="brand-icon-squircle" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <path d="M7 12h10M12 7v10" />
            </svg>
          </div>
          <span>家電配送安裝費試算</span>
        </div>
        <p>家電配送安裝費用線上試算工具</p>
        <a href="#top">回到頁首 ↑</a>
      </footer>
    </main>
  );
}

