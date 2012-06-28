// Plugins

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
log.history = log.history || [];   // store logs to an array for reference
log.history.push(arguments);
arguments.callee = arguments.callee.caller; 
if(this.console) console.log( Array.prototype.slice.call(arguments) );
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info, log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

// jQuery/helper plugins

/*!
 * HTML5 Placeholder jQuery Plugin v1.8.2
 * @link http://github.com/mathiasbynens/Placeholder-jQuery-Plugin
 * @author Mathias Bynens <http://mathiasbynens.be/>
 */
 
;(function($) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea');
	if (isInputSupported && isTextareaSupported) {
		$.fn.placeholder = function() {
			return this;
		};
		$.fn.placeholder.input = $.fn.placeholder.textarea = true;
	} else {
		$.fn.placeholder = function() {
			return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.bind('focus.placeholder', clearPlaceholder)
				.bind('blur.placeholder', setPlaceholder)
			.trigger('blur.placeholder').end();
		};
		$.fn.placeholder.input = isInputSupported;
		$.fn.placeholder.textarea = isTextareaSupported;
	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder() {
		var $input = $(this);
		if ($input.val() === $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input.hide().next().attr('id', $input.removeAttr('id').data('placeholder-id')).show().focus();
			} else {
				$input.val('').removeClass('placeholder');
			}
		}
	}

	function setPlaceholder(elem) {
		var $replacement,
		    $input = $(this),
		    $origInput = $input,
		    id = this.id;
		if ($input.val() === '') {
			if ($input.is(':password')) {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ type: 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { type: 'text' }));
					}
					$replacement
						.removeAttr('name')
						// We could just use the `.data(obj)` syntax here, but that wouldn’t work in pre-1.4.3 jQueries
						.data('placeholder-password', true)
						.data('placeholder-id', id)
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data('placeholder-textinput', $replacement)
						.data('placeholder-id', id)
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
			}
			$input.addClass('placeholder').val($input.attr('placeholder'));
		} else {
			$input.removeClass('placeholder');
		}
	}

	$(function() {
		// Look for forms
		$('form').bind('submit.placeholder', function() {
			// Clear the placeholder values so they don’t get submitted
			var $inputs = $('.placeholder', this).each(clearPlaceholder);
			setTimeout(function() {
				$inputs.each(setPlaceholder);
			}, 10);
		});
	});

	// Clear placeholder values upon page reload
	$(window).bind('unload.placeholder', function() {
		$('.placeholder').val('');
	});

}(jQuery));

/*global jQuery */
/*!	
* FitText.js 1.0
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){
	
	$.fn.fitText = function( kompressor, options ) {
	    
	    var settings = {
        'minFontSize' : Number.NEGATIVE_INFINITY,
        'maxFontSize' : Number.POSITIVE_INFINITY
      };
	
			return this.each(function(){
				var $this = $(this);              // store the object
				var compressor = kompressor || 1; // set the compressor
        
        if ( options ) { 
          $.extend( settings, options );
        }
        
        // Resizer() resizes items based on the object width divided by the compressor * 10
				var resizer = function () {
					$this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
				};

				// Call once to set.
				resizer();
				
				// Call on resize. Opera debounces their resize by default. 
      	$(window).resize(resizer);
      	
			});

	};

})( jQuery );

// Joconut

/*! Joconut - v0.1.1 - 2012-06-03
* https://github.com/vdemedes/joconut
* Copyright (c) 2012 Vadim Demedes; Licensed MIT */
var fn;window._History=function(){function a(){}return a.listeners={},a.states={},a.loaded=!1,a.init=function(){var a=this;return window.history.replaceState?(window.history.replaceState({url:location.pathname},document.title,location.pathname),this.states[location.pathname]={state:{url:location.pathname},title:document.title},window.onpopstate=function(){return a.loaded?a.emit("change",a.states[location.pathname]):a.loaded=!0}):(this.states[location.hash]={state:{url:location.pathname},title:document.title},window.onhashchange=function(){return a.emit("change",a.states[location.hash])})},a.emit=function(a,b){var c,d,e,f,g;f=this.listeners[a],g=[];for(d=0,e=f.length;d<e;d++)c=f[d],g.push(c(b));return g},a.on=function(a,b){return this.listeners[a]||(this.listeners[a]=[]),this.listeners[a].push(b)},a.push=function(a,b,c){return b&&(document.title=b),this.states[history.pushState?c:"#"+c]={state:a,title:b},history.pushState?history.pushState(a,b,c):location.hash=c},a}(),_History.init(),fn=function(a){var b,c,d,e,f;return d=new RegExp("^("+location.protocol+"//"+location.host+"|\\.|\\/|[A-Z0-9_])","i"),a.expr[":"].local=function(a){var b,c;return c=!1,b=a.attributes.href.value,d.test(b)&&(c=!0),c},b=function(b,c){var d,g,h,i;a("body").html(/<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(b)[1]),document.title=/<title>((.|\n\r])*)<\/title>/im.exec(b)[1],d=void 0;for(;;){i=/<script\b[^>]*><\/script>/gm.exec(b);if(!i)break;h=/src\=.?([A-Za-z0-9-_.\/]+).?/.exec(i[0]);if(!h)break;h=h[1],-1===e.indexOf(h)&&(e.push(h),d||(d=a("head")),d.append(i[0])),b=b.replace(i[0],"")}for(;;){i=/<link\b[^>]*\/?>/gm.exec(b);if(!i)break;if(/rel\=.?stylesheet.?/.test(i[0])){g=/href\=.?([A-Za-z0-9-_.\/]+).?/.exec(i[0]);if(!g)break;g=g[1],-1===f.indexOf(g)&&(f.push(g),d||(d=a("head")),d.append(i[0]))}b=b.replace(i[0],"")}return setTimeout(function(){a.joconut();if(c)return c()},50)},c=function(c,d){return a.ajax({cache:!1,url:c.url,type:"GET",data:c.data,success:function(a){return b(a,function(){c.history&&_History.push({url:c.url},!1,c.url);if(d)return d()})}})},_History.on("change",function(a){return c({url:a.state.url,history:!1})}),e=[],a("script").each(function(){return e.push(a(this).attr("src"))}),f=[],a("link").each(function(){return f.push(a(this).attr("href"))}),a.joconut=function(){return a("a:local").each(function(){var b;return b=a(this),b.click(function(a){var d;return a.preventDefault(),d=b.attr("href"),c({url:d,history:!0})})})},a(function(){return a.joconut()})},fn(jQuery);