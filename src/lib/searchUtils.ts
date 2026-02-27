/**
 * Search utility functions for multilingual search support
 * Supports: Cyrillic (Russian) and Latin characters
 * Includes comprehensive city/region aliases for all destinations
 */

// Region aliases - alternative names, cities, and popular places for countries/regions
// Key: main region name (as stored in DB), Value: array of aliases
// Includes: country names, city names, resort names, transliterations
export const regionAliases: Record<string, string[]> = {
  // ОАЭ - Объединённые Арабские Эмираты
  ОАЭ: [
    // Country names
    "oae",
    "оаэ",
    "uae",
    "emirates",
    "emiraty",
    "эмираты",
    "united arab emirates",
    "объединённые арабские эмираты",
    "объединенные арабские эмираты",
    "арабские эмираты",
    // Cities
    "dubai",
    "dubay",
    "dubaj",
    "дубай",
    "дубаи",
    "дубаій",
    "abu dhabi",
    "abu-dhabi",
    "abudhabi",
    "абу-даби",
    "абу даби",
    "абудаби",
    "sharjah",
    "shardzha",
    "шарджа",
    "шарджах",
    "ajman",
    "аджман",
    "ajman",
    "fujairah",
    "fujeyra",
    "фуджейра",
    "фуджайра",
    "ras al khaimah",
    "ras-al-khaimah",
    "рас-аль-хайма",
    "рас аль хайма",
    "umm al quwain",
    "умм-аль-кувейн",
    // Popular places
    "palm jumeirah",
    "палм джумейра",
    "джумейра",
    "jumeirah",
    "burj khalifa",
    "бурдж халифа",
    "бурдж-халифа",
    "marina",
    "марина",
    "dubai marina",
    "дубай марина",
  ],

  // Турция
  Турция: [
    // Country names
    "turkey",
    "turkiye",
    "türkiye",
    "turtsiya",
    "turkiya",
    "турция",
    "турции",
    "туркия",
    // Cities & Resorts
    "istanbul",
    "стамбул",
    "истамбул",
    "истанбул",
    "стамбуль",
    "antalya",
    "antaliya",
    "анталья",
    "анталия",
    "анталя",
    "bodrum",
    "бодрум",
    "bodr",
    "alanya",
    "аланья",
    "аланя",
    "алания",
    "marmaris",
    "мармарис",
    "марморис",
    "kemer",
    "кемер",
    "side",
    "сиде",
    "сайд",
    "fethiye",
    "фетхие",
    "фетие",
    "фетхіе",
    "belek",
    "белек",
    "kusadasi",
    "кушадасы",
    "кушадасі",
    "кусадаси",
    "dalaman",
    "даламан",
    "izmir",
    "измир",
    "ізмір",
    "ankara",
    "анкара",
    "cappadocia",
    "каппадокия",
    "каппадокія",
    "kappadokiya",
    "pamukkale",
    "памуккале",
    "trabzon",
    "трабзон",
    "cesme",
    "чешме",
    "didim",
    "дидим",
    "kas",
    "каш",
    "oludeniz",
    "олюдениз",
    "antakya",
    "антакья",
  ],

  // Египет
  Египет: [
    // Country names
    "egypt",
    "egipet",
    "misr",
    "египет",
    "єгипет",
    "егип",
    // Cities & Resorts
    "sharm el sheikh",
    "sharm-el-sheikh",
    "sharm",
    "шарм-эль-шейх",
    "шарм эль шейх",
    "шарм ель шейх",
    "шарм",
    "шармельшейх",
    "hurghada",
    "hurgada",
    "хургада",
    "хургадо",
    "cairo",
    "kairo",
    "каир",
    "каїр",
    "alexandria",
    "aleksandriya",
    "александрия",
    "александрія",
    "dahab",
    "дахаб",
    "marsa alam",
    "марса алам",
    "марса-алам",
    "safaga",
    "сафага",
    "el gouna",
    "эль-гуна",
    "эль гуна",
    "ель гуна",
    "taba",
    "таба",
    "luxor",
    "луксор",
    "aswan",
    "асуан",
    "soma bay",
    "сома бэй",
    "сома бей",
    "nuweiba",
    "нувейба",
    "makadi bay",
    "макади",
    "макади бей",
  ],

  // Таиланд
  Таиланд: [
    // Country names
    "thailand",
    "tailand",
    "tai",
    "тайланд",
    "таиланд",
    "тай",
    "таїланд",
    "тайлан",
    // Cities & Resorts
    "phuket",
    "пхукет",
    "фукет",
    "пукет",
    "пугет",
    "pattaya",
    "pattaia",
    "паттайя",
    "паттая",
    "патая",
    "патайя",
    "bangkok",
    "бангкок",
    "бангкоk",
    "samui",
    "koh samui",
    "ко самуи",
    "самуи",
    "самуі",
    "krabi",
    "краби",
    "крабі",
    "chiang mai",
    "чиангмай",
    "чианг май",
    "чіанг май",
    "chiangmai",
    "chiang rai",
    "чианг рай",
    "чіанграй",
    "hua hin",
    "хуа хин",
    "хуахин",
    "koh chang",
    "ко чанг",
    "ко-чанг",
    "kochang",
    "koh phangan",
    "ко панган",
    "пханган",
    "панган",
    "koh tao",
    "ко тао",
    "котао",
    "koh lipe",
    "ко липе",
    "колипе",
    "phi phi",
    "пхи пхи",
    "фи фи",
    "phi-phi",
    "railay",
    "рейли",
    "райли",
    "ao nang",
    "ао нанг",
    "аонанг",
    "koh lanta",
    "ко ланта",
    "коланта",
    "ayutthaya",
    "аюттхая",
    "аютая",
  ],

  // Вьетнам
  Вьетнам: [
    // Country names
    "vietnam",
    "viet nam",
    "вьетнам",
    "вєтнам",
    "въетнам",
    "ветнам",
    "vn",
    // Cities & Resorts
    "nha trang",
    "nha-trang",
    "nhatrang",
    "nyachang",
    "нячанг",
    "ня чанг",
    "нятранг",
    "ho chi minh",
    "ho-chi-minh",
    "хошимин",
    "хо ши мин",
    "хо-ши-мин",
    "сайгон",
    "saigon",
    "hanoi",
    "ханой",
    "ханої",
    "ha noi",
    "da nang",
    "danang",
    "дананг",
    "да нанг",
    "phu quoc",
    "phuquoc",
    "фукуок",
    "фу куок",
    "фу-куок",
    "hoi an",
    "hoian",
    "хойан",
    "хой ан",
    "mui ne",
    "muine",
    "муйне",
    "муй не",
    "муи не",
    "da lat",
    "dalat",
    "далат",
    "да лат",
    "sapa",
    "sa pa",
    "сапа",
    "са па",
    "ha long",
    "halong",
    "халонг",
    "ха лонг",
    "бухта халонг",
    "hue",
    "хюэ",
    "хуэ",
    "quy nhon",
    "куинён",
    "куи ньон",
    "vung tau",
    "вунгтау",
    "вунг тау",
    "con dao",
    "кондао",
    "кон дао",
    "ninh binh",
    "нинь бинь",
    "ниньбинь",
    "can tho",
    "кантхо",
    "кан тхо",
  ],

  // Индонезия
  Индонезия: [
    // Country names
    "indonesia",
    "индонезия",
    "індонезія",
    "indo",
    // Cities & Islands
    "bali",
    "бали",
    "балі",
    "jakarta",
    "джакарта",
    "jakarta",
    "lombok",
    "ломбок",
    "java",
    "ява",
    "джава",
    "ubud",
    "убуд",
    "seminyak",
    "семиньяк",
    "семіньяк",
    "kuta",
    "кута",
    "sanur",
    "санур",
    "nusa dua",
    "нуса дуа",
    "нусадуа",
    "jimbaran",
    "джимбаран",
    "canggu",
    "чангу",
    "чанггу",
    "uluwatu",
    "улувату",
    "gili",
    "gili islands",
    "гили",
    "острова гили",
    "komodo",
    "комодо",
    "sumatra",
    "суматра",
    "yogyakarta",
    "джокьякарта",
    "джогья",
    "bandung",
    "бандунг",
    "surabaya",
    "сурабая",
    "raja ampat",
    "раджа ампат",
    "flores",
    "флорес",
  ],

  // Малайзия
  Малайзия: [
    // Country names
    "malaysia",
    "малайзия",
    "малайзія",
    "малазия",
    // Cities & Islands
    "kuala lumpur",
    "kualalumpur",
    "куала-лумпур",
    "куала лумпур",
    "куалалумпур",
    "kl",
    "langkawi",
    "лангкави",
    "ланкави",
    "penang",
    "пенанг",
    "borneo",
    "борнео",
    "kota kinabalu",
    "кота кинабалу",
    "кота-кинабалу",
    "malacca",
    "melaka",
    "малакка",
    "cameron highlands",
    "камерон хайлендс",
    "каімерон",
    "sabah",
    "сабах",
    "sarawak",
    "саравак",
    "redang",
    "реданг",
    "perhentian",
    "перхентиан",
    "tioman",
    "тиоман",
    "ipoh",
    "ипо",
    "ипох",
    "johor bahru",
    "джохор бару",
    "джохор",
  ],

  // Мальдивы
  Мальдивы: [
    // Country names
    "maldives",
    "мальдивы",
    "мальдіви",
    "maldiv",
    "мальдив",
    "мальдивские острова",
    // Atolls & Islands
    "male",
    "мале",
    "малє",
    "maafushi",
    "маафуши",
    "маафушi",
    "hulhumale",
    "хулхумале",
    "baa atoll",
    "баа атолл",
    "ari atoll",
    "ари атолл",
    "south male atoll",
    "южный мале атолл",
    "north male atoll",
    "северный мале атолл",
    "sun island",
    "сан айленд",
    "reethi beach",
    "рити бич",
    "meeru",
    "миру",
    "kurumba",
    "курумба",
    "bandos",
    "бандос",
    "paradise island",
    "парадайз айленд",
  ],

  // Шри-Ланка
  "Шри-Ланка": [
    // Country names
    "sri lanka",
    "srilanka",
    "шри-ланка",
    "шри ланка",
    "шріланка",
    "ланка",
    "ceylon",
    "цейлон",
    // Cities & Resorts
    "colombo",
    "коломбо",
    "bentota",
    "бентота",
    "hikkaduwa",
    "хиккадува",
    "unawatuna",
    "унаватуна",
    "mirissa",
    "мирисса",
    "galle",
    "галле",
    "ella",
    "элла",
    "kandy",
    "канди",
    "sigiriya",
    "сигирия",
    "nuwara eliya",
    "нувара элия",
    "trincomalee",
    "тринкомали",
    "negombo",
    "негомбо",
    "anuradhapura",
    "анурадхапура",
    "arugam bay",
    "аругам бей",
    "tangalle",
    "тангалле",
    "weligama",
    "велигама",
    "dambulla",
    "дамбулла",
  ],

  // Грузия
  Грузия: [
    // Country names
    "georgia",
    "грузия",
    "грузія",
    "gruziya",
    "sakartvelo",
    "сакартвело",
    // Cities & Resorts
    "tbilisi",
    "тбилиси",
    "тбілісі",
    "batumi",
    "батуми",
    "батумі",
    "kutaisi",
    "кутаиси",
    "borjomi",
    "боржоми",
    "kazbegi",
    "казбеги",
    "степанцминда",
    "stepantsminda",
    "gudauri",
    "гудаури",
    "bakuriani",
    "бакуриани",
    "mestia",
    "местиа",
    "местия",
    "signagi",
    "сигнахи",
    "сигнаги",
    "mtskheta",
    "мцхета",
    "telavi",
    "телави",
    "kobuleti",
    "кобулети",
    "svaneti",
    "сванетия",
    "сванети",
    "kakheti",
    "кахетия",
    "кахети",
    "zugdidi",
    "зугдиди",
    "poti",
    "поти",
  ],

  // Азербайджан
  Азербайджан: [
    // Country names
    "azerbaijan",
    "азербайджан",
    "азербайджан",
    "azer",
    "азер",
    // Cities
    "baku",
    "баку",
    "баки",
    "gabala",
    "габала",
    "sheki",
    "шеки",
    "шекі",
    "ganja",
    "гянджа",
    "lankaran",
    "ленкорань",
    "ланкаран",
    "quba",
    "куба",
    "губа",
    "shahdag",
    "шахдаг",
    "naftalan",
    "нафталан",
    "nakhchivan",
    "нахичевань",
    "shusha",
    "шуша",
    "gobustan",
    "гобустан",
    "mingachevir",
    "мингечевир",
  ],

  // Узбекистан
  Узбекистан: [
    // Country names
    "uzbekistan",
    "узбекистан",
    "узбекістан",
    "ozbekiston",
    "узбек",
    // Cities
    "tashkent",
    "ташкент",
    "тошкент",
    "samarkand",
    "samarqand",
    "самарканд",
    "самарқанд",
    "bukhara",
    "buxoro",
    "бухара",
    "бухоро",
    "khiva",
    "xiva",
    "хива",
    "fergana",
    "fargona",
    "фергана",
    "фарғона",
    "andijan",
    "andijon",
    "андижан",
    "андіжан",
    "namangan",
    "наманган",
    "nukus",
    "нукус",
    "termez",
    "термез",
    "kokand",
    "qoqon",
    "коканд",
    "shahrisabz",
    "шахрисабз",
    "chimgan",
    "чимган",
    "zarafshan",
    "зарафшан",
  ],

  // Казахстан
  Казахстан: [
    // Country names
    "kazakhstan",
    "казахстан",
    "қазақстан",
    "kazak",
    "казак",
    // Cities
    "astana",
    "астана",
    "нур-султан",
    "nur-sultan",
    "almaty",
    "алматы",
    "алма-ата",
    "alma-ata",
    "shymkent",
    "шымкент",
    "чимкент",
    "aktau",
    "актау",
    "aktobe",
    "актобе",
    "karaganda",
    "караганда",
    "қарағанды",
    "atyrau",
    "атырау",
    "pavlodar",
    "павлодар",
    "nur-sultan",
    "нурсултан",
    "turkestan",
    "туркестан",
    "zhezkazgan",
    "жезказган",
    "kokshetau",
    "кокшетау",
    "taldykorgan",
    "талдыкорган",
    "semey",
    "семей",
    "семипалатинск",
    "oral",
    "орал",
    "уральск",
    "kostanay",
    "костанай",
    "petropavl",
    "петропавловск",
  ],

  // Россия
  Россия: [
    // Country names
    "russia",
    "rossiya",
    "россия",
    "росія",
    "рф",
    "rf",
    "russian federation",
    // Cities
    "moscow",
    "москва",
    "moskva",
    "мск",
    "msk",
    "saint petersburg",
    "st petersburg",
    "санкт-петербург",
    "питер",
    "spb",
    "спб",
    "ленинград",
    "sochi",
    "сочи",
    "kazan",
    "казань",
    "yekaterinburg",
    "екатеринбург",
    "екб",
    "novosibirsk",
    "новосибирск",
    "nizhny novgorod",
    "нижний новгород",
    "vladivostok",
    "владивосток",
    "krasnodar",
    "краснодар",
    "kaliningrad",
    "калининград",
    "samara",
    "самара",
    "rostov",
    "ростов",
    "ростов-на-дону",
    "ufa",
    "уфа",
    "volgograd",
    "волгоград",
    "perm",
    "пермь",
    "voronezh",
    "воронеж",
    "adler",
    "адлер",
    "anapa",
    "анапа",
    "gelendzhik",
    "геленджик",
    "murmansk",
    "мурманск",
    "irkutsk",
    "иркутск",
    "baikal",
    "байкал",
  ],

  // США
  США: [
    // Country names
    "usa",
    "сша",
    "ssha",
    "america",
    "америка",
    "united states",
    "соединённые штаты",
    "штаты",
    // Cities
    "new york",
    "нью-йорк",
    "ню йорк",
    "nyc",
    "ny",
    "los angeles",
    "лос-анджелес",
    "лос анджелес",
    "ла",
    "la",
    "miami",
    "майами",
    "маями",
    "las vegas",
    "лас-вегас",
    "лас вегас",
    "вегас",
    "vegas",
    "washington",
    "вашингтон",
    "dc",
    "chicago",
    "чикаго",
    "san francisco",
    "сан-франциско",
    "сан франциско",
    "sf",
    "boston",
    "бостон",
    "seattle",
    "сиэтл",
    "houston",
    "хьюстон",
    "dallas",
    "даллас",
    "atlanta",
    "атланта",
    "orlando",
    "орландо",
    "san diego",
    "сан-диего",
    "denver",
    "денвер",
    "phoenix",
    "финикс",
    "philadelphia",
    "филадельфия",
    "hawaii",
    "гавайи",
    "гаваї",
    "honolulu",
    "гонолулу",
    "maui",
    "мауи",
    "california",
    "калифорния",
    "florida",
    "флорида",
    "texas",
    "техас",
  ],

  // Великобритания
  Великобритания: [
    // Country names
    "uk",
    "united kingdom",
    "великобритания",
    "britain",
    "британия",
    "england",
    "англия",
    "great britain",
    "великобританія",
    "соединённое королевство",
    // Cities
    "london",
    "лондон",
    "manchester",
    "манчестер",
    "birmingham",
    "бирмингем",
    "liverpool",
    "ливерпуль",
    "edinburgh",
    "эдинбург",
    "glasgow",
    "глазго",
    "oxford",
    "оксфорд",
    "cambridge",
    "кембридж",
    "brighton",
    "брайтон",
    "bristol",
    "бристоль",
    "leeds",
    "лидс",
    "cardiff",
    "кардифф",
    "belfast",
    "белфаст",
    "york",
    "йорк",
    "bath",
    "бат",
    "бас",
    "stonehenge",
    "стоунхендж",
    "scotland",
    "шотландия",
    "wales",
    "уэльс",
  ],

  // Германия
  Германия: [
    // Country names
    "germany",
    "deutschland",
    "германия",
    "німеччина",
    "german",
    // Cities
    "berlin",
    "берлин",
    "берлін",
    "munich",
    "münchen",
    "мюнхен",
    "frankfurt",
    "франкфурт",
    "hamburg",
    "гамбург",
    "cologne",
    "köln",
    "кёльн",
    "кельн",
    "düsseldorf",
    "dusseldorf",
    "дюссельдорф",
    "stuttgart",
    "штутгарт",
    "dresden",
    "дрезден",
    "leipzig",
    "лейпциг",
    "hannover",
    "ганновер",
    "nuremberg",
    "nürnberg",
    "нюрнберг",
    "baden-baden",
    "баден-баден",
    "heidelberg",
    "гейдельберг",
    "bremen",
    "бремен",
    "bavaria",
    "бавария",
    "bayern",
    "black forest",
    "шварцвальд",
  ],

  // Франция
  Франция: [
    // Country names
    "france",
    "франция",
    "франція",
    "francia",
    // Cities
    "paris",
    "париж",
    "nice",
    "ницца",
    "marseille",
    "марсель",
    "lyon",
    "лион",
    "bordeaux",
    "бордо",
    "toulouse",
    "тулуза",
    "strasbourg",
    "страсбург",
    "cannes",
    "канны",
    "monaco",
    "монако",
    "saint-tropez",
    "сен-тропе",
    "mont saint-michel",
    "мон-сен-мишель",
    "provence",
    "прованс",
    "loire",
    "луара",
    "normandy",
    "нормандия",
    "disneyland paris",
    "диснейленд париж",
    "versailles",
    "версаль",
    "côte d'azur",
    "лазурный берег",
    "antibes",
    "антиб",
    "avignon",
    "авиньон",
    "nantes",
    "нант",
    "lille",
    "лилль",
  ],

  // Италия
  Италия: [
    // Country names
    "italy",
    "italia",
    "италия",
    "італія",
    "италі",
    // Cities
    "rome",
    "roma",
    "рим",
    "milan",
    "milano",
    "милан",
    "venice",
    "venezia",
    "венеция",
    "florence",
    "firenze",
    "флоренция",
    "флоренція",
    "naples",
    "napoli",
    "неаполь",
    "sicily",
    "sicilia",
    "сицилия",
    "сіцилія",
    "sardinia",
    "sardegna",
    "сардиния",
    "amalfi",
    "амальфи",
    "pisa",
    "пиза",
    "verona",
    "верона",
    "bologna",
    "болонья",
    "genoa",
    "genova",
    "генуя",
    "turin",
    "torino",
    "турин",
    "capri",
    "капри",
    "cinque terre",
    "чинкве терре",
    "positano",
    "позитано",
    "sorrento",
    "сорренто",
    "rimini",
    "римини",
    "lake como",
    "озеро комо",
    "комо",
    "tuscany",
    "toscana",
    "тоскана",
    "pompei",
    "помпеи",
    "vatican",
    "ватикан",
  ],

  // Испания
  Испания: [
    // Country names
    "spain",
    "espana",
    "españa",
    "испания",
    "іспанія",
    // Cities & Resorts
    "barcelona",
    "барселона",
    "madrid",
    "мадрид",
    "ibiza",
    "ибица",
    "ibiza",
    "mallorca",
    "майорка",
    "majorca",
    "tenerife",
    "тенерифе",
    "gran canaria",
    "гран-канария",
    "valencia",
    "валенсия",
    "seville",
    "sevilla",
    "севилья",
    "malaga",
    "малага",
    "marbella",
    "марбелья",
    "granada",
    "гранада",
    "alicante",
    "аликанте",
    "costa brava",
    "коста брава",
    "costa del sol",
    "коста дель соль",
    "benidorm",
    "бенидорм",
    "bilbao",
    "бильбао",
    "san sebastian",
    "сан-себастьян",
    "toledo",
    "толедо",
    "fuerteventura",
    "фуэртевентура",
    "lanzarote",
    "лансароте",
    "palma",
    "пальма",
    "canary islands",
    "канарские острова",
    "канары",
  ],

  // Китай
  Китай: [
    // Country names
    "china",
    "китай",
    "кнр",
    "prc",
    "zhongguo",
    "поднебесная",
    // Cities
    "beijing",
    "пекин",
    "пекін",
    "shanghai",
    "шанхай",
    "hong kong",
    "гонконг",
    "хонконг",
    "сянган",
    "guangzhou",
    "гуанчжоу",
    "shenzhen",
    "шэньчжэнь",
    "xian",
    "сиань",
    "hangzhou",
    "ханчжоу",
    "chengdu",
    "чэнду",
    "macau",
    "макао",
    "guilin",
    "гуйлинь",
    "suzhou",
    "сучжоу",
    "nanjing",
    "нанкин",
    "chongqing",
    "чунцин",
    "great wall",
    "великая стена",
    "великая китайская стена",
    "tiananmen",
    "тяньаньмэнь",
    "forbidden city",
    "запретный город",
    "tibet",
    "тибет",
    "lhasa",
    "лхаса",
    "zhangjiajie",
    "чжанцзяцзе",
    "yunnan",
    "юньнань",
    "hainan",
    "хайнань",
    "sanya",
    "санья",
  ],

  // Япония
  Япония: [
    // Country names
    "japan",
    "yaponiya",
    "япония",
    "японія",
    "nippon",
    "nihon",
    // Cities
    "tokyo",
    "токио",
    "токіо",
    "osaka",
    "осака",
    "kyoto",
    "киото",
    "кіото",
    "hiroshima",
    "хиросима",
    "nagoya",
    "нагоя",
    "sapporo",
    "саппоро",
    "fukuoka",
    "фукуока",
    "nara",
    "нара",
    "kobe",
    "кобе",
    "okinawa",
    "окинава",
    "yokohama",
    "йокогама",
    "kamakura",
    "камакура",
    "nikko",
    "никко",
    "hakone",
    "хаконе",
    "mt fuji",
    "mount fuji",
    "фудзи",
    "фуджи",
    "гора фудзи",
    "akihabara",
    "акихабара",
    "shibuya",
    "шібуя",
    "сибуя",
  ],

  // Южная Корея
  "Южная Корея": [
    // Country names
    "korea",
    "south korea",
    "корея",
    "южная корея",
    "південна корея",
    "republic of korea",
    "rok",
    "hanguk",
    "хангук",
    // Cities
    "seoul",
    "сеул",
    "соул",
    "busan",
    "пусан",
    "incheon",
    "инчхон",
    "інчхон",
    "jeju",
    "чеджу",
    "jeju island",
    "остров чеджу",
    "daegu",
    "тэгу",
    "daejeon",
    "тэджон",
    "gyeongju",
    "кёнджу",
    "suwon",
    "сувон",
    "gangnam",
    "каннам",
    "myeongdong",
    "мёндон",
    "pyeongchang",
    "пхёнчхан",
  ],

  // Индия
  Индия: [
    // Country names
    "india",
    "индия",
    "індія",
    "hindustan",
    "хиндустан",
    "bharata",
    // Cities & States
    "delhi",
    "дели",
    "делі",
    "new delhi",
    "нью-дели",
    "mumbai",
    "мумбай",
    "bombay",
    "бомбей",
    "goa",
    "гоа",
    "jaipur",
    "джайпур",
    "agra",
    "агра",
    "bangalore",
    "бангалор",
    "bengaluru",
    "chennai",
    "ченнай",
    "madras",
    "мадрас",
    "kolkata",
    "калькутта",
    "calcutta",
    "varanasi",
    "варанаси",
    "udaipur",
    "удайпур",
    "kerala",
    "керала",
    "rajasthan",
    "раджастан",
    "taj mahal",
    "тадж-махал",
    "rishikesh",
    "ришикеш",
    "darjeeling",
    "дарджилинг",
    "ladakh",
    "ладакх",
    "amritsar",
    "амритсар",
    "mysore",
    "майсур",
    "cochin",
    "kochi",
    "кочин",
  ],

  // Австрия
  Австрия: [
    // Country names
    "austria",
    "австрия",
    "австрія",
    "österreich",
    // Cities
    "vienna",
    "wien",
    "вена",
    "відень",
    "salzburg",
    "зальцбург",
    "innsbruck",
    "инсбрук",
    "graz",
    "грац",
    "linz",
    "линц",
    "hallstatt",
    "гальштат",
    "хальштат",
    "kitzbühel",
    "kitzbuhel",
    "кицбюэль",
    "zell am see",
    "цель-ам-зее",
    "bad gastein",
    "бад гаштайн",
    "mayrhofen",
    "майрхофен",
    "st anton",
    "санкт-антон",
    "lech",
    "лех",
    "tirol",
    "тироль",
    "klagenfurt",
    "клагенфурт",
    "bregenz",
    "брегенц",
  ],

  // Австралия
  Австралия: [
    // Country names
    "australia",
    "австралия",
    "австралія",
    "aussie",
    "oz",
    // Cities
    "sydney",
    "сидней",
    "сідней",
    "melbourne",
    "мельбурн",
    "brisbane",
    "брисбен",
    "perth",
    "перт",
    "adelaide",
    "аделаида",
    "gold coast",
    "голд кост",
    "золотой берег",
    "cairns",
    "кэрнс",
    "darwin",
    "дарвин",
    "hobart",
    "хобарт",
    "canberra",
    "канберра",
    "great barrier reef",
    "большой барьерный риф",
    "tasmania",
    "тасмания",
    "uluru",
    "улуру",
    "ayers rock",
    "bondi",
    "бонди",
    "byron bay",
    "байрон бей",
  ],

  // Греция
  Греция: [
    // Country names
    "greece",
    "греция",
    "греція",
    "hellas",
    "эллада",
    // Cities & Islands
    "athens",
    "афины",
    "афіни",
    "santorini",
    "санторини",
    "санторіні",
    "mykonos",
    "миконос",
    "crete",
    "крит",
    "rhodes",
    "родос",
    "corfu",
    "корфу",
    "zakynthos",
    "закинф",
    "закинтос",
    "thessaloniki",
    "салоники",
    "фессалоники",
    "meteora",
    "метеора",
    "метеоры",
    "delphi",
    "дельфы",
    "olympia",
    "олимпия",
    "paros",
    "парос",
    "naxos",
    "наксос",
    "kos",
    "кос",
    "lefkada",
    "лефкада",
    "kefalonia",
    "кефалония",
    "halkidiki",
    "халкидики",
    "patmos",
    "патмос",
    "samos",
    "самос",
    "skiathos",
    "скиатос",
  ],

  // Кипр
  Кипр: [
    // Country names
    "cyprus",
    "кипр",
    "кіпр",
    // Cities & Resorts
    "limassol",
    "лимассол",
    "paphos",
    "пафос",
    "larnaca",
    "ларнака",
    "nicosia",
    "никосия",
    "никосія",
    "ayia napa",
    "айя-напа",
    "айя напа",
    "protaras",
    "протарас",
    "troodos",
    "троодос",
    "famagusta",
    "фамагуста",
    "kyrenia",
    "кирения",
  ],

  // Черногория
  Черногория: [
    // Country names
    "montenegro",
    "черногория",
    "чорногорія",
    "crna gora",
    // Cities
    "budva",
    "будва",
    "kotor",
    "котор",
    "tivat",
    "тиват",
    "herceg novi",
    "герцег-нови",
    "podgorica",
    "подгорица",
    "bar",
    "бар",
    "ulcinj",
    "ульцинь",
    "sveti stefan",
    "святой стефан",
    "свети стефан",
    "perast",
    "пераст",
    "cetinje",
    "цетинье",
  ],

  // Хорватия
  Хорватия: [
    // Country names
    "croatia",
    "хорватия",
    "хорватія",
    "hrvatska",
    // Cities
    "dubrovnik",
    "дубровник",
    "split",
    "сплит",
    "zagreb",
    "загреб",
    "pula",
    "пула",
    "zadar",
    "задар",
    "rovinj",
    "ровинь",
    "hvar",
    "хвар",
    "plitvice",
    "плитвице",
    "плитвицкие озера",
    "brac",
    "брач",
    "korcula",
    "корчула",
    "sibenik",
    "шибеник",
    "trogir",
    "трогир",
    "makarska",
    "макарска",
    "opatija",
    "опатия",
  ],

  // Катар
  Катар: [
    // Country names
    "qatar",
    "катар",
    // Cities
    "doha",
    "доха",
    "lusail",
    "лусаил",
    "al wakrah",
    "аль-вакра",
    "al khor",
    "аль-хор",
    "pearl qatar",
    "перл катар",
    "souq waqif",
    "сук вакиф",
  ],

  // Саудовская Аравия
  "Саудовская Аравия": [
    // Country names
    "saudi arabia",
    "саудовская аравия",
    "саудівська аравія",
    "ksa",
    "сауди",
    // Cities
    "riyadh",
    "эр-рияд",
    "рияд",
    "jeddah",
    "джидда",
    "mecca",
    "мекка",
    "medina",
    "медина",
    "dammam",
    "даммам",
    "neom",
    "неом",
    "al ula",
    "аль-ула",
    "abha",
    "абха",
    "tabuk",
    "табук",
  ],

  // Мексика
  Мексика: [
    // Country names
    "mexico",
    "мексика",
    "мексіка",
    // Cities & Resorts
    "cancun",
    "канкун",
    "mexico city",
    "мехико",
    "playa del carmen",
    "плайя-дель-кармен",
    "tulum",
    "тулум",
    "los cabos",
    "лос-кабос",
    "puerto vallarta",
    "пуэрто-вальярта",
    "riviera maya",
    "ривьера майя",
    "acapulco",
    "акапулько",
    "guadalajara",
    "гвадалахара",
    "oaxaca",
    "оахака",
    "cozumel",
    "косумель",
    "monterrey",
    "монтеррей",
    "chichen itza",
    "чичен-ица",
  ],

  // Бразилия
  Бразилия: [
    // Country names
    "brazil",
    "brasil",
    "бразилия",
    "бразілія",
    // Cities
    "rio de janeiro",
    "рио-де-жанейро",
    "рио",
    "rio",
    "sao paulo",
    "сан-паулу",
    "salvador",
    "сальвадор",
    "brasilia",
    "бразилиа",
    "fortaleza",
    "форталеза",
    "recife",
    "ресифи",
    "florianopolis",
    "флорианополис",
    "manaus",
    "манаус",
    "iguazu",
    "игуасу",
    "amazon",
    "амазонка",
    "amazonia",
    "copacabana",
    "копакабана",
  ],

  // Аргентина
  Аргентина: [
    // Country names
    "argentina",
    "аргентина",
    "аргентіна",
    // Cities
    "buenos aires",
    "буэнос-айрес",
    "mendoza",
    "мендоса",
    "cordoba",
    "кордова",
    "patagonia",
    "патагония",
    "ushuaia",
    "ушуайя",
    "bariloche",
    "барилоче",
    "el calafate",
    "эль-калафате",
    "salta",
    "сальта",
    "iguazu falls",
    "водопады игуасу",
  ],

  // Куба
  Куба: [
    // Country names
    "cuba",
    "куба",
    // Cities
    "havana",
    "гавана",
    "la habana",
    "varadero",
    "варадеро",
    "santiago de cuba",
    "сантьяго-де-куба",
    "trinidad",
    "тринидад",
    "vinales",
    "виньялес",
    "cienfuegos",
    "сьенфуэгос",
    "cayo largo",
    "кайо-ларго",
    "cayo coco",
    "кайо-коко",
    "holguin",
    "ольгин",
  ],

  // Доминикана
  Доминикана: [
    // Country names
    "dominican republic",
    "доминикана",
    "доминиканская республика",
    "домініканська республіка",
    // Cities & Resorts
    "punta cana",
    "пунта-кана",
    "santo domingo",
    "санто-доминго",
    "la romana",
    "ла-романа",
    "samana",
    "самана",
    "puerto plata",
    "пуэрто-плата",
    "bavaro",
    "баваро",
    "cap cana",
    "кап-кана",
    "boca chica",
    "бока-чика",
    "cabarete",
    "кабарете",
  ],

  // Сингапур
  Сингапур: [
    // Country/City names
    "singapore",
    "сингапур",
    "сінгапур",
    // Areas
    "marina bay",
    "марина бэй",
    "sentosa",
    "сентоза",
    "orchard road",
    "орчард роад",
    "chinatown",
    "чайнатаун",
    "little india",
    "литл индия",
    "clarke quay",
    "кларк ки",
    "gardens by the bay",
    "сады у залива",
  ],

  // Филиппины
  Филиппины: [
    // Country names
    "philippines",
    "филиппины",
    "філіппіни",
    "pilipinas",
    // Cities & Islands
    "manila",
    "манила",
    "boracay",
    "боракай",
    "cebu",
    "себу",
    "palawan",
    "палаван",
    "el nido",
    "эль-нидо",
    "coron",
    "корон",
    "bohol",
    "бохол",
    "бохоль",
    "siargao",
    "сиаргао",
    "davao",
    "давао",
    "puerto princesa",
    "пуэрто-принсеса",
  ],

  // Камбоджа
  Камбоджа: [
    // Country names
    "cambodia",
    "камбоджа",
    "камбоджи",
    // Cities
    "phnom penh",
    "пномпень",
    "siem reap",
    "сием рип",
    "сиемреап",
    "angkor wat",
    "ангкор-ват",
    "ангкор",
    "sihanoukville",
    "сиануквиль",
    "battambang",
    "баттамбанг",
    "koh rong",
    "ко ронг",
  ],

  // Марокко
  Марокко: [
    // Country names
    "morocco",
    "марокко",
    "marocco",
    "maghreb",
    // Cities
    "marrakech",
    "марракеш",
    "casablanca",
    "касабланка",
    "fes",
    "fez",
    "фес",
    "agadir",
    "агадир",
    "tangier",
    "танжер",
    "chefchaouen",
    "шефшауэн",
    "essaouira",
    "эссуэйра",
    "rabat",
    "рабат",
  ],

  // Иордания
  Иордания: [
    // Country names
    "jordan",
    "иордания",
    "йорданія",
    // Cities & Sites
    "amman",
    "амман",
    "petra",
    "петра",
    "dead sea",
    "мёртвое море",
    "мертвое море",
    "aqaba",
    "акаба",
    "wadi rum",
    "вади рам",
    "jerash",
    "джераш",
  ],

  // Израиль
  Израиль: [
    // Country names
    "israel",
    "израиль",
    "ізраїль",
    // Cities
    "tel aviv",
    "тель-авив",
    "jerusalem",
    "иерусалим",
    "єрусалим",
    "eilat",
    "эйлат",
    "haifa",
    "хайфа",
    "dead sea",
    "мёртвое море",
    "nazareth",
    "назарет",
    "bethlehem",
    "вифлеем",
  ],

  // Оман
  Оман: [
    // Country names
    "oman",
    "оман",
    // Cities
    "muscat",
    "маскат",
    "salalah",
    "салала",
    "nizwa",
    "низва",
    "sur",
    "сур",
  ],

  // Бахрейн
  Бахрейн: [
    // Country names
    "bahrain",
    "бахрейн",
    // Cities
    "manama",
    "манама",
  ],

  // Кувейт
  Кувейт: [
    // Country names
    "kuwait",
    "кувейт",
    // Cities
    "kuwait city",
    "эль-кувейт",
  ],

  // Норвегия
  Норвегия: [
    // Country names
    "norway",
    "норвегия",
    "норвегія",
    "norge",
    // Cities
    "oslo",
    "осло",
    "bergen",
    "берген",
    "tromso",
    "тромсё",
    "stavanger",
    "ставангер",
    "fjords",
    "фьорды",
    "lofoten",
    "лофотенские острова",
    "лофотены",
    "trondheim",
    "тронхейм",
    "northern lights",
    "северное сияние",
  ],

  // Швеция
  Швеция: [
    // Country names
    "sweden",
    "швеция",
    "швеція",
    "sverige",
    // Cities
    "stockholm",
    "стокгольм",
    "gothenburg",
    "гётеборг",
    "malmo",
    "мальмё",
    "uppsala",
    "уппсала",
    "kiruna",
    "кируна",
    "lapland",
    "лапландия",
  ],

  // Финляндия
  Финляндия: [
    // Country names
    "finland",
    "финляндия",
    "фінляндія",
    "suomi",
    // Cities
    "helsinki",
    "хельсинки",
    "rovaniemi",
    "рованиеми",
    "turku",
    "турку",
    "tampere",
    "тампере",
    "lapland",
    "лапландия",
    "santa claus village",
    "деревня санта клауса",
  ],

  // Дания
  Дания: [
    // Country names
    "denmark",
    "дания",
    "данія",
    "danmark",
    // Cities
    "copenhagen",
    "копенгаген",
    "aarhus",
    "орхус",
    "odense",
    "оденсе",
    "legoland",
    "леголенд",
  ],

  // Нидерланды
  Нидерланды: [
    // Country names
    "netherlands",
    "нидерланды",
    "нідерланди",
    "holland",
    "голландия",
    // Cities
    "amsterdam",
    "амстердам",
    "rotterdam",
    "роттердам",
    "hague",
    "гаага",
    "utrecht",
    "утрехт",
    "eindhoven",
    "эйндховен",
    "tulips",
    "тюльпаны",
  ],

  // Бельгия
  Бельгия: [
    // Country names
    "belgium",
    "бельгия",
    "бельгія",
    "belgique",
    // Cities
    "brussels",
    "брюссель",
    "bruges",
    "брюгге",
    "ghent",
    "гент",
    "antwerp",
    "антверпен",
  ],

  // Швейцария
  Швейцария: [
    // Country names
    "switzerland",
    "швейцария",
    "швейцарія",
    "suisse",
    "schweiz",
    // Cities
    "zurich",
    "цюрих",
    "geneva",
    "женева",
    "lucerne",
    "люцерн",
    "interlaken",
    "интерлакен",
    "zermatt",
    "церматт",
    "bern",
    "берн",
    "basel",
    "базель",
    "lausanne",
    "лозанна",
    "alps",
    "альпы",
    "jungfrau",
    "юнгфрау",
    "matterhorn",
    "маттерхорн",
  ],

  // Португалия
  Португалия: [
    // Country names
    "portugal",
    "португалия",
    "португалія",
    // Cities
    "lisbon",
    "lisboa",
    "лиссабон",
    "porto",
    "порту",
    "faro",
    "фару",
    "madeira",
    "мадейра",
    "azores",
    "азорские острова",
    "азоры",
    "sintra",
    "синтра",
    "algarve",
    "алгарве",
    "cascais",
    "кашкайш",
    "coimbra",
    "коимбра",
  ],

  // Чехия
  Чехия: [
    // Country names
    "czech republic",
    "czechia",
    "чехия",
    "чехія",
    // Cities
    "prague",
    "прага",
    "praha",
    "brno",
    "брно",
    "karlovy vary",
    "карловы вары",
    "cesky krumlov",
    "чески крумлов",
    "ostrava",
    "острава",
    "pilsen",
    "пльзень",
  ],

  // Польша
  Польша: [
    // Country names
    "poland",
    "польша",
    "польща",
    "polska",
    // Cities
    "warsaw",
    "варшава",
    "warszawa",
    "krakow",
    "краков",
    "gdansk",
    "гданьск",
    "wroclaw",
    "вроцлав",
    "poznan",
    "познань",
    "zakopane",
    "закопане",
    "auschwitz",
    "освенцим",
  ],

  // Венгрия
  Венгрия: [
    // Country names
    "hungary",
    "венгрия",
    "угорщина",
    "magyarorszag",
    // Cities
    "budapest",
    "будапешт",
    "debrecen",
    "дебрецен",
    "balaton",
    "балатон",
    "eger",
    "эгер",
  ],

  // Новая Зеландия
  "Новая Зеландия": [
    // Country names
    "new zealand",
    "новая зеландия",
    "нова зеландія",
    "nz",
    // Cities
    "auckland",
    "окленд",
    "wellington",
    "веллингтон",
    "queenstown",
    "квинстаун",
    "christchurch",
    "крайстчерч",
    "rotorua",
    "роторуа",
    "milford sound",
    "милфорд саунд",
    "hobbiton",
    "хоббитон",
  ],

  // ЮАР
  ЮАР: [
    // Country names
    "south africa",
    "юар",
    "пар",
    "южная африка",
    "південна африка",
    // Cities
    "cape town",
    "кейптаун",
    "johannesburg",
    "йоханнесбург",
    "durban",
    "дурбан",
    "kruger",
    "крюгер",
    "kruger park",
    "парк крюгера",
    "pretoria",
    "претория",
    "garden route",
    "гарден рут",
  ],

  // Танзания
  Танзания: [
    // Country names
    "tanzania",
    "танзания",
    "танзанія",
    // Cities & Sites
    "zanzibar",
    "занзибар",
    "dar es salaam",
    "дар-эс-салам",
    "kilimanjaro",
    "килиманджаро",
    "serengeti",
    "серенгети",
    "ngorongoro",
    "нгоронгоро",
  ],

  // Кения
  Кения: [
    // Country names
    "kenya",
    "кения",
    "кенія",
    // Cities & Sites
    "nairobi",
    "найроби",
    "mombasa",
    "момбаса",
    "masai mara",
    "масаи-мара",
    "diani beach",
    "диани",
    "amboseli",
    "амбосели",
  ],

  // Маврикий
  Маврикий: [
    // Country names
    "mauritius",
    "маврикий",
    "маврікій",
    // Areas
    "port louis",
    "порт-луи",
    "grand baie",
    "гранд бэй",
    "flic en flac",
    "флик-ан-флак",
    "le morne",
    "ле морн",
  ],

  // Сейшелы
  Сейшелы: [
    // Country names
    "seychelles",
    "сейшелы",
    "сейшельські острови",
    "сейшельские острова",
    // Islands
    "mahe",
    "маэ",
    "praslin",
    "праслин",
    "la digue",
    "ла-диг",
    "victoria",
    "виктория",
  ],

  // Монако
  Монако: [
    // Country/City names
    "monaco",
    "монако",
    // Areas
    "monte carlo",
    "монте-карло",
    "la condamine",
    "ла-кондамин",
  ],

  // Лихтенштейн
  Лихтенштейн: [
    "liechtenstein",
    "лихтенштейн",
    "ліхтенштейн",
    "vaduz",
    "вадуц",
  ],

  // Люксембург
  Люксембург: [
    "luxembourg",
    "люксембург",
    "luxembourg city",
    "город люксембург",
  ],

  // Андорра
  Андорра: ["andorra", "андорра", "andorra la vella", "андорра-ла-велья"],

  // Мальта
  Мальта: [
    // Country names
    "malta",
    "мальта",
    // Cities/Islands
    "valletta",
    "валлетта",
    "gozo",
    "гозо",
    "sliema",
    "слима",
    "st julians",
    "сент-джулианс",
    "mdina",
    "мдина",
  ],

  // Исландия
  Исландия: [
    // Country names
    "iceland",
    "исландия",
    "ісландія",
    // Cities & Sites
    "reykjavik",
    "рейкьявик",
    "blue lagoon",
    "голубая лагуна",
    "golden circle",
    "золотое кольцо",
    "vik",
    "вик",
    "akureyri",
    "акюрейри",
    "northern lights",
    "северное сияние",
  ],

  // Ирландия
  Ирландия: [
    // Country names
    "ireland",
    "ирландия",
    "ірландія",
    "eire",
    // Cities
    "dublin",
    "дублин",
    "дублін",
    "cork",
    "корк",
    "galway",
    "голуэй",
    "limerick",
    "лимерик",
    "cliffs of moher",
    "утёсы мохер",
  ],

  // Латвия
  Латвия: [
    "latvia",
    "латвия",
    "латвія",
    "latvija",
    "riga",
    "рига",
    "ріга",
    "jurmala",
    "юрмала",
    "sigulda",
    "сигулда",
    "liepaja",
    "лиепая",
    "daugavpils",
    "даугавпилс",
    "ventspils",
    "вентспилс",
  ],

  // Литва
  Литва: [
    "lithuania",
    "литва",
    "литва",
    "lietuva",
    "vilnius",
    "вильнюс",
    "вільнюс",
    "kaunas",
    "каунас",
    "klaipeda",
    "клайпеда",
    "palanga",
    "паланга",
    "trakai",
    "тракай",
    "druskininkai",
    "друскининкай",
  ],

  // Эстония
  Эстония: [
    "estonia",
    "эстония",
    "естонія",
    "eesti",
    "tallinn",
    "таллин",
    "таллінн",
    "таллинн",
    "tartu",
    "тарту",
    "parnu",
    "пярну",
    "narva",
    "нарва",
    "haapsalu",
    "хаапсалу",
  ],

  // Беларусь
  Беларусь: [
    "belarus",
    "беларусь",
    "білорусь",
    "белоруссия",
    "белорусь",
    "minsk",
    "минск",
    "мінськ",
    "brest",
    "брест",
    "grodno",
    "гродно",
    "vitebsk",
    "витебск",
    "gomel",
    "гомель",
    "mogilev",
    "могилёв",
    "могилев",
  ],

  // Украина
  Украина: [
    "ukraine",
    "украина",
    "україна",
    "ukr",
    "kyiv",
    "kiev",
    "киев",
    "київ",
    "lviv",
    "львов",
    "львів",
    "odessa",
    "odesa",
    "одесса",
    "одеса",
    "kharkiv",
    "харьков",
    "харків",
    "dnipro",
    "днепр",
    "дніпро",
    "zaporizhzhia",
    "запорожье",
    "запоріжжя",
    "ivano-frankivsk",
    "ивано-франковск",
    "chernivtsi",
    "черновцы",
    "чернівці",
    "uzhhorod",
    "ужгород",
    "carpathians",
    "карпаты",
    "карпати",
  ],

  // Молдова
  Молдова: [
    "moldova",
    "молдова",
    "молдавия",
    "chisinau",
    "kishinev",
    "кишинёв",
    "кишинев",
    "кишинів",
    "tiraspol",
    "тирасполь",
    "balti",
    "бельцы",
  ],

  // Армения
  Армения: [
    "armenia",
    "армения",
    "вірменія",
    "hayastan",
    "yerevan",
    "ереван",
    "єреван",
    "gyumri",
    "гюмри",
    "dilijan",
    "дилижан",
    "sevan",
    "севан",
    "tsaghkadzor",
    "цахкадзор",
    "jermuk",
    "джермук",
  ],

  // Кыргызстан
  Кыргызстан: [
    "kyrgyzstan",
    "кыргызстан",
    "киргизия",
    "киргізія",
    "kirgiziya",
    "bishkek",
    "бишкек",
    "бішкек",
    "osh",
    "ош",
    "issyk kul",
    "иссык-куль",
    "issyk-kul",
    "karakol",
    "каракол",
    "cholpon ata",
    "чолпон-ата",
    "naryn",
    "нарын",
  ],

  // Таджикистан
  Таджикистан: [
    "tajikistan",
    "таджикистан",
    "таджикістан",
    "dushanbe",
    "душанбе",
    "khujand",
    "худжанд",
    "pamir",
    "памир",
  ],

  // Туркменистан
  Туркменистан: [
    "turkmenistan",
    "туркменистан",
    "туркменістан",
    "ashgabat",
    "ашхабад",
    "ашгабад",
    "turkmenbashi",
    "туркменбаши",
    "mary",
    "мары",
    "dashoguz",
    "дашогуз",
  ],

  // Румыния
  Румыния: [
    "romania",
    "румыния",
    "румунія",
    "bucharest",
    "bucuresti",
    "бухарест",
    "brasov",
    "брашов",
    "sibiu",
    "сибиу",
    "cluj",
    "клуж",
    "timisoara",
    "тимишоара",
    "constanta",
    "констанца",
    "transylvania",
    "трансильвания",
  ],

  // Болгария
  Болгария: [
    "bulgaria",
    "болгария",
    "болгарія",
    "sofia",
    "софия",
    "софія",
    "varna",
    "варна",
    "burgas",
    "бургас",
    "plovdiv",
    "пловдив",
    "sunny beach",
    "солнечный берег",
    "золотые пески",
    "golden sands",
    "золотые пески",
    "bansko",
    "банско",
    "nessebar",
    "несебр",
    "несебър",
  ],

  // Сербия
  Сербия: [
    "serbia",
    "сербия",
    "сербія",
    "srbija",
    "belgrade",
    "beograd",
    "белград",
    "novi sad",
    "нови-сад",
    "nis",
    "ниш",
    "kopaonik",
    "копаоник",
  ],

  // Босния и Герцеговина
  "Босния и Герцеговина": [
    "bosnia",
    "bosnia and herzegovina",
    "босния",
    "боснія",
    "босния и герцеговина",
    "sarajevo",
    "сараево",
    "mostar",
    "мостар",
    "banja luka",
    "баня-лука",
  ],

  // Северная Македония
  "Северная Македония": [
    "north macedonia",
    "macedonia",
    "македония",
    "північна македонія",
    "skopje",
    "скопье",
    "скоп'є",
    "ohrid",
    "охрид",
  ],

  // Албания
  Албания: [
    "albania",
    "албания",
    "албанія",
    "shqiperia",
    "tirana",
    "тирана",
    "durres",
    "дуррес",
    "saranda",
    "саранда",
    "vlora",
    "влёра",
  ],

  // Словения
  Словения: [
    "slovenia",
    "словения",
    "словенія",
    "slovenija",
    "ljubljana",
    "любляна",
    "bled",
    "блед",
    "maribor",
    "марибор",
    "piran",
    "пиран",
    "portoroz",
    "порторож",
  ],

  // Словакия
  Словакия: [
    "slovakia",
    "словакия",
    "словаччина",
    "slovensko",
    "bratislava",
    "братислава",
    "kosice",
    "кошице",
    "tatras",
    "татры",
    "высокие татры",
    "zilina",
    "жилина",
  ],

  // Тунис
  Тунис: [
    "tunisia",
    "тунис",
    "туніс",
    "tunis",
    "тунис",
    "sousse",
    "сусс",
    "hammamet",
    "хаммамет",
    "djerba",
    "джерба",
    "monastir",
    "монастир",
    "bizerte",
    "бизерта",
    "carthage",
    "карфаген",
  ],

  // Алжир
  Алжир: [
    "algeria",
    "алжир",
    "алжір",
    "algiers",
    "алжир",
    "oran",
    "оран",
    "constantine",
    "константина",
  ],

  // Ливан
  Ливан: [
    "lebanon",
    "ливан",
    "ліван",
    "beirut",
    "бейрут",
    "tripoli",
    "триполи",
    "byblos",
    "библос",
  ],

  // Иран
  Иран: [
    "iran",
    "иран",
    "іран",
    "persia",
    "персия",
    "tehran",
    "тегеран",
    "isfahan",
    "исфахан",
    "shiraz",
    "шираз",
    "tabriz",
    "тебриз",
    "yazd",
    "язд",
    "mashhad",
    "мешхед",
  ],

  // Ирак
  Ирак: [
    "iraq",
    "ирак",
    "ірак",
    "baghdad",
    "багдад",
    "basra",
    "басра",
    "erbil",
    "эрбиль",
  ],

  // Пакистан
  Пакистан: [
    "pakistan",
    "пакистан",
    "пакістан",
    "islamabad",
    "исламабад",
    "karachi",
    "карачи",
    "lahore",
    "лахор",
    "peshawar",
    "пешавар",
  ],

  // Бангладеш
  Бангладеш: [
    "bangladesh",
    "бангладеш",
    "dhaka",
    "dacca",
    "дакка",
    "chittagong",
    "читтагонг",
    "cox's bazar",
    "кокс-базар",
  ],

  // Непал
  Непал: [
    "nepal",
    "непал",
    "kathmandu",
    "катманду",
    "pokhara",
    "покхара",
    "everest",
    "эверест",
    "lumbini",
    "лумбини",
  ],

  // Мьянма
  Мьянма: [
    "myanmar",
    "мьянма",
    "м'янма",
    "burma",
    "бирма",
    "yangon",
    "янгон",
    "rangoon",
    "рангун",
    "mandalay",
    "мандалай",
    "bagan",
    "баган",
    "inle lake",
    "озеро инле",
  ],

  // Лаос
  Лаос: [
    "laos",
    "лаос",
    "vientiane",
    "вьентьян",
    "luang prabang",
    "луанг прабанг",
    "луангпрабанг",
  ],

  // Монголия
  Монголия: [
    "mongolia",
    "монголия",
    "монголія",
    "ulaanbaatar",
    "ulan bator",
    "улан-батор",
    "улаанбаатар",
    "gobi",
    "гоби",
  ],

  // Перу
  Перу: [
    "peru",
    "перу",
    "lima",
    "лима",
    "cusco",
    "куско",
    "machu picchu",
    "мачу-пикчу",
    "arequipa",
    "арекипа",
    "iquitos",
    "икитос",
  ],

  // Чили
  Чили: [
    "chile",
    "чили",
    "чілі",
    "santiago",
    "сантьяго",
    "valparaiso",
    "вальпараисо",
    "atacama",
    "атакама",
    "patagonia",
    "патагония",
    "easter island",
    "остров пасхи",
  ],

  // Колумбия
  Колумбия: [
    "colombia",
    "колумбия",
    "колумбія",
    "bogota",
    "богота",
    "medellin",
    "медельин",
    "cartagena",
    "картахена",
    "cali",
    "кали",
  ],

  // Эквадор
  Эквадор: [
    "ecuador",
    "эквадор",
    "quito",
    "кито",
    "guayaquil",
    "гуаякиль",
    "galapagos",
    "галапагосы",
  ],

  // Венесуэла
  Венесуэла: [
    "venezuela",
    "венесуэла",
    "caracas",
    "каракас",
    "margarita",
    "маргарита",
  ],

  // Коста-Рика
  "Коста-Рика": [
    "costa rica",
    "коста-рика",
    "коста рика",
    "san jose",
    "сан-хосе",
  ],

  // Панама
  Панама: [
    "panama",
    "панама",
    "panama city",
    "панама-сити",
    "bocas del toro",
    "бокас-дель-торо",
  ],

  // Ямайка
  Ямайка: [
    "jamaica",
    "ямайка",
    "kingston",
    "кингстон",
    "montego bay",
    "монтего-бей",
    "negril",
    "негрил",
  ],

  // Багамы
  Багамы: [
    "bahamas",
    "багамы",
    "багамські острови",
    "nassau",
    "нассау",
    "freeport",
    "фрипорт",
  ],

  // Барбадос
  Барбадос: ["barbados", "барбадос", "bridgetown", "бриджтаун"],

  // Тринидад и Тобаго
  "Тринидад и Тобаго": [
    "trinidad and tobago",
    "тринидад и тобаго",
    "port of spain",
    "порт-оф-спейн",
  ],

  // Фиджи
  Фиджи: ["fiji", "фиджи", "фіджі", "suva", "сува", "nadi", "нади"],

  // Папуа-Новая Гвинея
  "Папуа-Новая Гвинея": [
    "papua new guinea",
    "папуа-новая гвинея",
    "папуа",
    "port moresby",
    "порт-морсби",
  ],

  // Бруней
  Бруней: ["brunei", "бруней", "bandar seri begawan", "бандар-сери-бегаван"],

  // Мадагаскар
  Мадагаскар: [
    "madagascar",
    "мадагаскар",
    "antananarivo",
    "антананариву",
    "nosy be",
    "нуси-бе",
  ],

  // Намибия
  Намибия: [
    "namibia",
    "намибия",
    "намібія",
    "windhoek",
    "виндхук",
    "swakopmund",
    "свакопмунд",
    "etosha",
    "этоша",
  ],

  // Ботсвана
  Ботсвана: [
    "botswana",
    "ботсвана",
    "gaborone",
    "габороне",
    "okavango",
    "окаванго",
    "chobe",
    "чобе",
  ],

  // Зимбабве
  Зимбабве: [
    "zimbabwe",
    "зимбабве",
    "harare",
    "хараре",
    "victoria falls",
    "водопад виктория",
  ],

  // Замбия
  Замбия: [
    "zambia",
    "замбия",
    "замбія",
    "lusaka",
    "лусака",
    "livingstone",
    "ливингстон",
  ],

  // Мозамбик
  Мозамбик: ["mozambique", "мозамбик", "maputo", "мапуту"],

  // Ангола
  Ангола: ["angola", "ангола", "luanda", "луанда"],

  // Нигерия
  Нигерия: [
    "nigeria",
    "нигерия",
    "нігерія",
    "lagos",
    "лагос",
    "abuja",
    "абуджа",
  ],

  // Гана
  Гана: ["ghana", "гана", "accra", "аккра"],

  // Сенегал
  Сенегал: ["senegal", "сенегал", "dakar", "дакар"],

  // Эфиопия
  Эфиопия: ["ethiopia", "эфиопия", "ефіопія", "addis ababa", "аддис-абеба"],

  // Уганда
  Уганда: ["uganda", "уганда", "kampala", "кампала"],

  // Руанда
  Руанда: ["rwanda", "руанда", "kigali", "кигали"],
};

