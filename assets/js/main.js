/* ==========================================================================
   دليل فعاليات الجامعة الافتراضية — main.js
   ملف JavaScript واحد يخدم الصفحات الخمس: كل صفحة تحمل السمة data-page
   فيعمل الجزء الخاص بها فقط. بدون أي مكتبات سوى Bootstrap.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1) البيانات
     التواريخ نسبية لتاريخ اليوم (off = عدد الأيام من اليوم) كي يبقى
     الدليل حيّاً دائماً: يوجد دائماً "حدث اليوم" وفعاليات "هذا الأسبوع".
     ------------------------------------------------------------------ */
  var DAY = 864e5;
  var CATS = {
    music:    { label: 'موسيقى', icon: 'bi-music-note-beamed' },
    sport:    { label: 'رياضة',  icon: 'bi-trophy' },
    culture:  { label: 'ثقافة',  icon: 'bi-book' },
    family:   { label: 'عائلي',  icon: 'bi-house-heart' },
    tech:     { label: 'علمي وتقني', icon: 'bi-cpu' },
    academic: { label: 'أكاديمي', icon: 'bi-mortarboard' }
  };
  var ONLINE = 'عبر الإنترنت';

  var RAW = [
    { id: 1, title: 'ليلة الموسيقى الشرقية', cat: 'music', off: 0, len: 0, time: '19:00', end: '21:30', city: 'دمشق', venue: 'مسرح الجامعة', featured: true, added: -2, price: 'مجاني', seats: 120,
      short: 'أمسية طربية تجمع طلاب الجامعة وعازفيها مع أشهر المقطوعات الشرقية.',
      desc: ['تفتح الجامعة مسرحها لأمسية موسيقية يشارك فيها طلاب وخريجون يعزفون على العود والقانون والناي والإيقاع.',
             'يتضمن البرنامج مقطوعات كلاسيكية وأغاني من التراث، وفقرة مفتوحة للهواة الراغبين بالمشاركة بعد التسجيل المسبق.'] },
    { id: 2, title: 'ماراثون الجامعة 5K', cat: 'sport', off: 2, len: 0, time: '07:30', end: '10:30', city: 'دمشق', venue: 'الحديقة المركزية', featured: true, added: -5, price: 'مجاني', seats: 300,
      short: 'سباق جري جماعي مسافة 5 كم للطلاب والموظفين وعائلاتهم، مع جوائز رمزية.',
      desc: ['سباق ودّي بمسافة خمسة كيلومترات داخل الحديقة، مناسب لجميع المستويات من المبتدئين حتى المحترفين.',
             'تُوزَّع القمصان والميداليات على المشاركين عند خط النهاية، وتتوفر نقاط مياه وإسعاف أولي على طول المسار.'] },
    { id: 3, title: 'معرض الكتاب الطلابي', cat: 'culture', off: 3, len: 2, time: '10:00', end: '18:00', city: 'حلب', venue: 'قاعة المعارض – مركز الطلاب', featured: true, added: -1, price: 'مجاني', seats: 500,
      short: 'ثلاثة أيام من الكتب والتواقيع وورش القراءة بمشاركة دور نشر ومؤلفين شباب.',
      desc: ['يجمع المعرض دور نشر محلية ومكتبات جامعية ومؤلفين شباب في ثلاثة أيام مليئة بالقراءة والنقاش.',
             'تُقام خلال المعرض جلسات توقيع، وحلقات حوار مع الكتّاب، وركن لتبادل الكتب المستعملة بين الطلاب.'] },
    { id: 4, title: 'يوم العائلة الجامعي', cat: 'family', off: 4, len: 0, time: '11:00', end: '17:00', city: 'اللاذقية', venue: 'ساحة المركز الجامعي', featured: true, added: -3, price: 'مجاني', seats: 250,
      short: 'يوم مفتوح للعائلات: ألعاب للأطفال، عروض ترفيهية وأركان طعام وهدايا.',
      desc: ['يوم مفتوح تدعو فيه الجامعة أسر الطلاب للتعرّف على أجواء الدراسة والأنشطة الطلابية في جو عائلي مرح.',
             'ألعاب وعروض للأطفال، وأركان للحرف اليدوية، ومسابقات عائلية بجوائز، وجولة تعريفية في مرافق الجامعة.'] },
    { id: 5, title: 'هاكاثون الحلول الذكية', cat: 'tech', off: 5, len: 1, time: '09:00', end: '20:00', city: ONLINE, venue: 'منصة الجامعة الافتراضية', featured: true, added: -4, price: 'مجاني', seats: 150,
      short: 'يومان من البرمجة المكثفة لبناء حلول رقمية تخدم المجتمع الجامعي.',
      desc: ['تتنافس فرق من ثلاثة إلى خمسة طلاب على تصميم وبناء نموذج أولي لحل رقمي يخدم الطلاب أو المجتمع المحلي.',
             'يرافق الفرق مرشدون من أعضاء الهيئة التدريسية، وتُقيَّم المشاريع أمام لجنة تحكيم في ختام اليوم الثاني.'] },
    { id: 6, title: 'ورشة كتابة السيرة الذاتية', cat: 'academic', off: 1, len: 0, time: '16:00', end: '18:00', city: ONLINE, venue: 'غرفة اجتماعات افتراضية', featured: false, added: -6, price: 'مجاني', seats: 80,
      short: 'ورشة عملية تساعدك على كتابة سيرة ذاتية احترافية والاستعداد للمقابلات.',
      desc: ['ورشة تفاعلية يقدّمها مختصون في التوظيف تشرح عناصر السيرة الذاتية الناجحة وأخطاء الكتابة الشائعة.',
             'يحصل كل مشارك على قالب جاهز وتقييم سريع لسيرته الذاتية خلال الورشة.'] },
    { id: 7, title: 'أمسية شعرية: كلمات من القلب', cat: 'culture', off: 9, len: 0, time: '18:30', end: '20:30', city: 'حمص', venue: 'المركز الثقافي الجامعي', featured: false, added: -7, price: 'مجاني', seats: 90,
      short: 'أمسية يقرأ فيها طلاب وشعراء ضيوف نصوصهم في أجواء هادئة.',
      desc: ['أمسية شعرية مفتوحة يلقي فيها شعراء ضيوف وطلاب موهوبون نصوصهم، تتخللها فقرات موسيقية خفيفة.',
             'يمكن للراغبين بالمشاركة التسجيل قبل الأمسية بثلاثة أيام عبر صفحة اتصل بنا.'] },
    { id: 8, title: 'بطولة كرة الطاولة', cat: 'sport', off: 12, len: 1, time: '10:00', end: '16:00', city: 'حلب', venue: 'الصالة الرياضية', featured: false, added: -8, price: 'مجاني', seats: 64,
      short: 'بطولة فردية بنظام خروج المغلوب مع كأس وميداليات للفائزين.',
      desc: ['بطولة فردية بنظام خروج المغلوب مفتوحة لجميع الطلاب، تُلعب على طاولات قانونية بإشراف حكّام معتمدين.',
             'يتأهل الأوائل إلى بطولة الجامعات في نهاية الفصل، ويحصل الفائزون على الكؤوس والميداليات.'] },
    { id: 9, title: 'حفل التخرج السنوي', cat: 'academic', off: 21, len: 0, time: '17:00', end: '21:00', city: 'دمشق', venue: 'مسرح الجامعة', featured: false, added: -9, price: 'بدعوة', seats: 400,
      short: 'احتفال رسمي بالخريجين مع كلمات الضيوف وتوزيع الشهادات والجوائز.',
      desc: ['احتفال سنوي يكرّم دفعة الخريجين الجدد بحضور أسرهم وأعضاء الهيئة التدريسية وضيوف من القطاعين العام والخاص.',
             'يتضمن الحفل توزيع الشهادات وجوائز التفوق وعرضاً مصوراً لأبرز محطات الدفعة.'] },
    { id: 10, title: 'مسابقة الذكاء الاصطناعي للمبتدئين', cat: 'tech', off: 15, len: 0, time: '14:00', end: '17:00', city: ONLINE, venue: 'منصة الجامعة الافتراضية', featured: false, added: -10, price: 'مجاني', seats: 200,
      short: 'مسابقة أسئلة وتحديات عملية تعرّفك على أساسيات الذكاء الاصطناعي.',
      desc: ['مسابقة مفتوحة للمبتدئين تجمع بين الأسئلة النظرية وتحديات عملية بسيطة لا تحتاج خبرة برمجية سابقة.',
             'تُنشر الأسئلة على المنصة في موعد البدء، ويُعلَن الفائزون مباشرة بعد انتهاء الوقت.'] },
    { id: 11, title: 'مهرجان الألعاب العائلية', cat: 'family', off: 18, len: 1, time: '12:00', end: '19:00', city: 'دمشق', venue: 'حديقة الجامعة', featured: false, added: -11, price: 'مجاني', seats: 350,
      short: 'ألعاب جماعية ومسابقات ممتعة للصغار والكبار على مدى يومين.',
      desc: ['مهرجان ترفيهي يضم ألعاباً جماعية ومسابقات ذكاء وركناً للرسم والتلوين للأطفال.',
             'تتوفر أركان للمأكولات والمشروبات بأسعار رمزية، ويعود ريعها لصندوق دعم الطلاب.'] },
    { id: 12, title: 'حفل أصوات الجامعة (الكورال)', cat: 'music', off: 25, len: 0, time: '19:30', end: '21:30', city: 'حلب', venue: 'قاعة المؤتمرات', featured: false, added: -12, price: 'مجاني', seats: 220,
      short: 'حفل غنائي جماعي يقدّمه كورال الجامعة بمشاركة عازفين ضيوف.',
      desc: ['يقدّم كورال الجامعة، المؤلف من خمسين طالباً وطالبة، برنامجاً غنائياً متنوعاً بين الأغاني الوطنية والعالمية.',
             'يرافق الكورال فرقة موسيقية صغيرة، ويختتم الحفل بأغنية جماعية يشارك فيها الجمهور.'] },
    { id: 13, title: 'ندوة ريادة الأعمال للشباب', cat: 'academic', off: -4, len: 0, time: '15:00', end: '17:00', city: ONLINE, venue: 'غرفة اجتماعات افتراضية', featured: false, added: -14, price: 'مجاني', seats: 100,
      short: 'ندوة مع رواد أعمال ناجحين حول بناء المشاريع الناشئة (انتهت).',
      desc: ['استضافت الندوة ثلاثة رواد أعمال تحدثوا عن تجاربهم في تأسيس المشاريع الناشئة والتحديات التي واجهتهم.',
             'تتوفر مادة الندوة المصوّرة للطلاب المسجّلين عبر منصة الجامعة.'] },
    { id: 14, title: 'ملتقى الفنون التشكيلية', cat: 'culture', off: -9, len: 1, time: '10:00', end: '18:00', city: 'اللاذقية', venue: 'قاعة المعارض', featured: false, added: -16, price: 'مجاني', seats: 150,
      short: 'معرض ولقاءات مع فنانين تشكيليين شباب من طلاب الجامعة (انتهى).',
      desc: ['عرض الملتقى أعمالاً تشكيلية لطلاب وخريجين بين اللوحة والمنحوتة والتصوير الضوئي.',
             'تخلله لقاءات مفتوحة مع الفنانين وورشة تلوين للمبتدئين.'] }
  ];

  var today0 = new Date(); today0.setHours(0, 0, 0, 0);
  function dayOffset(n) { var d = new Date(today0); d.setDate(d.getDate() + n); return d; }
  function withTime(date, hhmm) {
    var d = new Date(date), p = hhmm.split(':'); d.setHours(+p[0], +p[1], 0, 0); return d;
  }
  var EVENTS = RAW.map(function (r) {
    var s = dayOffset(r.off), e = dayOffset(r.off + r.len);
    var n = { start: s, endDay: e, startAt: withTime(s, r.time), endAt: withTime(e, r.end), added: dayOffset(r.added) };
    for (var k in r) { if (k !== 'added') n[k] = r[k]; }
    n.img = 'assets/img/' + r.cat + '-' + (1 + (r.id % 3)) + '.svg';
    n.gallery = [1, 2, 3].map(function (i) { return 'assets/img/' + r.cat + '-' + i + '.svg'; });
    n.map = 'assets/img/map-' + (1 + (r.id % 6)) + '.svg';
    return n;
  });

  /* ------------------------------------------------------------------
     2) أدوات مساعدة
     ------------------------------------------------------------------ */
  var NF = 'ar-u-nu-latn'; // أرقام لاتينية داخل نص عربي لسهولة القراءة
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(d, o) { return new Intl.DateTimeFormat(NF, o).format(d); }
  function dateText(e) {
    var o = { weekday: 'long', day: 'numeric', month: 'long' };
    if (e.len === 0) return fmt(e.start, o);
    return fmt(e.start, { day: 'numeric', month: 'long' }) + ' – ' + fmt(e.endDay, { day: 'numeric', month: 'long' });
  }
  function shortDate(e) { return fmt(e.start, { day: 'numeric', month: 'short' }); }
  function status(e) {
    if (e.endDay < today0) return 'past';
    if (e.start <= today0 && today0 <= e.endDay) return 'today';
    return 'upcoming';
  }
  function byId(id) { return EVENTS.filter(function (e) { return e.id === id; })[0]; }
  function byDate(a, b) { return a.start - b.start; }
  // القادمة أولاً بترتيب الأقرب، ثم المنتهية في آخر القائمة
  function upcomingFirst(a, b) { return ((status(a) === 'past') - (status(b) === 'past')) || (status(a) === 'past' ? b.start - a.start : a.start - b.start); }
  function statusBadge(e) {
    var s = status(e);
    if (s === 'today') return '<span class="badge status-badge bg-danger"><i class="bi bi-broadcast"></i> اليوم</span>';
    if (s === 'past') return '<span class="badge status-badge bg-secondary">انتهت</span>';
    return '';
  }
  function catBadge(e) {
    var c = CATS[e.cat];
    return '<span class="badge cat-badge cat-' + e.cat + '"><i class="bi ' + c.icon + '"></i> ' + c.label + '</span>';
  }
  function store(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (x) { /* التخزين غير متاح */ } }
  function load(k) { try { return localStorage.getItem(k); } catch (x) { return null; } }

  /* بطاقة فعالية (Bootstrap Card) تُستعمل في الرئيسية والفعاليات والفعاليات ذات الصلة */
  function eventCard(e, cls) {
    return '<div class="' + (cls || 'col-12 col-md-6 col-lg-4') + '">' +
      '<article class="card event-card h-100' + (status(e) === 'past' ? ' is-past' : '') + '">' +
      '<div class="card-img-wrap"><img class="card-img-top" src="' + e.img + '" alt="صورة تعبّر عن فعالية ' + esc(e.title) + '" loading="lazy">' +
      '<div class="card-badges">' + catBadge(e) + statusBadge(e) + '</div></div>' +
      '<div class="card-body d-flex flex-column">' +
      '<h3 class="h5 card-title">' + esc(e.title) + '</h3>' +
      '<ul class="event-meta list-unstyled mb-2">' +
      '<li><i class="bi bi-calendar-event"></i> ' + dateText(e) + '</li>' +
      '<li><i class="bi bi-clock"></i> ' + e.time + ' – ' + e.end + '</li>' +
      '<li><i class="bi ' + (e.city === ONLINE ? 'bi-wifi' : 'bi-geo-alt') + '"></i> ' + esc(e.city === ONLINE ? ONLINE : e.city + ' – ' + e.venue) + '</li></ul>' +
      '<p class="card-text text-body-secondary small">' + esc(e.short) + '</p>' +
      '<a class="btn btn-primary mt-auto" href="event.html?id=' + e.id + '">التفاصيل <i class="bi bi-arrow-left"></i></a>' +
      '</div></article></div>';
  }

  /* ------------------------------------------------------------------
     3) عناصر مشتركة: الوضع الداكن، زر الصعود، الصفحة الحالية
     ------------------------------------------------------------------ */
  function initCommon() {
    // الوضع الداكن (Bonus): تبديل خاصية data-bs-theme المدعومة في Bootstrap 5.3
    var root = document.documentElement, btn = $('#themeToggle');
    function paint() {
      var dark = root.getAttribute('data-bs-theme') === 'dark';
      if (btn) { btn.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>'; btn.setAttribute('aria-label', dark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'); }
    }
    if (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-bs-theme', next); store('uv_theme', next); paint();
      });
    }
    paint();

    // زر العودة للأعلى (Bonus)
    var up = $('#scrollTop');
    if (up) {
      window.addEventListener('scroll', function () { up.classList.toggle('show', window.scrollY > 320); }, { passive: true });
      up.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
    var y = $('#year'); if (y) y.textContent = fmt(new Date(), { year: 'numeric' });
  }

  /* ------------------------------------------------------------------
     4) الصفحة الرئيسية
     ------------------------------------------------------------------ */
  function initHome() {
    var upcoming = EVENTS.filter(function (e) { return status(e) !== 'past'; }).sort(byDate);

    // (أ) السلايدر: فعاليات بارزة قادمة (Bootstrap Carousel يُبنى من البيانات)
    var feat = upcoming.filter(function (e) { return e.featured; }).slice(0, 4);
    var inner = $('#featuredInner'), ind = $('#featuredIndicators');
    if (inner && feat.length) {
      inner.innerHTML = feat.map(function (e, i) {
        return '<div class="carousel-item' + (i ? '' : ' active') + '" data-bs-interval="5000">' +
          '<img src="' + e.img + '" class="d-block w-100" alt="صورة فعالية ' + esc(e.title) + '">' +
          '<div class="carousel-caption-box"><div class="mb-2">' + catBadge(e) + statusBadge(e) + '</div>' +
          '<h3 class="h2">' + esc(e.title) + '</h3>' +
          '<p class="mb-3 d-none d-md-block">' + esc(e.short) + '</p>' +
          '<p class="small mb-3"><i class="bi bi-calendar-event"></i> ' + dateText(e) + ' &nbsp; <i class="bi bi-geo-alt"></i> ' + esc(e.city) + '</p>' +
          '<a class="btn btn-warning" href="event.html?id=' + e.id + '">تفاصيل الفعالية</a></div></div>';
      }).join('');
      ind.innerHTML = feat.map(function (e, i) {
        return '<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="' + i + '"' + (i ? '' : ' class="active" aria-current="true"') + ' aria-label="الشريحة ' + (i + 1) + '"></button>';
      }).join('');
    }

    // (ب) بطاقة "الحدث اليوم" + العد التنازلي لأقرب فعالية (Creativity)
    var todayEv = EVENTS.filter(function (e) { return status(e) === 'today'; })[0];
    var box = $('#todayBox');
    if (box && todayEv) {
      box.innerHTML = '<div class="today-card"><span class="pulse"></span><div><div class="small text-uppercase opacity-75">الحدث اليوم</div>' +
        '<a class="h5 stretched-link text-white text-decoration-none" href="event.html?id=' + todayEv.id + '">' + esc(todayEv.title) + '</a>' +
        '<div class="small opacity-75">' + todayEv.time + ' · ' + esc(todayEv.city) + '</div></div></div>';
    } else if (box) { box.hidden = true; }

    var cd = $('#countdown');
    var next = EVENTS.filter(function (e) { return e.startAt > new Date(); }).sort(function (a, b) { return a.startAt - b.startAt; })[0];
    if (cd && next) {
      $('#cdTitle').textContent = next.title; $('#cdLink').href = 'event.html?id=' + next.id;
      var tick = function () {
        var ms = Math.max(0, next.startAt - new Date()), s = Math.floor(ms / 1000);
        var v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
        for (var k in v) { var el = $('#cd-' + k); if (el) el.textContent = String(v[k]).padStart(2, '0'); }
      };
      tick(); setInterval(tick, 1000);
    } else if (cd) { cd.hidden = true; }

    // (ج) التصنيفات السريعة: روابط إلى صفحة الفعاليات مع فلترة جاهزة
    var cats = $('#quickCats');
    if (cats) {
      var counts = {}; EVENTS.forEach(function (e) { counts[e.cat] = (counts[e.cat] || 0) + 1; });
      cats.innerHTML = Object.keys(CATS).map(function (k) {
        return '<a class="cat-pill cat-' + k + '" href="events.html?cat=' + k + '"><i class="bi ' + CATS[k].icon + '"></i> ' + CATS[k].label +
          ' <span class="badge text-bg-light ms-1">' + counts[k] + '</span></a>';
      }).join('');
    }

    // (د) أحدث الفعاليات المضافة (6 بطاقات)
    var grid = $('#latestGrid');
    if (grid) grid.innerHTML = EVENTS.slice().sort(function (a, b) { return b.added - a.added; }).slice(0, 6).map(function (e) { return eventCard(e); }).join('');

    // (هـ) أرقام سريعة
    var st = $('#statEvents'); if (st) st.textContent = upcoming.length;
  }

  /* ------------------------------------------------------------------
     5) صفحة الفعاليات: بحث + فلترة (تصنيف/تاريخ/موقع) + حفظ التفضيل
     ------------------------------------------------------------------ */
  function initEvents() {
    var f = { q: '', cat: '', loc: '', from: '', to: '', upcoming: false };
    var params = new URLSearchParams(location.search);
    var el = { q: $('#fSearch'), cat: $('#fCat'), loc: $('#fLoc'), from: $('#fFrom'), to: $('#fTo'), up: $('#fUpcoming'), chips: $('#catChips'), grid: $('#eventsGrid'), count: $('#resultCount'), empty: $('#emptyAlert'), reset: $('#fReset') };

    el.cat.innerHTML = '<option value="">كل التصنيفات</option>' + Object.keys(CATS).map(function (k) { return '<option value="' + k + '">' + CATS[k].label + '</option>'; }).join('');
    var locs = []; EVENTS.forEach(function (e) { if (locs.indexOf(e.city) < 0) locs.push(e.city); });
    el.loc.innerHTML = '<option value="">كل المواقع</option>' + locs.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('');
    el.chips.innerHTML = '<button type="button" class="cat-pill active" data-cat="">الكل</button>' + Object.keys(CATS).map(function (k) {
      return '<button type="button" class="cat-pill cat-' + k + '" data-cat="' + k + '"><i class="bi ' + CATS[k].icon + '"></i> ' + CATS[k].label + '</button>'; }).join('');

    // التصنيف الأولي: من الرابط ثم من التفضيل المحفوظ (Bonus localStorage)
    var initCat = params.get('cat') || load('uv_cat') || '';
    if (CATS[initCat]) f.cat = initCat;
    if (params.get('q')) f.q = params.get('q');
    el.q.value = f.q; el.cat.value = f.cat;

    function inRange(e) {
      var ok = true;
      if (f.from) ok = ok && e.endDay >= new Date(f.from + 'T00:00:00');
      if (f.to) ok = ok && e.start <= new Date(f.to + 'T00:00:00');
      return ok;
    }
    function render() {
      var q = f.q.trim().toLowerCase();
      var list = EVENTS.filter(function (e) {
        if (f.cat && e.cat !== f.cat) return false;
        if (f.loc && e.city !== f.loc) return false;
        if (f.upcoming && status(e) === 'past') return false;
        if (!inRange(e)) return false;
        if (q && (e.title + ' ' + e.short + ' ' + e.venue + ' ' + e.city + ' ' + CATS[e.cat].label).toLowerCase().indexOf(q) < 0) return false;
        return true;
      }).sort(upcomingFirst);
      el.grid.innerHTML = list.map(function (e) { return eventCard(e); }).join('');
      el.empty.hidden = list.length > 0;
      el.count.textContent = 'عرض ' + list.length + ' من أصل ' + EVENTS.length + ' فعالية';
      $$('.cat-pill', el.chips).forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-cat') === f.cat); });
    }
    function setCat(c) { f.cat = c; el.cat.value = c; store('uv_cat', c || null); render(); }

    el.q.addEventListener('input', function () { f.q = el.q.value; render(); });
    el.cat.addEventListener('change', function () { setCat(el.cat.value); });
    el.loc.addEventListener('change', function () { f.loc = el.loc.value; render(); });
    el.from.addEventListener('change', function () { f.from = el.from.value; render(); });
    el.to.addEventListener('change', function () { f.to = el.to.value; render(); });
    el.up.addEventListener('change', function () { f.upcoming = el.up.checked; render(); });
    el.chips.addEventListener('click', function (ev) { var b = ev.target.closest('.cat-pill'); if (b) setCat(b.getAttribute('data-cat')); });
    el.reset.addEventListener('click', function () {
      f = { q: '', cat: '', loc: '', from: '', to: '', upcoming: false };
      el.q.value = ''; el.cat.value = ''; el.loc.value = ''; el.from.value = ''; el.to.value = ''; el.up.checked = false;
      store('uv_cat', null); render();
    });
    $('#searchForm').addEventListener('submit', function (ev) { ev.preventDefault(); });
    render();
  }

  /* ------------------------------------------------------------------
     6) صفحة تفاصيل الفعالية
     ------------------------------------------------------------------ */
  function pad(n) { return String(n).padStart(2, '0'); }
  function icsStamp(d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00'; }
  function icsText(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }

  function showToast(msg) {
    var t = $('#appToast'); if (!t) return;
    $('.toast-body', t).textContent = msg;
    bootstrap.Toast.getOrCreateInstance(t, { delay: 3000 }).show();
  }

  function initEvent() {
    var id = parseInt(new URLSearchParams(location.search).get('id'), 10);
    var e = byId(id), wrap = $('#eventWrap'), missing = $('#eventMissing');
    if (!e) { wrap.hidden = true; missing.hidden = false; return; }
    missing.hidden = true; wrap.hidden = false;
    document.title = e.title + ' | دليل فعاليات الجامعة الافتراضية';

    $('#evTitle').textContent = e.title;
    $('#evBreadTitle').textContent = e.title;
    $('#evBadges').innerHTML = catBadge(e) + statusBadge(e);
    $('#evImage').src = e.img; $('#evImage').alt = 'صورة الفعالية: ' + e.title;
    $('#evDate').textContent = dateText(e);
    $('#evTime').textContent = e.time + ' – ' + e.end;
    $('#evPlace').textContent = e.city === ONLINE ? e.venue + ' (' + ONLINE + ')' : e.city + ' – ' + e.venue;
    $('#evPrice').textContent = e.price;
    $('#evSeats').textContent = e.seats + ' مقعداً';
    $('#evDesc').innerHTML = e.desc.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    $('#evMap').src = e.map; $('#evMapCaption').textContent = 'خريطة توضيحية ثابتة لموقع: ' + e.venue;

    // معرض صور صغير + نافذة منبثقة لتكبير الصورة (Modal)
    $('#evGallery').innerHTML = e.gallery.map(function (g, i) {
      return '<div class="col-4"><button type="button" class="gallery-btn" data-img="' + g + '" aria-label="تكبير الصورة ' + (i + 1) + '">' +
        '<img src="' + g + '" class="img-fluid rounded" alt="صورة ' + (i + 1) + ' من معرض فعالية ' + esc(e.title) + '" loading="lazy"></button></div>';
    }).join('');
    var gm = $('#galleryModal');
    $('#evGallery').addEventListener('click', function (ev) {
      var b = ev.target.closest('.gallery-btn'); if (!b) return;
      $('#galleryBig').src = b.getAttribute('data-img');
      bootstrap.Modal.getOrCreateInstance(gm).show();
    });

    // زر "أضف للتقويم": توليد ملف iCalendar (.ics) وتنزيله
    $('#btnCalendar').addEventListener('click', function () {
      var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//UV Events Guide//AR', 'BEGIN:VEVENT',
        'UID:uv-event-' + e.id + '@events-guide', 'DTSTAMP:' + icsStamp(new Date()),
        'DTSTART:' + icsStamp(e.startAt), 'DTEND:' + icsStamp(e.endAt),
        'SUMMARY:' + icsText(e.title), 'LOCATION:' + icsText(e.venue + ' - ' + e.city), 'DESCRIPTION:' + icsText(e.short), 'END:VEVENT', 'END:VCALENDAR'];
      var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'event-' + e.id + '.ics';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 500);
      showToast('تم تنزيل ملف التقويم، افتحه لإضافة الفعالية.');
    });

    // زر "شارك": مشاركة النظام إن وُجدت وإلا نسخ الرابط
    $('#btnShare').addEventListener('click', function () {
      var url = location.href;
      if (navigator.share) { navigator.share({ title: e.title, text: e.short, url: url }).catch(function () {}); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { showToast('تم نسخ رابط الفعالية.'); }, function () { window.prompt('انسخ الرابط:', url); });
      } else { window.prompt('انسخ الرابط:', url); }
    });

    // فعاليات ذات صلة: من التصنيف نفسه أولاً ثم الأقرب موعداً
    var rel = EVENTS.filter(function (x) { return x.id !== e.id && status(x) !== 'past'; })
      .sort(function (a, b) { return (b.cat === e.cat) - (a.cat === e.cat) || a.start - b.start; }).slice(0, 3);
    $('#relatedGrid').innerHTML = rel.map(function (x) { return eventCard(x, 'col-12 col-md-4'); }).join('');

    // نافذة الحجز الوهمي (Bonus) + تحقق
    var form = $('#bookForm'), done = $('#bookDone'), past = status(e) === 'past';
    $('#bookTitle').textContent = 'حجز مقعد في: ' + e.title;
    if (past) { $('#btnBook').disabled = true; $('#btnBook').textContent = 'انتهت الفعالية'; }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = $('#bkName'), mail = $('#bkEmail'), n = $('#bkSeats');
      var ok1 = name.value.trim().length >= 3, ok2 = emailOk(mail.value), ok3 = +n.value >= 1 && +n.value <= 5;
      name.classList.toggle('is-invalid', !ok1); mail.classList.toggle('is-invalid', !ok2); n.classList.toggle('is-invalid', !ok3);
      if (!(ok1 && ok2 && ok3)) return;
      var list = []; try { list = JSON.parse(load('uv_bookings') || '[]'); } catch (x) { list = []; }
      list.push({ id: e.id, name: name.value.trim(), seats: +n.value }); store('uv_bookings', JSON.stringify(list));
      form.hidden = true; done.hidden = false;
      $('#bookDoneText').textContent = 'تم حجز ' + n.value + ' مقعد/مقاعد باسم ' + name.value.trim() + ' (حجز تجريبي لأغراض العرض).';
    });
    $('#bookModal').addEventListener('hidden.bs.modal', function () { form.reset(); form.hidden = false; done.hidden = true; $$('.is-invalid', form).forEach(function (x) { x.classList.remove('is-invalid'); }); });
  }

  /* ------------------------------------------------------------------
     7) نموذج اتصل بنا: تحقق من الواجهة الأمامية + Bootstrap Alerts
     ------------------------------------------------------------------ */
  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()); }

  function initContact() {
    var form = $('#contactForm'), box = $('#formAlert');
    var f = { name: $('#cName'), email: $('#cEmail'), subject: $('#cSubject'), msg: $('#cMsg') };
    var rules = {
      name:    function (v) { return v.trim().length >= 3; },
      email:   emailOk,
      subject: function (v) { return v !== ''; },
      msg:     function (v) { return v.trim().length >= 10; }
    };
    function check(k, show) {
      var ok = rules[k](f[k].value);
      if (show) { f[k].classList.toggle('is-invalid', !ok); f[k].classList.toggle('is-valid', ok); }
      return ok;
    }
    function alertBox(type, icon, html) {
      box.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible fade show d-flex align-items-start gap-2" role="alert"><i class="bi ' + icon + ' fs-5"></i><div>' + html +
        '</div><button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="إغلاق"></button></div>';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    Object.keys(f).forEach(function (k) {
      f[k].addEventListener('blur', function () { check(k, true); });
      f[k].addEventListener('input', function () { if (f[k].classList.contains('is-invalid') || f[k].classList.contains('is-valid')) check(k, true); if (k === 'msg') count(); });
    });
    function count() { $('#msgCount').textContent = f.msg.value.length + ' / 500'; }
    count();
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var bad = Object.keys(f).filter(function (k) { return !check(k, true); });
      if (bad.length) {
        var names = { name: 'الاسم', email: 'البريد الإلكتروني', subject: 'الموضوع', msg: 'الرسالة' };
        alertBox('danger', 'bi-exclamation-triangle', '<strong>تعذّر الإرسال.</strong> يرجى تصحيح الحقول التالية: ' + bad.map(function (k) { return names[k]; }).join('، ') + '.');
        f[bad[0]].focus(); return;
      }
      alertBox('success', 'bi-check-circle', '<strong>شكراً ' + esc(f.name.value.trim()) + '!</strong> وصلتنا رسالتك وسنردّ عليك قريباً. <span class="small text-body-secondary">(نموذج تجريبي: لا تُرسَل البيانات إلى أي خادم.)</span>');
      form.reset(); $$('.is-valid, .is-invalid', form).forEach(function (x) { x.classList.remove('is-valid', 'is-invalid'); }); count();
    });
  }

  /* ------------------------------------------------------------------
     8) صفحة عن الدليل: عدّادات متحركة بسيطة
     ------------------------------------------------------------------ */
  function initAbout() {
    var upcoming = EVENTS.filter(function (e) { return status(e) !== 'past'; }).length;
    var vals = { cntEvents: EVENTS.length, cntUpcoming: upcoming, cntCities: 5, cntCats: Object.keys(CATS).length };
    Object.keys(vals).forEach(function (id) {
      var node = $('#' + id); if (!node) return; var target = vals[id], cur = 0;
      var t = setInterval(function () { cur += Math.max(1, Math.round(target / 20)); if (cur >= target) { cur = target; clearInterval(t); } node.textContent = cur; }, 40);
    });
  }

  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initCommon();
    var page = document.body.getAttribute('data-page');
    var map = { home: initHome, events: initEvents, event: initEvent, about: initAbout, contact: initContact };
    if (map[page]) map[page]();
  });
})();
