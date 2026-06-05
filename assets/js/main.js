// Scroll Reveal Animation
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, scrollObserverOptions);

// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');
const langContents = document.querySelectorAll('.lang-content');

const languages = {
    en: { name: 'English', code: 'en', locale: 'en_US', flag: '🇺🇸' },
    ru: { name: 'Русский', code: 'ru', locale: 'ru_RU', flag: '🇷🇺' },
    pt: { name: 'Português', code: 'pt', locale: 'pt_BR', flag: '🇧🇷' },
    es: { name: 'Español', code: 'es', locale: 'es_ES', flag: '🇪🇸' },
    zh: { name: '中文', code: 'zh', locale: 'zh_CN', flag: '🇨🇳' },
    id: { name: 'Bahasa Indonesia', code: 'id', locale: 'id_ID', flag: '🇮🇩' },
    th: { name: 'ไทย', code: 'th', locale: 'th_TH', flag: '🇹🇭' },
    hi: { name: 'हिन्दी', code: 'hi', locale: 'hi_IN', flag: '🇮🇳' }
};

function switchLanguage(lang) {
    if (!languages[lang]) {
        lang = 'en';
    }

    document.documentElement.lang = languages[lang].code;

    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    langContents.forEach(content => {
        content.classList.remove('active');
        if (content.dataset.lang === lang) {
            content.classList.add('active');
        }
    });

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
        ogLocale.content = languages[lang].locale;
    }

    localStorage.setItem('preferredLang', lang);

    if (history.pushState) {
        const newUrl = lang === 'en' ? '/' : `/${lang}/`;
        history.pushState({ lang: lang }, '', newUrl);
    }
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

function initializeLanguage() {
    let detectedLang = localStorage.getItem('preferredLang');

    if (!detectedLang) {
        const pathLang = window.location.pathname.split('/')[1];
        if (languages[pathLang]) {
            detectedLang = pathLang;
        }
    }

    if (!detectedLang) {
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
        const langMap = {
            'en': 'en', 'en-us': 'en', 'en-gb': 'en',
            'ru': 'ru', 'ru-ru': 'ru',
            'pt': 'pt', 'pt-br': 'pt', 'pt-pt': 'pt',
            'es': 'es', 'es-es': 'es', 'es-mx': 'es',
            'zh': 'zh', 'zh-cn': 'zh', 'zh-tw': 'zh',
            'id': 'id', 'id-id': 'id',
            'th': 'th', 'th-th': 'th',
            'hi': 'hi', 'hi-in': 'hi'
        };
        detectedLang = langMap[browserLang] || langMap[browserLang.split('-')[0]];
    }

    const langContent = document.querySelector(`.lang-content[data-lang="${detectedLang}"]`);
    if (!detectedLang || !langContent) {
        detectedLang = 'en';
    }

    switchLanguage(detectedLang);
}

initializeLanguage();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function copyCouponCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert('Coupon code copied: ' + code);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .platform-icon');
    animatedElements.forEach(el => scrollObserver.observe(el));

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(card);
    });
});
