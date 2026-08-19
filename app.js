const ESRI_WORLD_IMAGERY_TILE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const statusMeta = {
  available: { label: "Tersedia", color: "#11a866", fill: "#18b972" },
  occupied: { label: "Sold", color: "#e04b3d", fill: "#df5d50" },
  reserved: { label: "Reserved", color: "#f0a51a", fill: "#f5bf3d" },
};

const utilityMeta = {
  electric: { label: "Listrik 20kV", color: "#f7c948" },
  gas: { label: "Gas PGN", color: "#f97316" },
  water: { label: "Pipa Air WTP", color: "#1d9bf0" },
  drain: { label: "Drainase", color: "#38bdf8" },
  fiber: { label: "Fiber Optik", color: "#a855f7" },
};

const ewsMeta = {
  safe: { label: "Aman", color: "#008f86" },
  attention: { label: "Perlu Monitor", color: "#ee9f12" },
  critical: { label: "Kritis", color: "#df493d" },
};

const ll = ([lat, lng]) => [lng, lat];

const sierBoundary = [
  [112.7484147, -7.3366144],
  [112.7548224, -7.3374019],
  [112.7577568, -7.3375564],
  [112.7615323, -7.3382196],
  [112.7645055, -7.3383809],
  [112.7658522, -7.3317714],
  [112.7653016, -7.3281737],
  [112.7652874, -7.3239767],
  [112.7604774, -7.3238416],
  [112.7550346, -7.3237551],
  [112.7527659, -7.3255498],
  [112.7499551, -7.3302907],
  [112.7486450, -7.3350630],
  [112.7484147, -7.3366144],
];

const rectLot = ({ id, status, lng, lat, w, h, area = "5.000 m2", power = "200 KVA" }) => ({
  id,
  status,
  area,
  dim: "50m x 100m",
  price: "Rp 3.400.000",
  total: "Rp 17.000.000.000",
  power,
  coords: [[lng, lat], [lng + w, lat], [lng + w, lat - h], [lng, lat - h], [lng, lat]],
});

const lots = [
  rectLot({ id: "A-01", status: "available", lng: 112.75278, lat: -7.32618, w: 0.00062, h: 0.00052, area: "2.100 m2", power: "100 KVA" }),
  rectLot({ id: "A-02", status: "occupied", lng: 112.75402, lat: -7.32602, w: 0.00072, h: 0.00058, area: "2.400 m2", power: "150 KVA" }),
  rectLot({ id: "A-03", status: "occupied", lng: 112.75512, lat: -7.32608, w: 0.00066, h: 0.00058, area: "2.300 m2", power: "150 KVA" }),
  rectLot({ id: "A-04", status: "reserved", lng: 112.75620, lat: -7.32620, w: 0.00060, h: 0.00052, area: "2.000 m2", power: "100 KVA" }),
  rectLot({ id: "A-05", status: "available", lng: 112.75742, lat: -7.32615, w: 0.00068, h: 0.00052, area: "2.200 m2", power: "200 KVA" }),
  rectLot({ id: "B-01", status: "occupied", lng: 112.75272, lat: -7.32782, w: 0.00062, h: 0.00052, area: "1.900 m2", power: "100 KVA" }),
  rectLot({ id: "B-03", status: "occupied", lng: 112.75500, lat: -7.32782, w: 0.00066, h: 0.00052, area: "2.100 m2", power: "100 KVA" }),
  rectLot({ id: "B-04", status: "available", lng: 112.75628, lat: -7.32782, w: 0.00062, h: 0.00052, area: "2.000 m2", power: "200 KVA" }),
  rectLot({ id: "B-05", status: "available", lng: 112.75742, lat: -7.32782, w: 0.00068, h: 0.00052, area: "2.200 m2", power: "200 KVA" }),
  rectLot({ id: "C-01", status: "occupied", lng: 112.76000, lat: -7.32568, w: 0.00066, h: 0.00056, area: "2.100 m2", power: "150 KVA" }),
  rectLot({ id: "C-02", status: "occupied", lng: 112.76115, lat: -7.32745, w: 0.00070, h: 0.00105, area: "3.800 m2", power: "200 KVA" }),
  rectLot({ id: "D-01", status: "occupied", lng: 112.75165, lat: -7.33058, w: 0.00070, h: 0.00062, area: "2.300 m2", power: "100 KVA" }),
  rectLot({ id: "D-02", status: "reserved", lng: 112.75272, lat: -7.33078, w: 0.00072, h: 0.00072, area: "2.700 m2", power: "150 KVA" }),
  rectLot({ id: "D-03", status: "occupied", lng: 112.75372, lat: -7.33082, w: 0.00062, h: 0.00062, area: "2.000 m2", power: "100 KVA" }),
  rectLot({ id: "D-04", status: "available", lng: 112.75645, lat: -7.33135, w: 0.00082, h: 0.00110, area: "4.500 m2", power: "200 KVA" }),
  rectLot({ id: "D-05", status: "occupied", lng: 112.75842, lat: -7.33172, w: 0.00182, h: 0.00072, area: "5.000 m2", power: "250 KVA" }),
  rectLot({ id: "E-01", status: "reserved", lng: 112.75030, lat: -7.33190, w: 0.00090, h: 0.00036, area: "1.300 m2", power: "50 KVA" }),
  rectLot({ id: "E-02", status: "reserved", lng: 112.75042, lat: -7.33242, w: 0.00088, h: 0.00036, area: "1.200 m2", power: "50 KVA" }),
  rectLot({ id: "E-03", status: "occupied", lng: 112.75148, lat: -7.33212, w: 0.00052, h: 0.00086, area: "1.700 m2", power: "100 KVA" }),
  rectLot({ id: "E-04", status: "occupied", lng: 112.75242, lat: -7.33210, w: 0.00112, h: 0.00086, area: "3.900 m2", power: "150 KVA" }),
  rectLot({ id: "E-05", status: "occupied", lng: 112.75802, lat: -7.33282, w: 0.00120, h: 0.00092, area: "4.300 m2", power: "200 KVA" }),
  rectLot({ id: "F-01", status: "available", lng: 112.76045, lat: -7.32890, w: 0.00068, h: 0.00062, area: "2.200 m2", power: "150 KVA" }),
  rectLot({ id: "F-02", status: "occupied", lng: 112.76135, lat: -7.32912, w: 0.00082, h: 0.00070, area: "2.800 m2", power: "150 KVA" }),
  rectLot({ id: "F-03", status: "reserved", lng: 112.76250, lat: -7.32920, w: 0.00072, h: 0.00062, area: "2.400 m2", power: "100 KVA" }),
  rectLot({ id: "G-01", status: "occupied", lng: 112.75135, lat: -7.33342, w: 0.00058, h: 0.00100, area: "2.200 m2", power: "100 KVA" }),
  rectLot({ id: "G-02", status: "available", lng: 112.75232, lat: -7.33352, w: 0.00080, h: 0.00104, area: "3.000 m2", power: "150 KVA" }),
  rectLot({ id: "G-03", status: "occupied", lng: 112.75345, lat: -7.33348, w: 0.00090, h: 0.00078, area: "3.100 m2", power: "150 KVA" }),
  rectLot({ id: "G-04", status: "reserved", lng: 112.75530, lat: -7.33312, w: 0.00082, h: 0.00092, area: "3.200 m2", power: "200 KVA" }),
  rectLot({ id: "G-05", status: "available", lng: 112.75675, lat: -7.33322, w: 0.00108, h: 0.00078, area: "3.600 m2", power: "200 KVA" }),
  rectLot({ id: "H-01", status: "occupied", lng: 112.75965, lat: -7.33410, w: 0.00112, h: 0.00082, area: "4.000 m2", power: "250 KVA" }),
  rectLot({ id: "H-02", status: "available", lng: 112.76115, lat: -7.33405, w: 0.00102, h: 0.00072, area: "3.400 m2", power: "200 KVA" }),
];

const berbekBoundary = [
  [-7.3438757, 112.7536671], [-7.3440411, 112.7537306], [-7.3448601, 112.7568590],
  [-7.3503646, 112.7560967], [-7.3504276, 112.7572798], [-7.3503252, 112.7586375],
  [-7.3494511, 112.7588202], [-7.3487502, 112.7587646], [-7.3483644, 112.7585423],
  [-7.3478210, 112.7585264], [-7.3475296, 112.7582326], [-7.3471280, 112.7582485],
  [-7.3467894, 112.7583438], [-7.3466162, 112.7587169], [-7.3462697, 112.7588916],
  [-7.3453877, 112.7589472], [-7.3444978, 112.7591060], [-7.3452459, 112.7626076],
  [-7.3440411, 112.7628775], [-7.3436001, 112.7630363], [-7.3429144, 112.7629292],
  [-7.3424286, 112.7630452], [-7.3419508, 112.7631593], [-7.3414182, 112.7632865],
  [-7.3409151, 112.7633611], [-7.3398117, 112.7635247], [-7.3391266, 112.7634373],
  [-7.3389454, 112.7633103], [-7.3386619, 112.7632309], [-7.3382196, 112.7615323],
  [-7.3379459, 112.7601696], [-7.3375564, 112.7577568], [-7.3368497, 112.7552216],
  [-7.3370502, 112.7548848], [-7.3374019, 112.7548224], [-7.3385044, 112.7543460],
  [-7.3403078, 112.7541475], [-7.3416702, 112.7537663], [-7.3417568, 112.7540681],
  [-7.3428829, 112.7537901], [-7.3438757, 112.7536671],
].map(ll);

const pierBoundary = [
  [-7.6215324, 112.8088105], [-7.6216306, 112.8093551], [-7.6234405, 112.8089154],
  [-7.6255245, 112.8111386], [-7.6264577, 112.8105253], [-7.6271372, 112.8125674],
  [-7.6284377, 112.8123965], [-7.6291737, 112.8135321], [-7.6296436, 112.8132369],
  [-7.6300258, 112.8154885], [-7.6312661, 112.8164561], [-7.6326726, 112.8177194],
  [-7.6347307, 112.8189792], [-7.6403224, 112.8202879], [-7.6415359, 112.8182178],
  [-7.6453702, 112.8196850], [-7.6466266, 112.8207320], [-7.6485301, 112.8203132],
  [-7.6508144, 112.8213982], [-7.6517472, 112.8210366], [-7.6518507, 112.8231412],
  [-7.6536353, 112.8231114], [-7.6538137, 112.8246581], [-7.6548250, 112.8233196],
  [-7.6559619, 112.8226112], [-7.6566988, 112.8248068], [-7.6580066, 112.8269735],
  [-7.6578188, 112.8280185], [-7.6562507, 112.8290577], [-7.6560812, 112.8323135],
  [-7.6550630, 112.8326888], [-7.6537543, 112.8312611], [-7.6510179, 112.8304878],
  [-7.6504445, 112.8287486], [-7.6440173, 112.8311819], [-7.6451910, 112.8330175],
  [-7.6444719, 112.8342786], [-7.6430749, 112.8327866], [-7.6401365, 112.8316531],
  [-7.6394805, 112.8331964], [-7.6366563, 112.8338078], [-7.6317626, 112.8235576],
  [-7.6291609, 112.8201309], [-7.6266266, 112.8178141], [-7.6195291, 112.8187340],
  [-7.6152521, 112.8204751], [-7.6129972, 112.8207911], [-7.6119751, 112.8176021],
  [-7.6132066, 112.8154668], [-7.6174777, 112.8148655], [-7.6164385, 112.8106010],
  [-7.6171258, 112.8103492], [-7.6182007, 112.8107100], [-7.6205416, 112.8095188],
  [-7.6215324, 112.8088105],
].map(ll);

