/*!
 * jQuery Form Plugin
 * version: 3.50.0-2014.02.05
 * Requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: https://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a((typeof(jQuery)!="undefined")?jQuery:window.Zepto)}}(function(f){var c={};c.fileapi=f("<input type='file'/>").get(0).files!==undefined;c.formdata=window.FormData!==undefined;var e=!!f.fn.prop;f.fn.attr2=function(){if(!e){return this.attr.apply(this,arguments)}var g=this.prop.apply(this,arguments);if((g&&g.jquery)||typeof g==="string"){return g}return this.attr.apply(this,arguments)};f.fn.ajaxSubmit=function(j){if(!this.length){d("ajaxSubmit: skipping submit process - no element selected");return this}var i,C,m,o=this;if(typeof j=="function"){j={success:j}}else{if(j===undefined){j={}}}i=j.type||this.attr2("method");C=j.url||this.attr2("action");m=(typeof C==="string")?f.trim(C):"";m=m||window.location.href||"";if(m){m=(m.match(/^([^#]+)/)||[])[1]}j=f.extend(true,{url:m,success:f.ajaxSettings.success,type:i||f.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},j);var u={};this.trigger("form-pre-serialize",[this,j,u]);if(u.veto){d("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(j.beforeSerialize&&j.beforeSerialize(this,j)===false){d("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var n=j.traditional;if(n===undefined){n=f.ajaxSettings.traditional}var s=[];var E,F=this.formToArray(j.semantic,s);if(j.data){j.extraData=j.data;E=f.param(j.data,n)}if(j.beforeSubmit&&j.beforeSubmit(F,this,j)===false){d("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[F,this,j,u]);if(u.veto){d("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var y=f.param(F,n);if(E){y=(y?(y+"&"+E):E)}if(j.type.toUpperCase()=="GET"){j.url+=(j.url.indexOf("?")>=0?"&":"?")+y;j.data=null}else{j.data=y}var H=[];if(j.resetForm){H.push(function(){o.resetForm()})}if(j.clearForm){H.push(function(){o.clearForm(j.includeHidden)})}if(!j.dataType&&j.target){var l=j.success||function(){};H.push(function(q){var k=j.replaceTarget?"replaceWith":"html";f(j.target)[k](q).each(l,arguments)})}else{if(j.success){H.push(j.success)}}j.success=function(K,q,L){var J=j.context||this;for(var I=0,k=H.length;I<k;I++){H[I].apply(J,[K,q,L||o,o])}};if(j.error){var z=j.error;j.error=function(J,k,q){var I=j.context||this;z.apply(I,[J,k,q,o])}}if(j.complete){var h=j.complete;j.complete=function(I,k){var q=j.context||this;h.apply(q,[I,k,o])}}var D=f("input[type=file]:enabled",this).filter(function(){return f(this).val()!==""});var p=D.length>0;var B="multipart/form-data";var x=(o.attr("enctype")==B||o.attr("encoding")==B);var w=c.fileapi&&c.formdata;d("fileAPI :"+w);var r=(p||x)&&!w;var v;if(j.iframe!==false&&(j.iframe||r)){if(j.closeKeepAlive){f.get(j.closeKeepAlive,function(){v=G(F)})}else{v=G(F)}}else{if((p||x)&&w){v=t(F)}else{v=f.ajax(j)}}o.removeData("jqxhr").data("jqxhr",v);for(var A=0;A<s.length;A++){s[A]=null}this.trigger("form-submit-notify",[this,j]);return this;function g(K){var L=f.param(K,j.traditional).split("&");var q=L.length;var k=[];var J,I;for(J=0;J<q;J++){L[J]=L[J].replace(/\+/g," ");I=L[J].split("=");k.push([decodeURIComponent(I[0]),decodeURIComponent(I[1])])}return k}function t(q){var k=new FormData();for(var I=0;I<q.length;I++){k.append(q[I].name,q[I].value)}if(j.extraData){var L=g(j.extraData);for(I=0;I<L.length;I++){if(L[I]){k.append(L[I][0],L[I][1])}}}j.data=null;var K=f.extend(true,{},f.ajaxSettings,j,{contentType:false,processData:false,cache:false,type:i||"POST"});if(j.uploadProgress){K.xhr=function(){var M=f.ajaxSettings.xhr();if(M.upload){M.upload.addEventListener("progress",function(Q){var P=0;var N=Q.loaded||Q.position;var O=Q.total;if(Q.lengthComputable){P=Math.ceil(N/O*100)}j.uploadProgress(Q,N,O,P)},false)}return M}}K.data=null;var J=K.beforeSend;K.beforeSend=function(N,M){if(j.formData){M.data=j.formData}else{M.data=k}if(J){J.call(this,N,M)}};return f.ajax(K)}function G(af){var L=o[0],K,ab,V,ad,Y,N,Q,O,P,Z,ac,T;var ai=f.Deferred();ai.abort=function(aj){O.abort(aj)};if(af){for(ab=0;ab<s.length;ab++){K=f(s[ab]);if(e){K.prop("disabled",false)}else{K.removeAttr("disabled")}}}V=f.extend(true,{},f.ajaxSettings,j);V.context=V.context||V;Y="jqFormIO"+(new Date().getTime());if(V.iframeTarget){N=f(V.iframeTarget);Z=N.attr2("name");if(!Z){N.attr2("name",Y)}else{Y=Z}}else{N=f('<iframe name="'+Y+'" src="'+V.iframeSrc+'" />');N.css({position:"absolute",top:"-1000px",right:"-1000px"})}Q=N[0];O={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(aj){var ak=(aj==="timeout"?"timeout":"aborted");d("aborting upload... "+ak);this.aborted=1;try{if(Q.contentWindow.document.execCommand){Q.contentWindow.document.execCommand("Stop")}}catch(al){}N.attr("src",V.iframeSrc);O.error=ak;if(V.error){V.error.call(V.context,O,ak,aj)}if(ad){f.event.trigger("ajaxError",[O,V,ak])}if(V.complete){V.complete.call(V.context,O,ak)}}};ad=V.global;if(ad&&0===f.active++){f.event.trigger("ajaxStart")}if(ad){f.event.trigger("ajaxSend",[O,V])}if(V.beforeSend&&V.beforeSend.call(V.context,O,V)===false){if(V.global){f.active--}ai.reject();return ai}if(O.aborted){ai.reject();return ai}P=L.clk;if(P){Z=P.name;if(Z&&!P.disabled){V.extraData=V.extraData||{};V.extraData[Z]=P.value;if(P.type=="image"){V.extraData[Z+".x"]=L.clk_x;V.extraData[Z+".y"]=L.clk_y}}}var U=1;var R=2;function S(al){var ak=null;try{if(al.contentWindow){ak=al.contentWindow.document}}catch(aj){d("cannot get iframe.contentWindow document: "+aj)}if(ak){return ak}try{ak=al.contentDocument?al.contentDocument:al.document}catch(aj){d("cannot get iframe.contentDocument: "+aj);ak=al.document}return ak}var J=f("meta[name=csrf-token]").attr("content");var I=f("meta[name=csrf-param]").attr("content");if(I&&J){V.extraData=V.extraData||{};V.extraData[I]=J}function aa(){var ar=o.attr2("target"),an=o.attr2("action"),al="multipart/form-data",ao=o.attr("enctype")||o.attr("encoding")||al;L.setAttribute("target",Y);if(!i||/post/i.test(i)){L.setAttribute("method","POST")}if(an!=V.url){L.setAttribute("action",V.url)}if(!V.skipEncodingOverride&&(!i||/post/i.test(i))){o.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})}if(V.timeout){T=setTimeout(function(){ac=true;X(U)},V.timeout)}function ap(){try{var at=S(Q).readyState;d("state = "+at);if(at&&at.toLowerCase()=="uninitialized"){setTimeout(ap,50)}}catch(au){d("Server abort: ",au," (",au.name,")");X(R);if(T){clearTimeout(T)}T=undefined}}var aq=[];try{if(V.extraData){for(var ak in V.extraData){if(V.extraData.hasOwnProperty(ak)){if(f.isPlainObject(V.extraData[ak])&&V.extraData[ak].hasOwnProperty("name")&&V.extraData[ak].hasOwnProperty("value")){aq.push(f('<input type="hidden" name="'+V.extraData[ak].name+'">').val(V.extraData[ak].value).appendTo(L)[0])}else{aq.push(f('<input type="hidden" name="'+ak+'">').val(V.extraData[ak]).appendTo(L)[0])}}}}if(!V.iframeTarget){N.appendTo("body")}if(Q.attachEvent){Q.attachEvent("onload",X)}else{Q.addEventListener("load",X,false)}setTimeout(ap,15);try{L.submit()}catch(am){var aj=document.createElement("form").submit;aj.apply(L)}}finally{L.setAttribute("action",an);L.setAttribute("enctype",ao);if(ar){L.setAttribute("target",ar)}else{o.removeAttr("target")}f(aq).remove()}}if(V.forceSync){aa()}else{setTimeout(aa,10)}var ag,ah,ae=50,M;function X(ap){if(O.aborted||M){return}ah=S(Q);if(!ah){d("cannot access response document");ap=R}if(ap===U&&O){O.abort("timeout");ai.reject(O,"timeout");return}else{if(ap==R&&O){O.abort("server abort");ai.reject(O,"error","server abort");return}}if(!ah||ah.location.href==V.iframeSrc){if(!ac){return}}if(Q.detachEvent){Q.detachEvent("onload",X)}else{Q.removeEventListener("load",X,false)}var an="success",ar;try{if(ac){throw"timeout"}var am=V.dataType=="xml"||ah.XMLDocument||f.isXMLDoc(ah);d("isXml="+am);if(!am&&window.opera&&(ah.body===null||!ah.body.innerHTML)){if(--ae){d("requeing onLoad callback, DOM not available");setTimeout(X,250);return}}var at=ah.body?ah.body:ah.documentElement;O.responseText=at?at.innerHTML:null;O.responseXML=ah.XMLDocument?ah.XMLDocument:ah;if(am){V.dataType="xml"}O.getResponseHeader=function(aw){var av={"content-type":V.dataType};return av[aw.toLowerCase()]};if(at){O.status=Number(at.getAttribute("status"))||O.status;O.statusText=at.getAttribute("statusText")||O.statusText}var aj=(V.dataType||"").toLowerCase();var aq=/(json|script|text)/.test(aj);if(aq||V.textarea){var ao=ah.getElementsByTagName("textarea")[0];if(ao){O.responseText=ao.value;O.status=Number(ao.getAttribute("status"))||O.status;O.statusText=ao.getAttribute("statusText")||O.statusText}else{if(aq){var ak=ah.getElementsByTagName("pre")[0];var au=ah.getElementsByTagName("body")[0];if(ak){O.responseText=ak.textContent?ak.textContent:ak.innerText}else{if(au){O.responseText=au.textContent?au.textContent:au.innerText}}}}}else{if(aj=="xml"&&!O.responseXML&&O.responseText){O.responseXML=W(O.responseText)}}try{ag=k(O,aj,V)}catch(al){an="parsererror";O.error=ar=(al||an)}}catch(al){d("error caught: ",al);an="error";O.error=ar=(al||an)}if(O.aborted){d("upload aborted");an=null}if(O.status){an=(O.status>=200&&O.status<300||O.status===304)?"success":"error"}if(an==="success"){if(V.success){V.success.call(V.context,ag,"success",O)}ai.resolve(O.responseText,"success",O);if(ad){f.event.trigger("ajaxSuccess",[O,V])}}else{if(an){if(ar===undefined){ar=O.statusText}if(V.error){V.error.call(V.context,O,an,ar)}ai.reject(O,"error",ar);if(ad){f.event.trigger("ajaxError",[O,V,ar])}}}if(ad){f.event.trigger("ajaxComplete",[O,V])}if(ad&&!--f.active){f.event.trigger("ajaxStop")}if(V.complete){V.complete.call(V.context,O,an)}M=true;if(V.timeout){clearTimeout(T)}setTimeout(function(){if(!V.iframeTarget){N.remove()}else{N.attr("src",V.iframeSrc)}O.responseXML=null},100)}var W=f.parseXML||function(aj,ak){if(window.ActiveXObject){ak=new ActiveXObject("Microsoft.XMLDOM");ak.async="false";ak.loadXML(aj)}else{ak=(new DOMParser()).parseFromString(aj,"text/xml")}return(ak&&ak.documentElement&&ak.documentElement.nodeName!="parsererror")?ak:null};var q=f.parseJSON||function(aj){return window["eval"]("("+aj+")")};var k=function(ao,am,al){var ak=ao.getResponseHeader("content-type")||"",aj=am==="xml"||!am&&ak.indexOf("xml")>=0,an=aj?ao.responseXML:ao.responseText;if(aj&&an.documentElement.nodeName==="parsererror"){if(f.error){f.error("parsererror")}}if(al&&al.dataFilter){an=al.dataFilter(an,am)}if(typeof an==="string"){if(am==="json"||!am&&ak.indexOf("json")>=0){an=q(an)}else{if(am==="script"||!am&&ak.indexOf("javascript")>=0){f.globalEval(an)}}}return an};return ai}};f.fn.ajaxForm=function(g){g=g||{};g.delegation=g.delegation&&f.isFunction(f.fn.on);if(!g.delegation&&this.length===0){var h={s:this.selector,c:this.context};if(!f.isReady&&h.s){d("DOM not ready, queuing ajaxForm");f(function(){f(h.s,h.c).ajaxForm(g)});return this}d("terminating; zero elements found by selector"+(f.isReady?"":" (DOM not ready)"));return this}if(g.delegation){f(document).off("submit.form-plugin",this.selector,b).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,g,b).on("click.form-plugin",this.selector,g,a);return this}return this.ajaxFormUnbind().bind("submit.form-plugin",g,b).bind("click.form-plugin",g,a)};function b(h){var g=h.data;if(!h.isDefaultPrevented()){h.preventDefault();f(h.target).ajaxSubmit(g)}}function a(k){var j=k.target;var h=f(j);if(!(h.is("[type=submit],[type=image]"))){var g=h.closest("[type=submit]");if(g.length===0){return}j=g[0]}var i=this;i.clk=j;if(j.type=="image"){if(k.offsetX!==undefined){i.clk_x=k.offsetX;i.clk_y=k.offsetY}else{if(typeof f.fn.offset=="function"){var l=h.offset();i.clk_x=k.pageX-l.right;i.clk_y=k.pageY-l.top}else{i.clk_x=k.pageX-j.offsetLeft;i.clk_y=k.pageY-j.offsetTop}}}setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}f.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")};f.fn.formToArray=function(x,g){var w=[];if(this.length===0){return w}var l=this[0];var z=this.attr("id");var q=x?l.getElementsByTagName("*"):l.elements;var A;if(q&&!/MSIE [678]/.test(navigator.userAgent)){q=f(q).get()}if(z){A=f(":input[form="+z+"]").get();if(A.length){q=(q||[]).concat(A)}}if(!q||!q.length){return w}var r,p,o,y,m,t,k;for(r=0,t=q.length;r<t;r++){m=q[r];o=m.name;if(!o||m.disabled){continue}if(x&&l.clk&&m.type=="image"){if(l.clk==m){w.push({name:o,value:f(m).val(),type:m.type});w.push({name:o+".x",value:l.clk_x},{name:o+".y",value:l.clk_y})}continue}y=f.fieldValue(m,true);if(y&&y.constructor==Array){if(g){g.push(m)}for(p=0,k=y.length;p<k;p++){w.push({name:o,value:y[p]})}}else{if(c.fileapi&&m.type=="file"){if(g){g.push(m)}var h=m.files;if(h.length){for(p=0;p<h.length;p++){w.push({name:o,value:h[p],type:m.type})}}else{w.push({name:o,value:"",type:m.type})}}else{if(y!==null&&typeof y!="undefined"){if(g){g.push(m)}w.push({name:o,value:y,type:m.type,required:m.required})}}}}if(!x&&l.clk){var s=f(l.clk),u=s[0];o=u.name;if(o&&!u.disabled&&u.type=="image"){w.push({name:o,value:s.val()});w.push({name:o+".x",value:l.clk_x},{name:o+".y",value:l.clk_y})}}return w};f.fn.formSerialize=function(g){return f.param(this.formToArray(g))};f.fn.fieldSerialize=function(h){var g=[];this.each(function(){var m=this.name;if(!m){return}var k=f.fieldValue(this,h);if(k&&k.constructor==Array){for(var l=0,j=k.length;l<j;l++){g.push({name:m,value:k[l]})}}else{if(k!==null&&typeof k!="undefined"){g.push({name:this.name,value:k})}}});return f.param(g)};f.fn.fieldValue=function(m){for(var l=[],j=0,g=this.length;j<g;j++){var k=this[j];var h=f.fieldValue(k,m);if(h===null||typeof h=="undefined"||(h.constructor==Array&&!h.length)){continue}if(h.constructor==Array){f.merge(l,h)}else{l.push(h)}}return l};f.fieldValue=function(g,o){var j=g.name,u=g.type,w=g.tagName.toLowerCase();if(o===undefined){o=true}if(o&&(!j||g.disabled||u=="reset"||u=="button"||(u=="checkbox"||u=="radio")&&!g.checked||(u=="submit"||u=="image")&&g.form&&g.form.clk!=g||w=="select"&&g.selectedIndex==-1)){return null}if(w=="select"){var p=g.selectedIndex;if(p<0){return null}var r=[],h=g.options;var l=(u=="select-one");var q=(l?p+1:h.length);for(var k=(l?p:0);k<q;k++){var m=h[k];if(m.selected){var s=m.value;if(!s){s=(m.attributes&&m.attributes.value&&!(m.attributes.value.specified))?m.text:m.value}if(l){return s}r.push(s)}}return r}return f(g).val()};f.fn.clearForm=function(g){return this.each(function(){f("input,select,textarea",this).clearFields(g)})};f.fn.clearFields=f.fn.clearInputs=function(g){var h=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var j=this.type,i=this.tagName.toLowerCase();if(h.test(j)||i=="textarea"){this.value=""}else{if(j=="checkbox"||j=="radio"){this.checked=false}else{if(i=="select"){this.selectedIndex=-1}else{if(j=="file"){if(/MSIE/.test(navigator.userAgent)){f(this).replaceWith(f(this).clone(true))}else{f(this).val("")}}else{if(g){if((g===true&&/hidden/.test(j))||(typeof g=="string"&&f(this).is(g))){this.value=""}}}}}}})};f.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()}})};f.fn.enable=function(g){if(g===undefined){g=true}return this.each(function(){this.disabled=!g})};f.fn.selected=function(g){if(g===undefined){g=true}return this.each(function(){var h=this.type;if(h=="checkbox"||h=="radio"){this.checked=g}else{if(this.tagName.toLowerCase()=="option"){var i=f(this).parent("select");if(g&&i[0]&&i[0].type=="select-one"){i.find("option").selected(false)}this.selected=g}}})};f.fn.ajaxSubmit.debug=false;function d(){if(!f.fn.ajaxSubmit.debug){return}var g="[jquery.form] "+Array.prototype.join.call(arguments,"");if(window.console&&window.console.log){window.console.log(g)}else{if(window.opera&&window.opera.postError){window.opera.postError(g)}}}}));
(function($) {

	if (typeof _wpcf7 == 'undefined' || _wpcf7 === null)
		_wpcf7 = {};

	_wpcf7 = $.extend({ cached: 0 }, _wpcf7);

	$(function() {
		_wpcf7.supportHtml5 = $.wpcf7SupportHtml5();
		$('div.wpcf7 > form').wpcf7InitForm();
	});

	$.fn.wpcf7InitForm = function() {
		this.ajaxForm({
			beforeSubmit: function(arr, $form, options) {
				$form.wpcf7ClearResponseOutput();
				$form.find('[aria-invalid]').attr('aria-invalid', 'false');
				$form.find('img.ajax-loader').css({ visibility: 'visible' });
				return true;
			},
			beforeSerialize: function($form, options) {
				$form.find('[placeholder].placeheld').each(function(i, n) {
					$(n).val('');
				});
				return true;
			},
			data: { '_wpcf7_is_ajax_call': 1 },
			dataType: 'json',
			success: $.wpcf7AjaxSuccess,
			error: function(xhr, status, error, $form) {
				var e = $('<div class="ajax-error"></div>').text(error.message);
				$form.after(e);
			}
		});

		if (_wpcf7.cached)
			this.wpcf7OnloadRefill();

		this.wpcf7ToggleSubmit();

		this.find('.wpcf7-submit').wpcf7AjaxLoader();

		this.find('.wpcf7-acceptance').click(function() {
			$(this).closest('form').wpcf7ToggleSubmit();
		});

		this.find('.wpcf7-exclusive-checkbox').wpcf7ExclusiveCheckbox();

		this.find('.wpcf7-list-item.has-free-text').wpcf7ToggleCheckboxFreetext();

		this.find('[placeholder]').wpcf7Placeholder();

		if (_wpcf7.jqueryUi && ! _wpcf7.supportHtml5.date) {
			this.find('input.wpcf7-date[type="date"]').each(function() {
				$(this).datepicker({
					dateFormat: 'yy-mm-dd',
					minDate: new Date($(this).attr('min')),
					maxDate: new Date($(this).attr('max'))
				});
			});
		}

		if (_wpcf7.jqueryUi && ! _wpcf7.supportHtml5.number) {
			this.find('input.wpcf7-number[type="number"]').each(function() {
				$(this).spinner({
					min: $(this).attr('min'),
					max: $(this).attr('max'),
					step: $(this).attr('step')
				});
			});
		}
	};

	$.wpcf7AjaxSuccess = function(data, status, xhr, $form) {
		if (! $.isPlainObject(data) || $.isEmptyObject(data))
			return;

		var $responseOutput = $form.find('div.wpcf7-response-output');

		$form.wpcf7ClearResponseOutput();

		$form.find('.wpcf7-form-control').removeClass('wpcf7-not-valid');
		$form.removeClass('invalid spam sent failed');

		if (data.captcha)
			$form.wpcf7RefillCaptcha(data.captcha);

		if (data.quiz)
			$form.wpcf7RefillQuiz(data.quiz);

		if (data.invalids) {
			$.each(data.invalids, function(i, n) {
				$form.find(n.into).wpcf7NotValidTip(n.message);
				$form.find(n.into).find('.wpcf7-form-control').addClass('wpcf7-not-valid');
				$form.find(n.into).find('[aria-invalid]').attr('aria-invalid', 'true');
			});

			$responseOutput.addClass('wpcf7-validation-errors');
			$form.addClass('invalid');

			$(data.into).trigger('invalid.wpcf7');

		} else if (1 == data.spam) {
			$responseOutput.addClass('wpcf7-spam-blocked');
			$form.addClass('spam');

			$(data.into).trigger('spam.wpcf7');

		} else if (1 == data.mailSent) {
			$responseOutput.addClass('wpcf7-mail-sent-ok');
			$form.addClass('sent');

			if (data.onSentOk)
				$.each(data.onSentOk, function(i, n) { eval(n) });

			$(data.into).trigger('mailsent.wpcf7');

		} else {
			$responseOutput.addClass('wpcf7-mail-sent-ng');
			$form.addClass('failed');

			$(data.into).trigger('mailfailed.wpcf7');
		}

		if (data.onSubmit)
			$.each(data.onSubmit, function(i, n) { eval(n) });

		$(data.into).trigger('submit.wpcf7');

		if (1 == data.mailSent)
			$form.resetForm();

		$form.find('[placeholder].placeheld').each(function(i, n) {
			$(n).val($(n).attr('placeholder'));
		});

		$responseOutput.append(data.message).slideDown('fast');
		$responseOutput.attr('role', 'alert');

		$.wpcf7UpdateScreenReaderResponse($form, data);
	}

	$.fn.wpcf7ExclusiveCheckbox = function() {
		return this.find('input:checkbox').click(function() {
			$(this).closest('.wpcf7-checkbox').find('input:checkbox').not(this).removeAttr('checked');
		});
	};

	$.fn.wpcf7Placeholder = function() {
		if (_wpcf7.supportHtml5.placeholder)
			return this;

		return this.each(function() {
			$(this).val($(this).attr('placeholder'));
			$(this).addClass('placeheld');

			$(this).focus(function() {
				if ($(this).hasClass('placeheld'))
					$(this).val('').removeClass('placeheld');
			});

			$(this).blur(function() {
				if ('' == $(this).val()) {
					$(this).val($(this).attr('placeholder'));
					$(this).addClass('placeheld');
				}
			});
		});
	};

	$.fn.wpcf7AjaxLoader = function() {
		return this.each(function() {
			var loader = $('<img class="ajax-loader" />')
				.attr({ src: _wpcf7.loaderUrl, alt: _wpcf7.sending })
				.css('visibility', 'hidden');

			$(this).after(loader);
		});
	};

	$.fn.wpcf7ToggleSubmit = function() {
		return this.each(function() {
			var form = $(this);
			if (this.tagName.toLowerCase() != 'form')
				form = $(this).find('form').first();

			if (form.hasClass('wpcf7-acceptance-as-validation'))
				return;

			var submit = form.find('input:submit');
			if (! submit.length) return;

			var acceptances = form.find('input:checkbox.wpcf7-acceptance');
			if (! acceptances.length) return;

			submit.removeAttr('disabled');
			acceptances.each(function(i, n) {
				n = $(n);
				if (n.hasClass('wpcf7-invert') && n.is(':checked')
				|| ! n.hasClass('wpcf7-invert') && ! n.is(':checked'))
					submit.attr('disabled', 'disabled');
			});
		});
	};

	$.fn.wpcf7ToggleCheckboxFreetext = function() {
		return this.each(function() {
			var $wrap = $(this).closest('.wpcf7-form-control');

			if ($(this).find(':checkbox, :radio').is(':checked')) {
				$(this).find(':input.wpcf7-free-text').prop('disabled', false);
			} else {
				$(this).find(':input.wpcf7-free-text').prop('disabled', true);
			}

			$wrap.find(':checkbox, :radio').change(function() {
				var $cb = $('.has-free-text', $wrap).find(':checkbox, :radio');
				var $freetext = $(':input.wpcf7-free-text', $wrap);

				if ($cb.is(':checked')) {
					$freetext.prop('disabled', false).focus();
				} else {
					$freetext.prop('disabled', true);
				}
			});
		});
	};

	$.fn.wpcf7NotValidTip = function(message) {
		return this.each(function() {
			var $into = $(this);
			$into.hide().append('<span role="alert" class="wpcf7-not-valid-tip">' + message + '</span>').slideDown('fast');

			if ($into.is('.use-floating-validation-tip *')) {
				$('.wpcf7-not-valid-tip', $into).mouseover(function() {
					$(this).wpcf7FadeOut();
				});

				$(':input', $into).focus(function() {
					$('.wpcf7-not-valid-tip', $into).not(':hidden').wpcf7FadeOut();
				});
			}
		});
	};

	$.fn.wpcf7FadeOut = function() {
		return this.each(function() {
			$(this).animate({
				opacity: 0
			}, 'fast', function() {
				$(this).css({'z-index': -100});
			});
		});
	};

	$.fn.wpcf7OnloadRefill = function() {
		return this.each(function() {
			var url = $(this).attr('action');
			if (0 < url.indexOf('#'))
				url = url.substr(0, url.indexOf('#'));

			var id = $(this).find('input[name="_wpcf7"]').val();
			var unitTag = $(this).find('input[name="_wpcf7_unit_tag"]').val();

			$.getJSON(url,
				{ _wpcf7_is_ajax_call: 1, _wpcf7: id, _wpcf7_request_ver: $.now() },
				function(data) {
					if (data && data.captcha)
						$('#' + unitTag).wpcf7RefillCaptcha(data.captcha);

					if (data && data.quiz)
						$('#' + unitTag).wpcf7RefillQuiz(data.quiz);
				}
			);
		});
	};

	$.fn.wpcf7RefillCaptcha = function(captcha) {
		return this.each(function() {
			var form = $(this);

			$.each(captcha, function(i, n) {
				form.find(':input[name="' + i + '"]').clearFields();
				form.find('img.wpcf7-captcha-' + i).attr('src', n);
				var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
				form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
			});
		});
	};

	$.fn.wpcf7RefillQuiz = function(quiz) {
		return this.each(function() {
			var form = $(this);

			$.each(quiz, function(i, n) {
				form.find(':input[name="' + i + '"]').clearFields();
				form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
				form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
			});
		});
	};

	$.fn.wpcf7ClearResponseOutput = function() {
		return this.each(function() {
			$(this).find('div.wpcf7-response-output').hide().empty().removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked').removeAttr('role');
			$(this).find('span.wpcf7-not-valid-tip').remove();
			$(this).find('img.ajax-loader').css({ visibility: 'hidden' });
		});
	};

	$.wpcf7UpdateScreenReaderResponse = function($form, data) {
		$('.wpcf7 .screen-reader-response').html('').attr('role', '');

		if (data.message) {
			var $response = $form.siblings('.screen-reader-response').first();
			$response.append(data.message);

			if (data.invalids) {
				var $invalids = $('<ul></ul>');

				$.each(data.invalids, function(i, n) {
					if (n.idref) {
						var $li = $('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
					} else {
						var $li = $('<li></li>').append(n.message);
					}

					$invalids.append($li);
				});

				$response.append($invalids);
			}

			$response.attr('role', 'alert').focus();
		}
	}

	$.wpcf7SupportHtml5 = function() {
		var features = {};
		var input = document.createElement('input');

		features.placeholder = 'placeholder' in input;

		var inputTypes = ['email', 'url', 'tel', 'number', 'range', 'date'];

		$.each(inputTypes, function(index, value) {
			input.setAttribute('type', value);
			features[value] = input.type !== 'text';
		});

		return features;
	};

})(jQuery);

/*
 * jQuery Superfish Menu Plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	https://www.opensource.org/licenses/mit-license.php
 *	https://www.gnu.org/licenses/gpl.html
 */

