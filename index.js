"use strict";
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var ANSWER_COUNT = 4; // The number of possible answers per trivia question.
var GAME_LENGTH = 9;  // The number of questions per trivia game.
var CRON_LENGTH  = 4;
var GAME_STATES = {
    CRON : "_CRONMODE",  // state where questions are asked
    TRIVIA: "_TRIVIAMODE", // Asking trivia questions.
    START: "_STARTMODE", // Entry point, start the game.
    ADVICE : "_ADVICEMODE",
    HELP: "_HELPMODE" // The user is asking for help.
};



var words = {}
words[1] = "flat. hat. tap"
words[2] = "yellow. red. blue"
words[3] = "sun . phone . run"
words[4] = "big. tip. chip"
words[5] = "john. alex. amy. paul"
words[6] = "key . tree. plane. fee"
words[7] = "word. nerd. bird. observed"
words[8] = "jane. wayne .flame . same "
words[9] = "cool . tool . fool . soul . kaboul "

var question = {}
question[1] = "What was the position of the word hat ? . one, two , or three ?"
question[2] = "What was the position of the word red ?  . one, two , or three ?"
question[3] = "What was the position of the word sun ?  . one, two , or three ?"
question[4] = "What was the position of the word big ?  . one, two , or three ?"
question[5] = "What was the position of the word john ?  . one, two , three , or four ?"
question[6] = "What was the position of the word key ? . one, two , three , or four ?"
question[7] = "What was the position of the word observed ? . one, two , three , or four ? "
question[8] = "What was the position of the word jane ? . one, two , three , or four ? "
question[9] = "What was the position of the word tool ? . . one, two , three , four , or five ?"

var responses = {}
responses[1] = "2"
responses[2] = "2"
responses[3] = "1"
responses[4] = "1"
responses[5] = "1"
responses[6] = "1"
responses[7] = "4"
responses[8] = "1"
responses[9] = "2"

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least ANSWER_COUNT answers, any extras will be shuffled in.
 */
var languageString = {
    "en": {
        "translation": {
            "GAME_NAME" : "Memory Game", // Be sure to change this for your skill.
            "HELP_MESSAGE": "I will ask you %s multiple choice questions. Respond with one of the given suggestions. " +
            "For example, say one, two, three, or four. To start a new game at any time, say, start game. ",
            "REPEAT_QUESTION_MESSAGE": "To repeat the last question, say, repeat. ",
            "ASK_MESSAGE_START": "Would you like to start playing?",
            "HELP_REPROMPT": "To give an answer to a question,  Respond with one of the given suggestions. ",
            "STOP_MESSAGE": "Would you like to keep playing?",
            "CANCEL_MESSAGE": "Ok, let\'s play again soon.",
            "NO_MESSAGE": "Ok, we\'ll play another time. Goodbye!",
            "TRIVIA_UNHANDLED": "Try saying a number between 1 and %s",
            "ADVICE_UNHANDLED" : "Sorry I didn't understand your request , do you want a food adivice , activity advice or do you want to go out ? ",
            "HELP_UNHANDLED": "Say yes to continue, or no to end the game.",
            "START_UNHANDLED": "Say start to start a new game.",
            "NEW_GAME_MESSAGE": "Welcome to %s. ",
            "APP_NAME" : "Cardif care skill",
            "WELCOME_MESSAGE": "I will tell different words each time. Than you will have to tell me in which position did i say that word . " +
            "Just say the number of the answer. Let\'s begin. ",
            "WELCOME_MESSAGE APP" : "It's nice to here you again . ",
            "ANSWER_CORRECT_MESSAGE": "correct. ",
            "ANSWER_WRONG_MESSAGE": "wrong. ",
            "CORRECT_ANSWER_MESSAGE": "The correct answer is %s: %s. ",
            "ANSWER_IS_MESSAGE": "That answer is ",
            "TELL_QUESTION_MESSAGE": "Listen . %s. %s ",
            "GAME_OVER_MESSAGE": "You Lost . You got %s out of %s questions correct. Thank you for playing! I will save the results to your medical file , to keep your doctor up to date. Just to remind you , don't forget to take your medecin at 6 clock ! . So, Do you want an activity advice , a food advice or you want me to search for an event ?",
            "SCORE_IS_MESSAGE": "Your score is %s. "
        }
    },

}

