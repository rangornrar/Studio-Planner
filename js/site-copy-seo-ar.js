window.SitePublicCopy = window.SitePublicCopy || {};
window.SitePublicCopy.ar = window.SitePublicCopy.ar || { common: {}, pages: {} };
window.SitePublicCopy.ar.pages = window.SitePublicCopy.ar.pages || {};
window.SitePublicCopy.ar.pages.index = window.SitePublicCopy.ar.pages.index || {};
window.SitePublicCopy.ar.pages.index.sections = window.SitePublicCopy.ar.pages.index.sections || {};

Object.assign(window.SitePublicCopy.ar.pages.index.sections, {
  seoPagesHeadContent: `<p class="eyebrow">صفحات SEO</p><h2>ثلاث صفحات موجهة لعمليات البحث ذات النية الواضحة.</h2><p>هذه الصفحات تجيب عن احتياجات عملية وتحوّل الزائر مباشرة إلى التطبيق مع الإعداد الجاهز المناسب.</p>`,
  seoPagesCardsContent: `<article class="info-card"><h3>مخطط إضاءة بورتريه</h3><p>قاعدة بسيطة لبورتريه الاستوديو مع ضوء رئيسي بزاوية 45 درجة وتحكم في الـ fill ومخطط قابل للطباعة.</p><div class="quick-links"><a href="schema-eclairage-portrait.html">اقرأ الصفحة</a><a href="app.html?preset=portrait-soft-45">افتح الإعداد</a></div></article><article class="info-card"><h3>مخطط استوديو بودوار</h3><p>أثاث وأجواء وخلفية وحركة وإضاءة لتحضير جلسة بودوار داخل الاستوديو.</p><div class="quick-links"><a href="plan-studio-boudoir.html">اقرأ الصفحة</a><a href="app.html?preset=boudoir-parabolic">افتح الإعداد</a></div></article><article class="info-card"><h3>Lighting Diagram للمقابلة</h3><p>إعداد فيديو واضح داخل الاستوديو للمقابلات والبودكاست المصور والمشاريع corporate.</p><div class="quick-links"><a href="lighting-diagram-interview.html">اقرأ الصفحة</a><a href="app.html?preset=interview-led">افتح الإعداد</a></div></article>`
});

