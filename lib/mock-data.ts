import type { Station, Train, TrainClass } from "./types"

export const POPULAR_STATIONS: Station[] = [
  // Major Metro Cities
  { code: "NDLS", name: "New Delhi", city: "Delhi", state: "Delhi" },
  { code: "DLI", name: "Delhi Junction", city: "Delhi", state: "Delhi" },
  { code: "NZM", name: "Hazrat Nizamuddin", city: "Delhi", state: "Delhi" },
  { code: "BCT", name: "Mumbai Central", city: "Mumbai", state: "Maharashtra" },
  { code: "CSMT", name: "Mumbai CST", city: "Mumbai", state: "Maharashtra" },
  { code: "LTT", name: "Lokmanya Tilak Terminus", city: "Mumbai", state: "Maharashtra" },
  { code: "HWH", name: "Howrah Junction", city: "Kolkata", state: "West Bengal" },
  { code: "KOAA", name: "Kolkata", city: "Kolkata", state: "West Bengal" },
  { code: "MAS", name: "Chennai Central", city: "Chennai", state: "Tamil Nadu" },
  { code: "MSB", name: "Chennai Egmore", city: "Chennai", state: "Tamil Nadu" },
  { code: "SBC", name: "Bangalore City", city: "Bengaluru", state: "Karnataka" },
  { code: "YPR", name: "Yesvantpur Junction", city: "Bengaluru", state: "Karnataka" },
  { code: "KJM", name: "Krishnarajapuram", city: "Bengaluru", state: "Karnataka" },
  { code: "SC", name: "Secunderabad Junction", city: "Hyderabad", state: "Telangana" },
  { code: "HYB", name: "Hyderabad Deccan", city: "Hyderabad", state: "Telangana" },
  { code: "MMCT", name: "Mumbai Central", city: "Mumbai", state: "Maharashtra" },

  // North India
  { code: "CDG", name: "Chandigarh", city: "Chandigarh", state: "Chandigarh" },
  { code: "ASR", name: "Amritsar Junction", city: "Amritsar", state: "Punjab" },
  { code: "JUC", name: "Jalandhar City", city: "Jalandhar", state: "Punjab" },
  { code: "LDH", name: "Ludhiana Junction", city: "Ludhiana", state: "Punjab" },
  { code: "PTA", name: "Patiala", city: "Patiala", state: "Punjab" },
  { code: "JAT", name: "Jammu Tawi", city: "Jammu", state: "Jammu & Kashmir" },
  { code: "SVDK", name: "Shri Mata Vaishno Devi Katra", city: "Katra", state: "Jammu & Kashmir" },
  { code: "SRE", name: "Saharanpur", city: "Saharanpur", state: "Uttar Pradesh" },
  { code: "DED", name: "Dehradun", city: "Dehradun", state: "Uttarakhand" },
  { code: "HW", name: "Haridwar", city: "Haridwar", state: "Uttarakhand" },

  // Rajasthan
  { code: "JP", name: "Jaipur Junction", city: "Jaipur", state: "Rajasthan" },
  { code: "JU", name: "Jodhpur Junction", city: "Jodhpur", state: "Rajasthan" },
  { code: "UDZ", name: "Udaipur City", city: "Udaipur", state: "Rajasthan" },
  { code: "AII", name: "Ajmer Junction", city: "Ajmer", state: "Rajasthan" },
  { code: "BIKANER", name: "Bikaner Junction", city: "Bikaner", state: "Rajasthan" },
  { code: "AF", name: "Agra Fort", city: "Agra", state: "Uttar Pradesh" },

  // Gujarat
  { code: "ADI", name: "Ahmedabad Junction", city: "Ahmedabad", state: "Gujarat" },
  { code: "ST", name: "Surat", city: "Surat", state: "Gujarat" },
  { code: "RJT", name: "Rajkot Junction", city: "Rajkot", state: "Gujarat" },
  { code: "BRC", name: "Vadodara Junction", city: "Vadodara", state: "Gujarat" },
  { code: "GIMB", name: "Gandhidham", city: "Gandhidham", state: "Gujarat" },
  { code: "BHUJ", name: "Bhuj", city: "Bhuj", state: "Gujarat" },

  // Maharashtra
  { code: "PUNE", name: "Pune Junction", city: "Pune", state: "Maharashtra" },
  { code: "NGP", name: "Nagpur", city: "Nagpur", state: "Maharashtra" },
  { code: "NSL", name: "Nagpur South", city: "Nagpur", state: "Maharashtra" },
  { code: "AK", name: "Akola Junction", city: "Akola", state: "Maharashtra" },
  { code: "KOP", name: "Kolhapur", city: "Kolhapur", state: "Maharashtra" },
  { code: "SUR", name: "Solapur", city: "Solapur", state: "Maharashtra" },

  // Uttar Pradesh
  { code: "LKO", name: "Lucknow", city: "Lucknow", state: "Uttar Pradesh" },
  { code: "CNB", name: "Kanpur Central", city: "Kanpur", state: "Uttar Pradesh" },
  { code: "ALD", name: "Prayagraj Junction", city: "Prayagraj", state: "Uttar Pradesh" },
  { code: "BSB", name: "Varanasi Junction", city: "Varanasi", state: "Uttar Pradesh" },
  { code: "GKP", name: "Gorakhpur Junction", city: "Gorakhpur", state: "Uttar Pradesh" },
  { code: "MB", name: "Moradabad", city: "Moradabad", state: "Uttar Pradesh" },
  { code: "BE", name: "Bareilly", city: "Bareilly", state: "Uttar Pradesh" },
  { code: "AGC", name: "Agra Cantt", city: "Agra", state: "Uttar Pradesh" },
  { code: "MTJ", name: "Mathura Junction", city: "Mathura", state: "Uttar Pradesh" },
  { code: "GZB", name: "Ghaziabad", city: "Ghaziabad", state: "Uttar Pradesh" },

  // Bihar
  { code: "PNBE", name: "Patna Junction", city: "Patna", state: "Bihar" },
  { code: "RJPB", name: "Rajendranagar Terminal", city: "Patna", state: "Bihar" },
  { code: "GAY", name: "Gaya Junction", city: "Gaya", state: "Bihar" },
  { code: "BJU", name: "Barauni Junction", city: "Barauni", state: "Bihar" },
  { code: "SEE", name: "Sonpur Junction", city: "Sonpur", state: "Bihar" },
  { code: "CPR", name: "Chhapra", city: "Chhapra", state: "Bihar" },

  // West Bengal
  { code: "NJP", name: "New Jalpaiguri", city: "Siliguri", state: "West Bengal" },
  { code: "SDAH", name: "Sealdah", city: "Kolkata", state: "West Bengal" },
  { code: "SRC", name: "Santragachi", city: "Howrah", state: "West Bengal" },
  { code: "ASN", name: "Asansol Junction", city: "Asansol", state: "West Bengal" },
  { code: "DGR", name: "Durgapur", city: "Durgapur", state: "West Bengal" },

  // Tamil Nadu
  { code: "CBE", name: "Coimbatore Junction", city: "Coimbatore", state: "Tamil Nadu" },
  { code: "MDU", name: "Madurai Junction", city: "Madurai", state: "Tamil Nadu" },
  { code: "TJ", name: "Thanjavur Junction", city: "Thanjavur", state: "Tamil Nadu" },
  { code: "TPJ", name: "Tiruchirapalli", city: "Tiruchirapalli", state: "Tamil Nadu" },
  { code: "SA", name: "Salem Junction", city: "Salem", state: "Tamil Nadu" },
  { code: "TUP", name: "Tiruppur", city: "Tiruppur", state: "Tamil Nadu" },
  { code: "ED", name: "Erode Junction", city: "Erode", state: "Tamil Nadu" },
  { code: "KPD", name: "Katpadi Junction", city: "Vellore", state: "Tamil Nadu" },
  { code: "TVC", name: "Trivandrum Central", city: "Thiruvananthapuram", state: "Kerala" },

  // Kerala
  { code: "ERS", name: "Ernakulam Junction", city: "Kochi", state: "Kerala" },
  { code: "KTYM", name: "Kottayam", city: "Kottayam", state: "Kerala" },
  { code: "QLN", name: "Kollam Junction", city: "Kollam", state: "Kerala" },
  { code: "CAN", name: "Kannur", city: "Kannur", state: "Kerala" },
  { code: "CLT", name: "Kozhikode", city: "Kozhikode", state: "Kerala" },
  { code: "TCR", name: "Thrissur", city: "Thrissur", state: "Kerala" },
  { code: "ALLP", name: "Alappuzha", city: "Alappuzha", state: "Kerala" },

  // Karnataka
  { code: "UBL", name: "Hubballi Junction", city: "Hubballi", state: "Karnataka" },
  { code: "MYS", name: "Mysuru Junction", city: "Mysuru", state: "Karnataka" },
  { code: "MAJN", name: "Mangaluru Junction", city: "Mangaluru", state: "Karnataka" },
  { code: "DWR", name: "Dharwad", city: "Dharwad", state: "Karnataka" },
  { code: "BGM", name: "Belagavi", city: "Belagavi", state: "Karnataka" },
  { code: "GDG", name: "Gadag Junction", city: "Gadag", state: "Karnataka" },

  // Andhra Pradesh & Telangana
  { code: "VSKP", name: "Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh" },
  { code: "RJY", name: "Rajahmundry", city: "Rajahmundry", state: "Andhra Pradesh" },
  { code: "BZA", name: "Vijayawada Junction", city: "Vijayawada", state: "Andhra Pradesh" },
  { code: "GNT", name: "Guntur Junction", city: "Guntur", state: "Andhra Pradesh" },
  { code: "TPTY", name: "Tirupati", city: "Tirupati", state: "Andhra Pradesh" },
  { code: "GTL", name: "Guntakal Junction", city: "Guntakal", state: "Andhra Pradesh" },
  { code: "KCG", name: "Kacheguda", city: "Hyderabad", state: "Telangana" },
  { code: "WL", name: "Warangal", city: "Warangal", state: "Telangana" },

  // Odisha
  { code: "BBS", name: "Bhubaneswar", city: "Bhubaneswar", state: "Odisha" },
  { code: "CTC", name: "Cuttack", city: "Cuttack", state: "Odisha" },
  { code: "PURI", name: "Puri", city: "Puri", state: "Odisha" },
  { code: "ROU", name: "Rourkela", city: "Rourkela", state: "Odisha" },
  { code: "SBP", name: "Sambalpur", city: "Sambalpur", state: "Odisha" },

  // Madhya Pradesh
  { code: "BPL", name: "Bhopal Junction", city: "Bhopal", state: "Madhya Pradesh" },
  { code: "INDB", name: "Indore Junction", city: "Indore", state: "Madhya Pradesh" },
  { code: "JBP", name: "Jabalpur", city: "Jabalpur", state: "Madhya Pradesh" },
  { code: "GWL", name: "Gwalior", city: "Gwalior", state: "Madhya Pradesh" },
  { code: "UJN", name: "Ujjain Junction", city: "Ujjain", state: "Madhya Pradesh" },
  { code: "JHS", name: "Jhansi Junction", city: "Jhansi", state: "Madhya Pradesh" },

  // Chhattisgarh
  { code: "R", name: "Raipur Junction", city: "Raipur", state: "Chhattisgarh" },
  { code: "BSP", name: "Bilaspur Junction", city: "Bilaspur", state: "Chhattisgarh" },
  { code: "DURG", name: "Durg", city: "Durg", state: "Chhattisgarh" },

  // Jharkhand
  { code: "RNC", name: "Ranchi", city: "Ranchi", state: "Jharkhand" },
  { code: "TATA", name: "Tatanagar Junction", city: "Jamshedpur", state: "Jharkhand" },
  { code: "DHN", name: "Dhanbad Junction", city: "Dhanbad", state: "Jharkhand" },
  { code: "GMO", name: "Gomoh Junction", city: "Gomoh", state: "Jharkhand" },

  // Northeast India
  { code: "KYQ", name: "Kamakhya", city: "Guwahati", state: "Assam" },
  { code: "GHY", name: "Guwahati", city: "Guwahati", state: "Assam" },
  { code: "DBRG", name: "Dibrugarh", city: "Dibrugarh", state: "Assam" },
  { code: "JOR", name: "Jorhat Town", city: "Jorhat", state: "Assam" },
  { code: "LMG", name: "Lumding Junction", city: "Lumding", state: "Assam" },
  { code: "AGTL", name: "Agartala", city: "Agartala", state: "Tripura" },

  // Himachal Pradesh
  { code: "UNA", name: "Una Himachal", city: "Una", state: "Himachal Pradesh" },
  { code: "NLDM", name: "Nangal Dam", city: "Nangal", state: "Punjab" },
  { code: "SML", name: "Shimla", city: "Shimla", state: "Himachal Pradesh" },

  // Goa
  { code: "MAO", name: "Madgaon", city: "Margao", state: "Goa" },
  { code: "THVM", name: "Thivim", city: "Thivim", state: "Goa" },
  { code: "VSG", name: "Vasco da Gama", city: "Vasco da Gama", state: "Goa" },
]

