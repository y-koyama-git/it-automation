//   Copyright 2019 NEC Corporation
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//

//////// ----コールバックファンクション ////////
function callback() {}
callback.prototype = {
    Filter1Tbl_add_selectbox : function( result ){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var filterAreaWrap = 'Filter1_Nakami';
        var strFilterPrintId = 'Filter1Tbl';
        var containerClassName = 'fakeContainer_Filter1Setting';

        var intMaxWidth = 650;

        var htmlSetExcute = true;
        var errMsgBody = '';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultSetTargetSeq = ary_result[2];
        var resultContentTag = ary_result[3];

        var objHtmlSetArea = $('#'+filterAreaWrap+' .'+resultSetTargetSeq).get()[0];

        if( objHtmlSetArea === null ){
            htmlSetExcute = false;
        }else{
            if( ary_result[0] != "000" ){
                htmlSetExcute = false;
                errMsgBody = ary_result[2];
            }
        }

        if( htmlSetExcute == true ){
            //----生成されたセレクトタグ、を埋め込み
            $(objHtmlSetArea).html(resultContentTag);
            //生成されたセレクトタグ、を埋め込み----

            addPullDownBox(filterAreaWrap, strFilterPrintId, intMaxWidth, resultSetTargetSeq, containerClassName);
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);
    },
    Filter1Tbl_reload : function( result ){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var filterAreaWrap = 'Filter1_Nakami';
        var strFilterPrintId = 'Filter1Tbl';

        var htmlSetExcute = true;
        var errMsgBody = '';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objTableArea=$('#'+filterAreaWrap+' .table_area').get()[0];

        if( objTableArea === null){
            htmlSetExcute = false;
        }else{
            if( ary_result[0] != "000" ){
                htmlSetExcute = false;
                errMsgBody = ary_result[2];
            }
        }

        if( htmlSetExcute == true ){
            objTableArea.innerHTML = resultContentTag;
            adjustTableAuto (strFilterPrintId,
                   "sDefault",
                   "fakeContainer_Filter1Setting",
                   webStdTableHeight,
                   webStdTableWidth );
            linkDateInputHelper(filterAreaWrap);
            if( ary_result[3]==1 ){
                Filter1Tbl_reset_filter(true);
            }
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);

        if( filter_on == false ){
            filter_on = true;
            if(initialFilter == 1){
                Filter1Tbl_search_async('orderFromFilterCmdBtn');
            }
        }
    },
    Filter1Tbl_recCount : function(result){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var strMixOuterFrameName = 'Mix1_Nakami';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];
        objAlertArea.style.display = "none";

        if( ary_result[0] == "000" ){
            if( ckRangeOfAlert(ary_result[2], webPrintRowLimit) ){
                window.alert(getSomeMessage("ITAWDCC90103",{0:webPrintRowLimit,1:ary_result[2]}));
                // Web表を表示しない
                Filter1Tbl_print_async(0);
            }else{
                if( ckRangeOfConfirm(ary_result[2] , webPrintRowConfirm, webPrintRowLimit) ){
                    if( window.confirm( getSomeMessage("ITAWDCC20201",{0:ary_result[2]})) ){
                        // Web表を表示する
                        Filter1Tbl_print_async(1);
                    }else{
                        // Web表を表示しない
                        Filter1Tbl_print_async(0);
                    }
                }else{
                    // Web表を表示する
                    Filter1Tbl_print_async(1);
                }
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = ary_result[2];
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);
    },
    Filter1Tbl_printTable : function(result){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var strMixOuterFrameName = 'Mix1_Nakami';
        var strMixInnerFramePrefix = 'Mix1_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];
        objAlertArea.style.display = "none";

        var objPrintArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

        if( ary_result[0] == "000" ){

            objPrintArea.innerHTML = resultContentTag;

            adjustTableAuto (strMixInnerFramePrefix+'1',
                            "sDefault",
                            "fakeContainer_Filter1Print",
                            webStdTableHeight,
                            webStdTableWidth );
            adjustTableAuto (strMixInnerFramePrefix+'2',
                            "sDefault",
                            "fakeContainer_ND_Filter1Sub",
                            webStdTableHeight,
                            webStdTableWidth );
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = ary_result[2];
            objAlertArea.style.display = "block";
            objPrintArea.innerHTML = "";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);
    },
    Mix1_1_updateTable : function( result ){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var strMixOuterFrameName = 'Mix1_Nakami';
        var strMixInnerFramePrefix = 'Mix1_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];

        if( ary_result[0] == "000" ){

            var objUpdateArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

            switch( ary_result[1] ){
                case "200":
                    // エラーなく更新完了
                case "100":
                    window.alert(ary_result[2]);
                    objUpdateArea.innerHTML = "";
                    Filter1Tbl_search_async();
                    break;
                default:
                    objUpdateArea.innerHTML="";
                    $(objUpdateArea).html(resultContentTag);
                    adjustTableAuto (strMixInnerFramePrefix+'1',
                                    "sDefault",
                                    "fakeContainer_Update1",
                                    webStdTableHeight,
                                    webStdTableWidth );

                    linkDateInputHelper(strMixOuterFrameName);
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            setInputButtonDisable(strMixOuterFrameName,'disableAfterPush',false);
        }else if( ary_result[0] == "003" ){
            var objUpdateArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];
            objUpdateArea.innerHTML="";
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }

        showForDeveloper(result);
    },
    Mix1_1_deleteTable : function( result ){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var strMixOuterFrameName = 'Mix1_Nakami';
        var strMixInnerFramePrefix = 'Mix1_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];

        if( ary_result[0] == "000" ){

            var objDeleteArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

            switch( ary_result[1] ){
                case "210":
                    // エラーなく廃止完了
                case "200":
                    // エラーなく復活完了
                case "100":
                    window.alert(resultContentTag);
                    objDeleteArea.innerHTML = "";
                    Filter1Tbl_search_async();
                    break;
                default:
                    objDeleteArea.innerHTML="";
                    objDeleteArea.insertAdjacentHTML("beforeend",resultContentTag);
                    adjustTableAuto (strMixInnerFramePrefix+'1',
                                    "sDefault",
                                    "fakeContainer_Delete1",
                                    webStdTableHeight,
                                    webStdTableWidth );
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            setInputButtonDisable(strMixOuterFrameName,'disableAfterPush',false);
        }else if( ary_result[0] == "003" ){
            var objDeleteArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];
            objDeleteArea.innerHTML="";
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }

        showForDeveloper(result);
    },
    Mix2_1_registerTable : function( result ){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var strMixOuterFrameName = 'Mix2_Nakami';
        var strMixInnerFramePrefix = 'Mix2_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];

        if( ary_result[0] == "000" ){

            var objRegiterArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

            switch( ary_result[1] ){
                case "100":
                    window.alert(resultContentTag);
                    objRegiterArea.innerHTML = "";
                    Filter1Tbl_search_async();
                    break;
                case "201":
                    // エラーなく登録完了
                default:
                    objRegiterArea.innerHTML="";
                    $(objRegiterArea).html(resultContentTag);

                    objAlertArea.style.display = "none";

                    adjustTableAuto (strMixInnerFramePrefix+'1',
                                    "sDefault",
                                    "fakeContainer_Register2",
                                    webStdTableHeight,
                                    webStdTableWidth );
                    linkDateInputHelper(strMixOuterFrameName);
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            setInputButtonDisable(strMixOuterFrameName,'disableAfterPush',false);
        }else if( ary_result[0] == "003" ){
            var objRegiterArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];
            objRegiterArea.innerHTML="";
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }

        showForDeveloper(result);
    },
    Journal1Tbl_printJournal : function( result ){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var strMixOuterFrameName = 'Journal1_Nakami';
        var strMixInnerFrame = 'Journal1Tbl';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];
        objAlertArea.style.display = "none";

        var objPrintArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

        if( ary_result[0] == "000" ){

            objPrintArea.innerHTML = resultContentTag;

            adjustTableAuto (strMixInnerFrame,
                            "sDefault",
                            "fakeContainer_Journal1Print",
                            webStdTableHeight,
                            webStdTableWidth );
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            objPrintArea.innerHTML = "";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);
    },
    Mix1_1_duplicate : function( result ){
        var strMixOuterFrameName = 'Mix2_Nakami';
        var strMixInnerFramePrefix = 'Mix2_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];

        if( ary_result[0] == "000" ){

            var objRegiterArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

            switch( ary_result[1] ){
                case "100":
                    window.alert(resultContentTag);
                    objRegiterArea.innerHTML = "";
                    Filter1Tbl_search_async();
                    break;
                case "201":
                    // エラーなく登録完了
                default:
                    objRegiterArea.innerHTML="";
                    $(objRegiterArea).html(resultContentTag);

                    objAlertArea.style.display = "none";

                    adjustTableAuto (strMixInnerFramePrefix+'1',
                                    "sDefault",
                                    "fakeContainer_Register2",
                                    webStdTableHeight,
                                    webStdTableWidth );
                    linkDateInputHelper(strMixOuterFrameName);
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            setInputButtonDisable(strMixOuterFrameName,'disableAfterPush',false);
        }else if( ary_result[0] == "003" ){
            var objRegiterArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];
            objRegiterArea.innerHTML="";
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }

        showForDeveloper(result);
    },
    //---- ここからカスタマイズした場合の[callback]メソッド配置域
    registerWorkspace : function(result){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        if(result == true){
            //登録成功通知メッセージ
            window.alert(getSomeMessage("ITATERRAFORM100014"));
            Filter1Tbl_search_async();

        }else{
            //登録失敗通知メッセージ
            window.alert(getSomeMessage("ITATERRAFORM100015"));
            Filter1Tbl_search_async();

        }
    },
    updateWorkspace : function(result){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        if(result == true){
            //更新成功通知メッセージ
            window.alert(getSomeMessage("ITATERRAFORM100016"));
            Filter1Tbl_search_async();

        }else{
            //更新失敗通知メッセージ
            window.alert(getSomeMessage("ITATERRAFORM100017"));
            Filter1Tbl_search_async();

        }
    },
    checkWorkspace : function(result){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        var resultAreaID = result[1];
        var resultMessage = result[2];
        var resultArea = $('#'+resultAreaID);

        //連携状態エリアにメッセージを挿入
        resultArea.html(resultMessage);

        //状態別にボタンを活性化
        if(result[3] == 1){
            //登録なしの場合
            resultArea.next('td').find('input').prop('disabled', false); //登録ボタン

        }else if(result[3] == 2){
            //登録済みの場合
            resultArea.next('td').next('td').next('td').find('input').prop('disabled', false); //削除ボタン
            resultArea.next('td').next('td').next('td').next('td').find('input').prop('disabled', false); //destroyボタン

        }else if(result[3] == 3){
            //更新ありの場合
            resultArea.next('td').next('td').find('input').prop('disabled', false); //更新ボタン
            resultArea.next('td').next('td').next('td').find('input').prop('disabled', false); //削除ボタン
            resultArea.next('td').next('td').next('td').next('td').find('input').prop('disabled', false); //destroyボタン

        }

        //ボタンの非活性を解除
        resultArea.prev('td').find('input').prop('disabled', false);

    },
    deleteWorkspace : function(result){
        // セッションチェック
        if ( typeof result == "string" ) {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        if(result == true){
            //削除成功通知メッセージ
            window.alert(getSomeMessage("ITATERRAFORM100018"));
            Filter1Tbl_search_async();

        }else{
            //削除失敗通知メッセージ
            window.alert(getSomeMessage("ITATERRAFORM100019"));
            Filter1Tbl_search_async();
        }
    },
    destroyWorkspaceInsRegister : function (result) {

        // セッションチェック
        if (typeof result == "string") {
            checkTypicalFlagInHADACResult(getArrayBySafeSeparator(result));
        }

        if (result[0] == true) {
            //タスク登録成功メッセージ
            //作業状態確認へ遷移
            let execution_no = result[1];
            if (typeof execution_no !== "undefined") {
                let menu_id = "2100080010";
                let url = '/default/menu/01_browse.php?no=' + menu_id + '&execution_no=' + execution_no;

                // 作業状態確認メニューに遷移
                location.href = url;
            }
        } else {
            //削除失敗通知メッセージ
            window.alert(getSomeMessage("ITATERRAFORM100031"));
            Filter1Tbl_search_async();
        }
    }
    // ここまでカスタマイズした場合の[callback]メソッド配置域----
}