(function ($) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
				if (ios) {
					// iOS clicks only bubble as far as body children
					$(window).load(function () {
						$('body').children().on('click', $.noop);
					});
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var touchAction = $menu.css('ms-touch-action');
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css('ms-touch-action', touchAction);
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					$ul = $this.siblings(e.data.popUpSelector);

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;
					o.onBeforeHide.call($ul);
					
					// gdlr modify
					var gdlr_input = false;
					$(this).find('input:focus').each(function(){ gdlr_input = true; });
					if(gdlr_input) return $(this);
					
					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				o.onBeforeShow.call($ul);
				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop
	};

	// soon to be deprecated
	$.fn.extend({
		hideSuperfishUl: methods.hide,
		showSuperfishUl: methods.show
	});

})(jQuery);

!function(a){a.fn.hoverIntent=function(b,c,d){var e={interval:100,sensitivity:7,timeout:0};e="object"==typeof b?a.extend(e,b):a.isFunction(c)?a.extend(e,{over:b,out:c,selector:d}):a.extend(e,{over:b,out:b,selector:c});var f,g,h,i,j=function(a){f=a.pageX,g=a.pageY},k=function(b,c){return c.hoverIntent_t=clearTimeout(c.hoverIntent_t),Math.abs(h-f)+Math.abs(i-g)<e.sensitivity?(a(c).off("mousemove.hoverIntent",j),c.hoverIntent_s=1,e.over.apply(c,[b])):(h=f,i=g,c.hoverIntent_t=setTimeout(function(){k(b,c)},e.interval),void 0)},l=function(a,b){return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=0,e.out.apply(b,[a])},m=function(b){var c=jQuery.extend({},b),d=this;d.hoverIntent_t&&(d.hoverIntent_t=clearTimeout(d.hoverIntent_t)),"mouseenter"==b.type?(h=c.pageX,i=c.pageY,a(d).on("mousemove.hoverIntent",j),1!=d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){k(c,d)},e.interval))):(a(d).off("mousemove.hoverIntent",j),1==d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){l(c,d)},e.timeout)))};return this.on({"mouseenter.hoverIntent":m,"mouseleave.hoverIntent":m},e.selector)}}(jQuery);

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: https://modernizr.com/download/#-cssanimations-csstransitions-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.cssanimations=function(){return F("animationName")},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/**
 * jquery.dlmenu.js v1.0.1
 * https://www.codrops.com
 *
 * Licensed under the MIT license.
 * https://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * https://www.codrops.com
 */
