// 添加 offset 类
var sections = document.querySelectorAll('section')
for(var i =0;i<sections.length; i++){
  sections[i].classList.add('offset')
}

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
    highlightNavByScroll()
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
                var scrollY = window.scrollY
                // 根据距离设置时间，按照速度 2000px/s 来计算
                var time = Math.abs(targetY-scrollY)/2
                var coords = { y: scrollY }
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
})

function animate(time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
}
requestAnimationFrame(animate)

if (window.scrollY > 0) {
    header.classList.add('sticky')
} else {
    header.classList.remove('sticky')
}

// 根据滚动条位置高亮导航按钮
function highlightNavByScroll() {
    var scrollY = window.scrollY
    var sections = document.querySelectorAll('section')
    var currentSection = sections[0]
    for (var i=0; i< sections.length; i++) {
        sections[i].classList.remove('highlight')
        var sectionY = sections[i].offsetTop
        var sectionH = sections[i].offsetHeight
        var topDistance = Math.abs(sectionY - scrollY)
        var bottomDistance = Math.abs(sectionY + sectionH - scrollY)
        var minDistance = topDistance < bottomDistance ? topDistance : bottomDistance
        var currentSectionY = currentSection.offsetTop
        var currentSectionH = currentSection.offsetHeight
        var currentTopDistance = Math.abs(currentSectionY - scrollY)
        var currentBottomDistancce = Math.abs(currentSectionY + currentSectionH - scrollY )
        var currentMinDistance = currentTopDistance < currentBottomDistancce ? currentTopDistance : currentBottomDistancce
        if ( minDistance <= currentMinDistance ) {
            currentSection = sections[i]
        }
    }
    var currentId = currentSection.getAttribute('id')
    nav.childNodes.forEach(function(item) {
        if (item.nodeName === 'LI') {
            item.classList.remove('highlight')
            if (item.children[0].getAttribute('href') === '#' + currentId) {
                item.classList.add('highlight')
            }
        }
    })
    currentSection.classList.remove('offset')
}
highlightNavByScroll()

loading.style.display = 'none'
