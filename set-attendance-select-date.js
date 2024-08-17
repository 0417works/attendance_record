/**
 * 出勤簿の年月選択処理
 */

// 選択年要素から開始年と終了年を取得しoptionタグを設定する
const selectTargetYear = document.getElementById('targetYear')
const yyyy = selectTargetYear.dataset.yyyy.split('-')

let startYear = parseInt(yyyy[0])
let lastYear  = parseInt(yyyy[1])

const appendYear = (startYear > lastYear ? -1 : 1)
for (let year = startYear; year != lastYear + appendYear; year += appendYear) {
    const optionYear = document.createElement('option')
    optionYear.setAttribute('value', `${year}`)
    optionYear.innerText = `${year}年`
    selectTargetYear.appendChild(optionYear)
}

// 選択年要素から開始月と終了月を取得
const selectTargetMonth = document.getElementById('targetMonth')
const mm = selectTargetMonth.dataset.mm.split('-')

let startMonth = parseInt(mm[0])
let lastMonth  = parseInt(mm[1])

// 初期選択値とする現在月を取得する
let today = new Date();
let currentMonth = today.getMonth() + 1;

// 表示する年月を要素に追加する
const appendMonth = (startMonth > lastMonth ? -1 : 1)
for (let month = startMonth; month != lastMonth + appendMonth; month += appendMonth) {
    const optionMonth = document.createElement('option')
    optionMonth.setAttribute('value', `${month}`)
    optionMonth.innerText = `${month}月`      
    if (month === currentMonth) {
        // 現在月と一致したら初期選択値とする
        optionMonth.setAttribute('selected', '');
    }  
    selectTargetMonth.appendChild(optionMonth)
}