const berbekLots = [
  rectLot({ id: "BB-A01", status: "available", lng: 112.75520, lat: -7.33880, w: 0.00070, h: 0.00062, area: "2.200 m2", power: "100 KVA" }),
  rectLot({ id: "BB-A02", status: "occupied", lng: 112.75615, lat: -7.33892, w: 0.00078, h: 0.00068, area: "2.700 m2", power: "150 KVA" }),
  rectLot({ id: "BB-A03", status: "reserved", lng: 112.75722, lat: -7.33905, w: 0.00082, h: 0.00072, area: "3.000 m2", power: "150 KVA" }),
  rectLot({ id: "BB-A04", status: "available", lng: 112.75835, lat: -7.33918, w: 0.00092, h: 0.00070, area: "3.300 m2", power: "200 KVA" }),
  rectLot({ id: "BB-A05", status: "occupied", lng: 112.75955, lat: -7.33928, w: 0.00096, h: 0.00076, area: "3.600 m2", power: "200 KVA" }),
  rectLot({ id: "BB-B01", status: "occupied", lng: 112.75545, lat: -7.34052, w: 0.00078, h: 0.00078, area: "2.900 m2", power: "150 KVA" }),
  rectLot({ id: "BB-B02", status: "available", lng: 112.75655, lat: -7.34068, w: 0.00088, h: 0.00076, area: "3.200 m2", power: "150 KVA" }),
  rectLot({ id: "BB-B03", status: "occupied", lng: 112.75772, lat: -7.34082, w: 0.00094, h: 0.00082, area: "3.700 m2", power: "200 KVA" }),
  rectLot({ id: "BB-B04", status: "reserved", lng: 112.75902, lat: -7.34096, w: 0.00090, h: 0.00078, area: "3.400 m2", power: "200 KVA" }),
  rectLot({ id: "BB-C01", status: "available", lng: 112.75578, lat: -7.34235, w: 0.00074, h: 0.00082, area: "2.900 m2", power: "100 KVA" }),
  rectLot({ id: "BB-C02", status: "occupied", lng: 112.75688, lat: -7.34252, w: 0.00088, h: 0.00084, area: "3.500 m2", power: "150 KVA" }),
  rectLot({ id: "BB-C03", status: "occupied", lng: 112.75812, lat: -7.34262, w: 0.00100, h: 0.00092, area: "4.200 m2", power: "200 KVA" }),
  rectLot({ id: "BB-C04", status: "available", lng: 112.75955, lat: -7.34272, w: 0.00102, h: 0.00088, area: "4.000 m2", power: "200 KVA" }),
  rectLot({ id: "BB-D01", status: "reserved", lng: 112.75605, lat: -7.34435, w: 0.00088, h: 0.00070, area: "2.900 m2", power: "150 KVA" }),
  rectLot({ id: "BB-D02", status: "occupied", lng: 112.75728, lat: -7.34412, w: 0.00100, h: 0.00076, area: "3.700 m2", power: "200 KVA" }),
  rectLot({ id: "BB-D03", status: "available", lng: 112.75872, lat: -7.34400, w: 0.00110, h: 0.00082, area: "4.300 m2", power: "200 KVA" }),
];

const pierLots = [
  rectLot({ id: "P-A01", status: "available", lng: 112.81340, lat: -7.62420, w: 0.00135, h: 0.00105, area: "6.200 m2", power: "250 KVA" }),
  rectLot({ id: "P-A02", status: "occupied", lng: 112.81525, lat: -7.62475, w: 0.00155, h: 0.00115, area: "7.100 m2", power: "300 KVA" }),
  rectLot({ id: "P-A03", status: "reserved", lng: 112.81725, lat: -7.62535, w: 0.00152, h: 0.00112, area: "6.900 m2", power: "250 KVA" }),
  rectLot({ id: "P-A04", status: "available", lng: 112.81935, lat: -7.62610, w: 0.00170, h: 0.00118, area: "7.800 m2", power: "300 KVA" }),
  rectLot({ id: "P-B01", status: "occupied", lng: 112.81580, lat: -7.63005, w: 0.00162, h: 0.00124, area: "8.100 m2", power: "300 KVA" }),
  rectLot({ id: "P-B02", status: "available", lng: 112.81800, lat: -7.63070, w: 0.00180, h: 0.00130, area: "9.000 m2", power: "350 KVA" }),
  rectLot({ id: "P-B03", status: "occupied", lng: 112.82042, lat: -7.63135, w: 0.00174, h: 0.00128, area: "8.700 m2", power: "300 KVA" }),
  rectLot({ id: "P-B04", status: "reserved", lng: 112.82272, lat: -7.63210, w: 0.00168, h: 0.00122, area: "8.200 m2", power: "300 KVA" }),
  rectLot({ id: "P-C01", status: "available", lng: 112.82005, lat: -7.63775, w: 0.00185, h: 0.00135, area: "9.400 m2", power: "350 KVA" }),
  rectLot({ id: "P-C02", status: "occupied", lng: 112.82245, lat: -7.63840, w: 0.00192, h: 0.00142, area: "10.000 m2", power: "400 KVA" }),
  rectLot({ id: "P-C03", status: "available", lng: 112.82505, lat: -7.63910, w: 0.00188, h: 0.00134, area: "9.600 m2", power: "350 KVA" }),
  rectLot({ id: "P-D01", status: "occupied", lng: 112.82135, lat: -7.64485, w: 0.00174, h: 0.00138, area: "8.900 m2", power: "300 KVA" }),
  rectLot({ id: "P-D02", status: "reserved", lng: 112.82380, lat: -7.64535, w: 0.00195, h: 0.00145, area: "10.200 m2", power: "400 KVA" }),
  rectLot({ id: "P-D03", status: "available", lng: 112.82645, lat: -7.64445, w: 0.00178, h: 0.00132, area: "9.100 m2", power: "350 KVA" }),
  rectLot({ id: "P-E01", status: "occupied", lng: 112.82405, lat: -7.65165, w: 0.00182, h: 0.00130, area: "9.300 m2", power: "350 KVA" }),
  rectLot({ id: "P-E02", status: "available", lng: 112.82660, lat: -7.65205, w: 0.00172, h: 0.00122, area: "8.400 m2", power: "300 KVA" }),
];

const roads = [
  [[112.7525, -7.3255], [112.7612, -7.3255]],
  [[112.7525, -7.3275], [112.7612, -7.3275]],
  [[112.7525, -7.3296], [112.7612, -7.3296]],
  [[112.75445, -7.3252], [112.75445, -7.3302]],
  [[112.75595, -7.3252], [112.75595, -7.3302]],
  [[112.75765, -7.3252], [112.75765, -7.3302]],
  [[112.75925, -7.3252], [112.75925, -7.3302]],
];

const utilityRoutes = [
  { type: "electric", path: [[112.7518, -7.32555], [112.75445, -7.32555], [112.75445, -7.32745], [112.75765, -7.32745], [112.75765, -7.33015], [112.76085, -7.33015], [112.76085, -7.33305]] },
  { type: "gas", path: [[112.7520, -7.32972], [112.75455, -7.32972], [112.75455, -7.33155], [112.75685, -7.33155], [112.75685, -7.33485]] },
  { type: "water", path: [[112.7537, -7.33355], [112.7537, -7.32962], [112.75445, -7.32962], [112.75445, -7.32755], [112.75925, -7.32755], [112.75925, -7.32995]] },
  { type: "drain", path: [[112.7520, -7.33025], [112.75595, -7.33025], [112.75595, -7.33145], [112.75925, -7.33145], [112.75925, -7.33365], [112.76115, -7.33365]] },
  { type: "fiber", path: [[112.7524, -7.32635], [112.75595, -7.32635], [112.75595, -7.32745], [112.75925, -7.32745], [112.75925, -7.3328], [112.76155, -7.3328]] },
];

const utilityZones = [
  { type: "electric", name: "Gardu Induk SIER", coord: [112.76085, -7.33305] },
  { type: "gas", name: "Gas Metering Station", coord: [112.75685, -7.33485] },
  { type: "water", name: "WTP Kawasan", coord: [112.7537, -7.33355] },
  { type: "drain", name: "Outlet Drainase Kawasan", coord: [112.76115, -7.33365] },
  { type: "fiber", name: "Fiber Backbone Node", coord: [112.76155, -7.3328] },
];

