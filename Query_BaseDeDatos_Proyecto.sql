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
-- Table `admin_tablero`.`comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`comentario` (
  `id_comentario` INT NOT NULL AUTO_INCREMENT,
  `nombre_comentario` VARCHAR(25) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_comentario`),
  INDEX `FK_comentario_uc_idx` (`usuario_creador` ASC) VISIBLE,
  INDEX `FK_comentario_ue_idx` (`usuario_editor` ASC) VISIBLE,
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
-- Table `admin_tablero`.`lista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`lista` (
  `id_lista` INT NOT NULL AUTO_INCREMENT,
  `nombre_lista` VARCHAR(20) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_lista`),
  INDEX `FK_lista_uc_idx` (`usuario_creador` ASC) VISIBLE,
  INDEX `FK_lista_ue_idx` (`usuario_editor` ASC) VISIBLE,
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
-- Table `admin_tablero`.`tablero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_tablero`.`tablero` (
  `id_project` INT NOT NULL AUTO_INCREMENT,
  `nombre_project` VARCHAR(45) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_edicion` DATETIME NULL DEFAULT NULL,
  `usuario_creador` INT NOT NULL,
  `usuario_editor` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_project`),
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
  PRIMARY KEY (`id_tarjeta`),
  INDEX `FK_tarjeta_uc_idx` (`usuario_creador` ASC) VISIBLE,
  INDEX `FK_tarjeta_ue_idx` (`usuario_editor` ASC) VISIBLE,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
