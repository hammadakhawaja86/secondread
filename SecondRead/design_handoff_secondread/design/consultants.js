/* ---------------------------------------------------------------------------
   Second Opinion Radiology, radiologist roster (single source of truth)

   Previously this roster was duplicated in three files with three different
   shapes, which is why every "View profile" link pointed at the same person.
   index.html, Specialists.dc.html and Specialist Profile.dc.html all read from
   here now, so a radiologist is added, edited or removed in exactly one place.

   FIELDS
     id           slug used in the profile URL: Specialist Profile.dc.html?id=<id>
     photo        path under portraits/, or null to fall back to an initials tile
     featured     true = appears in the landing-page carousel (photo required)
     areas        body-area filter ids, must match AREAS in Specialists.dc.html
     modalities   modality filter labels
     background   long-form prose for the profile page; omit if not supplied
     review       verified patient quote; omit unless the review is genuinely on file

   CONTENT STATUS, for the client, before launch:
     · GMC numbers were supplied by the client on 2026-10-07, sourced from the
       GMC register (gmc-uk.org/registration-and-licensing/our-registers).
       They have not been re-checked against the register here. A wrong GMC
       number next to a named doctor is worse than no number at all.
     · `hospital`, `role` and `quals` are carried over from the original handoff
       and have not been verified against each radiologist's own listing.
     · Only Dr Mallon carries a `review`, inherited from the first concept and
       itself unverified. No review has been invented for anyone else.
     · Dr Sivarasan, Dr Weston, Dr Withey and Dr Forster were supplied by the
       client as Figma profiles, so their prose is theirs. Their headshots are
       NOT: three of the four source layers are named "ChatGPT Image", i.e.
       they are generated portraits standing in for real named doctors.
       Replace them with real photographs before any client-facing use.
     · No radiologist currently covers breast imaging. The Breast body area is
       still offered in the pickers and falls back to "your subspecialist is assigned", so add a
       breast radiologist here or drop the area.
--------------------------------------------------------------------------- */
(function (root) {
  var CONSULTANTS = [
    {
      id: 'alsanjari', name: 'Senan Alsanjari', initials: 'SA',
      role: 'Consultant cardiothoracic radiologist',
      hospital: 'NHNN',
      quals: 'FRCR · Level III cardiac MRI & CT · NHNN',
      gmc: '7486030',
      photo: 'portraits/senan-alsanjari.jpg', featured: true,
      areas: ['chest'], modalities: ['CT', 'PET-CT', 'MRI'],
      tags: ['Heart', 'Chest CT', 'PET-CT'],
      bio: 'Heart, chest and PET-CT imaging. Level III accredited cardiac MRI and CT.',
      credentials: ['FRCR', 'Level III cardiac MRI & CT'],
      helpWith: [
        'Unclear cardiac MRI findings',
        'Chest CT nodules and staging',
        'PET-CT response assessment',
        'Coronary CT angiography',
        'Suspected cardiomyopathy',
        'Post-treatment chest imaging'
      ],
      availability: 'Available today', rank: 0
    },
    {
      id: 'mallon', name: 'Dermot Mallon', initials: 'DM',
      role: 'Consultant neuroradiologist',
      hospital: 'NHNN, UCLH',
      quals: 'FRCR · PhD Cambridge · UCLH',
      gmc: '7042054',
      photo: 'portraits/dermot-mallon.jpg', featured: true,
      areas: ['brain'], modalities: ['MRI', 'CT'],
      tags: ['Brain MRI', 'Spine', 'Stroke'],
      bio: 'Advanced stroke imaging, vasculitis, neurodegeneration and skull-base disorders. PhD, Cambridge.',
      credentials: ['FRCR', 'PhD Cambridge', 'Reports since 2019'],
      intro: 'Consultant radiologist at the National Hospital for Neurology and Neurosurgery, UCLH. Reads brain, spine and skull-base imaging every working day.',
      background: [
        'Biochemistry and medicine at Bristol, PhD at Cambridge, then joint academic and clinical radiology training at Imperial College Healthcare, including an Academic Clinical Fellowship and a Clinical Lectureship at Imperial College London.',
        'Now a substantive neuroradiologist at NHNN, part of UCLH, one of the largest neurological referral centres in Europe.'
      ],
      helpWith: [
        'Unclear brain MRI findings',
        'Suspected MS or inflammation',
        'Stroke and vascular imaging',
        'Spinal cord and nerve-root pain',
        'Memory and neurodegeneration',
        'Skull-base and pituitary lesions'
      ],
      review: {
        quote: 'The report I received from Dr Mallon was exceptional, clear understanding and the information I needed.',
        source: 'Verified patient · spine MRI'
      },
      availability: 'Available today', rank: 0
    },
    {
      id: 'rajakulasingam', name: 'Ramanan Rajakulasingam', initials: 'RR',
      role: 'Consultant musculoskeletal and sarcoma radiologist',
      hospital: 'RNOH Stanmore',
      quals: 'FRCR · RNOH Stanmore',
      gmc: '7134655',
      photo: 'portraits/ramanan-rajakulasingam.jpg', featured: true,
      areas: ['bones'], modalities: ['MRI', 'CT', 'Ultrasound'],
      tags: ['Joints', 'Sarcoma', 'Sports injury'],
      bio: 'Bones, joints and soft tissue. Sarcoma and complex orthopaedic imaging.',
      credentials: ['FRCR', 'Sarcoma imaging'],
      helpWith: [
        'Unexplained joint pain',
        'Suspected soft-tissue sarcoma',
        'Sports and tendon injury',
        'Post-operative joint imaging',
        'Bone lesions of uncertain cause',
        'Complex orthopaedic follow-up'
      ],
      availability: '', rank: 2
    },
    {
      id: 'tamimi', name: 'Asad Tamimi', initials: 'AT',
      role: 'Consultant gastrointestinal and abdominal radiologist',
      hospital: 'Imperial',
      quals: 'FRCR · Imperial College',
      gmc: '7411645',
      photo: 'portraits/asad-tamimi.jpg', featured: true,
      areas: ['abdomen', 'chest'], modalities: ['CT', 'MRI', 'PET-CT'],
      tags: ['Liver', 'Bowel', 'Prostate'],
      bio: 'Liver, bowel, prostate and post-surgical imaging. Oncological staging.',
      credentials: ['FRCR', 'Oncological staging'],
      helpWith: [
        'Liver lesions of uncertain cause',
        'Bowel and Crohn’s imaging',
        'Oncological staging CT',
        'Post-surgical abdominal imaging',
        'Pancreatic and biliary findings',
        'Prostate MRI'
      ],
      availability: '', rank: 3
    },
    {
      id: 'kakar', name: 'Geetanjali Kakar', initials: 'GK',
      role: 'Consultant gynaecological radiologist',
      hospital: 'Imperial',
      quals: 'FRCR · Imperial College',
      gmc: '7517214',
      photo: 'portraits/geetanjali-kakar.jpg', featured: true,
      areas: ['abdomen'], modalities: ['MRI', 'Ultrasound'],
      tags: ['Pelvic MRI', 'Endometriosis', 'Ultrasound'],
      bio: 'Pelvic MRI and ultrasound. Endometriosis and gynaecological oncology.',
      credentials: ['FRCR', 'Gynaecological oncology'],
      helpWith: [
        'Suspected endometriosis',
        'Pelvic pain of uncertain cause',
        'Ovarian cyst characterisation',
        'Fibroid mapping before surgery',
        'Gynaecological staging MRI',
        'Pelvic ultrasound review'
      ],
      availability: 'Next slot tomorrow', rank: 1
    },

    /* --- No headshot supplied yet: these render an initials tile and are kept
           out of the landing-page carousel. Drop a file into portraits/ and set
           `photo` + `featured` to bring one forward. --- */
    {
      id: 'wassati', name: 'Husam Wassati', initials: 'HW',
      role: 'Consultant head & neck neuroradiology',
      hospital: 'King’s College Hospital',
      quals: 'FRCR · Head & neck imaging',
      gmc: '7251947',
      photo: 'portraits/husam-wassati.jpg', featured: true,
      areas: ['brain', 'headneck'], modalities: ['MRI', 'CT', 'Ultrasound'],
      tags: ['Neck', 'Thyroid', 'Skull base'],
      bio: 'Orbital and ENT imaging, skull base, thyroid and salivary gland disease.',
      credentials: ['FRCR', 'Head & neck imaging'],
      helpWith: [
        'Thyroid and neck lumps',
        'Salivary gland disease',
        'Orbital and ENT imaging',
        'Skull-base findings',
        'Head & neck staging',
        'Post-treatment neck imaging'
      ],
      availability: 'Next slot tomorrow', rank: 1
    },
    {
      id: 'darco', name: 'Felice D’Arco', initials: 'FD',
      role: 'Consultant paediatric neuroradiologist',
      hospital: 'Great Ormond Street',
      quals: 'FRCR · Paediatric neuroradiology',
      gmc: '7509440',
      photo: 'portraits/felice-darco.jpg', featured: true,
      areas: ['brain', 'children', 'headneck'], modalities: ['MRI'],
      tags: ['Children', 'Inner ear', 'Epilepsy'],
      bio: 'Children’s brain, inner ear and head & neck imaging. Paediatric epilepsy.',
      credentials: ['FRCR', 'Paediatric neuroradiology'],
      helpWith: [
        'Children’s brain MRI',
        'Paediatric epilepsy imaging',
        'Inner-ear and hearing loss',
        'Developmental brain findings',
        'Paediatric head & neck masses',
        'Second opinion on a child’s scan'
      ],
      availability: '', rank: 2
    },
    {
      id: 'sivarasan', name: 'Nishanth Sivarasan', initials: 'NS',
      role: 'Consultant cardiothoracic radiologist',
      hospital: 'Guy’s and St Thomas’',
      quals: 'FRCR · MD(Res) Imperial · Guy’s and St Thomas’',
      gmc: '7419365',
      photo: 'portraits/nishanth-sivarasan.jpg', featured: true,
      areas: ['chest'], modalities: ['CT', 'PET-CT', 'MRI'],
      tags: ['Lung cancer', 'Interstitial lung disease', 'Airways'],
      bio: 'Interstitial lung disease, lung cancer and advanced airways disease. National Treasure Fellow in thoracic radiology at Royal Brompton.',
      credentials: ['FRCR', 'MD(Res) Imperial', 'Thoracic fellowship, Royal Brompton'],
      intro: 'Consultant cardiothoracic radiologist at Guy’s and St Thomas’, and Responsible Radiologist for the South East London Lung Cancer Screening Programme.',
      background: [
        'Graduated from Imperial College London in 2013 as an academic award winner and trained in radiology at Guy’s and St Thomas’, achieving Fellowship of the Royal College of Radiologists in 2018.',
        'Completed higher specialist training in thoracic radiology as the National Treasure Fellow at Royal Brompton Hospital from 2019 to 2021, and was awarded an MD(Res) from Imperial College London for research into CT morphological phenotypes in pulmonary sarcoidosis.',
        'Lectures nationally and internationally on thoracic imaging. Responsible Radiologist for the South East London Lung Cancer Screening Programme, Lead Radiologist for the Accelerating Lung Cancer Diagnosis Through AI-Guided Robotic Navigation Bronchoscopy project, and Independent Clinician and Study Oversight Committee member for the MEDLEY trial.'
      ],
      helpWith: [
        'Interstitial lung disease',
        'Lung nodules and lung cancer',
        'Advanced airways disease',
        'Pulmonary sarcoidosis',
        'Lung cancer screening findings',
        'Post-treatment chest imaging'
      ],
      availability: '', rank: 2
    },
    {
      id: 'weston', name: 'William Weston', initials: 'WW',
      role: 'Consultant gastrointestinal radiologist',
      hospital: 'The Royal Marsden',
      quals: 'GI fellowship, St Mark’s · The Royal Marsden',
      gmc: '7492405',
      photo: 'portraits/william-weston.jpg', featured: true,
      areas: ['abdomen'], modalities: ['CT', 'MRI'],
      tags: ['Bowel', 'Liver & pancreas', 'Neuroendocrine'],
      bio: 'Bowel, liver, pancreatic and biliary imaging, including neuroendocrine tumours. Benign and malignant gastrointestinal disease.',
      credentials: ['GI fellowship, St Mark’s', 'PG qualification in clinical education'],
      intro: 'Consultant radiologist at The Royal Marsden with broad expertise in gastrointestinal and abdominal imaging.',
      background: [
        'Trained in radiology across several London teaching hospitals, including Guy’s and St Thomas’ and University College London Hospital, before completing a specialist fellowship in gastrointestinal imaging at St Mark’s Hospital.',
        'Practice covers both benign and malignant gastrointestinal conditions, with particular interests in bowel, liver, pancreatic and biliary imaging as well as neuroendocrine tumours. Working at a high-volume specialist centre, he has extensive experience in CT and MRI for diagnosis, treatment planning, response assessment and follow-up.',
        'Also involved in research and medical education, and holds a postgraduate qualification in clinical education.'
      ],
      helpWith: [
        'Bowel CT and MRI',
        'Liver lesions',
        'Pancreatic and biliary imaging',
        'Neuroendocrine tumours',
        'Treatment response assessment',
        'Surveillance and follow-up scans'
      ],
      availability: '', rank: 2
    },
    {
      id: 'withey', name: 'Sam Withey', initials: 'SW',
      role: 'Consultant uroradiologist',
      hospital: 'The Royal Marsden',
      quals: 'President-Elect, BSUR · The Royal Marsden',
      gmc: '7419265',
      photo: 'portraits/sam-withey.jpg', featured: true,
      areas: ['abdomen'], modalities: ['MRI', 'CT', 'Ultrasound'],
      tags: ['Prostate MRI', 'Kidney', 'Bladder'],
      bio: 'Prostate, kidney and bladder imaging, including PI-RADS scoring, biopsy planning, staging and post-treatment assessment.',
      credentials: ['President-Elect, BSUR', 'Prostate MRI and PI-RADS'],
      intro: 'Consultant uroradiologist at The Royal Marsden, one of the world’s leading cancer centres, specialising in prostate, kidney and bladder imaging.',
      background: [
        'Trained in medicine at Imperial College London before undertaking radiology training at Guy’s and St Thomas’ and University College London Hospitals, where he developed subspecialist experience in urological and oncological imaging.',
        'Clinical practice is focused particularly on prostate MRI, screening, lesion identification and PI-RADS scoring, biopsy planning, staging and treatment planning, and assessment following treatment. Wider practice includes renal and bladder imaging, general oncological imaging, and whole-body MRI for advanced malignancy, cancer screening and preventative health assessment.',
        'An active academic interest in prostate cancer imaging spans the pathway from diagnosis to treatment response assessment, with extensive publication in urological and oncological imaging and contributions to major international research and consensus work. President-Elect of the British Society of Urogenital Radiology, an active member of the European Society of Urogenital Radiology working groups for prostate, bladder and renal imaging, and a former member of the Prostate Cancer UK Research Advisory Committee. He teaches regularly on specialist prostate MRI courses in the UK and Europe.'
      ],
      helpWith: [
        'Multiparametric prostate MRI',
        'PI-RADS scoring and biopsy planning',
        'Kidney lesions and cysts',
        'Bladder imaging',
        'Post-treatment urology imaging',
        'Whole-body MRI screening'
      ],
      availability: '', rank: 2
    },
    {
      id: 'forster', name: 'Danielle Forster', initials: 'DF',
      role: 'Consultant musculoskeletal radiologist',
      hospital: 'Royal National Orthopaedic Hospital',
      quals: 'MSK fellowship, RNOH · UCLH training',
      gmc: '7277408',
      photo: 'portraits/danielle-forster.jpg', featured: true,
      areas: ['bones'], modalities: ['MRI', 'CT', 'Ultrasound'],
      tags: ['Joints', 'Spine', 'Image-guided'],
      bio: 'Musculoskeletal imaging and image-guided procedures, at one of the UK’s leading specialist orthopaedic centres.',
      credentials: ['MSK fellowship, RNOH', 'Musculoskeletal radiology'],
      intro: 'Consultant musculoskeletal radiologist at the Royal National Orthopaedic Hospital, Stanmore.',
      background: [
        'Qualified in medicine from the University of Glasgow and undertook specialist radiology training in London, completing subspecialty training in musculoskeletal radiology at University College London Hospital.',
        'Subsequently undertook a fellowship at the Royal National Orthopaedic Hospital, one of the UK’s leading specialist orthopaedic centres, before being appointed there as a musculoskeletal radiologist.',
        'Clinical practice encompasses a broad range of musculoskeletal imaging and image-guided procedures. Alongside the clinical work, a strong academic interest in musculoskeletal radiology, with research published in peer-reviewed medical journals, contributions to specialist radiology textbooks, and work presented at national and international scientific meetings.'
      ],
      helpWith: [
        'Joint MRI findings',
        'Spine imaging',
        'Sports and soft-tissue injury',
        'Post-operative joint review',
        'Bone lesions',
        'Image-guided procedures'
      ],
      availability: '', rank: 2
    },
    {
      id: 'naik', name: 'Mitesh Naik', initials: 'MN',
      role: 'Consultant radiologist in nuclear medicine',
      hospital: 'Imperial College Healthcare',
      quals: 'PET/CT, SPECT/CT · Imperial College Healthcare',
      gmc: '7419275',
      photo: 'portraits/mitesh-naik.jpg', featured: true,
      areas: ['chest', 'abdomen'], modalities: ['CT', 'PET-CT', 'MRI', 'Ultrasound'],
      tags: ['PET-CT', 'Whole-body imaging', 'Cardiac'],
      bio: 'Nuclear medicine, whole-body and oncological imaging across the thorax, abdomen and pelvis. PET/CT, SPECT/CT and radioligand therapy.',
      credentials: ['Imperial College London', 'RCR and RSNA prizes', 'NICE, RSNA and EANM committees'],
      intro: 'Consultant radiologist at Imperial College Healthcare NHS Trust, with particular expertise in nuclear medicine and whole-body oncological imaging.',
      background: [
        'Graduated from Imperial College London with triple distinction, and was the highest scoring student for both his undergraduate BSc and postgraduate MSc.',
        'Awarded numerous prizes for scientific presentations and peer-reviewed publications, including from the Royal College of Radiologists and the Radiological Society of North America.',
        'A wide-ranging skillset with particular expertise in nuclear medicine, including PET/CT, SPECT/CT and radioligand therapy, DEXA, whole-body and oncological imaging covering the entire thorax, abdomen and pelvis (CT, MR, x-ray and ultrasound), emergency imaging and cardiac imaging. A key member of a number of specialist cancer and non-cancer multidisciplinary team meetings.',
        'Holds a variety of roles encompassing radiation safety, training, and sharing learning from errors, alongside national and international society committee positions with NICE, RSNA and EANM. A recognised educator who speaks regularly at international meetings.',
        'Focuses on delivering accurate, comprehensive, timely and patient-centred care.'
      ],
      helpWith: [
        'PET-CT staging and response',
        'Whole-body oncological imaging',
        'Chest, abdomen and pelvis CT',
        'SPECT-CT and nuclear medicine',
        'Cardiac imaging',
        'A second look at an emergency scan'
      ],
      availability: '', rank: 2
    }
  ];

  var byId = {};
  CONSULTANTS.forEach(function (c) { byId[c.id] = c; });

  root.CONSULTANTS = CONSULTANTS;
  root.CONSULTANT_BY_ID = byId;
  root.FEATURED_CONSULTANTS = CONSULTANTS.filter(function (c) { return c.featured; });

  // Surname only, used for CTA labels like "Request Dr Mallon".
  root.consultantSurname = function (c) { return c.name.split(' ').slice(-1)[0]; };
})(window);
