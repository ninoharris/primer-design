import messages, { INFO, SUCCESS, ERROR, FV, FG, RV, RG } from './evaluator-messages'

export const evaluator = (...evaluators) => {
  
  // evaluators can be built from other evaluators, combining their messages and inputs
  // this is for reselect to cache different evaluators, each dependent on the changes
  // of their relevant inputs. This way they don't update upon irrelevant changes.
  const messages = evaluators.reduce((prevMessages, currEvaluator) => {
    return [...prevMessages, ...currEvaluator.getMessages()]
  }, [])

  let inputs = evaluators.reduce((prevInputs, currEvaluator) => {
    return { ...prevInputs, ...currEvaluator.getInputs()}
  }, {})

  const addInputs = (inputsObj) => inputs = {...inputs, ...inputsObj}
  const getInputs = () => inputs

  let anyErrors = false
  const hasError = () => anyErrors
  const signalError = () => anyErrors = true

  // TODO: add most recently updated input feature
  // const mostRecentInput = null
  // const getMostRecentErrorInput = () => mostRecentInput

  const getMessages = () => messages
  const getErrorMessages = () => messages.filter(m => m.type === ERROR)
  const getInfoMessages = () => messages.filter(m => m.type === INFO)
  const getSuccessMessages = () => messages.filter(m => m.type === SUCCESS)

  const contains = (searchID) => messages.find(msg => msg.ID === searchID)
  const doesntContain = searchID => !contains(searchID)
  
  const add = (message) => {
    messages.push(message)
    if(message.type === ERROR) {
      signalError()
    }
  }

  return {
    getMessages,
    getInputs,
    getErrorMessages,
    getInfoMessages,
    getSuccessMessages,
    hasError,
    add,
    addInputs,
    contains,
    doesntContain,
  }
}

export default evaluator