-- -- academic_observation.dbo.position
-- INSERT INTO position (position_id, manager_position_id, title, fte) VALUES ('0000002166', '0000001919', 'Kaiarahi Assistant', 1.00);
-- INSERT INTO position (position_id, manager_position_id, title, fte) VALUES ('0000002169', '0000001799', 'Student Events Team Member A', 1.00);
-- INSERT INTO position (position_id, manager_position_id, title, fte) VALUES ('0000002134', '0000001919', 'Student Events Team Member B', 1.00);
-- INSERT INTO position (position_id, manager_position_id, title, fte) VALUES ('0000002456', '0000001799', 'Student Events Team Member C', 1.00);
-- INSERT INTO position (position_id, manager_position_id, title, fte) VALUES ('0000002123', '0000001919', 'Student Events Team Member D', 1.00);
-- 
-- -- academic_observation.dbo.staff
-- INSERT INTO staff (staff_id, first_name, last_name,is_employed, campus_location, total_fte, username, email, office_phone, department) VALUES ('00000065', 'Richard', 'Smith1', true, 'not here', 99, 'Smith1R', 'Richard.Smith1@ara.ac.nz', '1984432418', 'Department of Computing');
-- INSERT INTO staff (staff_id, first_name, last_name,is_employed, campus_location, total_fte, username, email, office_phone, department) VALUES ('00000201', 'Selena', 'Smith2', true, 'not here', 99, 'Smith2S', 'Selena.Smith2@ara.ac.nz', '467398155', 'Learning Design Department');
-- INSERT INTO staff (staff_id, first_name, last_name,is_employed, campus_location, total_fte, username, email, office_phone, department) VALUES ('00000202', 'Bejo', 'Smith2', true, 'not here', 99, 'Smith2S', 'Bejo.Smith2@ara.ac.nz', '467398155', 'Learning Design Department');
-- INSERT INTO staff (staff_id, first_name, last_name,is_employed, campus_location, total_fte, username, email, office_phone, department) VALUES ('00000203', 'Paijo', 'Smith2', true, 'not here', 99, 'Smith2S', 'Paijo.Smith2@ara.ac.nz', '467398155', 'Learning Design Department');
-- INSERT INTO staff (staff_id, first_name, last_name,is_employed, campus_location, total_fte, username, email, office_phone, department) VALUES ('00000242', 'test', 'Smith2', true, 'not here', 99, 'Smith2S', 'test.Smith2@ara.ac.nz', '467398155', 'Learning Design Department');
-- 
-- -- academic_observation.dbo.staff_position
-- INSERT INTO staff_position (staff_id, position_id) VALUES ('00000065', '0000002166');
-- INSERT INTO staff_position (staff_id, position_id) VALUES ('00000201', '0000002169');
-- INSERT INTO staff_position (staff_id, position_id) VALUES ('00000202', '0000002134');
-- INSERT INTO staff_position (staff_id, position_id) VALUES ('00000203', '0000002456');
-- INSERT INTO staff_position (staff_id, position_id) VALUES ('00000242', '0000002123');

-- academic_observation.dbo.rating_reference
INSERT INTO dbo.rating_reference (rating) VALUES ('A');
INSERT INTO dbo.rating_reference (rating) VALUES ('AB');
INSERT INTO dbo.rating_reference (rating) VALUES ('B');
INSERT INTO dbo.rating_reference (rating) VALUES ('BC');
INSERT INTO dbo.rating_reference (rating) VALUES ('C');
INSERT INTO dbo.rating_reference (rating) VALUES ('D');
INSERT INTO dbo.rating_reference (rating) VALUES ('E');

INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES ('Learner-centred teaching enables all learners to achieve', 'Learning strategies cater for the needs of the learners');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES ('Learning strategies cater for the needs of the learnersqewrqwrqwerqwer', 'Learning strategies cater for the needs of the learnersqewrqwe');
