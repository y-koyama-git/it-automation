ALTER TABLE B_ANSIBLE_IF_INFO ADD COLUMN ANSIBLE_PROXY_ADDRESS VARCHAR(128) AFTER ANSIBLE_EXEC_OPTIONS;
ALTER TABLE B_ANSIBLE_IF_INFO ADD COLUMN ANSIBLE_PROXY_PORT INT AFTER ANSIBLE_PROXY_ADDRESS;
ALTER TABLE B_ANSIBLE_IF_INFO_JNL ADD COLUMN ANSIBLE_PROXY_ADDRESS VARCHAR(128) AFTER ANSIBLE_EXEC_OPTIONS;
ALTER TABLE B_ANSIBLE_IF_INFO_JNL ADD COLUMN ANSIBLE_PROXY_PORT INT AFTER ANSIBLE_PROXY_ADDRESS;

ALTER TABLE B_ANS_TWR_HOST MODIFY COLUMN ANSTWR_LOGIN_PASSWORD TEXT;
ALTER TABLE B_ANS_TWR_HOST_JNL MODIFY COLUMN ANSTWR_LOGIN_PASSWORD TEXT;


-- ------------------------------
-- -- Pioner LANGマスタ
-- ------------------------------
-- ----更新系テーブル作成
CREATE TABLE B_ANS_PNS_LANG_MASTER
(
ID                                INT                              ,

NAME                              VARCHAR (64)                     ,

DISP_SEQ                          INT                              , -- 表示順序
ACCESS_AUTH                       TEXT                             ,
NOTE                              VARCHAR (4000)                   , -- 備考
DISUSE_FLAG                       VARCHAR (1)                      , -- 廃止フラグ
LAST_UPDATE_TIMESTAMP             DATETIME(6)                      , -- 最終更新日時
LAST_UPDATE_USER                  INT                              , -- 最終更新ユーザ

PRIMARY KEY (ID)
)ENGINE = InnoDB, CHARSET = utf8, COLLATE = utf8_bin, ROW_FORMAT=COMPRESSED ,KEY_BLOCK_SIZE=8;
-- 更新系テーブル作成----

-- ----履歴系テーブル作成
CREATE TABLE B_ANS_PNS_LANG_MASTER_JNL
(
JOURNAL_SEQ_NO                    INT                              , -- 履歴用シーケンス
JOURNAL_REG_DATETIME              DATETIME(6)                      , -- 履歴用変更日時
JOURNAL_ACTION_CLASS              VARCHAR (8)                      , -- 履歴用変更種別
ID                                INT                              ,

NAME                              VARCHAR (64)                     ,

DISP_SEQ                          INT                              , -- 表示順序
ACCESS_AUTH                       TEXT                             ,
NOTE                              VARCHAR (4000)                   , -- 備考
DISUSE_FLAG                       VARCHAR (1)                      , -- 廃止フラグ
LAST_UPDATE_TIMESTAMP             DATETIME(6)                      , -- 最終更新日時
LAST_UPDATE_USER                  INT                              , -- 最終更新ユーザ
PRIMARY KEY(JOURNAL_SEQ_NO)
)ENGINE = InnoDB, CHARSET = utf8, COLLATE = utf8_bin, ROW_FORMAT=COMPRESSED ,KEY_BLOCK_SIZE=8;
-- 履歴系テーブル作成----


CREATE OR REPLACE VIEW D_ANSIBLE_TOWER_IF_INFO AS 
SELECT 
  TAB_A.*,
  TAB_B.ANSTWR_HOSTNAME,
  TAB_B.ANSTWR_LOGIN_AUTH_TYPE,
  TAB_B.ANSTWR_LOGIN_USER,
  TAB_B.ANSTWR_LOGIN_PASSWORD,
  TAB_B.ANSTWR_LOGIN_SSH_KEY_FILE,
  TAB_B.ANSTWR_LOGIN_SSH_KEY_FILE_PASSPHRASE,
  TAB_B.ANSTWR_ISOLATED_TYPE
FROM
  B_ANSIBLE_IF_INFO           TAB_A
  LEFT JOIN (
             SELECT * 
             FROM B_ANS_TWR_HOST 
             WHERE DISUSE_FLAG = '0'
            ) TAB_B ON ( TAB_A.ANSTWR_HOST_ID = TAB_B.ANSTWR_HOST_ID );
  
CREATE OR REPLACE VIEW D_ANSIBLE_TOWER_IF_INFO_JNL AS 
SELECT 
  TAB_A.*,
  TAB_B.ANSTWR_HOSTNAME,
  TAB_B.ANSTWR_LOGIN_AUTH_TYPE,
  TAB_B.ANSTWR_LOGIN_USER,
  TAB_B.ANSTWR_LOGIN_PASSWORD,
  TAB_B.ANSTWR_LOGIN_SSH_KEY_FILE,
  TAB_B.ANSTWR_LOGIN_SSH_KEY_FILE_PASSPHRASE,
  TAB_B.ANSTWR_ISOLATED_TYPE
FROM
  B_ANSIBLE_IF_INFO_JNL         TAB_A
  LEFT JOIN (
             SELECT * 
             FROM B_ANS_TWR_HOST_JNL
             WHERE DISUSE_FLAG = '0'
            ) TAB_B ON ( TAB_A.ANSTWR_HOST_ID = TAB_B.ANSTWR_HOST_ID );


INSERT INTO A_SEQUENCE (NAME,VALUE,MENU_ID,DISP_SEQ,NOTE,LAST_UPDATE_TIMESTAMP) VALUES('B_ANS_PNS_LANG_MASTER_RIC',3,NULL,2100290027,NULL,STR_TO_DATE('2015/04/01 10:00:00.000000','%Y/%m/%d %H:%i:%s.%f'));

INSERT INTO A_SEQUENCE (NAME,VALUE,MENU_ID,DISP_SEQ,NOTE,LAST_UPDATE_TIMESTAMP) VALUES('B_ANS_PNS_LANG_MASTER_JSQ',3,NULL,2100290028,'for the history table.',STR_TO_DATE('2015/04/01 10:00:00.000000','%Y/%m/%d %H:%i:%s.%f'));
