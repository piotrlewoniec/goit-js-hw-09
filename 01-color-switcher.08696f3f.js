!function(){"use strict";({startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),bodyBind:document.querySelector("body"),cycleTimer:"",init:function(){this.startBtn.addEventListener("click",function(){this.startBtnFnc()}.bind(this)),this.stopBtn.addEventListener("click",function(){this.stopBtnFnc()}.bind(this)),this.stopBtn.disabled=!0},startBtnFnc:function(){var t=this;this.cycleTimer=setInterval((function(){t.bodyBind.style.backgroundColor="".concat(t.getRandomHexColor())}),1e3),this.startBtn.disabled=!0,this.stopBtn.disabled=!1},stopBtnFnc:function(){clearInterval(this.cycleTimer),this.startBtn.disabled=!1,this.stopBtn.disabled=!0},getRandomHexColor:function(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}}).init()}();
//# sourceMappingURL=01-color-switcher.08696f3f.js.map
