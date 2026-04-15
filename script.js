/* ═══════════════════════════════════════════
   SEEDED RNG
   ═══════════════════════════════════════════ */
function createRng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (Math.imul(1664525, s) + 1013904223) | 0;
    return (s >>> 0) / 4294967296;
  };
}

/* ═══════════════════════════════════════════
   DATA POOLS
   ═══════════════════════════════════════════ */
const CITIES = [
  { city: "Toronto", province: "ON" }, { city: "Ottawa", province: "ON" },
  { city: "Hamilton", province: "ON" }, { city: "London", province: "ON" },
  { city: "Mississauga", province: "ON" }, { city: "Brampton", province: "ON" },
  { city: "Kitchener", province: "ON" }, { city: "Windsor", province: "ON" },
  { city: "Sudbury", province: "ON" }, { city: "Thunder Bay", province: "ON" },
  { city: "Barrie", province: "ON" }, { city: "Kingston", province: "ON" },
  { city: "Guelph", province: "ON" }, { city: "Waterloo", province: "ON" },
  { city: "Oshawa", province: "ON" }, { city: "St. Catharines", province: "ON" },
  { city: "Peterborough", province: "ON" }, { city: "Sault Ste. Marie", province: "ON" },
  { city: "Markham", province: "ON" }, { city: "Vaughan", province: "ON" },
  { city: "Vancouver", province: "BC" }, { city: "Victoria", province: "BC" },
  { city: "Kelowna", province: "BC" }, { city: "Abbotsford", province: "BC" },
  { city: "Kamloops", province: "BC" }, { city: "Prince George", province: "BC" },
  { city: "Nanaimo", province: "BC" }, { city: "Surrey", province: "BC" },
  { city: "Burnaby", province: "BC" }, { city: "Richmond", province: "BC" },
  { city: "Coquitlam", province: "BC" }, { city: "Langley", province: "BC" },
  { city: "Chilliwack", province: "BC" }, { city: "Vernon", province: "BC" },
  { city: "Calgary", province: "AB" }, { city: "Edmonton", province: "AB" },
  { city: "Red Deer", province: "AB" }, { city: "Lethbridge", province: "AB" },
  { city: "Medicine Hat", province: "AB" }, { city: "Grande Prairie", province: "AB" },
  { city: "Fort McMurray", province: "AB" }, { city: "Airdrie", province: "AB" },
  { city: "St. Albert", province: "AB" }, { city: "Spruce Grove", province: "AB" },
  { city: "Montréal", province: "QC" }, { city: "Québec City", province: "QC" },
  { city: "Laval", province: "QC" }, { city: "Gatineau", province: "QC" },
  { city: "Longueuil", province: "QC" }, { city: "Sherbrooke", province: "QC" },
  { city: "Saguenay", province: "QC" }, { city: "Trois-Rivières", province: "QC" },
  { city: "Terrebonne", province: "QC" }, { city: "Saint-Jérôme", province: "QC" },
  { city: "Winnipeg", province: "MB" }, { city: "Brandon", province: "MB" },
  { city: "Saskatoon", province: "SK" }, { city: "Regina", province: "SK" },
  { city: "Halifax", province: "NS" }, { city: "Sydney", province: "NS" },
  { city: "Dartmouth", province: "NS" },
  { city: "Fredericton", province: "NB" }, { city: "Moncton", province: "NB" },
  { city: "Saint John", province: "NB" },
  { city: "St. John's", province: "NL" }, { city: "Corner Brook", province: "NL" },
  { city: "Charlottetown", province: "PE" },
  { city: "Whitehorse", province: "YT" }, { city: "Yellowknife", province: "NT" },
];

const FIRST_NAMES_F = [
  "Emma","Olivia","Sophia","Charlotte","Amelia","Ava","Isabella","Mia","Evelyn","Harper",
  "Camille","Claire","Nadia","Sarah","Jessica","Amanda","Rebecca","Samantha","Laura","Natasha",
  "Priya","Aisha","Mei","Yuki","Fatima","Amira","Leila","Danielle","Michelle","Christine",
  "Katherine","Elizabeth","Hannah","Grace","Victoria","Alexandra","Nicole","Jennifer","Stephanie","Vanessa",
  "Simone","Renée","Marie","Isabelle","Gabrielle","Chloé","Léa","Manon","Audrey","Sandrine",
  "Monique","Céline","Brigitte","Pooja","Ananya","Divya","Jasmine","Kavya","Riya","Sunita",
  "Ji-Young","Soo-Yeon","Hyun-Joo","Min-Seo","Na-Young","Yeon-Ji","Mei-Ling","Xiao-Yan","Wei-Wei","Lin",
  "Aaliyah","Keisha","Tamara","Shanice","Latoya","Ebony","Tanya","Shantel","Sienna","Brooke",
  "Taylor","Madison","Hayley","Paige","Riley","Peyton","Ingrid","Astrid","Freya","Katrin",
  "Nadine","Sabine","Monika","Helene","Greta","Annika","Zara","Nour","Yasmin","Hana",
  "Mariam","Iman","Huda","Salma","Reem","Sofia","Giulia","Francesca","Chiara","Elena",
  "Olena","Iryna","Nataliia","Oksana","Yuliia","Ayasha","Kiona","Chenoa","Winona","Aiyana"
];

const FIRST_NAMES_M = [
  "Liam","Noah","Oliver","William","James","Benjamin","Lucas","Henry","Alexander","Mason",
  "Michael","Daniel","David","Matthew","Joseph","Samuel","Christopher","Andrew","Joshua","Ryan",
  "Nathan","Eric","Kevin","Brian","Scott","Timothy","Jason","Jeffrey","Adam","Stephen",
  "Jean","Pierre","François","Michel","André","Philippe","Sébastien","Étienne","Mathieu","Alexandre",
  "Maxime","Nicolas","Guillaume","Julien","Rahul","Arjun","Vikram","Aditya","Rohan","Nikhil",
  "Sanjay","Rajesh","Min-Jun","Tae-Yang","Jin-Ho","Sung-Woo","Hyun-Ki","Dong-Hyun","Ji-Hoon","Wei",
  "Jun","Jian","Ming","Feng","Hao","Peng","Cheng","Gang","Marcus","Derrick",
  "Andre","Darius","Malik","Kendrick","Jalen","Jerome","Ethan","Tyler","Logan","Connor",
  "Dylan","Jayden","Caleb","Elijah","Hassan","Omar","Tariq","Kareem","Ibrahim","Yusuf",
  "Khalid","Idris","Adrian","Carlos","Marco","Diego","Miguel","Roberto","Lars","Henrik",
  "Oleksiy","Vasyl","Dmytro","Mykola","Taras","Bohdan","Giorgio","Matteo","Lorenzo","Davide",
  "Kwame","Kofi","Emmanuel","Aiden","Zane","Brett","Navjot","Gurpreet","Harpreet","Manjit"
];

const FIRST_NAMES_NB = [
  "Alex","Jordan","Quinn","Riley","Avery","Morgan","Sage","Robin","Casey","Emery",
  "Rowan","Finley","River","Skyler","Blake","Reese","Drew","Cameron","Taylor","Jessie",
  "Terry","Pat","Sam","Lee","Erin","Andy","Kai","Indigo","Ash","Lou","Lex","Remy","Rue"
];

