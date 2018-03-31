export const INFO = "INFO", ERROR = "ERROR", SUCCESS = "SUCCESS"
export const FV = "FV", RV = "RV", FG = "FG", RG = "RG"

export default {
  GETTING_STARTED: () => ({
    ID: "GETTING_STARTED",
    type: INFO,
    title: `Welcome to primer designer`,
    additional: "Start by matching the forward primer vector part (top left input)",
    url: "/approaching-primer-design-questions",
  }),
  BLUNT_ENDS_PICKED: (REsiteName) => ({
    ID: "BLUNT_ENDS_PICKED",
    type: ERROR,
    title: `Blunt end RE site (${REsiteName}) chosen`,
    additional: "We dont have DNA ligase, so use hanging ends instead",
    url: "/hanging-ends-vs-blunt-ends",
  }),
  NO_MATCH_FV: () => ({
    ID: "NO_MATCH_FV",
    type: ERROR,
    title: "Forward primer has no matches in vector.",
    adminTitle: "Forward primer doesnt match vector",
    additional: "Choose a restriction site towards the left, and use its 5'-3' sequence on the leading strand.",
    url: "/selecting-forward-primer-vector",
  }),
  NO_MATCH_RV: () => ({
    ID: "NO_MATCH_RV",
    type: ERROR,
    title: "Reverse primer has no matches in vector.",
    adminTitle: "Reverse primer doesnt match vector",
    additional: "Choose a restriction site towards the right, and use its 5'-3' sequence.",
    url: "/selecting-reverse-primer-vector",
  }),
  EXCEED_MATCH_FV: () => ({
    ID: "EXCEED_MATCH_FV",
    type: ERROR,
    title: "Forward primer matches more than one restriction site.",
    adminTitle: "Forward primer matches multiple RE sites",
    url: "/selecting-a-restriction-site",
  }),
  EXCEED_MATCH_RV: () => ({
    ID: "EXCEED_MATCH_RV",
    type: ERROR,
    title: "Reverse primer matches more than one restriction site.",
    adminTitle: "Reverse primer matches multiple RE sites",
    url: "/selecting-a-restriction-site",
  }),
  FV_MATCHES_ONCE: () => ({
    ID: "FV_MATCHES_ONCE",
    type: SUCCESS,
    title: "Forward primer matches just one restriction site.",
    url: "/selecting-forward-primer-vector",
  }),
  RV_MATCHES_ONCE: () => ({
    ID: "RV_MATCHES_ONCE",
    type: SUCCESS,
    title: "Reverse primer matches just one restriction site.",
    url: "/selecting-reverse-primer-vector",
  }),
  FV_MATCHES_WRONG_STRAND: () => ({
    ID: "FV_MATCHES_WRONG_STRAND",
    type: ERROR,
    title: "Forward primer matches a restriction site on the wrong strand",
    additional: "Try using its complement for the vector part (or back-to-front, since its palindromic!). Otherwise the primer would go in the wrong direction away from the MCS.",
    url: "/selecting-forward-primer-vector",
  }),
  RV_MATCHES_WRONG_STRAND: () => ({
    ID: "RV_MATCHES_WRONG_STRAND",
    type: ERROR,
    title: "Reverse primer matches a restriction site on the wrong strand",
    additional: "Try using its complement for the vector part (or back-to-front, since its palindromic!). Otherwise the primer would go in the wrong direction away from the MCS.",
    url: "/selecting-reverse-primer-vector",
  }),
  // FUSION PROTEINS
  FV_BEFORE_START: () => ({
    ID: "FV_BEFORE_START",
    type: ERROR,
    title: "Forward primer RE site is before promoter",
    url: "/fusion-protein-vector-considerations",
  }),
  RV_AFTER_END: () => ({
    ID: "RV_AFTER_END",
    type: ERROR,
    title: "Reverse primer RE is after the C-terminal tag",
    url: "/fusion-protein-vector-considerations",
  }),
  // INDIVIDUAL VECTOR STRAND WINNER
  EACH_VECTOR_PRIMER_MATCHES_ONCE: () => ({
    ID: "EACH_VECTOR_PRIMER_MATCHES_ONCE",
    type: SUCCESS,
    title: "Each primer only matches one restriction site",
    additional: "Now lets work on matching our sequence of interest!"
  }),
  // COMBINED VECTORS - Check if any clashes
  SAME_RESTRICTION_SITES: () => ({
    ID: "SAME_RESTRICTION_SITES",
    type: ERROR,
    title: 'Forward and reverse primers cannot target the same restriction sites.',
    url: "/preventing-vector-conflicts",
  }),
  VECTOR_OVERLAP: () => ({
    ID: "VECTOR_OVERLAP",
    type: ERROR,
    title: "Reverse primer cannot overlap forward primer.",
    url: "/preventing-vector-conflicts",
  }),
  VECTORS_TOO_CLOSE: (num) => ({
    ID: "VECTORS_TOO_CLOSE",
    type: ERROR,
    title: `Primers are too close by ${num} spaces!`,
    url: "/preventing-vector-conflicts",
  }),
  VECTOR_PRIMERS_APART: () => ({
    ID: "VECTOR_PRIMERS_APART",
    type: SUCCESS,
    title: "Vector primers are away from each other.",
    success: true,
    url: "/preventing-vector-conflicts",
  }),
  //VECTOR RE Sites INSIDE HAYSTACK
  HAYSTACK_FORWARD_CONTAINS_FV_SITE: (REsiteName) => ({
    ID: "HAYSTACK_FORWARD_CONTAINS_FV_SITE",
    type: ERROR,
    title: `Haystack forward strand contains the forward primer's restriction site ${REsiteName}`,
    url: "/preventing-sequence-of-interest-conflicts",
  }),
  HAYSTACK_REVERSE_CONTAINS_FV_SITE: (REsiteName) => ({
    ID: "HAYSTACK_REVERSE_CONTAINS_FV_SITE",
    type: ERROR,
    title: `Haystack reverse strand contains the forward primer's restriction site ${REsiteName}`,
    url: "/preventing-sequence-of-interest-conflicts",
  }),
  HAYSTACK_FORWARD_CONTAINS_RV_SITE: (REsiteName) => ({
    ID: "HAYSTACK_FORWARD_CONTAINS_RV_SITE",
    type: ERROR,
    title: `Haystack forward strand contains the reverse primer's restriction site ${REsiteName}`,
    url: "/preventing-sequence-of-interest-conflicts",
  }),
  HAYSTACK_REVERSE_CONTAINS_RV_SITE: (REsiteName) => ({
    ID: "HAYSTACK_REVERSE_CONTAINS_RV_SITE",
    type: ERROR,
    title: `Haystack reverse strand contains the reverse primer's restriction site ${REsiteName}`,
    url: "/preventing-sequence-of-interest-conflicts",
  }),
  //INDIVIDUAL HAYSTACK STRANDS
  FORWARD_TOO_SHORT: () => ({
    ID: "FORWARD_TOO_SHORT",
    type: INFO,
    title: 'Forward primer isnt specific enough for SOI!',
    additional: "Add in a few more matching bases until you have 18",
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  REVERSE_TOO_SHORT: () => ({
    ID: "REVERSE_TOO_SHORT",
    type: INFO,
    title: 'Reverse primer isnt specific enough for SOI!',
    additional: "Add in a few more matching bases until you have 18.",
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  FORWARD_HAYSTACK_MATCH: () => ({
    ID: "FORWARD_HAYSTACK_MATCH",
    type: SUCCESS,
    title: 'Forward anneals to SOI correctly and specifically',
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  REVERSE_HAYSTACK_MATCH: () => ({
    ID: "REVERSE_HAYSTACK_MATCH",
    type: SUCCESS,
    title: 'Reverse anneals to SOI correctly and specifically',
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  //INDIVIDUAL HAYSTACK STRANDS ERROR HANDLING

  FORWARD_WRONG_STRAND: () => ({
    ID: "FORWARD_WRONG_STRAND",
    type: ERROR,
    title: 'Youve picked the wrong strand!',
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  REVERSE_WRONG_STRAND: () => ({
    ID: "REVERSE_WRONG_STRAND",
    type: ERROR,
    title: 'Youve picked the wrong strand!',
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  FORWARD_WRONG_DIRECTION: () => ({
    ID: "FORWARD_WRONG_DIRECTION",
    type: ERROR,
    title: 'Youve done it 3` to 5`, not 5` to 3`!',
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  REVERSE_WRONG_DIRECTION: () => ({
    ID: "REVERSE_WRONG_DIRECTION",
    type: ERROR,
    title: 'Youve done it 3` to 5`, not 5` to 3`!',
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  FORWARD_NO_MATCH: () => ({
    ID: "FORWARD_NO_MATCH",
    type: ERROR,
    title: 'Forward primer doesnt match construct.',
    additional: 'Here is some help below:',
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  REVERSE_NO_MATCH: () => ({
    ID: "REVERSE_NO_MATCH",
    type: ERROR,
    title: 'Reverse primer doesnt match construct.',
    additional: 'Here is some help below:',
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  FORWARD_HAYSTACK_OUT_OF_FRAME: (frame) => ({
    ID: "FORWARD_HAYSTACK_OUT_OF_FRAME",
    type: ERROR,
    title: `You've missed the SOI by ${Math.abs(frame)} to the ${frame > 0 ? 'right' : 'left'}`,
    additional: `Try ${frame > 0 ? 'adding' : 'removing'} a base at the start of your forward primer which matches the construct`,
    url: "/forward-primer-annealing-sequence-of-interest",
  }),
  REVERSE_HAYSTACK_OUT_OF_FRAME: (frame) => ({
    ID: "REVERSE_HAYSTACK_OUT_OF_FRAME",
    type: ERROR,
    title: `You've missed the SOI by ${Math.abs(frame)} to the ${frame > 0 ? 'right' : 'left'}`,
    additional: `Try ${frame > 0 ? 'removing' : 'adding'} a base at the end of the reverse primer's sequence which matches the construct`,
    url: "/reverse-primer-annealing-sequence-of-interest",
  }),
  //VECTOR + HAYSTACK

  FORWARD_BOTH_IN_FRAME: () => ({
    ID: "FORWARD_BOTH_IN_FRAME",
    type: SUCCESS,
    title: 'Forward primer is in frame!',
    url: "/forward-primer-frame",
  }),
  REVERSE_BOTH_IN_FRAME: () => ({
    ID: "REVERSE_BOTH_IN_FRAME",
    type: SUCCESS,
    title: 'Reverse primer is in frame!',
    url: "/reverse-primer-frame",
  }),
  FORWARD_BOTH_OUT_OF_FRAME: (frame) => ({
    ID: "FORWARD_BOTH_OUT_OF_FRAME",
    type: ERROR,
    title: `Forward primer is out of frame by ${Math.abs(frame)}`,
    additional: `At the forward primer sequence, try adding ${frame} base${frame > 1 ? 's' : ''} at the end of the vector part (top right).`,
    url: "/forward-primer-frame",
  }),
  REVERSE_BOTH_OUT_OF_FRAME: (frame) => ({
    ID: "REVERSE_BOTH_OUT_OF_FRAME",
    type: ERROR,
    title: `Reverse primer is out of frame by ${Math.abs(frame)}`,
    additional: `At the reverse primer sequence, try adding ${frame} base${frame > 1 ? 's' : ''} at the end of the vector part (bottom right).`,
    url: "/reverse-primer-frame",
  }),
  //CONDITIONAL
  FORWARD_INCLUDES_START_CODON: () => ({
    ID: "FORWARD_INCLUDES_START_CODON",
    type: SUCCESS,
    title: 'Construct contains a start codon as necessary.',
    url: "/start-codons-when-and-how",
  }),
  REVERSE_INCLUDES_STOP_CODON: () => ({
    ID: "REVERSE_INCLUDES_STOP_CODON",
    type: SUCCESS,
    title: 'Construct contains a stop codon as necessary.',
    url: "/stop-codons-when-and-how",
  }),
  FORWARD_MISSING_START_CODON: () => ({
    ID: "FORWARD_MISSING_START_CODON",
    type: ERROR,
    title: 'Your construct requires a start codon.',
    url: "/start-codons-when-and-how",
  }),
  REVERSE_MISSING_STOP_CODON: () => ({
    ID: "REVERSE_MISSING_STOP_CODON",
    type: ERROR,
    title: 'Your construct requires a stop codon.',
    url: "/stop-codons-when-and-how",
  }),
  FORWARD_INCLUDES_UNECESSARY_START_CODON: () => ({
    ID: "FORWARD_INCLUDES_UNECESSARY_START_CODON",
    type: ERROR,
    title: 'Construct contains an unecessary start codon.',
    url: "/start-codons-when-and-how",
  }),
  REVERSE_INCLUDES_UNECESSARY_STOP_CODON: () => ({
    ID: "REVERSE_INCLUDES_UNECESSARY_STOP_CODON",
    type: ERROR,
    title: 'Construct contains an unecessary stop codon.',
    url: "/stop-codons-when-and-how",
  }),
  FORWARD_START_CODON_OUT_OF_FRAME: (frame) => ({
    ID: "FORWARD_START_CODON_OUT_OF_FRAME",
    type: ERROR,
    title: `Your start codon is out of frame by ${frame} base${frame > 1 ? 's' : ''}!`,
    url: "/start-codons-when-and-how",
  }),
  REVERSE_STOP_CODON_OUT_OF_FRAME: (frame) => ({
    ID: "REVERSE_STOP_CODON_OUT_OF_FRAME",
    type: ERROR,
    title: `Your stop codon is out of frame by ${frame} base${frame > 1 ? 's' : ''}!`,
    url: "/stop-codons-when-and-how",
  }),
  FORGOT_5_PRIME_CAP: () => ({
    ID: "FORGOT_5_PRIME_CAP",
    type: ERROR,
    title: 'You need to now add a 5` cap to both primers',
    additional: "A 5` cap is 3/4 bases upstream of the RE site and promotes efficient cutting.",
    url: "/5-prime-cap",
  }),
  ADDED_5_PRIME_CAP: () => ({
    ID: "ADDED_5_PRIME_CAP",
    type: SUCCESS,
    title: '5` cap added to both primers',
    additional: "A 5` cap promotes efficient cutting.",
    url: "/5-prime-cap",
  }),
  TOTAL_LENGTH_INCORRECT: (totalLength) => ({
    ID: "TOTAL_LENGTH_INCORRECT",
    type: ERROR,
    title: ``
  }),
  MELTING_TEMPERATURE_INCORRECT: (temp) => ({
    ID: "MELTING_TEMPERATURE_INCORRECT",
    type: ERROR,
    title: `Your melting temperature is too `
  }),
  //WINNER
  READY: () => ({
    ID: "READY",
    type: SUCCESS,
    title: 'All primers look ready! Hooray!'
  })
}