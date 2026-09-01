import { WortschatzData } from '../types';

export const WORTSCHATZ_DATA: WortschatzData = {
  "meta": {
    "course": "DELFI Training — Deutsch A1 Wortschatz",
    "description": "Полный словарь A1 по темам (11 секций), извлечённый из Woerterbuch A1. Каждая секция содержит список слов (нем.–рус.) и тест из 15 вопросов с 4 вариантами ответа (направления DE→RU и RU→DE чередуются).",
    "total_sections": 11,
    "total_words": 550
  },
  "sections": [
    {
      "section_id": 1,
      "title_de": "Vorstellung",
      "title_ru": "Знакомство",
      "word_count": 50,
      "vocabulary": [
        { "de": "der Name", "ru": "имя" },
        { "de": "der Vorname", "ru": "имя" },
        { "de": "der Nachname", "ru": "фамилия" },
        { "de": "das Alter", "ru": "возраст" },
        { "de": "die Adresse", "ru": "адрес" },
        { "de": "die Telefonnummer", "ru": "номер телефона" },
        { "de": "die E-Mail", "ru": "электронная почта" },
        { "de": "das Land", "ru": "страна" },
        { "de": "die Stadt", "ru": "город" },
        { "de": "die Sprache", "ru": "язык" },
        { "de": "der Beruf", "ru": "профессия" },
        { "de": "der Student", "ru": "студент" },
        { "de": "die Studentin", "ru": "студентка" },
        { "de": "die Familie", "ru": "семья" },
        { "de": "der Vater", "ru": "отец" },
        { "de": "die Mutter", "ru": "мать" },
        { "de": "der Bruder", "ru": "брат" },
        { "de": "die Schwester", "ru": "сестра" },
        { "de": "der Freund", "ru": "друг" },
        { "de": "die Freundin", "ru": "подруга" },
        { "de": "heißen", "ru": "зваться" },
        { "de": "sein", "ru": "быть" },
        { "de": "kommen", "ru": "приезжать, быть родом" },
        { "de": "wohnen", "ru": "жить" },
        { "de": "sprechen", "ru": "говорить" },
        { "de": "lernen", "ru": "учить, изучать" },
        { "de": "studieren", "ru": "учиться в университете" },
        { "de": "arbeiten", "ru": "работать" },
        { "de": "leben", "ru": "жить" },
        { "de": "buchstabieren", "ru": "произносить по буквам" },
        { "de": "jung", "ru": "молодой" },
        { "de": "alt", "ru": "старый, пожилой" },
        { "de": "groß", "ru": "большой, высокий" },
        { "de": "klein", "ru": "маленький" },
        { "de": "nett", "ru": "милый, приятный" },
        { "de": "freundlich", "ru": "дружелюбный" },
        { "de": "verheiratet", "ru": "женат / замужем" },
        { "de": "ledig", "ru": "неженат / незамужем" },
        { "de": "gut", "ru": "хороший" },
        { "de": "neu", "ru": "новый" },
        { "de": "ich", "ru": "я" },
        { "de": "du", "ru": "ты" },
        { "de": "Sie", "ru": "Вы" },
        { "de": "wir", "ru": "мы" },
        { "de": "wer", "ru": "кто" },
        { "de": "wie", "ru": "как" },
        { "de": "wo", "ru": "где" },
        { "de": "woher", "ru": "откуда" },
        { "de": "ja", "ru": "да" },
        { "de": "nein", "ru": "нет" }
      ],
      "quiz": [
        {
          "id": "L1Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"ich\"?",
          "options": ["семья", "большой, высокий", "отец", "я"],
          "correct_answer": "я"
        },
        {
          "id": "L1Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"страна\"?",
          "options": ["Sie", "wo", "das Land", "wie"],
          "correct_answer": "das Land"
        },
        {
          "id": "L1Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Vorname\"?",
          "options": ["имя", "имя", "друг", "хороший"],
          "correct_answer": "имя"
        },
        {
          "id": "L1Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"сестра\"?",
          "options": ["der Freund", "die Schwester", "die Sprache", "kommen"],
          "correct_answer": "die Schwester"
        },
        {
          "id": "L1Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Mutter\"?",
          "options": ["мать", "электронная почта", "номер телефона", "учить, изучать"],
          "correct_answer": "мать"
        },
        {
          "id": "L1Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"отец\"?",
          "options": ["woher", "jung", "der Nachname", "der Vater"],
          "correct_answer": "der Vater"
        },
        {
          "id": "L1Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Stadt\"?",
          "options": ["женат / замужем", "город", "ты", "подруга"],
          "correct_answer": "город"
        },
        {
          "id": "L1Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"электронная почта\"?",
          "options": ["die Adresse", "die E-Mail", "der Nachname", "wo"],
          "correct_answer": "die E-Mail"
        },
        {
          "id": "L1Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"nett\"?",
          "options": ["милый, приятный", "говорить", "отец", "электронная почта"],
          "correct_answer": "милый, приятный"
        },
        {
          "id": "L1Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"номер телефона\"?",
          "options": ["die Telefonnummer", "wohnen", "sprechen", "der Student"],
          "correct_answer": "die Telefonnummer"
        },
        {
          "id": "L1Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"ledig\"?",
          "options": ["как", "Вы", "кто", "неженат / незамужем"],
          "correct_answer": "неженат / незамужем"
        },
        {
          "id": "L1Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"работать\"?",
          "options": ["arbeiten", "woher", "die Mutter", "freundlich"],
          "correct_answer": "arbeiten"
        },
        {
          "id": "L1Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Nachname\"?",
          "options": ["фамилия", "как", "ты", "друг"],
          "correct_answer": "фамилия"
        },
        {
          "id": "L1Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"откуда\"?",
          "options": ["woher", "der Nachname", "das Alter", "der Vater"],
          "correct_answer": "woher"
        },
        {
          "id": "L1Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"nein\"?",
          "options": ["женат / замужем", "адрес", "нет", "семья"],
          "correct_answer": "нет"
        }
      ]
    },
    {
      "section_id": 2,
      "title_de": "Haus und Wohnung",
      "title_ru": "Дом и квартира",
      "word_count": 50,
      "vocabulary": [
        { "de": "das Haus", "ru": "дом" },
        { "de": "die Wohnung", "ru": "квартира" },
        { "de": "das Zimmer", "ru": "комната" },
        { "de": "das Wohnzimmer", "ru": "гостиная" },
        { "de": "das Schlafzimmer", "ru": "спальня" },
        { "de": "die Küche", "ru": "кухня" },
        { "de": "das Badezimmer", "ru": "ванная комната" },
        { "de": "der Balkon", "ru": "балкон" },
        { "de": "der Garten", "ru": "сад" },
        { "de": "der Keller", "ru": "подвал" },
        { "de": "die Tür", "ru": "дверь" },
        { "de": "das Fenster", "ru": "окно" },
        { "de": "die Wand", "ru": "стена" },
        { "de": "der Boden", "ru": "пол" },
        { "de": "die Treppe", "ru": "лестница" },
        { "de": "der Tisch", "ru": "стол" },
        { "de": "der Stuhl", "ru": "стул" },
        { "de": "das Bett", "ru": "кровать" },
        { "de": "der Schrank", "ru": "шкаф" },
        { "de": "das Sofa", "ru": "диван" },
        { "de": "der Fernseher", "ru": "телевизор" },
        { "de": "die Lampe", "ru": "лампа" },
        { "de": "der Spiegel", "ru": "зеркало" },
        { "de": "der Teppich", "ru": "ковёр" },
        { "de": "die Dusche", "ru": "душ" },
        { "de": "die Badewanne", "ru": "ванна" },
        { "de": "der Kühlschrank", "ru": "холодильник" },
        { "de": "der Herd", "ru": "плита" },
        { "de": "die Waschmaschine", "ru": "стиральная машина" },
        { "de": "das Geschirr", "ru": "посуда" },
        { "de": "wohnen", "ru": "жить, проживать" },
        { "de": "leben", "ru": "жить" },
        { "de": "mieten", "ru": "снимать (жильё)" },
        { "de": "suchen", "ru": "искать" },
        { "de": "finden", "ru": "находить" },
        { "de": "öffnen", "ru": "открывать" },
        { "de": "schließen", "ru": "закрывать" },
        { "de": "putzen", "ru": "убирать, чистить" },
        { "de": "waschen", "ru": "стирать" },
        { "de": "aufräumen", "ru": "убирать, приводить в порядок" },
        { "de": "groß", "ru": "большой" },
        { "de": "klein", "ru": "маленький" },
        { "de": "schön", "ru": "красивый" },
        { "de": "gemütlich", "ru": "уютный" },
        { "de": "hell", "ru": "светлый" },
        { "de": "dunkel", "ru": "тёмный" },
        { "de": "sauber", "ru": "чистый" },
        { "de": "schmutzig", "ru": "грязный" },
        { "de": "neu", "ru": "новый" },
        { "de": "alt", "ru": "старый" }
      ],
      "quiz": [
        {
          "id": "L2Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Badewanne\"?",
          "options": ["лестница", "сад", "ванна", "искать"],
          "correct_answer": "ванна"
        },
        {
          "id": "L2Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"маленький\"?",
          "options": ["klein", "groß", "der Keller", "der Balkon"],
          "correct_answer": "klein"
        },
        {
          "id": "L2Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Geschirr\"?",
          "options": ["посуда", "убирать, приводить в порядок", "спальня", "душ"],
          "correct_answer": "посуда"
        },
        {
          "id": "L2Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"подвал\"?",
          "options": ["finden", "schließen", "das Bett", "der Keller"],
          "correct_answer": "der Keller"
        },
        {
          "id": "L2Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Stuhl\"?",
          "options": ["стул", "светлый", "старый", "открывать"],
          "correct_answer": "стул"
        },
        {
          "id": "L2Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"сад\"?",
          "options": ["das Sofa", "der Garten", "die Waschmaschine", "der Balkon"],
          "correct_answer": "der Garten"
        },
        {
          "id": "L2Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Tisch\"?",
          "options": ["искать", "стол", "кровать", "грязный"],
          "correct_answer": "стол"
        },
        {
          "id": "L2Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"открывать\"?",
          "options": ["das Sofa", "mieten", "öffnen", "klein"],
          "correct_answer": "öffnen"
        },
        {
          "id": "L2Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"finden\"?",
          "options": ["открывать", "старый", "дверь", "находить"],
          "correct_answer": "находить"
        },
        {
          "id": "L2Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"тёмный\"?",
          "options": ["der Balkon", "dunkel", "leben", "die Wohnung"],
          "correct_answer": "dunkel"
        },
        {
          "id": "L2Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"putzen\"?",
          "options": ["стол", "гостиная", "закрывать", "убирать, чистить"],
          "correct_answer": "убирать, чистить"
        },
        {
          "id": "L2Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"плита\"?",
          "options": ["alt", "öffnen", "der Herd", "das Schlafzimmer"],
          "correct_answer": "der Herd"
        },
        {
          "id": "L2Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"aufräumen\"?",
          "options": ["открывать", "дверь", "убирать, приводить в порядок", "стул"],
          "correct_answer": "убирать, приводить в порядок"
        },
        {
          "id": "L2Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"старый\"?",
          "options": ["alt", "die Badewanne", "dunkel", "das Sofa"],
          "correct_answer": "alt"
        },
        {
          "id": "L2Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Teppich\"?",
          "options": ["стол", "лестница", "балкон", "ковёр"],
          "correct_answer": "ковёр"
        }
      ]
    },
    {
      "section_id": 3,
      "title_de": "Essen und Getränke",
      "title_ru": "Еда и напитки",
      "word_count": 50,
      "vocabulary": [
        { "de": "das Essen", "ru": "еда" },
        { "de": "das Getränk", "ru": "напиток" },
        { "de": "das Frühstück", "ru": "завтрак" },
        { "de": "das Mittagessen", "ru": "обед" },
        { "de": "das Abendessen", "ru": "ужин" },
        { "de": "das Brot", "ru": "хлеб" },
        { "de": "das Brötchen", "ru": "булочка" },
        { "de": "die Butter", "ru": "масло" },
        { "de": "der Käse", "ru": "сыр" },
        { "de": "das Ei", "ru": "яйцо" },
        { "de": "die Milch", "ru": "молоко" },
        { "de": "der Joghurt", "ru": "йогурт" },
        { "de": "der Reis", "ru": "рис" },
        { "de": "die Nudel", "ru": "макароны, лапша" },
        { "de": "die Kartoffel", "ru": "картофель" },
        { "de": "die Suppe", "ru": "суп" },
        { "de": "das Fleisch", "ru": "мясо" },
        { "de": "der Fisch", "ru": "рыба" },
        { "de": "das Gemüse", "ru": "овощи" },
        { "de": "das Obst", "ru": "фрукты" },
        { "de": "der Apfel", "ru": "яблоко" },
        { "de": "die Banane", "ru": "банан" },
        { "de": "die Tomate", "ru": "помидор" },
        { "de": "der Salat", "ru": "салат" },
        { "de": "der Kuchen", "ru": "пирог, торт" },
        { "de": "die Schokolade", "ru": "шоколад" },
        { "de": "der Kaffee", "ru": "кофе" },
        { "de": "der Tee", "ru": "чай" },
        { "de": "das Wasser", "ru": "вода" },
        { "de": "der Saft", "ru": "сок" },
        { "de": "essen", "ru": "есть" },
        { "de": "trinken", "ru": "пить" },
        { "de": "kochen", "ru": "готовить" },
        { "de": "backen", "ru": "печь" },
        { "de": "kaufen", "ru": "покупать" },
        { "de": "bestellen", "ru": "заказывать" },
        { "de": "bezahlen", "ru": "платить" },
        { "de": "schneiden", "ru": "резать" },
        { "de": "machen", "ru": "делать, готовить" },
        { "de": "schmecken", "ru": "быть вкусным, иметь вкус" },
        { "de": "mögen", "ru": "любить, нравиться" },
        { "de": "probieren", "ru": "пробовать" },
        { "de": "lecker", "ru": "вкусный" },
        { "de": "leckerer", "ru": "более вкусный" },
        { "de": "süß", "ru": "сладкий" },
        { "de": "salzig", "ru": "солёный" },
        { "de": "frisch", "ru": "свежий" },
        { "de": "warm", "ru": "тёплый, горячий" },
        { "de": "kalt", "ru": "холодный" },
        { "de": "hungrig", "ru": "голодный" }
      ],
      "quiz": [
        {
          "id": "L3Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"schneiden\"?",
          "options": ["суп", "рыба", "резать", "более вкусный"],
          "correct_answer": "резать"
        },
        {
          "id": "L3Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"заказывать\"?",
          "options": ["bestellen", "schneiden", "essen", "warm"],
          "correct_answer": "bestellen"
        },
        {
          "id": "L3Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Kartoffel\"?",
          "options": ["картофель", "булочка", "рис", "более вкусный"],
          "correct_answer": "картофель"
        },
        {
          "id": "L3Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"голодный\"?",
          "options": ["der Kaffee", "frisch", "der Saft", "hungrig"],
          "correct_answer": "hungrig"
        },
        {
          "id": "L3Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"warm\"?",
          "options": ["обед", "свежий", "тёплый, горячий", "шоколад"],
          "correct_answer": "тёплый, горячий"
        },
        {
          "id": "L3Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"еда\"?",
          "options": ["bestellen", "das Essen", "der Saft", "die Nudel"],
          "correct_answer": "das Essen"
        },
        {
          "id": "L3Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Abendessen\"?",
          "options": ["есть", "мясо", "овощи", "ужин"],
          "correct_answer": "ужин"
        },
        {
          "id": "L3Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"любить, нравиться\"?",
          "options": ["das Mittagessen", "lecker", "kaufen", "mögen"],
          "correct_answer": "mögen"
        },
        {
          "id": "L3Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Mittagessen\"?",
          "options": ["чай", "йогурт", "обед", "готовить"],
          "correct_answer": "обед"
        },
        {
          "id": "L3Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"солёный\"?",
          "options": ["der Kuchen", "die Milch", "das Mittagessen", "salzig"],
          "correct_answer": "salzig"
        },
        {
          "id": "L3Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"leckerer\"?",
          "options": ["сок", "овощи", "более вкусный", "чай"],
          "correct_answer": "более вкусный"
        },
        {
          "id": "L3Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"завтрак\"?",
          "options": ["das Abendessen", "das Obst", "die Kartoffel", "das Frühstück"],
          "correct_answer": "das Frühstück"
        },
        {
          "id": "L3Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Banane\"?",
          "options": ["пить", "делать, готовить", "банан", "обед"],
          "correct_answer": "банан"
        },
        {
          "id": "L3Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"быть вкусным, иметь вкус\"?",
          "options": ["der Joghurt", "machen", "das Abendessen", "schmecken"],
          "correct_answer": "schmecken"
        },
        {
          "id": "L3Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"kochen\"?",
          "options": ["резать", "готовить", "масло", "шоколад"],
          "correct_answer": "готовить"
        }
      ]
    },
    {
      "section_id": 4,
      "title_de": "Familie und Freunde",
      "title_ru": "Семья и друзья",
      "word_count": 50,
      "vocabulary": [
        { "de": "die Familie", "ru": "семья" },
        { "de": "die Mutter", "ru": "мама" },
        { "de": "der Vater", "ru": "папа" },
        { "de": "die Eltern", "ru": "родители" },
        { "de": "die Schwester", "ru": "сестра" },
        { "de": "der Bruder", "ru": "брат" },
        { "de": "die Großmutter", "ru": "бабушка" },
        { "de": "der Großvater", "ru": "дедушка" },
        { "de": "die Oma", "ru": "бабушка" },
        { "de": "der Opa", "ru": "дедушка" },
        { "de": "die Tante", "ru": "тётя" },
        { "de": "der Onkel", "ru": "дядя" },
        { "de": "die Cousine", "ru": "двоюродная сестра" },
        { "de": "der Cousin", "ru": "двоюродный брат" },
        { "de": "das Kind", "ru": "ребёнок" },
        { "de": "der Sohn", "ru": "сын" },
        { "de": "die Tochter", "ru": "дочь" },
        { "de": "der Freund", "ru": "друг" },
        { "de": "die Freundin", "ru": "подруга" },
        { "de": "der Nachbar", "ru": "сосед" },
        { "de": "die Nachbarin", "ru": "соседка" },
        { "de": "die Hochzeit", "ru": "свадьба" },
        { "de": "das Baby", "ru": "малыш" },
        { "de": "der Name", "ru": "имя" },
        { "de": "das Alter", "ru": "возраст" },
        { "de": "die Arbeit", "ru": "работа" },
        { "de": "der Beruf", "ru": "профессия" },
        { "de": "das Haus", "ru": "дом" },
        { "de": "die Wohnung", "ru": "квартира" },
        { "de": "das Haustier", "ru": "домашнее животное" },
        { "de": "haben", "ru": "иметь" },
        { "de": "wohnen", "ru": "жить" },
        { "de": "heißen", "ru": "называться" },
        { "de": "kommen", "ru": "приезжать, происходить" },
        { "de": "leben", "ru": "жить" },
        { "de": "besuchen", "ru": "навещать" },
        { "de": "helfen", "ru": "помогать" },
        { "de": "spielen", "ru": "играть" },
        { "de": "sprechen", "ru": "разговаривать" },
        { "de": "feiern", "ru": "праздновать" },
        { "de": "nett", "ru": "милый" },
        { "de": "freundlich", "ru": "дружелюбный" },
        { "de": "jung", "ru": "молодой" },
        { "de": "alt", "ru": "старый, пожилой" },
        { "de": "groß", "ru": "высокий, большой" },
        { "de": "klein", "ru": "маленький" },
        { "de": "lustig", "ru": "весёлый" },
        { "de": "ruhig", "ru": "спокойный" },
        { "de": "glücklich", "ru": "счастливый" },
        { "de": "verheiratet", "ru": "женат, замужем" }
      ],
      "quiz": [
        {
          "id": "L4Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"feiern\"?",
          "options": ["молодой", "праздновать", "старый, пожилой", "сосед"],
          "correct_answer": "праздновать"
        },
        {
          "id": "L4Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"брат\"?",
          "options": ["die Familie", "haben", "nett", "der Bruder"],
          "correct_answer": "der Bruder"
        },
        {
          "id": "L4Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Beruf\"?",
          "options": ["приезжать, происходить", "бабушка", "профессия", "дочь"],
          "correct_answer": "профессия"
        },
        {
          "id": "L4Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"молодой\"?",
          "options": ["jung", "der Name", "die Freundin", "die Tante"],
          "correct_answer": "jung"
        },
        {
          "id": "L4Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"spielen\"?",
          "options": ["приезжать, происходить", "милый", "молодой", "играть"],
          "correct_answer": "играть"
        },
        {
          "id": "L4Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"помогать\"?",
          "options": ["alt", "die Oma", "helfen", "die Großmutter"],
          "correct_answer": "helfen"
        },
        {
          "id": "L4Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"kommen\"?",
          "options": ["дедушка", "приезжать, происходить", "счастливый", "помогать"],
          "correct_answer": "приезжать, происходить"
        },
        {
          "id": "L4Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"соседка\"?",
          "options": ["die Nachbarin", "lustig", "der Cousin", "das Baby"],
          "correct_answer": "die Nachbarin"
        },
        {
          "id": "L4Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Tochter\"?",
          "options": ["родители", "дочь", "друг", "брат"],
          "correct_answer": "дочь"
        },
        {
          "id": "L4Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"двоюродный брат\"?",
          "options": ["die Oma", "die Familie", "der Cousin", "das Baby"],
          "correct_answer": "der Cousin"
        },
        {
          "id": "L4Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"lustig\"?",
          "options": ["навещать", "маленький", "дом", "весёлый"],
          "correct_answer": "весёлый"
        },
        {
          "id": "L4Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"сын\"?",
          "options": ["der Opa", "besuchen", "klein", "der Sohn"],
          "correct_answer": "der Sohn"
        },
        {
          "id": "L4Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"freundlich\"?",
          "options": ["папа", "дружелюбный", "дом", "бабушка"],
          "correct_answer": "дружелюбный"
        },
        {
          "id": "L4Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"работа\"?",
          "options": ["groß", "die Arbeit", "der Cousin", "das Baby"],
          "correct_answer": "die Arbeit"
        },
        {
          "id": "L4Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Oma\"?",
          "options": ["дом", "помогать", "бабушка", "имя"],
          "correct_answer": "бабушка"
        }
      ]
    },
    {
      "section_id": 5,
      "title_de": "Im Sprachkurs",
      "title_ru": "На языковых курсах",
      "word_count": 50,
      "vocabulary": [
        { "de": "der Sprachkurs", "ru": "языковой курс" },
        { "de": "die Sprache", "ru": "язык" },
        { "de": "der Lehrer", "ru": "учитель" },
        { "de": "die Lehrerin", "ru": "учительница" },
        { "de": "der Schüler", "ru": "ученик" },
        { "de": "die Schülerin", "ru": "ученица" },
        { "de": "der Kurs", "ru": "курс" },
        { "de": "die Klasse", "ru": "класс, группа" },
        { "de": "das Buch", "ru": "книга" },
        { "de": "das Heft", "ru": "тетрадь" },
        { "de": "der Stift", "ru": "ручка, карандаш" },
        { "de": "der Bleistift", "ru": "карандаш" },
        { "de": "der Kugelschreiber", "ru": "шариковая ручка" },
        { "de": "das Wörterbuch", "ru": "словарь" },
        { "de": "das Wort", "ru": "слово" },
        { "de": "der Satz", "ru": "предложение" },
        { "de": "die Übung", "ru": "упражнение" },
        { "de": "die Aufgabe", "ru": "задание" },
        { "de": "der Test", "ru": "тест" },
        { "de": "die Prüfung", "ru": "экзамен" },
        { "de": "die Frage", "ru": "вопрос" },
        { "de": "die Antwort", "ru": "ответ" },
        { "de": "der Dialog", "ru": "диалог" },
        { "de": "der Fehler", "ru": "ошибка" },
        { "de": "das Beispiel", "ru": "пример" },
        { "de": "lernen", "ru": "учить, изучать" },
        { "de": "sprechen", "ru": "говорить" },
        { "de": "lesen", "ru": "читать" },
        { "de": "schreiben", "ru": "писать" },
        { "de": "hören", "ru": "слушать" },
        { "de": "verstehen", "ru": "понимать" },
        { "de": "wiederholen", "ru": "повторять" },
        { "de": "fragen", "ru": "спрашивать" },
        { "de": "antworten", "ru": "отвечать" },
        { "de": "üben", "ru": "тренироваться" },
        { "de": "erklären", "ru": "объяснять" },
        { "de": "buchstabieren", "ru": "произносить по буквам" },
        { "de": "übersetzen", "ru": "переводить" },
        { "de": "beginnen", "ru": "начинать" },
        { "de": "beenden", "ru": "заканчивать" },
        { "de": "einfach", "ru": "простой" },
        { "de": "schwierig", "ru": "трудный" },
        { "de": "interessant", "ru": "интересный" },
        { "de": "wichtig", "ru": "важный" },
        { "de": "neu", "ru": "новый" },
        { "de": "richtig", "ru": "правильный" },
        { "de": "falsch", "ru": "неправильный" },
        { "de": "laut", "ru": "громкий" },
        { "de": "leise", "ru": "тихий" },
        { "de": "fleißig", "ru": "прилежный" }
      ],
      "quiz": [
        {
          "id": "L5Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Bleistift\"?",
          "options": ["словарь", "ошибка", "карандаш", "понимать"],
          "correct_answer": "карандаш"
        },
        {
          "id": "L5Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"говорить\"?",
          "options": ["sprechen", "wichtig", "die Sprache", "der Kugelschreiber"],
          "correct_answer": "sprechen"
        },
        {
          "id": "L5Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Sprache\"?",
          "options": ["язык", "ученица", "тест", "ошибка"],
          "correct_answer": "язык"
        },
        {
          "id": "L5Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"прилежный\"?",
          "options": ["fleißig", "die Übung", "die Klasse", "die Sprache"],
          "correct_answer": "fleißig"
        },
        {
          "id": "L5Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Antwort\"?",
          "options": ["ответ", "курс", "учитель", "заканчивать"],
          "correct_answer": "ответ"
        },
        {
          "id": "L5Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"тихий\"?",
          "options": ["beginnen", "fragen", "lesen", "leise"],
          "correct_answer": "leise"
        },
        {
          "id": "L5Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"interessant\"?",
          "options": ["упражнение", "учитель", "интересный", "неправильный"],
          "correct_answer": "интересный"
        },
        {
          "id": "L5Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"предложение\"?",
          "options": ["der Satz", "das Beispiel", "der Schüler", "schreiben"],
          "correct_answer": "der Satz"
        },
        {
          "id": "L5Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Aufgabe\"?",
          "options": ["задание", "важный", "громкий", "класс, группа"],
          "correct_answer": "задание"
        },
        {
          "id": "L5Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"ручка, карандаш\"?",
          "options": ["der Stift", "wichtig", "lesen", "die Antwort"],
          "correct_answer": "der Stift"
        },
        {
          "id": "L5Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Kurs\"?",
          "options": ["курс", "произносить по буквам", "тетрадь", "словарь"],
          "correct_answer": "курс"
        },
        {
          "id": "L5Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"пример\"?",
          "options": ["der Bleistift", "das Beispiel", "neu", "leise"],
          "correct_answer": "das Beispiel"
        },
        {
          "id": "L5Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Lehrer\"?",
          "options": ["учитель", "вопрос", "экзамен", "слово"],
          "correct_answer": "учитель"
        },
        {
          "id": "L5Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"понимать\"?",
          "options": ["verstehen", "neu", "schreiben", "hören"],
          "correct_answer": "verstehen"
        },
        {
          "id": "L5Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Wort\"?",
          "options": ["важный", "ручка, карандаш", "тихий", "слово"],
          "correct_answer": "слово"
        }
      ]
    },
    {
      "section_id": 6,
      "title_de": "Meine Stadt",
      "title_ru": "Мой город",
      "word_count": 50,
      "vocabulary": [
        { "de": "die Stadt", "ru": "город" },
        { "de": "das Dorf", "ru": "деревня" },
        { "de": "die Hauptstadt", "ru": "столица" },
        { "de": "das Land", "ru": "страна" },
        { "de": "die Straße", "ru": "улица" },
        { "de": "der Platz", "ru": "площадь" },
        { "de": "der Park", "ru": "парк" },
        { "de": "das Geschäft", "ru": "магазин" },
        { "de": "der Supermarkt", "ru": "супермаркет" },
        { "de": "das Café", "ru": "кафе" },
        { "de": "das Restaurant", "ru": "ресторан" },
        { "de": "die Schule", "ru": "школа" },
        { "de": "die Universität", "ru": "университет" },
        { "de": "das Krankenhaus", "ru": "больница" },
        { "de": "die Apotheke", "ru": "аптека" },
        { "de": "die Bank", "ru": "банк" },
        { "de": "die Post", "ru": "почта" },
        { "de": "der Bahnhof", "ru": "вокзал" },
        { "de": "die Haltestelle", "ru": "остановка" },
        { "de": "das Zentrum", "ru": "центр" },
        { "de": "die Ampel", "ru": "светофор" },
        { "de": "der Weg", "ru": "дорога, путь" },
        { "de": "die Brücke", "ru": "мост" },
        { "de": "die Kreuzung", "ru": "перекрёсток" },
        { "de": "der Verkehr", "ru": "движение, транспорт" },
        { "de": "der Fußweg", "ru": "тротуар" },
        { "de": "die Ecke", "ru": "угол" },
        { "de": "sein", "ru": "быть" },
        { "de": "haben", "ru": "иметь" },
        { "de": "wohnen", "ru": "жить" },
        { "de": "liegen", "ru": "находиться" },
        { "de": "gehen", "ru": "идти" },
        { "de": "fahren", "ru": "ехать" },
        { "de": "besuchen", "ru": "посещать" },
        { "de": "kaufen", "ru": "покупать" },
        { "de": "machen", "ru": "делать" },
        { "de": "sehen", "ru": "видеть" },
        { "de": "finden", "ru": "находить" },
        { "de": "schön", "ru": "красивый" },
        { "de": "groß", "ru": "большой" },
        { "de": "klein", "ru": "маленький" },
        { "de": "alt", "ru": "старый" },
        { "de": "neu", "ru": "новый" },
        { "de": "modern", "ru": "современный" },
        { "de": "interessant", "ru": "интересный" },
        { "de": "ruhig", "ru": "спокойный" },
        { "de": "laut", "ru": "шумный" },
        { "de": "sauber", "ru": "чистый" },
        { "de": "nah", "ru": "близкий" },
        { "de": "weit", "ru": "далёкий" }
      ],
      "quiz": [
        {
          "id": "L6Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Platz\"?",
          "options": ["площадь", "находить", "старый", "больница"],
          "correct_answer": "площадь"
        },
        {
          "id": "L6Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"близкий\"?",
          "options": ["das Café", "die Bank", "alt", "nah"],
          "correct_answer": "nah"
        },
        {
          "id": "L6Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Bank\"?",
          "options": ["аптека", "школа", "банк", "спокойный"],
          "correct_answer": "банк"
        },
        {
          "id": "L6Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"современный\"?",
          "options": ["modern", "das Geschäft", "wohnen", "der Supermarkt"],
          "correct_answer": "modern"
        },
        {
          "id": "L6Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Zentrum\"?",
          "options": ["центр", "далёкий", "жить", "маленький"],
          "correct_answer": "центр"
        },
        {
          "id": "L6Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"аптека\"?",
          "options": ["nah", "die Apotheke", "das Restaurant", "gehen"],
          "correct_answer": "die Apotheke"
        },
        {
          "id": "L6Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Universität\"?",
          "options": ["старый", "университет", "остановка", "покупать"],
          "correct_answer": "университет"
        },
        {
          "id": "L6Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"кафе\"?",
          "options": ["die Straße", "die Haltestelle", "das Café", "wohnen"],
          "correct_answer": "das Café"
        },
        {
          "id": "L6Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Dorf\"?",
          "options": ["мост", "дорога, путь", "делать", "деревня"],
          "correct_answer": "деревня"
        },
        {
          "id": "L6Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"столица\"?",
          "options": ["ruhig", "die Hauptstadt", "der Fußweg", "die Bank"],
          "correct_answer": "die Hauptstadt"
        },
        {
          "id": "L6Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"sauber\"?",
          "options": ["угол", "чистый", "улица", "дорога, путь"],
          "correct_answer": "чистый"
        },
        {
          "id": "L6Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"находиться\"?",
          "options": ["der Verkehr", "das Krankenhaus", "die Ecke", "liegen"],
          "correct_answer": "liegen"
        },
        {
          "id": "L6Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Straße\"?",
          "options": ["улица", "перекрёсток", "идти", "город"],
          "correct_answer": "улица"
        },
        {
          "id": "L6Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"жить\"?",
          "options": ["nah", "wohnen", "groß", "machen"],
          "correct_answer": "wohnen"
        },
        {
          "id": "L6Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Ecke\"?",
          "options": ["ехать", "иметь", "вокзал", "угол"],
          "correct_answer": "угол"
        }
      ]
    },
    {
      "section_id": 7,
      "title_de": "Am Bahnhof",
      "title_ru": "На вокзале",
      "word_count": 50,
      "vocabulary": [
        { "de": "der Bahnsteig", "ru": "платформа" },
        { "de": "der Bahnhof", "ru": "вокзал" },
        { "de": "der Fahrgast", "ru": "пассажир" },
        { "de": "der Fahrplan", "ru": "расписание" },
        { "de": "der Platz", "ru": "место" },
        { "de": "der Schaffner", "ru": "проводник" },
        { "de": "der Schalter", "ru": "касса" },
        { "de": "der Schlafwagen", "ru": "спальный вагон" },
        { "de": "der Wagen", "ru": "вагон" },
        { "de": "der Zug", "ru": "поезд" },
        { "de": "der Reisende", "ru": "путешественник" },
        { "de": "der Koffer", "ru": "чемодан" },
        { "de": "der Rucksack", "ru": "рюкзак" },
        { "de": "der Sitzplatz", "ru": "место для сидения" },
        { "de": "der Ausgang", "ru": "выход" },
        { "de": "der Eingang", "ru": "вход" },
        { "de": "der Automat", "ru": "автомат" },
        { "de": "die Abfahrt", "ru": "отправление" },
        { "de": "die Ankunft", "ru": "прибытие" },
        { "de": "die Fahrkarte", "ru": "билет" },
        { "de": "die Fahrt", "ru": "поездка" },
        { "de": "die Station", "ru": "станция" },
        { "de": "die Verspätung", "ru": "опоздание" },
        { "de": "die Reise", "ru": "путешествие" },
        { "de": "die Information", "ru": "информация" },
        { "de": "die Anzeige", "ru": "табло" },
        { "de": "die Verbindung", "ru": "пересадка, сообщение" },
        { "de": "das Abteil", "ru": "купе" },
        { "de": "das Gleis", "ru": "железнодорожный путь" },
        { "de": "das Ticket", "ru": "билет" },
        { "de": "fahren", "ru": "ехать" },
        { "de": "abfahren", "ru": "отправляться" },
        { "de": "ankommen", "ru": "прибывать" },
        { "de": "warten", "ru": "ждать" },
        { "de": "einsteigen", "ru": "садиться в поезд" },
        { "de": "aussteigen", "ru": "выходить из поезда" },
        { "de": "reisen", "ru": "путешествовать" },
        { "de": "kaufen", "ru": "покупать" },
        { "de": "reservieren", "ru": "бронировать" },
        { "de": "bezahlen", "ru": "платить" },
        { "de": "suchen", "ru": "искать" },
        { "de": "finden", "ru": "находить" },
        { "de": "fragen", "ru": "спрашивать" },
        { "de": "zeigen", "ru": "показывать" },
        { "de": "umsteigen", "ru": "делать пересадку" },
        { "de": "pünktlich", "ru": "пунктуальный, вовремя" },
        { "de": "verspätet", "ru": "опоздавший, с опозданием" },
        { "de": "schnell", "ru": "быстрый, быстро" },
        { "de": "langsam", "ru": "медленный, медленно" },
        { "de": "bequem", "ru": "удобный, удобно" }
      ],
      "quiz": [
        {
          "id": "L7Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"fragen\"?",
          "options": ["находить", "купе", "спрашивать", "вагон"],
          "correct_answer": "спрашивать"
        },
        {
          "id": "L7Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"показывать\"?",
          "options": ["zeigen", "die Information", "die Fahrt", "der Automat"],
          "correct_answer": "zeigen"
        },
        {
          "id": "L7Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Anzeige\"?",
          "options": ["табло", "информация", "станция", "удобный, удобно"],
          "correct_answer": "табло"
        },
        {
          "id": "L7Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"опоздавший, с опозданием\"?",
          "options": ["fahren", "der Bahnhof", "der Schaffner", "verspätet"],
          "correct_answer": "verspätet"
        },
        {
          "id": "L7Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Reisende\"?",
          "options": ["спрашивать", "место", "пассажир", "путешественник"],
          "correct_answer": "путешественник"
        },
        {
          "id": "L7Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"билет\"?",
          "options": ["suchen", "der Zug", "das Ticket", "der Bahnhof"],
          "correct_answer": "das Ticket"
        },
        {
          "id": "L7Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Wagen\"?",
          "options": ["вагон", "спальный вагон", "покупать", "показывать"],
          "correct_answer": "вагон"
        },
        {
          "id": "L7Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"платить\"?",
          "options": ["der Reisende", "die Reise", "reservieren", "bezahlen"],
          "correct_answer": "bezahlen"
        },
        {
          "id": "L7Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"einsteigen\"?",
          "options": ["садиться в поезд", "касса", "вокзал", "бронировать"],
          "correct_answer": "садиться в поезд"
        },
        {
          "id": "L7Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"вокзал\"?",
          "options": ["die Verbindung", "der Sitzplatz", "verspätet", "der Bahnhof"],
          "correct_answer": "der Bahnhof"
        },
        {
          "id": "L7Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"schnell\"?",
          "options": ["касса", "билет", "делать пересадку", "быстрый, быстро"],
          "correct_answer": "быстрый, быстро"
        },
        {
          "id": "L7Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"покупать\"?",
          "options": ["das Abteil", "die Verspätung", "kaufen", "einsteigen"],
          "correct_answer": "kaufen"
        },
        {
          "id": "L7Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"reisen\"?",
          "options": ["отправляться", "пересадка, сообщение", "платформа", "путешествовать"],
          "correct_answer": "путешествовать"
        },
        {
          "id": "L7Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"искать\"?",
          "options": ["das Ticket", "suchen", "verspätet", "finden"],
          "correct_answer": "suchen"
        },
        {
          "id": "L7Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Schaffner\"?",
          "options": ["проводник", "быстрый, быстро", "спрашивать", "садиться в поезд"],
          "correct_answer": "проводник"
        }
      ]
    },
    {
      "section_id": 8,
      "title_de": "Mein Tag und Freizeit",
      "title_ru": "Мой день и свободное время",
      "word_count": 50,
      "vocabulary": [
        { "de": "der Morgen", "ru": "утро" },
        { "de": "der Tag", "ru": "день" },
        { "de": "der Abend", "ru": "вечер" },
        { "de": "die Nacht", "ru": "ночь" },
        { "de": "die Uhr", "ru": "часы" },
        { "de": "der Wecker", "ru": "будильник" },
        { "de": "das Frühstück", "ru": "завтрак" },
        { "de": "die Schule", "ru": "школа" },
        { "de": "die Arbeit", "ru": "работа" },
        { "de": "die Pause", "ru": "перерыв" },
        { "de": "das Hobby", "ru": "хобби" },
        { "de": "der Sport", "ru": "спорт" },
        { "de": "das Buch", "ru": "книга" },
        { "de": "der Film", "ru": "фильм" },
        { "de": "die Musik", "ru": "музыка" },
        { "de": "das Fahrrad", "ru": "велосипед" },
        { "de": "der Freund", "ru": "друг" },
        { "de": "die Freundin", "ru": "подруга" },
        { "de": "das Handy", "ru": "телефон" },
        { "de": "das Wochenende", "ru": "выходные" },
        { "de": "aufstehen", "ru": "вставать" },
        { "de": "frühstücken", "ru": "завтракать" },
        { "de": "arbeiten", "ru": "работать" },
        { "de": "lernen", "ru": "учиться" },
        { "de": "lesen", "ru": "читать" },
        { "de": "schreiben", "ru": "писать" },
        { "de": "hören", "ru": "слушать" },
        { "de": "sehen", "ru": "смотреть" },
        { "de": "spielen", "ru": "играть" },
        { "de": "schwimmen", "ru": "плавать" },
        { "de": "laufen", "ru": "бегать" },
        { "de": "spazieren gehen", "ru": "гулять" },
        { "de": "kochen", "ru": "готовить" },
        { "de": "schlafen", "ru": "спать" },
        { "de": "fernsehen", "ru": "смотреть телевизор" },
        { "de": "müde", "ru": "уставший" },
        { "de": "fit", "ru": "в хорошей форме" },
        { "de": "glücklich", "ru": "счастливый" },
        { "de": "traurig", "ru": "грустный" },
        { "de": "aktiv", "ru": "активный" },
        { "de": "sportlich", "ru": "спортивный" },
        { "de": "interessant", "ru": "интересный" },
        { "de": "langweilig", "ru": "скучный" },
        { "de": "frei", "ru": "свободный" },
        { "de": "beschäftigt", "ru": "занятый" },
        { "de": "früh", "ru": "ранний" },
        { "de": "spät", "ru": "поздний" },
        { "de": "gesund", "ru": "здоровый" },
        { "de": "ruhig", "ru": "спокойный" },
        { "de": "lustig", "ru": "весёлый" }
      ],
      "quiz": [
        {
          "id": "L8Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"schwimmen\"?",
          "options": ["готовить", "плавать", "вставать", "день"],
          "correct_answer": "плавать"
        },
        {
          "id": "L8Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"смотреть\"?",
          "options": ["sehen", "arbeiten", "frühstücken", "der Freund"],
          "correct_answer": "sehen"
        },
        {
          "id": "L8Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"spät\"?",
          "options": ["спать", "утро", "поздний", "уставший"],
          "correct_answer": "поздний"
        },
        {
          "id": "L8Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"счастливый\"?",
          "options": ["glücklich", "spazieren gehen", "hören", "gesund"],
          "correct_answer": "glücklich"
        },
        {
          "id": "L8Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Freundin\"?",
          "options": ["скучный", "поздний", "подруга", "готовить"],
          "correct_answer": "подруга"
        },
        {
          "id": "L8Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"вставать\"?",
          "options": ["aufstehen", "die Musik", "hören", "das Handy"],
          "correct_answer": "aufstehen"
        },
        {
          "id": "L8Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Fahrrad\"?",
          "options": ["велосипед", "смотреть телевизор", "гулять", "в хорошей форме"],
          "correct_answer": "велосипед"
        },
        {
          "id": "L8Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"будильник\"?",
          "options": ["der Wecker", "laufen", "lernen", "früh"],
          "correct_answer": "der Wecker"
        },
        {
          "id": "L8Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"früh\"?",
          "options": ["школа", "ранний", "здоровый", "музыка"],
          "correct_answer": "ранний"
        },
        {
          "id": "L8Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"играть\"?",
          "options": ["lustig", "müde", "spielen", "ruhig"],
          "correct_answer": "spielen"
        },
        {
          "id": "L8Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"frei\"?",
          "options": ["спокойный", "подруга", "свободный", "бегать"],
          "correct_answer": "свободный"
        },
        {
          "id": "L8Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"весёлый\"?",
          "options": ["die Musik", "lustig", "lernen", "das Handy"],
          "correct_answer": "lustig"
        },
        {
          "id": "L8Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"fit\"?",
          "options": ["поздний", "работа", "в хорошей форме", "смотреть телевизор"],
          "correct_answer": "в хорошей форме"
        },
        {
          "id": "L8Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"читать\"?",
          "options": ["lesen", "früh", "das Handy", "fit"],
          "correct_answer": "lesen"
        },
        {
          "id": "L8Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"frühstücken\"?",
          "options": ["завтракать", "счастливый", "завтрак", "утро"],
          "correct_answer": "завтракать"
        }
      ]
    },
    {
      "section_id": 9,
      "title_de": "Körper und Gesundheit",
      "title_ru": "Тело и здоровье",
      "word_count": 50,
      "vocabulary": [
        { "de": "der Kopf", "ru": "голова" },
        { "de": "das Gesicht", "ru": "лицо" },
        { "de": "das Auge", "ru": "глаз" },
        { "de": "das Ohr", "ru": "ухо" },
        { "de": "die Nase", "ru": "нос" },
        { "de": "der Mund", "ru": "рот" },
        { "de": "der Zahn", "ru": "зуб" },
        { "de": "der Hals", "ru": "горло, шея" },
        { "de": "die Schulter", "ru": "плечо" },
        { "de": "der Arm", "ru": "рука" },
        { "de": "die Hand", "ru": "кисть руки" },
        { "de": "der Finger", "ru": "палец" },
        { "de": "der Bauch", "ru": "живот" },
        { "de": "der Rücken", "ru": "спина" },
        { "de": "das Bein", "ru": "нога" },
        { "de": "das Knie", "ru": "колено" },
        { "de": "der Fuß", "ru": "ступня" },
        { "de": "das Herz", "ru": "сердце" },
        { "de": "der Körper", "ru": "тело" },
        { "de": "das Haar", "ru": "волос" },
        { "de": "die Gesundheit", "ru": "здоровье" },
        { "de": "die Krankheit", "ru": "болезнь" },
        { "de": "das Fieber", "ru": "температура" },
        { "de": "der Husten", "ru": "кашель" },
        { "de": "die Erkältung", "ru": "простуда" },
        { "de": "die Medizin", "ru": "лекарство" },
        { "de": "die Tablette", "ru": "таблетка" },
        { "de": "der Schmerz", "ru": "боль" },
        { "de": "die Apotheke", "ru": "аптека" },
        { "de": "das Rezept", "ru": "рецепт (врача)" },
        { "de": "schlafen", "ru": "спать" },
        { "de": "essen", "ru": "есть" },
        { "de": "trinken", "ru": "пить" },
        { "de": "helfen", "ru": "помогать" },
        { "de": "gesund werden", "ru": "выздоравливать" },
        { "de": "husten", "ru": "кашлять" },
        { "de": "lachen", "ru": "смеяться" },
        { "de": "weinen", "ru": "плакать" },
        { "de": "atmen", "ru": "дышать" },
        { "de": "sich ausruhen", "ru": "отдыхать" },
        { "de": "gesund", "ru": "здоровый" },
        { "de": "krank", "ru": "больной" },
        { "de": "fit", "ru": "в хорошей форме" },
        { "de": "müde", "ru": "уставший" },
        { "de": "stark", "ru": "сильный" },
        { "de": "schwach", "ru": "слабый" },
        { "de": "warm", "ru": "тёплый" },
        { "de": "kalt", "ru": "холодный" },
        { "de": "besser", "ru": "лучше" },
        { "de": "schlimm", "ru": "сильный, тяжёлый (о болезни)" }
      ],
      "quiz": [
        {
          "id": "L9Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Apotheke\"?",
          "options": ["волос", "рот", "аптека", "плакать"],
          "correct_answer": "аптека"
        },
        {
          "id": "L9Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"болезнь\"?",
          "options": ["die Krankheit", "gesund", "sich ausruhen", "das Bein"],
          "correct_answer": "die Krankheit"
        },
        {
          "id": "L9Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Finger\"?",
          "options": ["здоровье", "палец", "аптека", "дышать"],
          "correct_answer": "палец"
        },
        {
          "id": "L9Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"ухо\"?",
          "options": ["der Hals", "das Ohr", "besser", "gesund"],
          "correct_answer": "das Ohr"
        },
        {
          "id": "L9Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Fuß\"?",
          "options": ["рот", "уставший", "ступня", "сердце"],
          "correct_answer": "ступня"
        },
        {
          "id": "L9Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"спать\"?",
          "options": ["die Hand", "die Nase", "lachen", "schlafen"],
          "correct_answer": "schlafen"
        },
        {
          "id": "L9Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Hals\"?",
          "options": ["слабый", "есть", "горло, шея", "отдыхать"],
          "correct_answer": "горло, шея"
        },
        {
          "id": "L9Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"нос\"?",
          "options": ["das Haar", "warm", "die Nase", "schwach"],
          "correct_answer": "die Nase"
        },
        {
          "id": "L9Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Medizin\"?",
          "options": ["больной", "лекарство", "дышать", "ступня"],
          "correct_answer": "лекарство"
        },
        {
          "id": "L9Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"есть\"?",
          "options": ["das Bein", "essen", "fit", "husten"],
          "correct_answer": "essen"
        },
        {
          "id": "L9Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"fit\"?",
          "options": ["в хорошей форме", "нос", "кисть руки", "ухо"],
          "correct_answer": "в хорошей форме"
        },
        {
          "id": "L9Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"смеяться\"?",
          "options": ["lachen", "die Apotheke", "das Rezept", "der Hals"],
          "correct_answer": "lachen"
        },
        {
          "id": "L9Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"warm\"?",
          "options": ["пить", "тёплый", "сердце", "выздоравливать"],
          "correct_answer": "тёплый"
        },
        {
          "id": "L9Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"рука\"?",
          "options": ["der Arm", "sich ausruhen", "die Apotheke", "das Auge"],
          "correct_answer": "der Arm"
        },
        {
          "id": "L9Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"atmen\"?",
          "options": ["нога", "лицо", "рот", "дышать"],
          "correct_answer": "дышать"
        }
      ]
    },
    {
      "section_id": 10,
      "title_de": "Arbeit und Beruf",
      "title_ru": "Работа и профессия",
      "word_count": 50,
      "vocabulary": [
        { "de": "der Beruf", "ru": "профессия" },
        { "de": "die Arbeit", "ru": "работа" },
        { "de": "der Arbeitsplatz", "ru": "рабочее место" },
        { "de": "die Firma", "ru": "фирма" },
        { "de": "das Büro", "ru": "офис" },
        { "de": "der Chef", "ru": "начальник" },
        { "de": "die Chefin", "ru": "начальница" },
        { "de": "der Kollege", "ru": "коллега" },
        { "de": "die Kollegin", "ru": "коллега (жен.)" },
        { "de": "der Mitarbeiter", "ru": "сотрудник" },
        { "de": "die Mitarbeiterin", "ru": "сотрудница" },
        { "de": "die Aufgabe", "ru": "задача" },
        { "de": "der Termin", "ru": "встреча" },
        { "de": "die Pause", "ru": "перерыв" },
        { "de": "die Arbeitszeit", "ru": "рабочее время" },
        { "de": "der Urlaub", "ru": "отпуск" },
        { "de": "der Lohn", "ru": "зарплата" },
        { "de": "die Erfahrung", "ru": "опыт" },
        { "de": "die Ausbildung", "ru": "обучение" },
        { "de": "der Lebenslauf", "ru": "резюме" },
        { "de": "der Arzt", "ru": "врач" },
        { "de": "die Ärztin", "ru": "врач (жен.)" },
        { "de": "der Lehrer", "ru": "учитель" },
        { "de": "die Lehrerin", "ru": "учительница" },
        { "de": "der Verkäufer", "ru": "продавец" },
        { "de": "die Verkäuferin", "ru": "продавщица" },
        { "de": "der Koch", "ru": "повар" },
        { "de": "die Köchin", "ru": "повар (жен.)" },
        { "de": "der Fahrer", "ru": "водитель" },
        { "de": "die Krankenschwester", "ru": "медсестра" },
        { "de": "arbeiten", "ru": "работать" },
        { "de": "lernen", "ru": "учиться" },
        { "de": "machen", "ru": "делать" },
        { "de": "helfen", "ru": "помогать" },
        { "de": "verdienen", "ru": "зарабатывать" },
        { "de": "suchen", "ru": "искать" },
        { "de": "finden", "ru": "находить" },
        { "de": "beginnen", "ru": "начинать" },
        { "de": "enden", "ru": "заканчивать" },
        { "de": "planen", "ru": "планировать" },
        { "de": "wichtig", "ru": "важный" },
        { "de": "interessant", "ru": "интересный" },
        { "de": "schwer", "ru": "трудный" },
        { "de": "leicht", "ru": "лёгкий" },
        { "de": "freundlich", "ru": "дружелюбный" },
        { "de": "fleißig", "ru": "трудолюбивый" },
        { "de": "müde", "ru": "уставший" },
        { "de": "zufrieden", "ru": "довольный" },
        { "de": "frei", "ru": "свободный" },
        { "de": "beschäftigt", "ru": "занятый" }
      ],
      "quiz": [
        {
          "id": "L10Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"finden\"?",
          "options": ["врач (жен.)", "повар", "врач", "находить"],
          "correct_answer": "находить"
        },
        {
          "id": "L10Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"рабочее место\"?",
          "options": ["der Arbeitsplatz", "die Köchin", "machen", "fleißig"],
          "correct_answer": "der Arbeitsplatz"
        },
        {
          "id": "L10Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Aufgabe\"?",
          "options": ["находить", "занятый", "задача", "рабочее место"],
          "correct_answer": "задача"
        },
        {
          "id": "L10Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"работать\"?",
          "options": ["der Lohn", "arbeiten", "der Arzt", "der Kollege"],
          "correct_answer": "arbeiten"
        },
        {
          "id": "L10Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"helfen\"?",
          "options": ["лёгкий", "искать", "помогать", "медсестра"],
          "correct_answer": "помогать"
        },
        {
          "id": "L10Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"интересный\"?",
          "options": ["interessant", "helfen", "die Lehrerin", "planen"],
          "correct_answer": "interessant"
        },
        {
          "id": "L10Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Fahrer\"?",
          "options": ["занятый", "водитель", "перерыв", "фирма"],
          "correct_answer": "водитель"
        },
        {
          "id": "L10Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"опыт\"?",
          "options": ["der Lebenslauf", "die Krankenschwester", "die Erfahrung", "fleißig"],
          "correct_answer": "die Erfahrung"
        },
        {
          "id": "L10Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"zufrieden\"?",
          "options": ["заканчивать", "довольный", "отпуск", "важный"],
          "correct_answer": "довольный"
        },
        {
          "id": "L10Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"начинать\"?",
          "options": ["der Koch", "der Chef", "beginnen", "suchen"],
          "correct_answer": "beginnen"
        },
        {
          "id": "L10Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"die Köchin\"?",
          "options": ["повар (жен.)", "коллега", "трудный", "сотрудник"],
          "correct_answer": "повар (жен.)"
        },
        {
          "id": "L10Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"учиться\"?",
          "options": ["lernen", "müde", "helfen", "die Erfahrung"],
          "correct_answer": "lernen"
        },
        {
          "id": "L10Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Chef\"?",
          "options": ["работать", "начальник", "находить", "зарплата"],
          "correct_answer": "начальник"
        },
        {
          "id": "L10Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"уставший\"?",
          "options": ["machen", "frei", "müde", "enden"],
          "correct_answer": "müde"
        },
        {
          "id": "L10Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Lehrer\"?",
          "options": ["помогать", "повар (жен.)", "учитель", "врач (жен.)"],
          "correct_answer": "учитель"
        }
      ]
    },
    {
      "section_id": 11,
      "title_de": "Jahreszeiten und Wetter",
      "title_ru": "Времена года и погода",
      "word_count": 50,
      "vocabulary": [
        { "de": "der Frühling", "ru": "весна" },
        { "de": "der Sommer", "ru": "лето" },
        { "de": "der Herbst", "ru": "осень" },
        { "de": "der Winter", "ru": "зима" },
        { "de": "die Jahreszeit", "ru": "время года" },
        { "de": "das Wetter", "ru": "погода" },
        { "de": "die Sonne", "ru": "солнце" },
        { "de": "der Regen", "ru": "дождь" },
        { "de": "der Schnee", "ru": "снег" },
        { "de": "der Wind", "ru": "ветер" },
        { "de": "die Wolke", "ru": "облако" },
        { "de": "der Himmel", "ru": "небо" },
        { "de": "die Temperatur", "ru": "температура" },
        { "de": "der Grad", "ru": "градус" },
        { "de": "der Nebel", "ru": "туман" },
        { "de": "das Gewitter", "ru": "гроза" },
        { "de": "der Sturm", "ru": "буря" },
        { "de": "das Eis", "ru": "лёд" },
        { "de": "der Frost", "ru": "мороз" },
        { "de": "der Regenbogen", "ru": "радуга" },
        { "de": "die Luft", "ru": "воздух" },
        { "de": "die Natur", "ru": "природа" },
        { "de": "das Klima", "ru": "климат" },
        { "de": "die Blume", "ru": "цветок" },
        { "de": "das Blatt", "ru": "лист" },
        { "de": "der Baum", "ru": "дерево" },
        { "de": "regnen", "ru": "идти (о дожде)" },
        { "de": "schneien", "ru": "идти (о снеге)" },
        { "de": "scheinen", "ru": "светить" },
        { "de": "frieren", "ru": "мёрзнуть" },
        { "de": "blühen", "ru": "цвести" },
        { "de": "wachsen", "ru": "расти" },
        { "de": "fallen", "ru": "падать" },
        { "de": "schmelzen", "ru": "таять" },
        { "de": "beginnen", "ru": "начинаться" },
        { "de": "enden", "ru": "заканчиваться" },
        { "de": "warm", "ru": "тёплый" },
        { "de": "kalt", "ru": "холодный" },
        { "de": "heiß", "ru": "жаркий" },
        { "de": "kühl", "ru": "прохладный" },
        { "de": "sonnig", "ru": "солнечный" },
        { "de": "windig", "ru": "ветреный" },
        { "de": "regnerisch", "ru": "дождливый" },
        { "de": "bewölkt", "ru": "облачный" },
        { "de": "trocken", "ru": "сухой" },
        { "de": "nass", "ru": "мокрый" },
        { "de": "klar", "ru": "ясный" },
        { "de": "draußen", "ru": "на улице" },
        { "de": "drinnen", "ru": "в помещении" },
        { "de": "heute", "ru": "сегодня" }
      ],
      "quiz": [
        {
          "id": "L11Q1",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"klar\"?",
          "options": ["ясный", "температура", "воздух", "мёрзнуть"],
          "correct_answer": "ясный"
        },
        {
          "id": "L11Q2",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"радуга\"?",
          "options": ["der Regenbogen", "der Nebel", "der Herbst", "schneien"],
          "correct_answer": "der Regenbogen"
        },
        {
          "id": "L11Q3",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"kalt\"?",
          "options": ["лист", "холодный", "облачный", "ясный"],
          "correct_answer": "холодный"
        },
        {
          "id": "L11Q4",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"на улице\"?",
          "options": ["kalt", "der Schnee", "draußen", "fallen"],
          "correct_answer": "draußen"
        },
        {
          "id": "L11Q5",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"regnerisch\"?",
          "options": ["солнце", "мёрзнуть", "таять", "дождливый"],
          "correct_answer": "дождливый"
        },
        {
          "id": "L11Q6",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"расти\"?",
          "options": ["der Wind", "regnerisch", "regnen", "wachsen"],
          "correct_answer": "wachsen"
        },
        {
          "id": "L11Q7",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"der Wind\"?",
          "options": ["климат", "ветер", "солнечный", "мокрый"],
          "correct_answer": "ветер"
        },
        {
          "id": "L11Q8",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"светить\"?",
          "options": ["scheinen", "trocken", "die Natur", "enden"],
          "correct_answer": "scheinen"
        },
        {
          "id": "L11Q9",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"beginnen\"?",
          "options": ["осень", "заканчиваться", "солнечный", "начинаться"],
          "correct_answer": "начинаться"
        },
        {
          "id": "L11Q10",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"цвести\"?",
          "options": ["der Nebel", "drinnen", "blühen", "das Wetter"],
          "correct_answer": "blühen"
        },
        {
          "id": "L11Q11",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Klima\"?",
          "options": ["мёрзнуть", "мокрый", "климат", "облако"],
          "correct_answer": "климат"
        },
        {
          "id": "L11Q12",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"природа\"?",
          "options": ["die Natur", "der Frost", "die Luft", "der Winter"],
          "correct_answer": "die Natur"
        },
        {
          "id": "L11Q13",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"enden\"?",
          "options": ["ветер", "заканчиваться", "гроза", "таять"],
          "correct_answer": "заканчиваться"
        },
        {
          "id": "L11Q14",
          "direction": "ru_to_de",
          "prompt": "Как по-немецки \"ветреный\"?",
          "options": ["die Wolke", "windig", "der Himmel", "das Wetter"],
          "correct_answer": "windig"
        },
        {
          "id": "L11Q15",
          "direction": "de_to_ru",
          "prompt": "Как переводится \"das Blatt\"?",
          "options": ["лист", "жаркий", "ветер", "падать"],
          "correct_answer": "лист"
        }
      ]
    }
  ]
};
