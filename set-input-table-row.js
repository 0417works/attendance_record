/*--------------------------*
 * 出勤簿テーブル入力欄を生成する
 *--------------------------*/

// 該当月の日数を取得
var year = document.getElementById("targetYear");
var month = document.getElementById("targetMonth");
var lastDay = getLastDay(year.value, month.value);

// 月初の曜日配列インデックスを取得
var dayOfWeekIndex = getBaseDayOfWeekIndex(year.value, month.value - 1);

// テーブル要素を取得
var tableTag = document.getElementById("table-body");

// ヘッダ以外のテーブル内容を削除しておく
for (i = tableTag.rows.length; i > 0; i--) {
    tableTag.deleteRow(-1);
} 

// テーブル入力項目セルを追加する
for (i = 1; i <= lastDay; i++) {
    // 行の追加
    let newRow = tableTag.insertRow(-1);
    var cellIndex = 0;
    var newCell = null;

    // 日付セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(document.createTextNode(`${i}`));

    // 曜日セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(document.createTextNode(getDayOfWeek(dayOfWeekIndex)));
    if (dayOfWeekIndex == 6) {
        dayOfWeekIndex = 0;
    } else {
        dayOfWeekIndex++;
    }

    // 出勤セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createAttendanceAtWorkCell());

    // 開始時間入力セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputTimeCell());

    // 終了時間入力セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputTimeCell());

    // 休憩時間入力セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputTimeCell());

    // 実働時間セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createDivEmptyCell());

    // 訪問数(20分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 訪問数(40分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 訪問数(60分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 休日・夜間・早朝数(20分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 休日・夜間・早朝数(40分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 休日・夜間・早朝数(60分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 同行訪問数(20分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 同行訪問数(40分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 同行訪問数(60分)セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 日中緊急対応セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 緊急携帯セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 看取りセル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // エンゼルケアセル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 計画書報告書枚数セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 担会セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // CFセル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 勉強会セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputNumberCell());

    // 備考セル
    newCell = newRow.insertCell(cellIndex++);
    newCell.appendChild(createInputTextCell());
}

/*-------------*
 *   関数宣言
 *-------------*/

/**
 * 指定月の日数を取得する
 * @param {number} year
 * @param {number} month
 * @returns {number}
 */
function getLastDay(year, month) {
    let targetDate = new Date(year, month, 0);
    return targetDate.getDate();    
}

/**
 * 基準曜日インデックスを取得する
 * @param {number} year
 * @param {number} month  
 * @returns {number}
 */
function getBaseDayOfWeekIndex(year, month) {
    let targetDate = new Date(year, month, 1);
    return targetDate.getDay();
}

/**
 * 曜日取得
 * @param {number} index 
 * @returns {string} 
 */
function getDayOfWeek(index) {
    switch (index) {
        case 0:
            return "日";
        case 1:
            return "月";
        case 2:
            return "火";
        case 3:
            return "水";
        case 4:
            return "木";
        case 5:
            return "金";
        case 6:
            return "土"
        default:
            return "Error";
    }
}

/**
 * 出勤セルを生成する
 * @returns {*} selectTag
 */
function createAttendanceAtWorkCell() {
    // 出勤状況配列
    const ATTENDANCE_STATUS = ["-", "出勤", "欠勤", "公休", "有休", "夏休"];
    let selectTag = document.createElement('select');
    selectTag.rel = 'stylesheet';
    selectTag.style.border = 'none';
    selectTag.style.backgroundColor = 'transparent';

    // セル生成
    ATTENDANCE_STATUS.forEach((status, index) => {
        let optionTag = document.createElement('option');
        optionTag.text = status;
        optionTag.value = index;
        selectTag.appendChild(optionTag);
    });

    // 出勤状況セルの変更検知時処理
    selectTag.onchange = function () {        
        var trTag = this.parentNode.parentNode;
        trTag.removeEventListener('mouseover', mouseOverEvent);
        trTag.removeEventListener('mouseleave', mouseLeaveEvent);
        var changeColor = 'white';
        // 背景色の変更
        switch(parseInt(this.value)) {
            case 0: // -
                changeColor = 'transparent';
                trTag.addEventListener('mouseover', mouseOverEvent);               
                trTag.addEventListener('mouseleave', mouseLeaveEvent);
                break;
            case 1: // 出勤
                // 白                
                changeColor = 'white';
                break;
            case 2: // 欠勤
                // 青
                changeColor = 'lightblue';
                break;
            case 3: // 公休
                // 赤
                changeColor = 'pink';
                break;
            case 4: // 有休
            case 5: // 夏休
                // グレー
                changeColor = 'gray';
                break;
        }    
        trTag.style.backgroundColor = changeColor;
        calcAttendanceStatus();
    };
    return selectTag;
}

