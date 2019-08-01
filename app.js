
$(function(){
    let measured = [];
    var t = 0;


    function random(min,max){
        return Math.random()*(max-min)+min;
    }
    
    function start(){
        $(".start,.title,.instructions").hide();
        setTimeout(flash,random(1500,4000));
    }

    function flash(){
        $(".button").toggleClass("active");
        let now = new Date()
        t = now.getTime();
    }

    $(".button").click(function(){
        if(t>0){
            let now = new Date();
            let diff = now.getTime()-t;
            measured.push(diff);
            $(".button").toggleClass("active");
            t = 0;
            $(".progressbar").css("width",(100*measured.length/9)+"vw");
            checkComplete();
        }
    })

    $(".start").click(start)

    function checkComplete(){
        if(measured.length==9){
            console.log(measured);
            let ordered = measured.sort((a,b)=>a>b)
            console.log(ordered);
            let time = ordered[4];

            //A középső 5 érték szórása
            let middle = ordered.slice(2,7);
            let calcAvg = (arr)=>arr.reduce((prev,curr)=>prev+curr,0)/arr.length;
            let avg = calcAvg(middle);
            let diffs = middle.map(x=>Math.pow(x-avg,2));
            let diff = Math.sqrt(calcAvg(diffs));
            showResult(time,diff);
        }else{
            setTimeout(flash,random(1500,4000));
        }
    }

    function showResult(time,sd){
        sd = Math.round(sd);
        $(".result-time").text(`${time} ±${sd} ms`);
        $(".button,.progressbar").hide();
        $(".results").show();
    }

    function restart(){
        measured = [];
        t = 0;
        $(".results").hide();
        $(".progressbar").css("width","0vw");
        $(".start,.title,.instructions,.button,.progressbar").show();
        
    }

    $(".results>a").click(restart);
})