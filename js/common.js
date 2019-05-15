var matchLocation = '';
var currentMatch = 1;
var horseRecord = '';
var matchDistance = '';
var compareList = [];

var dtd = $.Deferred();

var listsortmode = 'finalrecord'   // frontsection, rearsection, finalrecord

var fitlerMode = false;
var filterLocation = 'all';

function buildHeader(){
    
    $.get('data/matchSchedule.js', function(data){
        
        var data = JSON.parse(data);
        
        var header = '';
        
        for(var i = 1; i <= data.length ; i ++){
            
            header += '<div class="headerItem ' + ( currentMatch == i ? 'on' : '') +  '" rel="' + i + '">' + i + '</div>';
        }
        
        $('header').html(header);
        
        $('.headerItem').click(function(el){
            currentMatch = parseInt($(this).attr('rel'));
            buildHeader()
            genBasicData();
        })
        
    });
}

function getRecord(callback){
    
    $.getJSON('data/horsedata.json',function(data){
        horseRecord = data.horsedata;
        return callback(true);
    })
    
}

function genBasicData(event){
    
    $('.hidden_record').removeClass('on');
    $('.hidden_record').html('隱藏往績');    
        
    event == 'fitlerMode' ? fitlerMode = true : '';
    
    $.get('data/matchSchedule.js', function(data){
        
        var data = JSON.parse(data);
        
        $('.currentDate').html(data[0].racedate.substring(0,4) + '年' + data[0].racedate.substring(4,6) + '月' + data[0].racedate.substring(6,8) + '日');
        
        $.each(data, function(k, v){
            
            if(k == currentMatch - 1){
                
                var html = '';
                
                /'田'/.test(v.venue) == true ? matchLocation = 'D' : matchLocation = 'A';
                
                html += '<div class="">埸次:' + v.raceno + '</div>';
                html += '<div class="">時間:' + v.racetime + '</div>';
                html += '<div class="">級數:' + v["race class"] + '</div>';
                html += '<div class="">埸地:' + v.venue + '</div>';
                html += '<div class="">距離:' + v.distance + '</div>';
                
                matchDistance = v.distance;
                
                $('.match').html(html);
                
                
                $.getJSON('data/match_' + currentMatch + '.js', function(data){
                    
                    var html = '';
                    
                    var horsecompare = {};
                    
                    $.each(data, function(k,v){
                        horsecompare[v.hrname_c] = [];
                    })
                    
                    compareList = [];
                    
                    $.each(horseRecord,function(k,v){
                        
 
                        if(filterLocation == v[7] || filterLocation == v[8]){
                            
                            if(fitlerMode){
                            
                            if(v[4] == matchDistance){
                                 if(typeof horsecompare[v[10]] != "undefined"){
                                    horsecompare[v[10]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[9]] != "undefined"){
                                    horsecompare[v[9]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[8]] != "undefined"){
                                    horsecompare[v[8]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[7]] != "undefined"){
                                    horsecompare[v[7]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[6]] != "undefined"){
                                    horsecompare[v[6]].push(v);
                                    compareList.push(v)
                                }
                                
                            }
                            }else{
                                if(typeof horsecompare[v[10]] != "undefined"){
                                    horsecompare[v[10]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[9]] != "undefined"){
                                    horsecompare[v[9]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[8]] != "undefined"){
                                    horsecompare[v[8]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[7]] != "undefined"){
                                    horsecompare[v[7]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[6]] != "undefined"){
                                    horsecompare[v[6]].push(v);
                                    compareList.push(v)
                                }
                            } 
                            
                        }else if(filterLocation =='all'){
                            
                            if(fitlerMode){
                            
                            if(v[4] == matchDistance){
                                 if(typeof horsecompare[v[10]] != "undefined"){
                                    horsecompare[v[10]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[9]] != "undefined"){
                                    horsecompare[v[9]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[8]] != "undefined"){
                                    horsecompare[v[8]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[7]] != "undefined"){
                                    horsecompare[v[7]].push(v);
                                    compareList.push(v)
                                }else if(typeof horsecompare[v[6]] != "undefined"){
                                    horsecompare[v[6]].push(v);
                                    compareList.push(v)
                                }
                                
                            }
                           }else{
                            if(typeof horsecompare[v[10]] != "undefined"){
                                horsecompare[v[10]].push(v);
                                compareList.push(v)
                            }else if(typeof horsecompare[v[9]] != "undefined"){
                                horsecompare[v[9]].push(v);
                                compareList.push(v)
                            }else if(typeof horsecompare[v[8]] != "undefined"){
                                horsecompare[v[8]].push(v);
                                compareList.push(v)
                            }else if(typeof horsecompare[v[7]] != "undefined"){
                                horsecompare[v[7]].push(v);
                                compareList.push(v)
                            }else if(typeof horsecompare[v[6]] != "undefined"){
                                horsecompare[v[6]].push(v);
                                compareList.push(v)
                            }
                        } 
                        
                        }
                        
                    })
                    
                    genCompareList(compareList);

                    $.each(horsecompare, function(k,v){
                        horsecompare[k].sort(function(a,b){
                            return parseInt(b[0]) - parseInt(a[0]);
                        })
                    })
                    
                    var drawnodata = data.sort(function(a,b){
                        return a.drawno - b.drawno;;
                    })
                    
                    $.each(drawnodata, function(k,v){
                        
                        var horseCard = '';
                        
                        horseCard += '<div class="horsecard">';
                        horseCard += '<div class="info">';
                        horseCard += '<div class="">騎師:' + v.jockey + '</div>';
                        // horseCard += '<img src="http://win.on.cc/ftpdata/racing/jersey/' + v.hrid + '.png"/>';
                        horseCard += '<div class="">馬名:' + v.hrname_c + '</div>';
                        horseCard += '<div class="">歲數:' + v.age + '</div>';
                        horseCard += '<div class="">檔位:' + v.drawno + '</div>';
                        horseCard += '<div class="">評分:' + v.rating + '</div>';
                        horseCard += '<div class="">負磅:' + v.weight + '</div>';
                        horseCard += '<div class="">獨嬴:' + v.odds + '</div>';
                        horseCard += '<div class="">位置:' + v.place_odds_max + '</div>';
                        horseCard += '</div>';
                        
                        $.each(horsecompare[v.hrname_c], function(k1,v1){
                            
                            var recordBoard = '<div class="recordBoard">';
                            
                            $.each(v1,function(k2,v2){
                                if(k2 < 11 || /\./.test(v2) == true || /[A-Za-z0-9].*/.test(v2) == false){
                                    if( /\./.test(v2) == true){
                                        recordBoard += '<div class="timerecord">' + v2 + '</div>';
                                    }else if( v2.length >= 2 && /[A-Za-z0-9][A-Za-z0-9]/.test(v2) == false && /\：|\ /g.test(v2) != true){
                                        recordBoard += '<div class="tag">' + v2 + '</div>';
                                    }else if(/[A-Za-z0-9].*/.test(v2) == false){
                                        recordBoard += '<div class="name">' + v2 + '</div>';
                                    }else{
                                        recordBoard += '<div class="name">' + v2 + '</div>';
                                    }
                                }
                            })
                            
                            recordBoard += '</div>';
                            
                            horseCard += recordBoard;
                            
                        })    
                    
                        horseCard += '</div>';
                        
                        html += horseCard;
                    })
                    
                    $('.detail').html(html);
                    
                    $.each($('.recordBoard'), function(k,v){
                        if( /2018|2019/.test(v.innerText) == true ){
                            $(v.firstChild).css({'font-weight':'bold', 'font-size':'15px'});
                        }
                    })
                
                    $('.filterDistance').remove();
                    $('.all').after('<div class="filterDistance ' + (fitlerMode == true ?'on' : '' ) + '">當前距離</div>');
                    $('.filterDistance').click(function(el){
                        $('.filterDistance').addClass('on');
                        genBasicData('fitlerMode');
                    })
                    
                    
                    $('.all').remove();
                    $('.filterDistance').before('<div class="all ' + (fitlerMode == false ?'on' : '' ) + '">全部紀錄</div>');
                    
                    $('.all').click(function(el){
                        fitlerMode = false;
                        genBasicData();
                    })
                    
                    
                    $('.location').remove();
                    $('.filterDistance').after('<div class="location"><div class="filterLocation" rel="all">全部</div><div class="filterLocation" rel="沙田">沙田</div><div class="filterLocation" rel="快活谷">快活谷</div></div>');
                
                    $.each($('.filterLocation'), function(k,v){
                        if($(v).attr('rel') == filterLocation){
                            $(v).addClass('on');
                        }
                    })
                
                    $('.filterLocation').click(function(el){
                        filterLocation = $(this).attr('rel');
                        genBasicData();
                    })
                    
                    
                    $('.sortrecord').remove();
                    $('.location').after('<div class="sortrecord"><div class="sortsection" rel="finalrecord">比較最終時間</div><div class="sortsection" rel="frontsection">比較前段時間</div><div class="sortsection" rel="rearsection">比較後期時間</div></div>');
                    
                    $.each($('.sortsection'), function(k,v){
                        if($(v).attr('rel') == listsortmode){
                            $(v).addClass('on');
                        }
                    })
                    
                    $('.sortsection').click(function(el){
                        listsortmode = $(this).attr('rel');
                        genBasicData();
                    })
                    
                    
                })
            }
        })
    });
}

