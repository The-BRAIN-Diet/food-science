// Run against the live canonical route with the browser's Playwright adapter.
// Actual click events and visible panels are required; static markup is insufficient.
export async function verifyPm1CanonicalClicks(page) {
  const check=(condition,message)=>{if(!condition)throw Error(message);};
  const group=page.locator('#pm-lever-dietary');
  const toggle=group.locator(':scope > .brs-fm-hub-shell > button');
  const panel=group.locator(':scope > .brs-fm-hub-shell > .brs-fm-hub-panel');
  if(await toggle.getAttribute('aria-expanded')==='true')await toggle.click();
  check(!await panel.isVisible(),'Dietary group must close');
  await toggle.click();
  check(await panel.isVisible(),'Dietary group must open on click');
  const dietary=group.locator('[data-pm-lever-section="3.1.1"]');
  check(await dietary.count()===1,'One primary dietary disclosure, with stable canonical identity');
  const button=dietary.locator(':scope > .brs-fm-hub-shell > button');
  const content=dietary.locator(':scope > .brs-fm-hub-shell > .brs-fm-hub-panel');
  if(await button.getAttribute('aria-expanded')==='true')await button.click();
  check(!await content.isVisible(),'Nested dietary disclosure must close');
  await button.click();
  check(await content.isVisible(),'Nested dietary disclosure must open on click');
  check(await toggle.getAttribute('aria-expanded')==='true','Nested click must not close parent');
  const input=content.getByRole('button',{name:'Tryptophan',exact:true});
  await input.click();
  check(await input.getAttribute('aria-expanded')==='true','Six-atom input disclosure must open');
  await input.click();
  check(await input.getAttribute('aria-expanded')==='false','Six-atom input disclosure must close');
  await button.click();
  check(!await content.isVisible(),'Nested dietary disclosure must close again');
  await toggle.click();
  check(!await panel.isVisible(),'Parent dietary group must close again');
  return {route:'canonical PM1',parentClicks:'PASS',nestedClicks:'PASS',sixAtomClicks:'PASS',parentIsolation:'PASS'};
}