//////// テーブルレイアウト設定 ////////
var pageType;
var privilege;
var initialFilterEl;
var initialFilter;
var webPrintRowLimit;
var webPrintRowConfirm;
var webStdTableWidth;
var webStdTableHeight;
var msgTmpl = {};
//////// 画面生成時に初回実行する処理 ////////

var proxy = new Db_Access(new callback());
var filter_on = false;

window.onload = function(){
    var filter1AreaWrap = 'Filter1_Nakami';
    pageType = document.getElementById('pageType').innerHTML;
    privilege = parseInt(document.getElementById('privilege').innerHTML);
    initialFilterEl = document.getElementById('sysInitialFilter');
    if(initialFilterEl == null){
        initialFilter = 2;
    }
    else{
        initialFilter = initialFilterEl.innerHTML;
    }
    webPrintRowConfirm = parseInt(document.getElementById('sysWebRowConfirm').innerHTML);
    webPrintRowLimit = parseInt(document.getElementById('sysWebRowLimit').innerHTML);
    webStdTableWidth = document.getElementById('webStdTableWidth').innerHTML;
    webStdTableHeight = document.getElementById('webStdTableHeight').innerHTML;
    // しばらくお待ち下さいを出す
    var objTableArea = $('#'+filter1AreaWrap+' .table_area').get()[0];
    objTableArea.innerHTML = "<div class=\"wait_msg\" >"+getSomeMessage("ITAWDCC10102")+"</div>";

    proxy.Filter1Tbl_reload(0);
// ----サイト個別、事前処理

// サイト個別、事前処理----

    // テーブル表示用領域に初期メッセ時を表示しておく
    //----※ここに一覧が表示されます。
    document.getElementById('table_area').innerHTML = getSomeMessage("ITAWDCC10101");

    if(privilege != 2){
        // 登録の初期HTMLを表示する
        show('Mix2_Midashi' ,'Mix2_Nakami'  );
        Mix2_1_register_async(0);
    }

// ----サイト個別、事前処理
// サイト個別、事前処理----


    show('SetsumeiMidashi'      ,'SetsumeiNakami'       );
    show('Mix1_Midashi'         ,'Mix1_Nakami'          );
    show('AllDumpMidashi'       ,'AllDumpNakami'        );
    show('Journal1_Midashi'     ,'Journal1_Nakami'      );

// ----サイト個別メニュー、ここから
// サイト個別メニュー、ここまで----

}

