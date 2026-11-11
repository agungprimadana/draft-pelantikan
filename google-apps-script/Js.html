/**
 * Client-side JavaScript untuk Vercel & Google Apps Script Web UI
 */
var DEFAULT_GAS_URL = 'TEMPEL_URL_EXEC_APPS_SCRIPT_ANDA_DI_SINI';

var DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80';
var currentSummary = null;
var currentSpreadsheetId = null;
var bulkParsedRows = [];
var ttdBulkParsedRows = [];

function getGasUrl() {
  var savedUrl = localStorage.getItem('CUSTOM_GAS_API_URL');
  if (savedUrl && savedUrl.startsWith('https://')) return savedUrl;
  if (DEFAULT_GAS_URL && DEFAULT_GAS_URL.startsWith('https://')) return DEFAULT_GAS_URL;
  return '';
}

function isGasEnvironment() {
  return (typeof google !== 'undefined' && google.script && google.script.run);
}

// Helper universal untuk memanggil backend Apps Script (baik di dalam GAS maupun dari Vercel)
function callBackend(action, params, onSuccess, onFailure) {
  if (isGasEnvironment()) {
    var runner = google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure || function(err) { showAlert('Error Server', err.message, 'error'); });

    if (action === 'getSummary') runner.getSheetSummary(params.spreadsheetId);
    else if (action === 'saveDefaultSpreadsheetId') runner.saveDefaultSpreadsheetId(params.id);
    else if (action === 'addWisudawanData') runner.addWisudawanData(params.payload, params.spreadsheetId);
    else if (action === 'bulkAddWisudawanData') runner.bulkAddWisudawanData(params.payload, params.spreadsheetId);
    else if (action === 'deleteWisudawanRow') runner.deleteWisudawanRow(params.rowIndex, params.spreadsheetId);
    else if (action === 'saveTtdData') runner.saveTtdData(params.payload, params.spreadsheetId);
    else if (action === 'bulkAddTtdData') runner.bulkAddTtdData(params.payload, params.spreadsheetId);
    else if (action === 'deleteTtdRow') runner.deleteTtdRow(params.rowIndex, params.spreadsheetId);
    else if (action === 'generatePresentation') runner.generatePresentation(params.payload);
    return;
  }

  var gasUrl = getGasUrl();
  if (!gasUrl) {
    setLoadingState(false);
    document.getElementById('spreadsheetConfigBox').classList.remove('hidden');
    showAlert('URL Apps Script Belum Diatur', 'Masukkan URL Web App Google Apps Script (/exec) dan ID Spreadsheet Anda pada kolom di bawah.', 'info');
    return;
  }

  if (action === 'getSummary') {
    var fetchUrl = gasUrl + '?action=getSummary&spreadsheetId=' + encodeURIComponent(params.spreadsheetId || '');
    fetch(fetchUrl)
      .then(function(r) { return r.json(); })
      .then(onSuccess)
      .catch(function(err) {
        if (onFailure) onFailure(err);
        else showAlert('Koneksi API Gagal', 'Pastikan akses Web App Apps Script diatur ke "Anyone" (Siapa saja). Detail: ' + err.message, 'error');
      });
  } else {
    var postBody = Object.assign({ action: action }, params);
    fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(postBody)
    })
      .then(function(r) { return r.json(); })
      .then(onSuccess)
      .catch(function(err) {
        if (onFailure) onFailure(err);
        else showAlert('Koneksi API Gagal', err.message, 'error');
      });
  }
}

window.addEventListener('DOMContentLoaded', function() {
  var urlParams = new URLSearchParams(window.location.search);
  var urlId = urlParams.get('id');
  if (urlId) {
    currentSpreadsheetId = urlId;
  } else {
    var savedSheetId = localStorage.getItem('SAVED_SPREADSHEET_ID');
    if (savedSheetId) currentSpreadsheetId = savedSheetId;
  }

  var savedBannerUrl = localStorage.getItem('CUSTOM_HERO_BANNER_URL');
  if (savedBannerUrl) {
    document.getElementById('inputBannerUrl').value = savedBannerUrl;
    applyHeroBannerStyle(savedBannerUrl);
  }

  var gasInput = document.getElementById('inputGasUrl');
  if (gasInput && getGasUrl()) {
    gasInput.value = getGasUrl();
  }

  loadSummary();
});

