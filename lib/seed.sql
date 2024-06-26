-- Ayúdame a corregir la consulta:
SELECT
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre AS nombre_rol,
  row_to_json(
    (
      SELECT
        pu
      FROM
        (
          SELECT
            pu.*
          FROM
            personas_x_usuarios pu
          WHERE
            p.id = pu.id_persona
        ) AS pu
    )
  ) AS usuario
FROM
  personas p
  JOIN especializacion_x_personas exp ON p.id = exp.id_persona
  JOIN especializaciones e ON exp.id_especializacion = e.id
  JOIN roles r ON e.id_rol = r.id
WHERE
  r.nombre = 'doctor'
  AND (
    p.nombre ILIKE '%%'
    OR p.apellido ILIKE '%%'
    OR p.dni ILIKE '%%'
  )
ORDER BY
  p.nombre ASC
OFFSET
  0
LIMIT
  6;


SELECT DISTINCT
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre AS nombre_rol,
  row_to_json(
    (
      SELECT
        pu
      FROM
        (
          SELECT
            pu.*
          FROM
            personas_x_usuarios pu
          WHERE
            p.id = pu.id_persona
        ) AS pu
    )
  ) AS usuario
FROM
  personas p
  JOIN especializacion_x_personas exp ON p.id = exp.id_persona
  JOIN especializaciones e ON exp.id_especializacion = e.id
  JOIN roles r ON e.id_rol = r.id
WHERE
  r.nombre = 'doctor'
  AND (
    p.nombre ILIKE '%%'
    OR p.apellido ILIKE '%%'
    OR p.dni ILIKE '%%'
  )
ORDER BY
  p.nombre ASC
OFFSET
  0
LIMIT
  6;


SELECT DISTINCT
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre AS nombre_rol,
  u.usuario
FROM
  personas p
  JOIN especializacion_x_personas exp ON p.id = exp.id_persona
  JOIN especializaciones e ON exp.id_especializacion = e.id
  JOIN roles r ON e.id_rol = r.id
  LEFT JOIN (
    SELECT
      id_persona,
      row_to_json(
        (
          SELECT
            pu
          FROM
            (
              SELECT
                pu.*
              FROM
                personas_x_usuarios pu
            ) AS pu
        )
      ) AS usuario
                        ) AS pu
                )
            ) AS usuario
        FROM
            personas_x_usuarios
    ) AS u ON p.id = u.id_persona
WHERE
    r.nombre = 'doctor'
    AND (
        p.nombre ILIKE '%%'
        OR p.apellido ILIKE '%%'
        OR p.dni ILIKE '%%'
    )
ORDER BY
    p.nombre ASC
OFFSET
    0
LIMIT
    6;


SELECT DISTINCT
    p.id,
    p.creado,
    p.nombre,
    p.apellido,
    p.fecha_nacimiento,
    p.dni,
    p.direccion,
    p.genero,
    p.telefono,
    p.correo,
    p.rol,
    r.nombre as nombre_rol
FROM
    personas p
    JOIN especializacion_x_personas exp ON p.id = exp.id_persona
    JOIN especializaciones e ON exp.id_especializacion = e.id
    JOIN roles r ON e.id_rol = r.id
    LEFT JOIN (
        SELECT
            id_persona,
            row_to_json(
                (
                    SELECT
                        pu
                    FROM
                        (
                            SELECT
                                pu.*
                            FROM
                                personas_x_usuarios pu
                        ) AS pu
                )
            ) AS usuario
        FROM
            personas_x_usuarios
    ) AS u ON p.id = u.id_persona
WHERE
    r.nombre = 'doctor'
    AND (
        p.nombre ILIKE '%%'
        OR p.apellido ILIKE '%%'
        OR p.dni ILIKE '%%'
    )
ORDER BY
    p.nombre ASC
OFFSET
    0
LIMIT
    6;





SELECT DISTINCT
    p.id,
    p.creado,
    p.nombre,
    p.apellido,
    p.fecha_nacimiento,
    p.dni,
    p.direccion,
    p.genero,
    p.telefono,
    p.correo,
    p.rol,
    r.nombre as nombre_rol
FROM
    personas p
    JOIN especializacion_x_personas exp ON p.id = exp.id_persona
    JOIN especializaciones e ON exp.id_especializacion = e.id
    JOIN roles r ON e.id_rol = r.id
    LEFT JOIN (
        SELECT
            id_persona,
            row_to_json(
                (
                    SELECT
                        pu
                    FROM
                        (
                            SELECT
                                pu.*
                            FROM
                                personas_x_usuarios pu
                        ) AS pu
                )
            ) AS usuario
        FROM
            personas_x_usuarios
    ) AS u ON p.id = u.id_persona
