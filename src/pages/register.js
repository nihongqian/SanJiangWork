require(["../scripts/libs/config.js"],function(){
	require(["jquery","cookie"],function($){	
		class Register {
			constructor(){
				this.btn = $("#register");
				this.user = $("#user");
				this.pass = $("#pass");
				this.addEvent();
			}
			addEvent(){
				var that = this;
				this.btn.on("click",function(){
					that.userV = that.user.val();
					that.passV = that.pass.val();
					that.setCookie();
				})
			}
			setCookie(){
				if($.cookie("user")){
					this.register = JSON.parse($.cookie("user"))
				}else{
					this.register = [];
				}
//				console.log(this.register)
				if(this.register.length < 1){
					this.register.push({
						user:this.userV,
						pass:this.passV,
						onOff:1
					})
				}else{
					var that = this;
					var onOff = true;
					$.each(this.register, function(index,value) {
						if(value.user == that.userV){
							alert("用户名重复，请重新注册")
							onOff = false;
						}
					});
					if(onOff){
						this.register.push({
							user:this.userV,
							pass:this.passV
						})
					}
				}
				$.cookie("user",JSON.stringify(this.register))
			}
		}
		new Register();
	})
})
