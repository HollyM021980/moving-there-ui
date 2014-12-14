angular.module("MovnThereUI",["ngRoute"]).run(["$rootScope","$location","$http","$window","AuthFactory","UserFactory",function(a,b,c,d,e,f){"use strict";a.$on("$routeChangeStart",function(){e.isAuthenticated()?(e.isAuthenticated()&&(c.defaults.headers.common.Authorization="Token token="+d.sessionStorage.getItem("movnThereUI.user")),f.fetch()):"/login"!==b.path()&&"/signup"!==b.path()&&b.path("/login")})}]),angular.module("MovnThereUI").constant("_",window._).constant("ServerUrl","https://movn-there-api.herokuapp.com/"),angular.module("MovnThereUI").config(["$routeProvider",function(a){"use strict";a.when("/",{templateUrl:"templates/home.html",controller:"HomeCtrl"}).when("/users",{templateUrl:"templates/users.html",controller:"UserCtrl"}).when("/login",{templateUrl:"templates/login.html",controller:"LoginCtrl"}).when("/signup",{templateUrl:"templates/signup.html",controller:"SignupCtrl"}).when("/logout",{controller:"LogoutCtrl"}).when("/about",{templateUrl:"templates/about.html"}).when("/contact",{templateUrl:"templates/contact.html"}).otherwise({redirectTo:"/"})}]),angular.module("MovnThereUI").controller("NavbarController",["$scope","$location","AuthFactory",function(a,b,c){"use strict";a.isActive=function(a){return a===b.path()},a.logout=function(){c.logout().success(function(){b.path("/login")})},a.isLoggedIn=function(){return c.isAuthenticated()}}]),angular.module("MovnThereUI").controller("HomeCtrl",["$scope","UserFactory",function(a,b){"use strict";a.users=b.users}]),angular.module("MovnThereUI").controller("LoginCtrl",["$scope","$location","AuthFactory",function(a,b,c){"use strict";a.login=function(a){c.login(a).success(function(){b.path("/")})},a.goToSignup=function(){b.path("/signup")}}]),angular.module("MovnThereUI").controller("SignupCtrl",["$scope","$location","AuthFactory",function(a,b,c){"use strict";a.signup=function(a){c.signup(a).success(function(){b.path("/")})},a.goTologin=function(){b.path("/login")}}]),angular.module("MovnThereUI").factory("UserFactory",["$http","ServerUrl",function(a,b){"use strict";var c=[],d=function(){a.get(b+"users.json").success(function(a){angular.copy(a,c)})};return{users:c,fetch:d}}]),angular.module("MovnThereUI").factory("AuthFactory",["$http","$window","ServerUrl",function(a,b,c){"use strict";var d=function(d){return a.post(c+"login",d).success(function(c){b.sessionStorage.setItem("movnThereUI.user",c.token),a.defaults.headers.common.Authorization="Token token="+b.sessionStorage.getItem("movnThereUI.user")})},e=function(d){var e={user:d};return a.post(c+"signup",e).success(function(c){b.sessionStorage.setItem("movnThereUI.user",c.token),a.defaults.headers.common.Authorization="Token token="+b.sessionStorage.getItem("movnThereUI.user")})},f=function(){return a.post(c+"/logout").success(function(){b.sessionStorage.removeItem("movnThereUI.user")})},g=function(){return!!b.sessionStorage.getItem("movnThereUI.user")};return{login:d,signup:e,logout:f,isAuthenticated:g}}]);