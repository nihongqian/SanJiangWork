//复制src下的文件，到dist目录中

let gulp = require("gulp");
let babel = require("gulp-babel");	//ES6转ES5模块
let uglify = require("gulp-uglify");	//JS压缩模块	
let cleancss = require("gulp-clean-css");	//CSS压缩模块
let htmlmin = require("gulp-htmlmin");	//HTML压缩模块
let sass = require("gulp-sass");	//SCSS转CSS模块
let webserver = require("gulp-webserver");	//服务器


gulp.task("buildJS", ()=>{
	//第三方库只复制，不压缩
	gulp.src("./src/scripts/libs/*.js")
		.pipe(gulp.dest("./dist/scripts/libs"))
	
	//编译压缩再复制
	gulp.src("./src/pages/**/*.js")
		.pipe(babel({
			presets: ["env"]
		}))
		.pipe( uglify() )
		.pipe( gulp.dest("./dist/pages") )
})

gulp.task("buildCSS", ()=>{
	gulp.src("./src/**/*.scss")
		.pipe( sass().on('error', sass.logError) )		//sass写错只打印错误信息，不断开服务器
		.pipe( cleancss() )	//压缩
		.pipe( gulp.dest("./dist") )
})

gulp.task("buildHTML", ()=>{
	gulp.src("./src/**/*.html")
		.pipe( htmlmin({ collapseWhitespace: true }) )
		.pipe( gulp.dest("./dist/") );
})

gulp.task("buildStaticResource", ()=>{	//静态资源只复制
	gulp.src("./src/static/**/*.*").pipe( gulp.dest("./dist/static") );
})

gulp.task("buildImg", ()=>{		//复制图片
	gulp.src("./src/images/**/*.*").pipe( gulp.dest("./dist/images") );
})
gulp.task("watching", ()=>{
	gulp.watch("./src/**/*.scss", ["buildCSS"]);
	gulp.watch("./src/**/*.js", ["buildJS"]);
	gulp.watch("./src/**/*.html", ["buildHTML"]);
//	gulp.watch("./src/static/**/*.*", ["buildStaticResource"]);
//	gulp.watch("./src/images/**/*.*", ["buildImg"]);
});

//构建项目
gulp.task("build", ["buildJS","buildHTML","buildCSS","buildStaticResource","buildImg"])

//本地服务器构建
gulp.task('webserver', ["watching","buildImg","buildStaticResource"], function() {
	gulp.src('dist')
		.pipe(webserver({
			livereload: true, //是否支持热部署
//			https: true,
			port: 8848,
//			open: true,
//			proxies : [
//				{	
//					source: '/abcdefg', 
//					target: 'https://m.lagou.com/listmore.json?pageNo=2&pageSize=15',
//				},
//				{
//					source: '/userinfo',
//					target: 'https://nbrecsys.4paradigm.com/api/v0/recom/recall?requestID=pmKC7kYD&userID=u3FFkObPEe&sceneID=34'			
//				}
//			]
		}));
});
