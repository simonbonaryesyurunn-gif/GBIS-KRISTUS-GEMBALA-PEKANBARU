// Basic JS to power calendar, announcements (local demo), gallery modal, and schedule data
document.addEventListener('DOMContentLoaded', function(){
  // Sample schedule data (could be fetched from server)
  const schedule = [
    {day:'Selasa', activity:'Ibadah Doa & Penyembahan', time:'19:00 WIB'},
    {day:'Jumat', activity:'Ibadah Kaum Wanita', time:'15:00 WIB'},
    {day:'Sabtu', activity:'Ibadah Hisbeat', time:'19:00 WIB'},
    {day:'Minggu', activity:'Ibadah Raya & Aleta Ministry', time:'08:00 WIB'},
  ];
  const jadwalBody = document.getElementById('jadwal-body');
  schedule.forEach(s=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.day}</td><td>${s.activity}</td><td>${s.time}</td>`;
    jadwalBody.appendChild(tr);
  });

  // Announcements - demo local storage
  const announcements = [
    'Rapat Pelayan: Minggu depan setelah ibadah.',
    'Pendaftaran kelas baptisan dibuka hingga akhir bulan.',
    'Natal Paud Generasi Pilihan - 03 Desember 2025.'
  ];
  const annList = document.getElementById('pengumuman-list');
  function renderAnnouncements(){
    annList.innerHTML = '';
    announcements.forEach(a=>{
      const li = document.createElement('li');
      li.textContent = a;
      annList.appendChild(li);
    });
  }
  renderAnnouncements();

  const form = document.getElementById('announce-form');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const val = document.getElementById('announce-input').value.trim();
    if(val){ announcements.unshift(val); renderAnnouncements(); form.reset(); }
  });

  // Simple calendar
  const events = [
    {date:'2025-12-03', title:'Natal Paud Generasi Pilihan'},
    {date:'2025-12-05', title:'Natal WBIS Korwil II'},
    {date:'2025-12-07', title:'Natal PBIS Korwil II'}
  ];
  function buildCalendar(year, month){
    const cal = document.getElementById('calendar');
    cal.innerHTML = '';
    const first = new Date(year, month, 1);
    const last = new Date(year, month+1, 0);
    const tbl = document.createElement('table');
    tbl.className = 'cal';
    const header = document.createElement('thead');
    header.innerHTML = '<tr><th colspan="7">'+ first.toLocaleString('id-ID',{month:'long', year:'numeric'}) +'</th></tr>';
    tbl.appendChild(header);
    const daysRow = document.createElement('tr');
    ['Min','Sen','Sel','Rab','Kam','Jum','Sab'].forEach(d=>{ const th=document.createElement('th'); th.textContent=d; daysRow.appendChild(th); });
    const theadDays = document.createElement('thead'); theadDays.appendChild(daysRow); tbl.appendChild(theadDays);
    const tbody = document.createElement('tbody');
    let row = document.createElement('tr');
    for(let i=0;i<first.getDay();i++){ row.appendChild(document.createElement('td')); }
    for(let d=1; d<=last.getDate(); d++){
      if(row.children.length===7){ tbody.appendChild(row); row=document.createElement('tr'); }
      const cell = document.createElement('td');
      cell.textContent=d;
      const dstr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const ev = events.find(e=>e.date===dstr);
      if(ev){ const dot = document.createElement('div'); dot.className='event-dot'; dot.title=ev.title; cell.appendChild(dot); }
      row.appendChild(cell);
    }
    if(row.children.length>0) tbody.appendChild(row);
    tbl.appendChild(tbody);
    cal.appendChild(tbl);

    // Event list for selected month
    const evList = document.getElementById('event-list');
    evList.innerHTML = '<h3>Acara Bulan Ini</h3>';
    const ul = document.createElement('ul');
    events.filter(e=>e.date.startsWith(`${year}-${String(month+1).padStart(2,'0')}`)).forEach(e=>{
      const li = document.createElement('li'); li.textContent = `${e.date} — ${e.title}`; ul.appendChild(li);
    });
    if(!ul.children.length){ ul.innerHTML='<li>Tidak ada acara.</li>'; }
    evList.appendChild(ul);
  }
  const now = new Date();
  buildCalendar(now.getFullYear(), now.getMonth());

  // Gallery modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  document.getElementById('gallery').addEventListener('click', function(e){
    if(e.target.tagName==='IMG'){
      modalImg.src = e.target.src;
      modalCaption.textContent = e.target.alt || '';
      modal.setAttribute('aria-hidden','false');
    }
  });
  document.getElementById('modal-close').addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); });

});
