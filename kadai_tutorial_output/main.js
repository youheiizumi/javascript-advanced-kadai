// letは変数の宣言
let untyped= '';
let typed = '';
let score = 0;

// getEでidのuntypedをjsにutfieldという固定値として導入 documentはDOM操作
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');//wrapのHTMLを持ってくる
const start = document.getElementById('start');//startボタンのHTMLを持ってくる
const count = document.getElementById('count');

// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];

// ランダムなテキストを表示
const createText = () => {
    typed = '';
    typedfield.textContent = typed;//入力をHTMLに画面表示

    //randomという変数＝Math.floorは整数に切り捨てる　Mathrandomは乱数発生　textListsのリスト数をかける
    let random = Math.floor(Math.random() * textLists.length);

    untyped = textLists[random];//untypedという変数にテキストリスト代入
    untypedfield.textContent = untyped;//テキストリストをHTMLに画面表示
};

const keyPress = e => {//keyPressという定数をeとする
    //誤タイプ
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add('mistyped');
        //100ms後に背景色をも度に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');//cssのmistypedの色を消す
        }, 100)
        return;
    }

    //正タイプ
    score++;
    wrap.classList.remove('mistyped');
    typed =　typed + untyped.substring(0,1);//untypedの一文字目をtypedにする
    untyped = untyped.substring(1);//untypedの残りを削除する
    typedfield.textContent = typed;//HTMLにtypedを代入
    untypedfield.textContent = untyped;//HTMLに代入

    if(untyped === ''){
        createText();//テキストがなくなったら新たなテキストを出す
    }
};
 
// タイピングスキルのランクを判定
const rankCheck = score => {

    let text ='';
    
    if(score <100){
    text = `あなたのランクはCです。\nBランクまであと${100-score}文字です。`
} else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }
 
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

       // OKボタンをクリックされたらリロードする
   if(result == true) {
    window.location.reload();
  }
}; 
   
// カウントダウンタイマー
const timer = () => { //timerという定数が以下のように変化

    //timeの変数にカウントを代入
    let time = count.textContent;

    //以下はカウントダウンの式
    const id = setInterval(() => {

        //timeが１づつ減っていく
        time--;
        count.textContent = time;

        //続き
        if(time <=0) {
            gameOver(id);
        }
    }, 1000);
};

//ゲームスタート時の処理
start.addEventListener('click',() => { //start idをクリックしたときに以下を開始

    //カウントダウンタイマー開始
    timer()
    
    //ランダムテキスト表示
    createText();

    //スタートボタンを非表示にする
    start.style.display = 'none';
    
    //キーボードのイベント処理
    document.addEventListener('keypress',keyPress);//keypressしたときに関数を返す
});

//処理を開始する前の表示
untypedfield.textContent = 'スタートボタンで開始'