const TRAIN_CLASSES: Record<string, TrainClass[]> = {
  rajdhani: [
    { code: "1A", name: "First AC", totalSeats: 18, availableSeats: 12, waitingList: 0, fare: 4500 },
    { code: "2A", name: "Second AC", totalSeats: 46, availableSeats: 23, waitingList: 5, fare: 2800 },
    { code: "3A", name: "Third AC", totalSeats: 64, availableSeats: 8, waitingList: 15, fare: 1950 },
  ],
  express: [
    { code: "SL", name: "Sleeper", totalSeats: 72, availableSeats: 45, waitingList: 12, fare: 450 },
    { code: "3A", name: "Third AC", totalSeats: 64, availableSeats: 28, waitingList: 8, fare: 1200 },
    { code: "2A", name: "Second AC", totalSeats: 46, availableSeats: 15, waitingList: 3, fare: 1800 },
    { code: "2S", name: "Second Sitting", totalSeats: 108, availableSeats: 67, waitingList: 0, fare: 180 },
  ],
  shatabdi: [
    { code: "CC", name: "Chair Car", totalSeats: 78, availableSeats: 34, waitingList: 2, fare: 850 },
    { code: "EC", name: "Executive Chair Car", totalSeats: 56, availableSeats: 18, waitingList: 0, fare: 1650 },
  ],
  duronto: [
    { code: "1A", name: "First AC", totalSeats: 18, availableSeats: 5, waitingList: 2, fare: 3800 },
    { code: "2A", name: "Second AC", totalSeats: 46, availableSeats: 12, waitingList: 8, fare: 2200 },
    { code: "3A", name: "Third AC", totalSeats: 64, availableSeats: 25, waitingList: 10, fare: 1500 },
    { code: "SL", name: "Sleeper", totalSeats: 72, availableSeats: 38, waitingList: 15, fare: 380 },
  ],
  superfast: [
    { code: "SL", name: "Sleeper", totalSeats: 72, availableSeats: 52, waitingList: 8, fare: 520 },
    { code: "3A", name: "Third AC", totalSeats: 64, availableSeats: 31, waitingList: 5, fare: 1350 },
    { code: "2A", name: "Second AC", totalSeats: 46, availableSeats: 18, waitingList: 2, fare: 1950 },
    { code: "2S", name: "Second Sitting", totalSeats: 108, availableSeats: 78, waitingList: 0, fare: 220 },
  ],
}

