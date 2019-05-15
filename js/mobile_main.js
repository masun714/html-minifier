let currentMatch = 1;
let currentMatchDistance = '';
let horseDataMatch = 1;
let matchLenght = '';
let currentMatchHorseData = {};
let standardTimeJson = '';

let basicMatchData = ''; 
let loadBasicMatch = false;

window.$grid = null;

let horseCurrentMatchStackData = '';

let getSection = /speedList/.test(window.location.href);
let getCurrentMatch = (/currentMatch/.test(window.location.href) ? currentMatch = window.location.href.replace(/.*currentMatch=/,'') : '' );

Racing.init = function (){
    
    Racing.BindAllHorseData(function(loading){
        if(loading){
        $.getJSON('data/racingTimeStandard.json', function(data){
            standardTimeJson = data;
            Racing.buildMenu();
            // Racing.getBasicMatch();
        })
        }
    })
    
    $('.sectionControl .arrangeList').on('click', function(el){
        window.location.href = '/mobile.html?currentMatch=' + currentMatch;
    })
    
    $('.sectionControl .speedList').on('click', function(el){
        window.location.href = '/mobile.html?speedList&currentMatch=' + currentMatch;
    })
    
}

Racing.SlideOut = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 100,
    'tolerance': 70
})

Racing.buildMenu = function (){
    
    $.get('data/matchSchedule.js', function(data){
        
        
        var data = JSON.parse(data);
        basicMatchData = data;
        
        var menu = '';

        menu += '<div class="headerItem Date">' + data[0].racedate + '</div>';
        menu += '<div class="headerItem Date">星期' + Racing.Function.dateFormat(data[0].racedate, 'dddd') + '</div>';
        menu += '<div class="headerItem title">場次</div>';
        
        for(var i = 1; i <= data.length ; i ++){
            
            menu += '<div class="headerItem matchNo ' + ( currentMatch == i ? 'on' : '') +  '" rel="' + i + '">' + i + '</div>';
        }
        
        $('#menu').html(menu);
        
        Racing.buildHeader();
        Racing.getBasicMatch();
        Racing.HorseListControl();
        
        $('.headerItem').click(function(el){
            $('.headerItem').removeClass('on');
            $(this).addClass('on');
            currentMatch = parseInt($(this).attr('rel'));
            Racing.buildHeader();
            Racing.getBasicMatch();
            Racing.HorseListControl();
        })
        
        
    });
}

Racing.buildHeader = function(){
    
   var currentHeaderData = basicMatchData[currentMatch - 1];
   var header = '<div class="matchTitleRow first"><div class="raceno">場次: ' + currentHeaderData.raceno + '</div>';
   header += '<div class="racetime">時間: ' + currentHeaderData.racetime + '</div></div>';
   
   header += '<div class="matchTitleRow second"><div class="distance">距離: ' + currentHeaderData.distance + ' ' + currentHeaderData.route + '賽道' + '</div>';
   header += '<div class="raceclass">班次: ' + currentHeaderData['race class'].replace('　','') + '</div>';
   header += '<div class="venue">場地: ' + currentHeaderData.venue + '</div></div>';
   
   
   $('.matchTitle').html(header);
   
   currentMatchDistance = currentHeaderData.distance;
   
   
   const classMapping = {
       第一班 : 'Class1',
       第二班 : 'Class2',
       第三班 : 'Class3',
       第四班 : 'Class4',
       第五班 : 'Class5',
       公開 : 'ClassGroup',
       新馬 : 'ClassNew'
       
   }
   
   var horseClass = '';
   if(/賽|盃/.test(currentHeaderData['race class']) == true){
       horseClass = 'ClassGroup';
   }else{
       horseClass = classMapping[currentHeaderData['race class']];
   }
   var checkGround = /泥/.test(currentHeaderData.venue) ? 'Muddy' : 'Glass';
   var checkPlace =  /谷|快活谷/.test(currentHeaderData.venue) ? ['HV', 'HappyValley'] : ['ST', 'ShaTin'] ;
   var recordName = checkPlace[0] + currentHeaderData.distance;
   
   var foundRecord = standardTimeJson[checkPlace[1]]
   
   if(checkGround == 'Muddy' && checkPlace[0] == 'ST'){
       foundRecord = foundRecord[checkPlace[1] + checkGround ][recordName][horseClass];
   }else{
       foundRecord = foundRecord[checkPlace[1] + 'Glass' ][recordName][horseClass];
   }
   
   /*******************************************/
   
  var standardRecordTime = '<div class="matchTitleRow third">';
  
  var bestRecord = '<div class="bestTime">最佳:';
  var standardRecord = '<div class="bestTime">標準:';
  
  $.each(foundRecord, function(k,v){
      if(k == 'BestTime'){
          bestRecord += '<span>' + v + '</span>';
      }else{
          standardRecord += '<span>' + v + '</span>';
      }
  })
  
  bestRecord += '</div>';
  standardRecord += '</div>';
  standardRecordTime += standardRecord;
  standardRecordTime += bestRecord;
  standardRecordTime += '</div>';
   
  $('.standardTime').html(standardRecordTime); 
  
}

