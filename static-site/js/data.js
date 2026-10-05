/* GovGuide India — data layer (plain JavaScript).
   Icon names refer to Lucide icon ids. */
const commonPayments = ["UPI", "Net Banking", "Debit / Credit Card", "Cash at centre"];

const services = [
    {
        slug: "aadhaar",
        name: "Aadhaar",
        category: "Identity",
        icon: "fingerprint",
        tagline: "Enrol, update and download your Aadhaar",
        description: "Update address, mobile number, name or download your e-Aadhaar in minutes.",
        mode: "Online & Offline",
        estimatedTime: "15 min",
        fee: "₹75",
        feeAmount: 75,
        serviceCharge: "₹75 online · ₹75 at CSC",
        processingTime: "7–30 days for updates",
        paymentMethods: commonPayments,
        ministry: "UIDAI, Ministry of Electronics & IT",
        portal: "https://uidai.gov.in",
        portalName: "UIDAI",
        videoUrl: "https://www.youtube.com/embed/H-m4IoMrkTI",
        pdf: "pdfs/aadhaar-guide.pdf",
        states: ["All India"],
        overview:
            "Aadhaar is a 12-digit identity number issued by UIDAI. Most updates — address, email, mobile linking and e-Aadhaar download — can be completed on the myAadhaar portal. Biometric changes still need a visit to an enrolment centre.",
        eligibility: [
            "Any resident of India, including infants",
            "Registered mobile number required for OTP-based online updates",
            "Original documents needed for biometric or demographic changes at a centre",
        ],
        documents: [
            {
                name: "Aadhaar number or Enrolment ID",
                formats: "12-digit number / 28-digit EID",
                note: "Needed to log in to myAadhaar.",
            },
            {
                name: "Registered mobile number",
                formats: "SMS OTP",
                note: "OTP is the only accepted login method online.",
            },
            {
                name: "Address proof",
                formats: "PDF / JPG, under 2 MB",
                note: "Electricity bill, passbook, rent agreement or passport.",
            },
            {
                name: "Passport-size photo",
                formats: "JPG, 3.5 × 4.5 cm",
                note: "Only required for fresh enrolment at a centre.",
            },
        ],
        steps: [
            {
                title: "Open the myAadhaar portal",
                description:
                    "Go to myaadhaar.uidai.gov.in and select Login. Enter your 12-digit Aadhaar number and the captcha shown on screen.",
                image: "images/tutorials/aadhaar/step-1.png",
                tip: "Bookmark the official portal — search results often show look-alike sites.",
            },
            {
                title: "Verify with OTP",
                description:
                    "A six-digit OTP is sent to the mobile number linked with your Aadhaar. Enter it to sign in to your dashboard.",
                image: "images/tutorials/aadhaar/step-2.png",
                warning: "If your mobile number is not linked, OTP login will not work — visit a centre instead.",
            },
            {
                title: "Choose the update type",
                description:
                    "Select Update Aadhaar and choose the field you want to change: address, name, date of birth, gender or language.",
                image: "images/tutorials/aadhaar/step-3.png",
                note: "Name and date of birth can only be updated a limited number of times in a lifetime.",
            },
            {
                title: "Upload supporting documents",
                description:
                    "Upload a clear scan of your proof document. Files must be under 2 MB in JPG, PNG or PDF format.",
                image: "images/tutorials/aadhaar/step-4.png",
                tip: "Photograph documents in daylight on a flat surface — blurred corners are the top rejection reason.",
            },
            {
                title: "Pay the update fee",
                description:
                    "Pay ₹50 for a demographic update using UPI, card or net banking. A receipt with your URN is generated instantly.",
                image: "images/tutorials/aadhaar/step-5.png",
            },
            {
                title: "Track your request",
                description:
                    "Use the Update Request Number (URN) on the Check Status page. Once approved, download the fresh e-Aadhaar PDF.",
                image: "images/tutorials/aadhaar/step-6.png",       
                note: "The e-Aadhaar PDF password is the first 4 letters of your name in capitals plus your birth year.",
            },
        ],
        mistakes: [
            "Uploading a document where the address does not exactly match what you typed",
            "Using an unregistered mobile number and expecting an OTP",
            "Losing the URN receipt, which makes status tracking difficult",
        ],
        faqs: [
            {
                question: "How long does an Aadhaar address update take?",
                answer: "Most address updates are approved within 7 to 30 days. You can track progress with your URN.",
            },
            {
                question: "Can I update my biometrics online?",
                answer: "No. Fingerprints, iris and photo updates require a visit to an Aadhaar enrolment centre.",
            },
            {
                question: "Is the e-Aadhaar PDF valid as ID proof?",
                answer: "Yes, the downloaded e-Aadhaar carries a digital signature and is accepted everywhere.",
            },
        ],
        related: ["pan-card", "digilocker", "voter-id"],
        learners: "1.2M",
    },
    {
        slug: "pan-card",
        name: "PAN Card",
        category: "Finance",
        icon: "credit-card",
        tagline: "Apply for a new PAN or download e-PAN",
        description: "Apply for a fresh PAN, correct your details, or download an instant e-PAN free of cost.",
        mode: "Online",
        estimatedTime: "20 min",
        fee: "₹107",
        feeAmount: 107,
        serviceCharge: "e-PAN via Aadhaar is free",
        processingTime: "10 minutes (e-PAN) · 15 days (physical)",
        paymentMethods: commonPayments,
        ministry: "Income Tax Department",
        portal: "https://www.incometax.gov.in",
        portalName: "Income Tax e-Filing",
        videoUrl: "https://www.youtube.com/embed/SwRnrEyIrV4",
        pdf: "pdfs/pan-card-guide.pdf",
        states: ["All India"],
        overview:
            "PAN is a 10-character alphanumeric identifier used for all tax and high-value financial transactions. Instant e-PAN is issued free through Aadhaar-based e-KYC; physical cards are issued through NSDL or UTIITSL.",
        eligibility: [
            "Indian citizens, NRIs, and foreign nationals transacting in India",
            "Aadhaar with a linked mobile number for instant e-PAN",
            "Applicant must not already hold a PAN",
        ],
        documents: [
            { name: "Aadhaar card", formats: "12-digit number", note: "Mandatory for instant e-PAN." },
            { name: "Registered mobile number", formats: "SMS OTP", note: "Used for Aadhaar e-KYC." },
            { name: "Proof of date of birth", formats: "PDF / JPG", note: "Birth certificate, matriculation certificate." },
            { name: "Passport-size photo", formats: "JPG, under 300 KB", note: "Only for physical card applications." },
        ],
        steps: [
            {
                title: "Visit the Income Tax e-Filing portal",
                image: "images/tutorials/pan-card/pan-1.png",
                description:
                    "Open incometax.gov.in and select 'Instant e-PAN' under Quick Links on the homepage.",
            },
            {
                title: "Enter your Aadhaar number",
                description: "Type your 12-digit Aadhaar, accept the declaration, and continue.",
                image: "images/tutorials/pan-card/pan-2.png",
                warning: "Instant e-PAN is only for individuals who do not already hold a PAN.",
            },
            {
                title: "Complete Aadhaar OTP e-KYC",
                description:
                    "Verify the OTP sent to your Aadhaar-linked mobile. Your name, date of birth and address are auto-filled.",
                image: "images/tutorials/pan-card/pan-3.png",
                tip: "Check the auto-filled spelling carefully — it becomes your permanent PAN record.",
            },
            {
                title: "Confirm and submit",
                image: "images/tutorials/pan-card/pan-4.png",
                description: "Review the summary page, tick the confirmation box and submit the request.",
            },
            {
                title: "Download your e-PAN",
                description:
                    "Within about ten minutes the PDF is available under 'Check Status / Download PAN'. It is a legally valid PAN.",
                image: "images/tutorials/pan-card/pan-5.png",
                note: "The PDF password is your date of birth in DDMMYYYY format.",
            },
        ],
        mistakes: [
            "Applying for a second PAN when one already exists — this attracts a penalty",
            "Mismatched name spelling between Aadhaar and bank records",
            "Choosing the physical card option when the free e-PAN is sufficient",
        ],
        faqs: [
            {
                question: "Is instant e-PAN really free?",
                answer: "Yes. Aadhaar-based instant e-PAN carries no fee. Only physical card issuance costs around ₹107.",
            },
            {
                question: "Can I hold two PAN cards?",
                answer: "No. Holding more than one PAN is an offence and can attract a penalty of ₹10,000.",
            },
        ],
        related: ["aadhaar", "digilocker", "birth-certificate"],
        learners: "860K",
    },
    {
        slug: "digilocker",
        name: "DigiLocker",
        category: "Documents",
        icon: "folder-lock",
        tagline: "Store and share official documents digitally",
        description: "Keep Aadhaar, PAN, marksheets and driving licence in a government-issued digital wallet.",
        mode: "Online",
        estimatedTime: "10 min",
        fee: "Free",
        feeAmount: 0,
        serviceCharge: "No charge",
        processingTime: "Instant",
        paymentMethods: ["Not applicable"],
        ministry: "Ministry of Electronics & IT",
        portal: "https://digilocker.gov.in",
        portalName: "DigiLocker",
        pdf: "pdfs/digilocker-guide.pdf",
        states: ["All India"],
        overview:
            "DigiLocker gives every Aadhaar holder 1 GB of secure cloud storage for official documents. Documents pulled from issuers carry the same legal status as originals under the IT Act.",
        eligibility: [
            "Any Indian resident with an Aadhaar number",
            "Aadhaar-linked mobile number for OTP verification",
        ],
        documents: [
            { name: "Aadhaar number", formats: "12-digit number", note: "Used to create the account." },
            { name: "Mobile number", formats: "SMS OTP", note: "Becomes your DigiLocker username." },
        ],
        steps: [
            {
                title: "Create your account",
                description: "Open digilocker.gov.in or the mobile app and choose Sign Up. Enter your name, date of birth and mobile number.",
            },
            {
                title: "Verify with Aadhaar",
                description: "Enter your Aadhaar number and the OTP sent to your linked mobile to complete KYC.",
            },
            {
                title: "Set a six-digit security PIN",
                description: "This PIN protects your locker in addition to the OTP login.",
                tip: "Avoid birth years and repeated digits.",
            },
            {
                title: "Pull issued documents",
                description:
                    "Go to Issued Documents, search for an issuer such as CBSE or the Transport Department and fetch your record.",
                note: "Issued documents update automatically when the issuer revises them.",
            },
            {
                title: "Share securely",
                description:
                    "Use the Share option to generate a time-limited link instead of sending copies over messaging apps.",
                warning: "Never share your DigiLocker OTP or PIN with anyone, including callers claiming to be officials.",
            },
        ],
        mistakes: [
            "Uploading scans to 'Drive' instead of pulling verified issued documents",
            "Registering with a mobile number you no longer use",
            "Sharing screenshots instead of secure share links",
        ],
        faqs: [
            {
                question: "Are DigiLocker documents legally valid?",
                answer: "Yes. Documents issued into DigiLocker are treated at par with original physical documents.",
            },
            {
                question: "How much storage do I get?",
                answer: "Every account includes 1 GB of free cloud storage for uploaded files.",
            },
        ],
        related: ["aadhaar", "driving-licence", "pan-card"],
        learners: "640K",
    },
    {
        slug: "passport",
        name: "Passport",
        category: "Travel",
        icon: "plane",
        tagline: "Apply for a fresh passport or renew",
        description: "Register on Passport Seva, book an appointment and complete police verification smoothly.",
        mode: "Online & Offline",
        estimatedTime: "45 min",
        fee: "₹1,500",
        feeAmount: 1500,
        serviceCharge: "₹2,000 for tatkaal",
        processingTime: "30–45 days (normal) · 3–7 days (tatkaal)",
        paymentMethods: commonPayments,
        ministry: "Ministry of External Affairs",
        portal: "https://www.passportindia.gov.in",
        portalName: "Passport Seva",
        pdf: "pdfs/passport-guide.pdf",
        states: ["All India"],
        overview:
            "The Passport Seva portal handles fresh applications, renewals and reissues. You fill the form online, pay the fee, book a slot at a Passport Seva Kendra, and then complete police verification.",
        eligibility: [
            "Indian citizen with valid proof of identity and address",
            "Minors apply through parents or guardians",
            "No pending criminal proceedings that bar travel",
        ],
        documents: [
            { name: "Aadhaar card", formats: "Original + photocopy", note: "Primary proof of address and identity." },
            { name: "Birth certificate", formats: "Original", note: "Proof of date of birth for applicants born after 1989." },
            { name: "Address proof", formats: "Original", note: "Electricity bill, bank passbook or rent agreement." },
            { name: "Annexure / affidavit", formats: "Printed, signed", note: "Only where the application type requires it." },
            { name: "Old passport", formats: "Original", note: "Required for reissue applications." },
        ],
        steps: [
            {
                title: "Register on Passport Seva",
                description:
                    "Create an account on passportindia.gov.in, choosing the Passport Office nearest to your current address.",
                tip: "Pick the office matching your present address, not your permanent one.",
            },
            {
                title: "Fill the application form",
                description:
                    "Select 'Apply for Fresh Passport / Reissue' and complete the form online, or download the e-form and upload the XML.",
            },
            {
                title: "Pay and schedule an appointment",
                description:
                    "Choose 'Pay and Schedule Appointment'. Fees are ₹1,500 for a 36-page normal booklet and ₹2,000 extra for tatkaal.",
                note: "Appointment slots for popular cities open at a fixed time each day.",
            },
            {
                title: "Print the application receipt",
                description: "Carry the printed Application Receipt with the ARN barcode to your appointment.",
            },
            {
                title: "Visit the Passport Seva Kendra",
                description:
                    "Reach 15 minutes early with all originals. Counters A, B and C handle document check, verification and granting.",
                warning: "Originals are mandatory — photocopies alone will get your application rejected at Counter A.",
            },
            {
                title: "Complete police verification",
                description:
                    "A local police officer visits your address or calls you to a station. Keep originals ready and respond quickly.",
                tip: "Track status with your File Number on the portal or mPassport Seva app.",
            },
        ],
        mistakes: [
            "Mismatched spelling between Aadhaar and the application form",
            "Selecting the wrong Passport Office for your current address",
            "Not carrying original documents to the appointment",
        ],
        faqs: [
            {
                question: "How fast is tatkaal?",
                answer: "Tatkaal passports are usually dispatched in 3 to 7 working days after successful verification.",
            },
            {
                question: "Can I change my appointment date?",
                answer: "Yes, appointments can be rescheduled up to two times within one year of fee payment.",
            },
        ],
        related: ["aadhaar", "birth-certificate", "driving-licence"],
        learners: "720K",
    },
    {
        slug: "driving-licence",
        name: "Driving Licence",
        category: "Transport",
        icon: "car",
        tagline: "Learner's licence, permanent DL and renewal",
        description: "Apply on Parivahan Sarathi, book your driving test slot and renew before expiry.",
        mode: "Online & Offline",
        estimatedTime: "35 min",
        fee: "₹200",
        feeAmount: 200,
        serviceCharge: "₹1,000 for smart card DL",
        processingTime: "7–30 days",
        paymentMethods: commonPayments,
        ministry: "Ministry of Road Transport & Highways",
        portal: "https://parivahan.gov.in",
        portalName: "Parivahan Sarathi",
        pdf: "pdfs/driving-licence-guide.pdf",
        states: ["All India"],
        overview:
            "Driving licences are issued by state RTOs through the Parivahan Sarathi portal. You first obtain a learner's licence, wait 30 days, then take the driving test for a permanent licence.",
        eligibility: [
            "18 years or older for a geared two-wheeler or car",
            "16 years for a 50cc gearless two-wheeler with guardian consent",
            "Valid learner's licence held for at least 30 days before the driving test",
        ],
        documents: [
            { name: "Aadhaar card", formats: "PDF / JPG", note: "Used for e-KYC and address proof." },
            { name: "Age proof", formats: "PDF", note: "Birth certificate, PAN or school certificate." },
            { name: "Passport-size photo", formats: "JPG, under 200 KB", note: "Recent, plain background." },
            { name: "Form 1 medical certificate", formats: "PDF", note: "Required for applicants above 40 or for transport licences." },
        ],
        steps: [
            {
                title: "Open Parivahan Sarathi",
                description: "Go to parivahan.gov.in/sarathiservice, choose your state, then 'Apply for Learner Licence'.",
            },
            {
                title: "Complete Aadhaar authentication",
                description: "Choose 'Submit via Aadhaar authentication' so details auto-fill and no RTO visit is needed for the LL test.",
                tip: "Aadhaar e-KYC lets you take the learner's test from home.",
            },
            {
                title: "Upload documents and photo",
                description: "Attach age proof, address proof, signature and photograph in the sizes shown on screen.",
            },
            {
                title: "Pay the fee and take the LL test",
                description:
                    "Pay online, then attempt the 10-question road-sign test. You need 6 correct answers to pass.",
                note: "The learner's licence PDF downloads immediately after passing.",
            },
            {
                title: "Book the driving test",
                description:
                    "After 30 days, apply for the permanent licence and book a slot at your RTO's driving test track.",
                warning: "Arrive with the vehicle class you applied for — the test is cancelled otherwise.",
            },
            {
                title: "Collect your smart card",
                description: "On passing, the smart card DL is printed and dispatched by post within 2–3 weeks.",
            },
        ],
        mistakes: [
            "Booking the driving test before the mandatory 30-day gap",
            "Uploading a signature image larger than the allowed size",
            "Forgetting to carry the learner's licence to the test track",
        ],
        faqs: [
            {
                question: "Can I take the learner's test at home?",
                answer: "Yes, with Aadhaar authentication most states allow the learner's test to be taken online.",
            },
            {
                question: "When should I renew?",
                answer: "Renew within one year of expiry to avoid a fresh test. Licences are valid for 20 years or until age 50.",
            },
        ],
        related: ["aadhaar", "digilocker", "csc"],
        learners: "910K",
    },
    {
        slug: "voter-id",
        name: "Voter ID",
        category: "Civic",
        icon: "vote",
        tagline: "Register as a voter and update your EPIC",
        description: "Register on the Voters' Service Portal, correct details and download your e-EPIC.",
        mode: "Online",
        estimatedTime: "20 min",
        fee: "Free",
        feeAmount: 0,
        serviceCharge: "No charge",
        processingTime: "15–30 days",
        paymentMethods: ["Not applicable"],
        ministry: "Election Commission of India",
        portal: "https://voters.eci.gov.in",
        portalName: "Voters' Service Portal",
        states: ["All India"],
        overview:
            "The Voters' Service Portal replaces the old NVSP. Form 6 is for new registration, Form 8 for corrections, shifting and replacement. Approved applicants can download a digitally signed e-EPIC.",
        eligibility: [
            "Indian citizen aged 18 or above on the qualifying date",
            "Ordinarily resident in the constituency applied for",
            "Not disqualified under the Representation of the People Act",
        ],
        documents: [
            { name: "Age proof", formats: "PDF / JPG", note: "Birth certificate, PAN, Aadhaar or marksheet." },
            { name: "Address proof", formats: "PDF / JPG", note: "Utility bill, passbook or rent agreement." },
            { name: "Passport-size photo", formats: "JPG, under 2 MB", note: "White background, front-facing." },
        ],
        steps: [
            {
                title: "Sign up on the Voters' Service Portal",
                description: "Register at voters.eci.gov.in with your mobile number and set a password.",
            },
            {
                title: "Choose the right form",
                description:
                    "Form 6 for a new voter, Form 8 for correction, shifting or a replacement card, Form 7 for objection or deletion.",
                tip: "Moving cities? Form 8 shifting is faster than registering afresh.",
            },
            {
                title: "Fill in constituency details",
                description: "Enter your state, district and assembly constituency along with your current residential address.",
            },
            {
                title: "Upload photo and proofs",
                description: "Attach a clear photograph, age proof and address proof in the accepted sizes.",
                warning: "A cropped selfie is rejected — use a plain-background portrait.",
            },
            {
                title: "Track and download e-EPIC",
                description:
                    "Use the reference ID to track BLO verification. After approval, download the digitally signed e-EPIC PDF.",
                note: "Physical cards are dispatched by post after e-EPIC generation.",
            },
        ],
        mistakes: [
            "Applying in two constituencies at once, which leads to deletion of both",
            "Address proof in a family member's name without a relationship declaration",
            "Ignoring the BLO's verification call",
        ],
        faqs: [
            {
                question: "Is the e-EPIC valid at the polling booth?",
                answer: "Yes, a printed e-EPIC with the QR code is accepted as identification at polling stations.",
            },
            {
                question: "How do I link Aadhaar with my voter ID?",
                answer: "Use Form 6B on the same portal. Linking is voluntary.",
            },
        ],
        related: ["aadhaar", "digilocker", "birth-certificate"],
        learners: "410K",
    },
    {
        slug: "ayushman-bharat",
        name: "Ayushman Bharat",
        category: "Health",
        icon: "heart-pulse",
        tagline: "Check eligibility and get your PM-JAY card",
        description: "Health cover of ₹5 lakh per family per year — check eligibility and generate your card.",
        mode: "Online & Offline",
        estimatedTime: "25 min",
        fee: "Free",
        feeAmount: 0,
        serviceCharge: "No charge at empanelled centres",
        processingTime: "Instant to 7 days",
        paymentMethods: ["Not applicable"],
        ministry: "National Health Authority",
        portal: "https://beneficiary.nha.gov.in",
        portalName: "PM-JAY Beneficiary Portal",
        states: ["All India"],
        overview:
            "Ayushman Bharat PM-JAY provides cashless secondary and tertiary hospital care worth ₹5 lakh per family per year. Eligibility is based on SECC data and state-specific extension schemes.",
        eligibility: [
            "Families listed in the SECC 2011 deprivation categories",
            "Beneficiaries of state health schemes converged with PM-JAY",
            "Aadhaar-based e-KYC is mandatory for card generation",
        ],
        documents: [
            { name: "Aadhaar card", formats: "12-digit number", note: "Required for e-KYC of every family member." },
            { name: "Ration card", formats: "PDF / JPG", note: "Used to map the family unit." },
            { name: "Mobile number", formats: "SMS OTP", note: "For OTP-based authentication." },
        ],
        steps: [
            {
                title: "Check your eligibility",
                description:
                    "Open beneficiary.nha.gov.in, log in with your mobile OTP and search by Aadhaar, ration card or family ID.",
            },
            {
                title: "Select the family member",
                description: "The list shows every eligible member. Choose the person whose card you want to create.",
            },
            {
                title: "Complete Aadhaar e-KYC",
                description: "Authenticate through OTP, fingerprint, iris or face scan and capture a live photo.",
                tip: "Face authentication in the app works well when the mobile number is not linked.",
            },
            {
                title: "Submit for approval",
                description: "Fill in additional details and submit. Most requests are auto-approved within minutes.",
                note: "Pending cases are reviewed by the state health agency within seven days.",
            },
            {
                title: "Download the Ayushman card",
                description: "Once approved, download the PDF card and carry it to any empanelled hospital.",
                warning: "Treatment is cashless only at empanelled hospitals — verify before admission.",
            },
        ],
        mistakes: [
            "Assuming eligibility without checking the SECC list",
            "Approaching a non-empanelled hospital and paying out of pocket",
            "Using a mismatched name between Aadhaar and the ration card",
        ],
        faqs: [
            {
                question: "What is covered under PM-JAY?",
                answer: "Over 1,900 procedures including surgery, medicines, diagnostics and 15 days of post-hospitalisation care.",
            },
            {
                question: "Is there any premium to pay?",
                answer: "No. The scheme is fully funded by the government for eligible families.",
            },
        ],
        related: ["aadhaar", "pm-kisan", "csc"],
        learners: "530K",
    },
    {
        slug: "pm-kisan",
        name: "PM Kisan",
        category: "Agriculture",
        icon: "sprout",
        tagline: "₹6,000 a year income support for farmers",
        description: "Register as a farmer, complete e-KYC and track your instalment status.",
        mode: "Online & Offline",
        estimatedTime: "20 min",
        fee: "Free",
        feeAmount: 0,
        serviceCharge: "₹15 at CSC for assisted registration",
        processingTime: "30–60 days for verification",
        paymentMethods: ["Not applicable"],
        ministry: "Ministry of Agriculture & Farmers' Welfare",
        portal: "https://pmkisan.gov.in",
        portalName: "PM-KISAN",
        states: ["All India"],
        overview:
            "PM-KISAN transfers ₹6,000 per year in three equal instalments directly to landholding farmer families. e-KYC and Aadhaar-seeded bank accounts are mandatory to receive instalments.",
        eligibility: [
            "Landholding farmer families with cultivable land in their name",
            "Excludes income-tax payers, institutional landholders and pensioners above ₹10,000/month",
            "Aadhaar-seeded bank account required",
        ],
        documents: [
            { name: "Aadhaar card", formats: "12-digit number", note: "Mandatory for registration and e-KYC." },
            { name: "Land records", formats: "PDF / JPG", note: "Khatauni, khasra or record-of-rights extract." },
            { name: "Bank passbook", formats: "PDF / JPG", note: "Account must be Aadhaar-seeded and active." },
        ],
        steps: [
            {
                title: "Open the PM-KISAN portal",
                description: "Visit pmkisan.gov.in and select 'New Farmer Registration' under the Farmers Corner.",
            },
            {
                title: "Choose rural or urban farmer",
                description: "Enter your Aadhaar number, mobile number and state, then verify the OTP.",
            },
            {
                title: "Enter land and bank details",
                description: "Fill in survey or khasra numbers, land area and your Aadhaar-seeded bank account.",
                warning: "Land records must be in the applicant's own name — joint family records need mutation first.",
            },
            {
                title: "Complete e-KYC",
                description: "Use OTP-based e-KYC on the portal or face authentication in the PM-KISAN mobile app.",
                tip: "Instalments are held back until e-KYC is complete.",
            },
            {
                title: "Track beneficiary status",
                description: "Use 'Know Your Status' with your registration number to see instalment history and rejections.",
            },
        ],
        mistakes: [
            "Bank account not seeded with Aadhaar, causing failed transfers",
            "Skipping e-KYC and wondering why instalments stopped",
            "Name spelling differences between land records and Aadhaar",
        ],
        faqs: [
            {
                question: "When are instalments released?",
                answer: "Three instalments of ₹2,000 each are released roughly every four months.",
            },
            {
                question: "Why was my instalment rejected?",
                answer: "The most common reasons are pending e-KYC, an inactive bank account or a failed land-record check.",
            },
        ],
        related: ["aadhaar", "ayushman-bharat", "csc"],
        learners: "480K",
    },
    {
        slug: "birth-certificate",
        name: "Birth Certificate",
        category: "Civic",
        icon: "baby",
        tagline: "Register a birth and get the certificate",
        description: "Register a birth within 21 days and download the certificate from the CRS portal.",
        mode: "Online & Offline",
        estimatedTime: "30 min",
        fee: "₹50",
        feeAmount: 50,
        serviceCharge: "Late-registration fee varies by state",
        processingTime: "7–21 days",
        paymentMethods: commonPayments,
        ministry: "Registrar General of India",
        portal: "https://crsorgi.gov.in",
        portalName: "Civil Registration System",
        states: ["State-specific"],
        overview:
            "Births must be registered within 21 days at the local municipal body or through the CRS portal. Delayed registration needs an affidavit and, beyond one year, a magistrate's order.",
        eligibility: [
            "Parent or guardian of the child",
            "Hospital discharge summary or birth-reporting slip",
            "Registration within 21 days avoids late fees",
        ],
        documents: [
            { name: "Hospital discharge summary", formats: "PDF / JPG", note: "Contains the birth-reporting number." },
            { name: "Parents' Aadhaar", formats: "PDF / JPG", note: "Both parents' identity proof." },
            { name: "Address proof", formats: "PDF / JPG", note: "Proof of residence at the time of birth." },
            { name: "Marriage certificate", formats: "PDF", note: "Required by some municipal bodies." },
        ],
        steps: [
            {
                title: "Register on the CRS portal",
                description: "Create a general-public login at crsorgi.gov.in and select your state and registration unit.",
            },
            {
                title: "Fill the birth-reporting form",
                description: "Enter the child's name, date and place of birth, and both parents' details exactly as in Aadhaar.",
                note: "Some hospitals submit this form on your behalf — check before duplicating.",
            },
            {
                title: "Upload supporting documents",
                description: "Attach the hospital slip, parents' identity proof and address proof.",
            },
            {
                title: "Pay the registration fee",
                description: "Pay the fee online where supported, or at the municipal counter. Keep the receipt.",
                warning: "After 21 days a late fee applies; after one year a magistrate's order is required.",
            },
            {
                title: "Collect or download the certificate",
                description: "Once the registrar approves, download the digitally signed certificate or collect it from the office.",
                tip: "Save a copy in DigiLocker for school admissions and passport applications.",
            },
        ],
        mistakes: [
            "Missing the 21-day window and needing an affidavit",
            "Spelling the child's name differently from later school records",
            "Applying at the wrong municipal ward",
        ],
        faqs: [
            {
                question: "Can I add the child's name later?",
                answer: "Yes, the name can be added within 12 months of registration without extra formalities in most states.",
            },
            {
                question: "Is the online certificate accepted?",
                answer: "Yes, digitally signed CRS certificates are accepted by schools, passport offices and courts.",
            },
        ],
        related: ["aadhaar", "passport", "voter-id"],
        learners: "290K",
    },
    {
        slug: "csc",
        name: "Common Service Centre",
        category: "Support",
        icon: "store",
        tagline: "Find a CSC or become a Village Level Entrepreneur",
        description: "Locate your nearest CSC for assisted services, or apply to run one in your area.",
        mode: "Offline",
        estimatedTime: "25 min",
        fee: "₹1,479",
        feeAmount: 1479,
        serviceCharge: "VLE registration fee, one-time",
        processingTime: "15–45 days",
        paymentMethods: commonPayments,
        ministry: "CSC e-Governance Services India Ltd.",
        portal: "https://register.csc.gov.in",
        portalName: "CSC Registration",
        states: ["All India"],
        overview:
            "Common Service Centres are assisted digital access points in villages and towns. Citizens use them for Aadhaar, PAN, insurance, bill payments and certificates. Entrepreneurs can apply to operate one.",
        eligibility: [
            "Applicant aged 18 or above with a valid TEC certificate",
            "A physical space with a computer, printer, scanner and internet",
            "Aadhaar-linked mobile number and PAN",
        ],
        documents: [
            { name: "TEC certificate", formats: "Certificate number", note: "Telecentre Entrepreneur Course completion." },
            { name: "PAN card", formats: "PDF / JPG", note: "In the applicant's own name." },
            { name: "Cancelled cheque", formats: "JPG", note: "Bank account for settlement." },
            { name: "Centre photograph", formats: "JPG", note: "Interior and exterior of the proposed centre." },
        ],
        steps: [
            {
                title: "Complete the TEC course",
                description: "Register at cscentrepreneur.in, pay ₹1,479 and finish the Telecentre Entrepreneur Course assessment.",
            },
            {
                title: "Apply for CSC registration",
                description: "Go to register.csc.gov.in, choose 'CSC VLE' and enter your TEC certificate number.",
            },
            {
                title: "Complete Aadhaar authentication",
                description: "Verify with OTP or biometrics and fill in your personal, banking and centre details.",
            },
            {
                title: "Upload photographs and documents",
                description: "Attach the centre photos, PAN, cancelled cheque and proof of infrastructure.",
                tip: "Photos should clearly show the signboard and the equipment in place.",
            },
            {
                title: "Track your application",
                description:
                    "Note the application reference number. District managers verify the centre before approval.",
                note: "Approved VLEs receive a CSC ID and digital-seva portal access by email.",
            },
        ],
        mistakes: [
            "Applying without completing the TEC course",
            "Providing a bank account not in the applicant's name",
            "Uploading blurred photos of the centre",
        ],
        faqs: [
            {
                question: "Do citizens pay to use a CSC?",
                answer: "Government fees are fixed; the VLE may add a small notified service charge for assistance.",
            },
            {
                question: "How long does VLE approval take?",
                answer: "Typically 15 to 45 days depending on district-level verification.",
            },
        ],
        related: ["aadhaar", "pan-card", "ayushman-bharat"],
        learners: "260K",
    },
];