//////// コールバックファンクション---- ////////

//////// ----セレクトタグ追加ファンクション ////////
function Filter1Tbl_add_selectbox( show_seq ){
    proxy.Filter1Tbl_add_selectbox(show_seq);
}
//////// セレクトタグ追加ファンクション---- ////////

//////// ----表示フィルタリセット用ファンクション ////////
function Filter1Tbl_reset_filter(boolBack){
    // 検索条件をクリア(リセット)
    var filterAreaWrap = 'Filter1_Nakami';
    var strMixOuterFrameName = 'Mix1_Nakami';
    if( boolBack===true ){
        var objHyoujiFlag = $('#'+strMixOuterFrameName+' .hyouji_flag').get()[0];
        if( objHyoujiFlag != null ){
            // すでに一覧が表示されている場合（オートフィルタがonの場合、一覧を最新化する）
            var objFCSL = $('#'+filterAreaWrap+' .filter_ctl_start_limit').get()[0];
            if( objFCSL == null){
            }else{
                if( objFCSL.value == 'on' && objFCSL.checked == true ){
                    // タグが存在し、オートフィルタにチェックが入っている
                    //----再表示しますか？
                    if( window.confirm( getSomeMessage("ITAWDCC20204")) ){
                        Filter1Tbl_search_async();
                    }
                }
            }
        }
    }else{
        proxy.Filter1Tbl_reload(1);
    }
}
//////// 表示フィルタリセット用ファンクション---- ////////

