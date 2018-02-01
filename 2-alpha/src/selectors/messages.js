import * as actions from '../actions/troubleshooter'


export const messageIDsToDetails = {
  "NO_MATCH_FV": () => ({
    title: "Forward primer has no matches in vector.",
    additional: "Choose a restriction site towards the left, and use its 5'-3' sequence on the leading strand.",
    url: "/",
    actions: [actions.troubleshootFV]
  }),
  "NO_MATCH_RV": () => ({
    title: "Reverse primer has no matches in vector.",
    additional: "Choose a restriction site towards the right, and use its 5'-3' sequence.",
    url: "/",
  }),
  "EXCEED_MATCH_FV": () => ({
    title: "Forward primer matches more than one restriction site.",
    actions: [actions.troubleshootFV],
  }),
  "EXCEED_MATCH_RV": () => ({
    title: "Reverse primer matches more than one restriction site.",
    actions: [actions.troubleshootRV]
  }),
  "FV_MATCHES_ONCE": () => ({
    title: "Forward primer matches just one restriction site."
  }),
  "RV_MATCHES_ONCE": () => ({
    title: "Reverse primer matches just one restriction site."
  }),
  "EACH_VECTOR_PRIMER_MATCHES_ONCE": () => ({
    title: "Each primer only matches one restriction site",
  }),
  "VECTOR_OVERLAP": () => ({
    title: "Reverse primer cannot overlap forward primer.",
    actions: [actions.troubleshootFV, actions.troubleshootRV]
  }),
  "VECTORS_TOO_CLOSE": (num) => ({
    title: `Primers are too close by ${num} spaces!`,
    actions: [actions.troubleshootFV, actions.troubleshootRV]
  }),
  "VECTOR_PRIMERS_APART": () => ({
    title: "Vector primers are away from each other.",
  }),
  "FORWARD_HAYSTACK_MATCH": () => ({
    title: 'Forward matches haystack',
  }),
  "FORWARD_TOO_SHORT": () => ({
    title: 'Forward haystack is too short!'
  }),
  "FORWARD_WRONG_STRAND": () => ({
    title: 'Youve picked the wrong strand!'
  }),
  "FORWARD_WRONG_DIRECTION": () => ({
    title: 'Youve done it 3` to 5`, not 5` to 3`!'
  }),
  "FORWARD_NO_MATCH": () => ({
    title: 'Forward primer doesnt match construct.',
    additional: 'Here is some help below:'
  }),
  "FORWARD_HAYSTACK_OUT_OF_FRAME": (frame) => ({
    title: `Out of frame by ${Math.abs(frame)} to the ${frame > 0 ? 'right': 'left'}`,
    additional: `Try ${frame > 0 ? 'adding' : 'removing'} a base at the start of your primer which matches the construct`
  }),
  "FORWARD_BOTH_IN_FRAME": () => ({
    title: 'Forward primer is in frame!',
  }),
  "FORWARD_BOTH_OUT_OF_FRAME": (frame) => ({
    title: `Forward primer is out of frame by ${Math.abs(frame)}`,
    additional: `At the forward primer sequence, try adding ${frame} base${frame > 1 ? 's':''} at the end of the vector part.`
  }),
  "FORWARD_INCLUDES_START_CODON": () => ({
    title: 'Construct contains a start codon as necessary.'
  }),
  "FORWARD_MISSING_START_CODON": () => ({
    title: 'Your construct requires a start codon.'
  }),
  "FORWARD_START_CODON_OUT_OF_FRAME": (frame) => ({
    title: `Your start codon is out of frame by ${frame} base${frame > 1 ? 's' : ''}!`
  }),
  "REVERSE_TOO_SHORT": () => ({
    title: 'Reverse haystack is too short!'
  }),
  "REVERSE_HAYSTACK_MATCH": () => ({
    title: 'Reverse matches haystack',
  }),
  "REVERSE_WRONG_STRAND": () => ({
    title: 'Youve picked the wrong strand!'
  }),
  "REVERSE_WRONG_DIRECTION": () => ({
    title: 'Youve done it 3` to 5`, not 5` to 3`!'
  }),
  "REVERSE_NO_MATCH": () => ({
    title: 'Reverse primer doesnt match construct.',
    additional: 'Here is some help below:'
  }),
  "REVERSE_HAYSTACK_OUT_OF_FRAME": (frame) => ({
    title: `Out of frame by ${Math.abs(frame)} to the ${frame > 0 ? 'right' : 'left'}`,
    additional: `Try ${frame > 0 ? 'removing' : 'adding'} a base at the end of the reverse primer's sequence which matches the construct`,
  }),
  "REVERSE_BOTH_IN_FRAME": () => ({
    title: 'Reverse primer is in frame!',
  }),
  "REVERSE_BOTH_OUT_OF_FRAME": (frame) => ({
    title: `Reverse primer is out of frame by ${Math.abs(frame)}`,
    additional: `At the reverse primer sequence, try adding ${frame} base${frame > 1 ? 's' : ''} at the end of the vector part.`,
    actions: [actions.troubleshootRV],
  }),
  "REVERSE_INCLUDES_STOP_CODON": () => ({
    title: 'Construct contains a stop codon as necessary.'
  }),
  "REVERSE_MISSING_STOP_CODON": () => ({
    title: 'Your construct requires a stop codon.'
  }),
  "REVERSE_STOP_CODON_OUT_OF_FRAME": (frame) => ({
    title: `Your stop codon is out of frame by ${frame} base${frame > 1 ? 's' : ''}!`
  }),
  "READY": () => ({
    title: 'All primers look ready! Hooray!'
  })
}