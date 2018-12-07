const express = require('express');
const router = express.Router();
const connection = require('../models')

function check(data){
    if(data.name == ''){
        return {
            code:1,
            msg:'请输入电影名称'
        };
    }
    if(data.author == ''){
        return {
            code:1,
            msg:'请输入作者名称'
        };
    }
    if(data.info == ''){
        return {
            code:1,
            msg:'请输入电影描述'
        };
    }
    if(data.src == ''){
        return {
            code:1,
            msg:'请输入电影地址'
        };
    }
    return true;
}





exports.details = function(req, res){
    let id = req.params.id;
    if(id != 0){
        var sql = 'select * from video_info where id='+id;
        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            var dataString = JSON.stringify(result);
            var data = JSON.parse(dataString);
            res.render('html/details',{data:data[0]});
        });
        return false;
    }
    res.render('html/details',{data:{id:0}});
}
exports.play = function(req, res){
    let id = req.params.id;
    var sql = 'select * from video_info where id='+id;
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        res.render('html/play',{data:data[0]});
    });
}
exports.index = function(req, res){
    var sql = 'SELECT * FROM video_info';
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        var dataString = JSON.stringify(result);
        var data = JSON.parse(dataString);
        res.render('html/index',{list:data});
    });
}


// 更新视频
// 添加视频
exports.addVideo = function(req, res){
    let data = req.body;
    let checkData = check(data);
    if(checkData === true){
        if(data.id == 0){
            let addSql = 'INSERT INTO video_info(name,author,info,time,src) VALUES(?,?,?,?,?)';
            let addSqlParams = [data.name, data.author, data.info, '12:22', data.src];
            connection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  return;
                }
                let msg = {
                    code:0,
                    msg:'添加成功!'
                }
                res.json(msg);
            });
        }else{
            console.log(data)
            var modSql = 'UPDATE video_info SET name = ?,author = ?,info = ?,src = ? WHERE id = ?';
            var modSqlParams = [data.name, data.author, data.info, data.src, data.id];
            connection.query(modSql,modSqlParams,function (err, result) {
                if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  return;
                }
                let msg = {
                    code:0,
                    msg:'更新成功!'
                }
                res.json(msg);
            });
        }
        
    }else{
        res.json(checkData);
    }
}

// 删除视频
exports.delectVideo = function(req, res){
    let data = req.body;
    if(!data.id){
        res.json({
            code:1,
            msg:"id不正确"
        });
        return false;
    }
    var delSql = 'DELETE FROM video_info where id='+data.id;
    connection.query(delSql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        let msg = {
            code:0,
            msg:'删除成功!'
        }
        res.json(msg);
    });
}