//////// ----Filter1Tbl_search_asyncを呼ぶかどうか判断するファンクション ////////
function Filter1Tbl_pre_search_async(inputedCode){

    // ----Enterキーが押された場合
    if( inputedCode == 13 ){
        Filter1Tbl_search_async('keyInput13');
    }
    // Enterキーが押された場合----
}
//////// Filter1Tbl_search_asyncを呼ぶかどうか判断するファンクション---- ////////

//////// ----フィルタ結果表示呼出ファンクション[1] ////////
function Filter1Tbl_search_async( value1 ){

    var filterAreaWrap = 'Filter1_Nakami';
    var printAreaWrap = 'Mix1_Nakami';
    var printAreaHead = 'Mix1_Midashi';

    var exec_flag = true;

    // 引数を準備
    var filter_data = $("#"+filterAreaWrap+" :input").serializeArray();

    exec_flag = Filter1Tbl_search_control(exec_flag, value1);
    var objUpdTag = $('#'+printAreaWrap+' .editing_flag').get()[0];
    if ( objUpdTag != null ){
        // 更新系(更新/廃止/復活)モード中の場合はSELECTモードに戻っていいか尋ねる
        if( exec_flag == true ){
            //----メンテナンス中ですが中断してよろしいですか？
            if( !window.confirm( getSomeMessage("ITAWDCC20203") ) ){
                exec_flag = false;
            }
        }
    }

    if( exec_flag ){
        // 更新時アラート出力エリアをブランクにしたうえ非表示にする
        var objAlertArea=$('#'+printAreaWrap+' .alert_area').get()[0];
        objAlertArea.innerHTML = "";
        objAlertArea.style.display = "none";

        // テーブル表示用領域を一旦クリアする
        var objTableArea=$('#'+printAreaWrap+' .table_area').get()[0];
        //----※ここに一覧が表示されます。
        objTableArea.innerHTML = "";

        // テーブル表示用領域を開く
        if( checkOpenNow(printAreaWrap)===false ){
            show(printAreaHead, printAreaWrap);
        }

        // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
        restruct_for_IE();

        // proxy.Filter1Tbl_recCount実行
        proxy.Filter1Tbl_recCount(filter_data);
    }
}
//////// フィルタ結果表示呼出ファンクション[1]---- ////////

