/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 10.3.11-MariaDB : Database - 23guess
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`23guess` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `23guess`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `pid` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '玩家ID',
  `account` varchar(64) NOT NULL COMMENT '玩家账号',
  `password` varchar(20) DEFAULT NULL COMMENT '账号密码',
  `platform` tinyint(3) unsigned NOT NULL COMMENT '玩家平台',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `const_platform` */

DROP TABLE IF EXISTS `const_platform`;

CREATE TABLE `const_platform` (
  `platform_id` tinyint(3) unsigned NOT NULL COMMENT '平台ID',
  `platform_name` varchar(20) NOT NULL COMMENT '平台名称',
  PRIMARY KEY (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `const_prop` */

DROP TABLE IF EXISTS `const_prop`;

CREATE TABLE `const_prop` (
  `prop_id` smallint(5) unsigned NOT NULL COMMENT '道具ID',
  `prop_name` varchar(20) NOT NULL COMMENT '道具名称',
  PRIMARY KEY (`prop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `player` */

DROP TABLE IF EXISTS `player`;

CREATE TABLE `player` (
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `nickname` varchar(32) NOT NULL COMMENT '玩家昵称',
  `level` smallint(5) unsigned NOT NULL COMMENT '玩家皇冠等级',
  `win_loss` bigint(20) NOT NULL COMMENT '游戏输赢金额',
  `coin_sum` bigint(20) unsigned NOT NULL COMMENT '游戏所玩总金额',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `prop` */

DROP TABLE IF EXISTS `prop`;

CREATE TABLE `prop` (
  `pid` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `prop_id` smallint(5) unsigned NOT NULL COMMENT '道具ID',
  `prop_count` bigint(20) NOT NULL COMMENT '道具数量',
  PRIMARY KEY (`pid`,`prop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Procedure structure for procedure `sp_login` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_login` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_login`(
	IN p_account VARCHAR(64),	# 账号
	in p_nickname varchar(20),	# 昵称，微信平台注册有效
	IN p_password VARCHAR(20),	# 密码，官方平台有效
	IN p_platform_id TINYINT	# 平台
    )
    MODIFIES SQL DATA
    COMMENT '登录'
label:BEGIN
	# 第一返回集：{return} (1:成功 2:账号不存在 3:密码错误 4:参数错误)
	# 第二返回集：玩家角色信息
	# 第三返回集：玩家道具列表
	
	DECLARE v_pid BIGINT DEFAULT 0;
	DECLARE v_password VARCHAR(20) DEFAULT '';
	
	# 判断参数
	IF p_account = '' OR NOT EXISTS(SELECT * FROM 23guess.`const_platform` WHERE platform_id = p_platform_id) THEN
		SELECT 4 AS 'return';
		LEAVE label;
	END IF;
	
	# 获得角色信息
	SELECT pid, `password` INTO v_pid, v_password FROM 23guess.`account` 
	WHERE account = p_account AND platform = p_platform_id LIMIT 1;
	
	# 检查账号是否存在
	IF v_pid = 0 THEN
		IF p_platform_id = 2 THEN
			INSERT INTO 23guess.`account` VALUES(NULL, p_account, '', p_platform_id);
			SET v_pid = LAST_INSERT_ID();
			if p_nickname != '' then
				if not EXISTS(SELECT * FROM 23guess.`player` WHERE nickname = p_nickname) then
					INSERT INTO 23guess.`player` VALUES(v_pid, p_nickname, 0, 0, 0);
				else
					INSERT INTO 23guess.`player` VALUES(v_pid, CONCAT(p_nickname, HEX(v_pid)), 0, 0, 0);
				end if;
			else
				INSERT INTO 23guess.`player` VALUES(v_pid, CONCAT(SUBSTRING(MD5(RAND()),1,2), HEX(v_pid)), 0, 0, 0);
			end if;
			
		ELSE
			SELECT 2 AS 'return';
			LEAVE label;
		END IF;
	END IF;
	
	# 检查密码是否正确
	IF p_platform_id = 1 AND v_password != p_password THEN
		SELECT 3 AS 'return';
		LEAVE label;
	END IF;
	
	# 返回成功标识
	SELECT 1 AS 'return';
	
	# 返回角色信息
	SELECT a.pid, a.account, a.password, b.nickname, a.platform, b.level, b.win_loss, b.coin_sum
	FROM 23guess.`account` a INNER JOIN 23guess.`player` b ON a.pid = b.pid
	WHERE a.pid = v_pid;
	
	# 返回道具列表
	SELECT prop_id, prop_count FROM 23guess.`prop` WHERE pid = v_pid;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_query_player` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_query_player` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_query_player`(
	IN p_pid_list VARCHAR(1000)	# 玩家PID列表
    )
    READS SQL DATA
    COMMENT '获取玩家信息'
label:BEGIN
	DECLARE v_sql varchar(1100);
	SET v_sql = concat('SELECT pid, nickname FROM 23guess.player WHERE pid IN(', p_pid_list, ')', ' ORDER BY FIELD (pid,', p_pid_list, ');');
	PREPARE stmt FROM v_sql;  
	EXECUTE stmt;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_update_player` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_update_player` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_update_player`(
		in p_pid bigint,		# 玩家ID
		in p_prop_id varchar(50),	# 道具ID（'id,id,id,'）
		in p_prop_count VARCHAR(100),	# 道具数量（'count,count,count,'）
		in p_level smallint,		# 玩家皇冠等级
		in p_win_loss bigint,		# 游戏输赢金额
		in p_coin_sum bigint		# 游戏所玩总金额
	)
    MODIFIES SQL DATA
    COMMENT '修改玩家信息'
label:BEGIN
	# 返回{return} 0:成功 1:玩家ID不存在 2:参数错误 3:执行错误
	
	DECLARE v_id_pos INT DEFAULT 0;
	DECLARE v_count_pos INT DEFAULT 0;
	DECLARE v_prop_id BIGINT DEFAULT 0;
	DECLARE v_prop_count BIGINT DEFAULT 0;
	
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
	    ROLLBACK; SELECT 3 AS 'return';
	END;
	
	# 判断玩家ID是否存在
	IF p_pid <= 0 OR NOT EXISTS(SELECT * FROM 23guess.`account` WHERE pid = p_pid) THEN
		SELECT 1 AS 'return'; LEAVE label;
	END IF;
	
	START TRANSACTION;
	while_label: BEGIN
	WHILE LENGTH(p_prop_id) > 0 and LENGTH(p_prop_count) > 0 DO
		set v_id_pos = POSITION(',' IN p_prop_id);
		SET v_count_pos = POSITION(',' IN p_prop_count);
		if (v_id_pos = 0 or v_count_pos = 0) then
			LEAVE while_label;
		end if;
		
		# 得到数据
		set v_prop_id = CAST(SUBSTRING(p_prop_id, 1, v_id_pos - 1) as SIGNED);
		set v_prop_count = CAST(SUBSTRING(p_prop_count, 1, v_count_pos - 1) AS SIGNED);
		set p_prop_id = SUBSTRING(p_prop_id, v_id_pos + 1, LENGTH(p_prop_id) - v_id_pos);
		SET p_prop_count = SUBSTRING(p_prop_count, v_count_pos + 1, LENGTH(p_prop_count) - v_count_pos);
	
		# 判断参数
		if not exists(SELECT * FROM 23guess.`const_prop` WHERE prop_id = v_prop_id) then
			ROLLBACK; SELECT 2 AS 'return'; LEAVE label;
		end if;
		
		# 修改道具数量
		INSERT INTO 23guess.`prop`(pid, prop_id, prop_count) value(p_pid, v_prop_id, v_prop_count)
		ON DUPLICATE KEY UPDATE prop_count = v_prop_count;
	END WHILE;
	END while_label;
	
	update 23guess.`player` set `level` = p_level, win_loss = p_win_loss, coin_sum = p_coin_sum where pid = p_pid;
	
	COMMIT;
	
	# 返回成功标识
	SELECT 0 AS 'return';
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_zz_alter_name` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_zz_alter_name` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_zz_alter_name`()
    MODIFIES SQL DATA
    COMMENT '修改测试账号昵称'
label:BEGIN
	UPDATE 23guess.`player` SET nickname = '仰脸等巴掌' WHERE pid = 100;
	UPDATE 23guess.`player` SET nickname = 'winner' WHERE pid = 101;
	UPDATE 23guess.`player` SET nickname = '他是天' WHERE pid = 102;
	UPDATE 23guess.`player` SET nickname = '韩翠梅' WHERE pid = 103;
	UPDATE 23guess.`player` SET nickname = '该用户已成仙' WHERE pid = 104;
	UPDATE 23guess.`player` SET nickname = '我在等祢等我' WHERE pid = 105;
	UPDATE 23guess.`player` SET nickname = '北巷以北' WHERE pid = 106;
	UPDATE 23guess.`player` SET nickname = '员曦之' WHERE pid = 107;
	UPDATE 23guess.`player` SET nickname = '忘了挽留' WHERE pid = 108;
	UPDATE 23guess.`player` SET nickname = '蒙面超人23' WHERE pid = 109;
	UPDATE 23guess.`player` SET nickname = '久别爱' WHERE pid = 110;
	UPDATE 23guess.`player` SET nickname = '野枫' WHERE pid = 111;
	UPDATE 23guess.`player` SET nickname = '一群辣鸡' WHERE pid = 112;
	UPDATE 23guess.`player` SET nickname = '牛市要来了' WHERE pid = 113;
	UPDATE 23guess.`player` SET nickname = '柔华' WHERE pid = 114;
	UPDATE 23guess.`player` SET nickname = 'Ning吥哭' WHERE pid = 115;
	UPDATE 23guess.`player` SET nickname = '傾旎' WHERE pid = 116;
	UPDATE 23guess.`player` SET nickname = '请记得我' WHERE pid = 117;
	UPDATE 23guess.`player` SET nickname = '活得潇洒' WHERE pid = 118;
	UPDATE 23guess.`player` SET nickname = '漆元思' WHERE pid = 119;
	UPDATE 23guess.`player` SET nickname = '小熙' WHERE pid = 120;
	UPDATE 23guess.`player` SET nickname = '答翰池' WHERE pid = 121;
	UPDATE 23guess.`player` SET nickname = '风落尘' WHERE pid = 122;
	UPDATE 23guess.`player` SET nickname = '我贱故我在' WHERE pid = 123;
	UPDATE 23guess.`player` SET nickname = 'e酷公子' WHERE pid = 124;
	UPDATE 23guess.`player` SET nickname = '梦尘缘' WHERE pid = 125;
	UPDATE 23guess.`player` SET nickname = '想赢就别怕输' WHERE pid = 126;
	UPDATE 23guess.`player` SET nickname = '孟茂' WHERE pid = 127;
	UPDATE 23guess.`player` SET nickname = '花心不是罪' WHERE pid = 128;
	UPDATE 23guess.`player` SET nickname = '尔虞我诈' WHERE pid = 129;
	UPDATE 23guess.`player` SET nickname = '甲珑玲' WHERE pid = 130;
	UPDATE 23guess.`player` SET nickname = '看你没个够' WHERE pid = 131;
	UPDATE 23guess.`player` SET nickname = '不凌不乱' WHERE pid = 132;
	UPDATE 23guess.`player` SET nickname = '帅比界扛把子' WHERE pid = 133;
	UPDATE 23guess.`player` SET nickname = '37我来了' WHERE pid = 134;
	UPDATE 23guess.`player` SET nickname = 'dfkxce' WHERE pid = 135;
	UPDATE 23guess.`player` SET nickname = '修皓' WHERE pid = 136;
	UPDATE 23guess.`player` SET nickname = '安泽熙' WHERE pid = 137;
	UPDATE 23guess.`player` SET nickname = '灰太狼' WHERE pid = 138;
	UPDATE 23guess.`player` SET nickname = '373737' WHERE pid = 139;
	UPDATE 23guess.`player` SET nickname = 'rtkkrt' WHERE pid = 140;
	UPDATE 23guess.`player` SET nickname = '那么骄傲' WHERE pid = 141;
	UPDATE 23guess.`player` SET nickname = '公羊雨柏' WHERE pid = 142;
	UPDATE 23guess.`player` SET nickname = '月下独酌求醉' WHERE pid = 143;
	UPDATE 23guess.`player` SET nickname = '人帅流言多' WHERE pid = 144;
	UPDATE 23guess.`player` SET nickname = 'pppppp' WHERE pid = 145;
	UPDATE 23guess.`player` SET nickname = '不羁且动人' WHERE pid = 146;
	UPDATE 23guess.`player` SET nickname = '臭豆腐西施' WHERE pid = 147;
	UPDATE 23guess.`player` SET nickname = '迟孤丹' WHERE pid = 148;
	UPDATE 23guess.`player` SET nickname = 'A_dar6' WHERE pid = 149;
	UPDATE 23guess.`player` SET nickname = '舍与得' WHERE pid = 150;
	UPDATE 23guess.`player` SET nickname = '宇g' WHERE pid = 151;
	UPDATE 23guess.`player` SET nickname = '伊人回眸' WHERE pid = 152;
	UPDATE 23guess.`player` SET nickname = '承鸿信' WHERE pid = 153;
	UPDATE 23guess.`player` SET nickname = '哈利波特大' WHERE pid = 154;
	UPDATE 23guess.`player` SET nickname = '少男春梦' WHERE pid = 155;
	UPDATE 23guess.`player` SET nickname = '海绵滴宝宝' WHERE pid = 156;
	UPDATE 23guess.`player` SET nickname = '百年二货' WHERE pid = 157;
	UPDATE 23guess.`player` SET nickname = '王者包工头' WHERE pid = 158;
	UPDATE 23guess.`player` SET nickname = '够狠才能赢' WHERE pid = 159;
	UPDATE 23guess.`player` SET nickname = '净铅华' WHERE pid = 160;
	UPDATE 23guess.`player` SET nickname = '喷他Q' WHERE pid = 161;
	UPDATE 23guess.`player` SET nickname = '恋无可恋' WHERE pid = 162;
	UPDATE 23guess.`player` SET nickname = 'TOP龙王' WHERE pid = 163;
	UPDATE 23guess.`player` SET nickname = '浅梨绾歌' WHERE pid = 164;
	UPDATE 23guess.`player` SET nickname = '请你深信不疑' WHERE pid = 165;
	UPDATE 23guess.`player` SET nickname = '双秋白' WHERE pid = 166;
	UPDATE 23guess.`player` SET nickname = '陈欧巴i' WHERE pid = 167;
	UPDATE 23guess.`player` SET nickname = '国产小仙女' WHERE pid = 168;
	UPDATE 23guess.`player` SET nickname = '吧唧吧唧' WHERE pid = 169;
	UPDATE 23guess.`player` SET nickname = '生命在于炫耀' WHERE pid = 170;
	UPDATE 23guess.`player` SET nickname = '我不安的心脏' WHERE pid = 171;
	UPDATE 23guess.`player` SET nickname = '倪冠' WHERE pid = 172;
	UPDATE 23guess.`player` SET nickname = '小东123' WHERE pid = 173;
	UPDATE 23guess.`player` SET nickname = '树侠' WHERE pid = 174;
	UPDATE 23guess.`player` SET nickname = '化腐朽为绵掌' WHERE pid = 175;
	UPDATE 23guess.`player` SET nickname = '青春就要给力' WHERE pid = 176;
	UPDATE 23guess.`player` SET nickname = '相见欢' WHERE pid = 177;
	UPDATE 23guess.`player` SET nickname = '俞星辰' WHERE pid = 178;
	UPDATE 23guess.`player` SET nickname = '我不会发光' WHERE pid = 179;
	UPDATE 23guess.`player` SET nickname = '遺莣' WHERE pid = 180;
	UPDATE 23guess.`player` SET nickname = '楼主果然很贱' WHERE pid = 181;
	UPDATE 23guess.`player` SET nickname = '帅的被人打' WHERE pid = 182;
	UPDATE 23guess.`player` SET nickname = '一坨肥兔yo' WHERE pid = 183;
	UPDATE 23guess.`player` SET nickname = '皇南霜' WHERE pid = 184;
	UPDATE 23guess.`player` SET nickname = '酒品人生' WHERE pid = 185;
	UPDATE 23guess.`player` SET nickname = '唐门帅哥' WHERE pid = 186;
	UPDATE 23guess.`player` SET nickname = '无意惹红颜' WHERE pid = 187;
	UPDATE 23guess.`player` SET nickname = '北斗星De爱' WHERE pid = 188;
	UPDATE 23guess.`player` SET nickname = '112233' WHERE pid = 189;
	UPDATE 23guess.`player` SET nickname = '小败家' WHERE pid = 190;
	UPDATE 23guess.`player` SET nickname = '帅到没朋友' WHERE pid = 191;
	UPDATE 23guess.`player` SET nickname = '爱吃喵的鱼' WHERE pid = 192;
	UPDATE 23guess.`player` SET nickname = '半世倾尘' WHERE pid = 193;
	UPDATE 23guess.`player` SET nickname = '风情加万种' WHERE pid = 194;
	UPDATE 23guess.`player` SET nickname = '局外人永远的' WHERE pid = 195;
	UPDATE 23guess.`player` SET nickname = '孩儿们好' WHERE pid = 196;
	UPDATE 23guess.`player` SET nickname = '昆字上下读' WHERE pid = 197;
	UPDATE 23guess.`player` SET nickname = '哥很妖娆' WHERE pid = 198;
	UPDATE 23guess.`player` SET nickname = '狸' WHERE pid = 199;
	UPDATE 23guess.`player` SET nickname = '正正' WHERE pid = 200;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_zz_register` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_zz_register` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_zz_register`()
    MODIFIES SQL DATA
    COMMENT '注册内部账户'
label:BEGIN
	DECLARE v_i INT UNSIGNED DEFAULT 1;
	DECLARE v_pid BIGINT DEFAULT 0;
	DECLARE v_account VARCHAR(20) DEFAULT '';
	DECLARE v_nickname VARCHAR(20) DEFAULT '';
	DECLARE v_account_title VARCHAR(20) DEFAULT 'zztest';
	DECLARE v_nickname_title VARCHAR(20) DEFAULT 'zz测试号';
	
	WHILE v_i <= 200 DO
		SET v_account = CONCAT(v_account_title, v_i);
		SET v_nickname = CONCAT(v_nickname_title, v_i);
		INSERT INTO 23guess.`account` VALUES (NULL, v_account, '37Zz123456', 1);
		SET v_pid = LAST_INSERT_ID();
		INSERT INTO 23guess.`player` VALUES (v_pid, v_nickname, 0, 0, 0);
		SET v_i = v_i + 1;
	END WHILE;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_zz_update_prop` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_zz_update_prop` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `sp_zz_update_prop`()
    MODIFIES SQL DATA
    COMMENT '更新测试账号金币'
label:BEGIN
	DECLARE v_pid INT UNSIGNED DEFAULT 100;
	WHILE v_pid <= 200 DO
		INSERT INTO 23guess.`prop`(pid, prop_id, prop_count)
		VALUES(v_pid, 1, 100000000000)
		ON DUPLICATE KEY UPDATE prop_count = VALUES(prop_count);
		SET v_pid = v_pid + 1;
	END WHILE;
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
