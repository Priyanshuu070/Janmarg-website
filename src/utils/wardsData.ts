// Utility to parse CSV data from wards.csv
export const wardsCSVData = `ward_id,zone,ward_name,population,state,district,reports_count,active_contractors,urgency_score
ward001,Ranchi Central Zone,Lalpur Ward - Main Market,45000,Jharkhand,Ranchi,34,5,75
ward002,Ranchi South Zone,Harmu Ward - Residential Area,62000,Jharkhand,Ranchi,28,4,65
ward003,Jamshedpur East Zone,Sakchi Ward - Steel Plant Area,58000,Jharkhand,East Singhbhum,42,6,85
ward004,Ranchi South Zone,Doranda Ward - Educational Hub,41000,Jharkhand,Ranchi,19,3,45
ward005,Ranchi North Zone,Kanke Ward - Forest Area,38000,Jharkhand,Ranchi,23,3,55
ward006,Jamshedpur East Zone,Jugsalai Ward - Industrial Zone,52000,Jharkhand,East Singhbhum,31,4,70
ward007,Ranchi Central Zone,Lower Bazar Ward - Commercial Hub,67000,Jharkhand,Ranchi,47,7,90
ward008,Dhanbad West Zone,Bank More Ward - Mining Area,44000,Jharkhand,Dhanbad,25,3,60
ward009,Ranchi South Zone,Hatia Ward - Railway Colony,49000,Jharkhand,Ranchi,38,5,80
ward010,Ranchi Central Zone,Upper Bazar Ward - Heritage Area,71000,Jharkhand,Ranchi,52,8,95
ward011,Ranchi North Zone,Namkum Ward - Tribal Area,35000,Jharkhand,Ranchi,16,2,40
ward012,Jamshedpur East Zone,Sonari Ward - Township,43000,Jharkhand,East Singhbhum,29,4,65
ward013,Dhanbad West Zone,Jharia Ward - Coal Mining,56000,Jharkhand,Dhanbad,33,5,75
ward014,Ranchi South Zone,Ratu Ward - Agricultural Area,39000,Jharkhand,Ranchi,21,3,50
ward015,Ranchi Central Zone,Argora Ward - Industrial Estate,29000,Jharkhand,Ranchi,18,2,45
ward016,Ranchi North Zone,Ormanjhi Ward - Hill Station,48000,Jharkhand,Ranchi,27,4,60
ward017,Dhanbad West Zone,Bhuli Ward - Mining Township,41000,Jharkhand,Dhanbad,22,3,55
ward018,Jamshedpur East Zone,Mango Ward - Urban Center,35000,Jharkhand,East Singhbhum,15,2,35
ward019,Ranchi South Zone,Khunti Ward - Rural Development,72000,Jharkhand,Khunti,45,6,85
ward020,Ranchi Central Zone,Sukurhutu Ward - Commercial Complex,38000,Jharkhand,Ranchi,29,4,70
ward021,Ranchi North Zone,Bundu Ward - Forest Reserve,54000,Jharkhand,Ranchi,31,5,75
ward022,Dhanbad West Zone,Govindpur Ward - Power Plant Area,47000,Jharkhand,Dhanbad,24,3,55
ward023,Jamshedpur East Zone,Ghatshila Ward - Mining Town,61000,Jharkhand,East Singhbhum,37,5,80
ward024,Ranchi South Zone,Mandar Ward - Dam Area,43000,Jharkhand,Ranchi,20,3,50
ward025,Ranchi Central Zone,Angara Ward - Industrial Hub,32000,Jharkhand,Ranchi,17,2,40
ward026,Ranchi North Zone,Lohardaga Ward - Tribal District HQ,39000,Jharkhand,Lohardaga,26,4,65
ward027,Dhanbad West Zone,Bokaro Steel City Ward - Industrial Complex,45000,Jharkhand,Bokaro,35,5,80
ward028,Jamshedpur East Zone,Chakradharpur Ward - Railway Junction,51000,Jharkhand,West Singhbhum,28,4,65
ward029,Ranchi South Zone,Gumla Ward - Forest District,46000,Jharkhand,Gumla,32,4,75
ward030,Ranchi Central Zone,Hazaribagh Ward - Coal Mining HQ,41000,Jharkhand,Hazaribagh,30,4,70`;

export interface Ward {
  ward_id: string;
  zone: string;
  ward_name: string;
  population: number;
  state: string;
  district: string;
  reports_count: number;
  active_contractors: number;
  urgency_score: number;
}

export interface Zone {
  id: string;
  name: string;
  code: string;
  wards: number;
  reports: number;
  activeContractors: number;
  status: string;
  urgencyScore: number;
  population: number;
  state: string;
  district: string;
}

// Parse CSV data
export const parseCSV = (csvText: string): Ward[] => {
  const lines = csvText.trim().split('\n');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      ward_id: values[0],
      zone: values[1],
      ward_name: values[2],
      population: parseInt(values[3]),
      state: values[4],
      district: values[5],
      reports_count: parseInt(values[6]),
      active_contractors: parseInt(values[7]),
      urgency_score: parseInt(values[8])
    };
  });
};

// Process wards into zones
export const processWardsIntoZones = (wards: Ward[]): Zone[] => {
  const zoneGroups = wards.reduce((groups, ward) => {
    if (!groups[ward.zone]) {
      groups[ward.zone] = [];
    }
    groups[ward.zone].push(ward);
    return groups;
  }, {} as Record<string, Ward[]>);

  return Object.entries(zoneGroups).map(([zoneName, zoneWards], index) => {
    const totalReports = zoneWards.reduce((sum, ward) => sum + ward.reports_count, 0);
    const totalContractors = zoneWards.reduce((sum, ward) => sum + ward.active_contractors, 0);
    const totalPopulation = zoneWards.reduce((sum, ward) => sum + ward.population, 0);
    const avgUrgencyScore = Math.round(
      zoneWards.reduce((sum, ward) => sum + ward.urgency_score, 0) / zoneWards.length
    );
    
    const zoneCode = zoneName.split(' ')[0].toUpperCase().slice(0, 3) + '-' + String(index + 1).padStart(3, '0');
    
    return {
      id: `zone-${index + 1}`,
      name: zoneName,
      code: zoneCode,
      wards: zoneWards.length,
      reports: totalReports,
      activeContractors: totalContractors,
      status: avgUrgencyScore > 80 ? 'High Priority' : avgUrgencyScore > 60 ? 'Medium Priority' : 'Normal',
      urgencyScore: avgUrgencyScore,
      population: totalPopulation,
      state: zoneWards[0].state,
      district: zoneWards[0].district
    };
  });
};