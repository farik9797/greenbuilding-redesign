/* Green Building — redesign 2026. Vanilla JS, ES2017. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- i18n (RU is the markup itself, UZ/EN below) ---------- */
  var I18N = {
    uz: {
      'logo.tag': 'Issiqxonalar. Texnologiyalar. Hosil.',
      'nav.about': 'Kompaniya haqida', 'nav.solutions': 'Yechimlar', 'nav.projects': 'Loyihalar', 'nav.tech': 'Texnologiyalar', 'nav.services': 'Xizmatlar', 'nav.contacts': 'Kontaktlar',
      'btn.request': 'Ariza qoldirish', 'btn.discuss': 'Loyihamni muhokama qilish', 'btn.projects': 'Loyihalarni ko‘rish', 'btn.more': 'Batafsil', 'btn.allprojects': 'Barcha loyihalar', 'btn.consult': 'Konsultatsiya olish', 'btn.details': 'Batafsil', 'btn.send': 'Yuborish',
      'hero.eyebrow': 'Agrobiznes uchun issiqxona majmualari quramiz',
      'hero.title': 'Biznesingizning <em>barqaror o‘sishi</em> uchun zamonaviy issiqxona majmualari',
      'hero.lead': '1–5 avlod issiqxona majmualarini kalit ostida loyihalaymiz, quramiz va jihozlaymiz — vazifalaringiz, iqlim va rivojlanish istiqbollarini hisobga olgan holda. Gollandiya texnologiyalari, barqaror hosil va aniq qoplanish muddati.',
      'hero.f1': 'Zamonaviy texnologiyalar', 'hero.f2': 'Energiya tejamkor yechimlar', 'hero.f3': 'Avtomatlashtirish va nazorat', 'hero.f4': 'To‘liq ish tsikli',
      'hero.card.t': '5-avlod issiqxonalari', 'hero.card.s': 'UltraClima · −25% energiya sarfi',
      'sol.eyebrow': 'Kimlar uchun ishlaymiz', 'sol.title': 'Biznesingiz uchun yechimlar',
      'sol.lead': 'Agrokorxonalar, investorlar va faoliyat yuritayotgan xo‘jaliklarga foyda keltiradigan issiqxona majmualarini yaratish va rivojlantirishda yordam beramiz.',
      'sol.aside': 'Har bir loyiha — maqsadlaringiz, resurslaringiz, bozor va mintaqa xususiyatlarini hisobga olgan individual yechim.',
      'sol.c1.t': 'Faoliyat yuritayotgan xo‘jaliklar', 'sol.c1.p': 'Ishlab chiqarishni kengaytirish, modernizatsiya va avtomatlashtirish, yangi avlod issiqxonalariga o‘tish.',
      'sol.c2.t': 'Agrokorxonalar va fermer xo‘jaliklari', 'sol.c2.p': 'Issiqxona majmualarini kalit ostida qurish — maydon tanlashdan ishga tushirishgacha.',
      'sol.c3.t': 'Investorlar va tadbirkorlar', 'sol.c3.p': 'Loyihani ishlab chiqish, iqtisodiyot va investitsiya bosqichlari, texnologiya va ekinlarni tanlash.',
      'sol.c4.t': 'Eksportyorlar va sabzavot yetkazib beruvchilar', 'sol.c4.p': 'Yil davomida barqaror ishlab chiqarish va o‘z xomashyo bazasini kengaytirish.',
      'proj.eyebrow': 'Portfolio', 'proj.title': 'Bizning loyihalar',
      'proj.lead': 'Green Building mutaxassislari O‘zbekistonda va xorijda issiqxona majmualarini amalga oshirgan — kichik xo‘jaliklardan yirik agrokorxonalargacha.',
      'proj.s1': 'portfeldagi issiqxona<br>avlodlari', 'proj.s2': 'faoliyat<br>mamlakatlari', 'proj.s3': 'kalit ostida<br>to‘liq tsikl',
      'proj.big.t': 'Kalit ostida issiqxona majmuasi', 'proj.big.s': 'Metall konstruksiyalar, oynalash, muhandislik tizimlari', 'proj.more': 'yana 25 ta foto',
      'place.tashkent': 'Toshkent', 'place.kibray': 'Qibray', 'place.light': 'Qo‘shimcha yoritish', 'place.pavlodar': 'Pavlodar, Qozog‘iston', 'place.xorazm': 'Xorazm',
      'why.eyebrow': 'Asosiy afzalliklar', 'why.title': 'Nega bizni tanlashadi',
      'why.f1.t': 'Mablag‘ va vaqt tejamkorligi', 'why.f1.p': 'Individual yondashuv: iqlim, bozor va mijoz vazifalarini hisobga olamiz — ortiqcha xarajat va qayta ishlarsiz.',
      'why.f2.t': 'Gollandiya texnologiyalari', 'why.f2.p': 'Barcha avlod issiqxonalari — 5-avlodgacha: Kubo UltraClima, Van der Hoeven, Certhon.',
      'why.f3.t': 'Shefmontaj va ishga tushirish', 'why.f3.p': 'Loyiha hujjatlari, shefmontaj va tizimlarni ishga tushirish ishga kiritilgan.',
      'why.f4.t': 'Natija kafolati', 'why.f4.p': 'Ishga tushirilgandan keyin agronom kuzatuvi va biznes maslahatlar — rejalashtirilgan hosildorlikka chiqquncha.',
      'quiz.title': 'Loyihangiz uchun tezkor yechim tanlash', 'quiz.lead': 'Bir nechta savolga javob bering — vazifalaringizga mos optimal yechimni tanlaymiz.',
      'quiz.who': 'Siz kimsiz?', 'quiz.choose': 'Variantni tanlang', 'quiz.who1': 'Faoliyat yuritayotgan xo‘jalik', 'quiz.who2': 'Agrokorxona', 'quiz.who3': 'Investor / tadbirkor', 'quiz.who4': 'Eksportyor / yetkazib beruvchi',
      'quiz.task': 'Qanday vazifa?', 'quiz.task1': 'Kalit ostida issiqxona', 'quiz.task2': 'Issiqxonani modernizatsiya qilish', 'quiz.task3': 'Loyihalash', 'quiz.task4': 'Loyiha ekspertizasi', 'quiz.task5': 'Konsultatsiya',
      'quiz.area': 'Loyiha maydoni', 'quiz.area1': '1 gektargacha', 'quiz.area2': '1–5 ga', 'quiz.area3': '5–10 ga', 'quiz.area4': '10 gektardan ortiq',
      'quiz.stage': 'Loyiha bosqichi', 'quiz.stage1': 'G‘oya', 'quiz.stage2': 'Yer maydoni bor', 'quiz.stage3': 'Loyiha bor', 'quiz.stage4': 'Qurilish ketmoqda',
      'quiz.more': 'Qo‘shimcha ma’lumot', 'quiz.more.ph': 'Loyihangiz haqida aytib bering',
      'f.name': 'Ismingiz', 'f.tel': 'Telefon', 'f.safe': 'Ma’lumotlaringiz xavfsiz va uchinchi shaxslarga berilmaydi',
      'srv.eyebrow': 'Biz nima qilamiz', 'srv.title': 'To‘liq ish tsikli', 'srv.aside': 'Maydon tanlashdan foydalanishga topshirish va agrokuzatuvgacha — bitta jamoa va bitta mas’uliyat.',
      'srv.1.t': 'Maydon tanlash', 'srv.1.p': 'Majmuani optimal joylashtirish uchun iqlim, geologiya, gidrogeologiya, sanitariya me’yorlari va logistikani tahlil qilish.',
      'srv.1.d': 'Maydon parametrlarini yig‘amiz, hududning yaroqliligi va mintaqa iqlimini tekshiramiz, resurs ta’minoti ko‘rsatkichlarini aniqlaymiz. Logistika va malakali kadrlar masalalarini ishlab chiqamiz.',
      'srv.2.t': 'Loyihalash', 'srv.2.p': 'To‘liq loyiha-smeta hujjatlari: hisob-kitoblar, chizmalar, sxemalar, smetalar, davlat ekspertizasi.',
      'srv.2.d': 'Mahsulotni saqlash, saralash va qadoqlash vazifalarini hisobga olamiz. Sifatli hujjatlar ish jarayonida parametr va narxlarni yangilash, ekspertizadan so‘ng moliyalashtirish va qurilishga o‘tish imkonini beradi.',
      'srv.3.t': 'Qurilish', 'srv.3.p': 'Byudjet, muddat va sifatni to‘liq nazorat qilgan holda konstruksiyalar va barcha muhandislik tizimlarini montaj qilish.',
      'srv.3.d': '<b>Byudjet</b> — chetga chiqishsiz: xaridlar nazorati, kredit tashkilotlari bilan ishlash. <b>Muddatlar</b> — yetkazib berish va montaj jadvallariga rioya qilish. <b>Sifat</b> — texnik nazorat, o‘zgarishlarni boshqarish va xavflarni kamaytirish.',
      'srv.4.t': 'Ekspertiza va kuzatuv', 'srv.4.p': 'Xorijiy loyihalarni O‘zbekiston me’yorlariga moslashtirish, ishga tushirilgandan keyin agronomik yordam.',
      'srv.4.d': 'Har bir mamlakatning o‘z talablari bor — xorijiy loyihalarni moslashtiramiz. Foydalanishga topshirilgandan so‘ng investor servis, agronomik yordam va qoplanish muddatini qisqartirish uchun biznes maslahatlar oladi.',
      'gen.eyebrow': 'Texnologiyalar', 'gen.title': 'Issiqxona avlodlari', 'gen.lead': 'Plyonkali parniklardan 5-avlod innovatsion tizimlarigacha — har qanday turdagi issiqxonalarni quramiz.',
      'gen.aside': 'Zamonaviy issiqxona — bu nafaqat konstruksiya, balki natijangiz uchun ishlaydigan aqlli tizimlar.',
      'gen.badge': 'Tavsiya etamiz',
      'gen.c1': 'Eng yuqori hosildorlik', 'gen.c2': '−25% energiya sarfi', 'gen.c3': 'Qoplanish 2 yil tezroq', 'gen.c4': 'Yuqori CO₂ darajasi', 'gen.c5': 'Harorat va namlikni aniq nazorat qilish', 'gen.c6': 'Zararkunandalar ancha kam',
      'cta.eyebrow': 'Loyihani muhokama qilishga tayyormisiz?', 'cta.title': 'Agrobiznesingiz eng yaxshi yechimlarga loyiq',
      'cta.lead': 'Ariza qoldiring — loyihani muhokama qilish va optimal yechim taklif qilish uchun 1 ish kuni ichida siz bilan bog‘lanamiz.',
      'cta.p1': 'Mutaxassisning bepul konsultatsiyasi', 'cta.p2': 'Loyiha narxini hisoblash', 'cta.p3': 'Javob muddati — 1 kungacha',
      'addr': 'Toshkent, Namuna ko‘chasi, 5', 'footer.rights': 'Barcha huquqlar himoyalangan.',
      'modal.eyebrow': 'Ariza', 'modal.title': 'Qo‘ng‘iroq buyurtma qilish', 'modal.lead': 'Mutaxassis 1 ish kuni ichida qo‘ng‘iroq qiladi va bepul maslahat beradi.',
      'msg.ok': 'Rahmat! Ariza yuborildi — tez orada siz bilan bog‘lanamiz.', 'msg.err': 'Yuborib bo‘lmadi. Iltimos, qo‘ng‘iroq qiling: +998 95 00 12345', 'msg.invalid': 'Ism va telefon raqamini kiriting', 'msg.demo': 'Demo-versiya: forma saytga ko‘chirilgandan keyin arizalarni Telegram’ga yuboradi.',
      "genx.k.cover": "Qoplama", "genx.k.heat": "Isitish", "genx.k.climate": "Iqlim boshqaruvi", "genx.k.season": "Mavsum", "genx.m.yield": "Hosildorlik", "genx.m.climate": "Iqlim barqarorligi", "genx.m.auto": "Avtomatlashtirish", "genx.m.note": "* avlodlar o‘rtasidagi nisbiy baho", "genx.render": "Vizualizatsiya", "genx.lg.frame": "Karkas", "genx.lg.crop": "Ekinlar", "genx.lg.heat": "Isitish", "genx.lg.light": "Yoritish", "genx.lg.air": "Havo", "genx.partners": "Texnologiyalar asosida quramiz:", "genx.cta": "5-avlod issiqxonasini hisoblash", "genx.chips": "5-avlod afzalliklari", "genx.1.tab": "Plyonkali", "genx.1.era": "Boshlang‘ich daraja", "genx.1.t": "Birinchi avlod — plyonkali issiqxonalar", "genx.1.p": "Bahor va yozda erta hosil olish uchun polietilen plyonkali tunnel issiqxonalar. Kichik xo‘jaliklar va ko‘chat yetishtirish uchun tez va arzon start.", "genx.1.cover": "Polietilen plyonka", "genx.1.heat": "Yo‘q yoki vaqtinchalik", "genx.1.climate": "Qo‘lda shamollatish", "genx.1.season": "Bahor — kuz", "genx.2.tab": "Angar", "genx.2.era": "Klassik texnologiya", "genx.2.t": "Ikkinchi avlod — angar issiqxonalar", "genx.2.p": "Suv bilan isitiladigan angar turidagi oynali issiqxonalar. Ishonchli konstruksiya, lekin energiya sarfi yuqori, hosildorlik past va avtomatika yo‘q.", "genx.2.cover": "Oyna, bir qavatli", "genx.2.heat": "Suvli", "genx.2.climate": "Qo‘lda boshqaruv", "genx.2.season": "Yil bo‘yi, yuqori xarajat", "genx.3.tab": "Blokli", "genx.3.era": "Sanoat miqyosi", "genx.3.t": "Uchinchi avlod — blokli issiqxonalar", "genx.3.p": "Suv bilan isitiladigan katta maydonli ko‘p oraliqli blokli issiqxonalar. Miqyos oshadi, lekin butun maydonda maqbul mikroiqlimni saqlash qiyin.", "genx.3.cover": "Oyna yoki polikarbonat", "genx.3.heat": "Quvurli suvli", "genx.3.climate": "Asosiy avtomatika", "genx.3.season": "Yil bo‘yi", "genx.4.tab": "Venlo", "genx.4.era": "Zamonaviy standart", "genx.4.t": "To‘rtinchi avlod — «Venlo» issiqxonalari", "genx.4.p": "Ikki qavatli oynali, qo‘shimcha yoritishli va kontrollerlar bilan boshqariladigan baland «Venlo» issiqxonalari. Hosildorlik yuqori, lekin bahorda mikroiqlimni barqaror ushlab turish qiyin.", "genx.4.cover": "Oyna, ikki qavatli", "genx.4.heat": "Quvurli + qo‘shimcha yoritish", "genx.4.climate": "Iqlim kompyuteri", "genx.4.season": "Yil bo‘yi", "genx.5.tab": "UltraClima", "genx.5.era": "Kelajak texnologiyasi", "genx.5.t": "Beshinchi avlod — yarim yopiq issiqxonalar", "genx.5.p": "Havo maxsus qurilmalarda tayyorlanadi va novlar ostidagi yenglar orqali beriladi, issiqxonada ortiqcha bosim saqlanadi. Tashqi ob-havodan qat’i nazar maqbul mikroiqlim.", "genx.5.cover": "«Venlo» oynasi + iqlim ekranlari", "genx.5.heat": "Yenglar orqali havo + quvurli", "genx.5.climate": "To‘liq avtomatlashtirish, ortiqcha bosim", "genx.5.season": "Yil bo‘yi, maksimal hosil"
    },
    en: {
      'logo.tag': 'Greenhouses. Technology. Harvest.',
      'nav.about': 'About', 'nav.solutions': 'Solutions', 'nav.projects': 'Projects', 'nav.tech': 'Technology', 'nav.services': 'Services', 'nav.contacts': 'Contacts',
      'btn.request': 'Get a quote', 'btn.discuss': 'Discuss my project', 'btn.projects': 'View projects', 'btn.more': 'Learn more', 'btn.allprojects': 'View all projects', 'btn.consult': 'Get a consultation', 'btn.details': 'Details', 'btn.send': 'Send',
      'hero.eyebrow': 'Greenhouse complexes for agribusiness',
      'hero.title': 'Modern greenhouse complexes for the sustainable growth of <em>your business</em>',
      'hero.lead': 'We design, build and equip turnkey greenhouse complexes of generations 1–5 — tailored to your goals, climate and growth plans. Dutch technology, stable harvests and a predictable payback.',
      'hero.f1': 'Modern technology', 'hero.f2': 'Energy-efficient solutions', 'hero.f3': 'Automation & control', 'hero.f4': 'Full work cycle',
      'hero.card.t': '5th generation greenhouses', 'hero.card.s': 'UltraClima · −25% energy use',
      'sol.eyebrow': 'Who we work with', 'sol.title': 'Solutions for your business',
      'sol.lead': 'We help agricultural companies, investors and existing farms build and grow profitable greenhouse complexes.',
      'sol.aside': 'Every project is a custom solution that reflects your goals, resources, market and the specifics of your region.',
      'sol.c1.t': 'Existing farms', 'sol.c1.p': 'Expansion, modernisation and automation, upgrading to new-generation greenhouses.',
      'sol.c2.t': 'Agricultural enterprises', 'sol.c2.p': 'Turnkey greenhouse complexes — from site selection to commissioning.',
      'sol.c3.t': 'Investors & entrepreneurs', 'sol.c3.p': 'Project development, economics and investment stages, choice of technology and crops.',
      'sol.c4.t': 'Exporters & vegetable suppliers', 'sol.c4.p': 'Stable year-round production and a larger own supply base.',
      'proj.eyebrow': 'Portfolio', 'proj.title': 'Our projects',
      'proj.lead': 'Green Building specialists have delivered greenhouse complexes in Uzbekistan and abroad — from small farms to large agricultural enterprises.',
      'proj.s1': 'greenhouse generations<br>in our portfolio', 'proj.s2': 'countries<br>of operation', 'proj.s3': 'full turnkey<br>cycle',
      'proj.big.t': 'Turnkey greenhouse complex', 'proj.big.s': 'Steel structures, glazing, engineering systems', 'proj.more': '25 more photos',
      'place.tashkent': 'Tashkent', 'place.kibray': 'Kibray', 'place.light': 'Supplemental lighting', 'place.pavlodar': 'Pavlodar, Kazakhstan', 'place.xorazm': 'Khorezm',
      'why.eyebrow': 'Key advantages', 'why.title': 'Why clients choose us',
      'why.f1.t': 'Save money & time', 'why.f1.p': 'A tailored approach: we factor in climate, market and your goals — no unnecessary costs or rework.',
      'why.f2.t': 'Dutch technology', 'why.f2.p': 'Greenhouses of every generation up to the 5th: Kubo UltraClima, Van der Hoeven, Certhon.',
      'why.f3.t': 'Supervision & commissioning', 'why.f3.p': 'Design documentation, installation supervision and system start-up are included.',
      'why.f4.t': 'Guaranteed results', 'why.f4.p': 'Agronomy support and business consulting after launch — until you reach the planned yield.',
      'quiz.title': 'Quick solution finder for your project', 'quiz.lead': 'Answer a few questions and we will pick the best solution for your goals.',
      'quiz.who': 'Who are you?', 'quiz.choose': 'Choose an option', 'quiz.who1': 'Existing farm', 'quiz.who2': 'Agricultural enterprise', 'quiz.who3': 'Investor / entrepreneur', 'quiz.who4': 'Exporter / supplier',
      'quiz.task': 'What is the task?', 'quiz.task1': 'Turnkey greenhouse', 'quiz.task2': 'Greenhouse modernisation', 'quiz.task3': 'Design', 'quiz.task4': 'Project review', 'quiz.task5': 'Consultation',
      'quiz.area': 'Project area', 'quiz.area1': 'up to 1 ha', 'quiz.area2': '1–5 ha', 'quiz.area3': '5–10 ha', 'quiz.area4': 'over 10 ha',
      'quiz.stage': 'Project stage', 'quiz.stage1': 'Idea', 'quiz.stage2': 'Land available', 'quiz.stage3': 'Design ready', 'quiz.stage4': 'Under construction',
      'quiz.more': 'Additional information', 'quiz.more.ph': 'Tell us about your project',
      'f.name': 'Your name', 'f.tel': 'Phone', 'f.safe': 'Your data is safe and never shared with third parties',
      'srv.eyebrow': 'What we do', 'srv.title': 'Full work cycle', 'srv.aside': 'From site selection to commissioning and agronomy support — one team, one responsibility.',
      'srv.1.t': 'Site selection', 'srv.1.p': 'Analysis of climate, geology, hydrogeology, sanitary norms and logistics for optimal placement.',
      'srv.1.d': 'We collect and combine site parameters, check land suitability and regional climate, and calculate resource supply indicators. We also work out logistics and the availability of qualified staff.',
      'srv.2.t': 'Design', 'srv.2.p': 'Complete design and cost documentation: calculations, drawings, diagrams, estimates, state review.',
      'srv.2.d': 'We account for storage, sorting and packing. Quality documentation lets you update parameters and costs along the way and move on to financing and construction after approval.',
      'srv.3.t': 'Construction', 'srv.3.p': 'Installation of structures and all engineering systems with full control of budget, timing and quality.',
      'srv.3.d': '<b>Budget</b> — no deviations: procurement control, work with lenders. <b>Timeline</b> — delivery and installation schedules met. <b>Quality</b> — technical supervision, change management and risk reduction.',
      'srv.4.t': 'Review & support', 'srv.4.p': 'Adapting foreign projects to Uzbek standards, agronomy support after launch.',
      'srv.4.d': 'Every country has its own requirements — we adapt foreign projects. After commissioning the investor gets service, agronomy support and business consulting to shorten the payback period.',
      'gen.eyebrow': 'Technology', 'gen.title': 'Greenhouse generations', 'gen.lead': 'From film tunnels to innovative 5th generation systems — we build greenhouses of every type.',
      'gen.aside': 'A modern greenhouse is more than a structure — it is a set of smart systems working for your result.',
      'gen.badge': 'Recommended',
      'gen.c1': 'Highest yields', 'gen.c2': '−25% energy use', 'gen.c3': 'Payback 2 years faster', 'gen.c4': 'High CO₂ levels', 'gen.c5': 'Precise temperature & humidity control', 'gen.c6': 'Far fewer pests',
      'cta.eyebrow': 'Ready to discuss your project?', 'cta.title': 'Your agribusiness deserves the best solutions',
      'cta.lead': 'Leave a request and we will get back to you within 1 business day to discuss your project and propose the best solution.',
      'cta.p1': 'Free specialist consultation', 'cta.p2': 'Project cost estimate', 'cta.p3': 'Reply within 1 day',
      'addr': 'Tashkent, Namuna str., 5', 'footer.rights': 'All rights reserved.',
      'modal.eyebrow': 'Request', 'modal.title': 'Request a call', 'modal.lead': 'A specialist will call you back within 1 business day for a free consultation.',
      'msg.ok': 'Thank you! Your request has been sent — we will contact you shortly.', 'msg.err': 'Could not send. Please call us: +998 95 00 12345', 'msg.invalid': 'Please enter your name and phone number', 'msg.demo': 'Demo version: the form will send requests to Telegram once moved to the live site.',
      "genx.k.cover": "Covering", "genx.k.heat": "Heating", "genx.k.climate": "Climate control", "genx.k.season": "Season", "genx.m.yield": "Yield", "genx.m.climate": "Climate stability", "genx.m.auto": "Automation", "genx.m.note": "* relative rating across generations", "genx.render": "Visualisation", "genx.lg.frame": "Frame", "genx.lg.crop": "Crops", "genx.lg.heat": "Heating", "genx.lg.light": "Lighting", "genx.lg.air": "Air", "genx.partners": "We build with:", "genx.cta": "Estimate a 5th gen greenhouse", "genx.chips": "5th generation advantages", "genx.1.tab": "Film", "genx.1.era": "Entry level", "genx.1.t": "First generation — film greenhouses", "genx.1.p": "Polyethylene film tunnels for an early spring and summer harvest. A fast, low-cost start for small farms and seedling production.", "genx.1.cover": "Polyethylene film", "genx.1.heat": "None or temporary", "genx.1.climate": "Manual ventilation", "genx.1.season": "Spring — autumn", "genx.2.tab": "Hangar", "genx.2.era": "Classic technology", "genx.2.t": "Second generation — hangar greenhouses", "genx.2.p": "Hangar-type glass greenhouses with water heating. A reliable structure, but high energy costs, modest yields and no automation.", "genx.2.cover": "Single glass", "genx.2.heat": "Water heating", "genx.2.climate": "Manual control", "genx.2.season": "Year-round, high costs", "genx.3.tab": "Block", "genx.3.era": "Industrial scale", "genx.3.t": "Third generation — block greenhouses", "genx.3.p": "Large multi-span block greenhouses with water heating. Scale grows, but keeping an optimal microclimate across the whole area is difficult.", "genx.3.cover": "Glass or polycarbonate", "genx.3.heat": "Pipe water heating", "genx.3.climate": "Basic automation", "genx.3.season": "Year-round", "genx.4.tab": "Venlo", "genx.4.era": "Modern standard", "genx.4.t": "Fourth generation — Venlo greenhouses", "genx.4.p": "Tall Venlo greenhouses with double glazing, supplemental lighting and controller-managed climate. High yields, but the microclimate is hard to keep stable in spring.", "genx.4.cover": "Double glazing", "genx.4.heat": "Pipe heating + lighting", "genx.4.climate": "Climate computer", "genx.4.season": "Year-round", "genx.5.tab": "UltraClima", "genx.5.era": "Future technology", "genx.5.t": "Fifth generation — semi-closed greenhouses", "genx.5.p": "Air is conditioned in treatment units and delivered through tubes under the gutters, keeping the greenhouse at overpressure. An optimal microclimate whatever the weather outside.", "genx.5.cover": "Venlo glass + climate screens", "genx.5.heat": "Air via tubes + pipe heating", "genx.5.climate": "Full automation, overpressure", "genx.5.season": "Year-round, maximum yield"
    },
    ru: {
      'msg.ok': 'Спасибо! Заявка отправлена — скоро свяжемся с вами.', 'msg.err': 'Не удалось отправить. Позвоните нам: +998 95 00 12345', 'msg.invalid': 'Укажите имя и телефон', 'msg.demo': 'Демо-версия: после переноса на сайт форма будет отправлять заявки в Telegram.'
    }
  };

  var nodes = $$('[data-i18n]');
  var phNodes = $$('[data-i18n-ph]');
  nodes.forEach(function (el) { el.setAttribute('data-ru', el.innerHTML); });
  phNodes.forEach(function (el) { el.setAttribute('data-ru-ph', el.getAttribute('placeholder') || ''); });
  var lang = 'ru';

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.ru[key] || key;
  }

  function setLang(l) {
    if (!I18N[l]) l = 'ru';
    lang = l;
    document.documentElement.lang = l;
    nodes.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      el.innerHTML = l === 'ru' ? el.getAttribute('data-ru') : (I18N[l][k] || el.getAttribute('data-ru'));
    });
    phNodes.forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', l === 'ru' ? el.getAttribute('data-ru-ph') : (I18N[l][k] || el.getAttribute('data-ru-ph')));
    });
    $$('.lang button').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-lang') === l); });
    try { localStorage.setItem('gb-lang', l); } catch (e) { /* storage unavailable */ }
  }

  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  var initial = (location.search.match(/[?&]lang=(ru|uz|en)/) || [])[1];
  if (!initial) { try { initial = localStorage.getItem('gb-lang'); } catch (e) { initial = null; } }
  if (initial && initial !== 'ru') setLang(initial);

  /* ---------- header ---------- */
  var header = $('.header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 30); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = $('.burger');
  var nav = $('.header .nav');
  function closeNav() { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    if (open) header.classList.add('is-scrolled');
  });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', closeNav); });
  var navY = 0;
  window.addEventListener('scroll', function () {
    if (!nav.classList.contains('is-open')) { navY = window.scrollY; return; }
    if (Math.abs(window.scrollY - navY) > 80) closeNav();
  }, { passive: true });

  // active nav item while scrolling
  var links = $$('.header .nav a');
  var spyIds = ['solutions', 'projects', 'why', 'services', 'generations', 'contacts'];
  var spy = function () {
    var y = window.scrollY + window.innerHeight * 0.4, cur = '';
    spyIds.forEach(function (id) { var el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
    links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur); });
  };
  spy();
  window.addEventListener('scroll', spy, { passive: true });

  if ('IntersectionObserver' in window) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); rev.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(function (el, i) {
      el.style.transitionDelay = ((i % 5) * 70) + 'ms';
      rev.observe(el);
    });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- "Узнать больше" preselects the quiz ---------- */
  var whoSelect = $('#quiz select[name="who"]');
  $$('[data-who]').forEach(function (a) {
    a.addEventListener('click', function () { whoSelect.value = a.getAttribute('data-who'); });
  });

  /* ---------- modal ---------- */
  var modal = $('#modal');
  var lastFocus = null;
  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(function () { $('input[name="name"]', modal).focus(); }, 50);
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-modal-open]').forEach(function (b) { b.addEventListener('click', function () { closeNav(); openModal(); }); });
  $$('[data-modal-close]').forEach(function (b) { b.addEventListener('click', closeModal); });

  /* ---------- forms → telegram.php (same endpoint as the old site) ---------- */
  $$('form[action="telegram.php"]').forEach(function (form) {
    var status = $('.form-status', form);
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var nameF = form.elements.name, telF = form.elements.tel;
      var bad = false;
      [nameF, telF].forEach(function (f) {
        var invalid = f.value.trim().length < (f === telF ? 7 : 2);
        f.parentNode.classList.toggle('is-invalid', invalid);
        if (invalid) bad = true;
      });
      if (bad) { status.className = 'form-status is-err'; status.textContent = t('msg.invalid'); return; }

      if (/github\.io$/.test(location.hostname)) {
        status.className = 'form-status is-ok';
        status.textContent = t('msg.demo');
        return;
      }

      var btn = $('button[type="submit"]', form);
      btn.disabled = true;
      var data = new FormData(form);
      // the readable labels of selects are more useful in Telegram than raw values
      $$('select', form).forEach(function (s) {
        if (s.value) data.set(s.name, s.options[s.selectedIndex].text);
      });
      data.set('lang', lang);

      fetch(form.getAttribute('action'), { method: 'POST', body: data })
        .then(function (r) { if (!r.ok) throw new Error(r.status); })
        .then(function () {
          status.className = 'form-status is-ok';
          status.textContent = t('msg.ok');
          form.reset();
          if (typeof ym === 'function') { try { ym(window.YM_ID, 'reachGoal', 'lead'); } catch (e) { /* no metrika */ } }
        })
        .catch(function () {
          status.className = 'form-status is-err';
          status.textContent = t('msg.err');
        })
        .then(function () { btn.disabled = false; });
    });
    $$('input', form).forEach(function (i) {
      i.addEventListener('input', function () { i.parentNode.classList.remove('is-invalid'); });
    });
  });

  /* ---------- greenhouse generations timeline ---------- */
  var genx = $('[data-genx]');
  if (genx) {
    var gTabs = $$('.genx__tab', genx), gFigs = $$('.genx__fig', genx), gPanels = $$('.genx__panel', genx);
    var gFill = $('.genx__fill', genx), gNum = $('.js-gen-num', genx), gPhoto = $('.genx__photo img', genx);
    var gCur = 1, gTimer = null, gTouched = false;
    var setGen = function (n, focus) {
      gCur = n;
      gTabs.forEach(function (t) {
        var k = +t.getAttribute('data-gen'), on = k === n;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        t.classList.toggle('is-done', k < n);
        if (on && focus) t.focus();
      });
      gPanels.forEach(function (p) { p.hidden = +p.getAttribute('data-gen') !== n; });
      gFigs.forEach(function (f) {
        f.classList.remove('is-active');
        f.setAttribute('aria-hidden', String(+f.getAttribute('data-gen') !== n));
      });
      var fig = gFigs[n - 1];
      void fig.offsetWidth; // restart the drawing animation
      fig.classList.add('is-active');
      gFill.style.width = ((n - 1) / 4 * 100) + '%';
      gNum.textContent = '0' + n;
      gPhoto.style.opacity = 0;
      setTimeout(function () { gPhoto.src = 'assets/img/gen/gen-' + n + '.webp'; gPhoto.style.opacity = 1; }, 200);
    };
    var stopAuto = function () { gTouched = true; if (gTimer) { clearInterval(gTimer); gTimer = null; } };
    gTabs.forEach(function (t) {
      t.addEventListener('click', function () { stopAuto(); setGen(+t.getAttribute('data-gen')); });
    });
    $('.genx__tabs', genx).addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault(); stopAuto();
      setGen(((gCur - 1 + d + 5) % 5) + 1, true);
    });
    $('.genx__photo', genx).addEventListener('click', function () { stopAuto(); });
    setGen(1);

    // walk through 01 → 05 once when the block first comes into view, then stay on the 5th
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      var gObs = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        gObs.disconnect();
        if (gTouched) return;
        setGen(1);
        gTimer = setInterval(function () {
          if (gCur >= 5) { clearInterval(gTimer); gTimer = null; return; }
          setGen(gCur + 1);
        }, 3200);
      }, { threshold: 0.45 });
      gObs.observe($('.genx__stage', genx));
    }
  }

  /* ---------- gallery lightbox ---------- */
  var GALLERY = [
    ['s-3', 'proj.big.t'], ['s-1'], ['s-2', 'place.light'], ['s-4'], ['s-5'], ['s-6'], ['s-7'],
    ['toshkent-g-4', 'place.tashkent'], ['toshkent-g-14', 'place.tashkent'],
    ['kibray-g-13', 'place.kibray'], ['kibray-g-16', 'place.kibray'], ['kibray-g-4', 'place.kibray'], ['kibray-g-7', 'place.kibray'], ['kibray-g-1', 'place.kibray'], ['kibray-g-10', 'place.kibray'],
    ['pavlodar-g-19', 'place.pavlodar'], ['pavlodar-g-11', 'place.pavlodar'], ['pavlodar-g-15', 'place.pavlodar'], ['pavlodar-g-7', 'place.pavlodar'], ['pavlodar-g-4', 'place.pavlodar'],
    ['xorazm-g-8', 'place.xorazm'], ['xorazm-g-3', 'place.xorazm'], ['xorazm-g-5', 'place.xorazm'], ['xorazm-g-1', 'place.xorazm'],
    ['raduga-kdr-g-50'], ['raduga-kdr-g-32'], ['agro-in-vitro-g-21'],
    ['arxiv-g-1'], ['arxiv-g-3'], ['arxiv-g-6'], ['arxiv-g-9']
  ];
  var lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('figcaption', lb), idx = 0;
  function show(i) {
    idx = (i + GALLERY.length) % GALLERY.length;
    var g = GALLERY[idx];
    lbImg.src = 'assets/img/projects/' + g[0] + '.webp';
    var cap = g[1] ? t(g[1]) : '';
    if (lang === 'ru' && g[1]) {
      var src = $('[data-i18n="' + g[1] + '"]');
      cap = src ? src.getAttribute('data-ru') : '';
    }
    lbImg.alt = cap || 'Green Building';
    lbCap.textContent = (cap ? cap + ' · ' : '') + (idx + 1) + ' / ' + GALLERY.length;
  }
  function openLb(key) {
    var i = 0;
    GALLERY.forEach(function (g, n) { if (g[0] === key) i = n; });
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
  $$('[data-gallery-open]').forEach(function (b) {
    b.addEventListener('click', function () { openLb(b.getAttribute('data-gallery-open')); });
  });
  $('.lightbox__x', lb).addEventListener('click', closeLb);
  $('.lightbox__nav--prev', lb).addEventListener('click', function () { show(idx - 1); });
  $('.lightbox__nav--next', lb).addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  var touchX = null;
  lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!lb.hidden) closeLb(); else if (!modal.hidden) closeModal(); closeNav(); }
    if (!lb.hidden && e.key === 'ArrowRight') show(idx + 1);
    if (!lb.hidden && e.key === 'ArrowLeft') show(idx - 1);
  });

  $$('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
