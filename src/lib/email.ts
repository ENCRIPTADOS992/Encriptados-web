export async function sendEmail(template: 'roaming_ready'|'userid_pending'|'userid_ready'|'userid_out_of_stock', to:string, vars:Record<string,any>){
  console.log(`[email:${template}] to=${to} vars=`, vars);
}
