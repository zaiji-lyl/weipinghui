var mySwiper = new Swiper('.swiper-container', {
    initialSlide: 0,
    direction: 'horizontal', // 垂直切换选项
    // grabCursor: true,
    // loop: true, // 循环模式选项
    autoplay: {
        disableOnInteraction: false,
    }, //自动轮播

    // 如果需要分页器
    // pagination: {
    //   el: '.swiper-pagination',
    // },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})
// new Swiper('.swiper-container')
// var mySwiper = document.querySelector('.swiper-container').swiper
// mySwiper.slideNext();
mySwiper.scrollbar.$el.css('height', '3px');
mySwiper.scrollbar.$el.css('width', '600px');
mySwiper.scrollbar.$el.css('margin-left', '250px');
//   mySwiper.scrollbar.updateSize();   

// 右侧list鼠标事件
$('.list-top').hover(function () {
    $(this).css('background', '#fa2a83')
}, function () {
    $(this).css('background', 'black')
})

function over(e) {
    $(e.target).css({
        background: '#fa2a83',
    })
    $('.p1').css('background', '#e9e9e9')
    // $('.icon-fankui,.icon-fanhuidingbu').css({
    //     color:'#ffffff',
    // })
}

function out(e) {
    $(e.target).css('background', 'black')
    $('.p1').css({
        background: '#e9e9e9',
    })
    $('.icon-fankui,.icon-fanhuidingbu').css({
        color: '#999999',
    })
}
$('.list-lower').on('mouseover', '.iconfont', over);
$('.list-lower').on('mouseout', '.iconfont', out)

$('.iconfont').on('mouseover', function () {
    // console.log($(this).find('p'));
    $(this).find('p').stop().animate({
        width: 100
    }, 200);
})
$('.iconfont').on('mouseout', function () {
    // console.log($(this).find('p'));
    $(this).find('p').finish().animate({
        width: 0
    }, 100);
})
// 轮播图上方导航栏

// $('.up').hover(function(){
//     $('.ul1').stop(true,false).slideDown();
// }, function () {
//     $('.ul1').slideUp();
//     $('.ull1').slideUp("fast");
// })
// $('.lii1').hover(function(){
//     // $('.li2').siblings().slideToggle();
//     $(this).next().toggle();
// })


// 精选好物
// 三折
let xr1 = document.querySelector('.xr1');
let xr2 = document.querySelector('.xr2');
let xr3 = document.querySelector('.xr3');
let sale = document.querySelector('.sale');
let nav = document.querySelector('#nav');
async function list1() {
    let data = await pAjax({
        url: './api/indexlist.php',
        data: {
            s: 10,
            num: 3
        }
    });
    res = JSON.parse(data)
    renderHtml1(res)
    // data = JSON.parse(data)
}

list1()
function renderHtml1(res) {
    let str = '';

    res.forEach((item) => {
        let price = parseInt(item.goods_price)
        str +=
            `
        <div class="list1">
        <div><img src="${item.goods_small_logo}" alt=""></div>
        <span class="spxr1">特卖价</span>
        <span>￥${price}</span>
        </div>
        `
    });
    xr1.innerHTML = str
}
// 排行榜
async function list2() {
    let data = await pAjax({
        url: './api/indexlist.php',
        data: {
            s: 50,
            num: 3
        }
    });
    res = JSON.parse(data)
    renderHtml2(res)
    // data = JSON.parse(data)
}

list2()
function renderHtml2(res) {
    let str = '';
    res.forEach((item) => {
        str +=
            `
        <div class="list2">
        <div><img src="${item.goods_small_logo}" alt=""></div>
        <span class="spxr2">${item.cat_id}</span>
        <span class="bang">榜</span>
        </div>
        `
    });
    xr2.innerHTML = str
}
// 唯品快抢
async function list3() {
    let data = await pAjax({
        url: './api/indexlist.php',
        data: {
            s: 100,
            num: 6
        }
    });
    res = JSON.parse(data)
    renderHtml3(res)
    // data = JSON.parse(data)
}

list3()
function renderHtml3(res) {
    let str = '';
    res.forEach((item) => {
        let price = parseInt(item.goods_price)
        str +=
        `
        <div class="list3">
        <div><img src="${item.goods_small_logo}" alt=""></div>
        <span class="spxr1">特卖价</span>
        <span>￥${price}</span>
        </div>
        `
    });
    xr3.innerHTML = str
}

// 各类特卖
async function sale1() {
    let data = await pAjax({
        url: './api/indexlist.php',
        data: {
            s: 150,
            num: 20
        }
    });
    res = JSON.parse(data)
    renderHtml4(res)
    // data = JSON.parse(data)
}

sale1()
function renderHtml4(res) {
    let str = '';
    res.forEach((item) => {
        str +=
        `
        <a href="./html/list.html">
        <div class="salexr">
          <img src="${item.goods_big_logo
          }" alt="">
          <p><span class="p_sale">4.9</span>折封顶&nbsp;${item.cat_three_id
          }专场</p>
        </div>
        </a>
        `
    });
    sale.innerHTML = str
}
// 滚动条事件
window.onscroll = function(){
    // console.log($("body").scrollTop());
    // console.log(scrollY);
    if(scrollY>=125){
        // console.log(scrollY);
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.right = '0';
        nav.style.left = '0';
        nav.style.margin = 'auto';
        nav.style.boxShadow = ' 0 0 10px #000';
    }
    if(scrollY<130){
        nav.style.position = 'relative';
        nav.style.boxShadow = '0 3px 10px -5px #000';
    }
}

// $(window).scroll( function() { 
//     if(window.scrollTop>500){
//         console.log(scrollTop);
//     }
//  } )