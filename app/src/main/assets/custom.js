console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// 强制使用桌面端User-Agent（模拟Chrome桌面浏览器）
// 注意：此方法仅在部分环境生效，完整实现可能需要原生层支持（如Pake封装时配置）
Object.defineProperty(navigator, 'userAgent', {
    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    writable: false
});

// 强制桌面端布局（移除可能的移动端视口设置）
const setDesktopViewport = () => {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        // 桌面端通常不需要缩放限制，设置为默认值
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    } else {
        // 若不存在视口标签，创建一个桌面端适用的
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewport);
    }
};

// 初始设置桌面端视口
setDesktopViewport();

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// 1分钟自动刷新逻辑
const autoRefreshInterval = setInterval(() => {
    console.log('%c自动刷新：距离上次刷新已1分钟，即将重新加载页面', 'color:#4285F4;font-weight:bold')
    location.reload(true)
}, 60000)

// 监听页面加载完成后再次确认桌面端布局（防止动态修改）
window.addEventListener('load', () => {
    setDesktopViewport();
    // 强制页面宽度适应桌面（可根据需要调整宽度值）
    document.body.style.minWidth = '1024px'; // 常见桌面端最小宽度
});