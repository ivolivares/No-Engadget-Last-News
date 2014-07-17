/* Developed by Iván Olivares R. - @ivolivares */
'use strict';
window.__IOApp = window.__IOApp || {};
(function(window){
    'use strict';
    window.__IOApp = {
    	toogleDivs 	: $("#carousel, #header-social-icons"),
		headSocials : $("#header-social-icons"),
		carousel 	: $("#carousel"),
		textDiv 	: $("#toggle-lastnews"),
		actionLink 	: $("a#goToggleLastNews"),
		s 			: window.localStorage,
		origin 		: window.location.origin,
		langEngadget: new Array('es', 'chinese', 'cn', 'japanese', 'de'),
		buttonTxtEnd: '',
		langUser 	: 'en'
    };
})(window);

var app = window.__IOApp,
	getLang 	= function()
	{
		for(var i = 0; i < app.langEngadget.length; i++)
		{
			if(app.origin.indexOf(app.langEngadget[i]) != -1)
			{
				setLang(app.langEngadget[i]);
			}
		}

		app.buttonTxtEnd = (app.langUser == 'es' ? ' Últimas Noticias' : ' Last News');
	},
	setLang 	= function(lang) { app.langUser = lang; },
	toogleLN 	= function()
	{
		getLang();
		if(app.s != "undefined") initToggleByStorage();
		showToggleText();
	},
	initToggleByStorage = function()
	{
		var show = (app.s.getItem('toggleLastNews') == "true" ? true : false);
			
			if(show)
			{
				app.toogleDivs.hide();
				app.s.setItem('toggleLastNews', false);
			}
			else
			{
				app.toogleDivs.show();
				app.s.setItem('toggleLastNews', true);
			}
			setTimeout(renameToggleText, 500);
	},
	showToggleText = function()
	{
		var htmlToggleText 	= '<div id="toggle-lastnews" style="text-align:right; margin-bottom:20px;border-top: solid 1px #979797;border-top: solid 1px rgba(151,151,151,0.38);border-bottom: solid 1px #979797;border-bottom: solid 1px rgba(151,151,151,0.38);padding: 5px 0px;"><a href="#ToggleLastNews" id="goToggleLastNews" title="'+(app.langUser == 'es' ? 'Cambiar' : 'Toggle') + app.buttonTxtEnd+'">'+app.buttonTxtEnd+'</a></div>';
			
			app.carousel.before(htmlToggleText);
			
			setTimeout(function()
			{
				$("a#goToggleLastNews").on('click', goToggle);
			}, 500);
	},
	removeToggleText = function()
	{
		if(textDiv.length > 0) textDiv.remove();
	},
	renameToggleText = function()
	{
		if(app.carousel.css("display") == 'block')
		{
			$("a#goToggleLastNews").html((app.langUser == 'es' ? 'Cerrar' : 'Close') + app.buttonTxtEnd);
		}
		else
		{
			$("a#goToggleLastNews").html((app.langUser == 'es' ? 'Abrir' : 'Open') + app.buttonTxtEnd);
		}
	},
	goToggle = function(e)
	{
		e.preventDefault();
		app.toogleDivs.slideToggle('fast', renameToggleText);
		setTimeout(function()
		{
			if(app.s != "undefined") app.s.setItem('toggleLastNews', (app.carousel.css('display') == 'none' ? true : false));
		}, 500);
	};

window.onload = toogleLN;