const serviceBySlug = (slug) => services.find((s) => s.slug === slug);

const popularSearches = [
    "Update Aadhaar Address",
    "Download e-PAN",
    "Apply Passport",
    "Renew Driving Licence",
    "Find CSC Centre",
    "Check PM Kisan status",
];

const indianStates = [
    "All India",
    "Andhra Pradesh",
    "Bihar",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
];



const centreTypes = [
    "Aadhaar Centre",
    "CSC Centre",
    "Passport Office",
    "RTO Office",
    "Municipal Office",
];

const centres = [
    {
        id: "c1",
        name: "Aadhaar Seva Kendra — Connaught Place",
        type: "Aadhaar Centre",
        address: "B-14, Inner Circle, Connaught Place",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001",
        distanceKm: 1.2,
        hours: "Mon–Sat, 9:30 AM – 5:30 PM",
        phone: "1947",
        open: true,
    },
    {
        id: "c2",
        name: "CSC Digital Seva — Karol Bagh",
        type: "CSC Centre",
        address: "Shop 22, Ajmal Khan Road, Karol Bagh",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110005",
        distanceKm: 3.4,
        hours: "Mon–Sun, 9:00 AM – 8:00 PM",
        phone: "+91 98110 22110",
        open: true,
    },
    {
        id: "c3",
        name: "Passport Seva Kendra — Bhikaji Cama Place",
        type: "Passport Office",
        address: "Block A, Bhikaji Cama Place, RK Puram",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110066",
        distanceKm: 7.8,
        hours: "Mon–Fri, 9:00 AM – 4:00 PM",
        phone: "1800 258 1800",
        open: true,
    },
    {
        id: "c4",
        name: "RTO Sarai Kale Khan",
        type: "RTO Office",
        address: "Ring Road, Sarai Kale Khan",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110013",
        distanceKm: 9.1,
        hours: "Mon–Fri, 9:30 AM – 5:00 PM",
        phone: "+91 11 2435 8888",
        open: false,
    },
    {
        id: "c5",
        name: "Municipal Corporation Office — Andheri West",
        type: "Municipal Office",
        address: "K/West Ward, SV Road, Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400058",
        distanceKm: 2.6,
        hours: "Mon–Sat, 10:00 AM – 5:30 PM",
        phone: "+91 22 2620 1000",
        open: true,
    },
    {
        id: "c6",
        name: "Aadhaar Enrolment Centre — Koramangala",
        type: "Aadhaar Centre",
        address: "80 Feet Road, 6th Block, Koramangala",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560095",
        distanceKm: 4.3,
        hours: "Mon–Sat, 10:00 AM – 6:00 PM",
        phone: "1947",
        open: true,
    },
    {
        id: "c7",
        name: "CSC Digital Seva — Salt Lake Sector V",
        type: "CSC Centre",
        address: "DN Block, Sector V, Bidhannagar",
        city: "Kolkata",
        state: "West Bengal",
        pincode: "700091",
        distanceKm: 5.5,
        hours: "Mon–Sat, 9:30 AM – 7:00 PM",
        phone: "+91 98300 44567",
        open: true,
    },
    {
        id: "c8",
        name: "RTO Ameerpet",
        type: "RTO Office",
        address: "Sarojini Devi Road, Ameerpet",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500016",
        distanceKm: 6.9,
        hours: "Mon–Fri, 10:00 AM – 5:00 PM",
        phone: "+91 40 2373 2222",
        open: true,
    },
    {
        id: "c9",
        name: "Passport Seva Kendra — Anna Nagar",
        type: "Passport Office",
        address: "2nd Avenue, Anna Nagar",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600040",
        distanceKm: 8.2,
        hours: "Mon–Fri, 9:00 AM – 4:00 PM",
        phone: "1800 258 1800",
        open: false,
    },
    {
        id: "c10",
        name: "Municipal Office — Navrangpura",
        type: "Municipal Office",
        address: "Ashram Road, Navrangpura",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380009",
        distanceKm: 3.1,
        hours: "Mon–Sat, 10:30 AM – 6:00 PM",
        phone: "+91 79 2553 1111",
        open: true,
    },
    {
        id: "c11",
        name: "Aadhaar Seva Kendra — Hazratganj",
        type: "Aadhaar Centre",
        address: "MG Marg, Hazratganj",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "226001",
        distanceKm: 2.0,
        hours: "Mon–Sat, 9:30 AM – 5:30 PM",
        phone: "1947",
        open: true,
    },
    {
        id: "c12",
        name: "CSC Digital Seva — Jaipur Vaishali Nagar",
        type: "CSC Centre",
        address: "Amrapali Circle, Vaishali Nagar",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302021",
        distanceKm: 4.8,
        hours: "Mon–Sun, 9:00 AM – 8:00 PM",
        phone: "+91 94140 33221",
        open: true,
    },
];