Racing.getBasicMatch = function(){
    
    if(getSection){
        Racing.getSpeedListBasicMatch();
        $('.sectionControl .speedList').addClass('on');
    }else{
        Racing.getArragneListBasicMatch();
        $('.sectionControl .arrangeList').addClass('on');
    }

}

Racing.getSpeedListBasicMatch = function(){
    
    //date
    
    //horseName
    
    //speed
    
    let horseList = '';
    
    $.each(currentMatchHorseData[currentMatch], function(k,currentMatchHorse){
        
        $.each(currentMatchHorse, function(k1,v){
        
            if(v.MatchSpeicalStatus == '退出') return;
            
    
            var horseBox = '<div class="horseBox grid-item ' + v.MatchDistance + ' ' + v.MatchDate.substr(0, 4) + ' ' + Racing.Function.testGround(v.MatchGround) + '">';
            
            horseBox += '<div class="horseBoxWrapper">';
            horseBox += '<div class="horseMatchDate">' + v.MatchDate + '</div>';
            horseBox += '<div class="horseName">' + v.MatchHorseName + '</div>';
            horseBox += '<div class="horseDistance">' + v.MatchDistance + '</div>';
            horseBox += '<div class="horseGround">' + v.MatchGround.replace('場地：','') + '</div>';
            horseBox += '<div class="horsePlace">' + v.MatchPlace + '</div>';
            horseBox += '</div>';
        
            horseBox += '<div class="horseBoxWrapper">';
            
                horseBox += '<div class="MatchP1">' + v.MatchSpeedRecord.P1 + '</div>';
                horseBox += '<div class="MatchP2">' + v.MatchSpeedRecord.P2 + '</div>';
                horseBox += '<div class="MatchP3">' + v.MatchSpeedRecord.P3 + '</div>';
                horseBox += '<div class="MatchP4">' + v.MatchSpeedRecord.P4 + '</div>';
                horseBox += '<div class="MatchP5">' + v.MatchSpeedRecord.P5 + '</div>';
                horseBox += '<div class="MatchP6">' + v.MatchSpeedRecord.P6 + '</div>';
                horseBox += '<div class="MatchFinalTime">' + v.MatchSpeedRecord.FinalTime + '</div>';
                horseBox += '</div>';
            
            horseBox += '<div class="valBox" style="display:none;">';
            horseBox += '<div class="p1val">' + ((v.MatchSpeedRecord.P1 != '-' && v.MatchSpeedRecord.P1 != undefined) ? Number(v.MatchSpeedRecord.P1.replace(/\./g,'')) : 0) + '</div>';
            horseBox += '<div class="p2val">' + ((v.MatchSpeedRecord.P2 != '-' && v.MatchSpeedRecord.P2 != undefined) ? Number(v.MatchSpeedRecord.P2.replace(/\./g,'')) : 0 ) + '</div>';
            horseBox += '<div class="p3val">' + ((v.MatchSpeedRecord.P3 != '-' && v.MatchSpeedRecord.P3 != undefined) ? Number(v.MatchSpeedRecord.P3.replace(/\./g,'')) : 0 ) + '</div>';
            horseBox += '<div class="p4val">' + ((v.MatchSpeedRecord.P4 != '-' && v.MatchSpeedRecord.P4 != undefined) ? Number(v.MatchSpeedRecord.P4.replace(/\./g,'')) : 0 ) + '</div>';
            horseBox += '<div class="p5val">' + ((v.MatchSpeedRecord.P5 != '-' && v.MatchSpeedRecord.P5 != undefined) ? Number(v.MatchSpeedRecord.P5.replace(/\./g,'')) : 0 ) + '</div>';
            horseBox += '<div class="p6val">' + ((v.MatchSpeedRecord.P6 != '-' && v.MatchSpeedRecord.P6 != undefined) ? Number(v.MatchSpeedRecord.P6.replace(/\./g,'')) : 0 ) + '</div>';
            horseBox += '<div class="fval">' + ((v.MatchSpeedRecord.FinalTime != '-' && v.MatchSpeedRecord.FinalTime != undefined) ? Number(v.MatchSpeedRecord.FinalTime.replace(/\./g,'')) : 0 ) + '</div>';
            horseBox += '</div>';
            
            horseBox += '</div>';
            
            horseList += horseBox;
        })
        
    })
    
    $('.horseTableList').html(horseList);
    $('.loadingCTN').hide();
    $('.panel').show();
    $('.horseTableList').css('opacity' , 0);
        
        
    if(window.$grid == null){
        
        window.$grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            getSortData: {
                P1: '.p1val parseInt',
                P2: '.p2val parseInt',
                P3: '.p3val parseInt',
                P4: '.p4val parseInt',
                P5: '.p5val parseInt',
                P6: '.p6val parseInt',
                FinalTime: '.fval parseInt',
            },
            sortBy: 'FinalTime',
            filter: '.' + currentMatchDistance
        })
        
        $('.horseTableList').css('opacity', 1);
    
    }else{
        $grid.isotope( 'reloadItems' );
        $grid.isotope({ sortBy : 'FinalTime' });
        $grid.isotope({ filter : '.' + currentMatchDistance });
        $('.horseTableList').css('opacity', 1);
    }
    
    console.log('finsih');
    
}

