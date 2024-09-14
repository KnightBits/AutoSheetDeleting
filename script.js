function deleteColumnsCEtoCI() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Удаляем столбцы от CE (83-й столбец) до CI (87-й столбец)
  sheet.deleteColumns(83, 5); // Удаляем 5 столбцов начиная с 83-го (CE)
  
  // Вставляем дату ближайшего понедельника в ячейку CE3
  var nextMonday = getNextMonday();
  sheet.getRange('CE3').setValue(nextMonday);
}

function getNextMonday() {
  var today = new Date();
  var day = today.getDay();
  
  // Определяем, сколько дней нужно прибавить, чтобы получить следующий понедельник
  var daysToNextMonday = (day === 0) ? 1 : (8 - day); // Если воскресенье, то понедельник завтра, иначе рассчитываем
  
  var nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysToNextMonday);
  
  // Возвращаем форматированную дату (например, DD.MM.YYYY)
  return Utilities.formatDate(nextMonday, Session.getScriptTimeZone(), "dd.MM.yyyy");
}

function createWeeklyTrigger() {
  ScriptApp.newTrigger('deleteColumnsCEtoCI') // Название функции, которая будет выполняться
    .timeBased() // Устанавливаем, что это временной триггер
    .onWeekDay(ScriptApp.WeekDay.SATURDAY) // Указываем день недели - суббота
    .atHour(19) // Указываем час - 19:00
    .everyWeeks(1) // Устанавливаем повторение каждую неделю
    .create(); // Создаем триггер
}
