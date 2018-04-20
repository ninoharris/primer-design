import React from 'react'

export default {
  "welcome": {
    title: "Get started",
    content: (
      <div>
        
      </div>
    )
  },
  "what-is-pcr": {
    title: "What is PCR",
    content: (
      <div>
        We have two primers which anneal to a target sequence. Polymerase can then attach to the double stranded (annealed) regions and extend the primer sequence in the 5’ to 3’ direction. This means for the forward primer we are moving towards the end (direction right) of the sequence along the leading strand. For the reverse primer we are moving from the end of the sequence to be cloned towards the start of the leading sequence (direction left). However, the polymerase moves along the complementary strand. This means for the reverse primer, the polymerase is moving 3’ to 5’ according to the coding strand but 5’ to 3’ for the  complementary strand. This uses free dNTPs.
      </div>
    )
  },
  "what-is-plasmid-cloning": {
    title: "What is PCR plasmid cloning",
    content: (
      <div>
        <p>The theory of PCR cloning builds upon the ideas behind PCR. In addition to matching our gene of interest, we also at the same time add restriction sites to the ends of the PCR product so that it can be easily cloned into a plasmid of interest.</p>
        <p>We add these restriction sites to the 5’ ends of each primer. That means the restriction site on the coding strand will be upstream of the gene. Whilst the restriction site on the complementary strand will be downstream of the gene.</p>
        <p>By having matching restriction sites between the vector and gene, annealing of hanging ends results in the gene being inserted into the vector.</p>
      </div>
    )
  },
  "approaching-primer-design-questions": {
    title: "Approaching primer design questions",
    content: (
      <div>
        <p>If you haven’t yet read “What is PCR” and “What is PCR cloning”, do so before moving onto the exercises. It’s always best to do the forward primer first, as its easiest, then our reverse primer.</p>
        <p>Splitting our primers up into two parts makes it easier for us to understand what each part does. Underneath each pair of inputs for a single primer, you will be shown a preview of the combined sequence. The segments are coloured slightly differently too so you can check your inputs against the exercise.</p>
        <ul>
          <li>A way to think about our primers is that the 5’ end of each primer is on the ‘outside’ of the gene, whilst the 3’ ends match the gene itself.</li>
          <li>Our 5’ segment always matches the vector, for both forward and reverse primers. Use this part to pick restriction sites and to add 5’ Caps and add bases to get the haystack in frame.</li>
          <li>Our 3’ segment matches the GOI only. </li>
          <li>For the forward primer this exactly matches the first 18-24 bases of the coding strand in the 5’ to 3’ direction.</li>
          <li>For the reverse primer, we want it to match exactly the last 18-24 bases of the complementary strand (as we’re moving leftwards).</li>
          <li>We present both primers in the 5’ to 3’ direction. This is already the case for the Forward Primer, but for the Reverse Primer we must reverse our 3’ to 5’ sequence to get a 5’ to 3’ sequence. </li>
        </ul>
      </div>
    )
  },
  "selecting-a-restriction-site": {
    title: "Selecting a restriction site",
    content: (
      <div>
        For both forward and reverse primers, pick a restriction site that is unique in the vector. If a restriction site is contained multiple times, then you will have different copies of your sequence of interest after PCR. Only pick site which result in hanging ends. These are restriction sites where after cutting at different base positions results in ends that can anneal together.
      </div>
    )
  },
  "selecting-forward-primer-vector": {
    title: "Forward primer: matching the vector",
    content: (
      <div>
        <p>Looking at the first half of our forward primer (the side with 5’), we need to include a restriction site that is contained within the vector. This must follow a few simple rules. </p>
        <ul>
          <li>The first being that the restriction site must be contained in, and unique to the vector.</li>
          <li>It cannot be inside our gene of interest that we wish to clone. </li>
          <li>It must also not appear more than once. </li>
          <li>It will also be after our promoter and before another unique restriction site that will be later used for our reverse primer.</li>
        </ul>
        <p>But which strand of our restriction site should we include in our primer? For our forward primer we choose the strand that runs in the same direction of our gene: the top 5’ to 3’ strand.</p>
      </div>
    )
  },
  "hanging-ends-vs-blunt-ends": {
    title: "Hanging ends vs blunt ends",
    content: (
      <div>
        <p>In these exercises, you should always use restriction enzymes that will produce hanging ends rather than blunt ends. Blunt ends do not anneal complementary strands, instead being ligated by DNA ligase. This lack of complementarity means the direction of the inserted gene cannot be ensured.</p>
      </div>
    )
  },
  "selecting-reverse-primer-vector": {
    title: "Reverse primer: matching the vector",
    content: (
      <div>
        <p>We follow similar rules for our forward primer. </p>
        <ul>
          <li>Our restriction site must be after the restriction site of the forward primer.</li>
          <li>The restriction site must be read 5’ to 3’ on the complementary strand (outwards to inwards remember!). Thankfully, since restriction sites are palindromic we can just copy the 5’ to 3’ direction of either strand.</li>
        </ul>
      </div>
    )
  },
  "preventing-vector-conflicts": {
    title: "Preventing restriction site conflicts within the vector",
    content: (
      <div>
        <p>To ensure that the gene is correctly inserted, we must ensure that our two chosen restriction sites do not conflict. But how do we ensure this? </p>
        <p>We first check that both restriction sites are not the same. If we have our forward and reverse primers with the same RE site, then the gene could be inserted in either direction.</p>
        <p>In the same line of thought, we want to ensure our restriction sites do not overlap. That is, our forward primer’s restriction site comes before our reverse primer’s restriction site.</p>
      </div>
    )
  },
  "fusion-protein-vector-considerations": {
    title: "Additional considerations for fusion protein RE sites",
    content: (
      <div>
        <p>If our vector contains a promoter, we should also ensure that our forward primer is after the promoter.</p>
        <p>If we are creating a fusion protein with a N-terminal tag, we should also ensure that our forward primer is after the tag. <strong>Otherwise, our tag would be lost and/or our protein wont be synthesised at all!</strong></p>
        <p>If we are creating a fusion protein with a C-terminal tag, we should ensure our reverse primer is before the tag and to not include any stop codons <strong>to prevent protein truncations</strong></p>
      </div>
    )
  },
  "preventing-sequence-of-interest-conflicts": {
    title: "Preventing restriction site conflicts within the sequence of interest",
    content: (
      <div>
        <p>Our chosen restriction site enzymes must not cut within our sequence of interest in any way. If this were to happen, then when running your PCR your sequence of interest would be cut into smaller (and likely unusable) fragments of DNA upon addition of the restriction enzymes that you would need to create your hanging ends.</p>
        <p>Other restriction sites which you choose not to include in your primers do not matter, as their corresponding enzymes will not be in your PCR experiment.</p>
      </div>
    )
  },
  "forward-primer-annealing-sequence-of-interest": {
    title: "Forward Primer hybridisation sequence: annealing the sequence of interest",
    content: (
      <div>
        <strong>FILL ME IN!</strong>
      </div>
    )
  },
  "reverse-primer-annealing-sequence-of-interest": {
    title: "Reverse Primer hybridisation sequence: annealing the sequence of interest",
    content: (
      <div>
        <strong>FILL ME IN</strong>
      </div>
    )
  },
  "start-codons-when-and-how": {
    title: "When and where to add a start codon",
    content: (
      <div>
        <strong>FILL ME IN</strong>
      </div>
    )
  },
  "forward-primer-frame": {
    title: "Getting the protein in frame: forward primer",
    content: (
      <div>
        <strong>FILL ME IN</strong>
      </div>
    )
  },
  "stop-codons-when-and-how": {
    title: "When to add a stop codon",
    content: (
      <div>
        <strong>FILL ME IN</strong>
      </div>
    )
  },
  "reverse-primer-frame": {
    title: "Getting in frame: reverse primer",
    content: (
      <div>
        <strong>FILL ME IN</strong>
      </div>
    )
  },
  "other-considerations": {
    title: "Other considerations after annealing",
    content: (
      <div>
        <strong>FILL ME IN</strong>
      </div>
    )
  },
  "5-prime-cap": {
    title: "Making the 5’ cap (‘leader sequence’)",
    content: (
      <div>
        <p>Adding extra bases (2-10) at the 5’ end assists restriction enzymes in recognising and/or binding to their restriction.</p>
      </div>
    )
  },
  "GC-clamp": {
    title: "Making the 3’ GC Clamp",
    content: (
      <div>
        <p>Fill me in</p>
      </div>
    )
  },
  "GC-content": {
    title: "Choosing and determining GC content",
    content: (
      <div>
        <p>FIL ME IN</p>
      </div>
    )
  },
  "melting-temperatures": {
    title: "Determining melting and annealing temperatures",
    content: (
      <div>
        <p>Fill me in</p>
      </div>
    )
  }

}
// {/* <TutorialLink /* tutorialNumber="0.1" */ to="/tutorials/welcome">Get started</TutorialLink>
// <TutorialLink /* tutorialNumber="1.1" */ to="/tutorials/what-is-pcr">What is PCR</TutorialLink>
// <TutorialLink /* tutorialNumber="1.2" */ to="/tutorials/what-is-plasmid-cloning">What is PCR plasmid cloning</TutorialLink>
// <TutorialLink /* tutorialNumber="1.3" */ to="/tutorials/approaching-questions">Approaching primer design questions</TutorialLink>
// <TutorialLink /* tutorialNumber="2.1" */ to="/tutorials/selecting-a-re-site">Selecting a restriction site</TutorialLink>
// <TutorialLink /* tutorialNumber="2.2" */ to="/tutorials/forward-primer-matching-vector">Forward primer: matching the vector</TutorialLink>
// <TutorialLink /* tutorialNumber="2.3" */ to="/tutorials/blunt-vs-hanging-ends">Hanging ends vs blunt ends</TutorialLink>
// <TutorialLink /* tutorialNumber="2.4" */ to="/tutorials/prevent-vector-conflicts">Preventing restriction site conflicts within the vector</TutorialLink>
// <TutorialLink /* tutorialNumber="2.5" */ to="/tutorials/what-is-pcr">Preventing restriction site conflicts within the sequence of interest</TutorialLink>
// <TutorialLink /* tutorialNumber="2.6" */ to="/tutorials/forward-primer-hybridisation">Forward primer hybridisation sequence: annealing the sequence of interest</TutorialLink>
// <TutorialLink /* tutorialNumber="3.1" */ to="/tutorials/reverse-primer-matching-vector">Reverse primer: matching the vector</TutorialLink>
// <TutorialLink /* tutorialNumber="3.2" */ to="/tutorials/forward-primer-matching-vector">Reverse primer: preventing conflicts with the forward primer</TutorialLink>
// <TutorialLink /* tutorialNumber="3.3" */ to="/tutorials/reverse-primer-hybridisation">Reverse primer hybridisation sequence: annealing the sequence of interest</TutorialLink>
// <TutorialLink /* tutorialNumber="3.3" */ to="/tutorials/reverse-primer-hybridisation">Reverse primer hybridisation sequence: annealing the sequence of interest</TutorialLink> */}