//////// ----フィルタ結果表示呼出ファンクション[2] ////////
function Filter1Tbl_search_control( exec_flag_var, value1 ){
    var filterAreaWrap = 'Filter1_Nakami';

    var exec_flag_ret = true;

    if( typeof(value1) == 'undefined' ){
        // value1がundefined型の場合
        exec_flag_ret = exec_flag_var;
    }else{
        if( exec_flag_var == false ){
            exec_flag_ret = false;
        }else{
            var objFCSL = $('#'+filterAreaWrap+' .filter_ctl_start_limit').get()[0];

            if(objFCSL == null){
                // 自動開始制御タグがない場合は、システムエラー扱い、とする。
                // システムエラーが発生しました。
                alert( getSomeMessage("ITAWDCC20205") );
                exec_flag_ret = false;
            }else{
                if( objFCSL.value == 'on' ){
                    // 自動開始制御タグが存在し、オートフィルタ開始の抑制が働いている可能性がある
                    exec_flag_ret = false;
                    if( value1 == 'orderFromFilterCmdBtn' ){
                        // フィルタボタンが押された場合、条件「なし」で開始----
                        exec_flag_ret = true;
                    }else if( value1 == 'idcolumn_filter_default' || value1 == 'keyInput13' ){
                        if( objFCSL.checked == true ){
                            // 自動開始制御タグが存在し、オートフィルタにチェックが入っている
                            exec_flag_ret = true;
                        }
                    }else{
                        exec_flag_ret = true;
                    }
                }
            }
        }
    }
    return exec_flag_ret;
}
//////// フィルタ結果表示呼出ファンクション[2]---- ////////

//////// ----検索条件指定用ファンクション ////////
function Filter1Tbl_print_async( intPrintMode ){

    var filterAreaWrap = 'Filter1_Nakami';
    var printAreaWrap = 'Mix1_Nakami';
    var printAreaHead = 'Mix1_Midashi';

    var filter_data=$('#'+filterAreaWrap+' :input').serializeArray();

    // テーブル表示用領域を開く
    if( checkOpenNow(printAreaWrap)===false ){
        show(printAreaHead, printAreaWrap);
    }

    // しばらくお待ち下さいを出す
    var objTableArea = $('#'+printAreaWrap+' .table_area').get()[0];
    objTableArea.innerHTML = "<div class=\"wait_msg\" >"+getSomeMessage("ITAWDCC10102")+"</div>";

    // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
    restruct_for_IE();

    // proxy.Filter1Tbl_printTable実行
    proxy.Filter1Tbl_printTable(intPrintMode, filter_data);
}
//////// 検索条件指定用ファンクション---- ////////

