function e(e){return e&&e.__esModule?e.default:e}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},n=i.parcelRequire7bc7;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in t){var i=t[e];delete t[e];var n={id:e,exports:{}};return o[e]=n,i.call(n.exports,n,n.exports),n.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,i){t[e]=i},i.parcelRequire7bc7=n);var r=n("7Y9D8");({formBind:document.querySelector(".form"),createPromise:function(i,o){Math.random()>.3?e(r).Notify.success(`✅ Fulfilled promise function ${i} in ${o}ms`):e(r).Notify.failure(`❌ Rejected promise function ${i} in ${o}ms`)},createPromiseDelaied:function(i,o){const t=Math.random()>.3;setTimeout((()=>{t?e(r).Notify.success(`✅ Fulfilled promise delaied function ${i} in ${o}ms`):e(r).Notify.failure(`❌ Rejected promise delaied function ${i} in ${o}ms`)}),o)},createPromiseRealOne:function(e,i){return new Promise(((o,t)=>{const n=Math.random()>.3;setTimeout((()=>{n?o({position:e,delay:i}):t({position:e,delay:i})}),i)}))},formSubmit:function(i){i.preventDefault();const{delay:o,step:t,amount:n}=i.currentTarget;e(r).Notify.info(`Delay of first promise: ${o.value}ms`),e(r).Notify.info(`Added delay to next each promise: ${t.value}ms`),e(r).Notify.info(`Promises, to generate: ${n.value}`);for(let i=0;i<n.value;i++)this.createPromiseRealOne(i+1,+o.value+ +t.value*i).then((({position:i,delay:o})=>{e(r).Notify.success(`✅ Fulfilled promise ${i} in ${o}ms`)})).catch((({position:i,delay:o})=>{e(r).Notify.failure(`❌ Rejected promise ${i} in ${o}ms`)}))},init:function(){e(r).Notify.success("Promises generator init succed"),this.formBind.addEventListener("submit",function(e){this.formSubmit(e)}.bind(this))}}).init();
//# sourceMappingURL=03-promises.9d3e0c13.js.map
