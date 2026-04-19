  var currentRole = 'admin';
  var roleData = {
    citizen: { name: 'Rahul Sharma', initials: 'RS', role: 'Citizen' },
    officer: { name: 'Rajesh Kumar', initials: 'RK', role: 'Inspector · East District' },
    admin: { name: 'Arvind Kumar IPS', initials: 'AK', role: 'Superintendent of Police' }
  };

  function selectRole(r) {
    currentRole = r;
    ['citizen','officer','admin'].forEach(function(x) {
      document.getElementById('r-'+x).classList.toggle('selected', x === r);
    });
  }

  function doLogin() {
    var d = roleData[currentRole];
    document.getElementById('top-name').textContent = d.name;
    document.getElementById('top-avatar').textContent = d.initials;
    document.getElementById('user-badge').style.display = 'flex';
    document.getElementById('nav-tabs').style.display = 'flex';

    document.getElementById('tab-file-fir').style.display = currentRole === 'citizen' ? 'block' : 'none';
    document.getElementById('tab-officers').style.display = currentRole === 'admin' ? 'block' : 'none';
    document.getElementById('tab-analytics').style.display = currentRole !== 'citizen' ? 'block' : 'none';

    document.getElementById('btn-file-fir-top').style.display = currentRole === 'citizen' ? 'inline-block' : 'none';
    document.getElementById('officer-action-card').style.display = currentRole === 'citizen' ? 'none' : 'block';

    var tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(function(t) { t.classList.remove('active'); });
    tabs[0].classList.add('active');

    showScreen('dashboard', null);
    document.getElementById('screen-login').style.display = 'none';

    var dId = document.getElementById('dash-citizen');
    var oId = document.getElementById('dash-officer');
    var aId = document.getElementById('dash-admin');
    dId.style.display = 'none'; oId.style.display = 'none'; aId.style.display = 'none';
    if (currentRole === 'citizen') dId.style.display = 'block';
    else if (currentRole === 'officer') oId.style.display = 'block';
    else aId.style.display = 'block';
  }

  function logout() {
    document.getElementById('user-badge').style.display = 'none';
    document.getElementById('nav-tabs').style.display = 'none';
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); s.style.display = ''; });
    document.getElementById('screen-login').style.display = 'block';
    document.getElementById('screen-login').classList.add('active');
    currentRole = 'admin';
    ['citizen','officer','admin'].forEach(function(x) { document.getElementById('r-'+x).classList.remove('selected'); });
    document.getElementById('fir-success').style.display = 'none';
  }

  function showScreen(name, tabEl) {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    var el = document.getElementById('screen-'+name);
    if (el) el.classList.add('active');
    if (tabEl) {
      document.querySelectorAll('.nav-tab').forEach(function(t) { t.classList.remove('active'); });
      tabEl.classList.add('active');
    }
  }

  function switchTab(ns, tab, el) {
    var prefix = ns + '-';
    document.querySelectorAll('[id^="'+prefix+'"]').forEach(function(x) { x.style.display = 'none'; });
    var t = document.getElementById(ns+'-'+tab);
    if (t) t.style.display = 'block';
    if (el) {
      var parent = el.parentElement;
      parent.querySelectorAll('.inner-tab').forEach(function(x) { x.classList.remove('active'); });
      el.classList.add('active');
    }
  }

  function showFirSuccess() {
    document.getElementById('fir-success').style.display = 'block';
    document.getElementById('fir-success').scrollIntoView({ behavior: 'smooth' });
  }

  selectRole('admin');
