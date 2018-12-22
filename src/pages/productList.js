require(["../scripts/libs/config.js"], function() {
	require(["jquery", "cookie"], function($) {
		//选择地址
		$('.send_more .top_menu li').click(function() {
			$(this).addClass('cur').siblings('li').removeClass('cur');
			$('.send_more .nr_menu li').css('display', 'none');
			$('.send_more .nr_menu li').eq($(this).index()).css('display', 'block');
		})

		// 点击全部商品分类出现categorys
		$('.sj_cate_nav').hover(function() {
			$(this).children('.categorys').stop().show();
		}, function() {
			$(this).children('.categorys').stop().hide();
		})

		//导航分类
		$('.categorys .item').hover(function() {
			var topHide = $(document).scrollTop();
			var offTop = $('nav').offset().top;
			$(this).addClass('active');
			$(this).find('.product_wrap').stop().show();
			if(topHide >= offTop) {
				$(this).find('.product_wrap').css('top', topHide - offTop - 40);
			} else {
				$(this).find('.product_wrap').css('top', 0);
			}
		}, function() {
			$(this).removeClass('active');
			$(this).find('.product_wrap').stop().hide();
		});


		//渲染页面

		class Page {
			constructor(options) {
				this.url = options.url;
				this.list = options.list;
				this.left = options.left;
				this.right = options.right;
				this.pagelist = options.pagelist;
				this.num = options.num;

				this.index = 0;
				this.load()
			}
			load() {
				var that = this;
				$.ajax({
					url: this.url,
					success: function(res) {
						that.res = res;
						that.createPage()
						that.display()
					}
				})
			}
			createPage() {
				this.maxNum = Math.ceil(this.res.length / this.num);
				this.pagelist.html("");
				for(var i = 0; i < this.maxNum; i++) {
					this.pagelist.append($("<li>" + (i + 1) + "</li>"))
				}
				this.pagelist.find("li").eq(this.index).addClass("active").siblings().removeClass("active")

				this.addEvent()
			}
			addEvent() {
				var that = this;
				this.left.on("click", function() {
					that.changeIndex("l")
				})
				this.right.on("click", function() {
					that.changeIndex("r")
				})
			}
			changeIndex(type) {
				if(type == "l") {
					if(this.index == 0) {
						this.index = this.maxNum - 1
					} else {
						this.index--
					}
				} else {
					if(this.index == this.maxNum - 1) {
						this.index = 0
					} else {
						this.index++
					}
				}
				this.pagelist.find("li").eq(this.index).addClass("active").siblings().removeClass("active")
				//			console.log(this.index)
				this.display()
			}
			display() {
				var str = "";

				for(var i = this.index * this.num; i < this.index * this.num + this.num; i++) {
					if(i < this.res.length) {
						str += `				        
				        	<li>
								<a href="details.html" target="_blank" class="img_box">
									<img src="${this.res[i].img}"/>
								</a>
								<h2><p>${this.res[i].info}</p></h2>
								<div class="price">
									<b>${this.res[i].price}</b>
									<a href="javascript:void(0);" class="buy"></a>
								</div>
							</li>`
					}
				}
				this.list.html(str)
			}
		}

		new Page({
			url: "http://localhost:8848/ajax/data/list.json",
			list: $(".cs ul"),
			left: $("#btnL"),
			right: $("#btnR"),
			pagelist: $("#page"),
			num: 12
		})		
	})
})