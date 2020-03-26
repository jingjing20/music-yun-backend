# music-yun-backend
***
### 属于你的微信小程序后台管理系统来了！！！<font color="red">(仅仅指云开发的小程序哦。😁)</font>如果你自己已经做好了一个采用云开发的微信小程序，但是还没有给它配上一个后台管理系统，那就赶快行动起来吧！！！本文将会很详细的带你实现,包括过程中的一些bug解决方式（可能对大佬来说不是bug的bug🤣）

***
## 前言
><font color="" size="3">本文作者：婧婧  
本文共 3920 字，读完需要15分钟。  
先赞再看，养成习惯！创作不易，感谢支持哦！✨✨</font>
### **<font face="楷体" color=Tomato>请花一些时间安静的读完本文，相信我，你一定可以实现属于自己的小程序后台管理系统。（对有需要的小伙伴还是有点意思的😊😊😊）</font>**


>本文是主要是基于开源项目 **<font face="宋体" size="2" color="FireBrick"> vue-admin-template  + koa + element-ui + 微信云开发HTTP API </font>** 
 实现一个微信小程序后台管理系统。采用前后端分离架构，以  `vue-admin-template` 实现管理系统的前端界面，后端我们这里采用 `Koa2`来实现，当然你也可以换其他框架来实现。

## 来吧 先来看一波效果图

***