const LAST_NAMES = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Wilson","Anderson",
  "Taylor","Thomas","Jackson","White","Harris","Martin","Thompson","Moore","Young","Allen",
  "King","Wright","Scott","Torres","Nguyen","Chen","Wang","Liu","Zhang","Kim",
  "Lee","Park","Choi","Lim","Patel","Shah","Kumar","Singh","Sharma","Mehta",
  "Gupta","Nair","Rao","Tremblay","Gagnon","Roy","Côté","Bouchard","Gauthier","Morin",
  "Lavoie","Fortin","Gagné","Ouellet","Pelletier","Bélanger","Leclerc","Bergeron","Leblanc","Coulombe",
  "Vézina","Simard","Boivin","Dubois","Richard","O'Brien","Murphy","Walsh","Kelly","Ryan",
  "Kennedy","McCarthy","O'Connor","MacKenzie","MacDonald","MacLeod","Campbell","Robertson","Stewart","Fraser",
  "Schmidt","Müller","Weber","Hoffmann","Klein","Wolf","Fischer","Meyer","Okafor","Eze",
  "Adeyemi","Osei","Mensah","Asante","Diallo","Kone","Andersen","Eriksson","Larsson","Johansson",
  "Yamamoto","Tanaka","Watanabe","Suzuki","Sato","Nakamura","Ali","Hassan","Ahmed","Khalil",
  "Mahmoud","Ibrahim","Santos","Silva","Ferreira","Oliveira","Perez","Rodriguez","Martinez","Sanchez",
  "Stone","Brooks","Reed","Cook","Bell","Cooper","Richardson","Cox","Ward","Peterson",
  "Kovalenko","Shevchenko","Bondarenko","Petrenko","Melnyk","Esposito","Russo","Ferrari","Romano","Colombo",
  "Bear","Swifthawk","Littlecloud","Running Wolf","Sandhu","Gill","Sidhu","Dhaliwal","Grewal","Brar",
  "Beaumont","Lavigne","Dupont","Bernard","Fontaine","Girard","Denis","Arsenault","Lebrun","Chartier",
  "Thibodeau","Savoie","Thériault","Cormier"
];

const CREDENTIALS = [
  { title: "Registered Psychologist", abbr: "R.Psych" },
  { title: "Registered Clinical Counsellor", abbr: "RCC" },
  { title: "Canadian Certified Counsellor", abbr: "CCC" },
  { title: "Registered Social Worker", abbr: "RSW" },
  { title: "Registered Psychotherapist", abbr: "RP" },
  { title: "Registered Marriage & Family Therapist", abbr: "RMFT" },
  { title: "Doctor of Psychology", abbr: "PsyD" },
  { title: "Registered Social Worker", abbr: "MSW, RSW" },
  { title: "Psychiatrist", abbr: "MD" },
  { title: "Registered Psychotherapist (Qualifying)", abbr: "RP(Q)" },
  { title: "Certified Trauma Therapist", abbr: "CTT" },
  { title: "Registered Art Therapist", abbr: "RCAT" },
  { title: "Licensed Counselling Therapist", abbr: "LCT" },
];

const ALL_SPECIALTIES = [
  "Anxiety","Depression","Trauma & PTSD","Couples Therapy","Family Therapy",
  "ADHD","OCD","Eating Disorders","Addiction & Substance Use","LGBTQ+ Issues",
  "Men's Issues","Child Therapy","Teen Therapy","Grief & Loss","Bipolar Disorder",
  "Autism Spectrum","Sports Psychology","Sleep Disorders","Geriatric Psychology",
  "Women's Issues","Cultural Identity","Chronic Illness","Self-Esteem",
  "Anger Management","Stress Management","Life Transitions","Immigration & Acculturation",
  "Perinatal Mental Health","Sex Therapy","Borderline Personality Disorder",
  "Dissociative Disorders","Phobias","Social Anxiety","Relationship Issues",
  "Workplace Burnout","Spirituality & Religion","Somatic Therapy","Neurodiversity",
  "First Nations & Indigenous Wellness","Domestic Violence","Complex PTSD",
  "Caregiver Support","School & Academic Issues","Multicultural Issues",
];

const ALL_ISSUES = [
  "Anxiety","Depression","Stress","Trauma","PTSD","Relationship Issues","Grief","ADHD","OCD",
  "Eating Disorders","Substance Abuse","Family Conflict","Anger Management","Sleep Problems",
  "Self-Esteem","Burnout","Loneliness","Identity Issues","Panic Attacks","Social Anxiety",
  "Intrusive Thoughts","Bipolar Disorder","Borderline Personality","Complex PTSD","Sexual Abuse",
  "Domestic Violence","Infidelity","Communication Problems","Parenting","Chronic Pain",
  "Career Issues","Motivation","Procrastination","Perfectionism","Codependency","Emotional Abuse",
  "Life Purpose","Immigration Stress","Racial Trauma","Religious Trauma","Caregiver Stress",
  "Childhood Trauma","Attachment Issues","Work-Life Balance","Seasonal Affective Disorder",
];

const ALL_APPROACHES = [
  "Cognitive Behavioural Therapy (CBT)","Dialectical Behaviour Therapy (DBT)",
  "EMDR","Mindfulness-Based Therapy","Acceptance and Commitment Therapy (ACT)",
  "Psychodynamic Therapy","Solution-Focused Brief Therapy","Narrative Therapy",
  "Somatic Experiencing","Internal Family Systems (IFS)","Gottman Method",
  "Emotionally Focused Therapy (EFT)","Person-Centred Therapy","Trauma-Focused CBT",
  "Play Therapy","Family Systems Therapy","Motivational Interviewing",
  "Interpersonal Therapy (IPT)","Schema Therapy","Gestalt Therapy",
  "Exposure and Response Prevention (ERP)","Attachment-Based Therapy",
  "Art Therapy","Sand Tray Therapy","Feminist Therapy","Strengths-Based",
  "Compassion-Focused Therapy","Sensorimotor Psychotherapy","AEDP",
  "Two-Eyed Seeing (Etuaptmumk)","Culturally Adapted CBT",
];

const ALL_INSURANCE = [
  "Sun Life Financial","Manulife","Great-West Life (Canada Life)","Green Shield Canada",
  "Desjardins Insurance","Blue Cross","SSQ Insurance","Equitable Life",
  "Pacific Blue Cross","Alberta Blue Cross","Medavie Blue Cross",
  "Chamber of Commerce Group Insurance","ClaimSecure","IA Financial Group",
  "Empire Life","Industrial Alliance","Beneva","Cowan Insurance","RWAM Insurance",
  "GroupHEALTH","OTIP",
];

const ALL_LANGUAGES = [
  "English","French","Mandarin","Cantonese","Punjabi","Hindi","Urdu",
  "Arabic","Korean","Tagalog","Spanish","Portuguese","Vietnamese","Tamil",
  "Persian/Farsi","Ukrainian","Polish","German","Italian","Japanese",
  "Somali","Amharic","Swahili","Gujarati","Bengali","Cree","Ojibwe",
];

const AGE_GROUPS = ["Children","Teens","Young Adults","Adults","Older Adults","Couples","Families"];