function updateHeroBannerPreview(imageUrl) {
  imageUrl = (imageUrl || '').trim();
  if (imageUrl) {
    localStorage.setItem('CUSTOM_HERO_BANNER_URL', imageUrl);
    applyHeroBannerStyle(imageUrl);
    showAlert('Gambar Banner Diperbarui', 'Latar belakang header berhasil diganti.', 'success');
  } else {
    resetHeroBannerImage();
  }
}

function applyHeroBannerStyle(url) {
  var heroEl = document.getElementById('heroBannerElement');
  if (heroEl) {
    heroEl.style.backgroundImage = "linear-gradient(135deg, rgba(13, 15, 29, 0.88) 0%, rgba(20, 23, 40, 0.75) 50%, rgba(13, 15, 29, 0.92) 100%), url('" + url + "')";
    heroEl.style.backgroundPosition = "center";
    heroEl.style.backgroundSize = "cover";
  }
}

function resetHeroBannerImage() {
  localStorage.removeItem('CUSTOM_HERO_BANNER_URL');
  document.getElementById('inputBannerUrl').value = '';
  applyHeroBannerStyle(DEFAULT_HERO_IMAGE);
  showAlert('Banner Di-reset', 'Gambar latar belakang header dikembalikan ke default.', 'info');
}

function onDatePickerChange(dateVal) {
  if (!dateVal) return;
  var parts = dateVal.split('-');
  if (parts.length === 3) {
    var year = parts[0];
    var monthIdx = parseInt(parts[1], 10) - 1;
    var day = parseInt(parts[2], 10);
    var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    document.getElementById('inputTanggalCover').value = day + ' ' + (monthNames[monthIdx] || '') + ' ' + year;
  }
}

function switchTab(tabName) {
  var viewDashboard = document.getElementById('viewDashboard');
  var viewBiodata = document.getElementById('viewBiodata');
  var viewTtd = document.getElementById('viewTtd');

  var btnDashboard = document.getElementById('tabBtnDashboard');
  var btnBiodata = document.getElementById('tabBtnBiodata');
  var btnTtd = document.getElementById('tabBtnTtd');

  viewDashboard.classList.add('hidden');
  viewBiodata.classList.add('hidden');
  viewTtd.classList.add('hidden');

  btnDashboard.classList.remove('active');
  btnBiodata.classList.remove('active');
  btnTtd.classList.remove('active');

  if (tabName === 'biodata') {
    viewBiodata.classList.remove('hidden');
    btnBiodata.classList.add('active');
  } else if (tabName === 'ttd') {
    viewTtd.classList.remove('hidden');
    btnTtd.classList.add('active');
  } else {
    viewDashboard.classList.remove('hidden');
    btnDashboard.classList.add('active');
  }
}

function switchBioSubMode(mode) {
  var boxSingle = document.getElementById('boxBioSingle');
  var boxBulk = document.getElementById('boxBioBulk');
  var btnSingle = document.getElementById('btnSubModeSingle');
  var btnBulk = document.getElementById('btnSubModeBulk');

  if (mode === 'bulk') {
    boxSingle.classList.add('hidden');
    boxBulk.classList.remove('hidden');
    btnBulk.classList.add('bg-emerald-600', 'text-white', 'shadow');
    btnBulk.classList.remove('text-slate-400');
    btnSingle.classList.remove('bg-emerald-600', 'text-white', 'shadow');
    btnSingle.classList.add('text-slate-400');
  } else {
    boxSingle.classList.remove('hidden');
    boxBulk.classList.add('hidden');
    btnSingle.classList.add('bg-emerald-600', 'text-white', 'shadow');
    btnSingle.classList.remove('text-slate-400');
    btnBulk.classList.remove('bg-emerald-600', 'text-white', 'shadow');
    btnBulk.classList.add('text-slate-400');
  }
}

function switchTtdSubMode(mode) {
  var boxSingle = document.getElementById('boxTtdSingle');
  var boxBulk = document.getElementById('boxTtdBulk');
  var btnSingle = document.getElementById('btnSubModeTtdSingle');
  var btnBulk = document.getElementById('btnSubModeTtdBulk');

  if (mode === 'bulk') {
    boxSingle.classList.add('hidden');
    boxBulk.classList.remove('hidden');
    btnBulk.classList.add('bg-amber-600', 'text-white', 'shadow');
    btnBulk.classList.remove('text-slate-400');
    btnSingle.classList.remove('bg-amber-600', 'text-white', 'shadow');
    btnSingle.classList.add('text-slate-400');
  } else {
    boxSingle.classList.remove('hidden');
    boxBulk.classList.add('hidden');
    btnSingle.classList.add('bg-amber-600', 'text-white', 'shadow');
    btnSingle.classList.remove('text-slate-400');
    btnBulk.classList.remove('bg-amber-600', 'text-white', 'shadow');
    btnBulk.classList.add('text-slate-400');
  }
}