export const SAMPLE_TRAINS: Train[] = [
  {
    number: "12301",
    name: "Rajdhani Express",
    type: "Rajdhani",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS[3], // BCT
    departureTime: "16:55",
    arrivalTime: "08:35+1",
    duration: "15h 40m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.rajdhani,
  },
  {
    number: "12002",
    name: "Bhopal Shatabdi",
    type: "Shatabdi",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "BPL")!, // BPL
    departureTime: "06:00",
    arrivalTime: "14:25",
    duration: "8h 25m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.shatabdi,
  },
  {
    number: "12951",
    name: "Mumbai Rajdhani",
    type: "Rajdhani",
    source: POPULAR_STATIONS[3], // BCT
    destination: POPULAR_STATIONS[0], // NDLS
    departureTime: "17:20",
    arrivalTime: "09:10+1",
    duration: "15h 50m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.rajdhani,
  },
  {
    number: "12626",
    name: "Kerala Express",
    type: "Express",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "TVC")!, // TVC
    departureTime: "11:00",
    arrivalTime: "10:15+2",
    duration: "47h 15m",
    runsOn: ["Mon", "Wed", "Sat"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12840",
    name: "Howrah Mail",
    type: "Express",
    source: POPULAR_STATIONS[8], // MAS
    destination: POPULAR_STATIONS[6], // HWH
    departureTime: "23:05",
    arrivalTime: "05:15+2",
    duration: "30h 10m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12009",
    name: "Shatabdi Express",
    type: "Shatabdi",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS[10], // SBC
    departureTime: "06:00",
    arrivalTime: "21:30",
    duration: "15h 30m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.shatabdi,
  },
  {
    number: "12723",
    name: "Telangana Express",
    type: "Express",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "SC")!, // SC (Secunderabad)
    departureTime: "21:25",
    arrivalTime: "06:50+2",
    duration: "33h 25m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12759",
    name: "Charminar Express",
    type: "Express",
    source: POPULAR_STATIONS.find((s) => s.code === "SC")!, // SC
    destination: POPULAR_STATIONS[8], // MAS
    departureTime: "17:40",
    arrivalTime: "05:55+1",
    duration: "12h 15m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12603",
    name: "Hyderabad Express",
    type: "Express",
    source: POPULAR_STATIONS[8], // MAS
    destination: POPULAR_STATIONS.find((s) => s.code === "SC")!, // SC
    departureTime: "14:50",
    arrivalTime: "03:05+1",
    duration: "12h 15m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12639",
    name: "Brindavan Express",
    type: "Express",
    source: POPULAR_STATIONS[8], // MAS
    destination: POPULAR_STATIONS[10], // SBC
    departureTime: "07:15",
    arrivalTime: "12:30",
    duration: "5h 15m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12649",
    name: "Sampark Kranti Express",
    type: "Express",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS[10], // SBC
    departureTime: "11:50",
    arrivalTime: "22:00+1",
    duration: "34h 10m",
    runsOn: ["Mon", "Wed", "Fri"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12785",
    name: "KSK Express",
    type: "Express",
    source: POPULAR_STATIONS[10], // SBC
    destination: POPULAR_STATIONS[0], // NDLS
    departureTime: "20:15",
    arrivalTime: "04:25+2",
    duration: "32h 10m",
    runsOn: ["Tue", "Thu", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12423",
    name: "Dibrugarh Rajdhani",
    type: "Rajdhani",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "DBRG")!, // DBRG
    departureTime: "14:15",
    arrivalTime: "10:30+2",
    duration: "44h 15m",
    runsOn: ["Mon", "Thu"],
    classes: TRAIN_CLASSES.rajdhani,
  },
  {
    number: "12413",
    name: "Jammu Rajdhani",
    type: "Rajdhani",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "JAT")!, // JAT
    departureTime: "20:25",
    arrivalTime: "06:05+1",
    duration: "9h 40m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.rajdhani,
  },
  {
    number: "12953",
    name: "August Kranti Rajdhani",
    type: "Rajdhani",
    source: POPULAR_STATIONS[3], // BCT
    destination: POPULAR_STATIONS[0], // NDLS
    departureTime: "17:55",
    arrivalTime: "09:55+1",
    duration: "16h 00m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.rajdhani,
  },
  {
    number: "12019",
    name: "Shatabdi Express",
    type: "Shatabdi",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "BPL")!, // BPL
    departureTime: "15:50",
    arrivalTime: "23:55",
    duration: "8h 05m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.shatabdi,
  },
  {
    number: "12259",
    name: "Duronto Express",
    type: "Duronto",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "KYQ")!, // KYQ
    departureTime: "21:50",
    arrivalTime: "19:15+2",
    duration: "45h 25m",
    runsOn: ["Wed", "Sun"],
    classes: TRAIN_CLASSES.duronto,
  },
  {
    number: "12555",
    name: "Gorakhdham Express",
    type: "Superfast",
    source: POPULAR_STATIONS[6], // HWH
    destination: POPULAR_STATIONS[0], // NDLS
    departureTime: "15:50",
    arrivalTime: "10:00+1",
    duration: "18h 10m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.superfast,
  },
  {
    number: "12617",
    name: "Mangala Lakshadweep Express",
    type: "Express",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "TVC")!, // TVC
    departureTime: "20:45",
    arrivalTime: "04:15+3",
    duration: "55h 30m",
    runsOn: ["Tue", "Fri"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12925",
    name: "Paschim Express",
    type: "Express",
    source: POPULAR_STATIONS.find((s) => s.code === "ADI")!, // ADI
    destination: POPULAR_STATIONS[3], // BCT
    departureTime: "23:40",
    arrivalTime: "12:25+1",
    duration: "12h 45m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12137",
    name: "Punjab Mail",
    type: "Express",
    source: POPULAR_STATIONS[4], // CSMT
    destination: POPULAR_STATIONS.find((s) => s.code === "ASR")!, // ASR
    departureTime: "19:15",
    arrivalTime: "22:30+1",
    duration: "27h 15m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12345",
    name: "Golden Temple Mail",
    type: "Express",
    source: POPULAR_STATIONS[3], // BCT
    destination: POPULAR_STATIONS.find((s) => s.code === "ASR")!, // ASR
    departureTime: "16:40",
    arrivalTime: "18:15+1",
    duration: "25h 35m",
    runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: TRAIN_CLASSES.express,
  },
  {
    number: "12876",
    name: "Neelachal Express",
    type: "Express",
    source: POPULAR_STATIONS[0], // NDLS
    destination: POPULAR_STATIONS.find((s) => s.code === "PURI")!, // PURI
    departureTime: "06:45",
    arrivalTime: "06:00+2",
    duration: "47h 15m",
    runsOn: ["Mon", "Wed", "Fri"],
    classes: TRAIN_CLASSES.express,
  },
]

