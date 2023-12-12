function teamColors(team) {
    switch (team) {
        case "ATL":
          return {background: '#C8102E', text: '#FFFFFF'}
        case "BOS":
          return {background: '#007A33', text: '#FFFFFF'};
        case "BRK":
          return {background: '#000000', text: '#FFFFFF'};
        case "CHO":
        case "NOH":
        case "NOK":
          return {background: '#00788C', text: '#1d1160'};
        case "CHI":
          return {background: '#CE1141', text: '#000000'};
        case "CLE":
          return {background: '#860038', text: '#FDBB30'};
        case "DAL":
          return {background: '#00538C', text: '#B8C4CA'};
        case "DEN":
          return {background: '#0E2240', text: '#FEC524'};
        case "DET":
          return {background: '#C8102E', text: '#1d42ba'};
        case "GSW":
          return {background: '#1D428A', text: '#ffc72c'};
        case "HOU":
          return {background: '#CE1141', text: '#000000'};
        case "IND":
          return {background: '#002D62', text: '#FDBB30'};
        case "LAC":
          return {background: '#c8102E', text: '#1d428a'};
        case "LAL":
          return {background: '#552583', text: '#FDB927'};
        case "MEM":
          return {background: '#5D76A9', text: '#12173F'};
        case "MIA":
          return {background: '#98002E', text: '#000000'};
        case "MIL":
          return {background: '#00471B', text: '#EEE1C6'};
        case "MIN":
          return {background: '#236192', text: '#0C2340'};
        case "NOP":
          return {background: '#0C2340', text: '#85714D'};
        case "NYK":
          return {background: '#006BB6', text: '#F58426'};
        case "OKC":
          return {background: '#007ac1', text: '#ef3b24'};
        case "ORL":
          return {background: '#C4ced4', text: '#0077c0'};
        case "PHI":
          return {background: '#006bb6', text: '#ed174c'};
        case "PHO":
          return {background: '#1d1160', text: '#e56020'};
        case "POR":
          return {background: '#E03A3E', text: '#000000'};
        case "SAC":
          return {background: '#5a2d81', text: '#63727A'};
        case "SAS":
          return {background: '#c4ced4', text: '#000000'};
        case "SEA":
          return {background: '#00653A', text: '#FFC200'}
        case "TOR":
          return {background: '#ce1141', text: '#000000'};
        case "UTA":
          return {background: '#002B5C', text: '#F9A01B'};
        case "WAS":
          return {background: '#002B5C', text: '#e31837'};
        default:
          return "Unknown Team";
      }
}
export default teamColors