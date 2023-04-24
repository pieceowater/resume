let resumeContent = {}

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

function translatePage() {
    refreshPageContent()
}

function showLangAlert() {
    if (!localStorage.getItem("notFirstTime")) {
        localStorage.setItem("notFirstTime", "1");
        document.getElementById("lang-alert").classList.add("show");
    }
}

showLangAlert()

function cursorBeautifier() {
    const cursor = document.querySelector('.cursor');
    const clickableElements = document.querySelectorAll('select, .btn, button, a, input[type="submit"], input[type="button"], [role="button"]');

    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        if (isHoveringClickableElement(e.target)) {
            cursor.classList.remove('visible');
        } else {
            cursor.classList.add('visible');
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
}

function render(data = {element:null}) {
    try {
        if (data.element) {
            if (data.modifiers){
                for (let m in data.modifiers){
                    switch (m) {
                        case "innerText":
                            data.element.innerText = data.modifiers[m]
                            break
                        case "url":
                            data.element.setAttribute('href', data.modifiers[m])
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}

function currentLang() {
    const langs = {
        1: "en",
        2: "ru"
    }
    return langs[JSON.parse(localStorage.getItem('cnf')).lang || 1] || "en"
}

function headerRender(data) {

    function renderSingleNavLinkItem(data){
        let item = document.createElement('span')
        item.classList.add('nav-item')
        let a = document.createElement('a')
        a.setAttribute('href', data.url || '')
        a.classList.add('nav-link')
        let text = document.createElement('span')
        text.classList.add('nav-link-inner-text')
        text.innerText = data.label[currentLang()] || "###"

        a.appendChild(text)
        return item.appendChild(a)
    }

    function renderDropdownNavLinkItem(data) {
        let item = document.createElement('li')
        item.setAttribute('class','nav-item dropdown')
        item.innerHTML = `<a href="${data.url || ""}" class="nav-link" data-toggle="dropdown">
            <span class="nav-link-inner-text translatable">${data.label[currentLang()]}</span>
            <span class="fas fa-angle-down nav-link-arrow ml-2"></span>
        </a>
        <div id="contactsDM" class="dropdown-menu dropdown-menu-lg">
            <div class="col-auto px-0" data-dropdown-content="">
                <div id="list-group" class="list-group list-group-flush">
                </div>
            </div>
        </div>`


        data.subLinks.forEach( link => {
            let a = document.createElement('a')
            a.setAttribute('href', link.url || "")
            a.setAttribute('target', '_blank')
            a.setAttribute('class', 'list-group-item list-group-item-action d-flex align-items-center p-0 py-3 px-lg-4 unscaled')
            if (link.label.en.indexOf('telegram')){
                a.innerHTML = `<svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.84421 20.5733H22.7388C24.9853 20.5733 26.2905 19.2681 26.2905 16.7675V3.8174C26.2905 1.32647 24.9757 0.0212402 22.4442 0.0212402H3.5496C1.30523 0.0212402 0 1.31686 0 3.8174V16.7675C0 19.2777 1.31484 20.5733 3.84421 20.5733ZM3.83929 18.4007C2.74757 18.4007 2.15366 17.8386 2.15366 16.6937V3.89123C2.15366 2.75802 2.74757 2.19388 3.83929 2.19388H22.4491C23.5237 2.19388 24.1369 2.75802 24.1369 3.90084V16.7033C24.1369 17.8386 23.5237 18.4007 22.4491 18.4007H3.83929ZM13.1634 13.4847C14.0301 13.4847 14.8587 13.1237 15.7001 12.294L25.1292 3.02263L23.727 1.60655L14.5055 10.7151C14.0163 11.2021 13.5951 11.4142 13.1634 11.4142C12.7221 11.4142 12.303 11.1925 11.8214 10.7151L2.56147 1.56811L1.1496 2.98209L10.6247 12.294C11.4682 13.1237 12.2871 13.4847 13.1634 13.4847ZM23.5802 18.8167L24.9846 17.4006L17.4975 9.99038L16.091 11.3947L23.5802 18.8167ZM1.33265 17.4102L2.73912 18.8263L10.2358 11.3947L8.82187 9.99038L1.33265 17.4102Z" fill="#31344b"/></svg>`
            }else if (link.label.en.indexOf('email')){
                a.innerHTML = `<svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.37101 25.6312H12.5798C14.5701 25.6312 15.9002 24.3365 15.9002 22.3987V3.23249C15.9002 1.29258 14.5701 0 12.5798 0H3.37101C1.35117 0 0 1.29258 0 3.23038V22.4008C0 24.3365 1.35117 25.6312 3.37101 25.6312ZM3.76475 23.2699C2.82772 23.2699 2.29592 22.7658 2.29592 21.8726V3.75866C2.29592 2.86545 2.82772 2.36131 3.76475 2.36131H5.29639C5.486 2.36131 5.58186 2.45717 5.58186 2.63506V2.93834C5.58186 3.45162 5.92264 3.79451 6.42631 3.79451H9.4835C9.99678 3.79451 10.3279 3.45162 10.3279 2.93834V2.63506C10.3279 2.45717 10.4238 2.36131 10.6113 2.36131H12.1472C13.0725 2.36131 13.6043 2.86967 13.6043 3.76076V21.8705C13.6043 22.7615 13.0725 23.2699 12.1472 23.2699H3.76475ZM5.43045 22.3575H10.489C10.8307 22.3575 11.0723 22.1201 11.0723 21.7645C11.0723 21.4069 10.8307 21.1769 10.489 21.1769H5.43045C5.08874 21.1769 4.83538 21.4069 4.83538 21.7645C4.83538 22.1201 5.08874 22.3575 5.43045 22.3575Z" fill="#31344b"/></svg>`
            }
            let linkBadge = link.badge || {}
            a.innerHTML += `<div class="ml-4">
                            <span class="text-dark d-block">${link.label[currentLang()]}<span class="badge badge-sm badge-secondary ml-2">${linkBadge[currentLang()] || ''}</span></span>
                            <span class="small">${link.subLabel[currentLang()]}</span>
                        </div>`
            item.querySelector('#list-group').appendChild(a)
        })

        return item
    }


    document.querySelectorAll('[data-content="logo"]').forEach( logo => {
        render({
            element: logo,
            modifiers: {
                innerText: data.logo
            }
        })
    })

    const nav = document.querySelector('#navLinksWrapper')
    nav.innerHTML = ''
    data.links.forEach( link => {
        nav.appendChild(
            (!link.subLinks) ? renderSingleNavLinkItem(link) :renderDropdownNavLinkItem(link)
        )
    })

    render({element: document.querySelector('[data-content="hireMe"]'),
        modifiers: {
            innerText: data.hireMeBtn.label[currentLang()]
        }})
    render({element: document.querySelector('[data-content="hireMeWrapper"]'),
        modifiers: {
            url: data.hireMeBtn.url
        }})

    render({element: document.querySelector('[data-content="resumeBtn"]'),
        modifiers: {
            innerText: data.resumeBtn.label[currentLang()]
        }})
    render({element: document.querySelector('[data-content="resumeBtnWrapper"]'),
        modifiers: {
            url: data.resumeBtn.url
        }})

}

function bodyIntroRender(data) {
    render({
        element: document.querySelector('[data-content="bodyIntroHeading"]'),
        modifiers: {
            innerText: data.heading[currentLang()]
        }
    })

    render({
        element: document.querySelector('[data-content="bodyIntroSubHeading"]'),
        modifiers: {
            innerText: data.subHeading[currentLang()]
        }
    })

    render({
        element: document.querySelector('[data-content="bodyIntroMyGithub"]'),
        modifiers: {
            innerText: data.githubBtn.label[currentLang()]
        }
    })

    render({
        element: document.querySelector('[data-content="bodyIntroMyGithubWrapper"]'),
        modifiers: {
            url: data.githubBtn.url
        }
    })

}

function bodyHardSkillsRender(data) {
    render({
        element: document.querySelector('[data-content="bodyHardSkillsHeading"]'),
        modifiers: {
            innerText: data.heading[currentLang()]
        }
    })

    const skillsIcon = {
        "devops" : `<svg viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.011 30.9597C20.8422 30.9555 23.739 29.2261 23.739 26.3339V19.9699C25.7706 18.1955 26.9659 15.3396 26.9659 12.1992C26.9659 4.86773 22.2058 0 15.0852 0C7.99984 0 3.27695 4.77187 3.27695 11.9297C3.27695 12.3422 3.28656 12.6853 3.3175 13.0029L1.62742 16.0305C1.20555 16.7901 1 17.5155 1 18.1919C1 19.4864 1.81609 20.5294 3.27484 20.8256V23.2041C3.27484 25.6172 4.92179 26.8017 7.22217 26.5612L9.47991 26.3182L8.39898 25.3908V26.3339C8.39898 29.2261 11.2448 30.9597 16.011 30.9597ZM16.011 28.6976C12.5924 28.6976 10.5494 27.637 10.5494 25.9462V24.3293C10.5494 24.0724 10.3797 23.9325 10.1186 23.9548L6.94865 24.3087C6.03576 24.4045 5.5349 24.0061 5.5349 23.036V19.3078C5.5349 19.1252 5.39897 18.9968 5.19296 18.9968H4.55288C3.79772 18.9968 3.3742 18.6213 3.3742 18.0218C3.3742 17.722 3.47662 17.3646 3.68147 16.9976L5.65303 13.4613C5.56467 12.933 5.52529 12.4174 5.52529 11.9041C5.52529 6.11085 9.33881 2.26217 15.0852 2.26217C20.8434 2.26217 24.6995 6.23014 24.6995 12.1992C24.6995 15.1045 23.4766 17.6105 21.4705 18.8384L21.4727 25.9462C21.4727 27.637 19.4254 28.6976 16.011 28.6976Z" fill="#31344b"/><path d="M7.34381 10.0133C7.34381 12.2603 8.90358 13.7753 11.207 13.7753C13.4795 13.7753 15.0276 12.4201 15.0276 10.3895C15.0276 9.55 14.7367 8.83937 14.1998 8.39617C13.9527 8.1864 13.7844 8.11609 13.5512 8.11609C13.1924 8.11609 12.9219 8.3514 12.9219 8.69429C12.9219 9.0639 13.1331 9.16843 13.4076 9.42906C13.6293 9.64656 13.7573 9.96531 13.7573 10.3661C13.7573 11.646 12.7523 12.4933 11.223 12.4933C9.65639 12.4933 8.62584 11.5096 8.62584 10.0112C8.62584 9.09273 9.1117 8.25296 9.90975 7.81913L9.26452 6.67867C8.0917 7.34992 7.34381 8.64226 7.34381 10.0133ZM8.92303 6.89593C8.92303 8.34695 9.95007 9.32921 11.4576 9.32921C11.793 9.32921 12.0986 9.0332 12.0986 8.6882C12.0986 8.34109 11.8026 8.04719 11.4576 8.04719C10.6987 8.04719 10.2051 7.59414 10.2051 6.89593C10.2051 6.16468 10.8159 5.63382 11.6622 5.63382C12.1384 5.63382 12.6201 5.81382 13.0143 6.12484L13.765 5.07601C13.1556 4.60843 12.4281 4.35179 11.6718 4.35179C10.112 4.35179 8.92303 5.43742 8.92303 6.89593ZM12.096 6.715C12.0864 7.09937 12.3548 7.39328 12.7328 7.39328C13.1012 7.39328 13.3525 7.14414 13.3642 6.76609C13.4186 5.70882 14.17 4.98085 15.2134 4.97124C15.8284 4.97124 16.3816 5.29632 16.5958 5.80796C16.6937 5.98796 16.8834 5.9964 17.1466 5.93031C17.2851 5.88343 17.4491 5.87382 17.6069 5.87382C18.6662 5.87382 19.4943 6.69976 19.4943 7.78375C19.4943 10.4533 15.5866 10.0583 15.5866 12.9332C15.5866 14.2637 16.6382 15.1949 18.134 15.1949C18.2247 15.1949 18.3154 15.1949 18.4253 15.1949C18.6351 16.3649 19.4043 17.1683 20.3568 17.1683C21.7396 17.1683 22.724 15.6285 22.724 13.454C22.724 12.5774 22.6654 12.0128 22.6143 11.4716L21.3152 11.8337C21.3737 12.3611 21.4419 12.8223 21.4419 13.4305C21.4419 14.8593 20.9453 15.8842 20.3568 15.8842C19.844 15.8842 19.4955 15.2319 19.4955 14.294C19.4955 14.1193 19.3719 14.0247 19.2048 14.0247C19.0405 14.0247 18.8495 14.0343 18.6878 14.0343C17.5014 14.0343 16.9014 13.6443 16.9014 12.9067C16.9014 10.8941 20.7859 11.4001 20.7859 7.78375C20.7859 5.97039 19.4521 4.58007 17.7304 4.58007C17.612 4.58007 17.4744 4.59179 17.3326 4.62062C16.817 4.04195 16.0403 3.70093 15.2134 3.70093C13.4566 3.70093 12.1537 4.93257 12.096 6.715ZM19.0987 12.5432C19.0987 12.8903 19.3595 13.1586 19.7184 13.1938C21.8406 13.329 23.2853 12.058 23.2853 10.0487C23.2853 8.33242 22.0293 7.03375 20.1819 6.86218L19.9818 8.16437C21.1923 8.0889 22.0054 8.85414 22.0054 10.0487C22.0054 11.27 21.1134 12.0215 19.746 11.9139C19.4064 11.8883 19.0987 12.194 19.0987 12.5432ZM16.2597 13.1415C15.9006 13.2885 15.4445 13.3726 15.0173 13.3726C14.0413 13.3726 13.1134 12.9629 12.8301 12.3913L11.7008 13.2836C12.3784 14.144 13.57 14.6525 14.9066 14.6525C15.4935 14.6525 16.1188 14.5546 16.6855 14.3629L16.2597 13.1415ZM14.0387 9.06836L14.4604 10.3035C16.0605 10.0403 16.919 9.07937 16.9084 7.50156C16.9042 7.16406 16.5965 6.86054 16.2494 6.86054C15.9044 6.86054 15.618 7.15445 15.6243 7.51117C15.6369 8.51289 15.149 8.96171 14.0387 9.06836Z" fill="#31344b"/></svg>`,
        "backend" : `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.3809 25.7564C14.6666 25.7564 14.9427 25.733 15.2423 25.7117L15.8934 26.9574C16.0466 27.2628 16.3412 27.4149 16.7094 27.3713C17.0404 27.3085 17.2733 27.0499 17.3244 26.7073L17.5194 25.3188C18.0716 25.1653 18.6121 24.9553 19.1312 24.7378L20.1627 25.6638C20.4149 25.898 20.7447 25.9437 21.0735 25.7681C21.3651 25.5947 21.4895 25.283 21.4204 24.9328L21.1316 23.5657C21.5943 23.2428 22.0473 22.8792 22.4598 22.471L23.7353 23.0037C24.062 23.1453 24.3876 23.0623 24.6355 22.7749C24.8537 22.5249 24.876 22.1855 24.6887 21.8822L23.9439 20.6867C24.2723 20.2336 24.5387 19.7262 24.7935 19.1974L26.2033 19.2656C26.5459 19.2912 26.8363 19.0901 26.9502 18.7688C27.0587 18.4421 26.9598 18.1102 26.6884 17.9016L25.5845 17.0321C25.7263 16.4895 25.8393 15.9235 25.8958 15.3328L27.2139 14.9056C27.5587 14.7971 27.7598 14.5364 27.7598 14.1842C27.7598 13.8298 27.5587 13.5713 27.2139 13.4532L25.8958 13.0355C25.8393 12.4449 25.7263 11.8906 25.5845 11.3363L26.6863 10.4667C26.9502 10.2539 27.0587 9.93799 26.9502 9.61339C26.8363 9.28995 26.5459 9.09097 26.2033 9.1144L24.7935 9.15917C24.5387 8.63253 24.2723 8.14432 23.9439 7.66784L24.6887 6.47651C24.8739 6.19667 24.8441 5.85518 24.6355 5.60511C24.3876 5.31776 24.0641 5.24441 23.7332 5.37636L22.4556 5.89526C22.0473 5.50081 21.5943 5.12557 21.1316 4.8005L21.4204 3.4451C21.4991 3.08323 21.363 2.77151 21.0672 2.60769C20.7426 2.42675 20.4107 2.46612 20.1627 2.71409L19.1312 3.63261C18.6121 3.40339 18.0695 3.21472 17.5194 3.04948L17.3244 1.67276C17.2733 1.33011 17.0308 1.07159 16.6935 1.00667C16.3412 0.965188 16.0412 1.11941 15.8976 1.40675L15.2423 2.65667C14.9427 2.63534 14.6666 2.62362 14.3809 2.62362C14.0835 2.62362 13.817 2.63534 13.5175 2.65667L12.8568 1.40886C12.7089 1.1173 12.4089 0.965188 12.0503 1.00878C11.7194 1.07159 11.4768 1.33011 11.4353 1.67276L11.2307 3.04948C10.6806 3.21472 10.1477 3.39378 9.6189 3.63261L8.58952 2.7162C8.33945 2.46612 8.00757 2.43636 7.67875 2.60769C7.38719 2.77151 7.25101 3.08323 7.32765 3.44721L7.61851 4.8005C7.16547 5.12557 6.70281 5.50081 6.29242 5.89526L5.01484 5.37636C4.68601 5.24441 4.37218 5.31776 4.12422 5.60511C3.90601 5.85518 3.87625 6.19667 4.0593 6.47651L4.80625 7.66784C4.4875 8.14432 4.2114 8.63253 3.95664 9.15917L2.55648 9.1144C2.21383 9.09097 1.91383 9.28995 1.79781 9.61128C1.69141 9.93799 1.79781 10.2582 2.06172 10.4667L3.16351 11.3384C3.02172 11.8906 2.91086 12.4449 2.87359 13.0259L1.53414 13.4532C1.19148 13.5713 1 13.8298 1 14.1842C1 14.5364 1.19148 14.7971 1.53414 14.9056L2.87359 15.3328C2.91086 15.9235 3.02172 16.4895 3.16351 17.0321L2.06383 17.9016C1.79781 18.1027 1.70102 18.4324 1.79781 18.7667C1.91383 19.0901 2.21383 19.2912 2.55859 19.2656L3.95664 19.1974C4.2114 19.7262 4.4875 20.2336 4.80625 20.6867L4.05719 21.8843C3.87414 22.1834 3.90601 22.5249 4.12422 22.7749C4.37218 23.0623 4.68601 23.1453 5.01695 22.9995L6.29031 22.471C6.70281 22.8792 7.16547 23.2428 7.61851 23.5657L7.32765 24.9349C7.26273 25.283 7.38508 25.5947 7.68296 25.7724C8.00546 25.9437 8.33734 25.9022 8.58741 25.666L9.6189 24.7378C10.1477 24.9553 10.6785 25.1653 11.2307 25.3188L11.4353 26.7073C11.4768 27.0499 11.7194 27.3085 12.0566 27.3734C12.4089 27.4149 12.6993 27.2606 12.8568 26.9595L13.5175 25.7117C13.8074 25.733 14.0835 25.7564 14.3809 25.7564ZM14.3809 23.6389C9.12553 23.6389 5.03405 19.43 5.03405 14.1938C5.03405 8.94799 9.12553 4.73908 14.3809 4.73908C19.6384 4.73908 23.7278 8.94799 23.7278 14.1938C23.7278 19.43 19.6384 23.6389 14.3809 23.6389ZM12.134 12.199L13.6837 11.231L9.83124 4.62612L8.21148 5.49119L12.134 12.199ZM17.2452 15.0839H24.936L24.9243 13.2621H17.2473L17.2452 15.0839ZM13.6827 17.1619L12.1511 16.1578L8.08797 22.8251L9.68967 23.7199L13.6827 17.1619ZM14.3617 17.4699C16.1589 17.4699 17.6186 16.0102 17.6186 14.2034C17.6186 12.3966 16.1589 10.9369 14.3617 10.9369C12.5528 10.9369 11.0952 12.3966 11.0952 14.2034C11.0952 16.0102 12.5528 17.4699 14.3617 17.4699ZM14.3617 15.6171C13.5573 15.6171 12.948 14.9981 12.948 14.2034C12.948 13.4086 13.5573 12.7896 14.3617 12.7896C15.1565 12.7896 15.7659 13.4086 15.7659 14.2034C15.7659 14.9981 15.1565 15.6171 14.3617 15.6171Z" fill="#31344b"/></svg>`,
        "mobile" : `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2477 3.94429H14.8037V0.771089C14.8037 0.336092 14.4537 0 14.0187 0C13.5858 0 13.2477 0.34781 13.2477 0.782807V3.94429ZM14.0187 10.2457C16.1365 10.2457 17.8315 8.55068 17.8315 6.44459C17.8315 4.32679 16.1365 2.63179 14.0187 2.63179C11.9105 2.63179 10.2155 4.32679 10.2155 6.44459C10.2155 8.55068 11.9105 10.2457 14.0187 10.2457ZM14.0187 8.16186C13.0252 8.16186 12.3015 7.4285 12.3015 6.44459C12.3015 5.45108 13.0252 4.71771 14.0187 4.71771C15.0123 4.71771 15.7456 5.45108 15.7456 6.44459C15.7456 7.4285 15.0123 8.16186 14.0187 8.16186ZM13.5847 9.05506L11.4622 8.53804L6.87547 23.9608C6.69992 24.5332 7.0543 25.1386 7.64679 25.2928C8.23718 25.4524 8.80648 25.1215 8.98624 24.5215L13.5847 9.05506ZM7.46375 23.257L6.55016 26.674C6.45547 27.0527 6.65656 27.4284 7.04492 27.5273C7.43328 27.6316 7.79937 27.4209 7.90578 27.0326L8.81726 23.6273L7.46375 23.257ZM14.4624 9.05506L19.0608 24.5215C19.2406 25.1215 19.812 25.4524 20.4045 25.2928C20.9928 25.1386 21.3376 24.5332 21.1737 23.9608L16.587 8.53804L14.4624 9.05506ZM20.5833 23.257L19.2223 23.6273L20.1413 27.0326C20.2477 27.4209 20.6138 27.6316 21.0022 27.5273C21.3809 27.4284 21.5916 27.0527 21.4873 26.674L20.5833 23.257ZM5.8557 15.6286C5.37148 15.6286 5 15.9958 5 16.4726C5 16.9472 5.37148 17.3283 5.8557 17.3283H22.1935C22.666 17.3283 23.0471 16.9472 23.0471 16.4726C23.0471 15.9958 22.666 15.6286 22.1935 15.6286H5.8557ZM14.8217 14.4401C14.8217 13.9971 14.4617 13.6371 14.0187 13.6371C13.5779 13.6371 13.2254 13.9971 13.2254 14.4401V18.5051C13.2254 18.9459 13.5779 19.308 14.0187 19.308C14.4617 19.308 14.8217 18.9459 14.8217 18.5051V14.4401Z" fill="#31344b"/></svg>`
    }
    const container = document.querySelector('[data-content="bodyHardSkillsCardsContainer"]')
          container.innerHTML = ''
    data.cards.forEach( card => {
        let item = document.createElement('div')
            item.setAttribute('class', 'col-12 col-md-6 col-lg-4')
            item.innerHTML = `
            <div class="card bg-primary shadow-soft border-light text-center py-4 mb-5">
            <div class="profile-image shadow-inset border border-light bg-primary rounded-circle p-3 mx-auto" style="padding: 30px!important;">
            ${skillsIcon[card.title.en]}
            </div>
            <div class="card-body">
                <h3 class="h5 mb-2">${card.title[currentLang()]}</h3>
                <span class="h6 font-weight-normal text-gray mb-3">
                    <a href="${card.button.url}" target="_blank" class="translatable">${card.button.label[currentLang()]} →</a>
                </span>
            </div>
            </div>
            `
        container.appendChild(item)
    })

    const badges = document.querySelector('[data-content="bodyHardSkillsBadgesContainer"]')
          badges.innerHTML = ''
    data.badges.forEach( badge => {
        let b = document.createElement('div')
            b.setAttribute('class', 'btn btn-primary m-3')
            b.setAttribute('href', badge.url)
            b.innerHTML = `<span class="mr-1"><span class="fas fa-cog"></span></span>
            ${badge.label}`
        badges.appendChild(b)
    })
}

function bodyAboutRender(data) {
    render({
        element: document.querySelector('[data-content="bodyAboutMeHeading"]'),
        modifiers: {
            innerText: data.heading[currentLang()]
        }
    })
    const contentWrapper = document.querySelector('[data-content="bodyAboutMeContent"]')
    contentWrapper.innerHTML = ''
    data.articles.forEach(article => {
        let art = document.createElement('p')
            art.classList.add('lead')
        article.paragraph.forEach( par => {
            art.innerHTML += par[currentLang()] + '<br>'
        })


        contentWrapper.appendChild(art)
    })
}

function renderExpTimeline(data) {
    let htmlOutput = ''
    data.forEach( item => {
        let entity = document.createElement('div')
            entity.setAttribute('class', 'row align-items-top justify-content-around m-0')
            entity.innerHTML = `<div class="row align-items-top justify-content-around m-0 ">
            <div>
            <h2 class="h2 mb-4"><i>«${item.company}»</i></h2>
            <div class="progress-wrapper">
                <div class="progress-info">
                    <div class="progress-percentage">
                        <span>
                            <span class="translatable">${new Date(item.dates.start * 1000).toLocaleString((currentLang() === 'ru') ? 'ru-RU' : 'default', { month: 'short', year: 'numeric' }).toLowerCase()}</span> → <span class="translatable">${ (item.dates.end === 0) ? (currentLang() === 'ru') ? 'сейчас' : 'now' : new Date(item.dates.end * 1000).toLocaleString((currentLang() === 'ru') ? 'ru-RU' : 'default', { month: 'short', year: 'numeric' }).toLowerCase()}</span>
                        </span>
                    </div>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="${item.progress}" aria-valuemin="0" aria-valuemax="100" style="background-color: #078ff2 !important; width: ${item.progress}%; animation: 15s ease 0s 1 normal none running animate-positive; opacity: 1;"></div>
                </div>
            </div>
            </div>
            <div class="col-md-5 col-xl-5 m-3" style="border-left: 1px solid #31344b;">
                <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header toast-body text-dark">
                        <strong class="mr-auto ml-2">${item.info.position[currentLang()]}</strong>
                    </div>
                    <div class="toast-header justify-content-between px-4">
                        <small class="text-gray translatable">${item.info.location[currentLang()]}</small>
                    </div>
                </div>
                <div>
                    <div class="mb-3"><span class="h6 translatable">${item.info.list.label[currentLang()]}</span>
                    </div>
                    <ul id="companyContentList"></ul>
                </div>
            </div>
            </div>
            </div>
            `
        item.info.list.items.forEach(item => {
            let li = document.createElement('li')
                li.innerText = item.label[currentLang()]
            entity.querySelector('#companyContentList').appendChild(li)
        })
        htmlOutput += entity.innerHTML
    })
    return htmlOutput
}

function bodyExpTimeline(data) {
    render({
        element: document.querySelector('[data-content="bodyExperienceHeading"]'),
        modifiers: {
            innerText: data.heading[currentLang()]
        }
    })
    document.querySelector('[data-content="bodyExtTimelineWrapper"]').innerHTML = renderExpTimeline(data.timeline)
}

function bodyRender(data) {
    bodyIntroRender(data.intro)
    bodyHardSkillsRender(data.hardSkills)
    bodyAboutRender(data.aboutMe)
    bodyExpTimeline(data.experience)
}

function footerRender(data) {
    render({
        element: document.querySelector('[data-content="footerHeading"]'),
        modifiers: {
            innerText: data.heading.label[currentLang()]
        }
    })
    render({
        element: document.querySelector('[data-content="footerlinks"]'),
        modifiers: {
            innerText: data.links.label[currentLang()]
        }
    })

    render({
        element: document.querySelector('[data-content="footerLinksGithub"]'),
        modifiers: {
            url: data.links.buttons.github.url
        }
    })
    render({
        element: document.querySelector('[data-content="footerLinksLinkedin"]'),
        modifiers: {
            url: data.links.buttons.linkedin.url
        }
    })
    render({
        element: document.querySelector('[data-content="footerLinksTiktok"]'),
        modifiers: {
            url: data.links.buttons.tiktok.url
        }
    })
    render({
        element: document.querySelector('[data-content="footerLinksTelegram"]'),
        modifiers: {
            url: data.links.buttons.telegram.url
        }
    })
    render({
        element: document.querySelector('[data-content="footerLinksMail"]'),
        modifiers: {
            url: data.links.buttons.mail.url
        }
    })

    render({
        element: document.querySelector('[data-content="footerLangSelector"]'),
        modifiers: {
            innerText: data.lang.label[currentLang()]
        }
    })

    render({
        element: document.querySelector('[data-content="footerMapHeading"]'),
        modifiers: {
            innerText: data.map.list.label[currentLang()]
        }
    })

    const footerMapList = document.querySelector('[data-content="footerMapList"]')
    footerMapList.innerHTML = ''
    data.map.list.items.forEach( item => {
        let li = document.createElement('li')
            li.classList.add('mb-1')
            li.innerHTML = `<a class="p-2" href="${item.url}">${item.label[currentLang()]}${ item.badge ? `<span class="badge badge-gray ml-2">${item.badge[currentLang()]}</span>` : '' }</a>`
        footerMapList.appendChild(li)
    })

    render({
        element: document.querySelector('[data-content="footerCopyright"]'),
        modifiers: {
            innerText: data.copyright.copyright
        }
    })
}


function refreshPageContent() {
    let data = resumeContent
    render({
        element: document.querySelector('title'),
        modifiers: {
            innerText: data.pageTitle
        }
    })
    for (let entity in data.content){
        switch (entity) {
            case "header":
                headerRender(data.content[entity])
                break
            case "body":
                bodyRender(data.content[entity])
                break
            case "footer":
                footerRender(data.content[entity])
                break
        }
    }

    cursorBeautifier()
}

fetch('./src/data.json')
    .then(response => response.json())
    .then(data => {
        resumeContent = data
        refreshPageContent()
    })
    .catch(error => console.error(error))