//////// ----登録初期画面に戻るかどうか判定するファンクション ////////
function Mix2_1_pre_register_async( mode ){

    //----登録中ですが中断してよろしいですか？
    if( window.confirm( getSomeMessage("ITAWDCC20202")) ){
        Mix2_1_register_async(0);
    }

}
//////// 登録初期画面に戻るかどうか判定するファンクション---- ////////

//////// ----登録画面遷移用ファンクション ////////
function Mix2_1_register_async( mode ){

    var registerAreaWrap = 'Mix2_Nakami';

    // アラート用エリアを初期化
    var objAlertArea = $('#'+registerAreaWrap+' .alert_area').get()[0];
    objAlertArea.innerHTML = '';
    objAlertArea.style.display = "none";

    // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
    restruct_for_IE();

    // アラートメッセージ格納変数を初期化
    var alt_str = '';

    // registerTableファンクション呼び出し要否フラグ
    var exec_flag = true;

    // モードによって動きを決定
    switch( mode ){
        case 0 :
            // 初期画面(mode=0)
            // 引数準備必要なし
            break;
        case 1 :
            // 登録フォーム画面(mode=1)
            // 引数準備必要なし
            break;
        case 2 :
            // 登録実行処理＆結果画面(mode=2)
            // 登録時のチェック
            //----登録を実行してよろしいですか？
            if( window.confirm(getSomeMessage("ITAWDCC20101")) == false ){
                exec_flag = false;
            }else{
                setInputButtonDisable(registerAreaWrap,'disableAfterPush',true);
            }
            break;
    }

    if( exec_flag ){
        // proxy.registerTable実行
        var registerData = $('#'+registerAreaWrap+' :input').serializeArray();

        proxy.Mix2_1_registerTable(mode, registerData);
    }
}
//////// 登録画面遷移用ファンクション---- ////////

//////// ----更新画面遷移用ファンクション ////////
function Mix1_1_update_async( mode, inner_seq, updateAreaName ){

    var updateAreaWrap = 'Mix1_Nakami';

    // アラートメッセージ格納変数を初期化
    var alt_str = '';
    // updateTableファンクション呼び出し要否フラグ
    var exec_flag = true;
    // モードによって動きを決定

    switch( mode ){
        case 1 :
            // 更新画面に遷移(mode=1)
            // アラート用エリアを初期化
            var objAlertArea = $('#'+updateAreaWrap+' .alert_area').get()[0];
            objAlertArea.innerHTML = '';
            objAlertArea.style.display = "none";

            // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
            restruct_for_IE();

            break;
        case 2 :
            // 更新画面から一覧に戻る(mode=2)
            // 呼び出し要否フラグをOFF
            exec_flag = false;

            // Filter1Tbl_search_asyncを呼び出し
            Filter1Tbl_search_async();

            break;
        case 3 :
            // 更新画面で実行を押下(mode=3)
            //----更新を実行してよろしいですか？
            if( window.confirm( getSomeMessage("ITAWDCC20102") ) ){
                // アラート用エリアを初期化
                var objAlertArea = $('#'+updateAreaWrap+' .alert_area').get()[0];
                objAlertArea.innerHTML = '';
                objAlertArea.style.display = "none";
                setInputButtonDisable(updateAreaWrap,'disableAfterPush',true);
                // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
                restruct_for_IE();
            }else{
                exec_flag = false;
            }
            break;
    }

    if(exec_flag){
        var updateData = $('#'+updateAreaWrap+' :input').serializeArray();
        //proxy.updateTable実行
        proxy.Mix1_1_updateTable( mode, inner_seq, updateData);
    }
}
//////// 更新画面遷移用ファンクション---- ////////