function toggleTtdInputs() {
  var layout = parseInt(document.getElementById('ttdLayout').value, 10) || 1;
  var box2 = document.getElementById('boxTtd2');
  var box3 = document.getElementById('boxTtd3');
  var input2 = document.getElementById('ttdNama2');
  var input3 = document.getElementById('ttdNama3');

  if (layout === 1) {
    box2.classList.add('hidden');
    box3.classList.add('hidden');
    input2.required = false;
    input3.required = false;
  } else if (layout === 2) {
    box2.classList.remove('hidden');
    box3.classList.add('hidden');
    input2.required = true;
    input3.required = false;
  } else if (layout === 3) {
    box2.classList.remove('hidden');
    box3.classList.remove('hidden');
    input2.required = true;
    input3.required = true;
  }
}

function loadSummary() {
  setLoadingState(true);
  hideAlert();
  callBackend('getSummary', { spreadsheetId: currentSpreadsheetId }, handleSummarySuccess, handleSummaryFailure);
}

function handleSummarySuccess(response) {
  setLoadingState(false);

  if (response && response.needSpreadsheetId) {
    document.getElementById('spreadsheetConfigBox').classList.remove('hidden');
    showAlert('Koneksi Diperlukan', 'Masukkan ID atau Tautan Google Spreadsheet data wisudawan Anda.', 'info');
    return;
  }

  if (!response || !response.success) {
    showAlert('Gagal Membaca Sheet', (response && response.error) || 'Terjadi kesalahan saat memuat data.', 'error');
    return;
  }

  currentSummary = response;
  currentSpreadsheetId = response.spreadsheetId;
  localStorage.setItem('SAVED_SPREADSHEET_ID', currentSpreadsheetId);

  document.getElementById('spreadsheetConfigBox').classList.add('hidden');
  var sheetBar = document.getElementById('sheetConnectedBar');
  var sheetTitle = document.getElementById('sheetConnectedTitle');
  if (sheetBar && sheetTitle) {
    sheetTitle.textContent = (response.spreadsheetName || 'Spreadsheet Terhubung') + ' (' + response.spreadsheetId + ')';
    sheetBar.classList.remove('hidden');
  }

  updateUIWithSummary(response);
}

function handleSummaryFailure(err) {
  setLoadingState(false);
  showAlert('Koneksi Error', err.message || 'Gagal menghubungi server Apps Script.', 'error');
}

function applySpreadsheetId() {
  var gasInputEl = document.getElementById('inputGasUrl');
  if (gasInputEl && gasInputEl.value.trim()) {
    localStorage.setItem('CUSTOM_GAS_API_URL', gasInputEl.value.trim());
  }

  var rawInput = document.getElementById('inputSpreadsheetId').value.trim();
  if (!rawInput && !getGasUrl()) {
    showAlert('Perhatian', 'Silakan masukkan URL Apps Script (/exec) dan/atau ID Google Sheet.', 'error');
    return;
  }

  if (rawInput) {
    var idMatch = rawInput.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    var extractedId = idMatch ? idMatch[1] : rawInput;
    currentSpreadsheetId = extractedId;
    localStorage.setItem('SAVED_SPREADSHEET_ID', extractedId);
    callBackend('saveDefaultSpreadsheetId', { id: extractedId }, function() {});
  }

  loadSummary();
}

function changeSpreadsheetPrompt() {
  document.getElementById('spreadsheetConfigBox').classList.remove('hidden');
  document.getElementById('sheetConnectedBar').classList.add('hidden');
}

