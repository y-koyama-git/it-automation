UPDATE A_ACCOUNT_LIST SET MAIL_ADDRESS = '' WHERE MAIL_ADDRESS = 'sample@xxx.bbb.ccc';
UPDATE A_ACCOUNT_LIST_JNL SET MAIL_ADDRESS = '' WHERE MAIL_ADDRESS = 'sample@xxx.bbb.ccc';


UPDATE B_LOGIN_AUTH_TYPE SET LOGIN_AUTH_TYPE_NAME='鍵認証(パスフレーズなし)' WHERE LOGIN_AUTH_TYPE_ID=1;
UPDATE B_LOGIN_AUTH_TYPE_JNL SET LOGIN_AUTH_TYPE_NAME='鍵認証(パスフレーズなし)' WHERE LOGIN_AUTH_TYPE_ID=1;

UPDATE B_LOGIN_AUTH_TYPE SET LOGIN_AUTH_TYPE_NAME='鍵認証(鍵交換済み)' WHERE LOGIN_AUTH_TYPE_ID=3;
UPDATE B_LOGIN_AUTH_TYPE_JNL SET LOGIN_AUTH_TYPE_NAME='鍵認証(鍵交換済み)' WHERE LOGIN_AUTH_TYPE_ID=3;

UPDATE B_LOGIN_AUTH_TYPE SET LOGIN_AUTH_TYPE_NAME='パスワード認証(winrm)' WHERE LOGIN_AUTH_TYPE_ID=5;
UPDATE B_LOGIN_AUTH_TYPE_JNL SET LOGIN_AUTH_TYPE_NAME='パスワード認証(winrm)' WHERE LOGIN_AUTH_TYPE_ID=5;
