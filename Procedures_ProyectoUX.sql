CREATE PROCEDURE sp_comentario_delete (p_id_comentario int)
delete from admin_tablero.comentario
where
id_comentario = p_id_comentario

CREATE PROCEDURE sp_comentario_read (p_id_comentario int)
select *
from admin_tablero.comentario
where
id_comentario = p_id_comentario

CREATE PROCEDURE sp_comentario_update(p_id_comentario int, p_nombre_comentario varchar(25), p_usuario_editor int)
update admin_tablero.comentario
set
nombre_comentario = p_nombre_comentario,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_comentario = p_id_comentario

CREATE PROCEDURE sp_lista_delete (p_id_lista int)
delete from admin_tablero.lista
where
id_lista = p_id_lista

CREATE PROCEDURE sp_lista_read (p_id_lista int)
select *
from admin_tablero.lista
where
id_lista = p_id_lista

CREATE PROCEDURE sp_lista_update (p_id_lista int, p_nombre_lista varchar(20), p_usuario_editor int)
update admin_tablero.lista
set
nombre_lista = p_nombre_lista,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_lista = p_id_lista

CREATE PROCEDURE sp_privilegio_delete (p_id_privilegio int)
delete from admin_tablero.privilegio
where
id_privilegio = p_id_privilegio

CREATE PROCEDURE sp_privilegio_read (p_id_privilegio int)
select *
from admin_tablero.privilegio
where
id_privilegio = p_id_privilegio

CREATE PROCEDURE sp_privilegio_update (p_id_privilegio int, p_nombre_privilegio varchar(25), p_usuario_editor int)
update admin_tablero.privilegio
set
nombre_privilegio = p_nombre_privilegio,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_privilegio = p_id_privilegio

CREATE PROCEDURE sp_tablero_delete (p_id_tablero int)
delete from admin_tablero.tablero
where
id_tablero = p_id_tablero

CREATE PROCEDURE sp_tablero_read(p_id_tablero int)
select *
from admin_tablero.tablero
where
id_tablero = p_id_tablero

CREATE PROCEDURE sp_tablero_update (p_id_tablero int, p_nombre_tablero varchar(45), p_usuario_editor int)
update admin_tablero.tablero
set
nombre_tablero = p_nombre_tablero,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_tablero = p_id_tablero

CREATE PROCEDURE sp_tarjeta_delete (p_id_tarjeta int)
delete from admin_tablero.tarjeta
where
id_tarjeta = p_id_tarjeta

CREATE PROCEDURE sp_tarjeta_read(p_id_tarjeta int)
select *
from admin_tablero.tarjeta
where
id_tarjeta = p_id_tarjeta

CREATE PROCEDURE sp_tarjeta_update(p_id_tarjeta int, p_nombre_tarjeta varchar(25), p_descripcion_tarjeta varchar(80), p_usuario_editor int)
update admin_tablero.tarjeta
set
nombre_tarjeta = p_nombre_tarjeta,
descripcion_tarjeta = p_descripcion_tarjeta,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_tarjeta = p_id_tarjeta

CREATE PROCEDURE sp_usuario_create(p_nombre_usuario varchar(20), p_correo_usuario varchar(40), p_password_usuario varchar(25), p_usuario_creador int)
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
p_usuario_creador)

CREATE PROCEDURE sp_usuario_delete (p_id_usuario int)
delete from admin_tablero.usuario
where
id_usuario = p_id_usuario

CREATE PROCEDURE sp_usuario_read (p_id_usuario int)
select *
from admin_tablero.usuario
where
id_usuario = p_id_usuario

CREATE PROCEDURE sp_usuario_update (p_id_usuario int, p_nombre_usuario varchar(20), p_correo_usuario varchar(40), p_password_usuario varchar(25), p_usuario_editor int)
update admin_tablero.usuario
set
nombre_usuario = p_nombre_usuario,
correo_usuario = p_correo_usuario,
password_usuario = p_password_usuario,
fecha_edicion = curdate(),
usuario_editor = p_usuario_editor
where id_usuario = p_id_usuario

