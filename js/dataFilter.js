var Racing = {};
var allHorseData = [];

 $.getJSON('data/horsedata.json',function(data){
    
    $.each(data.horsedata, function(k,v){
        
        /*
        MatchDate : //日期
        MatchNum :  // 場次
        MatchClass : // 班次 
        MatchMark : // 評分
        MatchDistance : // 場地距離
        MatchTotal : //總場次
        MatchGround : // 地質
        MatchPlace : // 地點
        MatchHorseName : //馬名
        MatchJockey : //騎師
        MatchTrainer : // 練馬師
        MatchSpeedRecord : // 段速
        */
        
        
        var horse = {
            MatchDate : '-',
            MatchNum :  '-',
            MatchClass : '-',
            MatchMark : '-',
            MatchDistance : '-',
            MatchTotal : '-',
            MatchGround : '-',
            MatchPlace : '-',
            MatchHorseName : '-',
            MatchJockey : '-',
            MatchTrainer : '-',
            MatchSpeedRecord : '-',
            MatchSpeicalStatus : '-'
        };

    
        // if(k == 0) console.log(v);
        
        
        //found 退出 
        
        if(/退出/.test(v[v.length - 1])){
            horse.MatchSpeicalStatus = '退出';
        }
        
        
        //found date
    
        if(!/^[0-9]{1,8}$/.test(Number(v[0]))){
            console.log('found data error')
            console.log(v[0]);
        }else{
            horse.MatchDate = v[0];
        }
        
        //found 場次
        
        if(!/^[0-9]{1,2}$/.test(Number(v[1]))){
            console.log('found matchNo error')
            console.log(v[1]);
        }else{
            horse.MatchNum = v[1];
        }
        
        //found 班次或賽事
        
        if(!/班|賽|新/.test(v[2])){
            console.log('found 班次 error')
            console.log(v[2]);
        }else{
            horse.MatchClass = v[2]; 
        }
        
        
        //found 評分
        
        if(!/分/.test(v[3])){
            // console.log(v)
        }else{
            horse.MatchMark = v[3];
        }
        
        //found 距離
        
        if(!/^[0-9]{1,4}$/.test(Number(v[4]))){
            console.log('found 距離 error')
            console.log(v[4]);
        }else{
            horse.MatchDistance = v[4];
        }
        
        //found 總場次:
        
        if(!/場次/.test(v[5])){
            if(!/場次/.test(v[6])){
                console.log('found 場次 error')
                console.log(v);
            }else{
                horse.MatchTotal = v[6];
            }
        }else{
            horse.MatchTotal = v[5];
        }
        
        //found 地質
        
        if(!/好地|好黏|好泥|好快|濕慢|黏地|快泥|快地/.test(v[6])){
            if(!/好地|好黏|好泥|好快|濕慢|黏地|快泥|快地/.test(v[7])){
            console.log('found 地質 error')
            console.log(v);
            }else{
                horse.MatchGround = v[7];
            }
        }else{
            horse.MatchGround = v[6];
        }
        
        //found 地點
        
        if(!/沙田|快活谷/.test(v[7])){
            if(!/沙田|快活谷/.test(v[8])){
               console.log('found 地點 error')
               console.log(v[8]);
            }else{
                horse.MatchPlace = v[8];
            }
        }else{
            horse.MatchPlace = v[7];
        }
        
        //found 馬名
        
        if(!/(\p{Script=Hani})+/gu.test(v[9])){
            if(!/(\p{Script=Hani})+/gu.test(v[10])){
                if(!/(\p{Script=Hani})+/gu.test(v[v.length - 1])){
                    
                }else{
                    horse.MatchHorseName = v[v.length - 1];
                }
            }else{
                horse.MatchHorseName = v[10];
            }
        }else{
            horse.MatchHorseName = v[9];
        }
        
        
        //found 騎師
        if(!/^(\p{Script=Hani}){1,1}$/gu.test(v[10])){
            if(!/^(\p{Script=Hani}){1,1}$/gu.test(v[11])){
                if(!/^(\p{Script=Hani}){1,1}$/gu.test(v[9])){
                    if(!/^(\p{Script=Hani}){1,1}$/gu.test(v[8])){
                        // console.log(v);
                    }else{
                        horse.MatchJockey = v[8];
                    }
                }else{
                    horse.MatchJockey = v[9];
                }
            }else{
                horse.MatchJockey = v[11];
            }
        }else{
            horse.MatchJockey = v[10];
        }
        
        
        //found 練馬師
        if(!/^(\p{Script=Hani}){1,1}$/gu.test(v[17])){
            if(!/^(\p{Script=Hani}){1,1}$/gu.test(v[18])){
                if(!/^(\p{Script=Hani}){1,1}$/gu.test(v[16])){
                    if(!/^(\p{Script=Hani}){1,1}$/gu.test(v[15])){
                        // console.log(v);
                    }else{
                        horse.MatchTrainer = v[15];
                    }
                }else{
                    horse.MatchTrainer = v[16];
                }
            }else{
                horse.MatchTrainer = v[18];
            }
        }else{
            horse.MatchTrainer = v[17];
        }
        
        
        // MatchClass: "第四班"
        // MatchDate: "20181226"
        // MatchDistance: "1650"
        // MatchGround: "好地"
        // MatchHorseName: "駿協精英"
        // MatchJockey: "紹"
        // MatchMark: "60-40分"
        // MatchNum: 1
        // MatchPlace: "快活谷"
        // MatchSpeedRecord: {P1: "何", P2: "28.72", P3: "23.77", P4: "24.06", P5: "-", …}
        // MatchSpeicalStatus: "-"
        // MatchTotal: "總場次：283"
        // MatchTrainer: "何"
        // __proto__: Object
        
        if(horse.MatchDate == '20171223' && horse.MatchHorseName == '暴風俠'){
            console.log(v);
        }
        
        
        //found 步速position
        
        if(!/慢.*|快.*/.test(v[v.length - 2])){
            if(!/慢.*|快.*/.test(v[v.length - 3])){
                // console.log(v);
            }else{
                getSpeed(v, v.length - 3, horse.MatchDistance,function(callback){
                    horse.MatchSpeedRecord = callback;
                });
            }
        }else{
            getSpeed(v, v.length - 2, horse.MatchDistance,function(callback){
                horse.MatchSpeedRecord = callback;
            });
        }
        
        allHorseData.push(horse);
        // console.log(horse);
        
    })
    
    Racing.init();
    
})

function getSpeed(data, position, matchDistance, callback){
    
    var doubleCheckPos = /慢.*|快.*/.test(data[position-1]);
    
    if(doubleCheckPos){
        position = position - 1;
    }
    
    const DistanceMapping = {
        '1000' : 3,
        '1200' : 3,
        '1400' : 4,
        '1600' : 4,
        '1650' : 4,
        '1800' : 5,
        '2000' : 5,
        '2200' : 6,
        '2400' : 6
    }
    
    var speedStructure = {
        P1: '-',
        P2: '-',
        P3: '-',
        P4: '-',
        P5: '-',
        P6: '-',
        FinalTime : '-'
    }
    
    var matchDistanceDivide = DistanceMapping[matchDistance];
    
    for(var i = 1 ; i <= matchDistanceDivide + 1 ; i ++){
        
        if(i == 1){
            speedStructure['FinalTime'] = data[position - i ];
        }else{
            var time = data[position - i];
            speedStructure['P'+ (matchDistanceDivide - i + 2)] = time.replace(/\(/,'').replace(/\)/,'');
        }
        
    }
    
    
    callback(speedStructure)
    
}