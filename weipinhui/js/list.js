let list = document.querySelector(".list");
let page = document.querySelector('.page');

let defaultInfo = {
    len: 20,
    num: 1
}
pAjax({
    url: '../api/getData.php',
    data: {
        start: defaultInfo.num,
        len: defaultInfo.len
    }
}).then((res) => {
    res = JSON.parse(res);
    new Pagination(page, {
        pageInfo: {
            pagenum: 1,
            pagesize: defaultInfo.len,
            total: res.total,
            totalpage: Math.ceil(res.total / defaultInfo.len)
        },
        textInfo: {
            first: '首页',
            prev: '上一页',
            list: '',
            next: '下一页',
            last: '最后一页'
        },
        change: function (num) {
            defaultInfo.num = num;
            getData();
            scrollTo(0, 0)
        }
    });
})

async function getData() {
    let res = await pAjax({
        url: '../api/getData.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len
        }
    });
    res = JSON.parse(res)
    renderHtml(res.list);
}

function renderHtml(data) {
    let str = '';

    data.forEach((item) => {
        let price = parseInt(item.goods_price)
        str += ` 
        <li class="list-item">
        <a href="./detail.html?id=${item.goods_id}">
            <div class="row">
                <div class="thumbnail">
                    <img src="${item.goods_big_logo}"
                        alt="...">
                    <div class="caption">
                        <div class="price">
                            <span class="spxr1">特卖价</span>
                            <span>￥${price}</span>
                        </div>
                        <h3>${item.goods_name}</h3>
                        <p>
                            <a href="./detail.html?id=${item.goods_id}" class="btn btn-info" role="button">查看商品详情</a>
                        </p>
                    </div>
                </div>
            </div>
            </a>
        </li>`;
    })

    list.innerHTML = str;
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