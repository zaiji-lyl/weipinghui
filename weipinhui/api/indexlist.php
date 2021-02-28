<?php

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','test');
    $s = $_GET['s'];
    $num = $_GET['num'];
    # 整体用双引号，表名和字段用反引号，变量和字符串用单引号
    $sql = "SELECT * FROM `goods` LIMIT $s,$num";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $dataArr = array();
    $row = mysqli_fetch_assoc($res);

    while($row){
        array_push($dataArr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    // print_r($dataArr);

    echo json_encode($dataArr); 
?>

