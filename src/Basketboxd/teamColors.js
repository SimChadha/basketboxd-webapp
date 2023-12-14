function teamColors(team) {
    switch (team) {
        case "ATL":
          return {background: '#C8102E', text: '#FFFFFF', logo: team+'.svg'}
        case "BOS":
          return {background: '#007A33', text: '#FFFFFF', logo: team+'.svg'};
        case "BRK":
          return {background: '#000000', text: '#FFFFFF', logo: team+'.svg'};
        case "CHO":
        case "NOH":
        case "NOK":
          return {background: '#00788C', text: '#1d1160', logo: 'CHO.svg'};
        case "CHI":
          return {background: '#CE1141', text: '#000000', logo: team+'.svg'};
        case "CLE":
          return {background: '#860038', text: '#FDBB30', logo: team+'.svg'};
        case "DAL":
          return {background: '#00538C', text: '#B8C4CA', logo: team+'.svg'};
        case "DEN":
          return {background: '#0E2240', text: '#FEC524', logo: team+'.svg'};
        case "DET":
          return {background: '#C8102E', text: '#1d42ba', logo: team+'.svg'};
        case "GSW":
          return {background: '#1D428A', text: '#ffc72c', logo: team+'.svg'};
        case "HOU":
          return {background: '#000000', text: '#CE1141', logo: team+'.svg'};
        case "IND":
          return {background: '#002D62', text: '#FDBB30', logo: team+'.svg'};
        case "LAC":
          return {background: '#c8102E', text: '#1d428a', logo: team+'.svg'};
        case "LAL":
          return {background: '#552583', text: '#FDB927', logo: team+'.svg'};
        case "MEM":
          return {background: '#5D76A9', text: '#12173F', logo: team+'.svg'};
        case "MIA":
          return {background: '#98002E', text: '#000000', logo: team+'.svg'};
        case "MIL":
          return {background: '#00471B', text: '#EEE1C6', logo: team+'.svg'};
        case "MIN":
          return {background: '#236192', text: '#0C2340', logo: team+'.svg'};
        case "NOP":
          return {background: '#0C2340', text: '#85714D', logo: team+'.svg'};
        case "NYK":
          return {background: '#006BB6', text: '#F58426', logo: team+'.svg'};
        case "OKC":
          return {background: '#0169a6', text: '#ef3b24', logo: team+'.svg'};
        case "ORL":
          return {background: '#C4ced4', text: '#0077c0', logo: team+'.svg'};
        case "PHI":
          return {background: '#006bb6', text: '#ed174c', logo: team+'.svg'};
        case "PHO":
          return {background: '#1d1160', text: '#e56020', logo: team+'.svg'};
        case "POR":
          return {background: '#E03A3E', text: '#000000', logo: team+'.svg'};
        case "SAC":
          return {background: '#5a2d81', text: '#FFFFFF', logo: team+'.svg'};
        case "SAS":
          return {background: '#c4ced4', text: '#000000', logo: team+'.svg'};
        case "SEA":
          return {background: '#00653A', text: '#FFC200', logo: team+'.svg'}
        case "TOR":
          return {background: '#ce1141', text: '#000000', logo: team+'.svg'};
        case "UTA":
          return {background: '#002B5C', text: '#F9A01B', logo: team+'.svg'};
        case "WAS":
          return {background: '#002B5C', text: '#e31837', logo: team+'.svg'};
        default:
          return "Unknown Team";
      }
}
export default teamColors