const RECOMENDATION_COLD = " I suggest you to put warm clothes in case you go out today "
const RECOMENDATION_HOT  = " I suggest you to stay at home today due to the temperature  "
const RECOMENDATION_WARM = " I suggest you to put a t-shirt in case you go out today "
const RECOMENDATION_MED  = " I suggest you to put a jacket and go out for a little hike "

const WEATHER_DESCRIPTION_COLD  = " which is pretty cold ,"
const WEATHER_DESCRIPTION_NORMAL= " which is a little bit cold ,"
const WEATHER_DESCRIPTION_WARM  = " which is warm ,"
const WEATHER_DESCRIPTION_HOT   = " which is hot ,"

const GENERAL_ADVICE_GOOD  = " You are feeling great today ! . "
const GENERAL_ADVICE_MOODY = "You are not feeling good today. Go outside for fresh air "
const GENERAL_ADVICE_SLEEP = "You did not sleep well this night . Stick to a regular bedtime. Go to sleep and get up at the same time each day, even on weekends. Your body will get used to the routine. Avoid afternoon naps. If you sleep during the day, you're more likely to stay awake at night. "
const GENERAL_ADVICE_FELL  = "You told me that you fell today. Physical activity can go a long way toward fall prevention. With your doctor's OK, consider activities such as walking, water workouts or tai chi — a gentle exercise that involves slow and graceful dance-like movements. Such activities reduce the risk of falls by improving strength, balance, coordination and flexibility."
const MEMORY_GAME_START = " . It's time for the memory game ! . are you ready to play ? "
var cron_questions = {}
cron_questions[1] = ". How did you sleep ? Good, bad or, normal ?. "
cron_questions[2] = " How do you feel today ? Happy, bad or, normal ?"
cron_questions[3] = "Did you fall today ? Yes or no ?"
var cron_answers = {}
cron_answers[1] = " Good, bad or, normal  ? "
cron_answers[2] = " Happy, sad or, normal ? "
cron_answers[3] = " Yes or no ?"
var cron_result = {}
cron_answers[1] = 1
cron_answers[2] = 1
cron_answers[3] = 0

/*------------------- NUTRITION ADVICES CONSTANTS-----------------------*/
var food1 = "Okay !. Here is the advice. eat protein-rich foods like beans, nuts, tofu, fish, chicken, or eggs in place of less-healthy options like red and processed meats . For example, try a turkey or black bean burger instead of a traditional beef burger , Or slice up a fresh-roasted chicken breast or salmon for your sandwich instead of using processed high-sodium lunch meat"
var food2 = "Okay !. Here is the advice. Don’t stress too much about protein quantity you eat. Most reasonable diets provide plenty of protein for healthy people. Eating , a variety of healthy protein-rich food , for example an egg with breakfast , some turkey or beans on your salad for lunch , and a piece of salmon or tofu with a whole grain side dish , for dinner—will ensure that you get all the protein and protein building-blocks you need. Choose higher-protein foods instead of bulking up with pricey protein shakes or powders, since some of these are loaded with sugar or other additives";
var food3 = "Okay !. Here is the advice. Try a meatless Monday—or more.  Diets high in plant-based proteins and fats can provide health benefits, so try mixing some vegetarian proteins into your meals. Going meatless can be good for your wallet as well as your health, since beans, nuts and seeds, and other minimally-processed vegetarian protein sources are often less expensive than meat. Eating plant protein in place of meat is also good for the planet.  It takes a lot of energy to raise and process animals for meat, so going meatless could help reduce pollution and has the potential to lessen climate change.";
var food_advices = {}
food_advices[1] = food1
food_advices[2] = food2
food_advices[3] = food3

function getRandomAdivce(food_advices){
    var random_number = Math.floor(Math.random() * 3) + 1
    return  food_advices[random_number]

 }

 /*-----------------------------PHYSICAL ADVICE CONSTANTS------------------------------------------*/

 var physic1 = 'Take part in at least 2.5 hours of moderate- to vigorous-intensity aerobic activity each week. Spread out the activities into sessions of 10 minutes or more. It is beneficial to add muscle and bone strengthening activities using major muscle groups at least twice a week. This will help your posture and balance.'
 var physic2 = 'Walk wherever and whenever you can. Take the stairs instead of the elevator, when possible'
 var physic3 = 'Find an activity you like such as swimming or cycling . increase your activity level 10 minutes at a time .Every little bit helps.</speak>';
 var physic_advices = {}
 physic_advices[1] = physic1
 physic_advices[2] = physic2
 physic_advices[3] = physic3

 /*-----------------------------------------------------------------------------------------------*/

