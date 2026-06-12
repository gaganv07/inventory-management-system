import type {
  Product, Category, Supplier, StockTransaction, PurchaseOrder,
  DashboardStats, MonthlyStockData, CategoryDistribution, User, ProductStatus,
  PurchaseOrderStatus,
} from "@/types";

// Seedable Linear Congruential Generator for 100% stable mock dataset
class SeededRandom {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
  intRange(min: number, max: number): number {
    return Math.floor(this.range(min, max));
  }
  choice<T>(arr: T[]): T {
    return arr[this.intRange(0, arr.length)];
  }
}

const rng = new SeededRandom(42);

// 1. USERS
// 1 Super Admin, 2 Admins, 5 Managers, 15 Employees = 23 users
export const mockUsers: User[] = [];

const indianFirstNames = [
  "Ramesh", "Suresh", "Ravi", "Amit", "Priya", "Anitha", "Kiran", "Vijay", "Sunil", "Rajesh",
  "Vikram", "Sanjay", "Anil", "Manoj", "Deepak", "Sandeep", "Arjun", "Nitin", "Harish", "Rahul",
  "Pankaj", "Madan", "Ashok"
];
const indianLastNames = [
  "Kumar", "Sharma", "Nair", "Patel", "Singh", "Rao", "Gupta", "Joshi", "Choudhury", "Mehta",
  "Deshmukh", "Reddy", "Gadkari", "Salve", "Bindra", "Nilekani", "Premji", "Mazumdar", "Mittal", "Mahindra",
  "Jindal", "Adani", "Tata"
];

// Seed exact requested demo logins
mockUsers.push({
  id: "u-sa-1",
  name: "Rahul Sharma",
  email: "superadmin@demo.com",
  role: "ADMIN",
  isActive: true,
  createdAt: "2018-04-01T09:00:00Z",
  updatedAt: "2026-06-12T10:00:00Z"
});

mockUsers.push({
  id: "u-a-1",
  name: "Admin User",
  email: "admin@demo.com",
  role: "ADMIN",
  isActive: true,
  createdAt: "2018-04-10T10:00:00Z",
  updatedAt: "2026-06-12T12:00:00Z"
});

mockUsers.push({
  id: "u-a-2",
  name: "Vikram Aditya",
  email: "admin2@demo.com",
  role: "ADMIN",
  isActive: true,
  createdAt: "2019-01-15T09:30:00Z",
  updatedAt: "2026-06-12T08:30:00Z"
});

mockUsers.push({
  id: "u-m-1",
  name: "Manager User",
  email: "manager@demo.com",
  role: "MANAGER",
  isActive: true,
  createdAt: "2018-05-01T09:00:00Z",
  updatedAt: "2026-06-12T09:45:00Z"
});

// Generate remaining 4 Managers
for (let i = 2; i <= 5; i++) {
  const fName = indianFirstNames[i + 3];
  const lName = indianLastNames[i + 3];
  mockUsers.push({
    id: `u-m-${i}`,
    name: `${fName} ${lName}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}@demo.com`,
    role: "MANAGER",
    isActive: true,
    createdAt: `2019-06-12T10:00:00Z`,
    updatedAt: `2026-06-11T16:00:00Z`
  });
}

// Seed exact employee demo login
mockUsers.push({
  id: "u-e-1",
  name: "Employee User",
  email: "employee@demo.com",
  role: "EMPLOYEE",
  isActive: true,
  createdAt: "2018-06-01T09:00:00Z",
  updatedAt: "2026-06-12T12:00:00Z"
});

// Generate remaining 14 Employees
for (let i = 2; i <= 15; i++) {
  const fName = indianFirstNames[(i + 8) % indianFirstNames.length];
  const lName = indianLastNames[(i + 8) % indianLastNames.length];
  mockUsers.push({
    id: `u-e-${i}`,
    name: `${fName} ${lName}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}@demo.com`,
    role: "EMPLOYEE",
    isActive: i !== 15, // Make one employee inactive to test status display
    createdAt: `2020-02-18T11:00:00Z`,
    updatedAt: `2026-06-11T17:30:00Z`
  });
}

// 2. PRODUCT CATEGORIES (25)
const categoryNames = [
  "Electrical Components", "Fasteners", "Bearings", "Industrial Tools", "Safety Equipment",
  "Raw Materials", "Packaging Materials", "Hydraulic Parts", "Pneumatic Components", "Machine Accessories",
  "Welds & Electrodes", "Adhesives & Sealants", "Measuring Instruments", "Pipes & Fittings", "Valves & Actuators",
  "Industrial Pumps", "Gears & Shafts", "Lubricants & Oils", "Hoses & Couplings", "Metal Sheets & Plates",
  "Gaskets & O-Rings", "Automation & PLCs", "Sensors & Transducers", "Abrasives & Grinding", "Castings & Forgings"
];

const categoryPrefixes: Record<string, string> = {
  "Electrical Components": "ELC", "Fasteners": "FAS", "Bearings": "BRG", "Industrial Tools": "TOL", "Safety Equipment": "SFT",
  "Raw Materials": "RAW", "Packaging Materials": "PKG", "Hydraulic Parts": "HYD", "Pneumatic Components": "PNM", "Machine Accessories": "MAC",
  "Welds & Electrodes": "WLD", "Adhesives & Sealants": "ADH", "Measuring Instruments": "INS", "Pipes & Fittings": "PIP", "Valves & Actuators": "VAL",
  "Industrial Pumps": "PMP", "Gears & Shafts": "GER", "Lubricants & Oils": "LUB", "Hoses & Couplings": "HOS", "Metal Sheets & Plates": "MET",
  "Gaskets & O-Rings": "GAS", "Automation & PLCs": "AUT", "Sensors & Transducers": "SEN", "Abrasives & Grinding": "ABR", "Castings & Forgings": "CST"
};

const categoryUnits: Record<string, string> = {
  "Electrical Components": "PCS", "Fasteners": "BOX", "Bearings": "PCS", "Industrial Tools": "PCS", "Safety Equipment": "PCS",
  "Raw Materials": "KG", "Packaging Materials": "BOX", "Hydraulic Parts": "PCS", "Pneumatic Components": "PCS", "Machine Accessories": "PCS",
  "Welds & Electrodes": "KG", "Adhesives & Sealants": "TUBE", "Measuring Instruments": "PCS", "Pipes & Fittings": "MTR", "Valves & Actuators": "PCS",
  "Industrial Pumps": "PCS", "Gears & Shafts": "PCS", "Lubricants & Oils": "LTR", "Hoses & Couplings": "MTR", "Metal Sheets & Plates": "PCS",
  "Gaskets & O-Rings": "PCS", "Automation & PLCs": "PCS", "Sensors & Transducers": "PCS", "Abrasives & Grinding": "PCS", "Castings & Forgings": "PCS"
};

export const mockCategories: Category[] = categoryNames.map((name, index) => ({
  id: `cat-${index + 1}`,
  name,
  description: `High quality industrial ${name.toLowerCase()} for manufacturing processes`,
  isActive: true,
  createdAt: `2018-04-01T09:00:00Z`,
  updatedAt: `2026-06-01T10:00:00Z`,
  _count: { products: 20 }
}));

