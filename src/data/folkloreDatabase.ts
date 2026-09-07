import { FolkloreMotifRecord } from '../types';

export const FOLKLORE_DATABASE: FolkloreMotifRecord[] = [
  {
    id: 'flk-001',
    name: 'Anansi the Spider (Kwaku Ananse)',
    culture: 'Akan / Ashanti',
    region: 'West Africa (Ghana / Côte d’Ivoire) & Caribbean Diaspora',
    summary: 'Master trickster and storyteller figure holding all the world’s tales (Nyankopon’s sky basket). Represents intellect, survival, and wit.',
    sacredVsPublic: 'General Folklore',
    customaryLaw: 'Requires respect for oral transmission etiquette. Commercialization must not reduce the trickster into a generic malevolent insect; traditional wisdom lessons (abebuo) should be acknowledged.',
    wipoClassification: 'TCE-Oral-Narrative-Class-04',
    filmmakingDoAndDont: {
      do: [
        'Engage Ghanaian cultural custodians or Akan folklore researchers',
        'Preserve the moral complexity where wit triumphs over brute strength',
        'Attribute oral heritage to the Akan people in production credits'
      ],
      dont: [
        'Do not depict Anansi as a demonic entity in horror tropes without community consultation',
        'Do not claim private proprietary trademark over the name "Anansi" or "Kweku Ananse"'
      ]
    },
    samplePermittedUsage: 'Animation, dramatic folklore adaptation, mythological adventure acknowledging Akan oral lineage.'
  },
  {
    id: 'flk-002',
    name: 'Taniwha (Kaitiaki Water Guardians)',
    culture: 'Māori',
    region: 'Aotearoa (New Zealand)',
    summary: 'Supernatural beings dwelling in rivers, lakes, or the ocean that act as protective guardians (kaitiaki) of iwi/hapū, or warnings of dangerous waters.',
    sacredVsPublic: 'Communal Custody',
    customaryLaw: 'Governed by Tikanga Māori. Taniwha are intimately tied to specific whakapapa (genealogy) and geographical landmarks. They must not be treated as generic kaiju or monster trophies to be slain by foreign heroes.',
    wipoClassification: 'TCE-Spiritual-Belief-Class-09',
    filmmakingDoAndDont: {
      do: [
        'Seek Free Prior and Informed Consent (FPIC) from local iwi/hapū if specifying a regional taniwha',
        'Frame the creature as a guardian demanding reciprocal respect and ecological balance'
      ],
      dont: [
        'Do not reduce Taniwha to mindless horror monsters slain for entertainment',
        'Never misuse Ta Moko (facial tattoo) designs on monster or villain textures'
      ]
    },
    samplePermittedUsage: 'Ecological guardianship narrative, collaborative bilingual screen drama with Te Māngai Pāho consultation.'
  },
  {
    id: 'flk-003',
    name: 'Yee Naaldlooshii (Skinwalker)',
    culture: 'Diné (Navajo)',
    region: 'Navajo Nation / American Southwest',
    summary: 'A corrupted practitioner of Navajo medicine who has violated sacred clan taboos. Mentioning or depicting them casually is considered deeply disrespectful, culturally taboo, and spiritually hazardous.',
    sacredVsPublic: 'Sacred / Secret',
    customaryLaw: 'Strict sacred taboo in Diné culture. It is not campfire folklore or public domain horror creature. Commercial exploitation by outside Hollywood productions violates indigenous spiritual sovereignty.',
    wipoClassification: 'TCE-Sacred-Esoteric-Class-01',
    filmmakingDoAndDont: {
      do: [
        'Consult the Navajo Nation Historic Preservation Office and cultural medicine societies',
        'Replace with original, culturally fictitious supernatural shapeshifters instead of culturally sacred Diné taboos'
      ],
      dont: [
        'Do not feature gratuitous depictions or chants associated with Navajo ceremonial medicine',
        'Do not use sacred medicine items (pollen pouches, eagle feathers, dry sand painting motifs) as horror props'
      ]
    },
    samplePermittedUsage: 'Extremely restricted. Independent indigenous Diné filmmakers creating internal historical allegory with tribal elder blessing.'
  },
  {
    id: 'flk-004',
    name: 'Xapiri (Forest Ancestral Spirits)',
    culture: 'Yanomami',
    region: 'Amazon Rainforest (Brazil / Venezuela)',
    summary: 'Microscopic luminous ancestral spirit-beings summoned by Yanomami shamans to heal illnesses, sustain the cosmos, and hold up the sky.',
    sacredVsPublic: 'Sacred / Secret',
    customaryLaw: 'Hutukara Associação Yanomami protocols apply. Imagery of shamanic rituals must not be commercialized or distorted into psychedelic entertainment tropes without community authorization.',
    wipoClassification: 'TCE-Sacred-Cosmology-Class-02',
    filmmakingDoAndDont: {
      do: [
        'Comply with Hutukara Yanomami ethical guidelines and Davi Kopenawa’s "The Falling Sky" moral rights protocols',
        'Establish direct community royalty benefit-sharing for forest preservation'
      ],
      dont: [
        'Do not depict sacred shamanic Yakoana rituals as recreational drug use in cinematic thrillers'
      ]
    },
    samplePermittedUsage: 'Environmental documentary, authorized indigenous-collaborative speculative cinema advocating Amazon protection.'
  },
  {
    id: 'flk-005',
    name: 'Pele & Hiʻiaka (Kilauea Volcano Deities)',
    culture: 'Kanaka Maoli (Native Hawaiian)',
    region: 'Hawaiʻi',
    summary: 'Goddess of fire and volcanoes, creator of Hawaiian islands, and her sister Hiʻiakaikapoliopele, patron of hula and healing.',
    sacredVsPublic: 'Communal Custody',
    customaryLaw: 'Pele is an akua (deity) and living ancestral force, not a comedic caricature or generic volcano curse. Traditional oli (chants) and hula kahiko are sacred intellectual property.',
    wipoClassification: 'TCE-Genealogical-Deity-Class-07',
    filmmakingDoAndDont: {
      do: [
        'Engage Native Hawaiian cultural advisors (kumu hula and kupuna)',
        'Ensure correct pronunciation and respectful portrayal of Hawaiian cosmology'
      ],
      dont: [
        'Do not invent fake pseudo-Polynesian chants or mock sacrifices to volcano craters',
        'Do not commodify sacred hula movements out of their liturgical contexts'
      ]
    },
    samplePermittedUsage: 'Epic narrative film crafted with Kanaka Maoli screenwriters, honoring Moʻolelo oral traditions.'
  },
  {
    id: 'flk-006',
    name: 'The Rainbow Serpent (Ngalyod / Borlung)',
    culture: 'Aboriginal Australian (Arnhem Land & Pan-Continental)',
    region: 'Australia (Multiple First Nations)',
    summary: 'Major Creator Being of the Dreamtime (Jukurrpa), sovereign over water, rain, fertility, and the shape of river gorges and mountains.',
    sacredVsPublic: 'Restricted / Initiatic',
    customaryLaw: 'Subject to Australia ICIP (Indigenous Cultural & Intellectual Property) protocols and Teri Janke legal frameworks. Traditional stories belong to specific Clan estates and Traditional Owners.',
    wipoClassification: 'TCE-Dreamtime-Cosmological-Class-01',
    filmmakingDoAndDont: {
      do: [
        'Follow Australia Council for the Arts Protocols for producing Indigenous Australian writing/film',
        'Obtain specific permission from the relevant Traditional Owner clan whose country is portrayed'
      ],
      dont: [
        'Do not replicate traditional secret-sacred rock art or rarrk cross-hatching styles without authentic artist licensing'
      ]
    },
    samplePermittedUsage: 'Co-produced Australian indigenous feature films with Elder executive producer credits.'
  }
];