const updates = [
    {
        id: "u1",
        title: "Free Aadhaar document update extended",
        summary:
            "UIDAI has extended the free online document update window on myAadhaar. Residents who enrolled over ten years ago are encouraged to refresh their proof of identity and address.",
        category: "Deadline",
        date: "2026-07-28",
        source: "UIDAI",
        readMinutes: 2,
    },
    {
        id: "u2",
        title: "Passport Seva adds evening appointment slots",
        summary:
            "Selected Passport Seva Kendras in metro cities now offer appointment slots until 7 PM on weekdays to reduce waiting times for working applicants.",
        category: "New Service",
        date: "2026-07-19",
        source: "Ministry of External Affairs",
        readMinutes: 3,
    },
    {
        id: "u3",
        title: "PM-KISAN e-KYC now supported by face authentication",
        summary:
            "Farmers without an Aadhaar-linked mobile number can complete e-KYC using face authentication in the PM-KISAN mobile app, removing a common blocker for instalments.",
        category: "Policy",
        date: "2026-07-11",
        source: "Ministry of Agriculture",
        readMinutes: 2,
    },
    {
        id: "u4",
        title: "DigiLocker integrates more state land records",
        summary:
            "Eight additional states have joined DigiLocker as issuers, letting citizens fetch land record extracts directly instead of visiting tehsil offices.",
        category: "New Service",
        date: "2026-06-30",
        source: "MeitY",
        readMinutes: 4,
    },
    {
        id: "u5",
        title: "Driving licence renewal grace period clarified",
        summary:
            "MoRTH has clarified that a licence can be renewed within one year of expiry without a fresh driving test, subject to a nominal late fee.",
        category: "Policy",
        date: "2026-06-22",
        source: "MoRTH",
        readMinutes: 3,
    },
    {
        id: "u6",
        title: "Ayushman card generation camps announced",
        summary:
            "The National Health Authority will run card generation camps at panchayat offices through the next quarter, with on-the-spot e-KYC support.",
        category: "Announcement",
        date: "2026-06-14",
        source: "National Health Authority",
        readMinutes: 2,
    },
];