WHERE
    r.nombre = 'doctor'
    AND (
        p.nombre ILIKE '%%'
        OR p.apellido ILIKE '%%'
        OR p.dni ILIKE '%%'
    )
ORDER BY
    p.nombre ASC
OFFSET
    0
LIMIT
    6;



BEGIN
    RETURN QUERY
SELECT DISTINCT
    p.id,
    p.creado,
    p.nombre,
    p.apellido,
    p.fecha_nacimiento,
    p.dni,
    p.direccion,
    p.genero,
    p.telefono,
    p.correo,
    p.rol,
    r.nombre as nombre_rol
FROM
    personas p
    JOIN especializacion_x_personas exp ON p.id = exp.id_persona
    JOIN especializaciones e ON exp.id_especializacion = e.id
    JOIN roles r ON e.id_rol = r.id
    LEFT JOIN (
        SELECT
            id_persona,
            row_to_json(
                (
                    SELECT
                        pu
                    FROM
                        (
                            SELECT
                                pu.*
                            FROM
                                personas_x_usuarios pu
                        ) AS pu
                )
            ) AS usuario
        FROM
            personas_x_usuarios
    ) AS u ON p.id = u.id_persona
WHERE
        r.nombre = rol_param
        and (
            p.nombre ilike '%' || filtro_param || '%'
            or p.apellido ilike '%' || filtro_param || '%'
            or p.dni ilike '%' || filtro_param || '%'
        )
order by
  p.nombre asc
offset
  offset_param
limit
  limit_param;

END;




select distinct
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre as nombre_rol,
  u.usuario
from
  personas p
  join especializacion_x_personas exp on p.id = exp.id_persona
  join especializaciones e on exp.id_especializacion = e.id
  join roles r on e.id_rol = r.id
  left join (
    select
      id_persona,
      row_to_json(
        (
          select
            pu
          from
            (
              select
                pu.*
              from
                personas_x_usuarios pu
            ) as pu
        )
      ) as usuario
    from
      personas_x_usuarios
  ) as u on p.id = u.id_persona
where
  r.nombre = 'doctor'
  and (
    p.nombre ilike '%%'
    or p.apellido ilike '%%'
    or p.dni ilike '%%'
  )
order by
  p.nombre asc
offset
  0
limit
  6;




-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

select distinct
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre as nombre_rol,
  u.usuario ->> 'usuario' as usuario
from
  personas p
  join especializacion_x_personas exp on p.id = exp.id_persona
  join especializaciones e on exp.id_especializacion = e.id
  join roles r on e.id_rol = r.id
  left join (
    select
      id_persona,
      row_to_json(
        (
          select
            pu
          from
            (
              select
                pu.*
              from
                personas_x_usuarios pu
            ) as pu
        )
      ) as usuario
    from
      personas_x_usuarios
  ) as u on p.id = u.id_persona
where
  r.nombre = 'doctor'
  and (
    p.nombre ilike '%%'
    or p.apellido ilike '%%'
    or p.dni ilike '%%'
  )
order by
  p.nombre asc
offset
  0
limit
  6;





create
or replace function get_personas_by_rol_and_filter_pagination (
  rol_param text,
  filtro_param text,
  offset_param int,
  limit_param int
) returns table (
  id uuid,
  creado timestamp with time zone,
  nombre text,
  apellido text,
  fecha_nacimiento date,
  dni text,
  direccion text,
  genero text,
  telefono text,
  correo text,
  rol text,
  nombre_rol text,
  avatar_url text,
  estado text
) as $$
BEGIN
RETURN QUERY
select distinct
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre as nombre_rol,
  u.avatar_url,
  u.estado
from
  personas p
  join especializacion_x_personas exp on p.id = exp.id_persona
  join especializaciones e on exp.id_especializacion = e.id
  join roles r on e.id_rol = r.id
  left join (
    select
      id_persona,
      avatar_url,
      estado
    from
      personas_x_usuarios
  ) as u on p.id = u.id_persona
WHERE
  r.nombre = rol_param
  and (
    p.nombre ilike '%' || filtro_param || '%'
    or p.apellido ilike '%' || filtro_param || '%'
    or p.dni ilike '%' || filtro_param || '%'
  )
order by
  p.nombre asc
offset
  offset_param
limit
  limit_param;
END;
$$ language plpgsql;



