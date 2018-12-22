require(["../scripts/libs/config.js"],function(){
	require(["jquery", "swiper", "cookie"],function($,Swiper){

//(function($) {
//		'use strict';
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

		//加入购物车
		
		
		//放大镜
		$(".spec-preview_small").hover(
			function(){
				$(".spec-preview_small span").show();
				$(".spec-preview_big").show();
			},function(){
				$(".spec-preview_small span").hide();
				$(".spec-preview_big").hide();
			}
		)
		//大小图比例
		var bili = $(".spec-preview_small").width()/$(".spec-preview_small span").width();
		//根据比例等比例移动
		$(".spec-preview_small").on("mousemove",function(e){
			var _left = e.pageX - $(this).offset().left - $(".spec-preview_small span").width()/2;
			var _top = e.pageY - $(this).offset().top - $(".spec-preview_small span").height()/2;
			$(".spec-preview_small span").css({
				left: Math.min(Math.max(0,_left),$(".spec-preview_small").width()-$(".spec-preview_small span").width()),
				top : Math.min(Math.max(0,_top),$(".spec-preview_small").height()-$(".spec-preview_small span").height())	
			})
			$(".spec-preview_big img").css({
				left: -$(".spec-preview_small span").position().left*bili,
				top : -$(".spec-preview_small span").position().top*bili
			})
		})
		//切换放大镜的小图
		var $list = $("#thumblist .items");
		var $simg = $(".spec-preview_small img")[0];
		var $bimg = $(".spec-preview_big img")[0];

		$list.find("img").click(function(){
			$simg.src = this.src;
			$bimg.src = this.src;
		})
		//操作购买数量
		let num = 1;
		$(".amount #add").click(function(){
			num++;
			$(".amount #buy-num").val(num);
		})	
		$(".amount #reduce").click(function(){
			if(num <= 1){
				num = 1;
				$(".amount #buy-num").val(num);
			}else {
				num--;
				$(".amount #buy-num").val(num);
			}
		})
		$(".amount #buy-num").blur(function(){
			num = $(this).val();
			$(".amount #buy-num").val(num)
		})
		
		//取出来
		$.ajax({
			type:"get",
			url:"../ajax/data/list.json",
			success: function(res) {
				for(let i = 0; i < res.length; i++) {
					
					
				}
			}
		});
		
		
		//加入购物车
//		$("#putCart").click(function(){
//			let goods_num = 0;
//			$(".goods_number b").html(1)
//			$.cookie($(this).attr("id"),$(this).attr("id"));
//		})
		//看了又看
//		 $.ajax({
//      	type:"get",
//      	url:'https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266',
//      	dataType:"jsonp",
//      	success:function(data){
//      		var arr = data.block_266[0].node;
//      		 $.each($(".jsonp_first li a img"), function(index) {
//      	    	   $(".jsonp_first li a img").eq(index).attr("src",arr[index].img);
//      	    });
//      	    $.each($(".jsonp_first li a span"), function(index) {
//      	    	   $(".jsonp_first li a span").eq(index).text(arr[index].name);
//      	    });
//      	}
//      })
	
		 // 商品详情页切换
		$('.right .detail_tab ul li').click(function(){
		$(this).addClass('current').siblings().removeClass('current')
		$('.detail_content').eq($(this).index()).addClass('det_cur').siblings().removeClass('det_cur')
	})

//})(window.jQuery);

	})
})