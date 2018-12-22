 class Car{     	
      	constructor(options){
      		this.url = options.url;
      		this.obox = options.obox;
      		
      		this.getCookie();
      		this.load();
      	}
      	getCookie(){
      		this.goods = JSON.parse($.cookie("goods"));
      		console.log(this.goods)
      	}
      	load(){
      		var that = this;
      		$.ajax({
      			
      			url:this.url,
      			success:function(res){
      				that.res = res;
      				that.display()
      				
      			}
      			
      		})
      	}
      	display(){
      		var str = "";      		
      		$.each(this.res,(key,item)=>{
      			$.each(this.goods,(index,value)=>{
      				if(item.id == value.id){    					
      					var _arrprice = parseInt(value.num)*parseInt(item.price.slice(0,item.price.length-1));     				   
      					str += `
      					   <li class="main-goods-list-item">
								<div class="list-select">
								<i class="daguo"></i>
								</div>
								<div class="list-img"><img src="${item.src}"></div>
								<div class="list-name">${item.describe}</div>
								<div class="list-price">${item.price}</div>
								<div class="list-num">
									<b class="reduce"></b><input class="num-value" type="text" value="${value.num}"><b class="add"></b>
								</div>
								<div class="list-tatol">${_arrprice}元</div>
								<div class="list-action" index="${value.id}">
									<span class="delete">X</span>
								</div>
							</li>
      					`
      				}			
      			})
      		})
      	 	this.obox.html(str);
      	 	this.calculate();
      	 	this.click();
      	 	this.del();
      	 	this.getgoodsnum();
      	 	this.sel();
      	 	this.selAll();
      	 	this.tixing()
      	}
      	
      	listtatol(_index,num){
      		$(".list-tatol").eq(_index).html(num*parseInt($('.list-price').eq(_index).html().slice(0,$('.list-price').eq(_index).html().length-1))+"元")
      	}
      	
      	calculate(){        		
      		var str1 = 0;    		
      		$.each($(".list-select .daguo"),function(index,item){      			
      			str1 += Number($(item).parent().siblings(".list-tatol").html());      			
      		})
      		$(".bottom-tatol span").html(str1);
      	}
      	click(){
      		var that = this
      		$.each($(".add"),function(index,item){      			
      			$(item).on("click",function(){
      				var numvalue = parseInt($(".num-value").eq(index).val())
      				numvalue++;
      				$(".num-value").eq(index).val(numvalue);     				
      				that.listtatol(index,numvalue);
      				that.calculate()
      				that.id = $("list-action").eq(index).attr("index");
      				that.setCookie(function(i){
							that.goods[i].num = numvalue;
					})
      				that.getgoodsnum()
      			})      			
      		})
      		$.each($(".reduce"),function(index,item){      			
      			$(item).on("click",function(){
      				var numvalue = parseInt($(".num-value").eq(index).val())
      				numvalue--;
      				if(numvalue <= 1){
      					numvalue = 1
      				}
      				$(".num-value").eq(index).val(numvalue);       				      				
      				that.listtatol(index,numvalue);
      				that.calculate();
      				that.id = $(".list-action").eq(index).attr("index");     				
      				that.setCookie(function(i){
							that.goods[i].num = numvalue;
					})
      				that.getgoodsnum()
      			})
      		})
      		
      		$.each($(".num-value"),function(index,item){
      			$(item).on("input",function(){
      				var ele = $(this).val();     				
      				if(ele){ 
      					var numvalue = parseInt(ele);
	      				that.listtatol(index,numvalue);
	      				that.calculate()
	      				that.id = $("list-action").eq(index).attr("index");
	      				that.setCookie(function(i){
								that.goods[i].num = numvalue;
						}) 
      				}
      				that.getgoodsnum()
      			})
      		})
        	
      			
      	}
      	
      	del(){
      		var that = this;
      		this.obox.on("click","span",function(){
      			$(this).parent().parent().remove();
      			that.id = $(this).parent().attr("index");
      			that.setCookie(
      				function(i){
      					that.goods.splice(i,1);
      				}
      			)
      			that.calculate();
      			that.getgoodsnum();
      		})
      	}
      	
      	setCookie(callback){
      		for(var i = 0;i<this.goods.length;i++){
      			
      			if(this.goods[i].id == this.id){
      				
      				callback(i)
      				break;     				
      			}
      		}
      		
      		$.cookie("goods",JSON.stringify(this.goods));
      		
      	}
      	
      	getgoodsnum(){
      		var selnum = 0;
      		var goodsnum = 0;
      		$.each($(".list-select .daguo"),function(index,item){   
      			   selnum += parseInt($(item).parent().siblings(".list-num").children(".num-value").val()); 
      		})
      		$.each($(".num-value"),function(index,item){
      			  goodsnum += parseInt($(item).val());
      		})
      		$(".bottom-left em").html(goodsnum);
      		$(".bottom-left i").html(selnum);
      	}
      	sel(){
      		 
            var that = this
      		
      		$.each($(".list-select i"),function(index,item){
      			
      			$(item).on("click",function(){
      				     
      				     if($(this).hasClass("daguo")){     				     	
      				     	$(this).removeClass("daguo");      				     	
      				     }else{
      				     	$(this).addClass("daguo");
      				     }     				    
      				    that.calculate();
      				    that.getgoodsnum();
      				    that.tixing();
      				    
      				    if($(".list-select").find('.daguo').length != $(".main-goods-list-item").length){
      			            $(".top-select i").removeClass("daguo");
      		            }

      				})
      			})
      			
      		}
      	selAll(){
      		var that = this;
      		$(".top-select i").on("click",function(){
      			    if($(this).hasClass("daguo")){
      			    	$(this).removeClass("daguo");
      			    	$.each($(".list-select i"),function(index,item){      			    		
      			    		$(item).removeClass("daguo");
      			    		that.calculate();
      				        that.getgoodsnum();
      			    	})
      			    	
      			    	that.tixing();
      			    	
      			    	
      			    }else{
      			    	$(this).addClass("daguo");
      			    	$.each($(".list-select i"),function(index,item){      			    		
      			    		$(item).addClass("daguo");
      			    		that.calculate();
      				        that.getgoodsnum();
      			    	})
      			    	that.tixing();
      			    }
      		})
      		
      	}
      	tixing(){
      		
      		if($(".list-select").find('.daguo').length == 0){
      			$(".jiesuan").css("display","block");
      			$(".bottom-pay").css({"backgroundColor":"#E0E0E0","color":"#b0b0b0"}); 
      			$(".top-select i").removeClass("daguo");
      		}else{ 
      			$(".jiesuan").css("display","none");
      			$(".bottom-pay").css({"backgroundColor":"#FF7600","color":"#FFFFFF"});
      			$(".top-select i").addClass("daguo");
      		}
      		
      		
      	}
      		
      	
      }
     
      new Car({     	
      	url:"https://localhost:8848/ajax/goodslist.json",
      	obox:$(".main-go")
})