const BIO_TEMPLATES = [
  "I specialize in helping {ageDesc} navigate {spec1} and {spec2}. Using {approach1} and {approach2}, I create a warm, collaborative space where clients feel truly heard. With {years} years of experience, I believe meaningful change is possible for everyone who seeks it.",
  "As a {cred}, my practice focuses on {spec1}, {spec2}, and related concerns. I draw from {approach1} and {approach2} to meet each client exactly where they are. I work with {ageDesc} both in-person in {city} and via telehealth across {province}.",
  "I'm a {cred} with a deep commitment to supporting clients through {spec1} and {spec2}. My approach weaves together {approach1} and {approach2}, grounded in compassion and evidence-based practice. I've spent {years} years walking alongside people through their most challenging moments.",
  "My practice is built on the belief that you are the expert on your own life. I specialize in {spec1} and {spec2}, and I use {approach1} to help clients build the insight and tools they need to thrive. I see {ageDesc} in my {city} office and online.",
  "Healing is not linear—and neither is the work we do together. I specialize in {spec1} and {spec2}, bringing {years} years of experience and a commitment to culturally sensitive, trauma-informed care. I use {approach1} and {approach2} to support lasting growth.",
  "Working with {ageDesc} facing {spec1} and {spec2}, I bring both clinical expertise and genuine warmth to every session. My training in {approach1} and {approach2} informs a flexible, client-directed approach. I am currently accepting new clients in {city}.",
  "I became a {cred} because I believe deeply in people's capacity to heal. My work centres on {spec1} and {spec2}, using {approach1} and {approach2} to help clients move from surviving to thriving. I offer both telehealth and in-person sessions in {city}.",
  "With {years} years in the field, I've had the privilege of supporting hundreds of clients through {spec1} and {spec2}. I integrate {approach1} with {approach2} in a way that honours each person's unique background and strengths.",
  "I specialize in {spec1}, {spec2}, and related concerns, with a particular focus on {ageDesc}. My sessions are collaborative, practical, and rooted in {approach1}. I work from a trauma-informed, anti-oppressive lens that respects all identities and backgrounds.",
  "A {cred} based in {city}, I offer individual and group therapy for {spec1} and {spec2}. I'm trained in {approach1} and {approach2}, and I believe the therapeutic relationship is the most powerful vehicle for change. Sliding scale spots currently available.",
  "I've spent my career helping {ageDesc} find relief from {spec1} and {spec2}. My approach combines {approach1} with {approach2}, tailoring the work to each person's unique needs and goals. I'm passionate about accessible, affirming, evidence-based mental health care.",
  "Recovery and growth look different for everyone. I specialize in {spec1} and {spec2}, working collaboratively with clients to discover what healing means for them. I draw on {approach1} and {approach2}, and I bring {years} years of clinical experience to our work.",
  "As a {cred} in {city}, I provide compassionate support for {spec1} and {spec2}. My style is warm, direct, and collaborative—I don't believe in one-size-fits-all therapy. I use {approach1} and {approach2} to create a path forward that is uniquely yours.",
  "I work primarily with {ageDesc} experiencing {spec1}, {spec2}, and related challenges. Using {approach1} and a strengths-based lens, I help clients build resilience and reconnect with their sense of self. I offer telehealth sessions across {province}.",
  "My practice is grounded in the conviction that every person deserves skilled, compassionate care. I specialize in {spec1} and {spec2}, and I draw on {approach1} and {approach2} to guide our work. I see clients in {city} and virtually throughout Canada.",
  "Specializing in {spec1} and {spec2}, I bring a relational, culturally informed approach to therapy. With {years} years of experience and training in {approach1}, I help clients understand the roots of their struggles and develop practical tools for lasting change.",
  "I'm a {cred} who believes that insight without action is incomplete. My work with {ageDesc} focuses on {spec1} and {spec2}, using {approach1} and {approach2} to build both awareness and practical coping skills. New clients welcome.",
  "Supporting {ageDesc} through {spec1} and {spec2} has been the centre of my practice for {years} years. I use {approach1} and {approach2} to create a safe, non-judgmental space where clients can explore difficult experiences and build a life that feels worth living.",
  "I take a holistic, person-centred approach to {spec1} and {spec2}. As a {cred} in {city}, I integrate {approach1} with somatic and mindfulness techniques, helping clients reconnect with their bodies and minds. I welcome adults, couples, and families.",
  "With specialized training in {approach1} and {approach2}, I help clients facing {spec1} and {spec2} create meaningful, lasting change. I am committed to providing affirming, anti-oppressive care for all communities, with a special focus on {ageDesc}.",
];

/* ═══════════════════════════════════════════
   GENERATOR
   ═══════════════════════════════════════════ */
function generateTherapists(count) {
  const rng = createRng(9371);
  const pick = arr => arr[Math.floor(rng() * arr.length)];
  const pickN = (arr, n) => {
    const copy = [...arr]; const result = [];
    const limit = Math.min(n, copy.length);
    for (let i = 0; i < limit; i++) {
      const idx = Math.floor(rng() * (copy.length - i));
      result.push(copy[idx]);
      const tmp = copy[idx]; copy[idx] = copy[copy.length - 1 - i]; copy[copy.length - 1 - i] = tmp;
    }
    return result;
  };
  const between = (min, max) => Math.floor(rng() * (max - min + 1)) + min;
  const list = [];
  for (let i = 0; i < count; i++) {
    const genderRoll = rng();
    const gender = genderRoll < 0.55 ? "female" : genderRoll < 0.88 ? "male" : "non-binary";
    const firstName = gender === "female" ? pick(FIRST_NAMES_F) : gender === "male" ? pick(FIRST_NAMES_M) : pick(FIRST_NAMES_NB);
    const lastName = pick(LAST_NAMES);
    const cred = pick(CREDENTIALS);
    const location = pick(CITIES);
    const specialties = pickN(ALL_SPECIALTIES, between(2, 5));
    const issues = pickN(ALL_ISSUES, between(4, 8));
    const approaches = pickN(ALL_APPROACHES, between(2, 4));
    const insurance = pickN(ALL_INSURANCE, between(2, 5));
    const langExtras = rng() < 0.32 ? [pick(ALL_LANGUAGES.filter(l => l !== "English"))] : [];
    if (rng() < 0.08 && langExtras.length) { const e = pick(ALL_LANGUAGES.filter(l => l !== "English" && l !== langExtras[0])); langExtras.push(e); }
    const languages = ["English", ...langExtras].filter((v, i, a) => a.indexOf(v) === i);
    const ageGroups = pickN(AGE_GROUPS, between(1, 3));
    const years = between(2, 28);
    const feeMin = between(90, 280);
    const feeMax = feeMin + between(20, 70);
    const rating = parseFloat((between(42, 50) / 10).toFixed(1));
    const reviewCount = between(4, 130);
    const telehealth = rng() > 0.15;
    const inPerson = rng() > 0.2;
    const slidingScale = rng() > 0.42;
    const acceptingClients = rng() > 0.18;
    const photoGender = gender === "non-binary" ? (rng() > 0.5 ? "women" : "men") : gender === "female" ? "women" : "men";
    const photoNum = between(1, 99);
    const hasWebsite = rng() < 0.35;
    const hasCred = rng() < 0.55;
    const ageDesc = ageGroups.length > 1 ? ageGroups[0].toLowerCase() + "s and " + ageGroups[1].toLowerCase() + "s" : (ageGroups[0] || "adults").toLowerCase() + "s";
    const bioRaw = pick(BIO_TEMPLATES)
      .replace(/{spec1}/g, specialties[0] || "anxiety").replace(/{spec2}/g, specialties[1] || "depression")
      .replace(/{spec3}/g, specialties[2] || "stress").replace(/{approach1}/g, approaches[0] || "CBT")
      .replace(/{approach2}/g, approaches[1] || "mindfulness").replace(/{years}/g, years)
      .replace(/{cred}/g, cred.title).replace(/{city}/g, location.city)
      .replace(/{province}/g, location.province).replace(/{ageDesc}/g, ageDesc);
    const licencedProvs = [location.province];
    if (rng() < 0.18) { const extra = pick(CITIES).province; if (!licencedProvs.includes(extra)) licencedProvs.push(extra); }
    const areaCode = between(200, 999);
    const phoneMiddle = between(200, 999);
    const phoneLast = String(between(1000, 9999));
    const displayName = `${firstName} ${lastName}`;
    list.push({
      id: i + 1,
      name: hasCred ? `${firstName} ${lastName}, ${cred.abbr}` : `${firstName} ${lastName}`,
      displayName,
      title: cred.title,
      photo: `https://randomuser.me/api/portraits/${photoGender}/${photoNum}.jpg`,
      bio: bioRaw, city: location.city, province: location.province,
      telehealth, inPerson, gender, specialties, issues, insurance, approaches, languages,
      sessionFeeMin: feeMin, sessionFeeMax: feeMax, slidingScale, acceptingClients,
      yearsExperience: years, rating, reviewCount,
      phone: `(${areaCode}) ${phoneMiddle}-${phoneLast}`,
      website: hasWebsite ? `https://www.${firstName.toLowerCase().replace(/[^a-z]/g, "")}${lastName.toLowerCase().replace(/[^a-z]/g, "")}counselling.ca` : "",
      licensedIn: licencedProvs, ageGroups, verified: rng() > 0.08,
    });
  }
  return list;
}

