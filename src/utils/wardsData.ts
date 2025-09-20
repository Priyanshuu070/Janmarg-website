// Utility to parse CSV data from wards.csv
export const wardsCSVData = `ward_id,zone,ward_name,population,state,district,reports_count,active_contractors,urgency_score
ward001,Central Zone,Central Ward - Connaught Place,45000,Delhi,New Delhi,34,5,75
ward002,South Zone,Highway Ward - DLF Phase 1,62000,Haryana,Gurgaon,28,4,65
ward003,East Zone,Sector 15 Ward - IT Hub,58000,Haryana,Gurgaon,42,6,85
ward004,South Zone,Park View Ward - Lajpat Nagar,41000,Delhi,South Delhi,19,3,45
ward005,North Zone,Model Town Ward - GTB Nagar,38000,Delhi,North Delhi,23,3,55
ward006,East Zone,Green Valley Ward - Preet Vihar,52000,Delhi,East Delhi,31,4,70
ward007,Central Zone,Commercial Hub Ward - Karol Bagh,67000,Delhi,Central Delhi,47,7,90
ward008,West Zone,Residential Colony Ward - Rajouri Garden,44000,Delhi,West Delhi,25,3,60
ward009,South Zone,Market District Ward - Saket,49000,Delhi,South Delhi,38,5,80
ward010,Central Zone,Old City Ward - Chandni Chowk,71000,Delhi,Old Delhi,52,8,95
ward011,North Zone,Industrial Ward - Azadpur,35000,Delhi,North Delhi,16,2,40
ward012,East Zone,Tech Park Ward - Noida Sector 62,43000,Uttar Pradesh,Gautam Buddh Nagar,29,4,65
ward013,West Zone,Metro Station Ward - Dwarka,56000,Delhi,South West Delhi,33,5,75
ward014,South Zone,University Ward - Jamia Nagar,39000,Delhi,South Delhi,21,3,50
ward015,Central Zone,Heritage Ward - Red Fort Area,29000,Delhi,Central Delhi,18,2,45
ward016,North Zone,Railway Colony Ward - Shahdara,48000,Delhi,North East Delhi,27,4,60
ward017,West Zone,Airport Ward - Mahipalpur,41000,Delhi,South West Delhi,22,3,55
ward018,East Zone,Sports Complex Ward - Yamuna Sports Complex,35000,Delhi,East Delhi,15,2,35
ward019,South Zone,Corporate Ward - Cyber City,72000,Haryana,Gurgaon,45,6,85
ward020,Central Zone,Financial District Ward - Barakhamba Road,38000,Delhi,New Delhi,29,4,70
ward021,North Zone,Textile Market Ward - Gandhi Nagar,54000,Delhi,East Delhi,31,5,75
ward022,West Zone,Residential Sector Ward - Janakpuri,47000,Delhi,West Delhi,24,3,55
ward023,East Zone,IT Park Ward - Noida Sector 18,61000,Uttar Pradesh,Gautam Buddh Nagar,37,5,80
ward024,South Zone,Mall District Ward - Vasant Kunj,43000,Delhi,South Delhi,20,3,50
ward025,Central Zone,Government Quarter Ward - Lodhi Road,32000,Delhi,New Delhi,17,2,40
ward026,North Zone,Wholesale Market Ward - Azadpur Mandi,39000,Delhi,North Delhi,26,4,65
ward027,West Zone,Metro Hub Ward - Rajiv Chowk,45000,Delhi,Central Delhi,35,5,80
ward028,East Zone,Residential Complex Ward - Vasundhara,51000,Uttar Pradesh,Ghaziabad,28,4,65
ward029,South Zone,Educational Hub Ward - Hauz Khas,46000,Delhi,South Delhi,32,4,75
ward030,Central Zone,Business District Ward - Connaught Circus,41000,Delhi,New Delhi,30,4,70`;

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