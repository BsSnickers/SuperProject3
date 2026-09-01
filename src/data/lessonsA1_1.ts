import { Lesson } from '../types';

export const LESSONS_A1_1: Lesson[] = [
  {
    "id": "lesson-1",
    "number": 1,
    "titleDe": "Konjugation schwacher Verben",
    "titleRu": "Спряжение слабых глаголов",
    "description": "Освойте базовые окончания правильных глаголов настоящего времени (Präsens): ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.",
    "difficulty": "A1.1",
    "estimatedMinutes": 10,
    "questionsCount": 6,
    "totalLearners": 1420,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Глаголы",
      "Präsens"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l1-q1",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie die Endung: „Ich ______ in Berlin.“ (wohnen)",
        "promptRu": "Вставьте правильную форму глагола wohnen (жить): «Я живу в Берлине.»",
        "options": [
          "wohne",
          "wohnen",
          "wohnt",
          "wohnst"
        ],
        "correctAnswer": "wohne",
        "explanationDe": "Mit dem Pronomen „ich“ lautet die Endung immer „-e“: ich wohne.",
        "explanationRu": "С местоимением «ich» (я) правильные слабые глаголы всегда получают окончание -e.",
        "audioHintText": "Ich wohne in Berlin."
      },
      {
        "id": "l1-q2",
        "type": "single-choice",
        "promptDe": "Welche Form ist richtig? „Was ______ du gern?“ (machen)",
        "promptRu": "Какая форма глагола machen (делать) верна с местоимением du (ты)?",
        "options": [
          "macht",
          "machst",
          "machen",
          "mache"
        ],
        "correctAnswer": "machst",
        "explanationDe": "Mit „du“ endet das schwache Verb auf „-st“: du machst.",
        "explanationRu": "С местоимением «du» слабое глагольное окончание — -st: «du machst».",
        "audioHintText": "Was machst du gern?"
      },
      {
        "id": "l1-q3",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Er ______ Deutsch an der Universität.“ (lernen)",
        "promptRu": "Вставьте форму глагола lernen (учить): «Он учит немецкий в университете.»",
        "options": [
          "lernst",
          "lernen",
          "lernt",
          "lerne"
        ],
        "correctAnswer": "lernt",
        "explanationDe": "Die 3. Person Singular (er/sie/es) hat die Endung „-t“: er lernt.",
        "explanationRu": "Для 3-го лица ед. ч. (er/sie/es) слабый глагол оканчивается на -t: «er lernt».",
        "audioHintText": "Er lernt Deutsch an der Universität."
      },
      {
        "id": "l1-q4",
        "type": "single-choice",
        "promptDe": "Wie konjugiert man „arbeiten“ für „er“?",
        "promptRu": "Как спрягается глагол с основой на -t (arbeiten) для местоимения «er»?",
        "options": [
          "er arbeitet",
          "er arbeite",
          "er arbeiten",
          "er arbeitt"
        ],
        "correctAnswer": "er arbeitet",
        "explanationDe": "Wenn der Verbstamm auf -t oder -d endet, wird ein Bindungs-e eingefügt: er arbeit-e-t.",
        "explanationRu": "Если корень глагола оканчивается на -t или -d (arbeiten, finden), перед окончанием добавляется соединительная -e-: «er arbeitet».",
        "audioHintText": "Er arbeitet heute."
      },
      {
        "id": "l1-q5",
        "type": "single-choice",
        "promptDe": "Welche Form passt für „heißen“ mit „du“?",
        "promptRu": "Какая форма глагола heißen (зваться) правильна для «du»?",
        "options": [
          "du heißen",
          "du heiße",
          "du heißt",
          "du heißst"
        ],
        "correctAnswer": "du heißt",
        "explanationDe": "Bei Verben mit Stamm auf -ß, -s, -z entfällt das „s“ bei „du“: du heißt (nicht heißst).",
        "explanationRu": "Если основа оканчивается на -s, -ß, -z, -x, то при местоимении «du» добавляется только -t: «du heißt».",
        "audioHintText": "Wie heißt du?"
      },
      {
        "id": "l1-q6",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Wir ______ aus Kasachstan.“ (kommen)",
        "promptRu": "Вставьте форму глагола kommen (приезжать/быть родом): «Мы родом из Казахстана.»",
        "options": [
          "kommen",
          "kommt",
          "kommst",
          "komme"
        ],
        "correctAnswer": "kommen",
        "explanationDe": "Mit „wir“ und „sie/Sie“ lautet die Endung „-en“: wir kommen.",
        "explanationRu": "Для местоимений «wir» (мы) и «sie/Sie» окончание глагола совпадает с инфинитивом: «wir kommen».",
        "audioHintText": "Wir kommen aus Kasachstan."
      }
    ]
  },
  {
    "id": "lesson-2",
    "number": 2,
    "titleDe": "Konjugation starker Verben",
    "titleRu": "Спряжение сильных глаголов",
    "description": "Изучите чередование корневых гласных в Präsens (e → i, e → ie, a → ä) во 2 и 3 лице единственного числа (du, er/sie/es).",
    "difficulty": "A1.1",
    "estimatedMinutes": 12,
    "questionsCount": 7,
    "totalLearners": 1350,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Сильные глаголы",
      "Vokalwechsel"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l2-q1",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „______ du gut Deutsch?“ (sprechen: e → i)",
        "promptRu": "Вставьте форму сильного глагола sprechen (говорить): «Ты хорошо говоришь по-немецки?»",
        "options": [
          "Sprich",
          "Sprecht",
          "Sprichst",
          "Sprechst"
        ],
        "correctAnswer": "Sprichst",
        "explanationDe": "Das starke Verb „sprechen“ ändert den Vokal bei du: du sprichst.",
        "explanationRu": "Сильный глагол sprechen меняет корневую гласную e на i во 2-м и 3-м лице: «du sprichst».",
        "audioHintText": "Sprichst du gut Deutsch?"
      },
      {
        "id": "l2-q2",
        "type": "single-choice",
        "promptDe": "Welche Form von „lesen“ ist korrekt für „er“?",
        "promptRu": "Какая форма глагола lesen (читать) правильна для «er» (он)?",
        "options": [
          "er lieset",
          "er liest",
          "er lest",
          "er leset"
        ],
        "correctAnswer": "er liest",
        "explanationDe": "Bei „lesen“ wechselt der Vokal e zu ie: er liest.",
        "explanationRu": "У глагола lesen гласная e меняется на долгий звук ie: «er liest» (он читает).",
        "audioHintText": "Er liest ein Buch."
      },
      {
        "id": "l2-q3",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Wohin ______ du morgen?“ (fahren: a → ä)",
        "promptRu": "Вставьте форму глагола fahren (ехать): «Куда ты едешь завтра?»",
        "options": [
          "fahrt",
          "fahre",
          "fährst",
          "fahrst"
        ],
        "correctAnswer": "fährst",
        "explanationDe": "Bei „fahren“ erhält das „a“ bei du und er/sie/es einen Umlaut: du fährst.",
        "explanationRu": "Глаголы с корневой -a- получают умлаут -ä- в формах du и er/sie/es: «du fährst».",
        "audioHintText": "Wohin fährst du morgen?"
      },
      {
        "id": "l2-q4",
        "type": "single-choice",
        "promptDe": "Wie heißt die Form: „Das Kind ______ viel.“ (schlafen)",
        "promptRu": "Выберите правильную форму глагола schlafen (спать): «Ребенок много спит.»",
        "options": [
          "schlafen",
          "schläft",
          "schläfst",
          "schlaft"
        ],
        "correctAnswer": "schläft",
        "explanationDe": "Das Kind (es) schläft (a → ä + Endung -t).",
        "explanationRu": "Существительное среднего рода das Kind соответствует местоимению es: «das Kind schläft».",
        "audioHintText": "Das Kind schläft viel."
      },
      {
        "id": "l2-q5",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Er ______ mir immer bei den Hausaufgaben.“ (helfen)",
        "promptRu": "Вставьте форму глагола helfen (помогать): «Он всегда помогает мне с домашним заданием.»",
        "options": [
          "hilfst",
          "hilft",
          "helfen",
          "helft"
        ],
        "correctAnswer": "hilft",
        "explanationDe": "Helfen hat den Vokalwechsel e → i: er hilft.",
        "explanationRu": "У глагола helfen происходит смена e на i: «er hilft».",
        "audioHintText": "Er hilft mir immer."
      },
      {
        "id": "l2-q6",
        "type": "single-choice",
        "promptDe": "Welche Form von „sehen“ passt zu „du“?",
        "promptRu": "Какая форма глагола sehen (видеть/смотреть) согласуется с «du»?",
        "options": [
          "du siehst",
          "du sehest",
          "du sieht",
          "du sehst"
        ],
        "correctAnswer": "du siehst",
        "explanationDe": "Sehen hat den Vokalwechsel e → ie: du siehst, er sieht.",
        "explanationRu": "Глагол sehen меняет корневую e на ie: «du siehst» (ты видишь).",
        "audioHintText": "Was siehst du dort?"
      },
      {
        "id": "l2-q7",
        "type": "translate",
        "promptDe": "Was bedeutet: „Er nimmt eine Tasse Kaffee.“ (nehmen: e → i / mm)?",
        "promptRu": "Что означает фраза с сильным глаголом nehmen: «Er nimmt eine Tasse Kaffee.»",
        "options": [
          "Он заказывает воду.",
          "Он берет чашку кофе.",
          "Он покупает кофейник.",
          "Он пьет чашку чая."
        ],
        "correctAnswer": "Он берет чашку кофе.",
        "explanationDe": "Nehmen (er nimmt) bedeutet „брать / взять“.",
        "explanationRu": "Глагол nehmen во 2 и 3 лице принимает форму nimmst / nimmt (брать/брать себе).",
        "audioHintText": "Er nimmt eine Tasse Kaffee."
      }
    ]
  },
  {
    "id": "lesson-3",
    "number": 3,
    "titleDe": "Gebrauch der Artikel (bestimmt / unbestimmt / negativ)",
    "titleRu": "Употребление артиклей",
    "description": "Род имен существительных (der, die, das), неопределенный артикль (ein, eine) и отрицательный артикль (kein, keine) в Nominativ и Akkusativ.",
    "difficulty": "A1.1",
    "estimatedMinutes": 12,
    "questionsCount": 7,
    "totalLearners": 1290,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Артикли",
      "der die das"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l3-q1",
        "type": "single-choice",
        "promptDe": "Welcher bestimmte Artikel gehört zu „Tisch“?",
        "promptRu": "Какой определенный артикль принадлежит существительному мужского рода «Tisch»?",
        "options": [
          "das",
          "den",
          "der",
          "die"
        ],
        "correctAnswer": "der",
        "explanationDe": "Der Tisch ist maskulin (der).",
        "explanationRu": "Слово Tisch в немецком языке мужского рода: «der Tisch».",
        "audioHintText": "Der Tisch ist neu."
      },
      {
        "id": "l3-q2",
        "type": "single-choice",
        "promptDe": "Welcher Artikel gehört zu „Buch“?",
        "promptRu": "Какой артикль имеет существительное среднего рода «Buch»?",
        "options": [
          "das",
          "die",
          "dem",
          "der"
        ],
        "correctAnswer": "das",
        "explanationDe": "Das Buch ist neutral (das).",
        "explanationRu": "Слово Buch среднего рода: «das Buch».",
        "audioHintText": "Das Buch ist interessant."
      },
      {
        "id": "l3-q3",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie den unbestimmten Artikel: „Das ist ______ Lampe.“ (feminin)",
        "promptRu": "Вставьте неопределенный артикль женского рода: «Это лампа.»",
        "options": [
          "einer",
          "einen",
          "eine",
          "ein"
        ],
        "correctAnswer": "eine",
        "explanationDe": "Feminine Nomen haben im Nominativ den unbestimmten Artikel „eine“: eine Lampe.",
        "explanationRu": "Для женского рода в именительном падеже используется неопределенный артикль «eine»: «eine Lampe».",
        "audioHintText": "Das ist eine Lampe."
      },
      {
        "id": "l3-q4",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie im Akkusativ: „Ich kaufe ______ Apfel.“ (der Apfel, maskulin)",
        "promptRu": "Вставьте артикль в винительном падеже (Akkusativ): «Я покупаю яблоко.»",
        "options": [
          "einen",
          "eine",
          "einem",
          "ein"
        ],
        "correctAnswer": "einen",
        "explanationDe": "Maskuline Nomen ändern im Akkusativ den Artikel: ein → einen (der → den).",
        "explanationRu": "В винительном падеже (Akkusativ) мужской род меняется: der → den, ein → einen: «Ich kaufe einen Apfel».",
        "audioHintText": "Ich kaufe einen Apfel."
      },
      {
        "id": "l3-q5",
        "type": "single-choice",
        "promptDe": "Wie lautet der unbestimmte Artikel im Plural?",
        "promptRu": "Как выглядит неопределенный артикль во множественном числе?",
        "options": [
          "ein",
          "eine",
          "Es gibt keinen unbestimmten Artikel im Plural (Nullartikel)",
          "einen"
        ],
        "correctAnswer": "Es gibt keinen unbestimmten Artikel im Plural (Nullartikel)",
        "explanationDe": "Im Plural gibt es keinen unbestimmten Artikel. Man sagt z.B. „Ich habe Bücher“ (ohne Artikel).",
        "explanationRu": "Во множественном числе неопределенный артикль отсутствует (нулевой артикль): «Hier sind Bücher».",
        "audioHintText": "Hier sind Bücher."
      },
      {
        "id": "l3-q6",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie das Negativpronomen: „Ich habe ______ Zeit.“ (die Zeit, feminin)",
        "promptRu": "Вставьте отрицательный артикль: «У меня нет времени.»",
        "options": [
          "nicht",
          "keine",
          "keinen",
          "kein"
        ],
        "correctAnswer": "keine",
        "explanationDe": "Die Zeit ist feminin, daher lautet die Negation „keine Zeit“.",
        "explanationRu": "Слово Zeit женского рода (die Zeit), поэтому отрицательный артикль — «keine»: «Ich habe keine Zeit».",
        "audioHintText": "Ich habe keine Zeit."
      },
      {
        "id": "l3-q7",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Er hat ______ Auto.“ (das Auto, neutral)",
        "promptRu": "Вставьте отрицание: «У него нет машины.»",
        "options": [
          "keinen",
          "nicht",
          "kein",
          "keine"
        ],
        "correctAnswer": "kein",
        "explanationDe": "Das Auto ist neutral (Akkusativ = kein Auto).",
        "explanationRu": "Слово Auto среднего рода (das Auto), в винительном падеже отрицание — «kein»: «Er hat kein Auto».",
        "audioHintText": "Er hat kein Auto."
      }
    ]
  },
  {
    "id": "lesson-4",
    "number": 4,
    "titleDe": "Unregelmäßige Verben & Satzbau",
    "titleRu": "Неправильные глаголы и порядок слов",
    "description": "Ключевые глаголы sein, haben, werden, wissen и золотое правило порядка слов: сказуемое всегда строго на II позиции в простом повествовательном предложении.",
    "difficulty": "A1.1",
    "estimatedMinutes": 14,
    "questionsCount": 8,
    "totalLearners": 1210,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Порядок слов",
      "sein haben"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l4-q1",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie die Form von „sein“: „Wir ______ Studenten aus Almaty.“",
        "promptRu": "Вставьте форму глагола sein (быть): «Мы студенты из Алматы.»",
        "options": [
          "bin",
          "sind",
          "ist",
          "seid"
        ],
        "correctAnswer": "sind",
        "explanationDe": "Konjugation von sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind.",
        "explanationRu": "Спряжение глагола sein для «wir» — «sind»: «Wir sind Studenten».",
        "audioHintText": "Wir sind Studenten aus Almaty."
      },
      {
        "id": "l4-q2",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „______ ihr schon ein Visum für Deutschland?“ (haben)",
        "promptRu": "Вставьте форму глагола haben (иметь) для «ihr» (вы, множественное): «У вас уже есть виза в Германию?»",
        "options": [
          "Haben",
          "Habt",
          "Hat",
          "Habst"
        ],
        "correctAnswer": "Habt",
        "explanationDe": "Mit dem Pronomen „ihr“ heißt es „ihr habt“.",
        "explanationRu": "С местоимением «ihr» форма глагола haben — «habt»: «Habt ihr ein Visum?».",
        "audioHintText": "Habt ihr schon ein Visum für Deutschland?"
      },
      {
        "id": "l4-q3",
        "type": "single-choice",
        "promptDe": "Welche Position hat das konjugierte Verb im Aussagesatz?",
        "promptRu": "На какой позиции ВСЕГДА стоит изменяемый глагол в простом немецком повествовательном предложении?",
        "options": [
          "Auf Position 2 (второе место)",
          "Auf Position 3 (третье место)",
          "Am Ende des Satzes (в самом конце)",
          "Auf Position 1 (первое место)"
        ],
        "correctAnswer": "Auf Position 2 (второе место)",
        "explanationDe": "Im deutschen Hauptsatz / Aussagesatz steht das konjugierte Verb immer an 2. Stelle.",
        "explanationRu": "В немецком повествовательном предложении спрягаемый глагол всегда занимает строго второе место (Position 2).",
        "audioHintText": "Heute lerne ich Deutsch."
      },
      {
        "id": "l4-q4",
        "type": "single-choice",
        "promptDe": "Welcher Satz hat die richtige Wortstellung (Inversion)?",
        "promptRu": "В каком предложении с обстоятельством времени на первом месте порядок слов грамматически верен?",
        "options": [
          "Heute nach München fahre ich.",
          "Heute fahre ich nach München.",
          "Ich heute fahre nach München.",
          "Heute ich fahre nach München."
        ],
        "correctAnswer": "Heute fahre ich nach München.",
        "explanationDe": "Wenn ein Element (z.B. Zeitangabe „heute“) auf Position 1 steht, folgt sofort das Verb auf Position 2 und danach das Subjekt: Heute fahre ich...",
        "explanationRu": "При выносе обстоятельства на 1-е место глагол остается на 2-м месте, а подлежащее смещается на 3-е: «Heute (1) fahre (2) ich (3)...».",
        "audioHintText": "Heute fahre ich nach München."
      },
      {
        "id": "l4-q5",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Er ______ Arzt.“ (werden)",
        "promptRu": "Вставьте форму глагола werden (становиться): «Он станет врачом.»",
        "options": [
          "wird",
          "wirst",
          "werde",
          "werdet"
        ],
        "correctAnswer": "wird",
        "explanationDe": "Werden: ich werde, du wirst, er wird, wir werden.",
        "explanationRu": "Спряжение глагола werden в 3 лице ед. ч. — «er wird».",
        "audioHintText": "Er wird Arzt."
      },
      {
        "id": "l4-q6",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Ich ______ die Antwort nicht.“ (wissen)",
        "promptRu": "Вставьте форму глагола wissen (знать): «Я не знаю ответа.»",
        "options": [
          "weiß",
          "wisst",
          "wisse",
          "weiße"
        ],
        "correctAnswer": "weiß",
        "explanationDe": "Wissen: ich weiß, du weißt, er weiß, wir wissen.",
        "explanationRu": "Глагол wissen в 1 и 3 лице единственного числа имеет форму «ich weiß», «er weiß».",
        "audioHintText": "Ich weiß die Antwort nicht."
      },
      {
        "id": "l4-q7",
        "type": "single-choice",
        "promptDe": "Welche Form von „haben“ passt zu „du“?",
        "promptRu": "Какая форма глагола haben верна для местоимения «du»?",
        "options": [
          "du habe",
          "du hat",
          "du hast",
          "du habst"
        ],
        "correctAnswer": "du hast",
        "explanationDe": "Haben bei du verliert das -b-: du hast (nicht habst).",
        "explanationRu": "При спряжении с du глагол haben теряет букву b: «du hast».",
        "audioHintText": "Hast du Zeit?"
      },
      {
        "id": "l4-q8",
        "type": "single-choice",
        "promptDe": "Ordnen Sie die Satzteile richtig: [in Berlin / Peter / wohnt / jetzt]",
        "promptRu": "Составьте правильное предложение с обстоятельством «Jetzt» на первом месте:",
        "options": [
          "Jetzt wohnt Peter in Berlin.",
          "Peter jetzt in Berlin wohnt.",
          "Wohnt jetzt Peter in Berlin.",
          "Jetzt Peter wohnt in Berlin."
        ],
        "correctAnswer": "Jetzt wohnt Peter in Berlin.",
        "explanationDe": "Jetzt (Pos 1) + wohnt (Pos 2) + Peter (Pos 3) + in Berlin (Angabe).",
        "explanationRu": "Порядок слов: Jetzt (1) + wohnt (глагол, 2) + Peter (подлежащее, 3) + in Berlin.",
        "audioHintText": "Jetzt wohnt Peter in Berlin."
      }
    ]
  },
  {
    "id": "lesson-5",
    "number": 5,
    "titleDe": "Fragesätze (W-Fragen & Ja/Nein-Fragen)",
    "titleRu": "Вопросительные предложения",
    "description": "Построение специальных вопросов с вопросительными словами (W-Fragen: wer, was, wo, woher, wohin, wann, wie, warum) и общих вопросов (Ja/Nein-Fragen).",
    "difficulty": "A1.1",
    "estimatedMinutes": 14,
    "questionsCount": 8,
    "totalLearners": 1180,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "W-Fragen",
      "Вопросы"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l5-q1",
        "type": "fill-gap",
        "promptDe": "Welches Fragewort passt? „______ wohnst du?“ — „In Frankfurt.“",
        "promptRu": "Выберите вопросительное слово: «... ты живешь? — Во Франкфурте.»",
        "options": [
          "Wohin",
          "Wer",
          "Wo",
          "Woher"
        ],
        "correctAnswer": "Wo",
        "explanationDe": "„Wo“ fragt nach einem Ort / Standort (где?).",
        "explanationRu": "Вопросительное слово «Wo» обозначает «Где?» (местонахождение).",
        "audioHintText": "Wo wohnst du?"
      },
      {
        "id": "l5-q2",
        "type": "fill-gap",
        "promptDe": "Welches Fragewort passt? „______ gehst du heute Abend?“ — „Ins Kino.“",
        "promptRu": "Выберите вопросительное слово: «... ты идешь сегодня вечером? — В кино.»",
        "options": [
          "Was",
          "Wohin",
          "Woher",
          "Wo"
        ],
        "correctAnswer": "Wohin",
        "explanationDe": "„Wohin“ fragt nach der Richtung / dem Ziel (куда?).",
        "explanationRu": "«Wohin» означает «Куда?» (направление движения).",
        "audioHintText": "Wohin gehst du heute Abend?"
      },
      {
        "id": "l5-q3",
        "type": "fill-gap",
        "promptDe": "Welches Fragewort passt? „______ kommst du?“ — „Aus Kasachstan.“",
        "promptRu": "Выберите вопросительное слово: «... ты приехал? — Из Казахстана.»",
        "options": [
          "Wo",
          "Wann",
          "Woher",
          "Wohin"
        ],
        "correctAnswer": "Woher",
        "explanationDe": "„Woher“ fragt nach der Herkunft (откуда?).",
        "explanationRu": "«Woher» означает «Откуда?» (происхождение/исходная точка).",
        "audioHintText": "Woher kommst du?"
      },
      {
        "id": "l5-q4",
        "type": "single-choice",
        "promptDe": "Welche Satzstellung hat eine Ja/Nein-Frage (Entscheidungsfrage)?",
        "promptRu": "Какое место занимает сказуемое в общем вопросе (Ja/Nein-Frage)?",
        "options": [
          "Auf Position 3 (третье место)",
          "Auf Position 1 (первое место в предложении)",
          "Am Ende des Satzes (в конце)",
          "Auf Position 2 (второе место)"
        ],
        "correctAnswer": "Auf Position 1 (первое место в предложении)",
        "explanationDe": "In Ja/Nein-Fragen steht das Verb immer ganz vorne auf Position 1: „Lernst du Deutsch?“",
        "explanationRu": "В вопросе без вопросительного слова глагол ставится на самое 1-е место: «Lernst du Deutsch?» (Учишь ли ты немецкий?).",
        "audioHintText": "Lernst du Deutsch?"
      },
      {
        "id": "l5-q5",
        "type": "single-choice",
        "promptDe": "Welcher Fragesatz ist grammatisch korrekt gebildet?",
        "promptRu": "Какой вопрос с вопросительным словом W-Frage построен правильно?",
        "options": [
          "Der Unterricht wann beginnt?",
          "Beginnt wann der Unterricht?",
          "Wann beginnt der Unterricht?",
          "Wann der Unterricht beginnt?"
        ],
        "correctAnswer": "Wann beginnt der Unterricht?",
        "explanationDe": "In der W-Frage steht das Fragewort auf Position 1 und das Verb auf Position 2: Wann (1) beginnt (2) der Unterricht (3)?",
        "explanationRu": "В специальном вопросе структура: Вопросительное слово (1) + Глагол (2) + Подлежащее (3).",
        "audioHintText": "Wann beginnt der Unterricht?"
      },
      {
        "id": "l5-q6",
        "type": "fill-gap",
        "promptDe": "Welches Fragewort fragt nach Personen im Nominativ? „______ ist das?“ — „Das ist mein Lehrer.“",
        "promptRu": "Какое слово спрашивает о человеке (Кто это?): «... это? — Это мой учитель.»",
        "options": [
          "Wer",
          "Warum",
          "Wie",
          "Was"
        ],
        "correctAnswer": "Wer",
        "explanationDe": "„Wer“ fragt nach Personen im Nominativ (кто?).",
        "explanationRu": "«Wer» означает «Кто?» (для одушевленных лиц в именительном падеже).",
        "audioHintText": "Wer ist das?"
      },
      {
        "id": "l5-q7",
        "type": "fill-gap",
        "promptDe": "Welches Fragewort fragt nach Sachen? „______ machst du am Wochenende?“",
        "promptRu": "Какое слово означает «Что?»: «... ты делаешь на выходных?»",
        "options": [
          "Wie",
          "Was",
          "Wer",
          "Wo"
        ],
        "correctAnswer": "Was",
        "explanationDe": "„Was“ fragt nach Dingen und Handlungen (что?).",
        "explanationRu": "«Was» означает «Что?» (для предметов и действий).",
        "audioHintText": "Was machst du am Wochenende?"
      },
      {
        "id": "l5-q8",
        "type": "fill-gap",
        "promptDe": "Welches Fragewort passt? „______ alt bist du?“",
        "promptRu": "Какое слово используется в вопросе о возрасте: «Сколько тебе лет?»",
        "options": [
          "Was",
          "Wie",
          "Wann",
          "Wo"
        ],
        "correctAnswer": "Wie",
        "explanationDe": "Im Deutschen fragt man: „Wie alt bist du?“ (nicht wie viel).",
        "explanationRu": "Вопрос о возрасте строится со словом «Wie»: «Wie alt bist du?» (дословно: насколько ты стар?).",
        "audioHintText": "Wie alt bist du?"
      }
    ]
  },
  {
    "id": "lesson-6",
    "number": 6,
    "titleDe": "Negation im Deutschen (nicht vs. kein)",
    "titleRu": "Отрицательное предложение",
    "description": "Четкое разграничение отрицаний: kein/keine (отрицание существительных) и nicht (отрицание глаголов, прилагательных, имен собственных и предложений).",
    "difficulty": "A1.1",
    "estimatedMinutes": 14,
    "questionsCount": 8,
    "totalLearners": 1150,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Отрицание",
      "nicht kein"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l6-q1",
        "type": "single-choice",
        "promptDe": "Wann verwendet man „kein / keine“?",
        "promptRu": "В каких случаях в немецком языке используется отрицание «kein / keine»?",
        "options": [
          "Vor Substantiven mit unbestimmtem Artikel oder ohne Artikel",
          "Am Satzende",
          "Vor Verben und Adjektiven",
          "Vor Eigennamen und Städten"
        ],
        "correctAnswer": "Vor Substantiven mit unbestimmtem Artikel oder ohne Artikel",
        "explanationDe": "„Kein“ verneint Nomen, die mit „ein/eine“ oder ohne Artikel stehen.",
        "explanationRu": "Отрицательный артикль «kein» используется только перед существительными, которые в утверждении имели бы неопределенный или нулевой артикль.",
        "audioHintText": "Ich habe kein Geld."
      },
      {
        "id": "l6-q2",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie die Negation: „Ich verstehe das Wort ______.“",
        "promptRu": "Вставьте отрицание: «Я не понимаю это слово.»",
        "options": [
          "kein",
          "keinen",
          "nicht",
          "keine"
        ],
        "correctAnswer": "nicht",
        "explanationDe": "Das Verb „verstehen“ bzw. der ganze Satz wird mit „nicht“ verneint.",
        "explanationRu": "Для отрицания глагола или всего действия используется частица «nicht»: «Ich verstehe das nicht».",
        "audioHintText": "Ich verstehe das Wort nicht."
      },
      {
        "id": "l6-q3",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Er trinkt ______ Kaffee.“ (der Kaffee, ohne Artikel)",
        "promptRu": "Вставьте правильное отрицание существительного: «Он не пьет кофе.»",
        "options": [
          "keinen",
          "kein",
          "nicht",
          "keine"
        ],
        "correctAnswer": "keinen",
        "explanationDe": "Kaffee ist maskulin im Akkusativ: keinen Kaffee.",
        "explanationRu": "Слово Kaffee мужского рода, в винительном падеже (Akkusativ) отрицательный артикль — «keinen»: «Er trinkt keinen Kaffee».",
        "audioHintText": "Er trinkt keinen Kaffee."
      },
      {
        "id": "l6-q4",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Das ist ______ teuer.“ (Adjektiv)",
        "promptRu": "Вставьте отрицание перед прилагательным teuer (дорогой): «Это недорого.»",
        "options": [
          "keinen",
          "kein",
          "nicht",
          "keine"
        ],
        "correctAnswer": "nicht",
        "explanationDe": "Adjektive werden immer mit „nicht“ verneint.",
        "explanationRu": "Прилагательные и наречия всегда отрицаются частицей «nicht»: «nicht teuer».",
        "audioHintText": "Das ist nicht teuer."
      },
      {
        "id": "l6-q5",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Ich habe ______ Geschwister.“ (Plural)",
        "promptRu": "Вставьте отрицание для существительного во множественном числе Geschwister (братья и сестры):",
        "options": [
          "keinen",
          "keine",
          "nicht",
          "kein"
        ],
        "correctAnswer": "keine",
        "explanationDe": "Plural wird mit „keine“ verneint: keine Geschwister.",
        "explanationRu": "Во множественном числе отрицание существительного — «keine»: «Ich habe keine Geschwister».",
        "audioHintText": "Ich habe keine Geschwister."
      },
      {
        "id": "l6-q6",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Das ist ______ Herr Schmidt, sondern Herr Weber.“",
        "promptRu": "Вставьте отрицание перед именем собственным (Herr Schmidt):",
        "options": [
          "keinen",
          "kein",
          "nicht",
          "keine"
        ],
        "correctAnswer": "nicht",
        "explanationDe": "Eigennamen und Personen werden mit „nicht“ verneint.",
        "explanationRu": "Имена собственные и конкретные лица отрицаются с помощью «nicht»: «Das ist nicht Herr Schmidt».",
        "audioHintText": "Das ist nicht Herr Schmidt."
      },
      {
        "id": "l6-q7",
        "type": "single-choice",
        "promptDe": "Welcher Satz verneint das Verb „kommen“ am Satzende richtig?",
        "promptRu": "Какой вариант предложения с отрицанием в конце предложения построен правильно?",
        "options": [
          "Maria kommt nicht heute.",
          "Maria kommt heute nicht.",
          "Maria kein kommt heute.",
          "Maria nicht kommt heute."
        ],
        "correctAnswer": "Maria kommt heute nicht.",
        "explanationDe": "Bei der Negation des Verbs steht „nicht“ meistens am Satzende.",
        "explanationRu": "При общем отрицании глагольного действия частица «nicht» ставится в конец предложения: «Maria kommt heute nicht».",
        "audioHintText": "Maria kommt heute nicht."
      },
      {
        "id": "l6-q8",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Wir wohnen ______ in Hamburg, sondern in Köln.“",
        "promptRu": "Вставьте отрицание: «Мы живем не в Гамбурге, а в Кёльне.»",
        "options": [
          "kein",
          "keinen",
          "nicht",
          "keine"
        ],
        "correctAnswer": "nicht",
        "explanationDe": "Präpositionale Angaben (in Hamburg) werden mit „nicht“ verneint.",
        "explanationRu": "Обстоятельства с предлогами отрицаются словом «nicht»: «nicht in Hamburg».",
        "audioHintText": "Wir wohnen nicht in Hamburg."
      }
    ]
  },
  {
    "id": "lesson-7",
    "number": 7,
    "titleDe": "Possessivpronomen",
    "titleRu": "Притяжательные местоимения",
    "description": "Формы притяжательных местоимений (mein, dein, sein, ihr, unser, euer, ihr, Ihr) в Nominativ и Akkusativ.",
    "difficulty": "A1.1",
    "estimatedMinutes": 15,
    "questionsCount": 9,
    "totalLearners": 1100,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Местоимения",
      "mein dein"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l7-q1",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (ich): „Das ist ______ Bruder.“ (der Bruder)",
        "promptRu": "Вставьте притяжательное местоимение от «ich» (мой): «Это мой брат.»",
        "options": [
          "mein",
          "meine",
          "meinem",
          "meinen"
        ],
        "correctAnswer": "mein",
        "explanationDe": "Maskulin Nominativ: mein Bruder.",
        "explanationRu": "Мужской род в именительном падеже: «mein Bruder».",
        "audioHintText": "Das ist mein Bruder."
      },
      {
        "id": "l7-q2",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (du): „Ist das ______ Tasche?“ (die Tasche, feminin)",
        "promptRu": "Вставьте местоимение от «du» (твоя): «Это твоя сумка?»",
        "options": [
          "deiner",
          "deine",
          "dein",
          "deinen"
        ],
        "correctAnswer": "deine",
        "explanationDe": "Feminin Nominativ: deine Tasche.",
        "explanationRu": "Женский род получает окончание -e: «deine Tasche».",
        "audioHintText": "Ist das deine Tasche?"
      },
      {
        "id": "l7-q3",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (er): „Peter sucht ______ Schlüssel.“ (der Schlüssel, Akkusativ maskulin)",
        "promptRu": "Вставьте местоимение от «er» (его) в винительном падеже: «Петер ищет свой/его ключ.»",
        "options": [
          "sein",
          "seinen",
          "seinem",
          "seine"
        ],
        "correctAnswer": "seinen",
        "explanationDe": "Maskulin Akkusativ für er: seinen Schlüssel.",
        "explanationRu": "В винительном падеже мужской род имеет окончание -en: «seinen Schlüssel».",
        "audioHintText": "Peter sucht seinen Schlüssel."
      },
      {
        "id": "l7-q4",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (sie): „Anna liebt ______ Katze.“ (die Katze)",
        "promptRu": "Вставьте местоимение от «sie» (её): «Анна любит свою/её кошку.»",
        "options": [
          "ihre",
          "seine",
          "ihr",
          "ihren"
        ],
        "correctAnswer": "ihre",
        "explanationDe": "Für „sie“ (Singular) lautet das Possessivpronomen „ihr / ihre“: ihre Katze.",
        "explanationRu": "Для местоимения «она» (sie) притяжательное — «ihr» (+ e для женского рода: «ihre Katze»).",
        "audioHintText": "Anna liebt ihre Katze."
      },
      {
        "id": "l7-q5",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (wir): „Das ist ______ Haus.“ (das Haus, neutral)",
        "promptRu": "Вставьте местоимение от «wir» (наш): «Это наш дом.»",
        "options": [
          "unsere",
          "unser",
          "uns",
          "unseren"
        ],
        "correctAnswer": "unser",
        "explanationDe": "Neutral Nominativ: unser Haus.",
        "explanationRu": "Средний род в Nominativ: «unser Haus».",
        "audioHintText": "Das ist unser Haus."
      },
      {
        "id": "l7-q6",
        "type": "single-choice",
        "promptDe": "Wie lautet die feminine Form von „euer“ (ihr)?",
        "promptRu": "Как пишется форма местоимения «ваш» для женского рода (euer + e)?",
        "options": [
          "eure",
          "eures",
          "euere",
          "euren"
        ],
        "correctAnswer": "eure",
        "explanationDe": "Bei „euer“ entfällt das mittlere „e“ vor der Endung: eure (nicht euere).",
        "explanationRu": "При добавлении окончания буква e в корне euer выпадает: «eure Mutter», «eure Schule».",
        "audioHintText": "Ist das eure Schule?"
      },
      {
        "id": "l7-q7",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie die Höflichkeitsform (Sie): „Wie ist ______ Name?“",
        "promptRu": "Вставьте вежливую форму «Ваш»: «Как Ваша фамилия / имя?»",
        "options": [
          "dein",
          "Ihre",
          "Ihr",
          "Ihren"
        ],
        "correctAnswer": "Ihr",
        "explanationDe": "Höflichkeitsform großgeschrieben: Ihr Name.",
        "explanationRu": "Вежливая форма пишется с заглавной буквы: «Ihr Name» (Ваше имя).",
        "audioHintText": "Wie ist Ihr Name?"
      },
      {
        "id": "l7-q8",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (sie): „Die Kinder machen ______ Hausaufgaben.“ (Plural)",
        "promptRu": "Вставьте местоимение от «sie» (их): «Дети делают свои/их домашние задания.»",
        "options": [
          "seine",
          "ihre",
          "ihr",
          "ihren"
        ],
        "correctAnswer": "ihre",
        "explanationDe": "Plural für sie (sie Plural): ihre Hausaufgaben.",
        "explanationRu": "Для «они» (sie Plural) притяжательное во множественном числе — «ihre».",
        "audioHintText": "Die Kinder machen ihre Hausaufgaben."
      },
      {
        "id": "l7-q9",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie im Akkusativ: „Ich rufe ______ Vater an.“ (mein)",
        "promptRu": "Вставьте форму притяжательного местоимения в Akkusativ (der Vater): «Я звоню своему отцу.»",
        "options": [
          "meinem",
          "mein",
          "meinen",
          "meine"
        ],
        "correctAnswer": "meinen",
        "explanationDe": "Akkusativ maskulin: anrufen + Akkusativ → meinen Vater.",
        "explanationRu": "Глагол anrufen требует Akkusativ. Мужской род: mein → «meinen Vater».",
        "audioHintText": "Ich rufe meinen Vater an."
      }
    ]
  },
  {
    "id": "lesson-8",
    "number": 8,
    "titleDe": "Imperativ (du / ihr / Sie / wir)",
    "titleRu": "Повелительное наклонение",
    "description": "Образование команд и просьб для трех форм обращения: на «ты» (du-Form), к группе друзей (ihr-Form) и вежливо (Sie-Form), включая особые глаголы sein и сильные глаголы.",
    "difficulty": "A1.1",
    "estimatedMinutes": 15,
    "questionsCount": 9,
    "totalLearners": 1060,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Imperativ",
      "Команды"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l8-q1",
        "type": "single-choice",
        "promptDe": "Wie bildet man den Imperativ für „du“ von „kommen“?",
        "promptRu": "Как образуется повелительная форма на «ты» (du) от глагола kommen (приходить)?",
        "options": [
          "Komm!",
          "Kommst!",
          "Kommt!",
          "Kommen!"
        ],
        "correctAnswer": "Komm!",
        "explanationDe": "Imperativ du: Verbstamm ohne -st und ohne Pronomen: Komm!",
        "explanationRu": "Для формы du берется основа глагола без окончания -st и без местоимения: «Komm!» (Приходи!).",
        "audioHintText": "Komm bitte hierher!"
      },
      {
        "id": "l8-q2",
        "type": "single-choice",
        "promptDe": "Wie lautet der Imperativ für „ihr“ von „machen“?",
        "promptRu": "Как звучит повелительная форма для группы людей на «вы» (ihr) от глагола machen?",
        "options": [
          "Machen!",
          "Macht ihr!",
          "Macht!",
          "Mach!"
        ],
        "correctAnswer": "Macht!",
        "explanationDe": "Imperativ ihr: Verbstamm + t (ohne Pronomen ihr): Macht!",
        "explanationRu": "Для формы ihr берется стандартная форма глагола на -t без местоимения: «Macht die Hausaufgaben!» (Делайте!).",
        "audioHintText": "Macht bitte die Tür zu!"
      },
      {
        "id": "l8-q3",
        "type": "single-choice",
        "promptDe": "Wie lautet die höfliche Form (Sie) von „wiederholen“?",
        "promptRu": "Как вежливо попросить собеседника на «Вы» (Sie)?",
        "options": [
          "Wiederholen Sie, bitte!",
          "Wiederholt Sie!",
          "Sie wiederholen!",
          "Wiederhole Sie!"
        ],
        "correctAnswer": "Wiederholen Sie, bitte!",
        "explanationDe": "Höflicher Imperativ: Infinitiv + Sie: Wiederholen Sie, bitte!",
        "explanationRu": "В вежливой форме (Sie) глагол стоит в инфинитиве перед местоимением Sie: «Wiederholen Sie, bitte!» (Повторите, пожалуйста!).",
        "audioHintText": "Wiederholen Sie das bitte!"
      },
      {
        "id": "l8-q4",
        "type": "single-choice",
        "promptDe": "Welche Imperativform von „lesen“ (du) ist korrekt?",
        "promptRu": "Какая форма повелительного наклонения на «ты» от сильного глагола lesen верна?",
        "options": [
          "Lese!",
          "Les!",
          "Lies!",
          "Liest!"
        ],
        "correctAnswer": "Lies!",
        "explanationDe": "Starke Verben mit Vokalwechsel e → i/ie behalten den Vokalwechsel im Imperativ du: Lies!",
        "explanationRu": "Сильные глаголы с чередованием e → i/ie сохраняют чередование в повелительной форме du: «Lies den Text!» (Читай!).",
        "audioHintText": "Lies den Text laut!"
      },
      {
        "id": "l8-q5",
        "type": "single-choice",
        "promptDe": "Welche Imperativform von „fahren“ (du) ist korrekt?",
        "promptRu": "Как звучит приказ от глагола с корневой гласной a (fahren: ехать) на «ты»?",
        "options": [
          "Fähr!",
          "Fahr!",
          "Fahrt!",
          "Fahre du!"
        ],
        "correctAnswer": "Fahr!",
        "explanationDe": "Verben mit a → ä verlieren den Umlaut im Imperativ: Fahr! (nicht fähr).",
        "explanationRu": "Глаголы с умлаутом (a → ä) в императиве ТЕРЯЮТ умлаут: «Fahr langsam!» (Езжай медленно!).",
        "audioHintText": "Fahr bitte vorsichtig!"
      },
      {
        "id": "l8-q6",
        "type": "single-choice",
        "promptDe": "Wie lautet der Imperativ von „sein“ für „du“?",
        "promptRu": "Какова неправильная форма императива от глагола sein (быть) на «ты»?",
        "options": [
          "Sei!",
          "Sein!",
          "Bist!",
          "Seist!"
        ],
        "correctAnswer": "Sei!",
        "explanationDe": "Imperativ von sein: du → Sei!, ihr → Seid!, Sie → Seien Sie!",
        "explanationRu": "Императив от sein исключение: «Sei leise!» (Будь тише!), «Seid pünktlich!», «Seien Sie bitte geduldig!».",
        "audioHintText": "Sei pünktlich!"
      },
      {
        "id": "l8-q7",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie die höfliche Bitte: „______ Sie bitte hier!“ (warten)",
        "promptRu": "Вставьте вежливый императив от warten (ждать): «Подождите, пожалуйста, здесь!»",
        "options": [
          "Wartet",
          "Warten",
          "Wartete",
          "Warte"
        ],
        "correctAnswer": "Warten",
        "explanationDe": "Höflichkeitsform: Warten Sie!",
        "explanationRu": "Вежливый императив: «Warten Sie bitte hier!».",
        "audioHintText": "Warten Sie bitte hier!"
      },
      {
        "id": "l8-q8",
        "type": "single-choice",
        "promptDe": "Wie bittet man einen Freund: um Hilfe bitten (helfen)",
        "promptRu": "Как правильно сказать другу: «Помоги мне, пожалуйста!» (helfen: e → i)?",
        "options": [
          "Helft mir, bitte!",
          "Hilf mir, bitte!",
          "Helf mir, bitte!",
          "Hilfst mir, bitte!"
        ],
        "correctAnswer": "Hilf mir, bitte!",
        "explanationDe": "Helfen hat den Wechsel e → i: Hilf mir!",
        "explanationRu": "У глагола helfen e переходит в i: «Hilf mir, bitte!».",
        "audioHintText": "Hilf mir bitte!"
      },
      {
        "id": "l8-q9",
        "type": "single-choice",
        "promptDe": "Wie lautet der Imperativ von „sein“ für die Gruppe „ihr“?",
        "promptRu": "Как звучит повелительная форма от sein для группы «ihr» (вы)?",
        "options": [
          "Seit!",
          "Seien!",
          "Seid!",
          "Seid ihr!"
        ],
        "correctAnswer": "Seid!",
        "explanationDe": "Imperativ ihr von sein lautet: Seid! (z.B. Seid ruhig!).",
        "explanationRu": "Для группы людей форма от sein — «Seid ruhig!» (Будьте спокойны!).",
        "audioHintText": "Seid bitte ruhig!"
      }
    ]
  },
  {
    "id": "lesson-9",
    "number": 9,
    "titleDe": "Grundzahlen und Ordnungszahlen",
    "titleRu": "Числительные: количественные и порядковые",
    "description": "Счет от 1 до 1000, правила образования составных чисел (einundzwanzig), порядковые числительные (der erste, der zwanzigste), чтение дат и обозначение времени.",
    "difficulty": "A1.1",
    "estimatedMinutes": 16,
    "questionsCount": 10,
    "totalLearners": 1040,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Числительные",
      "Zahlen"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l9-q1",
        "type": "single-choice",
        "promptDe": "Wie heißt die Zahl „54“ auf Deutsch?",
        "promptRu": "Как правильно пишется число 54 на немецком языке?",
        "options": [
          "fünfundvierzig",
          "vierundfünfzig",
          "fünfzigundvier",
          "vierzigundfünf"
        ],
        "correctAnswer": "vierundfünfzig",
        "explanationDe": "Im Deutschen nennt man zuerst die Einer und dann die Zehner: vier-und-fünfzig.",
        "explanationRu": "В немецких двузначных числах сначала называются единицы, затем союз «und» и десятки: «vierundfünfzig» (4 и 50).",
        "audioHintText": "vierundfünfzig"
      },
      {
        "id": "l9-q2",
        "type": "fill-gap",
        "promptDe": "Wie schreibt man 1. auf Deutsch? „Heute ist der ______ Mai.“",
        "promptRu": "Вставьте порядковое числительное «первое (мая)»: «Heute ist der ... Mai.»",
        "options": [
          "ersten",
          "einste",
          "erste",
          "eins"
        ],
        "correctAnswer": "erste",
        "explanationDe": "Ordnungszahl für 1: der erste.",
        "explanationRu": "Порядковое числительное от 1 — «der erste» (первый).",
        "audioHintText": "Heute ist der erste Mai."
      },
      {
        "id": "l9-q3",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Mein Geburtstag ist am ______ Oktober.“ (25. Dativ)",
        "promptRu": "Вставьте дату с предлогом am (25-го октября): «Mein Geburtstag ist am ... Oktober.»",
        "options": [
          "fünfundzwanzigsten",
          "fünfundzwanzigste",
          "fünfzigsten",
          "fünfundzwanzig"
        ],
        "correctAnswer": "fünfundzwanzigsten",
        "explanationDe": "Nach „am“ (an dem = Dativ) und ab 20 lautet die Endung „-sten“: am fünfundzwanzigsten.",
        "explanationRu": "После предлога «am» порядковые числительные от 20 и выше получают суффикс -sten: «am fünfundzwanzigsten».",
        "audioHintText": "Mein Geburtstag ist am fünfundzwanzigsten Oktober."
      },
      {
        "id": "l9-q4",
        "type": "single-choice",
        "promptDe": "Wie spät ist es bei „halb acht“?",
        "promptRu": "Который час означает выражение «halb acht»?",
        "options": [
          "8:30 Uhr",
          "7:00 Uhr",
          "7:30 Uhr",
          "8:00 Uhr"
        ],
        "correctAnswer": "7:30 Uhr",
        "explanationDe": "„Halb acht“ bedeutet eine halbe Stunde vor 8:00, also 7:30 Uhr.",
        "explanationRu": "Выражение «halb acht» означает половину восьмого, то есть 7:30.",
        "audioHintText": "Es ist halb acht."
      },
      {
        "id": "l9-q5",
        "type": "single-choice",
        "promptDe": "Wie drückt man „18:45 Uhr“ umgangssprachlich aus?",
        "promptRu": "Как в разговорной речи называют время 18:45 (без четверти семь)?",
        "options": [
          "Viertel vor sieben",
          "Viertel nach sechs",
          "Viertel vor sechs",
          "Drei Viertel sechs"
        ],
        "correctAnswer": "Viertel vor sieben",
        "explanationDe": "15 Minuten vor 7 Uhr heißt „Viertel vor sieben“.",
        "explanationRu": "15 минут до 7 часов — это «Viertel vor sieben» (без четверти семь).",
        "audioHintText": "Es ist Viertel vor sieben."
      },
      {
        "id": "l9-q6",
        "type": "single-choice",
        "promptDe": "Wie lautet das Ordnungszahlwort für 3.?",
        "promptRu": "Как звучит порядковое числительное от числа 3 (третий)?",
        "options": [
          "dreite",
          "dritter",
          "dritte",
          "dreiste"
        ],
        "correctAnswer": "dritte",
        "explanationDe": "Die Ordnungszahl für 3 ist unregelmäßig: der/die/das dritte.",
        "explanationRu": "Порядковое числительное от 3 образуется не по общему правилу: «dritte» (der dritte).",
        "audioHintText": "Das ist der dritte Tag."
      },
      {
        "id": "l9-q7",
        "type": "single-choice",
        "promptDe": "Wie heißt die Zahl „1000“ auf Deutsch?",
        "promptRu": "Как называется число 1000 по-немецки?",
        "options": [
          "hundert",
          "tausend",
          "million",
          "zehnhundert"
        ],
        "correctAnswer": "tausend",
        "explanationDe": "1000 heißt „(ein)tausend“.",
        "explanationRu": "Число 1000 — «tausend».",
        "audioHintText": "eintausend"
      },
      {
        "id": "l9-q8",
        "type": "single-choice",
        "promptDe": "Wie lautet die Zahl „77“?",
        "promptRu": "Как пишется число 77?",
        "options": [
          "siebenundsiebzig",
          "siebzehn",
          "siebzigundsieben",
          "siebenundsiebenzig"
        ],
        "correctAnswer": "siebenundsiebzig",
        "explanationDe": "77 = siebenundsiebzig (ohne -en bei siebzig).",
        "explanationRu": "В слове 70 (siebzig) корень сокращается: «siebenundsiebzig».",
        "audioHintText": "siebenundsiebzig"
      },
      {
        "id": "l9-q9",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Wir treffen uns um ______ Uhr.“ (14:15)",
        "promptRu": "Как официально записать время 14:15: «четырнадцать пятнадцать»?",
        "options": [
          "fünfzehn Uhr vierzehn",
          "vierzehn Uhr fünfzehn",
          "halb drei",
          "viertel zwei"
        ],
        "correctAnswer": "vierzehn Uhr fünfzehn",
        "explanationDe": "Offizielle Zeitangabe: 14:15 = vierzehn Uhr fünfzehn.",
        "explanationRu": "Официальный формат времени: часы + слово Uhr + минуты: «vierzehn Uhr fünfzehn».",
        "audioHintText": "Wir treffen uns um vierzehn Uhr fünfzehn."
      },
      {
        "id": "l9-q10",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Heute ist der ______ Dezember.“ (31. Nominativ)",
        "promptRu": "Вставьте порядковое числительное 31-е (Nominativ): «Heute ist der ... Dezember.»",
        "options": [
          "dreißigste",
          "einunddreißigste",
          "einunddreißigsten",
          "einunddreißig"
        ],
        "correctAnswer": "einunddreißigste",
        "explanationDe": "Im Nominativ mit bestimmtem Artikel (der) lautet die Endung ab 20 „-ste“: der einunddreißigste.",
        "explanationRu": "В именительном падеже (Nominativ) после der окончание -ste: «der einunddreißigste Dezember».",
        "audioHintText": "Heute ist der einunddreißigste Dezember."
      }
    ]
  },
  {
    "id": "lesson-10",
    "number": 10,
    "titleDe": "Fälle in deutscher Sprache (Nominativ, Akkusativ, Dativ)",
    "titleRu": "Падежи в немецком языке",
    "description": "Система падежей A1: Nominativ (именительный: Wer? Was?), Akkusativ (винительный: Wen? Was?) и Dativ (дательный: Wem?), управление глаголов и падежные окончания артиклей.",
    "difficulty": "A1.1",
    "estimatedMinutes": 18,
    "questionsCount": 10,
    "totalLearners": 980,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Падежи",
      "Kasus Dativ Akkusativ"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l10-q1",
        "type": "single-choice",
        "promptDe": "Welche Frage gehört zum Dativ?",
        "promptRu": "Какой вопрос относится к дательному падежу (Dativ)?",
        "options": [
          "Wer? (Кто?)",
          "Wen? (Кого?)",
          "Wem? (Кому?)",
          "Was? (Что?)"
        ],
        "correctAnswer": "Wem? (Кому?)",
        "explanationDe": "Dativ fragt nach: Wem? (Кому?).",
        "explanationRu": "Вопрос дательного падежа (Dativ) — «Wem?» (Кому?).",
        "audioHintText": "Wem hilfst du?"
      },
      {
        "id": "l10-q2",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie im Dativ: „Ich helfe ______ Mann.“ (der Mann)",
        "promptRu": "Вставьте артикль в Dativ с глаголом helfen (помогать кому?): «Я помогаю мужчине.»",
        "options": [
          "der",
          "dem",
          "den",
          "des"
        ],
        "correctAnswer": "dem",
        "explanationDe": "Helfen + Dativ. Maskulin Dativ: dem Mann.",
        "explanationRu": "Глагол helfen требует Dativ. Мужской род в Dativ: der → «dem Mann».",
        "audioHintText": "Ich helfe dem Mann."
      },
      {
        "id": "l10-q3",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie im Dativ: „Wir danken ______ Lehrerin.“ (die Lehrerin, feminin)",
        "promptRu": "Вставьте артикль женского рода в Dativ с глаголом danken (благодарить кого/кому?): «Мы благодарим учительницу.»",
        "options": [
          "dem",
          "die",
          "der",
          "den"
        ],
        "correctAnswer": "der",
        "explanationDe": "Feminin Dativ: der Lehrerin (die → der).",
        "explanationRu": "Женский род в Dativ меняет артикль die на der: «der Lehrerin».",
        "audioHintText": "Wir danken der Lehrerin."
      },
      {
        "id": "l10-q4",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie im Dativ: „Das Buch gefällt ______ Kind.“ (das Kind, neutral)",
        "promptRu": "Вставьте артикль среднего рода в Dativ: «Книга нравится ребенку.»",
        "options": [
          "dem",
          "den",
          "das",
          "der"
        ],
        "correctAnswer": "dem",
        "explanationDe": "Neutral Dativ: dem Kind (das → dem).",
        "explanationRu": "Средний род в Dativ меняет артикль das на dem: «dem Kind».",
        "audioHintText": "Das Buch gefällt dem Kind."
      },
      {
        "id": "l10-q5",
        "type": "single-choice",
        "promptDe": "Welche Endung erhalten Substantive im Dativ Plural?",
        "promptRu": "Какое окончание почти всегда добавляется к существительным в дательном падеже множественного числа (Dativ Plural)?",
        "options": [
          "-s",
          "-e",
          "-n (den Kindern, den Freunden)",
          "-er"
        ],
        "correctAnswer": "-n (den Kindern, den Freunden)",
        "explanationDe": "Im Dativ Plural erhalten alle Nomen ein „-n“, wenn sie nicht schon auf -n oder -s enden: den Kindern.",
        "explanationRu": "В Dativ Plural артикль всегда «den», а к самому существительному добавляется окончание «-n»: «den Kindern».",
        "audioHintText": "Ich gebe den Kindern Äpfel."
      },
      {
        "id": "l10-q6",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie beide Artikel: „Der Vater gibt ______ Sohn (Dativ) ______ Ball (Akkusativ).“",
        "promptRu": "Вставьте оба артикля (кому? что?): «Отец дает сыну мяч.»",
        "options": [
          "dem / den",
          "den / dem",
          "dem / der",
          "der / den"
        ],
        "correctAnswer": "dem / den",
        "explanationDe": "Geben + Dativ (Person: dem Sohn) + Akkusativ (Sache: den Ball).",
        "explanationRu": "Глагол geben требует два дополнения: лицо в Dativ (dem Sohn) и предмет в Akkusativ (den Ball).",
        "audioHintText": "Der Vater gibt dem Sohn den Ball."
      },
      {
        "id": "l10-q7",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie das Personalpronomen im Dativ: „Wie geht es ______?“ — „Danke, gut!“ (du)",
        "promptRu": "Вставьте личное местоимение «du» в Dativ: «Как у тебя дела?»",
        "options": [
          "du",
          "dich",
          "dir",
          "dein"
        ],
        "correctAnswer": "dir",
        "explanationDe": "Personalpronomen im Dativ für du: dir (Wie geht es dir?).",
        "explanationRu": "Местоимение du в Dativ имеет форму «dir»: «Wie geht es dir?».",
        "audioHintText": "Wie geht es dir?"
      },
      {
        "id": "l10-q8",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie das Personalpronomen im Dativ: „Das Essen schmeckt ______ sehr gut.“ (ich)",
        "promptRu": "Вставьте местоимение «ich» в Dativ с глаголом schmecken (быть по вкусу): «Еда мне очень нравится на вкус.»",
        "options": [
          "mich",
          "mir",
          "ich",
          "mein"
        ],
        "correctAnswer": "mir",
        "explanationDe": "Personalpronomen im Dativ für ich: mir.",
        "explanationRu": "Местоимение ich в Dativ имеет форму «mir»: «Das schmeckt mir».",
        "audioHintText": "Das Essen schmeckt mir sehr gut."
      },
      {
        "id": "l10-q9",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie im Akkusativ: „Ich sehe ______ Arzt.“ (der Arzt)",
        "promptRu": "Вставьте артикль в Akkusativ (sehen + Akkusativ): «Я вижу врача.»",
        "options": [
          "den",
          "der",
          "dem",
          "des"
        ],
        "correctAnswer": "den",
        "explanationDe": "Sehen verlangt den Akkusativ: den Arzt (der → den).",
        "explanationRu": "Глагол sehen требует Akkusativ. Мужской род: der → «den Arzt».",
        "audioHintText": "Ich sehe den Arzt."
      },
      {
        "id": "l10-q10",
        "type": "single-choice",
        "promptDe": "Welcher Satz enthält ein Dativ-Objekt?",
        "promptRu": "В каком из предложений содержится дополнение в дательном падеже (Dativ)?",
        "options": [
          "Ich lese ein Buch.",
          "Ich antworte dem Chef.",
          "Er sucht seinen Hund.",
          "Wir trinken Tee."
        ],
        "correctAnswer": "Ich antworte dem Chef.",
        "explanationDe": "Antworten verlangt den Dativ: antworten + Dativ (dem Chef).",
        "explanationRu": "Глагол antworten управляет дательным падежом: «Ich antworte dem Chef» (Я отвечаю шефу).",
        "audioHintText": "Ich antworte dem Chef."
      }
    ]
  },
  {
    "id": "lesson-11",
    "number": 11,
    "titleDe": "Modalverben (können, müssen, wollen, dürfen, sollen, möchten)",
    "titleRu": "Модальные глаголы",
    "description": "Все 6 модальных глаголов немецкого языка: особенности спряжения в 1 и 3 лице (ich kann = er kann), значения и рамочная конструкция предложения (инфинитив в самом конце).",
    "difficulty": "A1.1",
    "estimatedMinutes": 18,
    "questionsCount": 11,
    "totalLearners": 950,
    "passThreshold": 70,
    "tags": [
      "A1.1",
      "Грамматика",
      "Модальные глаголы",
      "Modalverben"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l11-q1",
        "type": "single-choice",
        "promptDe": "Was ist die goldene Regel für die 1. und 3. Person Singular bei allen Modalverben?",
        "promptRu": "Каково главное правило спряжения всех модальных глаголов для 1-го и 3-го лица ед. ч. (ich / er, sie, es)?",
        "options": [
          "Sie behalten immer den Umlaut",
          "Sie haben keine Endung und sind völlig identisch (ich kann = er kann)",
          "Sie enden immer auf -t",
          "Sie enden immer auf -e"
        ],
        "correctAnswer": "Sie haben keine Endung und sind völlig identisch (ich kann = er kann)",
        "explanationDe": "Bei allen Modalverben haben „ich“ und „er/sie/es“ die gleiche Form ohne Endung: ich kann / er kann, ich muss / er muss.",
        "explanationRu": "У всех модальных глаголов формы «ich» и «er/sie/es» полностью совпадают и не имеют личных окончаний: «ich will = er will», «ich muss = er muss».",
        "audioHintText": "Ich kann Deutsch sprechen."
      },
      {
        "id": "l11-q2",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (können): „______ du gut schwimmen?“",
        "promptRu": "Вставьте форму глагола können (мочь, уметь) для «du»:",
        "options": [
          "Kannst",
          "Könnst",
          "Könnt",
          "Kann"
        ],
        "correctAnswer": "Kannst",
        "explanationDe": "Können bei du: du kannst.",
        "explanationRu": "Форма глагола können с местоимением du — «du kannst».",
        "audioHintText": "Kannst du gut schwimmen?"
      },
      {
        "id": "l11-q3",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (müssen): „Ich ______ heute lange arbeiten.“",
        "promptRu": "Вставьте форму глагола müssen (быть должным / обязанным) для «ich»:",
        "options": [
          "musst",
          "muss",
          "müsse",
          "müsst"
        ],
        "correctAnswer": "muss",
        "explanationDe": "Müssen: ich muss, du musst, er muss.",
        "explanationRu": "Форма глагола müssen для ich — «ich muss».",
        "audioHintText": "Ich muss heute lange arbeiten."
      },
      {
        "id": "l11-q4",
        "type": "single-choice",
        "promptDe": "Wo steht das Vollverb (im Infinitiv) im Satz mit einem Modalverb?",
        "promptRu": "Где стоит смысловой глагол в инфинитиве в предложении с модальным глаголом?",
        "options": [
          "Direkt nach dem Modalverb (сразу за модальным)",
          "Auf Position 1 (на первом месте)",
          "Ganz am Ende des Satzes (в самом конце предложения)",
          "Vor dem Subjekt (перед подлежащим)"
        ],
        "correctAnswer": "Ganz am Ende des Satzes (в самом конце предложения)",
        "explanationDe": "Satzklammer: Modalverb auf Position 2, Infinitiv am Satzende: „Ich möchte heute Deutsch lernen.“",
        "explanationRu": "Модальный глагол занимает 2-е место, а смысловой инфинитив уходит в самый конец предложения (рамочная конструкция).",
        "audioHintText": "Ich möchte heute Deutsch lernen."
      },
      {
        "id": "l11-q5",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (dürfen): „Hier ______ man nicht rauchen.“ (Verbot)",
        "promptRu": "Вставьте форму глагола dürfen (иметь разрешение): «Здесь нельзя (запрещено) курить.»",
        "options": [
          "darf",
          "darfst",
          "dürft",
          "dürfen"
        ],
        "correctAnswer": "darf",
        "explanationDe": "Dürfen mit man (3. Person): man darf nicht (nicht dürfen = Verbot).",
        "explanationRu": "С местоимением man используется форма 3 лица «darf»: «Man darf nicht» (запрещено).",
        "audioHintText": "Hier darf man nicht rauchen."
      },
      {
        "id": "l11-q6",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (wollen): „Wir ______ im Sommer nach Deutschland fliegen.“",
        "promptRu": "Вставьте форму глагола wollen (хотеть / планировать) для «wir»:",
        "options": [
          "wollt",
          "will",
          "wollen",
          "wolle"
        ],
        "correctAnswer": "wollen",
        "explanationDe": "Wollen mit wir: wir wollen.",
        "explanationRu": "Форма глагола wollen для wir — «wir wollen».",
        "audioHintText": "Wir wollen im Sommer nach Deutschland fliegen."
      },
      {
        "id": "l11-q7",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (sollen): „Der Arzt sagt, ich ______ viel Tee trinken.“ (Ratschlag)",
        "promptRu": "Вставьте форму глагола sollen (следовать совету/поручению) для «ich»:",
        "options": [
          "soll",
          "solle",
          "sollst",
          "sollt"
        ],
        "correctAnswer": "soll",
        "explanationDe": "Sollen für ich: ich soll.",
        "explanationRu": "Форма глагола sollen для ich — «ich soll» (мне следует).",
        "audioHintText": "Der Arzt sagt, ich soll viel Tee trinken."
      },
      {
        "id": "l11-q8",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie (möchten): „Was ______ Sie trinken, Herr Müller?“",
        "promptRu": "Вставьте вежливую форму глагола möchten (хотели бы) для «Sie»:",
        "options": [
          "möchte",
          "möchtet",
          "möchten",
          "mag"
        ],
        "correctAnswer": "möchten",
        "explanationDe": "Möchten mit Sie: möchten Sie.",
        "explanationRu": "Вежливая форма: «Was möchten Sie trinken?» (Что бы Вы хотели выпить?).",
        "audioHintText": "Was möchten Sie trinken, Herr Müller?"
      },
      {
        "id": "l11-q9",
        "type": "single-choice",
        "promptDe": "Welcher Satz drückt eine Fähigkeit aus?",
        "promptRu": "Какое предложение выражает физическое умение или навык?",
        "options": [
          "Er muss seine Hausaufgaben machen.",
          "Er kann sehr schnell tippen.",
          "Er darf ins Kino gehen.",
          "Er soll zum Arzt gehen."
        ],
        "correctAnswer": "Er kann sehr schnell tippen.",
        "explanationDe": "„Können“ drückt eine Fähigkeit, Möglichkeit oder ein Talent aus.",
        "explanationRu": "Модальный глагол «können» обозначает способность, умение или возможность.",
        "audioHintText": "Er kann sehr schnell tippen."
      },
      {
        "id": "l11-q10",
        "type": "fill-gap",
        "promptDe": "Ergänzen Sie: „Er ______ heute nicht kommen, weil er krank ist.“ (können)",
        "promptRu": "Вставьте форму глагола können для «er»:",
        "options": [
          "kannst",
          "könnt",
          "kann",
          "könnte"
        ],
        "correctAnswer": "kann",
        "explanationDe": "Können bei er: er kann.",
        "explanationRu": "Форма können для er — «er kann».",
        "audioHintText": "Er kann heute nicht kommen."
      },
      {
        "id": "l11-q11",
        "type": "single-choice",
        "promptDe": "Welcher Satz hat die richtige Reihenfolge der Wörter?",
        "promptRu": "В каком предложении правильно расставлен порядок слов с модальным глаголом?",
        "options": [
          "Morgen will ich besuchen meine Oma.",
          "Morgen will ich meine Oma besuchen.",
          "Morgen ich will meine Oma besuchen.",
          "Ich will morgen besuchen meine Oma."
        ],
        "correctAnswer": "Morgen will ich meine Oma besuchen.",
        "explanationDe": "Morgen (1) + will (2) + ich (3) + meine Oma + besuchen (Infinitiv am Ende).",
        "explanationRu": "Morgen (1) + will (модальный на 2 месте) + ich (подлежащее) + дополнение + besuchen (инфинитив в конце).",
        "audioHintText": "Morgen will ich meine Oma besuchen."
      }
    ]
  },
  {
    "id": "lesson-12",
    "number": 12,
    "titleDe": "Abschlussprüfung A1.1",
    "titleRu": "Итоговый экзамен: Модуль A1.1",
    "description": "Комплексный экзаменационный тест по всем 11 грамматическим темам уровня A1.1. Проверьте твердость базовых знаний немецкого языка.",
    "difficulty": "A1.1",
    "estimatedMinutes": 25,
    "questionsCount": 14,
    "totalLearners": 920,
    "passThreshold": 75,
    "tags": [
      "Экзамен",
      "A1.1",
      "Abschlussprüfung",
      "Комплексный"
    ],
    "isComingSoon": false,
    "questions": [
      {
        "id": "l12-q1",
        "type": "fill-gap",
        "promptDe": "„Wir ______ seit zwei Jahren in Wien.“ (wohnen)",
        "promptRu": "Вставьте форму глагола wohnen для «wir»:",
        "options": [
          "wohne",
          "wohnen",
          "wohnt",
          "wohnst"
        ],
        "correctAnswer": "wohnen",
        "explanationDe": "Mit „wir“: wir wohnen.",
        "explanationRu": "С местоимением wir окончание -en: «wir wohnen».",
        "audioHintText": "Wir wohnen seit zwei Jahren in Wien."
      },
      {
        "id": "l12-q2",
        "type": "fill-gap",
        "promptDe": "„______ du am Wochenende nach Berlin?“ (fahren)",
        "promptRu": "Вставьте форму сильного глагола fahren (a → ä) для «du»:",
        "options": [
          "Fährst",
          "Fahrst",
          "Fahrt",
          "Fahre"
        ],
        "correctAnswer": "Fährst",
        "explanationDe": "Fahren: du fährst.",
        "explanationRu": "Сильный глагол fahren с du принимает форму «fährst».",
        "audioHintText": "Fährst du am Wochenende nach Berlin?"
      },
      {
        "id": "l12-q3",
        "type": "fill-gap",
        "promptDe": "„Er ______ sehr leise und undeutlich.“ (sprechen)",
        "promptRu": "Вставьте форму глагола sprechen (e → i) для «er»:",
        "options": [
          "sprichst",
          "spricht",
          "sprecht",
          "spreche"
        ],
        "correctAnswer": "spricht",
        "explanationDe": "Sprechen: er spricht.",
        "explanationRu": "Глагол sprechen в 3 лице: «er spricht».",
        "audioHintText": "Er spricht sehr leise."
      },
      {
        "id": "l12-q4",
        "type": "fill-gap",
        "promptDe": "„Ich brauche ______ neuen Laptop.“ (der Laptop, maskulin)",
        "promptRu": "Вставьте неопределенный артикль мужского рода в Akkusativ:",
        "options": [
          "ein",
          "eine",
          "einen",
          "einem"
        ],
        "correctAnswer": "einen",
        "explanationDe": "Maskulin Akkusativ: einen Laptop.",
        "explanationRu": "Мужской род в винительном падеже: «einen Laptop».",
        "audioHintText": "Ich brauche einen neuen Laptop."
      },
      {
        "id": "l12-q5",
        "type": "single-choice",
        "promptDe": "Welcher Satz ist grammatisch absolut korrekt?",
        "promptRu": "В каком предложении соблюден правильный порядок слов немецкого предложения?",
        "options": [
          "Gestern hat Markus seine Prüfungen bestanden.",
          "Markus gestern hat seine Prüfungen bestanden.",
          "Gestern Markus hat seine Prüfungen bestanden.",
          "Gestern seine Prüfungen hat Markus bestanden."
        ],
        "correctAnswer": "Gestern hat Markus seine Prüfungen bestanden.",
        "explanationDe": "Gestern (Pos 1) + hat (Pos 2 Verb) + Markus (Pos 3 Subjekt)...",
        "explanationRu": "Обстоятельство на 1 месте → глагол на 2 месте → подлежащее на 3 месте.",
        "audioHintText": "Gestern hat Markus seine Prüfungen bestanden."
      },
      {
        "id": "l12-q6",
        "type": "fill-gap",
        "promptDe": "„______ hast du gestern getroffen?“ — „Meinen Freund Alex.“",
        "promptRu": "Какое вопросительное слово в Akkusativ (Кого?) подходит:",
        "options": [
          "Wer",
          "Wem",
          "Wen",
          "Was"
        ],
        "correctAnswer": "Wen",
        "explanationDe": "Wen fragt nach Personen im Akkusativ (кого?).",
        "explanationRu": "«Wen» означает «Кого?» (винительный падеж).",
        "audioHintText": "Wen hast du gestern getroffen?"
      },
      {
        "id": "l12-q7",
        "type": "fill-gap",
        "promptDe": "„Wir haben leider ______ Milch mehr im Kühlschrank.“ (die Milch)",
        "promptRu": "Вставьте правильное отрицание существительного Milch (женский род):",
        "options": [
          "keine",
          "kein",
          "nicht",
          "keinen"
        ],
        "correctAnswer": "keine",
        "explanationDe": "Die Milch ist feminin: keine Milch.",
        "explanationRu": "Слово Milch женского рода, отрицание — «keine Milch».",
        "audioHintText": "Wir haben leider keine Milch mehr."
      },
      {
        "id": "l12-q8",
        "type": "fill-gap",
        "promptDe": "„Er besucht heute ______ Eltern.“ (Plural von er)",
        "promptRu": "Вставьте притяжательное местоимение от «er» во множественном числе (seine):",
        "options": [
          "seinen",
          "sein",
          "seine",
          "ihre"
        ],
        "correctAnswer": "seine",
        "explanationDe": "Plural für er: seine Eltern.",
        "explanationRu": "Множественное число от er — «seine Eltern».",
        "audioHintText": "Er besucht heute seine Eltern."
      },
      {
        "id": "l12-q9",
        "type": "single-choice",
        "promptDe": "Wie lautet die höfliche Bitte an Herrn Braun?",
        "promptRu": "Как вежливо попросить господина Брауна подписать документ (unterschreiben)?",
        "options": [
          "Unterschreibt Sie bitte hier!",
          "Unterschreiben Sie bitte hier!",
          "Unterschreibe Sie bitte hier!",
          "Sie unterschreiben bitte hier!"
        ],
        "correctAnswer": "Unterschreiben Sie bitte hier!",
        "explanationDe": "Höflicher Imperativ: Infinitiv + Sie: Unterschreiben Sie bitte!",
        "explanationRu": "Вежливый императив: «Unterschreiben Sie bitte hier!».",
        "audioHintText": "Unterschreiben Sie bitte hier!"
      },
      {
        "id": "l12-q10",
        "type": "single-choice",
        "promptDe": "Wie lautet die Zahl „68“ auf Deutsch?",
        "promptRu": "Как пишется число 68?",
        "options": [
          "achtundsiebzig",
          "sechzigundacht",
          "achtundsechzig",
          "sechsundachtzig"
        ],
        "correctAnswer": "achtundsechzig",
        "explanationDe": "68 = achtundsechzig.",
        "explanationRu": "Число 68 = «achtundsechzig».",
        "audioHintText": "achtundsechzig"
      },
      {
        "id": "l12-q11",
        "type": "fill-gap",
        "promptDe": "„Ich helfe ______ alten Dame über die Straße.“ (die Dame, feminin)",
        "promptRu": "Вставьте артикль женского рода в Dativ с глаголом helfen:",
        "options": [
          "der",
          "die",
          "dem",
          "den"
        ],
        "correctAnswer": "der",
        "explanationDe": "Helfen + Dativ. Feminin Dativ: der alten Dame.",
        "explanationRu": "Женский род в Dativ: die → «der alten Dame».",
        "audioHintText": "Ich helfe der alten Dame über die Straße."
      },
      {
        "id": "l12-q12",
        "type": "fill-gap",
        "promptDe": "„Die Lehrerin erklärt ______ Schülern die Grammatik.“ (die Schüler, Plural)",
        "promptRu": "Вставьте артикль во множественном числе Dativ:",
        "options": [
          "der",
          "den",
          "dem",
          "die"
        ],
        "correctAnswer": "den",
        "explanationDe": "Dativ Plural: den Schülern.",
        "explanationRu": "Множественное число в Dativ имеет артикль «den»: «den Schülern».",
        "audioHintText": "Die Lehrerin erklärt den Schülern die Grammatik."
      },
      {
        "id": "l12-q13",
        "type": "fill-gap",
        "promptDe": "„Sie ______ fließend Spanisch und Deutsch sprechen.“ (können)",
        "promptRu": "Вставьте форму глагола können для местоимения «sie» (она):",
        "options": [
          "kann",
          "können",
          "kannst",
          "könnt"
        ],
        "correctAnswer": "kann",
        "explanationDe": "Können bei sie (Singular): sie kann.",
        "explanationRu": "С местоимением sie (она) модальный глагол имеет форму «kann».",
        "audioHintText": "Sie kann fließend Spanisch sprechen."
      },
      {
        "id": "l12-q14",
        "type": "single-choice",
        "promptDe": "Welcher Satz ist fehlerfrei gebaut?",
        "promptRu": "В каком предложении правильно построена рамочная конструкция с модальным глаголом?",
        "options": [
          "Morgen wir müssen früh um 6 Uhr aufstehen.",
          "Wir müssen morgen früh um 6 Uhr aufstehen.",
          "Wir müssen aufstehen morgen früh um 6 Uhr.",
          "Wir wollen aufstehen morgen früh."
        ],
        "correctAnswer": "Wir müssen morgen früh um 6 Uhr aufstehen.",
        "explanationDe": "Modalverb (müssen) auf Position 2, Infinitiv (aufstehen) am Satzende.",
        "explanationRu": "Модальный глагол на 2-й позиции, инфинитив aufstehen — в самом конце.",
        "audioHintText": "Wir müssen morgen früh um 6 Uhr aufstehen."
      }
    ]
  }
];
