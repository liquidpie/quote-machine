$(document).ready( function () {

    var wheight = $(window).height();

   var quotes = [{quote : "Work hard in silence; let success make the noise", author : "Unknown"},
                 {quote : "Sometimes you have to lose the battle to win the war", author : "Unknown"},
                 {quote : "Don't cry because it's over, smile because it happened.", author : "Dr. Seuss"},
                 {quote : "You only live once, but if you do it right, once is enough.", author : "Mae West"}];

   var colors = ['#C0C0C0', '#808080', '#000000', '#FF0000', '#800000', '#808000',
                 '#008000', '#008080', '#800080', '#F08080', '#FFA07A', '#8B7B8B',
                 '#7B68EE', '#3D59AB', '#009ACD', '#66CDAA', '#838B83', '#C67171'];

   var randomIdx = function (max) {
       return Math.floor(Math.random() * (max + 1));
   }

    var elt = $('#quote');
    var timer = null;
    var currentValue = 0;
    var bar = $('#bar');
    var startProgressBar = function () {
        bar.progressbar({
            value: currentValue
        });

        currentValue += 0.06;

        if (currentValue > 100) {
            clearInterval(timer);
            currentValue = 0;
        }
    };

    var initProgressBar = function () {
        clearInterval(timer);
        currentValue = 0;
        startProgressBar();
        timer = setInterval(startProgressBar, 5);
    };

   var getQuote = function () {
       var data = null;
       $.ajax({
           url : '/nextquote',
           method : 'GET',
           async : false,
           success : function (result) {
               data = result;
           },
           error : function (xhr, ex) {
               data = quotes[randomIdx(quotes.length)];
           }
       });
       return data;
   };

   var rotateQuotes = function () {
        initProgressBar();

        var data = getQuote();
        var color = colors[randomIdx(colors.length)];
        elt.html(data.quote +
           '<span class="citation">' + data.author + '</span>');
        elt.css({'color': color,
            top : ((wheight - elt.height()) / 2) + 'px'
        });
   };

   rotateQuotes();

   setInterval(rotateQuotes, 10000);

});