var quickMeditationSSML = "Before starting, sit comfortably or lie down. Close your eyes and focus on keeping your mind blank.<break time='3s'/>Take a deep breath in through your nose. Hold it... <break time ='2s'/>Now breathe out. Good. Pay attention to the sensations you\'re feeling.<break time = '2s'/> Let\'s start with your lower body. I want you to stretch out your legs and point your toes. Squeeze your muscles and imagine them tensing up. Keep your eyes closed.<break time = '2s'/> Now, move to your torso and arms. Feel your muscles tightening and squeeze. Imagine your hands are holding lemons and try to squeeze them as much as you can. Keep your body tightened as much as possible.<break time = '3s'/> Finally, move to your head. Tighten your neck muscles and pull your shoulders to your ears. Wrinkle up your face, nose, eyes, and mouth. Notice how tight your whole body feels. Inhale...<break time = '3s'/>And exhale, relaxing every muscle in your body. Imagine your arms are spaghetti noodles. Let them hang at your side. Relax your toes and your stomach. Notice how good you feel, how relaxed and calm.<break time = '2s'/> Take deep breaths in and out. Feel the sensations of relaxation. When you are ready, you can slowly open your eyes.<break time = '2s'/> The meditation is over ,I hope that you are feeling better now !";

var Alexa = require("alexa-sdk");
var https = require('https');
var http = require('http')
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, GameStateHandlers, triviaStateHandlers,AdviceStateHandlers,AdviceHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    "LaunchRequest": function () {
        this.handler.state = GAME_STATES.CRON;    // changing the current state so we know in which state we are
        this.emitWithState("StartCron", true);    // "emitWithState"  this will take us to the intent "StartCron" existing in StartCron
    },
    "AMAZON.StartOverIntent": function() {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", true);
    },
    "AMAZON.HelpIntent": function() {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState("helpTheUser", true);
    },
    "Unhandled": function () {
       var speechOutput = this.t("START_UNHANDLED");
       this.emit(":ask", speechOutput, speechOutput);
   }
};


var startStateHandlers = Alexa.CreateStateHandler(GAME_STATES.CRON, {
    "StartCron": function () {
      httpsGet("http://api.openweathermap.org/data/2.5/weather?id=6451976&APPID=6813e663327979eb99d5fc7180a5d7f5",  (myResult) => {
              console.log("received : " + myResult);

              var name = myResult.name
              var temp = myResult.main.temp
              var converted = Math.round(temp - 273.15)
              var recommendation = getWeatherSuggestion(converted)
              var description    = getWeatherDescription(converted)
              var currentIndex = 1
              var currentQuestionText   = cron_questions[currentIndex]
              var currentSuggestion = cron_answers[currentIndex]
              //var text = 'its nice to here you again'.concat(' The temperature in your location is ' ).concat(converted).concat(" degrees . ").concat(currentQuestionText)
              var speech = "Hello ! . It's nice to hear from you again . Today the temperature in your location is "
              + converted
              + " degrees , "
              + description
              + " . that's why "
              + recommendation
              + currentQuestionText

              Object.assign(this.attributes, {
                  "currentIndex": currentIndex,
              });

              // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
              this.handler.state = GAME_STATES.CRON;
              //this.emit(":askWithCard", repromptText, repromptText, this.t("GAME_NAME"), repromptText);
              this.emit(':ask', speech , currentSuggestion);


          }
      );

    },

    "PositivAnswerIntent" : function () {
              var currentIndex     = parseInt(this.attributes.currentIndex);
              console.log("current index ")
              console.log(currentIndex)
              if (currentIndex == 4){
                this.handler.state = GAME_STATES.START;    // changing the current state so we know in which state we are
                this.emitWithState("StartGame", true);
              }else{
              cron_answers[currentIndex] = 1
              handleUserResponse.call(this, false);
                }
    },

    "NegativAnswerIntent" : function () {
              var currentIndex     = parseInt(this.attributes.currentIndex);
              if (currentIndex == 4){
              this.emit(":tell","see you next time ! ")
              }else{
              cron_answers[currentIndex] = 0
              handleUserResponse.call(this, false);
              }
    }

});