// 3. SUPPLIERS (40)
const supplierNames = [
  "Tata Steel Ltd", "JSW Steel Ltd", "Reliance Petrochemicals", "Hindalco Industries", "Larsen & Toubro Electrical",
  "Havells India", "Bharat Forge", "Bosch India", "SKF India Bearings", "Kirloskar Brothers Ltd",
  "Crompton Greaves", "Polycab Wires", "Jindal Saw Pipes", "Godrej Tooling", "Thermax India",
  "Elgi Equipments", "Wipro Infrastructure", "Murugappa Group", "BHEL Components", "Grindwell Norton Abrasives",
  "Fenner India Belts", "Castrol Industrial India", "Pidilite Industries", "Danfoss India Controls", "Festo Pneumatics India",
  "Supreme Industries", "Finolex Cables", "KEI Wires", "Everest Instruments", "L&T Valves",
  "CUMI Abrasives", "ABB India Automation", "Siemens India PLCs", "Honeywell Automation India", "Schneider Electric India",
  "Fanuc India Robotics", "Sandvik Coromant India", "Carborundum Universal", "Kennametal India", "Forbes Marshall Steam"
];

const bangaloreAddresses = [
  "Peenya Industrial Area, Phase IV, Bengaluru",
  "Whitefield Industrial Area, Bengaluru",
  "Jigani Industrial Area, Bengaluru",
  "Bommasandra Industrial Area, Bengaluru",
  "Bidadi Industrial Area, Ramanagara, near Bengaluru",
  "Rajajinagar Industrial Suburb, Bengaluru",
  "Kumbalgodu Industrial Area, Bengaluru",
  "Doddaballapur Industrial Area, Bengaluru"
];

export const mockSuppliers: Supplier[] = supplierNames.map((companyName, i) => {
  const panLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i % 26];
  const panNumber = 1000 + i * 19;
  const gstin = `29${panLetter}AP${panLetter}${panNumber}${panLetter}1Z${i % 10}`;
  return {
    id: `sup-${i + 1}`,
    companyName,
    contactPerson: `${indianFirstNames[i % indianFirstNames.length]} ${indianLastNames[(i + 3) % indianLastNames.length]}`,
    phone: `+91 ${9845000000 + i * 12345}`,
    email: `sales@${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.in`,
    gstNumber: gstin,
    address: bangaloreAddresses[i % bangaloreAddresses.length],
    notes: `Established supplier for industrial supplies. Rating: ${(4.0 + (i % 10) / 10).toFixed(1)}/5`,
    isActive: true,
    createdAt: `2018-04-05T10:00:00Z`,
    updatedAt: `2026-06-01T12:00:00Z`,
    _count: { products: 0 }
  };
});

// 4. CUSTOMERS (150)
interface MockCustomer {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  gstNumber: string;
  billingAddress: string;
  shippingAddress: string;
  customerSince: string;
}

export const mockCustomers: MockCustomer[] = [];
const customerSuffixes = ["Manufacturing", "Engineering", "Automotive", "Structures", "Motors", "Power Systems", "Tech Tools", "Industries", "Foundry", "Pipes"];
const customerCities = ["Bengaluru", "Chennai", "Hyderabad", "Mumbai", "Pune", "Ahmedabad", "Gurugram", "Coimbatore", "Mysuru", "Kolkata"];

