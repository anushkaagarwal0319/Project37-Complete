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
    question.hide();

    background("lightblue");

    //write code to show a heading for showing the result of Quiz
    var heading = createElement('h2');
    heading.html("Quiz Results");
    heading.position(200, 20);
    
    //call getContestantInfo( ) here
    Contestant.getContestantInfo();

    //write condition to check if contestantInfo is not undefined
    if(allContestants !== undefined){
      fill("black")
      textSize(20)
      text("NOTE: The contestant who answered correctly is highlighted in green color!", 130, 230);
    }

    var y = 250;
  
    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      y = y +30
      if(correctAns === allContestants[plr].answer){
      fill("green");
    }
      else{
      fill("red");
    }
    text(allContestants[plr].name+": " + allContestants[plr].answer, 200, y);
  }

}
}