function genCompareList(data){
    
    $('.compareList').html('');
    
    var fixarray = data.map(function(x){
        if( /慢|快/.test(x[x.length - 1]) != true ){
            x.pop();
            return x;
        }else{
            return x;
        }  
    })
    
    console.log(fixarray);
    // data.sort(function(a,b){
    //     if( a[4] - b[4] != 0){
    //         return a[4] - b[4];
    //     }else{
    //         if(listsortmode == 'finalrecord'){
    //             return a[a.length - 3].replace(/\./g,'') - b[b.length - 3].replace(/\./g,'');
    //         }else if(listsortmode == 'frontsection'){
    //             if(a[4] == '1000'){
    //                 return a[a.length - 6].replace(/\./g,'') - b[b.length - 6].replace(/\./g,'');
    //             }else if(a[4] == '1200'){
    //                 return a[a.length - 6].replace(/\./g,'') - b[b.length - 6].replace(/\./g,'');
    //             }else if(a[4] == '1400'){
    //                 return a[a.length - 7].replace(/\./g,'') - b[b.length - 7].replace(/\./g,'');
    //             }else if(a[4] == '1600'){
    //                 return a[a.length - 7].replace(/\./g,'') - b[b.length - 7].replace(/\./g,'');
    //             }else if(a[4] == '1650'){
    //                 return a[a.length - 7].replace(/\./g,'') - b[b.length - 7].replace(/\./g,'');
    //             }else if(a[4] == '1800'){
    //                 return a[a.length - 8].replace(/\./g,'') - b[b.length - 8].replace(/\./g,'');
    //             }else if(a[4] == '2000'){
    //                 return a[a.length - 8].replace(/\./g,'') - b[b.length - 8].replace(/\./g,'');
    //             }else if(a[4] == '2200'){
    //                 return a[a.length - 9].replace(/\./g,'') - b[b.length - 9].replace(/\./g,'');
    //             }
    //         }else if(listsortmode == 'rearsection'){
    //             return a[a.length - 4].replace(/\.|\(|\)/g,'') - b[b.length - 4].replace(/\.|\(|\)/g,'');
    //         }
    //     }
    // })
      
      
        data.sort(function(a,b){
        if( a[4] - b[4] != 0){
            return a[4] - b[4];
        }else{
            if(listsortmode == 'finalrecord'){
                if(a[a.length - 3].replace(/\./g,'') >= b[b.length - 3].replace(/\./g,'')){
                    return 1;
                }else if( b[b.length - 3].replace(/\./g,'') >= a[a.length - 3].replace(/\./g,'')){
                    return -1;
                }else{
                    return 0;
                }
            }else if(listsortmode == 'frontsection'){
                if(a[4] == '1000'){
                    return a[a.length - 6].replace(/\./g,'') - b[b.length - 6].replace(/\./g,'');
                }else if(a[4] == '1200'){
                    return a[a.length - 6].replace(/\./g,'') - b[b.length - 6].replace(/\./g,'');
                }else if(a[4] == '1400'){
                    return a[a.length - 7].replace(/\./g,'') - b[b.length - 7].replace(/\./g,'');
                }else if(a[4] == '1600'){
                    return a[a.length - 7].replace(/\./g,'') - b[b.length - 7].replace(/\./g,'');
                }else if(a[4] == '1650'){
                    return a[a.length - 7].replace(/\./g,'') - b[b.length - 7].replace(/\./g,'');
                }else if(a[4] == '1800'){
                    return a[a.length - 8].replace(/\./g,'') - b[b.length - 8].replace(/\./g,'');
                }else if(a[4] == '2000'){
                    return a[a.length - 8].replace(/\./g,'') - b[b.length - 8].replace(/\./g,'');
                }else if(a[4] == '2200'){
                    return a[a.length - 9].replace(/\./g,'') - b[b.length - 9].replace(/\./g,'');
                }
            }else if(listsortmode == 'rearsection'){
                return a[a.length - 4].replace(/\.|\(|\)/g,'') - b[b.length - 4].replace(/\.|\(|\)/g,'');
            }
        }
    })  
      
    
        
    var CompareList = ''
        
    $.each(data,function(k,v){
        
        var recordBoard = '<div class="recordBoard">';
        
         $.each(v,function(k1,v1){
            if(k1 < 11 || /\./.test(v1) == true || /[A-Za-z0-9].*/.test(v1) == false){
                if( /\./.test(v1) == true){
                    recordBoard += '<div class="timerecord">' + v1 + '</div>';
                }else if( v1.length >= 2 && /[A-Za-z0-9][A-Za-z0-9]/.test(v1) == false && /\：|\ /g.test(v1) != true){
                    recordBoard += '<div class="tag">' + v1 + '</div>';
                }else if(/[A-Za-z0-9].*/.test(v1) == false){
                    recordBoard += '<div class="name">' + v1 + '</div>';
                }else{
                    recordBoard += '<div class="name">' + v1 + '</div>';
                }
            }
        })
        
        recordBoard += '</div>';
        CompareList += recordBoard;
    })
    
    $('.compareList').html(CompareList);
}

