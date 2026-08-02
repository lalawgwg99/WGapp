"use client";

import { useState } from "react";

type FeeItem = {
  id: string;
  category: string;
  name: string;
  price: number | null;
  unit?: string;
  note?: string;
  stairRate?: number;
};

const products: FeeItem[] = [
  { id: "tv32", category: "電視", name: "液晶電視 32 吋（含）以下", price: 300, unit: "台", stairRate: 50 },
  { id: "tv33", category: "電視", name: "液晶電視 33–49 吋", price: 450, unit: "台", stairRate: 50 },
  { id: "tv50", category: "電視", name: "液晶電視 50–54 吋", price: 550, unit: "台", stairRate: 50 },
  { id: "tv55", category: "電視", name: "液晶電視 55–59 吋", price: 600, unit: "台", stairRate: 100 },
  { id: "tv60", category: "電視", name: "液晶電視 60–74 吋", price: 700, unit: "台", stairRate: 100 },
  { id: "tv75", category: "電視", name: "液晶電視 75 吋（含）以上", price: 1300, unit: "台", stairRate: 100 },
  { id: "theater-delivery", category: "影音", name: "家庭劇院／卡拉 OK｜只送不裝", price: 300, unit: "組", note: "含拆箱、定位、測試" },
  { id: "washer12", category: "洗衣", name: "洗衣機 12.5 公斤（含）以下", price: 300, unit: "台", stairRate: 50 },
  { id: "washer18", category: "洗衣", name: "洗衣機 13–18 公斤（含）", price: 400, unit: "台", stairRate: 100 },
  { id: "washer19", category: "洗衣", name: "洗衣機 19 公斤（含）以上", price: 500, unit: "台", stairRate: 100 },
  { id: "tower-delivery", category: "洗衣", name: "上乾下洗洗衣機（洗衣塔／一體成形）｜只送不裝", price: 800, unit: "台", stairRate: 100 },
  { id: "tower", category: "洗衣", name: "上乾下洗洗衣機（洗衣塔／一體成形）｜運送含基本安裝", price: 2700, unit: "台", stairRate: 100 },
  { id: "front13", category: "洗衣", name: "滾筒洗衣機 13 公斤（含）以下", price: 600, unit: "台", stairRate: 50 },
  { id: "front16", category: "洗衣", name: "滾筒洗衣機 14–16 公斤", price: 700, unit: "台", stairRate: 100 },
  { id: "front17", category: "洗衣", name: "滾筒洗衣機 17 公斤（含）以上", price: 750, unit: "台", stairRate: 100 },
  { id: "lg-mini", category: "洗衣", name: "LG 下洗迷你洗衣機", price: 300, unit: "台", stairRate: 50 },
  { id: "dryer10", category: "洗衣", name: "乾衣機 10 公斤（含）以下", price: 250, unit: "台" },
  { id: "dryer11", category: "洗衣", name: "乾衣機 11 公斤（含）以上", price: 300, unit: "台" },
  { id: "heat-dryer", category: "洗衣", name: "免曬衣乾衣機", price: 500, unit: "台" },
  { id: "fridge100", category: "冰箱", name: "冰箱／冷凍櫃 100 公升（含）以下", price: 200, unit: "台", stairRate: 50 },
  { id: "fridge199", category: "冰箱", name: "冰箱／冷凍櫃 101–199 公升", price: 250, unit: "台", stairRate: 50 },
  { id: "fridge299", category: "冰箱", name: "冰箱／冷凍櫃 200–299 公升", price: 300, unit: "台", stairRate: 50 },
  { id: "fridge399", category: "冰箱", name: "冰箱／冷凍櫃 300–399 公升", price: 450, unit: "台", stairRate: 100 },
  { id: "fridge499", category: "冰箱", name: "冰箱／冷凍櫃 400–499 公升", price: 500, unit: "台", stairRate: 100 },
  { id: "fridge599", category: "冰箱", name: "冰箱／冷凍櫃 500–599 公升", price: 700, unit: "台", stairRate: 100 },
  { id: "fridge600", category: "冰箱", name: "冰箱／冷凍櫃 600 公升（含）以上", price: 900, unit: "台", stairRate: 100 },
  { id: "side-fridge", category: "冰箱", name: "對開冰箱", price: 1200, unit: "台", stairRate: 100 },
  { id: "knock-fridge", category: "冰箱", name: "LG 敲敲門冰箱", price: 1500, unit: "台", stairRate: 100 },
  { id: "styler", category: "冰箱", name: "電子衣櫥", price: 600, unit: "台" },
  { id: "hood", category: "小型家電", name: "排油煙機／瓦斯爐／熱水器", price: 300, unit: "件", note: "運送、拆箱，不含安裝" },
  { id: "drybox", category: "小型家電", name: "電子防潮箱", price: 300, unit: "件", note: "運送、拆箱，不含安裝" },
  { id: "small-appliance", category: "小型家電", name: "水冷扇／除濕機／烘碗機等", price: 300, unit: "件", note: "運送、拆箱、定位，不含安裝" },
];

