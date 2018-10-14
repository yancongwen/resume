all.onclick = function () {
    portfolioBar.className = 'navBar state-1'
}

frame.onclick = function () {
    portfolioBar.className = 'navBar state-2'
}

native.onclick = function () {
    portfolioBar.className = 'navBar state-3'
}

window.onscroll = function() {
    if (window.scrollY > 0) {
        header.classList.add('sticky')
    } else {
        header.classList.remove('sticky')
    }
}

// 导航栏绑定事件
nav.childNodes.forEach(function(item){
    if (item.nodeName === 'LI') {
        item.onmouseover = function(e) {
            item.classList.add('active', 'hover')
        }
        item.onmouseleave = function(e) {
            item.classList.remove('active', 'hover')
        }
        item.children[0].onclick = function(e) {
            e.preventDefault()
            var href = e.target.getAttribute('href')
            if (href && href !== '#') {
                var targetDom = document.querySelector(href)
                if (targetDom) {
                    scrollTo(0, targetDom.offsetTop)
                }
            }
        }
    }
});

setTimeout(function(){
    loading.style.display = 'none'
},1)
