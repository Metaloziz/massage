/**
 * CMS для сайта massage (static export).
 * Таблица: https://docs.google.com/spreadsheets/d/1kM48FjY9NMOe421ZBdtSVLJrvdxbtJb58girp_Qx2H4
 *
 * Установка:
 * 1. Extensions → Apps Script → вставить этот файл
 * 2. Script Properties → API_KEY = ваш секрет
 * 3. Выполнить seedSheetsOnce один раз (вкладки + данные + оформление)
 * 4. Deploy → New deployment → Web app
 *    Execute as: Me
 *    Who has access: Anyone
 * 5. URL → src/lib/api.ts (GAS_API_URL), ключ → NEXT_PUBLIC_GAS_API_KEY
 *
 * Важно для редактора: меняйте колонки «Значение» / тексты / цены.
 * Колонки key / id / serviceId / locationId лучше не переименовывать и не менять без нужды.
 */

var CONFIG = {
  SITE_SHEET: 'Контакты',
  SERVICES_SHEET: 'Услуги',
  PRICING_SHEET: 'Цены',
  EDUCATION_SHEET: 'Обучение',
  LOCATIONS_SHEET: 'Кабинеты',
  HELP_SHEET: 'Справка',
  // старые английские имена — на случай миграции
  SHEET_ALIASES: {
    'Контакты': ['Контакты', 'Site'],
    'Услуги': ['Услуги', 'Services'],
    'Цены': ['Цены', 'Pricing'],
    'Обучение': ['Обучение', 'Education'],
    'Кабинеты': ['Кабинеты', 'Locations']
  },
  API_KEY_PROPERTY: 'API_KEY',
  HEADER_BG: '#1e3a2f',
  HEADER_FG: '#ffffff',
  HINT_BG: '#e8f0ea',
  ALT_ROW_BG: '#f5f7f4',
  LOCK_COL_BG: '#f0ebe3'
};

