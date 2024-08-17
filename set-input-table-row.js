/**
 * 出勤簿テーブル入力欄を生成する
 */

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
    const ATTENDANCE_STATUS = ["-", "出勤", "公休", "夏休", "有休", "欠勤"];
    let selectTag = document.createElement('select');
    selectTag.rel = 'stylesheet';
    selectTag.style.border = 'none';
    selectTag.style.backgroundColor = 'transparent';
    ATTENDANCE_STATUS.forEach((status, index) => {
        let optionTag = document.createElement('option');
        optionTag.text = status;
        optionTag.value = index;
        selectTag.appendChild(optionTag);
    });
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
            case 2: // 公休
                // 赤
                changeColor = 'pink';
                break;
            case 3: // 夏休
            case 4: // 有休
                // グレー
                changeColor = 'gray';
                break;
            case 5: // 欠勤
                // 青
                changeColor = 'lightblue';
                break;
        }    
        trTag.style.backgroundColor = changeColor;
    };
    return selectTag;
}

/**
 * マウスオーバー時の背景を変更する
 */
function mouseOverEvent() {
    this.style.backgroundColor = 'aqua';
}

/**
 * マウスオーバー外れた時に背景を変更する
 */
function mouseLeaveEvent() {
    this.style.backgroundColor = 'transparent';
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
            let splitStartTimes = startTime.split(':');
            secondStartTime = Number(splitStartTimes[0]) * 60 * 60 + Number(splitStartTimes[1]) * 60;
        }
        var secondEndTime = 0;
        if (typeof endTime !== "undefined") {
            console.log(endTime);
            let splitEndTimes = endTime.split(':');
            secondEndTime = Number(splitEndTimes[0]) * 60 * 60 + Number(splitEndTimes[1]) * 60;
        }
        var secondSRestTime = 0;        
        if (typeof restTime !== "undefined") {
            let splitRestTimes = restTime.split(':');
            secondSRestTime = Number(splitRestTimes[0]) * 60 * 60 + Number(splitRestTimes[1]) * 60;
        }

        // 実働時間の算出
        let actualWorkTime = secondEndTime - secondStartTime - secondSRestTime;
        var hour = Math.floor(Math.abs(actualWorkTime) / 3600);
        var minute = Math.floor(Math.abs(actualWorkTime) % 3600 / 60);

        // 2桁の０埋め表示にする
        hour = ('00' + hour).slice(-2);
        minute = ('00' + minute).slice(-2);        
        divTag.innerHTML = (actualWorkTime <= 0) ? '' : hour + ':' + minute;
    };
    return inputTag;
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
    return inputTag;
}

/**
 * テキスト入力セルを生成する
 * @returns {*} inputTag
 */
function createInputTextCell() {
    let inputTag = document.createElement('input');
    inputTag.type = 'text';
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