const splitAC: FeeItem[] = [
  { id: "split36", category: "分離式冷氣", name: "1 對 1｜3.6 kW 以下（含）", price: 3100, unit: "組", stairRate: 100 },
  { id: "split41", category: "分離式冷氣", name: "1 對 1｜3.7–4.1 kW", price: 3500, unit: "組", stairRate: 100 },
  { id: "split52", category: "分離式冷氣", name: "1 對 1｜4.2–5.2 kW", price: 3900, unit: "組", stairRate: 100 },
  { id: "split65", category: "分離式冷氣", name: "1 對 1｜5.3–6.5 kW", price: 4500, unit: "組", stairRate: 100 },
  { id: "split72", category: "分離式冷氣", name: "1 對 1｜6.6–7.2 kW", price: 5000, unit: "組", stairRate: 100 },
  { id: "split91", category: "分離式冷氣", name: "1 對 1｜7.3–9.1 kW", price: 6000, unit: "組", stairRate: 100 },
  { id: "split116", category: "分離式冷氣", name: "1 對 1｜9.2–11.6 kW", price: 8000, unit: "組", stairRate: 100 },
  { id: "split117", category: "分離式冷氣", name: "1 對 1｜11.7 kW 以上", price: 9200, unit: "組", stairRate: 100 },
  { id: "multi12", category: "分離式冷氣", name: "1 對 2｜不限 kW", price: 5000, unit: "組", note: "以 10 米為限；超出由顧客付費", stairRate: 150 },
  { id: "multi13", category: "分離式冷氣", name: "1 對 3｜不限 kW", price: 5000, unit: "組", note: "以 10 米為限；超出由顧客付費；1 對 4 樓層費再依表類推", stairRate: 200 },
];

const windowAC: FeeItem[] = [
  { id: "window32", category: "窗型冷氣", name: "窗型／直立式｜3.2 kW（含）以下", price: 800, unit: "台", stairRate: 100 },
  { id: "window53", category: "窗型冷氣", name: "窗型／直立式｜3.21–5.3 kW", price: 1000, unit: "台", stairRate: 100 },
  { id: "window54", category: "窗型冷氣", name: "窗型／直立式｜超過 5.3 kW", price: 1200, unit: "台", stairRate: 100 },
  { id: "mobile", category: "窗型冷氣", name: "移動式冷氣", price: 800, unit: "台" },
];