// Cyrillic to Latin mapping
const cyrillicToLatin: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

// Latin to Cyrillic mapping (reverse + common variations)
const latinToCyrillic: Record<string, string> = {
  a: "а",
  b: "б",
  c: "ц",
  d: "д",
  e: "е",
  f: "ф",
  g: "г",
  h: "х",
  i: "и",
  j: "й",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  q: "к",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  v: "в",
  w: "в",
  x: "кс",
  y: "и",
  z: "з",
};

// Multi-character Latin combinations to Cyrillic
const latinCombinationsToCyrillic: Record<string, string> = {
  shch: "щ",
  zh: "ж",
  kh: "х",
  ts: "ц",
  ch: "ч",
  sh: "ш",
  yu: "ю",
  ya: "я",
  yo: "ё",
  ye: "е",
  iy: "ий",
  ey: "ей",
  ay: "ай",
  oy: "ой",
  uy: "уй",
};

/**
 * Convert Cyrillic text to Latin
 */
export function cyrillicToLatinText(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatin[char] || char)
    .join("");
}

/**
 * Convert Latin text to Cyrillic
 */
export function latinToCyrillicText(text: string): string {
  let result = text.toLowerCase();

  // First, replace multi-character combinations (sorted by length, longest first)
  const sortedCombinations = Object.keys(latinCombinationsToCyrillic).sort(
    (a, b) => b.length - a.length
  );

  for (const combo of sortedCombinations) {
    result = result.split(combo).join(latinCombinationsToCyrillic[combo]);
  }

  // Then replace single characters
  return result
    .split("")
    .map((char) => latinToCyrillic[char] || char)
    .join("");
}