var GameStateHandlers = Alexa.CreateStateHandler(GAME_STATES.START, {
    "StartGame": function (newGame) {

        var speechOutput = newGame ? this.t("NEW_GAME_MESSAGE", this.t("GAME_NAME")) + this.t("WELCOME_MESSAGE", GAME_LENGTH.toString()) : "";
        var currentIndex = 1
        var correctAnswer  = responses[currentIndex]
        var correctAnswerIndex = currentIndex
        var currentQuestionIndex = currentIndex
        var currentSuggestionIndex = currentIndex
        var spokenQuestion = question[currentQuestionIndex]
        var words_sug = words[currentSuggestionIndex]


        var gameQuestions = question
        var repromptText = this.t("TELL_QUESTION_MESSAGE",words_sug, spokenQuestion);
        speechOutput += repromptText;

        Object.assign(this.attributes, {
            "speechOutput": repromptText,
            "repromptText": repromptText,
            "currentQuestionIndex": currentQuestionIndex,
            "correctAnswerIndex": correctAnswerIndex,
            "currentSuggestionIndex" : currentSuggestionIndex,
            "currentSuggestions" : words_sug,
            "correctAnswer" : correctAnswer,
            "currentQuestion" : spokenQuestion,
            "questions": gameQuestions,
            "score": 0,
        });

        // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
        this.handler.state = GAME_STATES.TRIVIA;
        this.emit(":askWithCard", speechOutput, repromptText, this.t("GAME_NAME"), repromptText);
    }
});

var triviaStateHandlers = Alexa.CreateStateHandler(GAME_STATES.TRIVIA, {
    "AnswerIntent": function () {
        handleUserGuess.call(this, false);
    },
    "DontKnowIntent": function () {
      var currentScore             = parseInt(this.attributes.score);
      var repromptText = this.t("GAME_OVER_MESSAGE",currentScore, GAME_LENGTH);
      this.handler.state = GAME_STATES.ADVICE;
      this.emit(":askWithCard", repromptText, repromptText, this.t("GAME_NAME"), repromptText);

    },
    "WrongAnswerIntent" : function() {
        var currentScore             = parseInt(this.attributes.score);
        var repromptText = this.t("GAME_OVER_MESSAGE",currentScore, GAME_LENGTH);
        this.handler.state = GAME_STATES.ADVICE;
        this.emit(":ask", repromptText, repromptText, this.t("GAME_NAME"), repromptText);

    },
    "AMAZON.StartOverIntent": function () {
        this.handler.state = GAME_STATES.START;
        this.emitWithState("StartGame", false);
    },
    "AMAZON.RepeatIntent": function () {
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptText"]);
    },
    "AMAZON.HelpIntent": function () {
        this.handler.state = GAME_STATES.HELP;
        this.emitWithState("helpTheUser", false);
    },
    "AMAZON.StopIntent": function () {
        this.handler.state = GAME_STATES.HELP;
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(":ask", speechOutput, speechOutput);
    },
    "AMAZON.CancelIntent": function () {
        this.emit(":tell", this.t("CANCEL_MESSAGE"));
    },
    "Unhandled": function () {
        var speechOutput = this.t("TRIVIA_UNHANDLED", ANSWER_COUNT.toString());
        this.emit(":ask", speechOutput, speechOutput);
    },
    "SessionEndedRequest": function () {
        console.log("Session ended in trivia state: " + this.event.request.reason);
    }
});

