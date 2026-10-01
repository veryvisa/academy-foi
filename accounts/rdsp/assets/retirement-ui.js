/* Shared static/browser presentation for RDSP and retirement drawdowns. No formulas here. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./accounts-engine.js'),require('./presentation.js'));else root.RetirementUI=factory(root.AccountsEngine,root.AccountsPresentation);})(typeof globalThis!=='undefined'?globalThis:this,function(E,P){
'use strict';const esc=P.escape,money=P.dollars;
const decimal=v=>v===null?'另核':typeof v==='number'?v.toLocaleString('en-CA',{minimumFractionDigits:2,maximumFractionDigits:2}):esc(v);
function table(headers,rows,caption){return `<div class="table-scroll" role="region" aria-label="${esc(caption)}，可横向滚动" tabindex="0"><table><caption>${esc(caption)}</caption><thead><tr>${headers.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')}</tr></thead><tbody>${rows.map(row=>'<tr>'+row.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')}</tbody></table></div>`;}
function unavailable(r){return '<p class="error">'+r.reasons.map(esc).join('；')+'。</p>';}
function result(account,r){
 if(!r.eligible)return unavailable(r);
 const rdsp=account==='rdsp';
 const columns=rdsp?[['calendarYear','情景年'],['age','当年达到年龄'],['opening','年初资产'],['contribution','自存'],['grant','CDSG'],['bond','CDSB'],['growth','增长'],['gross','付给受益人'],['tax','估算所得税'],['repayment','退回补助'],['net','税后现金'],['closing','年末未取资产']]:[['year','年次'],['age','年初年龄'],['opening','年初资产'],['minimum','最低额'],['maximum','LIF 上限'],['gross','实际毛提款'],['tax','所得税增额'],['oasLoss','OAS 回收增额'],['gisLoss','GIS 减少'],['benefitLoss','福利损失合计'],['net','净可用现金'],['closing','年末资产']];
 const rows=r.rows.map(row=>columns.map(([k],i)=>i<2?esc(row[k]):decimal(row[k])));
 let h=table(columns.map(c=>c[1]),rows,rdsp?'逐年现金表 · 补助在账户内，只有提款才成为生活现金':'逐年现金表 · 福利按年化权益，通常次期兑现；金额为加元');
 h+=`<div class="knowledge"><h2>这张账说明什么</h2><p>累计净可用现金约 ${money(r.netTotal)}；期末仍在账户的资产约 ${money(r.remaining)}。这笔剩余资产尚未扣未来提款税，不能与现金直接相加后当作税后财富。</p>`;
 if(rdsp)h+=`<p>首年 grant ${money(r.firstYear.grant)}，bond ${money(r.firstYear.bond)}；情景期间政府入账合计 ${money(r.supportTotal)}。以后没有继续自存，所以不再新增普通匹配 grant；符合条件时仍可继续拿 bond。</p>`;
 else h+='<p>“福利损失合计”已经包含 OAS 回收和 GIS 减少，并可能含儿童福利、GST/HST 类抵免和 CWB；请勿再把上面两个分项扣一次。LIF 上限显示“另核”时，该列不适用于普通 RRIF。</p>';
 return h+`</div><aside class="method"><p>${esc(r.assumptions)}</p></aside>`;
}
function support(r){if(!r.eligible)return unavailable(r);return `<p>按输入，grant 为 ${money(r.grant)}，bond 为 ${money(r.bond)}；供款后剩余终身空间 ${money(r.room)}。其中 ${money(r.unmatched)} 供款没有取得匹配，不会留成未来的待匹配供款。</p>`+table(['权益年份','匹配率','分配的自存本金','对应 grant'],r.allocation.map(x=>[x.year,esc(x.rate)+' 倍',decimal(x.contribution),decimal(x.grant)]),'本年供款怎样取得匹配')+'<p>这是按你填写的已核未用权益计算。政府补助需要申请、有效资格及机构办理，金额不是银行入账回执。</p>';}
function withdrawal(r,tax){if(!r.eligible)return unavailable(r);return table(['毛提款','免税私人本金','应税部分','退给政府的补助','账户剩余'],[[r.gross,r.nonTaxable,r.taxable,r.repayment,r.closing].map(decimal)],'本年度首次提款 · 付给受益人与退给政府是两笔钱')+`<p>本情景 LDAP 公式额 ${money(r.ldap)}；普通年度最低需付 ${money(r.minimum)}；所选 PGAP 状态下的总 DAP 上限 ${money(r.maximum)}。</p>`+(tax?`<p>${tax.tax===null?esc(tax.reason):'按成人 DTC 基础抵免估算，所得税增额约 '+money(tax.tax)+'，受益人税后收到约 '+money(r.gross-tax.tax)+'。'+esc(tax.reason)}。</p>`:'');}
return {table,result,support,withdrawal,decimal};
});