/**
 * Check if text contains Cyrillic characters
 */
export function isCyrillic(text: string): boolean {
  return /[а-яёА-ЯЁ]/.test(text);
}

/**
 * Check if text contains Latin characters
 */
export function isLatin(text: string): boolean {
  return /[a-zA-Z]/.test(text);
}

/**
 * Normalize text for comparison (lowercase, trim, remove extra spaces)
 */
export function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Check if query matches any alias for the target region
 * Balanced matching - not too strict, not too loose
 * @param searchQuery - User's search input (normalized)
 * @param targetText - Region name from database
 * @returns boolean
 */
function matchesAlias(searchQuery: string, targetText: string): boolean {
  const normalizedQuery = normalizeText(searchQuery);
  const normalizedTarget = normalizeText(targetText);

  // Minimum query length for search
  if (normalizedQuery.length < 2) return false;

  // Remove hyphens and normalize spaces for comparison
  const cleanQuery = normalizedQuery
    .replace(/[\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Check all region aliases
  for (const [regionName, aliases] of Object.entries(regionAliases)) {
    const normalizedRegion = normalizeText(regionName);

    // Check if target matches this region
    const targetMatchesRegion =
      normalizedRegion === normalizedTarget ||
      normalizedTarget.includes(normalizedRegion) ||
      normalizedRegion.includes(normalizedTarget) ||
      cyrillicToLatinText(normalizedRegion).includes(
        cyrillicToLatinText(normalizedTarget)
      ) ||
      cyrillicToLatinText(normalizedTarget).includes(
        cyrillicToLatinText(normalizedRegion)
      );

    if (targetMatchesRegion) {
      for (const alias of aliases) {
        const normalizedAlias = normalizeText(alias);
        const cleanAlias = normalizedAlias
          .replace(/[\-]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const aliasAsLatin = cyrillicToLatinText(cleanAlias);
        const queryAsLatin = cyrillicToLatinText(cleanQuery);
        const queryAsCyrillic = latinToCyrillicText(cleanQuery);

        // === MATCHING RULES ===

        // 1. EXACT match (highest priority)
        if (cleanAlias === cleanQuery || aliasAsLatin === queryAsLatin) {
          return true;
        }

        // 2. Alias STARTS with query (main autocomplete behavior)
        if (
          cleanAlias.startsWith(cleanQuery) ||
          aliasAsLatin.startsWith(queryAsLatin)
        ) {
          return true;
        }

        // 3. Query STARTS with alias (query is more specific than alias)
        // BUT: Short aliases (2-3 chars like "ny", "la", "sf") should only match
        // if query is also short (max 2 chars longer) to avoid false positives
        // e.g., "nyachang" should NOT match "ny" (New York alias)
        const aliasLen = cleanAlias.length;
        const queryLen = cleanQuery.length;

        if (
          cleanQuery.startsWith(cleanAlias) ||
          queryAsLatin.startsWith(aliasAsLatin)
        ) {
          // Short alias (2-3 chars) - only match if query is very close in length
          if (aliasLen <= 3) {
            // Allow at most 1 extra char for 2-char alias, 2 extra chars for 3-char alias
            const maxExtraChars = aliasLen === 2 ? 1 : 2;
            if (queryLen <= aliasLen + maxExtraChars) {
              return true;
            }
            // Otherwise skip - "nyachang" (8 chars) won't match "ny" (2 chars)
          } else {
            // Longer alias - normal matching
            return true;
          }
        }

        // 4. For longer queries (5+ chars), allow contains
        if (cleanQuery.length >= 5) {
          if (
            cleanAlias.includes(cleanQuery) ||
            aliasAsLatin.includes(queryAsLatin)
          ) {
            return true;
          }
        }

        // Word-by-word matching
        const aliasWords = cleanAlias.split(/\s+/);
        const queryWords = cleanQuery.split(/\s+/);

        // 5. Single word query - check if any alias word starts with query
        if (queryWords.length === 1 && cleanQuery.length >= 3) {
          for (const aliasWord of aliasWords) {
            const awLatin = cyrillicToLatinText(aliasWord);

            if (
              aliasWord.startsWith(cleanQuery) ||
              awLatin.startsWith(queryAsLatin)
            ) {
              return true;
            }
            if (aliasWord.startsWith(queryAsCyrillic)) {
              return true;
            }
          }
        }

        // 6. Multi-word query - STRICTER matching
        // For "phi phi" to match, alias must also have multiple words
        // or be an exact match. Single-word alias like "philadelphia" won't match "phi phi"
        if (queryWords.length > 1) {
          // If alias is single word, query must match start of alias (already checked above)
          // Don't allow single-word alias to match multi-word query unless exact
          if (aliasWords.length === 1) {
            // Skip - already handled in rules 1-4
            continue;
          }

          // Multi-word alias - check if all query words have matching alias words
          // Each query word must match a DIFFERENT alias word (word-for-word match)
          let matchedAliasIndices: number[] = [];
          let allWordsMatch = true;

          for (const queryWord of queryWords) {
            if (queryWord.length < 2) continue;

            const qwLatin = cyrillicToLatinText(queryWord);
            let wordFound = false;

            for (let i = 0; i < aliasWords.length; i++) {
              // Skip already matched alias words (for repeated query words like "phi phi")
              // Actually no - for "phi phi", both should match different "phi" words in alias
              const aliasWord = aliasWords[i];
              const awLatin = cyrillicToLatinText(aliasWord);

              // Check for match
              if (
                aliasWord === queryWord ||
                awLatin === qwLatin ||
                aliasWord.startsWith(queryWord) ||
                awLatin.startsWith(qwLatin)
              ) {
                // For repeated query words, make sure we have enough alias words
                if (!matchedAliasIndices.includes(i)) {
                  matchedAliasIndices.push(i);
                  wordFound = true;
                  break;
                } else {
                  // Check if there's another matching alias word
                  continue;
                }
              }
            }

            if (!wordFound) {
              allWordsMatch = false;
              break;
            }
          }

          // All query words must match distinct alias words
          if (
            allWordsMatch &&
            matchedAliasIndices.length >=
              queryWords.filter((w) => w.length >= 2).length
          ) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

/**
 * Universal search function that matches text in both Cyrillic and Latin
 * Also checks region aliases (e.g., "Dubai" -> "ОАЭ")
 * @param searchQuery - User's search input
 * @param targetText - Text to search in (e.g., country name)
 * @returns boolean - whether the search matches
 */
export function universalSearch(
  searchQuery: string,
  targetText: string
): boolean {
  if (!searchQuery || !targetText) return false;

  const normalizedQuery = normalizeText(searchQuery);
  const normalizedTarget = normalizeText(targetText);

  // Direct match (case-insensitive)
  if (normalizedTarget.includes(normalizedQuery)) {
    return true;
  }

  // Check aliases (Dubai -> ОАЭ, etc.)
  if (matchesAlias(normalizedQuery, targetText)) {
    return true;
  }

  // If query is Latin, try matching against transliterated target
  if (isLatin(normalizedQuery) && !isCyrillic(normalizedQuery)) {
    // Convert target (Cyrillic) to Latin and compare
    const targetAsLatin = cyrillicToLatinText(normalizedTarget);
    if (targetAsLatin.includes(normalizedQuery)) {
      return true;
    }

    // Also try converting query (Latin) to Cyrillic and compare with target
    const queryAsCyrillic = latinToCyrillicText(normalizedQuery);
    if (normalizedTarget.includes(queryAsCyrillic)) {
      return true;
    }
  }

  // If query is Cyrillic, try matching against transliterated query
  if (isCyrillic(normalizedQuery) && !isLatin(normalizedQuery)) {
    // Convert query (Cyrillic) to Latin and compare with target as Latin
    const queryAsLatin = cyrillicToLatinText(normalizedQuery);
    const targetAsLatin = cyrillicToLatinText(normalizedTarget);
    if (targetAsLatin.includes(queryAsLatin)) {
      return true;
    }
  }

  // Mixed query - try both directions
  if (isLatin(normalizedQuery) && isCyrillic(normalizedQuery)) {
    const targetAsLatin = cyrillicToLatinText(normalizedTarget);
    const queryAsLatin = cyrillicToLatinText(normalizedQuery);
    if (targetAsLatin.includes(queryAsLatin)) {
      return true;
    }
  }

  return false;
}

/**
 * Filter array of items by search query with universal matching
 * @param items - Array of items to filter
 * @param searchQuery - User's search input
 * @param getSearchableText - Function to extract searchable text from item
 * @returns Filtered array
 */
export function filterByUniversalSearch<T>(
  items: T[],
  searchQuery: string,
  getSearchableText: (item: T) => string
): T[] {
  if (!searchQuery || !items) return items;

  return items.filter((item) =>
    universalSearch(searchQuery, getSearchableText(item))
  );
}