const estateData = {
  sier: {
    name: "SIER",
    detailName: "Kawasan Industri SIER",
    boundary: sierBoundary,
    lots,
    roads,
    utilityRoutes,
    utilityZones,
  },
  berbek: {
    name: "Berbek",
    detailName: "Kawasan Industri Berbek",
    boundary: berbekBoundary,
    roads: [
      [[112.7552, -7.3390], [112.7626, -7.3398]],
      [[112.7556, -7.3410], [112.7624, -7.3418]],
      [[112.7560, -7.3430], [112.7617, -7.3437]],
      [[112.7570, -7.3382], [112.7578, -7.3443]],
      [[112.7595, -7.3385], [112.7602, -7.3440]],
    ],
    utilityRoutes: [
      { type: "electric", path: [[112.7554, -7.33915], [112.7586, -7.33945], [112.75875, -7.3412], [112.7601, -7.34135]] },
      { type: "gas", path: [[112.7560, -7.34365], [112.75815, -7.34382], [112.75805, -7.34245], [112.7612, -7.34275]] },
      { type: "water", path: [[112.75645, -7.34115], [112.7571, -7.3412], [112.75728, -7.3387], [112.7597, -7.33892]] },
      { type: "drain", path: [[112.7562, -7.34425], [112.75985, -7.34438], [112.7600, -7.34245], [112.76205, -7.34262]] },
      { type: "fiber", path: [[112.7558, -7.34085], [112.75935, -7.34112], [112.75945, -7.3390], [112.76195, -7.3392]] },
    ],
    utilityZones: [
      { type: "electric", name: "Gardu Berbek", coord: [112.7601, -7.34135] },
      { type: "gas", name: "Gas Berbek", coord: [112.7612, -7.34275] },
      { type: "water", name: "Reservoir Berbek", coord: [112.75645, -7.34115] },
      { type: "drain", name: "Outlet Drainase Berbek", coord: [112.76205, -7.34262] },
      { type: "fiber", name: "Fiber Node Berbek", coord: [112.76195, -7.3392] },
    ],
    lots: berbekLots,
  },
  pier: {
    name: "PIER",
    detailName: "Kawasan Industri PIER",
    boundary: pierBoundary,
    roads: [
      [[112.8140, -7.6228], [112.8310, -7.6400]],
      [[112.8182, -7.6210], [112.8340, -7.6370]],
      [[112.8130, -7.6290], [112.8265, -7.6255]],
      [[112.8200, -7.6440], [112.8330, -7.6395]],
      [[112.8240, -7.6265], [112.8250, -7.6500]],
    ],
    utilityRoutes: [
      { type: "electric", path: [[112.8160, -7.6242], [112.8238, -7.6318], [112.8255, -7.6350], [112.8312, -7.6404]] },
      { type: "gas", path: [[112.8190, -7.6476], [112.8247, -7.6448], [112.8290, -7.6420], [112.8335, -7.6393]] },
      { type: "water", path: [[112.8194, -7.6278], [112.8230, -7.6314], [112.8244, -7.6380], [112.8242, -7.6478]] },
      { type: "drain", path: [[112.8177, -7.6502], [112.8247, -7.6538], [112.8276, -7.6480], [112.8270, -7.6382], [112.8260, -7.6260]] },
      { type: "fiber", path: [[112.8145, -7.6298], [112.8210, -7.6330], [112.8275, -7.6350], [112.8320, -7.6380]] },
    ],
    utilityZones: [
      { type: "electric", name: "Substation PIER", coord: [112.8255, -7.6350] },
      { type: "gas", name: "Gas PIER", coord: [112.8290, -7.6420] },
      { type: "water", name: "WTP PIER", coord: [112.8194, -7.6278] },
      { type: "drain", name: "WWTP / Drainage", coord: [112.8247, -7.6538] },
      { type: "fiber", name: "Fiber Backbone PIER", coord: [112.8320, -7.6380] },
    ],
    lots: pierLots,
  },
};

const tenantNames = [
  "Nusantara Precision", "Surya Logistik", "Indo Packaging", "Rungkut Metalworks",
  "Berkah Food Tech", "Sinar Elektronik", "Prima Chemical", "Global Warehousing",
  "Jatim Auto Parts", "Sentra Cold Chain",
];

function enrichOperationalData() {
  Object.entries(estateData).forEach(([estateKey, estate]) => {
    estate.iotAssets = estate.iotAssets || [
      { type: "gate", name: `Gate Utama ${estate.name}`, coord: estate.boundary[1], status: "online" },
      { type: "camera", name: `CCTV Koridor ${estate.name}`, coord: estate.boundary[Math.floor(estate.boundary.length / 3)], status: "online" },
      { type: "sensor", name: `IoT Drainase ${estate.name}`, coord: estate.boundary[Math.floor(estate.boundary.length / 2)], status: "monitor" },
    ];
    estate.lots.forEach((lot, index) => {
      const isOccupied = lot.status === "occupied";
      const isReserved = lot.status === "reserved";
      const contractDays = isOccupied ? [28, 74, 118, 182, 320][index % 5] : null;
      const maintenanceDays = [12, 36, 58, 96, 140][index % 5];
      const utilityNeed = ["fiber", "drain", "electric", "water", "gas"][index % 5];
      const contractRisk = !isOccupied ? "safe" : contractDays <= 60 ? "critical" : contractDays <= 120 ? "attention" : "safe";
      const maintenanceRisk = maintenanceDays <= 30 ? "critical" : maintenanceDays <= 75 ? "attention" : "safe";
      lot.ops = {
        tenant: isOccupied ? tenantNames[index % tenantNames.length] : isReserved ? "Calon tenant reserved" : "Belum ditempati",
        contractEnd: isOccupied ? `${contractDays} hari lagi` : "-",
        contractRisk,
        maintenance: {
          item: ["Atap gudang", "Drainase sisi kavling", "Panel listrik", "Akses loading", "PJU koridor"][index % 5],
          next: `${maintenanceDays} hari lagi`,
          risk: maintenanceRisk,
        },
        utilities: {
          need: utilityNeed,
          note: isOccupied ? `Permintaan review ${utilityMeta[utilityNeed].label}` : "Siap koneksi utilitas dasar",
        },
        iot: {
          gate: index % 3 === 0 ? "Gate timur" : "Gate utama",
          device: index % 2 === 0 ? "CCTV + smart meter" : "CCTV",
          status: index % 4 === 0 ? "Butuh inspeksi" : "Online",
        },
        finance: {
          billing: isOccupied ? (index % 4 === 0 ? "Outstanding" : "Current") : "N/A",
          revenue: isOccupied ? `Rp ${(80 + index * 7).toLocaleString("id-ID")} jt/bln` : "-",
        },
      };
    });
  });
}

enrichOperationalData();

const estateGalleries = {
  sier: [
    "assets/sier-aerial-masterplan.png",
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
  ],
  berbek: [
    "assets/sier-aerial-masterplan.png",
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?auto=format&fit=crop&w=900&q=80",
  ],
  pier: [
    "assets/sier-aerial-masterplan.png",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
  ],
};

const layerItems = [
  ["building-2", "Bangunan & Tenant", "tenant"],
  ["calendar-clock", "EWS Kontrak", "contract"],
  ["wrench", "Maintenance", "maintenance"],
  ["cctv", "IoT, Gate & CCTV", "iot"],
  ["wallet-cards", "Supporting Finance", "finance"],
  ["file-text", "Legalitas (HGB, IMB)", "legal"],
  ["cable", "Infrastruktur & Utilitas", "utility"],
  ["map", "Zonasi Industri", "zone"],
  ["traffic-cone", "Jaringan Jalan", "road"],
  ["blocks", "Batas Kawasan", "boundary"],
  ["landmark", "Label Kavling", "label"],
];

const layerState = {
  status: true,
  tenant: true,
  contract: true,
  maintenance: true,
  iot: true,
  finance: true,
  legal: true,
  utility: true,
  zone: true,
  road: true,
  boundary: true,
  label: true,
};
let internalMode = true;
let activeStatus = "all";
let maxAreaFilter = 25000;
let minPriceFilter = 0;
let maxPriceFilter = Infinity;
let powerFilter = "200";
let activeEstateKey = "sier";
const activeEstate = () => estateData[activeEstateKey];
const currentLots = () => activeEstate().lots;
let selectedLot = currentLots()[0];
let hasLotSelection = false;
let activePopup = null;
let measureMode = false;
let layerPanelOpen = false;
let legendExpanded = false;
let toastTimer = 0;
let measurePath = [];
let measureDraftMarkers = [];
let pendingMeasureIndex = 1;
let measurements = [];
let undoneMeasurements = [];
let measuringSourceReady = false;
let activeMapStyle = "satellite";
let galleryIndex = 0;
const favoriteLots = new Set();

const featureCollection = (features) => ({ type: "FeatureCollection", features });
const lotFeature = (lot) => ({
  type: "Feature",
  properties: { ...lot, selected: hasLotSelection && lot.id === selectedLot.id, color: statusMeta[lot.status].color, fill: statusMeta[lot.status].fill },
  geometry: { type: "Polygon", coordinates: [lot.coords] },
});
const lineFeature = (path, props = {}) => ({ type: "Feature", properties: props, geometry: { type: "LineString", coordinates: path } });
const pointFeature = (coord, props = {}) => ({ type: "Feature", properties: props, geometry: { type: "Point", coordinates: coord } });
const centroid = (coords) => {
  const points = coords.slice(0, -1);
  return [
    points.reduce((sum, point) => sum + point[0], 0) / points.length,
    points.reduce((sum, point) => sum + point[1], 0) / points.length,
  ];
};

const internalLots = () => visibleLots().filter((lot) => lot.status !== "available");

function contractFeature(lot) {
  const ops = lot.ops || {};
  return { ...lotFeature(lot), properties: { id: lot.id, risk: ops.contractRisk, color: ewsMeta[ops.contractRisk]?.color || ewsMeta.safe.color } };
}

function tenantLabelFeature(lot) {
  const tenant = lot.ops?.tenant || "-";
  return pointFeature(centroid(lot.coords), { label: tenant, id: lot.id, status: lot.status });
}

function maintenanceFeature(lot) {
  return pointFeature(centroid(lot.coords), {
    id: lot.id,
    item: lot.ops?.maintenance?.item || "Maintenance",
    risk: lot.ops?.maintenance?.risk || "safe",
    color: ewsMeta[lot.ops?.maintenance?.risk || "safe"].color,
  });
}

function financeFeature(lot) {
  return pointFeature(centroid(lot.coords), {
    id: lot.id,
    billing: lot.ops?.finance?.billing || "N/A",
    risk: lot.ops?.finance?.billing === "Outstanding" ? "critical" : "safe",
  });
}
function rupiahNumber(value) {
  return Number.parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
}

const visibleLots = () => currentLots().filter((lot) => {
  const statusMatch = activeStatus === "all" || lot.status === activeStatus;
  const areaMatch = lotAreaNumber(lot) <= maxAreaFilter;
  const price = rupiahNumber(lot.price);
  const priceMatch = price >= minPriceFilter && price <= maxPriceFilter;
  const power = rupiahNumber(lot.power);
  const powerMatch = powerFilter === "all" || (powerFilter === "200" ? power >= 200 : power === Number(powerFilter));
  return statusMatch && areaMatch && priceMatch && powerMatch;
});

function syncLegendPanel() {
  const legend = document.getElementById("utilityLegend");
  const button = document.getElementById("toggleLegend");
  if (!legend || !button) return;
  legend.classList.toggle("visible", legendExpanded);
  button.classList.toggle("active", legendExpanded);
  button.setAttribute("aria-expanded", String(legendExpanded));
}

function lotAreaNumber(lot) {
  return Number.parseFloat(String(lot.area).replace(/\./g, "").replace(",", ".")) || 0;
}