/**
 * マウスオーバー時に行背景を変更する
 */
function mouseOverEvent() {
    this.style.backgroundColor = 'aqua';
}

/**
 * マウスオーバー外れた時に行背景を変更する
 */
function mouseLeaveEvent() {
    this.style.backgroundColor = 'transparent';
}

/**
 * 出勤状況算出
 */
function calcAttendanceStatus() {
    let trList = document.getElementById("table-body").children;
    // 出勤数
    var attendance = null;
    // 欠勤数
    var absence = null;
    // 公休数
    var publicHoliday = null;
    // 有休数
    var paidHoliday = null;
    // 夏休数
    var summerVacation = null;
    // 実働時間
    var actualWork = null;

    for (let element of trList) {
        let children = element.children;
        // 出勤状況集計
        let statusCell = children[2].firstElementChild;
        switch (parseInt(statusCell.value)) {
            case 1: // 出勤
                attendance += 1;
                break;
            case 2: // 欠勤
                absence += 1;
                break;
            case 3: // 公休
                publicHoliday += 1;
                break;
            case 4: // 有休
                paidHoliday += 1;
                break;
            case 5: // 夏休
                summerVacation += 1;
                break;
        }
        let actualWorkCell = children[6].firstElementChild;
        if (actualWorkCell.innerHTML) {
            actualWork += convertToSeconds(actualWorkCell.innerHTML);
        }
    }

    // 集計数を入力
    if (attendance) {
        let attendanceCell = document.getElementById('attendance');
        attendanceCell.innerHTML = attendance;
    }
    if (absence) {
        let absenceCell = document.getElementById('absence');
        absenceCell.innerHTML = absence;
    }
    if (publicHoliday) {
        let publicHolidayCell = document.getElementById('public-holiday');
        publicHolidayCell.innerHTML = publicHoliday;
    }
    if (paidHoliday) {
        let paidHolidayCell = document.getElementById('paid-holiday');
        paidHolidayCell.innerHTML = paidHoliday;
    }
    if (summerVacation) {
        let summerVacationCell = document.getElementById('summer-vacation');
        summerVacationCell.innerHTML = summerVacation;
    }
    if (actualWork) {
        let actualWorkCell = document.getElementById('actual-work');
        var hour = Math.floor(Math.abs(actualWork) / 3600);
        var minute = Math.floor(Math.abs(actualWork) % 3600 / 60);
        minute = ('00' + minute).slice(-2);        
        actualWorkCell.innerHTML = (actualWork <= 0) ? '' : `${hour}:${minute}`;
    }
}

/**
 * 時間入力セルを生成する
 * @returns {*} inputTag
 */
function createInputTimeCell() {
    let inputTag = document.createElement('input');
    inputTag.type = 'time';
    inputTag.className = 'time-input';
    inputTag.style.backgroundColor = 'transparent';
    inputTag.onchange = function () {
        let childrenTags = this.parentNode.parentNode.children;
        // 開始時間タグ取得
        let startTag = childrenTags[3].firstElementChild;
        // 終了時間タグ取得
        let endTag = childrenTags[4].firstElementChild;
        // 休憩時間タグ取得
        let restTag = childrenTags[5].firstElementChild;
        // 実績時間タグ取得
        let divTag = childrenTags[6].firstElementChild;

        let startTime = startTag.value ? startTag.value : undefined;
        let endTime = endTag.value ? endTag.value : undefined;
        let restTime = restTag.value ? restTag.value : undefined;

        // 各時間を秒単位に変換して、実働時間を算出する
        var secondStartTime = 0;
        if (typeof startTime !== "undefined") {
            secondStartTime = convertToSeconds(startTime);
        }
        var secondEndTime = 0;
        if (typeof endTime !== "undefined") {
            secondEndTime = convertToSeconds(endTime);
        }
        var secondSRestTime = 0;        
        if (typeof restTime !== "undefined") {
            secondSRestTime = convertToSeconds(restTime);
        }

        // 実働時間の算出
        if (secondEndTime < secondStartTime) {
            // 開始時間より終了時間が短い場合は、日を跨いだと判定して1日分の秒数を足す
            secondEndTime += 86400;
        }
        let actualWorkTime = secondEndTime - secondStartTime - secondSRestTime;
        var hour = Math.floor(Math.abs(actualWorkTime) / 3600);
        var minute = Math.floor(Math.abs(actualWorkTime) % 3600 / 60);

        // 2桁の０埋め表示にする
        hour = ('00' + hour).slice(-2);
        minute = ('00' + minute).slice(-2);        
        divTag.innerHTML = (actualWorkTime <= 0) ? '' : `${hour}:${minute}`;

        // 出勤状況算出
        calcAttendanceStatus();
    };
    return inputTag;
}

