// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Stagger animation
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    // Also observe platform icons specifically
    const platformIcons = document.querySelectorAll('.platform-icon');
    platformIcons.forEach(el => observer.observe(el));
});

// Language Switcher - Enhanced for 10 languages
const langButtons = document.querySelectorAll('.lang-btn');
const langContents = document.querySelectorAll('.lang-content');

// Language configuration for 10 MMO markets
const languages = {
    en: { name: 'English', code: 'en', locale: 'en_US', flag: '🇺🇸' },
    vn: { name: 'Tiếng Việt', code: 'vi', locale: 'vi_VN', flag: '🇻🇳' },
    ru: { name: 'Русский', code: 'ru', locale: 'ru_RU', flag: '🇷🇺' },
    pt: { name: 'Português', code: 'pt', locale: 'pt_BR', flag: '🇧🇷' },
    es: { name: 'Español', code: 'es', locale: 'es_ES', flag: '🇪🇸' },
    zh: { name: '中文', code: 'zh', locale: 'zh_CN', flag: '🇨🇳' },
    id: { name: 'Bahasa Indonesia', code: 'id', locale: 'id_ID', flag: '🇮🇩' },
    th: { name: 'ไทย', code: 'th', locale: 'th_TH', flag: '🇹🇭' },
    tl: { name: 'Filipino', code: 'tl', locale: 'tl_PH', flag: '🇵🇭' },
    hi: { name: 'हिन्दी', code: 'hi', locale: 'hi_IN', flag: '🇮🇳' }
};

function switchLanguage(lang) {
    // Validate language
    if (!languages[lang]) {
        lang = 'en'; // fallback to English
    }

    // Update HTML lang attribute
    document.documentElement.lang = languages[lang].code;
    
    // Update active button
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    // Show/hide content
    langContents.forEach(content => {
        content.classList.remove('active');
        if (content.dataset.lang === lang) {
            content.classList.add('active');
        }
    });

    // Update meta tags dynamically
    updateMetaTags(lang);

    // Save preference
    localStorage.setItem('preferredLang', lang);
    
    // Update URL without reload (optional)
    if (history.pushState) {
        const newUrl = lang === 'en' ? '/' : `/${lang}/`;
        history.pushState({ lang: lang }, '', newUrl);
    }
}

function updateMetaTags(lang) {
    const langConfig = languages[lang];
    
    // Update og:locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
        ogLocale.content = langConfig.locale;
    }
    
    // Update html lang
    document.documentElement.setAttribute('lang', langConfig.code);
}

// Event listeners
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// Auto-detect and load language preference with fallback
function initializeLanguage() {
    // Priority: localStorage > URL path > Browser language > Default
    let detectedLang = localStorage.getItem('preferredLang');
    
    // Check URL path for language code
    if (!detectedLang) {
        const pathLang = window.location.pathname.split('/')[1];
        if (languages[pathLang]) {
            detectedLang = pathLang;
        }
    }
    
    // Detect from browser language
    if (!detectedLang) {
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
        const langMap = {
            'en': 'en', 'en-us': 'en', 'en-gb': 'en',
            'vi': 'vn', 'vi-vn': 'vn',
            'ru': 'ru', 'ru-ru': 'ru',
            'pt': 'pt', 'pt-br': 'pt', 'pt-pt': 'pt',
            'es': 'es', 'es-es': 'es', 'es-mx': 'es',
            'zh': 'zh', 'zh-cn': 'zh', 'zh-tw': 'zh',
            'id': 'id', 'id-id': 'id',
            'th': 'th', 'th-th': 'th',
            'tl': 'tl', 'fil': 'tl',
            'hi': 'hi', 'hi-in': 'hi'
        };
        detectedLang = langMap[browserLang] || langMap[browserLang.split('-')[0]];
    }
    
    // Fallback to English if no content exists
    const langContent = document.querySelector(`.lang-content[data-lang="${detectedLang}"]`);
    if (!detectedLang || !langContent) {
        detectedLang = 'en';
    }
    
    switchLanguage(detectedLang);
}

// Initialize on page load
initializeLanguage();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Copy coupon code functionality
function copyCouponCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert('Coupon code copied: ' + code);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