//////// ----削除画面遷移用ファンクション ////////
function Mix1_1_delete_async( mode, inner_seq ){
    //alert('wake-fx(Mix1_1_delete_async)');

    var deleteAreaWrap = 'Mix1_Nakami';

    // アラートメッセージ格納変数を初期化
    var alt_str = '';

    // deleteTableファンクション呼び出し要否フラグ
    var exec_flag = true;

    // モードによって動きを決定
    switch( mode ){
        case 1 :
            // 廃止画面に遷移(mode=1)
            // アラート用エリアを初期化
            var objAlertArea = $('#'+deleteAreaWrap+' .alert_area').get()[0];
            objAlertArea.innerHTML = '';
            objAlertArea.style.display = "none";

            // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
            restruct_for_IE();

            break;
        case 2 :
            // 廃止画面から一覧に戻る(mode=2)
            // 呼び出し要否フラグをOFF
            exec_flag = false;

            // Filter1Tbl_search_asyncを呼び出し
            Filter1Tbl_search_async();

            break;
        case 3 :
            // 廃止画面で実行を押下(mode=3)
            //----廃止してよろしいですか？
            if( window.confirm( getSomeMessage("ITAWDCC20103") ) ){
                // アラート用エリアを初期化
                var objAlertArea = $('#'+deleteAreaWrap+' .alert_area').get()[0];
                objAlertArea.innerHTML = '';
                objAlertArea.style.display = "none";
                setInputButtonDisable(deleteAreaWrap,'disableAfterPush',true);
                // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
                restruct_for_IE();

            }else{
                exec_flag = false;
            }

            break;
        case 4 :
            // 復活画面に遷移(mode=4)
            // アラート用エリアを初期化
            var objAlertArea = $('#'+deleteAreaWrap+' .alert_area').get()[0];
            objAlertArea.innerHTML = '';
            objAlertArea.style.display = "none";

            // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
            restruct_for_IE();

            break;
        case 5 :
            // 復活画面で実行を押下(mode=5)
            //----復活してよろしいですか？
            if( window.confirm( getSomeMessage("ITAWDCC20104") ) ){
                // アラート用エリアを初期化
                var objAlertArea = $('#'+deleteAreaWrap+' .alert_area').get()[0];
                objAlertArea.innerHTML = '';
                objAlertArea.style.display = "none";
                setInputButtonDisable(deleteAreaWrap,'disableAfterPush',true);

                // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
                restruct_for_IE();

            }else{
                exec_flag = false;
            }
            break;
    }

    if(exec_flag){
        var updateData = $('#'+deleteAreaWrap+' :input').serializeArray();
        // proxy.deleteTable実行
        proxy.Mix1_1_deleteTable(mode, inner_seq, updateData);
    }
}
//////// 削除画面遷移用ファンクション---- ////////

//////// ----履歴検索条件クリア(リセット)用ファンクション ////////
function Journal1Tbl_reset_query(){
    var journal1AreaWrap = 'Journal1_Nakami';
    // 検索条件をクリア(リセット)
    $('#'+journal1AreaWrap+' :input:not(:button)').each(function(){this.value=""});
}
//////// 履歴検索条件クリア(リセット)用ファンクション---- ////////

//////// ----search_journal_asyncを呼ぶかどうか判断するファンクション ////////
function Journal1Tbl_pre_search_async(inputedCode){
    if( inputedCode == 13 ){
        Journal1Tbl_search_async();
    }
}
//////// search_journal_asyncを呼ぶかどうか判断するファンクション---- ////////

//////// ----履歴検索条件指定用ファンクション ////////
function Journal1Tbl_search_async(){
    // 履歴検索実施フラグを初期化
    var journal1AreaWrap = 'Journal1_Nakami';

    var exec_flag = true;

    // 検索実施フラグがtrueの場合は検索実施
    if( exec_flag == true ){
        // しばらくお待ち下さいを出す
        var objTableArea = $('#'+journal1AreaWrap+' .table_area').get()[0];
        objTableArea.innerHTML = "<div class=\"wait_msg2\" >"+getSomeMessage("ITAWDCC10102")+"</div>";

        var filterData = $('#'+journal1AreaWrap+' :input:not(:button)').serializeArray();
        proxy.Journal1Tbl_printJournal(filterData);
    }
}
//////// 履歴検索条件指定用ファンクション---- ////////

