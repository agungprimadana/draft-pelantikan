/**
 * @file Code.gs
 * Generator Presentasi Pelantikan Dokter Spesialis Multi-Prodi FK UB
 * Mendukung Mode Web App Google Apps Script & External Frontend (Vercel)
 */

var CONFIG = {
  TEMPLATE_ID: '1dh-tTb1LlIoLGGwI_JA0Ev-iS5ZTyToHQEDuvXdYBWM',
  SHEET_TTD: 'TTD',
  SHEET_WISUDAWAN: 'Wisudawan',
  SHEET_PENGATURAN: 'PENGATURAN',
  MASTER_BIODATA_INDEX: 4,
  ANCHOR_TRANSITION_INDEX: 17,
  MASTER_TTD_INDEX_1: 18,
  MASTER_TTD_INDEX_2: 19,
  MASTER_TTD_INDEX_3: 20
};

/**
 * ENTRY POINT GET: Mendukung API JSON untuk Vercel (?action=getSummary) maupun UI GAS
 */
function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'getSummary') {
    var res = getSheetSummary(e.parameter.spreadsheetId || '');
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var template = HtmlService.createTemplateFromFile('Index');
  template.initialSpreadsheetId = (e && e.parameter && e.parameter.id) ? e.parameter.id : '';
  return template.evaluate()
    .setTitle('Generator Pelantikan Dokter Spesialis FK UB')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * ENTRY POINT POST: Menerima perintah aksi dari Vercel (Simpan, Hapus, Generate)
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;
    var spreadsheetId = body.spreadsheetId || '';
    var payload = body.payload || {};
    var result;

    switch (action) {
      case 'saveDefaultSpreadsheetId':
        result = saveDefaultSpreadsheetId(body.id);
        break;
      case 'addWisudawanData':
        result = addWisudawanData(payload, spreadsheetId);
        break;
      case 'bulkAddWisudawanData':
        result = bulkAddWisudawanData(payload, spreadsheetId);
        break;
      case 'deleteWisudawanRow':
        result = deleteWisudawanRow(body.rowIndex, spreadsheetId);
        break;
      case 'saveTtdData':
        result = saveTtdData(payload, spreadsheetId);
        break;
      case 'bulkAddTtdData':
        result = bulkAddTtdData(payload, spreadsheetId);
        break;
      case 'deleteTtdRow':
        result = deleteTtdRow(body.rowIndex, spreadsheetId);
        break;
      case 'generatePresentation':
        result = generatePresentation(payload);
        break;
      default:
        result = { success: false, error: 'Action tidak dikenali: ' + action };
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('🎓 Pelantikan Spesialis')
      .addItem('Buka Generator Presentasi (Sidebar)', 'showSidebar')
      .addItem('Buka Generator Presentasi (Modal Dialog)', 'showModalDialog')
      .addSeparator()
      .addItem('Setup Header Sheet Otomatis', 'setupTemplateSheets')
      .addToUi();
  } catch (err) {
    Logger.log('onOpen dijalankan di luar context UI spreadsheet: ' + err.message);
  }
}

function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Generator Pelantikan Dokter Spesialis FK UB')
    .setWidth(450);
  SpreadsheetApp.getUi().showSidebar(html);
}

function showModalDialog() {
  var html = HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setWidth(980)
    .setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, 'Generator Pelantikan Dokter Spesialis FK UB');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getTargetSpreadsheet(spreadsheetId) {
  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }
  try {
    var activeSs = SpreadsheetApp.getActiveSpreadsheet();
    if (activeSs) return activeSs;
  } catch (e) {}

  var savedId = PropertiesService.getScriptProperties().getProperty('DEFAULT_SPREADSHEET_ID');
  if (savedId) {
    try {
      return SpreadsheetApp.openById(savedId);
    } catch (e) {
      Logger.log('Gagal membuka spreadsheet dari Script Properties: ' + e.message);
    }
  }
  return null;
}

function saveDefaultSpreadsheetId(id) {
  if (id) {
    PropertiesService.getScriptProperties().setProperty('DEFAULT_SPREADSHEET_ID', id);
    return { success: true };
  }
  return { success: false, error: 'ID kosong' };
}