function doGet(e) {
  try {
    var auth = checkApiKey_(e);
    if (!auth.ok) return json_({ ok: false, error: auth.error });

    var action = (e && e.parameter && e.parameter.action) || 'content';
    if (action !== 'content') {
      return json_({ ok: false, error: 'unknown_action' });
    }

    return json_({
      ok: true,
      site: getSite_(),
      services: getServices_(),
      pricing: getPricing_(),
      education: getEducation_(),
      locations: getLocations_(),
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    return json_({ ok: false, error: 'server_error', details: String(err) });
  }
}

/** Запустить один раз: данные + русские названия + цвета. */
function seedSheetsOnce() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename('massage CMS');

  ensureHelpSheet_(ss);

  ensureKeyValueSheet_(ss, CONFIG.SITE_SHEET, [
    ['key', 'value', 'описание'],
    ['phone', '+375 (29) 570-56-37', 'Телефон как на сайте'],
    ['phoneHref', 'tel:+375295705637', 'Ссылка для кнопки «Позвонить» (формат tel:…). Лучше не менять вручную'],
    ['phoneDigits', '375295705637', 'Только цифры номера (для мессенджеров)'],
    ['hours', 'По предварительной записи', 'Часы работы в подвале сайта'],
    ['payment', 'Оплата наличными', 'Способ оплаты'],
    ['unp', '692243078', 'УНП'],
    ['instagram', 'https://www.instagram.com/sasnouski_aliaksei/', 'Ссылка на Instagram'],
    ['instagramHandle', '@sasnouski_aliaksei', 'Подпись Instagram'],
    ['telegram', 'https://t.me/aliaksei_sasnouski', 'Ссылка на Telegram'],
    ['telegramHandle', '@aliaksei_sasnouski', 'Подпись Telegram'],
    ['whatsapp', 'https://wa.me/375295705637', 'Ссылка WhatsApp'],
    ['viber', 'viber://chat?number=%2B375295705637', 'Ссылка Viber']
  ], [220, 360, 420]);

  ensureTableSheet_(ss, CONFIG.SERVICES_SHEET, [
    ['id', 'title', 'shortDescription', 'ctaLabel', 'описание'],
    ['kinesio', 'Кинезиомассаж', 'Массаж с диагностикой. Подходит, если есть конкретный запрос по боли и вы хотите разобраться в причине.', 'Записаться на кинезиомассаж', 'Код услуги kinesio — не менять'],
    ['wellness', 'Общеоздоровительный массаж', 'Расслабляющий массаж без диагностики и лишних вопросов. Просто лежать и отдыхать.', 'Записаться на общеоздоровительный массаж', 'Код услуги wellness — не менять']
  ], [100, 220, 420, 260, 220], 'id');

  ensureTableSheet_(ss, CONFIG.PRICING_SHEET, [
    ['serviceId', 'locationId', 'price', 'услуга', 'кабинет'],
    ['kinesio', 'tyurli', '120 руб. за 60 мин', 'Кинезиомассаж', 'Тюрли'],
    ['kinesio', 'minsk', '150 руб. за 60 мин', 'Кинезиомассаж', 'Минск'],
    ['wellness', 'tyurli', '100 руб. за 60 мин', 'Общеоздоровительный', 'Тюрли'],
    ['wellness', 'tyurli', '50 руб. за 30 мин', 'Общеоздоровительный', 'Тюрли'],
    ['wellness', 'minsk', '110 руб. за 60 мин', 'Общеоздоровительный', 'Минск']
  ], [110, 110, 180, 180, 100], 'serviceId');

  ensureKeyValueSheet_(ss, CONFIG.EDUCATION_SHEET, [
    ['key', 'value', 'описание'],
    ['schedule', 'Сб, Вс — 9:00–12:00', 'Расписание занятий'],
    ['startDate', '3 октября', 'Дата старта курса'],
    ['endDate', '15 ноября', 'Дата окончания'],
    ['price', '550 руб.', 'Стоимость обучения'],
    ['place', 'г. Молодечно, д. Тюрли, ул. Южная, 6', 'Адрес проведения'],
    ['ctaLabel', 'Записаться на обучение', 'Текст кнопки записи']
  ], [140, 360, 280]);

  ensureTableSheet_(ss, CONFIG.LOCATIONS_SHEET, [
    ['id', 'address', 'fullAddress', 'mapUrl', 'hours', 'available', 'описание'],
    ['tyurli', 'ул. Южная, 6', 'д. Тюрли, ул. Южная, 6', 'https://share.google/cL4fGeluIFwokK6oB', 'По предварительной записи', 'TRUE', 'Код кабинета tyurli — не менять'],
    ['minsk', '1', 'Минск, ул. Тепличная, 1', 'https://www.google.com/maps/place/%D0%9A%D0%B8%D0%BD%D0%B5%D0%B7%D0%B8%D0%BE%D0%BC%D0%B0%D1%81%D1%81%D0%B0%D0%B6/@53.920126,27.6420763,17z/data=!3m1!4b1!4m6!3m5!1s0x46dbcfc95d05015b:0xba1b19984bea59b0!8m2!3d53.920126!4d27.6420763!16s%2Fg%2F11p9dht2lz!18m1!1e1?entry=ttu', 'По предварительной записи', 'TRUE', 'Код кабинета minsk — не менять']
  ], [90, 140, 220, 280, 200, 90, 240], 'id');

  removeLegacySheets_(ss);
  orderSheets_(ss);
}

function ensureHelpSheet_(ss) {
  var sh = ensureSheetByName_(ss, CONFIG.HELP_SHEET);
  sh.clear();

  var rows = [
    ['Как пользоваться этой таблицей'],
    [''],
    ['Что можно менять'],
    ['• Тексты, цены, даты, телефоны, ссылки — колонки value / title / price и т.п.'],
    ['• Подписи в колонках «описание», «услуга», «кабинет» — только подсказки для вас, сайт их не читает.'],
    [''],
    ['Что лучше не трогать'],
    ['• Коды в колонках key / id / serviceId / locationId (phone, kinesio, tyurli…).'],
    ['• Английские заголовки служебных колонок — по ним сайт находит данные.'],
    [''],
    ['Вкладки'],
    ['• Контакты — телефон, соцсети, УНП, оплата'],
    ['• Услуги — названия и короткие описания'],
    ['• Цены — стоимость по услуге и кабинету (можно добавить строку)'],
    ['• Обучение — даты, цена, место курса'],
    ['• Кабинеты — адреса и ссылки на карты'],
    [''],
    ['После правок сайт подтянет изменения сам (после обновления страницы / чуть позже из кэша).']
  ];

  sh.getRange(1, 1, rows.length, 1).setValues(rows);
  sh.getRange(1, 1).setFontWeight('bold').setFontSize(14).setFontColor(CONFIG.HEADER_BG);
  sh.setColumnWidth(1, 820);
  sh.setFrozenRows(1);
}

/** ----------------- Readers ----------------- */

function getSite_() {
  var map = readKeyValueSheet_(CONFIG.SITE_SHEET);
  return {
    phone: map.phone || '',
    phoneHref: map.phoneHref || '',
    phoneDigits: map.phoneDigits || '',
    hours: map.hours || '',
    payment: map.payment || '',
    unp: map.unp || '',
    social: {
      instagram: map.instagram || '',
      instagramHandle: map.instagramHandle || '',
      telegram: map.telegram || '',
      telegramHandle: map.telegramHandle || '',
      whatsapp: map.whatsapp || '',
      viber: map.viber || ''
    }
  };
}

function getServices_() {
  var sh = getSheet_(CONFIG.SERVICES_SHEET);
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = normalizeHeaders_(values[0]);
  var idx = indexMap_(headers, ['id', 'title', 'shortDescription', 'ctaLabel']);

  return values.slice(1).map(function (r) {
    return {
      id: String(valueAt_(r, idx.id)).trim(),
      title: String(valueAt_(r, idx.title)).trim(),
      shortDescription: String(valueAt_(r, idx.shortDescription)).trim(),
      ctaLabel: String(valueAt_(r, idx.ctaLabel)).trim()
    };
  }).filter(function (item) {
    return item.id !== '';
  });
}

function getPricing_() {
  var sh = getSheet_(CONFIG.PRICING_SHEET);
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = normalizeHeaders_(values[0]);
  var idx = indexMap_(headers, ['serviceId', 'locationId', 'price']);

  return values.slice(1).map(function (r) {
    return {
      serviceId: String(valueAt_(r, idx.serviceId)).trim(),
      locationId: String(valueAt_(r, idx.locationId)).trim(),
      price: String(valueAt_(r, idx.price)).trim()
    };
  }).filter(function (item) {
    return item.serviceId && item.locationId && item.price;
  });
}

function getEducation_() {
  var map = readKeyValueSheet_(CONFIG.EDUCATION_SHEET);
  return {
    schedule: map.schedule || '',
    startDate: map.startDate || '',
    endDate: map.endDate || '',
    price: map.price || '',
    place: map.place || '',
    ctaLabel: map.ctaLabel || ''
  };
}

function getLocations_() {
  var sh = getSheet_(CONFIG.LOCATIONS_SHEET);
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = normalizeHeaders_(values[0]);
  var idx = indexMap_(headers, ['id', 'address', 'fullAddress', 'mapUrl', 'hours', 'available']);

  return values.slice(1).map(function (r) {
    return {
      id: String(valueAt_(r, idx.id)).trim(),
      address: String(valueAt_(r, idx.address)).trim(),
      fullAddress: String(valueAt_(r, idx.fullAddress)).trim(),
      mapUrl: String(valueAt_(r, idx.mapUrl)).trim(),
      hours: String(valueAt_(r, idx.hours)).trim(),
      available: toBool_(valueAt_(r, idx.available))
    };
  }).filter(function (item) {
    return item.id !== '';
  });
}

/** ----------------- Auth ----------------- */

function checkApiKey_(e) {
  var expected = PropertiesService.getScriptProperties().getProperty(CONFIG.API_KEY_PROPERTY);
  if (!expected) return { ok: false, error: 'api_key_not_configured' };

  var got = (
    (e && e.parameter && (e.parameter.key || e.parameter.apiKey)) ||
    ''
  ).toString();

  if (!got || got !== expected) return { ok: false, error: 'unauthorized' };
  return { ok: true };
}

/** ----------------- Sheet builders ----------------- */

function ensureKeyValueSheet_(ss, name, rowsWithHeader, widths) {
  var sh = ensureSheetByName_(ss, name);
  sh.clear();
  sh.getRange(1, 1, rowsWithHeader.length, rowsWithHeader[0].length).setValues(rowsWithHeader);
  styleDataSheet_(sh, rowsWithHeader[0].length, rowsWithHeader.length, [1], widths);
}

function ensureTableSheet_(ss, name, rowsWithHeader, widths, lockColName) {
  var sh = ensureSheetByName_(ss, name);
  sh.clear();
  sh.getRange(1, 1, rowsWithHeader.length, rowsWithHeader[0].length).setValues(rowsWithHeader);
  var lockCols = [];
  if (lockColName) {
    var headers = rowsWithHeader[0];
    for (var i = 0; i < headers.length; i++) {
      if (headers[i] === lockColName || headers[i] === 'serviceId' || headers[i] === 'locationId' || headers[i] === 'key') {
        lockCols.push(i + 1);
      }
    }
  }
  styleDataSheet_(sh, rowsWithHeader[0].length, rowsWithHeader.length, lockCols, widths);
}

function styleDataSheet_(sh, colCount, rowCount, lockCols, widths) {
  var header = sh.getRange(1, 1, 1, colCount);
  header.setBackground(CONFIG.HEADER_BG);
  header.setFontColor(CONFIG.HEADER_FG);
  header.setFontWeight('bold');
  header.setWrap(true);

  if (rowCount > 1) {
    var data = sh.getRange(2, 1, rowCount, colCount);
    data.setWrap(true);
    data.setVerticalAlignment('middle');

    for (var r = 2; r <= rowCount; r++) {
      if (r % 2 === 0) {
        sh.getRange(r, 1, r, colCount).setBackground(CONFIG.ALT_ROW_BG);
      }
    }

    // колонка «описание» / подсказки — мягкий фон
    var headers = sh.getRange(1, 1, 1, colCount).getValues()[0];
    for (var c = 0; c < headers.length; c++) {
      var h = String(headers[c]).toLowerCase();
      if (h === 'описание' || h === 'услуга' || h === 'кабинет') {
        sh.getRange(2, c + 1, rowCount, c + 1).setBackground(CONFIG.HINT_BG);
        sh.getRange(2, c + 1, rowCount, c + 1).setFontColor('#3d4a3f');
      }
    }
  }

  (lockCols || []).forEach(function (col) {
    if (rowCount > 1) {
      sh.getRange(2, col, rowCount, col).setBackground(CONFIG.LOCK_COL_BG);
      sh.getRange(2, col, rowCount, col).setFontFamily('Roboto Mono');
    }
  });

  sh.setFrozenRows(1);
  sh.setRowHeight(1, 36);

  if (widths && widths.length) {
    for (var w = 0; w < widths.length; w++) {
      sh.setColumnWidth(w + 1, widths[w]);
    }
  }

  // русские подписи заголовков через notes
  var notes = {
    key: 'Служебный код поля. Не меняйте.',
    value: 'То, что видят на сайте. Можно менять.',
    описание: 'Подсказка для редактора. На сайт не попадает.',
    id: 'Служебный код. Не меняйте (kinesio / wellness / tyurli / minsk).',
    title: 'Название услуги на сайте',
    shortDescription: 'Короткое описание на карточках',
    ctaLabel: 'Текст кнопки «Записаться»',
    serviceId: 'Код услуги: kinesio или wellness',
    locationId: 'Код кабинета: tyurli или minsk',
    price: 'Строка цены, как на сайте',
    услуга: 'Подпись для вас, сайт не читает',
    кабинет: 'Подпись для вас, сайт не читает',
    address: 'Короткий адрес',
    fullAddress: 'Полный адрес на сайте',
    mapUrl: 'Ссылка «На карте»',
    hours: 'Часы работы кабинета',
    available: 'TRUE = показывать, FALSE = скрыть'
  };

  var hdrs = sh.getRange(1, 1, 1, colCount).getValues()[0];
  for (var n = 0; n < hdrs.length; n++) {
    var note = notes[String(hdrs[n])];
    if (note) sh.getRange(1, n + 1).setNote(note);
  }
}

function ensureSheetByName_(ss, name) {
  var aliases = CONFIG.SHEET_ALIASES[name] || [name];
  var sh = null;
  for (var i = 0; i < aliases.length; i++) {
    sh = ss.getSheetByName(aliases[i]);
    if (sh) break;
  }
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getName() !== name) sh.setName(name);
  return sh;
}