function scrollDownHide(){
    
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        $('header').css('top','0px');
      } else {
        $('header').css('top','-50px');
      }
      prevScrollpos = currentScrollPos;
    }
    
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
 
  elmnt.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1 <= $('body').width() ? elmnt.offsetLeft - pos1 : $('body').width()) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

$(document).ready(function(){
    
    $('#mydiv').css('left').replace('px','') >= $('body').width() ? $('#mydiv').css('left', $('body').width() + 'px' ) : '';
    $('#mydiv').css('left').replace('px','') <= $('body').width() ? $('#mydiv').css('left', $('body').width() + 'px' ) : '';
    
    $(window).resize(function(){
        $('#mydiv').css('left').replace('px','') >= $('body').width() ? $('#mydiv').css('left', $('body').width() + 'px' ) : '';
        $('#mydiv').css('left').replace('px','') <= $('body').width() ? $('#mydiv').css('left', $('body').width() + 'px' ) : '';
        
    })
    
    buildHeader();
    scrollDownHide();
    getRecord(function(callback){
        if(callback){
            genBasicData();
        }
    })
    
    dragElement(document.getElementById("mydiv"));    
    
    $('.change').click(function(k,v){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $('.detail').css('display','block');
            $('.compareList').css('display','none');
        }else{
            $(this).addClass('on');
            $('.detail').css('display','none');
            $('.compareList').css('display','block');
        }
    })
    
     $('.hidden_record').click(function(el){
        if($(this).hasClass('on') == false){
            $(this).addClass('on')
            $('.recordBoard').css('display','none');
            $(this).html('顯示往績')
        }else{
            $(this).removeClass('on');
            $('.recordBoard').css('display','inline-flex');
            $(this).html('隱藏往績');
        }
    })
    
})