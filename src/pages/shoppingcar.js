require(["../scripts/libs/config.js"], function() {
	require(["jquery", "cookie"], function($) {
		
		$(window).scroll(function() {
			if($(window).scrollTop() >= ($('#chat_box_all').offset().top + $('#chat_box_all').outerHeight() + $('.cart_bottom_all').height() - $(window).height())) {
				$('.cart_bottom_all').removeClass('fixed');
			} else {
				$('.cart_bottom_all').addClass('fixed');
			}
		});
		
		class Car {
			constructor(options) {
			    this.url = options.url;
			    this.tbody = options.tbody;
			    
			    this.getCookie();
			    this.load();
			}
			getCookie(){
				this.goods = JSON.parse($.cookie("goods"));
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					success:function(res){
						that.res = res;
						that.display();
					}
				});
			}
			display(){
				var str = "";
				$.each(this.res, (key,item) => {
					$.each(this.goods, (index,value) => {
						if(item.id == value.id){
							let vipPrice = (item.price * 0.88).toFixed(2);
							let _arrprice = parseInt(value.num)*parseFloat(item.price.slice(0,item.price.length-1));
							str += `<div class="mc chosen" huohao="${value.id}">
										<div class="c_checkbox">
											<input type="checkbox" class="single_sel" value="1" checked="checked" />
										</div>
										<div class="c_goods">
											<a href="details.html" target="_blank">
												<img src="${item.img}"/>
												<p>
													<a href="details.html" target="_blank">${item.info}</a>
												</p>
											</a>
										</div>
										<div class="c_price retail">
											￥<i>${item.price}</i>
										</div>
										<div class="c_price">
											<b class="member_price">￥${vipPrice}</b>
										</div>
										<div class="c_price">
											<input type="hidden" value="1" />
											<div class="choose_amount">
												<a class="btn_reduce" href="javascript:;">-</a>
												<input class="num" type="text" value="${value.num}" maxlength="3" />
												<a class="btn_add" href="javascript:;">+</a>
											</div>
										</div>
										<div class="c_price price1">
											<b>￥<input style="text-align:center" value="${_arrprice}" /></b>
										</div>
										<div class="c_price weight">
										</div>
										<div class="c_price"><a href="#" class="a_put">加入收藏</a>
											<delete href="#" class="a_cancel">删除</delete>
										</div>
									</div>`
						}
					});
				});
				this.tbody.html(str);
				this.calculate();
				this.addEvent();
				this.del();
				this.getgoodsnum();
      	 		this.sel();
      	 		this.selAll();
			}
			listtatol(_index,n){
				$(".price1 b input").eq(_index).val(n*parseFloat($(".retail i").eq(_index).html()))
				console.log($(".price1 b input"))
			}
			calculate(){
				var sum = 0;
				var sel = Array.from(document.querySelectorAll(".price1 b input"));
				console.log(sel)
				for(var i = 0; i < sel.length; i++){
					sum += parseFloat(sel[i].value)

				}
				
//				$.each($(".single_sel"), function() {
//					console.log($(this).parent().siblings(".price1").children("b").find("i").html())
//					sum += parseInt($(item).parent().siblings(".price1").children("b").find("i").html());
//					console.log(parseFloat($(item).parent().siblings(".price1").children("b").find("i").html()))
//				});
				
				$("#c_count strong").html(sum);
			}
			addEvent(){
				var that = this;
				$.each($(".choose_amount .btn_add"),function(index,item){
					$(item).on("click",function(){
						var numvalue = parseInt($(".choose_amount .num").eq(index).val());
						numvalue++;
						$(".choose_amount .num").eq(index).val(numvalue);
						that.listtatol(index,numvalue);
						that.calculate();
						that.id = $(".chosen").eq(index).attr("huohao");
						that.setCookie(function(i){
							that.goods[i].num = numvalue;
						})
						that.getgoodsnum();
					})
				})
				$.each($(".choose_amount .btn_reduce"), function(index,item) {
					$(item).on("click",function(){
						var numvalue = parseInt($(".choose_amount .num").eq(index).val());
						numvalue--;
						if(numvalue <= 1) numvalue = 1;
						$(".choose_amount .num").eq(index).val(numvalue);
						that.listtatol(index,numvalue);
						that.calculate();
						that.id = $(".chosen").eq(index).attr("huohao");
						that.setCookie(function(i){
							that.goods[i].num = numvalue;
						})
						that.getgoodsnum();
					})
				});
				$.each($(".choose_amount input"), function(index,item) {
					$(item).on("input",function(){
						var ele = $(this).val();
						if(ele){
							var numvalue = parseInt(ele);
							that.listtatol(index,numvalue);
							that.calculate();
							that.id = $(".chosen").eq(index).attr("huohao");
							that.setCookie(function(i){
								that.goods[i].num = numvalue;
							})
						}
						that.getgoodsnum();
					})
				});
			}
			del(){
				var that = this;
				this.tbody.on("click","delete",function(){
					$(this).parent().parent().remove();
					that.id = $(this).parent().parent().attr("huohao");
					that.setCookie(function(i){
						that.goods.splice(i,1);
					})
					that.calculate();
					that.getgoodsnum();
				})
			}
			setCookie(callback){
				for(var i = 0; i < this.goods.length; i++){
					if(this.goods[i].id == this.id){
						callback(i);
						break;
					}
				}
				$.cookie("goods",JSON.stringify(this.goods));
			}
			getgoodsnum(){
				var selnum = 0;
				$.each($(".c_checkbox .single_sel"), function(index,item) {
					selnum += parseInt($(item).parent().siblings(".c_price").children(".choose_amount").find(".num").val());
				});

				$("#c_count b").html(selnum);
			}
			sel(){
				var that = this;
				$.each($(".c_checkbox .single_sel"),function(index,item){
					$(item).on("click",function(){
						if($(this).is(":checked")){
							$(this).prop("checked",false)
						}else{
							$(this).prop("checked",true)
						}
						
						if($(".c_checkbox .single_sel").is(":checked").length != $(".chosen").length){
							$(".h_goods .all_sel").prop("checked",false);
						};
						that.calculate();
						that.getgoodsnum();
					})
				})
			}
			selAll(){
				var that = this;
				$(".h_goods .all_sel").on("click",function(){
					if($(this).prop("checked")){
						$(this).prop("checked",false);
						$.each($(".c_checkbox .single_sel"),function(index,item){
							$(item).prop("checked",false);
							that.calculate();
							that.getgoodsnum();
						})
					}else{
						$(this).prop("checked",true);
						$.each($(".c_checkbox .single_sel"), function(index,item) {
							$(item).prop("checked",true);
							that.calculate();
							that.getgoodsnum();
						});
					}
				})
			}			
	
//			count(){
//				//数量操作
//				let reduce = Array.from(document.querySelectorAll(".choose_amount .btn_reduce"));
//				let num = Array.from(document.querySelectorAll(".choose_amount .num"));
//				let add = Array.from(document.querySelectorAll(".choose_amount .btn_add"));
//
//				for(let i = 0; i < reduce.length; i++) {
//					reduce[i].onclick = function() {
//						var _value = parseInt(num[i].value);
//						if(_value <= 1) {
//							_value = 1;
//							num[i].value = _value;
//						} else {
//							_value--;
//							num[i].value = _value;
//							sum -= Number(price[i].innerHTML.slice(1));
//							totalPrice.innerHTML = "￥" + sum.toFixed(2);
//						}
//					}
//				}
//				for(let i = 0; i < add.length; i++) {
//					add[i].onclick = function() {
//						var _value = parseInt(num[i].value);
//						_value++;
//						num[i].value = _value;
//						
//						sum += Number(price[i].innerHTML.slice(1));
//						totalPrice.innerHTML = "￥" + sum.toFixed(2);
//					}
//				}
//
//				//总金额
//				let sum = 0;
//				let price = Array.from(document.querySelectorAll(".chosen .price1 b"));
//				let totalPrice = document.querySelector("#c_count strong");
//				for(let i = 0; i < price.length; i++) {
//					sum += Number(price[i].innerHTML.slice(1));
//				}
//				totalPrice.innerHTML = "￥" + sum;
//				console.log(sum)
//			}
		}
		
		new Car({
			url: "../ajax/data/list.json",
			tbody:$(".cart_box")
		})
		
		
	})
})