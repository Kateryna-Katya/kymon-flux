// Инициализация иконок
lucide.createIcons();

// 1. Анимация смены текста в Hero (GSAP)
const phrases = ["просто", "будущее", "твой рост", "реально"];
let i = 0;
const changingText = document.getElementById('changing-text');

if(changingText) {
    setInterval(() => {
        gsap.to(changingText, {
            y: -20, opacity: 0, duration: 0.5, onComplete: () => {
                i = (i + 1) % phrases.length;
                changingText.innerText = phrases[i];
                gsap.fromTo(changingText, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
            }
        });
    }, 3000);
}

// 2. Мобильное меню
const burger = document.getElementById('burger-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    burger.classList.toggle('active'); // Можно добавить стили для превращения бургера в крестик
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// 3. Аккордеон (Обучение)
const accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion__header');
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрываем все остальные
        accordionItems.forEach(el => el.classList.remove('active'));
        
        // Если не был активен — открываем
        if (!isActive) item.classList.add('active');
    });
});

// 4. GSAP ScrollTrigger для появления всех секций
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// 5. Cookie Popup
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');

if (!localStorage.getItem('cookieAccepted')) {
    setTimeout(() => {
        cookiePopup.classList.add('show');
    }, 2000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookiePopup.classList.remove('show');
});

// 6. Валидация телефона и формы (как в предыдущем шаге)
const phoneInput = document.getElementById('phone');
if(phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Капча и отправка формы...
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const correctSum = num1 + num2;
    document.getElementById('captcha-label').innerText = `Сколько будет ${num1} + ${num2}?`;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userSum = document.getElementById('captcha-input').value;
        const status = document.getElementById('form-status');

        if(parseInt(userSum) === correctSum) {
            status.innerText = "Успешно! Мы скоро свяжемся с вами.";
            status.className = "form__status success";
            contactForm.reset();
        } else {
            status.innerText = "Неверный ответ капчи.";
            status.className = "form__status error";
        }
    });
}