export const MOCK_PNR_DATA: Record<string, any> = {
  "2301456789": {
    pnr: "2301456789",
    trainNumber: "12301",
    trainName: "Rajdhani Express",
    dateOfJourney: "2024-01-15",
    from: "NDLS",
    to: "BCT",
    boardingPoint: "NDLS",
    reservationUpto: "BCT",
    passengers: [
      { name: "RAHUL SHARMA", age: 32, gender: "M", currentStatus: "CNF/B2/45", bookingStatus: "CNF/B2/45" },
      { name: "PRIYA SHARMA", age: 28, gender: "F", currentStatus: "CNF/B2/46", bookingStatus: "CNF/B2/46" },
    ],
    chartPrepared: false,
    class: "2A",
    quota: "GN",
    totalFare: 5600,
    bookingStatus: "CONFIRMED",
  },
  "2951234567": {
    pnr: "2951234567",
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani",
    dateOfJourney: "2024-01-20",
    from: "BCT",
    to: "NDLS",
    boardingPoint: "BCT",
    reservationUpto: "NDLS",
    passengers: [{ name: "AMIT KUMAR", age: 35, gender: "M", currentStatus: "WL/15", bookingStatus: "WL/25" }],
    chartPrepared: false,
    class: "3A",
    quota: "GN",
    totalFare: 1950,
    bookingStatus: "WAITING LIST",
  },
  "1234567890": {
    pnr: "1234567890",
    trainNumber: "12626",
    trainName: "Kerala Express",
    dateOfJourney: "2024-01-18",
    from: "NDLS",
    to: "TVC",
    boardingPoint: "NDLS",
    reservationUpto: "TVC",
    passengers: [
      { name: "SURESH NAIR", age: 45, gender: "M", currentStatus: "CNF/S4/32", bookingStatus: "WL/5" },
      { name: "LAKSHMI NAIR", age: 42, gender: "F", currentStatus: "CNF/S4/33", bookingStatus: "WL/6" },
      { name: "ARJUN NAIR", age: 18, gender: "M", currentStatus: "CNF/S4/34", bookingStatus: "WL/7" },
    ],
    chartPrepared: true,
    class: "SL",
    quota: "GN",
    totalFare: 1350,
    bookingStatus: "CONFIRMED",
  },
}