window.SitePublicCopy.ar.pages.portraitSchema = {
  meta: {
    title: "مخطط إضاءة بورتريه | مخطط استوديو تصوير",
    description: "كيف تحضّر مخطط إضاءة بورتريه داخل الاستوديو: الضوء الرئيسي والـ fill والانعكاس والمسافات ومخطط قابل للطباعة.",
    ogTitle: "مخطط إضاءة بورتريه | Lumiere Studio",
    ogDescription: "طريقة بسيطة لبناء مخطط إضاءة بورتريه وتحويله إلى مخطط استوديو تصوير واضح.",
    twitterTitle: "مخطط إضاءة بورتريه | Lumiere Studio",
    twitterDescription: "قاعدة بورتريه استوديو سهلة التطبيق والطباعة."
  },
  topCopy: "دليل عملي لبناء مخطط إضاءة بورتريه واضح قبل جلسة التصوير.",
  brandTagline: "إضاءة بورتريه",
  navItems: ["home", "app", "guide", "presets", "faq"],
  footerItems: ["home", "app", "presets", "faq"],
  sections: {
    heroCopyContent: `<p class="eyebrow">مخطط إضاءة بورتريه</p><h1>كيف تحضّر إعداد إضاءة بورتريه نظيفاً وبسيطاً وسهل التنفيذ للفريق.</h1><p>مخطط إضاءة البورتريه الجيد لا يقتصر على فكرة ضوء جميلة فقط. بل يجب أن يوضح أيضاً مكان الضوء الرئيسي والـ fill والكاميرا والموضوع وأدوات التحكم حتى يستطيع الفريق تنفيذ البلاتوه بثقة.</p><div class="hero-actions"><a class="button-link primary" href="app.html?preset=portrait-soft-45">افتح إعداد البورتريه</a><a class="button-link secondary" href="guide.html">اقرأ الدليل الكامل</a></div><div class="hero-points"><div class="point-chip"><strong>الضوء الرئيسي</strong>استخدم مصدراً كبيراً عند زاوية 45 درجة للحصول على نتيجة ناعمة ومتعددة الاستخدامات.</div><div class="point-chip"><strong>الـ fill والتباين</strong>أضف عاكساً أو negative fill بحسب العمق الذي تريده.</div><div class="point-chip"><strong>مخطط الاستوديو</strong>أظهر المسافات والمحاور لتفادي التخمين أثناء التركيب.</div><div class="point-chip"><strong>الطباعة</strong>شارك المنظور العلوي كمخطط إضاءة عملي.</div></div>`,
    heroVisualContent: `<figure><img src="docs/screenshots/studio-portrait.png" alt="مخطط إضاءة بورتريه تم تحضيره في Lumiere Studio"><figcaption class="hero-caption">مثال لإعداد بورتريه مع المصدر الرئيسي والكاميرا وأدوات التحكم في الضوء ظاهرة بوضوح في المخطط.</figcaption></figure>`,
    firstGridContent: `<article class="article-card"><p class="eyebrow">1. ابدأ ببساطة</p><h2>مصدر واحد في مكان صحيح يكفي غالباً.</h2><p>لبورتريه كلاسيكي، ابدأ بأوكتابوكس أو سوفت بوكس مستطيل كبير يوضع على زاوية تقارب 45 درجة من الموضوع وعلى ارتفاع أعلى قليلاً من العينين. هذه القاعدة تناسب كثيراً من أعمال البورتريه corporate أو التحريري أو الهيدشوت.</p></article><article class="article-card"><p class="eyebrow">2. تحكم في الـ fill</p><h2>عاكس أو negative fill بحسب النية البصرية.</h2><p>يمكن لعاكس بسيط أن يفتح الظلال. وفي المقابل، يمكن لـ flag أو panel أسود أن يزيد التباين ويبرز ملامح الوجه. يجب أن يظهر هذا العنصر بوضوح في المخطط لأنه يغيّر النتيجة النهائية بشكل كبير.</p></article><article class="article-card"><p class="eyebrow">3. نظّم البلاتوه</p><h2>المخطط يجب أن يساعد أيضاً على التركيب السريع.</h2><p>مخطط الإضاءة المفيد لا يوضح الضوء فقط، بل الكاميرا والخلفية ومكان الموضوع ومسارات الحركة أيضاً. هذا ما يحوّل الفكرة الضوئية إلى مخطط استوديو تصوير حقيقي.</p></article>`,
    secondGridContent: `<article class="article-card"><p class="eyebrow">لمن هذه الصفحة</p><h2>بورتريه وcorporate وbeauty خفيف وأعمال تحريرية.</h2><p>هذه الصفحة مفيدة إذا كنت تبحث عن قاعدة قوية لبورتريه استوديو بسيط وسريع التنفيذ من دون خسارة الوضوح أو جودة النتيجة.</p></article><article class="article-card"><p class="eyebrow">البحث المستهدف</p><h2>مخطط إضاءة بورتريه، مخطط استوديو تصوير، Portrait lighting diagram.</h2><p>الهدف هو الإجابة مباشرة عن العبارات التي قد يبحث عنها مصور أو مساعد أو استوديو قبل جلسة بورتريه داخلية.</p></article><article class="article-card"><p class="eyebrow">ابدأ الآن</p><h2>حمّل الإعداد مباشرة داخل التطبيق.</h2><p>ابدأ من إعداد البورتريه الناعم، ثم عدّل المسافة عن الخلفية أو حجم المعدّل واطبع المخطط النهائي.</p><p><a class="button-link primary" href="app.html?preset=portrait-soft-45">جرّب إعداد البورتريه</a></p></article>`
  },
  footerCopy: "Lumiere Studio · مخطط إضاءة بورتريه ومخطط استوديو تصوير."
};

