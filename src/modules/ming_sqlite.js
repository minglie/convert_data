var SQLite3 = require('sqlite3').verbose();
var M=require("ming_node")


var Db = new SQLite3.Database("D:\\G\\convert_data\\src\\app\\mysql_to_sqlite\\student");

Db.display_sql_enable=true;



function doSql(sql){
    var promise = new Promise(function(reslove,reject){
        if(Db.display_sql_enable) M.log(sql+";")
        if(sql.indexOf("select")>-1){
            Db.all(sql,
                function(err, result) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        reslove(result);
                    }
                });
        }else{
            Db.run(sql,
                function(err) {
                    if(err){
                        console.error(err);
                        reject(err);
                    }
                    reslove(null);
                });
        }
    })
    return promise;
}

Db.doSql=doSql;

module.exports=Db;



if(0)
    +async function(){
        dd =await doSql(`  
            select * from mm
        `)
        console.log(dd)
}();