var AdviceStateHandlers =  Alexa.CreateStateHandler(GAME_STATES.ADVICE, {
  "AskEvent": function () {
    httpsGet("http://api.eventful.com/json/events/search?app_key=KDpfQBbT7nMWTprb&category=art&location=Paris&date=Today",  (myResult) => {
            var i = 0
            console.log("received : " + myResult);
            console.log(myResult.events.event[0].title)
            console.log(myResult.events.event[0].venue_name)
            // getting the events name, adress, venue and description //
          /*  while (typeof(myResult.events.event[i])!="undefined"){
                var event_name=(myResult.events.event[i].title)
                var event_adress=(myResult.events.event[i].venue_adress)
                var event_venue_name=(myResult.events.event[i].venue_name)
                var event_description=(myResult.events.event[i].description)
                var event = {name :event_name, venue:event_venue_name, location :event_adress, description:event_description};
                // art_events[j]=event
                // j=j+1
                // i=i+1

            }*/
            speech = "So today, I suggest you to go to a very awesome artistic event called. ".concat(myResult.events.event[0].title).concat(" . the event is taking place in the venue called .").concat(myResult.events.event[0].venue_name)
            this.emit(':tell', speech);


        });

  },
  "FoodAdvice": function() {
    var spch =""
    spch = getRandomAdivce(food_advices)
    this.emit(":tell",spch)

  },
  "ActivityAdvice": function() {
    var spch =""
    spch = getRandomAdivce(physic_advices)
    this.emit(":tell",spch)
  },

  "FeelingAlone" : function() {

  },

  "meditation" :  function () {
      this.emit(":tell",quickMeditationSSML)
  },

  "Unhandled": function () {
    var speechOutput = this.t("ADVICE_UNHANDLED");
    this.emit(":ask", speechOutput, speechOutput);

 }
});

var AdviceHandlers =  {
  "AskEvent": function () {

    httpsGet("http://api.eventful.com/json/events/search?app_key=KDpfQBbT7nMWTprb&category=art&location=Paris&date=Today",  (myResult) => {
            console.log("received : " + myResult);
              var i = 0
              var j = 0
              var art_events = {}
              console.log(myResult.events.event[0].title)
              console.log(myResult.events.event[0].venue_name)
            // getting the events name, adress, venue and description //
            //while (typeof(myResult.events.event[i])!="undefined"){
              //  var event_name=(myResult.events.event[i].title)
            //    var event_adress=(myResult.events.event[i].venue_adress)
            //    var event_venue_name=(myResult.events.event[i].venue_name)
          //      var event_description=(myResult.events.event[i].description)
          //      var event = {name :event_name, venue:event_venue_name, location :event_adress, description:event_description};
               //  art_events[j]=event
              //   j=j+1
              //  i=i+1

          //  }
            var speech = "So today, I suggest you to go to a very awesome artistic event called . ".concat(myResult.events.event[0].title).concat(" . the event is taking place in the venue called .").concat(myResult.events.event[0].venue_name)
            this.emit(':tell', speech);


        });

  },
  "FoodAdvice": function() {
    var spch =""
    spch = getRandomAdivce(food_advices)
    this.emit(":tell",spch)

  },
  "ActivityAdvice": function() {
    var spch =""
    spch = getRandomAdivce(physic_advices)
    this.emit(":tell",spch)

  },
  "meditation" :  function () {
      this.emit(":tell",quickMeditationSSML)
  },

  "FeelingAlone" : function() {

  },
  "Unhandled": function () {
    var speechOutput = this.t("ADVICE_UNHANDLED");
    this.emit(":ask", speechOutput, speechOutput);
 }
};


function handleUserResponse(userGaveUp) {

  var currentIndex     = parseInt(this.attributes.currentIndex);
  currentIndex       =  currentIndex + 1
  Object.assign(this.attributes, {
      "currentIndex": currentIndex,
  });

  if (currentIndex == 4){
        var result = "sleep"
        result = analyseParameters(cron_answers[2] ,cron_answers[1] , cron_answers[3]);
        if (result == "fall"){
          var speech =""
          speech = GENERAL_ADVICE_FELL.concat(" it's time for the memory game . are you ready ? ")
          this.emit(':ask', speech, speech  )
        }
        else if (result ==  "sleep"){
          var speech =""
          speech = GENERAL_ADVICE_SLEEP.concat(" it's time for the memory game . are you ready ? ")
          this.emit(':ask',speech , speech )
        }
        else if (result == "mood" ){
          var speech =""
          speech = GENERAL_ADVICE_MOODY.concat(" it's time for the memory game . are you ready ? ")
          this.emit(':ask', speech, speech)
        }
        else {
          var speech =""
          speech = GENERAL_ADVICE_GOOD.concat(" it's time for the memory game . are you ready ? ")
          this.emit(':ask', speech, speech)
        }
  }

  var currentQuestionText   = cron_questions[currentIndex]
  var currentSuggestion = cron_answers[currentIndex]
  this.emit(':ask', currentQuestionText, currentSuggestion);

}