Racing.getArragneListBasicMatch = function(){
    if(loadBasicMatch != true) $.getJSON('data/match_' + currentMatch + '.js', function(data){
        
        horseCurrentMatchStackData = Racing.HorseDataControl();
    
        $('.horseListControl span').removeClass('on');
        $('.horseListControl span[rel="horseNo"]').addClass('on');
        
        let horseList = '';
        
        $.each(data, function(k,v){
            
            var horseBox = '<div class="horseBox grid-item">'
            
                horseBox += '<div class="horseBoxWrapper">';
                horseBox += '<div class="horseNo">' + v.hrno + '</div>';
                horseBox += '<div class="horseName">' + v.hrname_c + '</div>';
                horseBox += '<div class="horseAge">' + v.age + '</div>';
                horseBox += '<div class="horseJockey">' + v.jockey + '</div>';
                horseBox += '<div class="horseDrawno">' + v.drawno + '</div>';
                horseBox += '<div class="horseTrainer">' + v.stable + '</div>';
                horseBox += '</div>'

                horseBox += '<div class="horseBoxHistory">';
                horseBox += '<div>狀態走勢: <span class="horseStatus">' + horseCurrentMatchStackData.status[v.hrname_c] + '</span></div>';
                horseBox += '<div class="horseHistory" rel="' + v.hrname_c + '">按我看紀錄</div>';
                horseBox += '</div>';

            horseBox += '</div>';
            
            horseList += horseBox;
            
            
        })
        
        
        
        $('.horseTableList').html(horseList);
        $('.loadingCTN').hide();
        $('.panel').show();
        $('.horseTableList').css('opacity' , 0);
        
        
        if(window.$grid == null){
            
            window.$grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                layoutMode: 'fitRows',
                getSortData: {
                    horseNo: '.horseNo parseInt',
                    horseAge: '.horseAge parseInt',
                    horseDrawno: '.horseDrawno parseInt',
                    horseStatus: '.horseStatus parseInt'
                },
                sortBy: 'horseNo'
            })
            
            $('.horseTableList').css('opacity', 1);
        
        }else{
            $grid.isotope( 'reloadItems' );
            $grid.isotope({ sortBy : 'horseNo' });
            $('.horseTableList').css('opacity', 1);
        }
        
        loadBasicMatch = false;

        $('.horseHistory').on('click',function(el){
            
            if($(this).children().length != 0){
                
                $(this).html('按我看紀錄');
                
            }else{
                
                var horsedata = currentMatchHorseData[currentMatch][$(this).attr('rel')];
                
                var history = '<div class="historyBox">';
                
                $.each(horsedata, function(k,v){
                    
                    history += '<div class="wrapper matchBasicDetail">';  
                    history += '<div class="">' + v.MatchDate + '</div>';
                    history += '<div class="">' + v.MatchDistance + '</div>';
                    history += '<div class="">' + v.MatchGround.replace('場地：','') + '</div>';
                    history += '<div class="">' + v.MatchPlace + '</div>';
                    history += '</div>';
                    history += '<div class="wrapper matchTimeDetail">';  
                    history += '<div class="">' + v.MatchSpeedRecord.P1 + '</div>';
                    history += '<div class="">' + v.MatchSpeedRecord.P2 + '</div>';
                    history += '<div class="">' + v.MatchSpeedRecord.P3 + '</div>';
                    history += '<div class="">' + v.MatchSpeedRecord.P4 + '</div>';
                    history += '<div class="">' + v.MatchSpeedRecord.P5 + '</div>';
                    history += '<div class="">' + v.MatchSpeedRecord.P6 + '</div>';
                    history += '<div class="">' + v.MatchSpeedRecord.FinalTime + '</div>';
                    history += '</div>';
                })
                
                history += '</div>';
                
                $(this).append(history);
                
            }
            
            $grid.isotope({ sortBy : $('.horseListControl span.on').attr('rel') });
        })

    })
    
    loadBasicMatch = true;
}

