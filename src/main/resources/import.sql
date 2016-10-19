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
-- 
-- INSERT INTO academic_observation.dbo.staff (staff_id, department, email, first_name, is_employed, last_name, office_phone, total_fte, username) VALUES ('00180224','Department of Computing', 'Neo.Smith1@ara.ac.nz', 'Neo', 1, 'Smith1', '1984432418', 1.00, 'ben');
-- INSERT INTO academic_observation.dbo.staff (staff_id, department, email, first_name, is_employed, last_name, office_phone, total_fte, username) VALUES ('00180225','Learning Design Department', 'Morpheus.Smith2@ara.ac.nz', 'Morpheus', 1, 'Smith2', '467398155', 1.00, 'bob');
-- INSERT INTO academic_observation.dbo.staff (staff_id, department, email, first_name, is_employed, last_name, office_phone, total_fte, username) VALUES ('00180226','Human Resources Advisors', 'Trinity.Smith3@ara.ac.nz', 'Trinity', 1, 'Smith3', '1522353564', 0.80, 'qauser');
-- INSERT INTO academic_observation.dbo.staff (staff_id, department, email, first_name, is_employed, last_name, office_phone, total_fte, username) VALUES ('00180227','English Language - EAR', 'Admin.Smith4@ara.ac.nz', 'Smith', 1, 'Smith4', '1627028273', 1.00, 'admin');
-- 
-- -- academic_observation.dbo.user_role
-- INSERT INTO dbo.user_role VALUES(0, 1, 0, '00180224', 0);
-- INSERT INTO dbo.user_role VALUES(1, 0, 0, '00180225', 0);
-- INSERT INTO dbo.user_role VALUES(0, 0, 1, '00180226', 0);
-- INSERT INTO dbo.user_role VALUES(0, 0, 0, '00180227', 1);
-- 
-- -- academic_observation.dbo.rating_reference
-- INSERT INTO dbo.rating_reference (rating) VALUES ('Excellent Practice');
-- INSERT INTO dbo.rating_reference (rating) VALUES ('Good Practice');
-- INSERT INTO dbo.rating_reference (rating) VALUES ('Practice Needs Improvement');
-- INSERT INTO dbo.rating_reference (rating) VALUES ('Practice Requires Intervention and Support');
-- 
-- -- academic_observation.dbo.strength_improvement_reference
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Learning strategies cater for the needs of the learners');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Learning activities are varied and interesting');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Learning time is managed effectively');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Questioning techniques progress learning');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learner-centred teaching enables all learners to achieve', 'Evidence of learner achievement');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Learning environment is positive and respectful');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Instructions, explanations and expectations are clear');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Learning environment is well organised');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Variety of interactive and independent activity');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learning environments ensure participation and engagement', 'Good use of learning technologies');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Cultural competence informs practice', 'Relationships are respectful ');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Cultural competence informs practice', 'Teaching strategies are inclusive');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Effective planning drives learner achievement', 'Teaching and learning plan has a clear structure');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Effective planning drives learner achievement', 'Lesson flow, pace and level are appropriate');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Effective planning drives learner achievement', 'In-class and self-directed learning activities are evident');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Effective planning drives learner achievement', 'Activities make links to vocational/professional contexts');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learners are well supported', 'Scaffolding and motivational techniques support progress');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learners are well supported', 'Session relates to learning outcomes and to assessments');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Learners are well supported', 'Learning technologies and literacy/numeracy/academic literacies are evident');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Feedback and assessment inform and improve student learning', 'In-class assessment and evaluation strategies are used to inform teaching');
-- INSERT INTO dbo.strength_improvement_reference (category, criteria) VALUES('Feedback and assessment inform and improve student learning', 'Constructive feedback is given to learners');

-- academic_observation.dbo.rating_reference
INSERT INTO dbo.rating_reference (is_active, rating) VALUES (1, 'Excellent Practice');
INSERT INTO dbo.rating_reference (is_active, rating) VALUES (1, 'Good Practice');
INSERT INTO dbo.rating_reference (is_active, rating) VALUES (1, 'Practice Needs Improvement');
INSERT INTO dbo.rating_reference (is_active, rating) VALUES (1, 'Practice Requires Intervention and Support');

-- academic_observation.dbo.strength_improvement_reference
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learner-centred teaching enables all learners to achieve', 'Learning strategies cater for the needs of the learners');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learner-centred teaching enables all learners to achieve', 'Learning activities are varied and interesting');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learner-centred teaching enables all learners to achieve', 'Learning time is managed effectively');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learner-centred teaching enables all learners to achieve', 'Questioning techniques progress learning');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learner-centred teaching enables all learners to achieve', 'Evidence of learner achievement');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learning environments ensure participation and engagement', 'Learning environment is positive and respectful');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learning environments ensure participation and engagement', 'Instructions, explanations and expectations are clear');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learning environments ensure participation and engagement', 'Learning environment is well organised');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learning environments ensure participation and engagement', 'Variety of interactive and independent activity');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learning environments ensure participation and engagement', 'Good use of learning technologies');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Cultural competence informs practice', 'Relationships are respectful ');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Cultural competence informs practice', 'Teaching strategies are inclusive');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Effective planning drives learner achievement', 'Teaching and learning plan has a clear structure');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Effective planning drives learner achievement', 'Lesson flow, pace and level are appropriate');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Effective planning drives learner achievement', 'In-class and self-directed learning activities are evident');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Effective planning drives learner achievement', 'Activities make links to vocational/professional contexts');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learners are well supported', 'Scaffolding and motivational techniques support progress');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learners are well supported', 'Session relates to learning outcomes and to assessments');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Learners are well supported', 'Learning technologies and literacy/numeracy/academic literacies are evident');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Feedback and assessment inform and improve student learning', 'In-class assessment and evaluation strategies are used to inform teaching');
INSERT INTO dbo.strength_improvement_reference (is_active, category, criteria) VALUES(1, 'Feedback and assessment inform and improve student learning', 'Constructive feedback is given to learners');