//////// ----汎用系ファンクション ////////
function setInputButtonDisable(rangeId,targetClass,toValue){
    if(toValue === true){
        $('#'+rangeId+' .'+targetClass).attr("disabled",true);
    }else{
        $('#'+rangeId+' .'+targetClass).removeAttr("disabled");
    }
}
//////// 汎用系ファンクション---- ////////

//---- ここからカスタマイズした場合の一般メソッド配置域
//TFEとの状態チェックを実行
function Mix1_1_checkWorkspace(obj, workspaceID){
    //ボタンを非活性
    $(obj).attr('disabled', true);
    var resultAreaID = $(obj).closest('td').next().attr('id');
    //エンコード
    workspaceID = encodeURIComponent(workspaceID);
    var data = {
        'resultAreaID' : resultAreaID,
        'workspaceID' : workspaceID,
    };

    proxy.checkWorkspace(data);

}

//TFEへの登録を実行
function Mix1_1_registerWorkspace(obj, workspaceID){
    //ボタンを非活性
    $(obj).attr('disabled', true);
    //エンコード
    workspaceID = encodeURIComponent(workspaceID);
    var data = {
        'workspaceID' : workspaceID,
    };

    //登録実行確認メッセージ
    if( window.confirm(getSomeMessage("ITATERRAFORM100011"))){
        proxy.registerWorkspace(data);
    }

}

//TFEへの更新を実行
function Mix1_1_updateWorkspace(obj, workspaceID){
    //ボタンを非活性
    $(obj).attr('disabled', true);
    //エンコード
    workspaceID = encodeURIComponent(workspaceID);
    var data = {
        'workspaceID' : workspaceID,
    };

    //更新実行確認メッセージ
    if( window.confirm(getSomeMessage("ITATERRAFORM100012"))){
        proxy.updateWorkspace(data);
    }

}

//TFEからの削除を実行
function Mix1_1_deleteWorkspace(obj, workspaceID){
    //ボタンを非活性
    $(obj).attr('disabled', true);
    //エンコード
    workspaceID = encodeURIComponent(workspaceID);
    var data = {
        'workspaceID' : workspaceID,
    };

    //削除実行確認メッセージ
    if( window.confirm(getSomeMessage("ITATERRAFORM100013"))){
        proxy.deleteWorkspace(data);
    } else {
        $(obj).attr('disabled', false);
    }

}
function Mix1_1_destroyWorkspaceInsRegister(obj, workspaceID, workspaceName) {
    //ボタンを非活性
    $(obj).attr('disabled', true);
    //エンコード
    workspaceID = encodeURIComponent(workspaceID, workspaceName);
    var data = {
        'workspaceID': workspaceID,
        'workspaceName': workspaceName
    };

    let decordedWorkspaceName = decodeURIComponent(escape(atob(workspaceName)));

    //destroy実行確認メッセージ
    if (window.confirm(getSomeMessage("ITATERRAFORM100030", workspaceName))) {
        proxy.destroyWorkspaceInsRegister(data);
    } else {
        $(obj).attr('disabled', false);
    }
}
function Mix1_1_newOpenWindow(currentElement,currentText){
  var searchText = decodeURIComponent(escape(atob(currentText)));;
  var current_id = currentElement.offsetParent.id;
  var target_id = current_id.slice(0,current_id.lastIndexOf("_") + 1) + "5";
  var searchText1 = document.getElementById(target_id).children[0].innerText;
  var url = "01_browse.php?no=2100080004&filter=on&Filter1Tbl_5=" + searchText1 + ":" + searchText;
  window.open(url, '_blank');
}
function Mix1_1_newOpenWindow2(currentElement,currentText){
  var searchText = decodeURIComponent(escape(atob(currentText)));;
  var current_id = currentElement.offsetParent.id;
  var target_id = current_id.slice(0,current_id.lastIndexOf("_") + 1) + "5";
  var searchText1 = document.getElementById(target_id).children[0].innerText;
  var url = "01_browse.php?no=2100080014&filter=on&Filter1Tbl_3=" + searchText1 + ":" + searchText;
  window.open(url, '_blank');
}
// ここまでカスタマイズした場合の一般メソッド配置域----
