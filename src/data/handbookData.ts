import { HandbookSection } from '../types';

export const HANDBOOK_DATA: HandbookSection[] = [
  // 01
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Спряжение слабых глаголов в настоящем времени (Präsens)',
    titleDe: 'Konjugation regelmäßiger schwacher Verben',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-1',
    content: 'В немецком языке основа глагола образуется отбрасыванием окончания инфинитива -en (или -n). К этой основе прибавляются стандартные личные окончания настоящего времени. Если основа глагола заканчивается на -t, -d или группу согласных (arbeiten, finden, antworten), перед окончаниями -st и -t добавляется соединительная гласная -e-. Если основа заканчивается на шипящие -s, -ß, -z, -x (heißen, reisen), во 2-м лице ед. ч. выпадает -s и добавляется только -t.',
    tables: [
      {
        headers: ['Лицо / Местоимение', 'Окончание', 'lernen (учить)', 'wohnen (жить)', 'arbeiten (работать)', 'heißen (зваться)'],
        rows: [
          ['ich (я)', '-e', 'ich lerne', 'ich wohne', 'ich arbeite', 'ich heiße'],
          ['du (ты)', '-st', 'du lernst', 'du wohnst', 'du arbeitest', 'du heißt'],
          ['er / sie / es (он/она/оно)', '-t', 'er lernt', 'sie wohnt', 'es arbeitet', 'er heißt'],
          ['wir (мы)', '-en', 'wir lernen', 'wir wohnen', 'wir arbeiten', 'wir heißen'],
          ['ihr (вы, друзья/дети)', '-t', 'ihr lernt', 'ihr wohnt', 'ihr arbeitet', 'ihr heißt'],
          ['sie / Sie (они / Вы вежл.)', '-en', 'sie lernen / Sie lernen', 'sie wohnen / Sie wohnen', 'sie arbeiten', 'Sie heißen'],
        ],
      },
    ],
    ruleTips: [
      'Запомните мнемонику окончаний: -e, -st, -t, -en, -t, -en («ЭСТ-ТЕН-ТЕН»).',
      'Глаголы heißen, tanzen, reisen во 2-м лице (du) имеют окончание -t, а не -st (du heißt, du tanzt).',
      'Формы для wir и вежливого Sie всегда совпадают с инфинитивом глагола.',
    ],
    examples: [
      { de: 'Ich lerne fleißig Deutsch für mein Au-Pair-Jahr.', ru: 'Я усердно учу немецкий язык для моего года Au-Pair.' },
      { de: 'Wo wohnen Sie zurzeit in Deutschland?', ru: 'Где Вы сейчас живете в Германии?' },
      { de: 'Mein Bruder arbeitet als Krankenpfleger.', ru: 'Мой брат работает медбратом.' },
    ],
  },

  // 02
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Сильные глаголы с изменением корневой гласной (e→i/ie, a→ä)',
    titleDe: 'Starke Verben mit Vokalwechsel im Präsens',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-2',
    content: 'Ряд сильных немецких глаголов меняет корневую гласную во 2-м (du) и 3-м (er/sie/es) лице единственного числа. В остальных лицах (ich, wir, ihr, sie/Sie) корневая гласная не изменяется. Основные типы чередования: e → i (geben, sprechen, helfen), e → ie (sehen, lesen), a → ä (fahren, schlafen, tragen), au → äu (laufen).',
    tables: [
      {
        headers: ['Местоимение', 'geben (e → i)', 'sehen (e → ie)', 'fahren (a → ä)', 'helfen (e → i)'],
        rows: [
          ['ich', 'ich gebe', 'ich sehe', 'ich fahre', 'ich helfe'],
          ['du', 'du gibst ⚡', 'du siehst ⚡', 'du fährst ⚡', 'du hilfst ⚡'],
          ['er / sie / es', 'er gibt ⚡', 'sie sieht ⚡', 'er fährt ⚡', 'sie hilft ⚡'],
          ['wir', 'wir geben', 'wir sehen', 'wir fahren', 'wir helfen'],
          ['ihr', 'ihr gebt', 'ihr seht', 'ihr fahrt', 'ihr helft'],
          ['sie / Sie', 'sie geben', 'sie sehen', 'sie fahren', 'sie helfen'],
        ],
      },
    ],
    ruleTips: [
      'Изменение корневой гласной происходит ТОЛЬКО у местоимений du и er/sie/es.',
      'Для местоимения ihr гласная НЕ меняется (ihr fahrt, ihr helft, ihr gebt).',
      'Глагол nehmen меняется на du nimmst, er nimmt (e → i с удвоением m).',
    ],
    examples: [
      { de: 'Sprichst du schon gut Deutsch?', ru: 'Ты уже хорошо говоришь по-немецки?' },
      { de: 'Er fährt morgen früh nach Berlin.', ru: 'Он едет завтра утром в Берлин.' },
      { de: 'Die Gastmutter hilft mir bei den Papieren.', ru: 'Принимающая мама помогает мне с документами.' },
    ],
  },

  // 03
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Вспомогательные глаголы sein (быть) и haben (иметь)',
    titleDe: 'Die Verben sein und haben im Präsens',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-3',
    content: 'Глаголы sein и haben — фундаментальные в немецком языке. Они спрягаются не по правилам и используются как самостоятельные глаголы связки («я есть студент», «у меня есть контракт»), так и в качестве вспомогательных глаголов для образования прошедшего времени Perfekt.',
    tables: [
      {
        headers: ['Лицо', 'sein (быть, являться)', 'haben (иметь, обладать)'],
        rows: [
          ['ich', 'ich bin (я есть)', 'ich habe (у меня есть)'],
          ['du', 'du bist (ты есть)', 'du hast (у тебя есть)'],
          ['er / sie / es', 'er/sie/es ist (он/она есть)', 'er/sie/es hat (у него/нее есть)'],
          ['wir', 'wir sind (мы есть)', 'wir haben (у нас есть)'],
          ['ihr', 'ihr seid (вы есть)', 'ihr habt (у вас есть)'],
          ['sie / Sie', 'sie sind / Sie sind', 'sie haben / Sie haben'],
        ],
      },
    ],
    ruleTips: [
      'В немецком глагол-связка sein никогда не опускается: «Ich bin bereit» (а не «Ich bereit»).',
      'Обратите внимание на форму ihr seid (пишется через d, не путать с предлогом seit).',
      'После глагола haben всегда используется Akkusativ: «Ich habe einen Vertrag».',
    ],
    examples: [
      { de: 'Ich bin pünktlich und zuverlässig.', ru: 'Я пунктуален и надежен.' },
      { de: 'Ich habe alle Unterlagen für das Visum dabei.', ru: 'У меня с собой все документы для визы.' },
      { de: 'Wir sind sehr glücklich über die Zusage.', ru: 'Мы очень счастливы получить подтверждение.' },
    ],
  },

  // 04
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Определенный, неопределенный и отрицательный артикли',
    titleDe: 'Bestimmte, unbestimmte und negative Artikel (kein)',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-4',
    content: 'Каждое существительное в немецком языке имеет грамматический род: мужской (der), женский (die) или средний (das). Неопределенный артикль (ein / eine / ein) используется при первом упоминании предмета. Отрицательный артикль (kein / keine / kein) отрицает только существительные с неопределенным или нулевым артиклем.',
    tables: [
      {
        headers: ['Род / Число', 'Определенный (der/die/das)', 'Неопределенный (ein/eine)', 'Отрицательный (kein/keine)'],
        rows: [
          ['Мужской (Maskulinum)', 'der Pass (паспорт)', 'ein Pass', 'kein Pass'],
          ['Женский (Femininum)', 'die Schule (школа)', 'eine Schule', 'keine Schule'],
          ['Средний (Neutrum)', 'das Visum (виза)', 'ein Visum', 'kein Visum'],
          ['Множественное (Plural)', 'die Dokumente (документы)', '— (нулевой артикль)', 'keine Dokumente'],
        ],
      },
    ],
    ruleTips: [
      'Во множественном числе неопределенного артикля НЕТ, но отрицание keine существует: «Das sind keine Probleme».',
      'Отрицание nicht отрицает глаголы, прилагательные и конкретные имена; kein отрицает существительные.',
      'Учите каждое существительное строго с его артиклем (der Tisch, die Lampe, das Buch).',
    ],
    examples: [
      { de: 'Das ist ein Visumantrag. Der Antrag ist vollständig.', ru: 'Это визовая анкета. Анкета заполнена полностью.' },
      { de: 'Ich habe leider keine Zeit heute.', ru: 'К сожалению, у меня нет времени сегодня.' },
      { de: 'Er hat keinen deutschen Führerschein.', ru: 'У него нет немецких водительских прав.' },
    ],
  },

  // 05
  {
    id: 'topic-5',
    topicNumber: 5,
    title: 'Винительный падеж (Akkusativ) — кого? что? куда?',
    titleDe: 'Der Akkusativ (Wen? Was? Wohin?)',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-5',
    content: 'Akkusativ — винительный падеж немецкого языка. Отвечает на вопросы Wen? (Кого?) и Was? (Что?), а также Wohin? (Куда?). Главное правило: в Akkusativ изменяется ТОЛЬКО мужской род (der → den, ein → einen, kein → keinen, mein → meinen). Женский, средний род и множественное число остаются точно такими же, как в Nominativ.',
    tables: [
      {
        headers: ['Род / Падеж', 'Nominativ (Именительный)', 'Akkusativ (Винительный)', 'Притяжательный в Akk.', 'Отрицание в Akk.'],
        rows: [
          ['Мужской (m)', 'der Brief / ein Brief', 'den Brief / einen Brief ⚡', 'meinen Brief ⚡', 'keinen Brief ⚡'],
          ['Женский (f)', 'die Familie / eine Familie', 'die Familie / eine Familie', 'meine Familie', 'keine Familie'],
          ['Средний (n)', 'das Zimmer / ein Zimmer', 'das Zimmer / ein Zimmer', 'mein Zimmer', 'kein Zimmer'],
          ['Множ. число (pl)', 'die Kinder / — Kinder', 'die Kinder / — Kinder', 'meine Kinder', 'keine Kinder'],
        ],
      },
    ],
    ruleTips: [
      'Глаголы, всегда требующие Akkusativ: haben, brauchen, suchen, finden, kaufen, trinken, essen, sehen, hören, verstehen.',
      'Мужской род — единственный, кто получает суффикс -en (den, einen, meinen, deinen, keinen).',
    ],
    examples: [
      { de: 'Ich brauche einen neuen Reisepass.', ru: 'Мне нужен новый загранпаспорт.' },
      { de: 'Sie sucht den Bahnhof.', ru: 'Она ищет вокзал.' },
      { de: 'Ich habe meinen Lebenslauf ausgedruckt.', ru: 'Я распечатал свое резюме.' },
    ],
  },

  // 06
  {
    id: 'topic-6',
    topicNumber: 6,
    title: 'Дательный падеж (Dativ) — кому? где? откуда?',
    titleDe: 'Der Dativ (Wem? Wo? Wann?)',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-6',
    content: 'Dativ — дательный падеж немецкого языка. Отвечает на вопросы Wem? (Кому?), Wo? (Где?), Wann? (Когда?). В Dativ меняются ВСЕ артикли: мужской и средний род получают -m (dem, einem, meinem), женский род получает -r (der, einer, meiner), а во множественном числе артикль становится den, и само существительное получает окончание -(e)n.',
    tables: [
      {
        headers: ['Род', 'Nominativ', 'Dativ (Определенный)', 'Dativ (Неопределенный)', 'Dativ (Притяжательный/Отрицание)'],
        rows: [
          ['Мужской (m)', 'der Vater', 'dem Vater', 'einem Vater', 'meinem / keinem Vater'],
          ['Средний (n)', 'das Kind', 'dem Kind', 'einem Kind', 'meinem / keinem Kind'],
          ['Женский (f)', 'die Mutter', 'der Mutter ⚡', 'einer Mutter ⚡', 'meiner / keiner Mutter ⚡'],
          ['Множественное (pl)', 'die Kinder', 'den Kindern ⚡ (+n)', '— Kindern (+n)', 'meinen / keinen Kindern (+n)'],
        ],
      },
    ],
    ruleTips: [
      'Запомните окончания Dativ: мужской/средний = -M (dem), женский = -R (der), множественное = -N (den + n к слову).',
      'Глаголы, требующие Dativ: helfen (помогать), danken (благодарить), gefallen (нравиться), gehören (принадлежать), schmecken (быть по вкусу), antworten (отвечать).',
    ],
    examples: [
      { de: 'Ich helfe der Gastmutter beim Kochen.', ru: 'Я помогаю принимающей маме с готовкой.' },
      { de: 'Das Zimmer gefällt dem Schüler sehr.', ru: 'Комната очень нравится ученику.' },
      { de: 'Wir danken den Lehrern für die Unterstützung.', ru: 'Мы благодарим учителей за поддержку.' },
    ],
  },

  // 07
  {
    id: 'topic-7',
    topicNumber: 7,
    title: 'Предлоги двойного управления (Wechselpräpositionen)',
    titleDe: 'Wechselpräpositionen: Wohin? (Akk) vs. Wo? (Dat)',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-7',
    content: '9 предлогов двойного управления: an, auf, hinter, in, neben, über, unter, vor, zwischen. Если предложение отвечает на вопрос Wohin? (Куда? Направление/динамика) — ставится Akkusativ. Если предложение отвечает на вопрос Wo? (Где? Местонахождение/статика) — ставится Dativ.',
    tables: [
      {
        headers: ['Предлог', 'Значение', 'Wohin? + Akkusativ (Куда?)', 'Wo? + Dativ (Где?)'],
        rows: [
          ['in', 'в / внутрь', 'Ich gehe in den Park / ins Zimmer', 'Ich bin im (in dem) Park / im Zimmer'],
          ['auf', 'на (горизонталь)', 'Ich lege das Buch auf den Tisch', 'Das Buch liegt auf dem Tisch'],
          ['an', 'у / на (вертикаль)', 'Ich hänge das Bild an die Wand', 'Das Bild hängt an der Wand'],
          ['vor', 'перед / до', 'Er stellt das Auto vor das Haus', 'Das Auto steht vor dem Haus'],
          ['hinter', 'за / позади', 'Die Katze läuft hinter das Sofa', 'Die Katze schläft hinter dem Sofa'],
          ['neben', 'рядом с / около', 'Ich setze mich neben die Kollegin', 'Ich sitze neben der Kollegin'],
          ['unter', 'под', 'Der Hund läuft unter den Tisch', 'Der Hund liegt unter dem Tisch'],
          ['über', 'над / через', 'Er hängt die Lampe über den Tisch', 'Die Lampe hängt über dem Tisch'],
          ['zwischen', 'между', 'Ich stelle die Tasche zwischen die Stühle', 'Die Tasche steht zwischen den Stühlen'],
        ],
      },
    ],
    ruleTips: [
      'Пары глаголов: legen (класть - куда? Akk) / liegen (лежать - где? Dat); stellen (ставить - Akk) / stehen (стоять - Dat); setzen (сажать - Akk) / sitzen (сидеть - Dat).',
      'Слияния предлогов с артиклями: in + das = ins; in + dem = im; an + das = ans; an + dem = am; auf + das = aufs.',
    ],
    examples: [
      { de: 'Wohin gehst du? — Ich gehe in die Sprachschule.', ru: 'Куда ты идешь? — Я иду в языковую школу (Akkusativ).' },
      { de: 'Wo bist du jetzt? — Ich bin in der Sprachschule.', ru: 'Где ты сейчас? — Я в языковой школе (Dativ).' },
      { de: 'Ich lege den Pass auf den Schreibtisch.', ru: 'Я кладу паспорт на письменный стол.' },
    ],
  },

  // 08
  {
    id: 'topic-8',
    topicNumber: 8,
    title: 'Глаголы с отделяемыми и неотделяемыми приставками',
    titleDe: 'Trennbare und untrennbare Verben',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-8',
    content: 'В немецком языке приставки делятся на ударные отделяемые и безударные неотделяемые. В простом настоящем времени (Präsens) отделяемая приставка уходит в самый конец предложения. Неотделяемая приставка никогда не отделяется от корня.',
    tables: [
      {
        headers: ['Тип приставки', 'Список приставок', 'Примеры глаголов', 'Пример в предложении'],
        rows: [
          ['Отделяемые (Ударные)', 'ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-, zurück-, fern-', 'aufstehen, anrufen, einkaufen, mitkommen, vorbereiten', 'Ich stehe jeden Tag um 7 Uhr auf.'],
          ['Неотделяемые (Безударные)', 'be-, ge-, er-, ver-, zer-, ent-, emp-, miss-', 'verstehen, bekommen, erzählen, erklären, gefallen', 'Ich verstehe die deutsche Grammatik gut.'],
        ],
      },
    ],
    ruleTips: [
      'Мнемоническое правило для неотделяемых приставок: «Бе-ге-ер, фер-цер, энт-эмп-мисс — ударение не ставь и приставку не дели!».',
      'Если в предложении есть модальный глагол, отделяемый глагол идет в конец целиком в инфинитиве: «Ich muss um 7 Uhr aufstehen».',
    ],
    examples: [
      { de: 'Der Zug kommt um 15:30 Uhr in Frankfurt an.', ru: 'Поезд прибывает во Франкфурт в 15:30 (ankommen).' },
      { de: 'Kommst du zur Party mit?', ru: 'Ты пойдешь с нами на вечеринку? (mitkommen).' },
      { de: 'Der Botschaftsbeamte erklärt die Regeln.', ru: 'Сотрудник посольства объясняет правила (erklären).' },
    ],
  },

  // 09
  {
    id: 'topic-9',
    topicNumber: 9,
    title: 'Модальные глаголы: können, müssen, wollen, dürfen, sollen, möchten',
    titleDe: 'Die Modalverben im Präsens und Satzklammer',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-9',
    content: 'Модальные глаголы выражают отношение к действию (возможность, необходимость, желание, запрет). Особенность их спряжения: в 1-м (ich) и 3-м (er/sie/es) лице единственного числа формы полностью совпадают и НЕ имеют личных окончаний! В предложении модальный глагол стоит на 2-м месте, а смысловой глагол в инфинитиве уходит в самый конец предложения (рамочная конструкция Satzklammer).',
    tables: [
      {
        headers: ['Лицо', 'können (мочь)', 'müssen (должен/надо)', 'wollen (хотеть)', 'dürfen (иметь право)', 'sollen (следует)', 'möchten (хотелось бы)'],
        rows: [
          ['ich', 'kann ⚡', 'muss ⚡', 'will ⚡', 'darf ⚡', 'soll ⚡', 'möchte'],
          ['du', 'kannst', 'musst', 'willst', 'darfst', 'sollst', 'möchtest'],
          ['er / sie / es', 'kann ⚡', 'muss ⚡', 'will ⚡', 'darf ⚡', 'soll ⚡', 'möchte'],
          ['wir', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'möchten'],
          ['ihr', 'könnt', 'müsst', 'wollt', 'dürft', 'sollt', 'möchtet'],
          ['sie / Sie', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'möchten'],
        ],
      },
    ],
    ruleTips: [
      'Значения: müssen = категорическая обязанность; dürfen = разрешение (nicht dürfen = строгий запрет!); wollen = твердое намерение; möchten = вежливое желание.',
      'Рамочная конструкция: «Ich [muss] morgen früh zum Konsulat [gehen]».',
    ],
    examples: [
      { de: 'Ich kann gut mit kleinen Kindern umgehen.', ru: 'Я умею хорошо ладить с маленькими детьми.' },
      { de: 'Hier darf man nicht rauchen.', ru: 'Здесь нельзя курить (запрещено).' },
      { de: 'Ich möchte in Deutschland eine Ausbildung machen.', ru: 'Я хотел бы пройти дуальное обучение в Германии.' },
    ],
  },

  // 10
  {
    id: 'topic-10',
    topicNumber: 10,
    title: 'Повелительное наклонение (Imperativ: du, ihr, Sie, wir)',
    titleDe: 'Der Imperativ (Befehlsform)',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-10',
    content: 'Повелительное наклонение используется для просьб, указаний, команд и инструкций. В немецком языке существует 4 формы повелительного наклонения в зависимости от адресата: к одному человеку на «ты» (du), к группе людей на «вы» (ihr), к одному или группе на «Вы» (вежливая форма Sie) и совместное действие «давайте...» (wir).',
    tables: [
      {
        headers: ['Форма обращения', 'Правило образования', 'lernen', 'fahren', 'helfen', 'sein'],
        rows: [
          ['du (к другу / ребенку)', 'Основа глагола без -st и без местоимения du', 'Lern(e)!', 'Fahr! (без умлаута!)', 'Hilf! (с i!)', 'Sei! (исключение)'],
          ['ihr (к друзьям / детям)', 'Форма 2-го лица мн. ч. без местоимения ihr', 'Lernt!', 'Fahrt!', 'Helft!', 'Seid!'],
          ['Sie (вежливо на «Вы»)', 'Инфинитив + Sie (обратный порядок)', 'Lernen Sie!', 'Fahren Sie!', 'Helfen Sie!', 'Seien Sie!'],
          ['wir (совместно «давайте»)', 'Инфинитив + wir', 'Lernen wir!', 'Fahren wir!', 'Helfen wir!', 'Seien wir!'],
        ],
      },
    ],
    ruleTips: [
      'В форме du умлаут ВСЕГДА пропадает: du fährst → Fahr! (не fähr!).',
      'Чередование e → i/ie СОХРАНЯЕТСЯ: du hilfst → Hilf!; du liest → Lies!; du nimmst → Nimm!.',
      'Для вежливости добавляйте частицу bitte: «Kommen Sie bitte herein!»',
    ],
    examples: [
      { de: 'Pass bitte gut auf die Kinder auf!', ru: 'Присмотри, пожалуйста, внимательно за детьми!' },
      { de: 'Unterschreiben Sie den Vertrag hier, bitte.', ru: 'Подпишите, пожалуйста, договор здесь.' },
      { de: 'Sei pünktlich zum Deutschunterricht!', ru: 'Будь вовремя на уроке немецкого!' },
    ],
  },

  // 11
  {
    id: 'topic-11',
    topicNumber: 11,
    title: 'Числа, время суток, дни недели и даты',
    titleDe: 'Zahlen, Uhrzeit, Wochentage und Datum',
    level: 'A1.1',
    category: 'vocabulary',
    relatedLessonId: 'lesson-11',
    content: 'Обозначение времени и дат — ключевой навык для записи на термин в посольство, собеседований и повседневного расписания. Немецкие числительные от 21 до 99 читаются наоборот: сначала единицы, затем союз und, затем десятки (21 = einundzwanzig).',
    tables: [
      {
        headers: ['Категория', 'Предлог', 'Примеры', 'Перевод'],
        rows: [
          ['Время суток / дни', 'am', 'am Montag, am Morgen, am Wochenende', 'в понедельник, утром, на выходных'],
          ['Точное время (часы)', 'um', 'um 8:00 Uhr, um halb neun (8:30)', 'в 8:00, в половине девятого'],
          ['Месяцы и времена года', 'im', 'im Juli, im Herbst, im Jahr 2026', 'в июле, осенью, в 2026 году'],
          ['Временной интервал', 'von ... bis', 'von 9:00 bis 17:00 Uhr', 'с 9:00 до 17:00'],
          ['Числительные 1-12', '—', 'eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf', '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12'],
          ['Порядковые даты', 'am + -ten', 'am 15. August (am fünfzehnten August)', '15 августа'],
        ],
      },
    ],
    ruleTips: [
      'Halb в немецком означает «половина до следующего часа»: «halb neun» = 8:30 (а не 9:30!).',
      'Viertel vor = без четверти; Viertel nach = четверть после: «Viertel nach zehn» = 10:15.',
    ],
    examples: [
      { de: 'Mein Termin in der Botschaft ist am Dienstag um 10:30 Uhr.', ru: 'Мой термин в посольстве во вторник в 10:30.' },
      { de: 'Ich habe Geburtstag am ersten Mai.', ru: 'У меня день рождения первого мая.' },
      { de: 'Der Sprachkurs dauert von Oktober bis März.', ru: 'Языковой курс длится с октября по март.' },
    ],
  },

  // 12
  {
    id: 'topic-12',
    topicNumber: 12,
    title: 'Прошедшее разговорное время (Perfekt: haben/sein + Partizip II)',
    titleDe: 'Das Perfekt (haben / sein + Partizip II)',
    level: 'A1.1',
    category: 'grammar',
    relatedLessonId: 'lesson-12',
    content: 'Perfekt — главное прошедшее время разговорной речи в немецком языке. Формула: вспомогательный глагол haben или sein на 2-м месте в Präsens + причастие Partizip II в самом конце предложения. Большинство глаголов образуют Perfekt с haben. Глаголы движения (gehen, fahren, fliegen, kommen) и изменения состояния (aufstehen, einschlafen, sterben), а также sein и bleiben спрягаются с sein.',
    tables: [
      {
        headers: ['Тип глагола', 'Формула Partizip II', 'Инфинитив', 'Partizip II', 'Пример в Perfekt'],
        rows: [
          ['Слабые правильные', 'ge- + основа + -(e)t', 'lernen, machen, kaufen', 'gelernt, gemacht, gekauft', 'Ich habe viel gelernt.'],
          ['Слабые на -ieren', 'основа + -t (без ge-!)', 'studieren, reservieren', 'studiert, reserviert', 'Ich habe ein Zimmer reserviert.'],
          ['Сильные неправильные', 'ge- + основа + -en', 'kommen, fahren, sprechen', 'gekommen, gefahren, gesprochen', 'Er ist nach Berlin gefahren.'],
          ['Отделяемые приставки', 'приставка + ge- + основа + -(e)t/-en', 'aufstehen, einkaufen', 'aufgestanden, eingekauft', 'Ich bin früh aufgestanden.'],
          ['Неотделяемые приставки', 'без ge-! приставка + основа + -t/-en', 'verstehen, bekommen', 'verstanden, bekommen', 'Ich habe alles verstanden.'],
        ],
      },
    ],
    ruleTips: [
      'Глаголы с суффиксом -ieren НИКОГДА не получают приставку ge-: studiert, telefoniert, korrigiert.',
      'Глаголы движения и смены состояния ВСЕГДА требуют sein: «Ich bin angekommen», «Ich bin aufgewacht».',
    ],
    examples: [
      { de: 'Ich habe meinen Au-Pair-Vertrag gestern unterschrieben.', ru: 'Я вчера подписал свой контракт Au-Pair.' },
      { de: 'Wir sind pünktlich am Flughafen angekommen.', ru: 'Мы вовремя прибыли в аэропорт.' },
      { de: 'Was hast du heute Schönes gemacht?', ru: 'Что хорошего ты сегодня делал?' },
    ],
  },

  // 13
  {
    id: 'topic-13',
    topicNumber: 13,
    title: 'Возвратные глаголы и местоимение sich',
    titleDe: 'Reflexivpronomen im Akkusativ und Dativ',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-13',
    content: 'Возвратные глаголы обозначают действие, направленное на самого себя (русский суффикс -ся/-сь). Они сопровождаются возвратным местоимением (Reflexivpronomen). В подавляющем большинстве случаев местоимение стоит в Akkusativ (mich, dich, sich, uns, euch, sich). Если в предложении уже есть прямое дополнение, возвратное местоимение переходит в Dativ (mir, dir, sich, uns, euch, sich).',
    tables: [
      {
        headers: ['Лицо', 'Akkusativ (sich freuen / sich waschen)', 'Dativ (sich die Hände waschen / sich etwas vorstellen)'],
        rows: [
          ['ich', 'ich wasche mich (я моюсь)', 'ich wasche mir die Hände ⚡ (я мою себе руки)'],
          ['du', 'du wäschst dich (ты моешься)', 'du wäschst dir die Hände ⚡'],
          ['er / sie / es', 'er/sie/es wäscht sich', 'er/sie/es wäscht sich die Hände'],
          ['wir', 'wir waschen uns', 'wir waschen uns die Hände'],
          ['ihr', 'ihr wascht euch', 'ihr wascht euch die Hände'],
          ['sie / Sie', 'sie waschen sich / Sie waschen sich', 'sie waschen sich / Sie waschen sich die Hände'],
        ],
      },
    ],
    ruleTips: [
      'Для 3-го лица (er, sie, es, sie Plural, Sie) возвратное местоимение ВСЕГДА «sich».',
      'Разница между Akkusativ и Dativ видна ТОЛЬКО у ich (mich vs mir) и du (dich vs dir).',
      'Популярные возвратные глаголы A1: sich freuen auf/über, sich interessieren für, sich fühlen, sich treffen, sich vorstellen.',
    ],
    examples: [
      { de: 'Ich freue mich sehr auf mein neues Leben in Deutschland.', ru: 'Я очень радуюсь своей новой жизни в Германии.' },
      { de: 'Wie fühlst du dich heute nach der Reise?', ru: 'Как ты себя чувствуешь сегодня после поездки?' },
      { de: 'Ich wasche mir schnell das Gesicht.', ru: 'Я быстро умою (себе) лицо.' },
    ],
  },

  // 14
  {
    id: 'topic-14',
    topicNumber: 14,
    title: 'Притяжательные артикли (Possessivartikel)',
    titleDe: 'Possessivartikel im Nominativ, Akkusativ und Dativ',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-14',
    content: 'Притяжательные артикли указывают на принадлежность предмета лицу. Основа зависит от владельца (ich → mein, du → dein, er/es → sein, sie → ihr, wir → unser, ihr → euer, sie/Sie → ihr/Ihr). Окончания притяжательных артиклей склоняются абсолютно так же, как неопределенный артикль ein.',
    tables: [
      {
        headers: ['Владелец', 'Мужской род (m)', 'Женский род (f)', 'Средний род (n)', 'Множественное число (pl)'],
        rows: [
          ['ich (я)', 'mein Vater / meinen (Akk)', 'meine Mutter', 'mein Kind', 'meine Dokumente'],
          ['du (ты)', 'dein Vater / deinen', 'deine Mutter', 'dein Kind', 'deine Dokumente'],
          ['er / es (он/оно)', 'sein Vater / seinen', 'seine Mutter', 'sein Kind', 'seine Dokumente'],
          ['sie (она)', 'ihr Vater / ihren', 'ihre Mutter', 'ihr Kind', 'ihre Dokumente'],
          ['wir (мы)', 'unser Vater / unseren', 'unsere Mutter', 'unser Kind', 'unsere Dokumente'],
          ['ihr (вы)', 'euer Vater / euren ⚡', 'eure Mutter ⚡', 'euer Kind', 'eure Dokumente ⚡'],
          ['sie / Sie (они/Вы)', 'ihr/Ihr Vater / ihren/Ihren', 'ihre/Ihre Mutter', 'ihr/Ihr Kind', 'ihre/Ihre Dokumente'],
        ],
      },
    ],
    ruleTips: [
      'Обратите внимание на форму euer: при добавлении окончания буква e выпадает: eure Mutter, euren Vertrag (не euer-e).',
      'Вежливая форма Ihr / Ihre / Ihren всегда пишется с большой буквы.',
    ],
    examples: [
      { de: 'Ist das Ihre aktuelle E-Mail-Adresse?', ru: 'Это Ваш актуальный адрес электронной почты?' },
      { de: 'Ich habe meinen Ausbildungsvertrag per Post erhalten.', ru: 'Я получил свой контракт на Ausbildung по почте.' },
      { de: 'Unsere Gastfamilie wohnt in München.', ru: 'Наша принимающая семья живет в Мюнхене.' },
    ],
  },

  // 15
  {
    id: 'topic-15',
    topicNumber: 15,
    title: 'Личные местоимения в Akkusativ и Dativ',
    titleDe: 'Personalpronomen im Nominativ, Akkusativ und Dativ',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-15',
    content: 'Личные местоимения заменяют существительные, чтобы избежать повторений. В зависимости от вопроса глагола или предлога они принимают форму винительного (Akkusativ — кого? меня, тебя, его) или дательного падежа (Dativ — кому? мне, тебе, ему).',
    tables: [
      {
        headers: ['Nominativ (Кто?)', 'Akkusativ (Кого? Что?)', 'Dativ (Кому?)', 'Пример с глаголом (Dativ)', 'Пример с глаголом (Akkusativ)'],
        rows: [
          ['ich (я)', 'mich (меня)', 'mir (мне)', 'Er hilft mir.', 'Er sieht mich.'],
          ['du (ты)', 'dich (тебя)', 'dir (тебе)', 'Wie geht es dir?', 'Ich rufe dich an.'],
          ['er (он)', 'ihn (его) ⚡', 'ihm (ему)', 'Ich danke ihm.', 'Ich kenne ihn gut.'],
          ['sie (она)', 'sie (её)', 'ihr (ей) ⚡', 'Das gefällt ihr.', 'Ich frage sie.'],
          ['es (оно)', 'es (его)', 'ihm (ему)', '—', 'Ich habe es.'],
          ['wir (мы)', 'uns (нас)', 'uns (нам)', 'Der Lehrer antwortet uns.', 'Er besucht uns.'],
          ['ihr (вы)', 'euch (вас)', 'euch (вам)', 'Ich helfe euch gern.', 'Ich höre euch.'],
          ['sie / Sie (они / Вы)', 'sie / Sie', 'ihnen / Ihnen ⚡', 'Ich gratuliere Ihnen.', 'Ich verstehe Sie.'],
        ],
      },
    ],
    ruleTips: [
      'Вежливое «Вам» (Dativ) пишется с большой буквы: Ihnen («Wie kann ich Ihnen helfen?»).',
      'Запомните пару: er → ihn (Akk) / ihm (Dat); sie → sie (Akk) / ihr (Dat).',
    ],
    examples: [
      { de: 'Können Sie mir bitte helfen?', ru: 'Не могли бы Вы мне помочь?' },
      { de: 'Ich rufe dich heute Abend an.', ru: 'Я позвоню тебе сегодня вечером.' },
      { de: 'Der Schulleiter hat ihm den Ausbildungsplatz angeboten.', ru: 'Директор школы предложил ему место на обучении.' },
    ],
  },

  // 16
  {
    id: 'topic-16',
    topicNumber: 16,
    title: 'Предлоги, требующие ТОЛЬКО Дательного падежа (Dativ)',
    titleDe: 'Präpositionen nur mit dem Dativ',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-16',
    content: 'Следующая группа предлогов ВСЕГДА и БЕЗ ИСКЛЮЧЕНИЙ требует после себя Dativ: aus, bei, mit, nach, seit, von, zu, gegenüber.',
    tables: [
      {
        headers: ['Предлог', 'Значение', 'Пример с артиклем Dativ', 'Перевод'],
        rows: [
          ['aus', 'из (страны, здания)', 'aus dem Haus, aus Deutschland', 'из дома, из Германии'],
          ['bei', 'у / при / во время', 'beim (bei dem) Arzt, bei der Familie', 'у врача, у семьи'],
          ['mit', 'с / на (транспорте)', 'mit dem Zug, mit meiner Freundin', 'на поезде, с моей подругой'],
          ['nach', 'в (город, страну) / после / спустя', 'nach Berlin, nach dem Unterricht', 'в Берлин, после занятий'],
          ['seit', 'с (каких-то пор), уже как...', 'seit einem Monat, seit drei Jahren', 'уже месяц, уже три года'],
          ['von', 'от / о (принадлежность)', 'vom (von dem) Chef, ein Brief von ihr', 'от шефа, письмо от нее'],
          ['zu', 'к / в сторону (к человеку, объекту)', 'zum (zu dem) Konsulat, zur Botschaft', 'в консульство, в посольство'],
          ['gegenüber', 'напротив / по отношению к', 'dem Bahnhof gegenüber', 'напротив вокзала'],
        ],
      },
    ],
    ruleTips: [
      'Стишок для запоминания: «Aus, bei, mit, nach, seit, von, zu — Dativ требуешь тут всюду ты!».',
      'Слияния: bei + dem = beim; von + dem = vom; zu + dem = zum; zu + der = zur.',
    ],
    examples: [
      { de: 'Ich fahre jeden Morgen mit dem Bus zur Arbeit.', ru: 'Каждое утро я еду на автобусе на работу.' },
      { de: 'Ich lerne seit drei Monaten intensiv Deutsch.', ru: 'Я уже три месяца интенсивно учу немецкий.' },
      { de: 'Morgen gehe ich zum Vorstellungsgespräch.', ru: 'Завтра я иду на собеседование.' },
    ],
  },

  // 17
  {
    id: 'topic-17',
    topicNumber: 17,
    title: 'Предлоги, требующие ТОЛЬКО Винительного падежа (Akkusativ)',
    titleDe: 'Präpositionen nur mit dem Akkusativ',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-17',
    content: 'Следующая группа предлогов ВСЕГДА и БЕЗ ИСКЛЮЧЕНИЙ требует после себя Akkusativ: durch, für, gegen, ohne, um, bis.',
    tables: [
      {
        headers: ['Предлог', 'Значение', 'Пример с артиклем Akkusativ', 'Перевод'],
        rows: [
          ['für', 'для / за / на (срок)', 'für einen Monat, für den Vertrag', 'на месяц, для договора'],
          ['ohne', 'без', 'ohne meinen Pass, ohne Zweifel', 'без моего паспорта, без сомнений'],
          ['durch', 'через / сквозь', 'durch den Park, durch die Stadt', 'через парк, по городу'],
          ['gegen', 'против / около (по времени)', 'gegen den Plan, gegen 18:00 Uhr', 'против плана, около 18:00'],
          ['um', 'вокруг / в (точное время)', 'um den Tisch, um 9 Uhr', 'вокруг стола, в 9 часов'],
          ['bis', 'до (без артикля)', 'bis nächsten Montag, bis bald', 'до следующего понедельника, до скорого'],
        ],
      },
    ],
    ruleTips: [
      'Мнемоническая аббревиатура: DOGFU (Durch, Ohne, Gegen, Für, Um) — всегда Akkusativ!',
      'Слияние: für + das = fürs («fürs Visum»).',
      'После ohne существительное во множественном числе или без артикля употребляется в чистом виде: «ohne Probleme», «ohne Geld».',
    ],
    examples: [
      { de: 'Dieses Zertifikat ist sehr wichtig für mein Visum.', ru: 'Этот сертификат очень важен для моей визы.' },
      { de: 'Ohne ein gültiges Sprachzertifikat kann man kein Visum beantragen.', ru: 'Без действующего языкового сертификата нельзя подать на визу.' },
      { de: 'Wir treffen uns gegen 19:00 Uhr.', ru: 'Мы встретимся около 19:00.' },
    ],
  },

  // 18
  {
    id: 'topic-18',
    topicNumber: 18,
    title: 'Временные и пространственные предлоги в устойчивых сочетаниях',
    titleDe: 'Temporale und lokale Ausdrücke (am, im, um, nach Hause, zu Hause)',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-18',
    content: 'Разграничение пространства (куда? где?) и времени (когда? как долго?) вызывает типичные ошибки у начинающих. В немецком языке существуют строгие идиоматические стандарты: «nach Hause» (домой — направление) vs «zu Hause» (дома — местоположение), а также правила выбора временных предлогов am, im, um, vor, nach.',
    tables: [
      {
        headers: ['Категория', 'Предлог / Конструкция', 'Пример', 'Перевод'],
        rows: [
          ['Дни, части суток', 'am (an dem)', 'am Vormittag, am Dienstag, am Feiertag', 'в первой половине дня, во вторник, в праздник'],
          ['Месяцы, сезоны, года', 'im (in dem)', 'im Frühling, im Januar, im Sommer', 'весной, в январе, летом'],
          ['Точный час', 'um', 'um Punkt 12 Uhr', 'ровно в 12 часов'],
          ['Направление домой', 'nach Hause', 'Ich gehe nach Hause.', 'Я иду домой.'],
          ['Нахождение дома', 'zu Hause', 'Ich bleibe heute zu Hause.', 'Я остаюсь сегодня дома.'],
          ['До / После события', 'vor + Dat / nach + Dat', 'vor dem Essen / nach dem Kurs', 'перед едой / после курса'],
          ['Через (в будущем)', 'in + Dat', 'in zwei Wochen, in einem Monat', 'через две недели, через месяц'],
        ],
      },
    ],
    ruleTips: [
      'Единственное исключение частей суток: in der Nacht (ночью — женский род!). Все остальные: am Morgen, am Vormittag, am Mittag, am Nachmittag, am Abend.',
      'Никогда не говорите «Ich gehe zu Hause» — правильно «Ich gehe nach Hause»!',
    ],
    examples: [
      { de: 'In zwei Monaten fliege ich nach Deutschland.', ru: 'Через два месяца я улетаю в Германию.' },
      { de: 'Nach dem Vorstellungsgespräch war ich sehr erleichtert.', ru: 'После собеседования я почувствовал огромное облегчение.' },
      { de: 'Am Wochenende bin ich meistens zu Hause.', ru: 'На выходных я в основном дома.' },
    ],
  },

  // 19
  {
    id: 'topic-19',
    topicNumber: 19,
    title: 'Порядок слов в простом предложении и сочинительные союзы (ADUSO)',
    titleDe: 'Satzbau im Hauptsatz und nebenordnende Konjunktionen (ADUSO)',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-19',
    content: 'Главное золотое правило немецкого синтаксиса: спрягаемый глагол в повествовательном предложении ВСЕГДА стоит на 2-м смысловом месте. На 1-м месте может стоять подлежащее (прямой порядок слов) или обстоятельство времени/места (обратный порядок слов). Сочинительные союзы ADUSO (aber, denn, und, sondern, oder) занимают «нулевую» позицию и не меняют порядок слов!',
    tables: [
      {
        headers: ['Позиция 0 (Союз ADUSO)', 'Позиция 1', 'Позиция 2 (Глагол!) ⚡', 'Середина предложения', 'Конец предложения'],
        rows: [
          ['—', 'Ich (подлежащее)', 'lerne', 'jeden Tag fleißig', 'Deutsch.'],
          ['—', 'Heute (время)', 'fahre', 'ich mit dem Zug', 'nach Hamburg.'],
          ['und (и)', 'ich', 'besuche', 'dort meine Tante', '—.'],
          ['aber (но)', 'mein Bruder', 'bleibt', 'leider zu Hause', '—.'],
          ['denn (так как)', 'er', 'hat', 'morgen eine wichtige Prüfung', '—.'],
          ['sondern (а, но)', 'wir', 'kaufen', 'ein Ticket online', '—.'],
          ['oder (или)', 'du', 'schreibst', 'ihm eine E-Mail', '—.'],
        ],
      },
    ],
    ruleTips: [
      'Союзы ADUSO: Aber (но), Denn (так как), Und (и), Sondern (а/но после отрицания), Oder (или). После них счет позиций начинается заново: 1-е место подлежащее, 2-е место глагол.',
      'Если на первое место выносится время («Morgen...»), подлежащее сразу переходит на 3-е место («Morgen fahre ich...»).',
    ],
    examples: [
      { de: 'Ich möchte in Deutschland arbeiten, denn ich mag die Sprache.', ru: 'Я хочу работать в Германии, так как мне нравится язык.' },
      { de: 'Morgen habe ich frei, aber ich lerne trotzdem Grammatik.', ru: 'Завтра у меня выходной, но я все равно учу грамматику.' },
      { de: 'Wir fliegen nicht nach München, sondern wir fahren nach Berlin.', ru: 'Мы летим не в Мюнхен, а едем в Берлин.' },
    ],
  },

  // 20
  {
    id: 'topic-20',
    topicNumber: 20,
    title: 'Придаточные предложения с союзами weil, dass, wenn',
    titleDe: 'Nebensätze mit weil, dass, wenn (Verbletztstellung)',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-20',
    content: 'В немецких придаточных предложениях (Nebensatz) действует железное правило глагола на последнем месте (Verbletztstellung). Подчинительные союзы weil (потому что), dass (что), wenn (когда, если) отправляют спрягаемый глагол в самый конец предложения. Если глагол сложный (Perfekt или модальный), в самом конце стоит спрягаемый вспомогательный глагол.',
    tables: [
      {
        headers: ['Главное предложение (Hauptsatz)', 'Подчинительный союз', 'Подлежащее придаточного', 'Второстепенные члены', 'Спрягаемый глагол в конце! ⚡'],
        rows: [
          ['Ich lerne Deutsch,', 'weil', 'ich', 'in Deutschland eine Ausbildung', 'machen möchte.'],
          ['Er freut sich,', 'dass', 'er', 'den A1-Test erfolgreich', 'bestanden hat.'],
          ['Wir gehen spazieren,', 'wenn', 'das Wetter', 'morgen schön', 'ist.'],
          ['Ich weiß genau,', 'dass', 'die Gastfamilie', 'zwei nette Kinder', 'hat.'],
          ['Sie bleibt zu Hause,', 'weil', 'sie', 'sich heute nicht gut', 'fühlt.'],
        ],
      },
    ],
    ruleTips: [
      'Главное и придаточное предложение ВСЕГДА разделяются запятой.',
      'Разница denn vs weil: denn не меняет порядок слов (глагол на 2 месте), weil отправляет глагол в самый конец: «..., denn ich lerne» vs «..., weil ich lerne».',
    ],
    examples: [
      { de: 'Ich bin glücklich, weil ich die Zusage bekommen habe.', ru: 'Я счастлив, потому что получил подтверждение о приеме.' },
      { de: 'Mein Lehrer sagt, dass ich große Fortschritte mache.', ru: 'Мой преподаватель говорит, что я делаю большие успехи.' },
      { de: 'Wenn Sie Fragen haben, rufen Sie mich bitte an.', ru: 'Если у Вас возникнут вопросы, пожалуйста, позвоните мне.' },
    ],
  },

  // 21
  {
    id: 'topic-21',
    topicNumber: 21,
    title: 'Степени сравнения прилагательных (Komparativ и Superlativ)',
    titleDe: 'Steigerung der Adjektive (Komparativ und Superlativ)',
    level: 'A1.2',
    category: 'grammar',
    relatedLessonId: 'lesson-21',
    content: 'Степени сравнения прилагательных служат для сопоставления качеств предметов. Сравнительная степень (Komparativ) образуется с помощью суффикса -er + союза als (чем). Превосходная степень (Superlativ) образуется конструкцией am + основа + -(e)sten. Односложные прилагательные с гласными a, o, u часто получают умлаут (ä, ö, ü).',
    tables: [
      {
        headers: ['Позитив (Grundform)', 'Сравнительная (Komparativ + als)', 'Превосходная (am ...-sten)', 'Особенность'],
        rows: [
          ['klein (маленький)', 'kleiner als (меньше чем)', 'am kleinsten (самый маленький)', 'Стандартное правило'],
          ['schnell (быстрый)', 'schneller als', 'am schnellsten', 'Стандартное правило'],
          ['alt (старый)', 'älter als ⚡', 'am ältesten ⚡', 'Умлаут a → ä'],
          ['groß (большой)', 'größer als ⚡', 'am größten ⚡', 'Умлаут o → ö'],
          ['gut (хороший)', 'besser als ⚡ (лучше)', 'am besten ⚡ (лучше всего)', 'Полное изменение корня'],
          ['viel (много)', 'mehr als ⚡ (больше)', 'am meisten ⚡ (больше всего)', 'Полное изменение корня'],
          ['gern (охотно)', 'lieber als ⚡ (охотнее)', 'am liebsten ⚡ (охотнее всего)', 'Полное изменение корня'],
          ['teuer (дорогой)', 'teurer als ⚡', 'am teuersten', 'Выпадение гласной -e-'],
        ],
      },
    ],
    ruleTips: [
      'Союз als используется при сравнении различий («Berlin ist größer als München»).',
      'Союз so ... wie используется при равенстве («Er ist so fleißig wie sein Bruder»).',
    ],
    examples: [
      { de: 'Deutsch sprechen ist mir lieber als Texte schreiben.', ru: 'Говорить по-немецки мне приятнее, чем писать тексты.' },
      { de: 'Dieser Sprachkurs ist der beste für die Vorbereitung.', ru: 'Этот языковой курс — самый лучший для подготовки.' },
      { de: 'Meine Gastkinder sind älter als ich dachte.', ru: 'Дети в семье старше, чем я думал.' },
    ],
  },

  // 22
  {
    id: 'topic-22',
    topicNumber: 22,
    title: 'Словарный запас и речевые клише для программы Au-Pair',
    titleDe: 'Wortschatz & Redemittel für Au-Pair (Kinderbetreuung, Alltag, Notfälle)',
    level: 'A1.2',
    category: 'vocabulary',
    relatedLessonId: 'lesson-22',
    content: 'Специализированный лексический минимум для успешного прохождения интервью с принимающей семьей, повседневного общения с детьми и решения бытовых ситуаций в Германии.',
    tables: [
      {
        headers: ['Немецкая фраза / Слово', 'Транскрипция', 'Перевод на русский', 'Контекст ситуации'],
        rows: [
          ['die Gastfamilie', '[ди Гастфамилие]', 'Принимающая семья', 'Официальный статус'],
          ['das Taschengeld (280 €)', '[дас Ташенгельд]', 'Карманные деньги / стипендия', 'Ежемесячная выплата'],
          ['die Kinderbetreuung', '[ди Киндербетройунг]', 'Присмотр за детьми', 'Главная обязанность'],
          ['die Kinder wecken / anziehen', '[веккен / анциен]', 'Будить / одевать детей', 'Утренний распорядок'],
          ['zum Kindergarten bringen', '[цум Киндергартен бринген]', 'Отводить в детский сад', 'Расписание'],
          ['das Essen zubereiten', '[дас Эссен цуберайтен]', 'Готовить еду / перекус', 'Питание'],
          ['die Hausaufgaben machen', '[ди Хаусауфгабен махен]', 'Делать домашние задания', 'Школа'],
          ['einen Notarzt rufen (112)', '[айнен Нотарцт руфен]', 'Вызывать скорую помощь', 'Экстренный номер в ФРГ'],
        ],
      },
    ],
    ruleTips: [
      'Стандарт Au-Pair в ФРГ: до 30 рабочих часов в неделю, минимум 280 евро карманных денег, отдельная комната, питание и 50 евро/мес на языковые курсы.',
      'Экстренный номер полиции в Германии — 110, скорой помощи и пожарных — 112.',
    ],
    examples: [
      { de: 'Ich habe in meiner Heimat viel Erfahrung in der Kinderbetreuung gesammelt.', ru: 'На родине я накопил большой опыт присмотра за детьми.' },
      { de: 'Um wie viel Uhr soll ich die Kinder von der Schule abholen?', ru: 'Во сколько мне забрать детей из школы?' },
      { de: 'Keine Sorge, ich koche gerne gesunde Mahlzeiten für die Familie.', ru: 'Не переживайте, я с радостью готовлю здоровую еду для семьи.' },
    ],
  },

  // 23
  {
    id: 'topic-23',
    topicNumber: 23,
    title: 'Словарный запас и речевые клише для Ausbildung и работы',
    titleDe: 'Wortschatz & Redemittel für Ausbildung und Beruf',
    level: 'A1.2',
    category: 'vocabulary',
    relatedLessonId: 'lesson-23',
    content: 'Ключевые термины дуального профессионального образования в Германии: подача резюме (Bewerbung), заключение контракта, посещение профессиональной школы (Berufsschule) и трудовые нормы.',
    tables: [
      {
        headers: ['Термин / Фраза', 'Транскрипция', 'Перевод на русский', 'Значение'],
        rows: [
          ['die duale Ausbildung', '[дуале Аусбильдунг]', 'Дуальное обучение (теория + практика)', 'Гос. программа ФРГ'],
          ['der Ausbildungsvertrag', '[дер Аусбильдунгсфертраг]', 'Договор об обучении', 'Главный документ для визы'],
          ['die Ausbildungsvergütung', '[фергютунг]', 'Зарплата / стипендия стажера (1000€+)', 'Ежемесячный доход'],
          ['die Berufsschule', '[ди Беруфсшуле]', 'Профессиональный колледж', 'Теоретическая часть'],
          ['der Betrieb / das Unternehmen', '[дер Бетриб / Унтернемен]', 'Предприятие / компания работодатель', 'Практическая база'],
          ['der Lebenslauf (tabellarisch)', '[дер Лебенслауф]', 'Резюме в табличной форме', 'Пакет документов'],
          ['das Motivationsschreiben', '[мотивацьонсшрайбен]', 'Мотивационное письмо', 'Пакет документов'],
          ['das Vorstellungsgespräch', '[форштеллунгсгешпрех]', 'Собеседование с работодателем', 'Отбор кандидатов'],
        ],
      },
    ],
    ruleTips: [
      'Дуальная система ФРГ: 3 дня на предприятии + 2 дня в колледже (или блочная система). Вы получаете официальную зарплату с первого месяца.',
      'Для большинства специальностей Ausbildung минимальный порог немецкого — B1/B2, но готовить документы и резюме начинают с уровня A1/A2.',
    ],
    examples: [
      { de: 'Ich habe mich für eine Ausbildung als Pflegefachkraft beworben.', ru: 'Я подал заявку на обучение по специальности медсестры/медбрата.' },
      { de: 'Die Vergütung beträgt im ersten Ausbildungsjahr 1.150 Euro brutto.', ru: 'Зарплата стажера на первом году составляет 1 150 евро до вычетов.' },
      { de: 'Mein Vorstellungsgespräch findet per Videoanruf statt.', ru: 'Мое собеседование состоится по видеосвязи.' },
    ],
  },

  // 24
  {
    id: 'topic-24',
    topicNumber: 24,
    title: 'Чек-лист и шаблоны для визового собеседования и посольства ФРГ',
    titleDe: 'Leitfaden für das Visuminterview in der deutschen Botschaft',
    level: 'A1–A2',
    category: 'visa-tips',
    content: 'Типовые вопросы визового офицера на собеседовании в посольстве Германии, перечень обязательных документов и стандарты мотивационного письма.',
    tables: [
      {
        headers: ['Вопрос консула / офицера', 'Перевод вопроса', 'Рекомендуемая стратегия ответа'],
        rows: [
          ['Warum möchten Sie nach Deutschland reisen?', 'Почему Вы хотите поехать в Германию?', 'Четко назовите цель: Au-Pair контракт, изучение культуры или дуальное образование.'],
          ['Was machen Sie nach dem Au-Pair Jahr?', 'Что Вы будете делать после года Au-Pair?', 'Обязательно подчеркните: возвращение на родину или поступление на Ausbildung/университет в соответствии с законом.'],
          ['Wie haben Sie Ihre Gastfamilie gefunden?', 'Как Вы нашли свою принимающую семью?', 'Укажите официальное сертифицированное агентство или платформу (AuPairWorld).'],
          ['Haben Sie schon Deutschkenntnisse?', 'Владеете ли Вы немецким языком?', 'Отвечайте строго на немецком языке простыми и уверенными фразами A1.'],
        ],
      },
    ],
    ruleTips: [
      'Всегда берите оригинал и 2 копии каждого документа (паспорт, контракт, сертификат Goethe A1, страховка).',
      'На собеседовании говорите спокойно, смотрите в глаза сотруднику, не переходите на русский язык без прямого вопроса.',
    ],
    examples: [
      { de: 'Guten Tag, hier sind meine vollständigen Antragsunterlagen.', ru: 'Добрый день, вот мои полные документы на визу.' },
      { de: 'Ich habe mein Sprachzertifikat Start Deutsch A1 am Goethe-Institut abgelegt.', ru: 'Я сдал языковой сертификат Start Deutsch A1 в Гёте-Институте.' },
      { de: 'Ich freue mich auf die interkulturelle Erfahrung in Deutschland.', ru: 'Я с нетерпением жду межкультурного опыта в Германии.' },
    ],
  },
];
