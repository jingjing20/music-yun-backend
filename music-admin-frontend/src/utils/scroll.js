const scroll = {
    isEnd: false,
    start(callback) {
        let timer = null
        callback && window.addEventListener('scroll', () => {
            if (timer) {
                clearTimeout(timer)
            }
            // 函数防抖
            timer = setTimeout(() => {
                // 浏览器向上滚动的高度
                const scrollTop = document.documentElement.scrollTop 
                // 浏览器窗口的可视高度,就是肉眼可见的那部分全屏高度
                const clientHeight = document.documentElement.clientHeight
                // 文档的真实高度
                const scrollHeight = document.documentElement.scrollHeight
                if (!this.isEnd && scrollHeight < (scrollTop + clientHeight + 5)) {
                    window.scrollTo(0, scrollTop - 100)
                    // 请求数据
                    callback()
                }
            }, 300)
        })
    },
    end() {
        this.isEnd = true
    }
}

module.exports = scroll