export const messageIDsToDetails = {
  "NO_MATCH_FV": {
    title: "Forward primer has no matches in vector.",
    additional: "Choose a restriction site towards the left, and use its 5'-3' sequence on the leading strand.",
    url: "/"
  },
  "NO_MATCH_RV": {
    title: "Reverse primer has no matches in vector.",
    additional: "Choose a restriction site towards the right, and use its 5'-3' sequence.",
    url: "/",
  },
  "EXCEED_MATCH_FV": {
    title: "Forward primer matches more than one restriction site.",
  },
  "EXCEED_MATCH_RV": {
    title: "Reverse primer matches more than one restriction site.",
  },
  "EACH_VECTOR_PRIMER_MATCHES_ONCE": {
    title: "Each primer only matches one restriction site",
  },
  "VECTOR_OVERLAP": {
    title: "Reverse primer cannot overlap forward primer.",
  },
  "VECTORS_TOO_CLOSE": {
    title: "Primers are too close",
  },
  "VECTOR_PRIMERS_APART": {
    title: "Vector primers are away from each other.",
  },
  "FORWARD_HAYSTACK_MATCH": {},
  "REVERSE_HAYSTACK_MATCH": {},
}