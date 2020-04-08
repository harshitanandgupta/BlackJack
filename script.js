var map={
    'you':{
        'id_score':'#yourscore',
        'box':"#yourbox",
        'score':0,
    },
    'dealer':{
        'id_score':'#dealerscore',
        'box':"#dealerbox",
        'score':0,
    },
    'cards':["A","2","3","4","5","6","7","8","9","10","K","J","Q"],
    'value':{"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"J":10,"Q":10},
    'isStand':false,
    'isturnOver':false,
    'wins':0,
    'loses':0,
    'draws':0,
}
var hitaudio=new Audio("sound1.wav");
var win_sound=new Audio("cash.mp3");
var lose_sound=new Audio("aww.mp3");
document.querySelector('#hit').addEventListener('click',hit);
document.querySelector('#stand').addEventListener('click',stand);
document.querySelector('#deal').addEventListener('click',deal);

function hit()
{
    if(map['you']['score'] < 21 && map['isStand'] == false)
    {
        let card=map['cards'][Math.floor(Math.random()*13)];
        addImage(card,'you');
        updateScore(card,'you');
        showScore('you');
    }
}
function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve,ms));
}
async function stand()
{
    if(map['isStand']==false){
        map['isStand']=true;
        while(map['dealer']['score'] < 15)
        {
            let card=map['cards'][Math.floor(Math.random()*13)];
            addImage(card,'dealer');
            updateScore(card,'dealer');
            showScore('dealer');
            await sleep(1000);
        }
        var win=compute();
        console.log(win);
        updateWinner(win);
        updateTable();
        map['isturnOver']=true;
    }
}
function deal(){
    if(map['isturnOver']==true){
    var res=document.querySelector('#yourbox').querySelectorAll('img');
    var res1=document.querySelector('#dealerbox').querySelectorAll('img');
    for(let i=0;i<res.length;i++)
    res[i].remove();
    for(let i=0;i<res1.length;i++)
    res1[i].remove();
    document.querySelector("#result-text").textContent="Lets Play!";
    document.querySelector("#result-text").style.color="black";
    document.querySelector("#yourscore").textContent="0";
    document.querySelector("#yourscore").style.color="blanchedalmond";
    document.querySelector("#dealerscore").textContent="0";
    document.querySelector("#dealerscore").style.color="blanchedalmond";
    map['isStand']=false;
    map['you']['score']=0;
    map['dealer']['score']=0;
    map['isturnOver']=false;
    }
    //console.log(res);
}

function addImage(card,player){
    var node=document.createElement('img');
    node.src="images/"+card+".png";
    //console.log(node);
    document.querySelector(map[player]['box']).appendChild(node);
    hitaudio.play();
}

function updateScore(card,player)
{
    if(card=="A"){
        if(map[player]['score'] + 11 < 21 )
        map[player]['score']+=11;
        else
        map[player]['score']+=1;
    }
    else
    map[player]['score']+=map['value'][card];

}

function showScore(player){
    if(map[player]['score'] > 21){
        document.querySelector(map[player]['id_score']).textContent="BUST!";
        document.querySelector(map[player]['id_score']).style.color="Red";
    }
   else{
        document.querySelector(map[player]['id_score']).textContent=map[player]['score'];
    }
}

function compute(){
    let winner;
    if(map['you']['score'] <= 21){
        console.log(map['you']['score']);
        if(map['dealer']['score'] < map['you']['score'] || map['dealer']['score'] > 21)
        winner='you';
        else if(map['dealer']['score'] == map['you']['score'])
        winner='tied';
        else 
        winner='dealer';
        console.log("I am here!");
    }
    else if(map['you']['score'] > 21 && map['dealer']['score'] > 21 )
    winner='tied';
    else
    winner='dealer';
    return winner;
}

function updateWinner(winner){
    if(winner=='you'){
        document.querySelector("#result-text").textContent="You Won!";
        document.querySelector("#result-text").style.color="Green";
        win_sound.play();
        map['wins']+=1;
    }
    else if(winner=='dealer'){
        document.querySelector("#result-text").textContent="You Lost!";
        document.querySelector("#result-text").style.color="Red";
        lose_sound.play();
        map['loses']+=1;
    }
    else{
        document.querySelector("#result-text").textContent="You Tied!";
        document.querySelector("#result-text").style.color="Blue";
        map['draws']+=1;
    }

}

function updateTable(){
    document.querySelector("#wins").textContent=map['wins'];
    document.querySelector("#loses").textContent=map['loses'];
    document.querySelector("#draws").textContent=map['draws'];
}