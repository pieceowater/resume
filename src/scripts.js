document.querySelectorAll('[data-toggle="collapse"]').forEach(e => {
    e.addEventListener('click', function (event) {
        if (event.currentTarget.tagName === "A") {
            event.preventDefault();
        }

        let navBtn = this
        let data = navBtn.dataset;
        document.querySelector(data.target).classList.toggle('show')
        document.querySelector('#contactsDM').classList.toggle('show')
    })
})

function toggleTheme(color = JSON.parse(localStorage.getItem('cnf')).theme || {theme: 1}, set = false) {
    const htmlEl = document.querySelector('html');
    if (!set) {
        color = (color === 1) ? 2 : 1

    }
    htmlEl.setAttribute('data-theme', (color === 2) ? 'dark' : 'light')
    setLsCnf(
        {...JSON.parse(localStorage.getItem('cnf') || '{}'), ...{theme: color}}
    )
}

function toggleLang() {
    const lang = parseInt(document.querySelector('#lang').value) || 1
    setLsCnf(
        {...JSON.parse(localStorage.getItem('cnf') || '{}'), ...{lang: lang}}
    )
    translatePage()
}


function setLsCnf(cnf = {
    lang: 1,
    theme: 1
}) {
    localStorage.setItem('cnf', JSON.stringify(cnf))
}

function applyLsCnf() {
    const cfg = JSON.parse(localStorage.getItem('cnf')) || {
        lang: 1,
        theme: 1
    }
    document.querySelector('#lang').value = (cfg.lang || 1)
    document.querySelector('#themeCheckbox').checked = ((cfg.theme || 1) === 2)
    toggleTheme((cfg.theme || 1), true)
}

applyLsCnf()

