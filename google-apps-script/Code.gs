/**
 * @file Code.gs
 * Generator Presentasi Pelantikan Dokter Spesialis Multi-Prodi FK UB
 * Terintegrasi Google Sheets & Google Slides API
 * 
 * Template Presentation ID: 1dh-tTb1LlIoLGGwI_JA0Ev-iS5ZTyToHQEDuvXdYBWM
 */

// Konfigurasi Global Template FK UB
var CONFIG = {
  TEMPLATE_ID: '1dh-tTb1LlIoLGGwI_JA0Ev-iS5ZTyToHQEDuvXdYBWM',
  SHEET_TTD: 'TTD',
  SHEET_WISUDAWAN: 'Wisudawan',
  SHEET_PENGATURAN: 'PENGATURAN',
  // Master Slide Indices di Template FK UB (1-based index)
  MASTER_BIODATA_INDEX: 4,      // Slide 4: Master Biodata Wisudawan
  ANCHOR_TRANSITION_INDEX: 17, // Slide 17: Anchor Pasca Sumpah Dokter
  MASTER_TTD_INDEX_1: 18,      // Slide 18: TTD Layout 1
  MASTER_TTD_INDEX_2: 19,      // Slide 19: TTD Layout 2
  MASTER_TTD_INDEX_3: 20       // Slide 20: TTD Layout 3
};

/**
 * ENTRY POINT WEB APP UTAMA: doGet(e)
 */
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  template.initialSpreadsheetId = (e && e.parameter && e.parameter.id) ? e.parameter.id : '';

  return template.evaluate()
    .setTitle('Generator Pelantikan Dokter Spesialis FK UB')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Hook saat Spreadsheet dibuka untuk menambahkan Menu khusus
 */
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

/**
 * Menampilkan Web App Sidebar di Google Sheets
 */
function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Generator Pelantikan Dokter Spesialis FK UB')
    .setWidth(450);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Menampilkan sebagai Dialog Modal (Opsional)
 */
function showModalDialog() {
  var html = HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setWidth(980)
    .setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, 'Generator Pelantikan Dokter Spesialis FK UB');
}

/**
 * Helper untuk include file HTML parsial (Css, Js)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Mendapatkan referensi Spreadsheet secara fleksibel
 */