const THERAPISTS = generateTherapists(1100);

/* ═══════════════════════════════════════════
   FILTER OPTIONS
   ═══════════════════════════════════════════ */
const PROVINCES = [
  { code: "AB", name: "Alberta" }, { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" }, { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland & Labrador" }, { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" }, { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" }, { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" }, { code: "YT", name: "Yukon" },
];

const FILTER_OPTIONS = {
  specialties: [
    "Anxiety","Depression","Trauma & PTSD","Couples Therapy","Family Therapy","ADHD","OCD",
    "Eating Disorders","Addiction & Substance Use","LGBTQ+ Issues","Men's Issues","Child Therapy",
    "Teen Therapy","Grief & Loss","Bipolar Disorder","Autism Spectrum","Sports Psychology",
    "Sleep Disorders","Geriatric Psychology","Women's Issues","Cultural Identity","Chronic Illness",
    "Immigration & Acculturation","Perinatal Mental Health","Borderline Personality Disorder",
    "Complex PTSD","First Nations & Indigenous Wellness","Workplace Burnout","Neurodiversity",
  ],
  issues: [
    "Anxiety","Depression","Stress","Trauma","PTSD","Relationship Issues","Grief","ADHD","OCD",
    "Eating Disorders","Substance Abuse","Family Conflict","Anger Management","Sleep Problems",
    "Self-Esteem","Burnout","Loneliness","Identity Issues","Panic Attacks","Social Anxiety",
    "Domestic Violence","Parenting","Chronic Pain","Career Issues","Immigration Stress",
    "Racial Trauma","Childhood Trauma","Seasonal Affective Disorder",
  ],
  insurance: [
    "Sun Life Financial","Manulife","Great-West Life (Canada Life)","Green Shield Canada",
    "Desjardins Insurance","Blue Cross","SSQ Insurance","Equitable Life",
    "Pacific Blue Cross","Alberta Blue Cross","Medavie Blue Cross","ClaimSecure",
    "IA Financial Group","Empire Life","Beneva","OTIP",
  ],
  ageGroups: ["Children","Teens","Young Adults","Adults","Older Adults","Couples","Families"],
  languages: [
    "English","French","Mandarin","Cantonese","Punjabi","Hindi","Urdu","Arabic","Korean",
    "Tagalog","Spanish","Vietnamese","Tamil","Persian/Farsi","Ukrainian","Polish","German",
    "Somali","Gujarati","Bengali",
  ],
};

const SPECIALTIES_HERO = [
  { label: "Anxiety", icon: '<path d="M9 9a3 3 0 1 1 6 0c0 2-3 3-3 5m0 3h.01" stroke="currentColor" stroke-width="2" fill="none"/>' },
  { label: "Depression", icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" fill="none"/>' },
  { label: "Couples Therapy", icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" fill="none"/>' },
  { label: "Trauma & PTSD", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" fill="none"/>' },
  { label: "LGBTQ+ Issues", icon: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" stroke-width="2" fill="none"/><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="2"/><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="2"/>' },
  { label: "Family Therapy", icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" fill="none"/>' },
  { label: "ADHD", icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" stroke-width="2" fill="none"/>' },
  { label: "Grief & Loss", icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" fill="none"/>' },
];

/* ═══════════════════════════════════════════
   AI QUERY PARSER
   ═══════════════════════════════════════════ */
const SPECIALTY_MAP = [
  { keywords: ["anxiety","anxious","panic attack","panic","worry","worries","worried","nervous","overwhelm"], specialty: "Anxiety" },
  { keywords: ["depression","depressed","depressive","low mood","hopeless","sadness","sad","empty"], specialty: "Depression" },
  { keywords: ["trauma","ptsd","post-traumatic","abuse survivor","traumatic","flashback"], specialty: "Trauma & PTSD" },
  { keywords: ["complex ptsd","cptsd","complex trauma"], specialty: "Complex PTSD" },
  { keywords: ["couple","couples","marriage","marital","partner","partners","divorce","infidelity","relationship therapy"], specialty: "Couples Therapy" },
  { keywords: ["family therapy","family conflict","family issue","parenting","parent","siblings"], specialty: "Family Therapy" },
  { keywords: ["adhd","attention deficit","attention disorder","hyperactivity","focus problems","can't focus"], specialty: "ADHD" },
  { keywords: ["ocd","obsessive","compulsive","intrusive thought","contamination"], specialty: "OCD" },
  { keywords: ["eating disorder","anorexia","bulimia","binge eating","binge-eating","food issues","body image"], specialty: "Eating Disorders" },
  { keywords: ["addiction","substance use","substance abuse","alcohol","alcoholism","drugs","sober","sobriety","recovery"], specialty: "Addiction & Substance Use" },
  { keywords: ["lgbtq","queer","gay","lesbian","bisexual","trans","transgender","gender identity","nonbinary","non-binary","coming out","2slgbtq"], specialty: "LGBTQ+ Issues" },
  { keywords: ["men's issues","men's mental","male","masculinity","fatherhood","men's health"], specialty: "Men's Issues" },
  { keywords: ["child therapy","child","children","kids","play therapy","young child"], specialty: "Child Therapy" },
  { keywords: ["teen","teenager","adolescent","youth","high school","young person","student"], specialty: "Teen Therapy" },
  { keywords: ["grief","loss","bereavement","death","died","mourning","widow","widower"], specialty: "Grief & Loss" },
  { keywords: ["bipolar","mania","manic episode","mood swings"], specialty: "Bipolar Disorder" },
  { keywords: ["autism","autistic","asd","asperger","spectrum"], specialty: "Autism Spectrum" },
  { keywords: ["sleep","insomnia","sleepless","can't sleep","sleep disorder"], specialty: "Sleep Disorders" },
  { keywords: ["burnout","workplace","work stress","overworked","exhausted","career stress"], specialty: "Workplace Burnout" },
  { keywords: ["stress","stressed","overwhelmed","too much"], specialty: "Stress Management" },
  { keywords: ["immigration","immigrant","newcomer","acculturation","cultural identity","multicultural","new to canada"], specialty: "Immigration & Acculturation" },
  { keywords: ["postpartum","perinatal","pregnancy","prenatal","postnatal","new mom","new parent","baby blues","maternal"], specialty: "Perinatal Mental Health" },
  { keywords: ["chronic illness","chronic pain","disability","medical condition","health anxiety"], specialty: "Chronic Illness" },
  { keywords: ["anger","rage","aggressive","aggression","temper","angry"], specialty: "Anger Management" },
  { keywords: ["indigenous","first nations","métis","inuit","native","aboriginal","two-spirit"], specialty: "First Nations & Indigenous Wellness" },
  { keywords: ["sport","athlete","athletes","performance","athletic","sports anxiety"], specialty: "Sports Psychology" },
  { keywords: ["women's","women's issues","feminist","female","women"], specialty: "Women's Issues" },
  { keywords: ["self-esteem","self esteem","confidence","insecurity","self-worth","self worth"], specialty: "Self-Esteem" },
  { keywords: ["borderline","bpd","borderline personality"], specialty: "Borderline Personality Disorder" },
  { keywords: ["domestic violence","abuse","abusive relationship","domestic abuse","violence at home"], specialty: "Domestic Violence" },
  { keywords: ["life transition","major change","new chapter","moving","divorce adjustment"], specialty: "Life Transitions" },
  { keywords: ["neurodiversity","neurodivergent","dyslexia","dyspraxia","learning difference"], specialty: "Neurodiversity" },
  { keywords: ["social anxiety","shyness","shy","social phobia","social fear"], specialty: "Social Anxiety" },
  { keywords: ["relationship","relationships","dating","breakup","break-up","loneliness","lonely"], specialty: "Relationship Issues" },
  { keywords: ["caregiver","caring for","looking after","elderly parent","caregiver stress"], specialty: "Caregiver Support" },
  { keywords: ["school","academic","exams","university","college","studying"], specialty: "School & Academic Issues" },
];

const LANGUAGE_MAP = [
  { keywords: ["french","français","francophone","french-speaking","en français"], lang: "French" },
  { keywords: ["mandarin","chinese","mandarin-speaking"], lang: "Mandarin" },
  { keywords: ["cantonese"], lang: "Cantonese" },
  { keywords: ["punjabi","punjabi-speaking"], lang: "Punjabi" },
  { keywords: ["hindi","hindi-speaking"], lang: "Hindi" },
  { keywords: ["arabic","arabic-speaking"], lang: "Arabic" },
  { keywords: ["korean","korean-speaking"], lang: "Korean" },
  { keywords: ["spanish","español","spanish-speaking"], lang: "Spanish" },
  { keywords: ["urdu","urdu-speaking"], lang: "Urdu" },
  { keywords: ["tagalog","filipino","tagalog-speaking"], lang: "Tagalog" },
  { keywords: ["vietnamese","vietnamese-speaking"], lang: "Vietnamese" },
  { keywords: ["persian","farsi","persian-speaking"], lang: "Persian/Farsi" },
  { keywords: ["ukrainian","ukrainian-speaking"], lang: "Ukrainian" },
  { keywords: ["german","deutsch","german-speaking"], lang: "German" },
  { keywords: ["somali","somali-speaking"], lang: "Somali" },
  { keywords: ["gujarati"], lang: "Gujarati" },
  { keywords: ["bengali"], lang: "Bengali" },
  { keywords: ["tamil"], lang: "Tamil" },
  { keywords: ["cree"], lang: "Cree" },
];

function parseAIQuery(text) {
  const lower = text.toLowerCase();
  const result = {
    city: "", province: "", specialty: "", lang: "",
    telehealth: false, slidingScale: false, accepting: false,
    ageGroup: "",
    summary: [],
  };

  // City detection — sorted by length desc to catch "St. John's" before "John"
  const sortedCities = [...CITIES].sort((a, b) => b.city.length - a.city.length);
  for (const loc of sortedCities) {
    const cityLower = loc.city.toLowerCase().replace(/[éèêëàâîï]/g, c =>
      ({ é:"e",è:"e",ê:"e",ë:"e",à:"a",â:"a",î:"i",ï:"i" }[c] || c)
    );
    const textNorm = lower.replace(/[éèêëàâîï]/g, c =>
      ({ é:"e",è:"e",ê:"e",ë:"e",à:"a",â:"a",î:"i",ï:"i" }[c] || c)
    );
    if (textNorm.includes(cityLower)) {
      result.city = loc.city;
      result.province = loc.province;
      result.summary.push(loc.city);
      break;
    }
  }

  // Province detection if no city found
  if (!result.province) {
    for (const prov of PROVINCES) {
      if (lower.includes(prov.name.toLowerCase()) || new RegExp(`\\b${prov.code.toLowerCase()}\\b`).test(lower)) {
        result.province = prov.code;
        result.summary.push(prov.name);
        break;
      }
    }
  }

  // Specialty detection
  for (const entry of SPECIALTY_MAP) {
    if (entry.keywords.some(k => lower.includes(k))) {
      result.specialty = entry.specialty;
      result.summary.push(entry.specialty);
      break;
    }
  }

  // Language detection
  for (const entry of LANGUAGE_MAP) {
    if (entry.keywords.some(k => lower.includes(k))) {
      result.lang = entry.lang;
      if (entry.lang !== "English") result.summary.push(`${entry.lang}-speaking`);
      break;
    }
  }

  // Telehealth
  if (["telehealth","online therapy","virtual","video session","remote therapy","video call","online counsell"].some(k => lower.includes(k))) {
    result.telehealth = true;
    result.summary.push("telehealth");
  }

  // Sliding scale
  if (["sliding scale","affordable","low cost","low-cost","budget","subsidized","reduced fee"].some(k => lower.includes(k))) {
    result.slidingScale = true;
    result.summary.push("sliding scale");
  }

  // Accepting new clients
  if (["accepting","available now","available immediately","accepting new"].some(k => lower.includes(k))) {
    result.accepting = true;
  }

  // Age group
  if (["teen","teenager","adolescent","youth","high school"].some(k => lower.includes(k))) result.ageGroup = "Teens";
  else if (["child","children","kid","kids"].some(k => lower.includes(k))) result.ageGroup = "Children";
  else if (["older adult","senior","elderly","aging","seniors"].some(k => lower.includes(k))) result.ageGroup = "Older Adults";
  else if (["couple","couples","partners","marriage"].some(k => lower.includes(k))) result.ageGroup = "Couples";
  else if (["family","families"].some(k => lower.includes(k))) result.ageGroup = "Families";

  return result;
}

/* ═══════════════════════════════════════════
   AI SEARCH FLOW
   ═══════════════════════════════════════════ */
const PROCESSING_MSGS = [
  "Understanding your needs...",
  "Searching across Canada...",
  "Finding therapists near you...",
  "Personalising your results...",
];

function handleAISearch() {
  const input = document.getElementById("ai-input");
  const text = (input ? input.value : "").trim();

  const overlay = document.getElementById("ai-processing-overlay");
  overlay.classList.add("active");

  let msgIdx = 0;
  const msgEl = document.getElementById("processing-msg");
  msgEl.textContent = PROCESSING_MSGS[0];

  const interval = setInterval(() => {
    msgIdx++;
    if (msgIdx < PROCESSING_MSGS.length) {
      msgEl.style.opacity = "0";
      setTimeout(() => {
        msgEl.textContent = PROCESSING_MSGS[msgIdx];
        msgEl.style.opacity = "1";
      }, 200);
    }
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
    overlay.classList.remove("active");
    const parsed = parseAIQuery(text);

    // Apply parsed values to filters
    dirFilters = {
      query: "", city: parsed.city, province: parsed.province,
      specialty: parsed.specialty, issue: "", insurance: "",
      gender: "", cost: "", age: parsed.ageGroup, lang: parsed.lang,
      telehealth: parsed.telehealth, inPerson: false,
      slidingScale: parsed.slidingScale, accepting: parsed.accepting,
    };
    dirPage = 1;
    window._lastAISummary = parsed.summary;
    window._lastAIInput = text;
    showPage("directory");
  }, 2000);
}

function fillExample(text) {
  const el = document.getElementById("ai-input");
  if (el) { el.value = text; el.focus(); }
}

/* ═══════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════ */
let currentPage = "home";
let dirFilters = {
  query: "", city: "", province: "", specialty: "", issue: "",
  insurance: "", gender: "", cost: "", age: "", lang: "",
  telehealth: false, inPerson: false, slidingScale: false, accepting: false,
};
let dirPage = 1;
const PER_PAGE = 12;

/* ═══════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════ */
let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const ICON_SUN = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
const ICON_MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

function applyTheme() {
  document.body.classList.toggle("dark", isDark);
  const html = isDark ? ICON_SUN : ICON_MOON;
  document.getElementById("theme-icon").innerHTML = html;
  const mobileIcon = document.getElementById("theme-icon-mobile");
  if (mobileIcon) mobileIcon.innerHTML = html;
}
function toggleTheme() { isDark = !isDark; applyTheme(); }
applyTheme();

/* ── Mobile nav menu ── */
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  const btn = document.getElementById("hamburger");
  const isOpen = nav.classList.toggle("open");
  btn.classList.toggle("open", isOpen);
}
function closeMenu() {
  document.getElementById("nav-links")?.classList.remove("open");
  document.getElementById("hamburger")?.classList.remove("open");
}

/* ═══════════════════════════════════════════
   PAGE ROUTING
   ═══════════════════════════════════════════ */
function showPage(name, opts = {}) {
  document.getElementById("home-page").style.display = name === "home" ? "block" : "none";
  document.getElementById("dir-page").style.display = name === "directory" ? "block" : "none";
  document.getElementById("profile-page").style.display = name === "profile" ? "block" : "none";
  currentPage = name;
  window.scrollTo(0, 0);
  if (name === "directory") renderDirectory(opts);
  if (name === "profile") renderProfile(opts.id);
}

/* ═══════════════════════════════════════════
   HOME INIT
   ═══════════════════════════════════════════ */
function initHome() {
  const grid = document.getElementById("spec-grid");
  if (!grid) return;
  grid.innerHTML = SPECIALTIES_HERO.map(
    s => `<div class="spec-card" onclick="quickFilter('specialty','${s.label}')">
      <div class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24">${s.icon}</svg></div>
      <div class="spec-title">${s.label}</div>
      <div class="spec-sub">View therapists</div>
    </div>`
  ).join("");
}

function quickFilter(key, val) {
  dirFilters = { ...dirFilters };
  if (key === "specialty") dirFilters.specialty = val;
  if (key === "telehealth") dirFilters.telehealth = true;
  if (key === "slidingScale") dirFilters.slidingScale = true;
  if (key === "lang") dirFilters.lang = val;
  dirPage = 1;
  showPage("directory");
}

/* ═══════════════════════════════════════════
   DIRECTORY FILTERS INIT
   ═══════════════════════════════════════════ */
function initDirectoryFilters() {
  const provinceEl = document.getElementById("f-province");
  PROVINCES.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.code;
    opt.textContent = `${p.name} (${p.code})`;
    provinceEl.appendChild(opt);
  });
  populateSelect("f-specialty", FILTER_OPTIONS.specialties);
  populateSelect("f-issue", FILTER_OPTIONS.issues);
  populateSelect("f-insurance", FILTER_OPTIONS.insurance);
  populateSelect("f-age", FILTER_OPTIONS.ageGroups);
  populateSelect("f-lang", FILTER_OPTIONS.languages);
}

function populateSelect(id, opts) {
  const el = document.getElementById(id);
  opts.forEach(o => {
    const opt = document.createElement("option");
    opt.value = o; opt.textContent = o;
    el.appendChild(opt);
  });
}

function syncFiltersToUI() {
  document.getElementById("f-province").value = dirFilters.province;
  document.getElementById("f-specialty").value = dirFilters.specialty;
  document.getElementById("f-issue").value = dirFilters.issue;
  document.getElementById("f-insurance").value = dirFilters.insurance;
  document.getElementById("f-gender").value = dirFilters.gender;
  document.getElementById("f-cost").value = dirFilters.cost;
  document.getElementById("f-age").value = dirFilters.age;
  document.getElementById("f-lang").value = dirFilters.lang;
  document.getElementById("f-telehealth").checked = dirFilters.telehealth;
  document.getElementById("f-inperson").checked = dirFilters.inPerson;
  document.getElementById("f-sliding").checked = dirFilters.slidingScale;
  document.getElementById("f-accepting").checked = dirFilters.accepting;
  document.getElementById("dir-query").value = dirFilters.query;
  document.getElementById("dir-city").value = dirFilters.city;
}

function applySearch() {
  dirFilters.query = document.getElementById("dir-query").value.trim();
  dirFilters.city = document.getElementById("dir-city").value.trim();
  window._lastAISummary = null;
  dirPage = 1;
  renderResults();
}

function applyFilters() {
  dirFilters.province = document.getElementById("f-province").value;
  dirFilters.specialty = document.getElementById("f-specialty").value;
  dirFilters.issue = document.getElementById("f-issue").value;
  dirFilters.insurance = document.getElementById("f-insurance").value;
  dirFilters.gender = document.getElementById("f-gender").value;
  dirFilters.cost = document.getElementById("f-cost").value;
  dirFilters.age = document.getElementById("f-age").value;
  dirFilters.lang = document.getElementById("f-lang").value;
  dirFilters.telehealth = document.getElementById("f-telehealth").checked;
  dirFilters.inPerson = document.getElementById("f-inperson").checked;
  dirFilters.slidingScale = document.getElementById("f-sliding").checked;
  dirFilters.accepting = document.getElementById("f-accepting").checked;
  dirPage = 1;
  renderResults();
}

function clearFilters() {
  dirFilters = {
    query: "", city: "", province: "", specialty: "", issue: "",
    insurance: "", gender: "", cost: "", age: "", lang: "",
    telehealth: false, inPerson: false, slidingScale: false, accepting: false,
  };
  window._lastAISummary = null;
  syncFiltersToUI();
  dirPage = 1;
  renderResults();
}

/* ═══════════════════════════════════════════
   FILTERING
   ═══════════════════════════════════════════ */
function filterTherapists() {
  return THERAPISTS.filter(t => {
    const q = dirFilters.query.toLowerCase();
    if (q) {
      const searchable = [t.name, t.bio, ...t.specialties, ...t.issues, t.city, t.province].join(" ").toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (dirFilters.city && !t.city.toLowerCase().includes(dirFilters.city.toLowerCase())) return false;
    if (dirFilters.province && t.province !== dirFilters.province) return false;
    if (dirFilters.specialty && !t.specialties.some(s => s.toLowerCase().includes(dirFilters.specialty.toLowerCase()))) return false;
    if (dirFilters.issue && !t.issues.some(i => i.toLowerCase().includes(dirFilters.issue.toLowerCase()))) return false;
    if (dirFilters.insurance) {
      const ins = dirFilters.insurance.toLowerCase();
      if (!t.insurance.some(i => i.toLowerCase().includes(ins) || ins.includes(i.toLowerCase()))) return false;
    }
    if (dirFilters.gender && t.gender !== dirFilters.gender) return false;
    if (dirFilters.cost && t.sessionFeeMin > parseInt(dirFilters.cost)) return false;
    if (dirFilters.age && !t.ageGroups.some(a => a.toLowerCase().includes(dirFilters.age.toLowerCase()))) return false;
    if (dirFilters.lang && !t.languages.some(l => l.toLowerCase().includes(dirFilters.lang.toLowerCase()))) return false;
    if (dirFilters.telehealth && !t.telehealth) return false;
    if (dirFilters.inPerson && !t.inPerson) return false;
    if (dirFilters.slidingScale && !t.slidingScale) return false;
    if (dirFilters.accepting && !t.acceptingClients) return false;
    return true;
  });
}

/* ═══════════════════════════════════════════
   DIRECTORY RENDER
   ═══════════════════════════════════════════ */
function renderDirectory(opts = {}) {
  if (opts.specialty) dirFilters.specialty = opts.specialty;
  if (opts.telehealth) dirFilters.telehealth = true;
  if (opts.slidingScale) dirFilters.slidingScale = true;
  if (opts.lang) dirFilters.lang = opts.lang;
  syncFiltersToUI();
  renderResults();
}

function renderResults() {
  const filtered = filterTherapists();
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (dirPage > totalPages) dirPage = totalPages;
  const slice = filtered.slice((dirPage - 1) * PER_PAGE, dirPage * PER_PAGE);

  document.getElementById("results-count").innerHTML =
    `<strong>${total.toLocaleString()}</strong> therapist${total !== 1 ? "s" : ""} found`;

  // AI match banner
  const banner = document.getElementById("ai-match-banner");
  if (window._lastAISummary && window._lastAISummary.length > 0) {
    const summaryText = window._lastAISummary.join(", ");
    banner.style.display = "flex";
    banner.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      <span><strong>AI matched</strong> results for: <em>${summaryText}</em></span>
      <button onclick="showPage('home')" style="margin-left:auto;background:none;border:none;color:var(--primary);font-size:12px;cursor:pointer;font-weight:600;padding:0">Refine search ↗</button>`;
  } else {
    banner.style.display = "none";
  }

  const chips = [];
  if (dirFilters.specialty) chips.push({ label: dirFilters.specialty, clear: () => { dirFilters.specialty = ""; document.getElementById("f-specialty").value = ""; dirPage = 1; renderResults(); } });
  if (dirFilters.province) {
    const pName = PROVINCES.find(p => p.code === dirFilters.province)?.name || dirFilters.province;
    chips.push({ label: pName, clear: () => { dirFilters.province = ""; document.getElementById("f-province").value = ""; dirPage = 1; renderResults(); } });
  }
  if (dirFilters.city) chips.push({ label: dirFilters.city, clear: () => { dirFilters.city = ""; document.getElementById("dir-city").value = ""; dirPage = 1; renderResults(); } });
  if (dirFilters.insurance) chips.push({ label: dirFilters.insurance, clear: () => { dirFilters.insurance = ""; document.getElementById("f-insurance").value = ""; dirPage = 1; renderResults(); } });
  if (dirFilters.gender) chips.push({ label: dirFilters.gender, clear: () => { dirFilters.gender = ""; document.getElementById("f-gender").value = ""; dirPage = 1; renderResults(); } });
  if (dirFilters.telehealth) chips.push({ label: "Telehealth", clear: () => { dirFilters.telehealth = false; document.getElementById("f-telehealth").checked = false; dirPage = 1; renderResults(); } });
  if (dirFilters.slidingScale) chips.push({ label: "Sliding Scale", clear: () => { dirFilters.slidingScale = false; document.getElementById("f-sliding").checked = false; dirPage = 1; renderResults(); } });
  if (dirFilters.accepting) chips.push({ label: "Accepting Clients", clear: () => { dirFilters.accepting = false; document.getElementById("f-accepting").checked = false; dirPage = 1; renderResults(); } });
  if (dirFilters.lang) chips.push({ label: dirFilters.lang, clear: () => { dirFilters.lang = ""; document.getElementById("f-lang").value = ""; dirPage = 1; renderResults(); } });
  if (dirFilters.age) chips.push({ label: dirFilters.age, clear: () => { dirFilters.age = ""; document.getElementById("f-age").value = ""; dirPage = 1; renderResults(); } });

  document.getElementById("active-chips").innerHTML = chips
    .map((c, i) => `<span class="chip">${c.label} <button onclick="window._clearChip(${i})">×</button></span>`)
    .join("");
  window._clearChipFns = chips.map(c => c.clear);
  window._clearChip = i => window._clearChipFns[i]();

  const activeCount = chips.length + (dirFilters.issue ? 1 : 0) + (dirFilters.cost ? 1 : 0) + (dirFilters.inPerson ? 1 : 0);
  const badge = document.getElementById("filter-badge");
  if (activeCount > 0) { badge.style.display = "inline"; badge.textContent = activeCount; } else badge.style.display = "none";
  document.getElementById("clear-btn").style.display = activeCount > 0 ? "block" : "none";

  const grid = document.getElementById("cards-grid");
  const empty = document.getElementById("empty-state");
  if (slice.length === 0) {
    grid.innerHTML = ""; empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = slice.map(t => cardHTML(t)).join("");
    grid.querySelectorAll(".t-card").forEach(el => {
      el.addEventListener("click", () => showPage("profile", { id: parseInt(el.dataset.id) }));
    });
  }

  const pag = document.getElementById("pagination");
  if (totalPages <= 1) { pag.innerHTML = ""; return; }
  pag.innerHTML = `
    <button onclick="changePage(${dirPage - 1})" ${dirPage === 1 ? "disabled" : ""}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <span>Page ${dirPage} of ${totalPages}</span>
    <button onclick="changePage(${dirPage + 1})" ${dirPage >= totalPages ? "disabled" : ""}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>`;
}

function changePage(n) { dirPage = n; renderResults(); window.scrollTo(0, 140); }

/* ═══════════════════════════════════════════
   CARD HTML
   ═══════════════════════════════════════════ */
function cardHTML(t) {
  return `<div class="t-card" data-id="${t.id}">
    <div class="t-card-head">
      <div class="t-avatar">
        <img src="${t.photo}" alt="${t.name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.displayName)}&background=1e7b70&color=fff&size=120'"/>
        ${t.verified ? `<div class="t-verified"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>` : ""}
      </div>
      <div class="t-info">
        <div class="t-name">${t.name}</div>
        <div class="t-cred">${t.title}</div>
        <div class="t-meta">
          <span class="t-rating">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${t.rating.toFixed(1)} (${t.reviewCount})
          </span>
          <span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${t.city}, ${t.province}
          </span>
        </div>
      </div>
    </div>
    <div class="t-bio">${t.bio}</div>
    <div class="tags">
      ${t.specialties.slice(0, 3).map(s => `<span class="tag">${s}</span>`).join("")}
      ${t.specialties.length > 3 ? `<span class="tag tag-more">+${t.specialties.length - 3}</span>` : ""}
    </div>
    <div class="t-footer">
      <div class="t-badges">
        ${t.telehealth ? `<span class="t-telehealth"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> Telehealth</span>` : ""}
        ${t.slidingScale ? `<span class="t-sliding">$ Sliding scale</span>` : ""}
      </div>
      <div>
        ${t.acceptingClients ? `<span class="t-accepting">Accepting clients</span>` : `<span class="t-waitlist">Waitlist</span>`}
        &middot; $${t.sessionFeeMin}–$${t.sessionFeeMax}
      </div>
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════
   MOBILE SIDEBAR
   ═══════════════════════════════════════════ */
function openSidebar() {
  document.getElementById("dir-sidebar").classList.add("open");
  document.getElementById("sidebar-overlay").classList.add("open");
}
function closeSidebar() {
  document.getElementById("dir-sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").classList.remove("open");
}

/* ═══════════════════════════════════════════
   PROFILE PAGE
   ═══════════════════════════════════════════ */
function renderProfile(id) {
  const t = THERAPISTS.find(x => x.id === id);
  if (!t) { document.getElementById("profile-main").innerHTML = "<p style='color:var(--text2)'>Therapist not found.</p>"; return; }
  const stars = Array.from({ length: 5 }).map((_, i) =>
    `<svg width="16" height="16" viewBox="0 0 24 24" ${i < Math.round(t.rating) ? 'fill="#f59e0b" stroke="#f59e0b"' : 'fill="none" stroke="#d1d5db"'} stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  ).join("");

  document.getElementById("profile-main").innerHTML = `
    <nav class="breadcrumb">
      <a onclick="showPage('home')">Home</a><span>/</span>
      <a onclick="showPage('directory')">Find a Therapist</a><span>/</span>
      <span>${t.displayName}</span>
    </nav>
    <div class="p-hero">
      <div class="p-hero-inner">
        <div class="p-avatar">
          <img src="${t.photo}" alt="${t.name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.displayName)}&background=1e7b70&color=fff&size=180'"/>
          ${t.verified ? `<div class="p-verified"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>` : ""}
        </div>
        <div class="p-details">
          <div class="p-name-row">
            <div><div class="p-name">${t.name}</div><div class="p-cred">${t.title}</div></div>
            ${t.acceptingClients
              ? `<span class="badge-sm badge-accepting"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Accepting Clients</span>`
              : `<span class="badge-sm badge-waitlist">Waitlist Only</span>`}
          </div>
          <div class="p-meta">
            <span class="p-stars">${stars}</span>
            <span style="font-weight:600;color:var(--text)">${t.rating.toFixed(1)}</span>
            <span style="color:var(--text3)">(${t.reviewCount} reviews)</span>
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${t.city}, ${t.province}</span>
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${t.yearsExperience} yrs experience</span>
          </div>
          <div class="p-session-badges">
            ${t.telehealth ? `<span class="badge-sm"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> Telehealth</span>` : ""}
            ${t.inPerson ? `<span class="badge-sm"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> In Person</span>` : ""}
            ${t.slidingScale ? `<span class="badge-sm badge-green">$ Sliding Scale</span>` : ""}
          </div>
        </div>
      </div>
    </div>
    <div class="section-card"><h2>About ${t.displayName.split(" ")[0]}</h2><p>${t.bio}</p></div>
    <div class="section-card"><h2>Specialties</h2><div class="pill-list">${t.specialties.map(s => `<span class="pill pill-primary">${s}</span>`).join("")}</div></div>
    <div class="section-card"><h2>Issues Addressed</h2><div class="pill-list">${t.issues.map(i => `<span class="pill">${i}</span>`).join("")}</div></div>
    <div class="section-card"><h2>Treatment Approaches</h2><div class="pill-list">${t.approaches.map(a => `<span class="pill">${a}</span>`).join("")}</div></div>`;

  document.getElementById("profile-sidebar").innerHTML = `
    <div class="contact-card">
      <div class="fee-big">$${t.sessionFeeMin}–$${t.sessionFeeMax}</div>
      <div class="fee-sub">per session (CAD)</div>
      ${t.slidingScale ? `<div class="fee-sliding"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Sliding scale available</div>` : ""}
      <hr class="contact-divider"/>
      ${t.phone ? `<a href="tel:${t.phone}" class="contact-link"><div class="contact-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>${t.phone}</a>` : ""}
      ${t.website ? `<a href="${t.website}" target="_blank" rel="noopener noreferrer" class="contact-link"><div class="contact-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>Visit website</a>` : ""}
      <button class="contact-btn">Contact ${t.displayName.split(" ")[0]}</button>
      <div class="contact-note">Response typically within 24–48 hours</div>
    </div>
    <div class="contact-card" style="margin-top:16px">
      <div class="detail-block"><div class="detail-label">Insurance / Benefits</div><div class="detail-pills">${t.insurance.map(i => `<span class="pill">${i}</span>`).join("")}</div></div>
      <div class="detail-block"><div class="detail-label">Registered In</div><div class="detail-pills">${t.licensedIn.map(l => `<span class="pill">${l}</span>`).join("")}</div></div>
      <div class="detail-block"><div class="detail-label">Works With</div><div class="detail-pills">${t.ageGroups.map(a => `<span class="pill">${a}</span>`).join("")}</div></div>
      <div class="detail-block"><div class="detail-label">Languages</div><div style="font-size:13px;color:var(--text2)">${t.languages.join(", ")}</div></div>
      <div class="detail-block" style="margin-bottom:0"><div class="detail-label">Gender</div><div style="font-size:13px;color:var(--text2);text-transform:capitalize">${t.gender}</div></div>
    </div>
    <button class="btn btn-outline" style="width:100%;margin-top:12px" onclick="showPage('directory')">← Back to Directory</button>`;
}

/* ═══════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════ */
initHome();
initDirectoryFilters();
showPage("home");