function updateUIWithSummary(data) {
  document.getElementById('statWisudawan').textContent = data.totalWisudawan || 0;
  document.getElementById('statProdi').textContent = (data.configuredProdis ? data.configuredProdis.length : 0);
  document.getElementById('statTtd').textContent = data.ttdCount || 0;

  if (data.settings && data.settings.tanggalCover) {
    var inputTgl = document.getElementById('inputTanggalCover');
    if (!inputTgl.value) inputTgl.value = data.settings.tanggalCover;
  }

  var container = document.getElementById('prodiListContainer');
  var badgeProdi = document.getElementById('badgeProdiCount');
  container.innerHTML = '';

  if (!data.ttdList || data.ttdList.length === 0) {
    container.innerHTML = '<div class="text-xs text-amber-400 py-3.5 text-center bg-amber-500/10 rounded-xl border border-amber-500/20 font-medium">Belum ada TTD prodi di tab "TTD". Buka tab <strong>Pemanggilan TTD</strong> untuk mengisi.</div>';
    badgeProdi.textContent = '0 Prodi';
    document.getElementById('btnGenerate').disabled = true;
  } else {
    badgeProdi.textContent = data.ttdList.length + ' Prodi TTD';
    document.getElementById('btnGenerate').disabled = false;

    data.ttdList.forEach(function(item, idx) {
      var prodiRow = document.createElement('div');
      prodiRow.className = 'flex items-center justify-between p-3 rounded-xl bg-[#0a0c16] border border-indigo-900/30 hover:border-indigo-500/40 transition-all';
      var layoutBadge = '<span class="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md font-mono font-bold">Layout ' + item.layout + ' (' + item.layout + ' Slot)</span>';

      prodiRow.innerHTML = 
        '<div class="flex items-center space-x-3 truncate mr-2">' +
          '<span class="w-6 h-6 rounded-lg bg-[#141728] text-[11px] font-mono font-bold text-indigo-400 flex items-center justify-center flex-shrink-0 border border-indigo-900/30">' + (idx + 1) + '</span>' +
          '<div class="truncate">' +
            '<div class="text-xs font-bold text-slate-100 truncate">' + escapeHtml(item.prodi) + '</div>' +
            '<div class="text-[10px] text-slate-500 mt-0.5">' + layoutBadge + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="flex-shrink-0">' +
          '<span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">Aktif</span>' +
        '</div>';
      container.appendChild(prodiRow);
    });
  }

  renderWisudawanTable(data.wisudawanList || []);
  renderTtdTable(data.ttdList || []);
}

function renderWisudawanTable(list) {
  var tbody = document.getElementById('tableWisudawanBody');
  var badgeTotal = document.getElementById('badgeWisTotal');
  badgeTotal.textContent = list.length + ' Dokter';
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-6 text-amber-400/80 italic font-medium">Belum ada data wisudawan. Isi form di atas atau impor file Excel.</td></tr>';
    return;
  }

  list.forEach(function(item, idx) {
    var tr = document.createElement('tr');
    tr.className = 'hover:bg-indigo-950/20 transition-all';
    tr.innerHTML = 
      '<td class="px-3.5 py-3 text-center font-mono text-slate-500 font-medium">' + (idx + 1) + '</td>' +
      '<td class="px-3.5 py-3 text-emerald-300 font-semibold">' + escapeHtml(item.nama) + '</td>' +
      '<td class="px-3.5 py-3 text-slate-300">' + escapeHtml(item.ttl || '-') + '</td>' +
      '<td class="px-3.5 py-3 text-slate-400">' + escapeHtml(item.namaAyah || '-') + '</td>' +
      '<td class="px-3.5 py-3 text-slate-400">' + escapeHtml(item.namaIbu || '-') + '</td>' +
      '<td class="px-3.5 py-3 text-center">' +
        '<button onclick="deleteWisudawan(' + item.rowIndex + ')" class="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all border border-rose-500/20" title="Hapus Wisudawan">' +
          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>' +
        '</button>' +
      '</td>';
    tbody.appendChild(tr);
  });
}

function renderTtdTable(list) {
  var tbody = document.getElementById('tableTtdBody');
  var badgeTotal = document.getElementById('badgeTtdTotal');
  badgeTotal.textContent = list.length + ' TTD Prodi';
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-6 text-amber-400/80 italic font-medium">Belum ada konfigurasi TTD. Gunakan form di atas untuk menyimpan.</td></tr>';
    return;
  }

  list.forEach(function(item, idx) {
    var tr = document.createElement('tr');
    tr.className = 'hover:bg-indigo-950/20 transition-all';
    var layoutBadge = '<span class="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Layout ' + item.layout + ' (' + item.layout + ' Slot)</span>';
    var namesFormatted = escapeHtml(item.namaTtd).replace(/\n/g, '<br>');

    tr.innerHTML = 
      '<td class="px-3.5 py-3 text-center font-mono text-slate-500 font-medium">' + (idx + 1) + '</td>' +
      '<td class="px-3.5 py-3 font-bold text-white">' + escapeHtml(item.prodi) + '</td>' +
      '<td class="px-3.5 py-3">' + layoutBadge + '</td>' +
      '<td class="px-3.5 py-3 text-amber-300 font-mono text-[11px] leading-relaxed">' + namesFormatted + '</td>' +
      '<td class="px-3.5 py-3 text-center">' +
        '<button onclick="deleteTtd(' + item.rowIndex + ')" class="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all border border-rose-500/20" title="Hapus TTD">' +
          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>' +
        '</button>' +
      '</td>';
    tbody.appendChild(tr);
  });
}

