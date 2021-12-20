const mongoose = require('mongoose');

module.exports = () => {

    //데이터베이스 연결 함수
    function connectionDB() {
        mongoose.connect('localhost:27017', function(err) {
            if(err) {
                console.err('[database] databaseConnection.js mongodb connection Fail!')
            }
            console.log('[database] databaseConnection.js MongodbConnection Success!')
        })
    }
    //connectionDB!!
    connectionDB();
    mongoose.connection.on('disconnected', connect);
    
}