function updateStats() {
  const estateLots = currentLots();
  const counts = estateLots.reduce((acc, lot) => {
    acc[lot.status] = (acc[lot.status] || 0) + 1;
    return acc;
  }, { available: 0, reserved: 0, occupied: 0 });
  const availableHa = estateLots
    .filter((lot) => lot.status === "available")
    .reduce((sum, lot) => sum + lotAreaNumber(lot), 0) / 10000;

  document.querySelector('[data-stat-status="available"] strong').textContent = counts.available;
  document.querySelector('[data-stat-status="reserved"] strong').textContent = counts.reserved;
  document.querySelector('[data-stat-status="occupied"] strong').textContent = counts.occupied;
  document.querySelector('[data-stat-status="all"] strong').textContent = `${availableHa.toFixed(1)} Ha`;
  document.getElementById("ewsContractCount").textContent = estateLots.filter((lot) => lot.ops?.contractRisk === "critical").length;
  document.getElementById("ewsMaintenanceCount").textContent = estateLots.filter((lot) => ["critical", "attention"].includes(lot.ops?.maintenance?.risk)).length;
  document.getElementById("ewsUtilityCount").textContent = estateLots.filter((lot) => lot.ops?.utilities?.need === "fiber" || lot.ops?.utilities?.need === "drain").length;
}

function currentGallery() {
  return estateGalleries[activeEstateKey] || estateGalleries.sier;
}

function renderGallery() {
  const gallery = currentGallery().slice(0, 10);
  const img = document.getElementById("overviewPhoto");
  const counter = document.getElementById("photoCounter");
  if (!img || !counter || !gallery.length) return;
  galleryIndex = ((galleryIndex % gallery.length) + gallery.length) % gallery.length;
  img.onerror = () => {
    img.onerror = null;
    img.src = "assets/sier-aerial-masterplan.png";
  };
  img.src = gallery[galleryIndex];
  img.alt = `${activeEstate().detailName} ${galleryIndex + 1}`;
  counter.textContent = `${galleryIndex + 1}/${gallery.length}`;
}

function moveGallery(step) {
  galleryIndex += step;
  renderGallery();
}

function applyMapStyle(style) {
  activeMapStyle = style;
  const presets = {
    satellite: { opacity: 0.96, saturation: -0.04, contrast: 0.08, min: 0.02, max: 0.92 },
    dim: { opacity: 0.82, saturation: -0.28, contrast: -0.02, min: 0, max: 0.70 },
    contrast: { opacity: 1, saturation: 0.06, contrast: 0.22, min: 0.03, max: 1 },
  };
  const preset = presets[style] || presets.satellite;
  map.setPaintProperty("satellite", "raster-opacity", preset.opacity);
  map.setPaintProperty("satellite", "raster-saturation", preset.saturation);
  map.setPaintProperty("satellite", "raster-contrast", preset.contrast);
  map.setPaintProperty("satellite", "raster-brightness-min", preset.min);
  map.setPaintProperty("satellite", "raster-brightness-max", preset.max);
}

function flashToolButton(button) {
  button.classList.add("active");
  window.setTimeout(() => button.classList.remove("active"), 350);
}

function pointCoord(point) {
  if (Array.isArray(point)) return [point[0], point[1]];
  return [point.lng, point.lat];
}

function coordLngLat(coord) {
  return { lng: coord[0], lat: coord[1] };
}

function compactPath(path) {
  return path.reduce((items, point) => {
    const coord = pointCoord(point);
    const last = items[items.length - 1];
    if (!last || Math.abs(last[0] - coord[0]) > 0.00001 || Math.abs(last[1] - coord[1]) > 0.00001) items.push(coord);
    return items;
  }, []);
}

function elbowPathBetween(start, end, prefer = "lng-first") {
  const a = pointCoord(start);
  const b = pointCoord(end);
  const elbow = prefer === "lat-first" ? [a[0], b[1]] : [b[0], a[1]];
  return compactPath([a, elbow, b]);
}

function rightAnglePath(points) {
  const compact = compactPath(points);
  if (compact.length < 2) return compact;
  return compact.reduce((path, point, index) => {
    if (index === 0) return [point];
    const previous = compact[index - 1];
    const segment = elbowPathBetween(previous, point, index % 2 ? "lng-first" : "lat-first");
    return path.concat(segment.slice(1));
  }, []);
}

function pathDistanceMeters(path) {
  const compact = compactPath(path);
  return compact.slice(1).reduce((sum, point, index) => (
    sum + distanceMeters(coordLngLat(compact[index]), coordLngLat(point))
  ), 0);
}

function pathLabelCoord(path) {
  const compact = compactPath(path);
  if (compact.length < 2) return compact[0] || [0, 0];
  const total = pathDistanceMeters(compact);
  let walked = 0;
  for (let index = 1; index < compact.length; index += 1) {
    const start = compact[index - 1];
    const end = compact[index];
    const segment = distanceMeters(coordLngLat(start), coordLngLat(end));
    if (walked + segment >= total / 2) {
      const ratio = segment ? (total / 2 - walked) / segment : 0;
      return [start[0] + (end[0] - start[0]) * ratio, start[1] + (end[1] - start[1]) * ratio];
    }
    walked += segment;
  }
  return compact[Math.floor(compact.length / 2)];
}

function createMeasureMarker(label, variant = "start") {
  const el = document.createElement("div");
  el.className = `measure-point ${variant}`;
  el.textContent = label;
  return el;
}

function createMeasurementMarkers(path, index) {
  const compact = compactPath(path);
  if (!compact.length) return [];
  const startMarker = new maplibregl.Marker({ element: createMeasureMarker(`${index}A`, "start"), anchor: "center" })
    .setLngLat(compact[0])
    .addTo(map);
  const endMarker = new maplibregl.Marker({ element: createMeasureMarker(`${index}B`, "end"), anchor: "center" })
    .setLngLat(compact[compact.length - 1])
    .addTo(map);
  return [startMarker, endMarker];
}

function syncDraftMeasurement() {
  if (!measuringSourceReady) return;
  const draftPath = rightAnglePath(measurePath);
  map.getSource("measure-draft")?.setData(featureCollection(draftPath.length > 1 ? [lineFeature(draftPath, { id: "draft" })] : []));
}

function clearDraftMeasurement() {
  measurePath = [];
  measureDraftMarkers.forEach((marker) => marker.remove());
  measureDraftMarkers = [];
  map.getSource("measure-draft")?.setData(featureCollection([]));
}

function addDraftMeasurementPoint(point) {
  const coord = pointCoord(point);
  measurePath.push(coord);
  const index = pendingMeasureIndex;
  const label = measurePath.length === 1 ? `${index}A` : `${index}.${measurePath.length}`;
  const variant = measurePath.length === 1 ? "start" : "via";
  measureDraftMarkers.push(new maplibregl.Marker({ element: createMeasureMarker(label, variant), anchor: "center" }).setLngLat(coord).addTo(map));
  syncDraftMeasurement();
}

function syncMeasurementSources() {
  if (!measuringSourceReady) return;
  map.getSource("measure-line")?.setData(featureCollection(measurements.map((item) => lineFeature(item.path, { id: item.id }))));
  map.getSource("measure-label")?.setData(featureCollection(measurements.map((item) => ({
    type: "Feature",
    properties: { label: item.label },
    geometry: { type: "Point", coordinates: pathLabelCoord(item.path) },
  }))));
  renderMeasurementList();
}

function addMeasurement(path, label, meta = {}) {
  const finalPath = compactPath(path);
  if (finalPath.length < 2) return;
  const index = pendingMeasureIndex;
  pendingMeasureIndex += 1;
  const markers = createMeasurementMarkers(finalPath, index);
  measurements.push({ id: `M-${index}`, path: finalPath, label, markers, ...meta });
  undoneMeasurements.forEach((item) => item.markers.forEach((marker) => marker.remove()));
  undoneMeasurements = [];
  syncMeasurementSources();
}

function finishDraftMeasurement() {
  if (!measureMode) return;
  if (measurePath.length < 2) {
    showToast("Tambahkan minimal dua titik untuk menyimpan pengukuran");
    return;
  }
  const measureIndex = pendingMeasureIndex;
  const finalPath = rightAnglePath(measurePath);
  const label = formatDistance(pathDistanceMeters(finalPath));
  addMeasurement(finalPath, label, {
    title: `Pengukuran Manual ${measureIndex}`,
    subtitle: `${measurePath.length} titik kontrol, jalur siku mengikuti belokan`,
  });
  clearDraftMeasurement();
  measureMode = false;
  document.getElementById("measureTool").classList.remove("active");
  document.getElementById("measureTool").innerHTML = `<i data-lucide="ruler"></i>`;
  lucide.createIcons();
  map.doubleClickZoom.enable();
  showToast(`Pengukuran tersimpan: ${label}`);
}

function clearMeasurementLine() {
  clearDraftMeasurement();
  measureMode = false;
  document.getElementById("measureTool")?.classList.remove("active");
  const tool = document.getElementById("measureTool");
  if (tool) tool.innerHTML = `<i data-lucide="ruler"></i>`;
  lucide.createIcons();
  map.doubleClickZoom.enable();
  measurements.forEach((item) => item.markers.forEach((marker) => marker.remove()));
  undoneMeasurements.forEach((item) => item.markers.forEach((marker) => marker.remove()));
  measurements = [];
  undoneMeasurements = [];
  pendingMeasureIndex = 1;
  map.getSource("measure-line")?.setData(featureCollection([]));
  map.getSource("measure-label")?.setData(featureCollection([]));
  renderMeasurementList();
}

function removeMeasurement(id) {
  const index = measurements.findIndex((item) => item.id === id);
  if (index < 0) return;
  const [item] = measurements.splice(index, 1);
  item.markers.forEach((marker) => marker.remove());
  syncMeasurementSources();
  showToast(`${id} dihapus`);
}

function renderMeasurementList() {
  const list = document.getElementById("measurementList");
  if (!list) return;
  if (!measurements.length) {
    list.innerHTML = `<li class="empty">Belum ada pengukuran. Aktifkan ikon penggaris, klik titik awal dan belokan, lalu klik tanda centang untuk menyimpan.</li>`;
    return;
  }
  list.innerHTML = measurements.map((item) => {
    const index = item.id.replace("M-", "");
    const title = item.title || `Pengukuran ${index}`;
    const subtitle = item.subtitle || `Jalur ${item.path.length} titik`;
    return `
      <li>
        <span class="measure-badge">${index}</span>
        <div>
          <span>${title}</span>
          <small>${subtitle}</small>
        </div>
        <strong>${item.label}</strong>
        <button type="button" data-remove-measure="${item.id}" title="Hapus pengukuran ${index}" aria-label="Hapus pengukuran ${index}">
          <i data-lucide="x"></i>
        </button>
      </li>
    `;
  }).join("");
  lucide.createIcons();
}

function undoMeasurement() {
  const item = measurements.pop();
  if (!item) {
    showToast("Belum ada pengukuran untuk di-undo");
    return;
  }
  item.markers.forEach((marker) => marker.remove());
  undoneMeasurements.push(item);
  syncMeasurementSources();
  showToast(`${item.id} di-undo`);
}

