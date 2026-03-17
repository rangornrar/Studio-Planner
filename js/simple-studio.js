(function () {
  const STUDIO = {
    width: 8,
    depth: 6,
    backdropDepth: 0.75,
    backdropHeight: 2.8
  };

  const STORAGE_KEY_LANGUAGE = "lite-studio-language";
  const STORAGE_KEY_CUSTOM_PRESETS = "lite-studio-custom-presets";
  const LANGUAGE_OPTIONS = [
    { id: "fr", code: "FR", nativeLabel: "Français", dir: "ltr" },
    { id: "en", code: "EN", nativeLabel: "English", dir: "ltr" },
    { id: "es", code: "ES", nativeLabel: "Español", dir: "ltr" },
    { id: "de", code: "DE", nativeLabel: "Deutsch", dir: "ltr" },
    { id: "ar", code: "AR", nativeLabel: "العربية", dir: "rtl" }
  ];

  const LOCALES = {
    fr: {
      dir: "ltr",
      documentTitle: "Lumiere Studio App | Plan de studio photo, mesures et export PDF",
      metaDescription: "Ouvrez l application Lumiere Studio pour preparer un set photo sur mobile ou desktop, mesurer les distances cle, zoomer dans le plan, sauvegarder vos presets et exporter en PNG ou PDF.",
      supportAriaLabel: "Support Ko-fi",
      supportText: "Cet outil vous aide ? Soutenez son evolution.",
      supportButton: "Soutenir sur Ko-fi",
      brandTagline: "Photo set planner",
      navAriaLabel: "Menu principal",
      menu: {
        file: "Fichier",
        color: "Couleur",
        presets: "Presets",
        language: "Langue"
      },
      actions: {
        reset: "Remettre a zero",
        copyImage: "Copier l'image",
        exportPng: "Telecharger PNG",
        exportPdf: "Telecharger PDF",
        print: "Imprimer"
      },
      colors: {
        floor: "Sol",
        backdrop: "Fond"
      },
      library: {
        eyebrow: "Bibliotheque",
        title: "Elements et tailles",
        copy: "Ajoutez vos elements, mesurez automatiquement les distances, zoomez dans le plan et exportez votre set en PNG ou PDF."
      },
      stage: {
        eyebrow: "Plan principal",
        title: "Vue de dessus",
        hintDrag: "Glisser = deplacer",
        hintRotate: "Poignee orange = rotation",
        hintMeasure: "Mesure",
        previewEyebrow: "Apercu",
        previewTitle: "Vue isometrique",
        planAriaLabel: "Vue de dessus du studio photo",
        isoAriaLabel: "Vue isometrique du studio photo"
      },
      selection: {
        empty: "Selectionnez un element dans le plan pour ajuster sa position, sa rotation ou le supprimer.",
        delete: "Supprimer",
        note: "Glissez l'element dans la vue de dessus. Utilisez la poignee orange pour la rotation.",
        rotation: "Rotation"
      },
      status: {
        itemSingular: "element",
        itemPlural: "elements"
      },
      dialogs: {
        reset: "Remettre le plateau a zero ?"
      },
      alerts: {
        clipboardUnsupported: "La copie d image n est pas disponible dans ce navigateur.",
        imageFailed: "Impossible de generer l image a copier.",
        clipboardDenied: "Le navigateur a refuse la copie dans le presse-papiers."
      }
    },
    en: {
      dir: "ltr",
      documentTitle: "Lumiere Studio App | Photo set planner with measurements and PDF export",
      metaDescription: "Open the Lumiere Studio app to plan a photo set on mobile or desktop, review key distances, zoom the plan, save custom presets, and export PNG or PDF.",
      supportAriaLabel: "Support Ko-fi",
      supportText: "Helpful tool? Support its evolution.",
      supportButton: "Support on Ko-fi",
      brandTagline: "Photo set planner",
      navAriaLabel: "Main menu",
      menu: {
        file: "File",
        color: "Color",
        presets: "Presets",
        language: "Language"
      },
      actions: {
        reset: "Reset layout",
        copyImage: "Copy image",
        exportPng: "Download PNG",
        exportPdf: "Download PDF",
        print: "Print"
      },
      colors: {
        floor: "Floor",
        backdrop: "Backdrop"
      },
      library: {
        eyebrow: "Library",
        title: "Elements and sizes",
        copy: "Add your elements, review automatic distances, zoom the plan, and export your setup as PNG or PDF."
      },
      stage: {
        eyebrow: "Main plan",
        title: "Top view",
        hintDrag: "Drag = move",
        hintRotate: "Orange handle = rotate",
        hintMeasure: "Measure",
        previewEyebrow: "Preview",
        previewTitle: "Isometric view",
        planAriaLabel: "Top view of the photo studio",
        isoAriaLabel: "Isometric view of the photo studio"
      },
      selection: {
        empty: "Select an item on the plan to adjust its position, rotation or remove it.",
        delete: "Delete",
        note: "Drag the item in the top view. Use the orange handle to rotate it.",
        rotation: "Rotation"
      },
      status: {
        itemSingular: "item",
        itemPlural: "items"
      },
      dialogs: {
        reset: "Reset the studio layout?"
      },
      alerts: {
        clipboardUnsupported: "Image copy is not available in this browser.",
        imageFailed: "Unable to generate the image to copy.",
        clipboardDenied: "The browser refused clipboard access."
      },
      paletteCategories: {
        subjects: "Subjects",
        capture: "Capture",
        lights: "Lights",
        control: "Control",
        furniture: "Furniture"
      },
      paletteGroups: {
        subjects: [
          { title: "Subject", description: "People and stage occupancy." }
        ],
        capture: [
          { title: "Camera", description: "Photo or video capture." }
        ],
        lights: [
          { title: "Soft sources", description: "Softboxes, umbrellas and lanterns." },
          { title: "Focused sources", description: "More precise modifiers, flashes and projectors." },
          { title: "LED and accessories", description: "Panels, tubes and ring light." }
        ],
        control: [
          { title: "Reflectors and bounce", description: "Soft control and light bounce." },
          { title: "Flags", description: "Flags, cutters and floppy." },
          { title: "Diffusion and flats", description: "Scrims, diffusion, V-flat and boards." },
          { title: "Stands and grip", description: "Supports, booms, ballast and studio grip." },
          { title: "Set control", description: "Tether stations, monitors and dimmer." }
        ],
        furniture: [
          { title: "Seating", description: "Seats and posing support." },
          { title: "Supports", description: "Tables, cubes, makeup station and boxes." },
          { title: "Set", description: "Work helpers and large accessories." }
        ]
      },
      presetCategories: {
        portrait: { label: "Portrait", description: "Versatile headshots, actor books and editorial portraits." },
        beauty: { label: "Beauty", description: "Clean setups for skin, makeup and studio glamour." },
        corporate: { label: "Corporate", description: "Business portraits, executives and brand communication." },
        mode: { label: "Fashion", description: "Silhouettes, full length and more contrasted editorial light." },
        product: { label: "Product", description: "Packshots, tabletop and controlled advertising sets." },
        group: { label: "Group", description: "Duo, family, kids and small teams in studio." },
        boudoir: { label: "Boudoir", description: "Intimate, soft or luxurious setups for boudoir series." },
        erotique: { label: "Erotic", description: "Sensual, low-key or graphic setups without stage clutter." },
        nu: { label: "Fine art nude", description: "Sculptural, high-key or graphic nude lighting." },
        video: { label: "Video", description: "Interviews, podcast, greenscreen and hybrid sets." },
        creative: { label: "Creative", description: "Projection, mirror, chroma and shadow-driven presets." }
      }
    },
    es: {
      dir: "ltr",
      documentTitle: "Lumiere Studio App | Planificador de sets fotograficos con medidas y exportacion PDF",
      metaDescription: "Abre la aplicacion Lumiere Studio para planificar un set fotografico en movil o escritorio, medir distancias utiles, acercar el plano, guardar presets propios y exportar en PNG o PDF.",
      supportAriaLabel: "Soporte Ko-fi",
      supportText: "¿Esta herramienta te ayuda? Apoya su evolución.",
      supportButton: "Apoyar en Ko-fi",
      brandTagline: "Planificador de sets fotograficos",
      navAriaLabel: "Menu principal",
      menu: {
        file: "Archivo",
        color: "Color",
        presets: "Presets",
        language: "Idioma"
      },
      actions: {
        reset: "Reiniciar set",
        copyImage: "Copiar imagen",
        exportPng: "Descargar PNG",
        exportPdf: "Descargar PDF",
        print: "Imprimir"
      },
      colors: {
        floor: "Suelo",
        backdrop: "Fondo"
      },
      library: {
        eyebrow: "Biblioteca",
        title: "Elementos y tamanos",
        copy: "Agrega tus elementos, revisa medidas automaticas, acerca el plano y exporta tu set en PNG o PDF."
      },
      stage: {
        eyebrow: "Plano principal",
        title: "Vista superior",
        hintDrag: "Arrastrar = mover",
        hintRotate: "Asa naranja = rotacion",
        hintMeasure: "Medir",
        previewEyebrow: "Vista previa",
        previewTitle: "Vista isometrica",
        planAriaLabel: "Vista superior del estudio fotografico",
        isoAriaLabel: "Vista isometrica del estudio fotografico"
      },
      selection: {
        empty: "Selecciona un elemento en el plano para ajustar su posicion, su rotacion o eliminarlo.",
        delete: "Eliminar",
        note: "Arrastra el elemento en la vista superior. Usa el asa naranja para girarlo.",
        rotation: "Rotacion"
      },
      status: {
        itemSingular: "elemento",
        itemPlural: "elementos"
      },
      dialogs: {
        reset: "¿Restablecer el estudio?"
      },
      alerts: {
        clipboardUnsupported: "La copia de imagen no esta disponible en este navegador.",
        imageFailed: "No se pudo generar la imagen para copiar.",
        clipboardDenied: "El navegador rechazo el acceso al portapapeles."
      },
      paletteCategories: {
        subjects: "Sujetos",
        capture: "Captura",
        lights: "Luces",
        control: "Control",
        furniture: "Mobiliario"
      },
      paletteGroups: {
        subjects: [
          { title: "Sujeto", description: "Personas y ocupacion del set." }
        ],
        capture: [
          { title: "Camara", description: "Captura de foto o video." }
        ],
        lights: [
          { title: "Fuentes suaves", description: "Softboxes, paraguas y lanterns." },
          { title: "Fuentes dirigidas", description: "Modificadores mas precisos, flashes y proyectores." },
          { title: "LED y accesorios", description: "Paneles, tubos y ring light." }
        ],
        control: [
          { title: "Reflectores y rebote", description: "Control suave y rebote de luz." },
          { title: "Banderas", description: "Flags, cutters y floppy." },
          { title: "Difusion y flats", description: "Scrims, difusion, V-flat y paneles." },
          { title: "Pies y grip", description: "Soportes, jirafas, lastre y grip de estudio." },
          { title: "Control de set", description: "Tether, monitores y dimmer." }
        ],
        furniture: [
          { title: "Asientos", description: "Sillas y apoyo para posar." },
          { title: "Soportes", description: "Mesas, cubos, tocador y cajas." },
          { title: "Set", description: "Ayudas de trabajo y accesorios grandes." }
        ]
      },
      presetCategories: {
        portrait: { label: "Retrato", description: "Headshots versatiles, books de actor y retratos editoriales." },
        beauty: { label: "Beauty", description: "Esquemas limpios para piel, maquillaje y glamour de estudio." },
        corporate: { label: "Corporate", description: "Retrato empresarial, directivos y comunicacion de marca." },
        mode: { label: "Moda", description: "Siluetas, cuerpo entero y luz editorial con mas contraste." },
        product: { label: "Producto", description: "Packshots, tabletop y sets publicitarios controlados." },
        group: { label: "Grupo", description: "Duo, familia, ninos y pequenos equipos en estudio." },
        boudoir: { label: "Boudoir", description: "Ambientes intimos, suaves o lujosos para series boudoir." },
        erotique: { label: "Erotico", description: "Setups sensuales, low key o graficos sin recargar la escena." },
        nu: { label: "Desnudo artistico", description: "Iluminacion escultorica, high key o grafica para desnudo." },
        video: { label: "Video", description: "Entrevistas, podcast, greenscreen y sets hibridos." },
        creative: { label: "Creativo", description: "Presets con proyeccion, espejo, chroma y sombras." }
      }
    },
    de: {
      dir: "ltr",
      documentTitle: "Lumiere Studio App | Planer fur Foto-Sets mit Messwerten und PDF-Export",
      metaDescription: "Offne die Lumiere Studio App, plane ein Foto-Set auf Mobilgerat oder Desktop, miss wichtige Abstanden, zoome im Plan, speichere eigene Presets und exportiere PNG oder PDF.",
      supportAriaLabel: "Ko-fi-Unterstutzung",
      supportText: "Hilft dir dieses Tool? Unterstutze seine Weiterentwicklung.",
      supportButton: "Auf Ko-fi unterstutzen",
      brandTagline: "Planer fur Foto-Sets",
      navAriaLabel: "Hauptmenu",
      menu: {
        file: "Datei",
        color: "Farbe",
        presets: "Presets",
        language: "Sprache"
      },
      actions: {
        reset: "Layout zurucksetzen",
        copyImage: "Bild kopieren",
        exportPng: "PNG herunterladen",
        exportPdf: "PDF herunterladen",
        print: "Drucken"
      },
      colors: {
        floor: "Boden",
        backdrop: "Hintergrund"
      },
      library: {
        eyebrow: "Bibliothek",
        title: "Elemente und Grossen",
        copy: "Fuge deine Elemente hinzu, nutze automatische Messwerte, zoome im Plan und exportiere dein Setup als PNG oder PDF."
      },
      stage: {
        eyebrow: "Hauptplan",
        title: "Draufsicht",
        hintDrag: "Ziehen = bewegen",
        hintRotate: "Oranger Griff = drehen",
        hintMeasure: "Messen",
        previewEyebrow: "Vorschau",
        previewTitle: "Isometrische Ansicht",
        planAriaLabel: "Draufsicht des Fotostudios",
        isoAriaLabel: "Isometrische Ansicht des Fotostudios"
      },
      selection: {
        empty: "Wahle ein Element im Plan, um Position, Drehung oder Loschen anzupassen.",
        delete: "Loschen",
        note: "Ziehe das Element in der Draufsicht. Verwende den orangefarbenen Griff zum Drehen.",
        rotation: "Drehung"
      },
      status: {
        itemSingular: "Element",
        itemPlural: "Elemente"
      },
      dialogs: {
        reset: "Studio-Layout zurucksetzen?"
      },
      alerts: {
        clipboardUnsupported: "Bildkopie ist in diesem Browser nicht verfugbar.",
        imageFailed: "Das Bild zum Kopieren konnte nicht erzeugt werden.",
        clipboardDenied: "Der Browser hat den Zugriff auf die Zwischenablage verweigert."
      },
      paletteCategories: {
        subjects: "Motive",
        capture: "Aufnahme",
        lights: "Licht",
        control: "Kontrolle",
        furniture: "Mobiliar"
      },
      paletteGroups: {
        subjects: [
          { title: "Motiv", description: "Personen und Belegung des Sets." }
        ],
        capture: [
          { title: "Kamera", description: "Foto- oder Videoaufnahme." }
        ],
        lights: [
          { title: "Weiche Quellen", description: "Softboxen, Schirme und Lanterns." },
          { title: "Gerichtete Quellen", description: "Präzisere Lichtformer, Blitze und Projektoren." },
          { title: "LED und Zubehor", description: "Panels, Tubes und Ring Light." }
        ],
        control: [
          { title: "Reflektoren und Bounce", description: "Weiche Kontrolle und Lichtruckwurf." },
          { title: "Flags", description: "Flags, Cutter und Floppy." },
          { title: "Diffusion und Flats", description: "Scrims, Diffusion, V-Flats und Boards." },
          { title: "Stative und Grip", description: "Stative, Ausleger, Ballast und Studio-Grip." },
          { title: "Set-Kontrolle", description: "Tether-Stationen, Monitore und Dimmer." }
        ],
        furniture: [
          { title: "Sitzmobel", description: "Sitze und Pose-Hilfen." },
          { title: "Unterstutzung", description: "Tische, Wurfel, Makeup-Station und Kisten." },
          { title: "Set", description: "Arbeitshilfen und grosse Accessoires." }
        ]
      },
      presetCategories: {
        portrait: { label: "Portrat", description: "Vielseitige Headshots, Actor-Books und editoriale Portrats." },
        beauty: { label: "Beauty", description: "Saubere Setups fur Haut, Makeup und Studio-Glamour." },
        corporate: { label: "Corporate", description: "Businessportrats, Executives und Markenkommunikation." },
        mode: { label: "Mode", description: "Silhouetten, Ganzkorper und kontrastreicheres Editorial-Licht." },
        product: { label: "Produkt", description: "Packshots, Tabletop und kontrollierte Werbe-Sets." },
        group: { label: "Gruppe", description: "Duo, Familie, Kinder und kleine Teams im Studio." },
        boudoir: { label: "Boudoir", description: "Intime, weiche oder luxuriose Setups fur Boudoir-Serien." },
        erotique: { label: "Erotik", description: "Sinnliche, Low-Key- oder grafische Setups ohne Buhnenchaos." },
        nu: { label: "Kunstakt", description: "Skulpturales, High-Key- oder grafisches Licht fur Akt." },
        video: { label: "Video", description: "Interviews, Podcast, Greenscreen und hybride Sets." },
        creative: { label: "Kreativ", description: "Presets mit Projektion, Spiegel, Chroma und Schatten." }
      }
    },
    ar: {
      dir: "rtl",
      documentTitle: "Lumiere Studio App | مخطط استوديو تصوير مع قياسات وتصدير PDF",
      metaDescription: "افتح تطبيق Lumiere Studio لتخطيط إعداد استوديو تصوير على الجوال أو الكمبيوتر، وقياس المسافات المهمة، وتكبير المخطط، وحفظ إعداداتك الخاصة، وتصدير PNG أو PDF.",
      supportAriaLabel: "دعم Ko-fi",
      supportText: "هل هذه الأداة مفيدة لك؟ ادعم تطويرها.",
      supportButton: "ادعم عبر Ko-fi",
      brandTagline: "مخطط إعدادات الاستوديو",
      navAriaLabel: "القائمة الرئيسية",
      menu: {
        file: "ملف",
        color: "اللون",
        presets: "الإعدادات",
        language: "اللغة"
      },
      actions: {
        reset: "إعادة الضبط",
        copyImage: "نسخ الصورة",
        exportPng: "تنزيل PNG",
        exportPdf: "تنزيل PDF",
        print: "طباعة"
      },
      colors: {
        floor: "الأرضية",
        backdrop: "الخلفية"
      },
      library: {
        eyebrow: "المكتبة",
        title: "العناصر والمقاسات",
        copy: "أضف عناصر المشهد، راجع القياسات التلقائية، كبّر المخطط، وصدّر الإعداد بصيغة PNG أو PDF."
      },
      stage: {
        eyebrow: "المخطط الرئيسي",
        title: "منظر علوي",
        hintDrag: "سحب = تحريك",
        hintRotate: "المقبض البرتقالي = تدوير",
        hintMeasure: "قياس",
        previewEyebrow: "معاينة",
        previewTitle: "منظور أيزومتري",
        planAriaLabel: "منظر علوي لاستوديو التصوير",
        isoAriaLabel: "منظور أيزومتري لاستوديو التصوير"
      },
      selection: {
        empty: "حدد عنصراً من المخطط لتعديل موضعه أو تدويره أو حذفه.",
        delete: "حذف",
        note: "اسحب العنصر داخل المنظر العلوي. استخدم المقبض البرتقالي للتدوير.",
        rotation: "الدوران"
      },
      status: {
        itemSingular: "عنصر",
        itemPlural: "عناصر"
      },
      dialogs: {
        reset: "هل تريد إعادة ضبط إعداد الاستوديو؟"
      },
      alerts: {
        clipboardUnsupported: "نسخ الصورة غير متاح في هذا المتصفح.",
        imageFailed: "تعذر إنشاء الصورة لنسخها.",
        clipboardDenied: "رفض المتصفح الوصول إلى الحافظة."
      },
      paletteCategories: {
        subjects: "الموضوعات",
        capture: "الالتقاط",
        lights: "الإضاءة",
        control: "التحكم",
        furniture: "الأثاث"
      },
      paletteGroups: {
        subjects: [
          { title: "الموضوع", description: "الأشخاص وشغل مساحة البلاتوه." }
        ],
        capture: [
          { title: "الكاميرا", description: "التقاط الصور أو الفيديو." }
        ],
        lights: [
          { title: "مصادر ناعمة", description: "سوفت بوكس ومظلات ولانترن." },
          { title: "مصادر موجهة", description: "معدلات أدق وفلاشات وبروجكترات." },
          { title: "LED وملحقات", description: "ألواح وأنابيب ورينغ لايت." }
        ],
        control: [
          { title: "عاكسات وارتداد", description: "تحكم ناعم وارتداد للضوء." },
          { title: "قص الضوء", description: "فلاجز وكاتر وفلوبي." },
          { title: "ديفيوجن وفلاتس", description: "سكريم وديفيوجن وV-flat وألواح." },
          { title: "ستاندات وغريب", description: "حوامل وبومات وأوزان وتجهيزات بلاتوه." },
          { title: "تحكم البلاتوه", description: "محطات تذر وشاشات وديمر." }
        ],
        furniture: [
          { title: "مقاعد", description: "مقاعد ودعم للوضعيات." },
          { title: "دعامات", description: "طاولات ومكعبات وطاولة مكياج وصناديق." },
          { title: "البلاتوه", description: "وسائل عمل وإكسسوارات كبيرة." }
        ]
      },
      presetCategories: {
        portrait: { label: "بورتريه", description: "إعدادات مرنة للهيدشوت وبورتريهات الكتب والتحرير." },
        beauty: { label: "بيوتي", description: "إعدادات نظيفة للبشرة والمكياج والغلَامور في الاستوديو." },
        corporate: { label: "شركات", description: "بورتريه أعمال ومديرين واتصال بصري للعلامة." },
        mode: { label: "موضة", description: "سيلويت وتصوير كامل الجسم وإضاءة تحريرية أكثر تبايناً." },
        product: { label: "منتج", description: "باك شوت وتصوير طاولة وإعدادات إعلانية مضبوطة." },
        group: { label: "مجموعة", description: "ثنائي وعائلة وأطفال وفرق صغيرة في الاستوديو." },
        boudoir: { label: "بودوار", description: "أجواء حميمة وناعمة أو فاخرة لسلاسل البودوار." },
        erotique: { label: "إيروتيك", description: "إعدادات حسية ولو-كي أو جرافيكية بدون ازدحام في المشهد." },
        nu: { label: "نود فني", description: "إضاءة نحتية أو هاي-كي أو جرافيكية للنود الفني." },
        video: { label: "فيديو", description: "مقابلات وبودكاست وغرين سكرين وإعدادات هجينة." },
        creative: { label: "إبداعي", description: "إعدادات بالإسقاط والمرآة والكروما والظلال." }
      }
    }
  };

  const FLOOR_COLORS = [
    { id: "white", label: "Blanc", color: "#f1f3f5" },
    { id: "light-gray", label: "Gris clair", color: "#d7dbe0" },
    { id: "neutral-gray", label: "Gris neutre", color: "#a4aab2" },
    { id: "charcoal", label: "Anthracite", color: "#525963" },
    { id: "black", label: "Noir", color: "#181b20" },
    { id: "cream", label: "Creme", color: "#ece2d2" },
    { id: "sand", label: "Sable", color: "#c9af8f" },
    { id: "slate", label: "Bleu ardoise", color: "#60728a" }
  ];

  const BACKDROP_COLORS = [
    { id: "white", label: "Blanc", color: "#f7f7f3" },
    { id: "super-white", label: "Super blanc", color: "#fbfbf8" },
    { id: "black", label: "Noir", color: "#17181b" },
    { id: "light-gray", label: "Gris clair", color: "#d8dde0" },
    { id: "medium-gray", label: "Gris moyen", color: "#b8bec6" },
    { id: "neutral-gray", label: "Gris neutre", color: "#9ea4ac" },
    { id: "dark-gray", label: "Gris fonce", color: "#454b54" },
    { id: "thunder-gray", label: "Gris orage", color: "#6d747e" },
    { id: "charcoal", label: "Anthracite", color: "#32373f" },
    { id: "stone", label: "Pierre", color: "#c6beb4" },
    { id: "pebble", label: "Galet", color: "#a89f95" },
    { id: "cream", label: "Creme", color: "#efe4d4" },
    { id: "ivory", label: "Ivoire", color: "#f2ede1" },
    { id: "vanilla", label: "Vanille", color: "#efe1bf" },
    { id: "oat", label: "Avoine", color: "#d7ccb8" },
    { id: "beige", label: "Beige", color: "#d2b697" },
    { id: "camel", label: "Camel", color: "#b99268" },
    { id: "sand", label: "Sable", color: "#bb986f" },
    { id: "tan", label: "Sable chaud", color: "#c59a72" },
    { id: "caramel", label: "Caramel", color: "#b8784f" },
    { id: "mocha", label: "Moka", color: "#7a5f50" },
    { id: "cocoa", label: "Cacao", color: "#6b4f41" },
    { id: "chestnut", label: "Chataigne", color: "#8a5b46" },
    { id: "chocolate", label: "Chocolat", color: "#4e352e" },
    { id: "clay", label: "Argile", color: "#b2876a" },
    { id: "terracotta", label: "Terracotta", color: "#b66649" },
    { id: "rust", label: "Rouille", color: "#9d4d36" },
    { id: "brick", label: "Brique", color: "#8b3632" },
    { id: "burgundy", label: "Bordeaux", color: "#6d2431" },
    { id: "red", label: "Rouge", color: "#b83335" },
    { id: "coral", label: "Corail", color: "#d77967" },
    { id: "peach", label: "Peche", color: "#e6b391" },
    { id: "blush", label: "Rose poudre", color: "#d5b5bc" },
    { id: "dusty-rose", label: "Rose nude", color: "#bf8f95" },
    { id: "lavender", label: "Lavande", color: "#a39bbc" },
    { id: "lilac", label: "Lilas", color: "#bca9ca" },
    { id: "plum", label: "Prune", color: "#6d526f" },
    { id: "sky", label: "Bleu ciel", color: "#89afcc" },
    { id: "powder-blue", label: "Bleu poudre", color: "#b7cadc" },
    { id: "arctic-blue", label: "Bleu glacier", color: "#d8e8f1" },
    { id: "steel", label: "Bleu acier", color: "#5f7890" },
    { id: "cobalt", label: "Bleu cobalt", color: "#3f5f8f" },
    { id: "navy", label: "Bleu marine", color: "#22324d" },
    { id: "teal", label: "Sarcelle", color: "#2f6f72" },
    { id: "turquoise", label: "Turquoise", color: "#58a6a6" },
    { id: "mint", label: "Menthe", color: "#bcd8c9" },
    { id: "sage", label: "Sauge", color: "#95a08a" },
    { id: "olive", label: "Olive", color: "#737a58" },
    { id: "forest", label: "Vert foret", color: "#375542" },
    { id: "emerald", label: "Emeraude", color: "#1f7a62" },
    { id: "mustard", label: "Moutarde", color: "#bf9240" },
    { id: "sunflower", label: "Jaune studio", color: "#ddb64f" },
    { id: "chroma", label: "Vert chroma", color: "#41a54c" },
    { id: "chroma-blue", label: "Bleu chroma", color: "#2d63c8" }
  ];
  const ITEM_VARIANTS = {
    "subject-adult": {
      family: "subject",
      typeLabel: "Sujet",
      shortLabel: "Adulte",
      sizeLabel: "58 x 58 cm",
      heightLabel: "H 1.75 m",
      description: "1 personne debout",
      width: 0.58,
      depth: 0.58,
      height: 1.75,
      shape: "ellipse"
    },
    "subject-child": {
      family: "subject",
      typeLabel: "Sujet",
      shortLabel: "Enfant",
      sizeLabel: "44 x 44 cm",
      heightLabel: "H 1.30 m",
      description: "1 enfant debout",
      width: 0.44,
      depth: 0.44,
      height: 1.3,
      shape: "ellipse"
    },
    "subject-couple": {
      family: "subject",
      typeLabel: "Sujet",
      shortLabel: "Couple serre",
      sizeLabel: "95 x 65 cm",
      heightLabel: "H 1.75 m",
      description: "2 personnes rapprochees",
      width: 0.95,
      depth: 0.65,
      height: 1.75,
      shape: "ellipse"
    },
    "camera-standard": {
      family: "camera",
      typeLabel: "Appareil",
      shortLabel: "Trepied standard",
      sizeLabel: "70 x 86 cm",
      heightLabel: "H 1.62 m",
      description: "Boitier sur trepied",
      width: 0.7,
      depth: 0.86,
      height: 1.62,
      shape: "rect"
    },
    "camera-high": {
      family: "camera",
      typeLabel: "Appareil",
      shortLabel: "Trepied haut",
      sizeLabel: "70 x 86 cm",
      heightLabel: "H 1.90 m",
      description: "Appareil pour prise haute",
      width: 0.7,
      depth: 0.86,
      height: 1.9,
      shape: "rect"
    },
    "camera-video": {
      family: "camera",
      typeLabel: "Camera video",
      shortLabel: "Trepied video",
      sizeLabel: "78 x 92 cm",
      heightLabel: "H 1.72 m",
      description: "Camera cinema ou interview",
      width: 0.78,
      depth: 0.92,
      height: 1.72,
      shape: "rect"
    },
    "softbox-octa90": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Octa 90",
      sizeLabel: "90 cm",
      heightLabel: "H 2.10 m",
      description: "Octabox compacte",
      width: 0.78,
      depth: 0.62,
      height: 2.1,
      shape: "rect"
    },
    "softbox-octa120": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Octa 120",
      sizeLabel: "120 cm",
      heightLabel: "H 2.18 m",
      description: "Octabox portrait",
      width: 0.92,
      depth: 0.68,
      height: 2.18,
      shape: "rect"
    },
    "softbox-rect60x90": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Recta 60 x 90",
      sizeLabel: "60 x 90 cm",
      heightLabel: "H 2.08 m",
      description: "Rectangulaire compacte",
      width: 0.72,
      depth: 0.52,
      height: 2.08,
      shape: "rect"
    },
    "softbox-rect90x120": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Recta 90 x 120",
      sizeLabel: "90 x 120 cm",
      heightLabel: "H 2.22 m",
      description: "Grande source diffuse",
      width: 1.02,
      depth: 0.68,
      height: 2.22,
      shape: "rect"
    },
    "softbox-parabolic150": {
      family: "softbox",
      typeLabel: "Softbox",
      shortLabel: "Parabolique 150",
      sizeLabel: "150 cm",
      heightLabel: "H 2.25 m",
      description: "Grande parabolique",
      width: 1.08,
      depth: 0.78,
      height: 2.25,
      shape: "rect"
    },
    "strip-30x120": {
      family: "striplight",
      typeLabel: "Striplight",
      shortLabel: "30 x 120",
      sizeLabel: "30 x 120 cm",
      heightLabel: "H 2.12 m",
      description: "Bande lumineuse fine",
      width: 0.32,
      depth: 0.52,
      height: 2.12,
      shape: "rect"
    },
    "strip-40x140": {
      family: "striplight",
      typeLabel: "Striplight",
      shortLabel: "40 x 140",
      sizeLabel: "40 x 140 cm",
      heightLabel: "H 2.22 m",
      description: "Bande lumineuse haute",
      width: 0.4,
      depth: 0.58,
      height: 2.22,
      shape: "rect"
    },
    "tube-60": {
      family: "striplight",
      typeLabel: "Tube LED",
      shortLabel: "60 cm",
      sizeLabel: "60 cm",
      heightLabel: "H 1.60 m",
      description: "Tube LED court",
      width: 0.22,
      depth: 0.32,
      height: 1.6,
      shape: "rect"
    },
    "tube-120": {
      family: "striplight",
      typeLabel: "Tube LED",
      shortLabel: "120 cm",
      sizeLabel: "120 cm",
      heightLabel: "H 2.05 m",
      description: "Tube LED standard",
      width: 0.24,
      depth: 0.42,
      height: 2.05,
      shape: "rect"
    },
    "tube-240": {
      family: "striplight",
      typeLabel: "Tube LED",
      shortLabel: "240 cm",
      sizeLabel: "240 cm",
      heightLabel: "H 2.30 m",
      description: "Tube LED long",
      width: 0.26,
      depth: 0.52,
      height: 2.3,
      shape: "rect"
    },
    "led-panel-1x1": {
      family: "softbox",
      typeLabel: "Panneau LED",
      shortLabel: "1 x 1",
      sizeLabel: "30 x 30 cm",
      heightLabel: "H 1.95 m",
      description: "Panneau LED carre",
      width: 0.42,
      depth: 0.38,
      height: 1.95,
      shape: "rect"
    },
    "led-panel-1x2": {
      family: "striplight",
      typeLabel: "Panneau LED",
      shortLabel: "1 x 2",
      sizeLabel: "30 x 60 cm",
      heightLabel: "H 2.05 m",
      description: "Panneau LED allonge",
      width: 0.36,
      depth: 0.56,
      height: 2.05,
      shape: "rect"
    },
    "beauty-dish-55": {
      family: "reflector",
      typeLabel: "Beauty Dish",
      shortLabel: "55 cm",
      sizeLabel: "55 cm",
      heightLabel: "H 2.00 m",
      description: "Dish beaute compact",
      width: 0.6,
      depth: 0.6,
      height: 2.0,
      shape: "circle"
    },
    "beauty-dish-70": {
      family: "reflector",
      typeLabel: "Beauty Dish",
      shortLabel: "70 cm",
      sizeLabel: "70 cm",
      heightLabel: "H 2.05 m",
      description: "Dish beaute standard",
      width: 0.74,
      depth: 0.74,
      height: 2.05,
      shape: "circle"
    },
    "umbrella-shoot-105": {
      family: "reflector",
      typeLabel: "Parapluie diffusant",
      shortLabel: "105 cm",
      sizeLabel: "105 cm",
      heightLabel: "H 2.10 m",
      description: "Shoot-through blanc",
      width: 0.98,
      depth: 0.98,
      height: 2.1,
      shape: "circle"
    },
    "umbrella-deep-135": {
      family: "reflector",
      typeLabel: "Parapluie profond",
      shortLabel: "135 cm",
      sizeLabel: "135 cm",
      heightLabel: "H 2.20 m",
      description: "Parapluie profond blanc",
      width: 1.16,
      depth: 1.16,
      height: 2.2,
      shape: "circle"
    },
    "umbrella-silver-150": {
      family: "reflector",
      typeLabel: "Parapluie argent",
      shortLabel: "150 cm",
      sizeLabel: "150 cm",
      heightLabel: "H 2.25 m",
      description: "Parapluie reflex argent",
      width: 1.26,
      depth: 1.26,
      height: 2.25,
      shape: "circle"
    },
    "lantern-65": {
      family: "reflector",
      typeLabel: "Lantern",
      shortLabel: "65 cm",
      sizeLabel: "65 cm",
      heightLabel: "H 2.10 m",
      description: "Boule diffuse compacte",
      width: 0.7,
      depth: 0.7,
      height: 2.1,
      shape: "circle"
    },
    "lantern-90": {
      family: "reflector",
      typeLabel: "Lantern",
      shortLabel: "90 cm",
      sizeLabel: "90 cm",
      heightLabel: "H 2.20 m",
      description: "Boule diffuse grande",
      width: 0.9,
      depth: 0.9,
      height: 2.2,
      shape: "circle"
    },
    "ringlight-45": {
      family: "reflector",
      typeLabel: "Ring Light",
      shortLabel: "45 cm",
      sizeLabel: "45 cm",
      heightLabel: "H 1.85 m",
      description: "Lumiere frontale circulaire",
      width: 0.5,
      depth: 0.5,
      height: 1.85,
      shape: "circle"
    },
    "fresnel-200": {
      family: "reflector",
      typeLabel: "Fresnel",
      shortLabel: "200 W",
      sizeLabel: "40 cm",
      heightLabel: "H 1.95 m",
      description: "Fresnel petite tete",
      width: 0.42,
      depth: 0.42,
      height: 1.95,
      shape: "circle"
    },
    "fresnel-650": {
      family: "reflector",
      typeLabel: "Fresnel",
      shortLabel: "650 W",
      sizeLabel: "55 cm",
      heightLabel: "H 2.05 m",
      description: "Fresnel standard",
      width: 0.56,
      depth: 0.56,
      height: 2.05,
      shape: "circle"
    },
    "projector-19": {
      family: "camera",
      typeLabel: "Projecteur optique",
      shortLabel: "19 deg",
      sizeLabel: "45 x 50 cm",
      heightLabel: "H 2.00 m",
      description: "Optical spot faisceau serre",
      width: 0.46,
      depth: 0.52,
      height: 2.0,
      shape: "rect"
    },
    "projector-36": {
      family: "camera",
      typeLabel: "Projecteur optique",
      shortLabel: "36 deg",
      sizeLabel: "45 x 50 cm",
      heightLabel: "H 2.00 m",
      description: "Optical spot faisceau moyen",
      width: 0.46,
      depth: 0.52,
      height: 2.0,
      shape: "rect"
    },
    "reflector-80": {
      family: "reflector",
      typeLabel: "Reflecteur",
      shortLabel: "80 cm",
      sizeLabel: "80 cm",
      heightLabel: "H 1.70 m",
      description: "Reflecteur compact",
      width: 0.8,
      depth: 0.8,
      height: 1.7,
      shape: "circle"
    },
    "reflector-110": {
      family: "reflector",
      typeLabel: "Reflecteur",
      shortLabel: "110 cm",
      sizeLabel: "110 cm",
      heightLabel: "H 1.84 m",
      description: "Reflecteur grand format",
      width: 1.1,
      depth: 1.1,
      height: 1.84,
      shape: "circle"
    },
    "reflector-panel": {
      family: "vflat",
      typeLabel: "Reflecteur panneau",
      shortLabel: "120 x 180",
      sizeLabel: "120 x 180 cm",
      heightLabel: "H 1.80 m",
      description: "Grand rebond blanc",
      width: 1.2,
      depth: 0.12,
      height: 1.8,
      shape: "rect"
    },
    "flag-60x90": {
      family: "flag",
      typeLabel: "Drapeau",
      shortLabel: "60 x 90",
      sizeLabel: "60 x 90 cm",
      heightLabel: "H 2.00 m",
      description: "Coupe-flux standard",
      width: 0.62,
      depth: 0.16,
      height: 2.0,
      shape: "rect"
    },
    "flag-90x120": {
      family: "flag",
      typeLabel: "Drapeau",
      shortLabel: "90 x 120",
      sizeLabel: "90 x 120 cm",
      heightLabel: "H 2.08 m",
      description: "Coupe-flux large",
      width: 0.9,
      depth: 0.18,
      height: 2.08,
      shape: "rect"
    },
    "cutter-45x120": {
      family: "flag",
      typeLabel: "Cutter",
      shortLabel: "45 x 120",
      sizeLabel: "45 x 120 cm",
      heightLabel: "H 2.05 m",
      description: "Coupe-flux etroit",
      width: 0.45,
      depth: 0.14,
      height: 2.05,
      shape: "rect"
    },
    "floppy-120x120": {
      family: "flag",
      typeLabel: "Floppy",
      shortLabel: "120 x 120",
      sizeLabel: "120 x 120 cm",
      heightLabel: "H 2.10 m",
      description: "Drapeau double volet",
      width: 1.08,
      depth: 0.2,
      height: 2.1,
      shape: "rect"
    },
    "scrim-100": {
      family: "flag",
      typeLabel: "Scrim",
      shortLabel: "100 x 100",
      sizeLabel: "100 x 100 cm",
      heightLabel: "H 2.00 m",
      description: "Cadre diffusion legere",
      width: 1.0,
      depth: 0.12,
      height: 2.0,
      shape: "rect"
    },
    "scrim-150": {
      family: "flag",
      typeLabel: "Scrim",
      shortLabel: "150 x 150",
      sizeLabel: "150 x 150 cm",
      heightLabel: "H 2.18 m",
      description: "Cadre diffusion grand",
      width: 1.35,
      depth: 0.14,
      height: 2.18,
      shape: "rect"
    },
    "diffusion-100x150": {
      family: "vflat",
      typeLabel: "Cadre diffusion",
      shortLabel: "100 x 150",
      sizeLabel: "100 x 150 cm",
      heightLabel: "H 2.05 m",
      description: "Cadre diffusion portrait",
      width: 1.0,
      depth: 0.1,
      height: 2.05,
      shape: "rect"
    },
    "diffusion-200x200": {
      family: "vflat",
      typeLabel: "Cadre diffusion",
      shortLabel: "200 x 200",
      sizeLabel: "200 x 200 cm",
      heightLabel: "H 2.30 m",
      description: "Cadre diffusion grande taille",
      width: 1.8,
      depth: 0.12,
      height: 2.3,
      shape: "rect"
    },
    "vflat-100x200": {
      family: "vflat",
      typeLabel: "V-Flat",
      shortLabel: "100 x 200",
      sizeLabel: "100 x 200 cm",
      heightLabel: "H 2.00 m",
      description: "Panneau de controle compact",
      width: 1.0,
      depth: 0.2,
      height: 2.0,
      shape: "rect"
    },
    "vflat-120x240": {
      family: "vflat",
      typeLabel: "V-Flat",
      shortLabel: "120 x 240",
      sizeLabel: "120 x 240 cm",
      heightLabel: "H 2.40 m",
      description: "Panneau grand format",
      width: 1.2,
      depth: 0.22,
      height: 2.4,
      shape: "rect"
    },
    "foamcore-100x150": {
      family: "vflat",
      typeLabel: "Foamcore",
      shortLabel: "100 x 150",
      sizeLabel: "100 x 150 cm",
      heightLabel: "H 1.85 m",
      description: "Panneau mousse leger",
      width: 1.0,
      depth: 0.08,
      height: 1.85,
      shape: "rect"
    },
    "negfill-120x200": {
      family: "vflat",
      typeLabel: "Negative Fill",
      shortLabel: "120 x 200",
      sizeLabel: "120 x 200 cm",
      heightLabel: "H 2.00 m",
      description: "Absorption de lumiere",
      width: 1.2,
      depth: 0.1,
      height: 2.0,
      shape: "rect"
    },
    "stool-low": {
      family: "stool",
      typeLabel: "Tabouret",
      shortLabel: "Bas",
      sizeLabel: "45 x 45 cm",
      heightLabel: "H 45 cm",
      description: "Assise basse",
      width: 0.45,
      depth: 0.45,
      height: 0.45,
      shape: "circle"
    },
    "stool-high": {
      family: "stool",
      typeLabel: "Tabouret",
      shortLabel: "Haut",
      sizeLabel: "52 x 52 cm",
      heightLabel: "H 65 cm",
      description: "Assise haute",
      width: 0.52,
      depth: 0.52,
      height: 0.65,
      shape: "circle"
    },
    "chair-standard": {
      family: "stool",
      typeLabel: "Chaise",
      shortLabel: "Standard",
      sizeLabel: "50 x 50 cm",
      heightLabel: "H 85 cm",
      description: "Chaise de posing",
      width: 0.5,
      depth: 0.5,
      height: 0.85,
      shape: "circle"
    },
    "chair-director": {
      family: "stool",
      typeLabel: "Chaise realisateur",
      shortLabel: "Plateau",
      sizeLabel: "58 x 58 cm",
      heightLabel: "H 1.10 m",
      description: "Chaise de plateau",
      width: 0.58,
      depth: 0.58,
      height: 1.1,
      shape: "circle"
    },
    "bench-120": {
      family: "table",
      typeLabel: "Banc",
      shortLabel: "120 cm",
      sizeLabel: "120 x 40 cm",
      heightLabel: "H 48 cm",
      description: "Banc portrait famille",
      width: 1.2,
      depth: 0.4,
      height: 0.48,
      shape: "rect"
    },
    "sofa-180": {
      family: "table",
      typeLabel: "Canape",
      shortLabel: "180 cm",
      sizeLabel: "180 x 80 cm",
      heightLabel: "H 88 cm",
      description: "Canape lifestyle",
      width: 1.8,
      depth: 0.8,
      height: 0.88,
      shape: "rect"
    },
    "cube-50": {
      family: "table",
      typeLabel: "Cube posing",
      shortLabel: "50 cm",
      sizeLabel: "50 x 50 cm",
      heightLabel: "H 50 cm",
      description: "Cube d'assise ou pose",
      width: 0.5,
      depth: 0.5,
      height: 0.5,
      shape: "rect"
    },
    "applebox-full": {
      family: "table",
      typeLabel: "Apple Box",
      shortLabel: "Full",
      sizeLabel: "50 x 30 cm",
      heightLabel: "H 20 cm",
      description: "Caisse full",
      width: 0.5,
      depth: 0.3,
      height: 0.2,
      shape: "rect"
    },
    "applebox-half": {
      family: "table",
      typeLabel: "Apple Box",
      shortLabel: "Half",
      sizeLabel: "50 x 30 cm",
      heightLabel: "H 10 cm",
      description: "Caisse half",
      width: 0.5,
      depth: 0.3,
      height: 0.1,
      shape: "rect"
    },
    "applebox-quarter": {
      family: "table",
      typeLabel: "Apple Box",
      shortLabel: "Quarter",
      sizeLabel: "50 x 30 cm",
      heightLabel: "H 5 cm",
      description: "Caisse quarter",
      width: 0.5,
      depth: 0.3,
      height: 0.05,
      shape: "rect"
    },
    "table-120": {
      family: "table",
      typeLabel: "Table",
      shortLabel: "120 x 70",
      sizeLabel: "120 x 70 cm",
      heightLabel: "H 78 cm",
      description: "Table de produit",
      width: 1.2,
      depth: 0.7,
      height: 0.78,
      shape: "rect"
    },
    "table-160": {
      family: "table",
      typeLabel: "Table",
      shortLabel: "160 x 80",
      sizeLabel: "160 x 80 cm",
      heightLabel: "H 78 cm",
      description: "Table de stylisme",
      width: 1.6,
      depth: 0.8,
      height: 0.78,
      shape: "rect"
    },
    "table-round": {
      family: "table",
      typeLabel: "Table ronde",
      shortLabel: "90 cm",
      sizeLabel: "90 cm",
      heightLabel: "H 76 cm",
      description: "Petite table ronde",
      width: 0.9,
      depth: 0.9,
      height: 0.76,
      shape: "rect"
    },
    "cart-rolling": {
      family: "table",
      typeLabel: "Chariot",
      shortLabel: "Rolling cart",
      sizeLabel: "80 x 50 cm",
      heightLabel: "H 92 cm",
      description: "Chariot accessoires ou tether",
      width: 0.8,
      depth: 0.5,
      height: 0.92,
      shape: "rect"
    },
    "ladder-small": {
      family: "table",
      typeLabel: "Escabeau",
      shortLabel: "Petit",
      sizeLabel: "60 x 45 cm",
      heightLabel: "H 1.10 m",
      description: "Escabeau photographe",
      width: 0.6,
      depth: 0.45,
      height: 1.1,
      shape: "rect"
    },
    "flash-head-compact": {
      family: "reflector",
      typeLabel: "Tete flash",
      shortLabel: "Compacte",
      sizeLabel: "24 x 24 cm",
      heightLabel: "H 2.10 m",
      description: "Flash monobloc compact sur pied",
      width: 0.24,
      depth: 0.24,
      height: 2.1,
      shape: "circle"
    },
    "flash-head-pro": {
      family: "reflector",
      typeLabel: "Tete flash",
      shortLabel: "Pro",
      sizeLabel: "28 x 28 cm",
      heightLabel: "H 2.20 m",
      description: "Flash studio puissant sur pied",
      width: 0.28,
      depth: 0.28,
      height: 2.2,
      shape: "circle"
    },
    "cob-led-300": {
      family: "reflector",
      typeLabel: "COB LED",
      shortLabel: "300 W",
      sizeLabel: "32 x 32 cm",
      heightLabel: "H 2.15 m",
      description: "Projecteur LED continu polyvalent",
      width: 0.32,
      depth: 0.32,
      height: 2.15,
      shape: "circle"
    },
    "cob-led-600": {
      family: "reflector",
      typeLabel: "COB LED",
      shortLabel: "600 W",
      sizeLabel: "38 x 38 cm",
      heightLabel: "H 2.25 m",
      description: "Projecteur LED puissant pour modeleurs",
      width: 0.38,
      depth: 0.38,
      height: 2.25,
      shape: "circle"
    },
    "hmi-1200": {
      family: "reflector",
      typeLabel: "HMI",
      shortLabel: "1200 W",
      sizeLabel: "42 x 42 cm",
      heightLabel: "H 2.35 m",
      description: "Source daylight puissante sur pied",
      width: 0.42,
      depth: 0.42,
      height: 2.35,
      shape: "circle"
    },
    "cstand-grip": {
      family: "stand",
      typeLabel: "Pied C",
      shortLabel: "Grip",
      sizeLabel: "85 x 85 cm",
      heightLabel: "H 2.40 m",
      description: "Pied C avec grip head",
      width: 0.85,
      depth: 0.85,
      height: 2.4,
      shape: "rect"
    },
    "cstand-arm": {
      family: "stand",
      typeLabel: "Pied C",
      shortLabel: "Bras 40 in",
      sizeLabel: "110 x 85 cm",
      heightLabel: "H 2.40 m",
      description: "Pied C avec bras et grip head",
      width: 1.1,
      depth: 0.85,
      height: 2.4,
      shape: "rect"
    },
    "combo-stand": {
      family: "stand",
      typeLabel: "Pied combo",
      shortLabel: "Junior",
      sizeLabel: "90 x 90 cm",
      heightLabel: "H 3.20 m",
      description: "Pied combo pour grosses sources",
      width: 0.9,
      depth: 0.9,
      height: 3.2,
      shape: "rect"
    },
    "roller-stand": {
      family: "stand",
      typeLabel: "Pied roller",
      shortLabel: "Low base",
      sizeLabel: "88 x 88 cm",
      heightLabel: "H 2.90 m",
      description: "Pied a roulettes pour sources lourdes",
      width: 0.88,
      depth: 0.88,
      height: 2.9,
      shape: "rect"
    },
    "boom-stand": {
      family: "stand",
      typeLabel: "Girafe",
      shortLabel: "Boom",
      sizeLabel: "150 x 90 cm",
      heightLabel: "H 2.80 m",
      description: "Girafe pour overhead et perche",
      width: 1.5,
      depth: 0.9,
      height: 2.8,
      shape: "rect"
    },
    "sandbag-single": {
      family: "table",
      typeLabel: "Sac de lest",
      shortLabel: "Simple",
      sizeLabel: "30 x 18 cm",
      heightLabel: "H 10 cm",
      description: "Lest pour securiser un pied",
      width: 0.3,
      depth: 0.18,
      height: 0.1,
      shape: "rect"
    },
    "sandbag-double": {
      family: "table",
      typeLabel: "Sac de lest",
      shortLabel: "Double",
      sizeLabel: "42 x 20 cm",
      heightLabel: "H 12 cm",
      description: "Lest double pour gros pied",
      width: 0.42,
      depth: 0.2,
      height: 0.12,
      shape: "rect"
    },
    "tether-station": {
      family: "table",
      typeLabel: "Station tether",
      shortLabel: "Laptop",
      sizeLabel: "60 x 40 cm",
      heightLabel: "H 1.05 m",
      description: "Station de controle capture",
      width: 0.6,
      depth: 0.4,
      height: 1.05,
      shape: "rect"
    },
    "monitor-station": {
      family: "table",
      typeLabel: "Moniteur controle",
      shortLabel: "24 pouces",
      sizeLabel: "70 x 45 cm",
      heightLabel: "H 1.40 m",
      description: "Moniteur client ou direction artistique",
      width: 0.7,
      depth: 0.45,
      height: 1.4,
      shape: "rect"
    },
    "dimmer-desk": {
      family: "table",
      typeLabel: "Console dimmer",
      shortLabel: "Desk",
      sizeLabel: "100 x 50 cm",
      heightLabel: "H 1.05 m",
      description: "Commande intensite et DMX",
      width: 1,
      depth: 0.5,
      height: 1.05,
      shape: "rect"
    },
    "armchair-90": {
      family: "table",
      typeLabel: "Fauteuil",
      shortLabel: "90 cm",
      sizeLabel: "90 x 80 cm",
      heightLabel: "H 82 cm",
      description: "Fauteuil lounge photo",
      width: 0.9,
      depth: 0.8,
      height: 0.82,
      shape: "rect"
    },
    "ottoman-80": {
      family: "stool",
      typeLabel: "Pouf",
      shortLabel: "80 cm",
      sizeLabel: "80 x 80 cm",
      heightLabel: "H 45 cm",
      description: "Assise basse ronde",
      width: 0.8,
      depth: 0.8,
      height: 0.45,
      shape: "ellipse"
    },
    "desk-140": {
      family: "table",
      typeLabel: "Bureau",
      shortLabel: "140 x 70",
      sizeLabel: "140 x 70 cm",
      heightLabel: "H 75 cm",
      description: "Poste stylisme ou retouche",
      width: 1.4,
      depth: 0.7,
      height: 0.75,
      shape: "rect"
    },
    "makeup-station": {
      family: "table",
      typeLabel: "Poste maquillage",
      shortLabel: "120 cm",
      sizeLabel: "120 x 55 cm",
      heightLabel: "H 1.75 m",
      description: "Table avec miroir pour HMUA",
      width: 1.2,
      depth: 0.55,
      height: 1.75,
      shape: "rect"
    },
    "mirror-standing": {
      family: "vflat",
      typeLabel: "Miroir",
      shortLabel: "Pied",
      sizeLabel: "60 x 170 cm",
      heightLabel: "H 1.75 m",
      description: "Miroir pied pour styling et pose",
      width: 0.6,
      depth: 0.06,
      height: 1.75,
      shape: "rect"
    }
  };

  const PALETTE_CATEGORIES = [
    {
      id: "subjects",
      label: "Sujets",
      groups: [
        {
          title: "Sujet",
          description: "Personnes et occupation du plateau.",
          variants: ["subject-adult", "subject-child", "subject-couple"]
        }
      ]
    },
    {
      id: "capture",
      label: "Capture",
      groups: [
        {
          title: "Camera",
          description: "Prise de vue photo ou video.",
          variants: ["camera-standard", "camera-high", "camera-video"]
        }
      ]
    },
    {
      id: "lights",
      label: "Lumieres",
      groups: [
        {
          title: "Sources diffuses",
          description: "Softbox, parapluies et lanternes.",
          variants: ["softbox-octa90", "softbox-octa120", "softbox-rect60x90", "softbox-rect90x120", "softbox-parabolic150", "umbrella-shoot-105", "umbrella-deep-135", "umbrella-silver-150", "lantern-65", "lantern-90"]
        },
        {
          title: "Sources dirigees",
          description: "Modeleurs plus precis, flashs et projecteurs.",
          variants: ["strip-30x120", "strip-40x140", "beauty-dish-55", "beauty-dish-70", "flash-head-compact", "flash-head-pro", "cob-led-300", "cob-led-600", "hmi-1200", "fresnel-200", "fresnel-650", "projector-19", "projector-36"]
        },
        {
          title: "LED et accessoires",
          description: "Panneaux, tubes et ring light.",
          variants: ["led-panel-1x1", "led-panel-1x2", "tube-60", "tube-120", "tube-240", "ringlight-45"]
        }
      ]
    },
    {
      id: "control",
      label: "Controle",
      groups: [
        {
          title: "Reflecteurs et rebond",
          description: "Controle doux et relance de lumiere.",
          variants: ["reflector-80", "reflector-110", "reflector-panel"]
        },
        {
          title: "Coupe-flux",
          description: "Flags, cutters et floppy.",
          variants: ["flag-60x90", "flag-90x120", "cutter-45x120", "floppy-120x120"]
        },
        {
          title: "Diffusion et flats",
          description: "Scrims, diffusion, V-flat et panneaux.",
          variants: ["scrim-100", "scrim-150", "diffusion-100x150", "diffusion-200x200", "vflat-100x200", "vflat-120x240", "foamcore-100x150", "negfill-120x200"]
        },
        {
          title: "Pieds et grip",
          description: "Supports, girafes, lest et grip de plateau.",
          variants: ["cstand-grip", "cstand-arm", "combo-stand", "roller-stand", "boom-stand", "sandbag-single", "sandbag-double"]
        },
        {
          title: "Controle plateau",
          description: "Stations tether, moniteurs et dimmer.",
          variants: ["tether-station", "monitor-station", "dimmer-desk"]
        }
      ]
    },
    {
      id: "furniture",
      label: "Mobilier",
      groups: [
        {
          title: "Assises",
          description: "Sieges et pose des sujets.",
          variants: ["stool-low", "stool-high", "chair-standard", "chair-director", "armchair-90", "ottoman-80", "bench-120", "sofa-180"]
        },
        {
          title: "Supports",
          description: "Tables, cubes, postes maquillage et boites.",
          variants: ["cube-50", "applebox-full", "applebox-half", "applebox-quarter", "table-120", "table-160", "table-round", "desk-140", "makeup-station"]
        },
        {
          title: "Plateau",
          description: "Aides de travail et accessoires volumineux.",
          variants: ["cart-rolling", "ladder-small", "mirror-standing"]
        }
      ]
    }
  ];
  const STUDIO_PRESET_CATEGORIES = [
    {
      id: "portrait",
      label: "Portrait",
      description: "Headshots, book comedien et portraits editoriaux polyvalents.",
      presets: [
        {
          id: "portrait-soft-45",
          name: "Portrait doux 45 deg",
          summary: "Octa principale, reflecteur oppose et drapeau de contour.",
          floorId: "white",
          backdropId: "neutral-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "softbox-octa120", x: 2.55, y: 2.3, rotation: 28 },
            { variantId: "reflector-110", x: 5.75, y: 3.1, rotation: 200 },
            { variantId: "flag-60x90", x: 6.35, y: 2.25, rotation: 200 }
          ]
        },
        {
          id: "headshot-corporate-clean",
          name: "Headshot corporate clean",
          summary: "Grande recta, rebond controle et station tether laterale.",
          floorId: "cream",
          backdropId: "light-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.0, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.35, y: 2.25, rotation: 30 },
            { variantId: "reflector-panel", x: 5.55, y: 3.1, rotation: 180 },
            { variantId: "vflat-100x200", x: 6.55, y: 3.05, rotation: 90 },
            { variantId: "tether-station", x: 5.95, y: 4.65, rotation: 0 }
          ]
        },
        {
          id: "actor-low-key",
          name: "Book comedien low key",
          summary: "Petite source douce, neg fill et contre de Fresnel.",
          floorId: "charcoal",
          backdropId: "charcoal",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "softbox-octa90", x: 2.55, y: 2.2, rotation: 28 },
            { variantId: "negfill-120x200", x: 5.85, y: 3.0, rotation: 90 },
            { variantId: "fresnel-200", x: 6.2, y: 1.95, rotation: 210 },
            { variantId: "flag-60x90", x: 1.7, y: 2.8, rotation: 95 }
          ]
        },
        {
          id: "daylight-vflat",
          name: "Portrait daylight V-flat",
          summary: "Diffusion large type fenetre, source COB et V-flat de retour.",
          floorId: "cream",
          backdropId: "ivory",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "diffusion-200x200", x: 2.05, y: 2.55, rotation: 90 },
            { variantId: "cob-led-600", x: 1.25, y: 2.55, rotation: 25 },
            { variantId: "vflat-120x240", x: 6.0, y: 2.9, rotation: 90 },
            { variantId: "reflector-panel", x: 4.75, y: 4.1, rotation: 0 }
          ]
        }
      ]
    },
    {
      id: "beauty",
      label: "Beauty",
      description: "Schemas propres pour peau, maquillage et glamour studio.",
      presets: [
        {
          id: "beauty-clamshell",
          name: "Beauty clamshell",
          summary: "Beauty dish frontal, reflecteur sous visage et fond propre.",
          floorId: "cream",
          backdropId: "light-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.0, rotation: 270 },
            { variantId: "beauty-dish-70", x: 4.0, y: 1.95, rotation: 90 },
            { variantId: "reflector-110", x: 4.0, y: 4.0, rotation: 270 },
            { variantId: "flag-90x120", x: 2.6, y: 2.95, rotation: 90 },
            { variantId: "flag-90x120", x: 5.4, y: 2.95, rotation: 90 }
          ]
        },
        {
          id: "beauty-ring-clean",
          name: "Beauty ring clean",
          summary: "Ring light axial avec coupe laterale et rebond frontal.",
          floorId: "cream",
          backdropId: "super-white",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.0, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.0, rotation: 270 },
            { variantId: "ringlight-45", x: 4.0, y: 2.1, rotation: 90 },
            { variantId: "flag-60x90", x: 2.7, y: 2.95, rotation: 90 },
            { variantId: "flag-60x90", x: 5.3, y: 2.95, rotation: 90 },
            { variantId: "reflector-panel", x: 4.0, y: 4.0, rotation: 270 }
          ]
        },
        {
          id: "beauty-gloss-strips",
          name: "Beauty glossy strips",
          summary: "Dish central et deux strips pour les accroches laterales.",
          floorId: "white",
          backdropId: "light-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "beauty-dish-55", x: 4.0, y: 1.95, rotation: 90 },
            { variantId: "strip-30x120", x: 2.25, y: 3.0, rotation: 18 },
            { variantId: "strip-30x120", x: 5.75, y: 3.0, rotation: 162 },
            { variantId: "reflector-panel", x: 4.0, y: 4.15, rotation: 0 }
          ]
        },
        {
          id: "makeup-editorial",
          name: "Makeup editorial",
          summary: "Double LED douce avec station maquillage et miroir.",
          floorId: "cream",
          backdropId: "blush",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "stool-high", x: 4.0, y: 3.65, rotation: 0 },
            { variantId: "camera-standard", x: 4.0, y: 5.1, rotation: 270 },
            { variantId: "led-panel-1x2", x: 2.4, y: 2.35, rotation: 32 },
            { variantId: "led-panel-1x2", x: 5.45, y: 2.3, rotation: 148 },
            { variantId: "mirror-standing", x: 6.0, y: 2.8, rotation: 270 },
            { variantId: "makeup-station", x: 6.3, y: 3.75, rotation: 270 }
          ]
        }
      ]
    },
    {
      id: "corporate",
      label: "Corporate",
      description: "Portrait business, dirigeant et communication d entreprise.",
      presets: [
        {
          id: "corporate-gray-clean",
          name: "Corporate gris propre",
          summary: "Recta cle, rebond doux et tether pour flux rapide.",
          floorId: "light-gray",
          backdropId: "neutral-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.35, y: 2.35, rotation: 30 },
            { variantId: "reflector-110", x: 5.7, y: 3.1, rotation: 190 },
            { variantId: "flag-60x90", x: 6.35, y: 2.3, rotation: 200 },
            { variantId: "tether-station", x: 5.9, y: 4.6, rotation: 0 }
          ]
        },
        {
          id: "executive-desk",
          name: "Portrait dirigeant bureau",
          summary: "Bureau hero, LED cle et fond structure video corporate.",
          floorId: "sand",
          backdropId: "steel",
          items: [
            { variantId: "desk-140", x: 4.0, y: 3.65, rotation: 0 },
            { variantId: "chair-standard", x: 4.0, y: 4.1, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.15, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "led-panel-1x2", x: 2.4, y: 2.35, rotation: 30 },
            { variantId: "tube-120", x: 6.15, y: 1.85, rotation: 180 },
            { variantId: "monitor-station", x: 5.9, y: 4.55, rotation: 0 }
          ]
        },
        {
          id: "linkedin-umbrella",
          name: "LinkedIn umbrella",
          summary: "Parapluie diffusant, petit fill et fond pastel corporate.",
          floorId: "cream",
          backdropId: "powder-blue",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "umbrella-shoot-105", x: 2.45, y: 2.2, rotation: 34 },
            { variantId: "reflector-80", x: 5.7, y: 3.0, rotation: 196 },
            { variantId: "vflat-100x200", x: 6.55, y: 3.05, rotation: 90 }
          ]
        }
      ]
    },
    {
      id: "mode",
      label: "Mode",
      description: "Silhouettes, plein pied et eclairage editoriale plus contraste.",
      presets: [
        {
          id: "fashion-parabolic",
          name: "Mode parabolique plus strips",
          summary: "Grande source cle, deux strips d accent et neg fill lateral.",
          floorId: "light-gray",
          backdropId: "white",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.0, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "softbox-parabolic150", x: 2.3, y: 2.15, rotation: 30 },
            { variantId: "strip-40x140", x: 2.2, y: 4.2, rotation: 340 },
            { variantId: "strip-40x140", x: 5.85, y: 4.05, rotation: 200 },
            { variantId: "negfill-120x200", x: 6.6, y: 3.0, rotation: 90 }
          ]
        },
        {
          id: "catalog-clean",
          name: "Plein pied catalogue",
          summary: "Deux grandes rectas croisees et grand rebond frontal.",
          floorId: "white",
          backdropId: "cream",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.35, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.15, y: 2.3, rotation: 24 },
            { variantId: "softbox-rect90x120", x: 5.9, y: 2.35, rotation: 156 },
            { variantId: "reflector-panel", x: 4.0, y: 4.55, rotation: 0 }
          ]
        },
        {
          id: "fashion-silhouette-strips",
          name: "Silhouette strips",
          summary: "Deux bandes laterales pour detacher la silhouette sur fond dense.",
          floorId: "charcoal",
          backdropId: "dark-gray",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.15, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "strip-40x140", x: 2.15, y: 2.9, rotation: 8 },
            { variantId: "strip-40x140", x: 5.85, y: 2.9, rotation: 172 },
            { variantId: "reflector-panel", x: 4.0, y: 4.4, rotation: 0 }
          ]
        },
        {
          id: "editorial-projector",
          name: "Editorial projector",
          summary: "Projecteur optique, fill doux et coupe laterale pour texture mode.",
          floorId: "charcoal",
          backdropId: "clay",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.0, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "projector-19", x: 2.25, y: 2.15, rotation: 28 },
            { variantId: "softbox-octa90", x: 5.65, y: 2.45, rotation: 150 },
            { variantId: "flag-90x120", x: 1.35, y: 2.9, rotation: 90 },
            { variantId: "flag-90x120", x: 6.65, y: 2.9, rotation: 90 },
            { variantId: "applebox-full", x: 5.65, y: 4.45, rotation: 0 }
          ]
        },
        {
          id: "highkey-umbrellas",
          name: "High key umbrellas",
          summary: "Double parapluie profond, rebond frontal et V-flats pour le blanc.",
          floorId: "white",
          backdropId: "super-white",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.2, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "umbrella-deep-135", x: 2.05, y: 2.3, rotation: 28 },
            { variantId: "umbrella-deep-135", x: 5.95, y: 2.3, rotation: 152 },
            { variantId: "reflector-panel", x: 4.0, y: 4.5, rotation: 0 },
            { variantId: "vflat-120x240", x: 1.1, y: 2.95, rotation: 90 },
            { variantId: "vflat-120x240", x: 6.9, y: 2.95, rotation: 90 }
          ]
        }
      ]
    },
    {
      id: "product",
      label: "Produit",
      description: "Packshots, table-top et plateaux publicitaires controles.",
      presets: [
        {
          id: "packshot-tabletop",
          name: "Packshot table-top",
          summary: "Table produit, deux rectas, diffusion frontale et rebonds.",
          floorId: "white",
          backdropId: "white",
          items: [
            { variantId: "table-120", x: 4.0, y: 2.95, rotation: 0 },
            { variantId: "camera-standard", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "softbox-rect60x90", x: 2.55, y: 2.1, rotation: 34 },
            { variantId: "softbox-rect60x90", x: 5.45, y: 2.1, rotation: 146 },
            { variantId: "diffusion-100x150", x: 4.0, y: 1.55, rotation: 0 },
            { variantId: "reflector-panel", x: 4.0, y: 4.15, rotation: 0 },
            { variantId: "applebox-full", x: 5.85, y: 4.45, rotation: 0 }
          ]
        },
        {
          id: "bottle-specular",
          name: "Bouteille speculaire",
          summary: "Deux strips, grande diffusion frontale et coupe noire laterale.",
          floorId: "white",
          backdropId: "white",
          items: [
            { variantId: "table-120", x: 4.0, y: 2.95, rotation: 0 },
            { variantId: "camera-standard", x: 4.0, y: 5.0, rotation: 270 },
            { variantId: "strip-30x120", x: 2.45, y: 2.45, rotation: 26 },
            { variantId: "strip-30x120", x: 5.55, y: 2.45, rotation: 154 },
            { variantId: "diffusion-200x200", x: 4.0, y: 1.55, rotation: 0 },
            { variantId: "negfill-120x200", x: 6.6, y: 2.95, rotation: 90 },
            { variantId: "applebox-half", x: 5.7, y: 4.35, rotation: 0 }
          ]
        },
        {
          id: "jewelry-scrim",
          name: "Bijou scrim control",
          summary: "Petite source COB, scrim de coupe et fill discret.",
          floorId: "white",
          backdropId: "light-gray",
          items: [
            { variantId: "table-120", x: 4.0, y: 3.0, rotation: 0 },
            { variantId: "camera-high", x: 4.0, y: 5.05, rotation: 270 },
            { variantId: "cob-led-300", x: 2.15, y: 2.25, rotation: 32 },
            { variantId: "scrim-100", x: 2.85, y: 2.6, rotation: 24 },
            { variantId: "reflector-80", x: 5.35, y: 3.0, rotation: 180 },
            { variantId: "flag-60x90", x: 6.1, y: 2.45, rotation: 200 },
            { variantId: "applebox-quarter", x: 5.7, y: 4.25, rotation: 0 }
          ]
        },
        {
          id: "food-editorial",
          name: "Food editorial top light",
          summary: "Lantern haute, retours mousse et chariot de styling.",
          floorId: "cream",
          backdropId: "oat",
          items: [
            { variantId: "table-160", x: 4.0, y: 3.25, rotation: 0 },
            { variantId: "camera-high", x: 4.0, y: 5.1, rotation: 270 },
            { variantId: "lantern-90", x: 4.0, y: 1.75, rotation: 90 },
            { variantId: "foamcore-100x150", x: 5.55, y: 2.95, rotation: 90 },
            { variantId: "vflat-100x200", x: 2.1, y: 2.95, rotation: 90 },
            { variantId: "cart-rolling", x: 6.45, y: 4.45, rotation: 0 }
          ]
        },
        {
          id: "flatlay-clothing",
          name: "Flatlay vetement",
          summary: "Camera haute, double grande recta et echelle de prise de vue.",
          floorId: "white",
          backdropId: "super-white",
          items: [
            { variantId: "table-160", x: 4.0, y: 3.1, rotation: 0 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "ladder-small", x: 5.95, y: 5.05, rotation: 0 },
            { variantId: "softbox-rect90x120", x: 2.15, y: 2.2, rotation: 28 },
            { variantId: "softbox-rect90x120", x: 5.85, y: 2.2, rotation: 152 },
            { variantId: "reflector-panel", x: 4.0, y: 4.35, rotation: 0 }
          ]
        }
      ]
    },
    {
      id: "group",
      label: "Groupe",
      description: "Duo, famille, enfants et petites equipes en studio.",
      presets: [
        {
          id: "duo-soft-wide",
          name: "Duo source large",
          summary: "Grande octa cle, panel d appoint et drapeaux lateraux.",
          floorId: "light-gray",
          backdropId: "dark-gray",
          items: [
            { variantId: "subject-couple", x: 4.0, y: 3.2, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "softbox-parabolic150", x: 2.3, y: 2.1, rotation: 28 },
            { variantId: "led-panel-1x2", x: 5.85, y: 2.4, rotation: 150 },
            { variantId: "flag-90x120", x: 1.35, y: 2.9, rotation: 90 },
            { variantId: "flag-90x120", x: 6.65, y: 2.9, rotation: 90 },
            { variantId: "bench-120", x: 4.0, y: 3.85, rotation: 0 }
          ]
        },
        {
          id: "family-soft-daylight",
          name: "Famille soft daylight",
          summary: "Grande source type fenetre, banc et retour frontal doux.",
          floorId: "cream",
          backdropId: "vanilla",
          items: [
            { variantId: "subject-adult", x: 3.35, y: 3.2, rotation: 270 },
            { variantId: "subject-child", x: 4.75, y: 3.25, rotation: 270 },
            { variantId: "subject-child", x: 5.35, y: 3.25, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "softbox-parabolic150", x: 2.15, y: 2.1, rotation: 28 },
            { variantId: "reflector-panel", x: 5.85, y: 3.65, rotation: 180 },
            { variantId: "bench-120", x: 4.25, y: 3.95, rotation: 0 }
          ]
        },
        {
          id: "trio-corporate",
          name: "Trio corporate",
          summary: "Double recta propre pour equipe ou associes.",
          floorId: "light-gray",
          backdropId: "steel",
          items: [
            { variantId: "subject-couple", x: 3.55, y: 3.15, rotation: 270 },
            { variantId: "subject-adult", x: 5.25, y: 3.15, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.1, y: 2.2, rotation: 28 },
            { variantId: "softbox-rect90x120", x: 5.95, y: 2.25, rotation: 152 },
            { variantId: "reflector-panel", x: 4.0, y: 4.4, rotation: 0 },
            { variantId: "bench-120", x: 4.2, y: 3.95, rotation: 0 }
          ]
        },
        {
          id: "kids-playful",
          name: "Kids playful",
          summary: "Double parapluie doux, cubes et fond plus vivant.",
          floorId: "cream",
          backdropId: "coral",
          items: [
            { variantId: "subject-child", x: 3.55, y: 3.15, rotation: 270 },
            { variantId: "subject-child", x: 4.55, y: 3.2, rotation: 270 },
            { variantId: "cube-50", x: 3.1, y: 3.65, rotation: 0 },
            { variantId: "cube-50", x: 5.05, y: 3.7, rotation: 0 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "umbrella-shoot-105", x: 2.2, y: 2.25, rotation: 34 },
            { variantId: "umbrella-shoot-105", x: 5.8, y: 2.25, rotation: 146 }
          ]
        }
      ]
    },
    {
      id: "boudoir",
      label: "Boudoir",
      description: "Ambiances intimes, douces ou luxueuses pour series boudoir.",
      presets: [
        {
          id: "boudoir-window-soft",
          name: "Boudoir fenetre douce",
          summary: "Grande diffusion laterale, sofa et retour naturel type hotel.",
          floorId: "cream",
          backdropId: "ivory",
          items: [
            { variantId: "sofa-180", x: 4.0, y: 3.55, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.15, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "diffusion-200x200", x: 2.05, y: 2.45, rotation: 90 },
            { variantId: "cob-led-600", x: 1.15, y: 2.45, rotation: 28 },
            { variantId: "vflat-120x240", x: 6.1, y: 2.9, rotation: 90 },
            { variantId: "ottoman-80", x: 5.45, y: 4.15, rotation: 0 }
          ]
        },
        {
          id: "boudoir-armchair-lowkey",
          name: "Boudoir fauteuil low key",
          summary: "Parapluie argent, neg fill et accent tube pour contraste chic.",
          floorId: "charcoal",
          backdropId: "cocoa",
          items: [
            { variantId: "armchair-90", x: 4.0, y: 3.45, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "umbrella-silver-150", x: 2.15, y: 2.15, rotation: 28 },
            { variantId: "negfill-120x200", x: 6.45, y: 3.0, rotation: 90 },
            { variantId: "tube-120", x: 6.15, y: 1.9, rotation: 180 }
          ]
        },
        {
          id: "boudoir-lantern-lounge",
          name: "Boudoir lantern lounge",
          summary: "Lantern haute, fill lateral et petit salon editorial.",
          floorId: "sand",
          backdropId: "blush",
          items: [
            { variantId: "sofa-180", x: 4.0, y: 3.55, rotation: 0 },
            { variantId: "subject-adult", x: 3.75, y: 3.15, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "lantern-90", x: 4.0, y: 1.7, rotation: 90 },
            { variantId: "strip-30x120", x: 6.0, y: 2.4, rotation: 168 },
            { variantId: "reflector-panel", x: 2.35, y: 3.55, rotation: 0 },
            { variantId: "ottoman-80", x: 5.2, y: 4.25, rotation: 0 }
          ]
        },
        {
          id: "boudoir-parabolic",
          name: "Boudoir parabolic",
          summary: "Grande source enveloppante, accent vertical et miroir d ambiance.",
          floorId: "cream",
          backdropId: "dusty-rose",
          items: [
            { variantId: "armchair-90", x: 4.0, y: 3.4, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "softbox-parabolic150", x: 2.2, y: 2.1, rotation: 30 },
            { variantId: "strip-40x140", x: 5.95, y: 3.35, rotation: 176 },
            { variantId: "mirror-standing", x: 6.45, y: 2.9, rotation: 270 }
          ]
        }
      ]
    },
    {
      id: "erotique",
      label: "Erotique",
      description: "Setups sensuels, low key ou graphiques, sans surcharge de scene.",
      presets: [
        {
          id: "erotique-silhouette-burgundy",
          name: "Erotique silhouette bordeaux",
          summary: "Deux strips de contour et fond bordeaux pour lignes plus denses.",
          floorId: "charcoal",
          backdropId: "burgundy",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "strip-40x140", x: 2.1, y: 2.95, rotation: 10 },
            { variantId: "strip-40x140", x: 5.9, y: 2.95, rotation: 170 },
            { variantId: "projector-36", x: 4.0, y: 1.65, rotation: 90 }
          ]
        },
        {
          id: "erotique-projector-shadow",
          name: "Erotique shadow projector",
          summary: "Projecteur optique, rim Fresnel et neg fill tres controle.",
          floorId: "black",
          backdropId: "charcoal",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "projector-19", x: 2.25, y: 2.15, rotation: 28 },
            { variantId: "fresnel-650", x: 6.15, y: 2.2, rotation: 150 },
            { variantId: "negfill-120x200", x: 6.55, y: 3.3, rotation: 90 }
          ]
        },
        {
          id: "erotique-neon-tubes",
          name: "Erotique neon tubes",
          summary: "Deux tubes longs et un COB frontal pour ambiance neon studio.",
          floorId: "charcoal",
          backdropId: "plum",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "tube-240", x: 2.05, y: 2.9, rotation: 6 },
            { variantId: "tube-240", x: 5.95, y: 2.9, rotation: 174 },
            { variantId: "cob-led-300", x: 4.0, y: 1.95, rotation: 90 }
          ]
        },
        {
          id: "erotique-sofa-contrast",
          name: "Erotique sofa contrast",
          summary: "Sofa central, parapluie argent et bande laterale de separation.",
          floorId: "charcoal",
          backdropId: "brick",
          items: [
            { variantId: "sofa-180", x: 4.0, y: 3.55, rotation: 0 },
            { variantId: "subject-adult", x: 4.1, y: 3.15, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "umbrella-silver-150", x: 2.15, y: 2.1, rotation: 28 },
            { variantId: "strip-30x120", x: 5.95, y: 3.15, rotation: 176 },
            { variantId: "reflector-panel", x: 2.55, y: 4.05, rotation: 340 }
          ]
        }
      ]
    },
    {
      id: "nu",
      label: "Nu artistique",
      description: "Eclairages sculpturaux, high key ou graphiques pour nu d art.",
      presets: [
        {
          id: "nu-sculptural-hard",
          name: "Nu sculptural hard",
          summary: "Fresnel dur, petit fill et coupe laterale pour volumes marques.",
          floorId: "charcoal",
          backdropId: "charcoal",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "fresnel-650", x: 2.25, y: 2.15, rotation: 30 },
            { variantId: "reflector-80", x: 5.35, y: 3.45, rotation: 210 },
            { variantId: "flag-90x120", x: 6.25, y: 2.85, rotation: 90 }
          ]
        },
        {
          id: "nu-high-key-classic",
          name: "Nu high key classique",
          summary: "Double grande recta et rebond frontal pour rendu propre et doux.",
          floorId: "white",
          backdropId: "super-white",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.2, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "softbox-rect90x120", x: 2.1, y: 2.25, rotation: 28 },
            { variantId: "softbox-rect90x120", x: 5.9, y: 2.25, rotation: 152 },
            { variantId: "reflector-panel", x: 4.0, y: 4.45, rotation: 0 }
          ]
        },
        {
          id: "nu-outline-backlight",
          name: "Nu outline backlight",
          summary: "Deux bandes arriere et neg fill frontal pour contour pur.",
          floorId: "black",
          backdropId: "black",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.2, rotation: 270 },
            { variantId: "strip-40x140", x: 2.15, y: 2.45, rotation: 24 },
            { variantId: "strip-40x140", x: 5.85, y: 2.45, rotation: 156 },
            { variantId: "negfill-120x200", x: 4.0, y: 4.15, rotation: 0 }
          ]
        },
        {
          id: "nu-graphic-projector",
          name: "Nu graphique projector",
          summary: "Projection de motif, V-flat et retour mousse pour dessin plus abstrait.",
          floorId: "cream",
          backdropId: "sand",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "projector-36", x: 2.2, y: 2.15, rotation: 28 },
            { variantId: "vflat-100x200", x: 6.1, y: 2.95, rotation: 90 },
            { variantId: "foamcore-100x150", x: 5.2, y: 4.1, rotation: 0 }
          ]
        }
      ]
    },
    {
      id: "video",
      label: "Video",
      description: "Interviews, podcast, greenscreen et plateaux hybrides.",
      presets: [
        {
          id: "interview-led",
          name: "Interview LED 2 points",
          summary: "Panneau cle, panneau fill, tube de separation et fauteuil.",
          floorId: "sand",
          backdropId: "steel",
          items: [
            { variantId: "armchair-90", x: 4.0, y: 3.2, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "led-panel-1x2", x: 2.45, y: 2.35, rotation: 32 },
            { variantId: "led-panel-1x1", x: 5.55, y: 2.7, rotation: 150 },
            { variantId: "tube-120", x: 6.35, y: 1.95, rotation: 180 },
            { variantId: "monitor-station", x: 5.7, y: 4.6, rotation: 0 }
          ]
        },
        {
          id: "podcast-desk",
          name: "Podcast desk",
          summary: "Bureau, double LED, fond tube et station de controle.",
          floorId: "sand",
          backdropId: "teal",
          items: [
            { variantId: "desk-140", x: 4.0, y: 3.45, rotation: 0 },
            { variantId: "chair-standard", x: 4.0, y: 3.95, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "led-panel-1x2", x: 2.35, y: 2.3, rotation: 30 },
            { variantId: "led-panel-1x1", x: 5.75, y: 2.55, rotation: 152 },
            { variantId: "tube-120", x: 6.2, y: 1.95, rotation: 180 },
            { variantId: "monitor-station", x: 5.95, y: 4.55, rotation: 0 },
            { variantId: "dimmer-desk", x: 6.55, y: 4.65, rotation: 0 }
          ]
        },
        {
          id: "greenscreen-presenter",
          name: "Greenscreen presenter",
          summary: "Presenter simple, double source frontale et fonds uniformises.",
          floorId: "neutral-gray",
          backdropId: "chroma",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.1, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "cob-led-600", x: 2.35, y: 2.2, rotation: 30 },
            { variantId: "cob-led-300", x: 5.65, y: 2.45, rotation: 152 },
            { variantId: "led-panel-1x2", x: 1.55, y: 1.85, rotation: 45 },
            { variantId: "led-panel-1x2", x: 6.45, y: 1.85, rotation: 135 }
          ]
        },
        {
          id: "masterclass-soft",
          name: "Masterclass soft",
          summary: "Lantern de dessus, bureau sobre et controle video laterale.",
          floorId: "cream",
          backdropId: "steel",
          items: [
            { variantId: "desk-140", x: 4.0, y: 3.55, rotation: 0 },
            { variantId: "stool-high", x: 4.0, y: 4.0, rotation: 0 },
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "lantern-90", x: 4.0, y: 1.65, rotation: 90 },
            { variantId: "tube-120", x: 6.2, y: 2.1, rotation: 180 },
            { variantId: "monitor-station", x: 5.95, y: 4.55, rotation: 0 }
          ]
        },
        {
          id: "fashion-bts-video",
          name: "Fashion BTS video",
          summary: "Tubes longs, panneau central et chariot de plateau pour BTS.",
          floorId: "charcoal",
          backdropId: "cobalt",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-video", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "tube-240", x: 2.15, y: 2.8, rotation: 14 },
            { variantId: "tube-240", x: 5.85, y: 2.8, rotation: 166 },
            { variantId: "led-panel-1x2", x: 4.0, y: 1.95, rotation: 90 },
            { variantId: "cart-rolling", x: 6.35, y: 4.45, rotation: 0 },
            { variantId: "monitor-station", x: 5.65, y: 4.65, rotation: 0 }
          ]
        }
      ]
    },
    {
      id: "creative",
      label: "Creatif",
      description: "Presets de projection, miroir, chroma et ombres dessinees.",
      presets: [
        {
          id: "cinema-gobo",
          name: "Cinema gobo",
          summary: "Projecteur optique, Fresnel d accent et drapeaux type cinema.",
          floorId: "charcoal",
          backdropId: "olive",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "projector-19", x: 2.2, y: 2.15, rotation: 28 },
            { variantId: "fresnel-650", x: 5.95, y: 2.15, rotation: 152 },
            { variantId: "flag-90x120", x: 1.35, y: 2.9, rotation: 90 },
            { variantId: "cutter-45x120", x: 6.45, y: 3.1, rotation: 90 }
          ]
        },
        {
          id: "mirror-tubes",
          name: "Mirror tubes",
          summary: "Miroir debout et tubes LED pour rendu editorial reflexif.",
          floorId: "black",
          backdropId: "cobalt",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "mirror-standing", x: 5.85, y: 3.0, rotation: 270 },
            { variantId: "tube-240", x: 2.1, y: 2.95, rotation: 8 },
            { variantId: "tube-240", x: 5.95, y: 1.95, rotation: 180 }
          ]
        },
        {
          id: "chroma-pop",
          name: "Chroma pop",
          summary: "Fond chroma bleu avec contre uniformes et cle douce.",
          floorId: "neutral-gray",
          backdropId: "chroma-blue",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-standard", x: 4.0, y: 5.1, rotation: 270 },
            { variantId: "softbox-octa120", x: 2.35, y: 2.2, rotation: 28 },
            { variantId: "led-panel-1x2", x: 6.15, y: 1.9, rotation: 160 },
            { variantId: "led-panel-1x2", x: 1.85, y: 1.9, rotation: 20 }
          ]
        },
        {
          id: "shadow-play",
          name: "Shadow play",
          summary: "Fresnel, cutter et V-flat pour ombres nettes et graphiques.",
          floorId: "cream",
          backdropId: "stone",
          items: [
            { variantId: "subject-adult", x: 4.0, y: 3.05, rotation: 270 },
            { variantId: "camera-high", x: 4.0, y: 5.15, rotation: 270 },
            { variantId: "fresnel-200", x: 2.2, y: 2.15, rotation: 28 },
            { variantId: "cutter-45x120", x: 2.9, y: 2.55, rotation: 30 },
            { variantId: "vflat-120x240", x: 6.1, y: 2.95, rotation: 90 },
            { variantId: "foamcore-100x150", x: 5.1, y: 4.15, rotation: 0 }
          ]
        }
      ]
    }
  ];

  const refs = {
    librarySearch: document.getElementById("librarySearch"),
    categoryTabs: document.getElementById("categoryTabs"),
    palettePanel: document.getElementById("palettePanel"),
    floorMenuSwatches: document.getElementById("floorMenuSwatches"),
    backdropMenuSwatches: document.getElementById("backdropMenuSwatches"),
    presetMenuList: document.getElementById("presetMenuList"),
    actionSavePreset: document.getElementById("actionSavePreset"),
    languageMenuList: document.getElementById("languageMenuList"),
    selectionPanel: document.getElementById("selectionPanel"),
    studioBadge: document.getElementById("studioBadge"),
    countBadge: document.getElementById("countBadge"),
    planCanvas: document.getElementById("planCanvas"),
    isoCanvas: document.getElementById("isoCanvas"),
    measureToggle: document.getElementById("measureToggle"),
    planZoomOut: document.getElementById("planZoomOut"),
    planZoomReset: document.getElementById("planZoomReset"),
    planZoomIn: document.getElementById("planZoomIn"),
    isoZoomOut: document.getElementById("isoZoomOut"),
    isoZoomReset: document.getElementById("isoZoomReset"),
    isoZoomIn: document.getElementById("isoZoomIn"),
    menus: Array.from(document.querySelectorAll(".menu")),
    menuTriggers: Array.from(document.querySelectorAll("[data-menu-trigger]")),
    menuPanels: Array.from(document.querySelectorAll(".menu-panel")),
    menuActions: Array.from(document.querySelectorAll("[data-menu-action]"))
  };

  const planCtx = refs.planCanvas.getContext("2d");
  const isoCtx = refs.isoCanvas.getContext("2d");
  const launchOptions = getLaunchOptions();

  const state = {
    floorId: FLOOR_COLORS[0].id,
    backdropId: BACKDROP_COLORS[3].id,
    activeCategoryId: PALETTE_CATEGORIES[0].id,
    language: launchOptions.language || detectInitialLanguage(),
    paletteQuery: "",
    customPresets: loadCustomPresets(),
    items: [],
    selectedId: null,
    interaction: null,
    hoverItemId: null,
    hoverHandle: false,
    measurementMode: false,
    measureStart: null,
    measurePreview: null,
    measureEnd: null,
    openMenu: null,
    planZoom: 1,
    planPanX: 0,
    planPanY: 0,
    activePointers: new Map(),
    pinchGesture: null,
    isoZoom: 1,
    nextId: 1
  };

  function detectInitialLanguage() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY_LANGUAGE);
      if (stored && LANGUAGE_OPTIONS.some(function (option) { return option.id === stored; })) {
        return stored;
      }
    } catch (error) {
      // Ignore storage access issues and fallback to browser language.
    }

    const browserLanguage = String(navigator.language || "fr").slice(0, 2).toLowerCase();
    return LANGUAGE_OPTIONS.some(function (option) { return option.id === browserLanguage; }) ? browserLanguage : "fr";
  }

  function getLaunchOptions() {
    try {
      const params = new URLSearchParams(window.location.search);
      const language = String(params.get("lang") || "").slice(0, 2).toLowerCase();
      const preset = String(params.get("preset") || "").trim();
      return {
        language: LANGUAGE_OPTIONS.some(function (option) { return option.id === language; }) ? language : "",
        preset: preset
      };
    } catch (error) {
      return { language: "", preset: "" };
    }
  }

  function getLocaleBundle(language) {
    return LOCALES[language || state.language] || LOCALES.fr;
  }

  function interpolateText(template, replacements) {
    if (!replacements) return template;
    return Object.keys(replacements).reduce(function (result, key) {
      return result.replace(new RegExp(`\\{${key}\\}`, "g"), String(replacements[key]));
    }, template);
  }

  function t(path, replacements) {
    const parts = path.split(".");
    const bundles = [getLocaleBundle(), LOCALES.fr];

    for (let index = 0; index < bundles.length; index += 1) {
      let value = bundles[index];
      for (let partIndex = 0; partIndex < parts.length; partIndex += 1) {
        value = value && typeof value === "object" ? value[parts[partIndex]] : undefined;
      }
      if (typeof value === "string") {
        return interpolateText(value, replacements);
      }
    }

    return path;
  }

  function getLocalizedPaletteCategoryLabel(category) {
    const bundle = getLocaleBundle();
    return (bundle.paletteCategories && bundle.paletteCategories[category.id]) || category.label;
  }

  function getLocalizedPaletteGroupCopy(categoryId, groupIndex, group) {
    const bundle = getLocaleBundle();
    const groupSet = bundle.paletteGroups && bundle.paletteGroups[categoryId];
    const groupCopy = groupSet && groupSet[groupIndex];
    return {
      title: groupCopy && groupCopy.title ? groupCopy.title : group.title,
      description: groupCopy && groupCopy.description ? groupCopy.description : group.description
    };
  }

  function getLocalizedPresetCategory(category) {
    if (category.id === "custom") {
      return {
        label: getUiCopy("customPresets"),
        description: getUiCopy("customPresetsDescription")
      };
    }

    const bundle = getLocaleBundle();
    const categoryCopy = bundle.presetCategories && bundle.presetCategories[category.id];
    return {
      label: categoryCopy && categoryCopy.label ? categoryCopy.label : category.label,
      description: categoryCopy && categoryCopy.description ? categoryCopy.description : category.description
    };
  }

  const LOCALE_CODES = {
    fr: "fr-FR",
    en: "en-US",
    es: "es-ES",
    de: "de-DE",
    ar: "ar-SA"
  };

  const TYPE_LABEL_TRANSLATIONS = {
    en: {
      "Sujet": "Subject",
      "Appareil": "Camera",
      "Camera video": "Video camera",
      "Softbox": "Softbox",
      "Striplight": "Striplight",
      "Tube LED": "LED tube",
      "Panneau LED": "LED panel",
      "Beauty Dish": "Beauty dish",
      "Parapluie diffusant": "Shoot-through umbrella",
      "Parapluie profond": "Deep umbrella",
      "Parapluie argent": "Silver umbrella",
      "Lantern": "Lantern",
      "Ring Light": "Ring light",
      "Fresnel": "Fresnel",
      "Projecteur optique": "Optical projector",
      "Reflecteur": "Reflector",
      "Reflecteur panneau": "Panel reflector",
      "Drapeau": "Flag",
      "Cutter": "Cutter",
      "Floppy": "Floppy",
      "Scrim": "Scrim",
      "Cadre diffusion": "Diffusion frame",
      "V-Flat": "V-flat",
      "Foamcore": "Foamcore",
      "Negative Fill": "Negative fill",
      "Tabouret": "Stool",
      "Chaise": "Chair",
      "Chaise realisateur": "Director chair",
      "Banc": "Bench",
      "Canape": "Sofa",
      "Cube posing": "Posing cube",
      "Apple Box": "Apple box",
      "Table": "Table",
      "Table ronde": "Round table",
      "Chariot": "Cart",
      "Escabeau": "Step ladder",
      "Tete flash": "Flash head",
      "COB LED": "COB LED",
      "HMI": "HMI",
      "Pied C": "C-stand",
      "Pied combo": "Combo stand",
      "Pied roller": "Roller stand",
      "Girafe": "Boom stand",
      "Sac de lest": "Sandbag",
      "Station tether": "Tether station",
      "Moniteur controle": "Control monitor",
      "Console dimmer": "Dimmer desk",
      "Fauteuil": "Armchair",
      "Pouf": "Ottoman",
      "Bureau": "Desk",
      "Poste maquillage": "Makeup station",
      "Miroir": "Mirror"
    },
    es: {
      "Sujet": "Sujeto",
      "Appareil": "Camara",
      "Camera video": "Camara de video",
      "Softbox": "Softbox",
      "Striplight": "Striplight",
      "Tube LED": "Tubo LED",
      "Panneau LED": "Panel LED",
      "Beauty Dish": "Beauty dish",
      "Parapluie diffusant": "Paraguas difusor",
      "Parapluie profond": "Paraguas profundo",
      "Parapluie argent": "Paraguas plateado",
      "Lantern": "Lantern",
      "Ring Light": "Ring light",
      "Fresnel": "Fresnel",
      "Projecteur optique": "Proyector optico",
      "Reflecteur": "Reflector",
      "Reflecteur panneau": "Reflector panel",
      "Drapeau": "Flag",
      "Cutter": "Cutter",
      "Floppy": "Floppy",
      "Scrim": "Scrim",
      "Cadre diffusion": "Marco difusor",
      "V-Flat": "V-flat",
      "Foamcore": "Foamcore",
      "Negative Fill": "Negative fill",
      "Tabouret": "Taburete",
      "Chaise": "Silla",
      "Chaise realisateur": "Silla de director",
      "Banc": "Banco",
      "Canape": "Sofa",
      "Cube posing": "Cubo de posing",
      "Apple Box": "Apple box",
      "Table": "Mesa",
      "Table ronde": "Mesa redonda",
      "Chariot": "Carro",
      "Escabeau": "Escalera",
      "Tete flash": "Cabezal flash",
      "COB LED": "COB LED",
      "HMI": "HMI",
      "Pied C": "C-stand",
      "Pied combo": "Pie combo",
      "Pied roller": "Pie roller",
      "Girafe": "Jirafa",
      "Sac de lest": "Saco de lastre",
      "Station tether": "Estacion tether",
      "Moniteur controle": "Monitor de control",
      "Console dimmer": "Consola dimmer",
      "Fauteuil": "Sillon",
      "Pouf": "Puf",
      "Bureau": "Escritorio",
      "Poste maquillage": "Puesto de maquillaje",
      "Miroir": "Espejo"
    },
    de: {
      "Sujet": "Motiv",
      "Appareil": "Kamera",
      "Camera video": "Videokamera",
      "Softbox": "Softbox",
      "Striplight": "Striplight",
      "Tube LED": "LED-Tube",
      "Panneau LED": "LED-Panel",
      "Beauty Dish": "Beauty Dish",
      "Parapluie diffusant": "Durchlichtschirm",
      "Parapluie profond": "Tiefschirm",
      "Parapluie argent": "Silberschirm",
      "Lantern": "Lantern",
      "Ring Light": "Ringlicht",
      "Fresnel": "Fresnel",
      "Projecteur optique": "Optischer Projektor",
      "Reflecteur": "Reflektor",
      "Reflecteur panneau": "Panel-Reflektor",
      "Drapeau": "Flag",
      "Cutter": "Cutter",
      "Floppy": "Floppy",
      "Scrim": "Scrim",
      "Cadre diffusion": "Diffusionsrahmen",
      "V-Flat": "V-Flat",
      "Foamcore": "Foamcore",
      "Negative Fill": "Negative Fill",
      "Tabouret": "Hocker",
      "Chaise": "Stuhl",
      "Chaise realisateur": "Regiestuhl",
      "Banc": "Bank",
      "Canape": "Sofa",
      "Cube posing": "Posing-Wurfel",
      "Apple Box": "Apple Box",
      "Table": "Tisch",
      "Table ronde": "Runder Tisch",
      "Chariot": "Wagen",
      "Escabeau": "Trittleiter",
      "Tete flash": "Blitzkopf",
      "COB LED": "COB LED",
      "HMI": "HMI",
      "Pied C": "C-Stand",
      "Pied combo": "Combo-Stand",
      "Pied roller": "Roller-Stand",
      "Girafe": "Galgenstativ",
      "Sac de lest": "Sandsack",
      "Station tether": "Tether-Station",
      "Moniteur controle": "Kontrollmonitor",
      "Console dimmer": "Dimmer-Pult",
      "Fauteuil": "Sessel",
      "Pouf": "Pouf",
      "Bureau": "Schreibtisch",
      "Poste maquillage": "Make-up-Station",
      "Miroir": "Spiegel"
    },
    ar: {
      "Sujet": "موضوع",
      "Appareil": "كاميرا",
      "Camera video": "كاميرا فيديو",
      "Softbox": "سوفت بوكس",
      "Striplight": "ستريب لايت",
      "Tube LED": "أنبوب LED",
      "Panneau LED": "لوح LED",
      "Beauty Dish": "بيوتي ديش",
      "Parapluie diffusant": "مظلة ناشرة",
      "Parapluie profond": "مظلة عميقة",
      "Parapluie argent": "مظلة فضية",
      "Lantern": "لانترن",
      "Ring Light": "رينغ لايت",
      "Fresnel": "فريسنل",
      "Projecteur optique": "بروجكتور بصري",
      "Reflecteur": "عاكس",
      "Reflecteur panneau": "عاكس لوحي",
      "Drapeau": "فلاج",
      "Cutter": "كاتر",
      "Floppy": "فلوبي",
      "Scrim": "سكريم",
      "Cadre diffusion": "إطار ديفيوجن",
      "V-Flat": "في-فلات",
      "Foamcore": "فوم كور",
      "Negative Fill": "نيغاتيف فيل",
      "Tabouret": "تابوريه",
      "Chaise": "كرسي",
      "Chaise realisateur": "كرسي مخرج",
      "Banc": "مقعد",
      "Canape": "أريكة",
      "Cube posing": "مكعب بوزينغ",
      "Apple Box": "أبل بوكس",
      "Table": "طاولة",
      "Table ronde": "طاولة دائرية",
      "Chariot": "عربة",
      "Escabeau": "سلم صغير",
      "Tete flash": "رأس فلاش",
      "COB LED": "COB LED",
      "HMI": "HMI",
      "Pied C": "C-stand",
      "Pied combo": "Combo stand",
      "Pied roller": "Roller stand",
      "Girafe": "جيراف",
      "Sac de lest": "كيس وزن",
      "Station tether": "محطة tether",
      "Moniteur controle": "شاشة تحكم",
      "Console dimmer": "كونسول dimmer",
      "Fauteuil": "كرسي بذراعين",
      "Pouf": "بوف",
      "Bureau": "مكتب",
      "Poste maquillage": "محطة مكياج",
      "Miroir": "مرآة"
    }
  };
  const SHORT_LABEL_KEYS = {
    "subject-adult": "adult",
    "subject-child": "child",
    "subject-couple": "couple",
    "camera-standard": "standardTripod",
    "camera-high": "highTripod",
    "camera-video": "videoTripod",
    "stool-low": "low",
    "stool-high": "high",
    "chair-director": "setChair",
    "applebox-full": "full",
    "applebox-half": "half",
    "applebox-quarter": "quarter",
    "cart-rolling": "rollingCart",
    "ladder-small": "small",
    "flash-head-compact": "compact",
    "flash-head-pro": "pro",
    "cstand-grip": "grip",
    "cstand-arm": "arm40",
    "combo-stand": "junior",
    "roller-stand": "lowBase",
    "boom-stand": "boom",
    "sandbag-single": "single",
    "sandbag-double": "double",
    "monitor-station": "monitor24",
    "mirror-standing": "standing"
  };

  const SHORT_LABEL_TRANSLATIONS = {
    en: {
      adult: "Adult",
      child: "Child",
      couple: "Couple",
      standardTripod: "Standard tripod",
      highTripod: "High tripod",
      videoTripod: "Video tripod",
      low: "Low",
      high: "High",
      setChair: "Set",
      full: "Full",
      half: "Half",
      quarter: "Quarter",
      rollingCart: "Rolling cart",
      small: "Small",
      compact: "Compact",
      pro: "Pro",
      grip: "Grip",
      arm40: "Arm 40 in",
      junior: "Junior",
      lowBase: "Low base",
      boom: "Boom",
      single: "Single",
      double: "Double",
      monitor24: "24 in",
      standing: "Standing"
    },
    es: {
      adult: "Adulto",
      child: "Nino",
      couple: "Pareja",
      standardTripod: "Tripode estandar",
      highTripod: "Tripode alto",
      videoTripod: "Tripode video",
      low: "Bajo",
      high: "Alto",
      setChair: "Plato",
      full: "Full",
      half: "Half",
      quarter: "Quarter",
      rollingCart: "Carro rodante",
      small: "Pequeno",
      compact: "Compacto",
      pro: "Pro",
      grip: "Grip",
      arm40: "Brazo 40 in",
      junior: "Junior",
      lowBase: "Base baja",
      boom: "Boom",
      single: "Simple",
      double: "Doble",
      monitor24: "24 pulgadas",
      standing: "De pie"
    },
    de: {
      adult: "Erwachsener",
      child: "Kind",
      couple: "Paar",
      standardTripod: "Stativ Standard",
      highTripod: "Hohes Stativ",
      videoTripod: "Videostativ",
      low: "Niedrig",
      high: "Hoch",
      setChair: "Set",
      full: "Full",
      half: "Half",
      quarter: "Quarter",
      rollingCart: "Rollwagen",
      small: "Klein",
      compact: "Kompakt",
      pro: "Pro",
      grip: "Grip",
      arm40: "Arm 40 Zoll",
      junior: "Junior",
      lowBase: "Low Base",
      boom: "Boom",
      single: "Einfach",
      double: "Doppelt",
      monitor24: "24 Zoll",
      standing: "Stehend"
    },
    ar: {
      adult: "بالغ",
      child: "طفل",
      couple: "ثنائي",
      standardTripod: "حامل قياسي",
      highTripod: "حامل مرتفع",
      videoTripod: "حامل فيديو",
      low: "منخفض",
      high: "مرتفع",
      setChair: "بلاتوه",
      full: "Full",
      half: "Half",
      quarter: "Quarter",
      rollingCart: "عربة متنقلة",
      small: "صغيرة",
      compact: "مدمج",
      pro: "Pro",
      grip: "Grip",
      arm40: "ذراع 40 بوصة",
      junior: "Junior",
      lowBase: "قاعدة منخفضة",
      boom: "Boom",
      single: "مفرد",
      double: "مزدوج",
      monitor24: "24 بوصة",
      standing: "واقف"
    }
  };
  const PRESET_TOKEN_TRANSLATIONS = {
    en: {
      portrait: "Portrait",
      soft: "Soft",
      "45": "45°",
      headshot: "Headshot",
      corporate: "Corporate",
      clean: "Clean",
      actor: "Actor",
      low: "Low",
      key: "Key",
      daylight: "Daylight",
      vflat: "V-flat",
      beauty: "Beauty",
      clamshell: "Clamshell",
      ring: "Ring",
      gloss: "Glossy",
      strips: "Strips",
      makeup: "Makeup",
      editorial: "Editorial",
      executive: "Executive",
      desk: "Desk",
      linkedin: "LinkedIn",
      umbrella: "Umbrella",
      fashion: "Fashion",
      parabolic: "Parabolic",
      catalog: "Catalog",
      silhouette: "Silhouette",
      projector: "Projector",
      highkey: "High-key",
      high: "High",
      umbrellas: "Umbrellas",
      packshot: "Packshot",
      tabletop: "Tabletop",
      bottle: "Bottle",
      specular: "Specular",
      jewelry: "Jewelry",
      scrim: "Scrim",
      food: "Food",
      flatlay: "Flat lay",
      clothing: "Clothing",
      duo: "Duo",
      wide: "Wide",
      family: "Family",
      trio: "Trio",
      kids: "Kids",
      playful: "Playful",
      boudoir: "Boudoir",
      window: "Window",
      armchair: "Armchair",
      lowkey: "Low-key",
      lantern: "Lantern",
      lounge: "Lounge",
      erotique: "Erotic",
      burgundy: "Burgundy",
      shadow: "Shadow",
      neon: "Neon",
      tubes: "Tubes",
      sofa: "Sofa",
      contrast: "Contrast",
      nu: "Fine art nude",
      sculptural: "Sculptural",
      hard: "Hard",
      classic: "Classic",
      outline: "Outline",
      backlight: "Backlight",
      graphic: "Graphic",
      interview: "Interview",
      led: "LED",
      podcast: "Podcast",
      greenscreen: "Greenscreen",
      presenter: "Presenter",
      masterclass: "Masterclass",
      bts: "BTS",
      cinema: "Cinema",
      gobo: "Gobo",
      mirror: "Mirror",
      chroma: "Chroma",
      pop: "Pop",
      play: "Play"
    },
    es: {
      portrait: "Retrato",
      soft: "Suave",
      "45": "45°",
      headshot: "Headshot",
      corporate: "Corporate",
      clean: "Limpio",
      actor: "Actor",
      low: "Low",
      key: "Key",
      daylight: "Daylight",
      vflat: "V-flat",
      beauty: "Beauty",
      clamshell: "Clamshell",
      ring: "Ring",
      gloss: "Glossy",
      strips: "Strips",
      makeup: "Maquillaje",
      editorial: "Editorial",
      executive: "Ejecutivo",
      desk: "Escritorio",
      linkedin: "LinkedIn",
      umbrella: "Paraguas",
      fashion: "Moda",
      parabolic: "Parabolico",
      catalog: "Catalogo",
      silhouette: "Silueta",
      projector: "Proyector",
      highkey: "High key",
      high: "High",
      umbrellas: "Paraguas",
      packshot: "Packshot",
      tabletop: "Tabletop",
      bottle: "Botella",
      specular: "Specular",
      jewelry: "Joyeria",
      scrim: "Scrim",
      food: "Food",
      flatlay: "Flat lay",
      clothing: "Ropa",
      duo: "Duo",
      wide: "Ancho",
      family: "Familia",
      trio: "Trio",
      kids: "Kids",
      playful: "Playful",
      boudoir: "Boudoir",
      window: "Ventana",
      armchair: "Sillon",
      lowkey: "Low key",
      lantern: "Lantern",
      lounge: "Lounge",
      erotique: "Erotico",
      burgundy: "Burdeos",
      shadow: "Sombra",
      neon: "Neon",
      tubes: "Tubos",
      sofa: "Sofa",
      contrast: "Contraste",
      nu: "Desnudo artistico",
      sculptural: "Escultorico",
      hard: "Duro",
      classic: "Clasico",
      outline: "Contorno",
      backlight: "Contraluz",
      graphic: "Grafico",
      interview: "Entrevista",
      led: "LED",
      podcast: "Podcast",
      greenscreen: "Greenscreen",
      presenter: "Presentador",
      masterclass: "Masterclass",
      bts: "BTS",
      cinema: "Cinema",
      gobo: "Gobo",
      mirror: "Espejo",
      chroma: "Chroma",
      pop: "Pop",
      play: "Play"
    },
    de: {
      portrait: "Portrat",
      soft: "Weich",
      "45": "45°",
      headshot: "Headshot",
      corporate: "Corporate",
      clean: "Clean",
      actor: "Schauspieler",
      low: "Low",
      key: "Key",
      daylight: "Daylight",
      vflat: "V-Flat",
      beauty: "Beauty",
      clamshell: "Clamshell",
      ring: "Ring",
      gloss: "Gloss",
      strips: "Strips",
      makeup: "Make-up",
      editorial: "Editorial",
      executive: "Executive",
      desk: "Desk",
      linkedin: "LinkedIn",
      umbrella: "Schirm",
      fashion: "Mode",
      parabolic: "Parabolisch",
      catalog: "Katalog",
      silhouette: "Silhouette",
      projector: "Projektor",
      highkey: "High-Key",
      high: "High",
      umbrellas: "Schirme",
      packshot: "Packshot",
      tabletop: "Tabletop",
      bottle: "Flasche",
      specular: "Spekular",
      jewelry: "Schmuck",
      scrim: "Scrim",
      food: "Food",
      flatlay: "Flat Lay",
      clothing: "Kleidung",
      duo: "Duo",
      wide: "Weit",
      family: "Familie",
      trio: "Trio",
      kids: "Kids",
      playful: "Verspielt",
      boudoir: "Boudoir",
      window: "Fenster",
      armchair: "Sessel",
      lowkey: "Low-Key",
      lantern: "Lantern",
      lounge: "Lounge",
      erotique: "Erotik",
      burgundy: "Burgunder",
      shadow: "Schatten",
      neon: "Neon",
      tubes: "Tubes",
      sofa: "Sofa",
      contrast: "Kontrast",
      nu: "Kunstakt",
      sculptural: "Skulptural",
      hard: "Hart",
      classic: "Klassisch",
      outline: "Kontur",
      backlight: "Gegenlicht",
      graphic: "Grafisch",
      interview: "Interview",
      led: "LED",
      podcast: "Podcast",
      greenscreen: "Greenscreen",
      presenter: "Presenter",
      masterclass: "Masterclass",
      bts: "BTS",
      cinema: "Cinema",
      gobo: "Gobo",
      mirror: "Spiegel",
      chroma: "Chroma",
      pop: "Pop",
      play: "Play"
    },
    ar: {
      portrait: "بورتريه",
      soft: "ناعم",
      "45": "45°",
      headshot: "هيدشوت",
      corporate: "شركات",
      clean: "نظيف",
      actor: "ممثل",
      low: "لو",
      key: "كي",
      daylight: "ضوء نهاري",
      vflat: "V-flat",
      beauty: "بيوتي",
      clamshell: "Clamshell",
      ring: "Ring",
      gloss: "لامع",
      strips: "Strips",
      makeup: "مكياج",
      editorial: "تحريري",
      executive: "تنفيذي",
      desk: "مكتب",
      linkedin: "LinkedIn",
      umbrella: "مظلة",
      fashion: "موضة",
      parabolic: "بارابوليك",
      catalog: "كتالوج",
      silhouette: "سيلويت",
      projector: "بروجكتور",
      highkey: "هاي كي",
      high: "هاي",
      umbrellas: "مظلات",
      packshot: "باك شوت",
      tabletop: "Tabletop",
      bottle: "زجاجة",
      specular: "سبكيولار",
      jewelry: "مجوهرات",
      scrim: "سكريم",
      food: "طعام",
      flatlay: "Flat lay",
      clothing: "ملابس",
      duo: "ثنائي",
      wide: "واسع",
      family: "عائلة",
      trio: "ثلاثي",
      kids: "أطفال",
      playful: "مرح",
      boudoir: "بودوار",
      window: "نافذة",
      armchair: "كرسي بذراعين",
      lowkey: "لو كي",
      lantern: "لانترن",
      lounge: "لاونج",
      erotique: "إيروتيك",
      burgundy: "عنابي",
      shadow: "ظل",
      neon: "نيون",
      tubes: "أنابيب",
      sofa: "أريكة",
      contrast: "تباين",
      nu: "نود فني",
      sculptural: "نحتي",
      hard: "قاس",
      classic: "كلاسيكي",
      outline: "كونتور",
      backlight: "إضاءة خلفية",
      graphic: "جرافيكي",
      interview: "مقابلة",
      led: "LED",
      podcast: "بودكاست",
      greenscreen: "غرين سكرين",
      presenter: "مقدم",
      masterclass: "ماستر كلاس",
      bts: "BTS",
      cinema: "سينما",
      gobo: "غوبو",
      mirror: "مرآة",
      chroma: "كروما",
      pop: "بوب",
      play: "بلاي"
    }
  };
  const UI_COPY = {
    fr: {
      x: "X (m)",
      y: "Y (m)",
      studio: "Studio {width} x {depth} m",
      searchPlaceholder: "Rechercher un element, une taille ou un type",
      searchEmpty: "Aucun element ne correspond a cette recherche.",
      savePreset: "Sauvegarder ce preset",
      savePresetPrompt: "Nom du preset personnalise",
      savePresetEmpty: "Ajoutez au moins un element avant de sauvegarder un preset.",
      savePresetSaved: "Preset enregistre : {name}",
      customPresets: "Vos presets",
      customPresetsDescription: "Presets sauvegardes dans ce navigateur.",
      exportPdf: "Telecharger PDF",
      pdfFailed: "Impossible de generer le PDF.",
      zoomOut: "Zoom arriere",
      zoomIn: "Zoom avant",
      zoomReset: "{value}%",
      metricHeight: "Hauteur",
      metricRotation: "Orientation",
      metricSubjectDistance: "Distance sujet",
      metricCameraDistance: "Distance camera",
      metricBackdropDistance: "Distance fond",
      metricLightAngle: "Angle vers le sujet",
      metricMainLightDistance: "Distance source",
      metricMainLightPower: "Puissance source",
      metricEstimatedFStop: "Lecture estimee (ISO 100)",
      power: "Puissance",
      powerHint: "Influence le cone lumineux et la lecture estimee sur le sujet le plus proche.",
      guideMainLight: "source"
    },
    en: {
      x: "X (m)",
      y: "Y (m)",
      studio: "Studio {width} x {depth} m",
      searchPlaceholder: "Search by element, size or type",
      searchEmpty: "No element matches this search.",
      savePreset: "Save this preset",
      savePresetPrompt: "Custom preset name",
      savePresetEmpty: "Add at least one element before saving a preset.",
      savePresetSaved: "Preset saved: {name}",
      customPresets: "Your presets",
      customPresetsDescription: "Presets stored in this browser.",
      exportPdf: "Download PDF",
      pdfFailed: "Unable to generate the PDF.",
      zoomOut: "Zoom out",
      zoomIn: "Zoom in",
      zoomReset: "{value}%",
      metricHeight: "Height",
      metricRotation: "Orientation",
      metricSubjectDistance: "Subject distance",
      metricCameraDistance: "Camera distance",
      metricBackdropDistance: "Backdrop distance",
      metricLightAngle: "Angle to subject",
      metricMainLightDistance: "Light distance",
      metricMainLightPower: "Light power",
      metricEstimatedFStop: "Estimated f-stop (ISO 100)",
      power: "Power",
      powerHint: "Affects the light spread and the estimated reading on the nearest subject.",
      guideMainLight: "light"
    },
    es: {
      x: "X (m)",
      y: "Y (m)",
      studio: "Estudio {width} x {depth} m",
      searchPlaceholder: "Buscar por elemento, tamano o tipo",
      searchEmpty: "Ningun elemento coincide con esta busqueda.",
      savePreset: "Guardar este preset",
      savePresetPrompt: "Nombre del preset personalizado",
      savePresetEmpty: "Agrega al menos un elemento antes de guardar un preset.",
      savePresetSaved: "Preset guardado: {name}",
      customPresets: "Tus presets",
      customPresetsDescription: "Presets guardados en este navegador.",
      exportPdf: "Descargar PDF",
      pdfFailed: "No se pudo generar el PDF.",
      zoomOut: "Alejar",
      zoomIn: "Acercar",
      zoomReset: "{value}%",
      metricHeight: "Altura",
      metricRotation: "Orientacion",
      metricSubjectDistance: "Distancia al sujeto",
      metricCameraDistance: "Distancia de camara",
      metricBackdropDistance: "Distancia al fondo",
      metricLightAngle: "Angulo al sujeto",
      metricMainLightDistance: "Distancia de luz",
      metricMainLightPower: "Potencia de luz",
      metricEstimatedFStop: "f-stop estimado (ISO 100)",
      power: "Potencia",
      powerHint: "Afecta el cono de luz y la lectura estimada sobre el sujeto mas cercano.",
      guideMainLight: "luz"
    },
    de: {
      x: "X (m)",
      y: "Y (m)",
      studio: "Studio {width} x {depth} m",
      searchPlaceholder: "Nach Element, Grosse oder Typ suchen",
      searchEmpty: "Kein Element passt zu dieser Suche.",
      savePreset: "Dieses Preset speichern",
      savePresetPrompt: "Name des benutzerdefinierten Presets",
      savePresetEmpty: "Fugen Sie mindestens ein Element hinzu, bevor Sie ein Preset speichern.",
      savePresetSaved: "Preset gespeichert: {name}",
      customPresets: "Eigene Presets",
      customPresetsDescription: "Im Browser gespeicherte Presets.",
      exportPdf: "PDF herunterladen",
      pdfFailed: "PDF konnte nicht erstellt werden.",
      zoomOut: "Verkleinern",
      zoomIn: "Vergrossern",
      zoomReset: "{value}%",
      metricHeight: "Hohe",
      metricRotation: "Ausrichtung",
      metricSubjectDistance: "Abstand zum Motiv",
      metricCameraDistance: "Kameraabstand",
      metricBackdropDistance: "Abstand zum Hintergrund",
      metricLightAngle: "Winkel zum Motiv",
      metricMainLightDistance: "Lichtabstand",
      metricMainLightPower: "Lichtleistung",
      metricEstimatedFStop: "Geschaetzte Blende (ISO 100)",
      power: "Leistung",
      powerHint: "Beeinflusst den Lichtkegel und die geschaetzte Messung am naechsten Motiv.",
      guideMainLight: "licht"
    },
    ar: {
      x: "س (م)",
      y: "ص (م)",
      studio: "استوديو {width} x {depth} م",
      searchPlaceholder: "ابحث حسب العنصر او الحجم او النوع",
      searchEmpty: "لا يوجد عنصر يطابق هذا البحث.",
      savePreset: "احفظ هذا الاعداد",
      savePresetPrompt: "اسم الاعداد المخصص",
      savePresetEmpty: "اضف عنصرا واحدا على الاقل قبل حفظ الاعداد.",
      savePresetSaved: "تم حفظ الاعداد: {name}",
      customPresets: "اعداداتك",
      customPresetsDescription: "اعدادات محفوظة في هذا المتصفح.",
      exportPdf: "تنزيل PDF",
      pdfFailed: "تعذر انشاء ملف PDF.",
      zoomOut: "تصغير",
      zoomIn: "تكبير",
      zoomReset: "{value}%",
      metricHeight: "الارتفاع",
      metricRotation: "الاتجاه",
      metricSubjectDistance: "المسافة الى الهدف",
      metricCameraDistance: "مسافة الكاميرا",
      metricBackdropDistance: "المسافة الى الخلفية",
      metricLightAngle: "زاوية نحو الهدف",
      metricMainLightDistance: "مسافة الضوء",
      metricMainLightPower: "قدرة الضوء",
      metricEstimatedFStop: "قراءة f-stop تقديرية (ISO 100)",
      power: "القدرة",
      powerHint: "تؤثر على انتشار الضوء والقراءة التقديرية على اقرب هدف.",
      guideMainLight: "ضوء"
    }
  };

  const COLOR_NOUN_TRANSLATIONS = {
    en: {
      white: "White",
      gray: "Gray",
      black: "Black",
      stone: "Stone",
      pebble: "Pebble",
      cream: "Cream",
      ivory: "Ivory",
      vanilla: "Vanilla",
      oat: "Oat",
      beige: "Beige",
      camel: "Camel",
      sand: "Sand",
      tan: "Tan",
      caramel: "Caramel",
      mocha: "Mocha",
      cocoa: "Cocoa",
      chestnut: "Chestnut",
      chocolate: "Chocolate",
      clay: "Clay",
      terracotta: "Terracotta",
      rust: "Rust",
      brick: "Brick",
      burgundy: "Burgundy",
      red: "Red",
      coral: "Coral",
      peach: "Peach",
      blush: "Blush",
      rose: "Rose",
      lavender: "Lavender",
      lilac: "Lilac",
      plum: "Plum",
      sky: "Sky blue",
      blue: "Blue",
      steel: "Steel blue",
      cobalt: "Cobalt blue",
      navy: "Navy blue",
      teal: "Teal",
      turquoise: "Turquoise",
      mint: "Mint",
      sage: "Sage",
      olive: "Olive",
      forest: "Forest green",
      emerald: "Emerald",
      mustard: "Mustard",
      sunflower: "Sunflower yellow",
      chroma: "Chroma green"
    },
    es: {
      white: "Blanco",
      gray: "Gris",
      black: "Negro",
      stone: "Piedra",
      pebble: "Guijarro",
      cream: "Crema",
      ivory: "Marfil",
      vanilla: "Vainilla",
      oat: "Avena",
      beige: "Beige",
      camel: "Camel",
      sand: "Arena",
      tan: "Arena calida",
      caramel: "Caramelo",
      mocha: "Moca",
      cocoa: "Cacao",
      chestnut: "Castana",
      chocolate: "Chocolate",
      clay: "Arcilla",
      terracotta: "Terracota",
      rust: "Oxido",
      brick: "Ladrillo",
      burgundy: "Burdeos",
      red: "Rojo",
      coral: "Coral",
      peach: "Melocoton",
      blush: "Rosa palo",
      rose: "Rosa",
      lavender: "Lavanda",
      lilac: "Lila",
      plum: "Ciruela",
      sky: "Azul cielo",
      blue: "Azul",
      steel: "Azul acero",
      cobalt: "Azul cobalto",
      navy: "Azul marino",
      teal: "Verde azulado",
      turquoise: "Turquesa",
      mint: "Menta",
      sage: "Salvia",
      olive: "Oliva",
      forest: "Verde bosque",
      emerald: "Esmeralda",
      mustard: "Mostaza",
      sunflower: "Amarillo estudio",
      chroma: "Verde chroma"
    },
    de: {
      white: "Weiss",
      gray: "Grau",
      black: "Schwarz",
      stone: "Stein",
      pebble: "Kiesel",
      cream: "Creme",
      ivory: "Elfenbein",
      vanilla: "Vanille",
      oat: "Hafer",
      beige: "Beige",
      camel: "Camel",
      sand: "Sand",
      tan: "Warmer Sand",
      caramel: "Karamell",
      mocha: "Mokka",
      cocoa: "Kakao",
      chestnut: "Kastanie",
      chocolate: "Schokolade",
      clay: "Ton",
      terracotta: "Terrakotta",
      rust: "Rost",
      brick: "Ziegel",
      burgundy: "Burgunder",
      red: "Rot",
      coral: "Koralle",
      peach: "Pfirsich",
      blush: "Puderrosa",
      rose: "Rosa",
      lavender: "Lavendel",
      lilac: "Lila",
      plum: "Pflaume",
      sky: "Himmelblau",
      blue: "Blau",
      steel: "Stahlblau",
      cobalt: "Kobaltblau",
      navy: "Marineblau",
      teal: "Petrol",
      turquoise: "Turkis",
      mint: "Mint",
      sage: "Salbei",
      olive: "Oliv",
      forest: "Waldgrun",
      emerald: "Smaragd",
      mustard: "Senf",
      sunflower: "Studiogelb",
      chroma: "Chromagrun"
    },
    ar: {
      white: "ابيض",
      gray: "رمادي",
      black: "اسود",
      stone: "حجري",
      pebble: "حصوي",
      cream: "كريمي",
      ivory: "عاجي",
      vanilla: "فانيلا",
      oat: "شوفان",
      beige: "بيج",
      camel: "جملي",
      sand: "رملي",
      tan: "رملي دافئ",
      caramel: "كراميل",
      mocha: "موكا",
      cocoa: "كاكاو",
      chestnut: "كستنائي",
      chocolate: "شوكولا",
      clay: "طيني",
      terracotta: "تيراكوتا",
      rust: "صدئي",
      brick: "قرميدي",
      burgundy: "عنابي",
      red: "احمر",
      coral: "مرجاني",
      peach: "خوخي",
      blush: "وردي بودري",
      rose: "وردي",
      lavender: "لافندر",
      lilac: "ليلكي",
      plum: "برقوقي",
      sky: "ازرق سماوي",
      blue: "ازرق",
      steel: "ازرق فولاذي",
      cobalt: "ازرق كوبالت",
      navy: "ازرق بحري",
      teal: "تركواز داكن",
      turquoise: "فيروزي",
      mint: "نعناعي",
      sage: "ميرمي",
      olive: "زيتي",
      forest: "اخضر غابة",
      emerald: "زمردي",
      mustard: "خردلي",
      sunflower: "اصفر استوديو",
      chroma: "اخضر كروما"
    }
  };

  const COLOR_MODIFIER_TRANSLATIONS = {
    en: { super: "Super", light: "Light", medium: "Medium", neutral: "Neutral", dark: "Dark", thunder: "Thunder", dusty: "Dusty", powder: "Powder", arctic: "Arctic", chroma: "Chroma" },
    es: { super: "Super", light: "claro", medium: "medio", neutral: "neutro", dark: "oscuro", thunder: "tormenta", dusty: "empolvado", powder: "empolvado", arctic: "artico", chroma: "chroma" },
    de: { super: "Super", light: "Hell", medium: "Mittel", neutral: "Neutral", dark: "Dunkel", thunder: "Gewitter", dusty: "Puder", powder: "Puder", arctic: "Arktis", chroma: "Chroma" },
    ar: { super: "فائق", light: "فاتح", medium: "متوسط", neutral: "محايد", dark: "داكن", thunder: "عاصف", dusty: "غباري", powder: "بودري", arctic: "قطبي", chroma: "كروما" }
  };
  function getLocaleCode(language) {
    return LOCALE_CODES[language || state.language] || LOCALE_CODES.fr;
  }

  function getUiCopy(key, replacements) {
    const bundle = UI_COPY[state.language] || UI_COPY.fr;
    const fallback = UI_COPY.fr[key] || key;
    return interpolateText(bundle[key] || fallback, replacements);
  }

  function getLocalizedTypeLabel(baseLabel) {
    const bundle = TYPE_LABEL_TRANSLATIONS[state.language];
    return bundle && bundle[baseLabel] ? bundle[baseLabel] : baseLabel;
  }

  function getLocalizedShortLabel(variantId, variant) {
    if (!variant) return "";
    if (state.language === "fr") return variant.shortLabel;

    const key = SHORT_LABEL_KEYS[variantId];
    const translated = key && SHORT_LABEL_TRANSLATIONS[state.language] && SHORT_LABEL_TRANSLATIONS[state.language][key];
    if (translated) return translated;

    let label = variant.shortLabel;
    if (label.indexOf("deg") !== -1) label = label.replace(/\bdeg\b/g, "°");
    if (label.indexOf("pouces") !== -1) {
      const inchUnit = { en: "in", es: "pulgadas", de: "Zoll", ar: "بوصة" }[state.language] || "in";
      label = label.replace(/\bpouces\b/g, inchUnit);
    }
    return label;
  }

  function formatLocalizedHeightLabel(heightValue, fallbackLabel) {
    if (typeof heightValue !== "number" || Number.isNaN(heightValue)) return fallbackLabel || "";

    const value = heightValue < 1 ? Math.round(heightValue * 100) : heightValue.toFixed(2);
    const unit = heightValue < 1 ? "cm" : "m";
    const pattern = {
      fr: "H {value} {unit}",
      en: "H {value} {unit}",
      es: "Alt. {value} {unit}",
      de: "H {value} {unit}",
      ar: "ارتفاع {value} {unit}"
    }[state.language] || "H {value} {unit}";

    return interpolateText(pattern, { value: value, unit: unit });
  }

  function getLocalizedVariantCopy(variantId, source) {
    const variant = source || ITEM_VARIANTS[variantId];
    if (!variant) {
      return { type: "", short: "", size: "", height: "" };
    }

    return {
      type: getLocalizedTypeLabel(variant.typeLabel),
      short: getLocalizedShortLabel(variantId, variant),
      size: variant.sizeLabel,
      height: formatLocalizedHeightLabel(variant.height, variant.heightLabel)
    };
  }

  function getItemTypeKey(item) {
    const variant = ITEM_VARIANTS[item.variantId];
    return variant ? variant.typeLabel : item.typeLabel;
  }

  function getLocalizedItemLabel(item) {
    const typeKey = getItemTypeKey(item);
    const localizedType = getLocalizedTypeLabel(typeKey);
    let count = 0;

    for (let index = 0; index < state.items.length; index += 1) {
      const entry = state.items[index];
      if (getItemTypeKey(entry) !== typeKey) continue;
      count += 1;
      if (entry.id === item.id) return `${localizedType} ${count}`;
    }

    return localizedType;
  }

  function toTitleCase(value) {
    return String(value || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (match) {
        return match.toUpperCase();
      });
  }

  function composeColorLabel(noun, modifiers, language) {
    if (!modifiers.length) return noun;
    if (language === "en") return `${modifiers.join(" ")} ${noun}`;
    if (language === "ar") return `${noun} ${modifiers.join(" ")}`;
    if (language === "es") return `${noun} ${modifiers.join(" ")}`;
    if (language === "de") return `${modifiers.join(" ")}${noun}`;
    return `${noun} ${modifiers.join(" ")}`;
  }

  function getLocalizedColorLabel(entry) {
    if (!entry) return "";
    if (state.language === "fr") return entry.label;

    const tokens = entry.id.split("-");
    const nounMap = COLOR_NOUN_TRANSLATIONS[state.language] || {};
    const modifierMap = COLOR_MODIFIER_TRANSLATIONS[state.language] || {};
    const nounKey = tokens[tokens.length - 1];
    const noun = nounMap[nounKey];

    if (noun) {
      const modifiers = tokens.slice(0, -1).map(function (token) {
        return modifierMap[token] || nounMap[token] || toTitleCase(token);
      });
      return composeColorLabel(noun, modifiers, state.language);
    }

    return tokens.map(function (token) {
      return modifierMap[token] || nounMap[token] || toTitleCase(token);
    }).join(" ");
  }

  function getLocalizedVariantTitle(variantId, source) {
    const copy = getLocalizedVariantCopy(variantId, source);
    return copy.short ? `${copy.type} ${copy.short}`.trim() : copy.type;
  }

  function formatLocalizedList(items) {
    const values = items.filter(Boolean);
    if (!values.length) return "";

    try {
      return new Intl.ListFormat(getLocaleCode(), { style: "short", type: "conjunction" }).format(values);
    } catch (error) {
      return values.join(", ");
    }
  }

  function getLocalizedPresetName(preset) {
    if (preset.isCustom || state.language === "fr") return preset.name;

    const dictionary = PRESET_TOKEN_TRANSLATIONS[state.language] || PRESET_TOKEN_TRANSLATIONS.en;
    const tokens = preset.id.split("-").map(function (token) {
      return dictionary[token] || toTitleCase(token);
    }).filter(Boolean);

    return tokens.join(" ");
  }

  function getLocalizedPresetSummary(preset) {
    if (preset.isCustom) return buildDynamicPresetSummary(preset);
    if (state.language === "fr") return preset.summary;

    const labels = [];
    const seen = new Set();

    preset.items.forEach(function (entry) {
      const variant = ITEM_VARIANTS[entry.variantId];
      if (!variant || variant.family === "subject") return;
      const label = getLocalizedVariantTitle(entry.variantId, variant);
      if (seen.has(label)) return;
      seen.add(label);
      labels.push(label);
    });

    const visible = labels.slice(0, 4);
    const suffix = labels.length > 4 ? ` +${labels.length - 4}` : "";
    return `${formatLocalizedList(visible)}${suffix}`.trim();
  }
  function renderLanguageMenu() {

    if (!refs.languageMenuList) return;

    if (!refs.languageMenuList.children.length) {
      refs.languageMenuList.innerHTML = LANGUAGE_OPTIONS.map(function (option) {
        return `
          <button class="language-item" type="button" data-language-id="${option.id}">
            <em class="language-code">${escapeHtml(option.code)}</em>
            <strong>${escapeHtml(option.nativeLabel)}</strong>
          </button>
        `;
      }).join("");
    }

    refs.languageMenuList.querySelectorAll("[data-language-id]").forEach(function (button) {
      const languageId = button.getAttribute("data-language-id");
      button.classList.toggle("active", languageId === state.language);
      button.setAttribute("aria-pressed", languageId === state.language ? "true" : "false");
      button.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        applyLanguage(languageId);
        closeMenus();
      };
    });
  }

  function translateStaticUi() {
    document.documentElement.lang = state.language;
    document.documentElement.dir = getLocaleBundle().dir || "ltr";
    document.title = t("documentTitle");

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaOgTitle = document.querySelector('meta[property="og:title"]');
    const metaOgDescription = document.querySelector('meta[property="og:description"]');
    const metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
    const metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
    const localizedMetaDescription = t("metaDescription");

    if (metaDescription) metaDescription.setAttribute("content", localizedMetaDescription);
    if (metaOgTitle) metaOgTitle.setAttribute("content", t("documentTitle"));
    if (metaOgDescription) metaOgDescription.setAttribute("content", localizedMetaDescription);
    if (metaTwitterTitle) metaTwitterTitle.setAttribute("content", t("documentTitle"));
    if (metaTwitterDescription) metaTwitterDescription.setAttribute("content", localizedMetaDescription);

    const supportStrip = document.getElementById("supportStrip");
    const supportText = document.getElementById("supportText");
    const supportButton = document.getElementById("supportButton");
    const brandTagline = document.getElementById("brandTagline");
    const mainMenuBar = document.getElementById("mainMenuBar");
    const menuFileTrigger = document.getElementById("menuFileTrigger");
    const menuColorTrigger = document.getElementById("menuColorTrigger");
    const menuPresetsTrigger = document.getElementById("menuPresetsTrigger");
    const menuLanguageTrigger = document.getElementById("menuLanguageTrigger");
    const actionReset = document.getElementById("actionReset");
    const actionCopyImage = document.getElementById("actionCopyImage");
    const actionExportPng = document.getElementById("actionExportPng");
    const actionExportPdf = document.getElementById("actionExportPdf");
    const actionPrint = document.getElementById("actionPrint");
    const floorMenuLabel = document.getElementById("floorMenuLabel");
    const backdropMenuLabel = document.getElementById("backdropMenuLabel");
    const libraryEyebrow = document.getElementById("libraryEyebrow");
    const libraryTitle = document.getElementById("libraryTitle");
    const libraryCopy = document.getElementById("libraryCopy");
    const planEyebrow = document.getElementById("planEyebrow");
    const planTitle = document.getElementById("planTitle");
    const hintDrag = document.getElementById("hintDrag");
    const hintRotate = document.getElementById("hintRotate");
    const measureToggle = document.getElementById("measureToggle");
    const previewEyebrow = document.getElementById("previewEyebrow");
    const previewTitle = document.getElementById("previewTitle");

    if (supportStrip) supportStrip.setAttribute("aria-label", t("supportAriaLabel"));
    if (supportText) supportText.textContent = t("supportText");
    if (supportButton) supportButton.textContent = t("supportButton");
    if (brandTagline) brandTagline.textContent = t("brandTagline");
    if (mainMenuBar) mainMenuBar.setAttribute("aria-label", t("navAriaLabel"));
    if (menuFileTrigger) menuFileTrigger.textContent = t("menu.file");
    if (menuColorTrigger) menuColorTrigger.textContent = t("menu.color");
    if (menuPresetsTrigger) menuPresetsTrigger.textContent = t("menu.presets");
    if (menuLanguageTrigger) menuLanguageTrigger.textContent = t("menu.language");
    if (actionReset) actionReset.textContent = t("actions.reset");
    if (actionCopyImage) actionCopyImage.textContent = t("actions.copyImage");
    if (actionExportPng) actionExportPng.textContent = t("actions.exportPng");
    if (actionExportPdf) actionExportPdf.textContent = t("actions.exportPdf");
    if (actionPrint) actionPrint.textContent = t("actions.print");
    if (floorMenuLabel) floorMenuLabel.textContent = t("colors.floor");
    if (backdropMenuLabel) backdropMenuLabel.textContent = t("colors.backdrop");
    if (libraryEyebrow) libraryEyebrow.textContent = t("library.eyebrow");
    if (libraryTitle) libraryTitle.textContent = t("library.title");
    if (libraryCopy) libraryCopy.textContent = t("library.copy");
    if (planEyebrow) planEyebrow.textContent = t("stage.eyebrow");
    if (planTitle) planTitle.textContent = t("stage.title");
    if (hintDrag) hintDrag.textContent = t("stage.hintDrag");
    if (hintRotate) hintRotate.textContent = t("stage.hintRotate");
    if (measureToggle) measureToggle.textContent = t("stage.hintMeasure");
    if (previewEyebrow) previewEyebrow.textContent = t("stage.previewEyebrow");
    if (previewTitle) previewTitle.textContent = t("stage.previewTitle");
    if (refs.librarySearch) refs.librarySearch.placeholder = getUiCopy("searchPlaceholder");
    if (refs.actionSavePreset) refs.actionSavePreset.textContent = getUiCopy("savePreset");
    if (refs.planZoomOut) refs.planZoomOut.setAttribute("aria-label", getUiCopy("zoomOut"));
    if (refs.planZoomIn) refs.planZoomIn.setAttribute("aria-label", getUiCopy("zoomIn"));
    if (refs.isoZoomOut) refs.isoZoomOut.setAttribute("aria-label", getUiCopy("zoomOut"));
    if (refs.isoZoomIn) refs.isoZoomIn.setAttribute("aria-label", getUiCopy("zoomIn"));
    if (refs.planCanvas) refs.planCanvas.setAttribute("aria-label", t("stage.planAriaLabel"));
    if (refs.isoCanvas) refs.isoCanvas.setAttribute("aria-label", t("stage.isoAriaLabel"));
    renderPlanZoomUi();
    renderIsoZoomUi();
  }

  function applyLanguage(language, persist) {
    const normalized = LANGUAGE_OPTIONS.some(function (option) {
      return option.id === language;
    }) ? language : "fr";

    state.language = normalized;

    if (persist !== false) {
      try {
        window.localStorage.setItem(STORAGE_KEY_LANGUAGE, normalized);
      } catch (error) {
        // Ignore storage access issues.
      }
    }

    translateStaticUi();
    renderLanguageMenu();
    renderCategoryTabs();
    renderColorSwatches(refs.floorMenuSwatches, FLOOR_COLORS, "floor");
    renderColorSwatches(refs.backdropMenuSwatches, BACKDROP_COLORS, "backdrop");
    renderPalette();
    renderPresetMenu();
    renderAll();
  }

  function renderPlanZoomUi() {
    if (!refs.planZoomReset) return;
    const value = Math.round(state.planZoom * 100);
    refs.planZoomReset.textContent = getUiCopy("zoomReset", { value: value });
    if (refs.planZoomOut) refs.planZoomOut.disabled = state.planZoom <= 0.71;
    if (refs.planZoomIn) refs.planZoomIn.disabled = state.planZoom >= 2.39;
  }

  function renderIsoZoomUi() {
    if (!refs.isoZoomReset) return;
    const value = Math.round(state.isoZoom * 100);
    refs.isoZoomReset.textContent = getUiCopy("zoomReset", { value: value });
    if (refs.isoZoomOut) refs.isoZoomOut.disabled = state.isoZoom <= 0.71;
    if (refs.isoZoomIn) refs.isoZoomIn.disabled = state.isoZoom >= 2.19;
  }

  function syncMeasurementToggle() {
    if (!refs.measureToggle) return;
    refs.measureToggle.classList.toggle("active", state.measurementMode);
    refs.measureToggle.setAttribute("aria-pressed", state.measurementMode ? "true" : "false");
  }

  function toggleMeasurementMode() {
    state.measurementMode = !state.measurementMode;
    state.measureStart = null;
    state.measurePreview = null;
    state.measureEnd = null;
    refs.planCanvas.style.cursor = state.measurementMode ? "crosshair" : "default";
    renderAll();
  }

  function setIsoZoom(nextValue) {
    state.isoZoom = clamp(nextValue, 0.7, 2.2);
    renderIsoZoomUi();
    drawIsoView();
  }

  function getPlanZoomAnchorPoint() {
    if (!refs.planCanvas.width || !refs.planCanvas.height) return null;
    const selected = getSelectedItem();
    if (!selected) {
      return {
        x: refs.planCanvas.width / 2,
        y: refs.planCanvas.height / 2
      };
    }

    return studioToPlan(selected.x, selected.y, getPlanMetrics(refs.planCanvas.width, refs.planCanvas.height));
  }

  function setPlanZoom(nextValue, anchorCanvasPoint) {
    const clampedZoom = clamp(nextValue, 0.7, 2.4);
    if (Math.abs(clampedZoom - state.planZoom) < 0.001) return;

    const width = refs.planCanvas.width;
    const height = refs.planCanvas.height;
    const anchor = anchorCanvasPoint || getPlanZoomAnchorPoint();

    if (anchor && width && height) {
      const currentMetrics = getPlanMetrics(width, height);
      const anchorStudio = planToStudio(anchor.x, anchor.y, currentMetrics);
      state.planZoom = clampedZoom;
      const nextBaseMetrics = getPlanBaseMetrics(width, height);
      const nextScale = nextBaseMetrics.scale * state.planZoom;
      const nextStageWidth = STUDIO.width * nextScale;
      const nextStageHeight = STUDIO.depth * nextScale;
      state.planPanX = anchor.x - width / 2 + nextStageWidth / 2 - anchorStudio.x * nextScale;
      state.planPanY = anchor.y - height / 2 + nextStageHeight / 2 - anchorStudio.y * nextScale;
      const clampedPan = getClampedPlanPan(width, height, state.planZoom, state.planPanX, state.planPanY);
      state.planPanX = clampedPan.x;
      state.planPanY = clampedPan.y;
    } else {
      state.planZoom = clampedZoom;
      state.planPanX = 0;
      state.planPanY = 0;
    }

    renderPlanZoomUi();
    drawPlanView();
  }

  function resetPlanZoom() {
    state.planZoom = 1;
    state.planPanX = 0;
    state.planPanY = 0;
    renderPlanZoomUi();
    drawPlanView();
  }

  function cancelCanvasInteraction() {
    if (!state.interaction) return;
    try {
      refs.planCanvas.releasePointerCapture(state.interaction.pointerId);
    } catch (error) {
      // Pointer capture may already be released.
    }
    state.interaction = null;
  }

  function updateActivePointer(event, canvasPoint) {
    if (!canvasPoint) return;
    state.activePointers.set(event.pointerId, canvasPoint);
  }

  function clearActivePointer(pointerId) {
    state.activePointers.delete(pointerId);
    if (state.pinchGesture && state.pinchGesture.pointerIds.indexOf(pointerId) !== -1) {
      state.pinchGesture = null;
      refs.planCanvas.style.cursor = state.measurementMode ? "crosshair" : "default";
    }
  }

  function startPinchGesture() {
    const pointers = Array.from(state.activePointers.entries()).slice(0, 2);
    if (pointers.length < 2) return false;

    const first = pointers[0];
    const second = pointers[1];
    const dx = second[1].x - first[1].x;
    const dy = second[1].y - first[1].y;
    const distance = Math.max(24, Math.sqrt(dx * dx + dy * dy));

    cancelCanvasInteraction();
    if (state.measurementMode) {
      state.measureStart = null;
      state.measurePreview = null;
      state.measureEnd = null;
    }

    state.pinchGesture = {
      pointerIds: [first[0], second[0]],
      startDistance: distance,
      startZoom: state.planZoom
    };
    refs.planCanvas.style.cursor = "zoom-in";
    return true;
  }

  const spawnPoints = [
    { x: 4, y: 3, rotation: 270 },
    { x: 2.2, y: 2.15, rotation: 35 },
    { x: 5.8, y: 2.2, rotation: 145 },
    { x: 2.4, y: 4.2, rotation: 325 },
    { x: 5.6, y: 4.1, rotation: 215 },
    { x: 4, y: 4.8, rotation: 270 }
  ];

  function init() {
    renderColorSwatches(refs.floorMenuSwatches, FLOOR_COLORS, "floor");
    renderColorSwatches(refs.backdropMenuSwatches, BACKDROP_COLORS, "backdrop");
    bindEvents();
    applyLanguage(state.language, false);

    if (launchOptions.preset) {
      loadPreset(launchOptions.preset);
    }
  }

  function bindEvents() {
    refs.menuTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.stopPropagation();
        const id = trigger.getAttribute("data-menu-trigger");
        toggleMenu(id);
      });
    });

    refs.menuPanels.forEach(function (panel) {
      panel.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });

    refs.menuActions.forEach(function (button) {
      button.addEventListener("click", function () {
        const action = button.getAttribute("data-menu-action");
        closeMenus();
        if (action === "reset") handleReset();
        if (action === "copy-image") void copyImage();
        if (action === "export-png") exportPng();
        if (action === "export-pdf") exportPdf();
        if (action === "print") printPlan();
      });
    });

    if (refs.presetMenuList) {
      refs.presetMenuList.addEventListener("click", function (event) {
        const button = event.target.closest("[data-preset-id]");
        if (!button) return;
        loadPreset(button.getAttribute("data-preset-id"));
        closeMenus();
      });
    }

    if (refs.languageMenuList) {
      refs.languageMenuList.addEventListener("click", function (event) {
        const button = event.target.closest("[data-language-id]");
        if (!button) return;
        applyLanguage(button.getAttribute("data-language-id"));
        closeMenus();
      });
    }

    [refs.floorMenuSwatches, refs.backdropMenuSwatches].forEach(function (container) {
      container.addEventListener("click", function (event) {
        const button = event.target.closest("[data-color-id]");
        if (!button) return;
        const id = button.getAttribute("data-color-id");
        const kind = button.getAttribute("data-color-kind");
        if (kind === "floor") state.floorId = id;
        if (kind === "backdrop") state.backdropId = id;
        renderAll();
      });
    });

    refs.categoryTabs.addEventListener("click", function (event) {
      const button = event.target.closest("[data-category-id]");
      if (!button) return;
      state.activeCategoryId = button.getAttribute("data-category-id");
      renderCategoryTabs();
      renderPalette();
    });

    if (refs.librarySearch) {
      refs.librarySearch.addEventListener("input", function (event) {
        state.paletteQuery = String(event.target.value || "").trim().toLowerCase();
        renderPalette();
      });
    }

    refs.palettePanel.addEventListener("click", function (event) {
      const button = event.target.closest("[data-variant-id]");
      if (!button) return;
      addItem(button.getAttribute("data-variant-id"));
    });

    if (refs.actionSavePreset) {
      refs.actionSavePreset.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        saveCurrentPreset();
      });
    }

    if (refs.isoZoomOut) {
      refs.isoZoomOut.addEventListener("click", function () {
        setIsoZoom(state.isoZoom - 0.15);
      });
    }

    if (refs.planZoomOut) {
      refs.planZoomOut.addEventListener("click", function () {
        setPlanZoom(state.planZoom - 0.15);
      });
    }

    if (refs.planZoomReset) {
      refs.planZoomReset.addEventListener("click", function () {
        resetPlanZoom();
      });
    }

    if (refs.planZoomIn) {
      refs.planZoomIn.addEventListener("click", function () {
        setPlanZoom(state.planZoom + 0.15);
      });
    }

    if (refs.isoZoomReset) {
      refs.isoZoomReset.addEventListener("click", function () {
        setIsoZoom(1);
      });
    }

    if (refs.isoZoomIn) {
      refs.isoZoomIn.addEventListener("click", function () {
        setIsoZoom(state.isoZoom + 0.15);
      });
    }

    if (refs.measureToggle) {
      refs.measureToggle.addEventListener("click", function () {
        toggleMeasurementMode();
      });
    }

    refs.selectionPanel.addEventListener("input", handleSelectionInput);
    refs.selectionPanel.addEventListener("click", handleSelectionClick);

    refs.planCanvas.addEventListener("pointerdown", handlePointerDown);
    refs.planCanvas.addEventListener("pointermove", handlePointerMove);
    refs.planCanvas.addEventListener("pointerup", handlePointerUp);
    refs.planCanvas.addEventListener("pointercancel", handlePointerUp);
    refs.planCanvas.addEventListener("pointerleave", handlePointerLeave);
    refs.planCanvas.addEventListener("wheel", handlePlanWheel, { passive: false });

    document.addEventListener("click", function () {
      closeMenus();
    });

    window.addEventListener("resize", renderAll);
    window.addEventListener("keydown", handleKeydown);
  }
  function toggleMenu(id) {
    state.openMenu = state.openMenu === id ? null : id;
    syncMenus();
  }

  function closeMenus() {
    if (!state.openMenu) return;
    state.openMenu = null;
    syncMenus();
  }

  function syncMenus() {
    refs.menus.forEach(function (menu) {
      menu.classList.toggle("open", menu.getAttribute("data-menu") === state.openMenu);
    });
  }

  function renderCategoryTabs() {
    refs.categoryTabs.innerHTML = PALETTE_CATEGORIES.map(function (category) {
      const label = getLocalizedPaletteCategoryLabel(category);
      return `
        <button class="category-tab${category.id === state.activeCategoryId ? " active" : ""}" type="button" data-category-id="${category.id}">
          ${escapeHtml(label)}
        </button>
      `;
    }).join("");
  }

  function matchesPaletteQuery(variantId, variant, groupCopy) {
    if (!state.paletteQuery) return true;
    const copy = getLocalizedVariantCopy(variantId, variant);
    const terms = [
      copy.type,
      copy.short,
      copy.size,
      copy.height,
      groupCopy.title,
      groupCopy.description,
      variant.family,
      variant.description
    ].join(" ").toLowerCase();
    return terms.indexOf(state.paletteQuery) !== -1;
  }

  function renderPalette() {
    const activeCategory = PALETTE_CATEGORIES.find(function (entry) {
      return entry.id === state.activeCategoryId;
    }) || PALETTE_CATEGORIES[0];
    const categories = state.paletteQuery ? PALETTE_CATEGORIES : [activeCategory];

    const sections = categories.reduce(function (allSections, category) {
      category.groups.forEach(function (group, groupIndex) {
        const groupCopy = getLocalizedPaletteGroupCopy(category.id, groupIndex, group);
        const visibleVariants = group.variants.filter(function (variantId) {
          const variant = ITEM_VARIANTS[variantId];
          return variant && matchesPaletteQuery(variantId, variant, groupCopy);
        });

        if (!visibleVariants.length) return;

        allSections.push(`
          <section class="palette-group">
            <div class="palette-head">
              <h3>${escapeHtml(groupCopy.title)}</h3>
              <p>${escapeHtml(groupCopy.description)}</p>
            </div>
            <div class="variant-grid">
              ${visibleVariants.map(function (variantId) {
                const variant = ITEM_VARIANTS[variantId];
                const copy = getLocalizedVariantCopy(variantId, variant);
                return `
                  <button class="variant-btn" type="button" data-variant-id="${variantId}">
                    ${getVariantPreviewMarkup(variantId, variant)}
                    <span class="variant-copy">
                      <strong>${escapeHtml(copy.short)}</strong>
                      <span class="variant-meta">${escapeHtml(copy.size)}</span>
                      <span class="variant-meta">${escapeHtml(copy.height)}</span>
                    </span>
                  </button>
                `;
              }).join("")}
            </div>
          </section>
        `);
      });
      return allSections;
    }, []);

    refs.palettePanel.innerHTML = sections.length ? sections.join("") : `<div class="palette-empty">${escapeHtml(getUiCopy("searchEmpty"))}</div>`;
  }

  function getVariantVisualKind(variantId, family) {
    if (variantId.indexOf("softbox-octa") === 0) return "softbox-octa";
    if (variantId.indexOf("softbox-parabolic") === 0) return "softbox-parabolic";
    if (variantId.indexOf("softbox-rect") === 0) return "softbox-rect";
    if (variantId.indexOf("led-panel-") === 0) return "led-panel";
    if (variantId.indexOf("strip-") === 0) return "striplight";
    if (variantId.indexOf("tube-") === 0) return "tube";
    if (variantId.indexOf("umbrella-") === 0) return "umbrella";
    if (variantId.indexOf("lantern-") === 0) return "lantern";
    if (variantId.indexOf("beauty-dish-") === 0) return "beauty-dish";
    if (variantId.indexOf("ringlight-") === 0) return "ringlight";
    if (variantId.indexOf("flash-head-") === 0 || variantId.indexOf("cob-led-") === 0 || variantId.indexOf("hmi-") === 0 || variantId.indexOf("fresnel-") === 0) return "spot-head";
    if (variantId.indexOf("projector-") === 0) return "spot-projector";
    if (variantId === "reflector-panel") return "flat-panel";
    if (variantId.indexOf("reflector-") === 0) return "reflector-disc";
    if (variantId.indexOf("flag-") === 0 || variantId.indexOf("cutter-") === 0 || variantId.indexOf("floppy-") === 0 || variantId.indexOf("scrim-") === 0) return "flag";
    if (variantId.indexOf("diffusion-") === 0 || variantId.indexOf("vflat-") === 0 || variantId.indexOf("foamcore-") === 0 || variantId.indexOf("negfill-") === 0) return "flat-panel";
    if (variantId.indexOf("camera-") === 0) return "camera";
    if (variantId.indexOf("subject-") === 0) return "subject";
    if (variantId.indexOf("stool-") === 0 || variantId.indexOf("ottoman-") === 0) return "stool";
    if (variantId.indexOf("chair-director") === 0) return "director-chair";
    if (variantId.indexOf("chair-") === 0) return "chair";
    if (variantId.indexOf("armchair-") === 0) return "armchair";
    if (variantId.indexOf("bench-") === 0) return "bench";
    if (variantId.indexOf("sofa-") === 0) return "sofa";
    if (variantId.indexOf("table-round") === 0) return "round-table";
    if (variantId.indexOf("table-") === 0) return "table";
    if (variantId.indexOf("desk-") === 0) return "desk";
    if (variantId.indexOf("makeup-station") === 0) return "makeup-station";
    if (variantId.indexOf("cube-") === 0) return "block";
    if (variantId.indexOf("applebox-") === 0) return "applebox";
    if (variantId.indexOf("sandbag-") === 0) return "sandbag";
    if (variantId.indexOf("cart-") === 0) return "cart";
    if (variantId.indexOf("ladder-") === 0) return "ladder";
    if (variantId.indexOf("mirror-") === 0) return "mirror";
    if (variantId.indexOf("tether-") === 0) return "tether-station";
    if (variantId.indexOf("monitor-") === 0) return "monitor-station";
    if (variantId.indexOf("dimmer-") === 0) return "dimmer-desk";
    if (variantId.indexOf("cstand-arm") === 0) return "cstand-arm";
    if (variantId.indexOf("cstand-") === 0) return "cstand";
    if (variantId.indexOf("combo-") === 0) return "combo-stand";
    if (variantId.indexOf("roller-") === 0) return "roller-stand";
    if (variantId.indexOf("boom-") === 0) return "boom-stand";
    if (variantId.indexOf("power-pack") === 0) return "power-pack";
    if (family === "camera") return "camera";
    if (family === "softbox") return "softbox-rect";
    if (family === "striplight") return "striplight";
    if (family === "reflector") return "spot-head";
    if (family === "flag") return "flag";
    if (family === "vflat") return "flat-panel";
    if (family === "stool") return "stool";
    if (family === "table") return "table";
    if (family === "stand") return "stand";
    return "block";
  }

  function isDirectionalVisualKind(kind) {
    return [
      "camera",
      "softbox-octa",
      "softbox-parabolic",
      "softbox-rect",
      "led-panel",
      "striplight",
      "tube",
      "umbrella",
      "spot-head",
      "spot-projector",
      "flag",
      "flat-panel"
    ].indexOf(kind) !== -1;
  }

  function isEmitterVisualKind(kind) {
    return [
      "softbox-octa",
      "softbox-parabolic",
      "softbox-rect",
      "led-panel",
      "striplight",
      "tube",
      "umbrella",
      "lantern",
      "ringlight",
      "beauty-dish",
      "spot-head",
      "spot-projector"
    ].indexOf(kind) !== -1;
  }

  function getDefaultPowerPercent(kind) {
    if (kind === "tube") return 55;
    if (kind === "led-panel" || kind === "ringlight") return 60;
    if (kind === "umbrella" || kind === "lantern") return 68;
    if (kind === "softbox-octa" || kind === "softbox-rect" || kind === "softbox-parabolic") return 72;
    if (kind === "striplight") return 74;
    if (kind === "beauty-dish") return 78;
    if (kind === "spot-head") return 80;
    if (kind === "spot-projector") return 84;
    return 70;
  }

  function isLightEmitter(item) {
    if (!item) return false;
    return isEmitterVisualKind(getVariantVisualKind(item.variantId, item.family));
  }

  function clampPowerPercent(value) {
    return clamp(value, 10, 100);
  }

  function formatPowerLabel(value) {
    return `${Math.round(clampPowerPercent(value))}%`;
  }

  function formatFStopLabel(value) {
    return `f/${Math.max(0.7, value).toFixed(1)}`;
  }

  function getNearestEmitter(sourceItem) {
    const matches = state.items.filter(function (item) {
      return item.id !== sourceItem.id && isLightEmitter(item);
    });

    if (!matches.length) return null;

    return matches.reduce(function (closest, item) {
      if (!closest) return item;
      return distanceBetweenItems(sourceItem, item) < distanceBetweenItems(sourceItem, closest) ? item : closest;
    }, null);
  }

  function getLightGuideNumber(item) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    if (kind === "tube") return 6.3;
    if (kind === "led-panel") return 7.8;
    if (kind === "ringlight") return 8.6;
    if (kind === "umbrella") return 10.8;
    if (kind === "lantern") return 8.8;
    if (kind === "softbox-octa" || kind === "softbox-rect") return 11.6;
    if (kind === "softbox-parabolic") return 12.8;
    if (kind === "striplight") return 12.2;
    if (kind === "beauty-dish") return 15.2;
    if (kind === "spot-head") return 16.4;
    if (kind === "spot-projector") return 18.8;
    return 11;
  }

  function getLightEstimation(lightItem, subjectItem) {
    if (!isLightEmitter(lightItem) || !subjectItem) return null;
    const distance = Math.max(0.35, distanceBetweenItems(lightItem, subjectItem));
    const angle = getAngleToTarget(lightItem, subjectItem);
    const aimFactor = Math.max(0.18, Math.cos(degreesToRadians(Math.min(angle, 89))));
    const power = clampPowerPercent(typeof lightItem.power === "number" ? lightItem.power : getDefaultPowerPercent(getVariantVisualKind(lightItem.variantId, lightItem.family)));
    const guideNumber = getLightGuideNumber(lightItem);
    const fStop = (guideNumber * Math.sqrt(power / 100) * Math.sqrt(aimFactor)) / distance;
    return {
      distance: distance,
      angle: angle,
      power: power,
      fStop: Math.max(0.7, fStop)
    };
  }

  function getVariantPreviewMarkup(variantId, variant) {
    const kind = getVariantVisualKind(variantId, variant.family);
    const title = escapeHtml(getLocalizedVariantTitle(variantId, variant));
    const directionBadge = isDirectionalVisualKind(kind) ? `
      <g transform="translate(84 44)">
        <path d="M0 4 H18" stroke="#7ed7ff" stroke-width="2.8" stroke-linecap="round"></path>
        <path d="M12 0 L20 4 L12 8" fill="none" stroke="#7ed7ff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path>
      </g>
    ` : "";
    const tripod = `
      <g stroke="#7b8899" stroke-width="2.4" stroke-linecap="round" opacity="0.92">
        <line x1="60" y1="36" x2="60" y2="53"></line>
        <line x1="60" y1="53" x2="48" y2="58"></line>
        <line x1="60" y1="53" x2="72" y2="58"></line>
        <line x1="60" y1="53" x2="60" y2="59"></line>
      </g>
    `;
    const cStandBase = `
      <g stroke="#7b8899" stroke-width="2.4" stroke-linecap="round" opacity="0.94">
        <line x1="60" y1="34" x2="60" y2="53"></line>
        <line x1="60" y1="53" x2="76" y2="57"></line>
        <line x1="60" y1="53" x2="47" y2="58"></line>
        <line x1="60" y1="53" x2="56" y2="40"></line>
      </g>
    `;
    const rollingBase = `
      <g stroke="#7b8899" stroke-width="2.4" stroke-linecap="round" opacity="0.94">
        <line x1="60" y1="33" x2="60" y2="49"></line>
        <line x1="60" y1="49" x2="45" y2="54"></line>
        <line x1="60" y1="49" x2="75" y2="54"></line>
        <line x1="60" y1="49" x2="60" y2="57"></line>
      </g>
      <circle cx="45" cy="54" r="3.2" fill="#6f7b88"></circle>
      <circle cx="75" cy="54" r="3.2" fill="#6f7b88"></circle>
      <circle cx="60" cy="57" r="3.2" fill="#6f7b88"></circle>
    `;
    let body = "";

    if (kind === "softbox-octa") {
      body = `
        <polygon points="60,8 79,13 89,27 79,41 60,46 41,41 31,27 41,13" fill="#f7fbff" stroke="#1a2330" stroke-width="3"></polygon>
        <polygon points="60,13 75,17 83,27 75,37 60,41 45,37 37,27 45,17" fill="rgba(255,255,255,0.16)" stroke="#dfe9f7" stroke-width="1.2" opacity="0.72"></polygon>
        <line x1="60" y1="46" x2="60" y2="38" stroke="#1d2632" stroke-width="2.4"></line>
        ${tripod}
      `;
    } else if (kind === "softbox-parabolic") {
      body = `
        <polygon points="60,6 80,11 91,27 80,43 60,48 40,43 29,27 40,11" fill="#f8fbff" stroke="#16202c" stroke-width="3"></polygon>
        <polygon points="60,12 75,16 83,27 75,38 60,42 45,38 37,27 45,16" fill="rgba(255,255,255,0.18)" stroke="#dfe8f6" stroke-width="1.2"></polygon>
        <circle cx="60" cy="27" r="4.5" fill="#aeb9c6" stroke="#202a36" stroke-width="2"></circle>
        <line x1="60" y1="48" x2="60" y2="38" stroke="#1d2632" stroke-width="2.4"></line>
        ${tripod}
      `;
    } else if (kind === "softbox-rect") {
      body = `
        <rect x="34" y="10" width="52" height="28" rx="8" fill="#f7fbff" stroke="#16202c" stroke-width="3"></rect>
        <rect x="40" y="15" width="40" height="18" rx="5" fill="rgba(255,255,255,0.22)" stroke="#dfe7f2" stroke-width="1.2"></rect>
        <line x1="60" y1="38" x2="60" y2="41" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "led-panel") {
      body = `
        <rect x="38" y="10" width="44" height="30" rx="6" fill="#c7d7e8" stroke="#17212d" stroke-width="3"></rect>
        <rect x="43" y="15" width="34" height="20" rx="4" fill="#eef6ff" stroke="#9eb6cf" stroke-width="1.2"></rect>
        <circle cx="51" cy="22" r="1.5" fill="#adc9e7"></circle>
        <circle cx="60" cy="22" r="1.5" fill="#adc9e7"></circle>
        <circle cx="69" cy="22" r="1.5" fill="#adc9e7"></circle>
        <circle cx="51" cy="28" r="1.5" fill="#adc9e7"></circle>
        <circle cx="60" cy="28" r="1.5" fill="#adc9e7"></circle>
        <circle cx="69" cy="28" r="1.5" fill="#adc9e7"></circle>
        <line x1="60" y1="40" x2="60" y2="43" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "striplight") {
      body = `
        <rect x="48" y="6" width="24" height="38" rx="8" fill="#f5f9fd" stroke="#17212d" stroke-width="3"></rect>
        <rect x="52" y="12" width="16" height="26" rx="5" fill="rgba(255,255,255,0.22)" stroke="#dbe5f0" stroke-width="1.1"></rect>
        <line x1="60" y1="44" x2="60" y2="46" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "tube") {
      body = `
        <rect x="52" y="8" width="16" height="38" rx="8" fill="rgba(153,224,255,0.18)"></rect>
        <rect x="56" y="6" width="8" height="42" rx="4" fill="#e4f6ff" stroke="#19313f" stroke-width="2"></rect>
        <line x1="60" y1="48" x2="60" y2="50" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "umbrella") {
      body = `
        <path d="M22 24 Q60 3 98 24 Q60 18 22 24Z" fill="#f5f9fe" stroke="#18222d" stroke-width="3"></path>
        <line x1="60" y1="24" x2="60" y2="49" stroke="#6a7788" stroke-width="2.2"></line>
        <line x1="60" y1="24" x2="32" y2="23" stroke="#b8c6d6" stroke-width="1.1"></line>
        <line x1="60" y1="24" x2="44" y2="15" stroke="#b8c6d6" stroke-width="1.1"></line>
        <line x1="60" y1="24" x2="76" y2="15" stroke="#b8c6d6" stroke-width="1.1"></line>
        <line x1="60" y1="24" x2="88" y2="23" stroke="#b8c6d6" stroke-width="1.1"></line>
        ${tripod}
      `;
    } else if (kind === "lantern") {
      body = `
        <circle cx="60" cy="24" r="16" fill="#f7fbff" stroke="#17212d" stroke-width="3"></circle>
        <ellipse cx="60" cy="24" rx="9" ry="16" fill="none" stroke="#d4dfeb" stroke-width="1.2"></ellipse>
        <ellipse cx="60" cy="24" rx="16" ry="8" fill="none" stroke="#d4dfeb" stroke-width="1.2"></ellipse>
        <line x1="60" y1="40" x2="60" y2="44" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "ringlight") {
      body = `
        <circle cx="60" cy="24" r="16" fill="#f8fbff" stroke="#17212d" stroke-width="3"></circle>
        <circle cx="60" cy="24" r="7.5" fill="#0d1624" stroke="#90a0b3" stroke-width="1.2"></circle>
        <rect x="56" y="39" width="8" height="6" rx="2" fill="#98a7b8" stroke="#1d2632" stroke-width="1.5"></rect>
        ${tripod}
      `;
    } else if (kind === "beauty-dish") {
      body = `
        <circle cx="60" cy="24" r="15" fill="#edf3f9" stroke="#18222d" stroke-width="3"></circle>
        <circle cx="60" cy="24" r="4.4" fill="#aab7c6" stroke="#25303d" stroke-width="1.6"></circle>
        <line x1="60" y1="39" x2="60" y2="42" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "reflector-disc") {
      body = `
        <circle cx="60" cy="24" r="16" fill="#f2f4f7" stroke="#1a2430" stroke-width="3"></circle>
        <path d="M60 8 A16 16 0 0 1 76 24 L60 24 Z" fill="#cfd6de"></path>
        <path d="M60 40 A16 16 0 0 1 44 24 L60 24 Z" fill="#e7ebf0"></path>
        <circle cx="60" cy="24" r="10" fill="none" stroke="#aeb8c3" stroke-width="1.2"></circle>
        ${tripod}
      `;
    } else if (kind === "spot-projector") {
      body = `
        <rect x="35" y="18" width="38" height="14" rx="6" fill="#bac4d0" stroke="#18222d" stroke-width="3"></rect>
        <rect x="71" y="16" width="16" height="18" rx="5" fill="#8c98a7" stroke="#17212d" stroke-width="2.4"></rect>
        <circle cx="85" cy="25" r="5" fill="#e7f5ff" stroke="#22303d" stroke-width="2"></circle>
        <line x1="55" y1="32" x2="60" y2="38" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "spot-head") {
      body = `
        <circle cx="60" cy="24" r="12" fill="#b8c3cf" stroke="#18222d" stroke-width="3"></circle>
        <circle cx="64" cy="24" r="5" fill="#e7f5ff" stroke="#22303d" stroke-width="2"></circle>
        <rect x="44" y="18" width="10" height="12" rx="3" fill="#7f8b99" stroke="#1d2632" stroke-width="1.8"></rect>
        <line x1="60" y1="36" x2="60" y2="39" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "cstand") {
      body = `
        <circle cx="60" cy="24" r="4.2" fill="#d6dde5"></circle>
        <circle cx="60" cy="17" r="4.2" fill="#d6dde5"></circle>
        <line x1="60" y1="12" x2="60" y2="34" stroke="#c0cad5" stroke-width="3.4" stroke-linecap="round"></line>
        <line x1="60" y1="17" x2="74" y2="13" stroke="#e2b56f" stroke-width="2.3" stroke-linecap="round"></line>
        <rect x="72" y="10" width="10" height="6" rx="2" fill="#efc884" stroke="#2a313a" stroke-width="1.4"></rect>
        ${cStandBase}
      `;
    } else if (kind === "cstand-arm") {
      body = `
        <circle cx="60" cy="24" r="4.2" fill="#d6dde5"></circle>
        <circle cx="60" cy="17" r="4.2" fill="#d6dde5"></circle>
        <line x1="60" y1="12" x2="60" y2="34" stroke="#c0cad5" stroke-width="3.4" stroke-linecap="round"></line>
        <line x1="60" y1="17" x2="84" y2="11" stroke="#e2b56f" stroke-width="2.3" stroke-linecap="round"></line>
        <rect x="82" y="8" width="10" height="6" rx="2" fill="#efc884" stroke="#2a313a" stroke-width="1.4"></rect>
        ${cStandBase}
      `;
    } else if (kind === "combo-stand") {
      body = `
        <line x1="60" y1="10" x2="60" y2="34" stroke="#cbd3dc" stroke-width="4" stroke-linecap="round"></line>
        <line x1="54" y1="14" x2="54" y2="32" stroke="#9aa7b5" stroke-width="1.8"></line>
        <line x1="66" y1="14" x2="66" y2="32" stroke="#9aa7b5" stroke-width="1.8"></line>
        <rect x="54" y="7" width="12" height="8" rx="2" fill="#efc884" stroke="#2a313a" stroke-width="1.4"></rect>
        ${tripod}
      `;
    } else if (kind === "roller-stand") {
      body = `
        <line x1="60" y1="10" x2="60" y2="34" stroke="#cbd3dc" stroke-width="3.8" stroke-linecap="round"></line>
        <circle cx="60" cy="15" r="4" fill="#d8dee5"></circle>
        <rect x="56" y="7" width="8" height="7" rx="2" fill="#efc884" stroke="#2a313a" stroke-width="1.2"></rect>
        ${rollingBase}
      `;
    } else if (kind === "boom-stand") {
      body = `
        <line x1="60" y1="11" x2="60" y2="34" stroke="#cbd3dc" stroke-width="3.8" stroke-linecap="round"></line>
        <circle cx="60" cy="15" r="4" fill="#d8dee5"></circle>
        <line x1="60" y1="15" x2="86" y2="9" stroke="#efc884" stroke-width="2.4" stroke-linecap="round"></line>
        <rect x="85" y="6" width="8" height="7" rx="2" fill="#c99958" stroke="#2a313a" stroke-width="1.2"></rect>
        <rect x="42" y="9" width="8" height="6" rx="2" fill="#7c8792" stroke="#2a313a" stroke-width="1.2"></rect>
        ${rollingBase}
      `;
    } else if (kind === "power-pack") {
      body = `
        <rect x="38" y="16" width="44" height="24" rx="6" fill="#969faa" stroke="#18222d" stroke-width="2.4"></rect>
        <rect x="44" y="22" width="14" height="4" rx="2" fill="#dfe6ee"></rect>
        <rect x="44" y="29" width="28" height="5" rx="2" fill="#728090"></rect>
        <circle cx="76" cy="27" r="4" fill="#efc884"></circle>
      `;
    } else if (kind === "flag") {
      body = `
        <rect x="34" y="10" width="52" height="24" rx="5" fill="#28303a" stroke="#080b10" stroke-width="3"></rect>
        <rect x="38" y="14" width="44" height="16" rx="3" fill="#11171e"></rect>
        <line x1="38" y1="34" x2="38" y2="39" stroke="#728091" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "flat-panel") {
      body = `
        <rect x="30" y="10" width="60" height="26" rx="6" fill="#eef2f5" stroke="#18222d" stroke-width="3"></rect>
        <line x1="60" y1="10" x2="60" y2="36" stroke="#b7c2ce" stroke-width="2"></line>
        <line x1="60" y1="36" x2="60" y2="39" stroke="#1d2632" stroke-width="2.2"></line>
        ${tripod}
      `;
    } else if (kind === "camera") {
      body = `
        <rect x="38" y="18" width="30" height="16" rx="5" fill="#66707d" stroke="#18222d" stroke-width="3"></rect>
        <circle cx="72" cy="26" r="8" fill="#89cfff" stroke="#122131" stroke-width="2.4"></circle>
        <rect x="44" y="14" width="10" height="6" rx="2" fill="#87909b"></rect>
        ${tripod}
      `;
    } else if (kind === "subject") {
      body = `
        <circle cx="60" cy="16" r="7" fill="#e2bc9d"></circle>
        <path d="M44 42 C46 29 52 24 60 24 C68 24 74 29 76 42 Z" fill="#394554"></path>
        <path d="M49 42 C51 32 55 28 60 28 C65 28 69 32 71 42 Z" fill="#556273"></path>
      `;
    } else if (kind === "director-chair") {
      body = `
        <rect x="42" y="12" width="28" height="11" rx="5" fill="#d7b994" stroke="#3d3023" stroke-width="2"></rect>
        <rect x="44" y="24" width="24" height="8" rx="4" fill="#d4b189" stroke="#3d3023" stroke-width="2"></rect>
        <line x1="44" y1="23" x2="68" y2="47" stroke="#66717e" stroke-width="2.4"></line>
        <line x1="68" y1="23" x2="44" y2="47" stroke="#66717e" stroke-width="2.4"></line>
      `;
    } else if (kind === "stool") {
      body = `
        <rect x="44" y="18" width="32" height="7" rx="4" fill="#c9aa83" stroke="#3d3023" stroke-width="2"></rect>
        <line x1="50" y1="25" x2="46" y2="47" stroke="#6a7480" stroke-width="2.4"></line>
        <line x1="70" y1="25" x2="74" y2="47" stroke="#6a7480" stroke-width="2.4"></line>
        <line x1="60" y1="25" x2="60" y2="49" stroke="#6a7480" stroke-width="2.4"></line>
      `;
    } else if (kind === "chair") {
      body = `
        <rect x="42" y="24" width="26" height="10" rx="4" fill="#d4b189" stroke="#3d3023" stroke-width="2"></rect>
        <rect x="39" y="11" width="30" height="15" rx="6" fill="#d7b994" stroke="#3d3023" stroke-width="2"></rect>
        <line x1="46" y1="34" x2="43" y2="49" stroke="#66717e" stroke-width="2.2"></line>
        <line x1="64" y1="34" x2="67" y2="49" stroke="#66717e" stroke-width="2.2"></line>
      `;
    } else if (kind === "armchair") {
      body = `
        <rect x="36" y="14" width="48" height="22" rx="8" fill="#caa47b" stroke="#3d3023" stroke-width="2.2"></rect>
        <rect x="42" y="19" width="36" height="14" rx="6" fill="#e0c1a0"></rect>
        <rect x="31" y="20" width="10" height="12" rx="5" fill="#caa47b" stroke="#3d3023" stroke-width="2"></rect>
        <rect x="79" y="20" width="10" height="12" rx="5" fill="#caa47b" stroke="#3d3023" stroke-width="2"></rect>
      `;
    } else if (kind === "bench") {
      body = `
        <rect x="28" y="22" width="64" height="10" rx="5" fill="#cfa67a" stroke="#3d3023" stroke-width="2"></rect>
        <line x1="36" y1="32" x2="34" y2="48" stroke="#66717e" stroke-width="2.2"></line>
        <line x1="84" y1="32" x2="86" y2="48" stroke="#66717e" stroke-width="2.2"></line>
      `;
    } else if (kind === "sofa") {
      body = `
        <rect x="30" y="20" width="60" height="18" rx="7" fill="#cba57c" stroke="#3c2f22" stroke-width="2.4"></rect>
        <rect x="34" y="13" width="52" height="12" rx="6" fill="#d7b48b" stroke="#3c2f22" stroke-width="2"></rect>
        <rect x="39" y="24" width="18" height="10" rx="4" fill="#dfc4a7"></rect>
        <rect x="63" y="24" width="18" height="10" rx="4" fill="#dfc4a7"></rect>
      `;
    } else if (kind === "round-table") {
      body = `
        <ellipse cx="60" cy="21" rx="24" ry="12" fill="#d4b188" stroke="#3c2f22" stroke-width="2.2"></ellipse>
        <line x1="60" y1="33" x2="60" y2="47" stroke="#687381" stroke-width="3"></line>
        <line x1="48" y1="47" x2="72" y2="47" stroke="#687381" stroke-width="2.4"></line>
      `;
    } else if (kind === "desk") {
      body = `
        <rect x="28" y="18" width="64" height="10" rx="4" fill="#d4b188" stroke="#3c2f22" stroke-width="2.2"></rect>
        <rect x="38" y="28" width="44" height="10" rx="3" fill="#9d8167" opacity="0.9"></rect>
        <line x1="34" y1="28" x2="34" y2="48" stroke="#66717e" stroke-width="2.2"></line>
        <line x1="86" y1="28" x2="86" y2="48" stroke="#66717e" stroke-width="2.2"></line>
      `;
    } else if (kind === "makeup-station") {
      body = `
        <rect x="30" y="29" width="60" height="8" rx="4" fill="#d4b188" stroke="#3c2f22" stroke-width="2"></rect>
        <rect x="42" y="8" width="36" height="18" rx="6" fill="#dff0ff" stroke="#1a2430" stroke-width="2"></rect>
        <circle cx="46" cy="12" r="1.7" fill="#ffd79e"></circle>
        <circle cx="74" cy="12" r="1.7" fill="#ffd79e"></circle>
        <circle cx="46" cy="22" r="1.7" fill="#ffd79e"></circle>
        <circle cx="74" cy="22" r="1.7" fill="#ffd79e"></circle>
        <line x1="38" y1="37" x2="36" y2="49" stroke="#66717e" stroke-width="2"></line>
        <line x1="82" y1="37" x2="84" y2="49" stroke="#66717e" stroke-width="2"></line>
      `;
    } else if (kind === "table") {
      body = `
        <rect x="30" y="16" width="60" height="10" rx="5" fill="#d4b188" stroke="#3c2f22" stroke-width="2.2"></rect>
        <line x1="40" y1="26" x2="38" y2="49" stroke="#687381" stroke-width="2.4"></line>
        <line x1="80" y1="26" x2="82" y2="49" stroke="#687381" stroke-width="2.4"></line>
      `;
    } else if (kind === "tether-station") {
      body = `
        <rect x="36" y="24" width="48" height="6" rx="3" fill="#aab3be" stroke="#18222d" stroke-width="1.8"></rect>
        <path d="M44 15 H68 L74 24 H50 Z" fill="#606b78" stroke="#18222d" stroke-width="2"></path>
        <line x1="60" y1="30" x2="60" y2="49" stroke="#6b7683" stroke-width="2.4"></line>
        <line x1="49" y1="49" x2="71" y2="49" stroke="#6b7683" stroke-width="2.2"></line>
      `;
    } else if (kind === "monitor-station") {
      body = `
        <rect x="38" y="11" width="44" height="26" rx="5" fill="#131a24" stroke="#aab4c0" stroke-width="2"></rect>
        <rect x="44" y="17" width="32" height="14" rx="3" fill="#7bb6e8" opacity="0.7"></rect>
        <line x1="60" y1="37" x2="60" y2="49" stroke="#6b7683" stroke-width="2.4"></line>
        <line x1="49" y1="49" x2="71" y2="49" stroke="#6b7683" stroke-width="2.2"></line>
      `;
    } else if (kind === "dimmer-desk") {
      body = `
        <rect x="30" y="20" width="60" height="18" rx="6" fill="#8d98a6" stroke="#18222d" stroke-width="2"></rect>
        <rect x="36" y="24" width="48" height="10" rx="4" fill="#5a6774"></rect>
        <line x1="42" y1="25" x2="42" y2="33" stroke="#efc884" stroke-width="1.8"></line>
        <line x1="52" y1="25" x2="52" y2="33" stroke="#efc884" stroke-width="1.8"></line>
        <line x1="62" y1="25" x2="62" y2="33" stroke="#efc884" stroke-width="1.8"></line>
        <line x1="72" y1="25" x2="72" y2="33" stroke="#efc884" stroke-width="1.8"></line>
      `;
    } else if (kind === "cart") {
      body = `
        <rect x="36" y="18" width="48" height="8" rx="3" fill="#9ea9b6" stroke="#18222d" stroke-width="2"></rect>
        <rect x="36" y="30" width="48" height="8" rx="3" fill="#9ea9b6" stroke="#18222d" stroke-width="2"></rect>
        <line x1="42" y1="18" x2="42" y2="38" stroke="#6a7583" stroke-width="2"></line>
        <line x1="78" y1="18" x2="78" y2="38" stroke="#6a7583" stroke-width="2"></line>
        <path d="M84 18 Q91 21 91 28" fill="none" stroke="#6a7583" stroke-width="2"></path>
        <circle cx="42" cy="46" r="4" fill="#6a7583"></circle>
        <circle cx="78" cy="46" r="4" fill="#6a7583"></circle>
      `;
    } else if (kind === "sandbag") {
      body = `
        <path d="M36 31 C36 20 44 16 52 16 C57 16 59 20 60 24 C61 20 63 16 68 16 C76 16 84 20 84 31 C84 38 79 43 72 43 C66 43 63 40 60 35 C57 40 54 43 48 43 C41 43 36 38 36 31 Z" fill="#6f5b49" stroke="#2a211b" stroke-width="2"></path>
        <rect x="56" y="20" width="8" height="6" rx="3" fill="#baa286"></rect>
      `;
    } else if (kind === "ladder") {
      body = `
        <line x1="44" y1="12" x2="36" y2="48" stroke="#b8c1cb" stroke-width="3"></line>
        <line x1="76" y1="12" x2="84" y2="48" stroke="#b8c1cb" stroke-width="3"></line>
        <line x1="46" y1="18" x2="74" y2="18" stroke="#b8c1cb" stroke-width="2.4"></line>
        <line x1="43" y1="28" x2="77" y2="28" stroke="#b8c1cb" stroke-width="2.4"></line>
        <line x1="40" y1="38" x2="80" y2="38" stroke="#b8c1cb" stroke-width="2.4"></line>
      `;
    } else if (kind === "mirror") {
      body = `
        <rect x="44" y="8" width="32" height="40" rx="12" fill="#dfefff" stroke="#1a2430" stroke-width="3"></rect>
        <rect x="49" y="13" width="22" height="30" rx="9" fill="#99c6ef" opacity="0.7"></rect>
        <line x1="52" y1="49" x2="46" y2="57" stroke="#8a97a8" stroke-width="2.2"></line>
        <line x1="68" y1="49" x2="74" y2="57" stroke="#8a97a8" stroke-width="2.2"></line>
      `;
    } else if (kind === "applebox") {
      body = `
        <rect x="36" y="18" width="48" height="24" rx="4" fill="#cfa67a" stroke="#3c2f22" stroke-width="2.4"></rect>
        <rect x="44" y="25" width="12" height="6" rx="3" fill="#9d754e"></rect>
        <rect x="64" y="25" width="12" height="6" rx="3" fill="#9d754e"></rect>
        <line x1="36" y1="23" x2="84" y2="23" stroke="#9d754e" stroke-width="1.4"></line>
      `;
    } else if (kind === "block") {
      body = `
        <rect x="42" y="16" width="36" height="26" rx="4" fill="#cfa67a" stroke="#3c2f22" stroke-width="2.4"></rect>
        <line x1="42" y1="24" x2="78" y2="24" stroke="#9d754e" stroke-width="1.4"></line>
      `;
    } else {
      body = `
        ${tripod}
        <circle cx="60" cy="24" r="12" fill="#c8d0d8" stroke="#17212d" stroke-width="3"></circle>
      `;
    }

    return `
      <span class="variant-preview" aria-hidden="true">
        <svg viewBox="0 0 120 60" class="variant-svg" role="img" aria-label="${title}">
          ${body}
          ${directionBadge}
        </svg>
      </span>
    `;
  }
  function renderColorSwatches(container, palette, kind) {
    container.innerHTML = palette.map(function (entry) {
      const label = getLocalizedColorLabel(entry);
      return `
        <button class="menu-swatch" type="button" data-color-kind="${kind}" data-color-id="${entry.id}">
          <span class="menu-swatch-chip" style="background:${entry.color}"></span>
          <strong>${escapeHtml(label)}</strong>
        </button>
      `;
    }).join("");
  }

  function updateColorSwatchState() {
    document.querySelectorAll('[data-color-kind="floor"]').forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-color-id") === state.floorId);
    });
    document.querySelectorAll('[data-color-kind="backdrop"]').forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-color-id") === state.backdropId);
    });
  }

  function normalizeCustomPreset(input) {
    const preset = input && typeof input === "object" ? input : {};
    const items = Array.isArray(preset.items) ? preset.items : [];
    return {
      id: String(preset.id || ""),
      name: String(preset.name || "").trim(),
      floorId: String(preset.floorId || FLOOR_COLORS[0].id),
      backdropId: String(preset.backdropId || BACKDROP_COLORS[3].id),
      items: items.map(function (entry) {
        return {
          variantId: String(entry.variantId || ""),
          x: typeof entry.x === "number" ? entry.x : 0,
          y: typeof entry.y === "number" ? entry.y : 0,
          rotation: typeof entry.rotation === "number" ? entry.rotation : 0,
          label: typeof entry.label === "string" ? entry.label : "",
          power: typeof entry.power === "number" ? clampPowerPercent(entry.power) : null
        };
      }).filter(function (entry) {
        return entry.variantId && ITEM_VARIANTS[entry.variantId];
      }),
      isCustom: true
    };
  }

  function loadCustomPresets() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_CUSTOM_PRESETS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeCustomPreset).filter(function (preset) {
        return preset.id && preset.name && preset.items.length;
      });
    } catch (error) {
      return [];
    }
  }

  function persistCustomPresets() {
    try {
      window.localStorage.setItem(STORAGE_KEY_CUSTOM_PRESETS, JSON.stringify(state.customPresets.map(function (preset) {
        return {
          id: preset.id,
          name: preset.name,
          floorId: preset.floorId,
          backdropId: preset.backdropId,
          items: preset.items
        };
      })));
    } catch (error) {
      // Ignore storage access issues.
    }
  }

  function slugifyPresetName(name) {
    return String(name || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || `preset-${Date.now()}`;
  }

  function buildDynamicPresetSummary(preset) {
    const labels = [];
    const seen = new Set();

    preset.items.forEach(function (entry) {
      const variant = ITEM_VARIANTS[entry.variantId];
      if (!variant || variant.family === "subject") return;
      const label = getLocalizedVariantTitle(entry.variantId, variant);
      if (seen.has(label)) return;
      seen.add(label);
      labels.push(label);
    });

    const itemWord = preset.items.length === 1 ? t("status.itemSingular") : t("status.itemPlural");
    const countLabel = `${preset.items.length} ${itemWord}`;
    const visible = labels.slice(0, 3);
    const suffix = labels.length > 3 ? ` +${labels.length - 3}` : "";
    if (!visible.length) return countLabel;
    return `${countLabel} · ${formatLocalizedList(visible)}${suffix}`.trim();
  }

  function serializeCurrentPreset(name) {
    return normalizeCustomPreset({
      id: `custom-${slugifyPresetName(name)}`,
      name: name,
      floorId: state.floorId,
      backdropId: state.backdropId,
      items: state.items.map(function (item) {
        return {
          variantId: item.variantId,
          x: Number(item.x.toFixed(3)),
          y: Number(item.y.toFixed(3)),
          rotation: Number(item.rotation.toFixed(1)),
          label: item.label,
          power: typeof item.power === "number" ? item.power : null
        };
      })
    });
  }

  function saveCurrentPreset() {
    if (!state.items.length) {
      window.alert(getUiCopy("savePresetEmpty"));
      return;
    }

    const name = window.prompt(getUiCopy("savePresetPrompt"), "");
    if (name === null) return;

    const trimmed = String(name || "").trim();
    if (!trimmed) return;

    const preset = serializeCurrentPreset(trimmed);
    const existingIndex = state.customPresets.findIndex(function (entry) {
      return entry.id === preset.id;
    });

    if (existingIndex >= 0) state.customPresets.splice(existingIndex, 1, preset);
    else state.customPresets.unshift(preset);

    persistCustomPresets();
    renderPresetMenu();
    window.alert(getUiCopy("savePresetSaved", { name: trimmed }));
  }

  function getPresetCategories() {
    if (!state.customPresets.length) return STUDIO_PRESET_CATEGORIES;
    return [{
      id: "custom",
      label: getUiCopy("customPresets"),
      description: getUiCopy("customPresetsDescription"),
      presets: state.customPresets
    }].concat(STUDIO_PRESET_CATEGORIES);
  }

  function renderPresetMenu() {
    if (!refs.presetMenuList) return;
    refs.presetMenuList.innerHTML = getPresetCategories().map(function (category) {
      const categoryCopy = getLocalizedPresetCategory(category);
      return `
        <section class="preset-group">
          <div class="preset-head">
            <h3>${escapeHtml(categoryCopy.label)}</h3>
            <p>${escapeHtml(categoryCopy.description)}</p>
          </div>
          <div class="preset-list">
            ${category.presets.map(function (preset) {
              return `
                <button class="preset-item" type="button" data-preset-id="${preset.id}">
                  <em>${escapeHtml(categoryCopy.label)}</em>
                  <strong>${escapeHtml(getLocalizedPresetName(preset))}</strong>
                  <span>${escapeHtml(getLocalizedPresetSummary(preset))}</span>
                </button>
              `;
            }).join("")}
          </div>
        </section>
      `;
    }).join("");
  }

  function findPreset(presetId) {
    const categories = getPresetCategories();
    for (let i = 0; i < categories.length; i += 1) {
      const category = categories[i];
      const preset = category.presets.find(function (entry) {
        return entry.id === presetId;
      });
      if (preset) return preset;
    }
    return null;
  }
  function createPlacedItem(variantId, options) {
    const variant = ITEM_VARIANTS[variantId];
    if (!variant) return null;

    const spawn = spawnPoints[state.items.length % spawnPoints.length];
    const config = options || {};
    const kind = getVariantVisualKind(variantId, variant.family);
    const emitter = isEmitterVisualKind(kind);
    return {
      id: `item-${state.nextId++}`,
      variantId: variantId,
      family: variant.family,
      typeLabel: variant.typeLabel,
      variantLabel: variant.shortLabel,
      sizeLabel: variant.sizeLabel,
      heightLabel: variant.heightLabel,
      description: variant.description,
      width: variant.width,
      depth: variant.depth,
      height: variant.height,
      shape: variant.shape,
      label: config.label || nextLabel(variant.typeLabel),
      x: clamp(typeof config.x === "number" ? config.x : spawn.x + randomOffset(), 0.75, STUDIO.width - 0.75),
      y: clamp(typeof config.y === "number" ? config.y : spawn.y + randomOffset(), 1.0, STUDIO.depth - 0.5),
      rotation: normalizeDegrees(typeof config.rotation === "number" ? config.rotation : defaultRotation(variant.family)),
      power: emitter ? clampPowerPercent(typeof config.power === "number" ? config.power : getDefaultPowerPercent(kind)) : null
    };
  }

  function loadPreset(presetId) {
    const preset = findPreset(presetId);
    if (!preset) return;

    state.floorId = preset.floorId || FLOOR_COLORS[0].id;
    state.backdropId = preset.backdropId || BACKDROP_COLORS[3].id;
    state.items = [];
    state.selectedId = null;
    state.interaction = null;
    state.nextId = 1;

    preset.items.forEach(function (entry) {
      const item = createPlacedItem(entry.variantId, entry);
      if (item) state.items.push(item);
    });

    state.selectedId = state.items[0] ? state.items[0].id : null;
    renderAll();
  }

  function addItem(variantId) {
    const item = createPlacedItem(variantId);
    if (!item) return;

    state.items.push(item);
    state.selectedId = item.id;
    renderAll();
  }
  function defaultRotation(family) {
    if (family === "softbox") return 45;
    if (family === "striplight") return 90;
    if (family === "reflector") return 90;
    if (family === "flag") return 90;
    if (family === "vflat") return 90;
    if (family === "stand") return 90;
    if (family === "table" || family === "stool") return 0;
    return 270;
  }

  function nextLabel(base) {
    const count = state.items.filter(function (item) {
      return item.typeLabel === base;
    }).length;
    return `${base} ${count + 1}`;
  }

  function randomOffset() {
    return (Math.random() - 0.5) * 0.28;
  }

  function handleReset() {
    if (!window.confirm(t("dialogs.reset"))) {
      return;
    }

    state.floorId = FLOOR_COLORS[0].id;
    state.backdropId = BACKDROP_COLORS[3].id;
    state.items = [];
    state.selectedId = null;
    state.interaction = null;
    renderAll();
  }

  function handleSelectionInput(event) {
    const item = getSelectedItem();
    if (!item) return;
    const field = event.target.getAttribute("data-field");
    if (!field) return;
    const value = parseFloat(event.target.value);
    if (Number.isNaN(value)) return;

    if (field === "x" || field === "y") {
      item[field] = clampItemPosition(item, field, value);
    } else if (field === "rotation") {
      item.rotation = normalizeDegrees(value);
    } else if (field === "power" && isLightEmitter(item)) {
      item.power = clampPowerPercent(value);
    }

    renderAll();
  }

  function handleSelectionClick(event) {
    const action = event.target.getAttribute("data-action");
    if (action !== "delete") return;
    deleteSelectedItem();
  }

  function distanceBetweenItems(a, b) {
    if (!a || !b) return 0;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt((dx * dx) + (dy * dy));
  }

  function getNearestItemByFamily(sourceItem, family) {
    const matches = state.items.filter(function (item) {
      return item.id !== sourceItem.id && item.family === family;
    });

    if (!matches.length) return null;

    return matches.reduce(function (closest, item) {
      if (!closest) return item;
      return distanceBetweenItems(sourceItem, item) < distanceBetweenItems(sourceItem, closest) ? item : closest;
    }, null);
  }

  function formatDistanceLabel(distance) {
    if (distance < 1) return `${Math.round(distance * 100)} cm`;
    return `${distance.toFixed(distance < 10 ? 2 : 1)} m`;
  }

  function formatAngleLabel(angle) {
    return `${Math.round(normalizeDegrees(angle))}°`;
  }

  function getAngleToTarget(sourceItem, targetItem) {
    const bearing = normalizeDegrees(radiansToDegrees(Math.atan2(targetItem.y - sourceItem.y, targetItem.x - sourceItem.x)));
    const diff = Math.abs(normalizeDegrees(bearing) - normalizeDegrees(sourceItem.rotation));
    return diff > 180 ? 360 - diff : diff;
  }

  function getBackdropDistance(item) {
    return Math.max(0, item.y - STUDIO.backdropDepth);
  }

  function getBackdropMeasureY(item) {
    return item.y <= STUDIO.backdropDepth ? item.y : STUDIO.backdropDepth;
  }

  function buildSelectionMetrics(item, copy) {
    const metrics = [{
      label: getUiCopy("metricHeight"),
      value: copy.height
    }, {
      label: getUiCopy("metricRotation"),
      value: formatAngleLabel(item.rotation)
    }];

    if (item.family === "subject") {
      const camera = getNearestItemByFamily(item, "camera");
      const mainLight = getNearestEmitter(item);
      metrics.push({
        label: getUiCopy("metricBackdropDistance"),
        value: formatDistanceLabel(getBackdropDistance(item))
      });
      if (camera) {
        metrics.push({
          label: getUiCopy("metricCameraDistance"),
          value: formatDistanceLabel(distanceBetweenItems(item, camera))
        });
      }
      if (mainLight) {
        const lightEstimate = getLightEstimation(mainLight, item);
        metrics.push({
          label: getUiCopy("metricMainLightDistance"),
          value: formatDistanceLabel(lightEstimate.distance)
        });
        metrics.push({
          label: getUiCopy("metricMainLightPower"),
          value: formatPowerLabel(lightEstimate.power)
        });
        metrics.push({
          label: getUiCopy("metricEstimatedFStop"),
          value: formatFStopLabel(lightEstimate.fStop)
        });
      }
      return metrics;
    }

    const subject = getNearestItemByFamily(item, "subject");
    if (!subject) return metrics;

    if (isLightEmitter(item)) {
      const lightEstimate = getLightEstimation(item, subject);
      metrics.push({
        label: getUiCopy("metricSubjectDistance"),
        value: formatDistanceLabel(lightEstimate.distance)
      });
      metrics.push({
        label: getUiCopy("metricLightAngle"),
        value: formatAngleLabel(lightEstimate.angle)
      });
      metrics.push({
        label: getUiCopy("metricMainLightPower"),
        value: formatPowerLabel(lightEstimate.power)
      });
      metrics.push({
        label: getUiCopy("metricEstimatedFStop"),
        value: formatFStopLabel(lightEstimate.fStop)
      });
      return metrics;
    }

    metrics.push({
      label: getUiCopy("metricSubjectDistance"),
      value: formatDistanceLabel(distanceBetweenItems(item, subject))
    });

    return metrics;
  }

  function updateSelectionPanel() {
    const item = getSelectedItem();
    if (!item) {
      refs.selectionPanel.className = "selection-panel empty";
      refs.selectionPanel.textContent = t("selection.empty");
      return;
    }

    const copy = getLocalizedVariantCopy(item.variantId, ITEM_VARIANTS[item.variantId]);
    const itemLabel = getLocalizedItemLabel(item);
    const powerMarkup = isLightEmitter(item) ? `
      <div class="selection-power">
        <label>
          <span>${escapeHtml(getUiCopy("power"))}</span>
          <span class="power-readout">${escapeHtml(formatPowerLabel(item.power))}</span>
        </label>
        <input type="range" min="10" max="100" step="5" data-field="power" value="${item.power}">
        <span class="inline-note">${escapeHtml(getUiCopy("powerHint"))}</span>
      </div>
    ` : "";
    const metricMarkup = buildSelectionMetrics(item, copy).map(function (entry) {
      return `
        <div class="metric-chip">
          <strong>${escapeHtml(entry.label)}</strong>
          <span>${escapeHtml(entry.value)}</span>
        </div>
      `;
    }).join("");

    refs.selectionPanel.className = "selection-panel";
    refs.selectionPanel.innerHTML = `
      <div class="selection-head">
        <div class="selection-copy">
          <strong>${escapeHtml(itemLabel)}</strong>
          <span>${escapeHtml(copy.type)} · ${escapeHtml(copy.short)}</span>
        </div>
        <button class="delete-btn" type="button" data-action="delete">${escapeHtml(t("selection.delete"))}</button>
      </div>
      <p class="selection-note">${escapeHtml(t("selection.note"))}</p>
      <div class="selection-grid">
        <label>${escapeHtml(getUiCopy("x"))}<input type="number" step="0.1" data-field="x" value="${item.x.toFixed(2)}"></label>
        <label>${escapeHtml(getUiCopy("y"))}<input type="number" step="0.1" data-field="y" value="${item.y.toFixed(2)}"></label>
        <label>${escapeHtml(t("selection.rotation"))}<input type="number" step="1" data-field="rotation" value="${item.rotation.toFixed(0)}"></label>
      </div>
      ${powerMarkup}
      <div class="selection-metrics">${metricMarkup}</div>
      <div class="selection-actions">
        <span class="inline-note">${escapeHtml(copy.size)}</span>
        <span class="inline-note">${escapeHtml(copy.height)}</span>
      </div>
    `;
  }

  function updateStatus() {
    const floor = getFloorColor();
    const backdrop = getBackdropColor();
    const itemWord = state.items.length === 1 ? t("status.itemSingular") : t("status.itemPlural");
    refs.studioBadge.textContent = getUiCopy("studio", { width: STUDIO.width, depth: STUDIO.depth });
    refs.countBadge.textContent = `${state.items.length} ${itemWord} · ${getLocalizedColorLabel(floor)} / ${getLocalizedColorLabel(backdrop)}`;
  }

  function renderAll() {
    resizeCanvas(refs.planCanvas);
    resizeCanvas(refs.isoCanvas);
    updateColorSwatchState();
    updateSelectionPanel();
    updateStatus();
    renderPlanZoomUi();
    renderIsoZoomUi();
    syncMeasurementToggle();
    syncMenus();
    drawPlanView();
    drawIsoView();
  }

  function getSelectedItem() {
    return findItem(state.selectedId);
  }

  function findItem(id) {
    return state.items.find(function (item) {
      return item.id === id;
    }) || null;
  }

  function deleteSelectedItem() {
    if (!state.selectedId) return;
    state.items = state.items.filter(function (item) {
      return item.id !== state.selectedId;
    });
    state.selectedId = null;
    state.interaction = null;
    renderAll();
  }

  function handleKeydown(event) {
    const item = getSelectedItem();
    if (!item) return;

    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      deleteSelectedItem();
      return;
    }

    const step = event.shiftKey ? 0.05 : 0.1;
    let changed = false;

    if (event.key === "ArrowLeft") {
      item.x = clampItemPosition(item, "x", item.x - step);
      changed = true;
    } else if (event.key === "ArrowRight") {
      item.x = clampItemPosition(item, "x", item.x + step);
      changed = true;
    } else if (event.key === "ArrowUp") {
      item.y = clampItemPosition(item, "y", item.y - step);
      changed = true;
    } else if (event.key === "ArrowDown") {
      item.y = clampItemPosition(item, "y", item.y + step);
      changed = true;
    } else if (event.key.toLowerCase() === "r") {
      item.rotation = normalizeDegrees(item.rotation + (event.shiftKey ? -10 : 10));
      changed = true;
    }

    if (changed) {
      event.preventDefault();
      renderAll();
    }
  }

  function handlePlanWheel(event) {
    const anchor = getCanvasPointFromEvent(event);
    if (!anchor) return;
    const delta = event.deltaY < 0 ? 0.14 : -0.14;
    if (!delta) return;
    event.preventDefault();
    closeMenus();
    setPlanZoom(state.planZoom + delta, anchor);
  }

  function handlePointerDown(event) {
    closeMenus();
    const canvasPoint = getCanvasPointFromEvent(event);
    if (!canvasPoint) return;
    updateActivePointer(event, canvasPoint);

    if (state.activePointers.size >= 2 && startPinchGesture()) {
      drawPlanView();
      return;
    }

    const point = planToStudio(canvasPoint.x, canvasPoint.y, getPlanMetrics(refs.planCanvas.width, refs.planCanvas.height));
    if (!point) return;

    if (state.measurementMode) {
      const measurePoint = resolveMeasurePoint(point.x, point.y);
      if (!state.measureStart || state.measureEnd) {
        state.measureStart = measurePoint;
        state.measurePreview = null;
        state.measureEnd = null;
      } else {
        state.measureEnd = measurePoint;
        state.measurePreview = null;
      }
      drawPlanView();
      return;
    }

    const selected = getSelectedItem();
    if (selected && isOnRotateHandle(point.x, point.y, selected)) {
      state.interaction = {
        mode: "rotate",
        pointerId: event.pointerId,
        itemId: selected.id
      };
      refs.planCanvas.setPointerCapture(event.pointerId);
      refs.planCanvas.style.cursor = "grabbing";
      return;
    }

    const hit = hitTest(point.x, point.y);
    if (!hit) {
      state.selectedId = null;
      state.interaction = null;
      renderAll();
      return;
    }

    state.selectedId = hit.id;
    state.interaction = {
      mode: "drag",
      pointerId: event.pointerId,
      itemId: hit.id,
      offsetX: point.x - hit.x,
      offsetY: point.y - hit.y
    };
    refs.planCanvas.setPointerCapture(event.pointerId);
    refs.planCanvas.style.cursor = "grabbing";
    renderAll();
  }

  function handlePointerMove(event) {
    const canvasPoint = getCanvasPointFromEvent(event);
    if (!canvasPoint) return;
    updateActivePointer(event, canvasPoint);

    if (state.pinchGesture && state.pinchGesture.pointerIds.indexOf(event.pointerId) !== -1) {
      const first = state.activePointers.get(state.pinchGesture.pointerIds[0]);
      const second = state.activePointers.get(state.pinchGesture.pointerIds[1]);
      if (first && second) {
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.max(24, Math.sqrt(dx * dx + dy * dy));
        const midpoint = {
          x: (first.x + second.x) / 2,
          y: (first.y + second.y) / 2
        };
        const nextZoom = state.pinchGesture.startZoom * (distance / state.pinchGesture.startDistance);
        setPlanZoom(nextZoom, midpoint);
      }
      return;
    }

    const point = planToStudio(canvasPoint.x, canvasPoint.y, getPlanMetrics(refs.planCanvas.width, refs.planCanvas.height));
    if (!point) return;

    if (state.measurementMode) {
      if (state.measureStart && !state.measureEnd) {
        state.measurePreview = resolveMeasurePoint(point.x, point.y);
      }
      refs.planCanvas.style.cursor = "crosshair";
      drawPlanView();
      return;
    }

    if (state.interaction && state.interaction.pointerId === event.pointerId) {
      const item = findItem(state.interaction.itemId);
      if (!item) return;

      if (state.interaction.mode === "drag") {
        item.x = clampItemPosition(item, "x", point.x - state.interaction.offsetX);
        item.y = clampItemPosition(item, "y", point.y - state.interaction.offsetY);
      } else if (state.interaction.mode === "rotate") {
        item.rotation = normalizeDegrees(radiansToDegrees(Math.atan2(point.y - item.y, point.x - item.x)));
      }

      renderAll();
      return;
    }

    const selected = getSelectedItem();
    const hoverHandle = selected ? isOnRotateHandle(point.x, point.y, selected) : false;
    const hoverItem = hoverHandle ? selected : hitTest(point.x, point.y);
    state.hoverHandle = hoverHandle;
    state.hoverItemId = hoverItem ? hoverItem.id : null;

    if (hoverHandle) refs.planCanvas.style.cursor = "crosshair";
    else if (hoverItem) refs.planCanvas.style.cursor = "grab";
    else refs.planCanvas.style.cursor = "default";

    drawPlanView();
  }

  function handlePointerUp(event) {
    clearActivePointer(event.pointerId);
    if (state.pinchGesture) return;
    if (state.measurementMode) return;
    if (state.interaction && state.interaction.pointerId === event.pointerId) {
      state.interaction = null;
      refs.planCanvas.releasePointerCapture(event.pointerId);
      refs.planCanvas.style.cursor = "default";
      renderAll();
    }
  }

  function handlePointerLeave(event) {
    if (event) clearActivePointer(event.pointerId);
    if (state.pinchGesture) return;
    if (state.measurementMode) {
      if (!state.measureEnd) state.measurePreview = null;
      refs.planCanvas.style.cursor = "crosshair";
      drawPlanView();
      return;
    }

    if (!state.interaction) {
      state.hoverHandle = false;
      state.hoverItemId = null;
      refs.planCanvas.style.cursor = "default";
      drawPlanView();
    }
  }

  function getCanvasPointFromEvent(event) {
    const rect = refs.planCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const ratioX = refs.planCanvas.width / rect.width;
    const ratioY = refs.planCanvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * ratioX,
      y: (event.clientY - rect.top) * ratioY
    };
  }

  function getPointerStudioPoint(event) {
    const canvasPoint = getCanvasPointFromEvent(event);
    if (!canvasPoint) return null;
    const metrics = getPlanMetrics(refs.planCanvas.width, refs.planCanvas.height);
    return planToStudio(canvasPoint.x, canvasPoint.y, metrics);
  }

  function resolveMeasurePoint(studioX, studioY) {
    const hit = hitTest(studioX, studioY);
    if (hit) {
      return {
        x: hit.x,
        y: hit.y,
        label: getLocalizedItemLabel(hit)
      };
    }

    return {
      x: clamp(studioX, 0, STUDIO.width),
      y: clamp(studioY, 0, STUDIO.depth),
      label: ""
    };
  }

  function hitTest(studioX, studioY) {
    const items = state.items.slice().reverse();
    for (let index = 0; index < items.length; index += 1) {
      if (isPointInsideItem(studioX, studioY, items[index])) {
        return items[index];
      }
    }
    return null;
  }

  function isPointInsideItem(studioX, studioY, item) {
    const radians = degreesToRadians(item.rotation);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const dx = studioX - item.x;
    const dy = studioY - item.y;
    const localX = dx * cos + dy * sin;
    const localY = -dx * sin + dy * cos;

    if (item.shape === "circle" || item.shape === "ellipse") {
      const rx = item.width / 2;
      const ry = item.depth / 2;
      return ((localX * localX) / (rx * rx)) + ((localY * localY) / (ry * ry)) <= 1;
    }

    return Math.abs(localX) <= item.width / 2 && Math.abs(localY) <= item.depth / 2;
  }

  function isOnRotateHandle(studioX, studioY, item) {
    const handle = getRotateHandle(item);
    const dx = studioX - handle.x;
    const dy = studioY - handle.y;
    return Math.sqrt(dx * dx + dy * dy) <= 0.18;
  }

  function getRotateHandle(item) {
    const distance = Math.max(item.width, item.depth) * 0.7 + 0.45;
    const radians = degreesToRadians(item.rotation);
    return {
      x: item.x + Math.cos(radians) * distance,
      y: item.y + Math.sin(radians) * distance
    };
  }

  function clampItemPosition(item, axis, value) {
    const radius = Math.max(item.width, item.depth) * 0.5;
    if (axis === "x") {
      return clamp(value, radius + 0.18, STUDIO.width - radius - 0.18);
    }
    return clamp(value, radius + 0.2, STUDIO.depth - radius - 0.18);
  }

  function drawPlanView(targetCtx, width, height) {
    const ctx = targetCtx || planCtx;
    const canvasWidth = width || refs.planCanvas.width;
    const canvasHeight = height || refs.planCanvas.height;
    const metrics = getPlanMetrics(canvasWidth, canvasHeight);
    const floor = getFloorColor();
    const backdrop = getBackdropColor();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const bg = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    bg.addColorStop(0, "rgba(255,255,255,0.07)");
    bg.addColorStop(1, "rgba(255,255,255,0.02)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const stageLeft = metrics.left;
    const stageTop = metrics.top;
    const stageWidth = STUDIO.width * metrics.scale;
    const stageHeight = STUDIO.depth * metrics.scale;

    const shell = ctx.createLinearGradient(stageLeft, stageTop, stageLeft, stageTop + stageHeight);
    shell.addColorStop(0, lightenHex(floor.color, 0.14));
    shell.addColorStop(1, darkenHex(floor.color, 0.18));
    roundRect(ctx, stageLeft, stageTop, stageWidth, stageHeight, 30 * metrics.unit);
    ctx.fillStyle = shell;
    ctx.fill();

    drawPlanBackdrop(ctx, metrics, backdrop.color);
    drawPlanGrid(ctx, metrics);
    drawPlanMeasures(ctx, metrics);

    state.items.forEach(function (item) {
      drawPlanItem(ctx, item, metrics);
    });

    const measurementGuides = state.measurementMode ? getMeasurementModeGuides() : [];
    if (measurementGuides.length) {
      drawMeasurementGuides(ctx, measurementGuides, metrics, {
        stroke: "rgba(255, 190, 114, 0.72)",
        border: "rgba(255, 190, 114, 0.3)",
        fill: "rgba(16, 14, 18, 0.92)",
        text: "rgba(255, 246, 229, 0.96)"
      });
    }

    const selected = getSelectedItem();
    if (selected) {
      if (!state.measurementMode || !measurementGuides.length) {
        drawSelectedMeasurementGuides(ctx, selected, metrics);
      }
      drawSelectionOutline(ctx, selected, metrics);
    }

    drawManualMeasurement(ctx, metrics);
  }

  function drawPlanBackdrop(ctx, metrics, color) {
    const width = STUDIO.width * metrics.scale;
    const depth = STUDIO.backdropDepth * metrics.scale;
    const left = metrics.left;
    const top = metrics.top;

    const backdropGradient = ctx.createLinearGradient(0, top, 0, top + depth);
    backdropGradient.addColorStop(0, lightenHex(color, 0.15));
    backdropGradient.addColorStop(1, darkenHex(color, 0.08));
    roundTopRect(ctx, left, top, width, depth + 14 * metrics.unit, 30 * metrics.unit);
    ctx.fillStyle = backdropGradient;
    ctx.fill();

    ctx.strokeStyle = rgbaFromHex(darkenHex(color, 0.3), 0.6);
    ctx.lineWidth = 2 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(left + 16 * metrics.unit, top + depth - 2 * metrics.unit);
    ctx.quadraticCurveTo(left + width / 2, top + depth + 20 * metrics.unit, left + width - 16 * metrics.unit, top + depth - 2 * metrics.unit);
    ctx.stroke();
  }

  function drawPlanGrid(ctx, metrics) {
    const left = metrics.left;
    const top = metrics.top;
    const width = STUDIO.width * metrics.scale;
    const height = STUDIO.depth * metrics.scale;

    ctx.save();
    roundRect(ctx, left, top, width, height, 30 * metrics.unit);
    ctx.clip();

    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1;
    for (let x = 0.5; x < STUDIO.width; x += 0.5) {
      const px = left + x * metrics.scale;
      ctx.beginPath();
      ctx.moveTo(px, top);
      ctx.lineTo(px, top + height);
      ctx.stroke();
    }
    for (let y = 0.5; y < STUDIO.depth; y += 0.5) {
      const py = top + y * metrics.scale;
      ctx.beginPath();
      ctx.moveTo(left, py);
      ctx.lineTo(left + width, py);
      ctx.stroke();
    }

    ctx.restore();

    ctx.strokeStyle = "rgba(7, 10, 16, 0.22)";
    ctx.lineWidth = 2 * metrics.unit;
    roundRect(ctx, left, top, width, height, 30 * metrics.unit);
    ctx.stroke();
  }

  function drawPlanMeasures(ctx, metrics) {
    ctx.save();
    ctx.fillStyle = "rgba(238,245,255,0.72)";
    ctx.font = `${Math.round(13 * metrics.unit)}px "Segoe UI", sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(`${STUDIO.width} m`, metrics.left + (STUDIO.width * metrics.scale) / 2, metrics.top + STUDIO.depth * metrics.scale + 26 * metrics.unit);
    ctx.save();
    ctx.translate(metrics.left - 26 * metrics.unit, metrics.top + (STUDIO.depth * metrics.scale) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${STUDIO.depth} m`, 0, 0);
    ctx.restore();
    ctx.restore();
  }

  function getPlanBeamConfig(item) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    if (kind === "camera") return { lengthMeters: 2.7, widthMeters: 0.55, color: "rgba(116, 180, 255, 0.14)" };
    if (kind === "softbox-octa" || kind === "softbox-rect" || kind === "softbox-parabolic") return { lengthMeters: 2.45, widthMeters: 0.82, color: "rgba(255, 232, 184, 0.18)" };
    if (kind === "striplight") return { lengthMeters: 2.6, widthMeters: 0.48, color: "rgba(255, 232, 184, 0.16)" };
    if (kind === "tube") return { lengthMeters: 2.2, widthMeters: 0.3, color: "rgba(179, 228, 255, 0.14)" };
    if (kind === "led-panel" || kind === "ringlight") return { lengthMeters: 2.2, widthMeters: 0.6, color: "rgba(255, 236, 198, 0.15)" };
    if (kind === "umbrella" || kind === "lantern") return { lengthMeters: 2.4, widthMeters: 0.92, color: "rgba(255, 237, 206, 0.15)" };
    if (kind === "beauty-dish" || kind === "spot-head") return { lengthMeters: 2.8, widthMeters: 0.38, color: "rgba(255, 225, 157, 0.18)" };
    if (kind === "spot-projector") return { lengthMeters: 3.1, widthMeters: 0.22, color: "rgba(255, 219, 140, 0.22)" };
    return null;
  }

  function traceOctagonPath(ctx, radiusX, radiusY) {
    const insetX = radiusX * 0.42;
    const insetY = radiusY * 0.42;
    ctx.beginPath();
    ctx.moveTo(-radiusX + insetX, -radiusY);
    ctx.lineTo(radiusX - insetX, -radiusY);
    ctx.lineTo(radiusX, -radiusY + insetY);
    ctx.lineTo(radiusX, radiusY - insetY);
    ctx.lineTo(radiusX - insetX, radiusY);
    ctx.lineTo(-radiusX + insetX, radiusY);
    ctx.lineTo(-radiusX, radiusY - insetY);
    ctx.lineTo(-radiusX, -radiusY + insetY);
    ctx.closePath();
  }

  function drawPlanItem(ctx, item, metrics) {
    const center = studioToPlan(item.x, item.y, metrics);
    const width = item.width * metrics.scale;
    const depth = item.depth * metrics.scale;
    const beam = getPlanBeamConfig(item);

    if (beam) {
      drawPlanBeam(ctx, item, metrics, beam.lengthMeters, beam.widthMeters, beam.color);
    }

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(degreesToRadians(item.rotation));

    if (item.family === "subject") drawPlanSubject(ctx, width, depth, metrics);
    else if (item.family === "camera") drawPlanCamera(ctx, width, depth, metrics);
    else if (item.family === "softbox") drawPlanSoftbox(ctx, item, width, depth, metrics);
    else if (item.family === "striplight") drawPlanStriplight(ctx, item, width, depth, metrics);
    else if (item.family === "reflector") drawPlanReflector(ctx, item, width, depth, metrics);
    else if (item.family === "flag") drawPlanFlag(ctx, width, depth, metrics);
    else if (item.family === "vflat") drawPlanVFlat(ctx, width, depth, metrics);
    else if (item.family === "stand") drawPlanStand(ctx, item, width, depth, metrics);
    else if (item.family === "stool") drawPlanStool(ctx, item, width, depth, metrics);
    else if (item.family === "table") drawPlanTable(ctx, item, width, depth, metrics);

    ctx.restore();
    drawPlanItemLabel(ctx, item, center, width, depth, metrics);
  }

  function drawPlanItemLabel(ctx, item, center, width, depth, metrics) {
    const label = getLocalizedItemLabel(item);
    const paddingX = 10 * metrics.unit;
    const labelHeight = 22 * metrics.unit;
    const stageLeft = metrics.left + 12 * metrics.unit;
    const stageRight = metrics.left + STUDIO.width * metrics.scale - 12 * metrics.unit;
    const stageTop = metrics.top + 12 * metrics.unit;
    const stageBottom = metrics.top + STUDIO.depth * metrics.scale - 12 * metrics.unit;
    const labelOffset = Math.max(width, depth) * 0.68;

    ctx.save();
    ctx.font = `${Math.round(11 * metrics.unit)}px "Segoe UI", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const labelWidth = ctx.measureText(label).width + paddingX * 2;
    const halfWidth = labelWidth / 2;
    let labelX = clamp(center.x, stageLeft + halfWidth, stageRight - halfWidth);
    let labelY = center.y - labelOffset;

    if (labelY - labelHeight / 2 < stageTop) {
      labelY = center.y + labelOffset;
    }
    if (labelY + labelHeight / 2 > stageBottom) {
      labelY = stageBottom - labelHeight / 2;
    }

    ctx.fillStyle = item.id === state.selectedId ? "rgba(8, 12, 18, 0.96)" : "rgba(8, 12, 18, 0.9)";
    roundRect(ctx, labelX - halfWidth, labelY - labelHeight / 2, labelWidth, labelHeight, 11 * metrics.unit);
    ctx.fill();
    ctx.strokeStyle = item.id === state.selectedId ? "rgba(140, 220, 255, 0.42)" : "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.2 * metrics.unit;
    ctx.stroke();
    ctx.fillStyle = "rgba(247, 241, 235, 0.96)";
    ctx.fillText(label, labelX, labelY + 1 * metrics.unit);
    ctx.restore();
  }

  function getSelectedMeasurementGuides(item) {
    const guides = [];

    if (item.family === "subject") {
      guides.push({
        from: { x: item.x, y: item.y },
        to: { x: item.x, y: getBackdropMeasureY(item) },
        label: formatDistanceLabel(getBackdropDistance(item))
      });

      const camera = getNearestItemByFamily(item, "camera");
      if (camera) {
        guides.push({
          from: { x: item.x, y: item.y },
          to: { x: camera.x, y: camera.y },
          label: formatDistanceLabel(distanceBetweenItems(item, camera))
        });
      }

      const mainLight = getNearestEmitter(item);
      if (mainLight) {
        const estimate = getLightEstimation(mainLight, item);
        guides.push({
          from: { x: item.x, y: item.y },
          to: { x: mainLight.x, y: mainLight.y },
          label: `${getUiCopy("guideMainLight")} ${formatDistanceLabel(estimate.distance)} · ${formatFStopLabel(estimate.fStop)}`
        });
      }

      return guides;
    }

    const subject = getNearestItemByFamily(item, "subject");
    if (!subject) return guides;

    let label = formatDistanceLabel(distanceBetweenItems(item, subject));
    if (isLightEmitter(item)) {
      const estimate = getLightEstimation(item, subject);
      label = `${formatDistanceLabel(estimate.distance)} · ${formatAngleLabel(estimate.angle)} · ${formatFStopLabel(estimate.fStop)}`;
    }

    guides.push({
      from: { x: item.x, y: item.y },
      to: { x: subject.x, y: subject.y },
      label: label
    });

    return guides;
  }

  function getMeasurementModeSubject() {
    const selected = getSelectedItem();
    if (selected && selected.family === "subject") return selected;

    const subjects = state.items.filter(function (item) {
      return item.family === "subject";
    });
    if (!subjects.length) return null;
    if (!selected) return subjects[0];

    return subjects.reduce(function (closest, item) {
      if (!closest) return item;
      return distanceBetweenItems(selected, item) < distanceBetweenItems(selected, closest) ? item : closest;
    }, null);
  }

  function getMeasurementModeGuides() {
    const subject = getMeasurementModeSubject();
    if (!subject) {
      const selected = getSelectedItem();
      return selected ? getSelectedMeasurementGuides(selected) : [];
    }

    const guides = [{
      from: { x: subject.x, y: subject.y },
      to: { x: subject.x, y: getBackdropMeasureY(subject) },
      label: `${getUiCopy("metricBackdropDistance")} · ${formatDistanceLabel(getBackdropDistance(subject))}`,
      distance: getBackdropDistance(subject),
      labelT: 0.38
    }];

    state.items.forEach(function (item) {
      if (item.id === subject.id) return;
      const distance = distanceBetweenItems(subject, item);
      guides.push({
        from: { x: subject.x, y: subject.y },
        to: { x: item.x, y: item.y },
        label: `${getLocalizedItemLabel(item)} · ${formatDistanceLabel(distance)}`,
        distance: distance,
        labelT: 0.72
      });
    });

    return guides.sort(function (a, b) {
      return (b.distance || 0) - (a.distance || 0);
    });
  }

  function drawMeasurementGuides(ctx, guides, metrics, palette) {
    if (!guides.length) return;

    const colors = Object.assign({
      stroke: "rgba(143, 208, 255, 0.62)",
      border: "rgba(143, 208, 255, 0.36)",
      fill: "rgba(9, 16, 28, 0.84)",
      text: "rgba(240, 248, 255, 0.92)"
    }, palette || {});

    ctx.save();
    ctx.setLineDash([10 * metrics.unit, 8 * metrics.unit]);
    ctx.lineWidth = 2 * metrics.unit;
    ctx.strokeStyle = colors.stroke;

    guides.forEach(function (guide) {
      const from = studioToPlan(guide.from.x, guide.from.y, metrics);
      const to = studioToPlan(guide.to.x, guide.to.y, metrics);
      const labelT = typeof guide.labelT === "number" ? guide.labelT : 0.5;
      const midX = from.x + (to.x - from.x) * labelT;
      const midY = from.y + (to.y - from.y) * labelT;
      const paddingX = 10 * metrics.unit;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.font = `${Math.round(11 * metrics.unit)}px "Segoe UI", sans-serif`;
      const labelWidth = ctx.measureText(guide.label).width + paddingX * 2;
      const labelHeight = 22 * metrics.unit;
      ctx.fillStyle = colors.fill;
      roundRect(ctx, midX - labelWidth / 2, midY - labelHeight / 2, labelWidth, labelHeight, 10 * metrics.unit);
      ctx.fill();
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 1.2 * metrics.unit;
      ctx.stroke();
      ctx.fillStyle = colors.text;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(guide.label, midX, midY + 1 * metrics.unit);
      ctx.setLineDash([10 * metrics.unit, 8 * metrics.unit]);
      ctx.strokeStyle = colors.stroke;
      ctx.lineWidth = 2 * metrics.unit;
    });

    ctx.restore();
  }

  function drawSelectedMeasurementGuides(ctx, item, metrics) {
    drawMeasurementGuides(ctx, getSelectedMeasurementGuides(item), metrics);
  }

  function drawManualMeasurement(ctx, metrics) {
    if (!state.measureStart) return;
    const endPoint = state.measureEnd || state.measurePreview;
    if (!endPoint) return;

    const start = studioToPlan(state.measureStart.x, state.measureStart.y, metrics);
    const end = studioToPlan(endPoint.x, endPoint.y, metrics);
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const distance = formatDistanceLabel(distanceBetweenItems(state.measureStart, endPoint));
    const labelParts = [];

    if (state.measureStart.label) labelParts.push(state.measureStart.label);
    if (endPoint.label) labelParts.push(endPoint.label);

    const label = labelParts.length ? `${labelParts.join(" <-> ")} · ${distance}` : distance;

    ctx.save();
    ctx.strokeStyle = "rgba(251, 191, 36, 0.92)";
    ctx.setLineDash([12 * metrics.unit, 8 * metrics.unit]);
    ctx.lineWidth = 2.2 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.setLineDash([]);

    [start, end].forEach(function (point) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5 * metrics.unit, 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24";
      ctx.fill();
      ctx.strokeStyle = "rgba(12, 20, 34, 0.88)";
      ctx.lineWidth = 1.6 * metrics.unit;
      ctx.stroke();
    });

    ctx.font = `${Math.round(11 * metrics.unit)}px "Segoe UI", sans-serif`;
    const labelWidth = ctx.measureText(label).width + 20 * metrics.unit;
    const labelHeight = 24 * metrics.unit;
    ctx.fillStyle = "rgba(14, 20, 30, 0.92)";
    roundRect(ctx, midX - labelWidth / 2, midY - labelHeight / 2, labelWidth, labelHeight, 10 * metrics.unit);
    ctx.fill();
    ctx.strokeStyle = "rgba(251, 191, 36, 0.38)";
    ctx.lineWidth = 1.2 * metrics.unit;
    ctx.stroke();
    ctx.fillStyle = "#fff7e0";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, midX, midY + 1 * metrics.unit);
    ctx.restore();
  }

  function drawSelectionOutline(ctx, item, metrics) {
    const center = studioToPlan(item.x, item.y, metrics);
    const width = item.width * metrics.scale;
    const depth = item.depth * metrics.scale;
    const handle = studioToPlan(getRotateHandle(item).x, getRotateHandle(item).y, metrics);

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(degreesToRadians(item.rotation));
    ctx.strokeStyle = "rgba(116, 180, 255, 0.95)";
    ctx.lineWidth = 3 * metrics.unit;
    if (item.shape === "circle" || item.shape === "ellipse") {
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.7, depth * 0.7, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      roundRect(ctx, -width / 2 - 8 * metrics.unit, -depth / 2 - 8 * metrics.unit, width + 16 * metrics.unit, depth + 16 * metrics.unit, 18 * metrics.unit);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(255, 181, 97, 0.95)";
    ctx.lineWidth = 2.6 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(handle.x, handle.y);
    ctx.stroke();
    ctx.fillStyle = state.hoverHandle ? "#ffd49a" : "#ffb561";
    ctx.beginPath();
    ctx.arc(handle.x, handle.y, 8 * metrics.unit, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2 * metrics.unit;
    ctx.strokeStyle = "rgba(17, 20, 27, 0.8)";
    ctx.stroke();
    ctx.restore();
  }

  function drawPlanSubject(ctx, width, depth, metrics) {
    const shadow = ctx.createRadialGradient(0, 7 * metrics.unit, width * 0.08, 0, 7 * metrics.unit, width * 0.72);
    shadow.addColorStop(0, "rgba(0,0,0,0.22)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(0, 8 * metrics.unit, width * 0.7, depth * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    const body = ctx.createLinearGradient(0, -depth / 2, 0, depth / 2);
    body.addColorStop(0, "#596675");
    body.addColorStop(1, "#24303c");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 4 * metrics.unit, width * 0.42, depth * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e0bc9b";
    ctx.beginPath();
    ctx.arc(0, -depth * 0.24, width * 0.18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1c222a";
    ctx.beginPath();
    ctx.moveTo(0, -depth * 0.38);
    ctx.lineTo(width * 0.12, -depth * 0.18);
    ctx.lineTo(-width * 0.12, -depth * 0.18);
    ctx.closePath();
    ctx.fill();
  }

  function drawPlanCamera(ctx, width, depth, metrics) {
    drawTripodShadow(ctx, width * 0.9, depth * 0.9);
    ctx.strokeStyle = "rgba(82, 94, 111, 0.92)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.lineCap = "round";
    drawTripodLegs(ctx, width * 0.55, depth * 0.58);

    const body = ctx.createLinearGradient(0, -depth / 3, 0, depth / 2);
    body.addColorStop(0, "#6d7681");
    body.addColorStop(1, "#2a3139");
    roundRect(ctx, -width * 0.26, -depth * 0.15, width * 0.52, depth * 0.4, 12 * metrics.unit);
    ctx.fillStyle = body;
    ctx.fill();

    const lens = ctx.createRadialGradient(width * 0.12, -depth * 0.02, width * 0.02, width * 0.12, -depth * 0.02, width * 0.2);
    lens.addColorStop(0, "#8fd0ff");
    lens.addColorStop(0.4, "#28517b");
    lens.addColorStop(1, "#101924");
    ctx.beginPath();
    ctx.arc(width * 0.12, -depth * 0.02, width * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = lens;
    ctx.fill();
  }

  function drawPlanSoftbox(ctx, item, width, depth, metrics) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    drawTripodShadow(ctx, width * 0.94, depth * 0.94);
    ctx.strokeStyle = "rgba(82, 94, 111, 0.92)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.lineCap = "round";
    drawTripodLegs(ctx, width * 0.44, depth * 0.5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -depth * 0.2);
    ctx.stroke();

    if (kind === "softbox-octa" || kind === "softbox-parabolic") {
      const radiusX = width * 0.44;
      const radiusY = depth * (kind === "softbox-parabolic" ? 0.48 : 0.42);
      const panel = ctx.createLinearGradient(-radiusX, -radiusY, radiusX, radiusY);
      panel.addColorStop(0, "#fbfcfd");
      panel.addColorStop(0.56, "#e8edf2");
      panel.addColorStop(1, "#bac4cf");
      traceOctagonPath(ctx, radiusX, radiusY);
      ctx.fillStyle = panel;
      ctx.fill();
      ctx.lineWidth = 4 * metrics.unit;
      ctx.strokeStyle = "#222a33";
      ctx.stroke();

      ctx.strokeStyle = "rgba(210, 220, 232, 0.82)";
      ctx.lineWidth = 1.5 * metrics.unit;
      traceOctagonPath(ctx, radiusX * 0.68, radiusY * 0.68);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-radiusX * 0.62, 0);
      ctx.lineTo(radiusX * 0.62, 0);
      ctx.moveTo(0, -radiusY * 0.62);
      ctx.lineTo(0, radiusY * 0.62);
      ctx.stroke();
      if (kind === "softbox-parabolic") {
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(width, depth) * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = "#a9b4c0";
        ctx.fill();
        ctx.strokeStyle = "#2d3640";
        ctx.lineWidth = 2 * metrics.unit;
        ctx.stroke();
      }
      return;
    }

    if (kind === "led-panel") {
      roundRect(ctx, -width * 0.32, -depth * 0.42, width * 0.64, depth * 0.58, 12 * metrics.unit);
      const body = ctx.createLinearGradient(0, -depth * 0.42, 0, depth * 0.16);
      body.addColorStop(0, "#c7d6e5");
      body.addColorStop(1, "#92a6bb");
      ctx.fillStyle = body;
      ctx.fill();
      ctx.lineWidth = 3 * metrics.unit;
      ctx.strokeStyle = "#212933";
      ctx.stroke();
      roundRect(ctx, -width * 0.23, -depth * 0.3, width * 0.46, depth * 0.34, 8 * metrics.unit);
      ctx.fillStyle = "rgba(240, 248, 255, 0.8)";
      ctx.fill();
      ctx.strokeStyle = "rgba(132, 161, 189, 0.72)";
      ctx.lineWidth = 1.6 * metrics.unit;
      ctx.stroke();
      return;
    }

    roundRect(ctx, -width * 0.42, -depth * 0.42, width * 0.84, depth * 0.54, 16 * metrics.unit);
    const panel = ctx.createLinearGradient(0, -depth * 0.42, 0, depth * 0.12);
    panel.addColorStop(0, "#fbfcfd");
    panel.addColorStop(0.58, "#e6eaef");
    panel.addColorStop(1, "#bcc5cf");
    ctx.fillStyle = panel;
    ctx.fill();
    ctx.lineWidth = 4 * metrics.unit;
    ctx.strokeStyle = "#222a33";
    ctx.stroke();
    roundRect(ctx, -width * 0.3, -depth * 0.28, width * 0.6, depth * 0.26, 10 * metrics.unit);
    ctx.strokeStyle = "rgba(214, 223, 233, 0.76)";
    ctx.lineWidth = 1.6 * metrics.unit;
    ctx.stroke();
  }
  function drawPlanStriplight(ctx, item, width, depth, metrics) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    drawTripodShadow(ctx, width * 0.96, depth * 0.96);
    ctx.strokeStyle = "rgba(82, 94, 111, 0.92)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.lineCap = "round";
    drawTripodLegs(ctx, width * 0.56, depth * 0.56);

    if (kind === "tube") {
      roundRect(ctx, -width * 0.08, -depth * 0.5, width * 0.16, depth * 0.94, 18 * metrics.unit);
      ctx.fillStyle = "rgba(173, 231, 255, 0.22)";
      ctx.fill();
      roundRect(ctx, -width * 0.04, -depth * 0.48, width * 0.08, depth * 0.9, 18 * metrics.unit);
      ctx.fillStyle = "#e8f7ff";
      ctx.fill();
      ctx.strokeStyle = "#233141";
      ctx.lineWidth = 2.2 * metrics.unit;
      ctx.stroke();
      return;
    }

    roundRect(ctx, -width * 0.22, -depth * 0.48, width * 0.44, depth * 0.92, 14 * metrics.unit);
    const panel = ctx.createLinearGradient(0, -depth * 0.46, 0, depth * 0.42);
    panel.addColorStop(0, "#fbfbfc");
    panel.addColorStop(0.6, "#e7eaee");
    panel.addColorStop(1, "#bec6ce");
    ctx.fillStyle = panel;
    ctx.fill();
    ctx.lineWidth = 4 * metrics.unit;
    ctx.strokeStyle = "#252c35";
    ctx.stroke();
  }
  function drawPlanReflector(ctx, item, width, depth, metrics) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    drawTripodShadow(ctx, width * 0.94, depth * 0.94);
    ctx.strokeStyle = "rgba(82, 94, 111, 0.92)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.lineCap = "round";
    drawTripodLegs(ctx, width * 0.4, depth * 0.42);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -depth * 0.12);
    ctx.stroke();

    if (kind === "umbrella") {
      const disc = ctx.createRadialGradient(-width * 0.16, -depth * 0.18, width * 0.08, 0, 0, width * 0.54);
      disc.addColorStop(0, "#ffffff");
      disc.addColorStop(0.42, "#edf1f5");
      disc.addColorStop(1, "#a1aab5");
      ctx.fillStyle = disc;
      ctx.beginPath();
      ctx.ellipse(0, -depth * 0.02, width * 0.48, depth * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 3 * metrics.unit;
      ctx.strokeStyle = "rgba(53,61,72,0.92)";
      ctx.stroke();
      ctx.strokeStyle = "rgba(150, 160, 175, 0.72)";
      ctx.lineWidth = 1.5 * metrics.unit;
      [-0.8, -0.35, 0, 0.35, 0.8].forEach(function (factor) {
        ctx.beginPath();
        ctx.moveTo(0, -depth * 0.02);
        ctx.lineTo(width * 0.42 * factor, -depth * 0.22);
        ctx.stroke();
      });
      return;
    }

    if (kind === "lantern") {
      const lantern = ctx.createRadialGradient(-width * 0.12, -depth * 0.12, width * 0.05, 0, 0, width * 0.46);
      lantern.addColorStop(0, "#ffffff");
      lantern.addColorStop(0.7, "#edf2f7");
      lantern.addColorStop(1, "#aab4c0");
      ctx.fillStyle = lantern;
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.42, depth * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 3 * metrics.unit;
      ctx.strokeStyle = "rgba(53,61,72,0.92)";
      ctx.stroke();
      ctx.strokeStyle = "rgba(189, 198, 208, 0.8)";
      ctx.lineWidth = 1.4 * metrics.unit;
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.2, depth * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.42, depth * 0.2, 0, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }

    if (kind === "ringlight") {
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.42, depth * 0.42, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#f6fbff";
      ctx.fill();
      ctx.lineWidth = 3 * metrics.unit;
      ctx.strokeStyle = "rgba(38,45,54,0.94)";
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.17, depth * 0.17, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#18202a";
      ctx.fill();
      ctx.strokeStyle = "rgba(151, 166, 184, 0.8)";
      ctx.lineWidth = 1.8 * metrics.unit;
      ctx.stroke();
      return;
    }

    if (kind === "beauty-dish") {
      const disc = ctx.createRadialGradient(-width * 0.18, -depth * 0.18, width * 0.08, 0, 0, width * 0.52);
      disc.addColorStop(0, "#ffffff");
      disc.addColorStop(0.48, "#e7edf2");
      disc.addColorStop(1, "#99a4b0");
      ctx.fillStyle = disc;
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.46, depth * 0.46, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 3 * metrics.unit;
      ctx.strokeStyle = "rgba(61,67,76,0.9)";
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.12, depth * 0.12, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#a9b4c0";
      ctx.fill();
      ctx.strokeStyle = "#2c3642";
      ctx.lineWidth = 1.8 * metrics.unit;
      ctx.stroke();
      return;
    }

    if (kind === "spot-projector") {
      roundRect(ctx, -width * 0.3, -depth * 0.14, width * 0.44, depth * 0.28, 10 * metrics.unit);
      const body = ctx.createLinearGradient(-width * 0.3, 0, width * 0.14, 0);
      body.addColorStop(0, "#aeb9c5");
      body.addColorStop(1, "#7d8895");
      ctx.fillStyle = body;
      ctx.fill();
      ctx.lineWidth = 2.8 * metrics.unit;
      ctx.strokeStyle = "#202934";
      ctx.stroke();
      roundRect(ctx, width * 0.08, -depth * 0.18, width * 0.22, depth * 0.36, 12 * metrics.unit);
      ctx.fillStyle = "#8895a4";
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(width * 0.24, 0, width * 0.1, depth * 0.12, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#dff5ff";
      ctx.fill();
      ctx.strokeStyle = "#25313d";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.stroke();
      return;
    }

    if (kind === "spot-head") {
      const head = ctx.createRadialGradient(-width * 0.1, -depth * 0.08, width * 0.04, 0, 0, width * 0.3);
      head.addColorStop(0, "#d9e4ee");
      head.addColorStop(0.44, "#a9b5c2");
      head.addColorStop(1, "#6c7784");
      ctx.fillStyle = head;
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.3, depth * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2.8 * metrics.unit;
      ctx.strokeStyle = "#202934";
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(width * 0.08, 0, width * 0.12, depth * 0.12, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#e5f7ff";
      ctx.fill();
      ctx.strokeStyle = "#24303d";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.stroke();
      return;
    }

    const disc = ctx.createRadialGradient(-width * 0.18, -depth * 0.18, width * 0.08, 0, 0, width * 0.54);
    disc.addColorStop(0, "#ffffff");
    disc.addColorStop(0.42, "#e4e8eb");
    disc.addColorStop(1, "#98a2ae");
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.48, depth * 0.48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 3 * metrics.unit;
    ctx.strokeStyle = "rgba(61,67,76,0.9)";
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.24, depth * 0.24, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(160, 171, 184, 0.8)";
    ctx.lineWidth = 1.4 * metrics.unit;
    ctx.stroke();
  }
  function drawPlanFlag(ctx, width, depth, metrics) {
    drawTripodShadow(ctx, width * 1.08, width * 0.68);
    ctx.strokeStyle = "rgba(82, 94, 111, 0.92)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.lineCap = "round";
    drawTripodLegs(ctx, width * 0.36, width * 0.34);

    roundRect(ctx, -width * 0.48, -depth * 0.4, width * 0.96, depth * 0.8, 12 * metrics.unit);
    const panel = ctx.createLinearGradient(0, -depth * 0.4, 0, depth * 0.4);
    panel.addColorStop(0, "#444d57");
    panel.addColorStop(1, "#171b20");
    ctx.fillStyle = panel;
    ctx.fill();
    ctx.lineWidth = 3 * metrics.unit;
    ctx.strokeStyle = "#0b0d10";
    ctx.stroke();
  }

  function drawPlanVFlat(ctx, width, depth, metrics) {
    const panelWidth = width * 0.44;
    const panelHeight = width * 1.02;
    ctx.save();
    ctx.translate(-width * 0.12, 0);
    roundRect(ctx, -panelWidth, -panelHeight / 2, panelWidth, panelHeight, 12 * metrics.unit);
    ctx.fillStyle = "#f7f4ef";
    ctx.fill();
    ctx.strokeStyle = "rgba(60, 61, 66, 0.24)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.stroke();

    ctx.translate(width * 0.24, 0);
    ctx.rotate(degreesToRadians(18));
    roundRect(ctx, 0, -panelHeight / 2, panelWidth, panelHeight, 12 * metrics.unit);
    ctx.fillStyle = "#e8e0d4";
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawPlanStand(ctx, item, width, depth, metrics) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    const legX = Math.max(width * 0.26, 14 * metrics.unit);
    const legY = Math.max(depth * 0.26, 14 * metrics.unit);
    drawTripodShadow(ctx, Math.max(width, 20 * metrics.unit), Math.max(depth, 20 * metrics.unit));
    ctx.strokeStyle = "rgba(82, 94, 111, 0.92)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.lineCap = "round";

    if (kind === "cstand" || kind === "cstand-arm") {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(legX * 1.05, legY * 0.84);
      ctx.moveTo(0, 0);
      ctx.lineTo(-legX * 0.75, legY * 0.96);
      ctx.moveTo(0, 0);
      ctx.lineTo(-legX * 0.15, -legY * 0.96);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -depth * 0.42);
      ctx.stroke();
      ctx.fillStyle = "#d7dde4";
      ctx.beginPath();
      ctx.arc(0, -depth * 0.44, 5 * metrics.unit, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, -depth * 0.31, 4 * metrics.unit, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#e1ac56";
      ctx.lineWidth = 2.2 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(0, -depth * 0.44);
      ctx.lineTo(width * (kind === "cstand-arm" ? 0.52 : 0.3), -depth * (kind === "cstand-arm" ? 0.66 : 0.56));
      ctx.stroke();
      ctx.fillStyle = "#efc884";
      roundRect(ctx, width * (kind === "cstand-arm" ? 0.46 : 0.22), -depth * (kind === "cstand-arm" ? 0.73 : 0.63), Math.max(width * 0.16, 8 * metrics.unit), Math.max(depth * 0.12, 8 * metrics.unit), 5 * metrics.unit);
      ctx.fill();
      return;
    }

    if (kind === "roller-stand" || kind === "boom-stand") {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(legX * 1.02, legY * 0.78);
      ctx.moveTo(0, 0);
      ctx.lineTo(-legX * 1.02, legY * 0.78);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -legY * 1.02);
      ctx.stroke();
      [[legX * 1.02, legY * 0.78], [-legX * 1.02, legY * 0.78], [0, -legY * 1.02]].forEach(function (point) {
        ctx.beginPath();
        ctx.arc(point[0], point[1], 4 * metrics.unit, 0, Math.PI * 2);
        ctx.fillStyle = "#6f7b88";
        ctx.fill();
      });
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -depth * 0.4);
      ctx.strokeStyle = "rgba(82, 94, 111, 0.92)";
      ctx.lineWidth = 3 * metrics.unit;
      ctx.stroke();
      ctx.fillStyle = "#d7dde4";
      ctx.beginPath();
      ctx.arc(0, -depth * 0.44, 5 * metrics.unit, 0, Math.PI * 2);
      ctx.fill();
      if (kind === "boom-stand") {
        ctx.strokeStyle = "#e1ac56";
        ctx.lineWidth = 2.4 * metrics.unit;
        ctx.beginPath();
        ctx.moveTo(0, -depth * 0.44);
        ctx.lineTo(width * 0.62, -depth * 0.64);
        ctx.stroke();
        ctx.fillStyle = "#efc884";
        roundRect(ctx, width * 0.56, -depth * 0.7, Math.max(width * 0.1, 7 * metrics.unit), Math.max(depth * 0.12, 8 * metrics.unit), 4 * metrics.unit);
        ctx.fill();
        ctx.fillStyle = "#7b8794";
        roundRect(ctx, -width * 0.34, -depth * 0.49, Math.max(width * 0.11, 8 * metrics.unit), Math.max(depth * 0.08, 7 * metrics.unit), 4 * metrics.unit);
        ctx.fill();
      } else {
        ctx.fillStyle = "#efc884";
        roundRect(ctx, -Math.max(width * 0.08, 7 * metrics.unit), -depth * 0.58, Math.max(width * 0.16, 8 * metrics.unit), Math.max(depth * 0.1, 8 * metrics.unit), 5 * metrics.unit);
        ctx.fill();
      }
      return;
    }

    if (kind === "combo-stand") {
      drawTripodLegs(ctx, legX * 1.1, legY * 1.1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -depth * 0.48);
      ctx.stroke();
      ctx.strokeStyle = "rgba(196, 205, 216, 0.9)";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(-width * 0.08, -depth * 0.18);
      ctx.lineTo(-width * 0.08, -depth * 0.46);
      ctx.moveTo(width * 0.08, -depth * 0.18);
      ctx.lineTo(width * 0.08, -depth * 0.46);
      ctx.stroke();
      ctx.fillStyle = "#efc884";
      roundRect(ctx, -Math.max(width * 0.09, 8 * metrics.unit), -depth * 0.56, Math.max(width * 0.18, 12 * metrics.unit), Math.max(depth * 0.12, 9 * metrics.unit), 5 * metrics.unit);
      ctx.fill();
      return;
    }

    drawTripodLegs(ctx, legX, legY);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -depth * 0.38);
    ctx.stroke();
    ctx.fillStyle = "#d7dde4";
    ctx.beginPath();
    ctx.arc(0, -depth * 0.42, 5 * metrics.unit, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#e1ac56";
    ctx.lineWidth = 2.2 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(0, -depth * 0.42);
    ctx.lineTo(width * 0.34, -depth * 0.58);
    ctx.stroke();
    ctx.fillStyle = "#efc884";
    roundRect(ctx, width * 0.24, -depth * 0.7, Math.max(width * 0.16, 8 * metrics.unit), Math.max(depth * 0.12, 8 * metrics.unit), 5 * metrics.unit);
    ctx.fill();
  }
  function drawPlanStool(ctx, item, width, depth, metrics) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    drawTripodShadow(ctx, width * 0.82, depth * 0.82);

    if (kind === "director-chair") {
      roundRect(ctx, -width * 0.26, -depth * 0.32, width * 0.52, depth * 0.18, 8 * metrics.unit);
      ctx.fillStyle = "#d7b994";
      ctx.fill();
      ctx.strokeStyle = "#4c3b2e";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.stroke();
      roundRect(ctx, -width * 0.2, -depth * 0.02, width * 0.4, depth * 0.16, 8 * metrics.unit);
      ctx.fillStyle = "#d4b189";
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "rgba(82,94,111,0.92)";
      ctx.lineWidth = 2.6 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(-width * 0.2, -depth * 0.02);
      ctx.lineTo(width * 0.2, depth * 0.42);
      ctx.moveTo(width * 0.2, -depth * 0.02);
      ctx.lineTo(-width * 0.2, depth * 0.42);
      ctx.stroke();
      return;
    }

    if (kind === "chair") {
      roundRect(ctx, -width * 0.26, -depth * 0.32, width * 0.52, depth * 0.18, 8 * metrics.unit);
      ctx.fillStyle = "#d7b994";
      ctx.fill();
      ctx.strokeStyle = "#4c3b2e";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.stroke();
      roundRect(ctx, -width * 0.22, -depth * 0.02, width * 0.44, depth * 0.18, 8 * metrics.unit);
      ctx.fillStyle = "#d4b189";
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "rgba(82,94,111,0.92)";
      ctx.lineWidth = 2.4 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(-width * 0.18, depth * 0.06);
      ctx.lineTo(-width * 0.24, depth * 0.42);
      ctx.moveTo(width * 0.18, depth * 0.06);
      ctx.lineTo(width * 0.24, depth * 0.42);
      ctx.stroke();
      return;
    }

    const seat = ctx.createRadialGradient(-width * 0.14, -depth * 0.18, width * 0.05, 0, 0, width * 0.42);
    seat.addColorStop(0, "#5f6973");
    seat.addColorStop(0.5, "#343c45");
    seat.addColorStop(1, "#1d232a");
    ctx.fillStyle = seat;
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.42, depth * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(82,94,111,0.92)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.lineCap = "round";
    drawTripodLegs(ctx, width * 0.36, depth * 0.36);
  }
  function drawPlanTable(ctx, item, width, depth, metrics) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    drawTripodShadow(ctx, width * 1.04, depth * 1.08);

    if (kind === "round-table") {
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.36, depth * 0.36, 0, 0, Math.PI * 2);
      const top = ctx.createRadialGradient(-width * 0.08, -depth * 0.1, width * 0.04, 0, 0, width * 0.4);
      top.addColorStop(0, "#dbc19f");
      top.addColorStop(1, "#8a725d");
      ctx.fillStyle = top;
      ctx.fill();
      ctx.strokeStyle = "rgba(39,32,28,0.9)";
      ctx.lineWidth = 3 * metrics.unit;
      ctx.stroke();
      ctx.strokeStyle = "rgba(105, 93, 84, 0.94)";
      ctx.lineWidth = 2.6 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(0, depth * 0.08);
      ctx.lineTo(0, depth * 0.38);
      ctx.moveTo(-width * 0.16, depth * 0.38);
      ctx.lineTo(width * 0.16, depth * 0.38);
      ctx.stroke();
      return;
    }

    if (kind === "bench") {
      roundRect(ctx, -width * 0.48, -depth * 0.16, width * 0.96, depth * 0.32, 12 * metrics.unit);
      ctx.fillStyle = "#cfa67a";
      ctx.fill();
      ctx.strokeStyle = "rgba(60,47,35,0.92)";
      ctx.lineWidth = 3 * metrics.unit;
      ctx.stroke();
      ctx.strokeStyle = "rgba(103, 112, 126, 0.94)";
      ctx.lineWidth = 2.4 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(-width * 0.34, depth * 0.08);
      ctx.lineTo(-width * 0.38, depth * 0.36);
      ctx.moveTo(width * 0.34, depth * 0.08);
      ctx.lineTo(width * 0.38, depth * 0.36);
      ctx.stroke();
      return;
    }

    if (kind === "armchair" || kind === "sofa") {
      roundRect(ctx, -width * 0.42, -depth * 0.22, width * 0.84, depth * 0.48, 18 * metrics.unit);
      ctx.fillStyle = kind === "armchair" ? "#cca67c" : "#c89f76";
      ctx.fill();
      ctx.strokeStyle = "rgba(60,47,35,0.92)";
      ctx.lineWidth = 3 * metrics.unit;
      ctx.stroke();
      roundRect(ctx, -width * 0.34, -depth * 0.36, width * 0.68, depth * 0.22, 14 * metrics.unit);
      ctx.fillStyle = "#dfc3a6";
      ctx.fill();
      ctx.stroke();
      if (kind === "armchair") {
        roundRect(ctx, -width * 0.48, -depth * 0.08, width * 0.14, depth * 0.24, 10 * metrics.unit);
        ctx.fillStyle = "#cca67c";
        ctx.fill();
        roundRect(ctx, width * 0.34, -depth * 0.08, width * 0.14, depth * 0.24, 10 * metrics.unit);
        ctx.fill();
      }
      return;
    }

    if (kind === "applebox" || kind === "block") {
      roundRect(ctx, -width * 0.5, -depth * 0.34, width, depth * 0.68, 10 * metrics.unit);
      ctx.fillStyle = "#cfa67a";
      ctx.fill();
      ctx.strokeStyle = "rgba(60,47,35,0.92)";
      ctx.lineWidth = 3 * metrics.unit;
      ctx.stroke();
      if (kind === "applebox") {
        roundRect(ctx, -width * 0.28, -depth * 0.08, width * 0.18, depth * 0.16, 8 * metrics.unit);
        ctx.fillStyle = "#9f784f";
        ctx.fill();
        roundRect(ctx, width * 0.1, -depth * 0.08, width * 0.18, depth * 0.16, 8 * metrics.unit);
        ctx.fill();
      }
      return;
    }

    if (kind === "sandbag") {
      ctx.fillStyle = "#6f5b49";
      ctx.beginPath();
      ctx.ellipse(-width * 0.18, 0, width * 0.24, depth * 0.32, 0, 0, Math.PI * 2);
      ctx.ellipse(width * 0.18, 0, width * 0.24, depth * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(42,33,27,0.9)";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -depth * 0.06, Math.max(width * 0.08, 4 * metrics.unit), 0, Math.PI * 2);
      ctx.fillStyle = "#baa286";
      ctx.fill();
      return;
    }

    if (kind === "tether-station") {
      roundRect(ctx, -width * 0.4, -depth * 0.18, width * 0.8, depth * 0.2, 8 * metrics.unit);
      ctx.fillStyle = "#aeb8c4";
      ctx.fill();
      ctx.strokeStyle = "rgba(34,42,52,0.94)";
      ctx.lineWidth = 2.2 * metrics.unit;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-width * 0.22, -depth * 0.18);
      ctx.lineTo(width * 0.12, -depth * 0.18);
      ctx.lineTo(width * 0.24, -depth * 0.36);
      ctx.lineTo(-width * 0.1, -depth * 0.36);
      ctx.closePath();
      ctx.fillStyle = "#66717d";
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, depth * 0.02);
      ctx.lineTo(0, depth * 0.4);
      ctx.stroke();
      return;
    }

    if (kind === "monitor-station") {
      roundRect(ctx, -width * 0.32, -depth * 0.34, width * 0.64, depth * 0.42, 10 * metrics.unit);
      ctx.fillStyle = "#121a24";
      ctx.fill();
      ctx.strokeStyle = "rgba(170, 180, 192, 0.9)";
      ctx.lineWidth = 2.4 * metrics.unit;
      ctx.stroke();
      roundRect(ctx, -width * 0.22, -depth * 0.24, width * 0.44, depth * 0.22, 8 * metrics.unit);
      ctx.fillStyle = "rgba(123, 182, 232, 0.66)";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, depth * 0.08);
      ctx.lineTo(0, depth * 0.36);
      ctx.strokeStyle = "rgba(103, 112, 126, 0.94)";
      ctx.lineWidth = 2.6 * metrics.unit;
      ctx.stroke();
      return;
    }

    if (kind === "dimmer-desk") {
      roundRect(ctx, -width * 0.46, -depth * 0.28, width * 0.92, depth * 0.56, 14 * metrics.unit);
      ctx.fillStyle = "#8c97a5";
      ctx.fill();
      ctx.strokeStyle = "rgba(34,42,52,0.94)";
      ctx.lineWidth = 2.4 * metrics.unit;
      ctx.stroke();
      ctx.strokeStyle = "#efc884";
      ctx.lineWidth = 1.8 * metrics.unit;
      for (let index = -2; index <= 2; index += 1) {
        ctx.beginPath();
        ctx.moveTo(index * width * 0.1, -depth * 0.12);
        ctx.lineTo(index * width * 0.1, depth * 0.12);
        ctx.stroke();
      }
      return;
    }

    if (kind === "cart") {
      roundRect(ctx, -width * 0.42, -depth * 0.24, width * 0.84, depth * 0.14, 8 * metrics.unit);
      ctx.fillStyle = "#9ea9b6";
      ctx.fill();
      ctx.strokeStyle = "rgba(34,42,52,0.94)";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.stroke();
      roundRect(ctx, -width * 0.42, depth * 0.02, width * 0.84, depth * 0.14, 8 * metrics.unit);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-width * 0.32, -depth * 0.1);
      ctx.lineTo(-width * 0.32, depth * 0.18);
      ctx.moveTo(width * 0.32, -depth * 0.1);
      ctx.lineTo(width * 0.32, depth * 0.18);
      ctx.stroke();
      [[-width * 0.3, depth * 0.28], [width * 0.3, depth * 0.28]].forEach(function (point) {
        ctx.beginPath();
        ctx.arc(point[0], point[1], 4 * metrics.unit, 0, Math.PI * 2);
        ctx.fillStyle = "#6f7b88";
        ctx.fill();
      });
      return;
    }

    if (kind === "desk") {
      roundRect(ctx, -width * 0.5, -depth * 0.22, width, depth * 0.44, 14 * metrics.unit);
      ctx.fillStyle = "#d4b188";
      ctx.fill();
      ctx.strokeStyle = "rgba(39,32,28,0.9)";
      ctx.lineWidth = 3 * metrics.unit;
      ctx.stroke();
      roundRect(ctx, -width * 0.32, depth * 0.02, width * 0.64, depth * 0.18, 10 * metrics.unit);
      ctx.fillStyle = "#9a7c62";
      ctx.fill();
      ctx.stroke();
      return;
    }

    if (kind === "makeup-station") {
      roundRect(ctx, -width * 0.5, -depth * 0.1, width, depth * 0.22, 12 * metrics.unit);
      ctx.fillStyle = "#d4b188";
      ctx.fill();
      ctx.strokeStyle = "rgba(39,32,28,0.9)";
      ctx.lineWidth = 3 * metrics.unit;
      ctx.stroke();
      roundRect(ctx, -width * 0.2, -depth * 0.48, width * 0.4, depth * 0.26, 10 * metrics.unit);
      ctx.fillStyle = "#dff0ff";
      ctx.fill();
      ctx.strokeStyle = "rgba(35,48,61,0.92)";
      ctx.lineWidth = 2.2 * metrics.unit;
      ctx.stroke();
      return;
    }

    roundRect(ctx, -width * 0.5, -depth * 0.34, width, depth * 0.68, 16 * metrics.unit);
    const top = ctx.createLinearGradient(0, -depth * 0.34, 0, depth * 0.34);
    top.addColorStop(0, "#897767");
    top.addColorStop(1, "#58483d");
    ctx.fillStyle = top;
    ctx.fill();
    ctx.strokeStyle = "rgba(39,32,28,0.9)";
    ctx.lineWidth = 4 * metrics.unit;
    ctx.stroke();
    ctx.strokeStyle = "rgba(105, 93, 84, 0.94)";
    ctx.lineWidth = 3 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(-width * 0.34, -depth * 0.18);
    ctx.lineTo(-width * 0.22, depth * 0.24);
    ctx.moveTo(width * 0.34, -depth * 0.18);
    ctx.lineTo(width * 0.22, depth * 0.24);
    ctx.stroke();
  }
  function drawPlanBeam(ctx, item, metrics, lengthMeters, widthMeters, color) {
    const center = studioToPlan(item.x, item.y, metrics);
    const angle = degreesToRadians(item.rotation);
    const length = lengthMeters * metrics.scale;
    const halfSpread = widthMeters * metrics.scale;
    const forwardX = Math.cos(angle);
    const forwardY = Math.sin(angle);
    const sideX = -Math.sin(angle);
    const sideY = Math.cos(angle);

    const tipX = center.x + forwardX * length;
    const tipY = center.y + forwardY * length;
    const leftX = center.x + sideX * halfSpread;
    const leftY = center.y + sideY * halfSpread;
    const rightX = center.x - sideX * halfSpread;
    const rightY = center.y - sideY * halfSpread;

    const beamColor = isLightEmitter(item) ? scaleColorAlpha(color, 0.55 + (clampPowerPercent(item.power) / 100) * 0.9) : color;
    const gradient = ctx.createLinearGradient(center.x, center.y, tipX, tipY);
    gradient.addColorStop(0, beamColor);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(leftX, leftY);
    ctx.lineTo(rightX, rightY);
    ctx.lineTo(tipX + sideX * halfSpread * 0.9, tipY + sideY * halfSpread * 0.34);
    ctx.lineTo(tipX - sideX * halfSpread * 0.9, tipY - sideY * halfSpread * 0.34);
    ctx.closePath();
    ctx.fill();
  }

  function drawTripodShadow(ctx, width, depth) {
    const shadow = ctx.createRadialGradient(0, 8, width * 0.05, 0, 8, Math.max(width, depth) * 0.72);
    shadow.addColorStop(0, "rgba(0,0,0,0.2)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(0, 10, width * 0.64, depth * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTripodLegs(ctx, radiusX, radiusY) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radiusX * 0.92, radiusY * 0.84);
    ctx.moveTo(0, 0);
    ctx.lineTo(-radiusX * 0.96, radiusY * 0.9);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radiusY * 0.86);
    ctx.stroke();
  }

  function drawIsoView(targetCtx, width, height) {
    const ctx = targetCtx || isoCtx;
    const canvasWidth = width || refs.isoCanvas.width;
    const canvasHeight = height || refs.isoCanvas.height;
    const metrics = getIsoMetrics(canvasWidth, canvasHeight);
    const floor = getFloorColor();
    const backdrop = getBackdropColor();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const bg = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    bg.addColorStop(0, "rgba(255,255,255,0.08)");
    bg.addColorStop(1, "rgba(255,255,255,0.02)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawIsoStudio(ctx, metrics, floor.color, backdrop.color);
    state.items.forEach(function (item) {
      drawIsoLightSpread(ctx, item, metrics);
    });

    state.items.slice().sort(function (a, b) {
      return (a.x + a.y) - (b.x + b.y);
    }).forEach(function (item) {
      drawIsoItem(ctx, item, metrics);
    });
  }

  function drawIsoStudio(ctx, metrics, floorColor, backdropColor) {
    const a = isoProject(0, STUDIO.depth, 0, metrics);
    const b = isoProject(STUDIO.width, STUDIO.depth, 0, metrics);
    const c = isoProject(STUDIO.width, 0, 0, metrics);
    const d = isoProject(0, 0, 0, metrics);

    const floorGradient = ctx.createLinearGradient(0, d.y, 0, a.y);
    floorGradient.addColorStop(0, lightenHex(floorColor, 0.18));
    floorGradient.addColorStop(1, darkenHex(floorColor, 0.2));
    ctx.fillStyle = floorGradient;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(d.x, d.y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1.2 * metrics.unit;
    for (let x = 0.5; x < STUDIO.width; x += 0.5) {
      const front = isoProject(x, STUDIO.depth, 0, metrics);
      const back = isoProject(x, 0, 0, metrics);
      ctx.beginPath();
      ctx.moveTo(front.x, front.y);
      ctx.lineTo(back.x, back.y);
      ctx.stroke();
    }
    for (let y = 0.5; y < STUDIO.depth; y += 0.5) {
      const left = isoProject(0, y, 0, metrics);
      const right = isoProject(STUDIO.width, y, 0, metrics);
      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.lineTo(right.x, right.y);
      ctx.stroke();
    }

    const wallBL = isoProject(0, 0, 0, metrics);
    const wallBR = isoProject(STUDIO.width, 0, 0, metrics);
    const wallTR = isoProject(STUDIO.width, 0, STUDIO.backdropHeight, metrics);
    const wallTL = isoProject(0, 0, STUDIO.backdropHeight, metrics);
    const wallGradient = ctx.createLinearGradient(0, wallTL.y, 0, wallBL.y);
    wallGradient.addColorStop(0, lightenHex(backdropColor, 0.12));
    wallGradient.addColorStop(1, darkenHex(backdropColor, 0.08));
    ctx.fillStyle = wallGradient;
    ctx.beginPath();
    ctx.moveTo(wallBL.x, wallBL.y);
    ctx.lineTo(wallBR.x, wallBR.y);
    ctx.lineTo(wallTR.x, wallTR.y);
    ctx.lineTo(wallTL.x, wallTL.y);
    ctx.closePath();
    ctx.fill();

    const sweepLeft = isoProject(0, STUDIO.backdropDepth, 0, metrics);
    const sweepRight = isoProject(STUDIO.width, STUDIO.backdropDepth, 0, metrics);
    ctx.fillStyle = rgbaFromHex(lightenHex(backdropColor, 0.08), 0.82);
    ctx.beginPath();
    ctx.moveTo(wallBL.x, wallBL.y);
    ctx.lineTo(wallBR.x, wallBR.y);
    ctx.lineTo(sweepRight.x, sweepRight.y);
    ctx.lineTo(sweepLeft.x, sweepLeft.y);
    ctx.closePath();
    ctx.fill();
  }

  function withAlpha(color, alpha) {
    const match = String(color || "").match(/^rgba\(([^)]+),\s*[\d.]+\)$/);
    if (!match) return color;
    return `rgba(${match[1]}, ${alpha})`;
  }

  function scaleColorAlpha(color, factor) {
    const match = String(color || "").match(/^rgba\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([\d.]+)\s*\)$/);
    if (!match) return color;
    const alpha = clamp(parseFloat(match[4]) * factor, 0, 1);
    return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha.toFixed(3)})`;
  }

  function drawIsoLightSpread(ctx, item, metrics) {
    const beam = getPlanBeamConfig(item);
    if (!beam) return;

    const radians = degreesToRadians(item.rotation);
    const beamLength = beam.lengthMeters * (item.family === "camera" ? 0.9 : 1);
    const beamWidth = beam.widthMeters * 0.7;
    const startX = clamp(item.x + Math.cos(radians) * 0.18, 0, STUDIO.width);
    const startY = clamp(item.y + Math.sin(radians) * 0.18, 0, STUDIO.depth);
    const endX = clamp(item.x + Math.cos(radians) * beamLength, 0, STUDIO.width);
    const endY = clamp(item.y + Math.sin(radians) * beamLength, 0, STUDIO.depth);
    const perpX = -Math.sin(radians);
    const perpY = Math.cos(radians);
    const start = isoProject(startX, startY, 0, metrics);
    const endCenter = isoProject(endX, endY, 0, metrics);
    const endLeft = isoProject(clamp(endX + perpX * beamWidth, 0, STUDIO.width), clamp(endY + perpY * beamWidth, 0, STUDIO.depth), 0, metrics);
    const endRight = isoProject(clamp(endX - perpX * beamWidth, 0, STUDIO.width), clamp(endY - perpY * beamWidth, 0, STUDIO.depth), 0, metrics);

    const powerFactor = isLightEmitter(item) ? 0.55 + (clampPowerPercent(item.power) / 100) * 0.9 : 1;
    const fill = ctx.createLinearGradient(start.x, start.y, endCenter.x, endCenter.y);
    fill.addColorStop(0, item.family === "camera" ? withAlpha(beam.color, 0.1) : scaleColorAlpha(beam.color, powerFactor));
    fill.addColorStop(1, withAlpha(beam.color, 0.02));
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(endLeft.x, endLeft.y);
    ctx.lineTo(endRight.x, endRight.y);
    ctx.closePath();
    ctx.fill();
  }

  function drawIsoItem(ctx, item, metrics) {
    const kind = getVariantVisualKind(item.variantId, item.family);
    if (item.family === "subject") drawIsoSubject(ctx, item, metrics);
    else if (item.family === "camera") drawIsoCamera(ctx, item, metrics);
    else if (item.family === "softbox") drawIsoSoftbox(ctx, item, metrics, kind);
    else if (item.family === "striplight") drawIsoStriplight(ctx, item, metrics, kind);
    else if (item.family === "reflector") drawIsoReflector(ctx, item, metrics, kind);
    else if (item.family === "flag") drawIsoPanel(ctx, item, metrics, item.width * 0.95, item.depth, item.height * 0.54, item.height * 0.44, "#23272c");
    else if (item.family === "vflat") drawIsoVFlat(ctx, item, metrics, kind);
    else if (item.family === "stand") drawIsoGripStand(ctx, item, metrics, kind);
    else if (item.family === "stool") drawIsoStool(ctx, item, metrics, kind);
    else if (item.family === "table") drawIsoTable(ctx, item, metrics, kind);
  }
  function drawIsoSubject(ctx, item, metrics) {
    const base = isoProject(item.x, item.y, 0, metrics);
    const head = isoProject(item.x, item.y, Math.max(1.2, item.height - 0.07), metrics);
    const shoulderLeft = isoProject(item.x - 0.16, item.y, item.height * 0.8, metrics);
    const shoulderRight = isoProject(item.x + 0.16, item.y, item.height * 0.8, metrics);
    const hip = isoProject(item.x, item.y, item.height * 0.45, metrics);
    const footLeft = isoProject(item.x - 0.08, item.y + 0.04, 0, metrics);
    const footRight = isoProject(item.x + 0.08, item.y + 0.04, 0, metrics);

    drawIsoShadow(ctx, base.x, base.y + 3 * metrics.unit, 22 * metrics.unit, 10 * metrics.unit);
    ctx.strokeStyle = "#2d343d";
    ctx.lineWidth = 3.2 * metrics.unit;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(hip.x, hip.y);
    ctx.lineTo(footLeft.x, footLeft.y);
    ctx.moveTo(hip.x, hip.y);
    ctx.lineTo(footRight.x, footRight.y);
    ctx.moveTo(shoulderLeft.x, shoulderLeft.y);
    ctx.lineTo(hip.x, hip.y);
    ctx.lineTo(shoulderRight.x, shoulderRight.y);
    ctx.stroke();

    const torso = ctx.createLinearGradient(0, shoulderLeft.y, 0, hip.y);
    torso.addColorStop(0, "#4b5561");
    torso.addColorStop(1, "#20262d");
    ctx.strokeStyle = torso;
    ctx.lineWidth = 8 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(shoulderLeft.x, shoulderLeft.y);
    ctx.lineTo(shoulderRight.x, shoulderRight.y);
    ctx.moveTo((shoulderLeft.x + shoulderRight.x) / 2, shoulderLeft.y);
    ctx.lineTo(hip.x, hip.y);
    ctx.stroke();

    ctx.fillStyle = "#dfbc9c";
    ctx.beginPath();
    ctx.arc(head.x, head.y, 8 * metrics.unit, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawIsoCamera(ctx, item, metrics) {
    const bodyHeight = Math.max(1.2, item.height - 0.15);
    drawIsoStand(ctx, item, metrics, bodyHeight - 0.12);
    drawIsoPrism(ctx, item.x, item.y - 0.08, bodyHeight - 0.28, 0.38, 0.28, 0.18, item.rotation, metrics, {
      top: "#68717b",
      left: "#2a3037",
      right: "#414a54"
    });
    const lensCenter = isoProject(item.x + Math.cos(degreesToRadians(item.rotation)) * 0.14, item.y + Math.sin(degreesToRadians(item.rotation)) * 0.14, bodyHeight - 0.16, metrics);
    const lens = ctx.createRadialGradient(lensCenter.x - 2, lensCenter.y - 2, 1, lensCenter.x, lensCenter.y, 9 * metrics.unit);
    lens.addColorStop(0, "#8fc8ff");
    lens.addColorStop(0.4, "#28517b");
    lens.addColorStop(1, "#101924");
    ctx.fillStyle = lens;
    ctx.beginPath();
    ctx.arc(lensCenter.x, lensCenter.y, 7 * metrics.unit, 0, Math.PI * 2);
    ctx.fill();
  }

  function projectIsoFacingPoint(item, u, z, metrics) {
    const radians = degreesToRadians(item.rotation);
    return isoProject(item.x + Math.cos(radians) * u, item.y + Math.sin(radians) * u, z, metrics);
  }

  function traceIsoPoints(ctx, points) {
    if (!points.length) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length; index += 1) {
      ctx.lineTo(points[index].x, points[index].y);
    }
    ctx.closePath();
  }

  function fillStrokeIsoShape(ctx, points, fillStyle, strokeStyle, lineWidth) {
    traceIsoPoints(ctx, points);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  function buildIsoFacingEllipsePoints(item, metrics, zCenter, width, height, segments) {
    const points = [];
    for (let index = 0; index < segments; index += 1) {
      const angle = (index / segments) * Math.PI * 2;
      points.push(projectIsoFacingPoint(item, Math.cos(angle) * width * 0.5, zCenter + Math.sin(angle) * height * 0.5, metrics));
    }
    return points;
  }

  function buildIsoFacingProfilePoints(item, metrics, zCenter, width, height, profile) {
    return profile.map(function (point) {
      return projectIsoFacingPoint(item, point.u * width * 0.5, zCenter + point.v * height * 0.5, metrics);
    });
  }

  function drawIsoSoftbox(ctx, item, metrics, kind) {
    if (kind === "softbox-octa" || kind === "softbox-parabolic") {
      const faceHeight = Math.max(0.68, item.depth * 1.25);
      const zCenter = Math.max(0.92, item.height - faceHeight * 0.5 - 0.16);
      const center = isoProject(item.x, item.y, zCenter, metrics);
      const outer = buildIsoFacingProfilePoints(item, metrics, zCenter, item.width * 0.94, faceHeight, [
        { u: -0.56, v: -1.0 },
        { u: 0.56, v: -1.0 },
        { u: 1.0, v: -0.56 },
        { u: 1.0, v: 0.56 },
        { u: 0.56, v: 1.0 },
        { u: -0.56, v: 1.0 },
        { u: -1.0, v: 0.56 },
        { u: -1.0, v: -0.56 }
      ]);
      const inner = buildIsoFacingProfilePoints(item, metrics, zCenter, item.width * 0.66, faceHeight * 0.66, [
        { u: -0.56, v: -1.0 },
        { u: 0.56, v: -1.0 },
        { u: 1.0, v: -0.56 },
        { u: 1.0, v: 0.56 },
        { u: 0.56, v: 1.0 },
        { u: -0.56, v: 1.0 },
        { u: -1.0, v: 0.56 },
        { u: -1.0, v: -0.56 }
      ]);
      const panel = ctx.createRadialGradient(center.x - 5 * metrics.unit, center.y - 6 * metrics.unit, 2, center.x, center.y, 22 * metrics.unit);
      panel.addColorStop(0, "#ffffff");
      panel.addColorStop(0.55, "#ecf0f4");
      panel.addColorStop(1, "#b7c1cb");
      drawIsoStand(ctx, item, metrics, item.height - 0.06);
      fillStrokeIsoShape(ctx, outer, panel, "#222a33", 2.2 * metrics.unit);
      traceIsoPoints(ctx, inner);
      ctx.strokeStyle = "rgba(215, 223, 232, 0.84)";
      ctx.lineWidth = 1.2 * metrics.unit;
      ctx.stroke();
      if (kind === "softbox-parabolic") {
        ctx.beginPath();
        ctx.arc(center.x, center.y, 4.2 * metrics.unit, 0, Math.PI * 2);
        ctx.fillStyle = "#aab5c1";
        ctx.fill();
        ctx.strokeStyle = "#29323d";
        ctx.lineWidth = 1.2 * metrics.unit;
        ctx.stroke();
      }
      return;
    }

    if (kind === "led-panel") {
      drawIsoLightPanel(ctx, item, metrics, item.width * 0.82, item.depth * 0.9, 0.08, "#d7e5f4");
      return;
    }

    drawIsoLightPanel(ctx, item, metrics, item.width * 0.86, item.depth * 0.84, 0.08, "#f3f5f7");
  }

  function drawIsoStriplight(ctx, item, metrics, kind) {
    if (kind === "tube") {
      drawIsoStand(ctx, item, metrics, item.height - 0.08);
      const top = projectIsoFacingPoint(item, 0, item.height - 0.08, metrics);
      const bottom = projectIsoFacingPoint(item, 0, Math.max(0.56, item.height - 1.18), metrics);
      ctx.strokeStyle = "rgba(178, 231, 255, 0.26)";
      ctx.lineWidth = 8 * metrics.unit;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.lineTo(bottom.x, bottom.y);
      ctx.stroke();
      ctx.strokeStyle = "#eaf8ff";
      ctx.lineWidth = 3.4 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.lineTo(bottom.x, bottom.y);
      ctx.stroke();
      return;
    }

    drawIsoLightPanel(ctx, item, metrics, item.width * 0.9, item.depth * 1.8, 0.07, "#f2f4f6");
  }

  function drawIsoLightPanel(ctx, item, metrics, panelWidth, panelHeight, thickness, panelColor) {
    const topHeight = item.height;
    const panelBaseZ = Math.max(0.8, topHeight - Math.max(0.55, panelHeight) - 0.18);
    drawIsoStand(ctx, item, metrics, topHeight - 0.08);
    drawIsoVerticalPrism(ctx, item.x, item.y, panelBaseZ, panelWidth, thickness, Math.max(0.6, panelHeight), item.rotation, metrics, {
      front: panelColor,
      side: darkenHex(panelColor, 0.14),
      edge: "#2a2f36"
    });
  }

  function drawIsoReflector(ctx, item, metrics, kind) {
    const centerZ = Math.max(0.74, item.height - 0.44);
    const center = isoProject(item.x, item.y, centerZ, metrics);
    const disc = ctx.createRadialGradient(center.x - 4 * metrics.unit, center.y - 5 * metrics.unit, 2, center.x, center.y, 20 * metrics.unit);
    disc.addColorStop(0, "#ffffff");
    disc.addColorStop(0.55, "#e2e7eb");
    disc.addColorStop(1, "#98a2ac");

    if (kind === "umbrella") {
      drawIsoStand(ctx, item, metrics, item.height - 0.14);
      const canopy = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 1.02, item.width * 0.66, 18);
      fillStrokeIsoShape(ctx, canopy, disc, "rgba(63,68,75,0.88)", 1.8 * metrics.unit);
      const mount = isoProject(item.x, item.y, centerZ - 0.06, metrics);
      [-0.8, -0.35, 0, 0.35, 0.8].forEach(function (factor) {
        const rim = projectIsoFacingPoint(item, factor * item.width * 0.42, centerZ - item.width * 0.12, metrics);
        ctx.beginPath();
        ctx.moveTo(mount.x, mount.y);
        ctx.lineTo(rim.x, rim.y);
        ctx.strokeStyle = "rgba(173, 183, 194, 0.86)";
        ctx.lineWidth = 1.1 * metrics.unit;
        ctx.stroke();
      });
      return;
    }

    if (kind === "lantern") {
      drawIsoStand(ctx, item, metrics, item.height - 0.14);
      const outer = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 0.76, item.width * 0.8, 18);
      const seamA = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 0.34, item.width * 0.8, 14);
      const seamB = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 0.76, item.width * 0.34, 14);
      fillStrokeIsoShape(ctx, outer, disc, "rgba(63,68,75,0.88)", 1.8 * metrics.unit);
      traceIsoPoints(ctx, seamA);
      ctx.strokeStyle = "rgba(210, 218, 226, 0.9)";
      ctx.lineWidth = 1.1 * metrics.unit;
      ctx.stroke();
      traceIsoPoints(ctx, seamB);
      ctx.stroke();
      return;
    }

    if (kind === "ringlight") {
      drawIsoStand(ctx, item, metrics, item.height - 0.14);
      const outer = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 0.78, item.width * 0.78, 18);
      const inner = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 0.34, item.width * 0.34, 18);
      fillStrokeIsoShape(ctx, outer, "#f8fbff", "rgba(63,68,75,0.88)", 1.8 * metrics.unit);
      fillStrokeIsoShape(ctx, inner, "#0f1620", "rgba(148,160,173,0.84)", 1.1 * metrics.unit);
      return;
    }

    if (kind === "beauty-dish" || kind === "reflector-disc") {
      drawIsoStand(ctx, item, metrics, item.height - 0.14);
      const outer = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 0.82, item.width * 0.64, 18);
      fillStrokeIsoShape(ctx, outer, disc, "rgba(63,68,75,0.88)", 1.8 * metrics.unit);
      if (kind === "beauty-dish") {
        const inner = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 0.2, item.width * 0.2, 14);
        fillStrokeIsoShape(ctx, inner, "#adb8c4", "#2e3843", 1.1 * metrics.unit);
      }
      return;
    }

    if (kind === "spot-projector" || kind === "spot-head") {
      const radians = degreesToRadians(item.rotation);
      const bodyZ = item.height - (kind === "spot-projector" ? 0.34 : 0.26);
      const bodyWidth = kind === "spot-projector" ? Math.max(0.32, item.width * 0.7) : Math.max(0.18, item.width * 0.48);
      const bodyDepth = kind === "spot-projector" ? Math.max(0.18, item.depth * 0.36) : Math.max(0.14, item.depth * 0.28);
      const bodyHeight = kind === "spot-projector" ? 0.18 : 0.14;
      drawIsoStand(ctx, item, metrics, bodyZ + bodyHeight + 0.04);
      drawIsoPrism(ctx, item.x, item.y, bodyZ, bodyWidth, bodyDepth, bodyHeight, item.rotation, metrics, {
        top: kind === "spot-projector" ? "#aeb8c4" : "#bdc7d2",
        left: kind === "spot-projector" ? "#8b96a3" : "#97a3af",
        right: kind === "spot-projector" ? "#798491" : "#7f8b98"
      });
      const lens = isoProject(item.x + Math.cos(radians) * bodyWidth * 0.34, item.y + Math.sin(radians) * bodyWidth * 0.34, bodyZ + bodyHeight * 0.5, metrics);
      const glass = ctx.createRadialGradient(lens.x - 2, lens.y - 2, 1, lens.x, lens.y, 7 * metrics.unit);
      glass.addColorStop(0, "#e7f5ff");
      glass.addColorStop(0.45, "#69a2d3");
      glass.addColorStop(1, "#132131");
      ctx.fillStyle = glass;
      ctx.beginPath();
      ctx.arc(lens.x, lens.y, kind === "spot-projector" ? 5 * metrics.unit : 4.2 * metrics.unit, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    drawIsoStand(ctx, item, metrics, item.height - 0.18);
    const outer = buildIsoFacingEllipsePoints(item, metrics, centerZ, item.width * 0.82, item.width * 0.64, 18);
    fillStrokeIsoShape(ctx, outer, disc, "rgba(63,68,75,0.88)", 1.8 * metrics.unit);
  }

  function drawIsoVFlat(ctx, item, metrics, kind) {
    if (kind === "mirror") {
      drawIsoVerticalPrism(ctx, item.x, item.y, 0, item.width * 0.96, 0.04, item.height * 0.86, item.rotation, metrics, {
        front: "#dfefff",
        side: "#b7c9db",
        edge: "#31404f"
      });
      drawIsoVerticalPrism(ctx, item.x, item.y, 0.04, item.width * 0.78, 0.02, item.height * 0.7, item.rotation, metrics, {
        front: "rgba(142, 198, 236, 0.68)",
        side: "rgba(104, 146, 178, 0.72)",
        edge: "rgba(49, 64, 79, 0.72)"
      });
      return;
    }

    const radians = degreesToRadians(item.rotation);
    drawIsoVerticalPrism(ctx, item.x - Math.cos(radians) * 0.12, item.y - Math.sin(radians) * 0.12, 0, item.width * 0.46, 0.04, item.height * 0.82, item.rotation - 10, metrics, {
      front: "#f8f5ef",
      side: "#ddd4c7",
      edge: "rgba(55,55,55,0.22)"
    });
    drawIsoVerticalPrism(ctx, item.x + Math.cos(radians) * 0.12, item.y + Math.sin(radians) * 0.12, 0, item.width * 0.46, 0.04, item.height * 0.82, item.rotation + 18, metrics, {
      front: "#ece3d8",
      side: "#d1c5b8",
      edge: "rgba(55,55,55,0.22)"
    });
  }

  function drawIsoGripStand(ctx, item, metrics, kind) {
    const topZ = Math.max(1.4, item.height - 0.08);
    drawIsoStand(ctx, item, metrics, topZ);
    const head = isoProject(item.x, item.y, Math.max(1.15, item.height - 0.16), metrics);
    ctx.fillStyle = "#d8dde3";
    ctx.beginPath();
    ctx.ellipse(head.x, head.y, 6 * metrics.unit, 4 * metrics.unit, -0.45, 0, Math.PI * 2);
    ctx.fill();

    const radians = degreesToRadians(item.rotation);
    const armLength = kind === "boom-stand" ? Math.min(0.92, item.width * 0.46) : kind === "cstand-arm" ? Math.min(0.74, item.width * 0.4) : kind === "cstand" ? Math.min(0.38, item.width * 0.26) : 0;
    if (armLength > 0) {
      const armEnd = isoProject(item.x + Math.cos(radians) * armLength, item.y + Math.sin(radians) * armLength, Math.max(1.0, item.height - 0.28), metrics);
      ctx.strokeStyle = "#e1ac56";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(head.x, head.y);
      ctx.lineTo(armEnd.x, armEnd.y);
      ctx.stroke();
      ctx.fillStyle = "#efc884";
      ctx.beginPath();
      ctx.arc(armEnd.x, armEnd.y, 4 * metrics.unit, 0, Math.PI * 2);
      ctx.fill();
      if (kind === "boom-stand") {
        const weight = isoProject(item.x - Math.cos(radians) * 0.24, item.y - Math.sin(radians) * 0.24, Math.max(0.95, item.height - 0.26), metrics);
        ctx.fillStyle = "#7a858f";
        ctx.fillRect(weight.x - 5 * metrics.unit, weight.y - 4 * metrics.unit, 10 * metrics.unit, 8 * metrics.unit);
      }
    }

    if (kind === "combo-stand") {
      const sideA = isoProject(item.x - 0.06, item.y, Math.max(0.7, item.height - 0.46), metrics);
      const sideB = isoProject(item.x + 0.06, item.y, Math.max(0.7, item.height - 0.46), metrics);
      ctx.strokeStyle = "#c4cdd7";
      ctx.lineWidth = 1.6 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(sideA.x, sideA.y);
      ctx.lineTo(sideA.x, head.y + 2 * metrics.unit);
      ctx.moveTo(sideB.x, sideB.y);
      ctx.lineTo(sideB.x, head.y + 2 * metrics.unit);
      ctx.stroke();
    }

    if (kind === "roller-stand" || kind === "boom-stand") {
      [
        isoProject(item.x + 0.18, item.y + 0.12, 0, metrics),
        isoProject(item.x - 0.18, item.y + 0.12, 0, metrics),
        isoProject(item.x, item.y - 0.2, 0, metrics)
      ].forEach(function (wheel) {
        ctx.beginPath();
        ctx.arc(wheel.x, wheel.y, 3.2 * metrics.unit, 0, Math.PI * 2);
        ctx.fillStyle = "#6f7b88";
        ctx.fill();
      });
    }
  }

  function drawIsoStool(ctx, item, metrics, kind) {
    if (kind === "director-chair" || kind === "chair") {
      const seatZ = kind === "director-chair" ? Math.min(0.58, item.height * 0.48) : Math.min(0.5, item.height * 0.52);
      drawIsoPrism(ctx, item.x, item.y, seatZ, item.width * 0.6, item.depth * 0.46, 0.06, item.rotation, metrics, {
        top: "#d4b189",
        left: "#a78363",
        right: "#be9975"
      });
      drawIsoVerticalPrism(ctx, item.x, item.y - 0.08, seatZ + 0.04, item.width * 0.62, 0.04, kind === "director-chair" ? Math.min(0.48, item.height * 0.42) : Math.min(0.4, item.height * 0.35), item.rotation, metrics, {
        front: "#d7b994",
        side: "#b58d66",
        edge: "#4b3a2e"
      });
      const radians = degreesToRadians(item.rotation);
      const legA = isoProject(item.x - Math.cos(radians) * 0.16 - Math.sin(radians) * 0.08, item.y - Math.sin(radians) * 0.16 + Math.cos(radians) * 0.08, 0, metrics);
      const legB = isoProject(item.x + Math.cos(radians) * 0.16 - Math.sin(radians) * 0.08, item.y + Math.sin(radians) * 0.16 + Math.cos(radians) * 0.08, 0, metrics);
      const seatCenter = isoProject(item.x, item.y, seatZ, metrics);
      ctx.strokeStyle = "#66717e";
      ctx.lineWidth = 2.2 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(seatCenter.x - 6 * metrics.unit, seatCenter.y + 2 * metrics.unit);
      ctx.lineTo(legA.x, legA.y);
      ctx.moveTo(seatCenter.x + 6 * metrics.unit, seatCenter.y + 2 * metrics.unit);
      ctx.lineTo(legB.x, legB.y);
      if (kind === "director-chair") {
        ctx.moveTo(seatCenter.x - 7 * metrics.unit, seatCenter.y + 1 * metrics.unit);
        ctx.lineTo(legB.x, legB.y);
        ctx.moveTo(seatCenter.x + 7 * metrics.unit, seatCenter.y + 1 * metrics.unit);
        ctx.lineTo(legA.x, legA.y);
      }
      ctx.stroke();
      return;
    }

    const seatHeight = item.height;
    const center = isoProject(item.x, item.y, seatHeight, metrics);
    const base = isoProject(item.x, item.y, 0, metrics);
    drawIsoShadow(ctx, base.x, base.y + 2 * metrics.unit, 16 * metrics.unit, 8 * metrics.unit);
    ctx.fillStyle = "#303841";
    ctx.beginPath();
    ctx.ellipse(center.x, center.y, 14 * metrics.unit, 8 * metrics.unit, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5a636d";
    ctx.lineWidth = 2.6 * metrics.unit;
    const legA = isoProject(item.x - 0.12, item.y - 0.08, 0, metrics);
    const legB = isoProject(item.x + 0.12, item.y - 0.08, 0, metrics);
    const legC = isoProject(item.x, item.y + 0.12, 0, metrics);
    ctx.beginPath();
    ctx.moveTo(center.x - 6 * metrics.unit, center.y);
    ctx.lineTo(legA.x, legA.y);
    ctx.moveTo(center.x + 6 * metrics.unit, center.y);
    ctx.lineTo(legB.x, legB.y);
    ctx.moveTo(center.x, center.y + 2 * metrics.unit);
    ctx.lineTo(legC.x, legC.y);
    ctx.stroke();
  }

  function drawIsoTable(ctx, item, metrics, kind) {
    if (kind === "round-table") {
      const top = isoProject(item.x, item.y, item.height, metrics);
      drawIsoShadow(ctx, top.x, isoProject(item.x, item.y, 0, metrics).y + 2 * metrics.unit, 18 * metrics.unit, 9 * metrics.unit);
      ctx.beginPath();
      ctx.ellipse(top.x, top.y, 18 * metrics.unit, 9 * metrics.unit, -0.42, 0, Math.PI * 2);
      const tabletop = ctx.createRadialGradient(top.x - 4 * metrics.unit, top.y - 3 * metrics.unit, 2, top.x, top.y, 18 * metrics.unit);
      tabletop.addColorStop(0, "#dec4a2");
      tabletop.addColorStop(1, "#8b745f");
      ctx.fillStyle = tabletop;
      ctx.fill();
      ctx.strokeStyle = "#4e3f33";
      ctx.lineWidth = 2 * metrics.unit;
      ctx.stroke();
      const base = isoProject(item.x, item.y, 0, metrics);
      ctx.strokeStyle = "#6c7783";
      ctx.lineWidth = 2.4 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(top.x, top.y + 2 * metrics.unit);
      ctx.lineTo(base.x, base.y);
      ctx.stroke();
      return;
    }

    if (kind === "bench") {
      drawIsoPrism(ctx, item.x, item.y, item.height - 0.04, item.width * 0.96, item.depth * 0.7, 0.06, item.rotation, metrics, {
        top: "#cfa67a",
        left: "#9d754e",
        right: "#b8885d"
      });
      const radians = degreesToRadians(item.rotation);
      const legs = [
        orientedCorners(item.x, item.y, item.width * 0.32, item.depth * 0.18, radians)[0],
        orientedCorners(item.x, item.y, item.width * 0.32, item.depth * 0.18, radians)[2]
      ];
      ctx.strokeStyle = "#66717e";
      ctx.lineWidth = 2.2 * metrics.unit;
      legs.forEach(function (leg) {
        const topLeg = isoProject(leg.x, leg.y, item.height - 0.04, metrics);
        const bottomLeg = isoProject(leg.x, leg.y, 0, metrics);
        ctx.beginPath();
        ctx.moveTo(topLeg.x, topLeg.y);
        ctx.lineTo(bottomLeg.x, bottomLeg.y);
        ctx.stroke();
      });
      return;
    }

    if (kind === "armchair" || kind === "sofa") {
      const seatHeight = kind === "armchair" ? 0.36 : 0.34;
      drawIsoPrism(ctx, item.x, item.y, seatHeight, item.width * 0.82, item.depth * 0.72, 0.18, item.rotation, metrics, {
        top: kind === "armchair" ? "#cca67c" : "#c89f76",
        left: "#9e7854",
        right: "#b88f67"
      });
      const radians = degreesToRadians(item.rotation);
      drawIsoVerticalPrism(ctx, item.x - Math.sin(radians) * item.depth * 0.18, item.y + Math.cos(radians) * item.depth * 0.18, seatHeight + 0.14, item.width * 0.74, 0.06, kind === "armchair" ? 0.32 : 0.28, item.rotation, metrics, {
        front: "#dfc3a6",
        side: "#c7a88a",
        edge: "#563f2f"
      });
      if (kind === "armchair") {
        drawIsoPrism(ctx, item.x - Math.cos(radians) * item.width * 0.34, item.y - Math.sin(radians) * item.width * 0.34, seatHeight + 0.06, item.width * 0.12, item.depth * 0.42, 0.16, item.rotation, metrics, {
          top: "#cca67c",
          left: "#9e7854",
          right: "#b88f67"
        });
        drawIsoPrism(ctx, item.x + Math.cos(radians) * item.width * 0.34, item.y + Math.sin(radians) * item.width * 0.34, seatHeight + 0.06, item.width * 0.12, item.depth * 0.42, 0.16, item.rotation, metrics, {
          top: "#cca67c",
          left: "#9e7854",
          right: "#b88f67"
        });
      }
      return;
    }

    if (kind === "applebox" || kind === "block") {
      drawIsoPrism(ctx, item.x, item.y, 0, item.width * 0.92, item.depth * 0.92, Math.max(0.08, item.height), item.rotation, metrics, {
        top: "#cfa67a",
        left: "#9f784f",
        right: "#b88961"
      });
      return;
    }

    if (kind === "sandbag") {
      const left = isoProject(item.x - 0.12, item.y, item.height * 0.5, metrics);
      const right = isoProject(item.x + 0.12, item.y, item.height * 0.5, metrics);
      const base = isoProject(item.x, item.y, 0, metrics);
      drawIsoShadow(ctx, base.x, base.y + 2 * metrics.unit, 14 * metrics.unit, 7 * metrics.unit);
      ctx.fillStyle = "#6f5b49";
      ctx.beginPath();
      ctx.ellipse(left.x, left.y, 10 * metrics.unit, 6 * metrics.unit, -0.2, 0, Math.PI * 2);
      ctx.ellipse(right.x, right.y, 10 * metrics.unit, 6 * metrics.unit, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc((left.x + right.x) / 2, (left.y + right.y) / 2 - 2 * metrics.unit, 3.2 * metrics.unit, 0, Math.PI * 2);
      ctx.fillStyle = "#baa286";
      ctx.fill();
      return;
    }

    if (kind === "tether-station") {
      drawIsoPrism(ctx, item.x, item.y, item.height - 0.04, item.width * 0.82, item.depth * 0.62, 0.05, item.rotation, metrics, {
        top: "#aeb8c4",
        left: "#798390",
        right: "#929daa"
      });
      const radians = degreesToRadians(item.rotation);
      drawIsoPrism(ctx, item.x - Math.sin(radians) * 0.06, item.y + Math.cos(radians) * 0.04, item.height + 0.01, item.width * 0.42, item.depth * 0.28, 0.05, item.rotation, metrics, {
        top: "#606b78",
        left: "#3a434d",
        right: "#4f5965"
      });
      const base = isoProject(item.x, item.y, 0, metrics);
      const top = isoProject(item.x, item.y, item.height - 0.04, metrics);
      ctx.strokeStyle = "#6b7683";
      ctx.lineWidth = 2.2 * metrics.unit;
      ctx.beginPath();
      ctx.moveTo(top.x, top.y + 2 * metrics.unit);
      ctx.lineTo(base.x, base.y);
      ctx.stroke();
      return;
    }

    if (kind === "monitor-station") {
      drawIsoVerticalPrism(ctx, item.x, item.y, item.height - 0.34, item.width * 0.7, 0.04, 0.28, item.rotation, metrics, {
        front: "#121a24",
        side: "#66717d",
        edge: "#aab4c0"
      });
      drawIsoVerticalPrism(ctx, item.x, item.y, item.height - 0.3, item.width * 0.52, 0.02, 0.18, item.rotation, metrics, {
        front: "rgba(123, 182, 232, 0.7)",
        side: "rgba(72, 118, 160, 0.74)",
        edge: "rgba(170,180,192,0.54)"
      });
      drawIsoStand(ctx, item, metrics, item.height - 0.04);
      return;
    }

    if (kind === "dimmer-desk") {
      drawIsoPrism(ctx, item.x, item.y, item.height - 0.04, item.width * 0.92, item.depth * 0.76, 0.08, item.rotation, metrics, {
        top: "#8d98a6",
        left: "#626d7a",
        right: "#788493"
      });
      const radians = degreesToRadians(item.rotation);
      for (let index = -2; index <= 2; index += 1) {
        const sliderA = isoProject(item.x + Math.cos(radians) * index * 0.08 - Math.sin(radians) * 0.1, item.y + Math.sin(radians) * index * 0.08 + Math.cos(radians) * 0.1, item.height + 0.04, metrics);
        const sliderB = isoProject(item.x + Math.cos(radians) * index * 0.08 + Math.sin(radians) * 0.1, item.y + Math.sin(radians) * index * 0.08 - Math.cos(radians) * 0.1, item.height + 0.04, metrics);
        ctx.beginPath();
        ctx.moveTo(sliderA.x, sliderA.y);
        ctx.lineTo(sliderB.x, sliderB.y);
        ctx.strokeStyle = "#efc884";
        ctx.lineWidth = 1.2 * metrics.unit;
        ctx.stroke();
      }
      return;
    }

    if (kind === "cart") {
      drawIsoPrism(ctx, item.x, item.y, item.height - 0.18, item.width * 0.9, item.depth * 0.82, 0.04, item.rotation, metrics, {
        top: "#a0abb8",
        left: "#727d89",
        right: "#8994a1"
      });
      drawIsoPrism(ctx, item.x, item.y, item.height - 0.46, item.width * 0.9, item.depth * 0.82, 0.04, item.rotation, metrics, {
        top: "#a0abb8",
        left: "#727d89",
        right: "#8994a1"
      });
      const radians = degreesToRadians(item.rotation);
      const corners = orientedCorners(item.x, item.y, item.width * 0.32, item.depth * 0.26, radians);
      ctx.strokeStyle = "#697482";
      ctx.lineWidth = 2 * metrics.unit;
      corners.forEach(function (corner) {
        const top = isoProject(corner.x, corner.y, item.height - 0.18, metrics);
        const bottom = isoProject(corner.x, corner.y, item.height - 0.46, metrics);
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(bottom.x, bottom.y);
        ctx.stroke();
      });
      [corners[1], corners[2]].forEach(function (corner) {
        const wheel = isoProject(corner.x, corner.y, 0, metrics);
        ctx.beginPath();
        ctx.arc(wheel.x, wheel.y, 3.2 * metrics.unit, 0, Math.PI * 2);
        ctx.fillStyle = "#6f7b88";
        ctx.fill();
      });
      return;
    }

    if (kind === "desk") {
      drawIsoPrism(ctx, item.x, item.y, item.height - 0.04, item.width * 0.94, item.depth * 0.8, 0.06, item.rotation, metrics, {
        top: "#d4b188",
        left: "#9d7c61",
        right: "#b58f6e"
      });
      drawIsoPrism(ctx, item.x, item.y + 0.02, item.height - 0.16, item.width * 0.54, item.depth * 0.24, 0.12, item.rotation, metrics, {
        top: "#9a7c62",
        left: "#755f4e",
        right: "#876f5b"
      });
      return;
    }

    if (kind === "makeup-station") {
      drawIsoPrism(ctx, item.x, item.y, item.height - 0.04, item.width * 0.92, item.depth * 0.7, 0.06, item.rotation, metrics, {
        top: "#d4b188",
        left: "#9d7c61",
        right: "#b58f6e"
      });
      drawIsoVerticalPrism(ctx, item.x, item.y - 0.1, item.height - 0.02, item.width * 0.44, 0.04, 0.34, item.rotation, metrics, {
        front: "#dff0ff",
        side: "#bfd6ea",
        edge: "#2a3642"
      });
      return;
    }

    drawIsoPrism(ctx, item.x, item.y, item.height - 0.06, item.width * 0.92, item.depth * 0.92, 0.08, item.rotation, metrics, {
      top: "#8a7969",
      left: "#5c4c40",
      right: "#6f5e51"
    });
    const radians = degreesToRadians(item.rotation);
    const corners = orientedCorners(item.x, item.y, item.width * 0.32, item.depth * 0.28, radians);
    ctx.strokeStyle = "#74685f";
    ctx.lineWidth = 2.5 * metrics.unit;
    corners.forEach(function (corner) {
      const top = isoProject(corner.x, corner.y, item.height - 0.06, metrics);
      const bottom = isoProject(corner.x, corner.y, 0, metrics);
      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.lineTo(bottom.x, bottom.y);
      ctx.stroke();
    });
  }
  function drawIsoPanel(ctx, item, metrics, width, thickness, height, zBase, color) {
    drawIsoStand(ctx, item, metrics, zBase + height);
    drawIsoVerticalPrism(ctx, item.x, item.y, zBase, width, thickness, height, item.rotation, metrics, {
      front: color,
      side: darkenHex(color, 0.22),
      edge: "#0f1012"
    });
  }

  function drawIsoStand(ctx, item, metrics, topZ) {
    const base = isoProject(item.x, item.y, 0, metrics);
    const top = isoProject(item.x, item.y, topZ, metrics);
    drawIsoShadow(ctx, base.x, base.y + 2 * metrics.unit, 16 * metrics.unit, 7 * metrics.unit);
    ctx.strokeStyle = "#545d66";
    ctx.lineWidth = 2.4 * metrics.unit;
    ctx.lineCap = "round";
    const leg1 = isoProject(item.x + 0.18, item.y + 0.12, 0, metrics);
    const leg2 = isoProject(item.x - 0.18, item.y + 0.12, 0, metrics);
    const leg3 = isoProject(item.x, item.y - 0.2, 0, metrics);
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(leg1.x, leg1.y);
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(leg2.x, leg2.y);
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(leg3.x, leg3.y);
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(top.x, top.y);
    ctx.stroke();
  }

  function drawIsoPrism(ctx, centerX, centerY, zBase, width, depth, height, rotation, metrics, colors) {
    const radians = degreesToRadians(rotation);
    const corners = orientedCorners(centerX, centerY, width / 2, depth / 2, radians);
    const a = isoProject(corners[0].x, corners[0].y, zBase, metrics);
    const b = isoProject(corners[1].x, corners[1].y, zBase, metrics);
    const c = isoProject(corners[2].x, corners[2].y, zBase, metrics);
    const d = isoProject(corners[3].x, corners[3].y, zBase, metrics);
    const aTop = isoProject(corners[0].x, corners[0].y, zBase + height, metrics);
    const bTop = isoProject(corners[1].x, corners[1].y, zBase + height, metrics);
    const cTop = isoProject(corners[2].x, corners[2].y, zBase + height, metrics);
    const dTop = isoProject(corners[3].x, corners[3].y, zBase + height, metrics);

    ctx.fillStyle = colors.left;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(d.x, d.y);
    ctx.lineTo(dTop.x, dTop.y);
    ctx.lineTo(aTop.x, aTop.y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = colors.right;
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(cTop.x, cTop.y);
    ctx.lineTo(dTop.x, dTop.y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = colors.top;
    ctx.beginPath();
    ctx.moveTo(aTop.x, aTop.y);
    ctx.lineTo(bTop.x, bTop.y);
    ctx.lineTo(cTop.x, cTop.y);
    ctx.lineTo(dTop.x, dTop.y);
    ctx.closePath();
    ctx.fill();
  }

  function drawIsoVerticalPrism(ctx, centerX, centerY, zBase, width, depth, height, rotation, metrics, colors) {
    const radians = degreesToRadians(rotation);
    const corners = orientedCorners(centerX, centerY, width / 2, depth / 2, radians);
    const fl = isoProject(corners[0].x, corners[0].y, zBase, metrics);
    const fr = isoProject(corners[1].x, corners[1].y, zBase, metrics);
    const br = isoProject(corners[2].x, corners[2].y, zBase, metrics);
    const bl = isoProject(corners[3].x, corners[3].y, zBase, metrics);
    const flTop = isoProject(corners[0].x, corners[0].y, zBase + height, metrics);
    const frTop = isoProject(corners[1].x, corners[1].y, zBase + height, metrics);
    const brTop = isoProject(corners[2].x, corners[2].y, zBase + height, metrics);
    const blTop = isoProject(corners[3].x, corners[3].y, zBase + height, metrics);

    ctx.fillStyle = colors.side;
    ctx.beginPath();
    ctx.moveTo(fr.x, fr.y);
    ctx.lineTo(br.x, br.y);
    ctx.lineTo(brTop.x, brTop.y);
    ctx.lineTo(frTop.x, frTop.y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = colors.front;
    ctx.beginPath();
    ctx.moveTo(fl.x, fl.y);
    ctx.lineTo(fr.x, fr.y);
    ctx.lineTo(frTop.x, frTop.y);
    ctx.lineTo(flTop.x, flTop.y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = colors.edge;
    ctx.lineWidth = 1.6 * metrics.unit;
    ctx.beginPath();
    ctx.moveTo(fl.x, fl.y);
    ctx.lineTo(fr.x, fr.y);
    ctx.lineTo(br.x, br.y);
    ctx.lineTo(bl.x, bl.y);
    ctx.closePath();
    ctx.moveTo(flTop.x, flTop.y);
    ctx.lineTo(frTop.x, frTop.y);
    ctx.lineTo(brTop.x, brTop.y);
    ctx.lineTo(blTop.x, blTop.y);
    ctx.closePath();
    ctx.moveTo(fl.x, fl.y);
    ctx.lineTo(flTop.x, flTop.y);
    ctx.moveTo(fr.x, fr.y);
    ctx.lineTo(frTop.x, frTop.y);
    ctx.moveTo(br.x, br.y);
    ctx.lineTo(brTop.x, brTop.y);
    ctx.moveTo(bl.x, bl.y);
    ctx.lineTo(blTop.x, blTop.y);
    ctx.stroke();
  }

  function drawIsoShadow(ctx, x, y, rx, ry) {
    const shadow = ctx.createRadialGradient(x, y, rx * 0.1, x, y, rx);
    shadow.addColorStop(0, "rgba(0,0,0,0.18)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  async function copyImage() {
    try {
      const canvas = createStudioSnapshotCanvas(1800, 1180);
      if (!navigator.clipboard || typeof window.ClipboardItem === "undefined") {
        window.alert(t("alerts.clipboardUnsupported"));
        return;
      }

      const blob = await new Promise(function (resolve) {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) {
        window.alert(t("alerts.imageFailed"));
        return;
      }

      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    } catch (error) {
      window.alert(t("alerts.clipboardDenied"));
    }
  }

  function exportPng() {
    const canvas = createStudioSnapshotCanvas(1800, 1180);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `lite-studio-${new Date().toISOString().slice(0, 10)}.png`;
    link.click();
  }

  function exportPdf() {
    try {
      const canvas = createStudioSnapshotCanvas(1800, 1180);
      const bytes = buildPdfFromCanvas(canvas);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lite-studio-${new Date().toISOString().slice(0, 10)}.pdf`;
      link.click();
      window.setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1200);
    } catch (error) {
      window.alert(getUiCopy("pdfFailed"));
    }
  }

  function printPlan() {
    window.print();
  }

  function createStudioSnapshotCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    drawPlanView(ctx, width, height);

    const isoWidth = Math.round(width * 0.28);
    const isoHeight = Math.round(height * 0.28);
    const isoCanvas = document.createElement("canvas");
    isoCanvas.width = isoWidth;
    isoCanvas.height = isoHeight;
    drawIsoView(isoCanvas.getContext("2d"), isoWidth, isoHeight);

    const cardX = width - isoWidth - Math.round(width * 0.05);
    const cardY = Math.round(height * 0.06);
    const padding = Math.round(width * 0.012);
    const radius = Math.round(width * 0.012);

    ctx.save();
    ctx.fillStyle = "rgba(9, 16, 28, 0.88)";
    roundRect(ctx, cardX - padding, cardY - padding, isoWidth + padding * 2, isoHeight + padding * 2, radius);
    ctx.fill();
    ctx.drawImage(isoCanvas, cardX, cardY);
    ctx.restore();

    return canvas;
  }

  function buildPdfFromCanvas(canvas) {
    const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.92);
    return buildPdfFromJpegDataUrl(jpegDataUrl, canvas.width, canvas.height);
  }

  function buildPdfFromJpegDataUrl(dataUrl, imageWidth, imageHeight) {
    const binary = atob(String(dataUrl).split(",")[1] || "");
    const imageBytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      imageBytes[index] = binary.charCodeAt(index);
    }

    const landscape = imageWidth >= imageHeight;
    const pageWidth = landscape ? 841.89 : 595.28;
    const pageHeight = landscape ? 595.28 : 841.89;
    const margin = 24;
    const scale = Math.min((pageWidth - margin * 2) / imageWidth, (pageHeight - margin * 2) / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    const drawX = (pageWidth - drawWidth) / 2;
    const drawY = (pageHeight - drawHeight) / 2;
    const content = `q\n${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${drawX.toFixed(2)} ${drawY.toFixed(2)} cm\n/Im0 Do\nQ\n`;

    const encoder = new TextEncoder();
    const parts = [];
    const offsets = [0];
    let totalLength = 0;

    function pushAscii(value) {
      const bytes = encoder.encode(value);
      parts.push(bytes);
      totalLength += bytes.length;
    }

    function pushBytes(bytes) {
      parts.push(bytes);
      totalLength += bytes.length;
    }

    function addObject(objectId, dictionary, streamBytes) {
      offsets[objectId] = totalLength;
      pushAscii(`${objectId} 0 obj\n${dictionary}`);
      if (streamBytes) {
        pushAscii("stream\n");
        pushBytes(streamBytes);
        pushAscii("\nendstream\n");
      }
      pushAscii("endobj\n");
    }

    pushAscii("%PDF-1.4\n");
    addObject(1, "<< /Type /Catalog /Pages 2 0 R >>\n", null);
    addObject(2, "<< /Type /Pages /Count 1 /Kids [3 0 R] >>\n", null);
    addObject(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /ProcSet [/PDF /ImageC] /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\n`, null);
    addObject(4, `<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\n`, imageBytes);
    addObject(5, `<< /Length ${encoder.encode(content).length} >>\n`, encoder.encode(content));

    const xrefOffset = totalLength;
    pushAscii("xref\n0 6\n0000000000 65535 f \n");
    for (let objectId = 1; objectId <= 5; objectId += 1) {
      pushAscii(`${String(offsets[objectId]).padStart(10, "0")} 00000 n \n`);
    }
    pushAscii(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

    const output = new Uint8Array(totalLength);
    let cursor = 0;
    parts.forEach(function (part) {
      output.set(part, cursor);
      cursor += part.length;
    });
    return output;
  }

  function createExportCanvas(width, height, renderer) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    renderer(canvas.getContext("2d"), width, height);
    return canvas.toDataURL("image/png");
  }

  function resizeCanvas(canvas) {
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function getPlanBaseMetrics(width, height) {
    const padding = Math.min(width, height) * 0.075;
    const scale = Math.min((width - padding * 2) / STUDIO.width, (height - padding * 2) / STUDIO.depth);
    return {
      padding: padding,
      scale: scale,
      stageWidth: STUDIO.width * scale,
      stageHeight: STUDIO.depth * scale
    };
  }

  function getClampedPlanPan(width, height, zoom, panX, panY) {
    const base = getPlanBaseMetrics(width, height);
    const stageWidth = base.stageWidth * zoom;
    const stageHeight = base.stageHeight * zoom;
    const maxPanX = Math.max(0, (stageWidth - (width - base.padding * 2)) / 2);
    const maxPanY = Math.max(0, (stageHeight - (height - base.padding * 2)) / 2);
    return {
      x: clamp(panX, -maxPanX, maxPanX),
      y: clamp(panY, -maxPanY, maxPanY)
    };
  }

  function getPlanMetrics(width, height) {
    const base = getPlanBaseMetrics(width, height);
    const scale = base.scale * state.planZoom;
    const stageWidth = STUDIO.width * scale;
    const stageHeight = STUDIO.depth * scale;
    const pan = getClampedPlanPan(width, height, state.planZoom, state.planPanX, state.planPanY);
    return {
      left: width / 2 + pan.x - stageWidth / 2,
      top: height / 2 + pan.y - stageHeight / 2,
      scale: scale,
      padding: base.padding,
      panX: pan.x,
      panY: pan.y,
      stageWidth: stageWidth,
      stageHeight: stageHeight,
      unit: Math.max(0.8, scale / 118)
    };
  }

  function getIsoMetrics(width, height) {
    const scale = Math.min(width / (STUDIO.width + STUDIO.depth + 2.4), height / 7.4) * state.isoZoom;
    return {
      originX: width / 2,
      originY: height * 0.76,
      scaleX: scale,
      scaleY: scale * 0.48,
      scaleZ: scale * 0.95,
      unit: Math.max(0.9, scale / 14)
    };
  }

  function studioToPlan(x, y, metrics) {
    return {
      x: metrics.left + x * metrics.scale,
      y: metrics.top + y * metrics.scale
    };
  }

  function planToStudio(x, y, metrics) {
    return {
      x: (x - metrics.left) / metrics.scale,
      y: (y - metrics.top) / metrics.scale
    };
  }

  function isoProject(x, y, z, metrics) {
    const centeredX = x - STUDIO.width / 2;
    const centeredY = y - STUDIO.depth / 2;
    return {
      x: metrics.originX + (centeredX - centeredY) * metrics.scaleX,
      y: metrics.originY + (centeredX + centeredY) * metrics.scaleY - z * metrics.scaleZ
    };
  }

  function orientedCorners(centerX, centerY, halfWidth, halfDepth, radians) {
    const ux = Math.cos(radians) * halfWidth;
    const uy = Math.sin(radians) * halfWidth;
    const vx = -Math.sin(radians) * halfDepth;
    const vy = Math.cos(radians) * halfDepth;
    return [
      { x: centerX - ux - vx, y: centerY - uy - vy },
      { x: centerX + ux - vx, y: centerY + uy - vy },
      { x: centerX + ux + vx, y: centerY + uy + vy },
      { x: centerX - ux + vx, y: centerY - uy + vy }
    ];
  }

  function getFloorColor() {
    return FLOOR_COLORS.find(function (entry) {
      return entry.id === state.floorId;
    }) || FLOOR_COLORS[0];
  }

  function getBackdropColor() {
    return BACKDROP_COLORS.find(function (entry) {
      return entry.id === state.backdropId;
    }) || BACKDROP_COLORS[0];
  }

  function formatMeters(value) {
    return value.toFixed(1);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function degreesToRadians(deg) {
    return (deg * Math.PI) / 180;
  }

  function radiansToDegrees(rad) {
    return (rad * 180) / Math.PI;
  }

  function normalizeDegrees(deg) {
    const value = deg % 360;
    return value < 0 ? value + 360 : value;
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function roundTopRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.lineTo(x + width - r, y);
    ctx.arcTo(x + width, y, x + width, y + r, r);
    ctx.lineTo(x + width, y + height);
    ctx.closePath();
  }

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    const full = clean.length === 3 ? clean.split("").map(function (char) { return char + char; }).join("") : clean;
    const int = parseInt(full, 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255
    };
  }

  function mixHex(hexA, hexB, ratio) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    return rgbToHex(
      Math.round(a.r + (b.r - a.r) * ratio),
      Math.round(a.g + (b.g - a.g) * ratio),
      Math.round(a.b + (b.b - a.b) * ratio)
    );
  }

  function lightenHex(hex, ratio) {
    return mixHex(hex, "#ffffff", ratio);
  }

  function darkenHex(hex, ratio) {
    return mixHex(hex, "#000000", ratio);
  }

  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(function (value) {
      return value.toString(16).padStart(2, "0");
    }).join("");
  }

  function rgbaFromHex(hex, alpha) {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  init();
})();

