Racing.HorseListControl = function(){
    
    if(getSection){
        
        $('.horseTableHeader').hide();
        
        var list = {
            distance:{},
            date:{},
            name:{}
        };
        
        $.each(currentMatchHorseData[currentMatch], function(k,horse){
            $.each(horse, function(k1,v){
                if( typeof list.distance[v.MatchDistance] == "undefined"){
                    list.distance[v.MatchDistance] = '';
                }
                if( typeof list.date[v.MatchDate.substr(0,4)] == "undefined"){
                    list.date[v.MatchDate.substr(0,4)] = '';
                }
                if( typeof list.name[v.MatchHorseName] == "undefined"){
                    list.name[v.MatchHorseName] = '';
                }
            })
        })
        

        // $('.horseListControl').html('<span>所有配速</span>');
        
        var html = '';
        
        var distanceControlList = '<div class="speedCat">';
        $.each(list.distance, function(k,v){
            distanceControlList += '<span class="' + (currentMatchDistance == k ? 'on' : '') + '" rel="' + k + '">' + k + '</span>';
        })
        distanceControlList += '</div>';
        html += distanceControlList;
        
        // var dateControlList = '<div class="dateCat">';
        // dateControlList += '<span rel="all">全部</span>'
        //  $.each(list.date, function(k,v){
        //     dateControlList += '<span class="" rel="' + k + '">' + k + '</span>';
        // })
        // dateControlList +='</div>';
        // html += dateControlList;
        
        var speedCatAdvance = '<div class="speedCatAdvance"><span class="on" rel="final">最終時間</span><span class="" rel="first">前段</span><span class="" rel="last">後段</span></div>';
        html += speedCatAdvance;
        
        var groundCat = '<div class="groundCat"><span class="on" rel="all">全部</span><span class="" rel="mud">泥地</span><span class="" rel="glass">好地</span></div>'
        html += groundCat;
        
        $('.horseListControl').html(html);
        
        $('.horseListControl .speedCat span').on('click', function(el){
            $('.horseListControl .speedCat span').removeClass('on');
            $('.horseListControl .groundCat span').removeClass('on');
            $('.horseListControl .groundCat span[rel="all"]').addClass('on');
            $(this).addClass('on');
            
            if($('.horseListControl .groundCat span').attr('rel') != 'all'){
                $grid.isotope({ filter : '.' + $(this).attr('rel') + '.' + $('.horseListControl .groundCat span.on').attr('rel') });
            }else{
                $grid.isotope({ filter : '.' + $(this).attr('rel') });
            }
        })
        
        $('.horseListControl .groundCat span').on('click', function(el){
            $('.horseListControl .groundCat span').removeClass('on');
            $(this).addClass('on');
            
            if($(this).attr('rel') != 'all'){
                $grid.isotope({ filter : '.' + $(this).attr('rel') + '.' + $('.horseListControl .speedCat span.on').attr('rel') });
            }else{
                $grid.isotope({ filter : '.' + $('.horseListControl .speedCat span.on').attr('rel')});
            }
        })
    
        $('.horseListControl .speedCatAdvance span').on('click', function(el){
            $('.horseListControl .speedCatAdvance span').removeClass('on');
            $(this).addClass('on');
            if($(this).attr('rel') == 'final'){
              $grid.isotope({ sortBy : 'FinalTime'});
            }
            
            if($(this).attr('rel') == 'first'){
              $grid.isotope({ sortBy : 'P1'});
            }
            
            if($(this).attr('rel') == 'last'){
                
            const DistanceMapping = {
                '1000' : 'P3',
                '1200' : 'P3',
                '1400' : 'P4',
                '1600' : 'P4',
                '1650' : 'P4',
                '1800' : 'P5',
                '2000' : 'P5',
                '2200' : 'P6',
                '2400' : 'P6'
            }
                var sortVal = DistanceMapping[$('.horseListControl .speedCat span.on').attr('rel')];
                
              $grid.isotope({ sortBy : sortVal});
              
              
            }
            
            
        })
        
    }else{
        
        $('.horseTableHeader').show();
        
        $('.horseListControl').html('<div class="arragneListItem"><span class="on" rel="horseNo">編號</span><span rel="horseDrawno">檔位</span><span rel="horseAge">歲數</span><span rel="horseStatus">狀態</span></div>');
        
        $('.horseListControl span').on('click',function(){
            $('.horseListControl span').removeClass('on');
            $('.horseListControl span[rel="' + $(this).attr('rel') +'"]').addClass('on');
            $(this).attr('rel') == 'horseStatus' ? $grid.isotope({ sortBy : $(this).attr('rel'), sortAscending: false  }) : $grid.isotope({ sortBy : $(this).attr('rel') });
        })
            
    }
    
    
    
    
}