function redoMeasurement() {
  const item = undoneMeasurements.pop();
  if (!item) {
    showToast("Tidak ada pengukuran untuk dikembalikan");
    return;
  }
  item.markers = createMeasurementMarkers(item.path, item.id.replace("M-", ""));
  measurements.push(item);
  syncMeasurementSources();
  showToast(`${item.id} dikembalikan`);
}

function setSidebarCollapsed(collapsed) {
  const shell = document.querySelector(".app-shell");
  shell.classList.toggle("sidebar-collapsed", collapsed);
  layerPanelOpen = !collapsed;
  document.getElementById("toggleMapLayers")?.classList.toggle("active", !collapsed);
  document.getElementById("toggleSidebarPanel")?.classList.toggle("active", collapsed);
  document.getElementById("topToggleSidebar")?.classList.toggle("active", !collapsed);
  if (!collapsed) document.querySelector(".sidebar")?.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => map.resize(), 260);
}

function toggleSidebarTools() {
  const collapsed = !document.querySelector(".app-shell").classList.contains("sidebar-collapsed");
  setSidebarCollapsed(collapsed);
  showToast(collapsed ? "Layer manager ditutup" : "Layer manager dibuka");
}

function setDetailCollapsed(collapsed) {
  const shell = document.querySelector(".app-shell");
  shell.classList.toggle("detail-collapsed", collapsed);
  document.getElementById("toggleDetailPanel")?.classList.toggle("active", collapsed);
  document.getElementById("topToggleDetail")?.classList.toggle("active", !collapsed);
  setTimeout(() => map.resize(), 260);
}

function toggleDetailTools() {
  const collapsed = !document.querySelector(".app-shell").classList.contains("detail-collapsed");
  setDetailCollapsed(collapsed);
  showToast(collapsed ? "Panel detail ditutup" : "Panel detail dibuka");
}

function toggleFloatingToolbar() {
  const shell = document.querySelector(".app-shell");
  const hidden = !shell.classList.contains("toolbar-hidden");
  shell.classList.toggle("toolbar-hidden", hidden);
  document.getElementById("topToggleToolbar")?.classList.toggle("active", !hidden);
  showToast(hidden ? "Toolbar peta disembunyikan" : "Toolbar peta ditampilkan");
}

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
    sources: {
      satellite: { type: "raster", tiles: [ESRI_WORLD_IMAGERY_TILE_URL], tileSize: 256, attribution: "Tiles &copy; Esri" },
    },
    layers: [
      {
        id: "satellite",
        type: "raster",
        source: "satellite",
        paint: {
          "raster-opacity": 0.96,
          "raster-saturation": -0.04,
          "raster-contrast": 0.08,
          "raster-brightness-min": 0.02,
          "raster-brightness-max": 0.92,
        },
      },
    ],
  },
  center: [112.7570, -7.3278],
  zoom: 16.2,
  pitch: 0,
  bearing: 0,
  attributionControl: false,
});

function fitEstate(duration = 350) {
  const bounds = new maplibregl.LngLatBounds();
  activeEstate().boundary.forEach((point) => bounds.extend(point));
  map.fitBounds(bounds, { padding: { top: 90, right: 70, bottom: 70, left: 70 }, duration });
}

function selectedUtilityFeatures() {
  return featureCollection([]);
}

function syncMapSources() {
  const estate = activeEstate();
  map.getSource("estate-boundary")?.setData(featureCollection([{ type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: [estate.boundary] } }]));
  map.getSource("outside-mask")?.setData(featureCollection([{
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [[90, 15], [150, 15], [150, -20], [90, -20], [90, 15]],
        estate.boundary,
      ],
    },
  }]));
  map.getSource("estate-roads")?.setData(featureCollection(estate.roads.map((path) => lineFeature(path))));
  map.getSource("utility-routes")?.setData(featureCollection(estate.utilityRoutes.map((route) => lineFeature(route.path, { type: route.type }))));
  map.getSource("utility-zones")?.setData(featureCollection((estate.utilityZones || []).map((zone) => ({
    type: "Feature",
    properties: { name: zone.name, type: zone.type },
    geometry: { type: "Point", coordinates: zone.coord },
  }))));
  map.getSource("lots")?.setData(featureCollection(visibleLots().map(lotFeature)));
  map.getSource("lot-labels")?.setData(featureCollection(visibleLots().map((lot) => ({
    type: "Feature",
    properties: { id: lot.id },
    geometry: { type: "Point", coordinates: centroid(lot.coords) },
  }))));
  map.getSource("tenant-labels")?.setData(featureCollection(internalLots().map(tenantLabelFeature)));
  map.getSource("contract-ews")?.setData(featureCollection(internalLots().map(contractFeature)));
  map.getSource("maintenance-points")?.setData(featureCollection(internalLots().map(maintenanceFeature)));
  map.getSource("finance-points")?.setData(featureCollection(internalLots().map(financeFeature)));
  map.getSource("iot-assets")?.setData(featureCollection((estate.iotAssets || []).map((asset) => pointFeature(asset.coord, asset))));
  map.getSource("selected-utilities")?.setData(selectedUtilityFeatures());
}