function removeLegacySheets_(ss) {
  var keep = {};
  keep[CONFIG.HELP_SHEET] = true;
  keep[CONFIG.SITE_SHEET] = true;
  keep[CONFIG.SERVICES_SHEET] = true;
  keep[CONFIG.PRICING_SHEET] = true;
  keep[CONFIG.EDUCATION_SHEET] = true;
  keep[CONFIG.LOCATIONS_SHEET] = true;

  ss.getSheets().forEach(function (sh) {
    if (!keep[sh.getName()] && ss.getSheets().length > 1) {
      // не удаляем автоматически чужие листы — только известный мусор ЛистN
      var n = sh.getName();
      if (/^Лист\d+$/i.test(n) || n === 'Sheet1') {
        ss.deleteSheet(sh);
      }
    }
  });
}

function orderSheets_(ss) {
  var order = [
    CONFIG.HELP_SHEET,
    CONFIG.SITE_SHEET,
    CONFIG.SERVICES_SHEET,
    CONFIG.PRICING_SHEET,
    CONFIG.EDUCATION_SHEET,
    CONFIG.LOCATIONS_SHEET
  ];
  order.forEach(function (name, index) {
    var sh = ss.getSheetByName(name);
    if (sh) ss.setActiveSheet(sh), ss.moveActiveSheet(index + 1);
  });
}

