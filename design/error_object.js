export default {
  "excercise_id": 123456789,
  "success": false,
  "forward_plasmid": {
    "attempt": "AAAAAAAA",
    "success": true,
    "evaluation": { // Error messages show up in this exact order
      "strand_error": null, // true, using wrong strand
      "direction_error": null, // true, using wrong direction
      "in_frame_error": null, // -n is n to the left. +n is n to the right
      "length_error": null, // -1 too short. +1 too long
      "gc_content_error": null, // -1 too few GC content. +1 too high GC content
    }
  },
  "reverse_plasmid": {
    "attempt": "TTTTTTTT",
    "success": false,
    "evaluation": {

    }
  },
  "forward_haystack": {
    "attempt": "GGGGGGGGGG",
    "success": true,
    "evaulation": {

    }
  },
  "reverse_haystack": {
    "attempt": "CCCCCCCCCC",
    "success": true,
    "evaluation": {
      
    }
  }
}