Racing.BindAllHorseData = function(loading){
    
    
    $.ajax({
        url: 'data/matchSchedule.js',
        dataType: 'json',
        async: false,
        type: "GET",
        success: function(data){

            matchLenght = data.length;
            
            $.each(data, function(k,v){
                
                $.ajax({
                      
                      url: 'data/match_' + ( k + 1 ) + '.js',
                      dataType: 'json',
                      async: false,
                      type: "GET",
                      success: function(data){
                          
                            currentMatchHorseData[horseDataMatch] = {};
                            
                            $.each(data, function(k,v){
                                currentMatchHorseData[horseDataMatch][v.hrname_c] = [];
                            })
                            
                            horseDataMatch ++
                      }
                })
    
            })
        }
    })
    
    $.each(currentMatchHorseData, function(k,v){
            // console.log(v1);
         $.each(allHorseData, function(k1,v1){
             
           if( typeof v[v1.MatchHorseName] != "undefined"){
               currentMatchHorseData[k][v1.MatchHorseName].push(v1);
           }
           
         })
    })
    

    loading('done');
 
}

Racing.HorseDataControl = function(data){
    

    const stackStructure = {
        status : {}
    };
    
    const currentMatchHistory = currentMatchHorseData[currentMatch];
    
    $.each(currentMatchHistory, function(k,horse){
        
        stackStructure.status[k] = Racing.detectHorseStatus(horse);
        
        $.each(horse,function(k1, v){
            
            
            if(typeof stackStructure[v.MatchDistance] == "undefined"){
                stackStructure[v.MatchDistance] = [];
                stackStructure[v.MatchDistance].push(v);
            }else{
                stackStructure[v.MatchDistance].push(v);
            }
            
        })
    
    })
    
    console.log(stackStructure);
    
    return stackStructure;
    
}