function submitWisudawan(e) {
  e.preventDefault();
  var nama = document.getElementById('bioNama').value.trim();
  var ttl = document.getElementById('bioTtl').value.trim();
  var ayah = document.getElementById('bioAyah').value.trim();
  var ibu = document.getElementById('bioIbu').value.trim();

  if (!nama) {
    showAlert('Perhatian', 'Nama Dokter wajib diisi.', 'error');
    return;
  }

  var btn = document.getElementById('btnSaveBio');
  btn.disabled = true;

  callBackend('addWisudawanData', {
    payload: { nama: nama, ttl: ttl, namaAyah: ayah, namaIbu: ibu },
    spreadsheetId: currentSpreadsheetId
  }, function(res) {
    btn.disabled = false;
    if (res && res.success) {
      document.getElementById('bioNama').value = '';
      document.getElementById('bioTtl').value = '';
      document.getElementById('bioAyah').value = '';
      document.getElementById('bioIbu').value = '';
      showAlert('Sukses', res.message, 'success');
      loadSummary();
    } else {
      showAlert('Gagal Menyimpan', (res && res.error) || 'Terjadi kesalahan.', 'error');
    }
  }, function(err) {
    btn.disabled = false;
    showAlert('Error Server', err.message, 'error');
  });
}

function handleExcelFileUpload(evt) {
  var file = evt.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      bulkParsedRows = [];
      if (!jsonData || jsonData.length === 0) {
        showAlert('File Kosong', 'File Excel yang diunggah tidak memiliki baris data.', 'error');
        return;
      }

      var startIdx = 0;
      var firstRow = jsonData[0];
      if (firstRow && firstRow.length > 0) {
        var col0 = String(firstRow[0] || '').toLowerCase();
        if (col0.indexOf('nama') !== -1 || col0.indexOf('prodi') !== -1) startIdx = 1;
      }

      for (var i = startIdx; i < jsonData.length; i++) {
        var row = jsonData[i];
        if (row && row.length > 0) {
          var c0 = String(row[0] || '').trim();
          var c1 = String(row[1] || '').trim();
          var c2 = String(row[2] || '').trim();
          var c3 = String(row[3] || '').trim();
          var c4 = String(row[4] || '').trim();

          if (c0 && (c0.indexOf('Sp.') !== -1 || c0.indexOf('Anestesi') !== -1 || c0.indexOf('Ilmu') !== -1) && c1) {
            bulkParsedRows.push({ nama: c1, ttl: c2, namaAyah: c3, namaIbu: c4 });
          } else if (c0) {
            bulkParsedRows.push({ nama: c0, ttl: c1, namaAyah: c2, namaIbu: c3 });
          }
        }
      }
      renderBulkPreview();
    } catch (err) {
      showAlert('Gagal Membaca File', 'Pastikan format .xlsx / .csv valid.', 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

function parseBulkText() {
  var raw = document.getElementById('txtBulkInput').value.trim();
  if (!raw) {
    showAlert('Perhatian', 'Area teks Bulk Paste masih kosong.', 'error');
    return;
  }

  var lines = raw.split(/\r?\n/);
  bulkParsedRows = [];

  lines.forEach(function(line) {
    if (!line.trim()) return;
    var parts = line.split(/\t|\||,/);
    if (parts && parts.length > 0) {
      var p0 = parts[0] ? parts[0].trim() : '';
      var p1 = parts[1] ? parts[1].trim() : '';
      var p2 = parts[2] ? parts[2].trim() : '';
      var p3 = parts[3] ? parts[3].trim() : '';
      var p4 = parts[4] ? parts[4].trim() : '';

      if (parts.length >= 5 && (p0.indexOf('Sp.') !== -1 || p0.indexOf('Anestesi') !== -1)) {
        if (p1 && p1.toLowerCase() !== 'nama') bulkParsedRows.push({ nama: p1, ttl: p2, namaAyah: p3, namaIbu: p4 });
      } else {
        if (p0 && p0.toLowerCase() !== 'nama' && p0.toLowerCase() !== 'nama dokter') bulkParsedRows.push({ nama: p0, ttl: p1, namaAyah: p2, namaIbu: p3 });
      }
    }
  });
  renderBulkPreview();
}

function renderBulkPreview() {
  var box = document.getElementById('bulkPreviewBox');
  var lblCount = document.getElementById('lblBulkCount');
  var container = document.getElementById('bulkPreviewTable');

  lblCount.textContent = bulkParsedRows.length;
  container.innerHTML = '';

  if (bulkParsedRows.length === 0) {
    box.classList.add('hidden');
    showAlert('Impor Kosong', 'Tidak ada baris data wisudawan valid yang terdeteksi.', 'error');
    return;
  }

  bulkParsedRows.forEach(function(r, idx) {
    var div = document.createElement('div');
    div.className = 'p-2 rounded-lg bg-[#0a0c16] border border-indigo-900/30 flex justify-between items-center';
    div.innerHTML = 
      '<span>' + (idx + 1) + '. <strong class="text-white">' + escapeHtml(r.nama) + '</strong> | TTL: ' + escapeHtml(r.ttl || '-') + ' | Ayah: ' + escapeHtml(r.namaAyah || '-') + ' | Ibu: ' + escapeHtml(r.namaIbu || '-') + '</span>' +
      '<span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">Wisudawan</span>';
    container.appendChild(div);
  });
  box.classList.remove('hidden');
}

function executeBulkImport() {
  if (bulkParsedRows.length === 0) parseBulkText();
  if (bulkParsedRows.length === 0) {
    showAlert('Perhatian', 'Belum ada data yang siap diimpor.', 'error');
    return;
  }

  var btn = document.getElementById('btnSaveBulk');
  btn.disabled = true;

  callBackend('bulkAddWisudawanData', {
    payload: { rows: bulkParsedRows },
    spreadsheetId: currentSpreadsheetId
  }, function(res) {
    btn.disabled = false;
    if (res && res.success) {
      bulkParsedRows = [];
      document.getElementById('txtBulkInput').value = '';
      document.getElementById('inputFileExcel').value = '';
      document.getElementById('bulkPreviewBox').classList.add('hidden');
      showAlert('Sukses Impor', res.message, 'success');
      loadSummary();
    } else {
      showAlert('Gagal Impor', (res && res.error) || 'Terjadi kesalahan.', 'error');
    }
  }, function(err) {
    btn.disabled = false;
    showAlert('Error Server', err.message, 'error');
  });
}

function deleteWisudawan(rowIndex) {
  if (!confirm('Apakah Anda yakin ingin menghapus data wisudawan baris ke-' + rowIndex + '?')) return;
  callBackend('deleteWisudawanRow', { rowIndex: rowIndex, spreadsheetId: currentSpreadsheetId }, function(res) {
    if (res && res.success) {
      showAlert('Sukses', res.message, 'success');
      loadSummary();
    } else {
      showAlert('Gagal Hapus', (res && res.error) || 'Gagal menghapus baris.', 'error');
    }
  });
}

function submitTtd(e) {
  e.preventDefault();
  var prodi = document.getElementById('ttdProdi').value.trim();
  var layout = parseInt(document.getElementById('ttdLayout').value, 10) || 1;
  var nama1 = document.getElementById('ttdNama1').value.trim();
  var nama2 = document.getElementById('ttdNama2').value.trim();
  var nama3 = document.getElementById('ttdNama3').value.trim();

  if (!prodi || !nama1) {
    showAlert('Perhatian', 'Nama Prodi dan Nama TTD 1 wajib diisi.', 'error');
    return;
  }

  var btn = document.getElementById('btnSaveTtd');
  btn.disabled = true;

  callBackend('saveTtdData', {
    payload: { prodi: prodi, layout: layout, namaTtd1: nama1, namaTtd2: nama2, namaTtd3: nama3 },
    spreadsheetId: currentSpreadsheetId
  }, function(res) {
    btn.disabled = false;
    if (res && res.success) {
      document.getElementById('formSaveTtd').reset();
      showAlert('Sukses', res.message, 'success');
      loadSummary();
    } else {
      showAlert('Gagal Menyimpan', (res && res.error) || 'Terjadi kesalahan.', 'error');
    }
  }, function(err) {
    btn.disabled = false;
    showAlert('Error Server', err.message, 'error');
  });
}

function handleTtdExcelFileUpload(evt) {
  var file = evt.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      ttdBulkParsedRows = [];
      if (!jsonData || jsonData.length === 0) {
        showAlert('File Kosong', 'File Excel TTD tidak memiliki data.', 'error');
        return;
      }

      var startIdx = 0;
      var firstRow = jsonData[0];
      if (firstRow && firstRow.length > 0) {
        var col0 = String(firstRow[0] || '').toLowerCase();
        if (col0.indexOf('prodi') !== -1 || col0.indexOf('program') !== -1 || col0.indexOf('layout') !== -1) startIdx = 1;
      }

      for (var i = startIdx; i < jsonData.length; i++) {
        var row = jsonData[i];
        if (row && row.length > 0) {
          var prodi = String(row[0] || '').trim();
          var layoutRaw = parseInt(row[1], 10);
          var layout = (layoutRaw === 2 || layoutRaw === 3) ? layoutRaw : 1;
          var ttd1 = String(row[2] || '').trim();
          var ttd2 = String(row[3] || '').trim();
          var ttd3 = String(row[4] || '').trim();

          if (prodi && (ttd1 || ttd2 || ttd3)) {
            ttdBulkParsedRows.push({ prodi: prodi, layout: layout, namaTtd1: ttd1, namaTtd2: ttd2, namaTtd3: ttd3 });
          }
        }
      }
      renderTtdBulkPreview();
    } catch (err) {
      showAlert('Gagal Membaca File TTD', 'Pastikan format 5 kolom valid.', 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

function parseTtdBulkText() {
  var raw = document.getElementById('txtTtdBulkInput').value.trim();
  if (!raw) {
    showAlert('Perhatian', 'Area teks Bulk Paste TTD masih kosong.', 'error');
    return;
  }

  var lines = raw.split(/\r?\n/);
  ttdBulkParsedRows = [];

  lines.forEach(function(line) {
    if (!line.trim()) return;
    var parts = line.split(/\t|\||,/);
    if (parts && parts.length > 0) {
      var prodi = parts[0] ? parts[0].trim() : '';
      var layoutRaw = parts[1] ? parseInt(parts[1].trim(), 10) : 1;
      var layout = (layoutRaw === 2 || layoutRaw === 3) ? layoutRaw : 1;
      var ttd1 = parts[2] ? parts[2].trim() : '';
      var ttd2 = parts[3] ? parts[3].trim() : '';
      var ttd3 = parts[4] ? parts[4].trim() : '';

      if (prodi && prodi.toLowerCase() !== 'prodi' && prodi.toLowerCase() !== 'program studi' && (ttd1 || ttd2 || ttd3)) {
        ttdBulkParsedRows.push({ prodi: prodi, layout: layout, namaTtd1: ttd1, namaTtd2: ttd2, namaTtd3: ttd3 });
      }
    }
  });
  renderTtdBulkPreview();
}

function renderTtdBulkPreview() {
  var box = document.getElementById('ttdBulkPreviewBox');
  var lblCount = document.getElementById('lblTtdBulkCount');
  var container = document.getElementById('ttdBulkPreviewTable');

  lblCount.textContent = ttdBulkParsedRows.length;
  container.innerHTML = '';

  if (ttdBulkParsedRows.length === 0) {
    box.classList.add('hidden');
    showAlert('Impor TTD Kosong', 'Tidak ada baris data TTD prodi valid yang terdeteksi.', 'error');
    return;
  }

  ttdBulkParsedRows.forEach(function(r, idx) {
    var names = [r.namaTtd1, r.namaTtd2, r.namaTtd3].filter(Boolean).join(' | ');
    var div = document.createElement('div');
    div.className = 'p-2 rounded-lg bg-[#0a0c16] border border-indigo-900/30 flex justify-between items-center';
    div.innerHTML = 
      '<span>' + (idx + 1) + '. <strong class="text-white">' + escapeHtml(r.prodi) + '</strong> | Layout ' + r.layout + ' (' + r.layout + ' Foto) | TTD: ' + escapeHtml(names) + '</span>' +
      '<span class="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono font-bold">Layout ' + r.layout + '</span>';
    container.appendChild(div);
  });
  box.classList.remove('hidden');
}

function executeTtdBulkImport() {
  if (ttdBulkParsedRows.length === 0) parseTtdBulkText();
  if (ttdBulkParsedRows.length === 0) {
    showAlert('Perhatian', 'Belum ada data TTD yang siap diimpor.', 'error');
    return;
  }

  var btn = document.getElementById('btnSaveTtdBulk');
  btn.disabled = true;

  callBackend('bulkAddTtdData', {
    payload: { rows: ttdBulkParsedRows },
    spreadsheetId: currentSpreadsheetId
  }, function(res) {
    btn.disabled = false;
    if (res && res.success) {
      ttdBulkParsedRows = [];
      document.getElementById('txtTtdBulkInput').value = '';
      document.getElementById('inputFileExcelTtd').value = '';
      document.getElementById('ttdBulkPreviewBox').classList.add('hidden');
      showAlert('Sukses Impor TTD', res.message, 'success');
      loadSummary();
    } else {
      showAlert('Gagal Impor TTD', (res && res.error) || 'Terjadi kesalahan.', 'error');
    }
  }, function(err) {
    btn.disabled = false;
    showAlert('Error Server', err.message, 'error');
  });
}

function deleteTtd(rowIndex) {
  if (!confirm('Apakah Anda yakin ingin menghapus konfigurasi TTD baris ke-' + rowIndex + '?')) return;
  callBackend('deleteTtdRow', { rowIndex: rowIndex, spreadsheetId: currentSpreadsheetId }, function(res) {
    if (res && res.success) {
      showAlert('Sukses', res.message, 'success');
      loadSummary();
    } else {
      showAlert('Gagal Hapus', (res && res.error) || 'Gagal menghapus baris.', 'error');
    }
  });
}

function startGeneration() {
  var tanggalCover = document.getElementById('inputTanggalCover').value.trim();
  var templateId = document.getElementById('inputTemplateId').value.trim();

  if (!templateId) {
    showAlert('Perhatian', 'ID Template Google Slides wajib diisi.', 'error');
    return;
  }

  var btn = document.getElementById('btnGenerate');
  var btnText = document.getElementById('btnText');
  var iconBtn = document.getElementById('iconBtn');
  var progressBox = document.getElementById('progressBox');
  var resultBox = document.getElementById('resultBox');

  btn.disabled = true;
  btnText.textContent = 'Membuat Slide...';
  iconBtn.classList.add('animate-spin-custom');
  progressBox.classList.remove('hidden');
  resultBox.classList.add('hidden');
  hideAlert();

  callBackend('generatePresentation', {
    payload: { tanggalCover: tanggalCover, templateId: templateId, spreadsheetId: currentSpreadsheetId }
  }, function(res) {
    btn.disabled = false;
    btnText.textContent = 'Buat Presentasi Sekarang';
    iconBtn.classList.remove('animate-spin-custom');
    progressBox.classList.add('hidden');

    if (res && res.success) {
      showSuccessResult(res);
    } else {
      showAlert('Gagal Membuat Presentasi', (res && res.error) || 'Terjadi kesalahan sistem saat duplikasi slide.', 'error');
    }
  }, function(err) {
    btn.disabled = false;
    btnText.textContent = 'Buat Presentasi Sekarang';
    iconBtn.classList.remove('animate-spin-custom');
    progressBox.classList.add('hidden');
    showAlert('Kesalahan Server', err.message || 'Eksekusi gagal pada server Google Apps Script.', 'error');
  });
}

function showSuccessResult(res) {
  var resultBox = document.getElementById('resultBox');
  document.getElementById('resultMeta').textContent = 'Berhasil menghasilkan ' + res.totalSlidesGenerated + ' slide (' + res.totalWisudawan + ' wisudawan dari ' + res.totalProdi + ' prodi) tepat setelah Slide 17.';
  document.getElementById('resultUrlText').textContent = res.presentationUrl;
  document.getElementById('resultBtnOpen').href = res.presentationUrl;
  resultBox.classList.remove('hidden');
  resultBox.scrollIntoView({ behavior: 'smooth' });
}

function setLoadingState(loading) {
  var icon = document.getElementById('iconRefresh');
  if (loading) icon.classList.add('animate-spin-custom');
  else icon.classList.remove('animate-spin-custom');
}

function showAlert(title, msg, type) {
  var alert = document.getElementById('statusAlert');
  document.getElementById('statusTitle').textContent = title;
  document.getElementById('statusMessage').textContent = msg;

  alert.className = 'rounded-2xl p-4 border transition-all duration-300 flex items-start space-x-3 ';
  if (type === 'error') alert.className += 'bg-rose-950/20 border-rose-500/30 text-rose-200';
  else if (type === 'info') alert.className += 'bg-indigo-950/20 border-indigo-500/30 text-indigo-200';
  else alert.className += 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200';

  alert.classList.remove('hidden');
}

function hideAlert() {
  document.getElementById('statusAlert').classList.add('hidden');
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
