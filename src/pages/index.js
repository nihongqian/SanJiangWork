require(["../scripts/libs/config.js"], function() {
	require(["jquery", "swiper", "cookie"], function($, Swiper) {
		//地址部分
		$(".send_more .top_menu li").click(function() {
			//		console.log($(this))
			$(this).addClass("cur").siblings("li").removeClass("cur");
			$(".send_more .nr_menu li").css("display", "none").eq($(this).index()).css("display", "block");
		})

		//导航部分
		$(".categorys .item").mouseenter(function() {
			var _scrollTop = $(document).scrollTop();
			var _offsetTop = $("#nav").offset().top;
			$(this).addClass("active").find(".product_wrap").show();
			if(_scrollTop >= _offsetTop) {
				$(this).find(".product_wrap").css("top", _scrollTop - _offsetTop - 40);
			} else {
				$(this).find(".product_wrap").css("top", 0);
			}
		})
		$(".categorys .item").mouseleave(function() {
			$(this).removeClass("active");
			$(this).find(".product_wrap").hide();
		})

		//轮播图
		$(function() {
			var $bannerList = $("#focus-banner-list li");
			var $nextBtn = $(".next");
			var $prevBtn = $(".prev");
			var $pointBtnI = $("div.banner_point i");
			var bannerLength = $bannerList.length;
			var index1 = 0;
			var timer1;

			function changeImg() {
				$bannerList.eq(index1).stop().fadeIn().siblings().stop().fadeOut();
				clearInterval(timer1);
				timer1 = setInterval(function() {
					$nextBtn.click();
				}, 4000);
			}

			$pointBtnI.on("mouseenter click", function() { //小数字切换
				var $this = $(this);
				$this.stop().fadeIn().addClass("current_point").siblings("i.current_point").removeClass("current_point");
				clearInterval(timer1);
				index1 = $pointBtnI.index($this);
				changeImg();
			})

			$nextBtn.click(function() { //下一个
				index1++;
				if(index1 > bannerLength - 1) index1 = 0;
				$pointBtnI.eq(index1).addClass("current_point").siblings("i.current_point").removeClass("current_point");
				changeImg();
			})

			$prevBtn.on("click", function() { //上一个
				index1--;
				if(index1 < 0) index1 = bannerLength - 1;
				$pointBtnI.eq(index1).addClass("current_point").siblings("i.current_point").removeClass("current_point");
				changeImg();
			})

			timer1 = setInterval(function() { //自动轮播
				$nextBtn.click();
			}, 3000)
		})

		//小轮播图
		function scrollAd(wraper, prev, next, img, or) {
			var wraperBtn = $(wraper);
			var prevBtn = $(prev);
			var nextBtn = $(next);
			var imgList = $(img).find("ul");
			var w = imgList.find("li").outerWidth(true);
			var listLength = imgList.find("li").length;

			nextBtn.click(function() {
				if(imgList.is(":animated")) imgList.stop();
				if(listLength <= 3) {
					return false;
				} else {
					imgList.animate({
						"margin-left": -w
					}, function() {
						imgList.find("li").eq(0).appendTo(imgList);
						imgList.css("margin-left", 0);
					})
				}
			})

			prevBtn.click(function() {
				if(imgList.is(":animated")) imgList.stop();
				if(listLength <= 3) {
					return false;
				} else {
					imgList.find("li:last").prependTo(imgList);
					imgList.css("margin-left", -w);
					imgList.animate({
						"margin-left": 0
					});
				}
			})

			if(or === true) {
				var timer2 = window.setInterval(function() {
					nextBtn.click();
				}, 5000);
				wraperBtn.mouseenter(function() {
					clearInterval(timer2);
				});
				wraperBtn.mouseleave(function() {
					timer2 = setInterval(function() {
						nextBtn.click();
					}, 5000);
				});
			}
		}
		//上一页、下一页按钮透明度处理
		$("#focus").mouseenter(function() {
			$("#focus .s_prev, .s_next").show();
		});
		$("#focus").mouseleave(function() {
			$("#focus .s_prev, .s_next").hide();
		});
		$("#focus .s_prev, .s_next").hover(
			function() {
				$(this).stop(true, false).animate({
					"opacity": "1"
				}, 500);
			},
			function() {
				$(this).stop(true, false).animate({
					"opacity": "0.5"
				}, 500);
			}
		)
		scrollAd('#focus', '.s_prev', '.s_next', '.img_list', true);
		// true为自动播放，不加此参数或false就默认不自动	

		//页面左侧导航
		$(window).scroll(function() {
			var $scrollT = $(this).scrollTop();
			//悬浮出现与隐藏
			if($scrollT > 1000) {
				$(".side_left_nav").fadeIn();
			} else {
				$(".side_left_nav").fadeOut();
			}
			var index = Math.floor(($scrollT - 1000) / 630); //根据滚动距离计算当前楼层，改变导航
			$(".side_left_nav ul li").eq(index).addClass("cur").siblings().removeClass("cur");
		})
		//定位到楼层
		$(".side_left_nav ul li").click(function() {
			var index = $(".side_left_nav ul li").index(this) + 1; //根据点击的li找到他的索引
			var _top = $("#floor_" + index).position().top;
			$("body,html").stop().animate({
				scrollTop: _top
			}, 300);
		});

		$("#totop").click(function() {
			$("body,html").stop().animate({
				scrollTop: 0
			}, 500);
		}); //回到顶部

		//热销好货 换一组
		$(function() {
			var i = 0;
			var changeGoods = $("#change_goods");
			changeGoods.click(function() {
				var productAll = $("div.product_all");
				var l = productAll.length;

				$(productAll[i++]).stop().hide();
				if(i >= l) i = 0;
				$(productAll[i]).stop().show();
			});
		})
		//点击li到详情页
//		console.log($(".hot_goods .mc .product_b ul li"))
		$(".hot_goods .mc .product_b ul li").click(function() {
//			$.cookie($(this).attr("pid"), $(this).attr("pid"));
			location.href = "details.html";
		})
		//楼层切换
		$(function() {
			var $ul = $("ul.ul_class");
			$ul.children("li").mouseover(function() {
				var $this = $(this);
				$this.addClass("cc").siblings("li.cc").removeClass("cc");
				//			var $center = $this.parent().parent("div.mt").next("div.mc").children("div.center");
				//			var $cs = $center.children(".cs").find("ul");
				var $li = $(this).parent().children("li");
				var $index = $li.index(this);
				$(this).parent().parent(".mt").next(".mc").children(".center").children(".cs").stop().animate({
					left: -816 * $index
				});
			})
		})

		//右侧导航
		$('.side_right_nav ').each(function() {
			var $mc = $('.side_right_nav .mc');
			$mc.mouseenter(function() {
				$(this).addClass('current');
			});
			$mc.mouseleave(function() {
				$(this).removeClass('current');
			});
		});

		//渲染商品列表
		class Shop {
			constructor(options) {
			    this.ul = options.ul;
			    this.url = options.url;
			    this.load();
			}
			load() {
				var that = this;
				$.ajax({
					url:this.url,
					success:function(res) {
						that.res = res;
						that.display();
					}
				});
			}
			display() {
				var str = "";
				$.each(this.res, function(index,value) {
					str += `<li>
							<a href="details.html" target="_blank" class="img_box">
								<img src="${value.img}"/>
							</a>
							<h2><p>${value.info}</p></h2>
							<div class="price" pan="${value.id}">
								<b>${value.price}</b>
								<span class="buy"></span>
							</div>
						</li>`
				});
				this.ul.html(str);
				this.addEvent();
			}
			addEvent(){
				var that = this;
				this.ul.on("click","span",function(){
					that.id = $(this).parent().attr("pan");
					that.setCookie();
				})
			}
			setCookie(){
				this.goods = JSON.parse($.cookie("goods")) || [];
				if(this.goods.length < 1){
					this.goods.push({
						id:this.id,
						num:1
					})
				}else{
					var that = this;
					var onOff = true;
					$.each(this.goods, function(index,value) {
						if(value.id == that.id){
							that.goods[index].num++;
							onOff = false;
						}
					});
					if(onOff){
						this.goods.push({
							id:this.id,
							num:1
						})
					}
				}
				$.cookie("goods",JSON.stringify(this.goods))
				
				console.log(JSON.parse($.cookie("goods")))	//测试
			}
		}
		new Shop({
			url:"http://localhost:8848/ajax/data/list.json",
			ul:$(".cs").children(".ul1")		
		})
		new Shop({
			url:"http://localhost:8848/ajax/data/list.json",
			ul:$(".cs").children(".ul2")		
		})
		new Shop({
			url:"http://localhost:8848/ajax/data/list.json",
			ul:$(".cs").children(".ul3")		
		})
		new Shop({
			url:"http://localhost:8848/ajax/data/list.json",
			ul:$(".cs").children(".ul4")		
		})
		new Shop({
			url:"http://localhost:8848/ajax/data/list.json",
			ul:$(".cs").children(".ul5")		
		})
		
//		$.ajax({
//			type: "get",
//			url: "http://localhost:8848/ajax/data/list.json",
//			success: function(data) {
//				function loadData(startNum, endNum) {
//					var str = "";
//					for(var i = startNum; i < endNum; i++) {
//						str +=
//							`<li>
//							<a href="details.html" target="_blank" class="img_box">
//								<img src="${data[i].img}"/>
//							</a>
//							<h2><p>${data[i].info}</p></h2>
//							<div class="price">
//								<b>${data[i].price}</b>
//								<span class="buy" id="${data[i].id}"></span>
//							</div>
//						</li>`
//					}
//					return str;
//				}
//				$(".cs").children(".ul1").append(loadData(0, 8));
//				$(".cs").children(".ul2").append(loadData(8, 16));
//				$(".cs").children(".ul3").append(loadData(16, 24));
//				$(".cs").children(".ul4").append(loadData(24, 32));	
//				
////				console.log($(".cs ul li"))
////				var arr = [];
//				$(".cs ul li").find("span").click(function(){
////					arr.push($(this).attr("id"));
//					$.cookie($(this).attr("id"),$(this).attr("id"));
////					var id = $(this).attr("id");
////					$.cookie("id",arr.join())
////					console.log($.cookie("id"))
//				})
//			}
//		})
//		$.ajax({
//			type: "get",
//			url: "https://shop.yinyuetai.com/goods/listForArt.json",
//			dataType: "jsonp",
//			success: function(data) {
//				var str = "";
//				for(var i = 0; i < data.data.length; i++) {
//					str += 
//						`<li>
//							<a href="../details/details.html" target="_blank" class="img_box">
//								<img src="${data.data[i].artistImg}"/>
//							</a>
//							<h2><p>${data.data[i].artistName}</p></h2>
//							<div class="price">
//								<b>${data.data[i].artistId}</b>
//								<a href="javascript:void(0);" class="buy"></a>
//							</div>
//						</li>`
//				}
//				$(".cs .ul5").append(str);
//			}
//		});
		
	})
})