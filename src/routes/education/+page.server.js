/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const categorizedContent = {
        "Governance & Devolution": [
            {
                id: "gov-001",
                content_type: "module",
                title: "How County Governments Work",
                description: "Understand the structure, functions, and funding of Kenya's 47 county governments under the 2010 Constitution.",
                duration: "45 min",
                readTime: 15,
                tags: ["Devolution", "County Budgets", "MCAs", "Governors"],
                objectives: [
                    "Explain the two arms of county government: the County Assembly and County Executive",
                    "Understand how county budgets are prepared and approved",
                    "Identify the roles of MCAs, the Governor, and the County Executive Committee",
                    "Learn how citizens can participate in county planning"
                ],
                content: `
                    <h3>The Structure of County Government</h3>
                    <p>Under the Constitution of Kenya 2010, each of the 47 counties has two arms of government:</p>
                    
                    <h3>1. County Assembly</h3>
                    <p>The County Assembly is the legislative arm, made up of:</p>
                    <ul>
                        <li><strong>Elected MCAs</strong> — One per ward, representing local constituents</li>
                        <li><strong>Nominated MCAs</strong> — Special seats for women, youth, and persons with disabilities</li>
                        <li><strong>The Speaker</strong> — Presides over Assembly proceedings (ex-officio member)</li>
                    </ul>
                    <p>The County Assembly makes laws, approves budgets, and provides oversight over the County Executive.</p>
                    
                    <h3>2. County Executive</h3>
                    <p>Led by the Governor and Deputy Governor, this arm implements laws and delivers services. It includes:</p>
                    <ul>
                        <li>The County Executive Committee (CEC) members appointed by the Governor</li>
                        <li>County departments handling health, education, infrastructure, agriculture, etc.</li>
                    </ul>
                    
                    <h3>County Budget Process</h3>
                    <p>Every year, counties must prepare budgets following this cycle:</p>
                    <ol>
                        <li><strong>County Fiscal Strategy Paper (CFSP)</strong> — By February 28</li>
                        <li><strong>County Budget Estimates</strong> — By April 30</li>
                        <li><strong>County Appropriation Bill</strong> — Passed by June 30</li>
                        <li><strong>Public Participation</strong> — Required at multiple stages</li>
                    </ol>
                `,
                link: "https://countytrak.go.ke"
            },
            {
                id: "gov-002",
                content_type: "toolkit",
                title: "How to Petition Your MCA",
                description: "Step-by-step guide to drafting and submitting a formal petition to your Member of County Assembly.",
                readTime: 10,
                tags: ["Civic Action", "MCA", "Petition", "Accountability"],
                keyPoints: [
                    "Any citizen or group can petition the County Assembly",
                    "Petitions must be in writing and signed by the petitioner(s)",
                    "The Assembly must respond within 60 days",
                    "You can petition about any matter under the county's authority"
                ],
                steps: [
                    { title: "Identify the Issue", description: "Clearly define the problem and what specific action you want the County Assembly to take. Be precise — vague requests are harder to act on." },
                    { title: "Draft the Petition", description: "Write a formal letter addressed to the Clerk of the County Assembly. Include: your name and contact details, clear description of the issue, what action you want taken, and signatures of supporting residents." },
                    { title: "Submit to County Assembly", description: "Deliver your petition to the County Assembly offices during business hours. You can also submit through your Ward MCA who can table it on your behalf." },
                    { title: "Follow Up", description: "The Assembly has 60 days to respond. If you don't receive a response, follow up with the Clerk's office or escalate to the County Assembly's relevant committee." }
                ]
            },
            {
                id: "gov-003",
                content_type: "guide",
                title: "Understanding Kenya's Devolution System",
                description: "How power and resources are shared between the National Government and 47 County Governments.",
                readTime: 12,
                tags: ["Constitution", "Devolution", "National vs County", "Schedule Four"],
                keyPoints: [
                    "The 2010 Constitution created a two-tier system: National Government and County Governments",
                    "Schedule Four of the Constitution lists functions for each level",
                    "National Government handles: defense, foreign policy, immigration, national roads, universities",
                    "County Governments handle: primary healthcare, ECDE, county roads, agriculture extension, markets",
                    "At least 15% of national revenue must be allocated to counties (equitable share)"
                ],
                content: `
                    <h3>Why Devolution?</h3>
                    <p>Before 2010, Kenya had a highly centralized government where most decisions and resources were controlled from Nairobi. Devolution was designed to:</p>
                    <ul>
                        <li>Bring services closer to the people</li>
                        <li>Promote equitable development across regions</li>
                        <li>Give citizens more control over local decisions</li>
                    </ul>
                    
                    <h3>The Division of Functions</h3>
                    <p><strong>National Government functions</strong> include: foreign affairs, defense, police, immigration, national economic policy, national roads, universities, and health policy.</p>
                    <p><strong>County Government functions</strong> include: agriculture (county level), county health services, county transport, trade development, pre-primary education, village polytechnics, and county public works.</p>
                    
                    <h3>County Revenue Sources</h3>
                    <ul>
                        <li><strong>Equitable Share</strong> — Minimum 15% of national revenue</li>
                        <li><strong>Conditional Grants</strong> — From national government for specific projects</li>
                        <li><strong>Own Source Revenue</strong> — Licenses, fees, property rates, etc.</li>
                    </ul>
                `
            }
        ],
        "Rights & Justice": [
            {
                id: "rights-001",
                content_type: "guide",
                title: "What to Do If You're Arrested",
                description: "Know your constitutional rights during arrest and detention under Kenyan law.",
                readTime: 8,
                tags: ["Arrest", "Police", "Legal Rights", "Constitution"],
                keyPoints: [
                    "You have the right to be informed of the reason for your arrest — in a language you understand",
                    "You have the right to remain silent — anything you say may be used against you",
                    "You have the right to contact a lawyer or other person of your choice",
                    "You must be brought before a court within 24 hours of arrest",
                    "You have the right to be released on bail or bond for most offenses (except capital offenses)"
                ],
                content: `
                    <h3>During Arrest</h3>
                    <ul>
                        <li>The police must identify themselves and state the reason for arrest</li>
                        <li>You do not have to answer questions without a lawyer present</li>
                        <li>You have the right to remain silent — exercise it politely</li>
                        <li>Do not resist arrest physically — this can lead to additional charges</li>
                    </ul>
                    
                    <h3>At the Police Station</h3>
                    <ul>
                        <li>You must be allowed to contact a lawyer or family member</li>
                        <li>You should be held in proper police custody, not incommunicado</li>
                        <li>You have the right to medical attention if needed</li>
                    </ul>
                    
                    <h3>Your Rights Under Article 49 of the Constitution</h3>
                    <p>An arrested person has the right:</p>
                    <ol>
                        <li>To be informed promptly, in language they understand, of the reason for arrest</li>
                        <li>To remain silent and to communicate with an advocate</li>
                        <li>Not to be compelled to make any confession or admission</li>
                        <li>To be brought before a court as soon as reasonably possible (within 24 hours)</li>
                        <li>To be released on bond or bail, on reasonable conditions, pending a charge or trial</li>
                    </ol>
                `
            },
            {
                id: "rights-002",
                content_type: "directory",
                title: "Free Legal Aid Services in Kenya",
                description: "Organizations providing free legal assistance to Kenyans who cannot afford a lawyer.",
                readTime: 5,
                tags: ["Legal Aid", "Pro Bono", "Justice", "Article 48"],
                contacts: [
                    {
                        organization: "Kituo Cha Sheria (Legal Advice Centre)",
                        phone: "+254 20 240 4127",
                        whatsapp: "+254 711 456 789",
                        email: "info@kituochasheria.or.ke",
                        website: "https://kituochasheria.or.ke",
                        available: "Mon-Fri, 8:00am-5:00pm",
                        description: "Kenya's oldest legal aid organization. Provides free legal services to the poor and marginalized, including legal representation, advice, and community legal education."
                    },
                    {
                        organization: "FIDA Kenya",
                        phone: "+254 20 387 8988",
                        tollFree: "0800 720 999",
                        email: "info@fidakenya.org",
                        website: "https://fidakenya.org",
                        available: "24/7 Helpline",
                        description: "Federation of Women Lawyers — specializes in women's rights and provides legal aid for gender-based violence, family law, and inheritance cases."
                    },
                    {
                        organization: "National Legal Aid Service (NLAS)",
                        phone: "+254 20 222 1102",
                        email: "info@nlas.go.ke",
                        website: "https://nlas.go.ke",
                        available: "Mon-Fri, 8:00am-5:00pm",
                        description: "Government agency established under the Legal Aid Act 2016. Provides legal aid to indigent persons in criminal and civil matters."
                    },
                    {
                        organization: "ICJ Kenya (International Commission of Jurists)",
                        phone: "+254 20 208 4836",
                        email: "info@icj-kenya.org",
                        website: "https://icj-kenya.org",
                        available: "Mon-Fri, 8:00am-5:00pm",
                        description: "Provides legal aid in human rights cases and strategic litigation on constitutional matters."
                    }
                ]
            },
            {
                id: "rights-003",
                content_type: "guide",
                title: "How to Report Police Misconduct",
                description: "Steps to take if you experience or witness police abuse, harassment, or corruption in Kenya.",
                readTime: 7,
                tags: ["Police", "IPOA", "Accountability", "Human Rights"],
                keyPoints: [
                    "The Independent Policing Oversight Authority (IPOA) investigates police misconduct",
                    "You can report anonymously via their toll-free line 1559",
                    "Document everything: time, date, location, officer names or numbers",
                    "Take photos/videos if safe to do so",
                    "You can also report to the Kenya National Commission on Human Rights (KNCHR)"
                ],
                content: `
                    <h3>Reporting to IPOA</h3>
                    <p><strong>What IPOA investigates:</strong></p>
                    <ul>
                        <li>Police shootings and deaths in custody</li>
                        <li>Torture, cruel, or degrading treatment by police</li>
                        <li>Illegal arrests and detention</li>
                        <li>Police corruption and extortion</li>
                        <li>Sexual violence by police officers</li>
                    </ul>
                    
                    <h3>How to File a Complaint</h3>
                    <ol>
                        <li><strong>Call:</strong> Toll-free 1559 or +254 709 127 000</li>
                        <li><strong>SMS/WhatsApp:</strong> +254 709 127 000</li>
                        <li><strong>Email:</strong> complaints@ipoa.go.ke</li>
                        <li><strong>Visit:</strong> IPOA offices in Nairobi (ACK Garden House, 1st Ngong Avenue) or regional offices</li>
                        <li><strong>Online:</strong> Fill the complaint form at www.ipoa.go.ke</li>
                    </ol>
                    
                    <h3>What to Include in Your Report</h3>
                    <ul>
                        <li>Your name and contact (you can request anonymity)</li>
                        <li>Date, time, and location of the incident</li>
                        <li>Names, badge numbers, or descriptions of officers involved</li>
                        <li>What happened — be as detailed as possible</li>
                        <li>Names and contacts of any witnesses</li>
                        <li>Any evidence: photos, videos, medical reports</li>
                    </ul>
                `
            }
        ],
        "Public Health & Safety": [
            {
                id: "health-001",
                content_type: "helpline",
                title: "Mental Health Crisis Helplines",
                description: "Free, confidential mental health support services available across Kenya.",
                readTime: 3,
                tags: ["Mental Health", "Crisis Support", "Counseling", "Suicide Prevention"],
                contacts: [
                    {
                        organization: "Befrienders Kenya",
                        phone: "+254 722 178 177",
                        available: "24/7",
                        description: "Free, confidential emotional support and suicide prevention helpline. Trained volunteers listen without judgment."
                    },
                    {
                        organization: "NACADA Helpline",
                        phone: "+254 20 272 1997",
                        tollFree: "1192",
                        available: "24/7",
                        description: "National Authority for the Campaign Against Alcohol and Drug Abuse. Free counseling, referrals, and rehabilitation support."
                    },
                    {
                        organization: "Kenyatta National Hospital — Mental Health Department",
                        phone: "+254 20 272 6300",
                        available: "Mon-Sun, 8:00am-8:00pm",
                        description: "Public mental health services including crisis intervention, psychiatric evaluation, and outpatient counseling."
                    },
                    {
                        organization: "Chiromo Hospital Group",
                        phone: "+254 724 255 299",
                        available: "24/7 Emergency",
                        description: "Private mental health facility with emergency psychiatric services, inpatient care, and counseling."
                    },
                    {
                        organization: "Niskize Counseling Centre",
                        phone: "+254 718 720 002",
                        whatsapp: "+254 718 720 002",
                        available: "Mon-Sat, 8:00am-6:00pm",
                        description: "Professional counseling services including individual, couples, and family therapy."
                    }
                ]
            },
            {
                id: "health-002",
                content_type: "helpline",
                title: "GBV & Sexual Violence Support Services",
                description: "Free support services for survivors of gender-based and sexual violence in Kenya.",
                readTime: 5,
                tags: ["GBV", "SGBV", "Survivor Support", "Women's Rights", "Femicide"],
                contacts: [
                    {
                        organization: "National GBV Helpline (Government)",
                        phone: "+254 800 720 333",
                        tollFree: "1195",
                        available: "24/7",
                        description: "National toll-free helpline for reporting GBV cases. Provides immediate counseling, rescue coordination, and referrals to safe houses and medical services."
                    },
                    {
                        organization: "Gender Violence Recovery Centre (GVRC) — Nairobi Women's Hospital",
                        phone: "+254 709 667 000",
                        tollFree: "0800 730 999",
                        available: "24/7",
                        description: "Free medical treatment, forensic evidence collection, trauma counseling, and legal support for SGBV survivors."
                    },
                    {
                        organization: "HAART Kenya",
                        phone: "+254 780 727 263",
                        whatsapp: "+254 780 727 263",
                        email: "info@haartkenya.org",
                        website: "https://haartkenya.org",
                        available: "Mon-Fri, 8:00am-6:00pm",
                        description: "Counter-trafficking organization also supporting GBV survivors with emergency shelter, legal aid, and psychosocial support."
                    },
                    {
                        organization: "Wangu Kanja Foundation",
                        phone: "+254 722 743 589",
                        email: "info@wangkanjafoundation.org",
                        website: "https://wangkanjafoundation.org",
                        available: "Mon-Fri, 9:00am-5:00pm",
                        description: "Survivor-led organization providing access to justice, psychosocial support, and advocacy for SGBV survivors."
                    },
                    {
                        organization: "FIDA Kenya GBV Hotline",
                        phone: "+254 20 387 8988",
                        tollFree: "0800 720 999",
                        available: "24/7",
                        description: "Legal aid and counseling for women experiencing domestic violence, sexual assault, and other forms of GBV."
                    }
                ]
            },
            {
                id: "health-003",
                content_type: "helpline",
                title: "Child Protection Services",
                description: "Report child abuse, neglect, or violence. Free and confidential services.",
                readTime: 2,
                tags: ["Child Protection", "Child Abuse", "Reporting", "Children's Rights"],
                contacts: [
                    {
                        organization: "Childline Kenya",
                        phone: "+254 722 116 116",
                        tollFree: "116",
                        whatsapp: "+254 722 116 116",
                        available: "24/7",
                        description: "National child helpline for reporting child abuse, neglect, exploitation, and violence. Free counseling and rescue coordination."
                    },
                    {
                        organization: "Missing Child Kenya",
                        phone: "+254 704 000 222",
                        tollFree: "0800 022 222",
                        website: "https://missingchildkenya.org",
                        available: "24/7",
                        description: "Report missing children, access search support, and reunification services."
                    },
                    {
                        organization: "Department of Children's Services",
                        phone: "+254 20 222 0201",
                        email: "childrenservices@labour.go.ke",
                        available: "Mon-Fri, 8:00am-5:00pm",
                        description: "Government department responsible for child welfare. Handles cases of child abuse, custody disputes, and child protection."
                    }
                ]
            }
        ],
        "Civic Action & Participation": [
            {
                id: "civic-001",
                content_type: "toolkit",
                title: "Writing an Access to Information Request",
                description: "Use Kenya's Access to Information Act 2016 to request government records and information.",
                readTime: 12,
                tags: ["Transparency", "Accountability", "Article 35", "Public Information"],
                keyPoints: [
                    "The Access to Information Act 2016 gives every citizen the right to access government information",
                    "Government agencies must respond within 21 days",
                    "You don't need to explain why you want the information",
                    "If denied, you can appeal to the Commission on Administrative Justice (Office of the Ombudsman)"
                ],
                steps: [
                    { title: "Identify the Information", description: "Be specific about what document, record, or data you need. Examples: county budget details, procurement records, project implementation reports, or meeting minutes." },
                    { title: "Find the Right Office", description: "Determine which government entity holds the information. Every public entity must have an Access to Information Officer." },
                    { title: "Write Your Request", description: "Address your letter to the Access to Information Officer. Include: your name and contact, specific description of information requested, preferred format (paper/electronic), and a reminder of the 21-day legal deadline." },
                    { title: "Submit and Track", description: "Deliver in person, by email, or registered mail. Keep proof of submission. The agency must respond within 21 days or explain why more time is needed." },
                    { title: "Appeal if Denied", description: "If your request is denied or ignored, file an appeal with the Commission on Administrative Justice (Ombudsman) within 30 days. Call +254 20 227 0000 or visit www.ombudsman.go.ke." }
                ]
            },
            {
                id: "civic-002",
                content_type: "guide",
                title: "How Public Participation Works in Kenya",
                description: "Your constitutional right to participate in government decision-making — and how to use it.",
                readTime: 10,
                tags: ["Public Participation", "Constitution", "Accountability", "Budget"],
                keyPoints: [
                    "Public participation is a constitutional requirement under Articles 10, 118, 196, and 201",
                    "Both Parliament and County Assemblies must involve the public in law-making",
                    "County governments must hold public forums during budget preparation",
                    "Participation must be meaningful — not just a formality",
                    "Decisions made without public participation can be challenged in court"
                ],
                content: `
                    <h3>When Must Public Participation Happen?</h3>
                    <ul>
                        <li>Before Parliament or County Assemblies pass laws</li>
                        <li>During budget preparation at both national and county levels</li>
                        <li>Before major development projects are approved</li>
                        <li>When county integrated development plans are being prepared</li>
                    </ul>
                    
                    <h3>How to Participate Effectively</h3>
                    <ol>
                        <li><strong>Stay Informed:</strong> Follow your County Assembly and Parliament websites for notices of public participation forums</li>
                        <li><strong>Prepare:</strong> Read the bill, budget, or plan being discussed beforehand</li>
                        <li><strong>Attend:</strong> Show up at public forums and make your views known</li>
                        <li><strong>Submit Written Views:</strong> Even if you can't attend, you can send written submissions</li>
                        <li><strong>Follow Up:</strong> Check if your input was reflected in the final decision</li>
                    </ol>
                    
                    <h3>If Participation Is Denied</h3>
                    <p>You can challenge decisions made without meaningful public participation in court. The courts have struck down several laws and decisions for failing to meet the constitutional threshold of public participation.</p>
                `
            },
            {
                id: "civic-003",
                content_type: "module",
                title: "Understanding the National Budget Process",
                description: "How Kenya's national budget is made — and where citizens can have their say.",
                duration: "30 min",
                readTime: 12,
                tags: ["Budget", "National Treasury", "Parliament", "Public Finance"],
                objectives: [
                    "Understand the national budget cycle and timeline",
                    "Identify the key institutions involved in budget-making",
                    "Know when and how citizens can participate",
                    "Learn how to track budget implementation"
                ],
                content: `
                    <h3>The Budget Cycle</h3>
                    <p>Kenya's budget process follows a fiscal year from July 1 to June 30:</p>
                    
                    <h3>Phase 1: Planning (August-December)</h3>
                    <ul>
                        <li>Budget Review and Outlook Paper (BROP) — by September 30</li>
                        <li>County governments submit proposals to the Budget and Economic Council</li>
                        <li>National Treasury develops the Budget Policy Statement (BPS)</li>
                    </ul>
                    
                    <h3>Phase 2: Budget Policy Statement (January-February)</h3>
                    <ul>
                        <li>BPS tabled in Parliament by February 15</li>
                        <li>Public hearings held by Parliamentary Budget Committee</li>
                        <li><strong>This is a key moment for citizen input</strong></li>
                    </ul>
                    
                    <h3>Phase 3: Estimates (March-April)</h3>
                    <ul>
                        <li>Budget Estimates tabled by April 30</li>
                        <li>Departmental Committees review and hold hearings</li>
                    </ul>
                    
                    <h3>Phase 4: Appropriation (May-June)</h3>
                    <ul>
                        <li>Appropriation Bill passed by June 30</li>
                        <li>Finance Bill (tax measures) also passed</li>
                    </ul>
                    
                    <h3>Key Institutions</h3>
                    <ul>
                        <li><strong>National Treasury:</strong> Prepares and executes the budget</li>
                        <li><strong>Parliament Budget Committee:</strong> Reviews and recommends</li>
                        <li><strong>Controller of Budget:</strong> Authorizes withdrawals from the Consolidated Fund</li>
                        <li><strong>Auditor General:</strong> Audits government accounts</li>
                    </ul>
                `
            }
        ]
    };

    const totalLessons = Object.values(categorizedContent).flat().length;

    return {
        categorizedContent,
        totalLessons
    };
}