;( function( $, window, undefined ) {

	'use strict';

	// global
	var Modernizr = window.Modernizr, $body = $( 'body' );

	$.DLMenu = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.DLMenu.defaults = {
		// classes for the animation effects
		animationClasses : { classin : 'dl-animate-in-1', classout : 'dl-animate-out-1' },
		// callback: click a link that has a sub menu
		// el is the link element (li); name is the level name
		onLevelClick : function( el, name ) { return false; },
		// callback: click a link that does not have a sub menu
		// el is the link element (li); ev is the event obj
		onLinkClick : function( el, ev ) { return false; }
	};

	$.DLMenu.prototype = {
		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.DLMenu.defaults, options );
			// cache some elements and initialize some variables
			this._config();
			
			var animEndEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				},
				transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				};
			// animation end event name
			this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
			// transition end event name
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu',
			// support for css animations and css transitions
			this.supportAnimations = Modernizr.cssanimations,
			this.supportTransitions = Modernizr.csstransitions;

			this._initEvents();

		},
		_config : function() {
			this.open = false;
			this.$trigger = this.$el.children( '.dl-trigger' );
			this.$menu = this.$el.children( 'ul.dl-menu' );
			this.$menuitems = this.$menu.find( 'li:not(.dl-back)' );
			this.$el.find( 'ul.dl-submenu' ).prepend( '<li class="dl-back"><a href="#">back</a></li>' );
			this.$back = this.$menu.find( 'li.dl-back' );
		},
		_initEvents : function() {

			var self = this;

			this.$trigger.on( 'click.dlmenu', function() {
				
				if( self.open ) {
					self._closeMenu();
				} 
				else {
					self._openMenu();
				}
				return false;

			} );

			this.$menuitems.on( 'click.dlmenu', function( event ) {
				
				event.stopPropagation();

				var $item = $(this),
					$submenu = $item.children( 'ul.dl-submenu' );

				if( $submenu.length > 0 ) {

					var $flyin = $submenu.clone().css( 'opacity', 0 ).insertAfter( self.$menu ),
						onAnimationEndFn = function() {
							self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classout ).addClass( 'dl-subview' );
							$item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
							$flyin.remove();
						};

					setTimeout( function() {
						$flyin.addClass( self.options.animationClasses.classin );
						self.$menu.addClass( self.options.animationClasses.classout );
						if( self.supportAnimations ) {
							self.$menu.on( self.animEndEventName, onAnimationEndFn );
						}
						else {
							onAnimationEndFn.call();
						}

						self.options.onLevelClick( $item, $item.children( 'a:first' ).text() );
					} );

					return false;

				}
				else {
					self.options.onLinkClick( $item, event );
				}

			} );

			this.$back.on( 'click.dlmenu', function( event ) {
				
				var $this = $( this ),
					$submenu = $this.parents( 'ul.dl-submenu:first' ),
					$item = $submenu.parent(),

					$flyin = $submenu.clone().insertAfter( self.$menu );

				var onAnimationEndFn = function() {
					self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classin );
					$flyin.remove();
				};

				setTimeout( function() {
					$flyin.addClass( self.options.animationClasses.classout );
					self.$menu.addClass( self.options.animationClasses.classin );
					if( self.supportAnimations ) {
						self.$menu.on( self.animEndEventName, onAnimationEndFn );
					}
					else {
						onAnimationEndFn.call();
					}

					$item.removeClass( 'dl-subviewopen' );
					
					var $subview = $this.parents( '.dl-subview:first' );
					if( $subview.is( 'li' ) ) {
						$subview.addClass( 'dl-subviewopen' );
					}
					$subview.removeClass( 'dl-subview' );
				} );

				return false;

			} );
			
		},
		closeMenu : function() {
			if( this.open ) {
				this._closeMenu();
			}
		},
		_closeMenu : function() {
			var self = this,
				onTransitionEndFn = function() {
					self.$menu.off( self.transEndEventName );
					self._resetMenu();
				};
			
			this.$menu.removeClass( 'dl-menuopen' );
			this.$menu.addClass( 'dl-menu-toggle' );
			this.$trigger.removeClass( 'dl-active' );
			
			if( this.supportTransitions ) {
				this.$menu.on( this.transEndEventName, onTransitionEndFn );
			}
			else {
				onTransitionEndFn.call();
			}

			this.open = false;
		},
		openMenu : function() {
			if( !this.open ) {
				this._openMenu();
			}
		},
		_openMenu : function() {
			var self = this;
			// clicking somewhere else makes the menu close
			$body.off( 'click' ).on( 'click.dlmenu', function() {
				self._closeMenu() ;
			} );
			this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
				$( this ).removeClass( 'dl-menu-toggle' );
			} );
			this.$trigger.addClass( 'dl-active' );
			this.open = true;
		},
		// resets the menu to its original state (first level of options)
		_resetMenu : function() {
			this.$menu.removeClass( 'dl-subview' );
			this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.dlmenu = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'dlmenu' );
				if ( !instance ) {
					logError( "cannot call methods on dlmenu prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for dlmenu instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'dlmenu' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );

/*
 * jQuery Easing v1.3 - https://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright آ© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright آ© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * https://ricostacruz.com/jquery.transit
 * https://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);

/*
 * jQuery FlexSlider v2.2.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
        eventType = "click touchend MSPointerUp",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {},
        focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0) );
        if ( isNaN( slider.currentSlide ) ) slider.currentSlide = 0;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") slider.vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) methods.controlNav.setup();

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.setup();

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) methods.pausePlay.setup();

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) methods.asNav.setup();

        // TOUCH
        if (touch && slider.vars.touch) methods.touch();

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.click(function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().right - $(slider).scrollLeft(); // Find position of slide relative to right of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture)
                          e.currentTarget._gesture.addPointer(e.pointerId);
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' != captn && undefined != captn ) item += '<span class="' + namespace + 'caption">' + captn + '</span>';
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER: // GDLR EDIT
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append($('<div />').addClass('flex-control-nav-wrapper').append(slider.controlNavScaffold));
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            el.addEventListener('touchstart', onTouchStart, false);

            function onTouchStart(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            }

            function onTouchMove(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            }

            function onTouchEnd(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            }
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).outerHeight()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).outerHeight());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var prefixes = ['webkit','moz','ms','o'];

          if ('hidden' in document) return 'hidden';
          for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document) 
            methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
          }
          if (methods.pauseInvisible.visProp) {
            var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                else slider.pause(); //Or just pause
              }
              else {
                if(slider.started) slider.play(); //Initiated before, just play
                else (slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play(); //Didn't init before: simply init or wait for it
              }
            });
          }       
        },
        isHidden: function() {
          return document[methods.pauseInvisible.visProp] || false;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    }

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) slider.pause();

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");

        // CONTROLNAV
        if (slider.vars.controlNav) methods.controlNav.active();

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.update();

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) slider.pause();
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              slider.wrapup(dimension);
            });
          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
      }
    }
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    }

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) slider.flexAnimate(slider.getTarget("next"));
    }
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    }
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) clearInterval(slider.animatedSlides);
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    }
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    }
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    }
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    }

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);
    }

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          slider.container.append(slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true')).prepend(slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "right", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "right", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
    }


    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;
		  
		  // gdlr modify
		  if( $(window).width() < 767 ){ minItems = 1; maxItems = 1; }
		  if( $(window).width() < 419 ){ minItems = 1; maxItems = 1; }

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor((slider.w+slideMargin)/(slider.itemW+slideMargin-1));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    }


    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) methods.directionNav.update();

    }

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    }
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    }

    //FlexSlider: Initialize
    methods.init();
  }

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides:first > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard right/left keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
  }


  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  }
})(jQuery);

(function($){
		
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || 
		navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || 
		navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || 
		navigator.userAgent.match(/Windows Phone/i) ){ 
		var gdlr_touch_device = true; 
	}else{ 
		var gdlr_touch_device = false; 
	}
	
	// retrieve GET variable from url
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});	
	
	// blog nav
	function gdlr_set_item_outer_nav(){
		$('.blog-item-wrapper > .gdlr-nav-container').each(function(){
			var container = $(this).siblings('.blog-item-holder');
			var child = $(this).children();
			child.css({ 'top':container.position().top, 'bottom':'auto', height: container.height() - 50 });
		});
	}	
	
	// runs flex slider function
	$.fn.gdlr_flexslider = function(){
		if(typeof($.fn.flexslider) == 'function'){
			$(this).each(function(){
				var flex_attr = {
					animation: 'fade',
					animationLoop: true,
					prevText: '<i class="icon-angle-right" ></i>', 
					nextText: '<i class="icon-angle-left" ></i>',
					useCSS: false
				};
				
				// slide duration
				if( $(this).attr('data-pausetime') ){
					flex_attr.slideshowSpeed = parseInt($(this).attr('data-pausetime'));
				}
				if( $(this).attr('data-slidespeed') ){
					flex_attr.animationSpeed = parseInt($(this).attr('data-slidespeed'));
				}

				// set the attribute for carousel type
				if( $(this).attr('data-type') == 'carousel' ){
					flex_attr.move = 1;
					flex_attr.animation = 'slide';
					
					if( $(this).closest('.gdlr-item-no-space').length > 0 ){
						flex_attr.itemWidth = $(this).width() / parseInt($(this).attr('data-columns'));
						flex_attr.itemMargin = 0;							
					}else{
						flex_attr.itemWidth = (($(this).width() + 30) / parseInt($(this).attr('data-columns'))) - 30;
						flex_attr.itemMargin = 30;	
					}		
					
					// if( $(this).attr('data-columns') == "1" ){ flex_attr.smoothHeight = true; }
				}else{
					if( $(this).attr('data-effect') ){
						flex_attr.animation = $(this).attr('data-effect');
					}
				}
				if( $(this).attr('data-columns') ){
					flex_attr.minItems = parseInt($(this).attr('data-columns'));
					flex_attr.maxItems = parseInt($(this).attr('data-columns'));	
				}				
				
				// set the navigation to different area
				if( $(this).attr('data-nav-container') ){
					var flex_parent = $(this).parents('.' + $(this).attr('data-nav-container')).prev('.gdlr-nav-container');
					
					if( flex_parent.find('.gdlr-flex-prev').length > 0 || flex_parent.find('.gdlr-flex-next').length > 0 ){
						flex_attr.controlNav = false;
						flex_attr.directionNav = false;
						flex_attr.start = function(slider){
							flex_parent.find('.gdlr-flex-next').click(function(){
								slider.flexAnimate(slider.getTarget("next"), true);
							});
							flex_parent.find('.gdlr-flex-prev').click(function(){
								slider.flexAnimate(slider.getTarget("prev"), true);
							});
							
							gdlr_set_item_outer_nav();
							$(window).resize(function(){ gdlr_set_item_outer_nav(); });
						}
					}else{
						flex_attr.controlNav = false;
						flex_attr.controlsContainer = flex_parent.find('.nav-container');	
					}
					
				}

				$(this).flexslider(flex_attr);	
			});	
		}
	}
	
	// runs nivo slider function
	$.fn.gdlr_nivoslider = function(){
		if(typeof($.fn.nivoSlider) == 'function'){
			$(this).each(function(){
				var nivo_attr = {};
				
				if( $(this).attr('data-pausetime') ){
					nivo_attr.pauseTime = parseInt($(this).attr('data-pausetime'));
				}
				if( $(this).attr('data-slidespeed') ){
					nivo_attr.animSpeed = parseInt($(this).attr('data-slidespeed'));
				}
				if( $(this).attr('data-effect') ){
					nivo_attr.effect = $(this).attr('data-effect');
				}

				$(this).nivoSlider(nivo_attr);	
			});	
		}
	}	
	
	// runs isotope function
	$.fn.gdlr_isotope = function(){
		if(typeof($.fn.isotope) == 'function'){
			$(this).each(function(){
				var layout = ($(this).attr('data-layout'))? $(this).attr('data-layout'): 'fitRows';
				if( layout == 'fitRows' ) return;
				
				// execute isotope
				var isotope_element = $(this);
				isotope_element.children('.clear').remove();
				isotope_element.isotope({
					layoutMode: layout
				});
				
				// resize event
				$(window).resize(function(){
					isotope_element.isotope();
				});				
			});	
		}
	}
	
	// runs fancybox function
	$.fn.gdlr_fancybox = function(){
		if(typeof($.fn.fancybox) == 'function'){
			var fancybox_attr = {
				nextMethod : 'resizeIn',
				nextSpeed : 250,
				prevMethod : false,
				prevSpeed : 250,	
				helpers : { media : {} }
			};
			
			if( typeof($.fancybox.helpers.thumbs) == 'object' ){
				fancybox_attr.helpers.thumbs = { width: 50, height: 50 };
			}

			$(this).fancybox(fancybox_attr);
		}	
	}
	
	// responsive video
	$.fn.gdlr_fluid_video = function(){
		$(this).find('iframe[src^="https://www.youtube.com"], iframe[src^="//www.youtube.com"],'  +
					 'iframe[src^="https://player.vimeo.com"], iframe[src^="//player.vimeo.com"]').each(function(){

			if( ($(this).is('embed') && $(this).parent('object').length) || $(this).parent('.fluid-width-video-wrapper').length ){ return; } 
			if( !$(this).attr('id') ){ $(this).attr('id', 'gdlr-video-' + Math.floor(Math.random()*999999)); }
					 
			// ignore if inside layerslider
			if( $(this).closest('.ls-container').length <= 0 ){ 
				var ratio = $(this).height() / $(this).width();
				$(this).removeAttr('height').removeAttr('width');
				$(this).wrap('<div class="gdlr-fluid-video-wrapper"></div>').parent().css('padding-top', (ratio * 100)+"%");
			}
		
		});	
	}
	
	// pie chart
	$.fn.gdlr_pie_chart = function(){
		if(typeof($.fn.easyPieChart) == 'function'){
			$(this).each(function(){
				var gdlr_chart = $(this);
				
				$(this).easyPieChart({
					animate: 1200,
					lineWidth: gdlr_chart.attr('data-linewidth')? parseInt(gdlr_chart.attr('data-linewidth')): 8,
					size: gdlr_chart.attr('data-size')? parseInt(gdlr_chart.attr('data-size')): 155,
					barColor: gdlr_chart.attr('data-color')? gdlr_chart.attr('data-color'): '#a9e16e',
					trackColor: gdlr_chart.attr('data-bg-color')? gdlr_chart.attr('data-bg-color'): '#f2f2f2',
					backgroundColor: gdlr_chart.attr('data-background'),
					scaleColor: false,
					lineCap: 'square'
				});

				// for responsive purpose
				if($.browser.msie && (parseInt($.browser.version) <= 8)) return;
				function limit_gdlr_chart_size(){
					if( gdlr_chart.parent().width() < parseInt(gdlr_chart.attr('data-size')) ){
						var max_width = gdlr_chart.parent().width() + 'px';
						gdlr_chart.css({'max-width': max_width, 'max-height': max_width});
					}				
				}
				limit_gdlr_chart_size();
				$(window).resize(function(){ limit_gdlr_chart_size(); });
			});
		}
	}
		
	function gdlr_blog_ajax(blog_holder, ajax_info, category, paged){
		var args = new Object();
		args['num-fetch'] = ajax_info.attr('data-num-fetch');
		args['num-excerpt'] = ajax_info.attr('data-num-excerpt');
		args['order'] = ajax_info.attr('data-order');
		args['orderby'] = ajax_info.attr('data-orderby');
		args['thumbnail-size'] = ajax_info.attr('data-thumbnail-size');
		args['blog-style'] = ajax_info.attr('data-blog-style');
		args['blog-layout'] = ajax_info.attr('data-blog-layout');
		args['enable-sticky'] = ajax_info.attr('data-sticky');
		args['category'] = (category)? category: ajax_info.attr('data-category');
		args['paged'] = (paged)? paged: 1;

		// hide the un-used elements
		var animate_complete = false;
		blog_holder.slideUp(500, function(){ animate_complete = true; });
		
		var now_loading = $('<div class="gdlr-now-loading"></div>');
		now_loading.insertBefore(blog_holder);
		now_loading.slideDown();
		
		// call ajax to get portfolio item
		$.ajax({
			type: 'POST',
			url: ajax_info.attr('data-ajax'),
			data: {'action': 'gdlr_get_blog_ajax', 'args': args},
			error: function(a, b, c){ console.log(a, b, c); },
			success: function(data){
				now_loading.css('background-image','none').slideUp(function(){ $(this).remove(); });	
			
				var blog_item = $(data).hide();
				if( animate_complete ){
					gdlr_bind_blog_item(blog_holder, blog_item);
				}else{
					setTimeout(function() {
						gdlr_bind_blog_item(blog_holder, blog_item);
					}, 500);
				}	
			}
		});	
	}	
	
	function gdlr_bind_blog_item(blog_holder, blog_item){
		if( blog_holder ){ blog_holder.replaceWith(blog_item); }
		blog_item.slideDown();
		
		// bind events
		blog_item.gdlr_fluid_video();		
		blog_item.find('.flexslider').gdlr_flexslider();
		blog_item.find('.gdlr-isotope').gdlr_isotope();
		blog_item.find('[data-rel="fancybox"]').gdlr_fancybox();
		blog_item.find('.gdlr-blog-thumbnail').not('.gdlr-gallery, .gdlr-slider').hover(function(){
			$(this).find('img').transition({ scale: 1.1, duration: 200 });
		}, function(){
			$(this).find('img').transition({ scale: 1, duration: 200 });
		});	

		blog_equal_height(blog_item.find('.gdlr-isotope[data-layout="fitRows"]'));
		$(window).resize(function(){ blog_equal_height(blog_item.find('.gdlr-isotope[data-layout="fitRows"]')); });
		
		gdlr_blog_pagination(blog_item.find('.gdlr-pagination.gdlr-ajax'));
		
		// audio
		if( typeof($.fn.mediaelementplayer) == 'function' ){
			var wpme_settings = {};
			if ( typeof(_wpmejsSettings) !== 'undefined' ){ wpme_settings.pluginPath = _wpmejsSettings.pluginPath; }
			blog_item.find('audio').mediaelementplayer(wpme_settings);
		}
		blog_item.find('img').load(function(){ $(window).trigger('resize'); });			
	}

	function blog_equal_height(isotope){
		isotope.each(function(){
		
			if( $(window).width() >= 750 ){
				var max_height = 0;

				$(this).find('.gdlr-blog-grid.gdlr-item').each(function(){
					$(this).css('height','auto');
					if( max_height < $(this).height() ){
						max_height = $(this).height();
					}
				});
				$(this).find('.gdlr-blog-grid.gdlr-item').css('height', max_height);
			}else{
				$(this).find('.gdlr-blog-grid.gdlr-item').css('height', 'auto');
			}
		});
	}
	
	function gdlr_blog_pagination(pagination){
		pagination.find('a').click(function(){
			if($(this).hasClass('current')) return;
			
			var blog_holder = $(this).parents('.blog-item-holder');
			var ajax_info = blog_holder.siblings('.gdlr-ajax-info');
			
			var category = blog_holder.siblings('.blog-item-filter-wrapper');
			category = category.find('.active').attr('data-category');

			gdlr_blog_ajax(blog_holder, ajax_info, category, $(this).attr('data-paged'));
			return false;
		});	
	}

	
	
	$(document).ready(function(){
	
		// script for accordion item
		$('.gdlr-accordion-item').each(function(){
			var multiple_tab = $(this).hasClass('gdlr-multiple-tab');
			$(this).children('.accordion-tab').children('.accordion-title').click(function(){
				var current_tab = $(this).parent();
				if( current_tab.hasClass('active') ){
					current_tab.removeClass('pre-active');
					$(this).children('i').removeClass('icon-minus').addClass('icon-plus');
					$(this).siblings('.accordion-content').slideUp(function(){ current_tab.removeClass('active'); });
				}else{
					current_tab.addClass('pre-active');
					$(this).children('i').removeClass('icon-plus').addClass('icon-minus');	
					$(this).siblings('.accordion-content').slideDown(function(){ current_tab.addClass('active'); });
								
				}
				
				// close another tab if multiple tab is not allowed ( accordion )
				if( !multiple_tab ){
					current_tab.siblings().removeClass('pre-active');
					current_tab.siblings().children('.accordion-title').children('i').removeClass('icon-minus').addClass('icon-plus');
					current_tab.siblings().children('.accordion-content').slideUp(function(){ $(this).parent().removeClass('active'); });
				}
			});
		});
		
		// script for tab item
		$('.tab-title-wrapper').children().click(function(){
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			
			var selected_index = $(this).index() + 1;
			$(this).parent().siblings('.tab-content-wrapper').children(':nth-child(' + selected_index + ')').each(function(){
				$(this).siblings().removeClass('active').hide();
				$(this).fadeIn(function(){ $(this).addClass('active'); });
			})
		});		
	
		// initiate the tab when the get tab variable is sent
		var inital_tab = $.getUrlVar('tab');
		if( inital_tab ){ $('#' + inital_tab.replace(',', ', #')).each(function(){ $(this).trigger('click'); }); }
		
		// script for code item
		$('.gdlr-code-item .gdlr-code-title').click(function(){
			var parent = $(this).parent();
			if( parent.hasClass('active') ){
				$(this).children('i').removeClass('icon-minus').addClass('icon-plus');
				$(this).siblings('.gdlr-code-content').slideUp(function(){
					parent.removeClass('active');
				});	
			}else{
				$(this).children('i').removeClass('icon-plus').addClass('icon-minus');
				$(this).siblings('.gdlr-code-content').slideDown(function(){
					parent.addClass('active');	
				});				
			}
		});		
		
		// script for parallax background
		$('.gdlr-parallax-wrapper').each(function(){
			if( $(this).hasClass('gdlr-background-image') ){
				var parallax_section = $(this);
				var parallax_speed = parseFloat(parallax_section.attr('data-bgspeed'));
				if( parallax_speed == 0 || gdlr_touch_device ) return;
				if( parallax_speed == -1 ){
					parallax_section.css('background-attachment', 'fixed');
					parallax_section.css('background-position', 'center center');
					return;
				}
					
				$(window).scroll(function(){
					// if in area of interest
					if( ( $(window).scrollTop() + $(window).height() > parallax_section.offset().top ) &&
						( $(window).scrollTop() < parallax_section.offset().top + parallax_section.outerHeight() ) ){
						
						var scroll_pos = 0;
						if( $(window).height() > parallax_section.offset().top ){
							scroll_pos = $(window).scrollTop();
						}else{
							scroll_pos = $(window).scrollTop() + $(window).height() - parallax_section.offset().top;
						}
						parallax_section.css('background-position', 'center ' + (-scroll_pos * parallax_speed) + 'px');
					}
				});			
			}else if( $(this).hasClass('gdlr-background-video') ){
				if(typeof($.fn.mb_YTPlayer) == 'function'){
					$(this).children('.gdlr-bg-player').mb_YTPlayer();
				}
			}else{
				return;
			}
		});
		
		// video responsive
		$('body').gdlr_fluid_video();		
		
		// runs superfish menu
		if(typeof($.fn.superfish) == 'function'){
			
			// create the mega menu script
			$('#gdlr-main-navigation .sf-mega > ul').each(function(){	
				$(this).children('li').each(function(){
					var current_item = $(this);
					current_item.replaceWith(
						$('<div />').addClass('sf-mega-section')
									.addClass(current_item.attr('data-column'))
									.attr('data-size', current_item.attr('data-size'))
									.html(  $('<div />').addClass('sf-mega-section-inner')
														.addClass(current_item.attr('class'))
														.attr('id', current_item.attr('id'))
														.html(current_item.html())
									)		
					);
				});
				$(this).replaceWith(this.innerHTML);
			});
			
			// make every menu same height
			$('#gdlr-main-navigation .sf-mega').each(function(){
				var sf_mega = $(this); $(this).show();
				
				var row = 0; var column = 0; var max_height = 0;
				sf_mega.children('.sf-mega-section').each(function(){
					if( column % 60 == 0 ){ 
						if( row != 0 ){
							sf_mega.children('[data-row="' + row + '"]').children('.sf-mega-section-inner').height( max_height - 50 );
							max_height = 0;
						}
						row++; $(this).addClass('first-column'); 
					}		
					
					$(this).attr('data-row', row);	
					column += eval('60*' + $(this).attr('data-size'));
				
					if( $(this).height() > max_height ){
						max_height = $(this).height();
					}
				});
				
				sf_mega.children('[data-row="' + row + '"]').children('.sf-mega-section-inner').height( max_height - 50 );		
			});
			
			$('#gdlr-main-navigation').superfish({
				delay: 100, 
				speed: 'fast', 
				animation: {opacity:'show', height:'show'}
			});		
		}
		
		// responsive menu
		if(typeof($.fn.dlmenu) == 'function'){
			$('#gdlr-responsive-navigation').each(function(){
				$(this).find('.dl-submenu').each(function(){
					if( $(this).siblings('a').attr('href') && $(this).siblings('a').attr('href') != '#' ){
						var parent_nav = $('<li class="menu-item gdlr-parent-menu"></li>');
						parent_nav.append($(this).siblings('a').clone());
						
						$(this).prepend(parent_nav);
					}
				});
				$(this).dlmenu();
			});
		}	
		
		// gallery thumbnail type
		$('.gdlr-gallery-thumbnail').each(function(){
			var thumbnail_container = $(this).children('.gdlr-gallery-thumbnail-container');
		
			$(this).find('.gallery-item').click(function(){
				var selected_slide = thumbnail_container.children('[data-id="' + $(this).attr('data-id') + '"]');
				if(selected_slide.css('display') == 'block') return false;
			
				// check the gallery height
				var image_width = selected_slide.children('img').attr('width');
				var image_ratio = selected_slide.children('img').attr('height') / image_width;
				var temp_height = image_ratio * Math.min(thumbnail_container.width(), image_width);
				
				thumbnail_container.animate({'height': temp_height});
				selected_slide.fadeIn().siblings().hide();
				return false;
			});		

			$(window).resize(function(){ thumbnail_container.css('height', 'auto') });
		});

		// fancybox
		$('a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]').not('[data-rel="fancybox"]').attr('data-rel', 'fancybox');
		$('[data-rel="fancybox"]').gdlr_fancybox();
		
		// image shortcode 
		$('.gdlr-image-link-shortcode').hover(function(){
			$(this).find('.gdlr-image-link-overlay').animate({opacity: 0.8}, 150);
			$(this).find('.gdlr-image-link-icon').animate({opacity: 1}, 150);
		}, function(){
			$(this).find('.gdlr-image-link-overlay').animate({opacity: 0}, 150);
			$(this).find('.gdlr-image-link-icon').animate({opacity: 0}, 150);
		});	
		
		// Personnel
		$('.gdlr-personnel-item.round-style .personnel-item').each(function(){
			var current_item = $(this);
			function gdlr_set_round_personnel_height(){
				current_item.find('.personnel-item-inner').each(function(){
					$(this).css('margin-top', -($(this).height()/2));
				});
			}
			
			gdlr_set_round_personnel_height();
			$(window).resize(function(){
				gdlr_set_round_personnel_height();
			});
		});
		$('.gdlr-personnel-item.round-style .personnel-item').hover(function(){
			$(this).find('.personnel-author-image').animate({'opacity':0.05}, 200);
			$(this).find('.personnel-item-inner').animate({'opacity':1}, 200);
		}, function(){
			$(this).find('.personnel-author-image').animate({'opacity':1}, 200);
			$(this).find('.personnel-item-inner').animate({'opacity':0}, 200);
		});
		
		// Price Table
		$('.gdlr-price-table-item').each(function(){
			var price_table = $(this);
			
			function set_price_table_height(){
				var max_height = 0;
				var price_content = price_table.find('.price-content');
				
				price_content.css('height', 'auto');
				price_content.each(function(){
					if( max_height < $(this).height() ){ max_height = $(this).height(); }
				});
				price_content.css('height', max_height);
			}
			
			set_price_table_height()
			$(window).resize(function(){ set_price_table_height(); });
		});

		// Default text
		$('form').submit(function(){
			var has_default = false;
			$(this).find('input[data-default]').each(function(){
				if( $(this).is('#url') ){
					if( $(this).val() == $(this).attr('data-default') ) $(this).val('');
				}else{
					if( $(this).val() == $(this).attr('data-default') ) has_default = true;
				}
			});
			
			if(has_default) return false;
		});	
		
		// Search option
		$('#top-search-button').click(function(){
			$('#gdlr-nav-search-form').slideToggle(200);
			return false;
		});
		$('#gdlr-nav-search-form').click(function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else if(window.event){
				window.event.cancelBubble=true;
			}
		});
		$("html").click(function(){
			$('#gdlr-nav-search-form').slideUp(200);
		});		
		$('.search-text input[data-default], .gdlr-comments-area input[data-default]').each(function(){
			var default_value = $(this).attr("data-default");
			$(this).val(default_value);
			$(this).live("blur", function(){
				if ($(this).val() == ""){
					$(this).val(default_value);
				}	
			}).live("focus", function(){
				if ($(this).val() == default_value){
					$(this).val("");
				}
			});		
		});		

		// blog filter / hover
		$('.gdlr-blog-thumbnail').not('.gdlr-gallery').hover(function(){
			$(this).find('img').transition({ scale: 1.1, duration: 200, opacity: 0.8 });
		}, function(){
			$(this).find('img').transition({ scale: 1, duration: 200, opacity: 1 });
		});	
		$('.blog-item-filter a').click(function(){
			if($(this).hasClass('active')) return false;
			$(this).addClass('active').siblings().removeClass('active');
		
			var blog_holder = $(this).parents('.blog-item-filter-wrapper').siblings('.blog-item-holder');
			var ajax_info = blog_holder.siblings('.gdlr-ajax-info');

			gdlr_blog_ajax(blog_holder, ajax_info, $(this).attr('data-category'));
			return false;
		});
		gdlr_blog_pagination($('.gdlr-pagination.gdlr-ajax'));
	
		blog_equal_height($('.blog-item-holder .gdlr-isotope[data-layout="fitRows"]'));
		$(window).resize(function(){ blog_equal_height($('.blog-item-holder .gdlr-isotope[data-layout="fitRows"]')); });
		
		// smooth anchor
		if( window.location.hash ){
			$('html, body').animate({
				scrollTop: $(window.location.hash).offset().top - 68
			}, 500);
		}
		$('.gdlr-navigation a[href^="#"], .gdlr-responsive-navigation a[href^="#"]').click(function(){
			if( $(this).attr('href').length > 1 ){
				var item_id = $($(this).attr('href'));
				
				if( $('body').hasClass('home') ){
					if( item_id.length > 0 ){
						$('html, body').animate({
							scrollTop: item_id.offset().top - 68
						}, 500);
						return false;
					}
				}else{
					window.location.replace($('.body-wrapper').attr('data-home') + '/' + $(this).attr('href'));
				}
			}
		});	
		
		// animate ux
		if( !gdlr_touch_device && ( !$.browser.msie || (parseInt($.browser.version) > 8)) ){
		
			// image ux
			$('.content-wrapper img').each(function(){
				if( $(this).closest('.gdlr-ux, .ls-wp-container, .product, .flexslider, .nivoSlider').length ) return;
				
				var ux_item = $(this);
				if( ux_item.offset().top > $(window).scrollTop() + $(window).height() ){
					ux_item.css({ 'opacity':0 });
				}else{ return; }
				
				$(window).scroll(function(){
					if( $(window).scrollTop() + $(window).height() > ux_item.offset().top + 100 ){
						ux_item.animate({ 'opacity':1 }, 1200); 
					}
				});					
			});
		
			// item ux
			$('.gdlr-ux').each(function(){
				var ux_item = $(this);
				if( ux_item.hasClass('gdlr-chart') || ux_item.hasClass('gdlr-skill-bar') ){
					if( ux_item.offset().top < $(window).scrollTop() + $(window).height() ){
						if( ux_item.hasClass('gdlr-chart') && (!$.browser.msie || (parseInt($.browser.version) > 8)) ){
							ux_item.gdlr_pie_chart();
						}else if( ux_item.hasClass('gdlr-skill-bar') ){
							ux_item.children('.gdlr-skill-bar-progress').each(function(){
								if($(this).attr('data-percent')){
									$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
								}
							});	
						}
						return;
					}
				}else if( ux_item.offset().top > $(window).scrollTop() + $(window).height() ){
					ux_item.css({ 'opacity':0, 'padding-top':20, 'margin-bottom':-20 });
				}else{ return; }	

				$(window).scroll(function(){
					if( $(window).scrollTop() + $(window).height() > ux_item.offset().top + 100 ){
						if( ux_item.hasClass('gdlr-chart') && (!$.browser.msie || (parseInt($.browser.version) > 8)) ){
							ux_item.gdlr_pie_chart();
						}else if( ux_item.hasClass('gdlr-skill-bar') ){
							ux_item.children('.gdlr-skill-bar-progress').each(function(){
								if($(this).attr('data-percent')){
									$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
								}
							});	
						}else{
							ux_item.animate({ 'opacity':1, 'padding-top':0, 'margin-bottom':0 }, 1200);
						}
					}
				});					
			});
			
		// do not animate on scroll in mobile
		}else{
		
			// Pie chart
			if(!$.browser.msie || (parseInt($.browser.version) > 8)){
				$('.gdlr-chart').gdlr_pie_chart();
			}	

		
			// skill bar
			$('.gdlr-skill-bar-progress').each(function(){
				if($(this).attr('data-percent')){
					$(this).animate({width: $(this).attr('data-percent') + '%'}, 1200, 'easeOutQuart');
				}
			});			
		}		
		
		// runs nivoslider when available
		$('.nivoSlider').gdlr_nivoslider();		
		
		// runs flexslider when available
		$('.flexslider').gdlr_flexslider();
		
	});
	
	$(window).load(function(){

		// post slider height
		var post_slider = $('.gdlr-post-slider-item.style-no-excerpt');
		function set_post_slider_center(){
			post_slider.find('.gdlr-caption-wrapper').each(function(){
				var margin = ($(this).height() - $(this).children().height())/2;
				$(this).children().css('margin-top', margin);
				$(this).animate({'opacity': 1});
			});
		}
		set_post_slider_center();
		$(window).resize(function(){ set_post_slider_center() });

	
		// run isotope when available
		$('.gdlr-isotope').gdlr_isotope();	
		
		// run pie chart for ie8 and below
		if($.browser.msie && (parseInt($.browser.version) <= 8)){
			$('.gdlr-chart').gdlr_pie_chart();
		}	
		
		// sliding nav
		var slide_nav = $('#gdlr-navigation-gimmick');
		var current_pos = 0;
		var current_menu_width = 0;
		
		function init_navigation_sliding_bar(){
			$('#gdlr-main-navigation > ul > li.current-menu-item, #gdlr-main-navigation > ul > li.current-menu-ancestor, #gdlr-main-navigation > ul > li.current_page_item, #gdlr-main-navigation > ul > li.current_page_ancestor').each(function(){
				var padding = parseInt( $(this).children('a').css('padding-left') );
				if(!$(this).is(':first-child')){ padding += 30; }	
				
				current_pos = $(this).position().right + padding;
				current_menu_width = $(this).width() - padding;

				slide_nav.css({'width': current_menu_width, 'right': current_pos});
			});
		}
		init_navigation_sliding_bar();
		$(window).resize(function(){ init_navigation_sliding_bar(); });
			
		$('#gdlr-main-navigation > ul > li').hover(function(){
			var padding = parseInt( $(this).children('a').css('padding-left') );
			if(!$(this).is(':first-child')){ padding += 30; }		
		
			slide_nav.animate({ 'width': jQuery(this).width() - padding, 'right': jQuery(this).position().right + padding}, 
				{ queue: false, easing: 'easeOutQuad', duration: 250 });			
		}, function(){
			slide_nav.animate({ 'width': current_menu_width, 'right': current_pos }, 
				{ queue: false, easing: 'easeOutQuad', duration: 250 });		
		});	
		
		// float menu
		$('.body-wrapper.float-menu').each(function(){
			var sub_area = $('#gdlr-navigation-substitute');
			var main_area = sub_area.siblings('#gdlr-navigation-outer-wrapper');		
				
			$(window).scroll(function(){
				if( main_area.hasClass('gdlr-fixed-nav') && 
					($(this).scrollTop() <= sub_area.offset().top - parseInt($('html').css('margin-top')) || $(this).width() < 959)){
					
					main_area.removeClass('gdlr-fixed-nav');				
					sub_area.css({'height': 'auto'});
					
				}else if( !main_area.hasClass('gdlr-fixed-nav') && $(this).width() > 959 &&
					$(this).scrollTop() > main_area.offset().top - parseInt($('html').css('margin-top')) ){
						
						main_area.addClass('gdlr-fixed-nav');
						sub_area.css({'height': main_area.height()});
				}				
			});
		});			
		
		$(window).trigger('resize');
		$(window).trigger('scroll');
	});

})(jQuery);

/*!
 * Master Slider â€“ Responsive Touch Swipe Slider
 * @author Averta (www.averta.net)
 * Copyright آ© All Rights Reserved, Averta Ltd.
 *
 * @version 1.7.2
 * @date July 2014
 */
window.averta={},function(n){function o(){var t,n,i;if("result"in arguments.callee)return arguments.callee.result;t=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,n=document.getElementsByTagName("script")[0];for(i in n.style)if(t.test(i))return arguments.callee.result=i.match(t)[0];return arguments.callee.result="WebkitOpacity"in n.style?"Webkit":"KhtmlOpacity"in n.style?"Khtml":""}function r(n){var u=document.body||document.documentElement,r=u.style,t=n,i;if(typeof r[t]=="string")return!0;for(v=["Moz","Webkit","Khtml","O","ms"],t=t.charAt(0).toUpperCase()+t.substr(1),i=0;i<v.length;i++)if(typeof r[v[i]+t]=="string")return!0;return!1}function s(){return r("transition")}function u(){return r("transform")}function h(){var n,t,r,i;if(!u())return!1;n=document.createElement("i"),r={WebkitTransform:"-webkit-transform",OTransform:"-o-transform",MSTransform:"-ms-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",Transform:"transform",transform:"transform"},n.style.display="block",document.body.insertBefore(n,null);for(i in r)n.style[i]!==undefined&&(n.style[i]="translate3d(1px,1px,1px)",t=window.getComputedStyle(n).getPropertyValue(r[i]));return document.body.removeChild(n),t!=null&&t.length>0&&t!=="none"}var t,i,f,e;window.package=function(n){window[n]||(window[n]={})},t=function(n,t){for(var i in t)n[i]=t[i]},Function.prototype.extend=function(n){typeof n.prototype.constructor=="function"?(t(this.prototype,n.prototype),this.prototype.constructor=this):(this.prototype.extend(n),this.prototype.constructor=this)},i={Moz:"-moz-",Webkit:"-webkit-",Khtml:"-khtml-",O:"-o-",ms:"-ms-",Icab:"-icab-"},n(document).ready(function(){window._jcsspfx=o(),window._csspfx=i[window._jcsspfx],window._cssanim=s(),window._css3d=h(),window._css2d=u(),window._mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),window._touch="ontouchstart"in document}),window.parseQueryString=function(n){var t={};return n.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function(n,i,r,u){t[i]=u}),t},f=50/3,window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,f)}}()),window.getComputedStyle||(window.getComputedStyle=function(n){return this.el=n,this.getPropertyValue=function(t){var i=/(\-([a-z]){1})/g;return t=="float"&&(t="styleFloat"),i.test(t)&&(t=t.replace(i,function(){return arguments[2].toUpperCase()})),n.currentStyle[t]?n.currentStyle[t]:null},n.currentStyle}),Array.prototype.indexOf||(Array.prototype.indexOf=function(n){var i=this.length>>>0,t=Number(arguments[1])||0;for(t=t<0?Math.ceil(t):Math.floor(t),t<0&&(t+=i);t<i;t++)if(t in this&&this[t]===n)return t;return-1}),jQuery&&(n.jqLoadFix=function(){if(this.complete){var t=this;setTimeout(function(){n(t).load()},1)}},jQuery.uaMatch=jQuery.uaMatch||function(n){n=n.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(n)||/(webkit)[ \/]([\w.]+)/.exec(n)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n)||/(msie) ([\w.]+)/.exec(n)||n.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n)||[];return{browser:t[1]||"",version:t[2]||"0"}},matched=jQuery.uaMatch(navigator.userAgent),browser={},matched.browser&&(browser[matched.browser]=!0,browser.version=matched.version),browser.chrome?browser.webkit=!0:browser.webkit&&(browser.safari=!0),e=!!navigator.userAgent.match(/Trident\/7\./),e&&(browser.msie="true",delete browser.mozilla),jQuery.browser=browser,n.fn.preloadImg=function(t,i){return this.each(function(){var u=n(this),f=this,r=new Image;r.onload=function(n){n==null&&(n={}),u.attr("src",t),n.width=r.width,n.height=r.height,setTimeout(function(){i.call(f,n)},50),r=null},r.src=t}),this})}(jQuery),function(){"use strict";averta.EventDispatcher=function(){this.listeners={}},averta.EventDispatcher.extend=function(n){var i=new averta.EventDispatcher,t;for(t in i)t!="constructor"&&(n[t]=averta.EventDispatcher.prototype[t])},averta.EventDispatcher.prototype={constructor:averta.EventDispatcher,addEventListener:function(n,t,i){this.listeners[n]||(this.listeners[n]=[]),this.listeners[n].push({listener:t,ref:i})},removeEventListener:function(n,t,i){if(this.listeners[n]){for(var r=0,u=this.listeners[n].length;r<u;++r)t==this.listeners[n][r].listener&&i==this.listeners[n][r].ref&&this.listeners[n].splice(r,0);this.listeners[n].length==0&&delete this.listeners[n]}},dispatchEvent:function(n){if(n.target=this,this.listeners[n.type])for(var t=0,i=this.listeners[n.type].length;t<i;++t)this.listeners[n.type][t].listener.call(this.listeners[n.type][t].ref,n)}}}(),function(n){"use strict";var t="ontouchstart"in document,u=window.navigator.pointerEnabled,f=!u&&window.navigator.msPointerEnabled,r=u||f,h=(u?"pointerdown ":"")+(f?"MSPointerDown ":"")+(t?"touchstart ":"")+"mousedown",e=(u?"pointermove ":"")+(f?"MSPointerMove ":"")+(t?"touchmove ":"")+"mousemove",o=(u?"pointerup ":"")+(f?"MSPointerUp ":"")+(t?"touchend ":"")+"mouseup",s=(u?"pointercancel ":"")+(f?"MSPointerCancel ":"")+"touchcancel",i;averta.TouchSwipe=function(n){this.$element=n,this.enabled=!0,n.bind(h,{target:this},this.__touchStart),n[0].swipe=this,this.onSwipe=null,this.swipeType="horizontal",this.lastStatus={}},i=averta.TouchSwipe.prototype,i.getDirection=function(n,t){switch(this.swipeType){case"horizontal":return n<=this.start_x?"right":"left";case"vertical":return t<=this.start_y?"up":"down";case"all":return Math.abs(n-this.start_x)>Math.abs(t-this.start_y)?n<=this.start_x?"right":"left":t<=this.start_y?"up":"down"}},i.priventDefultEvent=function(n,t){var r=Math.abs(n-this.start_x),u=Math.abs(t-this.start_y),i=r>u;return this.swipeType==="horizontal"&&i||this.swipeType==="vertical"&&!i},i.createStatusObject=function(n){var t={},i,r;return i=this.lastStatus.distanceX||0,r=this.lastStatus.distanceY||0,t.distanceX=n.pageX-this.start_x,t.distanceY=n.pageY-this.start_y,t.moveX=t.distanceX-i,t.moveY=t.distanceY-r,t.distance=parseInt(Math.sqrt(Math.pow(t.distanceX,2)+Math.pow(t.distanceY,2))),t.duration=(new Date).getTime()-this.start_time,t.direction=this.getDirection(n.pageX,n.pageY),t},i.__reset=function(n,i){this.reset=!1,this.lastStatus={},this.start_time=(new Date).getTime(),this.start_x=t?n.touches[0].pageX:r?n.pageX:i.pageX,this.start_y=t?n.touches[0].pageY:r?n.pageY:i.pageY},i.__touchStart=function(i){var u=i.data.target,f=i,c,h;if(u.enabled){if(i=i.originalEvent,r&&n(this).css("-ms-touch-action",u.swipeType==="horizontal"?"pan-y":"pan-x"),!u.onSwipe){n.error("Swipe listener is undefined");return}u.touchStarted||(u.start_x=t?i.touches[0].pageX:r?i.pageX:f.pageX,u.start_y=t?i.touches[0].pageY:r?i.pageY:f.pageY,u.start_time=(new Date).getTime(),n(document).bind(o,{target:u},u.__touchEnd).bind(e,{target:u},u.__touchMove).bind(s,{target:u},u.__touchCancel),c=t?i.touches[0]:r?i:f,h=u.createStatusObject(c),h.phase="start",u.onSwipe.call(null,h),t||f.preventDefault(),u.lastStatus=h,u.touchStarted=!0)}},i.__touchMove=function(n){var i=n.data.target,e=n,u,f;(n=n.originalEvent,i.touchStarted)&&(clearTimeout(i.timo),i.timo=setTimeout(function(){i.__reset(n,e)},60),u=t?n.touches[0]:r?n:e,f=i.createStatusObject(u),i.priventDefultEvent(u.pageX,u.pageY)&&e.preventDefault(),f.phase="move",i.lastStatus=f,i.onSwipe.call(null,f))},i.__touchEnd=function(i){var u=i.data.target,h=i,c,f;i=i.originalEvent,clearTimeout(u.timo),c=t?i.touches[0]:r?i:h,f=u.lastStatus,t||h.preventDefault(),f.phase="end",u.touchStarted=!1,u.priventEvt=null,n(document).unbind(o,u.__touchEnd).unbind(e,u.__touchMove).unbind(s,u.__touchCancel),f.speed=f.distance/f.duration,u.onSwipe.call(null,f)},i.__touchCancel=function(n){var t=n.data.target;t.__touchEnd(n)},i.enable=function(){this.enabled||(this.enabled=!0)},i.disable=function(){this.enabled&&(this.enabled=!1)}}(jQuery),function(){"use strict";var u;averta.Ticker=function(){};var t=averta.Ticker,n=[],i=0,r=!0;t.add=function(r,u){return n.push([r,u]),n.length===1&&t.start(),i=n.length},t.remove=function(r,u){for(var f=0,e=n.length;f<e;++f)n[f]&&n[f][0]===r&&n[f][1]===u&&n.splice(f,1);i=n.length,i===0&&t.stop()},t.start=function(){r&&(r=!1,u())},t.stop=function(){r=!0},u=function(){var f,r;if(!t.__stopped){for(r=0;r!==i;r++)f=n[r],f[0].call(f[1]);requestAnimationFrame(u)}}}(),function(){"use strict";Date.now||(Date.now=function(){return(new Date).getTime()}),averta.Timer=function(n,t){this.delay=n,this.currentCount=0,this.paused=!1,this.onTimer=null,this.refrence=null,t&&this.start()},averta.Timer.prototype={constructor:averta.Timer,start:function(){this.paused=!1,this.lastTime=Date.now(),averta.Ticker.add(this.update,this)},stop:function(){this.paused=!0,averta.Ticker.remove(this.update,this)},reset:function(){this.currentCount=0,this.paused=!0,this.lastTime=Date.now()},update:function(){this.paused||Date.now()-this.lastTime<this.delay||(this.currentCount++,this.lastTime=Date.now(),this.onTimer&&this.onTimer.call(this.refrence,this.getTime()))},getTime:function(){return this.delay*this.currentCount}}}(),function(){"use strict";var n;window.CSSTween=function(n,t,i,r){this.$element=n,this.duration=t||1e3,this.delay=i||0,this.ease=r||"linear"},n=CSSTween.prototype,n.to=function(n,t){return this.to_cb=n,this.to_cb_target=t,this},n.from=function(n,t){return this.fr_cb=n,this.fr_cb_target=t,this},n.onComplete=function(n,t){return this.oc_fb=n,this.oc_fb_target=t,this},n.chain=function(n){return this.chained_tween=n,this},n.reset=function(){clearTimeout(this.start_to),clearTimeout(this.end_to)},n.start=function(){clearTimeout(this.start_to),clearTimeout(this.end_to),this.fresh=!0,this.fr_cb&&(this.$element.css(window._jcsspfx+"TransitionDuration","0ms"),this.fr_cb.call(this.fr_cb_target));var n=this;return this.onTransComplete=function(){n.fresh&&(n.reset(),this.$element.css(window._jcsspfx+"TransitionDuration","").css(window._jcsspfx+"TransitionProperty","").css(window._jcsspfx+"TransitionTimingFunction","").css(window._jcsspfx+"TransitionDelay",""),n.fresh=!1,n.chained_tween&&n.chained_tween.start(),n.oc_fb&&n.oc_fb.call(n.oc_fb_target))},this.start_to=setTimeout(function(){n.$element.css(window._jcsspfx+"TransitionDuration",n.duration+"ms").css(window._jcsspfx+"TransitionProperty","all"),n.delay>0?n.$element.css(window._jcsspfx+"TransitionDelay",n.delay+"ms"):n.$element.css(window._jcsspfx+"TransitionDelay",""),n.ease!="linear"&&n.$element.css(window._jcsspfx+"TransitionTimingFunction",n.ease),n.to_cb&&n.to_cb.call(n.to_cb_target),n.end_to=setTimeout(function(){n.onTransComplete()},n.duration+(n.delay||0))},100),this}}(),function(){"use strict";function t(t,i){var r,u,f;return(i.x!==undefined||i.y!==undefined)&&(n?(r=window._jcsspfx+"Transform",i.x!==undefined&&(i[r]=(i[r]||"")+" translateX("+i.x+"px)",delete i.x),i.y!==undefined&&(i[r]=(i[r]||"")+" translateY("+i.y+"px)",delete i.y)):(i.x!==undefined&&(u=t.css("right")!=="auto"?"left":"right",i[u]=i.x+"px",delete i.x),i.y!==undefined&&(f=t.css("bottom")!=="auto"?"bottom":"top",i[f]=i.y+"px",delete i.y))),i}var n=null;window.CTween={},CTween.setPos=function(n,i){n.css(t(n,i))},CTween.animate=function(i,r,u,f){var e,o;if(n==null&&(n=window._cssanim),f=f||{},t(i,u),n){if(e=new CSSTween(i,r,f.delay,EaseDic[f.ease]),e.to(function(){i.css(u)}),f.complete)e.onComplete(f.complete,f.target);return e.start(),e.stop=e.reset,e}return f.delay&&i.delay(f.delay),f.complete&&(o=function(){f.complete.call(f.target)}),i.stop(!0).animate(u,r,f.ease||"linear",o),i},CTween.fadeOut=function(n,t,i){var r={};i&&(r.complete=function(){n.remove()}),CTween.animate(n,t||1e3,{opacity:0},r)},CTween.fadeIn=function(n,t){n.css("opacity",0),CTween.animate(n,t||1e3,{opacity:1})}}(),function(){window.EaseDic={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInCubic:"cubic-bezier(.55,.055,.675,.19)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"}}(),function(){"use strict";window.MSAligner=function(n,t,i){this.$container=t,this.$img=i,this.type=n||"stretch",this.widthOnly=!1,this.heightOnly=!1};var n=MSAligner.prototype;n.init=function(n,t){this.baseWidth=n,this.baseHeight=t,this.imgRatio=n/t,this.imgRatio2=t/n;switch(this.type){case"tile":this.$container.css("background-image","url("+this.$img.attr("src")+")"),this.$img.remove();break;case"center":this.$container.css("background-image","url("+this.$img.attr("src")+")"),this.$container.css({backgroundPosition:"center center",backgroundRepeat:"no-repeat"}),this.$img.remove();break;case"stretch":this.$img.css({width:"100%",height:"100%"});break;case"fill":case"fit":this.needAlign=!0,this.align()}},n.align=function(){if(this.needAlign){var n=this.$container.width(),t=this.$container.height(),i=n/t;this.type=="fill"?this.imgRatio<i?(this.$img.width(n),this.$img.height(n*this.imgRatio2)):(this.$img.height(t),this.$img.width(t*this.imgRatio)):this.type=="fit"&&(this.imgRatio<i?(this.$img.height(t),this.$img.width(t*this.imgRatio)):(this.$img.width(n),this.$img.height(n*this.imgRatio2))),this.setMargin()}},n.setMargin=function(){var n=this.$container.width(),t=this.$container.height();this.$img.css("margin-top",(t-this.$img[0].offsetHeight)/2+"px"),this.$img.css("margin-right",(n-this.$img[0].offsetWidth)/2+"px")}}(),function(){"use strict";var t={bouncing:!0,snapping:!1,snapsize:null,friction:.05,outFriction:.05,outAcceleration:.09,minValidDist:.3,snappingMinSpeed:2,paging:!1,endless:!1,maxSpeed:160},i=function(n,i,r){if(i===null||n===null)throw new Error("Max and Min values are required.");this.options=r||{};for(var u in t)u in this.options||(this.options[u]=t[u]);this._max_value=i,this._min_value=n,this.value=n,this.end_loc=n,this.current_snap=this.getSnapNum(n),this.__extrStep=0,this.__extraMove=0,this.__animID=-1},n=i.prototype;n.changeTo=function(n,t,i,r,u){if(this.stopped=!1,this._internalStop(),n=this._checkLimits(n),i=Math.abs(i||0),this.options.snapping&&(r=r||this.getSnapNum(n),u!==!1&&this._callsnapChange(r),this.current_snap=r),t){this.animating=!0;var f=this,e=++f.__animID,h=n-f.value,c=0,l=n,o=1-f.options.friction,a=o+(i-20)*o*1.3/f.options.maxSpeed,s=function(){if(e===f.__animID){var t=n-f.value;if(Math.abs(t)>f.options.minValidDist&&f.animating)window.requestAnimationFrame(s);else{f.animating&&(f.value=n,f._callrenderer()),f.animating=!1,e!==f.__animID&&(f.__animID=-1),f._callonComplete("anim");return}f.value=l-h*Math.exp(-++c*a),f._callrenderer()}};s();return}this.value=n,this._callrenderer()},n.drag=function(n){this.start_drag&&(this.drag_start_loc=this.value,this.start_drag=!1),this.animating=!1,this._deceleration=!1,this.value-=n,!this.options.endless&&(this.value>this._max_value||this.value<0)?this.options.bouncing?(this.__isout=!0,this.value+=n*.6):this.value=this.value>this._max_value?this._max_value:0:!this.options.endless&&this.options.bouncing&&(this.__isout=!1),this._callrenderer()},n.push=function(n){if(this.stopped=!1,this.options.snapping&&Math.abs(n)<=this.options.snappingMinSpeed){this.cancel();return}if(this.__speed=n,this.__startSpeed=n,this.end_loc=this._calculateEnd(),this.options.snapping){var t=this.getSnapNum(this.value),i=this.getSnapNum(this.end_loc);if(this.options.paging){t=this.getSnapNum(this.drag_start_loc),this.__isout=!1,n>0?this.gotoSnap(t+1,!0,n):this.gotoSnap(t-1,!0,n);return}if(t===i){this.cancel();return}this._callsnapChange(i),this.current_snap=i}this.animating=!1,this.__needsSnap=this.options.endless||this.end_loc>this._min_value&&this.end_loc<this._max_value,this.options.snapping&&this.__needsSnap&&(this.__extraMove=this._calculateExtraMove(this.end_loc)),this._startDecelaration()},n.bounce=function(n){this.animating||(this.stopped=!1,this.animating=!1,this.__speed=n,this.__startSpeed=n,this.end_loc=this._calculateEnd(),this._startDecelaration())},n.stop=function(){this.stopped=!0,this._internalStop()},n.cancel=function(){this.start_drag=!0,this.__isout?(this.__speed=.0004,this._startDecelaration()):this.options.snapping&&this.gotoSnap(this.getSnapNum(this.value),!0)},n.renderCallback=function(n,t){this.__renderHook={fun:n,ref:t}},n.snappingCallback=function(n,t){this.__snapHook={fun:n,ref:t}},n.snapCompleteCallback=function(n,t){this.__compHook={fun:n,ref:t}},n.getSnapNum=function(n){return Math.floor((n+this.options.snapsize/2)/this.options.snapsize)},n.nextSnap=function(){this._internalStop();var n=this.getSnapNum(this.value);!this.options.endless&&(n+1)*this.options.snapsize>this._max_value?(this.__speed=8,this.__needsSnap=!1,this._startDecelaration()):this.gotoSnap(n+1,!0)},n.prevSnap=function(){this._internalStop();var n=this.getSnapNum(this.value);!this.options.endless&&(n-1)*this.options.snapsize<this._min_value?(this.__speed=-8,this.__needsSnap=!1,this._startDecelaration()):this.gotoSnap(n-1,!0)},n.gotoSnap=function(n,t,i){this.changeTo(n*this.options.snapsize,t,i,n)},n.destroy=function(){this._internalStop(),this.__renderHook=null,this.__snapHook=null,this.__compHook=null},n._internalStop=function(){this.start_drag=!0,this.animating=!1,this._deceleration=!1,this.__extrStep=0},n._calculateExtraMove=function(n){var t=n%this.options.snapsize;return t<this.options.snapsize/2?-t:this.options.snapsize-t},n._calculateEnd=function(n){for(var t=this.__speed,i=this.value,r=0;Math.abs(t)>this.options.minValidDist;)i+=t,t*=this.options.friction,r++;return n?r:i},n._checkLimits=function(n){return this.options.endless?n:n<this._min_value?this._min_value:n>this._max_value?this._max_value:n},n._callrenderer=function(){this.__renderHook&&this.__renderHook.fun.call(this.__renderHook.ref,this,this.value)},n._callsnapChange=function(n){this.__snapHook&&n!==this.current_snap&&this.__snapHook.fun.call(this.__snapHook.ref,this,n,n-this.current_snap)},n._callonComplete=function(n){this.__compHook&&!this.stopped&&this.__compHook.fun.call(this.__compHook.ref,this,this.current_snap,n)},n._computeDeceleration=function(){var t,n;this.options.snapping&&this.__needsSnap?(t=(this.__startSpeed-this.__speed)/this.__startSpeed*this.__extraMove,this.value+=this.__speed+t-this.__extrStep,this.__extrStep=t):this.value+=this.__speed,this.__speed*=this.options.friction,this.options.endless||this.options.bouncing||(this.value<=this._min_value?(this.value=this._min_value,this.__speed=0):this.value>=this._max_value&&(this.value=this._max_value,this.__speed=0)),this._callrenderer(),!this.options.endless&&this.options.bouncing&&(n=0,this.value<this._min_value?n=this._min_value-this.value:this.value>this._max_value&&(n=this._max_value-this.value),this.__isout=Math.abs(n)>=this.options.minValidDist,this.__isout&&(this.__speed*n<=0?this.__speed+=n*this.options.outFriction:this.__speed=n*this.options.outAcceleration))},n._startDecelaration=function(){if(!this._deceleration){this._deceleration=!0;var n=this,t=function(){n._deceleration&&(n._computeDeceleration(),Math.abs(n.__speed)>n.options.minValidDist||n.__isout?window.requestAnimationFrame(t):(n._deceleration=!1,n.__isout=!1,n.value=this.__needsSnap&&n.options.snapping&&!n.options.paging?n._checkLimits(n.end_loc+n.__extraMove):Math.round(n.value),n._callrenderer(),n._callonComplete("decel")))};t()}},window.Controller=i}(),function(n){window.MSLayerEffects={};var i,t={opacity:0};MSLayerEffects.setup=function(){if(!i){i=!0;var r=MSLayerEffects,u=window._jcsspfx+"Transform",f=window._jcsspfx+"TransformOrigin",e=n.browser.opera;_2d=window._css2d&&window._cssanim&&!e,r.defaultValues={right:0,top:0,opacity:1,left:0,bottom:0},r.defaultValues[u]="",r.rf=1,r.presetEffParams={random:"30|300",long:300,short:30,"false":!1,"true":!0,tl:"top right",bl:"bottom right",tr:"top left",br:"bottom left",rt:"top left",lb:"bottom right",lt:"top right",rb:"bottom left",t:"top",b:"bottom",r:"left",l:"right",c:"center"},r.fade=function(){return t},r.right=_2d?function(n,t){var i=t===!1?{}:{opacity:0};return i[u]="translateX("+-n*r.rf+"px)",i}:function(n,t){var i=t===!1?{}:{opacity:0};return i.right=-n*r.rf+"px",i},r.left=_2d?function(n,t){var i=t===!1?{}:{opacity:0};return i[u]="translateX("+n*r.rf+"px)",i}:function(n,t){var i=t===!1?{}:{opacity:0};return i.right=n*r.rf+"px",i},r.top=_2d?function(n,t){var i=t===!1?{}:{opacity:0};return i[u]="translateY("+-n*r.rf+"px)",i}:function(n,t){var i=t===!1?{}:{opacity:0};return i.top=-n*r.rf+"px",i},r.bottom=_2d?function(n,t){var i=t===!1?{}:{opacity:0};return i[u]="translateY("+n*r.rf+"px)",i}:function(n,t){var i=t===!1?{}:{opacity:0};return i.top=n*r.rf+"px",i},r.from=_2d?function(n,t,i){var f=i===!1?{}:{opacity:0};return f[u]="translateX("+n*r.rf+"px) translateY("+t*r.rf+"px)",f}:function(n,t,i){var u=i===!1?{}:{opacity:0};return u.top=t*r.rf+"px",u.right=n*r.rf+"px",u},r.rotate=_2d?function(n,t){var i={opacity:0};return i[u]=" rotate("+n+"deg)",t&&(i[f]=t),i}:function(){return t},r.rotateleft=_2d?function(n,t,i,e){var o=r.right(t,e);return o[u]+=" rotate("+n+"deg)",i&&(o[f]=i),o}:function(n,t,i,u){return r.right(t,u)},r.rotateright=_2d?function(n,t,i,e){var o=r.left(t,e);return o[u]+=" rotate("+n+"deg)",i&&(o[f]=i),o}:function(n,t,i,u){return r.left(t,u)},r.rotatetop=_2d?function(n,t,i,e){var o=r.top(t,e);return o[u]+=" rotate("+n+"deg)",i&&(o[f]=i),o}:function(n,t,i,u){return r.top(t,u)},r.rotatebottom=_2d?function(n,t,i,e){var o=r.bottom(t,e);return o[u]+=" rotate("+n+"deg)",i&&(o[f]=i),o}:function(n,t,i,u){return r.bottom(t,u)},r.rotatefrom=_2d?function(n,t,i,e,o){var s=r.from(t,i,o);return s[u]+=" rotate("+n+"deg)",e&&(s[f]=e),s}:function(n,t,i,u,f){return r.from(t,i,f)},r.skewleft=_2d?function(n,t,i){var f=r.right(t,i);return f[u]+=" skewX("+n+"deg)",f}:function(n,t,i){return r.right(t,i)},r.skewright=_2d?function(n,t,i){var f=r.left(t,i);return f[u]+=" skewX("+-n+"deg)",f}:function(n,t,i){return r.left(t,i)},r.skewtop=_2d?function(n,t,i){var f=r.top(t,i);return f[u]+=" skewY("+n+"deg)",f}:function(n,t,i){return r.top(t,i)},r.skewbottom=_2d?function(n,t,i){var f=r.bottom(t,i);return f[u]+=" skewY("+-n+"deg)",f}:function(n,t,i){return r.bottom(t,i)},r.scale=_2d?function(n,t,i,r){var e=r===!1?{}:{opacity:0};return e[u]=" scaleX("+n+") scaleY("+t+")",i&&(e[f]=i),e}:function(n,t,i,r){return r===!1?{}:{opacity:0}},r.scaleleft=_2d?function(n,t,i,e,o){var s=r.right(i,o);return s[u]=" scaleX("+n+") scaleY("+t+")",e&&(s[f]=e),s}:function(n,t,i,u,f){return r.right(i,f)},r.scaleright=_2d?function(n,t,i,e,o){var s=r.left(i,o);return s[u]=" scaleX("+n+") scaleY("+t+")",e&&(s[f]=e),s}:function(n,t,i,u,f){return r.left(i,f)},r.scaletop=_2d?function(n,t,i,e,o){var s=r.top(i,o);return s[u]=" scaleX("+n+") scaleY("+t+")",e&&(s[f]=e),s}:function(n,t,i,u,f){return r.top(i,f)},r.scalebottom=_2d?function(n,t,i,e,o){var s=r.bottom(i,o);return s[u]=" scaleX("+n+") scaleY("+t+")",e&&(s[f]=e),s}:function(n,t,i,u,f){return r.bottom(i,f)},r.scalefrom=_2d?function(n,t,i,e,o,s){var h=r.from(i,e,s);return h[u]+=" scaleX("+n+") scaleY("+t+")",o&&(h[f]=o),h}:function(n,t,i,u,f,e){return r.from(i,u,e)},r.rotatescale=_2d?function(n,t,i,e,o){var s=r.scale(t,i,e,o);return s[u]+=" rotate("+n+"deg)",e&&(s[f]=e),s}:function(n,t,i,u,f){return r.scale(t,i,u,f)},r.front=window._css3d?function(n,t){var i=t===!1?{}:{opacity:0};return i[u]="perspective(2000px) translate3d(0 , 0 ,"+n+"px ) rotate(0.001deg)",i}:function(){return t},r.back=window._css3d?function(n,t){var i=t===!1?{}:{opacity:0};return i[u]="perspective(2000px) translate3d(0 , 0 ,"+-n+"px ) rotate(0.001deg)",i}:function(){return t},r.rotatefront=window._css3d?function(n,t,i,r){var e=r===!1?{}:{opacity:0};return e[u]="perspective(2000px) translate3d(0 , 0 ,"+t+"px ) rotate("+(n||.001)+"deg)",i&&(e[f]=i),e}:function(){return t},r.rotateback=window._css3d?function(n,t,i,r){var e=r===!1?{}:{opacity:0};return e[u]="perspective(2000px) translate3d(0 , 0 ,"+-t+"px ) rotate("+(n||.001)+"deg)",i&&(e[f]=i),e}:function(){return t},r.rotate3dleft=window._css3d?function(n,t,i,e,o,s){var h=r.right(e,s);return h[u]+=(n?" rotateX("+n+"deg)":" ")+(t?" rotateY("+t+"deg)":"")+(i?" rotateZ("+i+"deg)":""),o&&(h[f]=o),h}:function(n,t,i,u,f,e){return r.right(u,e)},r.rotate3dright=window._css3d?function(n,t,i,e,o,s){var h=r.left(e,s);return h[u]+=(n?" rotateX("+n+"deg)":" ")+(t?" rotateY("+t+"deg)":"")+(i?" rotateZ("+i+"deg)":""),o&&(h[f]=o),h}:function(n,t,i,u,f,e){return r.left(u,e)},r.rotate3dtop=window._css3d?function(n,t,i,e,o,s){var h=r.top(e,s);return h[u]+=(n?" rotateX("+n+"deg)":" ")+(t?" rotateY("+t+"deg)":"")+(i?" rotateZ("+i+"deg)":""),o&&(h[f]=o),h}:function(n,t,i,u,f,e){return r.top(u,e)},r.rotate3dbottom=window._css3d?function(n,t,i,e,o,s){var h=r.bottom(e,s);return h[u]+=(n?" rotateX("+n+"deg)":" ")+(t?" rotateY("+t+"deg)":"")+(i?" rotateZ("+i+"deg)":""),o&&(h[f]=o),h}:function(n,t,i,u,f,e){return r.bottom(u,e)},r.rotate3dfront=window._css3d?function(n,t,i,e,o,s){var h=r.front(e,s);return h[u]+=(n?" rotateX("+n+"deg)":" ")+(t?" rotateY("+t+"deg)":"")+(i?" rotateZ("+i+"deg)":""),o&&(h[f]=o),h}:function(n,t,i,u,f,e){return r.front(u,e)},r.rotate3dback=window._css3d?function(n,t,i,e,o,s){var h=r.back(e,s);return h[u]+=(n?" rotateX("+n+"deg)":" ")+(t?" rotateY("+t+"deg)":"")+(i?" rotateZ("+i+"deg)":""),o&&(h[f]=o),h}:function(n,t,i,u,f,e){return r.back(u,e)},r.t=window._css3d?function(n,t,i,e,o,s,h,c,l,a,v,y,p,w,b){var g=n===!1?{}:{opacity:0},k="perspective(2000px) ",d;return t!=="n"&&(k+="translateX("+t*r.rf+"px) "),i!=="n"&&(k+="translateY("+i*r.rf+"px) "),e!=="n"&&(k+="translateZ("+e*r.rf+"px) "),o!=="n"&&(k+="rotate("+o+"deg) "),s!=="n"&&(k+="rotateX("+s+"deg) "),h!=="n"&&(k+="rotateY("+h+"deg) "),c!=="n"&&(k+="rotateZ("+c+"deg) "),v!=="n"&&(k+="skewX("+v+"deg) "),y!=="n"&&(k+="skewY("+y+"deg) "),l!=="n"&&(k+="scaleX("+l+") "),a!=="n"&&(k+="scaleY("+a+")"),g[u]=k,d="",d+=p!=="n"?p+"% ":"50% ",d+=w!=="n"?w+"% ":"50% ",d+=b!=="n"?b+"px":"",g[f]=d,g}:function(n,t,i,u,f){var f=n===!1?{}:{opacity:0};return t!=="n"&&(f.right=t*r.rf+"px"),i!=="n"&&(f.top=i*r.rf+"px"),f}}}}(jQuery),function(n){window.MSLayerElement=function(){this.$cont=n("<div><\/div>").addClass("layer-cont"),this.start_anim={name:"fade",duration:1e3,ease:"linear",delay:0},this.end_anim={duration:1e3,ease:"linear"},this.type="text",this.resizable=!0,this.minWidth=-1,this.__cssConfig=["margin-top","padding-top","margin-bottom","padding-right","margin-left","padding-left","margin-right","padding-bottom","right","left","top","bottom","font-size","line-height","width"],this.baseStyle={}};var t=MSLayerElement.prototype;t.__playAnimation=function(n,t){var i={};n.ease&&(i.ease=n.ease),this.show_tween=CTween.animate(this.$element,n.duration,t,i)},t._randomParam=function(n){var t=Number(n.slice(0,n.indexOf("|"))),i=Number(n.slice(n.indexOf("|")+1));return t+Math.random()*(i-t)},t._parseEff=function(n){var t=[],u,i,r,f;if(n.indexOf("(")!==-1)for(u=n.slice(0,n.indexOf("(")).toLowerCase(),t=n.slice(n.indexOf("(")+1,-1).replace(/\"|\'|\s/g,"").split(","),n=u,r=0,f=t.length;r<f;++r)i=t[r],i in MSLayerEffects.presetEffParams&&(i=MSLayerEffects.presetEffParams[i]),t[r]=i;return{eff_name:n,eff_params:t}},t._parseEffParams=function(n){for(var r=[],t,i=0,u=n.length;i<u;++i)t=n[i],typeof t=="string"&&t.indexOf("|")!==-1&&(t=this._randomParam(t)),r[i]=t;return r},t._checkPosKey=function(n,t){return n==="right"&&!(n in this.baseStyle)&&"left"in this.baseStyle?(t.left=-parseInt(t.left)+"px",delete t.left,!0):n==="top"&&!(n in this.baseStyle)&&"bottom"in this.baseStyle?(t.bottom=-parseInt(t.top)+"px",delete t.top,!0):!1},t.setStartAnim=function(t){n.extend(this.start_anim,t),n.extend(this.start_anim,this._parseEff(this.start_anim.name)),this.$element.css("visibility","hidden")},t.setEndAnim=function(t){n.extend(this.end_anim,t)},t.create=function(){var u,r;if(this.$element.css("display","none").removeAttr("data-delay").removeAttr("data-effect").removeAttr("data-duration").removeAttr("data-type"),this.$element.data("resize")!==undefined&&(this.resizable=this.$element.data("resize"),this.$element.removeAttr("data-resize")),this.$element.data("fixed")!==undefined&&(this.fixed=this.$element.data("fixed"),this.$element.removeAttr("data-fixed")),this.$element.data("widthlimit")!==undefined&&(this.minWidth=this.$element.data("widthlimit"),this.$element.removeAttr("data-widthlimit")),this.end_anim.name||(this.end_anim.name=this.start_anim.name),this.end_anim.time&&(this.autoHide=!0),this.$element.data("action")!==undefined&&(u=this.slide.slider.slideController,this.$element.on("click",function(t){u.runAction(n(this).data("action")),t.preventDefault()}).addClass("ms-action-layer")),n.extend(this.end_anim,this._parseEff(this.end_anim.name)),this.slider=this.slide.slider,r=this.layerOrigin=this.$element.data("origin"),r){var f=r.charAt(0),e=r.charAt(1),t=this.$element.data("offset-x"),i=this.$element.data("offset-y");i!==undefined?this.$element.removeAttr("data-offset-y"):i=0;switch(f){case"t":this.$element[0].style.top=i+"px";break;case"b":this.$element[0].style.bottom=i+"px";break;case"m":this.$element[0].style.top=i+"px",this.middleAlign=!0}t!==undefined?this.$element.removeAttr("data-offset-x"):t=0;switch(e){case"l":this.$element[0].style.right=t+"px";break;case"r":this.$element[0].style.left=t+"px";break;case"c":this.$element[0].style.right=t+"px",this.centerAlign=!0}this.$element.removeAttr("data-origin")}this.parallax=this.$element.data("parallax"),this.parallax!=null&&(this.parallax/=100,this.$parallaxElement=n("<div><\/div>").addClass("ms-parallax-layer"),this.link?(this.link.wrap(this.$parallaxElement),this.$parallaxElement=this.link.parent()):(this.$element.wrap(this.$parallaxElement),this.$parallaxElement=this.$element.parent()),this._lastParaX=0,this._lastParaY=0,this._paraX=0,this._paraY=0,this.alignedToBot=this.layerOrigin&&this.layerOrigin.indexOf("b")!==-1,this.alignedToBot&&this.$parallaxElement.css("bottom",0),this.parallaxRender=window._css3d?this.parallaxCSS3DRenderer:window._css2d?this.parallaxCSS2DRenderer:this.parallax2DRenderer,this.slider.options.parallaxMode!=="swipe"&&averta.Ticker.add(this.parallaxRender,this))},t.moveParallax=function(n,t,i){this._paraX=n,this._paraY=t,i&&(this._lastParaX=n,this._lastParaY=t,this.parallaxRender())},t.parallaxCalc=function(){var n=this._paraX-this._lastParaX,t=this._paraY-this._lastParaY;this._lastParaX+=n/12,this._lastParaY+=t/12,Math.abs(n)<.019&&(this._lastParaX=this._paraX),Math.abs(t)<.019&&(this._lastParaY=this._paraY)},t.parallaxCSS3DRenderer=function(){this.parallaxCalc(),this.$parallaxElement[0].style[window._jcsspfx+"Transform"]="translateX("+this._lastParaX*this.parallax+"px) translateY("+this._lastParaY*this.parallax+"px) translateZ(0)"},t.parallaxCSS2DRenderer=function(){this.parallaxCalc(),this.$parallaxElement[0].style[window._jcsspfx+"Transform"]="translateX("+this._lastParaX*this.parallax+"px) translateY("+this._lastParaY*this.parallax+"px)"},t.parallax2DRenderer=function(){this.parallaxCalc(),this.alignedToBot?this.$parallaxElement[0].style.bottom=this._lastParaY*this.parallax+"px":this.$parallaxElement[0].style.top=this._lastParaY*this.parallax+"px",this.$parallaxElement[0].style.right=this._lastParaX*this.parallax+"px"},t.init=function(){var n,t,r,i;for(this.initialized=!0,this.$element.css("visibility",""),t=0,r=this.__cssConfig.length;t<r;t++)i=this.__cssConfig[t],n=this.type==="text"&&i==="width"?this.$element[0].style.width:this.$element.css(i),n!="auto"&&n!=""&&n!="normal"&&(this.baseStyle[i]=parseInt(n));this.middleAlign&&(this.baseHeight=this.$element.outerHeight()),this.centerAlign&&(this.baseWidth=this.$element.outerWidth())},t.locate=function(){var u=this.slide.$layers,i=parseFloat(u.css("width")),f=parseFloat(u.css("height")),t,r,n;this.visible(this.minWidth<i),t=this.resizeFactor=i/this.slide.slider.options.width;for(n in this.baseStyle)(r=n==="top"||n==="right"||n==="bottom"||n==="left",t=this.fixed&&r?1:this.resizeFactor,this.resizable||r)&&(n==="top"&&this.middleAlign?this.$element.css(n,this.baseStyle[n]*t+(f-this.baseHeight*t)/2+"px"):n==="right"&&this.centerAlign?this.$element.css(n,this.baseStyle[n]*t+(i-this.baseWidth*t)/2+"px"):this.$element.css(n,this.baseStyle[n]*t+"px"))},t.start=function(){var n,r,f,i,u,t;if(!this.isShowing){this.isShowing=!0,f=this.slide.$layers,MSLayerEffects.rf=this.resizeFactor,i=MSLayerEffects[this.start_anim.eff_name].apply(null,this._parseEffParams(this.start_anim.eff_params)),u={};for(n in i)this._checkPosKey(n,i)||(MSLayerEffects.defaultValues[n]!=null&&(u[n]=MSLayerEffects.defaultValues[n]),n in this.baseStyle&&(r=this.baseStyle[n],this.middleAlign&&n==="top"&&(r+=(parseInt(f.height())-this.baseHeight*this.resizeFactor)/2),this.centerAlign&&n==="right"&&(r+=(parseInt(f.width())-this.baseWidth*this.resizeFactor)/2),i[n]=r+parseFloat(i[n])+"px",u[n]=r+"px"),this.$element.css(n,i[n]));t=this,clearTimeout(this.to),this.to=setTimeout(function(){t.$element.css("display",""),t.__playAnimation(t.start_anim,u)},t.start_anim.delay||.01),this.cl_to=setTimeout(function(){t.show_cl=!0},(this.start_anim.delay||.01)+this.start_anim.duration),this.autoHide&&(clearTimeout(this.hto),this.hto=setTimeout(function(){t.hide()},t.end_anim.time))}},t.hide=function(){this.isShowing=!1;var n=MSLayerEffects[this.end_anim.eff_name].apply(null,this._parseEffParams(this.end_anim.eff_params));for(key in n)this._checkPosKey(key,n)||(key===window._jcsspfx+"TransformOrigin"&&this.$element.css(key,n[key]),key in this.baseStyle&&(n[key]=this.baseStyle[key]+parseFloat(n[key])+"px"));this.__playAnimation(this.end_anim,n),clearTimeout(this.to),clearTimeout(this.hto),clearTimeout(this.cl_to)},t.reset=function(){this.isShowing=!1,this.$element[0].style.display="none",this.$element.css("opacity","100"),this.$element[0].style.transitionDuration="0ms",this.show_tween&&this.show_tween.stop(!0),clearTimeout(this.to),clearTimeout(this.hto)},t.destroy=function(){this.reset(),this.$element.remove(),this.$cont.remove()},t.visible=function(n){this.isVisible!=n&&(this.isVisible=n,this.$element.css("display",n?"":"none"))}}(jQuery),function(n){window.MSImageLayerElement=function(){MSLayerElement.call(this),this.needPreload=!0,this.__cssConfig=["margin-top","padding-top","margin-bottom","padding-right","margin-left","padding-left","margin-right","padding-bottom","right","left","top","bottom","width","height"],this.type="image"},MSImageLayerElement.extend(MSLayerElement);var t=MSImageLayerElement.prototype,i=MSLayerElement.prototype;t.create=function(){var r,t;if(this.link&&(r=this.$element.parent(),r.append(this.link),this.link.append(this.$element),this.link.removeClass("ms-layer"),this.$element.addClass("ms-layer"),r=null),i.create.call(this),this.$element.data("src")!=undefined?(this.img_src=this.$element.data("src"),this.$element.removeAttr("data-src")):(t=this,this.$element.on("load",function(){t.slide.preloadCount--,t.slide.preloadCount===0&&t.slide.___onlayersReady()}).each(n.jqLoadFix)),n.browser.msie)this.$element.on("dragstart",function(n){n.preventDefault()})},t.loadImage=function(){var n=this;this.$element.preloadImg(this.img_src,function(){n.slide.preloadCount--,n.slide.preloadCount===0&&n.slide.___onlayersReady()})}}(jQuery),function(n){window.MSVideoLayerElement=function(){MSLayerElement.call(this),this.__cssConfig.push("height"),this.type="video"},MSVideoLayerElement.extend(MSLayerElement);var t=MSVideoLayerElement.prototype,i=MSLayerElement.prototype;t.__playVideo=function(){this.img&&CTween.fadeOut(this.img,500,!1),CTween.fadeOut(this.video_btn,500,!1),this.video_frame.attr("src","about:blank").css("display","block"),this.video_url.indexOf("?")==-1&&(this.video_url+="?"),this.video_frame.attr("src",this.video_url+"&autoplay=1")},t.reset=function(){if(i.reset.call(this),(this.needPreload||this.$element.data("btn"))&&(this.video_btn.css("opacity",1),this.video_frame.attr("src","about:blank").css("display","none")),this.needPreload){this.img.css("opacity",1);return}this.video_frame.attr("src",this.video_url)},t.create=function(){var r,t;if((i.create.call(this),this.video_frame=this.$element.find("iframe").css({width:"100%",height:"100%"}),this.video_url=this.video_frame.attr("src"),r=this.$element.has("img").length!=0,r||this.$element.data("btn"))&&(this.video_frame.attr("src","about:blank").css("display","none"),t=this,this.video_btn=n("<div><\/div>").appendTo(this.$element).addClass("ms-video-btn").click(function(){t.__playVideo()}),r)&&(this.needPreload=!0,this.img=this.$element.find("img:first").addClass("ms-video-img"),this.img.data("src")!==undefined?(this.img_src=this.img.data("src"),this.img.removeAttr("data-src")):(t=this,this.img.attr("src",this.img_src).on("load",function(){t.slide.preloadCount--,t.slide.preloadCount==0&&t.slide.___onlayersReady()}).each(n.jqLoadFix)),n.browser.msie))this.img.on("dragstart",function(n){n.preventDefault()})},t.loadImage=function(){var n=this;this.img.preloadImg(this.img_src,function(){n.slide.preloadCount--,n.slide.preloadCount==0&&n.slide.___onlayersReady()})}}(jQuery),function(n){"use strict";window.MSHotspotLayer=function(){MSLayerElement.call(this),this.__cssConfig=["margin-top","padding-top","margin-bottom","padding-right","margin-left","padding-left","margin-right","padding-bottom","right","left","top","bottom"],this.ease="Expo",this.hide_start=!0,this.type="hotspot"},MSHotspotLayer.extend(MSLayerElement);var t=MSHotspotLayer.prototype,i=MSLayerElement.prototype;t._showTT=function(){this.show_cl&&(clearTimeout(this.hto),this._tween&&this._tween.stop(!0),this.hide_start&&(this.align=this._orgAlign,this._locateTT(),this.tt.css({display:"block"}),this._tween=CTween.animate(this.tt,900,this.to,{ease:"easeOut"+this.ease}),this.hide_start=!1))},t._hideTT=function(){if(this.show_cl){this._tween&&this._tween.stop(!0);var n=this;clearTimeout(this.hto),this.hto=setTimeout(function(){n.hide_start=!0,n._tween=CTween.animate(n.tt,900,n.from,{ease:"easeOut"+n.ease,complete:function(){n.tt.css("display","none")}})},200)}},t._updateClassName=function(n){this._lastClass&&this.tt.removeClass(this._lastClass),this.tt.addClass(n),this._lastClass=n},t._alignPolicy=function(){var i=this.tt.outerHeight(),n=Math.max(this.tt.outerWidth(),parseInt(this.tt.css("max-width"))),t=window.innerWidth,r=window.innerHeight;switch(this.align){case"top":if(this.base_t<0)return"bottom";break;case"left":if(this.base_l+n>t||this.base_t<0)return"bottom";break;case"right":if(this.base_l<0||this.base_t<0)return"bottom"}return null},t._locateTT=function(){var e=this.$element.offset(),o=this.slide.slider.$element.offset(),t=50,r=15,i,u,n,f;this.pos_x=e.right-o.right-this.slide.slider.$element.scrollLeft(),this.pos_y=e.top-o.top-this.slide.slider.$element.scrollTop(),this.from={opacity:0},this.to={opacity:1},this._updateClassName("ms-tooltip-"+this.align),this.tt_arrow.css("margin-right",""),i=15,u=15;switch(this.align){case"top":n=Math.min(this.tt.outerWidth(),parseInt(this.tt.css("max-width"))),this.base_t=this.pos_y-this.tt.outerHeight()-u-r,this.base_l=this.pos_x-n/2,this.base_l+n>window.innerWidth&&(this.tt_arrow.css("margin-right",-i/2+this.base_l+n-window.innerWidth+"px"),this.base_l=window.innerWidth-n),this.base_l<0&&(this.base_l=0,this.tt_arrow.css("margin-right",-i/2+this.pos_x-this.tt.outerWidth()/2+"px")),window._css3d?(this.from[window._jcsspfx+"Transform"]="translateY(-"+t+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.top=this.base_t-t+"px",this.to.top=this.base_t+"px");break;case"bottom":n=Math.min(this.tt.outerWidth(),parseInt(this.tt.css("max-width"))),this.base_t=this.pos_y+u+r,this.base_l=this.pos_x-n/2,this.base_l+n>window.innerWidth&&(this.tt_arrow.css("margin-right",-i/2+this.base_l+n-window.innerWidth+"px"),this.base_l=window.innerWidth-n),this.base_l<0&&(this.base_l=0,this.tt_arrow.css("margin-right",-i/2+this.pos_x-this.tt.outerWidth()/2+"px")),window._css3d?(this.from[window._jcsspfx+"Transform"]="translateY("+t+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.top=this.base_t+t+"px",this.to.top=this.base_t+"px");break;case"left":this.base_l=this.pos_x+i+r,this.base_t=this.pos_y-this.tt.outerHeight()/2,window._css3d?(this.from[window._jcsspfx+"Transform"]="translateX("+t+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.right=this.base_l+t+"px",this.to.right=this.base_l+"px");break;case"right":this.base_l=this.pos_x-i-this.tt.outerWidth()-r,this.base_t=this.pos_y-this.tt.outerHeight()/2,window._css3d?(this.from[window._jcsspfx+"Transform"]="translateX(-"+t+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.right=this.base_l-t+"px",this.to.right=this.base_l+"px")}if(f=this._alignPolicy(),f!==null){this.align=f,this._locateTT();return}this.tt.css("top",parseInt(this.base_t)+"px").css("right",parseInt(this.base_l)+"px"),this.tt.css(this.from)},t.start=function(){i.start.call(this),this.tt.appendTo(this.slide.slider.$element),this.tt.css("display","none")},t.reset=function(){i.reset.call(this),this.tt.detach()},t.create=function(){var t=this,r,u;i.create.call(this),this._orgAlign=this.align=this.$element.data("align")!==undefined?this.$element.data("align"):"top",this.data=this.$element.html();this.$element.html("").on("mouseenter",function(){t._showTT()}).on("mouseleave",function(){t._hideTT()});if(this.point=n('<div><div class="ms-point-center"><\/div><div class="ms-point-border"><\/div><\/div>').addClass("ms-tooltip-point").appendTo(this.$element),r=this.$element.data("link"),u=this.$element.data("target"),r)this.point.on("click",function(){window.open(r,u||"_self")});if(this.tt=n("<div><\/div>").addClass("ms-tooltip").css("display","hidden").css("opacity",0),this.$element.data("width")!==undefined&&this.tt.css("width",this.$element.data("width")).css("max-width",this.$element.data("width")),this.tt_arrow=n("<div><\/div>").addClass("ms-tooltip-arrow").appendTo(this.tt),this._updateClassName("ms-tooltip-"+this.align),this.ttcont=n("<div><\/div>").addClass("ms-tooltip-cont").html(this.data).appendTo(this.tt),this.$element.data("stay-hover")===!0)this.tt.on("mouseenter",function(){t.hide_start||(clearTimeout(t.hto),t._tween.stop(!0),t._showTT())}).on("mouseleave",function(){t._hideTT()})}}(jQuery),function(){window.MSButtonLayer=function(){MSLayerElement.call(this),this.type="button"},MSButtonLayer.extend(MSLayerElement);var n=MSButtonLayer.prototype,t=MSLayerElement.prototype,i=["top","right","bottom","left"];n.create=function(){t.create.call(this),this.$element.wrap('<div class="ms-btn-container"><\/div>').css("position","relative"),this.$container=this.$element.parent()},n.locate=function(){var n,u,r;for(t.locate.call(this),r=0;r<4;r++)n=i[r],n in this.baseStyle&&(u=this.$element.css(n),this.$element.css(n,""),this.$container.css(n,u));this.$container.width(this.$element.outerWidth()).height(this.$element.outerHeight())}}(jQuery),window.MSSliderEvent=function(n){this.type=n},MSSliderEvent.CHANGE_START="changeStart",MSSliderEvent.CHANGE_END="changeEnd",MSSliderEvent.WAITING="waiting",MSSliderEvent.AUTOPLAY_CHANGE="autoplayChange",MSSliderEvent.VIDEO_PLAY="videoPlay",MSSliderEvent.VIDEO_CLOSE="videoClose",MSSliderEvent.INIT="init",MSSliderEvent.RESIZE="resize",MSSliderEvent.RESERVED_SPACE_CHANGE="rsc",function(n){"use strict";window.MSSlide=function(){this.$element=null,this.$loading=n("<div><\/div>").addClass("ms-slide-loading"),this.layers=[],this.view=null,this.index=-1,this.__width=0,this.__height=0,this.preloadCount=0,this.fillMode="fill",this.selected=!1,this.pselected=!1,this.autoAppend=!0,this.isSleeping=!0,this.moz=n.browser.mozilla};var t=MSSlide.prototype;t.onSwipeStart=function(){this.link&&(this.linkdis=!0),this.video&&(this.videodis=!0)},t.onSwipeCancel=function(){this.link&&(this.linkdis=!1),this.video&&(this.videodis=!1)},t.addLayer=function(t){this.hasLayers||(this.$layers=n("<div><\/div>").addClass("ms-slide-layers")),this.hasLayers=!0,this.$layers.append(t.$element),this.layers.push(t),t.slide=this,t.create(),t.parallax&&(this.hasParallaxLayer=!0),t.needPreload&&this.preloadCount++},t.___onlayersReady=function(){this.ready=!0,this.slider.api._startTimer(),this.selected&&(this.showLayers(),this.vinit&&(this.bgvideo.play(),this.autoPauseBgVid||(this.bgvideo.currentTime=0))),this.isSleeping||this.setup(),CTween.fadeOut(this.$loading,300,!0),(this.slider.options.preload===0||this.slider.options.preload==="all")&&this.index<this.view.slideList.length-1?this.view.slideList[this.index+1].loadImages():this.slider.options.preload==="all"&&this.index===this.view.slideList.length-1&&this.slider._removeLoading()},t.startLayers=function(){for(var n=0,t=this.layers.length;n<t;++n)this.layers[n].start()},t.initLayers=function(n){if((!this.init||n)&&!this.slider.init_safemode){this.init=!0;for(var t=0,i=this.layers.length;t<i;++t)this.layers[t].init()}},t.locateLayers=function(){for(var n=0,t=this.layers.length;n<t;++n)this.layers[n].locate()},t.resetLayers=function(){this.$layers.css("display","none"),this.$layers.css("opacity",1);for(var n=0,t=this.layers.length;n<t;++n)this.layers[n].reset()},t.hideLayers=function(){if(this.preloadCount===0)for(var n=0,t=this.layers.length;n<t;++n)this.layers[n].hide()},t.showLayers=function(){this.hasLayers&&(this.lht&&(this.lht.reset?this.lht.reset():this.lht.stop("true")),this.resetLayers(),this.$layers.css("opacity",1).css("display",""),this.preloadCount===0&&(this.initLayers(),this.locateLayers(),this.startLayers()))},t.applyParallax=function(n,t,i){for(var r=0,u=this.layers.length;r!==u;++r)this.layers[r].parallax!=null&&this.layers[r].moveParallax(n,t,i)},t.enableParallaxEffect=function(){if(this.hasParallaxLayer)if(this.slider.options.parallaxMode==="swipe")this.view.addEventListener(MSViewEvents.SCROLL,this.swipeParallaxMove,this);else this.$element.on("mousemove",{that:this},this.mouseParallaxMove).on("mouseleave",{that:this},this.resetParalax)},t.disableParallaxEffect=function(){this.hasParallaxLayer&&(this.slider.options.parallaxMode==="swipe"?this.view.removeEventListener(MSViewEvents.SCROLL,this.swipeParallaxMove,this):this.$element.off("mousemove",this.mouseParallaxMove).off("mouseleave",this.resetParalax))},t.resetParalax=function(n){var t=n.data.that;t.applyParallax(0,0)},t.mouseParallaxMove=function(n){var t=n.data.that,u=t.$element.offset(),f=t.slider,i,r;i=f.options.parallaxMode!=="mouse:y-only"?n.clientX-u.right-t.__width/2:0,r=f.options.parallaxMode!=="mouse:x-only"?n.clientY-u.top-t.__height/2:0,t.applyParallax(-i,-r)},t.swipeParallaxMove=function(){var n=this.position-this.view.__contPos;this.applyParallax(n,0,!0)},t.setBG=function(t){this.hasBG=!0;var i=this;this.$imgcont=n("<div><\/div>").addClass("ms-slide-bgcont"),this.$element.append(this.$loading).append(this.$imgcont),this.$bg_img=n(t).css("visibility","hidden"),this.$imgcont.append(this.$bg_img),this.bgAligner=new MSAligner(i.fillMode,i.$imgcont,i.$bg_img),this.bgAligner.widthOnly=this.slider.options.autoHeight,i.slider.options.autoHeight&&(i.pselected||i.selected)&&i.slider.setHeight(i.slider.options.height),this.$bg_img.data("src")!==undefined?(this.bg_src=this.$bg_img.data("src"),this.$bg_img.removeAttr("data-src")):this.$bg_img.one("load",function(n){i._onBGLoad(n)}).each(n.jqLoadFix),this.preloadCount++},t._onBGLoad=function(t){if(this.bgNatrualWidth=t.width,this.bgNatrualHeight=t.height,this.bgLoaded=!0,n.browser.msie)this.$bg_img.on("dragstart",function(n){n.preventDefault()});this.preloadCount--,this.preloadCount===0&&this.___onlayersReady()},t.loadImages=function(){var t,n,i;if(!this.ls)for(this.ls=!0,this.preloadCount===0&&this.___onlayersReady(),this.bgvideo&&this.bgvideo.load(),this.hasBG&&this.bg_src&&(t=this,this.$bg_img.preloadImg(this.bg_src,function(n){t._onBGLoad(n)})),n=0,i=this.layers.length;n<i;++n)this.layers[n].needPreload&&this.layers[n].loadImage()},t.setBGVideo=function(t){if(t[0].play){if(window._mobile){t.remove();return}this.bgvideo=t[0];var i=this;t.addClass("ms-slide-bgvideo"),t.data("loop")!==!1&&this.bgvideo.addEventListener("ended",function(){i.bgvideo.play()}),t.data("mute")!==!1&&(this.bgvideo.muted=!0),t.data("autopause")===!0&&(this.autoPauseBgVid=!0),this.bgvideo_fillmode=t.data("fill-mode")||"fill",this.bgvideo_fillmode!=="none"&&(this.bgVideoAligner=new MSAligner(this.bgvideo_fillmode,this.$element,t),this.bgvideo.addEventListener("loadedmetadata",function(){i.vinit||(i.vinit=!0,i.video_aspect=i.bgVideoAligner.baseHeight/i.bgVideoAligner.baseWidth,i.bgVideoAligner.init(i.bgvideo.videoWidth,i.bgvideo.videoHeight),i._alignBGVideo(),CTween.fadeIn(n(i.bgvideo),200),i.selected&&i.bgvideo.play())})),t.css("opacity",0),this.$bgvideocont=n("<div><\/div>").addClass("ms-slide-bgvideocont").append(t),this.hasBG?this.$imgcont.before(this.$bgvideocont):this.$bgvideocont.appendTo(this.$element)}},t._alignBGVideo=function(){this.bgvideo_fillmode&&this.bgvideo_fillmode!=="none"&&this.bgVideoAligner.align()},t.setSize=function(n,t,i){this.__width=n,this.slider.options.autoHeight&&(this.bgLoaded?(this.ratio=this.__width/this.bgWidth,t=Math.floor(this.ratio*this.bgHeight),this.$imgcont.height(t)):(this.ratio=n/this.slider.options.width,t=this.slider.options.height*this.ratio)),this.__height=t,this.$element.width(n).height(t),this.hasBG&&this.bgLoaded&&this.bgAligner.align(),this._alignBGVideo(),i&&this.selected&&this.initLayers(i),this.selected&&this.locateLayers(),this.hasLayers&&(this.slider.options.autoHeight&&(this.$layers[0].style.height=this.getHeight()+"px"),this.slider.options.layersMode=="center"&&(this.$layers[0].style.right=Math.max(0,(this.__width-this.slider.options.width)/2)+"px"))},t.getHeight=function(){return this.hasBG&&this.bgLoaded?this.bgHeight*this.ratio:Math.max(this.$element[0].clientHeight,this.slider.options.height*this.ratio)},t.__playVideo=function(){this.vplayed||this.videodis||(this.vplayed=!0,this.slider.api.paused||(this.slider.api.pause(),this.roc=!0),this.vcbtn.css("display",""),CTween.fadeOut(this.vpbtn,500,!1),CTween.fadeIn(this.vcbtn,500),CTween.fadeIn(this.vframe,500),this.vframe.css("display","block").attr("src",this.video+"&autoplay=1"),this.view.$element.addClass("ms-def-cursor"),this.view.swipeControl.disable(),this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_PLAY)))},t.__closeVideo=function(){if(this.vplayed){this.vplayed=!1,this.roc&&this.slider.api.resume();var n=this;CTween.fadeIn(this.vpbtn,500),CTween.animate(this.vcbtn,500,{opacity:0},{complete:function(){n.vcbtn.css("display","none")}}),CTween.animate(this.vframe,500,{opacity:0},{complete:function(){n.vframe.attr("src","about:blank").css("display","none")}}),this.view.swipeControl.enable(),this.view.$element.removeClass("ms-def-cursor"),this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_CLOSE))}},t.create=function(){var t=this;this.hasLayers&&(this.$element.append(this.$layers),this.slider.options.layersMode=="center"&&this.$layers.css("max-width",this.slider.options.width+"px")),this.link&&this.$element.css("cursor","pointer").click(function(){t.linkdis||window.open(t.link,t.link_targ||"_self")}),this.video&&(this.video.indexOf("?")===-1&&(this.video+="?"),this.vframe=n("<iframe><\/iframe>").addClass("ms-slide-video").css({width:"100%",height:"100%",display:"none"}).attr("src","about:blank").appendTo(this.$element),this.vpbtn=n("<div><\/div>").addClass("ms-slide-vpbtn").click(function(){t.__playVideo()}).appendTo(this.$element),this.vcbtn=n("<div><\/div>").addClass("ms-slide-vcbtn").click(function(){t.__closeVideo()}).appendTo(this.$element).css("display","none"),window._touch&&this.vcbtn.removeClass("ms-slide-vcbtn").addClass("ms-slide-vcbtn-mobile").append('<div class="ms-vcbtn-txt">Close video<\/div>').appendTo(this.view.$element.parent())),!this.slider.options.autoHeight&&this.hasBG&&(this.$imgcont.css("height","100%"),(this.fillMode==="center"||this.fillMode==="stretch")&&(this.fillMode="fill")),this.slider.options.autoHeight&&this.$element.addClass("ms-slide-auto-height"),this.sleep(!0)},t.destroy=function(){for(var n=0,t=this.layers.length;n<t;++n)this.layers[n].$element.stop(!0).remove();this.$element.remove(),this.$element=null},t.setup=function(){!this.initBG&&this.bgLoaded&&(this.initBG=!0,this.$bg_img.css("visibility",""),this.bgWidth=this.bgNatrualWidth||this.$bg_img.width(),this.bgHeight=this.bgNatrualHeight||this.$bg_img.height(),CTween.fadeIn(this.$imgcont,300),this.slider.options.autoHeight&&this.$imgcont.height(this.bgHeight*this.ratio),this.bgAligner.init(this.bgWidth,this.bgHeight),this.setSize(this.__width,this.__height),this.slider.options.autoHeight&&(this.pselected||this.selected)&&this.slider.setHeight(this.getHeight()))},t.prepareToSelect=function(){this.pselected||this.selected||(this.pselected=!0,(this.link||this.video)&&(this.view.addEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.view.addEventListener(MSViewEvents.SWIPE_CANCEL,this.onSwipeCancel,this)),this.loadImages(),this.preloadCount===0&&(this.bgvideo&&this.bgvideo.play(),this.slider.options.instantStartLayers&&this.showLayers()),this.enableParallaxEffect(),this.moz&&this.$element.css("margin-top",""))},t.select=function(){this.selected||(this.selected=!0,this.pselected=!1,this.$element.addClass("ms-sl-selected"),this.hasLayers&&(this.slider.options.autoHeight&&(this.$layers[0].style.height=this.getHeight()+"px"),this.slider.options.instantStartLayers||this.showLayers()),this.preloadCount===0&&this.bgvideo&&this.bgvideo.play())},t.unselect=function(){if(this.pselected=!1,this.moz&&this.$element.css("margin-top","0.1px"),(this.link||this.video)&&(this.view.removeEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.view.removeEventListener(MSViewEvents.SWIPE_CANCEL,this.onSwipeCancel,this)),this.bgvideo&&(this.bgvideo.pause(),!this.autoPauseBgVid&&this.vinit&&(this.bgvideo.currentTime=0)),this.hasLayers&&(this.selected||this.slider.options.instantStartLayers)){var n=this;n.lht=CTween.animate(this.$layers,500,{opacity:0},{complete:function(){n.resetLayers()}}),this.disableParallaxEffect()}this.selected&&(this.selected=!1,this.$element.removeClass("ms-sl-selected"),this.video&&this.vplayed&&(this.__closeVideo(),this.roc=!1))},t.sleep=function(n){(!this.isSleeping||n)&&(this.isSleeping=!0,this.autoAppend&&this.$element.detach())},t.wakeup=function(){this.isSleeping&&(this.isSleeping=!1,this.autoAppend&&this.view.$slideCont.append(this.$element),this.moz&&this.$element.css("margin-top","0.1px"),this.setup(),this.hasBG&&this.bgAligner.align())}}(jQuery),function(n){"use strict";var i={},t;window.MSSlideController=function(n){this._delayProgress=0,this._timer=new averta.Timer(100),this._timer.onTimer=this.onTimer,this._timer.refrence=this,this.currentSlide=null,this.slider=n,this.so=n.options,averta.EventDispatcher.call(this)},MSSlideController.registerView=function(n,t){if(n in i)throw new Error(n+", is already registered.");i[n]=t},MSSlideController.SliderControlList={},MSSlideController.registerControl=function(n,t){if(n in MSSlideController.SliderControlList)throw new Error(n+", is already registered.");MSSlideController.SliderControlList[n]=t},t=MSSlideController.prototype,t.setupView=function(){var t=this,u,r;this.resize_listener=function(){t.__resize()},u={spacing:this.so.space,mouseSwipe:this.so.mouse,loop:this.so.loop,autoHeight:this.so.autoHeight,swipe:this.so.swipe,speed:this.so.speed,dir:this.so.dir,viewNum:this.so.inView,critMargin:this.so.critMargin},this.so.viewOptions&&n.extend(u,this.so.viewOptions),this.so.autoHeight&&(this.so.heightLimit=!1),r=i[this.slider.options.view]||MSBasicView,r._3dreq&&(!window._css3d||n.browser.msie)&&(r=r._fallback||MSBasicView),this.view=new r(u),this.so.overPause&&(t=this,this.slider.$element.mouseenter(function(){t.is_over=!0,t._stopTimer()}).mouseleave(function(){t.is_over=!1,t._startTimer()}))},t.onChangeStart=function(){this.change_started=!0,this.currentSlide&&this.currentSlide.unselect(),this.currentSlide=this.view.currentSlide,this.currentSlide.prepareToSelect(),this.so.endPause&&this.currentSlide.index===this.slider.slides.length-1&&(this.pause(),this.skipTimer()),this.so.autoHeight&&this.slider.setHeight(this.currentSlide.getHeight()),this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_START))},t.onChangeEnd=function(){if(this.change_started=!1,this._startTimer(),this.currentSlide.select(),this.so.preload>1){for(var n,i=this.so.preload-1,t=1;t<=i;++t){if(n=this.view.index+t,n>=this.view.slideList.length)if(this.so.loop)n=n-this.view.slideList.length;else{t=i;continue}this.view.slideList[n].loadImages()}for(i>this.view.slideList.length/2&&(i=Math.floor(this.view.slideList.length/2)),t=1;t<=i;++t){if(n=this.view.index-t,n<0)if(this.so.loop)n=this.view.slideList.length+n;else{t=i;continue}this.view.slideList[n].loadImages()}}this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_END))},t.onSwipeStart=function(){this.skipTimer()},t.skipTimer=function(){this._timer.reset(),this._delayProgress=0,this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING))},t.onTimer=function(){this._timer.getTime()>=this.view.currentSlide.delay*1e3&&(this.skipTimer(),this.view.next(),this.hideCalled=!1),this._delayProgress=this._timer.getTime()/(this.view.currentSlide.delay*10),this.so.hideLayers&&!this.hideCalled&&this.view.currentSlide.delay*1e3-this._timer.getTime()<=300&&(this.view.currentSlide.hideLayers(),this.hideCalled=!0),this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING))},t._stopTimer=function(){this._timer&&this._timer.stop()},t._startTimer=function(){this.paused||this.is_over||!this.currentSlide||!this.currentSlide.ready||this.change_started||this._timer.start()},t.__appendSlides=function(){var t,i,n=0,r=this.view.slideList.length-1;for(n;n<r;++n)t=this.view.slideList[n],t.detached||(t.$element.detach(),t.detached=!0);for(this.view.appendSlide(this.view.slideList[this.view.index]),r=3,n=1;n<=r;++n){if(i=this.view.index+n,i>=this.view.slideList.length)if(this.so.loop)i=i-this.view.slideList.length;else{n=r;continue}t=this.view.slideList[i],t.detached=!1,this.view.appendSlide(t)}for(r>this.view.slideList.length/2&&(r=Math.floor(this.view.slideList.length/2)),n=1;n<=r;++n){if(i=this.view.index-n,i<0)if(this.so.loop)i=this.view.slideList.length+i;else{n=r;continue}t=this.view.slideList[i],t.detached=!1,this.view.appendSlide(t)}},t.__resize=function(n){this.created&&(this.width=this.slider.$element[0].clientWidth||this.so.width,this.so.fullwidth||(this.width=Math.min(this.width,this.so.width)),this.so.fullheight?(this.so.heightLimit=!1,this.so.autoHeight=!1,this.height=this.slider.$element[0].clientHeight):this.height=this.width/this.slider.aspect,this.so.autoHeight?(this.currentSlide.setSize(this.width,null,n),this.view.setSize(this.width,this.currentSlide.getHeight(),n)):this.view.setSize(this.width,this.so.heightLimit?Math.min(this.height,this.so.height):this.height,n),this.slider.$controlsCont&&this.so.centerControls&&this.so.fullwidth&&this.view.$element.css("right",Math.min(0,-(this.slider.$element[0].clientWidth-this.so.width)/2)+"px"),this.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESIZE)))},t.__dispatchInit=function(){this.dispatchEvent(new MSSliderEvent(MSSliderEvent.INIT))},t.setup=function(){if(this.created=!0,this.paused=!this.so.autoplay,this.view.addEventListener(MSViewEvents.CHANGE_START,this.onChangeStart,this),this.view.addEventListener(MSViewEvents.CHANGE_END,this.onChangeEnd,this),this.view.addEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.currentSlide=this.view.slideList[this.so.start-1],this.__resize(),this.view.create(this.so.start-1),this.so.preload===0&&this.view.slideList[0].loadImages(),this.scroller=this.view.controller,this.so.wheel){var t=this,i=(new Date).getTime();this.wheellistener=function(n){var f=(new Date).getTime(),r,u;if(!(f-i<350))return i=f,r=window.event||n.orginalEvent||n,u=Math.max(-1,Math.min(1,r.wheelDelta||-r.detail)),u<0?t.next():u>0&&t.previous(),!1},n.browser.mozilla?this.slider.$element[0].addEventListener("DOMMouseScroll",this.wheellistener):this.slider.$element.bind("mousewheel",this.wheellistener)}this.slider.$element[0].clientWidth===0&&(this.slider.init_safemode=!0),this.__resize()},t.index=function(){return this.view.index},t.count=function(){return this.view.slidesCount},t.next=function(){this.skipTimer(),this.view.next()},t.previous=function(){this.skipTimer(),this.view.previous()},t.gotoSlide=function(n){n--,n=Math.min(n,this.count()-1),this.skipTimer(),this.view.gotoSlide(n)},t.destroy=function(n){this.slider.destroy(n)},t._destroy=function(){this._timer.reset(),this._timer=null,n(window).unbind("resize",this.resize_listener),this.view.destroy(),this.view=null,this.so.wheel&&(n.browser.mozilla?this.slider.$element[0].removeEventListener("DOMMouseScroll",this.wheellistener):this.slider.$element.unbind("mousewheel",this.wheellistener),this.wheellistener=null),this.so=null},t.runAction=function(n){var t=[],i;n.indexOf("(")!==-1&&(i=n.slice(0,n.indexOf("(")),t=n.slice(n.indexOf("(")+1,-1).replace(/\"|\'|\s/g,"").split(","),n=i),n in this?this[n].apply(this,t):console&&console.log('Master Slider Error: Action "'+n+'" not found.')},t.update=function(n){this.slider.init_safemode&&n&&(this.slider.init_safemode=!1),this.__resize(n)},t.locate=function(){this.__resize()},t.resume=function(){this.paused&&(this.paused=!1,this._startTimer())},t.pause=function(){this.paused||(this.paused=!0,this._stopTimer())},t.currentTime=function(){return this._delayProgress},averta.EventDispatcher.extend(t)}(jQuery),function(n){"use strict";var i={image:MSImageLayerElement,text:MSLayerElement,video:MSVideoLayerElement,hotspot:MSHotspotLayer,button:MSButtonLayer},t;window.MasterSlider=function(){this.options={autoplay:!1,loop:!1,mouse:!0,swipe:!0,grabCursor:!0,space:0,fillMode:"fill",start:1,view:"basic",width:300,height:150,inView:15,critMargin:1,heightLimit:!0,smoothHeight:!0,autoHeight:!1,fullwidth:!1,fullheight:!1,autofill:!1,layersMode:"center",hideLayers:!1,endPause:!1,centerControls:!0,overPause:!0,shuffle:!1,speed:17,dir:"h",preload:0,wheel:!1,layout:"boxed",fullscreenMargin:0,instantStartLayers:!1,parallaxMode:"mouse"},this.slides=[],this.$element=null,this.lastMargin=0,this.leftSpace=0,this.topSpace=0,this.rightSpace=0,this.bottomSpace=0;var t=this;this.resize_listener=function(){t._resize()},n(window).bind("resize",this.resize_listener)},MasterSlider.author="Averta Ltd. (www.averta.net)",MasterSlider.version="1.7.2",MasterSlider.releaseDate="July 2014",t=MasterSlider.prototype,t.__setupSlides=function(){var i=this,t,r=0;this.$element.children(".ms-slide").each(function(){var u=n(this),e,o,f,s,h;if(t=new MSSlide,t.$element=u,t.slider=i,t.delay=u.data("delay")!==undefined?u.data("delay"):3,t.fillMode=u.data("fill-mode")!==undefined?u.data("fill-mode"):i.options.fillMode,t.index=r++,e=u.children("img:not(.ms-layer)"),e.length>0&&t.setBG(e[0]),o=u.children("video"),o.length>0&&t.setBGVideo(o),i.controls)for(f=0,s=i.controls.length;f<s;++f)i.controls[f].slideAction(t);h=u.children("a").each(function(){var i=n(this);this.getAttribute("data-type")==="video"?(t.video=this.getAttribute("href"),i.remove()):i.hasClass("ms-layer")||(t.link=this.getAttribute("href"),t.link_targ=this.getAttribute("target"),i.remove())}),i.__createSlideLayers(t,u.find(".ms-layer")),i.slides.push(t),i.slideController.view.addSlide(t)})},t.__createSlideLayers=function(t,r){r.length!=0&&r.each(function(r,u){var f=n(this),h,e,o,s;u.nodeName==="A"&&f.find(">img").data("type")==="image"&&(h=n(this),f=h.find("img")),e=new i[f.data("type")||"text"],e.$element=f,e.link=h,o={},s={},f.data("effect")!==undefined&&(o.name=f.data("effect")),f.data("ease")!==undefined&&(o.ease=f.data("ease")),f.data("duration")!==undefined&&(o.duration=f.data("duration")),f.data("delay")!==undefined&&(o.delay=f.data("delay")),f.data("hide-effect")&&(s.name=f.data("hide-effect")),f.data("hide-ease")&&(s.ease=f.data("hide-ease")),f.data("hide-duration")!==undefined&&(s.duration=f.data("hide-duration")),f.data("hide-time")!==undefined&&(s.time=f.data("hide-time")),e.setStartAnim(o),e.setEndAnim(s),t.addLayer(e)})},t._removeLoading=function(){n(window).unbind("resize",this.resize_listener),this.$element=n("#"+this.id).removeClass("before-init").css("visibility","visible").css("height","").css("opacity",0),CTween.fadeIn(this.$element),this.$loading.remove(),this.slideController&&this.slideController.__resize()},t._resize=function(){if(this.$loading){var n=this.$loading[0].clientWidth/this.aspect;n=this.options.heightLimit?Math.min(n,this.options.height):n,this.$loading.height(n),this.$element.height(n)}},t._shuffleSlides=function(){for(var t=this.$element.children(".ms-slide"),i,n=0,r=t.length;n<r;++n)i=Math.floor(Math.random()*(r-1)),n!=i&&(this.$element[0].insertBefore(t[n],t[i]),t=this.$element.children(".ms-slide"))},t._setupSliderLayout=function(){this._updateSideMargins(),this.lastMargin=this.leftSpace;var t=this.options.layout;t!=="boxed"&&t!=="partialview"&&(this.options.fullwidth=!0),(t==="fullscreen"||t==="autofill")&&(this.options.fullheight=!0),t==="partialview"&&this.$element.addClass("ms-layout-partialview"),(t==="fullscreen"||t==="fullwidth")&&(n(window).bind("resize",{that:this},this._updateLayout),this._updateLayout()),n(window).bind("resize",this.slideController.resize_listener)},t._updateLayout=function(t){var i=t?t.data.that:this,f=i.options.layout,r=i.$element,u;r.width(n("body").innerWidth()-i.leftSpace-i.rightSpace),u=-r.offset().right+i.leftSpace+i.lastMargin,r.css("margin-right",u),i.lastMargin=u,f==="fullscreen"&&r.height(window.innerHeight-i.options.fullscreenMargin-i.topSpace-i.bottomSpace)},t._init=function(){var t,r,i;if(!this.preventInit){if(this.initialized=!0,this.options.preload!=="all"&&this._removeLoading(),this.options.shuffle&&this._shuffleSlides(),MSLayerEffects.setup(),this.slideController.setupView(),this.view=this.slideController.view,this.$controlsCont=n("<div><\/div>").addClass("ms-inner-controls-cont"),this.options.centerControls&&this.$controlsCont.css("max-width",this.options.width+"px"),this.$controlsCont.prepend(this.view.$element),this.$msContainer=n("<div><\/div>").addClass("ms-container").prependTo(this.$element).append(this.$controlsCont),this.controls)for(t=0,r=this.controls.length;t<r;++t)this.controls[t].setup();if(this._setupSliderLayout(),this.__setupSlides(),this.slideController.setup(),this.controls)for(t=0,r=this.controls.length;t<r;++t)this.controls[t].create();this.options.autoHeight&&this.slideController.view.$element.height(this.slideController.currentSlide.getHeight()),this.options.swipe&&!window._touch&&this.options.grabCursor&&this.options.mouse&&(i=this.view.$element,i.mousedown(function(){i.removeClass("ms-grab-cursor"),i.addClass("ms-grabbing-cursor")}).addClass("ms-grab-cursor"),n(document).mouseup(function(){i.removeClass("ms-grabbing-cursor"),i.addClass("ms-grab-cursor")})),this.slideController.__dispatchInit()}},t.setHeight=function(n){this.options.smoothHeight?(this.htween&&(this.htween.reset?this.htween.reset():this.htween.stop(!0)),this.htween=CTween.animate(this.slideController.view.$element,500,{height:n},{ease:"easeOutQuart"})):this.slideController.view.$element.height(n)},t.reserveSpace=function(n,t){var i=n+"Space",r=this[i];return this[i]+=t,this._updateSideMargins(),r},t._updateSideMargins=function(){this.$element.css("margin",this.topSpace+"px "+this.rightSpace+"px "+this.bottomSpace+"px "+this.leftSpace+"px")},t._realignControls=function(){this.rightSpace=this.leftSpace=this.topSpace=this.bottomSpace=0,this._updateSideMargins(),this.api.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESERVED_SPACE_CHANGE))},t.control=function(n,t){if(n in MSSlideController.SliderControlList){this.controls||(this.controls=[]);var i=new MSSlideController.SliderControlList[n](t);return i.slider=this,this.controls.push(i),this}},t.setup=function(t,i){var r,u,f;if(this.id=t,this.$element=typeof t=="string"?n("#"+t):t.eq(0),this.setupMarkup=this.$element.html(),this.$element.length!==0)return this.$element.addClass("master-slider").addClass("before-init"),n.browser.msie&&this.$element.addClass("ms-ie").addClass("ms-ie"+n.browser.version.slice(0,n.browser.version.indexOf("."))),r=navigator.userAgent.toLowerCase(),u=r.indexOf("android")>-1,u&&this.$element.addClass("ms-android"),f=this,n.extend(this.options,i),this.aspect=this.options.width/this.options.height,this.$loading=n("<div><\/div>").addClass("ms-loading-container").insertBefore(this.$element).append(n("<div><\/div>").addClass("ms-loading")),this.$loading.parent().css("position","relative"),this.options.autofill&&(this.options.fullwidth=!0,this.options.fullheight=!0),this.options.fullheight&&this.$element.addClass("ms-fullheight"),this._resize(),this.slideController=new MSSlideController(this),this.api=this.slideController,n(document).ready(function(){f._init()}),this},t.destroy=function(t){var i,u,r;if(this.controls)for(i=0,u=this.controls.length;i!==u;i++)this.controls[i].destroy();this.slideController&&this.slideController._destroy(),this.$loading&&this.$loading.remove(),t?this.$element.html(this.setupMarkup).css("visibility","hidden"):this.$element.remove(),r=this.options.layout,(r==="fullscreen"||r==="fullwidth")&&n(window).unbind("resize",this._updateLayout),this.view=null,this.slides=null,this.options=null,this.slideController=null,this.api=null,this.resize_listener=null}}(jQuery),window.MSViewEvents=function(n){this.type=n},MSViewEvents.SWIPE_START="swipeStart",MSViewEvents.SWIPE_END="swipeEnd",MSViewEvents.SWIPE_MOVE="swipeMove",MSViewEvents.SWIPE_CANCEL="swipeCancel",MSViewEvents.SCROLL="scoll",MSViewEvents.CHANGE_START="slideChangeStart",MSViewEvents.CHANGE_END="slideChangeEnd",function(n){"use strict";window.MSBasicView=function(t){this.options={loop:!1,dir:"h",autoHeight:!1,spacing:5,mouseSwipe:!0,swipe:!0,speed:17,minSlideSpeed:2,viewNum:20,critMargin:1},n.extend(this.options,t),this.dir=this.options.dir,this.loop=this.options.loop,this.spacing=this.options.spacing,this.__width=0,this.__height=0,this.__cssProb=this.dir==="h"?"right":"top",this.__offset=this.dir==="h"?"offsetLeft":"offsetTop",this.__dimension=this.dir==="h"?"__width":"__height",this.__translate_end=window._css3d?" translateZ(0px)":"",this.$slideCont=n("<div><\/div>").addClass("ms-slide-container"),this.$element=n("<div><\/div>").addClass("ms-view").addClass("ms-basic-view").append(this.$slideCont),this.currentSlide=null,this.index=-1,this.slidesCount=0,this.slides=[],this.slideList=[],this.viewSlidesList=[],this.css3=window._cssanim,this.start_buffer=0,this.firstslide_snap=0,this.controller=new Controller(0,0,{snapping:!0,snapsize:100,paging:!0,snappingMinSpeed:this.options.minSlideSpeed,friction:(100-this.options.speed*.5)/100,endless:this.loop}),this.controller.renderCallback(this.dir==="h"?this._horizUpdate:this._vertiUpdate,this),this.controller.snappingCallback(this.__snapUpdate,this),this.controller.snapCompleteCallback(this.__snapCompelet,this),averta.EventDispatcher.call(this)};var t=MSBasicView.prototype;t.__snapCompelet=function(){this.__locateSlides(),this.start_buffer=0,this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END))},t.__snapUpdate=function(t,i,r){var u,f;if(this.loop)u=this.index+r,this.updateLoop(u),u>=this.slidesCount&&(u=u-this.slidesCount),u<0&&(u=this.slidesCount+u),this.index=u;else{if(i<0||i>=this.slidesCount)return;this.index=i}(this._checkCritMargins(),n.browser.mozilla&&(this.slideList[this.index].$element[0].style.marginTop="0.1px",this.currentSlide&&(this.currentSlide.$element[0].style.marginTop="")),f=this.slideList[this.index],f!==this.currentSlide)&&(this.currentSlide=f,this.__updateSlidesZindex(),this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)))},t._checkCritMargins=function(){if(!this.normalMode){var r=Math.floor(this.options.viewNum/2),t=this.viewSlidesList.indexOf(this.slideList[this.index]),i=this[this.__dimension]+this.spacing,n=this.options.critMargin;if(this.loop){(t<=n||t>=this.viewSlidesList.length-n)&&(i*=t-r,this.__locateSlides(!1,i+this.start_buffer),this.start_buffer+=i);return}(t<n&&this.index>=n||t>=this.viewSlidesList.length-n&&this.index<this.slidesCount-n)&&this.__locateSlides(!1)}},t._vertiUpdate=function(n,t){if(this.__contPos=t,this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)),this.css3){this.$slideCont[0].style[window._jcsspfx+"Transform"]="translateY("+-t+"px)"+this.__translate_end;return}this.$slideCont[0].style.top=-t+"px"},t._horizUpdate=function(n,t){if(this.__contPos=t,this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)),this.css3){this.$slideCont[0].style[window._jcsspfx+"Transform"]="translateX("+-t+"px)"+this.__translate_end;return}this.$slideCont[0].style.right=-t+"px"},t.__updateViewList=function(){var t,n,i,r;if(this.normalMode){this.viewSlidesList=this.slides;return}if(t=this.viewSlidesList.slice(),this.viewSlidesList=[],n=0,i=Math.floor(this.options.viewNum/2),this.loop)for(;n!==this.options.viewNum;n++)this.viewSlidesList.push(this.slides[this.currentSlideLoc-i+n]);else{for(n=0;n!==i&&this.index-n!=-1;n++)this.viewSlidesList.unshift(this.slideList[this.index-n]);for(n=1;n!==i&&this.index+n!==this.slidesCount;n++)this.viewSlidesList.push(this.slideList[this.index+n])}for(n=0,r=t.length;n!==r;n++)this.viewSlidesList.indexOf(t[n])===-1&&t[n].sleep();t=null,this.currentSlide&&this.__updateSlidesZindex()},t.__locateSlides=function(n,t){var f,r,i,u;for(this.__updateViewList(),t=this.loop?t||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing),f=this.viewSlidesList.length,i=0;i!==f;i++)u=t+i*(this[this.__dimension]+this.spacing),r=this.viewSlidesList[i],r.wakeup(),r.position=u,r.$element[0].style[this.__cssProb]=u+"px";n!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},t.__createLoopList=function(){var t=[],n=0,i=this.slidesCount/2,r=this.slidesCount%2==0?i-1:Math.floor(i),u=this.slidesCount%2==0?i:Math.floor(i);for(this.currentSlideLoc=r,n=1;n<=r;++n)t.unshift(this.slideList[this.index-n<0?this.slidesCount-n+this.index:this.index-n]);for(t.push(this.slideList[this.index]),n=1;n<=u;++n)t.push(this.slideList[this.index+n>=this.slidesCount?this.index+n-this.slidesCount:this.index+n]);return t},t.__getSteps=function(n,t){var i=t<n?this.slidesCount-n+t:t-n,r=Math.abs(this.slidesCount-i);return i<r?i:-r},t.__pushEnd=function(){var n=this.slides.shift(),i=this.slides[this.slidesCount-2],t;(this.slides.push(n),this.normalMode)&&(t=i.$element[0][this.__offset]+this.spacing+this[this.__dimension],n.$element[0].style[this.__cssProb]=t+"px",n.position=t)},t.__pushStart=function(){var n=this.slides.pop(),i=this.slides[0],t;(this.slides.unshift(n),this.normalMode)&&(t=i.$element[0][this.__offset]-this.spacing-this[this.__dimension],n.$element[0].style[this.__cssProb]=t+"px",n.position=t)},t.__updateSlidesZindex=function(){var u,t,f,r,n;if(this.autoUpdateZIndex)if(t=this.viewSlidesList.length,f=Math.floor(t/2),this.loop)for(r=this.viewSlidesList.indexOf(this.currentSlide),n=0;n!==t;n++)u=this.viewSlidesList[n],this.viewSlidesList[n].$element.css("z-index",n<=r?n+1:t-n);else{var i=this.currentSlide.index-this.viewSlidesList[0].index,e=t-i,o=i-e;for(n=0;n!==t;n++)this.viewSlidesList[n].$element.css("z-index",n<=i?n+1:t-n);this.currentSlide.$element.css("z-index",t)}},t.addSlide=function(n){n.view=this,this.slides.push(n),this.slideList.push(n),this.slidesCount++},t.appendSlide=function(n){this.$slideCont.append(n.$element)},t.updateLoop=function(n){var t,i,r;if(this.loop)for(t=this.__getSteps(this.index,n),i=0,r=Math.abs(t);i<r;++i)t<0?this.__pushStart():this.__pushEnd()},t.gotoSlide=function(n,t){this.updateLoop(n),this.index=n;var i=this.slideList[this.index];(this._checkCritMargins(),this.controller.changeTo(i.position,!t,null,null,!1),i!==this.currentSlide)&&(this.currentSlide=i,this.__updateSlidesZindex(),this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)),t&&this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)))},t.next=function(){this.gotoSlide(this.index+1>=this.slidesCount?0:this.index+1)},t.previous=function(){this.gotoSlide(this.index-1<0?this.slidesCount-1:this.index-1)},t.setupSwipe=function(){this.swipeControl=new averta.TouchSwipe(this.$element),this.swipeControl.swipeType=this.dir==="h"?"horizontal":"vertical";var n=this;this.swipeControl.onSwipe=this.dir==="h"?function(t){n.horizSwipeMove(t)}:function(t){n.vertSwipeMove(t)}},t.vertSwipeMove=function(n){var t=n.phase,i;t==="start"?(this.controller.stop(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START))):t==="move"&&(!this.loop||Math.abs(this.currentSlide.position-this.controller.value+n.moveY)<this.cont_size/2)?this.controller.drag(n.moveY):(t==="end"||t==="cancel")&&(i=n.distanceY/n.duration*50/3,Math.abs(i)>.1?(this.controller.push(-i),i>this.controller.options.snappingMinSpeed&&this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END))):(this.controller.cancel(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL))))},t.horizSwipeMove=function(n){var t=n.phase,i;t==="start"?(this.controller.stop(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START))):t==="move"&&(!this.loop||Math.abs(this.currentSlide.position-this.controller.value+n.moveX)<this.cont_size/2)?this.controller.drag(n.moveX):(t==="end"||t==="cancel")&&(i=n.distanceX/n.duration*50/3,Math.abs(i)>.1?(this.controller.push(-i),i>this.controller.options.snappingMinSpeed&&this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END))):(this.controller.cancel(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL))))},t.setSize=function(n,t,i){if(this.lastWidth!==n||t!==this.lastHeight||i){this.$element.width(n).height(t);for(var r=0;r<this.slidesCount;++r)this.slides[r].setSize(n,t,i);this.__width=n,this.__height=t,this.__created&&(this.__locateSlides(),this.cont_size=(this.slidesCount-1)*(this[this.__dimension]+this.spacing),this.loop||(this.controller._max_value=this.cont_size),this.controller.options.snapsize=this[this.__dimension]+this.spacing,this.controller.changeTo(this.currentSlide.position,!1,null,null,!1),this.controller.cancel(),this.lastWidth=n,this.lastHeight=t)}},t.create=function(n){this.__created=!0,this.index=Math.min(n||0,this.slidesCount-1),this.loop&&(this.slides=this.__createLoopList()),this.normalMode=this.slidesCount<=this.options.viewNum;for(var t=0;t<this.slidesCount;++t)this.slides[t].create();this.__locateSlides(),this.controller.options.snapsize=this[this.__dimension]+this.spacing,this.loop||(this.controller._max_value=(this.slidesCount-1)*(this[this.__dimension]+this.spacing)),this.gotoSlide(this.index,!0),this.options.swipe&&(window._touch||this.options.mouseSwipe)&&this.setupSwipe()},t.destroy=function(){if(this.__created){for(var n=0;n<this.slidesCount;++n)this.slides[n].destroy();this.slides=null,this.slideList=null,this.$element.remove(),this.controller.destroy(),this.controller=null}},averta.EventDispatcher.extend(t),MSSlideController.registerView("basic",MSBasicView)}(jQuery),function(){"use strict";window.MSWaveView=function(n){MSBasicView.call(this,n),this.$element.removeClass("ms-basic-view").addClass("ms-wave-view"),this.$slideCont.css(window._csspfx+"transform-style","preserve-3d"),this.autoUpdateZIndex=!0},MSWaveView.extend(MSBasicView),MSWaveView._3dreq=!0,MSWaveView._fallback=MSBasicView;var n=MSWaveView.prototype,t=MSBasicView.prototype;n._horizUpdate=function(n,i){var f,u,e,r;for(t._horizUpdate.call(this,n,i),f=-i,r=0;r<this.slidesCount;++r)u=this.slideList[r],e=-f-u.position,this.__updateSlidesHoriz(u,e)},n._vertiUpdate=function(n,i){var f,u,e,r;for(t._vertiUpdate.call(this,n,i),f=-i,r=0;r<this.slidesCount;++r)u=this.slideList[r],e=-f-u.position,this.__updateSlidesVertic(u,e)},n.__updateSlidesHoriz=function(n,t){var i=Math.abs(t*100/this.__width);n.$element.css(window._csspfx+"transform","translateZ("+-i*3+"px) rotateY(0.01deg)")},n.__updateSlidesVertic=function(n,t){this.__updateSlidesHoriz(n,t)},MSSlideController.registerView("wave",MSWaveView)}(jQuery),function(){window.MSFadeBasicView=function(n){MSWaveView.call(this,n),this.$element.removeClass("ms-wave-view").addClass("ms-fade-basic-view")},MSFadeBasicView.extend(MSWaveView);var n=MSFadeBasicView.prototype,t=MSFadeBasicView.prototype;n.__updateSlidesHoriz=function(n,t){var i=Math.abs(t*.6/this.__width);i=1-Math.min(i,.6),n.$element.css("opacity",i)},n.__updateSlidesVertic=function(n,t){this.__updateSlidesHoriz(n,t)},MSSlideController.registerView("fadeBasic",MSFadeBasicView),MSWaveView._fallback=MSFadeBasicView}(),function(){window.MSFadeWaveView=function(n){MSWaveView.call(this,n),this.$element.removeClass("ms-wave-view").addClass("ms-fade-wave-view")},MSFadeWaveView.extend(MSWaveView),MSFadeWaveView._3dreq=!0,MSFadeWaveView._fallback=MSFadeBasicView;var n=MSFadeWaveView.prototype,t=MSWaveView.prototype;n.__updateSlidesHoriz=function(n,t){var i=Math.abs(t*100/this.__width);i=Math.min(i,100),n.$element.css("opacity",1-i/300),n.$element.css(window._csspfx+"transform","scale("+(1-i/800)+") rotateY(0.01deg) ")},n.__updateSlidesVertic=function(n,t){this.__updateSlidesHoriz(n,t)},MSSlideController.registerView("fadeWave",MSFadeWaveView)}(),function(){"use strict";window.MSFlowView=function(n){MSWaveView.call(this,n),this.$element.removeClass("ms-wave-view").addClass("ms-flow-view")},MSFlowView.extend(MSWaveView),MSFlowView._3dreq=!0,MSFlowView._fallback=MSFadeBasicView;var n=MSFlowView.prototype,t=MSWaveView.prototype;n.__updateSlidesHoriz=function(n,t){var i=Math.abs(t*100/this.__width),r=Math.min(i*.3,30)*(t<0?-1:1),u=i*1.2;n.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+-u*5+"px) rotateY("+r+"deg) "},n.__updateSlidesVertic=function(n,t){var i=Math.abs(t*100/this.__width),r=Math.min(i*.3,30)*(t<0?-1:1),u=i*1.2;n.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+-u*5+"px) rotateX("+-r+"deg) "},MSSlideController.registerView("flow",MSFlowView)}(jQuery),function(){window.MSFadeFlowView=function(n){MSWaveView.call(this,n),this.$element.removeClass("ms-wave-view").addClass("ms-fade-flow-view")},MSFadeFlowView.extend(MSWaveView),MSFadeFlowView._3dreq=!0;var n=MSFadeFlowView.prototype,t=MSWaveView.prototype;n.__calculate=function(n){var t=Math.min(Math.abs(n*100/this.__width),100),i=Math.min(t*.5,50)*(n<0?-1:1);return{value:t,rvalue:i}},n.__updateSlidesHoriz=function(n,t){var i=this.__calculate(t);n.$element.css("opacity",1-i.value/300),n.$element[0].style[window._csspfx+"transform"]="translateZ("+-i.value+"px) rotateY("+i.rvalue+"deg) "},n.__updateSlidesVertic=function(n,t){var i=this.__calculate(t);n.$element.css("opacity",1-i.value/300),n.$element[0].style[window._csspfx+"transform"]="translateZ("+-i.value+"px) rotateX("+-i.rvalue+"deg) "},MSSlideController.registerView("fadeFlow",MSFadeFlowView)}(),function(n){"use strict";window.MSMaskView=function(n){MSBasicView.call(this,n),this.$element.removeClass("ms-basic-view").addClass("ms-mask-view")},MSMaskView.extend(MSBasicView);var t=MSMaskView.prototype,i=MSBasicView.prototype;t.addSlide=function(t){t.view=this,t.$frame=n("<div><\/div>").addClass("ms-mask-frame").append(t.$element),t.$element[0].style.position="relative",t.autoAppend=!1,this.slides.push(t),this.slideList.push(t),this.slidesCount++},t.setSize=function(n,t){for(var u=this.slides[0].slider,r=0;r<this.slidesCount;++r)this.slides[r].$frame[0].style.width=n+"px",u.options.autoHeight||(this.slides[r].$frame[0].style.height=t+"px");i.setSize.call(this,n,t)},t._horizUpdate=function(n,t){i._horizUpdate.call(this,n,t);var r=0;if(this.css3){for(r=0;r<this.slidesCount;++r)this.slideList[r].$element[0].style[window._jcsspfx+"Transform"]="translateX("+(t-this.slideList[r].position)+"px)"+this.__translate_end;return}for(r=0;r<this.slidesCount;++r)this.slideList[r].$element[0].style.right=t-this.slideList[r].position+"px"},t._vertiUpdate=function(n,t){i._vertiUpdate.call(this,n,t);var r=0;if(this.css3){for(r=0;r<this.slidesCount;++r)this.slideList[r].$element[0].style[window._jcsspfx+"Transform"]="translateY("+(t-this.slideList[r].position)+"px)"+this.__translate_end;return}for(r=0;r<this.slidesCount;++r)this.slideList[r].$element[0].style.top=t-this.slideList[r].position+"px"},t.__pushEnd=function(){var n=this.slides.shift(),i=this.slides[this.slidesCount-2],t;(this.slides.push(n),this.normalMode)&&(t=i.$frame[0][this.__offset]+this.spacing+this[this.__dimension],n.$frame[0].style[this.__cssProb]=t+"px",n.position=t)},t.__pushStart=function(){var n=this.slides.pop(),i=this.slides[0],t;(this.slides.unshift(n),this.normalMode)&&(t=i.$frame[0][this.__offset]-this.spacing-this[this.__dimension],n.$frame[0].style[this.__cssProb]=t+"px",n.position=t)},t.__updateViewList=function(){var t,n,i,r;if(this.normalMode){this.viewSlidesList=this.slides;return}if(t=this.viewSlidesList.slice(),this.viewSlidesList=[],n=0,i=Math.floor(this.options.viewNum/2),this.loop)for(;n!==this.options.viewNum;n++)this.viewSlidesList.push(this.slides[this.currentSlideLoc-i+n]);else{for(n=0;n!==i&&this.index-n!=-1;n++)this.viewSlidesList.unshift(this.slideList[this.index-n]);for(n=1;n!==i&&this.index+n!==this.slidesCount;n++)this.viewSlidesList.push(this.slideList[this.index+n])}for(n=0,r=t.length;n!==r;n++)this.viewSlidesList.indexOf(t[n])===-1&&(t[n].sleep(),t[n].$frame.detach());t=null},t.__locateSlides=function(n,t){var f,i,r,u;for(this.__updateViewList(),t=this.loop?t||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing),f=this.viewSlidesList.length,r=0;r!==f;r++)u=t+r*(this[this.__dimension]+this.spacing),i=this.viewSlidesList[r],this.$slideCont.append(i.$frame),i.wakeup(!1),i.position=u,i.$frame[0].style[this.__cssProb]=u+"px";n!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},MSSlideController.registerView("mask",MSMaskView)}(jQuery),function(){"use strict";window.MSFadeView=function(n){MSBasicView.call(this,n),this.$element.removeClass("ms-basic-view").addClass("ms-fade-view"),this.controller.renderCallback(this.__update,this)},MSFadeView.extend(MSBasicView);var n=MSFadeView.prototype,t=MSBasicView.prototype;n.__update=function(n,t){for(var f=-t,r,u,i=0;i<this.slidesCount;++i)r=this.slideList[i],u=-f-r.position,this.__updateSlides(r,u)},n.__updateSlides=function(n,t){var i=Math.abs(t/this[this.__dimension]);1-i<=0?n.$element.fadeTo(0,0).css("visibility","hidden"):n.$element.fadeTo(0,1-i).css("visibility","")},n.__locateSlides=function(n,t){var u,r,i,f;for(this.__updateViewList(),t=this.loop?t||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing),u=this.viewSlidesList.length,i=0;i!==u;i++)f=t+i*this[this.__dimension],r=this.viewSlidesList[i],r.wakeup(),r.position=f;n!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},n.__pushEnd=function(){var n=this.slides.shift(),t=this.slides[this.slidesCount-2];this.slides.push(n),n.position=t.position+this[this.__dimension]},n.__pushStart=function(){var n=this.slides.pop(),t=this.slides[0];this.slides.unshift(n),n.position=t.position-this[this.__dimension]},n.create=function(n){t.create.call(this,n),this.spacing=0,this.controller.options.minValidDist=10},MSSlideController.registerView("fade",MSFadeView)}(jQuery),function(){"use strict";window.MSScaleView=function(n){MSBasicView.call(this,n),this.$element.removeClass("ms-basic-view").addClass("ms-scale-view"),this.controller.renderCallback(this.__update,this)},MSScaleView.extend(MSFadeView);var n=MSScaleView.prototype,t=MSFadeView.prototype;n.__updateSlides=function(n,t){var r=Math.abs(t/this[this.__dimension]),i=n.$element[0];1-r<=0?(i.style.opacity=0,i.style.visibility="hidden",i.style[window._jcsspfx+"Transform"]=""):(i.style.opacity=1-r,i.style.visibility="",i.style[window._jcsspfx+"Transform"]="perspective(2000px) translateZ("+r*(t<0?-.5:.5)*300+"px)")},n.create=function(n){t.create.call(this,n),this.controller.options.minValidDist=.03},MSSlideController.registerView("scale",MSScaleView)}(jQuery),function(){"use strict";var t=2e3,n,i;window.MSFocusView=function(n){MSWaveView.call(this,n),this.$element.removeClass("ms-wave-view").addClass("ms-focus-view"),this.options.centerSpace=this.options.centerSpace||1},MSFocusView.extend(MSWaveView),MSFocusView._3dreq=!0,MSFocusView._fallback=MSFadeBasicView,n=MSFocusView.prototype,i=MSWaveView.prototype,n.__calcview=function(n,i){var r=i/2*n/(n+t);return r*(n+t)/t},n.__updateSlidesHoriz=function(n,t){var i=Math.abs(t*100/this.__width);i=-Math.min(i,100)*15,n.$element.css(window._csspfx+"transform","translateZ("+i+"px) rotateY(0.01deg) translateX("+(t<0?1:-1)*-this.__calcview(i,this.__width)*this.options.centerSpace+"px)")},n.__updateSlidesVertic=function(n,t){var i=Math.abs(t*100/this.__width);i=-Math.min(i,100)*15,n.$element.css(window._csspfx+"transform","translateZ("+i+"px) rotateY(0.01deg) translateY("+(t<0?1:-1)*-this.__calcview(i,this.__width)*this.options.centerSpace+"px)")},MSSlideController.registerView("focus",MSFocusView)}(),function(){window.MSPartialWaveView=function(n){MSWaveView.call(this,n),this.$element.removeClass("ms-wave-view").addClass("ms-partial-wave-view")},MSPartialWaveView.extend(MSWaveView),MSPartialWaveView._3dreq=!0,MSPartialWaveView._fallback=MSFadeBasicView;var n=MSPartialWaveView.prototype,t=MSWaveView.prototype;n.__updateSlidesHoriz=function(n,t){var i=Math.abs(t*100/this.__width);n.hasBG&&n.$bg_img.css("opacity",(100-Math.abs(t*120/this.__width/3))/100),n.$element.css(window._csspfx+"transform","translateZ("+-i*3+"px) rotateY(0.01deg) translateX("+t*.75+"px)")},n.__updateSlidesVertic=function(n,t){var i=Math.abs(t*100/this.__width);n.hasBG&&n.$bg_img.css("opacity",(100-Math.abs(t*120/this.__width/3))/100),n.$element.css(window._csspfx+"transform","translateZ("+-i*3+"px) rotateY(0.01deg) translateY("+t*.75+"px)")},MSSlideController.registerView("partialWave",MSPartialWaveView)}(),function(n){"use strict";var i=function(){this.options={prefix:"ms-",autohide:!0,overVideo:!0}},t=i.prototype;t.slideAction=function(){},t.setup=function(){this.cont=this.options.insertTo?n(this.options.insertTo):this.slider.$controlsCont,this.options.overVideo||this._hideOnvideoStarts(),this.options.hideUnder&&(n(window).bind("resize",{that:this},this.onResize),this.onResize(),this.needsRealign=!this.options.insetTo&&(this.options.align==="right"||this.options.align==="right")&&this.options.inset===!1)},t.onResize=function(n){var t=n&&n.data.that||this,i=window.innerWidth;i<=t.options.hideUnder&&!t.detached?(t.hide(!0),t.detached=!0,t.onDetach()):i>=t.options.hideUnder&&t.detached&&(t.detached=!1,t.visible(),t.onAppend())},t.create=function(){var t=this;this.options.autohide&&!window._touch&&(this.hide(!0),this.slider.$controlsCont.mouseenter(function(){t._disableAH||t.mdown||t.visible(),t.mleave=!1}).mouseleave(function(){t.mleave=!0,t.mdown||t.hide()}).mousedown(function(){t.mdown=!0}),n(document).mouseup(function(){t.mdown&&t.mleave&&t.hide(),t.mdown=!1}))},t.onAppend=function(){this.needsRealign&&this.slider._realignControls()},t.onDetach=function(){this.needsRealign&&this.slider._realignControls()},t._hideOnvideoStarts=function(){var n=this;slider.api.addEventListener(MSSliderEvent.VIDEO_PLAY,function(){n._disableAH=!0,n.hide()}),slider.api.addEventListener(MSSliderEvent.VIDEO_CLOSE,function(){n._disableAH=!1,n.visible()})},t.hide=function(n){n?(this.$element.css("opacity",0),this.$element.css("display","none")):CTween.fadeOut(this.$element,400,!1),this.$element.addClass("ms-ctrl-hide")},t.visible=function(){this.detached||(this.$element.css("display",""),CTween.fadeIn(this.$element,400),this.$element.removeClass("ms-ctrl-hide"))},t.destroy=function(){this.options&&this.options.hideUnder&&n(window).unbind("resize",this.onResize)},window.BaseControl=i}(jQuery),function(n){"use strict";var i=function(t){BaseControl.call(this),n.extend(this.options,t)},t,r;i.extend(BaseControl),t=i.prototype,r=BaseControl.prototype,t.setup=function(){var t=this;this.$next=n("<div><\/div>").addClass(this.options.prefix+"nav-next").bind("click",function(){t.slider.options.loop||t.slider.api.index()!==t.slider.api.count()-1?t.slider.api.next():t.slider.view.controller.bounce(10)}),this.$prev=n("<div><\/div>").addClass(this.options.prefix+"nav-prev").bind("click",function(){t.slider.options.loop||t.slider.api.index()!==0?t.slider.api.previous():t.slider.view.controller.bounce(-10)}),r.setup.call(this),this.cont.append(this.$next),this.cont.append(this.$prev)},t.hide=function(n){if(n){this.$prev.css("opacity",0).css("display","none"),this.$next.css("opacity",0).css("display","none");return}CTween.fadeOut(this.$prev,400,!1),CTween.fadeOut(this.$next,400,!1),this.$prev.addClass("ms-ctrl-hide"),this.$next.addClass("ms-ctrl-hide")},t.visible=function(){this.detached||(CTween.fadeIn(this.$prev,400),CTween.fadeIn(this.$next,400),this.$prev.removeClass("ms-ctrl-hide").css("display",""),this.$next.removeClass("ms-ctrl-hide").css("display",""))},t.destroy=function(){r.destroy(),this.$next.remove(),this.$prev.remove()},window.MSArrows=i,MSSlideController.registerControl("arrows",i)}(jQuery),function(n){"use strict";var i=function(t){BaseControl.call(this),this.options.dir="h",this.options.wheel=t.dir==="v",this.options.arrows=!0,this.options.speed=17,this.options.align=null,this.options.inset=!1,this.options.margin=10,this.options.space=10,this.options.width=100,this.options.height=100,this.options.type="thumbs",n.extend(this.options,t),this.thumbs=[],this.index_count=0,this.__dimen=this.options.dir==="h"?"width":"height",this.__alignsize=this.options.dir==="h"?"height":"width",this.__jdimen=this.options.dir==="h"?"outerWidth":"outerHeight",this.__pos=this.options.dir==="h"?"right":"top",this.click_enable=!0},t,r;i.extend(BaseControl),t=i.prototype,r=BaseControl.prototype,t.setup=function(){var i,t;this.$element=n("<div><\/div>").addClass(this.options.prefix+"thumb-list"),this.options.type==="tabs"&&this.$element.addClass(this.options.prefix+"tabs"),this.$element.addClass("ms-dir-"+this.options.dir),r.setup.call(this),this.slider.$controlsCont===this.cont?this.$element.appendTo(this.slider.$element):this.$element.appendTo(this.cont),this.$thumbscont=n("<div><\/div>").addClass("ms-thumbs-cont").appendTo(this.$element),this.options.arrows&&(i=this,this.$fwd=n("<div><\/div>").addClass("ms-thumblist-fwd").appendTo(this.$element).click(function(){i.controller.push(-15)}),this.$bwd=n("<div><\/div>").addClass("ms-thumblist-bwd").appendTo(this.$element).click(function(){i.controller.push(15)})),!this.options.insetTo&&this.options.align&&(t=this.options.align,this.options.inset?this.$element.css(t,this.options.margin):t==="top"?this.$element.detach().prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):t==="bottom"?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align()),this.options.dir==="v"?this.$element.width(this.options.width):this.$element.height(this.options.height))},t.align=function(){if(!this.detached){var n=this.options.align,t=this.slider.reserveSpace(n,this.options[this.__alignsize]+this.options.margin*2);this.$element.css(n,-t-this.options[this.__alignsize]-this.options.margin)}},t.slideAction=function(t){var i=n(t.$element.find(".ms-thumb")),f=this,r=n("<div><\/div>").addClass("ms-thumb-frame").append(i).append(n('<div class="ms-thumb-ol"><\/div>')).bind("click",function(){f.changeSlide(r)}),u;if(this.options.align&&r.width(this.options.width).height(this.options.height).css("margin-"+(this.options.dir==="v"?"bottom":"right"),this.options.space),r[0].index=this.index_count++,this.$thumbscont.append(r),this.options.fillMode&&i.is("img")&&(u=new window.MSAligner(this.options.fillMode,r,i),i[0].aligner=u,i.one("load",function(){var t=n(this);t[0].aligner.init(t.width(),t.height()),t[0].aligner.align()}).each(n.jqLoadFix)),n.browser.msie)i.on("dragstart",function(n){n.preventDefault()});this.thumbs.push(r)},t.create=function(){var t;r.create.call(this),this.__translate_end=window._css3d?" translateZ(0px)":"",this.controller=new Controller(0,0,{snappingMinSpeed:2,friction:(100-this.options.speed*.5)/100}),this.controller.renderCallback(this.options.dir==="h"?this._hMove:this._vMove,this),t=this,this.resize_listener=function(){t.__resize()},n(window).bind("resize",this.resize_listener),this.thumbSize=this.thumbs[0][this.__jdimen](!0),this.setupSwipe(),this.__resize(),t=this,this.options.wheel&&(this.wheellistener=function(n){var i=window.event||n.orginalEvent||n,r=Math.max(-1,Math.min(1,i.wheelDelta||-i.detail));return t.controller.push(-r*10),!1},n.browser.mozilla?this.$element[0].addEventListener("DOMMouseScroll",this.wheellistener):this.$element.bind("mousewheel",this.wheellistener)),this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.cindex=this.slider.api.index(),this.select(this.thumbs[this.cindex])},t._hMove=function(n,t){if(this.__contPos=t,window._cssanim){this.$thumbscont[0].style[window._jcsspfx+"Transform"]="translateX("+-t+"px)"+this.__translate_end;return}this.$thumbscont[0].style.right=-t+"px"},t._vMove=function(n,t){if(this.__contPos=t,window._cssanim){this.$thumbscont[0].style[window._jcsspfx+"Transform"]="translateY("+-t+"px)"+this.__translate_end;return}this.$thumbscont[0].style.top=-t+"px"},t.setupSwipe=function(){this.swipeControl=new averta.TouchSwipe(this.$element),this.swipeControl.swipeType=this.options.dir==="h"?"horizontal":"vertical";var n=this;this.swipeControl.onSwipe=this.options.dir==="h"?function(t){n.horizSwipeMove(t)}:function(t){n.vertSwipeMove(t)}},t.vertSwipeMove=function(n){var t,i;this.dTouch||(t=n.phase,t==="start"?this.controller.stop():t==="move"?this.controller.drag(n.moveY):(t==="end"||t==="cancel")&&(i=Math.abs(n.distanceY/n.duration*50/3),i>.1?this.controller.push(-n.distanceY/n.duration*50/3):(this.click_enable=!0,this.controller.cancel())))},t.horizSwipeMove=function(n){var t,i;this.dTouch||(t=n.phase,t==="start"?(this.controller.stop(),this.click_enable=!1):t==="move"?this.controller.drag(n.moveX):(t==="end"||t==="cancel")&&(i=Math.abs(n.distanceX/n.duration*50/3),i>.1?this.controller.push(-n.distanceX/n.duration*50/3):(this.click_enable=!0,this.controller.cancel())))},t.update=function(){var n=this.slider.api.index();this.cindex!==n&&(this.cindex!=null&&this.unselect(this.thumbs[this.cindex]),this.cindex=n,this.select(this.thumbs[this.cindex]),this.dTouch||this.updateThumbscroll())},t.updateThumbscroll=function(){var n=this.thumbSize*this.cindex,t;if(this.controller.value==NaN&&(this.controller.value=0),n-this.controller.value<0){this.controller.gotoSnap(this.cindex,!0);return}if(n+this.thumbSize-this.controller.value>this.$element[this.__dimen]()){t=this.cindex-Math.floor(this.$element[this.__dimen]()/this.thumbSize)+1,this.controller.gotoSnap(t,!0);return}},t.changeSlide=function(n){this.click_enable&&this.cindex!==n[0].index&&this.slider.api.gotoSlide(n[0].index)},t.unselect=function(n){n.removeClass("ms-thumb-frame-selected")},t.select=function(n){n.addClass("ms-thumb-frame-selected")},t.__resize=function(){var n=this.$element[this.__dimen](),t;this.ls!==n&&(this.ls=n,this.thumbSize=this.thumbs[0][this.__jdimen](!0),t=this.slider.api.count()*this.thumbSize,this.$thumbscont[0].style[this.__dimen]=t+"px",t<=n?(this.dTouch=!0,this.controller.stop(),this.$thumbscont[0].style[this.__pos]=(n-t)*.5+"px",this.$thumbscont[0].style[window._jcsspfx+"Transform"]=""):(this.dTouch=!1,this.click_enable=!0,this.$thumbscont[0].style[this.__pos]="",this.controller._max_value=t-n,this.controller.options.snapsize=this.thumbSize,this.updateThumbscroll()))},t.destroy=function(){r.destroy(),this.options.wheel&&(n.browser.mozilla?this.$element[0].removeEventListener("DOMMouseScroll",this.wheellistener):this.$element.unbind("mousewheel",this.wheellistener),this.wheellistener=null),n(window).unbind("resize",this.resize_listener),this.$element.remove(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this)},window.MSThumblist=i,MSSlideController.registerControl("thumblist",i)}(jQuery),function(n){"use strict";var i=function(t){BaseControl.call(this),this.options.dir="h",this.options.inset=!0,this.options.margin=10,n.extend(this.options,t),this.bullets=[]},t,r;i.extend(BaseControl),t=i.prototype,r=BaseControl.prototype,t.setup=function(){if(r.setup.call(this),this.$element=n("<div><\/div>").addClass(this.options.prefix+"bullets").addClass("ms-dir-"+this.options.dir).appendTo(this.cont),this.$bullet_cont=n("<div><\/div>").addClass("ms-bullets-count").appendTo(this.$element),!this.options.insetTo&&this.options.align){this.$element.css({top:"auto",bottom:"auto"});var t=this.options.align;this.options.inset&&this.$element.css(t,this.options.margin)}},t.create=function(){var u,i,t;for(r.create.call(this),u=this,this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.cindex=this.slider.api.index(),i=0;i<this.slider.api.count();++i){t=n("<div><\/div>").addClass("ms-bullet"),t[0].index=i;t.on("click",function(){u.changeSlide(this.index)});this.$bullet_cont.append(t),this.bullets.push(t)}this.options.dir==="h"&&this.$element.width(t.outerWidth(!0)*this.slider.api.count()),this.select(this.bullets[this.cindex])},t.update=function(){var n=this.slider.api.index();this.cindex!==n&&(this.cindex!=null&&this.unselect(this.bullets[this.cindex]),this.cindex=n,this.select(this.bullets[this.cindex]))},t.changeSlide=function(n){this.cindex!==n&&this.slider.api.gotoSlide(n)},t.unselect=function(n){n.removeClass("ms-bullet-selected")},t.select=function(n){n.addClass("ms-bullet-selected")},t.destroy=function(){r.destroy(),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.$element.remove()},window.MSBulltes=i,MSSlideController.registerControl("bullets",i)}(jQuery),function(n){"use strict";var i=function(t){BaseControl.call(this),this.options.dir="h",this.options.autohide=!0,this.options.width=4,this.options.color="#3D3D3D",this.options.margin=10,n.extend(this.options,t),this.__dimen=this.options.dir==="h"?"width":"height",this.__jdimen=this.options.dir==="h"?"outerWidth":"outerHeight",this.__pos=this.options.dir==="h"?"right":"top",this.__translate_end=window._css3d?" translateZ(0px)":"",this.__translate_start=this.options.dir==="h"?" translateX(":"translateY("},t,r;i.extend(BaseControl),t=i.prototype,r=BaseControl.prototype,t.setup=function(){if(this.$element=n("<div><\/div>").addClass(this.options.prefix+"sbar").addClass("ms-dir-"+this.options.dir),r.setup.call(this),this.slider.$controlsCont===this.cont?this.$element.appendTo(this.slider.$element):this.$element.appendTo(this.cont),this.$bar=n("<div><\/div>").addClass(this.options.prefix+"bar").appendTo(this.$element),this.slider.options.loop&&(console.log("WARNING, MSScrollbar cannot work with looped slider."),this.disable=!0,this.$element.remove()),this.options.dir==="v"?this.$bar.width(this.options.width):this.$bar.height(this.options.width),this.$bar.css("background-color",this.options.color),!this.options.insetTo&&this.options.align){this.options.dir==="v"?this.$element.css({left:"auto",right:"auto"}):this.$element.css({top:"auto",bottom:"auto"});var t=this.options.align;this.options.inset?this.$element.css(t,this.options.margin):t==="top"?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):t==="bottom"?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align())}},t.align=function(){if(!this.detached){var n=this.options.align,t=this.slider.reserveSpace(n,this.options.margin*2+this.options.width);this.$element.css(n,-t-this.options.margin-this.options.width)}},t.create=function(){if(!this.disable){var n=this;this.scroller=this.slider.api.scroller,this.slider.api.view.addEventListener(MSViewEvents.SCROLL,this._update,this),this.slider.api.addEventListener(MSSliderEvent.RESIZE,this._resize,this),this._resize(),this.options.autohide&&this.$bar.css("opacity","0")}},t._resize=function(){this.vdimen=this.$element[this.__dimen](),this.bar_dimen=this.slider.api.view["__"+this.__dimen]*this.vdimen/this.scroller._max_value,this.$bar[this.__dimen](this.bar_dimen)},t._update=function(){var n=this.scroller.value*(this.vdimen-this.bar_dimen)/this.scroller._max_value,t;if(this.lvalue!==n){if(this.lvalue=n,this.options.autohide&&(clearTimeout(this.hto),this.$bar.css("opacity","1"),t=this,this.hto=setTimeout(function(){t.$bar.css("opacity","0")},150)),n<0){this.$bar[0].style[this.__dimen]=this.bar_dimen+n+"px";return}if(n>this.vdimen-this.bar_dimen&&(this.$bar[0].style[this.__dimen]=this.vdimen-n+"px"),window._cssanim){this.$bar[0].style[window._jcsspfx+"Transform"]=this.__translate_start+n+"px)"+this.__translate_end;return}this.$bar[0].style[this.__pos]=n+"px"}},t.destroy=function(){r.destroy(),this.slider.api.view.removeEventListener(MSViewEvents.SCROLL,this._update,this),this.slider.api.removeEventListener(MSSliderEvent.RESIZE,this._resize,this),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.$element.remove()},window.MSScrollbar=i,MSSlideController.registerControl("scrollbar",i)}(jQuery),function(n){"use strict";var r=function(t){BaseControl.call(this),this.options.autohide=!1,this.options.width=4,this.options.color="#FFFFFF",this.options.inset=!0,this.options.margin=0,n.extend(this.options,t)},t,i;r.extend(BaseControl),t=r.prototype,i=BaseControl.prototype,t.setup=function(){var r=this,t;i.setup.call(this),this.$element=n("<div><\/div>").addClass(this.options.prefix+"timerbar"),i.setup.call(this),this.slider.$controlsCont===this.cont?this.$element.appendTo(this.slider.$element):this.$element.appendTo(this.cont),this.$bar=n("<div><\/div>").addClass("ms-time-bar").appendTo(this.$element),this.options.dir==="v"?(this.$bar.width(this.options.width),this.$element.width(this.options.width)):(this.$bar.height(this.options.width),this.$element.height(this.options.width)),this.$bar.css("background-color",this.options.color),!this.options.insetTo&&this.options.align&&(this.$element.css({top:"auto",bottom:"auto"}),t=this.options.align,this.options.inset?this.$element.css(t,this.options.margin):t==="top"?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):t==="bottom"?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align()))},t.align=function(){if(!this.detached){var n=this.options.align,t=this.slider.reserveSpace(n,this.options.margin*2+this.options.width);this.$element.css(n,-t-this.options.margin-this.options.width)}},t.create=function(){i.create.call(this),this.slider.api.addEventListener(MSSliderEvent.WAITING,this._update,this),this._update()},t._update=function(){this.$bar[0].style.width=this.slider.api._delayProgress+"%"},t.destroy=function(){i.destroy(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.WAITING,this._update,this),this.$element.remove()},window.MSTimerbar=r,MSSlideController.registerControl("timebar",r)}(jQuery),function(n){"use strict";var i=function(t){BaseControl.call(this),this.options.color="#A2A2A2",this.options.stroke=10,this.options.radius=4,this.options.autohide=!1,n.extend(this.options,t)},t,r;i.extend(BaseControl),t=i.prototype,r=BaseControl.prototype,t.setup=function(){var t=this;if(r.setup.call(this),this.$element=n("<div><\/div>").addClass(this.options.prefix+"ctimer").appendTo(this.cont),this.$canvas=n("<canvas><\/canvas>").addClass("ms-ctimer-canvas").appendTo(this.$element),this.$bar=n("<div><\/div>").addClass("ms-ctimer-bullet").appendTo(this.$element),!this.$canvas[0].getContext){this.destroy(),this.disable=!0;return}this.ctx=this.$canvas[0].getContext("2d"),this.prog=0,this.__w=(this.options.radius+this.options.stroke/2)*2,this.$canvas[0].width=this.__w,this.$canvas[0].height=this.__w},t.create=function(){if(!this.disable){r.create.call(this),this.slider.api.addEventListener(MSSliderEvent.WAITING,this._update,this);var n=this;this.$element.click(function(){n.slider.api.paused?n.slider.api.resume():n.slider.api.pause()}),this._update()}},t._update=function(){var t=this;n(this).stop(!0).animate({prog:this.slider.api._delayProgress*.01},{duration:200,step:function(){t._draw()}})},t._draw=function(){this.ctx.clearRect(0,0,this.__w,this.__w),this.ctx.beginPath(),this.ctx.arc(this.__w*.5,this.__w*.5,this.options.radius,Math.PI*1.5,Math.PI*1.5+2*Math.PI*this.prog,!1),this.ctx.strokeStyle=this.options.color,this.ctx.lineWidth=this.options.stroke,this.ctx.stroke()},t.destroy=function(){(r.destroy(),this.disable)||(n(this).stop(!0),this.slider.api.removeEventListener(MSSliderEvent.WAITING,this._update,this),this.$element.remove())},window.MSCircleTimer=i,MSSlideController.registerControl("circletimer",i)}(jQuery),function(n){"use strict";window.MSLightbox=function(t){BaseControl.call(this,t),this.options.autohide=!1,n.extend(this.options,t),this.data_list=[]},MSLightbox.fadeDuratation=400,MSLightbox.extend(BaseControl);var t=MSLightbox.prototype,i=BaseControl.prototype;t.setup=function(){i.setup.call(this),this.$element=n("<div><\/div>").addClass(this.options.prefix+"lightbox-btn").appendTo(this.cont)},t.slideAction=function(t){n("<div><\/div>").addClass(this.options.prefix+"lightbox-btn").appendTo(t.$element).append(n(t.$element.find(".ms-lightbox")))},t.create=function(){i.create.call(this)},MSSlideController.registerControl("lightbox",MSLightbox)}(jQuery),function(n){"use strict";window.MSSlideInfo=function(t){BaseControl.call(this,t),this.options.autohide=!1,this.options.align=null,this.options.inset=!1,this.options.margin=10,this.options.size=100,this.options.dir="h",n.extend(this.options,t),this.data_list=[]},MSSlideInfo.fadeDuratation=400,MSSlideInfo.extend(BaseControl);var t=MSSlideInfo.prototype,i=BaseControl.prototype;t.setup=function(){if(this.$element=n("<div><\/div>").addClass(this.options.prefix+"slide-info").addClass("ms-dir-"+this.options.dir),i.setup.call(this),this.slider.$controlsCont===this.cont?this.$element.appendTo(this.slider.$element):this.$element.appendTo(this.cont),!this.options.insetTo&&this.options.align){var t=this.options.align;this.options.inset?this.$element.css(t,this.options.margin):t==="top"?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):t==="bottom"?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align()),this.options.dir==="v"?this.$element.width(this.options.size):this.$element.css("min-height",this.options.size)}},t.align=function(){if(!this.detached){var n=this.options.align,t=this.slider.reserveSpace(n,this.options.size+this.options.margin*2);this.$element.css(n,-t-this.options.size-this.options.margin)}},t.slideAction=function(t){var i=n(t.$element.find(".ms-info")),r=this;i.detach(),this.data_list[t.index]=i},t.create=function(){i.create.call(this),this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.cindex=this.slider.api.index(),this.switchEle(this.data_list[this.cindex])},t.update=function(){var n=this.slider.api.index();this.switchEle(this.data_list[n]),this.cindex=n},t.switchEle=function(n){if(this.current_ele){var t=this;this.current_ele[0].tween&&this.current_ele[0].tween.stop(!0),this.current_ele[0].tween=CTween.animate(this.current_ele,MSSlideInfo.fadeDuratation,{opacity:0},{complete:function(){this.detach(),this[0].tween=null,n.css("position","relative")},target:this.current_ele}),n.css("position","absolute")}this.__show(n)},t.__show=function(n){n.appendTo(this.$element).css("opacity","0"),this.current_ele&&n.height(Math.max(n.height(),this.current_ele.height())),clearTimeout(this.tou),this.tou=setTimeout(function(){CTween.fadeIn(n,MSSlideInfo.fadeDuratation),n.css("height","")},MSSlideInfo.fadeDuratation),n[0].tween&&n[0].tween.stop(!0),this.current_ele=n},t.destroy=function(){i.destroy(),clearTimeout(this.tou),this.current_ele&&this.current_ele[0].tween&&this.current_ele[0].tween.stop("true"),this.$element.remove(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this)},MSSlideController.registerControl("slideinfo",MSSlideInfo)}(jQuery),function(n){window.MSGallery=function(t,i){this.id=t,this.slider=i,this.telement=n("#"+t),this.botcont=n("<div><\/div>").addClass("ms-gallery-botcont").appendTo(this.telement),this.thumbcont=n("<div><\/div>").addClass("ms-gal-thumbcont hide-thumbs").appendTo(this.botcont),this.playbtn=n("<div><\/div>").addClass("ms-gal-playbtn").appendTo(this.botcont),this.thumbtoggle=n("<div><\/div>").addClass("ms-gal-thumbtoggle").appendTo(this.botcont),i.control("thumblist",{insertTo:this.thumbcont,autohide:!1,dir:"h"}),i.control("slidenum",{insertTo:this.botcont,autohide:!1}),i.control("slideinfo",{insertTo:this.botcont,autohide:!1}),i.control("timebar",{insertTo:this.botcont,autohide:!1}),i.control("bullets",{insertTo:this.botcont,autohide:!1})};var t=MSGallery.prototype;t._init=function(){var n=this;this.slider.api.paused||this.playbtn.addClass("btn-pause"),this.playbtn.click(function(){n.slider.api.paused?(n.slider.api.resume(),n.playbtn.addClass("btn-pause")):(n.slider.api.pause(),n.playbtn.removeClass("btn-pause"))}),this.thumbtoggle.click(function(){n.vthumbs?(n.thumbtoggle.removeClass("btn-hide"),n.vthumbs=!1,n.thumbcont.addClass("hide-thumbs")):(n.thumbtoggle.addClass("btn-hide"),n.thumbcont.removeClass("hide-thumbs"),n.vthumbs=!0)})},t.setup=function(){var t=this;n(document).ready(function(){t._init()})}}(jQuery),function(n){var u=function(n,t,i){return"https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+n+"&photoset_id="+t+"&per_page="+i+"&extras=description,date_taken,owner_name,views&format=json&jsoncallback=?"},f=function(n,t,i){return"https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key="+n+"&user_id="+t+"&per_page="+i+"&extras=description,date_taken,owner_name,views&format=json&jsoncallback=?"},r=function(n,t,i,r,u){return"https://farm"+n+".staticflickr.com/"+t+"/"+i+"_"+r+u+".jpg"},t,i;window.MSFlickrV2=function(t,i){var e={count:10,type:"photoset",thumbSize:"q",imgSize:"c"},r;if(this.slider=t,this.slider.preventInit=!0,!i.key){this.errMsg("Flickr API Key required. Please add it in settings.");return}n.extend(e,i),this.options=e,r=this,this.options.type==="photoset"?n.getJSON(u(this.options.key,this.options.id,this.options.count),function(n){r._photosData(n)}):n.getJSON(f(this.options.key,this.options.id,this.options.count),function(n){r.options.type="photos",r._photosData(n)}),this.options.imgSize!==""&&this.options.imgSize!=="-"&&(this.options.imgSize="_"+this.options.imgSize),this.options.thumbSize="_"+this.options.thumbSize,this.slideTemplate=this.slider.$element.find(".ms-slide")[0].outerHTML,this.slider.$element.find(".ms-slide").remove()},t=MSFlickrV2.prototype,t._photosData=function(t){if(t.stat==="fail"){this.errMsg("Flickr API ERROR#"+t.code+": "+t.message);return}var r=this,u=this.options.author||this.options.desc;n.each(t[this.options.type].photo,function(t,u){var f=r.slideTemplate.replace(/{{[\w-]+}}/g,function(n){return n=n.replace(/{{|}}/g,""),i[n]?i[n](u,r):"["+n+"]"});n(f).appendTo(r.slider.$element)}),r._initSlider()},t.errMsg=function(t){this.slider.$element.css("display","block"),this.errEle||(this.errEle=n('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; right:10px"><\/div>').appendTo(this.slider.$loading)),this.errEle.html(t)},t._initSlider=function(){this.slider.preventInit=!1,this.slider._init()},i={image:function(n,t){return r(n.farm,n.server,n.id,n.secret,t.options.imgSize)},thumb:function(n,t){return r(n.farm,n.server,n.id,n.secret,t.options.thumbSize)},title:function(n){return n.title},"owner-name":function(n){return n.ownername},"date-taken":function(n){return n.datetaken},views:function(n){return n.views},description:function(n){return n.description._content}}}(jQuery),function(n){var t,i,r;window.MSFacebookGallery=function(t,i){var u={count:10,type:"photostream",thumbSize:"320",imgSize:"orginal",https:!1},r;this.slider=t,this.slider.preventInit=!0,n.extend(u,i),this.options=u,this.graph=this.options.https?"https://graph.facebook.com":"https://graph.facebook.com",r=this,this.options.type==="photostream"?n.getJSON(this.graph+"/"+this.options.username+"/photos/uploaded/?fields=source,name,link,images,from&limit="+this.options.count,function(n){r._photosData(n)}):n.getJSON(this.graph+"/"+this.options.albumId+"/photos?fields=source,name,link,images,from&limit="+this.options.count,function(n){r._photosData(n)}),this.slideTemplate=this.slider.$element.find(".ms-slide")[0].outerHTML,this.slider.$element.find(".ms-slide").remove()},t=MSFacebookGallery.prototype,t._photosData=function(t){var i,o,u,f,e;if(t.error){this.errMsg("Facebook API ERROR#"+t.error.code+"("+t.error.type+"): "+t.error.message);return}for(i=this,o=this.options.author||this.options.desc,u=0,f=t.data.length;u!==f;u++)e=i.slideTemplate.replace(/{{[\w-]+}}/g,function(n){return n=n.replace(/{{|}}/g,""),r[n]?r[n](t.data[u],i):"{{"+n+"}}"}),n(e).appendTo(i.slider.$element);i._initSlider()},t.errMsg=function(t){this.slider.$element.css("display","block"),this.errEle||(this.errEle=n('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; right:10px"><\/div>').appendTo(this.slider.$loading)),this.errEle.html(t)},t._initSlider=function(){this.slider.preventInit=!1,this.slider._init()},i=function(n,t){if(t==="orginal")return n[0].source;for(var i=0,r=n.length;i!==r;i++)if(n[i].source.indexOf(t+"x"+t)!==-1)return n[i].source;return n[r-3].source},r={image:function(n,t){return i(n.images,t.options.imgSize)},thumb:function(n,t){return i(n.images,t.options.thumbSize)},name:function(n){return n.name},"owner-name":function(n){return n.from.name},link:function(n){return n.link}}}(jQuery)
//@ sourceMappingURL=masterslider.map