const extras: FeeItem[] = [
  { id: "door", category: "一般加項", name: "拆卸大門／室內門／過窗", price: 200, unit: "次" },
  { id: "fridge-door", category: "一般加項", name: "冰箱門拆裝（兩片門板）", price: 300, unit: "台", note: "每超出一片加收 150 元" },
  { id: "washer-stack", category: "一般加項", name: "滾筒洗衣機堆疊免曬衣乾衣機", price: 2000, unit: "組" },
  { id: "tv-own-fixed42", category: "電視壁掛", name: "平面固定式｜42 吋以下", price: 800, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-own-fixed59", category: "電視壁掛", name: "平面固定式｜43–59 吋", price: 1000, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-own-fixed65", category: "電視壁掛", name: "平面固定式｜60–65 吋", price: 1700, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-own-fixed66", category: "電視壁掛", name: "平面固定式｜66 吋以上", price: 2000, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-own-tilt42", category: "電視壁掛", name: "上下仰角式｜42 吋以下", price: 1100, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-own-tilt59", category: "電視壁掛", name: "上下仰角式｜43–59 吋", price: 1300, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-own-tilt65", category: "電視壁掛", name: "上下仰角式｜60–65 吋", price: 1500, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-own-tilt66", category: "電視壁掛", name: "上下仰角式｜66 吋以上", price: 2000, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-own-arm", category: "電視壁掛", name: "懸臂式／雙臂規格｜所有尺寸", price: 1500, unit: "台", note: "僅安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-kit-fixed55", category: "電視壁掛", name: "平面固定式｜32–55 吋", price: 1500, unit: "台", note: "壁掛架＋安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-kit-fixed56", category: "電視壁掛", name: "平面固定式｜56 吋以上", price: 2500, unit: "台", note: "壁掛架＋安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-kit-tilt", category: "電視壁掛", name: "上下仰角式", price: null, unit: "台", note: "現場報價；適用水泥牆面，特殊牆面另議" },
  { id: "tv-kit-arm69", category: "電視壁掛", name: "懸臂式／雙臂規格｜32–69 吋", price: 3500, unit: "台", note: "壁掛架＋安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-kit-arm70", category: "電視壁掛", name: "懸臂式／雙臂規格｜70 吋以上", price: 4500, unit: "台", note: "壁掛架＋安裝費；適用水泥牆面，特殊牆面另議" },
  { id: "tv-existing", category: "電視壁掛", name: "既有壁掛架安裝費", price: 300, unit: "台" },
  { id: "tv-special-wall", category: "電視壁掛", name: "特殊施工／洗洞｜文化石、大理石等", price: null, unit: "次", note: "使用安全合規材質，現場報價" },
  { id: "cable", category: "電視安裝", name: "室內 CABLE 線（超過 3 米）", price: 30, unit: "米" },
  { id: "antenna", category: "電視安裝", name: "一般 UHF／VHF 室外天線（五樓以下）", price: 1500, unit: "組" },
  { id: "digital-antenna", category: "電視安裝", name: "數位 UHF 室外天線（五樓以下）", price: 1200, unit: "組", note: "不含數位機上盒" },
  { id: "ac-remove11", category: "分離式冷氣", name: "分離式拆舊機｜1 對 1", price: 1000, unit: "組", note: "危險施工另計；舊機回收不收費" },
  { id: "ac-remove12", category: "分離式冷氣", name: "分離式拆舊機｜1 對 2", price: 1500, unit: "組", note: "危險施工另計；舊機回收不收費" },
  { id: "pipe23", category: "分離式冷氣", name: "被覆銅管延長｜2”3”", price: 400, unit: "公尺", note: "限用 8mm 以上厚度" },
  { id: "pipe24", category: "分離式冷氣", name: "被覆銅管延長｜2”4”", price: 500, unit: "公尺", note: "限用 8mm 以上厚度" },
  { id: "pipe25", category: "分離式冷氣", name: "被覆銅管延長｜2”5”", price: 550, unit: "公尺", note: "限用 8mm 以上厚度" },
  { id: "pipe35", category: "分離式冷氣", name: "被覆銅管延長｜3”5”", price: 600, unit: "公尺", note: "限用 8mm 以上厚度" },
  { id: "pipe36", category: "分離式冷氣", name: "被覆銅管延長｜3”6”", price: 600, unit: "公尺", note: "限用 8mm 以上厚度" },
  { id: "pipe47", category: "分離式冷氣", name: "被覆銅管延長｜4”7”", price: 700, unit: "公尺", note: "限用 8mm 以上厚度" },
  { id: "flush", category: "分離式冷氣", name: "延用舊管洗管（R141V）", price: 3000, unit: "次" },
  { id: "duct80", category: "分離式冷氣", name: "銅管管槽 80／100", price: 300, unit: "公尺" },
  { id: "duct120", category: "分離式冷氣", name: "銅管管槽 120／140", price: 600, unit: "公尺" },
  { id: "duct-part80", category: "分離式冷氣", name: "管槽配件 80／100", price: 400, unit: "件" },
  { id: "duct-part120", category: "分離式冷氣", name: "管槽配件 120／140", price: 600, unit: "件" },
  { id: "refrigerant", category: "分離式冷氣", name: "R32／R410 整台冷媒填充", price: 1200, unit: "台" },
  { id: "refrigerant-leak", category: "分離式冷氣", name: "R32／R410 冷媒填充（含補漏）", price: 2500, unit: "台" },
  { id: "hole25", category: "冷氣共用", name: "洗孔｜牆厚 25 公分以內", price: 800, unit: "孔" },
  { id: "hole40", category: "冷氣共用", name: "洗孔｜牆厚 40 公分內", price: 1000, unit: "孔" },
  { id: "holewood", category: "冷氣共用", name: "洗孔｜木板牆 3 分板以上", price: 300, unit: "孔" },
  { id: "drain", category: "冷氣共用", name: "4 分透明排水管", price: 30, unit: "米", note: "一層樓以上另有 100 元／樓層" },
  { id: "pump-normal", category: "冷氣共用", name: "排水器｜一般型（含安裝）", price: 1600, unit: "個" },
  { id: "pump-quiet", category: "冷氣共用", name: "排水幫浦｜靜音型", price: 2000, unit: "個" },
  { id: "galv-small", category: "冷氣共用", name: "鍍鋅豪華架｜小組 80 公分", price: 1000, unit: "組" },
  { id: "galv-medium", category: "冷氣共用", name: "鍍鋅豪華架｜中組 90 公分", price: 1200, unit: "組" },
  { id: "galv-large", category: "冷氣共用", name: "鍍鋅豪華架｜大組 100 公分", price: 1500, unit: "組" },
  { id: "steel-small", category: "冷氣共用", name: "不鏽鋼組合架｜小組 80 公分", price: 3000, unit: "組" },
  { id: "steel-large", category: "冷氣共用", name: "不鏽鋼組合架｜大組 100 公分", price: 3500, unit: "組" },
  { id: "floor-rack", category: "冷氣共用", name: "室外機塑鋼落地架", price: 800, unit: "組" },
  { id: "socket", category: "冷氣共用", name: "電源插座", price: 200, unit: "組", note: "隨機有附則免收" },
  { id: "plug", category: "冷氣共用", name: "插頭", price: 200, unit: "組" },
  { id: "box", category: "冷氣共用", name: "冷氣插座盒", price: 400, unit: "個" },
  { id: "wire20", category: "冷氣共用", name: "電源線／控制線 2.0mm", price: 60, unit: "公尺", note: "甲方得按市場行情調整" },
  { id: "wire35", category: "冷氣共用", name: "電源線／控制線 3.5mm", price: 75, unit: "公尺", note: "甲方得按市場行情調整" },
  { id: "wire55", category: "冷氣共用", name: "電源線／控制線 5.5mm", price: 90, unit: "公尺", note: "甲方得按市場行情調整" },
  { id: "panel", category: "冷氣共用", name: "加裝分電表（電源線另計）", price: 2000, unit: "個" },
  { id: "breaker", category: "冷氣共用", name: "無熔絲開關 30A–2P", price: 500, unit: "個", note: "不含開關箱" },
  { id: "split-install-again", category: "分離式冷氣", name: "分次安裝", price: 500, unit: "次" },
  { id: "window-frame", category: "窗型冷氣", name: "下鋁窗安裝上緣加框架", price: 1000, unit: "台" },
  { id: "window-enlarge", category: "窗型冷氣", name: "框加大", price: 300, unit: "台", note: "敲水泥牆另議" },
  { id: "window-hang", category: "窗型冷氣", name: "窗型冷氣懸掛式施工", price: 2500, unit: "台" },
  { id: "window-cover", category: "窗型冷氣", name: "冷氣窗口封板", price: 300, unit: "窗" },
  { id: "awning-small", category: "冷氣共用", name: "塑鋼遮雨篷｜小組", price: 1200, unit: "組" },
  { id: "awning-large", category: "冷氣共用", name: "塑鋼遮雨篷｜大組", price: 1500, unit: "組" },
  { id: "iron-hollow", category: "冷氣共用", name: "剪鋁／鐵窗｜中空", price: 300, unit: "窗" },
  { id: "iron-solid", category: "冷氣共用", name: "剪鋁／鐵窗｜實心", price: 600, unit: "窗" },
  { id: "steel-window", category: "冷氣共用", name: "剪不鏽鋼窗", price: 600, unit: "窗" },
];

