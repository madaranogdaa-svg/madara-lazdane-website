/* ==========================================================================
   Content collections — products, services, workshops, testimonials.
   Every text field is { en: "...", lv: "..." }.
   To add a product: copy an entry in `products`, give it a new id, and create
   a page that contains <main data-render="product" data-product="your-id">
   (copy cards.html and change the id). Then add a button for it in index.html.
   ========================================================================== */
window.SITE_DATA = {

  /* ---------------- Products (each renders as a full landing page) ---------------- */
  products: [
    {
      id: "journey",
      url: "journey.html",
      mockup: "workbook",                 // CSS object shown until a real photo is added below
      heroImage: null,                    // e.g. { src: "assets/img/journey-hero.jpg", alt: { en: "...", lv: "..." } }
      price: { amount: null, currency: "EUR" },          // TODO: final price, e.g. 39
      editions: [
        { code: "en", label: { en: "English", lv: "Angļu valodā" }, checkoutUrl: "" },   // TODO: checkout link
        { code: "lv", label: { en: "Latvian", lv: "Latviešu valodā" }, checkoutUrl: "" }  // TODO: checkout link
      ],
      kicker: { en: "The 36-Day Journey", lv: "36 dienu ceļš" },
      name: { en: "Do It For Your <em>Future Self</em>", lv: "Do It For Your <em>Future Self</em>" },
      tagline: {
        en: "A 36-day guided coaching workbook for moving from thinking about it to doing it — alongside the job you already have.",
        lv: "36 dienu koučinga darba burtnīca, kas palīdz no domāšanas pāriet pie darīšanas — līdzās darbam, kas tev jau ir."
      },
      highlights: [
        { en: "36 days · one focused prompt a day", lv: "36 dienas · viens uzdevums dienā" },
        { en: "Built to fit around a full-time job", lv: "Veidota līdzās pilnas slodzes darbam" },
        { en: "English and Latvian editions", lv: "Angļu un latviešu valodā" }
      ],
      ctaLabel: { en: "Start the 36-Day Journey", lv: "Sākt 36 dienu ceļu" },
      ctaNote: { en: "[Confirm: printed / PDF / both — and delivery]", lv: "[Precizēt: drukāta / PDF / abi — un piegāde]" },
      pains: {
        title: { en: "Maybe this sounds familiar:", lv: "Varbūt tas izklausās pazīstami:" },
        items: [
          { en: "the idea has been with you for months — maybe years,", lv: "ideja ir ar tevi jau mēnešiem — varbūt gadiem," },
          { en: "after work there's no energy left to think about it,", lv: "pēc darba vairs nav enerģijas par to domāt," },
          { en: "you're waiting for \"the right time\" that never quite comes,", lv: "tu gaidi \"īsto brīdi\", kas tā arī nepienāk," },
          { en: "and you're not sure where to even start.", lv: "un nav skaidrs, ar ko vispār sākt." }
        ],
        close: {
          en: "It isn't a lack of discipline. Most ideas stall because there's no structure around them — no set time, no next step, no honest look at the numbers. This workbook gives you that structure, one day at a time.",
          lv: "Tas nav disciplīnas trūkums. Lielākā daļa ideju apstājas, jo tām apkārt nav struktūras — nav atvēlēta laika, nav nākamā soļa, nav godīga skatiena uz skaitļiem. Šī burtnīca dod tev šo struktūru, pa vienai dienai."
        }
      },
      outcomes: [
        { title: { en: "Clarity about what you're actually building", lv: "Skaidrību par to, ko tu patiesībā veido" },
          text: { en: "And why it matters to you now.", lv: "Un kāpēc tas tev ir svarīgi tieši tagad." } },
        { title: { en: "A plan that fits your real week", lv: "Plānu, kas iederas tavā reālajā nedēļā" },
          text: { en: "Based on the hours and energy you really have.", lv: "Balstītu uz stundām un enerģiju, kas tev tiešām ir." } },
        { title: { en: "An honest look at the numbers", lv: "Godīgu skatienu uz skaitļiem" },
          text: { en: "What your idea would cost, and what it needs to bring back.", lv: "Cik tava ideja maksātu un cik tai jāatnes atpakaļ." } },
        { title: { en: "A habit of small, consistent action", lv: "Mazu, regulāru soļu ieradumu" },
          text: { en: "Thirty-six days in a row is long enough to make it stick.", lv: "Trīsdesmit sešas dienas pēc kārtas ir pietiekami, lai tas iesakņotos." } }
      ],
      steps: [
        { label: { en: "Part one", lv: "Pirmā daļa" }, title: { en: "Clarity", lv: "Skaidrība" },
          text: { en: "What you want to build, why now, and what your future self needs from you.", lv: "Ko tu gribi veidot, kāpēc tieši tagad un ko no tevis vajag tavai nākotnes versijai." } },
        { label: { en: "Part two", lv: "Otrā daļa" }, title: { en: "Structure", lv: "Struktūra" },
          text: { en: "Your real hours, your energy and your numbers — turned into a plan.", lv: "Tavas reālās stundas, enerģija un skaitļi — pārvērsti plānā." } },
        { label: { en: "Part three", lv: "Trešā daļa" }, title: { en: "Action", lv: "Rīcība" },
          text: { en: "Small, repeatable steps until the idea has a shape you can show someone.", lv: "Mazi, atkārtojami soļi, līdz idejai ir forma, ko vari kādam parādīt." } }
      ],
      includes: [
        { en: "36 daily coaching prompts and exercises", lv: "36 ikdienas koučinga jautājumi un uzdevumi" },
        { en: "Time, energy and money check-ins", lv: "Laika, enerģijas un naudas pārskati" },
        { en: "Space to shape a first concrete offer", lv: "Vieta pirmā konkrētā piedāvājuma veidošanai" },
        { en: "Weekly reflection pages", lv: "Iknedēļas pārdomu lapas" }
      ],
      faq: [
        { q: { en: "How much time do I need each day?", lv: "Cik daudz laika vajag katru dienu?" },
          a: { en: "[Confirm — e.g. around 15–30 minutes a day.]", lv: "[Precizēt — piem., apmēram 15–30 minūtes dienā.]" } },
        { q: { en: "I work 9–5. Will this still work for me?", lv: "Es strādāju no 9 līdz 5. Vai tas der arī man?" },
          a: { en: "That's exactly who it's made for. Each day's prompt is sized for the time you control, not an ideal empty calendar.", lv: "Tieši tev tā ir veidota. Katras dienas uzdevums ir pielāgots laikam, ko tu kontrolē, nevis ideālam tukšam kalendāram." } },
        { q: { en: "Do I need a finished idea to start?", lv: "Vai sākumā vajag gatavu ideju?" },
          a: { en: "No. The first part is designed for the stage where the idea is still vague.", lv: "Nē. Pirmā daļa ir paredzēta tieši tam brīdim, kad ideja vēl ir neskaidra." } },
        { q: { en: "How is it delivered?", lv: "Kā to saņemšu?" },
          a: { en: "[Confirm delivery: download link / shipping details / timelines.]", lv: "[Precizēt piegādi: lejupielādes saite / sūtīšana / termiņi.]" } },
        { q: { en: "Can I get an invoice?", lv: "Vai varu saņemt rēķinu?" },
          a: { en: "[Confirm with your checkout provider.]", lv: "[Precizēt atbilstoši apmaksas sistēmai.]" } }
      ]
    },

    {
      id: "cards",
      url: "cards.html",
      mockup: "cards",
      heroImage: { src: "assets/img/karts-galvena.jpg", position: "45% 100%", alt: { en: "“Saruna ar Sevi” conversation cards on a table", lv: "Sarunu kartītes “Saruna ar Sevi” uz galda" } },
      price: { amount: 25, currency: "EUR" },
      priceNote: { en: "+ €3 delivery to a parcel locker in Latvia", lv: "+ 3 € piegāde uz pakomātu Latvijā" },
      editions: [
        { code: "lv", label: { en: "Latvian", lv: "Latviešu valodā" }, checkoutUrl: "" },   // TODO: checkout link
        { code: "en", label: { en: "English", lv: "Angļu valodā" }, checkoutUrl: "" }     // TODO: checkout link
      ],
      kicker: { en: "Growth game", lv: "Izaugsmes spēle" },
      name: { en: "Saruna ar <em>Sevi</em>", lv: "Saruna ar <em>Sevi</em>" },
      oneLineTitle: true,
      tagline: {
        en: "A self-discovery and growth game that helps you sort your thoughts, find inner balance and take steps towards change.",
        lv: "Pašizziņas un izaugsmes spēle, kas palīdz sakārtot domas, rast iekšējo līdzsvaru un spert soļus pārmaiņu virzienā."
      },
      highlights: [
        { en: "39 conversation cards · 8 areas of life", lv: "39 sarunu kartītes · 8 dzīves jomas" },
        { en: "2 digital bonus materials included", lv: "2 digitāli bonusa materiāli komplektā" },
        { en: "Also available in English", lv: "Pieejama arī angļu valodā" }
      ],
      ctaLabel: { en: "Place an order", lv: "Veikt pasūtījumu" },
      ctaNote: { en: "Made and delivered within 7 working days", lv: "Izgatavošana un saņemšana līdz 7 darba dienām" },
      sampleQuestions: [
        { en: "What gives you the sense that you are growing and moving forward?", lv: "Kas tev dod sajūtu, ka tu augi un virzies uz priekšu?" },
        { en: "How can you better organise your time and priorities?", lv: "Kā tu vari labāk sakārtot savu laiku un prioritātes?" },
        { en: "Which conversation has stayed with you as truly deep and meaningful?", lv: "Kura saruna tev palikusi atmiņā kā patiesi dziļa un nozīmīga?" }
      ],
      pains: {
        title: { en: "Because change <em>starts with you.</em>", lv: "Jo pārmaiņas sākas <em>ar tevi pašu.</em>" },
        items: [],
        close: {
          en: "This “conversation with yourself” will bring more calm, clarity and understanding — in your personal life and in your career. It invites you to ask yourself the questions we rarely stop to think about in the everyday rush. Some answers may surprise you, others may not be comfortable — but this is exactly the beginning of knowing yourself more deeply and making more conscious decisions.",
          lv: "Šī “Saruna ar sevi pašu” palīdzēs ienest vairāk miera, skaidrības un izpratnes gan personīgajā dzīvē, gan karjerā. Tā aicina uzdot sev jautājumus, par kuriem ikdienas steigā nereti neaizdomājamies. Dažas atbildes var pārsteigt, citas var nebūt ērtas, taču tieši šis ir sākums dziļākai sevis iepazīšanai un apzinātākai lēmumu pieņemšanai."
        }
      },
      // Video: paste the YouTube video ID here (the part after "youtu.be/" or "watch?v="). Empty = section hidden.
      video: {
        youtubeId: "3WCBeL8LOeI",
        vertical: true,                   // YouTube Shorts (9:16)
        title: { en: "See the game <em>in action</em>", lv: "Ieskaties spēlē <em>video</em>" }
      },
      areas: {
        title: { en: "8 areas of life <em>to get to know yourself</em>", lv: "8 dzīves jomas, kurās <em>iepazīt sevi</em>" },
        image: { src: "assets/img/karts-izaugsme.jpg", position: "60% 55%", alt: { en: "Personal Growth & Development cards in hand", lv: "Kartītes “Personal Growth & Development” rokās" } },
        items: [
          { en: "Work and career", lv: "Darbs un karjera" },
          { en: "Finances", lv: "Finanses" },
          { en: "Health", lv: "Veselība" },
          { en: "Relationships", lv: "Attiecības" },
          { en: "Personal growth", lv: "Pašizaugsme" },
          { en: "Hobbies and creativity", lv: "Hobiji un radošums" },
          { en: "Friends and social circle", lv: "Draugi un sociālā vide" },
          { en: "Inner peace and spirituality", lv: "Iekšējais miers un garīgums" }
        ]
      },
      outcomesEyebrow: { en: "What you'll get", lv: "Ieguvumi" },
      outcomesTitle: { en: "What will this game <em>give you?</em>", lv: "Ko šī spēle tev <em>sniegs?</em>" },
      outcomes: [
        { title: { en: "Deeper questions and new insights", lv: "Dziļākus jautājumus un jaunas atziņas" },
          text: { en: "Each card invites you to pause and turn to what truly matters.", lv: "Katra kartīte aicina apstāties un pievērsties tam, kas patiesi ir svarīgs." } },
        { title: { en: "Noticing your blind spots", lv: "Aklāko punktu pamanīšanu" },
          text: { en: "A chance to see the habits, beliefs and patterns of behaviour you're not always aware of day to day.", lv: "Iespēju ieraudzīt savus ieradumus, pārliecības un uzvedības modeļus, kurus ikdienā ne vienmēr apzinies." } },
        { title: { en: "More balance", lv: "Lielāku līdzsvaru" },
          text: { en: "Helps you evaluate different areas of life and notice where change is needed.", lv: "Palīdzēs izvērtēt dažādas dzīves jomas un pamanīt, kur nepieciešamas pārmaiņas." } },
        { title: { en: "Honest conversations", lv: "Patiesas sarunas" },
          text: { en: "Questions that open new perspectives, help you understand yourself and others better and take the first steps towards change.", lv: "Jautājumi, kas palīdz atklāt jaunas perspektīvas, labāk saprast sevi un citus un spert pirmos soļus pārmaiņu virzienā." } },
        { title: { en: "An honest look at your surroundings", lv: "Godīgu skatienu uz savu vidi" },
          text: { en: "A chance to look at the people and environment around you and answer yourself honestly: where is it taking you — does it inspire and motivate you, or hold you back?", lv: "Iespēju paskatīties uz cilvēkiem un vidi sev apkārt un godīgi atbildēt sev: kurp tā tevi ved — vai tā tevi iedvesmo un motivē, vai tieši pretēji, attur?" } },
        { title: { en: "A more conscious relationship with money", lv: "Apzinātākas attiecības ar naudu" },
          text: { en: "Explore your relationship with money, notice your financial habits and build your financial literacy step by step.", lv: "Iespēju izpētīt savas attiecības ar naudu, pamanīt savus finanšu ieradumus un soli pa solim stiprināt savu finanšu pratību." } }
      ],
      audiencesTitle: { en: "Who is <em>“Saruna ar Sevi”</em> for?", lv: "Kam piemērota spēle <em>“Saruna ar Sevi”?</em>" },
      audiences: [
        { title: { en: "Personal self-discovery", lv: "Personīgajai pašizziņai" },
          text: { en: "Time for yourself, your thoughts and wishes — to better understand what truly matters to you.", lv: "Laiks sev, savām domām un vēlmēm, lai labāk izprastu, kas tev patiesi ir svarīgs." } },
        { title: { en: "Teams and groups", lv: "Komandām un grupām" },
          text: { en: "To strengthen collaboration, mutual trust and communication.", lv: "Sadarbības, savstarpējās uzticēšanās un komunikācijas stiprināšanai." } },
        { title: { en: "Coaches, psychologists and teachers", lv: "Koučiem, psihologiem un pedagogiem" },
          text: { en: "An additional tool when working with clients, pupils and groups.", lv: "Papildu instruments darbā ar klientiem, skolēniem un grupām." } },
        { title: { en: "Teenagers and pupils", lv: "Pusaudžiem un skolēniem" },
          text: { en: "To better understand themselves, their emotions, values and goals.", lv: "Lai labāk izprastu sevi, savas emocijas, vērtības un mērķus." } },
        { title: { en: "Families and friends", lv: "Ģimenēm un draugiem" },
          text: { en: "For deeper conversations, getting to know each other better and strengthening your bond.", lv: "Lai veidotu dziļākas sarunas, labāk iepazītu vienam otru un stiprinātu savstarpējo saikni." } }
      ],
      gallery: {
        title: { en: "A look <em>inside the game</em>", lv: "Ieskats <em>spēlē</em>" },
        images: [
          { src: "assets/img/karts-lv-1.jpg", alt: { en: "Latvian question cards with a wooden figure", lv: "Latviešu jautājumu kartītes ar koka figūriņu" } },
          { src: "assets/img/karts-lv-2.jpg", alt: { en: "“Karjera & Darbs” and “Pašrefleksija” cards", lv: "Kartītes “Karjera & Darbs” un “Pašrefleksija”" } },
          { src: "assets/img/karts-lv-3.jpg", alt: { en: "“Finanses & Labklājība” card", lv: "Kartīte “Finanses & Labklājība”" } },
          { src: "assets/img/karts-lv-4.jpg", position: "70% 72%", alt: { en: "Linen bag with a “Saruna ar sevi” tag", lv: "Lina maisiņš ar birku “Saruna ar sevi”" } },
          { src: "assets/img/karts-galerija-3.jpg", alt: { en: "Question cards in hand", lv: "Jautājumu kartītes rokās" } },
          { src: "assets/img/karts-galerija-1.jpg", alt: { en: "Card decks on a table", lv: "Kāršu komplekti uz galda" } }
        ]
      },
      bonus: {
        eyebrow: { en: "Bonus", lv: "Bonuss" },
        title: { en: "What else <em>will you get?</em>", lv: "Ko saņemsi <em>papildus?</em>" },
        lead: { en: "After payment you'll also receive two digital materials by email to help you get the most out of the cards and keep working on yourself.", lv: "Pēc pirkuma apmaksas savā e-pastā saņemsi arī divus digitālus materiālus, kas palīdzēs pilnvērtīgi izmantot kartītes un turpināt darbu ar sevi." },
        items: [
          { title: { en: "Digital guide “How to use the cards”", lv: "Digitālā pamācība “Kā lietot kartītes”" } },
          { title: { en: "7-day positive thinking challenge", lv: "7 dienu pozitīvās domāšanas izaicinājums" } }
        ]
      },
      includes: [
        { en: "39 conversation cards (95.25 × 119 mm)", lv: "39 sarunu kartītes (95,25 × 119 mm)" },
        { en: "Digital guide “How to use the cards”", lv: "Digitālā pamācība “Kā lietot kartītes”" },
        { en: "7-day positive thinking challenge", lv: "7 dienu pozitīvās domāšanas izaicinājums" }
      ],
      details: [
        { en: "Minimalist, aesthetic design", lv: "Minimālistisks, estētisks dizains" },
        { en: "Thoughtful use of materials, with the environment in mind", lv: "Pārdomāts materiālu patēriņš, domājot par ietekmi uz vidi" },
        { en: "Delivery in Latvia: €3 to your chosen parcel locker", lv: "Piegāde Latvijā: 3 € uz izvēlēto pakomātu" }
      ],
      faq: [
        { q: { en: "How quickly will I receive the game?", lv: "Cik ātri saņemšu spēli?" },
          a: { en: "Production and delivery take up to 7 working days.", lv: "Izgatavošanas un saņemšanas laiks ir līdz 7 darba dienām." } },
        { q: { en: "How does delivery work?", lv: "Kā notiek piegāde?" },
          a: { en: "Delivery in Latvia costs €3 to your chosen parcel locker. When ordering, enter the parcel locker in the additional information field.", lv: "Piegāde Latvijā — 3 € uz izvēlēto pakomātu. Veicot pasūtījumu, papildu informācijas laukā norādi izvēlēto pakomātu, uz kuru vēlies saņemt savu komplektu." } },
        { q: { en: "When will I receive the digital materials?", lv: "Kad saņemšu digitālos materiālus?" },
          a: { en: "After payment, by email. You can save them or print them.", lv: "Pēc pirkuma apmaksas — savā e-pastā. Tos vari saglabāt elektroniski vai izdrukāt." } },
        { q: { en: "Is the game available in English?", lv: "Vai spēle pieejama angļu valodā?" },
          a: { en: "Yes — choose the language before ordering.", lv: "Jā — izvēlies valodu pirms pasūtīšanas." } },
        { q: { en: "Can I use it with a team or group?", lv: "Vai to var izmantot komandā vai grupā?" },
          a: { en: "Yes. The cards work for teams, groups, families and friends — and as a tool for coaches, psychologists and teachers.", lv: "Jā. Kartītes ir piemērotas komandām, grupām, ģimenēm un draugiem, kā arī kā papildu instruments koučiem, psihologiem un pedagogiem." } }
      ],
      closing: {
        en: "Give yourself time for a conversation with yourself. <em>Sometimes one right question is the beginning of the change you've long been waiting for.</em>",
        lv: "Uzdāvini sev laiku sarunai ar sevi. <em>Dažreiz viens īstais jautājums ir sākums pārmaiņām, kuras jau sen ļoti gaidi.</em>"
      }
    }
  ],

  /* ---------------- Coaching services ---------------- */
  services: [
    { title: { en: "Career Coaching", lv: "Karjeras koučings" },
      text: { en: "For when you're good at your job but unsure where it's going — or whether it's still the right direction.", lv: "Kad tev labi padodas savs darbs, bet nav skaidrs, kurp tas ved — un vai tas joprojām ir īstais virziens." } },
    { title: { en: "Personal Brand & LinkedIn", lv: "Personīgais zīmols un LinkedIn" },
      text: { en: "LinkedIn is your professional portfolio and the first place a potential employer or partner will look. We'll also build a strategy for your personal brand on Instagram and Threads.", lv: "LinkedIn ir tavs profesionālais portfolio un pirmais avots, ko potenciālais darba devējs vai sadarbības partneris aplūkos. Tāpat izveidosim stratēģiju tavam personīgajam zīmolam Instagram un Threads." } },
    { title: { en: "Product & Service Development", lv: "Produkta un pakalpojuma attīstība" },
      text: { en: "Turning an idea into a clear offer: who it's for, what it costs, what makes you unique — and, most importantly, the core process of how you'll deliver it. I'll support you in its architecture and design.", lv: "Idejas pārvēršana skaidrā piedāvājumā — kam tas domāts, cik tas maksā, kāda ir tava unikalitāte un pats galvenais — pamatprocess, kā to nodrošināsi. Būšu tavs atbalsts tā arhitektūrā un dizainā." } },
    { title: { en: "Side Project Strategy", lv: "Blakusprojekta stratēģija" },
      text: { en: "A realistic plan for building something next to a full-time job — without burning out. I'll share useful contacts and resources for finding ideas and information, and help you build AI agents and understand which tools a specific task needs.", lv: "Reāls plāns, kā veidot kaut ko līdzās pilnas slodzes darbam — un neizdegt. Dalīšos ar noderīgiem kontaktiem un resursiem, kur smelties idejas un meklēt informāciju. Palīdzēšu ar mākslīgā intelekta aģentu izveidi un izpratni, kuri rīki nepieciešami konkrēta uzdevuma veikšanai." } },
    { title: { en: "Time, Energy & Money Planning", lv: "Laika, enerģijas un naudas plānošana" },
      text: { en: "Smart with time, money and resources — so that it brings more joy and the feeling of a job well done. Your passion project doesn't have to compete with your private and family time.", lv: "Gudri ar laiku, naudu un resursiem. Lai tas nes vairāk prieka un labi padarīta darba sajūtu. Tavai sirdslietai nav jākonfliktē ar tavu privāto un ģimenes laiku." } },
    { title: { en: "Advisory and an outside view", lv: "Konsultācijas un skats no malas" },
      text: { en: "Strategic input for a project that already exists and needs a clearer next step. At this stage I'll give you feedback and we'll practise your pitch — how you position yourself.", lv: "Stratēģisks skatījums projektam, kas jau pastāv un kam vajag skaidrāku nākamo soli. Šajā fāzē sniegšu atgriezenisko saiti, un trenēsim “pitch” runu jeb to, kā tu sevi pozicionē." } }
  ],

  /* ---------------- Workshop themes ---------------- */
  workshopThemes: [
    { title: { en: "Personal Brand That Works For You", lv: "Personīgais zīmols" },
      text: { en: "Positioning yourself clearly — without turning into a full-time content creator.", lv: "Kā skaidri sevi pozicionēt sociālajos tīklos un veidot saturu, kas nes rezultātu tev vai tavam pakalpojumam." } },
    { title: { en: "LinkedIn Training", lv: "LinkedIn apmācības" },
      text: { en: "Building a professional LinkedIn profile step by step, practical examples, content creation and understanding the platform. I also run LinkedIn ambassador programmes for companies.", lv: "LinkedIn profila izveide soli pa solim, kā kļūt pievilcīgam darba tirgū un veidot kontaktus ar nozares līderiem, profesionāla satura radīšana un izpratne par platformu. Vadu arī LinkedIn ambassador programmas uzņēmumiem." } },
    { title: { en: "Building Something Alongside Your 9–5", lv: "Papildu ienākumu avotu izveide līdzās pamatdarbam" },
      text: { en: "What it really takes, and how to start without quitting.", lv: "Ko tas patiesībā prasa un kā sākt, neaizejot no darba." } },
    { title: { en: "Time, Energy & Money for Your Next Chapter", lv: "Laiks, enerģija un nauda tavai nākamajai nodaļai" },
      text: { en: "Three resources, one honest plan.", lv: "Trīs resursi, viens plāns, kas strādā." } },
    { title: { en: "Career Direction & Personal Brand", lv: "Karjeras virziens" },
      text: { en: "For team growth and for reaching professional and personal goals.", lv: "Komandu izaugsmei un profesionālo &amp; personīgo mērķu sasniegšanai." } }
  ],

  /* ---------------- Upcoming public events ----------------
     Example: { date: { en: "14 Nov 2026", lv: "2026. gada 14. nov." },
                title: { en: "...", lv: "..." }, place: { en: "Riga / online", lv: "Rīga / tiešsaistē" },
                url: "https://..." }                                                         */
  events: [],

  /* ---------------- Testimonials ----------------
     Set placeholder: false once real, approved quotes are added.            */
  testimonials: [
    { placeholder: true,
      quote: { en: "Short client quote goes here — one or two sentences about what changed.", lv: "Šeit būs īss klientes citāts — viens vai divi teikumi par to, kas mainījās." },
      name: "Client name", context: { en: "Role or context", lv: "Amats vai konteksts" } },
    { placeholder: true,
      quote: { en: "A second quote, ideally about the 36-Day Journey workbook.", lv: "Otrs citāts, ideālā gadījumā par 36 dienu ceļa burtnīcu." },
      name: "Client name", context: { en: "Role or context", lv: "Amats vai konteksts" } },
    { placeholder: true,
      quote: { en: "A third quote, ideally from a workshop or team session.", lv: "Trešais citāts, ideālā gadījumā no darbnīcas vai komandas sesijas." },
      name: "Client name", context: { en: "Role or context", lv: "Amats vai konteksts" } }
  ]
};
