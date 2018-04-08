import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {  } from '../../components/Button'

const Container = styled.div`
 display: flex;
`
// /*reference */
// submitButton = () => {
//   if (this.props.phase1Ready) {
//     if (this.props.exerciseComplete) {
//       return (
//         <button type="submit" className="btn btn-primary mr-3">
//           Submit answer!
//         </button>
//       )
//     } else {
//       return (
//         <button type="submit" className="btn btn-primary mr-3">
//           Check final considerations
//         </button>
//       )
//     }
//   }
//   return (
//     <button type="submit" disabled className="btn btn-primary mr-3">
//       Not there yet, keep trying!
//       </button>
//   )
// }


export class SubmitExercise extends Component {
 render() {
   return (
     <Container>
     </Container>
   )
 }
}

const mapStateToProps = (state) => {
}
const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitExercise)

// /* reference */
// const mapStateToProps = (state) => {
//   const { formInputs, animatingPreview } = state
//   return {
//     phase1Ready: getPhase1Ready(state),
//     exerciseComplete: getExerciseComplete(state),
//     FV: formInputs.FV,
//     FG: formInputs.FG,
//     RV: formInputs.RV,
//     RG: formInputs.RG,
//     animatingPreview,
//     FV_TS: FV_TS(state),
//   }
// }

// export default connect(mapStateToProps, {
//   updateInput,
//   beginAnimatePreview,
//   endAnimatePreview,
//   attemptExercise,
//   editingGameInput,

// })(Form)