Racing.detectHorseStatus = function(data){
    
    if(data.length == 0) return 0;
    
    console.log(data[0].MatchHorseName + '--------------------------');
    
    let horseStructure = {
        st:{},
        hv:{}
    };
    
    $.each(data, function(k,v){
        if(v.MatchPlace == '沙田'){
            
            if(typeof horseStructure['st'][v.MatchDistance] == "undefined"){
                horseStructure['st'][v.MatchDistance] = [];
                horseStructure['st'][v.MatchDistance].push(v);
            }else{
                horseStructure['st'][v.MatchDistance].push(v);
            }
            
        }else{
            
            if(typeof horseStructure['hv'][v.MatchDistance] == "undefined"){
                horseStructure['hv'][v.MatchDistance] = [];
                horseStructure['hv'][v.MatchDistance].push(v);
            }else{
                horseStructure['hv'][v.MatchDistance].push(v);
            }
            
        }
    })
    
    console.log(horseStructure);
    
    
    var intercept = 0;
    var slope = 0;
    var r2 = 0;
    
    $.each(horseStructure, function(place,placeData){
        
        console.log(place + '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        
        
        $.each(placeData, function(k,v){
            
            console.log(k);
  
            if(v.length > 1){
                
                var timeArr = [];
                var dateLengthArr = [];
                
                for( var x = 0 ; x < v.length ; x ++){
                    if(v[x].MatchSpeedRecord != '-'){
                        timeArr.push(Number(v[x].MatchSpeedRecord.FinalTime.replace(/\.|\:/g,'')));
                        dateLengthArr.push(x + 1);
                    }
                }
                
                console.log(timeArr);
                
                var qfTimeArr = timeArr.length != 1 && (timeArr.length != 2 && timeArr[1] != timeArr[2] );
                
                if(qfTimeArr){
                    
                    var lr = Racing.Function.linearRegression(dateLengthArr, timeArr);
                    
                    slope += lr.slope;
                    intercept += lr.intercept;
                    r2 += lr.r2;
                    
                    console.log(lr);
                }
                
            }
            
        })
        
    })
    
    return Math.round(intercept);
    // if(intercept > 100){
    //     return 'up';
    // }else if(intercept < -100){
    //     return 'down';
    // }else{
    //     return 'middle';
    // }
}