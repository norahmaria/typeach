import{d as v,c as h,u as I,r as y,t as o,w as u,h as i,j as B,k as p,G as g,F as q,y as C,m as k,n as s,U as P,W as $}from"./index-tvZMCYyo.js";import{i as w}from"./index-VSyN3bxg.js";import{u as E}from"./index-Cts3jU9_.js";const T=v({__name:"TextInput",props:{id:{default:()=>h()},value:{default:""},textarea:{type:Boolean,default:!1},placeholder:{},required:{type:Boolean}},emits:["clear-validation","update:value","validate"],setup(d,{emit:m}){const t=d,l=m,{inputClass:c}=I("textInput",["input"]),a=y(t.value),n=E(o(t,"id"),a,l,{isSame(e,r){return e===r}});u(o(t,"value"),e=>{a.value=e??""}),u(a,e=>{l("update:value",e)});const f=e=>{$(e.target)&&w(e.target)&&(a.value=e.target.value)};return(e,r)=>(i(),B(q,null,[p(e.$slots,"before"),g([e.$attrs,e.id,t.textarea,e.textarea,e.required,e.placeholder,a.value],()=>(i(),C(P(e.textarea?"textarea":"input"),k(e.$attrs,{id:e.id,"data-textarea":e.textarea,"aria-required":e.required,placeholder:e.placeholder,value:a.value,class:s(c)(),type:"text",onChange:f,onBlur:s(n).validate,onInput:s(n).clearErrors}),null,16,["id","data-textarea","aria-required","placeholder","value","class","onBlur","onInput"])),r,0),p(e.$slots,"after")],64))}}),S={Input:T};export{S as P};
