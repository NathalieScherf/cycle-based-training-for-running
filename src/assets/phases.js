const MENS_PHASE = 'Menstrual Phase'
const FOL_PHASE = 'Follicular Phase'
const OV_PHASE = 'Ovulation Phase'
const SHIT_PHASE = 'shit phase'

export {MENS_PHASE, FOL_PHASE, OV_PHASE, SHIT_PHASE}

export const getPhaseColor = (phaseName) => {
  switch (phaseName) {
    case MENS_PHASE:
      return '#FFB6C1'; // Light pink
    case FOL_PHASE:
      return '#98FB98'; // Pale green
    case OV_PHASE:
      return '#87CEFA'; // Light blue
    case SHIT_PHASE:
      return '#ffa600'; // Orange
    default:
      return '#D3D3D3'; // Light gray for unknown phases
  }
};


export const getPhaseTraining = (phaseName) => {
  switch (phaseName) {
    case MENS_PHASE:
      return 'light and coordination'; // Light pink
    case FOL_PHASE:
      return 'power and speed'; // Pale green
    case OV_PHASE:
      return 'ausdauer'; // Gold
    case SHIT_PHASE:
      return 'moderat ausdauer'; // Light blue
    default:
      return '#D3D3D3'; // Light gray for unknown phases
  }
};