export const LIVE_TRAIN_STATUS: Record<string, any> = {
  "12301": {
    trainNumber: "12301",
    trainName: "Rajdhani Express",
    currentStatus: "Running on time",
    currentLocation: "Mathura Junction",
    delay: 0,
    nextStation: "Agra Cantt",
    estimatedArrival: "18:45",
    lastUpdated: new Date().toISOString(),
    route: [
      { station: "New Delhi", arrival: "--", departure: "16:55", status: "Departed", delay: 0 },
      { station: "Ghaziabad", arrival: "17:25", departure: "17:27", status: "Departed", delay: 0 },
      { station: "Mathura Jn", arrival: "18:15", departure: "18:17", status: "At Platform", delay: 0 },
      { station: "Agra Cantt", arrival: "18:45", departure: "18:47", status: "Yet to arrive", delay: 0 },
      { station: "Jhansi Jn", arrival: "21:15", departure: "21:25", status: "Yet to arrive", delay: 0 },
      { station: "Bhopal Jn", arrival: "01:15+1", departure: "01:25+1", status: "Yet to arrive", delay: 0 },
      { station: "Mumbai Central", arrival: "08:35+1", departure: "--", status: "Yet to arrive", delay: 0 },
    ],
  },
  "12951": {
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani",
    currentStatus: "Running late by 25 minutes",
    currentLocation: "Vadodara Junction",
    delay: 25,
    nextStation: "Ratlam Junction",
    estimatedArrival: "23:50",
    lastUpdated: new Date().toISOString(),
    route: [
      { station: "Mumbai Central", arrival: "--", departure: "17:20", status: "Departed", delay: 0 },
      { station: "Borivali", arrival: "17:45", departure: "17:47", status: "Departed", delay: 5 },
      { station: "Vapi", arrival: "19:15", departure: "19:17", status: "Departed", delay: 15 },
      { station: "Surat", arrival: "20:25", departure: "20:30", status: "Departed", delay: 20 },
      { station: "Vadodara Jn", arrival: "22:15", departure: "22:20", status: "Departed", delay: 25 },
      { station: "Ratlam Jn", arrival: "23:25", departure: "23:30", status: "Yet to arrive", delay: 25 },
      { station: "New Delhi", arrival: "09:10+1", departure: "--", status: "Yet to arrive", delay: 25 },
    ],
  },
}