const areaFees: Record<string, { price: number; places: string }> = {
  "0": { price: 0, places: "高雄市（舊）、鳳山市、大寮" },
  "100": { price: 100, places: "橋頭、旗津" },
  "200": { price: 200, places: "林園、九曲堂、彌陀、大樹、燕巢、梓官、岡山、楠梓、大社" },
  "300": { price: 300, places: "屏東市、萬丹、新園、路竹、永安" },
  "400": { price: 400, places: "田寮、中寮、麟洛、竹田、崁頂、東港" },
  "500": { price: 500, places: "內門、旗山、阿蓮、湖內、大湖、高樹、里港、九如、林邊" },
  "600": { price: 600, places: "杉林、美濃、內埔、潮州、新碑" },
  "700": { price: 700, places: "甲仙、六龜、三地門、鹽埔、萬巒" },
  "800": { price: 800, places: "涼山、佳平、來義、佳冬" },
  "900": { price: 900, places: "枋寮" },
  "1000": { price: 1000, places: "三民、桃源、茂林、霧台、枋山、牡丹、車城、恆春" },
  "1200": { price: 1200, places: "滿州" },
};

const money = (value: number) => `NT$ ${value.toLocaleString("zh-TW")}`;
const wallGroup = (item: FeeItem) => item.id.startsWith("tv-own-") ? "own"
  : item.id.startsWith("tv-kit-") ? "kit"
  : item.id === "tv-existing" || item.id === "tv-special-wall" ? "other"
  : null;
