(function(){'use strict';const D=window.ACCOUNT_DATA;
  document.documentElement.classList.add('js');
  const theme=document.getElementById('theme-toggle');
  try{const saved=localStorage.getItem('accounts-theme');if(['dark','light'].includes(saved))document.documentElement.dataset.theme=saved;}catch(_){}
  if(theme)theme.addEventListener('click',()=>{const dark=document.documentElement.dataset.theme==='dark'||(!document.documentElement.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches);const next=dark?'light':'dark';document.documentElement.dataset.theme=next;theme.setAttribute('aria-label',next==='dark'?'切换浅色模式':'切换深色模式');try{localStorage.setItem('accounts-theme',next);}catch(_){}});
  const quiz=document.getElementById('quiz');if(quiz)quiz.addEventListener('submit',e=>{e.preventDefault();if(!quiz.reportValidity())return;let score=0;D.quiz.forEach((q,i)=>{if(Number(quiz.elements.namedItem('q'+i).value)===q.answer)score++;});quiz.classList.add('answered');document.getElementById('quiz-score').textContent=`答对 ${score} / ${D.quiz.length} 题。答案已逐题展开；这是规则理解自测，分数不决定你的供款顺序。`;});
})();