export const generatePNR = (): string => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString()
}

export const searchTrains = (from: string, to: string, date: string): Train[] => {
  const fromStation = POPULAR_STATIONS.find((s) => s.code === from)
  const toStation = POPULAR_STATIONS.find((s) => s.code === to)

  if (!fromStation || !toStation) {
    // If stations not found, return some popular trains
    return SAMPLE_TRAINS.slice(0, 5)
  }

  // Level 1: Exact route match
  let results = SAMPLE_TRAINS.filter((train) => {
    return train.source.code === from && train.destination.code === to
  })

  // Level 2: Same city match
  if (results.length === 0) {
    results = SAMPLE_TRAINS.filter((train) => {
      return train.source.city === fromStation.city && train.destination.city === toStation.city
    })
  }

  // Level 3: Same state or nearby routes
  if (results.length === 0) {
    results = SAMPLE_TRAINS.filter((train) => {
      return (
        train.source.state === fromStation.state ||
        train.destination.state === toStation.state ||
        train.source.city === fromStation.city ||
        train.destination.city === toStation.city
      )
    })
  }

  // Level 4: Popular routes from source city
  if (results.length === 0) {
    results = SAMPLE_TRAINS.filter((train) => {
      return train.source.city === fromStation.city
    })
  }

  // Level 5: Popular routes to destination city
  if (results.length === 0) {
    results = SAMPLE_TRAINS.filter((train) => {
      return train.destination.city === toStation.city
    })
  }

  // Level 6: Fallback - return popular trains with a note
  if (results.length === 0) {
    results = SAMPLE_TRAINS.slice(0, 8)
  }

  // Randomize availability to simulate real-time changes
  return results.map((train) => ({
    ...train,
    classes: train.classes.map((cls) => ({
      ...cls,
      availableSeats: Math.max(0, cls.availableSeats + Math.floor(Math.random() * 20) - 10),
      waitingList: Math.max(0, cls.waitingList + Math.floor(Math.random() * 10) - 5),
    })),
  }))
}

export const getStationSuggestions = (query: string): Station[] => {
  if (!query) return POPULAR_STATIONS.slice(0, 8)

  return POPULAR_STATIONS.filter(
    (station) =>
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.code.toLowerCase().includes(query.toLowerCase()) ||
      station.city.toLowerCase().includes(query.toLowerCase()),
  ).slice(0, 10)
}

export const getPNRStatus = (pnr: string) => {
  return MOCK_PNR_DATA[pnr] || null
}

export const getLiveTrainStatus = (trainNumber: string) => {
  return LIVE_TRAIN_STATUS[trainNumber] || null
}

export const updateSeatAvailability = (trainNumber: string, classCode: string) => {
  const train = SAMPLE_TRAINS.find((t) => t.number === trainNumber)
  if (train) {
    const trainClass = train.classes.find((c) => c.code === classCode)
    if (trainClass) {
      // Simulate random availability changes
      const change = Math.floor(Math.random() * 10) - 5
      trainClass.availableSeats = Math.max(0, trainClass.availableSeats + change)
      trainClass.waitingList = Math.max(0, trainClass.waitingList - change)
    }
  }
  return train
}