for (let i = 1; i <= 150; i++) {
  const panLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[(i + 5) % 26];
  const panNumber = 2000 + i * 14;
  const gst = `29${panLetter}CP${panLetter}${panNumber}${panLetter}1Z${i % 10}`;
  const baseName = indianLastNames[i % indianLastNames.length];
  const companyName = `${baseName} ${customerSuffixes[i % customerSuffixes.length]} Pvt. Ltd.`;
  const city = customerCities[i % customerCities.length];
  const addr = `${i * 12}, Industrial Main Road, Sector ${i % 5 + 1}, ${city}`;
  
  mockCustomers.push({
    id: `cust-${i}`,
    companyName,
    contactName: `${indianFirstNames[(i + 4) % indianFirstNames.length]} ${indianLastNames[(i + 7) % indianLastNames.length]}`,
    phone: `+91 ${9123000000 + i * 32104}`,
    email: `purchase@${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
    gstNumber: gst,
    billingAddress: addr,
    shippingAddress: addr,
    customerSince: `2019-${(i % 12 + 1).toString().padStart(2, "0")}-10`
  });
}

// 5. PRODUCTS (500)

// Specific templates of product names per category (20 items per category)
const productTemplates: Record<string, string[]> = {
  "Electrical Components": [
    "Schneider MCB 16A Single Pole", "Polycab Copper Wire 2.5sqmm", "Siemens Contactor 9A 220V", "L&T Push Button Switch", 
    "LED Panel Light 12W 6500K", "Terminal Block 6sqmm DIN Rail", "PVC Conduit Pipe 25mm White", "Finolex 3-Core Cable 1.5sqmm", 
    "Relay Module 24V DC 8-Channel", "Rotary Cam Switch 32A 3-Phase", "Industrial Plug 3-Pin 16A", "Limit Switch Roller Lever", 
    "Copper Busbar 200A 1 Mtr", "Panel Cooling Fan 120mm 230V", "Cable Gland PG16 Metallic", "DIN Rail 1 Mtr Aluminium", 
    "Solenoid Coil 24V DC 10W", "Inductive Proximity Sensor M18", "Control Transformer 230V to 24V", "Selector Switch 3-Position Key"
  ],
  "Fasteners": [
    "Hex Bolt M10x50 MS Half Thread", "Nyloc Lock Nut M10 SS304", "Plain Washer M10 MS Zinc", "Spring Washer M10 SS304", 
    "Cap Screw M8x30 Socket Head SS", "Hex Bolt M12x80 High Tensile 8.8", "Grub Screw M6x10 Cup Point", "Pop Rivet 4mm x 12mm Alum", 
    "Anchor Fastener Bolt M12x100 Shield", "Threaded Rod M16 1 Mtr Grade 4.6", "T-Nut M8 for 4040 Profile", "Self Tapping Screw No.8x1in SS", 
    "Split Cotter Pin 3mm x 40mm Steel", "Circlip External 25mm Spring Steel", "Dowels Pin 8mm x 40mm Grounded", "U-Bolt 2 inch Pipe Bracket", 
    "Eye Bolt M12 Carbon Steel Welded", "Wing Nut M8 Brass Forged", "Stud Bolt M20x150 ASTM A193 B7", "Dome Cap Nut M6 SS304"
  ],
  "Bearings": [
    "Ball Bearing 6201-2RS SKF Radial", "Ball Bearing 6202-2RS SKF Radial", "Ball Bearing 6205-2RS SKF Radial", "Taper Roller Bearing 30206 SKF", 
    "Pillow Block Bearing UCP205 Casting", "Flange Bearing Unit UCF208 4-Bolt", "Linear LM8UU Motion Slide Block", "Needle Roller Bearing HK1010 Open", 
    "Thrust Ball Bearing 51105 Single Direction", "Self Aligning Bearing 1205 Double Row", "Rod End Bearing PHS10 Female 10mm", "Spherical Roller Bearing 22212 Double", 
    "Cylindrical Roller NU206 Brass Cage", "Clutch Release Bearing 50TKZ Thrust", "Sleeve Bearing Bronze 20x25x20 Oilless", "Linear Guide Block HGH20CA Hiwin", 
    "Ball Screw Nut 1605 Recirculating", "Plummer Block Housing S509 Split", "Super Precision Bearing 7005 Angular Contact", "Double Row Ball Bearing 3206 Deep Groove"
  ],
  "Industrial Tools": [
    "Double Ended Spanner Set 8-32mm Taparia", "Drill Bit Set HSS 1-13mm Addison", "Angle Grinder 850W 4in Bosch", "Torque Wrench 1/2in Drive 40-200Nm", 
    "Rotary Hammer Drill 20mm 600W Dewalt", "Bench Vice Fixed Base 4 inch Taparia", "Socket Set 40-Piece 1/4 & 1/2 Drive", "Combination Plier 8in Insulated Taparia", 
    "Hacksaw Frame Heavy Duty 12 inch Adjust", "Allen Key Hex Set 1.5-10mm Ball Head", "Pipe Wrench Stillson Style 14 inch", "Screw Driver Set 8-Piece Taparia", 
    "Steel Measuring Tape 5 Mtr Freelock Freemans", "C-Clamp Cast Iron Heavy Duty 6 inch", "Engineers Files Set 10 inch 4-Piece", "Flat Cold Chisel Octagonal 8x3/4in", 
    "Wire Stripper and Cutter Automatic 8in", "Soldering Iron 25W High Quality Soldron", "Industrial Heat Gun 2000W Bosch", "Pneumatic Impact Wrench 1/2in Composite"
  ],
  "Safety Equipment": [
    "Safety Helmet ISI marked HDPE 3M", "Nitrile Protective Gloves Chemical Resist", "Steel Toe Safety Boots Black Camel", "Full Body Safety Harness fall Protection", 
    "Industrial Ear Muffs Noise Reduction 3M", "Clear Safety Goggles Scratch Resistant", "Face Shield Bracket with Clear Visor", "Particulate Dust Mask N95 3M", 
    "Fire Extinguisher ABC Dry Powder 4kg", "Wall Mountable First Aid Kit Box Industrial", "Safety Vest Reflective Orange Polyester", "Welding Apron Split Leather Heavy Duty", 
    "Chemical Apron PVC Waterproof green", "Emergency Eyewash Bottle Wall Station 500ml", "Safety Cone Reflective Base 750mm Orange", "Barricade Caution Tape Yellow Black 500m", 
    "Executive Safety Shoes Steel Toe Camel", "Leather Tig Welding Gloves Soft Sheepskin", "Corded Ear Plugs Polyurethane NRR25 3M", "Webbing Sling Double Ply 2 Ton 3 Mtr"
  ],
  "Raw Materials": [
    "MS Plate 10mm Mild Steel Sheet 8x4ft", "Brass Round Rod 1 inch Grade Free Cutting", "Copper Sheet 2mm Electrolytic Grade 4x4ft", "Aluminium C-Channel 50x25x3mm 6 Mtr", 
    "MS Flat Bar 50x6mm Mild Steel 6 Mtr", "SS304 Round Bar 25mm Stainless Steel", "Mild Steel Sheet CRCA 1.6mm 8x4ft", "Aluminium Plate 12mm Alloy 6082 T6", 
    "Brass Plate Sheet 1.2mm CuZn40 4x2ft", "Copper Flat Bar 25x3mm Earthing Strip", "SS316 Hexagonal Rod 19mm A4 Grade", "Tool Steel Round Bar HCHCR D2 Grade", 
    "Galvanized Iron Sheet GI 0.8mm GP Grade", "Medium Carbon Steel Plate EN8 12mm", "Phosphor Bronze Round Rod PB2 1.5in", "EN8 Round Steel Bar 40mm Normalized", 
    "EN24 Alloy Steel Bar Heat Treated 30mm", "Lead Sheet 1mm thick Shielding 2x1m", "Titanium Sheet 0.5mm Grade 2 500x500mm", "Monel 400 Round Bar 12mm dia Nickel"
  ],
  "Packaging Materials": [
    "Corrugated Box 5-Ply 12x10x8 inches Kraft", "Bubble Wrap Packing Roll 1 Mtr x 100 Mtr", "Stretch Film Wrapping Roll 500mm 23 Micron", "BOPP Adhesive Tape Transparent 2in 65m", 
    "PP Strapping Band Roll 12mm Manual Yellow", "Wooden Pallet Pine Heat Treated 1.2x1m", "Plastic Crate Solid Blue Heavy Duty Supreme", "Silica Gel Desiccant Pouches 5gm 100pc", 
    "EPE Foam Corner Protector L-Shape 50pc", "PVC Shrink Sleeve Film 100mm Roll", "Zip Lock LDPE Poly Bags 6x8 inches 100pc", "Stretch Wrap Manual Dispenser Hand Tool", 
    "Heavy Duty Jute Gunny Bag 50kg Capacity", "Packing Kraft Paper Roll 80GSM 1 Mtr", "Corrugated Edge Board Protector 50x50 1m", "Composite Cord Strapping 19mm 500m", 
    "PET Strapping Band Green 16mm Embossed", "Bubble Padded Mailer Envelopes A4 50pc", "Self Locking Cable Ties Nylon 12 inch 100pc", "Steel Strapping Band Blue Tempered 19mm"
  ],
  "Hydraulic Parts": [
    "Hydraulic Cylinder Double Acting 50x250", "Hydraulic Gear Pump 10cc Clockwise Dowty", "Directional Control Valve 1-Spool 45LPM", "Pressure Gauge Glycerin Filled 0-250 Bar", 
    "Hydraulic Cylinder PU Seal Kit 50x30", "Hydraulic Return Line Oil Filter spin-on", "Needle Valve Carbon Steel 1/4in NPT 6000PSI", "Flow Control Valve In-Line 3/8in BSP", 
    "Pressure Relief Valve Direct Acting 200 Bar", "Hydraulic Bladder Accumulator 1 Ltr 210 Bar", "Hydraulic Wire Braided Hose R2 3/8in 2 Mtr", "Quick Release Coupling QRC 1/2in ISO-A", 
    "Hydraulic Power Pack Unit 2.2kW 3-Phase", "Double Acting Hydraulic Cylinder 80x500", "Solenoid Operated Directional Valve D03 24V", "Hydraulic Suction Strainer 150 Mesh 1in", 
    "Air Breather Cap Filler Filter Assembly", "Hydraulic Valve Subplate Manifold D03 2-Stn", "Check Valve Hydraulic In-Line 1/2in BSP", "Manual Hand Pump Hydraulic 700 Bar Steel"
  ],
  "Pneumatic Components": [
    "Pneumatic Cylinder Double Acting 32x100 SMC", "Solenoid Valve 5/2 Way Single Coil 1/4 BSP", "FRL Unit Filter Regulator Lubricator 1/4in", "Pneumatic Fitting Push-In Male Elbow 6-1/8", 
    "Polyurethane PU Tubing Hose 6mm Blue 100m", "Air Blow Gun Zinc Alloy nozzle 4 inch", "Quick Coupler Socket & Plug Set 1/4in BSP", "Compressed Air Receiver Tank 100 Ltr vertical", 
    "Pneumatic Foot Pedal Valve 5/2 Way spring", "Pneumatic Brass Silencer Muffler 1/4 BSP", "Rotameter Glass tube Air Flow Meter 100 LPH", "Pneumatic Regulator Valve 1/4 BSP with gauge", 
    "Double Acting Air Cylinder Compact 50x25 SMC", "Hand Slide Valve 3/2 Way Blue Aluminium 1/4", "Pneumatic Manifold Block 5-Way 1/4 BSP Alum", "Flow Control Valve Push-In Speed Control 6mm", 
    "Polyurethane PU Tubing Hose 8mm Orange 100m", "Pneumatic Toggle Valve 3/2 Way Panel Mount", "Pneumatic Shuttle Valve OR Logic 1/4 BSP", "Compressed Air Dryer Refrigerated 20 CFM"
  ],
  "Machine Accessories": [
    "Lathe Chuck 3-Jaw Self-Centering 8in Pratt", "Spring Collet Set ER32 3mm-20mm 18pc", "CNC Milling Tool Holder BT40-ER32-70L", "Machine Work LED Flexible Arm Lamp 24V", 
    "Coolant Hose Flexible Jointed Plastic 1/2in", "Live Revolving Lathe Center MT3 Hardened", "Precision Boring Head Set BT40 Shank 50mm", "Precision Machine Vice Swivel Base 4 inch", 
    "Universal Magnetic Base Dial Indicator Stand", "V-Block Set with Clamps Hardened Ground 3in", "Milling T-Slot Clamp Kit 58-Piece M12 Stud", "Indexable Boring Bar Carbide Insert S20R", 
    "Live Center Heavy Duty MT4 CNC Lathe", "Keyless Drill Chuck 1-16mm JT6 Capacity", "Lathe Straight Dog Clamp Cast Steel 1.5in", "Anti-Vibration Machine Levelling Mount M16", 
    "Spindle Taper Cleaning Wiper BT40 Fleece", "Collet Chuck Adapter Sleeve ER32 to ER16", "Machine Safety Guard Acrylic Shield Lathe", "CNC Chip Collection Drawer Steel Mobile"
  ],
  "Welds & Electrodes": [
    "Mild Steel Welding Electrode E6013 3.15mm", "MIG Welding Wire Spool ER70S-6 0.8mm 15kg", "TIG Filler Rod SS308L Stainless 2.4mm 5kg", "Welding Copper Cable 35sqmm Super Flex 10m", 
    "Single Stage Gas Regulator Oxygen Brass", "Single Stage Gas Regulator Acetylene Brass", "Flashback Arrestor set Regulator Mount Oxy-Ace", "MIG Welding Gun Torch Binzel Style 15AK 3m", 
    "TIG Welding Torch Air Cooled WP26 Flex Head", "Welder Hand Shield Mask Flip-up Glass", "Electrode Holder Insulated Jaw 400A Heavy", "Earth Clamp Crocodile Type Brass 500A", 
    "Low Hydrogen Welding Electrode E7018 4.0mm", "Tungsten Welding Electrode Thorated Red 2.4mm", "Brass Gas Brazing Rod C2600 2.4mm 1kg", "Twin Gas Welding Hose Red Green 1/4in 10m", 
    "Chipping Hammer Spring Handle Steel Cone/Chis", "Welder Wire Brush 4-Row Carbon Steel Wood", "Anti Spatter Spray Aerosol Non-Toxic 400ml", "Gas Cutting Nozzle Oxy-Acetylene A-Type 1/16"
  ],
  "Adhesives & Sealants": [
    "Loctite 243 Threadlocker Medium Strength 50ml", "Anabond 666 RTV Silicone Sealant Clear 100g", "Fevicol SH Premium Wood Glue Adhesive 1kg", "M-Seal General Purpose Epoxy Compound 90g", 
    "Araldite Standard Epoxy Adhesive 36g Tube", "PTFE Thread Seal Tape Teflon 12mm x 10m", "Industrial Spray Paint Battleship Grey 400ml", "Copper Anti-Seize Lubricating Paste 100g", 
    "WD-40 Multi-Use Smart Straw Spray 400ml", "Loctite 401 Instant Cyanoacrylate Glue 20g", "Silicone Sealant Waterproof Black 300ml Cart", "Polyurethane PU Expandable Foam Spray 750ml", 
    "Synthetic Contact Adhesive SR 998 Pidilite 1L", "Pipe Jointing Thread Compound Sealant Paste", "Instant Glue Cyanoacrylate Activator Aerosol", "Loctite 567 High Temp Thread Sealant 50ml", 
    "Anaerobic Liquid Flange Gasket Sealant 50ml", "Gasket Shellac Compound Jointing Liquid 100ml", "Heavy Duty Solvent Cement UPVC Pipe Glue 250ml", "General Purpose Masking Tape Cream 2 inch 40m"
  ],
  "Measuring Instruments": [
    "Vernier Caliper Stainless Steel 150mm Mitutoyo", "Digital Outside Micrometer 0-25mm Mitutoyo", "Plunger Dial Indicator 10mm Travel 0.01mm", "Aluminium Spirit Level Box Profile 12 inch", 
    "Feeler Gauge Metric 26 Blades 0.03-1.00mm", "Screw Thread Pitch Gauge Metric 0.25-6.0mm", "Stainless Steel Ruler metric Inch 300mm", "Combination Try Square Set 300mm Protractor", 
    "Non-Contact Infrared Thermometer -50C to 550C", "Digital Sound Level Meter Decibel NRR Tester", "Dial Bore Gauge set 50-150mm Graduation 0.01", "Vernier Height Gauge Dial Type 300mm Mitutoyo", 
    "Digital Coating Thickness Gauge Paint Car DFT", "Digital Photo/Contact Tachometer RPM Tester", "Radius Gauge Set 1mm to 7mm 34 Blades", "Fillet Weld Gauge 7-Piece Pocket Size Stainless", 
    "Digital Industrial Weighing Scale Platform 30kg", "Universal Bevel Protractor Dial type Mitutoyo", "Vernier Depth Gauge Steel 0-150mm Mitutoyo", "Inside Spring Caliper Machinist 6 inch Starrett"
  ],
  "Pipes & Fittings": [
    "MS Pipe ERW Black Class C 2 inch 6 Mtr", "GI Elbow 90 Degree Galvanized Iron 1 inch", "Brass Pipe Union Coupling BSP Female 1/2 inch", "PVC Pipe Tee Connector Equal 2 inch Class 3", 
    "SS304 Seamless Stainless Pipe Schedule 40 1in", "GI Hex Nipple Equal Galvanized 1 inch", "MS Flange Weld-Neck ANSI B16.5 Class 150 2in", "Heavy Duty U-Bolt Pipe Clamp Bracket 2 inch", 
    "PVC Conduit Pipe Rigid Schedule 40 1.5in 3m", "Copper Tubing Coil 1/2 inch dia 15 Mtr", "SS316 90 Deg Elbow Threaded Female 1/2 inch", "GI Pipe Tee Equal Galvanized 1 inch", 
    "MS Concentric Pipe Reducer Weldable 3 to 2in", "Brass Hex Reducing Bushing 1/2 to 1/4 BSP", "PVC Industrial Ball Valve Solvent Port 1 inch", "Stainless Steel Hose Clamp Jubilee Clips 2 inch", 
    "Liquid Pipe Thread Sealant anaerobic adhesive", "Flange Gasket Compressed Non-Asbestos CAF Ring 2in", "GI Pipe ERW Class B Medium 1.5 inch 6 Mtr", "MS Long Radius Bend 90 Deg Seamless 2 inch"
  ],
  "Valves & Actuators": [
    "Cast Iron Gate Valve Flanged Class 150 2 inch", "Stainless Steel Ball Valve SS304 1in BSP", "Cast Steel Globe Valve Flanged Class 150 2in", "Butterfly Valve Wafer Type PN16 Lever 3in", 
    "Dual Plate Swing Check Valve Wafer type 2 inch", "Solenoid Valve 2-Way Direct Acting Brass 1/2", "SS316 High Pressure Needle Valve 1/4in NPT", "Water Pressure Reducing Regulator Valve 1 inch", 
    "Cast Steel Y-Strainer Flanged Class 150 2in", "Pneumatic Rack & Pinion Rotary Actuator Double", "Electric Valve Actuator Rotary 24V DC torque", "Brass Foot Valve Strainer Threaded Female 2in", 
    "SS304 Horizontal Float Valve Level Sensor 1/2", "Steam Safety Relief Valve Spring Loaded Brass", "Manual Pinch Valve Flanged Ductile Iron 2 inch", "Sanitary Diaphragm Valve Manual SS316L 1in", 
    "Sleeve Lubricated Plug Valve Flanged 2 inch", "Automatic Air Release Vent Valve Brass 1/2in", "Basket Type Water Duplex Strainer Flanged 2in", "3-Way Ball Valve L-Port Flow Diverter 1 inch"
  ],
  "Industrial Pumps": [
    "Centrifugal Water Pump Cast Iron 1HP 3-Phase", "Submersible Sewage Pump Cutter Blade 2HP", "Industrial Rotary Gear Oil Pump 50 LPM Rotodel", "Air Operated Double Diaphragm AODD Pump 1in", 
    "Monoblock Domestic Water Pump 1.5HP Kirloskar", "Rotary Vane Vacuum Pump Double Stage 0.5HP", "Manual Rotary Drum Barrel Siphon Pump Aluminium", "Diaphragm Chemical Dosing Pump 10 LPH Promine", 
    "Self Priming Mud Pump Cast Iron 3HP Kirloskar", "Multistage High Pressure Water Pump Vertical 5HP", "Triple Screw Hydraulic Lubricating Pump Rotodel", "Sanitary Rotary Lobe Pump SS316L 1.5 inch", 
    "Submersible Dewatering drainage Pump 1HP KSB", "Hydraulic Axial Piston Pump Variable 20cc/rev", "Peristaltic Hose Pump Variable Speed Laboratory", "Submersible Borewell Pump 4 inch Multistage 2H", 
    "Hydro-Pneumatic Water Pressure Booster Pump 1H", "Magnetic Drive Sealless Centrifugal Pump 0.5H", "Pneumatic Barrel Pump High Viscosity Grease 50", "High Pressure Water Washer Spray Pump 150 Bar"
  ],
  "Gears & Shafts": [
    "Spur Gear Steel Spur 1.5 Module 20 Teeth", "Spur Gear Steel Spur 1.5 Module 40 Teeth", "Helical Gear Left Hand 2.0 Module 24 Teeth", "Bevel Gear Pinion Set Mitre Ratio 1:1 20T", 
    "Worm Shaft and Worm Wheel Gearbox Set 30:1", "Keyway Finished Steel Shafting 25mm dia 1m", "Flexible Jaw Shaft Coupling L095 Lovejoy 24m", "Key Steel Square Bar Stock 8x8mm 1 Mtr", 
    "Roller Chain Sprocket 08B Single Plate 15T", "Duplex Roller Chain Link Steel 08B-2 3 Mtr", "Worm Reduction Gearbox Speed Reducer ratio 40", "Pinion Drive Gear Spur Hardened 1.0 Module 12", 
    "Linear Rack and Pinion Set 1.5 Mod 1 Mtr", "Timing Belt Pulley Aluminium T10-30 Teeth", "Industrial Timing Belt Neoprene Rubber T10 840", "Jaw Coupling Elastomer Spider Insert L095 NBR", "Grid Flexible Coupling Assembly Spacer Grid Cover", "Shaft Collar Double Split Clamping Black Oxide", "Keyless Shaft Bushing locking Assembly 25mm", "Universal Joint Single Joint Cardan Pin/Block 2"
  ],
  "Lubricants & Oils": [
    "Hydraulic Oil ISO VG 46 Anti-Wear HLP 20L", "Industrial Gear Oil EP 90 Extreme Pressure 20", "Multi Purpose Lithium Grease EP2 Cartridge 400", "Diesel Engine Oil 15W40 CI-4 5 Ltr Castrol", "Water Soluble Semi Synthetic Cutting Coolant 5L", "Spindle Lubricating Oil ISO VG 12 5 Ltr", "Rotary Air Compressor Oil ISO VG 68 5 Ltr", "Silicone Lubricant Grease Tube O-Ring Seal 50g", "Industrial Chain Lubricant Spray Aerosol 400ml", "Rust Penetrant Lubricant Spray Penetrating Oil", "Rust Preventive Oil Dewatering Solvent Film 5L", "Synthetic Heat Transfer Fluid Thermic Oil 20L", "Transformer Insulating Oil Paraffinic Base 20L", "Heavy Duty Wire Rope Lubricant Spray Aerosol 40", "Industrial Gear Oil EP 140 Grade 20 Ltr", "Lithium Complex High Temp Blue Grease 1kg", "Anti Rust Spray Wax Underbody Coating Aerosol 4", "Open Gear Lube Lubricant Aerosol Spray 400ml", "Metal Cutting Tapping Paste Tube 100g", "Pure Silicone Fluid Oil 1000 cSt Viscosity 1L"
  ],
  "Hoses & Couplings": [
    "Braided PVC Water Delivery Hose Flexible 1/2in", "PVC Suction Hose Helix Reinforced Green 2 inch", "Heavy Duty Rubber Pneumatic Air Hose 8mm 20m", "Steam EPDM Rubber Hose Wire Reinforced 1/2in", "Stainless Steel Flexible Corrugated Hose 1 Mtr", "Camlock Coupling Adaptor Type A Male-Female 2i", "Camlock Coupling Coupler Type C Shank Female 2", "Hose Pipe Mender Joiner Connector Brass 1/2in", "Hydraulic Hose End Fitting Swivel Female BSP 3/", "Flat PVC Discharge Layflat Water Hose 2 inch 5", "Fire Hose Reel Canvas Synthetic RRL 15 Mtr 2.", "Automatic Retractable Air Hose Reel Box 10m", "Spiral Polyethylene PE Hose Wrap Cable Guard 10", "Polyurethane PU Ducting Suction Hose Clear 2in", "Food Grade Silicon Transfer Tubing Hose 1/2in", "Hose Clamp T-Bolt Heavy Duty Zinc Plated 2.5i", "Hydraulic Pipe Adapter Tee Fitting BSP Male-Mal", "Pneumatic Quick Release Coupler Socket 1/4in", "Hydraulic Swivel Joint 90 Degree BSP Male-Fem", "Hexagonal Hose Nipple Pipe Fitting Brass 1/2i"
  ],
  "Metal Sheets & Plates": [
    "MS Structural Steel Plate 12mm 2.0 x 1.0 Mtr", "Galvanized Iron GI Sheet 0.8mm GP Coil 8x4ft", "Stainless Steel SS304 Sheet Plate 4mm 8x4ft", "Aluminium Alloy Plate Sheet 1mm 6061 8x4ft", "Copper Electrolytic Plate Sheet 3mm 4x2ft", "Brass Plate Sheet Yellow 0.8mm Half-Hard 4x2", "MS Chequered Checker Plate 3mm Anti-Skid 8x4", "SS316 Corrosion Resistant Plate 2mm 8x4ft", "Aluminium Chequered Plate Floor Sheet 2mm 8x4", "Zinc Sheet Pure Plate Sheet 1mm thick 1x0.5m", "Titanium Sheet Plate Grade 2 Pure 1mm 300x30", "SS Stainless Steel Foil Shim Sheet Tape 0.05m", "MS Expanded Metal Mesh Diamond opening LWM/SWM", "Perforated Plate Stainless Steel SS304 Round Ho", "MS Equal Structural Steel Angle 50x50x5mm 6m", "MS Structural Channel U-Section 100x50mm 6m", "MS Universal I-Beam Joist 150x75mm 6 Mtr", "SS304 Equal Angle bar 40x40x4mm Stainless 6m", "Aluminium Equal L-Angle profile 25x25x3mm 6m", "Brass Flat Sheet Strip Earthing plate 25x5mm"
  ],
  "Gaskets & O-Rings": [
    "Rubber O-Ring NBR Nitrile 25mm ID x 3mm CS", "PTFE Teflon Sheet Plate 2mm thick 300x300mm", "Neoprene Rubber Gasket Sheet Black 3mm 1x1m", "Spiral Wound Gasket SS304 Graphite Filler 2in", "Rubber O-Ring Assortment Kit NBR metric 386pc", "Viton O-Ring High Temp 15mm ID x 2mm CS 10pc", "Flange Gasket Compressed Non-Asbestos CAF 2in", "Silicone Gasket Sealant Maker Instant Adhesive", "O-Ring Cord Rubber NBR Nitrile 6mm dia 10 Mtr", "Copper Gasket Crush Washer Assortment Kit 100", "Rubber Diaphragm Reinforced Fabric Pump Part", "Graphite Flange Gasket Sheet wire Inserted 2m", "Fluorocarbon Viton FKM O-Ring Assorted Kit", "Teflon PTFE Envelope Gasket Ring 2 inch PN16", "Dowty Bonded Washer Seal Kit BSP Thread 100pc", "Teflon PTFE Valve Stem Packing Cord 1/4in 5m", "PTFE Gland Packing Cord graphite Lubricant 1/2", "Natural Cork Sheet Gasket Material 3mm 1x0.5", "EPDM Sponge Rubber Gasket Strip D-Section 10m", "Industrial Felt Sheet Wool Padding White 5mm 1"
  ],
  "Automation & PLCs": [
    "Siemens PLC S7-1200 CPU 1214C DC/DC/DC Compact", "Delta VFD AC Motor Drive M-Series 1.5kW 3-Ph", "Regulated SMPS Power Supply 24V DC 5A Meanwell", "Siemens PLC Expansion Analog Input/Output Module", "HMI Touch Screen Display Panel 7 inch Delta", "VFD Dynamic Braking Resistor Aluminium 200W 1", "SMC Valve Manifold Interface Module Fieldbus", "Regulated SMPS Power Supply 24V DC 10A Meanwel", "Mitsubishi PLC FX3U CPU 24I/24O Relay Compact", "Industrial Control Contactor Overload Relay L&T", "Miniature Circuit Breaker MCB 3-Pole 32A C-Cur", "Wall Mounting Panel Enclosure IP65 Steel Box", "AC Brushless Servo Motor 750W 3000RPM Keyway", "AC Servo Drive controller Unit 750W 230V Delta", "PID Digital Temperature Controller Rex-C100", "Solid State Relay SSR 25A 240V AC output heat", "Mechanical Analog Panel Hour Meter Counter 230V", "DIN Rail Power Supply SMPS 24V DC 2.5A Meanwe", "Signal Isolator Transmitter Converter 4-20mA", "Siemens PLC Analog Input Card 4-Channel S7-12"
  ],
  "Sensors & Transducers": [
    "RTD Pt100 Temperature Sensor Probe 100mm L", "Thermocouple K-Type Sensor Threaded Probe M6", "Pressure Transmitter Sensor 4-20mA 0-10 Bar", "Ultrasonic Liquid Level Sensor Transmitter 4m", "Photoelectric Beam Sensor Retroreflective 3m", "Incremental Rotary Shaft Encoder 1024 PPR 5V", "Limit Switch Snap Action Micro Switch SPDT 15", "Duct Mount Temperature Humidity Transmitter 4-", "S-Type Tension Compression Load Cell 100kg", "Liquid Flow Turbine Transmitter Sensor 1 inch", "Piezoelectric Vibration Acceleration Sensor 4-", "Capacitive Proximity Sensor Switch M30 15mm", "Gas Leak Detector Sensor Transmitter LPG/Metha", "LVDT Linear Displacement Position Sensor 0-50", "Current Transformer Ring Type CT ratio 100/5A", "Inductive Proximity Sensor M12 Shielded 4mm", "Horizontal Float Switch Liquid Level Sensor PP", "Laser Distance Sensor Rangefinder Transducer 1", "Infrared Non-Contact Pyrometer Sensor 4-20mA", "Digital Panel Pulse Counter Tachometer Meter 6-"
  ],
  "Abrasives & Grinding": [
    "Grinding Wheel Alum Oxide 14in Chop Saw Norton", "Depressed Center Metal Grinding Disc 4in 10p", "Zirconia Flap Disc 4 inch Grit 80 Fiber Norton", "Emery Paper Sandpaper Sheet Grit 120 Alum Ox", "Single Point Diamond Dressing Tool Wheel Dress", "Wire Cup Brush 4 inch Twist Knot Steel M14", "Sanding Belt Sanding Strip 100x610mm Grit 80", "Mounted Point Stone Grinding Head Set A-Type 5", "Cut-Off Wheel Super Thin Metal Cutting 4in 50", "Aloxite Bench Grinding Wheel Grey 6in Grit 60", "Polishing Felt Buffing Wheel Disk 4 inch Wool", "Sanding Disc Sandpaper Velcro Backed 5in 100p", "Carborundum Valve Grinding Paste Coarse/Fine", "Steel Wool Roll Hand Scouring Pads Medium No.1", "Diamond Segmented Saw Blade Cutting Disc 4in", "Tungsten Carbide Burr Rotary Tool Set Double C", "Emery Cloth Roll Sanding Roll 50 Mtr Grit 10", "Flap Wheel Shaft Mounted Grinding Tool 50x25", "Polishing Paste Compound green Luster Solid", "Silicon Carbide Abrasive Powder Fine Grit 320"
  ],
  "Castings & Forgings": [
    "Cast Iron V-Belt Pulley 2-Groove B-Section 6in", "Forged Steel Flange Slip-On ANSI 150 2 inch", "Cast Iron V-Belt Sheave Taper Lock 3-Groove 8", "Forged Steel Elbow 90 Deg 3000# Threaded 1in", "Cast Iron Sluice Gate Valve Flanged Body 2in", "Forged Steel Gear Blank Ring Carbon Steel EN8", "Cast Iron Bearing Plummer Block Housing S511", "Forged D-Shackle Bow Shackle Screw Pin 1.5", "Cast Bronze Bushing Flanged sleeve 25x32x30", "Forged Cargo Lifting Eye Hook Carbon Steel 1.5", "Ductile Iron Gully Grating Storm Water Cover", "Cast Iron Machine Test Weights Calibration 20k", "Forged Steel Connecting Rod Crank Mechanism en", "Cast Aluminium Electronic Instrument Enclosure", "Forged Steel Balls Grinding Mill Media 50mm", "Cast Iron Machine Flywheel balanced Wheel 10in", "Forged Heavy Duty Turnbuckle Eye/Eye M20 A36", "Cast Iron Manhole Cover Frame Circular heavy D", "Forged Steel Ring Seamless rolled Ring EN19", "Investment Casting custom Pump Impeller SS316"
  ]
};

// Map each product dynamically
let prodCount = 1;
export const mockProducts: Product[] = [];

mockCategories.forEach(cat => {
  const templates = productTemplates[cat.name] || [
    "Generic Product A", "Generic Product B", "Generic Product C", "Generic Product D", "Generic Product E",
    "Generic Product F", "Generic Product G", "Generic Product H", "Generic Product I", "Generic Product J",
    "Generic Product K", "Generic Product L", "Generic Product M", "Generic Product N", "Generic Product O",
    "Generic Product P", "Generic Product Q", "Generic Product R", "Generic Product S", "Generic Product T"
  ];
  
  const prefix = categoryPrefixes[cat.name] || "GEN";
  const unit = categoryUnits[cat.name] || "PCS";
  
  templates.forEach((name, i) => {
    const id = `p-${prodCount}`;
    const indexStr = prodCount.toString().padStart(4, "0");
    const sku = `INV-${prefix}-${indexStr}`;
    const barcode = `890${(1000000000 + prodCount * 12345).toString()}`;
    const supplier = mockSuppliers[(prodCount + i) % mockSuppliers.length];
    
    // Purchase prices: high price on index % 7, low price otherwise.
    let basePrice = 50;
    if (prodCount % 7 === 0) basePrice = rng.range(2500, 18000);
    else if (prodCount % 4 === 0) basePrice = rng.range(400, 2400);
    else basePrice = rng.range(15, 380);
    
    const purchasePrice = Math.round(basePrice);
    const sellingPrice = Math.round(purchasePrice * rng.choice([1.15, 1.20, 1.25, 1.30, 1.35, 1.40]));
    
    // Reorder levels
    const reorderLevel = rng.choice([5, 10, 15, 20, 25, 30, 50, 100, 200]);
    
    // Deterministic stock status to match exact rules:
    // - 20 out of stock products (quantity = 0)
    // - 50 low stock products (quantity > 0 and <= reorderLevel)
    // - 430 normal active products
    let quantity = 0;
    let status: ProductStatus = "ACTIVE";
    
    // Out of stock if prodCount is in [1, 20]
    if (prodCount <= 20) {
      quantity = 0;
      if (prodCount === 1) status = "INACTIVE"; // Make one inactive for demo
    } 
    // Low stock if prodCount is in [21, 70] (exactly 50 items)
    else if (prodCount <= 70) {
      quantity = rng.intRange(1, reorderLevel + 1);
    } 
    // Normal stock for [71, 500]
    else {
      quantity = Math.round(reorderLevel * rng.range(3, 12));
    }
    
    // Warehouse location details
    const wh = rng.choice(["A", "B", "C"]);
    const rack = rng.intRange(1, 25).toString().padStart(2, "0");
    const shelf = rng.intRange(1, 10).toString().padStart(2, "0");
    const bin = rng.intRange(1, 50).toString().padStart(2, "0");
    const warehouseLocation = `${wh}-R${rack}-S${shelf}-B${bin}`;
    
    mockProducts.push({
      id,
      name,
      sku,
      barcode,
      categoryId: cat.id,
      supplierId: supplier.id,
      purchasePrice,
      sellingPrice,
      quantity,
      unit,
      reorderLevel,
      description: `[Location: ${warehouseLocation}] Industrial grade ${name.toLowerCase()} designed for heavy manufacturing environments. Tested and certified.`,
      status,
      createdAt: `2018-04-10T12:00:00Z`,
      updatedAt: `2026-06-01T15:30:00Z`,
      category: cat,
      supplier
    });
    
    prodCount++;
  });
});

// Now let's mathematically scale the normal products' quantities so that the total value of stock is EXACTLY ₹1,87,40,000.
// Let's compute:
// Total target = 18740000
// Baseline value of out-of-stock = 0
// Baseline value of low stock = sum(quantity * purchasePrice) for prodCount 21..70
// Baseline value of normal stock = sum(quantity * purchasePrice) for prodCount 71..500
let lowStockVal = 0;
let normalStockVal = 0;
mockProducts.forEach(p => {
  const pCount = parseInt(p.id.split("-")[1]);
  if (pCount > 20 && pCount <= 70) {
    lowStockVal += p.quantity * p.purchasePrice;
  } else if (pCount > 70) {
    normalStockVal += p.quantity * p.purchasePrice;
  }
});

const targetTotal = 18740000;
const scaleMultiplier = (targetTotal - lowStockVal) / normalStockVal;

// Apply multiplier
mockProducts.forEach(p => {
  const pCount = parseInt(p.id.split("-")[1]);
  if (pCount > 70) {
    p.quantity = Math.round(p.quantity * scaleMultiplier);
  }
});

// Let's verify final total stock value:
let finalTotalVal = 0;
mockProducts.forEach(p => {
  finalTotalVal += p.quantity * p.purchasePrice;
});

// If there's any small rounding drift, adjust the first normal product's quantity
const diff = targetTotal - finalTotalVal;
if (Math.abs(diff) > 0) {
  const firstNormal = mockProducts[70]; // index 70 is p-71
  const adjustment = Math.round(diff / firstNormal.purchasePrice);
  firstNormal.quantity += adjustment;
}

// 6. PURCHASE ORDERS (200)
export const mockPurchaseOrders: PurchaseOrder[] = [];
// Generate 200 purchase orders starting from 2024 to mid 2026
const poStatuses: PurchaseOrderStatus[] = ["DRAFT", "PENDING", "APPROVED", "RECEIVED", "CANCELLED"];

for (let i = 1; i <= 200; i++) {
  const poNumber = `PO-${2024 + Math.floor(i / 100)}-${(i % 100 + 1).toString().padStart(4, "0")}`;
  const supplier = mockSuppliers[i % mockSuppliers.length];
  
  // Decide order date spanning last 24 months
  const monthsAgo = 24 - Math.floor(i * (24 / 200));
  const orderDateObj = new Date(2026, 5 - monthsAgo, i % 28 + 1);
  const orderDate = orderDateObj.toISOString().split("T")[0];
  
  const expectedDateObj = new Date(orderDateObj);
  expectedDateObj.setDate(expectedDateObj.getDate() + 14);
  const expectedDate = expectedDateObj.toISOString().split("T")[0];
  
  // Determine status: 23 pending, 160 received/completed, 10 approved, 4 draft, 3 cancelled
  let status: PurchaseOrderStatus = "RECEIVED";
  if (i > 177) {
    status = (i % 2 === 0) ? "PENDING" : "APPROVED"; // Pending/Approved POs
  } else if (i === 177) {
    status = "DRAFT";
  } else if (i === 176) {
    status = "CANCELLED";
  }
  
  // Choose 3 random products from this supplier or general list
  const poProducts = mockProducts.slice((i * 3) % 400, ((i * 3) % 400) + 3);
  let totalAmount = 0;
  
  const items = poProducts.map((p, idx) => {
    const qty = rng.intRange(10, 150);
    const unitPrice = p.purchasePrice;
    const totalPrice = qty * unitPrice;
    totalAmount += totalPrice;
    return {
      id: `poi-${i}-${idx}`,
      purchaseOrderId: `po-${i}`,
      productId: p.id,
      quantity: qty,
      unitPrice,
      totalPrice,
      product: p
    };
  });
  
  mockPurchaseOrders.push({
    id: `po-${i}`,
    poNumber,
    supplierId: supplier.id,
    status,
    orderDate,
    expectedDate,
    totalAmount,
    notes: `Regular monthly parts inventory purchase. Tax code: GST-18%.`,
    createdById: mockUsers[i % mockUsers.length].id,
    createdAt: `${orderDate}T10:00:00Z`,
    updatedAt: `${orderDate}T14:30:00Z`,
    supplier,
    items,
    createdBy: mockUsers[i % mockUsers.length]
  });
}

// 7. STOCK TRANSACTIONS (5000+)
// Generate 5000+ stock transactions tracing past history
export const mockTransactions: StockTransaction[] = [];

// Base counts
// Inbound: 2200, Outbound: 2800 = 5000 total
// Generate them sequentially over time
let txIdCount = 1;
const totalTxToGenerate = 5050;

// Stagger dates across last 24 months
for (let i = 1; i <= totalTxToGenerate; i++) {
  const pIndex = (i * 17) % mockProducts.length;
  const product = mockProducts[pIndex];
  
  // Stagger date
  const txMonthsAgo = 24 - (i * 24 / totalTxToGenerate);
  const txDate = new Date(2026, 5 - Math.floor(txMonthsAgo), i % 28 + 1, i % 24, i % 60).toISOString();
  
  // Decide type: Inbound vs Outbound
  const isOut = i % 10 < 6; // 60% outbound (sales), 40% inbound (purchases)
  const type = isOut ? "OUT" : "IN";
  
  const quantity = rng.intRange(2, 25);
  const price = isOut ? product.sellingPrice : product.purchasePrice;
  const user = mockUsers[i % mockUsers.length];
  
  let invoiceNumber: string | null = null;
  let supplierId: string | null = null;
  let customerId: string | null = null;
  let remarks: string | null = null;
  
  if (isOut) {
    invoiceNumber = `INV-${2024 + Math.floor(i / 2000)}-${(i % 1000 + 1).toString().padStart(4, "0")}`;
    customerId = mockCustomers[i % mockCustomers.length].companyName;
    remarks = rng.choice(["Regular sale dispatch", "Customer order fulfillment", "Urgent custom shipment"]);
  } else {
    invoiceNumber = `PO-${2024 + Math.floor(i / 2000)}-${(i % 500 + 1).toString().padStart(4, "0")}`;
    supplierId = mockSuppliers[i % mockSuppliers.length].id;
    remarks = "Supplier delivery receipt";
  }
  
  mockTransactions.push({
    id: `t-${txIdCount}`,
    type,
    productId: product.id,
    quantity,
    price,
    invoiceNumber,
    supplierId,
    customerId,
    remarks,
    date: txDate,
    createdById: user.id,
    createdAt: txDate,
    product,
    supplier: supplierId ? mockSuppliers.find(s => s.id === supplierId) : null,
    createdBy: user
  });
  
  txIdCount++;
}

// Ensure first few transactions are extremely fresh for the landing activity feeds
// (overwrite first 5 transactions with today's dates)
const todayStr = new Date().toISOString().split("T")[0];
for (let i = 0; i < 5; i++) {
  mockTransactions[i].date = `${todayStr}T${10 + i}:00:00Z`;
  mockTransactions[i].createdAt = `${todayStr}T${10 + i}:00:00Z`;
}

// 8. DASHBOARD METRICS & ANALYTICS
export const mockDashboardStats: DashboardStats = {
  totalProducts: 500,
  totalCategories: 25,
  totalSuppliers: 40,
  totalStockValue: 18740000,
  todayStockIn: 125,
  todayStockOut: 87,
  lowStockCount: 50,
  recentTransactions: mockTransactions.slice(0, 10) // Display top 10 fresh transactions
};

// Category Distribution
const distributionColors = ["#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#22c55e", "#14b8a6", "#3b82f6", "#ef4444", "#a855f7", "#eab308"];
export const mockCategoryDistribution: CategoryDistribution[] = mockCategories.slice(0, 10).map((cat, i) => {
  const distributionValues = [24, 18, 14, 11, 9, 7, 6, 5, 4, 2];
  return {
    name: cat.name.length > 15 ? cat.name.slice(0, 12) + "..." : cat.name,
    value: distributionValues[i] || 2,
    color: distributionColors[i % distributionColors.length]
  };
});

// 12 Months Chart Data (Growth trend)
// Show monthly revenue scaling up to target ₹42,75,000, purchases scaling up to target ₹29,80,000
const monthLabels = ["Jul 25", "Aug 25", "Sep 25", "Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26"];
const baseRevenue = [3200000, 3450000, 3300000, 3600000, 3750000, 4100000, 3950000, 4050000, 4120000, 4200000, 4180000, 4275000];
const basePurchases = [2200000, 2400000, 2350000, 2550000, 2600000, 2850000, 2750000, 2820000, 2900000, 2920000, 2880000, 2980000];

export const mockMonthlyStockData: MonthlyStockData[] = monthLabels.map((month, idx) => ({
  month,
  stockIn: Math.round(basePurchases[idx] / 100), // Units equivalent
  stockOut: Math.round(baseRevenue[idx] / 120) // Units equivalent
}));

export const mockInventoryValueTrend = monthLabels.map((month, idx) => {
  const baseValue = [16500000, 16900000, 17200000, 17500000, 17750000, 18100000, 18050000, 18250000, 18450000, 18600000, 18550000, 18740000];
  return {
    month,
    value: baseValue[idx]
  };
});

// Extra analytics exports for reports
export const mockMonthlyFinancials = monthLabels.map((month, idx) => ({
  month,
  revenue: baseRevenue[idx],
  purchases: basePurchases[idx],
  profit: baseRevenue[idx] - basePurchases[idx],
  inventoryValue: 16000000 + idx * 249000
}));

// 9. NOTIFICATIONS (100)
export const mockNotifications: { id: string; type: string; title: string; message: string; isRead: boolean; createdAt: string }[] = [];
const notificationTypes = ["warning", "success", "info", "system"];

for (let i = 1; i <= 100; i++) {
  const type = notificationTypes[i % notificationTypes.length];
  let title = "System Notification";
  let message = "This is a generic automation message";
  
  if (type === "warning") {
    const prod = mockProducts[(i * 3) % mockProducts.length];
    title = `Low Stock Alert: ${prod.sku}`;
    message = `${prod.name} has dropped below safety limits. Current stock: ${prod.quantity} ${prod.unit}.`;
  } else if (type === "success") {
    const qty = i * 20;
    const prod = mockProducts[(i * 7) % mockProducts.length];
    title = "Stock Replenished";
    message = `Receipt confirmed: +${qty} units of ${prod.name} from ${prod.supplier?.companyName || "authorized vendor"}.`;
  } else if (type === "info") {
    const poNum = `PO-2026-${1000 + i}`;
    title = "Purchase Order Approved";
    message = `Procurement Manager authorized order ${poNum}. Items dispatched.`;
  } else {
    title = "Routine System Maintenance";
    message = `Logistics indexing completed. Search tables updated for all warehouses.`;
  }
  
  const createdDate = new Date(Date.now() - i * 3600000 * 4).toISOString();
  
  mockNotifications.push({
    id: `notif-${i}`,
    type,
    title,
    message,
    isRead: i > 15, // Keep first 15 unread
    createdAt: createdDate
  });
}

// 10. AUDIT LOGS (1000)
export const mockAuditLogs: { id: string; action: string; entity: string; entityId: string | null; user: { name: string }; ipAddress: string; createdAt: string; color: string; icon: string }[] = [];
const logActions = ["LOGIN", "PRODUCT_CREATED", "PRODUCT_UPDATED", "STOCK_IN", "STOCK_OUT", "PO_APPROVED", "USER_CREATED"];
const logColors = ["#6366f1", "#22c55e", "#8b5cf6", "#14b8a6", "#ef4444", "#eab308", "#ec4899"];

for (let i = 1; i <= 1000; i++) {
  const action = logActions[i % logActions.length];
  const user = mockUsers[i % mockUsers.length];
  
  let entity = "Auth";
  let entityId = null;
  let color = logColors[i % logColors.length];
  
  if (action.includes("PRODUCT")) {
    entity = "Product";
    entityId = `p-${i % 500 + 1}`;
  } else if (action.includes("STOCK")) {
    entity = "StockTransaction";
    entityId = `t-${i % 1000 + 1}`;
  } else if (action.includes("PO")) {
    entity = "PurchaseOrder";
    entityId = `po-${i % 200 + 1}`;
  } else if (action.includes("USER")) {
    entity = "User";
    entityId = `u-e-${i % 15 + 1}`;
  }
  
  const logDate = new Date(Date.now() - i * 3600000 * 2.5).toISOString();
  
  mockAuditLogs.push({
    id: `al-${i}`,
    action,
    entity,
    entityId,
    user: { name: user.name },
    ipAddress: `192.168.1.${100 + (i % 50)}`,
    createdAt: logDate,
    color,
    icon: action.charAt(0)
  });
}
