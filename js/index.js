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
            item.classList.add('active')
        }
        item.onmouseleave = function(e) {
            item.classList.remove('active')
        }
        item.children[0].onclick = function(e) {
            e.preventDefault()
            var href = e.target.getAttribute('href')
            if (href && href !== '#') {
                var targetDom = document.querySelector(href)
                if (!targetDom) {
                    return
                }
                var targetY = targetDom.offsetTop
                var currentY = window.scrollY
                // 根据距离设置时间，按照速度 2000px/s 来计算
                var time = Math.abs(targetY-currentY)/2
                var coords = { y: currentY }
                // 借助TWEEN函数库来实现动画函数
                var tween = new TWEEN.Tween(coords)
                    .to({y: targetY}, time)
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .onUpdate(function() {
                        window.scrollTo(0, coords.y)
                    })
                    .start()
            }
        }
    }
});

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

setTimeout(function(){
    loading.style.display = 'none'
},1000)
