  var registeredUsers = {
    "citizen123": { password: "password", name: "Rahul Sharma", role: "citizen" },
    "officer123": { password: "password", name: "Rajesh Kumar", role: "officer" },
    "court123": { password: "password", name: "Hon. District Judge", role: "court" },
    "admin123": { password: "password", name: "Arvind Kumar IPS", role: "admin" }
  };
  var currentRole = 'admin';
  var roleData = {
    citizen: { name: 'Rahul Sharma', initials: 'RS', role: 'Citizen' },
    officer: { name: 'Rajesh Kumar', initials: 'RK', role: 'Inspector · East District' },
    court: { name: 'Hon. District Judge', initials: 'DJ', role: 'District Court' },
    admin: { name: 'Arvind Kumar IPS', initials: 'AK', role: 'Superintendent of Police' }
  };

  var firData = [{
    id: "#2024-0001",
    complainant: "dummyuser",
    mobile: "9876543210",
    type: "Theft",
    status: "Under Investigation",
    dateStr: "15 Mar 2024",
    officer: "Rajesh Kumar",
    badge: "badge-gold"
  }];

  var notificationsData = [{
    text: "Your FIR #2024-0001 status updated to <strong>Under Investigation</strong>. Officer Rajesh Kumar has been assigned.",
    time: "Just now"
  }];

  function generateFirId() {
    return "#2024-" + (1000 + firData.length).toString().padStart(4, '0');
  }

  function selectRole(r) {
    currentRole = r;
    ['citizen','officer','court','admin'].forEach(function(x) {
      var el = document.getElementById('r-'+x);
      if(el) el.classList.toggle('selected', x === r);
    });
    var userInp = document.getElementById('login-user');
    var passInp = document.getElementById('login-pass');
    if (userInp && passInp) {
        userInp.value = r + '123';
        passInp.value = 'password';
    }
  }

  function doLogin() {
    var u = document.getElementById('login-user').value;
    var p = document.getElementById('login-pass').value;

    if (!registeredUsers[u] || registeredUsers[u].password !== p || registeredUsers[u].role !== currentRole) {
      alert("Invalid login credentials for the selected role. Please check your mobile/username, password, and chosen role.");
      return;
    }
    
    roleData[currentRole].name = registeredUsers[u].name;

    var d = roleData[currentRole];
    document.getElementById('top-name').textContent = d.name;
    var nameParts = d.name.split(' ');
    var initials = nameParts[0].charAt(0).toUpperCase() + (nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : '');
    document.getElementById('top-avatar').textContent = initials;
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
    var cId = document.getElementById('dash-court'); // Added court reference
    dId.style.display = 'none'; oId.style.display = 'none'; aId.style.display = 'none';
    if (cId) cId.style.display = 'none';

    if (currentRole === 'citizen') dId.style.display = 'block';
    else if (currentRole === 'officer') oId.style.display = 'block';
    else if (currentRole === 'court' && cId) cId.style.display = 'block';
    else aId.style.display = 'block';

    renderApp();
  }

  function logout() {
    document.getElementById('user-badge').style.display = 'none';
    document.getElementById('nav-tabs').style.display = 'none';
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); s.style.display = ''; });
    document.getElementById('screen-login').style.display = 'block';
    document.getElementById('screen-login').classList.add('active');
    currentRole = 'admin';
    ['citizen','officer','court','admin'].forEach(function(x) { document.getElementById('r-'+x).classList.remove('selected'); });
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
    var nam = document.getElementById('fir-input-name') ? document.getElementById('fir-input-name').value : 'Citizen';
    var mob = document.getElementById('fir-input-mobile') ? document.getElementById('fir-input-mobile').value : 'N/A';
    var typ = document.getElementById('fir-input-type') ? document.getElementById('fir-input-type').value : 'Other';
    
    var newId = generateFirId();
    var d = new Date();
    var dateStr = d.getDate() + ' ' + d.toLocaleString('default', { month: 'short' }) + ' ' + d.getFullYear();

    var obj = {
      id: newId,
      complainant: nam,
      mobile: mob,
      type: typ,
      status: "Filed",
      dateStr: dateStr,
      officer: "Unassigned",
      badge: "badge-gray"
    };

    firData.push(obj);
    notificationsData.push({ text: "Your FIR "+newId+" has been filed successfully.", time: "Just now" });
    
    var succId = document.getElementById('success-fir-id');
    if (succId) succId.innerText = newId;

    document.getElementById('fir-success').style.display = 'block';
    document.getElementById('fir-success').scrollIntoView({ behavior: 'smooth' });
    
    renderApp();
  }

  function renderApp() {
    renderDashboardStats();
    renderRecentFirs();
    renderFirList();
    renderNotifications();
  }

  function renderDashboardStats() {
    var statTot = document.getElementById('dash-tot-firs');
    var statInv = document.getElementById('dash-inv-firs');
    var statRes = document.getElementById('dash-res-firs');
    var statPen = document.getElementById('dash-pen-firs');
    if(!statTot) return;

    var currentUserStr = (currentRole === 'citizen') ? document.getElementById('top-name').textContent : null;
    var myFirs = currentRole === 'citizen' ? firData.filter(function(f) { return f.complainant === currentUserStr; }) : firData;

    var inv = myFirs.filter(function(f) { return f.status.includes('Investigation'); }).length;
    var res = myFirs.filter(function(f) { return f.status === 'Resolved' || f.status.includes('Close'); }).length;
    var pen = myFirs.filter(function(f) { return f.status === 'Filed' || f.status.includes('Pending') || f.status === 'Unassigned'; }).length;

    statTot.textContent = myFirs.length;
    if(statInv) statInv.textContent = inv;
    if(statRes) statRes.textContent = res;
    if(statPen) statPen.textContent = pen;
  }

  function renderRecentFirs() {
    var container = document.getElementById('dash-recent-firs');
    if(!container) return;
    
    var currentUserStr = (currentRole === 'citizen') ? document.getElementById('top-name').textContent : null;
    var myFirs = currentRole === 'citizen' ? firData.filter(function(f) { return f.complainant === currentUserStr; }) : firData;

    container.innerHTML = '';
    if (myFirs.length === 0) {
      container.innerHTML = '<div style="font-size:12px;color:var(--text-muted);text-align:center;padding:10px;">No recent FIRs</div>';
      return;
    }
    
    var lat = myFirs.slice(Math.max(myFirs.length - 4, 0)).reverse();
    var html = '';
    lat.forEach(function(f) {
      html += '<div class="fir-detail-row"><span class="fir-detail-key">FIR '+f.id+'</span><span class="badge '+f.badge+'">'+f.status+'</span></div>';
    });
    container.innerHTML = html;
  }

  function renderFirList() {
    var tbody = document.getElementById('fir-table-body');
    if(!tbody) return;

    var currentUserStr = (currentRole === 'citizen') ? document.getElementById('top-name').textContent : null;
    var myFirs = currentRole === 'citizen' ? firData.filter(function(f) { return f.complainant === currentUserStr; }) : firData;
    
    var html = '';
    var displayFirs = [].concat(myFirs).reverse();
    displayFirs.forEach(function(f) {
      html += '<tr>' +
              '<td style="font-weight:500;color:var(--navy);">'+f.id+'</td>' +
              '<td>'+f.complainant+'</td>' +
              '<td>'+f.type+'</td>' +
              '<td>'+f.dateStr+'</td>' +
              '<td>'+f.officer+'</td>' +
              '<td><span class="badge '+f.badge+'">'+f.status+'</span></td>' +
              '<td><button class="btn btn-secondary btn-sm" onclick="showScreen(\'fir-detail\',null)">View</button></td>' +
              '</tr>';
    });
    tbody.innerHTML = html;
  }

  function renderNotifications() {
    var container = document.getElementById('notifications-list');
    if(!container) return;

    container.innerHTML = '';
    if (notificationsData.length === 0) {
      container.innerHTML = '<div style="font-size:12px;color:var(--text-muted);text-align:center;padding:20px;">No new notifications</div>';
      return;
    }

    var html = '';
    var lat = [].concat(notificationsData);
    lat.forEach(function(n) {
      html += '<div class="notif"><div class="notif-icon">⚠</div><div><div class="notif-text">'+n.text+'</div><div class="notif-time">'+n.time+'</div></div></div>';
    });
    container.innerHTML = html;
  }

  var currentCourtFir = null;

  function searchCourtFir() {
    var query = document.getElementById('court-search-fir').value.trim();
    var detailBox = document.getElementById('court-fir-details');
    if(!query) {
      alert("Please enter FIR No.");
      return;
    }
    
    var found = firData.find(function(f) { return f.id === query; });
    if(found) {
      currentCourtFir = found;
      detailBox.style.display = 'block';
      detailBox.innerHTML = 
        '<strong>Complainant:</strong> ' + found.complainant + '<br>' +
        '<strong>Type:</strong> ' + found.type + '<br>' +
        '<strong>Date:</strong> ' + found.dateStr + '<br>' +
        '<strong>Current Status:</strong> ' + found.status + '<br>' + 
        '<strong>Officer:</strong> ' + found.officer;
    } else {
      currentCourtFir = null;
      detailBox.style.display = 'block';
      detailBox.innerHTML = '<span style="color:var(--red);">FIR ' + query + ' not found in database.</span>';
    }
  }

  function submitCourtUpdate() {
    if (!currentCourtFir) {
      alert("Please search and select a valid FIR first.");
      return;
    }
    
    var date = document.getElementById('court-update-date').value;
    var purpose = document.getElementById('court-update-purpose').value;
    var notes = document.getElementById('court-update-notes').value;

    if (!date) {
      alert("Please select a hearing date.");
      return;
    }

    currentCourtFir.status = "In Court";
    currentCourtFir.badge = "badge-blue";

    var dObj = new Date(date);
    var formattedDate = dObj.getDate() + ' ' + dObj.toLocaleString('default', { month: 'short' }) + ' ' + dObj.getFullYear();

    var notifText = "Court hearing scheduled for FIR " + currentCourtFir.id + ". Date: <strong>" + formattedDate + "</strong> for " + purpose + ". " + (notes ? "Notes: " + notes : "");
    notificationsData.push({ text: notifText, time: "Just now" });

    alert("FIR " + currentCourtFir.id + " updated successfully!");

    // Clear inputs
    document.getElementById('court-search-fir').value = '';
    document.getElementById('court-fir-details').style.display = 'none';
    document.getElementById('court-update-date').value = '';
    document.getElementById('court-update-notes').value = '';
    
    currentCourtFir = null;
    renderApp();
  }

  function toggleRegister(view) {
    if (view === 'register') {
      document.getElementById('login-body-main').style.display = 'none';
      document.getElementById('register-body-main').style.display = 'block';
      document.getElementById('reg-step-1').style.display = 'block';
      document.getElementById('reg-step-2').style.display = 'none';
      document.getElementById('reg-step-3').style.display = 'none';
      document.getElementById('reg-login-link').style.display = 'block';
      document.getElementById('reg-phone').value = '';
      document.getElementById('reg-name').value = '';
      document.getElementById('reg-pass').value = '';
      document.getElementById('reg-otp').value = '';
    } else {
      document.getElementById('login-body-main').style.display = 'block';
      document.getElementById('register-body-main').style.display = 'none';
    }
  }

  function sendOTP() {
    var phone = document.getElementById('reg-phone').value;
    var name = document.getElementById('reg-name').value;
    var pass = document.getElementById('reg-pass').value;
    if (!name || phone.length < 10 || !pass) {
      alert("Please enter valid name, phone number, and password");
      return;
    }
    document.getElementById('reg-step-1').style.display = 'none';
    document.getElementById('reg-step-2').style.display = 'block';
    document.getElementById('otp-phone-display').innerText = phone;
  }

  function verifyOTP() {
    var otp = document.getElementById('reg-otp').value;
    var phone = document.getElementById('reg-phone').value;
    var name = document.getElementById('reg-name').value;
    var pass = document.getElementById('reg-pass').value;
    var role = document.getElementById('reg-role').value;

    if (otp.length < 4) {
      alert("Please enter valid OTP");
      return;
    }

    registeredUsers[phone] = { password: pass, name: name, role: role };

    document.getElementById('reg-step-2').style.display = 'none';
    document.getElementById('reg-step-3').style.display = 'block';
    document.getElementById('reg-login-link').style.display = 'none';
    
    document.getElementById('login-user').value = phone;
    document.getElementById('login-pass').value = pass;
    selectRole(role);
  }

  selectRole('admin');