create
or replace function get_personas_by_rol_and_filter_pagination (
    rol_param text,
    filtro_param text,
    offset_param int,
    limit_param int
) returns table (
    id uuid,
    creado timestamp with time zone,
    nombre text,
    apellido text,
    fecha_nacimiento date,
    dni text,
    direccion text,
    genero text,
    telefono text,
    correo text,
    rol text,
    nombre_rol text,
    avatar_url text,
    estado text
) as $$
BEGIN
RETURN QUERY
select distinct
    p.id,
    p.creado,
    p.nombre,
    p.apellido,
    p.fecha_nacimiento,
    p.dni,
    p.direccion,
    p.genero,
    p.telefono,
    p.correo,
    p.rol,
    r.nombre as nombre_rol,
    u.avatar_url as avatar_url,
    u.estado
from
    personas p
    join especializacion_x_personas exp on p.id = exp.id_persona
    join especializaciones e on exp.id_especializacion = e.id
    join roles r on e.id_rol = r.id
    left join (
        select
            id_persona,
            avatar_url,
            estado
        from
            personas_x_usuarios
    ) as u on p.id = u.id_persona
WHERE
    r.nombre = rol_param
    and (
        p.nombre ilike '%' || filtro_param || '%'
        or p.apellido ilike '%' || filtro_param || '%'
        or p.dni ilike '%' || filtro_param || '%'
    )
order by
    p.nombre asc
offset
    offset_param
limit
    limit_param;
END;
$$ language plpgsql;



select distinct
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre as nombre_rol,
  u.avatar_url as url_avatar,
  u.estado as estado_usuario
from
  personas p
  join especializacion_x_personas exp on p.id = exp.id_persona
  join especializaciones e on exp.id_especializacion = e.id
  join roles r on e.id_rol = r.id
  left join (
    select
      id_persona,
      avatar_url,
      estado
    from
      personas_x_usuarios
  ) as u on p.id = u.id_persona
WHERE
  r.nombre = 'paciente'
  and (
    p.nombre ilike '%%'
    or p.apellido ilike '%%'
    or p.dni ilike '%%'
  )
order by
  p.nombre asc
offset
  6
limit
  12




--get_personas_by_rol_and_filter_pagination
BEGIN
RETURN QUERY
select distinct
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre as nombre_rol,
  u.avatar_url as url_avatar,
  u.estado as estado_usuario
from
  personas p
  join especializacion_x_personas exp on p.id = exp.id_persona
  join especializaciones e on exp.id_especializacion = e.id
  join roles r on e.id_rol = r.id
  left join (
    select
      id_persona,
      avatar_url,
      estado
    from
      personas_x_usuarios
  ) as u on p.id = u.id_persona
WHERE
  r.nombre = rol_param
  and (
    p.nombre ilike '%' || filtro_param || '%'
    or p.apellido ilike '%' || filtro_param || '%'
    or p.dni ilike '%' || filtro_param || '%'
  )
order by
  p.nombre asc
offset
  offset_param
limit
  limit_param;
END;





BEGIN
RETURN QUERY
select distinct
  p.id,
  p.creado,
  p.nombre,
  p.apellido,
  p.fecha_nacimiento,
  p.dni,
  p.direccion,
  p.genero,
  p.telefono,
  p.correo,
  p.rol,
  r.nombre as nombre_rol,
  u.avatar_url as url_avatar,
  u.estado as estado_usuario
from
  personas p
  join especializacion_x_personas exp on p.id = exp.id_persona
  join especializaciones e on exp.id_especializacion = e.id
  join roles r on e.id_rol = r.id
  left join (
    select
      id_persona,
      avatar_url,
      estado
    from
      personas_x_usuarios
  ) as u on p.id = u.id_persona
WHERE
  r.nombre = rol_param
  and (
    p.nombre ilike '%' || filtro_param || '%'
    or p.apellido ilike '%' || filtro_param || '%'
    or p.dni ilike '%' || filtro_param || '%'
  )
order by
  p.nombre asc
offset
  offset_param
limit
  limit_param;
END;




create
or replace function get_personas_by_rol_and_filter_pagination (rol_param text, filtro_param text) returns bigint as $$
begin
return (
select count(*)
from personas p
join especializacion_x_personas exp on p.id = exp.id_persona
join especializaciones e on exp.id_especializacion = e.id
join roles r on e.id_rol = r.id
where r.nombre = 'doctor'
and (
p.nombre ilike '%%'
or p.apellido ilike '%%'
or p.dni ilike '%%'
)
);
end;
$$ language plpgsql;



