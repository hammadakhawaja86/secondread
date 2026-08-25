/* ---------------------------------------------------------------------------
   SecondRead — consultant roster (single source of truth)

   Previously this roster was duplicated in three files with three different
   shapes, which is why every "View profile" link pointed at the same person.
   index.html, Specialists.dc.html and Specialist Profile.dc.html all read from
   here now, so a consultant is added, edited or removed in exactly one place.

   FIELDS
     id           slug used in the profile URL: Specialist Profile.dc.html?id=<id>
     photo        path under portraits/, or null to fall back to an initials tile
     featured     true = appears in the landing-page carousel (photo required)
     areas        body-area filter ids, must match AREAS in Specialists.dc.html
     modalities   modality filter labels
     background   long-form prose for the profile page; omit if not supplied
     review       verified patient quote; omit unless the review is genuinely on file

   CONTENT STATUS — for the client, before launch:
     · Every `gmc` below is the placeholder 7012345. Replace with the real
       registration for each consultant, or remove the field entirely. A wrong
       GMC number next to a named doctor is worse than no number at all.
     · `hospital`, `role` and `quals` are carried over from the original handoff
       and have not been verified against each consultant's own listing.
     · Only Dr Mallon carries a `review`, inherited from the first concept and
       itself unverified. No review has been invented for anyone else.
     · Four consultants have no headshot and render an initials tile until one
       is supplied.
--------------------------------------------------------------------------- */
(function (root) {
  var CONSULTANTS = [
    {
      id: 'alsanjari', name: 'Senan Alsanjari', initials: 'SA',
      role: 'Consultant cardiothoracic radiologist',
      hospital: 'NHNN',
      quals: 'FRCR · Level III cardiac MRI & CT · NHNN',
      gmc: '7012345',
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
      gmc: '7012345',
      photo: 'portraits/dermot-mallon.jpg', featured: true,
      areas: ['brain'], modalities: ['MRI', 'CT'],
      tags: ['Brain MRI', 'Spine', 'Stroke'],
      bio: 'Advanced stroke imaging, vasculitis, neurodegeneration and skull-base disorders. PhD, Cambridge.',
      credentials: ['FRCR', 'PhD Cambridge', 'Reports since 2019'],
      intro: 'Consultant at the National Hospital for Neurology and Neurosurgery, UCLH. Reads brain, spine and skull-base imaging every working day.',
      background: [
        'Biochemistry and medicine at Bristol, PhD at Cambridge, then joint academic and clinical radiology training at Imperial College Healthcare, including an Academic Clinical Fellowship and a Clinical Lectureship at Imperial College London.',
        'Now a substantive consultant neuroradiologist at NHNN, part of UCLH — one of the largest neurological referral centres in Europe.'
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
        quote: 'The report I received from Dr Mallon was exceptional — clear understanding and the information I needed.',
        source: 'Verified patient · spine MRI'
      },
      availability: 'Available today', rank: 0
    },
    {
      id: 'rajakulasingam', name: 'Ramanan Rajakulasingam', initials: 'RR',
      role: 'Musculoskeletal and sarcoma radiologist',
      hospital: 'RNOH Stanmore',
      quals: 'FRCR · RNOH Stanmore',
      gmc: '7012345',
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
      id: 'taufik', name: 'Hebah Taufik', initials: 'HT',
      role: 'Consultant breast radiologist',
      hospital: 'London',
      quals: 'FRCR · Screening and diagnostic imaging',
      gmc: '7012345',
      photo: 'portraits/hebah-taufik.jpg', featured: true,
      areas: ['breast'], modalities: ['MRI', 'Ultrasound'],
      tags: ['Breast MRI', 'Mammography', 'Ultrasound'],
      bio: 'Breast MRI, mammography and ultrasound. Screening and diagnostic imaging.',
      credentials: ['FRCR', 'Screening and diagnostic imaging'],
      helpWith: [
        'Screening recall findings',
        'Breast MRI interpretation',
        'Dense-tissue mammography',
        'Ultrasound-detected lumps',
        'Post-surgical breast imaging',
        'Family-history surveillance'
      ],
      availability: 'Available today', rank: 0
    },
    {
      id: 'tamimi', name: 'Asad Tamimi', initials: 'AT',
      role: 'Gastrointestinal and abdominal radiologist',
      hospital: 'Imperial',
      quals: 'FRCR · Imperial College',
      gmc: '7012345',
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
      id: 'bhatnagar', name: 'Gauraang Bhatnagar', initials: 'GB',
      role: 'Gastrointestinal and oncological radiologist',
      hospital: 'London',
      quals: 'FRCR · Oncological staging',
      gmc: '7012345',
      photo: 'portraits/gauraang-bhatnagar.jpg', featured: true,
      areas: ['abdomen'], modalities: ['CT', 'MRI', 'PET-CT'],
      tags: ['Bowel', 'Liver', 'Staging'],
      bio: 'Gastrointestinal and oncological imaging, including small-bowel MRI and staging CT.',
      credentials: ['FRCR', 'Oncological staging'],
      helpWith: [
        'Small-bowel MRI',
        'Inflammatory bowel disease',
        'Oncological staging and response',
        'Liver and pancreatic findings',
        'Post-treatment surveillance',
        'Second look at an abdominal CT'
      ],
      availability: 'Next slot tomorrow', rank: 1
    },
    {
      id: 'kakar', name: 'Geetanjali Kakar', initials: 'GK',
      role: 'Consultant gynaecological radiologist',
      hospital: 'Imperial',
      quals: 'FRCR · Imperial College',
      gmc: '7012345',
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
      role: 'Head & neck and neuroradiology',
      hospital: 'King’s College Hospital',
      quals: 'FRCR · Head & neck imaging',
      gmc: '7012345',
      photo: null, featured: false,
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
      role: 'Paediatric neuroradiologist',
      hospital: 'Great Ormond Street',
      quals: 'FRCR · Paediatric neuroradiology',
      gmc: '7012345',
      photo: null, featured: false,
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
      id: 'okoye', name: 'Chidi Okoye', initials: 'CO',
      role: 'Musculoskeletal radiologist',
      hospital: 'Nuffield Orthopaedic Centre',
      quals: 'FRCR · Musculoskeletal imaging',
      gmc: '7012345',
      photo: null, featured: false,
      areas: ['bones'], modalities: ['MRI', 'CT'],
      tags: ['Spine', 'Shoulder', 'Knee'],
      bio: 'Degenerative spine, sports injury and post-operative joint imaging.',
      credentials: ['FRCR', 'Musculoskeletal imaging'],
      helpWith: [
        'Degenerative spine MRI',
        'Shoulder and rotator cuff',
        'Knee ligament and meniscus',
        'Sports injury imaging',
        'Post-operative joint review',
        'Persistent back pain'
      ],
      availability: 'Next slot tomorrow', rank: 1
    },
    {
      id: 'shah', name: 'Priya Shah', initials: 'PS',
      role: 'Uroradiologist',
      hospital: 'Guy’s and St Thomas’',
      quals: 'FRCR · Multiparametric prostate MRI',
      gmc: '7012345',
      photo: null, featured: false,
      areas: ['abdomen'], modalities: ['MRI', 'CT', 'Ultrasound'],
      tags: ['Kidney', 'Bladder', 'Prostate MRI'],
      bio: 'Kidney, bladder and prostate imaging, including multiparametric prostate MRI.',
      credentials: ['FRCR', 'Multiparametric prostate MRI'],
      helpWith: [
        'Multiparametric prostate MRI',
        'Kidney lesions and cysts',
        'Bladder imaging',
        'Raised PSA with a normal scan',
        'Post-treatment urology imaging',
        'Second look at a renal CT'
      ],
      availability: 'Available today', rank: 0
    }
  ];

  var byId = {};
  CONSULTANTS.forEach(function (c) { byId[c.id] = c; });

  root.CONSULTANTS = CONSULTANTS;
  root.CONSULTANT_BY_ID = byId;
  root.FEATURED_CONSULTANTS = CONSULTANTS.filter(function (c) { return c.featured; });

  // Surname only — used for CTA labels like "Request Dr Mallon".
  root.consultantSurname = function (c) { return c.name.split(' ').slice(-1)[0]; };
})(window);
