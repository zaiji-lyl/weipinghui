<?php
    # 获取胡灿地过来的用户名和密码
    $user = $_GET['user'];
    $pass = $_GET['pass'];
    
    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','test');

    # 整体用双引号，表名和字段用反引号，变量和字符串用单引号
    $sql = "SELECT * FROM `test1` WHERE `userName` = '$user'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($res);

    // 如果$row 有数据的时候表示 已经存在该用户名
    if($row){
        echo json_encode('该用户名已经存在，请重新输入');
    }else{
        $sql1 = "INSERT INTO `test1` VALUES(null,'$user','$pass')";
        $res1 = mysqli_query($con,$sql1);
        // echo json_encode($res1);
        echo json_encode('注册成功');
    }
?>