(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[962],{2204:(e,t,r)=>{Promise.resolve().then(r.bind(r,2259))},8707:(e,t,r)=>{"use strict";r.d(t,{Y:()=>n});var a=r(5155),s=r(5565);let l={src:"/_next/static/media/logo.64cdc4f2.svg",height:80,width:80,blurWidth:0,blurHeight:0};var c=r(7396);function n(){return(0,a.jsx)("div",{className:"flex items-center bg-[#222E3A] ",children:(0,a.jsxs)(c.default,{href:"/",className:"flex items-center bg-[#222E3A] ",children:[(0,a.jsx)(s.default,{src:l,width:70,height:70,alt:"Logo"}),(0,a.jsx)("h1",{className:"font-[500] text-[20px] ml-2 text-[#f8f9fa]",children:"Обнаружение животных"})]})})}},2259:(e,t,r)=>{"use strict";r.r(t),r.d(t,{HandleModal:()=>h,default:()=>x});var a=r(5155),s=r(2115),l=r(2651),c=r(8707);let n={src:"/_next/static/media/cloud.2941b90f.svg",height:90,width:90,blurWidth:0,blurHeight:0};var d=r(5565),i=r(2069);let o=l.A.create({baseURL:"http://localhost:8080/api/v1/neural/"});function h(e){let{onClose:t,params:r}=e,[l,c]=(0,s.useState)([]),[h,x]=(0,s.useState)(!1),p=[".zip",".rar",".png",".jpg",".jpeg"],u=e=>{let t=e.name.substring(e.name.lastIndexOf(".")).toLowerCase();return p.includes(t)},g=async()=>{if(0===l.length){alert("Пожалуйста, выберите файлы для отправки.");return}let e=new FormData;l.forEach(t=>{e.append("file",t)});try{let a=await o.post("upload_report/".concat(r.id),e);200===a.status?(alert("Файлы успешно отправлены!"),c([]),t()):alert("Ошибка при отправке файлов.")}catch(e){console.error("Ошибка при отправке:",e),alert("Произошла ошибка при отправке файлов.")}};return(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white",children:(0,a.jsxs)("div",{className:"bg-gray-800 p-4 rounded-lg shadow-lg w-[90%] max-w-md h-[500px]",children:[(0,a.jsx)("div",{className:"flex justify-end",children:(0,a.jsx)("button",{onClick:t,className:"pb-3",children:(0,a.jsx)(d.default,{src:i.A,width:20,height:20,alt:"Close"})})}),(0,a.jsx)("div",{className:"flex flex-col items-center justify-center p-4 rounded-lg h-[380px]\n                ".concat(h?"border-2 border-dashed border-blue-500":"border border-gray-600"),onDragOver:e=>{e.preventDefault(),x(!0)},onDragLeave:()=>{x(!1)},onDrop:e=>{e.preventDefault(),x(!1),e.dataTransfer.files&&c(Array.from(e.dataTransfer.files).filter(u))},children:(0,a.jsx)("label",{className:"mb-4 cursor-pointer px-4 py-2 rounded text-center w-[100%]",children:(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,a.jsx)(d.default,{src:n,width:100,height:100,alt:"Logo"}),(0,a.jsx)("input",{type:"file",multiple:!0,onChange:e=>{e.target.files&&c(Array.from(e.target.files).filter(u))},accept:".zip,.rar,.png,.jpg,.jpeg",className:"hidden"}),(0,a.jsx)("p",{className:"mb-4",children:l.length>0?"Выбрано файлов: ".concat(l.length):"Файлы не выбраны"})]})})}),(0,a.jsxs)("div",{className:"flex justify-center gap-4 mt-5",children:[(0,a.jsx)("button",{onClick:g,className:"px-4 py-2 bg-green-500 hover:bg-green-600 rounded w-[120px]",children:"Отправить"}),(0,a.jsx)("button",{onClick:()=>{c([])},className:"px-4 py-2 bg-red-500 hover:bg-red-600 rounded w-[120px]",children:"Очистить"})]})]})})}function x(e){let{params:t}=e,[r,l]=(0,s.useState)([]),[x,p]=(0,s.useState)(!1),[u,g]=(0,s.useState)([]),[m,f]=(0,s.useState)(1),[b,j]=(0,s.useState)([]),[y,N]=(0,s.useState)(!1),w=Math.ceil(u.length/8),v=u.slice((m-1)*8,8*m),C=[".zip",".rar",".png",".jpg",".jpeg"],k=e=>{let t=e.name.substring(e.name.lastIndexOf(".")).toLowerCase();return C.includes(t)},A=async()=>{if(0===r.length){alert("Пожалуйста, выберите файлы для отправки.");return}let e=new FormData;r.forEach(t=>{e.append("file",t)});try{let r=await o.post("upload_report/".concat(t.id),e);200===r.status?(alert("Файлы успешно отправлены!"),l([]),await S()):alert("Ошибка при отправке файлов.")}catch(e){console.error("Ошибка при отправке:",e),alert("Произошла ошибка при отправке файлов.")}},_=e=>{e>0&&e<=w&&f(e)},D=async e=>{try{await o.delete("reports/remove/".concat(e))}catch(e){console.error("Ошибка при удалении",e)}},E=async e=>{try{await D(e),await S()}catch(e){console.log("Ошибка при удалении",e)}},S=async()=>{try{let e=await o.get("reports/all/".concat(t.id));200===e.status&&Array.isArray(e.data)&&g(e.data)}catch(e){console.error("Ошибка при получении данных отчёта:",e)}};(0,s.useEffect)(()=>{S()},[]);let L=async()=>{try{let e=await o.get("reports/csv/".concat(t.id));if(200===e.status){let r="report_".concat(t.id,".csv"),a=e.data,s=document.createElement("a");s.href="data:text/csv;charset=utf-8,".concat(encodeURIComponent(a)),s.setAttribute("download",r),document.body.appendChild(s),s.click(),document.body.removeChild(s)}else alert("Ошибка при скачивании CSV файла.")}catch(e){console.error("Ошибка при скачивании CSV файла:",e),alert("Произошла ошибка при скачивании файла.")}};return(0,a.jsxs)("div",{className:"bg-gradient-to-b from-[#485563] to-[#29323c] h-[100vh]",children:[(0,a.jsx)(c.Y,{}),(0,a.jsx)("div",{className:"h-[90vh] flex flex-col items-center justify-center text-white",children:0===u.length?(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg h-[400px] w-[90%] max-w-md \n                        ".concat(x?"border-2 border-dashed border-blue-500 transition-all duration-200 ease-in-out":"border border-gray-600"),onDragOver:e=>{e.preventDefault(),p(!0)},onDragLeave:()=>{p(!1)},onDrop:e=>{e.preventDefault(),p(!1),e.dataTransfer.files&&l(Array.from(e.dataTransfer.files).filter(k))},children:[(0,a.jsx)("label",{className:"mb-4 cursor-pointer px-4 py-2 rounded text-center w-[100%] h-[100%]",children:(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center h-[100%] ",children:[(0,a.jsx)(d.default,{src:n,width:100,height:100,alt:"Logo"}),(0,a.jsx)("input",{type:"file",multiple:!0,onChange:e=>{e.target.files&&l(Array.from(e.target.files).filter(k))},accept:".zip,.rar,.png,.jpg,.jpeg",className:"hidden"}),(0,a.jsx)("p",{className:"mb-4",children:r.length>0?"Выбрано файлов: ".concat(r.length):"Файлы не выбраны"})]})}),(0,a.jsxs)("div",{className:"flex gap-4 mt-5",children:[(0,a.jsx)("button",{onClick:A,className:"px-4 py-2 bg-green-500 hover:bg-green-600 rounded w-[120px]",children:"Отправить"}),(0,a.jsx)("button",{onClick:()=>{l([])},className:"px-4 py-2 bg-red-500 hover:bg-red-600 rounded w-[120px]",children:"Очистить"})]})]}):(0,a.jsxs)("div",{className:"w-full flex flex-col items-center h-[700px]",children:[(0,a.jsx)("div",{className:"flex w-3/4 justify-end",children:(0,a.jsxs)("div",{className:"mt-4",children:[(0,a.jsx)("button",{onClick:()=>N(!0),className:"px-4 py-2 bg-green-600 hover:bg-green-700 rounded w-[180px] mt-4",children:"Добавить данных"}),(0,a.jsx)("button",{onClick:L,className:"px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded w-[150px]",children:"Скачать CSV"}),(0,a.jsx)("button",{onClick:()=>{window.print()},className:"px-4 py-2 bg-red-600 hover:bg-red-700 rounded w-[180px] mt-4",children:"Сохранить как PDF"})]})}),(0,a.jsxs)("div",{className:"bg-gray-800 text-white p-6 rounded-lg shadow-lg w-3/4 flex flex-col items-center h-[600px] tbl",children:[(0,a.jsx)("h1",{className:"text-[22px] mb-4 text-center",children:"Отчет"}),(0,a.jsx)("div",{className:"w-full overflow-auto flex-grow",children:(0,a.jsxs)("table",{className:"w-full text-left",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-4 py-2 border-b border-gray-700",children:"Дата загрузки"}),(0,a.jsx)("th",{className:"px-4 py-2 border-b border-gray-700",children:"Путь к файлу"}),(0,a.jsx)("th",{className:"px-4 py-2 border-b border-gray-700",children:"Класс"}),(0,a.jsx)("th",{className:"px-4 py-2 border-b border-gray-700",children:"Точность"})]})}),(0,a.jsx)("tbody",{children:v.map(e=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"px-4 py-2",children:e.data_upload}),(0,a.jsx)("td",{className:"px-4 py-2",children:e.file_path}),(0,a.jsx)("td",{className:"px-4 py-2",children:e.class_num}),(0,a.jsx)("td",{className:"px-4 py-2",children:e.confidence}),(0,a.jsx)("td",{className:"px-4 py-2",children:(0,a.jsx)("button",{onClick:()=>E(e.uid),className:"text-red-500",children:(0,a.jsx)(d.default,{className:"fill-red-500",src:i.A,width:25,height:25,alt:"del"})})})]},e.uid))})]})}),(0,a.jsxs)("div",{className:"flex justify-center mt-4 w-full",children:[(0,a.jsx)("button",{onClick:()=>_(m-1),disabled:1===m,className:"px-4 py-2 mx-1 bg-[#222E3A] disabled:bg-gray-500 rounded disabled:opacity-50 border-[1px]",children:"Предыдущая"}),(0,a.jsxs)("span",{className:"px-4 py-2 needhide",children:["Страница ",m," из ",w]}),(0,a.jsx)("button",{onClick:()=>_(m+1),disabled:m===w,className:"px-4 py-2 mx-1 bg-[#222E3A] disabled:bg-gray-500 rounded disabled:opacity-50 border-[1px]",children:"Следующая"})]})]})]})}),y&&(0,a.jsx)(h,{params:t,onClose:()=>N(!1)})]})}},2069:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a={src:"/_next/static/media/Close.f7b2a5d2.svg",height:90,width:90,blurWidth:0,blurHeight:0}}},e=>{var t=t=>e(e.s=t);e.O(0,[360,441,517,358],()=>t(2204)),_N_E=e.O()}]);