/** ----------------- Utils ----------------- */

function getSheet_(name) {
  var aliases = CONFIG.SHEET_ALIASES[name] || [name];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (var i = 0; i < aliases.length; i++) {
    var sh = ss.getSheetByName(aliases[i]);
    if (sh) return sh;
  }
  throw new Error('Sheet not found: ' + name);
}

function readKeyValueSheet_(name) {
  var sh = getSheet_(name);
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return {};

  var headers = normalizeHeaders_(values[0]);
  var keyIdx = headers.indexOf('key');
  var valueIdx = headers.indexOf('value');
  if (keyIdx < 0 || valueIdx < 0) {
    throw new Error('Missing key/value columns in sheet: ' + name);
  }

  var map = {};
  values.slice(1).forEach(function (r) {
    var key = String(r[keyIdx] || '').trim();
    if (!key) return;
    map[key] = cellToString_(r[valueIdx]);
  });
  return map;
}

/**
 * Ячейки с типом Date в Sheets через String(date) дают
 * "Sat Oct 03 2026 00:00:00 GMT+0300 (...)" — форматируем по-русски.
 */
function cellToString_(v) {
  if (v == null || v === '') return '';
  if (Object.prototype.toString.call(v) === '[object Date]' && !isNaN(v.getTime())) {
    var months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return v.getDate() + ' ' + months[v.getMonth()] + ' ' + v.getFullYear();
  }
  return String(v).trim();
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalizeHeaders_(headers) {
  return headers.map(function (header) {
    return String(header).trim();
  });
}

function indexMap_(headers, required) {
  var map = {};
  required.forEach(function (name) {
    var i = headers.indexOf(name);
    if (i < 0) throw new Error('Missing column in sheet: ' + name);
    map[name] = i;
  });
  return map;
}

function valueAt_(row, idx) {
  return idx >= 0 ? row[idx] : '';
}

function toBool_(v) {
  if (typeof v === 'boolean') return v;
  var s = String(v).trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes' || s === 'y';
}