function httpsGet(myData, callback) {
    var req = http.request(myData, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk => {
            returnData = returnData + chunk;
        });
        res.on('end', () => {
            var data = JSON.parse(returnData);
            callback(data);
            // this will execute whatever function the caller defined, with one argument
        });
    });
    req.end();

}

function getWeatherDescription(converted){
  var description =""
  if (converted <= 10) {
  return description = WEATHER_DESCRIPTION_COLD
  }
  else if (converted > 10 && converted <= 15) {
  return description = WEATHER_DESCRIPTION_NORMAL
  }
  else if (converted > 15 && converted <= 23) {
  return description = WEATHER_DESCRIPTION_WARM
  }
  else if (converted > 23 ) {
  return description = WEATHER_DESCRIPTION_HOT
  }
  return description = "unknown"
}

function getWeatherSuggestion(converted){
  var recommendation = ""
  if (converted <= 10) {
  return recommendation = RECOMENDATION_COLD
  }
  else if (converted > 10 && converted <= 15) {
  return recommendation = RECOMENDATION_MED
  }
  else if (converted > 15 && converted <= 23) {
  return recommendation = RECOMENDATION_WARM
  }
  else if (converted > 23 ) {
  return recommendation = RECOMENDATION_HOT
  }
  return recommendation = "unknown"

}

function analyseParameters(mood,sleep,fall){
      var result = "good"
      if (mood == 1 && sleep == 1 && fall == false){
              return result
      }
      else if(fall == true){
              result = "fall"
              return result
      }
      else if (sleep == 0){
              result = "sleep"
              return result
      }
      else if (mood == 0){
              result = "mood"
              return result
      }
      return result
  }

  function handleUserGuess(userGaveUp) {

    var gameQuestions            = this.attributes.questions;
    var currentQuestionIndex     = parseInt(this.attributes.currentQuestionIndex);
    var correctAnswerIndex       = parseInt(this.attributes.correctAnswerIndex);
    var currentSuggestionIndex   = parseInt(this.attributes.currentSuggestionIndex);
    var currentScore             = parseInt(this.attributes.score);
    var correctAnswerText        = this.attributes.correctAnswer;


     // this.emit(":ask", "suggestions", question[2]);
    if (parseInt(this.event.request.intent.slots.Answer.value) != correctAnswerText){
         this.emitWithState("WrongAnswerIntent", true);
    }

    else if (currentQuestionIndex == GAME_LENGTH ){
         var AllCorrect   = "Congratulations ! . You got all the answers right ! . Perfect ! I will save the results to your medical file , to keep your doctor up to date. Just to remind you , don't forget to take your medecin at 6 clock ! . So,"
         var Suggestion = " Do you want an activity advice , a food advice or you want me to search for an event ? "
         this.handler.state = GAME_STATES.ADVICE;
         this.emit(':ask', AllCorrect, Suggestion);
         //this.emit(":tell","Congratulations ! . You got all the answers right ! . Perfect ! ");
    }

    else {


    currentQuestionIndex       =  currentQuestionIndex + 1;
    var spokenQuestion         =  question[currentQuestionIndex]
    correctAnswerIndex         =  correctAnswerIndex + 1;
    var correctAnswerText      =  responses[correctAnswerIndex]
    currentSuggestionIndex     =  currentSuggestionIndex + 1;
    var words_sug              =  words[currentSuggestionIndex]
    currentScore               =  currentScore + 1







   Object.assign(this.attributes, {
            "speechOutput": "",
            "repromptText": "",
            "currentQuestionIndex": currentQuestionIndex,
            "correctAnswerIndex": correctAnswerIndex,
            "currentSuggestionIndex" : currentSuggestionIndex,
            "currentSuggestions" : words_sug,
            "correctAnswer" : correctAnswerText,
            "currentQuestion" : spokenQuestion,
            "questions": gameQuestions,
            "score": currentScore,
  })


  var repromptText = this.t("TELL_QUESTION_MESSAGE",words_sug, spokenQuestion);
  this.emit(":askWithCard", repromptText, repromptText, this.t("GAME_NAME"), repromptText);


  }
  }
