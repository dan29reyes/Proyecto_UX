-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=1;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=1;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema admin_tablero
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema admin_tablero
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `admin_tablero` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `admin_tablero` ;

-- -----------------------------------------------------
-- Table `admin_tablero`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(20) NOT NULL,
  `correo_usuario` VARCHAR(40) NOT NULL,
  `password_usuario` VARCHAR(25) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `FK_usuario_uc_idx` (`usuario_creador` ASC, `usuario_editor` ASC) VISIBLE,
  INDEX `FK_usuario_ue_idx` (`usuario_editor` ASC) VISIBLE,
  CONSTRAINT `FK_usuario_uc`
    FOREIGN KEY (`usuario_creador`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`),
  CONSTRAINT `FK_usuario_ue`
    FOREIGN KEY (`usuario_editor`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admin_tablero`.`tablero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`tablero` (
  `id_tablero` INT NOT NULL AUTO_INCREMENT,
  `nombre_tablero` VARCHAR(45) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_tablero`),
  INDEX `FK_tablero_uc_idx` (`usuario_creador` ASC) VISIBLE,
  INDEX `FK_tablero_ue_idx` (`usuario_editor` ASC) VISIBLE,
  CONSTRAINT `FK_tablero_uc`
    FOREIGN KEY (`usuario_creador`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_tablero_ue`
    FOREIGN KEY (`usuario_editor`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admin_tablero`.`lista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`lista` (
  `id_lista` INT NOT NULL AUTO_INCREMENT,
  `nombre_lista` VARCHAR(20) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  `id_tablero` INT NOT NULL,
  PRIMARY KEY (`id_lista`),
  INDEX `FK_lista_uc_idx` (`usuario_creador` ASC) VISIBLE,
  INDEX `FK_lista_ue_idx` (`usuario_editor` ASC) VISIBLE,
  INDEX `FK_lista_tablero_idx` (`id_tablero` ASC) VISIBLE,
  CONSTRAINT `FK_lista_tablero`
    FOREIGN KEY (`id_tablero`)
    REFERENCES `admin_tablero`.`tablero` (`id_tablero`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_lista_uc`
    FOREIGN KEY (`usuario_creador`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_lista_ue`
    FOREIGN KEY (`usuario_editor`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admin_tablero`.`tarjeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`tarjeta` (
  `id_tarjeta` INT NOT NULL AUTO_INCREMENT,
  `nombre_tarjeta` VARCHAR(25) NOT NULL,
  `descripcion_tarjeta` VARCHAR(80) NULL DEFAULT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  `id_lista` INT NOT NULL,
  PRIMARY KEY (`id_tarjeta`),
  INDEX `FK_tarjeta_uc_idx` (`usuario_creador` ASC) VISIBLE,
  INDEX `FK_tarjeta_ue_idx` (`usuario_editor` ASC) VISIBLE,
  INDEX `FK_tarjeta_lista_idx` (`id_lista` ASC) VISIBLE,
  CONSTRAINT `FK_tarjeta_lista`
    FOREIGN KEY (`id_lista`)
    REFERENCES `admin_tablero`.`lista` (`id_lista`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_tarjeta_uc`
    FOREIGN KEY (`usuario_creador`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_tarjeta_ue`
    FOREIGN KEY (`usuario_editor`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admin_tablero`.`comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`comentario` (
  `id_comentario` INT NOT NULL AUTO_INCREMENT,
  `nombre_comentario` VARCHAR(25) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  `id_tarjeta` INT NOT NULL,
  PRIMARY KEY (`id_comentario`),
  INDEX `FK_comentario_uc_idx` (`usuario_creador` ASC) VISIBLE,
  INDEX `FK_comentario_ue_idx` (`usuario_editor` ASC) VISIBLE,
  INDEX `FK_comentario_tarjeta_idx` (`id_tarjeta` ASC) VISIBLE,
  CONSTRAINT `FK_comentario_tarjeta`
    FOREIGN KEY (`id_tarjeta`)
    REFERENCES `admin_tablero`.`tarjeta` (`id_tarjeta`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_comentario_uc`
    FOREIGN KEY (`usuario_creador`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_comentario_ue`
    FOREIGN KEY (`usuario_editor`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admin_tablero`.`privilegio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`privilegio` (
  `id_privilegio` INT NOT NULL AUTO_INCREMENT,
  `nombre_privilegio` VARCHAR(25) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_privilegio`),
  INDEX `FK_privilegio_uc_idx` (`usuario_creador` ASC) VISIBLE,
  INDEX `FK_privilegio_ue_idx` (`usuario_editor` ASC) VISIBLE,
  CONSTRAINT `FK_privilegio_uc`
    FOREIGN KEY (`usuario_creador`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_privilegio_ue`
    FOREIGN KEY (`usuario_editor`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admin_tablero`.`usuario_privilegio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`usuario_privilegio` (
  `id_usuario` INT NOT NULL,
  `id_privilegio` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_privilegio`),
  INDEX `FK_up_privilegio_idx` (`id_privilegio` ASC) VISIBLE,
  CONSTRAINT `FK_up_privilegio`
    FOREIGN KEY (`id_privilegio`)
    REFERENCES `admin_tablero`.`privilegio` (`id_privilegio`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_up_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admin_tablero`.`usuario_tablero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`usuario_tablero` (
  `id_usuario` INT NOT NULL,
  `id_tablero` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_tablero`),
  INDEX `FK_ut_tablero_idx` (`id_tablero` ASC) VISIBLE,
  CONSTRAINT `FK_ut_tablero`
    FOREIGN KEY (`id_tablero`)
    REFERENCES `admin_tablero`.`tablero` (`id_tablero`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_ut_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `admin_tablero`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `admin_tablero` ;

-- -----------------------------------------------------
-- procedure sp_comentario_delete
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_comentario_delete`(p_id_comentario int)
delete from admin_tablero.comentario
where
id_comentario = p_id_comentario$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_comentario_read
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_comentario_read`(p_id_comentario int)
select *
from admin_tablero.comentario
where
id_comentario = p_id_comentario$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_comentario_update
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_comentario_update`(p_id_comentario int, p_nombre_comentario varchar(25), p_usuario_editor int)
update admin_tablero.comentario
set
nombre_comentario = p_nombre_comentario,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_comentario = p_id_comentario$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_lista_delete
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_lista_delete`(p_id_lista int)
delete from admin_tablero.lista
where
id_lista = p_id_lista$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_lista_read
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_lista_read`(p_id_lista int)
select *
from admin_tablero.lista
where
id_lista = p_id_lista$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_lista_update
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_lista_update`(p_id_lista int, p_nombre_lista varchar(20), p_usuario_editor int)
update admin_tablero.lista
set
nombre_lista = p_nombre_lista,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_lista = p_id_lista$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_privilegio_delete
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_privilegio_delete`(p_id_privilegio int)
delete from admin_tablero.privilegio
where
id_privilegio = p_id_privilegio$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_privilegio_read
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_privilegio_read`(p_id_privilegio int)
select *
from admin_tablero.privilegio
where
id_privilegio = p_id_privilegio$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_privilegio_update
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_privilegio_update`(p_id_privilegio int, p_nombre_privilegio varchar(25), p_usuario_editor int)
update admin_tablero.privilegio
set
nombre_privilegio = p_nombre_privilegio,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_privilegio = p_id_privilegio$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_tablero_delete
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tablero_delete`(p_id_tablero int)
delete from admin_tablero.tablero
where
id_tablero = p_id_tablero$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_tablero_read
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tablero_read`(p_id_tablero int)
select *
from admin_tablero.tablero
where
id_tablero = p_id_tablero$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_tablero_update
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tablero_update`(p_id_tablero int, p_nombre_tablero varchar(45), p_usuario_editor int)
update admin_tablero.tablero
set
nombre_tablero = p_nombre_tablero,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_tablero = p_id_tablero$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_tarjeta_delete
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tarjeta_delete`(p_id_tarjeta int)
delete from admin_tablero.tarjeta
where
id_tarjeta = p_id_tarjeta$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_tarjeta_read
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tarjeta_read`(p_id_tarjeta int)
select *
from admin_tablero.tarjeta
where
id_tarjeta = p_id_tarjeta$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_tarjeta_update
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tarjeta_update`(p_id_tarjeta int, p_nombre_tarjeta varchar(25), p_descripcion_tarjeta varchar(80), p_usuario_editor int)
update admin_tablero.tarjeta
set
nombre_tarjeta = p_nombre_tarjeta,
descripcion_tarjeta = p_descripcion_tarjeta,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_tarjeta = p_id_tarjeta$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_usuario_create
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_create`(p_nombre_usuario varchar(20), p_correo_usuario varchar(40), p_password_usuario varchar(25), p_usuario_creador int)
insert into admin_tablero.usuario
(nombre_usuario, 
correo_usuario, 
password_usuario, 
fecha_creacion, 
usuario_creador)
Values
(p_nombre_usuario, 
p_correo_usuario, 
p_password_usuario,
curdate(),
p_usuario_creador)$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_usuario_delete
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_delete`(p_id_usuario int)
delete from admin_tablero.usuario
where
id_usuario = p_id_usuario$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_usuario_read
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_read`(p_id_usuario int)
select *
from admin_tablero.usuario
where
id_usuario = p_id_usuario$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_usuario_update
-- -----------------------------------------------------

DELIMITER $$
USE `admin_tablero`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_update`(p_id_usuario int, p_nombre_usuario varchar(20), p_correo_usuario varchar(40), p_password_usuario varchar(25), p_usuario_editor int)
update admin_tablero.usuario
set
nombre_usuario = p_nombre_usuario,
correo_usuario = p_correo_usuario,
password_usuario = p_password_usuario,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_usuario = p_id_usuario$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
