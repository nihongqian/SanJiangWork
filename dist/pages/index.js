"use strict";var _createClass=function(){function e(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}require(["../scripts/libs/config.js"],function(){require(["jquery","swiper","cookie"],function(f,t){f(".send_more .top_menu li").click(function(){f(this).addClass("cur").siblings("li").removeClass("cur"),f(".send_more .nr_menu li").css("display","none").eq(f(this).index()).css("display","block")}),f(".categorys .item").mouseenter(function(){var t=f(document).scrollTop(),n=f("#nav").offset().top;f(this).addClass("active").find(".product_wrap").show(),n<=t?f(this).find(".product_wrap").css("top",t-n-40):f(this).find(".product_wrap").css("top",0)}),f(".categorys .item").mouseleave(function(){f(this).removeClass("active"),f(this).find(".product_wrap").hide()}),f(function(){var n,t=f("#focus-banner-list li"),i=f(".next"),e=f(".prev"),s=f("div.banner_point i"),o=t.length,l=0;function a(){t.eq(l).stop().fadeIn().siblings().stop().fadeOut(),clearInterval(n),n=setInterval(function(){i.click()},4e3)}s.on("mouseenter click",function(){var t=f(this);t.stop().fadeIn().addClass("current_point").siblings("i.current_point").removeClass("current_point"),clearInterval(n),l=s.index(t),a()}),i.click(function(){o-1<++l&&(l=0),s.eq(l).addClass("current_point").siblings("i.current_point").removeClass("current_point"),a()}),e.on("click",function(){--l<0&&(l=o-1),s.eq(l).addClass("current_point").siblings("i.current_point").removeClass("current_point"),a()}),n=setInterval(function(){i.click()},3e3)}),f("#focus").mouseenter(function(){f("#focus .s_prev, .s_next").show()}),f("#focus").mouseleave(function(){f("#focus .s_prev, .s_next").hide()}),f("#focus .s_prev, .s_next").hover(function(){f(this).stop(!0,!1).animate({opacity:"1"},500)},function(){f(this).stop(!0,!1).animate({opacity:"0.5"},500)}),function(t,n,i,e,s){var o=f(t),l=f(n),a=f(i),c=f(e).find("ul"),r=c.find("li").outerWidth(!0),u=c.find("li").length;if(a.click(function(){if(c.is(":animated")&&c.stop(),u<=3)return!1;c.animate({"margin-left":-r},function(){c.find("li").eq(0).appendTo(c),c.css("margin-left",0)})}),l.click(function(){if(c.is(":animated")&&c.stop(),u<=3)return!1;c.find("li:last").prependTo(c),c.css("margin-left",-r),c.animate({"margin-left":0})}),!0===s){var d=window.setInterval(function(){a.click()},5e3);o.mouseenter(function(){clearInterval(d)}),o.mouseleave(function(){d=setInterval(function(){a.click()},5e3)})}}("#focus",".s_prev",".s_next",".img_list",!0),f(window).scroll(function(){var t=f(this).scrollTop();1e3<t?f(".side_left_nav").fadeIn():f(".side_left_nav").fadeOut();var n=Math.floor((t-1e3)/630);f(".side_left_nav ul li").eq(n).addClass("cur").siblings().removeClass("cur")}),f(".side_left_nav ul li").click(function(){var t=f(".side_left_nav ul li").index(this)+1,n=f("#floor_"+t).position().top;f("body,html").stop().animate({scrollTop:n},300)}),f("#totop").click(function(){f("body,html").stop().animate({scrollTop:0},500)}),f(function(){var i=0;f("#change_goods").click(function(){var t=f("div.product_all"),n=t.length;f(t[i++]).stop().hide(),n<=i&&(i=0),f(t[i]).stop().show()})}),f(".hot_goods .mc .product_b ul li").click(function(){location.href="details.html"}),f(function(){f("ul.ul_class").children("li").mouseover(function(){f(this).addClass("cc").siblings("li.cc").removeClass("cc");var t=f(this).parent().children("li").index(this);f(this).parent().parent(".mt").next(".mc").children(".center").children(".cs").stop().animate({left:-816*t})})}),f(".side_right_nav ").each(function(){var t=f(".side_right_nav .mc");t.mouseenter(function(){f(this).addClass("current")}),t.mouseleave(function(){f(this).removeClass("current")})});var n=function(){function n(t){_classCallCheck(this,n),this.ul=t.ul,this.url=t.url,this.load()}return _createClass(n,[{key:"load",value:function(){var n=this;f.ajax({url:this.url,success:function(t){n.res=t,n.display()}})}},{key:"display",value:function(){var i="";f.each(this.res,function(t,n){i+='<li>\n\t\t\t\t\t\t\t<a href="details.html" target="_blank" class="img_box">\n\t\t\t\t\t\t\t\t<img src="'+n.img+'"/>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<h2><p>'+n.info+'</p></h2>\n\t\t\t\t\t\t\t<div class="price" pan="'+n.id+'">\n\t\t\t\t\t\t\t\t<b>'+n.price+'</b>\n\t\t\t\t\t\t\t\t<span class="buy"></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>'}),this.ul.html(i),this.addEvent()}},{key:"addEvent",value:function(){var t=this;this.ul.on("click","span",function(){t.id=f(this).parent().attr("pan"),t.setCookie()})}},{key:"setCookie",value:function(){if(this.goods=JSON.parse(f.cookie("goods"))||[],this.goods.length<1)this.goods.push({id:this.id,num:1});else{var i=this,e=!0;f.each(this.goods,function(t,n){n.id==i.id&&(i.goods[t].num++,e=!1)}),e&&this.goods.push({id:this.id,num:1})}f.cookie("goods",JSON.stringify(this.goods)),console.log(JSON.parse(f.cookie("goods")))}}]),n}();new n({url:"http://localhost:8848/ajax/data/list.json",ul:f(".cs").children(".ul1")}),new n({url:"http://localhost:8848/ajax/data/list.json",ul:f(".cs").children(".ul2")}),new n({url:"http://localhost:8848/ajax/data/list.json",ul:f(".cs").children(".ul3")}),new n({url:"http://localhost:8848/ajax/data/list.json",ul:f(".cs").children(".ul4")}),new n({url:"http://localhost:8848/ajax/data/list.json",ul:f(".cs").children(".ul5")})})});