const translation = {
    1: {
        "hard-skills": "hard-skills",
        "навыки": "hard-skills",

        "personal info": "personal info",
        "личное": "personal info",

        "contacts": "contacts",
        "контакты": "contacts",

        "hire me": "hire me",
        "hh.ru": "hire me",

        "jr.devops engineer &amp; swift, swiftui ios / javascript, node.js backend - developer": "jr.devops engineer &amp; swift, swiftui ios / javascript, node.js backend - developer",
        "jr.devops инженер &amp; swift, swiftui ios / javascript, node.js backend - разработчик": "jr.devops engineer &amp; swift, swiftui ios / javascript, node.js backend - developer",

        "my github": "my github",
        "мой github": "my github",

        "more →": "more →",
        "подробнее →": "more →",

        "about me, true story.": "about me, true story.",
        "обо мне": "about me, true story.",

        "self-taught. i started with programming in python, php, js. in parallel, i got basic frontend skills.<br>‣ then i delved into the study of node.js and web work, got carried away with the \"server\" side of web development.<br>‣ then, as part of a hobby, i began to study mobile development for ios (swiftui) architectural patterns of applications (mvvm, mvc).": "self-taught. i started with programming in python, php, js. in parallel, i got basic frontend skills.<br>‣ then i delved into the study of node.js and web work, got carried away with the \"server\" side of web development.<br>‣ then, as part of a hobby, i began to study mobile development for ios (swiftui) architectural patterns of applications (mvvm, mvc).",
        "самоучка. начинал с программирования на python, php, js. параллельно получил базовые навыки работы frontend. далее углубился в изучении node.js и работы web, увлекся \"серверной\" стороной web-разработки. затем, в рамках хобби, стал изучать мобильную разработку под ios (swiftui) архитектурные паттерны приложений (mvvm, mvc).": "self-taught. i started with programming in python, php, js. in parallel, i got basic frontend skills.<br>‣ then i delved into the study of node.js and web work, got carried away with the \"server\" side of web development.<br>‣ then, as part of a hobby, i began to study mobile development for ios (swiftui) architectural patterns of applications (mvvm, mvc).",

        "‣ later, there was a need to automate ci/cd and build fault-tolerant systems for deploying the company's web applications. i started studying devops and, later, became the head of the development team.": "‣ later, there was a need to automate ci/cd and build fault-tolerant systems for deploying the company's web applications. i started studying devops and, later, became the head of the development team.",
        "позже появилась необходимость автоматизации ci/cd и построения отказоустойчивых систем для деплоя web-приложений компании. занялся изучением devops и, в последствии, стал руководителем команды разработчиков.":"‣ later, there was a need to automate ci/cd and build fault-tolerant systems for deploying the company's web applications. i started studying devops and, later, became the head of the development team.",

        "experience":"experience",
        "опыт работы":"experience",

        "jun":"jun",
        "июнь":"jun",

        "now":"now",
        "по сей день":"now",

        "almaty":"almaty",
        "алматы":"almaty",

        "implementation of devops methodology":"implementation of devops methodology",
        "внедрение devops методологии":"implementation of devops methodology",

        "project architecture design":"project architecture design",
        "проектирование архитектуры проекта":"project architecture design",

        "building the internal infrastructure of the department and work processes, ci/cd":"building the internal infrastructure of the department and work processes, ci/cd",
        "построение внутренней инфраструктуры отдела и рабочих процессов, ci/cd":"building the internal infrastructure of the department and work processes, ci/cd",

        "ensuring the deployment of the company's projects":"ensuring the deployment of the company's projects",
        "обеспечение развертывания проектов компании":"ensuring the deployment of the company's projects",

        "project viability support and monitoring":"project viability support and monitoring",
        "поддержка и мониторинг жизнеспособности проектов":"project viability support and monitoring",

        "automation of development and deployment":"automation of development and deployment",
        "автоматизация разработки и развертывания":"automation of development and deployment",

        "management and decomposition of employees' work":"management and decomposition of employees' work",
        "менеджмент и декомпозиция работы сотрудников":"management and decomposition of employees' work",

        "that's it!":"that's it!",
        "спасибо":"that's it!",

        "thanks for watching!":"thanks for watching!",
        "за внимание!":"thanks for watching!",

        "stay in touch with:":"stay in touch with:",
        "связаться:":"stay in touch with:",

        "change theme": "change theme",
        "режим": "change theme",

        "light":"light",
        "светлый":"light",

        "dark":"dark",
        "темный":"dark",

        "language":"language",
        "язык":"language",

        "map":"map",
        "меню":"map",

    },
    2: {
        "hard-skills": "навыки",
        "personal info": "личное",
        "contacts": "контакты",
        "hire me": "hh.ru",
        "jr.devops engineer &amp; swift, swiftui ios / javascript, node.js backend - developer": "jr.devops инженер &amp; swift, swiftui ios / javascript, node.js backend - разработчик",
        "my github": "мой github",
        "more →": "подробнее →",
        "about me, true story.": "обо мне",
        "self-taught. i started with programming in python, php, js. in parallel, i got basic frontend skills.<br>‣ then i delved into the study of node.js and web work, got carried away with the \"server\" side of web development.<br>‣ then, as part of a hobby, i began to study mobile development for ios (swiftui) architectural patterns of applications (mvvm, mvc).": "самоучка. начинал с программирования на python, php, js. параллельно получил базовые навыки работы frontend. далее углубился в изучении node.js и работы web, увлекся \"серверной\" стороной web-разработки. затем, в рамках хобби, стал изучать мобильную разработку под ios (swiftui) архитектурные паттерны приложений (mvvm, mvc).",
        "‣ later, there was a need to automate ci/cd and build fault-tolerant systems for deploying the company's web applications. i started studying devops and, later, became the head of the development team.": "позже появилась необходимость автоматизации ci/cd и построения отказоустойчивых систем для деплоя web-приложений компании. занялся изучением devops и, в последствии, стал руководителем команды разработчиков.",
        "experience":"опыт работы",
        "jun":"июнь",
        "now":"по сей день",
        "almaty":"алматы",
        "implementation of devops methodology":"внедрение devops методологии",
        "project architecture design":"проектирование архитектуры проекта",
        "building the internal infrastructure of the department and work processes, ci/cd":"построение внутренней инфраструктуры отдела и рабочих процессов, ci/cd",
        "ensuring the deployment of the company's projects":"обеспечение развертывания проектов компании",
        "project viability support and monitoring":"поддержка и мониторинг жизнеспособности проектов",
        "automation of development and deployment":"автоматизация разработки и развертывания",
        "management and decomposition of employees' work":"менеджмент и декомпозиция работы сотрудников",
        "that's it!":"спасибо",
        "thanks for watching!":"за внимание!",
        "stay in touch with:":"связаться:",
        "change theme": "режим",
        "light":"светлый",
        "dark":"темный",
        "language":"язык",
        "map":"меню"
    }
}

