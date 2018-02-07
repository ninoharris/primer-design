import { connect } from 'react-redux'
import { getBothHaystackStrands, getUFG, getURG, getHaystackForwardRestrictionSites, getHaystackReverseRestrictionSites } from '../../selectors'

import Haystack from './Haystack'

const mapStateToProps = (state) => {
  const props = {
    ...getBothHaystackStrands(state),
    FG: getUFG(state),
    RG: getURG(state),
    restrictionSites: { ...getHaystackForwardRestrictionSites(state), ...getHaystackReverseRestrictionSites(state) }
  }
  return props
}



export default connect(mapStateToProps)(Haystack)