function addMapLayers() {
  map.addSource("outside-mask", { type: "geojson", data: featureCollection([]) });
  map.addSource("estate-boundary", { type: "geojson", data: featureCollection([]) });
  map.addSource("estate-roads", { type: "geojson", data: featureCollection([]) });
  map.addSource("utility-routes", { type: "geojson", data: featureCollection([]) });
  map.addSource("utility-zones", { type: "geojson", data: featureCollection([]) });
  map.addSource("selected-utilities", { type: "geojson", data: selectedUtilityFeatures() });
  map.addSource("measure-line", { type: "geojson", data: featureCollection([]) });
  map.addSource("measure-draft", { type: "geojson", data: featureCollection([]) });
  map.addSource("measure-label", { type: "geojson", data: featureCollection([]) });
  map.addSource("lots", { type: "geojson", data: featureCollection(visibleLots().map(lotFeature)) });
  map.addSource("lot-labels", { type: "geojson", data: featureCollection([]) });
  map.addSource("tenant-labels", { type: "geojson", data: featureCollection([]) });
  map.addSource("contract-ews", { type: "geojson", data: featureCollection([]) });
  map.addSource("maintenance-points", { type: "geojson", data: featureCollection([]) });
  map.addSource("iot-assets", { type: "geojson", data: featureCollection([]) });
  map.addSource("finance-points", { type: "geojson", data: featureCollection([]) });

  map.addLayer({ id: "outside-mask-fill", type: "fill", source: "outside-mask", paint: { "fill-color": "#07140f", "fill-opacity": 0.46 } });
  map.addLayer({ id: "zone-fill", type: "fill", source: "estate-boundary", paint: { "fill-color": "#008f86", "fill-opacity": 0.10 } });
  map.addLayer({ id: "zone-pattern-line", type: "line", source: "estate-boundary", paint: { "line-color": "#a7e6df", "line-width": 1.4, "line-opacity": 0.75, "line-dasharray": [1, 2] } });
  map.addLayer({ id: "boundary-fill", type: "fill", source: "estate-boundary", paint: { "fill-color": "#008f86", "fill-opacity": 0.04 } });
  map.addLayer({ id: "boundary-glow", type: "line", source: "estate-boundary", paint: { "line-color": "#00b4a8", "line-width": 8, "line-opacity": 0.22, "line-blur": 3 } });
  map.addLayer({ id: "boundary-line", type: "line", source: "estate-boundary", paint: { "line-color": "#008f86", "line-width": 2.5, "line-opacity": 0.9 } });
  map.addLayer({ id: "road-casing", type: "line", source: "estate-roads", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#ffffff", "line-width": 9, "line-opacity": 0.42 } });
  map.addLayer({ id: "road-core", type: "line", source: "estate-roads", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#596961", "line-width": 2, "line-opacity": 0.55, "line-dasharray": [4, 4] } });
  map.addLayer({ id: "utility-route-glow", type: "line", source: "utility-routes", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": ["match", ["get", "type"], ...Object.entries(utilityMeta).flatMap(([key, meta]) => [key, meta.color]), "#22c55e"], "line-width": 8, "line-opacity": 0.13, "line-blur": 1.5 } });
  map.addLayer({ id: "utility-route-core", type: "line", source: "utility-routes", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": ["match", ["get", "type"], ...Object.entries(utilityMeta).flatMap(([key, meta]) => [key, meta.color]), "#22c55e"], "line-width": 2.4, "line-opacity": 0.72 } });
  map.addLayer({ id: "utility-zone-halo", type: "circle", source: "utility-zones", paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 12, 10, 17, 18], "circle-color": ["match", ["get", "type"], ...Object.entries(utilityMeta).flatMap(([key, meta]) => [key, meta.color]), "#22c55e"], "circle-opacity": 0.28, "circle-blur": 0.18 } });
  map.addLayer({ id: "utility-zone-point", type: "circle", source: "utility-zones", paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 12, 4, 17, 7], "circle-color": ["match", ["get", "type"], ...Object.entries(utilityMeta).flatMap(([key, meta]) => [key, meta.color]), "#22c55e"], "circle-stroke-color": "#ffffff", "circle-stroke-width": 2, "circle-opacity": 0.95 } });
  map.addLayer({ id: "utility-zone-label", type: "symbol", source: "utility-zones", layout: { "text-field": ["get", "name"], "text-size": 11, "text-font": ["Open Sans Bold"], "text-offset": [0, 1.25], "text-anchor": "top", "text-allow-overlap": false }, paint: { "text-color": "#ffffff", "text-halo-color": "#102018", "text-halo-width": 2 } });
  map.addLayer({ id: "lot-fill", type: "fill", source: "lots", paint: { "fill-color": ["get", "fill"], "fill-opacity": ["case", ["get", "selected"], 0.62, 0.38] } });
  map.addLayer({ id: "lot-line", type: "line", source: "lots", paint: { "line-color": ["get", "color"], "line-width": ["case", ["get", "selected"], 4, 2.4], "line-dasharray": ["case", ["==", ["get", "status"], "available"], ["literal", [1, 0]], ["literal", [4, 3]]] } });
  map.addLayer({ id: "contract-ews-fill", type: "fill", source: "contract-ews", paint: { "fill-color": ["get", "color"], "fill-opacity": ["case", ["==", ["get", "risk"], "safe"], 0.03, 0.28] } });
  map.addLayer({ id: "contract-ews-line", type: "line", source: "contract-ews", paint: { "line-color": ["get", "color"], "line-width": 3, "line-opacity": ["case", ["==", ["get", "risk"], "safe"], 0.18, 0.92], "line-dasharray": [2, 1.2] } });
  map.addLayer({ id: "legal-lot-halo", type: "line", source: "lots", paint: { "line-color": "#008f86", "line-width": 5, "line-opacity": 0.18 } });
  map.addLayer({ id: "legal-lot-line", type: "line", source: "lots", paint: { "line-color": "#ffffff", "line-width": 1.8, "line-opacity": 0.86, "line-dasharray": [1.2, 1.2] } });
  map.addLayer({ id: "selected-utility-glow", type: "line", source: "selected-utilities", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": ["match", ["get", "type"], ...Object.entries(utilityMeta).flatMap(([key, meta]) => [key, meta.color]), "#22c55e"], "line-width": 9, "line-opacity": 0.25, "line-blur": 1.2 } });
  map.addLayer({ id: "selected-utility-core", type: "line", source: "selected-utilities", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": ["match", ["get", "type"], ...Object.entries(utilityMeta).flatMap(([key, meta]) => [key, meta.color]), "#22c55e"], "line-width": 3.2, "line-opacity": 0.95 } });
  map.addLayer({ id: "measure-draft-glow", type: "line", source: "measure-draft", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#ffffff", "line-width": 7, "line-opacity": 0.55 } });
  map.addLayer({ id: "measure-draft-core", type: "line", source: "measure-draft", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#00b4a8", "line-width": 2.8, "line-opacity": 0.88, "line-dasharray": [1, 1.4] } });
  map.addLayer({ id: "measure-line-glow", type: "line", source: "measure-line", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#ffffff", "line-width": 8, "line-opacity": 0.72 } });
  map.addLayer({ id: "measure-line-core", type: "line", source: "measure-line", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#008f86", "line-width": 3.2, "line-opacity": 0.96, "line-dasharray": [2, 1.5] } });
  map.addLayer({ id: "measure-label", type: "symbol", source: "measure-label", layout: { "text-field": ["get", "label"], "text-size": 12, "text-font": ["Open Sans Bold"], "text-allow-overlap": true, "text-ignore-placement": true }, paint: { "text-color": "#003b78", "text-halo-color": "#ffffff", "text-halo-width": 3 } });
  map.addLayer({ id: "maintenance-points", type: "circle", source: "maintenance-points", paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 13, 5, 17, 9], "circle-color": ["get", "color"], "circle-stroke-color": "#ffffff", "circle-stroke-width": 2, "circle-opacity": 0.95 } });
  map.addLayer({ id: "maintenance-labels", type: "symbol", source: "maintenance-points", layout: { "text-field": ["get", "item"], "text-size": 10, "text-font": ["Open Sans Bold"], "text-offset": [0, 1.2], "text-anchor": "top", "text-allow-overlap": false }, paint: { "text-color": "#ffffff", "text-halo-color": "#1b241f", "text-halo-width": 2 } });
  map.addLayer({ id: "iot-points", type: "circle", source: "iot-assets", paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 12, 5, 17, 8], "circle-color": ["match", ["get", "type"], "gate", "#003b78", "camera", "#0078bd", "sensor", "#008f86", "#0078bd"], "circle-stroke-color": "#ffffff", "circle-stroke-width": 2, "circle-opacity": 0.96 } });
  map.addLayer({ id: "iot-labels", type: "symbol", source: "iot-assets", layout: { "text-field": ["get", "name"], "text-size": 10, "text-font": ["Open Sans Bold"], "text-offset": [0, 1.15], "text-anchor": "top", "text-allow-overlap": false }, paint: { "text-color": "#ffffff", "text-halo-color": "#102018", "text-halo-width": 2 } });
  map.addLayer({ id: "finance-points", type: "circle", source: "finance-points", paint: { "circle-radius": ["case", ["==", ["get", "risk"], "critical"], 8, 5], "circle-color": ["case", ["==", ["get", "risk"], "critical"], "#df493d", "#008f86"], "circle-stroke-color": "#ffffff", "circle-stroke-width": 2, "circle-opacity": 0.92 } });
  map.addLayer({ id: "tenant-labels", type: "symbol", source: "tenant-labels", layout: { "text-field": ["get", "label"], "text-size": ["interpolate", ["linear"], ["zoom"], 14, 9, 17, 12], "text-font": ["Open Sans Bold"], "text-offset": [0, -1.15], "text-allow-overlap": false }, paint: { "text-color": "#ffffff", "text-halo-color": "#003b78", "text-halo-width": 2 } });
  map.addLayer({ id: "lot-labels", type: "symbol", source: "lot-labels", layout: { "text-field": ["get", "id"], "text-size": ["interpolate", ["linear"], ["zoom"], 14, 10, 17, 15], "text-font": ["Open Sans Bold"], "text-allow-overlap": true }, paint: { "text-color": "#ffffff", "text-halo-color": "#122016", "text-halo-width": 2 } });
  syncMapSources();
  measuringSourceReady = true;
}

function updateLayerVisibility() {
  const visibility = (show) => (show ? "visible" : "none");
  ["outside-mask-fill", "boundary-fill", "boundary-glow", "boundary-line"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(layerState.boundary)));
  ["road-casing", "road-core"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(layerState.road)));
  ["zone-fill", "zone-pattern-line"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(layerState.zone)));
  ["utility-route-glow", "utility-route-core", "utility-zone-halo", "utility-zone-point", "utility-zone-label", "selected-utility-glow", "selected-utility-core"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(layerState.utility)));
  ["legal-lot-line", "legal-lot-halo"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(layerState.legal)));
  ["tenant-labels"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(internalMode && layerState.tenant)));
  ["contract-ews-fill", "contract-ews-line"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(internalMode && layerState.contract)));
  ["maintenance-points", "maintenance-labels"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(internalMode && layerState.maintenance)));
  ["iot-points", "iot-labels"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(internalMode && layerState.iot)));
  ["finance-points"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(internalMode && layerState.finance)));
  ["lot-fill", "lot-line"].forEach((id) => map.setLayoutProperty(id, "visibility", visibility(layerState.status)));
  map.setLayoutProperty("lot-labels", "visibility", visibility(layerState.label));
  syncLegendPanel();
}

function setViewMode(internal, silent = false) {
  internalMode = internal;
  document.querySelector(".app-shell").classList.toggle("public-mode", !internalMode);
  const button = document.getElementById("viewModeToggle");
  button.classList.toggle("active", internalMode);
  button.querySelector("span").textContent = internalMode ? "Internal" : "Public";
  if (!internalMode && document.querySelector('[data-tab="operations"]')?.classList.contains("active")) {
    document.querySelector('[data-tab="overview"]')?.click();
  }
  updateLayerVisibility();
  if (!silent) showToast(internalMode ? "Internal Ops aktif" : "Public view aktif");
}

function updateCompassBearing() {
  const needle = document.querySelector(".compass-needle");
  if (!needle) return;
  needle.style.transform = `rotate(${-map.getBearing()}deg)`;
}

function favoriteKey(lot = selectedLot, estateKey = activeEstateKey) {
  return lot ? `${estateKey}:${lot.id}` : "";
}

function updateFavoriteUI() {
  const key = favoriteKey();
  const favoriteButton = document.getElementById("favoriteLot");
  const count = document.getElementById("favoriteCount");
  const list = document.getElementById("favoriteList");
  if (favoriteButton) {
    favoriteButton.classList.toggle("active", !!key && favoriteLots.has(key));
    favoriteButton.title = favoriteLots.has(key) ? "Hapus dari favorit" : "Tambah ke favorit";
    favoriteButton.setAttribute("aria-label", favoriteButton.title);
  }
  if (count) count.textContent = favoriteLots.size;
  if (!list) return;
  if (!favoriteLots.size) {
    list.innerHTML = `<button type="button" disabled>Belum ada favorit</button>`;
    return;
  }
  list.innerHTML = [...favoriteLots].map((item) => {
    const [estateKey, lotId] = item.split(":");
    const estate = estateData[estateKey];
    const lot = estate?.lots.find((entry) => entry.id === lotId);
    if (!estate || !lot) return "";
    return `
      <button type="button" data-favorite-jump="${item}">
        <span>${lot.id} - ${estate.name}</span>
        <small>${statusMeta[lot.status].label} · ${lot.area}</small>
      </button>
    `;
  }).join("");
}

function renderOpsPanels(lot) {
  const tenantList = document.getElementById("tenantOpsList");
  const maintenanceList = document.getElementById("maintenanceOpsList");
  const iotList = document.getElementById("iotOpsList");
  const financeList = document.getElementById("financeOpsList");
  if (!tenantList || !maintenanceList || !iotList || !financeList) return;
  if (!lot) {
    tenantList.innerHTML = `<li><i data-lucide="building-2"></i><div><span>${activeEstate().detailName}</span><small>Ringkasan tenant kawasan aktif</small></div><strong>${currentLots().filter((item) => item.status === "occupied").length} tenant</strong></li>`;
    maintenanceList.innerHTML = `<li class="attention"><i data-lucide="wrench"></i><div><span>Agenda maintenance kawasan</span><small>Jalan, drainase, PJU, gate, dan utilitas utama</small></div><strong>Monitoring</strong></li>`;
    iotList.innerHTML = (activeEstate().iotAssets || []).map((asset) => `<li><i data-lucide="${asset.type === "gate" ? "door-open" : asset.type === "camera" ? "cctv" : "radio-tower"}"></i><div><span>${asset.name}</span><small>Status ${asset.status}</small></div><strong>Online</strong></li>`).join("");
    financeList.innerHTML = `<li><i data-lucide="wallet-cards"></i><div><span>Supporting finance</span><small>Ditampilkan untuk role internal/manajemen</small></div><strong>Dummy</strong></li>`;
    lucide.createIcons();
    return;
  }
  const ops = lot.ops;
  tenantList.innerHTML = `
    <li class="${ops.contractRisk === "critical" ? "warning" : ops.contractRisk === "attention" ? "attention" : ""}"><i data-lucide="building-2"></i><div><span>${ops.tenant}</span><small>Kavling ${lot.id} - ${statusMeta[lot.status].label}</small></div><strong>${lot.status === "occupied" ? "Aktif" : statusMeta[lot.status].label}</strong></li>
    <li class="${ops.contractRisk === "critical" ? "warning" : ops.contractRisk === "attention" ? "attention" : ""}"><i data-lucide="calendar-clock"></i><div><span>Akhir kontrak</span><small>Early warning perpanjangan sewa</small></div><strong>${ops.contractEnd}</strong></li>
  `;
  maintenanceList.innerHTML = `
    <li class="${ops.maintenance.risk === "critical" ? "warning" : ops.maintenance.risk === "attention" ? "attention" : ""}"><i data-lucide="wrench"></i><div><span>${ops.maintenance.item}</span><small>Jadwal maintenance berikutnya</small></div><strong>${ops.maintenance.next}</strong></li>
  `;
  iotList.innerHTML = `
    <li><i data-lucide="cable"></i><div><span>${ops.utilities.note}</span><small>Kebutuhan utilitas: ${utilityMeta[ops.utilities.need].label}</small></div><strong>Review</strong></li>
    <li class="${ops.iot.status === "Butuh inspeksi" ? "attention" : ""}"><i data-lucide="cctv"></i><div><span>${ops.iot.device}</span><small>${ops.iot.gate}</small></div><strong>${ops.iot.status}</strong></li>
  `;
  financeList.innerHTML = `
    <li class="${ops.finance.billing === "Outstanding" ? "warning" : ""}"><i data-lucide="wallet-cards"></i><div><span>Status billing</span><small>Supporting data finance internal</small></div><strong>${ops.finance.billing}</strong></li>
    <li><i data-lucide="chart-no-axes-combined"></i><div><span>Estimasi revenue</span><small>Nilai dummy untuk simulasi dashboard</small></div><strong>${ops.finance.revenue}</strong></li>
  `;
  lucide.createIcons();
}

function updateDetail(lot) {
  if (!lot) {
    document.getElementById("detailName").textContent = activeEstate().detailName;
    const badge = document.getElementById("detailBadge");
    badge.textContent = "Boundary";
    badge.className = "badge available";
    document.getElementById("specList").innerHTML = `
      <dt>Status</dt><dd>Batas wilayah aktif</dd>
      <dt>Pembagian Lahan</dt><dd>Belum ditentukan</dd>
      <dt>Layer Utilitas</dt><dd>Tersedia</dd>
      <dt>Mode</dt><dd>Estate Boundary</dd>
    `;
    document.getElementById("utilityList").innerHTML = `
      <li class="electric"><i data-lucide="zap"></i><span>Jaringan Listrik</span><strong>Koridor utama</strong></li>
      <li class="water"><i data-lucide="droplets"></i><span>Jaringan Air</span><strong>Koridor utama</strong></li>
      <li class="gas"><i data-lucide="flame"></i><span>Gas Industri</span><strong>Koridor utama</strong></li>
      <li class="fiber"><i data-lucide="wifi"></i><span>Fiber Optik</span><strong>Backbone</strong></li>
    `;
    renderOpsPanels(null);
    updateFavoriteUI();
    lucide.createIcons();
    return;
  }
  const meta = statusMeta[lot.status];
  document.getElementById("detailName").textContent = `Kavling ${lot.id}`;
  const badge = document.getElementById("detailBadge");
  badge.textContent = meta.label;
  badge.className = `badge ${lot.status}`;
  document.getElementById("specList").innerHTML = `
    <dt>Luas Lahan</dt><dd>${lot.area}</dd>
    <dt>Dimensi</dt><dd>${lot.dim}</dd>
    <dt>Harga / m2</dt><dd>${lot.price}</dd>
    <dt>Total Est. Harga</dt><dd>${lot.total}</dd>
  `;
  document.getElementById("utilityList").innerHTML = `
    <li class="electric"><i data-lucide="zap"></i><span>Daya Listrik</span><strong>${lot.power}</strong></li>
    <li class="water"><i data-lucide="droplets"></i><span>Sumber Air</span><strong>WTP Kawasan</strong></li>
    <li class="road"><i data-lucide="road"></i><span>Akses Jalan</span><strong>ROW 12m</strong></li>
    <li class="gas"><i data-lucide="flame"></i><span>Gas Industri</span><strong>Pipa PGN</strong></li>
    <li class="fiber"><i data-lucide="wifi"></i><span>Serat Optik</span><strong>Up to 1Gbps</strong></li>
  `;
  renderOpsPanels(lot);
  updateFavoriteUI();
  lucide.createIcons();
}

function switchEstate(key) {
  if (!estateData[key] || key === activeEstateKey) return;
  activeEstateKey = key;
  galleryIndex = 0;
  selectedLot = currentLots()[0] || null;
  hasLotSelection = false;
  activePopup?.remove();
  document.getElementById("cycleEstate").textContent = activeEstate().name;
  document.querySelectorAll("#estateMenu [data-estate]").forEach((button) => button.classList.toggle("active", button.dataset.estate === key));
  updateStats();
  updateDetail(selectedLot);
  renderGallery();
  syncMapSources();
  updateLayerVisibility();
  fitEstate(550);
}

function selectLot(lot) {
  if (!lot) return;
  selectedLot = lot;
  hasLotSelection = true;
  syncMapSources();
  updateLayerVisibility();
  updateDetail(lot);
  activePopup?.remove();
  activePopup = new maplibregl.Popup({ closeButton: false, offset: 18, className: "lot-map-popup" })
    .setLngLat(centroid(lot.coords))
    .setHTML(`
      <div class="popup-head"><strong>${lot.id}</strong><span class="badge ${lot.status}">${statusMeta[lot.status].label}</span></div>
      <dl><dt>Luas Lahan</dt><dd>${lot.area}</dd><dt>Dimensi</dt><dd>${lot.dim}</dd><dt>Harga / m2</dt><dd>${lot.price}</dd></dl>
      <div class="price">Total Est. Harga<br>${lot.total}</div>
      <label class="popup-select">
        <span>Ukur otomatis ke</span>
        <select data-utility-target="${lot.id}">
          <option value="electric">Gardu Listrik</option>
          <option value="gas">Gas Metering</option>
          <option value="water">WTP / Air Bersih</option>
          <option value="drain">Drainase Kawasan</option>
          <option value="fiber">Fiber Backbone</option>
        </select>
      </label>
      <button type="button" data-measure-utility="${lot.id}">Ukur Jarak</button>
    `)
    .addTo(map);
  setTimeout(() => {
    document.querySelector(`[data-measure-utility="${lot.id}"]`)?.addEventListener("click", () => {
      const target = document.querySelector(`[data-utility-target="${lot.id}"]`)?.value || "electric";
      measureLotToUtility(lot, target);
    });
  }, 0);
}

function setupControls() {
  document.getElementById("layerToggles").innerHTML = layerItems.map(([icon, label, key]) => `
    <button type="button" data-layer-row="${key}">
      <i data-lucide="${icon}"></i>
      <span>${label}</span>
      <label class="switch"><input type="checkbox" checked data-layer="${key}" /><span></span></label>
    </button>
  `).join("");
  document.querySelectorAll("[data-layer]").forEach((input) => {
    input.addEventListener("change", () => {
      layerState[input.dataset.layer] = input.checked;
      updateLayerVisibility();
    });
  });
  document.getElementById("resetLayers").addEventListener("click", () => {
    Object.keys(layerState).forEach((key) => {
      layerState[key] = true;
    });
    document.querySelectorAll("[data-layer]").forEach((input) => {
      input.checked = true;
    });
    updateLayerVisibility();
    showToast("Semua layer aktif kembali");
  });
  document.querySelectorAll(".segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  document.querySelectorAll('[data-filter="power"] button').forEach((button) => {
    button.addEventListener("click", () => {
      powerFilter = button.dataset.value;
      syncMapSources();
      activePopup?.remove();
    });
  });
  document.querySelectorAll("[data-status]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStatus = button.dataset.status;
      syncMapSources();
      activePopup?.remove();
    });
  });
  document.getElementById("areaRange").addEventListener("input", (event) => {
    maxAreaFilter = Number(event.target.value) || 25000;
    syncMapSources();
    activePopup?.remove();
  });
  document.getElementById("minPrice").addEventListener("input", (event) => {
    minPriceFilter = Number(event.target.value) || 0;
    syncMapSources();
    activePopup?.remove();
  });
  document.getElementById("maxPrice").addEventListener("input", (event) => {
    maxPriceFilter = event.target.value ? Number(event.target.value) : Infinity;
    syncMapSources();
    activePopup?.remove();
  });
  document.getElementById("searchInput").addEventListener("input", (event) => {
    const query = event.target.value.trim().toUpperCase();
    const found = currentLots().find((lot) => lot.id.includes(query));
    if (query && found) {
      map.flyTo({ center: centroid(found.coords), zoom: 17.2, duration: 550 });
      selectLot(found);
    }
  });
  document.getElementById("zoomIn").addEventListener("click", (event) => {
    map.zoomIn({ duration: 220 });
    flashToolButton(event.currentTarget);
  });
  document.getElementById("zoomOut").addEventListener("click", (event) => {
    map.zoomOut({ duration: 220 });
    flashToolButton(event.currentTarget);
  });
  document.getElementById("locate").addEventListener("click", (event) => {
    fitEstate();
    flashToolButton(event.currentTarget);
    showToast(`Fokus ke ${activeEstate().name}`);
  });
  document.getElementById("rotateNorth").addEventListener("click", () => {
    map.easeTo({ bearing: 0, pitch: 0, duration: 450 });
    showToast("Orientasi peta dikembalikan ke utara");
    flashToolButton(document.getElementById("rotateNorth"));
  });
  document.getElementById("compassReset").addEventListener("click", () => {
    map.easeTo({ bearing: 0, pitch: 0, duration: 450 });
    showToast("Kompas kembali ke utara");
  });
  document.getElementById("measureTool").addEventListener("click", () => {
    if (measureMode && measurePath.length >= 2) {
      finishDraftMeasurement();
      return;
    }
    measureMode = !measureMode;
    clearDraftMeasurement();
    document.getElementById("measureTool").classList.toggle("active", measureMode);
    document.getElementById("measureTool").innerHTML = measureMode ? `<i data-lucide="check"></i>` : `<i data-lucide="ruler"></i>`;
    lucide.createIcons();
    if (measureMode) {
      map.doubleClickZoom.disable();
      showToast("Mode ukur aktif. Klik titik awal, tambah belokan, lalu klik centang untuk simpan.");
    } else {
      map.doubleClickZoom.enable();
      showToast("Mode ukur dimatikan");
    }
  });
  document.getElementById("undoMeasure").addEventListener("click", undoMeasurement);
  document.getElementById("redoMeasure").addEventListener("click", redoMeasurement);
  document.getElementById("clearMeasures").addEventListener("click", () => {
    clearMeasurementLine();
    showToast("Semua pengukuran dihapus");
  });
  document.getElementById("clearMeasureList").addEventListener("click", () => {
    clearMeasurementLine();
    showToast("Semua pengukuran dihapus");
  });
  document.getElementById("measurementList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-measure]");
    if (!button) return;
    removeMeasurement(button.dataset.removeMeasure);
  });
  document.getElementById("toggleMapLayers").addEventListener("click", () => {
    toggleSidebarTools();
  });
  document.getElementById("toggleDetailPanel").addEventListener("click", () => {
    toggleDetailTools();
  });
  document.getElementById("toggleSidebarPanel").addEventListener("click", () => {
    toggleSidebarTools();
  });
  document.getElementById("collapseSidebar").addEventListener("click", () => document.getElementById("toggleSidebarPanel").click());
  document.getElementById("topToggleSidebar").addEventListener("click", () => {
    toggleSidebarTools();
  });
  document.getElementById("topToggleDetail").addEventListener("click", () => {
    toggleDetailTools();
  });
  document.getElementById("topToggleToolbar").addEventListener("click", () => {
    toggleFloatingToolbar();
  });
  document.getElementById("viewModeToggle").addEventListener("click", () => {
    setViewMode(!internalMode);
  });
  document.querySelectorAll("[data-ops-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      setViewMode(true);
      const focus = button.dataset.opsFocus;
      document.querySelectorAll("[data-ops-focus]").forEach((item) => item.classList.toggle("active", item === button));
      if (focus === "contract") layerState.contract = true;
      if (focus === "maintenance") layerState.maintenance = true;
      if (focus === "utility") layerState.utility = true;
      document.querySelectorAll("[data-layer]").forEach((input) => {
        input.checked = layerState[input.dataset.layer];
      });
      updateLayerVisibility();
      showToast(`Layer ${button.querySelector("span").textContent} aktif`);
    });
  });
  document.getElementById("toggleLegend").addEventListener("click", () => {
    legendExpanded = !legendExpanded;
    syncLegendPanel();
  });
  document.getElementById("resetFilters").addEventListener("click", () => {
    activeStatus = "all";
    maxAreaFilter = 25000;
    minPriceFilter = 0;
    maxPriceFilter = Infinity;
    powerFilter = "200";
    document.getElementById("areaRange").value = "25000";
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";
    document.querySelectorAll('[data-filter="power"] button').forEach((button) => button.classList.toggle("active", button.dataset.value === "200"));
    document.querySelectorAll("[data-status]").forEach((button) => button.classList.toggle("active", button.dataset.status === "all"));
    syncMapSources();
  });
  document.querySelectorAll("[data-map-style]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-map-style]").forEach((item) => item.classList.toggle("active", item === button));
      applyMapStyle(button.dataset.mapStyle);
      showToast(`Map style: ${button.textContent.trim()}`);
    });
  });
  document.querySelectorAll("[data-stat-status]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStatus = button.dataset.statStatus;
      document.querySelectorAll("[data-stat-status]").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll("[data-status]").forEach((item) => item.classList.toggle("active", item.dataset.status === activeStatus));
      syncMapSources();
      activePopup?.remove();
    });
  });
  document.getElementById("openEstateMenu").addEventListener("click", () => {
    document.getElementById("estateMenu").classList.toggle("visible");
  });
  document.getElementById("cycleEstate").addEventListener("click", () => {
    const keys = Object.keys(estateData);
    switchEstate(keys[(keys.indexOf(activeEstateKey) + 1) % keys.length]);
  });
  document.querySelectorAll("#estateMenu [data-estate]").forEach((button) => {
    button.classList.toggle("active", button.dataset.estate === activeEstateKey);
    button.addEventListener("click", () => {
      switchEstate(button.dataset.estate);
      document.getElementById("estateMenu").classList.remove("visible");
    });
  });
  document.getElementById("toggleBreadcrumb").addEventListener("click", () => {
    document.getElementById("estateMenu").classList.toggle("visible");
  });
  document.getElementById("prevPhoto").addEventListener("click", () => moveGallery(-1));
  document.getElementById("nextPhoto").addEventListener("click", () => moveGallery(1));
  document.getElementById("shareLot").addEventListener("click", async () => {
    const title = selectedLot ? `Kavling ${selectedLot.id}` : activeEstate().detailName;
    const text = selectedLot
      ? `${title} - ${selectedLot.area}, ${selectedLot.price}/m2, ${activeEstate().detailName}`
      : `${activeEstate().detailName} - ${location.href}`;
    if (navigator.share) await navigator.share({ title, text, url: location.href });
    else {
      await navigator.clipboard?.writeText(text);
      showToast("Info kavling disalin");
    }
  });
  document.getElementById("exportLot").addEventListener("click", () => {
    try {
      const canvas = map.getCanvas();
      const link = document.createElement("a");
      link.download = `${selectedLot?.id || activeEstateKey}-overview-map.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      showToast("Export diblokir browser karena tile eksternal");
    }
  });
  document.getElementById("fullscreenMap").addEventListener("click", () => {
    const area = document.querySelector(".map-area");
    if (!document.fullscreenElement) area.requestFullscreen?.();
    else document.exitFullscreen?.();
    setTimeout(() => map.resize(), 260);
  });
  document.getElementById("favoriteLot").addEventListener("click", () => {
    if (!selectedLot) return;
    const key = favoriteKey();
    if (favoriteLots.has(key)) {
      favoriteLots.delete(key);
      showToast(`${selectedLot.id} dihapus dari favorit`);
    } else {
      favoriteLots.add(key);
      showToast(`${selectedLot.id} ditambahkan ke favorit`);
    }
    updateFavoriteUI();
    lucide.createIcons();
  });
  document.getElementById("toggleFavorites").addEventListener("click", (event) => {
    event.stopPropagation();
    document.getElementById("favoriteMenu").classList.toggle("open");
  });
  document.getElementById("favoriteList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-favorite-jump]");
    if (!button) return;
    const [estateKey, lotId] = button.dataset.favoriteJump.split(":");
    if (estateKey !== activeEstateKey) switchEstate(estateKey);
    const lot = estateData[estateKey]?.lots.find((item) => item.id === lotId);
    if (lot) {
      setTimeout(() => {
        selectLot(lot);
        fitBounds(lot.coords, 650);
      }, 80);
    }
    document.getElementById("favoriteMenu").classList.remove("open");
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".favorite-box")) document.getElementById("favoriteMenu").classList.remove("open");
  });
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      document.querySelectorAll("[data-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
      document.querySelectorAll("[data-tab-panel]").forEach((panel) => panel.classList.toggle("is-hidden", panel.dataset.tabPanel !== target));
      if (target === "utilities") {
        layerState.utility = true;
        const utilityToggle = document.querySelector('[data-layer="utility"]');
        if (utilityToggle) utilityToggle.checked = true;
        updateLayerVisibility();
      }
    });
  });
  document.querySelectorAll("[data-doc-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const docName = button.closest("li")?.querySelector("span")?.textContent || "Dokumen";
      showToast(`${button.textContent} ${docName}`);
    });
  });
}

function showToast(message) {
  let toast = document.querySelector(".map-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "map-toast";
    document.querySelector(".map-area").appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
}

function hideLoadingScreen() {
  const loader = document.getElementById("loadingScreen");
  if (!loader) return;
  window.setTimeout(() => {
    loader.classList.add("hidden");
    window.setTimeout(() => loader.remove(), 420);
  }, 350);
}

function distanceMeters(a, b) {
  const rad = Math.PI / 180;
  const r = 6371000;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const lat1 = a.lat * rad;
  const lat2 = b.lat * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function formatDistance(meters) {
  return meters >= 1000 ? `${(meters / 1000).toFixed(2)} km` : `${Math.round(meters)} m`;
}

function coordDistance(a, b) {
  return distanceMeters(coordLngLat(pointCoord(a)), coordLngLat(pointCoord(b)));
}

function nearestRouteIndex(path, target) {
  const targetCoord = pointCoord(target);
  return path.reduce((best, point, index) => {
    const distance = coordDistance(point, targetCoord);
    return distance < best.distance ? { index, distance } : best;
  }, { index: 0, distance: Infinity }).index;
}

function routeToUtilityPath(start, zone, utilityType) {
  const route = activeEstate().utilityRoutes?.find((item) => item.type === utilityType);
  const startCoord = pointCoord(start);
  const zoneCoord = pointCoord(zone.coord);
  if (!route?.path?.length) return rightAnglePath([startCoord, zoneCoord]);
  const path = route.path.map(pointCoord);
  const entryIndex = nearestRouteIndex(path, startCoord);
  const zoneIndex = nearestRouteIndex(path, zoneCoord);
  const routeSlice = entryIndex <= zoneIndex
    ? path.slice(entryIndex, zoneIndex + 1)
    : path.slice(zoneIndex, entryIndex + 1).reverse();
  return compactPath([
    ...elbowPathBetween(startCoord, routeSlice[0], "lng-first"),
    ...routeSlice.slice(1),
    ...elbowPathBetween(routeSlice[routeSlice.length - 1], zoneCoord, "lat-first").slice(1),
  ]);
}

function nearestUtilityZone(type = "electric") {
  const zones = activeEstate().utilityZones || [];
  return zones.find((zone) => zone.type === type) || zones[0];
}

function measureLotToUtility(lot, utilityType = "electric") {
  const zone = nearestUtilityZone(utilityType);
  if (!lot || !zone) return;
  const [lng, lat] = centroid(lot.coords);
  const start = { lng, lat };
  const path = routeToUtilityPath(start, zone, utilityType);
  const meters = pathDistanceMeters(path);
  const label = formatDistance(meters);
  addMeasurement(path, label, {
    title: `${lot.id} ke ${zone.name}`,
    subtitle: `Mengikuti jalur ${utilityMeta[utilityType]?.label || utilityType}`,
  });
  showToast(`${lot.id} ke ${zone.name}: ${label}`);
}

map.on("load", () => {
  addMapLayers();
  fitEstate(0);
  setupControls();
  updateCompassBearing();
  updateStats();
  updateDetail(selectedLot);
  renderGallery();
  document.getElementById("lotPopup").classList.remove("visible");
  syncLegendPanel();
  setViewMode(true, true);
  setSidebarCollapsed(false);
  setDetailCollapsed(false);
  lucide.createIcons();
  hideLoadingScreen();
});

map.on("rotate", updateCompassBearing);
map.on("pitch", updateCompassBearing);

window.setTimeout(hideLoadingScreen, 3200);

map.on("click", "lot-fill", (event) => {
  if (measureMode) return;
  const id = event.features?.[0]?.properties?.id;
  const lot = currentLots().find((item) => item.id === id);
  if (lot) selectLot(lot);
});
map.on("click", (event) => {
  if (!measureMode) return;
  addDraftMeasurementPoint(event.lngLat);
  if (measurePath.length === 1) {
    showToast("Titik awal tersimpan. Klik titik belokan berikutnya.");
    return;
  }
  const draftDistance = formatDistance(pathDistanceMeters(rightAnglePath(measurePath)));
  showToast(`${measurePath.length} titik. Klik centang untuk simpan (${draftDistance}).`);
});
map.on("dblclick", (event) => {
  if (!measureMode) return;
  event.preventDefault();
  finishDraftMeasurement();
});
map.on("mouseenter", "lot-fill", () => { map.getCanvas().style.cursor = "pointer"; });
map.on("mouseleave", "lot-fill", () => { map.getCanvas().style.cursor = ""; });
