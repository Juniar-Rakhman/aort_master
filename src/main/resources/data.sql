-- academic_observation.dbo.position
INSERT INTO dbo.position (id, line_manager, title, fte) VALUES ('0000002166', '0000001919', 'Kaiarahi Assistant', 1.00);
INSERT INTO dbo.position (id, line_manager, title, fte) VALUES ('0000002169', '0000001799', 'Student Events Team Member', 1.00);

-- academic_observation.dbo.staff
INSERT INTO academic_observation.dbo.staff (id, first_name, last_name, username, email, office_phone, department) VALUES ('00000065', 'Richard', 'Smith1', 'Smith1R', 'Richard.Smith1@ara.ac.nz', '1984432418', 'Department of Computing');
INSERT INTO academic_observation.dbo.staff (id, first_name, last_name, username, email, office_phone, department) VALUES ('00000216', 'Selena', 'Smith2', 'Smith2S', 'Selena.Smith2@ara.ac.nz', '467398155', 'Learning Design Department');

-- academic_observation.dbo.staff_position
INSERT INTO academic_observation.dbo.staff_position (staff_id, position_id) VALUES ('00000065', '0000002166');
INSERT INTO academic_observation.dbo.staff_position (staff_id, position_id) VALUES ('00000216', '0000002169');
