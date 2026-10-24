const form=document.querySelector("#chat-form");
const input=document.querySelector("#message-input");
const sendButton=document.querySelector("#send-button");
const messages=document.querySelector("#messages");
const suggestions=document.querySelector("#suggestions");
const clearButton=document.querySelector("#clear-chat");
let history=[];
let busy=false;

function addMessage(role,text,error=false){
  const wrap=document.createElement("div");
  wrap.className=`message ${role}${error?" error":""}`;
  const bubble=document.createElement("div");
  bubble.className="bubble";
  bubble.textContent=text;
  const time=document.createElement("span");
  time.className="time";
  time.textContent=new Date().toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});
  wrap.append(bubble,time);messages.append(wrap);messages.scrollTop=messages.scrollHeight;return wrap;
}
function setBusy(value){busy=value;sendButton.disabled=value;input.disabled=value;sendButton.textContent=value?"…":"↑";}
async function sendMessage(text){
  const message=text.trim();if(!message||busy)return;
  addMessage("user",message);input.value="";input.style.height="auto";suggestions.hidden=true;
  const waiting=addMessage("assistant","Ich denke kurz nach …");setBusy(true);
  try{
    const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message,history})});
    const data=await response.json().catch(()=>({}));
    waiting.remove();
    if(!response.ok)throw new Error(data.error||"Der Support ist gerade nicht erreichbar.");
    addMessage("assistant",data.answer);
    history.push({role:"user",content:message},{role:"assistant",content:data.answer});history=history.slice(-8);
  }catch(error){waiting.remove();addMessage("assistant",error.message||"Verbindungsfehler. Bitte versuche es erneut.",true);}
  finally{setBusy(false);input.focus();}
}
form.addEventListener("submit",event=>{event.preventDefault();sendMessage(input.value);});
input.addEventListener("input",()=>{input.style.height="auto";input.style.height=Math.min(input.scrollHeight,120)+"px";});
suggestions.addEventListener("click",event=>{const button=event.target.closest("button[data-prompt]");if(button)sendMessage(button.dataset.prompt);});
clearButton.addEventListener("click",()=>{
  if(busy)return;history=[];messages.replaceChildren();
  addMessage("assistant","Hallo! 🌿 Ich bin der KI-Assistent von Kroizauber. Was möchtest du über unsere Kerzen oder den Shop wissen?");
  suggestions.hidden=false;input.focus();
});
