require(["../scripts/libs/config.js"], function() {
	require(["jquery", "cookie"], function($) {

		class Login {
			constructor(){
				this.btn = $("#login_btn");
				this.user = $("#user");
				this.pass = $("#pass");
				this.addEvent();
			}
			addEvent(){
				var that = this;
				this.btn.on("click",function(){
					that.userV = that.user.val();
					that.passV = that.pass.val();
					that.getCookie();
				})
			}
			getCookie(){
				var login = JSON.parse($.cookie("user"));
				var that = this;
				$(login).each(function(index,value){
					if(that.userV == value.user && that.passV == value.pass){
						$(location).attr("href","index.html")
					}
				})
			}
		}
		
		new Login();

	})
})
