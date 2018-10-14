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

setTimeout(function(){
    loading.style.display = 'none'
},1500)
