import * as actions from '../actions/troubleshooter'


export const messageIDsToDetails = {
  // INDIVIDUAL VECTOR STRAND MATCHING 
  "GETTING_STARTED": () => ({
    title: "Welcome to primer designer",
    additional: "Start by matching the forward primer vector part (top left input)",
    neutral: true,
    url: "/approaching-primer-design-questions",
  }),
  "BLUNT_ENDS_PICKED": () => ({
    title: "Blunt end RE site chosen",
    additional: "We dont have DNA ligase, so use hanging ends instead",
    url: "/hanging-ends-vs-blunt-ends",
  }),
  "NO_MATCH_FV": () => ({
    title: "Forward primer has no matches in vector.",
    adminTitle: "Forward primer doesnt match vector",
    additional: "Choose a restriction site towards the left, and use its 5'-3' sequence on the leading strand.",
    url: "/selecting-forward-primer-vector",
    actions: [actions.troubleshootFV]
  }),
  "NO_MATCH_RV": () => ({
    title: "Reverse primer has no matches in vector.",
    adminTitle: "Reverse primer doesnt match vector",
    additional: "Choose a restriction site towards the right, and use its 5'-3' sequence.",
    url: "/selecting-reverse-primer-vector",
  }),
  "EXCEED_MATCH_FV": () => ({
    title: "Forward primer matches more than one restriction site.",
    adminTitle: "Reverse primer no match",
    actions: [actions.troubleshootFV],
    url: "/selecting-a-restriction-site",
  }),
  "EXCEED_MATCH_RV": () => ({
    title: "Reverse primer matches more than one restriction site.",
    actions: [actions.troubleshootRV],
    url: "/selecting-a-restriction-site",
  }),
  "FV_MATCHES_ONCE": () => ({
    title: "Forward primer matches just one restriction site.",
    url: "/selecting-forward-primer-vector",
  }),
  "RV_MATCHES_ONCE": () => ({
    title: "Reverse primer matches just one restriction site.",
    url: "/selecting-reverse-primer-vector",
  }),
  // INDIVIDUAL VECTOR STRAND MATCHING - ERROR HANDLING
  "FV_MATCHES_WRONG_STRAND": () => ({
    title: "Forward primer matches a restriction site on the wrong strand",
    additional: "Try using its complement for the vector part (or back-to-front, since its palindromic!). Otherwise the primer would go in the wrong direction away from the MCS.",
    url: "/selecting-forward-primer-vector",
  }),
  "RV_MATCHES_WRONG_STRAND": () => ({
    title: "Reverse primer matches a restriction site on the wrong strand",
    additional: "Try using its complement for the vector part (or back-to-front, since its palindromic!). Otherwise the primer would go in the wrong direction away from the MCS.",
    url: "/selecting-reverse-primer-vector",
  }),
  // FUSION PROTEINS
  "FV_BEFORE_START": () => ({
    title: "Forward primer RE site is before promoter",
    url: "/fusion-protein-vector-considerations",
  }),
  "RV_AFTER_END": () => ({
    title: "Reverse primer RE is after the C-terminal tag",
    url: "/fusion-protein-vector-considerations",
  }),
  // INDIVIDUAL VECTOR STRAND WINNER
  "EACH_VECTOR_PRIMER_MATCHES_ONCE": () => ({
    title: "Each primer only matches one restriction site",
    additional: "Now lets work on matching our sequence of interest!"
  }),
  // COMBINED VECTORS - Check if any clashes
  "SAME_RESTRICTION_SITES": () => ({
    title: 'Forward and reverse primers cannot target the same restriction sites.',
    url: "/preventing-vector-conflicts",
  }),
  "VECTOR_OVERLAP": () => ({
    title: "Reverse primer cannot overlap forward primer.",
    actions: [actions.troubleshootFV, actions.troubleshootRV],
    url: "/preventing-vector-conflicts",
  }),
  "VECTORS_TOO_CLOSE": (num) => ({
    title: `Primers are too close by ${num} spaces!`,
    actions: [actions.troubleshootFV, actions.troubleshootRV],
    url: "/preventing-vector-conflicts",
  }),
  "VECTOR_PRIMERS_APART": () => ({
    title: "Vector primers are away from each other.",
    url: "/preventing-vector-conflicts",    
  }),
  // VECTOR RE Sites INSIDE HAYSTACK
  "HAYSTACK_FORWARD_CONTAINS_FV_SITE": () => ({
    title: "Haystack forward strand contains the forward primer's restriction site",
    url: "/preventing-sequence-of-interest-conflicts",
  }),
  "HAYSTACK_REVERSE_CONTAINS_FV_SITE": () => ({
    title: "Haystack reverse strand contains the forward primer's restriction site",
    url: "/preventing-sequence-of-interest-conflicts",
  }),
  "HAYSTACK_FORWARD_CONTAINS_RV_SITE": () => ({
    title: "Haystack forward strand contains the reverse primer's restriction site",
    url: "/preventing-sequence-of-interest-conflicts",
  }),
  "HAYSTACK_REVERSE_CONTAINS_RV_SITE": () => ({
    title: "Haystack reverse strand contains the reverse primer's restriction site",
    url: "/preventing-sequence-of-interest-conflicts",
  }),
  // INDIVIDUAL HAYSTACK STRANDS
  "FORWARD_TOO_SHORT": () => ({
    title: 'Forward primer isnt specific enough for SOI!',
    additional: "Add in a few more matching bases until you have 18",
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  "REVERSE_TOO_SHORT": () => ({
    title: 'Reverse primer isnt specific enough for SOI!',
    additional: "Add in a few more matching bases until you have 18.",
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  "FORWARD_HAYSTACK_MATCH": () => ({
    title: 'Forward anneals to SOI correctly and specifically',
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  "REVERSE_HAYSTACK_MATCH": () => ({
    title: 'Reverse anneals to SOI correctly and specifically',
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  // INDIVIDUAL HAYSTACK STRANDS ERROR HANDLING
  "FORWARD_WRONG_STRAND": () => ({
    title: 'Youve picked the wrong strand!',
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  "REVERSE_WRONG_STRAND": () => ({
    title: 'Youve picked the wrong strand!',
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  "FORWARD_WRONG_DIRECTION": () => ({
    title: 'Youve done it 3` to 5`, not 5` to 3`!',
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  "REVERSE_WRONG_DIRECTION": () => ({
    title: 'Youve done it 3` to 5`, not 5` to 3`!',
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  "FORWARD_NO_MATCH": () => ({
    title: 'Forward primer doesnt match construct.',
    additional: 'Here is some help below:',
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  "REVERSE_NO_MATCH": () => ({
    title: 'Reverse primer doesnt match construct.',
    additional: 'Here is some help below:',
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  "FORWARD_HAYSTACK_OUT_OF_FRAME": ({ frame }) => ({
    title: `You've missed the SOI by ${Math.abs(frame)} to the ${frame > 0 ? 'right': 'left'}`,
    additional: `Try ${frame > 0 ? 'adding' : 'removing'} a base at the start of your primer which matches the construct`,
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  "REVERSE_HAYSTACK_OUT_OF_FRAME": ({ frame }) => ({
    title: `You've missed the SOI by ${Math.abs(frame)} to the ${frame > 0 ? 'right' : 'left'}`,
    additional: `Try ${frame > 0 ? 'removing' : 'adding'} a base at the end of the reverse primer's sequence which matches the construct`,
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  // VECTOR + HAYSTACK
  "FORWARD_BOTH_IN_FRAME": () => ({
    title: 'Forward primer is in frame!',
    url: "/forward-primer-frame",
  }),
  "REVERSE_BOTH_IN_FRAME": () => ({
    title: 'Reverse primer is in frame!',
    url: "/reverse-primer-frame",
  }),
  "FORWARD_BOTH_OUT_OF_FRAME": (frame) => ({
    title: `Forward primer is out of frame by ${Math.abs(frame)}`,
    additional: `At the forward primer sequence, try adding ${frame} base${frame > 1 ? 's' : ''} at the end of the vector part (top right).`,
    url: "/forward-primer-frame",
  }),
  "REVERSE_BOTH_OUT_OF_FRAME": (frame) => ({
    title: `Reverse primer is out of frame by ${Math.abs(frame)}`,
    additional: `At the reverse primer sequence, try adding ${frame} base${frame > 1 ? 's' : ''} at the end of the vector part (bottom right).`,
    actions: [actions.troubleshootRV],
    url: "/reverse-primer-frame",
  }),
  // CONDITIONAL
  "FORWARD_INCLUDES_START_CODON": () => ({
    title: 'Construct contains a start codon as necessary.',
    url: "/start-codons-when-and-how",
  }),
  "REVERSE_INCLUDES_STOP_CODON": () => ({
    title: 'Construct contains a stop codon as necessary.',
    url: "/stop-codons-when-and-how",
  }),
  "FORWARD_MISSING_START_CODON": () => ({
    title: 'Your construct requires a start codon.',
    url: "/start-codons-when-and-how",
  }),
  "REVERSE_MISSING_STOP_CODON": () => ({
    title: 'Your construct requires a stop codon.',
    url: "/stop-codons-when-and-how",
  }),
  "FORWARD_INCLUDES_UNECESSARY_START_CODON": () => ({
    title: 'Construct contains an unecessary start codon.',
    url: "/start-codons-when-and-how",
  }),
  "REVERSE_INCLUDES_UNECESSARY_STOP_CODON": () => ({
    title: 'Construct contains an unecessary stop codon.',
    url: "/stop-codons-when-and-how",
  }),
  "FORWARD_START_CODON_OUT_OF_FRAME": ({ frame }) => ({
    title: `Your start codon is out of frame by ${frame} base${frame > 1 ? 's' : ''}!`,
    url: "/start-codons-when-and-how",
  }),
  "REVERSE_STOP_CODON_OUT_OF_FRAME": ({ frame }) => ({
    title: `Your stop codon is out of frame by ${frame} base${frame > 1 ? 's' : ''}!`,
    url: "/stop-codons-when-and-how",
  }),
  "FORGOT_5_PRIME_CAP": () => ({
    title: 'You need to now add a 5` cap to both primers',
    additional: "A 5` cap is 3/4 bases upstream of the RE site and promotes efficient cutting.",
    url: "/5-prime-cap",
  }),
  "5_PRIME_CAP_ADDED": () => ({
    title: '5` cap added to both primers',
    additional: "A 5` cap promotes efficient cutting.",
    url: "/5-prime-cap",
  }),
  // "FORGOT_GC_CLAMP": () => ({
  //   title: ""
  // }),
  "TOTAL_LENGTH_INCORRECT": ({ totalLength }) => ({
    title: ``
  }),
  "MELTING_TEMPERATURE_INCORRECT": ({ temp }) => ({
    title: `Your melting temperature is too `
  }),
  // WINNER
  "READY": () => ({
    title: 'All primers look ready! Hooray!'
  })
}