function getTargetSpreadsheet(spreadsheetId) {
  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  try {
    var activeSs = SpreadsheetApp.getActiveSpreadsheet();
    if (activeSs) return activeSs;
  } catch (e) {
    // Abaikan jika tidak ada active spreadsheet
  }

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

/**
 * Simpan ID Spreadsheet ke Script Properties
 */
function saveDefaultSpreadsheetId(id) {
  if (id) {
    PropertiesService.getScriptProperties().setProperty('DEFAULT_SPREADSHEET_ID', id);
    return { success: true };
  }
  return { success: false, error: 'ID kosong' };
}

/**
 * Setup struktur header default Sheet jika belum ada
 */
function setupTemplateSheets(spreadsheetId) {
  var ss = getTargetSpreadsheet(spreadsheetId);
  if (!ss) {
    throw new Error('Spreadsheet tidak ditemukan. Pastikan script terhubung dengan Google Sheet.');
  }

  // Tab PENGATURAN
  var sheetPengaturan = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
  if (!sheetPengaturan) {
    sheetPengaturan = ss.insertSheet(CONFIG.SHEET_PENGATURAN);
    sheetPengaturan.appendRow(['PARAMETER', 'NILAI']);
    sheetPengaturan.appendRow(['TANGGAL_COVER', Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd MMMM yyyy')]);
    sheetPengaturan.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#2d3748').setFontColor('#ffffff');
  }

  // Tab TTD (5 Kolom: PRODI, LAYOUT, NAMA TTD 1, NAMA TTD 2, NAMA TTD 3)
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

  // Tab Wisudawan (4 Kolom Utama: NAMA, TTL, NAMA AYAH, NAMA IBU)
  var sheetWis = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
  if (!sheetWis) {
    sheetWis = ss.insertSheet(CONFIG.SHEET_WISUDAWAN);
    sheetWis.appendRow(['NAMA', 'TTL', 'NAMA AYAH', 'NAMA IBU']);
    sheetWis.appendRow(['dr. Reza Ariestyawan Ramadhan, Sp.An-TI', 'Merauke 26 Maret 1991', 'Edy Santosa', 'Almh. Henny Istyowati']);
    sheetWis.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#2d3748').setFontColor('#ffffff');
  }

  return { success: true, message: 'Tab template TTD, Wisudawan, dan PENGATURAN siap digunakan.' };
}

/**
 * Mengambil ringkasan data dari Google Sheets untuk UI
 */
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

    // Ambil Pengaturan
    var settings = { tanggalCover: '' };
    var sheetPengaturan = ss.getSheetByName(CONFIG.SHEET_PENGATURAN);
    if (sheetPengaturan) {
      var pData = sheetPengaturan.getDataRange().getValues();
      for (var p = 1; p < pData.length; p++) {
        var key = String(pData[p][0] || '').trim().toUpperCase();
        var val = String(pData[p][1] || '').trim();
        if (key === 'TANGGAL_COVER') {
          settings.tanggalCover = val;
        }
      }
    }

    // Ambil Data TTD & Daftar Prodi yang terdaftar
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
          if (configuredProdis.indexOf(prodi) === -1) {
            configuredProdis.push(prodi);
          }
        }
      }
    }

    // Ambil Data Wisudawan (4 Kolom Utama)
    var wisudawanList = [];
    var wisSheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);

    if (wisSheet && wisSheet.getLastRow() > 1) {
      var rawWis = wisSheet.getDataRange().getValues();
      var headers = rawWis[0].map(function(h) { return String(h || '').trim().toUpperCase(); });
      
      var colNama = headers.indexOf('NAMA');
      if (colNama === -1) colNama = 0; // Fallback jika header berbeda

      var colTtl = headers.indexOf('TTL');
      if (colTtl === -1 && rawWis[0].length >= 2) colTtl = 1;

      var colAyah = headers.indexOf('NAMA AYAH');
      if (colAyah === -1 && rawWis[0].length >= 3) colAyah = 2;

      var colIbu = headers.indexOf('NAMA IBU');
      if (colIbu === -1 && rawWis[0].length >= 4) colIbu = 3;

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
      prodiList: configuredProdis.map(function(p) {
        return { prodi: p, count: wisudawanList.length };
      }),
      ttdCount: ttdList.length,
      wisudawanList: wisudawanList,
      ttdList: ttdList
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * FITUR BIODATA: Tambah Data Wisudawan Tunggal ke Tab 'Wisudawan' (4 Kolom Utama)
 */
function addWisudawanData(data, spreadsheetId) {
  try {
    var ss = getTargetSpreadsheet(spreadsheetId);
    if (!ss) throw new Error('Spreadsheet tidak terhubung.');

    var sheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    if (!sheet) {
      setupTemplateSheets(spreadsheetId);
      sheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    }

    if (!data.nama) {
      throw new Error('Nama Dokter wajib diisi.');
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 4).getValues()[0];
    var colProdiIdx = headers.map(function(h) { return String(h || '').trim().toUpperCase(); }).indexOf('PRODI');

    if (colProdiIdx !== -1) {
      // Jika Sheet masih memiliki 5 kolom dengan PRODI di kolom A
      sheet.appendRow(['', data.nama.trim(), (data.ttl || '').trim(), (data.namaAyah || '').trim(), (data.namaIbu || '').trim()]);
    } else {
      // Standard 4 Kolom: NAMA | TTL | AYAH | IBU
      sheet.appendRow([data.nama.trim(), (data.ttl || '').trim(), (data.namaAyah || '').trim(), (data.namaIbu || '').trim()]);
    }

    return { success: true, message: 'Data wisudawan ' + data.nama + ' berhasil ditambahkan.' };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * FITUR BIODATA IMPOR EXCEL: Simpan Massal Baris Wisudawan ke Tab 'Wisudawan' (4 Kolom Utama)
 */
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
    if (!rowsToInsert || rowsToInsert.length === 0) {
      throw new Error('Tidak ada baris data wisudawan untuk diimpor.');
    }

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
        if (colProdiIdx !== -1) {
          rowsData.push(['', nama, ttl, ayah, ibu]);
        } else {
          rowsData.push([nama, ttl, ayah, ibu]);
        }
      }
    }

    if (rowsData.length === 0) {
      throw new Error('Semua baris data yang diimpor tidak memiliki Nama Dokter yang valid.');
    }

    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rowsData.length, rowsData[0].length).setValues(rowsData);

    return {
      success: true,
      count: rowsData.length,
      message: 'Berhasil mengimpor ' + rowsData.length + ' data wisudawan ke Sheet Wisudawan.'
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * FITUR BIODATA: Hapus Baris Wisudawan
 */
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

/**
 * FITUR TTD: Simpan / Update Konfigurasi TTD Single Prodi (5-Kolom)
 */
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

/**
 * FITUR TTD IMPOR EXCEL: Simpan Massal Baris TTD ke Tab 'TTD' (5-Kolom)
 */
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
    if (!rowsToInsert || rowsToInsert.length === 0) {
      throw new Error('Tidak ada data TTD untuk diimpor.');
    }

    var existingRows = sheet.getDataRange().getValues();
    var prodiRowMap = {};
    for (var r = 1; r < existingRows.length; r++) {
      var pName = String(existingRows[r][0] || '').trim().toLowerCase();
      if (pName) {
        prodiRowMap[pName] = r + 1;
      }
    }

    var countNew = 0;
    var countUpdate = 0;

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

    return {
      success: true,
      message: 'Berhasil mengimpor data TTD (' + countNew + ' baru, ' + countUpdate + ' diperbarui).'
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * FITUR TTD: Hapus Baris TTD
 */
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

/**
 * HELPER PEMETAAN TAG TERLINDUNG BIODATA
 */
function replaceBiodataTagsWithMultiVariant(slide, candidateData) {
  var valNama = candidateData.nama || '-';
  var valTtl = candidateData.ttl || '-';
  var valAyah = candidateData.namaAyah || '-';
  var valIbu = candidateData.namaIbu || '-';

  // Variasi Tag Nama Dokter
  slide.replaceAllText('{{NAMA}}', valNama);
  slide.replaceAllText('{{NAMA_DOKTER}}', valNama);
  slide.replaceAllText('{{NAMA DOKTER}}', valNama);

  // Variasi Tag TTL
  slide.replaceAllText('{{TTL}}', valTtl);
  slide.replaceAllText('{{TEMPAT_TANGGAL_LAHIR}}', valTtl);
  slide.replaceAllText('{{TEMPAT TANGGAL LAHIR}}', valTtl);

  // Variasi Tag Nama Ayah
  slide.replaceAllText('{{NAMA_AYAH}}', valAyah);
  slide.replaceAllText('{{NAMA AYAH}}', valAyah);
  slide.replaceAllText('{{AYAH}}', valAyah);

  // Variasi Tag Nama Ibu
  slide.replaceAllText('{{NAMA_IBU}}', valIbu);
  slide.replaceAllText('{{NAMA IBU}}', valIbu);
  slide.replaceAllText('{{IBU}}', valIbu);
}

/**
 * FUNGSI UTAMA GENERASI PRESENTASI (DUAL ANCHOR POSITIONING & FULL PRODI TTD LOOP)
 */
function generatePresentation(options) {
  try {
    options = options || {};
    var ss = getTargetSpreadsheet(options.spreadsheetId);
    if (!ss) {
      throw new Error('Tidak dapat mendeteksi Google Sheet. Pastikan ID Spreadsheet valid.');
    }

    // 1. Baca Data Setting
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

    // 2. Baca Data TTD (Dukungan 5 Kolom & Multiline C)
    var ttdMap = {};
    var ttdProdiOrder = [];
    var ttdSheet = ss.getSheetByName(CONFIG.SHEET_TTD);
    if (!ttdSheet || ttdSheet.getLastRow() < 2) {
      throw new Error('Data pada tab "TTD" tidak ditemukan atau kosong.');
    }
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
        ttdMap[pKey] = {
          prodiOriginal: pName,
          layout: pLayout,
          names: namesArr
        };
        if (ttdProdiOrder.indexOf(pKey) === -1) {
          ttdProdiOrder.push(pKey);
        }
      }
    }

    // 3. Baca Data Wisudawan (4 Kolom Utama)
    var wisSheet = ss.getSheetByName(CONFIG.SHEET_WISUDAWAN);
    if (!wisSheet || wisSheet.getLastRow() < 2) {
      throw new Error('Data pada tab "Wisudawan" tidak ditemukan atau kosong.');
    }
    var wisRows = wisSheet.getDataRange().getValues();
    var headers = wisRows[0].map(function(h) { return String(h || '').trim().toUpperCase(); });
    
    var colNama = headers.indexOf('NAMA');
    if (colNama === -1) colNama = 0;

    var colTtl = headers.indexOf('TTL');
    if (colTtl === -1 && wisRows[0].length >= 2) colTtl = 1;

    var colAyah = headers.indexOf('NAMA AYAH');
    if (colAyah === -1 && wisRows[0].length >= 3) colAyah = 2;

    var colIbu = headers.indexOf('NAMA IBU');
    if (colIbu === -1 && wisRows[0].length >= 4) colIbu = 3;

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

    if (wisudawanList.length === 0) {
      throw new Error('Tidak ada data wisudawan valid untuk diproses.');
    }

    // 4. Duplikasi File Template Google Slides FK UB
    var templateId = options.templateId || CONFIG.TEMPLATE_ID;
    var templateFile = DriveApp.getFileById(templateId);
    var timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd_HH-mm');
    var targetFileName = 'Pelantikan Dokter Spesialis Multi-Prodi FK UB - ' + (tanggalCover ? tanggalCover + ' - ' : '') + timestamp;
    
    var copiedFile = templateFile.makeCopy(targetFileName);
    var presentationId = copiedFile.getId();
    var presentation = SlidesApp.openById(presentationId);

    var slides = presentation.getSlides();
    var totalInitialSlides = slides.length;

    if (totalInitialSlides < 20) {
      throw new Error('Template Google Slides tidak memiliki jumlah slide yang sesuai (minimal 20+ slide). Pastikan ID Template benar.');
    }

    // 5. Identifikasi Master Slides (0-based index)
    var masterBiodataSlide = slides[CONFIG.MASTER_BIODATA_INDEX - 1]; // Index 3 (Slide 4 Master Biodata FK UB)
    var masterTtdSlide1 = slides[CONFIG.MASTER_TTD_INDEX_1 - 1];       // Index 17 (Slide 18 Master TTD 1)
    var masterTtdSlide2 = slides[CONFIG.MASTER_TTD_INDEX_2 - 1];       // Index 18 (Slide 19 Master TTD 2)
    var masterTtdSlide3 = slides[CONFIG.MASTER_TTD_INDEX_3 - 1];       // Index 19 (Slide 20 Master TTD 3)

    var masterSlidesToDelete = [
      masterBiodataSlide,
      masterTtdSlide1,
      masterTtdSlide2,
      masterTtdSlide3
    ];

    var totalSlidesGenerated = 0;
    var totalWisudawanProcessed = 0;

    // =========================================================================
    // TAHAP 1: SISIPKAN SLIDE BIODATA WISUDAWAN DI ATAS / SEBELUM SUMPAH DOKTER
    // Posisi Anchor 1: Mulai Slide 3 (index 3 di belakang Cover Slide 1-3)
    // =========================================================================
    var bioInsertionIndex = 3;

    for (var cIdx = 0; cIdx < wisudawanList.length; cIdx++) {
      var cand = wisudawanList[cIdx];
      var duplicatedBioSlide = masterBiodataSlide.duplicate();

      // Ganti Tag Biodata
      replaceBiodataTagsWithMultiVariant(duplicatedBioSlide, cand);

      // Bersihkan sisa tag
      cleanRemainingTags(duplicatedBioSlide);

      // Pindahkan ke posisi sebelum Sumpah Dokter
      duplicatedBioSlide.move(bioInsertionIndex);
      bioInsertionIndex++;
      totalSlidesGenerated++;
      totalWisudawanProcessed++;
    }

    // =========================================================================
    // TAHAP 2: SISIPKAN SLIDE TTD PEMANGGILAN BERDIRI UNTUK SELURUH PRODI TTD
    // Posisi Anchor 2: Pasca Slide Transisi 17 (Pasca Sumpah Dokter)
    // =========================================================================
    var ttdInsertionIndex = CONFIG.ANCHOR_TRANSITION_INDEX + totalWisudawanProcessed;

    for (var pIdx2 = 0; pIdx2 < ttdProdiOrder.length; pIdx2++) {
      var pKey2 = ttdProdiOrder[pIdx2];
      var ttdConfig = ttdMap[pKey2];
      var currentProdiName2 = ttdConfig.prodiOriginal;

      var targetMasterTtd = masterTtdSlide1;
      if (ttdConfig.layout === 2) {
        targetMasterTtd = masterTtdSlide2;
      } else if (ttdConfig.layout === 3) {
        targetMasterTtd = masterTtdSlide3;
      }

      var duplicatedTtdSlide = targetMasterTtd.duplicate();

      duplicatedTtdSlide.replaceAllText('{{PRODI}}', currentProdiName2);
      duplicatedTtdSlide.replaceAllText('{{PROGRAM_STUDI}}', currentProdiName2);
      duplicatedTtdSlide.replaceAllText('{{PROGRAM STUDI}}', currentProdiName2);

      if (ttdConfig.layout === 1) {
        var name1 = ttdConfig.names[0] || '';
        duplicatedTtdSlide.replaceAllText('{{NAMA_TTD_1}}', name1);
        duplicatedTtdSlide.replaceAllText('{{NAMA TTD 1}}', name1);
      } else if (ttdConfig.layout === 2) {
        var name1_2 = ttdConfig.names[0] || '';
        var name2_2 = ttdConfig.names[1] || '';
        duplicatedTtdSlide.replaceAllText('{{NAMA_TTD_1}}', name1_2);
        duplicatedTtdSlide.replaceAllText('{{NAMA TTD 1}}', name1_2);
        duplicatedTtdSlide.replaceAllText('{{NAMA_TTD_2}}', name2_2);
        duplicatedTtdSlide.replaceAllText('{{NAMA TTD 2}}', name2_2);
      } else if (ttdConfig.layout === 3) {
        var name1_3 = ttdConfig.names[0] || '';
        var name2_3 = ttdConfig.names[1] || '';
        var name3_3 = ttdConfig.names[2] || '';
        duplicatedTtdSlide.replaceAllText('{{NAMA_TTD_1}}', name1_3);
        duplicatedTtdSlide.replaceAllText('{{NAMA TTD 1}}', name1_3);
        duplicatedTtdSlide.replaceAllText('{{NAMA_TTD_2}}', name2_3);
        duplicatedTtdSlide.replaceAllText('{{NAMA TTD 2}}', name2_3);
        duplicatedTtdSlide.replaceAllText('{{NAMA_TTD_3}}', name3_3);
        duplicatedTtdSlide.replaceAllText('{{NAMA TTD 3}}', name3_3);
      }

      cleanRemainingTags(duplicatedTtdSlide);

      duplicatedTtdSlide.move(ttdInsertionIndex);
      ttdInsertionIndex++;
      totalSlidesGenerated++;
    }

    // 7. Hapus Seluruh Slide Master setelah duplikasi selesai
    for (var m = 0; m < masterSlidesToDelete.length; m++) {
      try {
        masterSlidesToDelete[m].remove();
      } catch (delErr) {
        Logger.log('Peringatan saat menghapus slide master: ' + delErr.message);
      }
    }

    // 8. Global Replacement Tanggal Cover
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
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Membersihkan sisa tag {{...}} tanpa mengganggu tata letak bentuk
 */
function cleanRemainingTags(slide) {
  var shapes = slide.getShapes();
  for (var i = 0; i < shapes.length; i++) {
    var textRange = shapes[i].getText();
    if (textRange) {
      var str = textRange.asString();
      if (str.indexOf('{{') !== -1 && str.indexOf('}}') !== -1) {
        var regex = /\{\{[A-Z0-9_\- ]+\}\}/g;
        var cleanStr = str.replace(regex, '');
        if (cleanStr !== str) {
          textRange.setText(cleanStr);
        }
      }
    }
  }
}