![](https://user-gold-cdn.xitu.io/2020/3/7/170b2d7628caca74?w=1892&h=932&f=gif&s=768614)
***

![](https://user-gold-cdn.xitu.io/2020/3/5/170a983cb9f044bc?w=1678&h=740&f=gif&s=1275081)

***
![](https://user-gold-cdn.xitu.io/2020/3/5/170a9640a37dc139?w=1572&h=740&f=gif&s=570298)
***

![](https://user-gold-cdn.xitu.io/2020/3/5/170a964b599dc054?w=1572&h=740&f=gif&s=358805)
***

![](https://user-gold-cdn.xitu.io/2020/3/5/170a96adfbdbfe50?w=1664&h=740&f=gif&s=1475860)
## 具体实现步骤来了
### 一、前端项目初始化
>从  github 上克隆初始前台项目 ***[附上项目地址](https://github.com/PanJiaChen/vue-admin-template/blob/master/README-zh.md)***

![](https://user-gold-cdn.xitu.io/2020/3/5/170aa4c4df1dd4f6?w=1167&h=182&f=png&s=62573)  
- 1、成功后用 `vscode` 编辑器打开项目
- 2、我们在 `views` 目录下只留下 `login` 文件夹和 `404.vue`，其它全部删除。然后根据自己的小程序中需要管理的数据设计好需要哪些前台页面，根据自己的需求建好项目的视图文件。
- 3、接下来在 `router` 文件夹下的 `index.js` 中根据自己设计的页面进行路由规划（关于路由的配置就不详细去讲了）
- 4、想好数据怎么显示，需要做什么操作 **<font face="宋体" color="OrangeRed" size="1">（因为此模板已经集成了element-ui，即想好用 element-ui 的什么组件来显示界面，本文中写的项目比较简单，所以只用到 table、button、dialog、form 这几个组件） </font>**

- 5、最后一步了，我们在`src`下的`api`文件夹中为每一个前端页面封装一个`.js`文件，在里面写获取后端数据的方法，然后在 `views` 文件夹里的视图页面中引入获取后端返回的数据。

***

>**<font face="楷体" size="3" color=Tomato>这里我以本项目目录和克隆下来的项目目录来一个对照应该会更清楚一点。</font>** 

>下图为初始克隆下来的项目文件目录，注意图中标注的地方。



![](https://user-gold-cdn.xitu.io/2020/3/6/170ad8994581c880?w=983&h=555&f=png&s=42246)

><font color="Tomato" size="3" face="黑体">下图为本项目文件目录。注意标注的地方你会发现只有两个地方有改变。</font>

- 1、我在 `views` 目录下建立了三个文件夹 `playlist`、`swiper`、`blog`，分别代表上文 `gif` 图中显示的歌单管理、轮播图管理、博客管理三个页面的视图文件。（当然，你必须根据自己的小程序来设计。）
- 2、在 `api` 目录下新建了三个文件 `playlist.js`、`swiper.js`、`blog.js`，分别用于上一点三个页面数据的获取。


![](https://user-gold-cdn.xitu.io/2020/3/6/170ad9a0529bdd50?w=1023&h=665&f=png&s=98027)

***

- 至此，前端项目初始化就已经完成了。💦💦
- 接下来，我们进行后端项目初始化。
***
### 二、后端项目初始化
- 1、初始化一个 `node` 项目，安装项目相关依赖。此项目只用到以下依赖包  
 `koa`——本项目采用的后端框架  
 `koa-router`——路由管理工具  
 `koa-body`——用于`post`请求参数解析  
 `koa2-cors`——解决前后端跨域问题的`npm`包  
 `request`、`request-promise`——用于发送获取小程序云数据库中数据的请求

- 2、在根目录下新建一个 `app.js` 文件用于后端服务的入口文件
- 3、在根目录下新建一个 `controllers`文件夹用于存放从云数据库获取数据的 js 文件
- 4、在根目录下新建一个`utils`文件夹用于存放一些工具文件
***

- 至此，后端项目初始化也完成了。💦💦
- 接下来，我们进行前后端项目的对接。
***

### 三、前后端项目的对接
#### <font color="red">这里我把本项目中一个页面数据获取的完整流程走一遍，便于大家理解。就用第一个页面，歌单列表的获取为例。开始吧！！！</font>
#### 前端：
- 在前端项目`views`文件夹中的`playlist.vue`中解构出`api`文件夹中的`playlist.js`中封装好的方法。如图所示：

![](https://user-gold-cdn.xitu.io/2020/3/6/170adc9f6bb41190?w=632&h=44&f=png&s=6698)
>`fetchList`方法用于歌单的获取、`del`方法用于歌单的删除。代码不长，我就把`playlist.js`中这两个方法直接贴出来了。如下：（`baseURL`为后端项目开启的地址，`request`方法是模板项目封装好的`axios`请求方法）

```
import request from '@/utils/request'
const baseURL = 'http://localhost:8888'

export function fetchList(params) {
    return request({
        params,
        url: `${baseURL}/playlist/list`,
        method: 'get'
    })
}
export function del(params) {
    return request({
        params,
        url: `${baseURL}/playlist/del`,
        method: 'get',
    })
}
```
#### 后端：
- 1、前端请求方法已经写好了，接下来就来到后端项目中了。首先来到我们后端项目的入口文件`app.js`中。
>代码如下（代码都写了一些解释在上面）：
```
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
    //跨域解决方法之一cors
const cors = require('koa2-cors')
    // 接受post请求参数解析
const koaBody = require('koa-body')
    //对应你自己的小程序云环境id
const ENV = 'jingjing-haohao'

// 跨域
app.use(cors({
    //前端项目的请求地址。
    origin: ['http://localhost:9528'],
    credentials: true
}))

// 接受post请求参数解析
app.use(koaBody({
    multipart: true
}))

app.use(async(ctx, next) => {
    console.log('jingjing 全局中间件')
    //配置全局变量。方便其他页面使用，这里用于定义好云环境id
    ctx.state.env = ENV
    await next()
})

//定义好playlist路由
const playlist = require('./controllers/playlist')
router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())

//开启服务
app.listen(8888, () => {
    console.log('项目已启动在8888端口、、、')
})
```
- 2、在项目入口文件中注册好`playlist`路由后，我们现在来到`controllers`文件夹下的`playlist.js`中。
>代码如下：（避免篇幅过长，我只把删除功能的代码贴出来了。）全部代码点这里 ***[playlist.js](https://github.com/jingjing20/music-yun-backend/blob/master/music-admin-backend/controllers/playlist.js)***
```
const Router = require('koa-router')
const router = new Router()
const callCloudDB = require('../utils/callCloudDB')
router.get('/del', async(ctx, next) => {
    const params = ctx.request.query
    const query = `db.collection('playlist').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})
module.exports = router
```

 一些解释如下：  
- 1、这里用`get`还是`post`方法是必须和前端请求时的方法一样。  
- 2、`query`是操作数据库的`sql`语句。 
- 3、返回到后端的数据中`code=20000`，这是前端模板中规定后端必须返回的状态码，有这个状态码才认为请求成功。
- 4、代码第三行导入了`callCloudDB`模块，这是因为我们在请求或查询云数据库和操作云数据库的时候，查微信官方文档发现，给出的请求地址特别像（只是地址中一个参数不一样）、请求参数完全一样。所以我们把它封装成一个`callCloudDB`模块。之后需要和数据库交互的时候直接调用此方法传入相应的参数就可以了。例如上面`del`方法需要删除数据库数据的代码`const res = await callCloudDB(ctx, 'databasedelete', query)`,其中`ctx`为上下文环境，`databasedelete`为删除操作固定参数，`query`为`sql`语句。之后需要进行其他操作只要改对应的参数就可以。怎么样，是不是很方便😬😬😬。
>`callCloudDB.js`代码附上：
```
const getAccessToken = require('./getAccessToken.js')
const rp = require('request-promise')

const callCloudDB = async(ctx, fnName, query = {}) => {
    const ACCESS_TOKEN = await getAccessToken()
    const options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
        body: {
            query,
            env: ctx.state.env,
        },
        json: true // Automatically stringifies the body to JSON
    }

    return await rp(options)
        .then((res) => {
            return res
        })
        .catch(function (err) {
            console.log(err);
        })
}

module.exports = callCloudDB
```
又一些解释如下：
- `ACCESS_TOKEN`为小程序的接口调用凭证，和小程序数据交互必须要的参数，引入`getAccessToken.js`就是为了获取它的，`getAccessToken.js`后面还会详细解释一下。关于`AccessToken`,官方文档有详细讲解 ***[链接在此！](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html)***

***
#### <font color="red" size="3">让我们简单从头再理一遍思路。</font>
- 1、前端在`api`文件里写好获取数据的请求方法、向后端传需要用到的参数。  
- 2、我们在后端`controllers`文件夹下建好相对应的文件，如图：

![](https://user-gold-cdn.xitu.io/2020/3/6/170b0520ecd6b69d?w=289&h=114&f=png&s=3784)
- 3、在文件里借助微信官方文档中云开发下的[HTTP API文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/)提供的方法去写好操作自己的云函数或云数据库的代码。将取到的值返回给前端，记得一定要带上一个状态码（20000）  
- 4、在前端项目中写好页面（初始项目已经集成`element-ui`，我们可以直接用它），把后端返回的数据进行一些处理，然后显示到页面上。

***

<font color="red">整个流程大概就是这样，其他页面也是完全一样的流程。还有一些细节我接下来会继续讲讲，也有些细节没有详细去讲。可能我写的不够好、难以理解，又或许小伙伴哪里没看太懂，欢迎评论区讨论交流。有需要可以联系作者共同探讨哦。😁</font>

***

### 四、在项目中我感觉比较好的地方（大白感觉🙄🙄🙄）
#### 1、后端封装的工具文件很nice（即utils文件夹下的文件）
- 为小程序的接口调用凭证`ACCESS_TOKEN`的获取封装了一个`getAccessToken.js`文件，它的作用是获取`ACCESS_TOKEN`后在同级目录中生成一个`access_token.json`的`JSON`文件，把`ACCESS_TOKEN`存进去同时存入获取时间。然后把`getAccessToken`作为模块导出，在其他页面就可以直接导入使用。而且文件里面对`ACCESS_TOKEN`做了过期时间判断，过期了就重新获取（因为`ACCESS_TOKEN`有效期为2小时）
- 为操作云数据库封装了一个`callCloudDB.js`，此文件作用上面已经提到。
- 为操作云函数封装了一个`callCloudFn.js`，因为操作云函数调用的接口所需要的参数也就云函数名称和传入云函数的参数不一样，可以很好的复用。

#### 2、前端模板项目特别牛逼，我们只需要根据自己的需求在模板项目中稍微修改一下视图和路由就可以实现属于自己的项目。
- 模板项目作者（膜拜）—— ***[花裤衩](https://juejin.im/user/5648a5ca60b259caebaf7562)***
- `github` 地址—— ***[https://github.com/PanJiaChen/vue-admin-template/blob/master/README-zh.md](https://github.com/PanJiaChen/vue-admin-template/blob/master/README-zh.md)***

### 五、完成项目过程中遇到的问题（当然不代表小伙伴也一定会有同样的问题）
#### 1、浏览器滑动到页面底部的时候再次从数据库获取数据显示到页面上。
- 对于浏览器是否滑到了底部我刚开始准备进行如下的判断。
>1、获取文档的真实高度（即你设定每次取多少条数据在页面上显示的高度）
`const scrollHeight = document.documentElement.scrollHeight`  
>2、获取浏览器窗口的可视高度,就是肉眼可见的那部分全屏高度   
`const clientHeight = document.documentElement.clientHeight`  
>3、获取浏览器向上滚动的高度  
`const scrollTop = document.documentElement.scrollTop `  

- 取到这三个数据之后根据`scrollHeight == scrollTop + clientHeight`这个判断条件来控制是否再次获取数据，然后、、、🤕🤕
- 看图

![](https://user-gold-cdn.xitu.io/2020/3/7/170b2fb70a54cb87?w=1916&h=905&f=png&s=329178)
- 最后我才想到这个点上来，会不会是这个有问题。对这三个数据分别打印出来如上图，红框中就是浏览器滑到底部打印出来的数据，我哭了🤪🤪
- 我们发现`scrollHeight 比 scrollTop + clientHeight`小那么0.28、、。所以导致`scroll.js`没有生效。改一下这个判断条件就解决了这个问题。

#### 2、我在博客页面获取发布时间的的时候
- 即图示红框部分
![](https://user-gold-cdn.xitu.io/2020/3/7/170b30e9003e6cd8?w=1546&h=285&f=png&s=36509)
- 我刚开始在后端返回的数据中看到有`createTime`下面有一个`$date`，可是我就是取不到这个值。试了好久、、后来我把`createTime`打印出来发现它是一个`{__ob__: Observer}`。然后百度发现好多这样的问题，根据一位网友的方法顺利解决。需要将返回的数据`data`先转换为`JSON`字符串形式，然后再从字符串形式转换成`JSON`格式即`JSON.parse(JSON.stringify(data))`（虽然知道要这样做就可以解决问题，但是不知道为什么😅，希望如果有了解的大佬给大白解释一下。😁）
- 对于时间格式化采用了`moment.js`来解决，`moment.js`这个时间处理类库真的很方便哦！使用也很简单！推荐一下，文末附链接。（写此篇文章中途学到的🤣🤣）
 
***

## 写在最后
***

```!
作者只是一名前端大白(●—●) 此篇文章是作者写的第二篇，虽然花了不少时间，但是感觉写这么大的文章还是感觉有点吃力。如果文中有错误请各位大佬谅解一下，指出错误就更好了，让新人多一个学习的机会。😊😊
```

### 希望看完的朋友可以动动手点个赞再走哦，感谢🙏🙏。你们的支持是对我最大的鼓励啊！！！附上项目地址，欢迎有需要的同学自取。
- 本项目github地址——[https://github.com/jingjing20/music-yun-backend](https://github.com/jingjing20/music-yun-backend)


***

### 参考文档
- [Moment.js中文网](http://momentjs.cn/)
- [element-ui](https://element.eleme.cn/#/zh-CN/component)
- [微信云开发 HTTP API 文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/)





