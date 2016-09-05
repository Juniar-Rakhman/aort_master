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

INSERT INTO academic_observation.dbo.staff (staff_id, department, email, first_name, is_employed, last_name, office_phone, total_fte, username) VALUES ('00180224','Department of Computing', 'Neo.Smith1@ara.ac.nz', 'Neo', 1, 'Smith1', '1984432418', 1.00, 'ben');
INSERT INTO academic_observation.dbo.staff (staff_id, department, email, first_name, is_employed, last_name, office_phone, total_fte, username) VALUES ('00180225','Learning Design Department', 'Morpheus.Smith2@ara.ac.nz', 'Morpheus', 1, 'Smith2', '467398155', 1.00, 'bob');
INSERT INTO academic_observation.dbo.staff (staff_id, department, email, first_name, is_employed, last_name, office_phone, total_fte, username) VALUES ('00180226','Human Resources Advisors', 'Trinity.Smith3@ara.ac.nz', 'Trinity', 1, 'Smith3', '1522353564', 0.80, 'qauser');
INSERT INTO academic_observation.dbo.staff (staff_id, department, email, first_name, is_employed, last_name, office_phone, total_fte, username) VALUES ('00180227','English Language - EAR', 'Admin.Smith4@ara.ac.nz', 'Smith', 1, 'Smith4', '1627028273', 1.00, 'admin');

-- academic_observation.dbo.user_role
INSERT INTO dbo.user_role VALUES(0, 1, 0, '00180224', 0);
INSERT INTO dbo.user_role VALUES(1, 0, 0, '00180225', 0);
INSERT INTO dbo.user_role VALUES(0, 0, 1, '00180226', 0);
INSERT INTO dbo.user_role VALUES(0, 0, 0, '00180227', 1);

-- academic_observation.dbo.rating_reference
INSERT INTO dbo.rating_reference (rating) VALUES ('Excellent Practice');
INSERT INTO dbo.rating_reference (rating) VALUES ('Good Practice');
INSERT INTO dbo.rating_reference (rating) VALUES ('Practice Needs Improvement');
INSERT INTO dbo.rating_reference (rating) VALUES ('Practice Requires Intervention and Support');

-- academic_observation.dbo.strength_improvement_reference
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Learning strategies cater for the needs of the learners');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Learning activities are varied and interesting');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Learning time is managed effectively');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Questioning techniques progress learning');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Evidence of learner achievement');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Learning environment is positive and respectful');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Instructions, explanations and expectations are clear');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Learning environment is well organised');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Variety of interactive and independent activity');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Good use of learning technologies');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Cultural competence informs practice', 'Relationships are respectful ');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Cultural competence informs practice', 'Teaching strategies are inclusive');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Effective planning drives learner achievement', 'Teaching and learning plan has a clear structure');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Effective planning drives learner achievement', 'Lesson flow, pace and level are appropriate');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Effective planning drives learner achievement', 'In-class and self-directed learning activities are evident');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Effective planning drives learner achievement', 'Activities make links to vocational/professional contexts');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learners are well supported', 'Scaffolding and motivational techniques support progress');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learners are well supported', 'Session relates to learning outcomes and to assessments');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learners are well supported', 'Learning technologies and literacy/numeracy/academic literacies are evident');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Feedback and assessment inform and improve student learning', 'In-class assessment and evaluation strategies are used to inform teaching');
INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Feedback and assessment inform and improve student learning', 'Constructive feedback is given to learners');