begin return (
  select
    count(*)
  from
    personas p
    join especializacion_x_personas exp on p.id = exp.id_persona
    join especializaciones e on exp.id_especializacion = e.id
    join roles r on e.id_rol = r.id
  where
    r.nombre = 'doctor'
    and (
      p.nombre ilike '%%'
      or p.apellido ilike '%%'
      or p.dni ilike '%%'
    )
);

end;




BEGIN RETURN QUERY
select distinct
    p.id,
    p.creado,
    p.nombre,
    p.apellido,
    p.fecha_nacimiento,
    p.id_jornada as id_jornada,
    p.dni,
    p.direccion,
    p.genero,
    p.telefono,
    p.correo,
    p.rol,
    r.nombre as nombre_rol,
    u.avatar_url as url_avatar,
    u.estado as estado_usuario
from
    personas p
    join especializacion_x_personas exp on p.id = exp.id_persona
    join especializaciones e on exp.id_especializacion = e.id
    join roles r on e.id_rol = r.id
    left join (
        select
            id_persona,
            avatar_url,
            estado
        from
            personas_x_usuarios
    ) as u on p.id = u.id_persona
WHERE
    r.nombre = rol_param
    and (
        p.nombre ilike '%' || filtro_param || '%'
        or p.apellido ilike '%' || filtro_param || '%'
        or p.dni ilike '%' || filtro_param || '%'
    )
order by
    p.nombre asc
offset
    offset_param
limit
    limit_param;

END;




create
or replace function get_personas_by_rol_and_filter_pagination (
  rol_param text,
  filtro_param text,
  offset_param int,
  limit_param int
) returns table (
  id uuid,
  creado timestamp with time zone,
  nombre text,
  apellido text,
  fecha_nacimiento date,
  dni text,
  direccion text,
  genero text,
  telefono text,
  correo text,
  rol text,
  nombre_rol text,
  url_avatar text,
  estado_usuario text,
    id_jornada uuid
) as $$ BEGIN RETURN QUERY
select distinct
    p.id,
    p.creado,
    p.nombre,
    p.apellido,
    p.fecha_nacimiento,
    p.id_jornada,
    p.dni,
    p.direccion,
    p.genero,
    p.telefono,
    p.correo,
    p.rol,
    r.nombre as nombre_rol,
    u.avatar_url as url_avatar,
    u.estado as estado_usuario
from
    personas p
    join especializacion_x_personas exp on p.id = exp.id_persona
    join especializaciones e on exp.id_especializacion = e.id
    join roles r on e.id_rol = r.id
    left join (
        select
            id_persona,
            avatar_url,
            estado
        from
            personas_x_usuarios
    ) as u on p.id = u.id_persona
WHERE
    r.nombre = rol_param
    and (
        p.nombre ilike '%' || filtro_param || '%'
        or p.apellido ilike '%' || filtro_param || '%'
        or p.dni ilike '%' || filtro_param || '%'
    )
order by
    p.nombre asc
offset
    offset_param
limit
    limit_param;

END;
 $$ language plpgsql;



-- update_user_in_public_table_for_new_user
 BEGIN
    UPDATE personas_x_usuarios
    SET correo = NEW.email
    WHERE correo = OLD.email;

    RETURN NEW;
END;


-- update_correo_persona_trigger
CREATE TRIGGER update_correo_persona_trigger
AFTER UPDATE   ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.update_user_in_public_table_for_new_user();



BEGIN
  UPDATE public.personas_x_usuarios
  SET correo = NEW.email,
      pass_temp = NEW.raw_user_meta_data->>'passwordTemp',
      estado = 'pendiente'
  WHERE correo = old.email;
  RETURN NEW;
END;



CREATE TRIGGER update_correo_persona_trigger
AFTER UPDATE OF raw_user_meta_data, email ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.update_personas_x_user_email();



create
or replace function update_personas_x_user_email () returns trigger as $$
BEGIN
    UPDATE public.personas_x_usuarios
    SET correo = NEW.email,
        pass_temp = NEW.raw_user_meta_data->>'passwordTemp',
        estado = 'pendiente'
    WHERE id_usuario = NEW.id;
    RETURN NEW;
END;
$$ language plpgsql;


create or replace function update_personas_x_user_email () returns trigger as $$
BEGIN
    UPDATE public.personas_x_usuarios
    SET correo = NEW.email,
        pass_temp = NEW.raw_user_meta_data->>'passwordTemp',
        estado = 'pendiente'
    WHERE id_usuario = old.id;
    RETURN NEW;
END;
$$ language plpgsql;
