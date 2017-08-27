(function(){ //start of self invoking function

  $(function(){ //start of wait for window to load function

    //create variables to reference
    let categoryArray = [];
    let pointValueArray = [];
    let questionArray = [];
    let answerArray = [];

    //functionality for loading an array of questions
    function loadCategories(){
      //hit the API to get items returned and set them as the inner HTML of the id's provided
      $.get("http://jservice.io/api/random?count=3", function(data){
        $.each(data, function(index, clue){
          console.log(clue.category.title)
          console.log(clue.value)
          console.log(clue.question)
          console.log(clue.answer)
          categoryArray.push(String(clue.category.title))
          pointValueArray.push(String(clue.value))
          questionArray.push(String(clue.question))
          answerArray.push(String(clue.answer))
      })//end of for each function
      console.log(categoryArray)
      $("#category1").html(categoryArray[0])
      $("#category2").html(categoryArray[1])
      $("#category3").html(categoryArray[2])
      console.log(pointValueArray)
      console.log(questionArray)
      console.log(answerArray)
    }) //end of API call
  } //end of loadCategoriesfunction

    loadCategories()


    //functionality for loading clue based on category selected
    function loadClue(spotInArray){
      $("#category").html(categoryArray[spotInArray])
      $("#point-value").html(pointValueArray[spotInArray])
      $("#question").html(questionArray[spotInArray])
      answer = answerArray[spotInArray] //set variable of answer
      console.log(answer)
    } //end of the loadClue function

    //functionality for clicking on one of the category buttons
    //this seems repetitive but i couldn't figure out how to get the IDs of the individual buttons without doing it this way
    $("#category1").click(function(){
      console.log("button one clicked")
      loadClue(0)
    })
    $("#category2").click(function(){
      console.log("button two clicked")
      loadClue(1)
    })

    $("#category3").click(function(){
      console.log("button three clicked")
      loadClue(2)
    })

    //functionality for submit button
    $("#submit-button").click(function(){
      compareAnswer(answer)
      clearEverything()
      loadCategories()
    })

    //function to clear everything on the page except category buttons which get reloaded in the loadQuestion function
    function clearEverything() {
      $("#user-answer").val("");
      $("#category").html("");
      $("#point-value").html("");
      $("#question").html("");
      categoryArray = []
      pointValueArray = []
      questionArray = []
      answerArray = []
    }

    //function to get the user inputted answer
    function getText() {
      return $("#user-answer").val();
    }

    //function to compare user inputted answer to answer returned from API
    function compareAnswer(answer){
      if(getText() === answer){
        alert("You Answered Correctly!")
        $("#score").html(parseInt($("#score").html()) + parseInt($("#point-value").html()))
      } else {
        alert("Better luck next time...")
      }
    }

 }) // end of wait for window to load function
})() //end of self invoking function
