let user=document.querySelector('#username')
let pwd1=document.querySelector('#password1')
let pwd2=document.querySelector('#password2')
let check=document.querySelector('#check')
let btn=document.querySelector('.btn')
async function yhzc() {
    let data = await pAjax({
        url: '../api/zhuce.php',
        data: {
            user:user.value,
            pass:pwd1.value
        }
    });
    res = JSON.parse(data)
    // console.log(res);
    
    // data = JSON.parse(data)
}
// yhzc()
function zhuce(){
    user.onblur=function(){
        // console.log(user.value);
        // console.log(1);
        if (/^[a-z]{1,14}$/.test(user.value) || /^[\u4e00-\u9fa5]{1,7}$/.test(user.value)) {
            pwd1.onblur=function(){
                if (/^(\w|[a-zA-Z0-9]|[._]){8,14}$/.test(pwd1.value)) {
                    pwd2.onblur=function(){
                        if(pwd1.value==pwd2.value){
                            if(check.checked){
                                btn.onclick=function(){
                                    yhzc()
                                }
                            }else{
                                alert('请勾选协议')
                            } 
                        }else{
                            alert('两次输入密码不同')
                        }
                    } 
                }else {
                    alert('密码格式错误')
                }
            }
        }else {
            alert('用户名格式错误')
        }
    } 
}

zhuce()