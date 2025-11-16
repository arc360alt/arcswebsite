var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var currentScreen = 0;
var screenSwitch;
var screenDelay = 4000;

var nextScreen = function() {
    currentScreen += 1;
    gotoScreen(currentScreen);
    screenSwitch = window.setTimeout(nextScreen, screenDelay);
}

var gotoScreen = function(i) {
    // thumbs
    $('.thumb.current').removeClass('current');
    var t = $('.thumb')[i % $('.thumb').length];
    $(t).addClass('current');

    // screen
    $('#screenshot li:visible').stop().fadeOut(500);
    $('#screen' + ((i) % $('#screenshot li').length + 1)).stop().fadeIn(500);
}

$(document).ready(function() {
    $('#screenshot li').hide();
    $('#screenshot li').first().show();
    screenSwitch = window.setTimeout(nextScreen, screenDelay);

    $('#screenshot li').each(function() {
        $(this).css('background-image', 'url(images/mobile/desktop_' + this.id + '.png)');
    });

    $('#screenshots .thumb').each(function() {
        $(this).css('background-image', 'url(images/mobile/desktop_' + this.id + '.png)');
    });

    $('.thumb').click(function(e) {
        var p = /thumb(\d+)/gi;
        var m = p.exec(e.target.id);
        currentScreen = parseInt(m[1]) - 1;
        window.clearTimeout(screenSwitch);
        screenSwitch = window.setTimeout(nextScreen, screenDelay);
        gotoScreen(parseInt(m[1]) - 1);
    });
});

}