/**
 * 時間表記を秒表記に変換する
 * @param {*} originalTime 
 */
function convertToSeconds(originalTime) {
    let secondTimes = originalTime.split(':');
    return Number(secondTimes[0]) * 60 * 60 + Number(secondTimes[1]) * 60;
}

/**
 * 数値入力セルを生成する
 * @returns {*} inputTag
 */
function createInputNumberCell() {
    let inputTag = document.createElement('input');
    inputTag.type = 'number';
    inputTag.className = 'number-input';
    inputTag.style.backgroundColor = 'transparent';
    inputTag.onchange = function () {
        let trList = document.getElementById("table-body").children;
        // 訪問数集計
        calcThreeSectionGenericCount(trList, [7, 8, 9], 'visits')

        // 休日・夜間・早朝数集計
        calcThreeSectionGenericCount(trList, [10, 11, 12], 'special')

        // 同行訪問数集計
        calcThreeSectionGenericCount(trList, [13, 14, 15], 'accompany-visits')

        // 日中緊急対応集計
        calcGenericCount(trList, 16, 'daytime-emergency');

        // 緊急携帯集計
        calcGenericCount(trList, 17, 'emergency-cell-phone');

        // 看取り集計
        calcGenericCount(trList, 18, 'eol-care');

        // エンゼルケア集計
        calcGenericCount(trList, 19, 'angel-care');

        // 計画書報告書枚数集計
        calcGenericCount(trList, 20, 'plan-reports');

        // 担会集計
        calcGenericCount(trList, 21, 'board-meeting');

        // CF集計
        calcGenericCount(trList, 22, 'cf');

        // 勉強会集計
        calcGenericCount(trList, 23, 'study');
    };
    return inputTag;
}

/**
 * ３セクション汎用数集計
 * 20分、40分、60分ずつで区切られた集計用
 * @param {*} trList 
 * @param {*} indices 
 * @param {string} elementName 
 */
function calcThreeSectionGenericCount(trList, indices, elementName) {
    // 20分集計数
    var count20 = null;
    // 40分集計数
    var count40 = null;
    // 60分集計数
    var count60 = null;

    for (let element of trList) {
        let count20Cell = element.children[indices[0]].firstElementChild;
        if (count20Cell.value) {
            count20 += parseInt(count20Cell.value);
        }
        let count40Cell = element.children[indices[1]].firstElementChild;
        if (count40Cell.value) {
            count40 += parseInt(count40Cell.value);
        }
        let count60Cell = element.children[indices[2]].firstElementChild;
        if (count60Cell.value) {
            count60 += parseInt(count60Cell.value);
        }
    }

    let total20Cell = document.getElementById(`${elementName}-20`);
    if (count20) {
        total20Cell.innerHTML = count20;
    } else {
        total20Cell.innerHTML = '';
    }
    let total40Cell = document.getElementById(`${elementName}-40`);
    if (count40) {
        total40Cell.innerHTML = count40;
    } else {
        total40Cell.innerHTML = '';
    }
    let total60Cell = document.getElementById(`${elementName}-60`);
    if (count60) {
        total60Cell.innerHTML = count60;
    } else {
        total60Cell.innerHTML = '';
    }
}

/**
 * 汎用数集計
 * @param {*} trList 
 * @param {number} index 
 * @param {string} elementName
 */
function calcGenericCount(trList, index, elementName) {
    var count = null;

    for (let element of trList) {
        let targetCell = element.children[index].firstElementChild;
        if (targetCell.value) {
            count += parseInt(targetCell.value);
        }
    }

    let totalCell = document.getElementById(elementName);
    if (count) {
        totalCell.innerHTML = count;
    } else {
        totalCell.innerHTML = '';
    }
}

/**
 * テキスト入力セルを生成する
 * @returns {*} inputTag
 */
function createInputTextCell() {
    let inputTag = document.createElement('textarea');
    inputTag.rows = 2;
    inputTag.className = 'text-input';
    inputTag.style.backgroundColor = 'transparent';
    return inputTag;
}

/**
 * 空のセルを生成する
 * @returns {*} divTag
 */
function createDivEmptyCell() {
    let divTag = document.createElement('div');
    divTag.className = 'actual-work';
    return divTag;
}