window.SitePublicCopy.ar.pages.boudoirPlan = {
  meta: {
    title: "مخطط استوديو بودوار | إعداد بودوار",
    description: "كيف تحضّر مخطط استوديو بودوار مع الأثاث والخلفية والضوء الملتف والفصل ومسارات الحركة ومكان الكاميرا.",
    ogTitle: "مخطط استوديو بودوار | Lumiere Studio",
    ogDescription: "مخطط بودوار واضح لتحضير الأثاث والإضاءة والخلفية والحركة قبل الجلسة.",
    twitterTitle: "مخطط استوديو بودوار | Lumiere Studio",
    twitterDescription: "قاعدة بودوار داخل الاستوديو مع أثاث وأجواء وضوء flattering."
  },
  topCopy: "تحضير إعداد بودوار داخل الاستوديو: الأجواء والأثاث والحركة والإضاءة.",
  brandTagline: "إعداد بودوار",
  navItems: ["home", "app", "guide", "presets", "faq"],
  footerItems: ["home", "app", "presets", "faq"],
  sections: {
    heroCopyContent: `<p class="eyebrow">مخطط استوديو تصوير</p><h1>كيف تبني مخطط استوديو بودوار متماسكاً وأنيقاً وسهل التنفيذ.</h1><p>يعتمد إعداد البودوار على الجو العام بقدر اعتماده على التقنية. يجب أن يوضح المخطط مكان الأثاث وبعد الخلفية وموقع الكاميرا ومساحات الحركة والضوء الرئيسي حتى تبقى الجلسة سلسة ومطمئنة.</p><div class="hero-actions"><a class="button-link primary" href="app.html?preset=boudoir-parabolic">افتح إعداد البودوار</a><a class="button-link secondary" href="presets.html">تصفّح الإعدادات</a></div><div class="hero-points"><div class="point-chip"><strong>الأثاث ظاهر</strong>الكرسي أو المقعد أو المرآة يجب أن يكون جزءاً من المخطط من البداية.</div><div class="point-chip"><strong>ضوء ملتف</strong>معدّل كبير أو مصدر parabolic يساعد على نتيجة ناعمة ومجاملة للشكل.</div><div class="point-chip"><strong>الخلفية والديكور</strong>اختيار الخلفية يؤثر مباشرة في الإحساس بالحميمية أو الفخامة أو التباين.</div><div class="point-chip"><strong>احترام الموضوع</strong>الترتيب الواضح يقلل التردد أثناء الجلسة.</div></div>`,
    heroVisualContent: `<figure><img src="docs/screenshots/studio-boudoir.png" alt="مخطط استوديو بودوار في Lumiere Studio"><figcaption class="hero-caption">مثال لإعداد بودوار مع أثاث وخلفية ملونة ومصدر رئيسي موضوع بوضوح.</figcaption></figure>`,
    firstGridContent: `<article class="article-card"><p class="eyebrow">1. اصنع الجو</p><h2>الخلفية والأثاث جزء من المخطط.</h2><p>في جلسات البودوار لا يُعد الديكور تفصيلاً صغيراً. من مرحلة المخطط يجب التفكير في لون الخلفية ووجود كرسي أو مقعد وكيف ستؤطر هذه العناصر الموضوع في الصورة النهائية.</p></article><article class="article-card"><p class="eyebrow">2. اترك مساحة</p><h2>الترتيب يجب أن يطمئن الموضوع ويدعم تدفق الجلسة.</h2><p>يحتاج مخطط البودوار إلى مساحة للتوجيه والحركة وتبديل الوضعيات. وهذا يتطلب إعداداً نظيفاً من دون حوامل موضوعة بشكل سيئ أو كاميرا قريبة جداً من الأثاث.</p></article><article class="article-card"><p class="eyebrow">3. اختر المصدر المناسب</p><h2>الضوء الناعم لكن المشكّل يعمل غالباً بشكل ممتاز.</h2><p>يساعد مصدر كبير أو معدّل parabolic على إبقاء البشرة جميلة مع الحفاظ على تشكيل الجسم. يجب أن يجعل المخطط اتجاه الضوء وعلاقته بالديكور واضحين فوراً.</p></article>`,
    secondGridContent: `<article class="article-card"><p class="eyebrow">لمن هذه الصفحة</p><h2>لمصوري البودوار والبورتريه الحميمي والأعمال التحريرية الحسّية.</h2><p>هذه الصفحة مناسبة للمصورين الذين يريدون تجهيز إعداد واضح قبل الجلسة مع الحفاظ على إطار مهني ومطمئن.</p></article><article class="article-card"><p class="eyebrow">البحث المستهدف</p><h2>مخطط استوديو بودوار، إعداد بودوار، مخطط إضاءة بودوار.</h2><p>المحتوى يجيب عن حاجة عملية جداً: تنظيم جلسة بودوار داخل الاستوديو من دون ارتجال البلاتوه.</p></article><article class="article-card"><p class="eyebrow">ابدأ الآن</p><h2>حمّل إعداد البودوار وكيّفه مع عالمك البصري.</h2><p>يمكنك الانطلاق من قاعدة موجودة، ثم تغيير الخلفية أو الأثاث أو مكان الكاميرا وطباعة المخطط النهائي قبل الجلسة.</p><p><a class="button-link primary" href="app.html?preset=boudoir-parabolic">جرّب إعداد البودوار</a></p></article>`
  },
  footerCopy: "Lumiere Studio · مخطط استوديو بودوار وإعداد بودوار."
};