-- academic_observation.dbo.user_role
INSERT INTO dbo.user_role VALUES(0, 1, 0, '00180224', 0);
INSERT INTO dbo.user_role VALUES(1, 0, 0, '00180225', 0);
INSERT INTO dbo.user_role VALUES(0, 0, 1, '00180226', 0);
INSERT INTO dbo.user_role VALUES(0, 0, 0, '00180227', 1);

INSERT INTO dbo.observation VALUES ('wew', null, 1, null, 12, '12', null, null, '2016-08-23', null, '00001221', 15, '00001221', null, null, '00000332', '1', 1, null, null, null, '00001061', '12', '00001491', '00001221', '12', 12, '2', 'wew', 12, '12', null, '00000065', 12, '02:34:33.0000000', 12);
INSERT INTO dbo.observation VALUES ('wew', null, 0, null, 12, '12', null, null, '2016-08-23', null, '00001221', 15, '00001221', null, null, '00000332', '1', 1, null, null, null, '00001061', '12', '00001491', '00001221', '12', 12, '2', 'wew', 12, '12', null, '00000065', 12, '02:34:33.0000000', 12);
INSERT INTO dbo.observation VALUES ('wew', null, 0, null, 12, '12', null, null, '2016-08-23', null, '00001221', 15, '00001221', null, null, '00000332', '1', 1, null, null, null, '00001061', '12', '00001491', '00001221', '12', 12, '2', 'wew', 12, '12', null, '00000065', 12, '02:34:33.0000000', 12);

INSERT INTO dbo.report (created_date, description, name, path) VALUES ('2016-08-24', 'Observation Report', 'Observation', 'ObservationRecordsParent');
INSERT INTO dbo.report (created_date, description, name, path) VALUES ('2016-08-24', 'Team Observation Report', 'Team Observation', 'TeamObservation');
INSERT INTO dbo.report (created_date, description, name, path) VALUES ('2016-08-24', 'Observer Performance Report', 'Observer Performance', 'ObserverPerformanceParent');
INSERT INTO dbo.report (created_date, description, name, path) VALUES ('2016-08-24', 'Academic Staff Observation Overview', 'Academic Staff Observation Overview', 'AcademicStaffObsOverview');

INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value,path) VALUES (1,1,'Staff Name', 'Staff', '', 'StaffId');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value,path) VALUES (1,1,'Start Date', 'Date', '', 'StartDate');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value,path) VALUES (1,1,'End Date', 'Date', '', 'EndDate');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value,path) VALUES (2,1,'Staff Name', 'Staff', '', 'StaffId');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value,path) VALUES (2,1,'Department', 'Department', '', 'Department');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value,path) VALUES (3,1,'Staff Name', 'MultiStaff', '', 'Staff');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value,path) VALUES (3,1,'Start Date', 'Date', '', 'StartDate');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value,path) VALUES (3,1,'End Date', 'Date', '', 'EndDate');

INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Ashburton Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Bishopdale Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Brighton Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Online / Distance / Extramural  Delivery');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Hornby Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Madras Street Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Madras Outer');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Oamaru Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Rangiora Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Sullivan Ave Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Timaru Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Washdyke Farm Campus');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Wainoni');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Aoraki Trade Academy Delivery');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'SIT Trade Academy Delivery');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Avonmore Trade Academy Delivery');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'E Campus TANZ ');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Kaikoura HS Trade Academy Delivery');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Linwood College Trade Academy Delivery');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Aranui HS Trade Academy Delivery');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Ellesmere College Trade Academy Delivery');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Design and Arts College');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Mainland Driving');
INSERT INTO dbo.campus_reference (is_active, campus) VALUES (1, 'Christchurch Men''s Prison');

INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Business');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Computing');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Creative Industries');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Engineering and Architectural Studies');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Hospitality and Service Industries');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Humanities');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Nursing and Human Services');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Primary Industries');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Applied Science and Allied Health');
INSERT INTO dbo.department_reference (is_active, department) VALUES (1, 'Trades');

INSERT INTO dbo.session_reference(is_active, session) VALUES (1, 'Classroom');
INSERT INTO dbo.session_reference(is_active, session) VALUES (1, 'Practical – Kitchen');
INSERT INTO dbo.session_reference(is_active, session) VALUES (1, 'Practical – Restaurant');
INSERT INTO dbo.session_reference(is_active, session) VALUES (1, 'Practical – Trades Workshop');
INSERT INTO dbo.session_reference(is_active, session) VALUES (1, 'Practical Assessment');
INSERT INTO dbo.session_reference(is_active, session) VALUES (1, 'In-work session');

-- update dbo.staff set username = 'ben' where staff_id = '00000065';
-- update dbo.staff set username = 'bob' where staff_id = '00000216';
-- update dbo.staff set username = 'qauser' where staff_id = '00000332';
-- update dbo.staff set username = 'admin' where staff_id = '00000486';