function setupTemplateSheets(spreadsheetId) {
  var ss = getTargetSpreadsheet(spreadsheetId);
  if (!ss) throw new Error('Spreadsheet tidak ditemukan.');

  var sheetPengaturan = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
  if (!sheetPengaturan) {
    sheetPengaturan = ss.insertSheet(CONFIG.SHEET_PENGATURAN);
    sheetPengaturan.appendRow(['PARAMETER', 'NILAI']);
    sheetPengaturan.appendRow(['TANGGAL_COVER', Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd MMMM yyyy')]);
    sheetPengaturan.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#2d3748').setFontColor('#ffffff');
  }

  var sheetTTD = ss.getSheetByName(CONFIG.SHEET_TTD);
  if (!sheetTTD) {
    sheetTTD = ss.insertSheet(CONFIG.SHEET_TTD);
    sheetTTD.appendRow(['PRODI', 'LAYOUT', 'NAMA TTD 1', 'NAMA TTD 2', 'NAMA TTD 3']);
    sheetTTD.appendRow(['Anestesiologi dan Terapi Intensif', 3, 'dr. Reza Ariestyawan Ramadhan, Sp.An-TI', 'dr. Sahala Trident Sitorus, Sp.An-TI', 'dr. Veva Wulandari, Sp.An-TI']);
    sheetTTD.appendRow(['Ilmu Kesehatan Anak', 2, 'dr. La Ode Purna Alam Firdaus., Sp.A', 'dr. Firmandiyara Angkasa, Sp.A', '']);
    sheetTTD.appendRow(['Jantung dan Pembuluh Darah', 3, 'dr. Catur Rizky Kurniawan, Sp.JP', 'dr. Mokhammad Afifuddin, Sp.JP', 'dr. Muhammad Azhar Rosyidi, Sp.JP']);
    sheetTTD.appendRow(['Mikrobiologi Klinik', 1, 'dr. Genio Rachmadana, Sp.MK', '', '']);
    sheetTTD.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#2d3748').setFontColor('#ffffff');
  }

  var sheetWis = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
  if (!sheetWis) {
    sheetWis = ss.insertSheet(CONFIG.SHEET_WISUDAWAN);
    sheetWis.appendRow(['NAMA', 'TTL', 'NAMA AYAH', 'NAMA IBU']);
    sheetWis.appendRow(['dr. Reza Ariestyawan Ramadhan, Sp.An-TI', 'Merauke 26 Maret 1991', 'Edy Santosa', 'Almh. Henny Istyowati']);
    sheetWis.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#2d3748').setFontColor('#ffffff');
  }

  return { success: true, message: 'Tab template TTD, Wisudawan, dan PENGATURAN siap digunakan.' };
}

function getSheetSummary(spreadsheetId) {
  try {
    var ss = getTargetSpreadsheet(spreadsheetId);
    if (!ss) {
      return {
        success: false,
        needSpreadsheetId: true,
        error: 'Spreadsheet aktif tidak terdeteksi. Silakan masukkan ID atau URL Google Spreadsheet Anda.'
      };
    }

    var currentSpreadsheetId = ss.getId();
    var settings = { tanggalCover: '' };
    var sheetPengaturan = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
    if (sheetPengaturan) {
      var pData = sheetPengaturan.getDataRange().getValues();
      for (var p = 1; p < pData.length; p++) {
        var key = String(pData[p][0] || '').trim().toUpperCase();
        var val = String(pData[p][1] || '').trim();
        if (key === 'TANGGAL_COVER') settings.tanggalCover = val;
      }
    }

    var ttdList = [];
    var configuredProdis = [];
    var ttdSheet = ss.getSheetByName(CONFIG.SHEET_TTD);
    if (ttdSheet && ttdSheet.getLastRow() > 1) {
      var ttdData = ttdSheet.getDataRange().getValues();
      for (var i = 1; i < ttdData.length; i++) {
        var prodi = String(ttdData[i][0] || '').trim();
        var layout = parseInt(ttdData[i][1], 10) || 1;
        var name1 = String(ttdData[i][2] || '').trim();
        var name2 = String(ttdData[i][3] || '').trim();
        var name3 = String(ttdData[i][4] || '').trim();

        if (name1.indexOf('\n') !== -1) {
          var splitNames = name1.split(/\r?\n/).map(function(s) { return s.trim(); }).filter(Boolean);
          name1 = splitNames[0] || '';
          if (!name2 && splitNames[1]) name2 = splitNames[1];
          if (!name3 && splitNames[2]) name3 = splitNames[2];
        }

        var namesCombinedArray = [];
        if (name1) namesCombinedArray.push(name1);
        if (layout >= 2 && name2) namesCombinedArray.push(name2);
        if (layout >= 3 && name3) namesCombinedArray.push(name3);

        if (prodi) {
          ttdList.push({
            rowIndex: i + 1,
            prodi: prodi,
            layout: layout,
            namaTtd: namesCombinedArray.join('\n'),
            namaTtd1: name1,
            namaTtd2: name2,
            namaTtd3: name3
          });
          if (configuredProdis.indexOf(prodi) === -1) configuredProdis.push(prodi);
        }
      }
    }

    var wisudawanList = [];
    var wisSheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    if (wisSheet && wisSheet.getLastRow() > 1) {
      var rawWis = wisSheet.getDataRange().getValues();
      var headers = rawWis[0].map(function(h) { return String(h || '').trim().toUpperCase(); });
      var colNama = headers.indexOf('NAMA') !== -1 ? headers.indexOf('NAMA') : 0;
      var colTtl = headers.indexOf('TTL') !== -1 ? headers.indexOf('TTL') : (rawWis[0].length >= 2 ? 1 : -1);
      var colAyah = headers.indexOf('NAMA AYAH') !== -1 ? headers.indexOf('NAMA AYAH') : (rawWis[0].length >= 3 ? 2 : -1);
      var colIbu = headers.indexOf('NAMA IBU') !== -1 ? headers.indexOf('NAMA IBU') : (rawWis[0].length >= 4 ? 3 : -1);

      for (var w = 1; w < rawWis.length; w++) {
        var wNama = String(rawWis[w][colNama] || '').trim();
        var wTtl = colTtl !== -1 && rawWis[w][colTtl] !== undefined ? String(rawWis[w][colTtl] || '').trim() : '';
        var wAyah = colAyah !== -1 && rawWis[w][colAyah] !== undefined ? String(rawWis[w][colAyah] || '').trim() : '';
        var wIbu = colIbu !== -1 && rawWis[w][colIbu] !== undefined ? String(rawWis[w][colIbu] || '').trim() : '';

        if (wNama && wNama.toUpperCase() !== 'NAMA' && wNama.toUpperCase() !== 'NAMA DOKTER') {
          wisudawanList.push({
            rowIndex: w + 1,
            nama: wNama,
            ttl: wTtl,
            namaAyah: wAyah,
            namaIbu: wIbu
          });
        }
      }
    }

    return {
      success: true,
      spreadsheetId: currentSpreadsheetId,
      spreadsheetName: ss.getName(),
      templateId: CONFIG.TEMPLATE_ID,
      settings: settings,
      totalWisudawan: wisudawanList.length,
      configuredProdis: configuredProdis,
      prodiList: configuredProdis.map(function(p) { return { prodi: p, count: wisudawanList.length }; }),
      ttdCount: ttdList.length,
      wisudawanList: wisudawanList,
      ttdList: ttdList
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function addWisudawanData(data, spreadsheetId) {
  try {
    var ss = getTargetSpreadsheet(spreadsheetId);
    if (!ss) throw new Error('Spreadsheet tidak terhubung.');
    var sheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    if (!sheet) {
      setupTemplateSheets(spreadsheetId);
      sheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    }
    if (!data.nama) throw new Error('Nama Dokter wajib diisi.');

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 4).getValues()[0];
    var colProdiIdx = headers.map(function(h) { return String(h || '').trim().toUpperCase(); }).indexOf('PRODI');

    if (colProdiIdx !== -1) {
      sheet.appendRow(['', data.nama.trim(), (data.ttl || '').trim(), (data.namaAyah || '').trim(), (data.namaIbu || '').trim()]);
    } else {
      sheet.appendRow([data.nama.trim(), (data.ttl || '').trim(), (data.namaAyah || '').trim(), (data.namaIbu || '').trim()]);
    }
    return { success: true, message: 'Data wisudawan ' + data.nama + ' berhasil ditambahkan.' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function bulkAddWisudawanData(payload, spreadsheetId) {
  try {
    var ss = getTargetSpreadsheet(spreadsheetId);
    if (!ss) throw new Error('Spreadsheet tidak terhubung.');
    var sheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    if (!sheet) {
      setupTemplateSheets(spreadsheetId);
      sheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    }
    var rowsToInsert = payload.rows || [];
    if (!rowsToInsert.length) throw new Error('Tidak ada baris data wisudawan untuk diimpor.');

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 4).getValues()[0];
    var colProdiIdx = headers.map(function(h) { return String(h || '').trim().toUpperCase(); }).indexOf('PRODI');

    var rowsData = [];
    for (var i = 0; i < rowsToInsert.length; i++) {
      var item = rowsToInsert[i];
      var nama = String(item.nama || '').trim();
      var ttl = String(item.ttl || '').trim();
      var ayah = String(item.namaAyah || '').trim();
      var ibu = String(item.namaIbu || '').trim();
      if (nama) {
        rowsData.push(colProdiIdx !== -1 ? ['', nama, ttl, ayah, ibu] : [nama, ttl, ayah, ibu]);
      }
    }
    if (!rowsData.length) throw new Error('Semua baris data tidak memiliki Nama Dokter yang valid.');

    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rowsData.length, rowsData[0].length).setValues(rowsData);
    return { success: true, count: rowsData.length, message: 'Berhasil mengimpor ' + rowsData.length + ' data wisudawan ke Sheet Wisudawan.' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function deleteWisudawanRow(rowIndex, spreadsheetId) {
  try {
    var ss = getTargetSpreadsheet(spreadsheetId);
    if (!ss) throw new Error('Spreadsheet tidak terhubung.');
    var sheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    if (!sheet) throw new Error('Tab Wisudawan tidak ditemukan.');
    sheet.deleteRow(rowIndex);
    return { success: true, message: 'Baris wisudawan berhasil dihapus.' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function saveTtdData(data, spreadsheetId) {
  try {
    var ss = getTargetSpreadsheet(spreadsheetId);
    if (!ss) throw new Error('Spreadsheet tidak terhubung.');
    var sheet = ss.getSheetByName(CONFIG.SHEET_TTD);
    if (!sheet) {
      setupTemplateSheets(spreadsheetId);
      sheet = ss.getSheetByName(CONFIG.SHEET_TTD);
    }

    var layout = parseInt(data.layout, 10) || 1;
    var name1 = (data.namaTtd1 || '').trim();
    var name2 = layout >= 2 ? (data.namaTtd2 || '').trim() : '';
    var name3 = layout >= 3 ? (data.namaTtd3 || '').trim() : '';

    var rows = sheet.getDataRange().getValues();
    var existingRow = -1;
    for (var r = 1; r < rows.length; r++) {
      if (String(rows[r][0] || '').trim().toLowerCase() === String(data.prodi || '').trim().toLowerCase()) {
        existingRow = r + 1;
        break;
      }
    }

    if (existingRow > -1) {
      sheet.getRange(existingRow, 1, 1, 5).setValues([[data.prodi.trim(), layout, name1, name2, name3]]);
    } else {
      sheet.appendRow([data.prodi.trim(), layout, name1, name2, name3]);
    }
    return { success: true, message: 'Konfigurasi TTD Prodi ' + data.prodi + ' berhasil disimpan.' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function bulkAddTtdData(payload, spreadsheetId) {
  try {
    var ss = getTargetSpreadsheet(spreadsheetId);
    if (!ss) throw new Error('Spreadsheet tidak terhubung.');
    var sheet = ss.getSheetByName(CONFIG.SHEET_TTD);
    if (!sheet) {
      setupTemplateSheets(spreadsheetId);
      sheet = ss.getSheetByName(CONFIG.SHEET_TTD);
    }
    var rowsToInsert = payload.rows || [];
    if (!rowsToInsert.length) throw new Error('Tidak ada data TTD untuk diimpor.');

    var existingRows = sheet.getDataRange().getValues();
    var prodiRowMap = {};
    for (var r = 1; r < existingRows.length; r++) {
      var pName = String(existingRows[r][0] || '').trim().toLowerCase();
      if (pName) prodiRowMap[pName] = r + 1;
    }

    var countNew = 0, countUpdate = 0;
    for (var i = 0; i < rowsToInsert.length; i++) {
      var item = rowsToInsert[i];
      var prodi = String(item.prodi || '').trim();
      var layout = parseInt(item.layout, 10) || 1;
      var name1 = String(item.namaTtd1 || '').trim();
      var name2 = layout >= 2 ? String(item.namaTtd2 || '').trim() : '';
      var name3 = layout >= 3 ? String(item.namaTtd3 || '').trim() : '';

      if (prodi && name1) {
        var pKey = prodi.toLowerCase();
        if (prodiRowMap[pKey]) {
          sheet.getRange(prodiRowMap[pKey], 1, 1, 5).setValues([[prodi, layout, name1, name2, name3]]);
          countUpdate++;
        } else {
          sheet.appendRow([prodi, layout, name1, name2, name3]);
          countNew++;
        }
      }
    }
    return { success: true, message: 'Berhasil mengimpor data TTD (' + countNew + ' baru, ' + countUpdate + ' diperbarui).' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function deleteTtdRow(rowIndex, spreadsheetId) {
  try {
    var ss = getTargetSpreadsheet(spreadsheetId);
    if (!ss) throw new Error('Spreadsheet tidak terhubung.');
    var sheet = ss.getSheetByName(CONFIG.SHEET_TTD);
    if (!sheet) throw new Error('Tab TTD tidak ditemukan.');
    sheet.deleteRow(rowIndex);
    return { success: true, message: 'Konfigurasi TTD Prodi berhasil dihapus.' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function replaceBiodataTagsWithMultiVariant(slide, candidateData) {
  var valNama = candidateData.nama || '-';
  var valTtl = candidateData.ttl || '-';
  var valAyah = candidateData.namaAyah || '-';
  var valIbu = candidateData.namaIbu || '-';

  slide.replaceAllText('{{NAMA}}', valNama);
  slide.replaceAllText('{{NAMA_DOKTER}}', valNama);
  slide.replaceAllText('{{NAMA DOKTER}}', valNama);
  slide.replaceAllText('{{TTL}}', valTtl);
  slide.replaceAllText('{{TEMPAT_TANGGAL_LAHIR}}', valTtl);
  slide.replaceAllText('{{TEMPAT TANGGAL LAHIR}}', valTtl);
  slide.replaceAllText('{{NAMA_AYAH}}', valAyah);
  slide.replaceAllText('{{NAMA AYAH}}', valAyah);
  slide.replaceAllText('{{AYAH}}', valAyah);
  slide.replaceAllText('{{NAMA_IBU}}', valIbu);
  slide.replaceAllText('{{NAMA IBU}}', valIbu);
  slide.replaceAllText('{{IBU}}', valIbu);
}

function generatePresentation(options) {
  try {
    options = options || {};
    var ss = getTargetSpreadsheet(options.spreadsheetId);
    if (!ss) throw new Error('Tidak dapat mendeteksi Google Sheet. Pastikan ID Spreadsheet valid.');

    var tanggalCover = options.tanggalCover || '';
    if (!tanggalCover) {
      var sPengaturan = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
      if (sPengaturan) {
        var pValues = sPengaturan.getDataRange().getValues();
        for (var p = 1; p < pValues.length; p++) {
          if (String(pValues[p][0] || '').trim().toUpperCase() === 'TANGGAL_COVER') {
            tanggalCover = String(pValues[p][1] || '').trim();
            break;
          }
        }
      }
    }

    var ttdMap = {};
    var ttdProdiOrder = [];
    var ttdSheet = ss.getSheetByName(CONFIG.SHEET_TTD);
    if (!ttdSheet || ttdSheet.getLastRow() < 2) throw new Error('Data pada tab "TTD" tidak ditemukan atau kosong.');
    
    var ttdRows = ttdSheet.getDataRange().getValues();
    for (var t = 1; t < ttdRows.length; t++) {
      var pName = String(ttdRows[t][0] || '').trim();
      var pLayout = parseInt(ttdRows[t][1], 10) || 1;
      var n1 = String(ttdRows[t][2] || '').trim();
      var n2 = String(ttdRows[t][3] || '').trim();
      var n3 = String(ttdRows[t][4] || '').trim();

      if (n1.indexOf('\n') !== -1) {
        var spl = n1.split(/\r?\n/).map(function(s) { return s.trim(); }).filter(Boolean);
        n1 = spl[0] || '';
        if (!n2 && spl[1]) n2 = spl[1];
        if (!n3 && spl[2]) n3 = spl[2];
      }

      if (pName) {
        var namesArr = [];
        if (n1) namesArr.push(n1);
        if (pLayout >= 2 && n2) namesArr.push(n2);
        if (pLayout >= 3 && n3) namesArr.push(n3);

        var pKey = pName.toLowerCase();
        ttdMap[pKey] = { prodiOriginal: pName, layout: pLayout, names: namesArr };
        if (ttdProdiOrder.indexOf(pKey) === -1) ttdProdiOrder.push(pKey);
      }
    }

    var wisSheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    if (!wisSheet || wisSheet.getLastRow() < 2) throw new Error('Data pada tab "Wisudawan" tidak ditemukan atau kosong.');
    
    var wisRows = wisSheet.getDataRange().getValues();
    var headers = wisRows[0].map(function(h) { return String(h || '').trim().toUpperCase(); });
    var colNama = headers.indexOf('NAMA') !== -1 ? headers.indexOf('NAMA') : 0;
    var colTtl = headers.indexOf('TTL') !== -1 ? headers.indexOf('TTL') : (wisRows[0].length >= 2 ? 1 : -1);
    var colAyah = headers.indexOf('NAMA AYAH') !== -1 ? headers.indexOf('NAMA AYAH') : (wisRows[0].length >= 3 ? 2 : -1);
    var colIbu = headers.indexOf('NAMA IBU') !== -1 ? headers.indexOf('NAMA IBU') : (wisRows[0].length >= 4 ? 3 : -1);

    var wisudawanList = [];
    for (var w = 1; w < wisRows.length; w++) {
      var rowNama = String(wisRows[w][colNama] || '').trim();
      if (!rowNama || rowNama.toUpperCase() === 'NAMA' || rowNama.toUpperCase() === 'NAMA DOKTER') continue;
      wisudawanList.push({
        nama: rowNama,
        ttl: colTtl !== -1 && wisRows[w][colTtl] !== undefined ? String(wisRows[w][colTtl] || '').trim() : '',
        namaAyah: colAyah !== -1 && wisRows[w][colAyah] !== undefined ? String(wisRows[w][colAyah] || '').trim() : '',
        namaIbu: colIbu !== -1 && wisRows[w][colIbu] !== undefined ? String(wisRows[w][colIbu] || '').trim() : ''
      });
    }
    if (!wisudawanList.length) throw new Error('Tidak ada data wisudawan valid untuk diproses.');

    var templateId = options.templateId || CONFIG.TEMPLATE_ID;
    var templateFile = DriveApp.getFileById(templateId);
    var timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd_HH-mm');
    var targetFileName = 'Pelantikan Dokter Spesialis Multi-Prodi FK UB - ' + (tanggalCover ? tanggalCover + ' - ' : '') + timestamp;
    
    var copiedFile = templateFile.makeCopy(targetFileName);
    var presentationId = copiedFile.getId();
    var presentation = SlidesApp.openById(presentationId);
    var slides = presentation.getSlides();

    if (slides.length < 20) throw new Error('Template Google Slides tidak memiliki jumlah slide yang sesuai (minimal 20+ slide).');

    var masterBiodataSlide = slides[CONFIG.MASTER_BIODATA_INDEX - 1];
    var masterTtdSlide1 = slides[CONFIG.MASTER_TTD_INDEX_1 - 1];
    var masterTtdSlide2 = slides[CONFIG.MASTER_TTD_INDEX_2 - 1];
    var masterTtdSlide3 = slides[CONFIG.MASTER_TTD_INDEX_3 - 1];
    var masterSlidesToDelete = [masterBiodataSlide, masterTtdSlide1, masterTtdSlide2, masterTtdSlide3];

    var totalSlidesGenerated = 0, totalWisudawanProcessed = 0, bioInsertionIndex = 3;

    for (var cIdx = 0; cIdx < wisudawanList.length; cIdx++) {
      var cand = wisudawanList[cIdx];
      var duplicatedBioSlide = masterBiodataSlide.duplicate();
      replaceBiodataTagsWithMultiVariant(duplicatedBioSlide, cand);
      cleanRemainingTags(duplicatedBioSlide);
      duplicatedBioSlide.move(bioInsertionIndex++);
      totalSlidesGenerated++;
      totalWisudawanProcessed++;
    }

    var ttdInsertionIndex = CONFIG.ANCHOR_TRANSITION_INDEX + totalWisudawanProcessed;
    for (var pIdx2 = 0; pIdx2 < ttdProdiOrder.length; pIdx2++) {
      var ttdConfig = ttdMap[ttdProdiOrder[pIdx2]];
      var currentProdiName2 = ttdConfig.prodiOriginal;
      var targetMasterTtd = ttdConfig.layout === 2 ? masterTtdSlide2 : (ttdConfig.layout === 3 ? masterTtdSlide3 : masterTtdSlide1);
      var duplicatedTtdSlide = targetMasterTtd.duplicate();

      duplicatedTtdSlide.replaceAllText('{{PRODI}}', currentProdiName2);
      duplicatedTtdSlide.replaceAllText('{{PROGRAM_STUDI}}', currentProdiName2);
      duplicatedTtdSlide.replaceAllText('{{PROGRAM STUDI}}', currentProdiName2);

      for (var nIdx = 0; nIdx < ttdConfig.layout; nIdx++) {
        var tName = ttdConfig.names[nIdx] || '';
        duplicatedTtdSlide.replaceAllText('{{NAMA_TTD_' + (nIdx + 1) + '}}', tName);
        duplicatedTtdSlide.replaceAllText('{{NAMA TTD ' + (nIdx + 1) + '}}', tName);
      }

      cleanRemainingTags(duplicatedTtdSlide);
      duplicatedTtdSlide.move(ttdInsertionIndex++);
      totalSlidesGenerated++;
    }

    for (var m = 0; m < masterSlidesToDelete.length; m++) {
      try { masterSlidesToDelete[m].remove(); } catch (delErr) {}
    }

    if (tanggalCover) {
      presentation.replaceAllText('{{TANGGAL_COVER}}', tanggalCover);
      presentation.replaceAllText('{{TANGGAL COVER}}', tanggalCover);
    }

    presentation.saveAndClose();

    return {
      success: true,
      presentationId: presentationId,
      presentationUrl: copiedFile.getUrl(),
      presentationName: targetFileName,
      totalSlidesGenerated: totalSlidesGenerated,
      totalWisudawan: totalWisudawanProcessed,
      totalProdi: ttdProdiOrder.length
    };
  } catch (error) {
    Logger.log('Error generatePresentation: ' + error.stack);
    return { success: false, error: error.message };
  }
}

function cleanRemainingTags(slide) {
  var shapes = slide.getShapes();
  for (var i = 0; i < shapes.length; i++) {
    var textRange = shapes[i].getText();
    if (textRange) {
      var str = textRange.asString();
      if (str.indexOf('{{') !== -1 && str.indexOf('}}') !== -1) {
        var cleanStr = str.replace(/\{\{[A-Z0-9_\- ]+\}\}/g, '');
        if (cleanStr !== str) textRange.setText(cleanStr);
      }
    }
  }
}
