import"./useBootstrap-B5thChz7.js";/* empty css                 */document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("fetchAPI"),e=document.getElementById("outputAPI");r.addEventListener("click",()=>{e.innerHTML="<p>Loading data...</p>",fetch("https://jsonplaceholder.typicode.com/comments?_limit=5").then(t=>{if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return t.json()}).then(t=>{e.innerHTML="",t.forEach(n=>{const o=document.createElement("div");o.classList.add("comment"),o.innerHTML=`
                        <p><strong>${n.name}</strong> (${n.email})</p>
                        <p>${n.body}</p>
                        <hr>
                    `,e.appendChild(o)})}).catch(t=>{e.innerHTML=`<p style="color:red;">Error fetching data: ${t.message}</p>`})})});
