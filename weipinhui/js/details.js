// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表 
// 如果有id参数的时候 根据id去获取对象的数据 渲染

// http://gz2008.com/day06_code/project/html/detail.html?id=4
let reg = /id=(\d+)/;
if (!reg.test(location.search)) {
    location.href = '../html/list.html'
}
let id = reg.exec(location.search)[1];
let container = document.querySelector('.container');
// 根据id获取数据
pAjax({
    url: '../api/getDetail.php',
    data: {
        id
    }
}).then(res => {
    res = JSON.parse(res);
    renderHtml(res.detail)
})


function renderHtml(data) {
    console.log(data);
    let price = parseInt(data.goods_price)
    container.innerHTML = `
        <div class="media">
            <div class="media-left">
                <div class="fdj">
                    <img src="${data.goods_big_logo}" alt="...">
                </div>
                <div><img src="../../images/zpbz.png" alt=""></div>
            </div>
            <div class="media-body">
                <h5 class="media-heading">${data.goods_name}
                </h5>
                <div class="price">
                    <img src="../../images/1597801542667.png" alt="">
                    <span class="rmbf">￥</span>
                    <span class="jg">${data.goods_price}</span>
                    <i class="kq">唯品快抢</i>
                </div>
                <p class="yunf">
                    <span class="span1">运费</span>
                    <span>新会员专享首单满38元免邮（限唯品自营商品，部分商品不可用）</span>
                </p>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default">XL</button>
                    <button type="button" class="btn btn-default">L</button>
                    <button type="button" class="btn btn-default">M</button>
                    <button type="button" class="btn btn-default">S</button>
                    <button type="button" class="btn btn-default">XS</button>
                </div>
                <div class="xbutton">
                    <button class="btn btn-warning btn-lg" id="goCar">购物袋</button>
                    <button class="btn btn-danger btn-lg" id="addCar">￥${price}特价抢></button>
                </div>
                <div class="kefu"><img src="../../images/kefu.png" alt=""></div>
            </div>
        </div>

        <ul class="nav nav-tabs">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">Profile</a></li>
            <li role="presentation"><a href="#">Messages</a></li>
        </ul>
        <div class="goods_detail">
            ${data.goods_introduce}
        </div>`
}

container.onclick = function () {
    let e = window.event;
    if (e.target.id == 'goCar') {
        location.href = '../html/car.html'
    }

    if (e.target.id == 'addCar') {
        // alert('添加购物车')
        // 把当前这个条商品的goods_id ，用户名 ，goods_num 添加到 购物车的表
        // goods_id = id
        // userName = getCookie('login)  如果没有登录的时候 不能添加数据，提示进行登录
        // goods_num  判断这个用户对应的这个goods_id 是否已经存在，如果存在 goods_num++，如果不存在操作添加商品到购物车，其中 goods_num = 1

        console.log(1);
        let login = getCookie('login');
        if (!login) {
            alert('没有登录请到登录页面进行登录');
            localStorage.setItem('url', location.href);
            location.href = '../html/login.html';
            return
        }

        // 发添加购物车的ajax请求
        pAjax({
            url: '../api/addCar.php',
            type: 'post',
            data: {
                'goods_id': id,
                'userName': login
            }
        }).then(function (res) {
            console.log(res);
        })
    }
}


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