(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{509:(e,t,a)=>{Promise.resolve().then(a.bind(a,6015))},8707:(e,t,a)=>{"use strict";a.d(t,{Y:()=>i});var l=a(5155),s=a(5565);let c={src:"/_next/static/media/logo.64cdc4f2.svg",height:80,width:80,blurWidth:0,blurHeight:0};var r=a(7396);function i(){return(0,l.jsx)("div",{className:"flex items-center bg-[#222E3A] ",children:(0,l.jsxs)(r.default,{href:"/",className:"flex items-center bg-[#222E3A] ",children:[(0,l.jsx)(s.default,{src:c,width:70,height:70,alt:"Logo"}),(0,l.jsx)("h1",{className:"font-[500] text-[20px] ml-2 text-[#f8f9fa]",children:"Обнаружение животных"})]})})}},6015:(e,t,a)=>{"use strict";a.r(t),a.d(t,{createReport:()=>g,default:()=>w,deleteReport:()=>b,getAllReports:()=>p,getReportByUid:()=>f,updateReport:()=>m});var l=a(5155),s=a(2115),c=a(2651),r=a(5565),i=a(8707),o=a(6658),d=a(7396);let n={src:"/_next/static/media/Add.407b0189.svg",height:90,width:90,blurWidth:0,blurHeight:0},h={src:"/_next/static/media/Edit.6977ac0a.svg",height:90,width:90,blurWidth:0,blurHeight:0};var x=a(2069);let u=c.A.create({baseURL:"http://localhost:8080/api/v1/",timeout:1e4});async function p(e){try{let t=await u.get("report/all");e(t.data)}catch(e){throw console.error("Ошибка при загрузке всех отчетов:",e),e}}async function f(e,t){try{let a=await u.get("report/get/".concat(e));t(a.data),console.log(a.data)}catch(t){throw console.error("Ошибка при загрузке отчета с UID ".concat(e,":"),t),t}}async function g(){try{let e="Отчет ".concat(new Date().toLocaleString()),t=await u.post("report/create",{title:e});return console.log("Отчет создан:",t.data),t.data}catch(e){throw console.error("Ошибка при создании отчета:",e),e}}async function m(e,t){try{let a=await u.put("report/update/".concat(e),{title:t});console.log("Отчет обновлен:",a.data)}catch(t){throw console.error("Ошибка при обновлении отчета с UID ".concat(e,":"),t),t}}async function b(e){try{let t=await u.delete("report/delete/".concat(e));console.log("Отчет с UID ".concat(e," удален:"),t.data)}catch(t){throw console.error("Ошибка при удалении отчета с UID ".concat(e,":"),t),t}}function w(){let[e,t]=(0,s.useState)([]),[a,c]=(0,s.useState)(null),[u,f]=(0,s.useState)(null),[w,j]=(0,s.useState)(""),[y,v]=(0,s.useState)(1),N=Math.ceil(e.length/16);(0,o.useRouter)(),(0,s.useEffect)(()=>{p(t).catch(()=>c("Ошибка при загрузке данных"))},[]);let k=e=>{v(e)},_=e.slice((y-1)*16,16*y),A=async()=>{try{let a=await g();t([...e,a])}catch(e){c("Ошибка при создании отчета")}},C=async a=>{try{await b(a),t(e.filter(e=>e.uid!==a))}catch(e){c("Ошибка при удалении отчета")}},E=e=>{f(e),j(e.title)},R=async()=>{if(u&&w.trim())try{await m(u.uid,w),t(e.map(e=>e.uid===u.uid?{...e,title:w}:e)),f(null),j("")}catch(e){c("Ошибка при обновлении отчета")}else c("Название отчета не может быть пустым")};return(0,l.jsxs)("div",{className:"bg-gradient-to-b from-[#485563] to-[#29323c] h-[100vh] w-full",children:[(0,l.jsx)(i.Y,{}),(0,l.jsxs)("div",{className:"container mx-auto p-4 text-white flex flex-col justify-center",children:[a&&(0,l.jsx)("p",{className:"text-red-500",children:a}),(0,l.jsxs)("div",{className:"mb-4 flex flex-row h-[50px]",children:[(0,l.jsx)("button",{onClick:A,className:"text-white",children:(0,l.jsx)(r.default,{src:n,width:50,height:50,alt:"add"})}),u&&(0,l.jsxs)("div",{className:"mb-4 mt-[5px]",children:[(0,l.jsx)("input",{type:"text",value:w,onChange:e=>j(e.target.value),className:"p-2 text-black",placeholder:"Редактировать название отчета"}),(0,l.jsx)("button",{onClick:R,className:"ml-2 px-4 py-2 bg-yellow-500 text-white",children:"Обновить отчет"})]})]}),(0,l.jsx)("div",{className:"flex flex-row gap-5 flex-wrap justify-evenly",children:_.map(e=>(0,l.jsxs)("div",{className:"w-[350px] bg-[#222E3A] text-wrap h-[150px] p-5 border-[1px] rounded relative overflow-y-auto overflow-x-hidden",children:[(0,l.jsxs)(d.default,{href:"/pages/report/".concat(e.uid),className:"block",children:[(0,l.jsxs)("p",{className:"text-wrap",children:[(0,l.jsx)("strong",{children:"Название:"})," ",e.title]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Дата создания:"})," ",e.create_date]})]}),(0,l.jsxs)("div",{className:"absolute top-2 right-2 flex space-x-2",children:[(0,l.jsx)("button",{onClick:()=>E(e),className:"text-yellow-500",children:(0,l.jsx)(r.default,{className:"fill-yellow-500",src:h,width:25,height:25,alt:"edit"})}),(0,l.jsx)("button",{onClick:()=>C(e.uid),className:"text-red-500",children:(0,l.jsx)(r.default,{className:"fill-red-500",src:x.A,width:25,height:25,alt:"del"})})]})]},e.uid))}),(0,l.jsxs)("div",{className:"fixed bottom-5 left-1 w-full flex justify-center p-4",children:[(0,l.jsx)("button",{onClick:()=>k(y-1),disabled:1===y,className:"px-3 py-1 bg-[#222E3A]  text-white disabled:bg-gray-500 mx-2 rounded border-[1px]",children:"Назад"}),(0,l.jsxs)("span",{className:"mx-2",children:[y," из ",N]}),(0,l.jsx)("button",{onClick:()=>k(y+1),disabled:y===N,className:"px-3 py-1 bg-[#222E3A]  text-white disabled:bg-gray-500 mx-2 rounded border-[1px]",children:"Вперед"})]})]})]})}},2069:(e,t,a)=>{"use strict";a.d(t,{A:()=>l});let l={src:"/_next/static/media/Close.f7b2a5d2.svg",height:90,width:90,blurWidth:0,blurHeight:0}}},e=>{var t=t=>e(e.s=t);e.O(0,[360,441,517,358],()=>t(509)),_N_E=e.O()}]);