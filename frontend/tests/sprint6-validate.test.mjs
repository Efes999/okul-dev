import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEvent } from '../src/utils/validate-event.ts';
import { toISODate, toStoredDate, formatDate } from '../src/utils/format-date.ts';
const valid={title:'Yapay Zeka Semineri',category:'Seminer',date:'2026-11-10',time:'14:30',location:'Konferans Salonu',capacity:'100',description:'Güncel yapay zeka uygulamalarına dair bilgiler.'};
test('7 alanda boş form doğrulaması',()=>{
  const errors=validateEvent({title:'',category:'',date:'',time:'',location:'',capacity:'',description:''});
  assert.deepEqual(Object.keys(errors).sort(),['title','category','date','time','location','capacity','description'].sort());
});
test('Geçerli etkinlikte sıfır hata',()=>assert.deepEqual(validateEvent(valid),{}));
test('Başlık ve açıklama minimumları',()=>{
  assert.ok(validateEvent({...valid,title:'AB'}).title);
  assert.ok(validateEvent({...valid,description:'123456789'}).description);
  assert.equal(validateEvent({...valid,title:'ABC',description:'1234567890'}).title,undefined);
});
test('Kontenjan 1–1000 tam sayı',()=>{
  for(const bad of ['','0','-5','1001','3.5','not-a-number']) assert.ok(validateEvent({...valid,capacity:bad}).capacity,bad);
  for(const good of ['1','120','1000']) assert.equal(validateEvent({...valid,capacity:good}).capacity,undefined,good);
});
test('Tarih GG-AA-YYYY ve ISO dönüşümü',()=>{
  assert.equal(toISODate('12-10-2026'),'2026-10-12');
  assert.equal(toISODate('2026-10-12'),'2026-10-12');
  assert.equal(toStoredDate('2026-11-03'),'03-11-2026');
  assert.match(formatDate('12-10-2026'),/2026/);
});