window.SitePublicCopy.ar.pages.interviewLighting = {
  meta: {
    title: "Lighting Diagram للمقابلة | إعداد فيديو داخل الاستوديو",
    description: "كيف تحضّر Lighting Diagram لمقابلة داخل الاستوديو مع الكاميرا والكرسي والضوء الرئيسي والـ fill والفصل والشاشة ومسارات الحركة.",
    ogTitle: "Lighting Diagram للمقابلة | Lumiere Studio",
    ogDescription: "مخطط بسيط لتحضير مقابلة داخل الاستوديو مع كاميرا وLED وموضوع وديكور ومسارات للفريق.",
    twitterTitle: "Lighting Diagram للمقابلة | Lumiere Studio",
    twitterDescription: "قاعدة فيديو واضحة للاستوديو للمقابلات والبودكاست المصور والمحتوى corporate."
  },
  topCopy: "تحضير مقابلة داخل الاستوديو: الكاميرا والضوء والجلوس وأدوات التحكم وقراءة واضحة للبلاتوه.",
  brandTagline: "مقابلة فيديو",
  navItems: ["home", "app", "guide", "presets", "faq"],
  footerItems: ["home", "app", "presets", "faq"],
  sections: {
    heroCopyContent: `<p class="eyebrow">Lighting Diagram</p><h1>كيف تحضّر Lighting Diagram واضحاً لمقابلة داخل الاستوديو وبسرعة تنفيذ عالية.</h1><p>في المقابلات يجب أن يوضح المخطط اللوجستيات بقدر ما يوضح الإضاءة. فمكان الكاميرا والكرسي وألواح LED والشاشة ومسارات الفريق لا تقل أهمية عن جودة الضوء الرئيسي.</p><div class="hero-actions"><a class="button-link primary" href="app.html?preset=interview-led">افتح إعداد المقابلة</a><a class="button-link secondary" href="guide.html">اطلع على الطريقة</a></div><div class="hero-points"><div class="point-chip"><strong>الكاميرا + الموضوع</strong>المخطط يجعل المحور الرئيسي ومسافة التصوير واضحين فوراً.</div><div class="point-chip"><strong>قاعدة LED من نقطتين</strong>أساس فعال لمقابلة استوديو نظيفة وسريعة التركيب.</div><div class="point-chip"><strong>الفصل</strong>أضف tube أو panel بسهولة لإضاءة الحافة وزيادة العمق.</div><div class="point-chip"><strong>سير عمل الفريق</strong>يصبح البلاتوه أسهل في الشرح وإعادة التنفيذ.</div></div>`,
    heroVisualContent: `<figure><img src="docs/screenshots/studio-video.png" alt="Lighting Diagram لمقابلة تم تحضيره في Lumiere Studio"><figcaption class="hero-caption">مثال لإعداد مقابلة فيديو مع كاميرا وألواح LED ومقعد وعناصر تحكم بالبلاتوه.</figcaption></figure>`,
    firstGridContent: `<article class="article-card"><p class="eyebrow">1. ثبّت المحور</p><h2>مكان الكاميرا يحدد قراءة المخطط كله.</h2><p>قبل الحديث عن الإضاءة، ثبّت محور الكاميرا واتجاه النظر ومكان الكرسي. هذه القرارات تحدد أين ستوضع وحدات LED والخلفية وأدوات الفصل.</p></article><article class="article-card"><p class="eyebrow">2. ابقها بسيطة</p><h2>قاعدة من نقطتي LED تغطي كثيراً من الحالات.</h2><p>ضوء رئيسي ناعم مع fill أو panel ثانوي ثم مصدر فصل صغير يكفي غالباً لمقابلة نظيفة. وجود المخطط يجعل هذه القاعدة سهلة التكرار.</p></article><article class="article-card"><p class="eyebrow">3. أظهر البلاتوه كاملاً</p><h2>الشاشة والربط والمسارات والمناطق الحرة مهمة في المخطط.</h2><p>في المقابلات يجب أن يخدم المخطط فريق الصورة والإنتاج معاً. إضافة الشاشة ونقاط الدخول والمساحات الحرة تجعل الوثيقة عملية فعلاً.</p></article>`,
    secondGridContent: `<article class="article-card"><p class="eyebrow">لمن هذه الصفحة</p><h2>للمقابلات والبودكاست المصور وBTS والمحتوى corporate.</h2><p>هذه الصفحة موجهة للإنتاجات الخفيفة داخل الاستوديو ولمحتوى الشركات ومقابلات يوتيوب وإعدادات البودكاست المصور.</p></article><article class="article-card"><p class="eyebrow">البحث المستهدف</p><h2>Lighting Diagram للمقابلة، إعداد مقابلة في الاستوديو، إضاءة مقابلة فيديو.</h2><p>إنها تستهدف عمليات البحث التي تتم قبل تركيب بلاتوه مقابلة وشرحه للفريق أو للعميل.</p></article><article class="article-card"><p class="eyebrow">ابدأ الآن</p><h2>حمّل قاعدة المقابلة وعدّلها بحسب تصويرك.</h2><p>غيّر مسافة الكاميرا واستبدل الألواح وعدّل الخلفية وأضف الفصل ثم اطبع المخطط قبل التركيب.</p><p><a class="button-link primary" href="app.html?preset=interview-led">جرّب إعداد المقابلة</a></p></article>`
  },
  footerCopy: "Lumiere Studio · Lighting Diagram للمقابلة وإعداد فيديو داخل الاستوديو."
};