const generalFaqs = [
    {
        question: "Is GovGuide India an official government website?",
        answer:
            "No. GovGuide India is an independent learning platform. We explain how official services work and always link you to the genuine government portal for the actual application.",
    },
    {
        question: "Do you charge for tutorials?",
        answer: "No. Every tutorial, checklist and centre listing on GovGuide India is free to use.",
    },
    {
        question: "Do you collect my Aadhaar or personal documents?",
        answer:
            "Never. We do not ask for Aadhaar numbers, OTPs or document uploads. Any site asking for these while claiming to be us is fraudulent.",
    },
    {
        question: "How current is the fee and timeline information?",
        answer:
            "Fees and processing times are reviewed regularly against official notifications, but always confirm on the government portal before paying.",
    },
    {
        question: "Can I use GovGuide India in my language?",
        answer:
            "Tutorials are currently written in English with regional language versions rolling out service by service.",
    },
    {
        question: "How do I report an outdated step?",
        answer:
            "Use the Contact page or the feedback link in the footer. Reports are reviewed and tutorials are usually corrected within a week.",
    },
    {
        question: "Do you help with the application itself?",
        answer:
            "We guide you step by step, but the submission always happens on the official portal or at a government centre.",
    },
];

const assistantSuggestions = [
    "How do I update Aadhaar?",
    "How much does Passport cost?",
    "Can I apply online?",
    "Which documents do I need?",
];

const assistantAnswers = {
    "How do I update Aadhaar?":
        "Log in to myAadhaar with your Aadhaar number and OTP, pick the field to update, upload proof under 2 MB and pay ₹50. Track it with the URN. The full walkthrough is in the Aadhaar tutorial.",
    "How much does Passport cost?":
        "A 36-page normal passport costs ₹1,500. Tatkaal adds ₹2,000. A 60-page booklet costs ₹2,000. Fees are paid on Passport Seva when you book your appointment.",
    "Can I apply online?":
        "Most services here are fully online — Aadhaar updates, e-PAN, DigiLocker, Voter ID and learner's licence. Passport and driving tests need one in-person visit.",
    "Which documents do I need?":
        "It depends on the service. Every tutorial has a Required Documents checklist with accepted formats and notes. Aadhaar plus one address proof covers most applications.",
};