const wallGroupLabel = (group: ReturnType<typeof wallGroup>) => group === "own" ? "客戶自備架"
  : group === "kit" ? "含架套裝"
  : group === "other" ? "其他／現場"
  : null;
const areaOptions = Object.entries(areaFees).flatMap(([fee, info]) =>
  info.places.split("、").map((place) => ({
    value: `${fee}:${place}`,
    fee: Number(fee),
    place,
  })),
);
const quickProductIds = ["tv55", "washer12", "fridge399", "split36", "window32"];
type ProductCategory = "電視" | "冰箱" | "洗衣機" | "冷氣" | "小家電" | "影音";
const productCategories: Array<{ id: ProductCategory; hint: string }> = [
  { id: "電視", hint: "尺寸" },
  { id: "冰箱", hint: "容量" },
  { id: "洗衣機", hint: "公斤數" },
  { id: "冷氣", hint: "分離／窗型" },
  { id: "小家電", hint: "運送安裝" },
  { id: "影音", hint: "劇院／卡拉 OK" },
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
  const [query, setQuery] = useState("");
  const [feeFilter, setFeeFilter] = useState("全部");

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
  const areaTotal = cartRows.length ? selectedArea.fee : 0;
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
    return (feeFilter === "全部" || item.category === feeFilter) && haystack.includes(query.toLowerCase());
  });

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

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到頁首">
          <span className="brand-mark">易</span>
          <span>配送安裝費試算</span>
        </a>
        <nav aria-label="主要導覽">
          <a href="#calculator">開始試算</a>
          <a href="#fees">完整價目</a>
          <a href="#notes">注意事項</a>
        </nav>
        <span className="version-pill">2026 合約版</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> 五甲店 · 新臺幣含稅</p>
          <h1>多樣商品，<br /><em>一次算清。</em></h1>
          <p className="hero-lead">
            常用商品一鍵加入，選鄉鎮、選樓層，就能看到同一地址的配送安裝總額。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#calculator">開始計算 <span>↓</span></a>
            <a className="text-link" href="#fees">先看完整價目 →</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="price-card price-card-back">
            <span>跨區費</span><strong>12</strong><small>個費率區間</small>
          </div>
          <div className="price-card price-card-main">
            <div className="receipt-top">
              <span>預估費用</span><span className="live-dot">即時計算</span>
            </div>
            <div className="sample-line"><span>商品基本費</span><b>NT$ 3,100</b></div>
            <div className="sample-line"><span>跨區加價</span><b>NT$ 200</b></div>
            <div className="sample-line"><span>施工加項</span><b>NT$ 800</b></div>
            <div className="sample-total"><span>合計</span><strong>NT$ 4,100</strong></div>
            <div className="receipt-dashes" />
            <small>依現場實際施工項目確認</small>
          </div>
          <div className="orange-disc">含稅<br />價</div>
        </div>
      </section>

      <section className="calculator-section" id="calculator">
        <div className="section-heading light-heading">
          <p className="eyebrow"><span /> 費用試算器</p>
          <h2>三步，整張訂單算完</h2>
          <p>加入商品、選配送條件、需要時再加施工項目。跨區費整張同址訂單只計一次。</p>
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
            <div className="step-block">
              <div className="step-title"><b>01</b><div><h3>建立商品清單</h3><p>不同類型可連續加入，同品項會自動合併數量</p></div></div>
              <div className="quick-adds" aria-label="常用商品快速加入">
                <span>常用</span>
                {quickProductIds.map((id) => {
                  const item = orderableItems.find((entry) => entry.id === id)!;
                  const shortName: Record<string, string> = {
                    tv55: "55–59 吋電視",
                    washer12: "12.5kg 洗衣機",
                    fridge399: "300–399L 冰箱",
                    split36: "3.6kW 分離式",
                    window32: "3.2kW 窗型",
                  };
                  return <button key={id} onClick={() => addQuickItem(id)}>＋ {shortName[id]} <small>{money(item.price ?? 0)}</small></button>;
                })}
              </div>
              <div className="field-grid add-grid">
                <label className="field wide">
                  <span>{productCategory}規格</span>
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
                  <div className="cart-empty"><b>尚未加入商品</b><span>選好商品與數量後，按「加入清單」</span></div>
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

            <div className="step-block">
              <div className="step-title"><b>02</b><div><h3>配送到哪裡</h3><p>直接選鄉鎮與實際樓層，系統自動換算</p></div></div>
              <div className="field-grid two">
                <label className="field">
                  <span>鄉鎮／區域</span>
                  <select value={area} onChange={(e) => setArea(e.target.value)}>
                    {areaOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.place}｜跨區費 +{money(option.fee)}</option>
                    ))}
                  </select>
                </label>
                <div className="field">
                  <span>搬運方式</span>
                  <div className="delivery-switch" role="group" aria-label="搬運方式">
                    <button className={!noElevator ? "active" : ""} onClick={() => setNoElevator(false)}>有電梯／免計</button>
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
              <p className="condition-summary">送至 <b>{selectedArea.place}</b> · 跨區費 {money(selectedArea.fee)} · {noElevator ? `無電梯 ${floor} 樓` : "有電梯或免樓層費"}</p>
            </div>

            <div className="step-block">
              <div className="step-title"><b>03</b><div><h3>需要加做嗎？</h3><p>可以略過；先顯示最常用的 6 項</p></div></div>
              <div className="extras-grid">
                {availableExtras.map((item) => {
                  const qty = selectedExtras[item.id] ?? 0;
                  const needsQuote = item.price === null;
                  const group = wallGroup(item);
                  return (
                    <div className={`${qty > 0 ? "extra-card selected" : "extra-card"}${needsQuote ? " quote-only" : ""}${group ? ` wall-${group}` : ""}`} key={item.id}>
                      <button className="extra-info" onClick={() => setExtra(item.id, qty > 0 ? 0 : 1)} aria-pressed={qty > 0} disabled={needsQuote}>
                        <span className="check-mark">{needsQuote ? "詢" : qty > 0 ? "✓" : "+"}</span>
                        <span>{group && <em className="wall-group-badge">{wallGroupLabel(group)}</em>}<b>{item.name}</b><small>{needsQuote ? "現場報價" : `${money(item.price)}／${item.unit}`}</small></span>
                      </button>
                      {qty > 0 && (
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
                  {showAllExtras ? "收起其他加項" : `查看其他 ${sortedExtras.length - 6} 項`}
                </button>
              )}
            </div>
          </div>

          <aside className="estimate-card" id="estimate" aria-live="polite">
            <div className="estimate-label"><span className="live-dot">試算結果</span><small>價格含稅</small></div>
            <h3>{cartRows.length ? `同址配送｜${cartRows.reduce((sum, row) => sum + row.qty, 0)} 件商品` : "先加入本次配送商品"}</h3>
            <div className="estimate-total"><small>預估合計</small><strong>{money(total)}</strong></div>
            <div className="estimate-lines">
              {cartRows.map(({ item, qty }) => (
                <div key={`summary-${item.id}`}><span>{item.name} × {qty}</span><b>{money((item.price ?? 0) * qty)}</b></div>
              ))}
              {cartRows.length > 0 && <div className="summary-subtotal"><span>商品基本費小計</span><b>{money(baseTotal)}</b></div>}
              {cartRows.length > 0 && <div><span>{selectedArea.place}跨區費（同址一次）</span><b>{money(areaTotal)}</b></div>}
              {stairTotal > 0 && <div><span>樓層搬運費</span><b>{money(stairTotal)}</b></div>}
              {selectedExtraRows.map(({ item, qty }) => (
                <div key={item.id}><span>{item.name} × {qty}</span><b>{money((item.price ?? 0) * qty)}</b></div>
              ))}
            </div>
            <div className="estimate-footer">
              <p><b>同址混搭計價提醒</b><br />本工具先按各品項標準費率加總；同車次的非四機優惠、贈品與特殊組合，請再由門市確認。</p>
              <button onClick={() => { setCart({}); setQuantity(1); setArea(areaOptions[0].value); setNoElevator(false); setFloor(3); setSelectedExtras({}); }}>清空整張訂單</button>
            </div>
          </aside>
        </div>
      </section>

      {cartRows.length > 0 && (
        <a className="mobile-total" href="#estimate">
          <span>{cartRows.reduce((sum, row) => sum + row.qty, 0)} 件商品</span>
          <b>{money(total)}</b>
          <em>看明細 ↑</em>
        </a>
      )}

      <section className="fees-section" id="fees">
        <div className="fee-toolbar">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜尋：銅管、冰箱、壁掛…" aria-label="搜尋價目" />
          </label>
        </div>
        <div className="filter-row" aria-label="價目分類">
          {filterOptions.map((filter) => (
            <button key={filter} className={feeFilter === filter ? "filter active" : "filter"} onClick={() => setFeeFilter(filter)}>{filter}</button>
          ))}
        </div>
        <div className="fee-list">
          <div className="fee-list-head"><span>類別／項目</span><span>單價（含稅）</span></div>
          {filteredFees.slice(0, 80).map((item) => {
            const group = wallGroup(item);
            return (
              <article className={`fee-row${group ? ` wall-row wall-${group}` : ""}`} key={`fee-${item.id}`}>
                <span className="category-tag">{group ? wallGroupLabel(group) : item.category}</span>
                <div><h3>{item.name}</h3>{item.note && <p>{item.note}</p>}</div>
                <strong>{item.price === null ? "另議" : money(item.price)}<small>{item.unit ? `／${item.unit}` : ""}</small></strong>
              </article>
            );
          })}
          {filteredFees.length === 0 && <p className="empty-state">找不到符合的項目，請換個關鍵字。</p>}
          {filteredFees.length > 80 && <p className="list-note">共 {filteredFees.length} 筆，請使用搜尋或分類縮小範圍。</p>}
        </div>
      </section>

      <section className="area-section">
        <div className="area-intro">
          <p className="eyebrow"><span /> 五甲店跨區費</p>
          <h2>配送到哪裡？<br />費率清楚標示。</h2>
          <p>跨區費依送達地區加收；超出表列區域，費用另議。</p>
          <a href="#calculator" className="text-link">帶入試算器 ↑</a>
        </div>
        <div className="area-table">
          {Object.entries(areaFees).map(([key, info]) => (
            <div key={key}>
              <strong>+{money(info.price)}</strong>
              <span>{info.places}</span>
            </div>
          ))}
          <div className="area-other"><strong>其他地區</strong><span>超出以上區域另議</span></div>
        </div>
      </section>

      <section className="notes-section" id="notes">
        <div className="section-heading">
          <p className="eyebrow"><span /> 計價提醒</p>
          <h2>施工前，請先確認這些事</h2>
        </div>
        <div className="note-cards">
          <article><span>01</span><h3>免費舊機回收</h3><p>購買四機家電，同一地點、同一時間原則上免費回收舊機；不含大型機具、工程或危險施工。</p></article>
          <article><span>02</span><h3>三樓起樓層費</h3><p>無電梯三樓（含）以上，依商品尺寸每多一層（含半層）加收 50 或 100 元；冷氣依機型計價。</p></article>
          <article><span>03</span><h3>危險施工另議</h3><p>外牆懸掛、攀爬、特殊工程或超出施工能力與安全範圍者，須現場評估，也可能無法施工。</p></article>
          <article><span>04</span><h3>額外服務先報價</h3><p>非基本安裝、材料、加工與未列項目，應先提供報價，取得顧客同意後再施工。</p></article>
        </div>
        <div className="source-note">
          <div><span className="brand-mark small">易</span><p><b>資料來源</b><br />《家電配送安裝合約 2026 版》附件三，第 20–27 頁。</p></div>
          <p>本工具僅供快速估算，實際收費以合約、門市與現場施工人員確認為準。</p>
        </div>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark">易</span><span>配送安裝費試算</span></div>
        <p>2026 · 五甲店配送安裝價目</p>
        <a href="#top">回到頁首 ↑</a>
      </footer>
    </main>
  );
}