function translatePage(lang = JSON.parse(localStorage.getItem('cnf')).lang || 1) {
    document.querySelectorAll('.translatable').forEach(item => {
        translation[lang] ? item.innerHTML = translation[lang][item.innerHTML] : false
    })
}
translatePage()

function showLangAlert() {
    if (!localStorage.getItem("notFirstTime")) {
        localStorage.setItem("notFirstTime", "1");
        document.getElementById("lang-alert").classList.add("show");
    }
}

showLangAlert()

//
// // Get the cursor element
// const cursor = document.querySelector(".cursor");
//
// // Add event listeners for mouse movements
// document.addEventListener("mousemove", e => {
//     // Move the cursor element to the current mouse position
//     cursor.style.left = e.clientX + "px";
//     cursor.style.top = e.clientY + "px";
// });
//
// // Add event listener for mouseover on all elements
// document.querySelectorAll("*").forEach(elem => {
//     elem.addEventListener("mouseover", e => {
//         // Change the cursor element's class to "hover" when hovering over an element
//         cursor.classList.add("hover");
//     });
//     elem.addEventListener("mouseout", e => {
//         // Remove the "hover" class when no longer hovering over an element
//         cursor.classList.remove("hover");
//     });
// });
//
// // Set the default cursor to none
// document.body.style.cursor = "none";


// const cursor = document.querySelector('.cursor');
//
// document.addEventListener('mousemove', e => {
//     cursor.style.left = `${e.clientX}px`;
//     cursor.style.top = `${e.clientY}px`;
//     cursor.classList.add('visible');
//     setTimeout(() => {
//         cursor.classList.remove('visible');
//     }, 1000);
// });
//
// document.addEventListener('touchstart', e => {
//     const touch = e.touches[0];
//     cursor.style.left = `${touch.clientX}px`;
//     cursor.style.top = `${touch.clientY}px`;
//     cursor.classList.add('visible');
//     setTimeout(() => {
//         cursor.classList.remove('visible');
//     }, 1000);
// });


const cursor = document.querySelector('.cursor');
const clickableElements = document.querySelectorAll('select, .btn, button, a, input[type="submit"], input[type="button"], [role="button"]');

document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    if (isHoveringClickableElement(e.target)) {
        cursor.classList.remove('visible');
    } else {
        cursor.classList.add('visible');
        // setTimeout(() => {
        //     cursor.classList.remove('visible');
        // }, 1000);
    }
});

document.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    cursor.style.left = `${touch.clientX}px`;
    cursor.style.top = `${touch.clientY}px`;

    if (isHoveringClickableElement(e.target)) {
        cursor.classList.remove('visible');
    } else {
        cursor.classList.add('visible');
        // setTimeout(() => {
        //     cursor.classList.remove('visible');
        // }, 1000);
    }
});

function isHoveringClickableElement(element) {
    for (let i = 0; i < clickableElements.length; i++) {
        if (element === clickableElements[i] || clickableElements[i].contains(element)) {
            return true;
        }
    }

    return false;
}