class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //Contestant.getPlayerInfo();

    //write code to change the background color here
    background("yellow");


    //write code to show a heading for showing the result of Quiz
    textSize(20);
    text("THE RESULTS OF THE QUIZ ARE",100,300);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
       //write code to add a note here
       fill("blue");
       textSize(20);
       text("*Note : The contestant who answered correctly has been highlighted in green",100,450);
    }

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
          fill("green");
          text(allContestants[plr].name,100,350);
      }else{
          fill("red");
          text(allContestants[plr].name,100,400);
      }
    }
    
  }

}
