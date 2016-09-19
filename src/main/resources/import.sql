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

-- academic_observation.dbo.user_role
INSERT INTO dbo.user_role VALUES(0, 1, 0, '00000065', 0);
INSERT INTO dbo.user_role VALUES(1, 0, 0, '00000216', 0);
INSERT INTO dbo.user_role VALUES(0, 0, 1, '00000332', 0);
INSERT INTO dbo.user_role VALUES(0, 0, 0, '00000486', 1);

INSERT INTO dbo.observation VALUES ('testestsetst 1', 0, 'test aja 1', 1, 'test 1', 1, null, '2016-08-24', 'test 1', '00000065', 2, '00000065', null, null, '00000065', 'test 1', 1, '00000065', 'testsetstset1', '00000065', '00000065', 'estset1setse', 1, '2', 'te1stetsetse', 2, 'tests1et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 2', 0, 'test aja 2', 1, 'test 2', 1, null, '2016-08-25', 'test 2', '00000065', 2, '00000065', null, null, '00000065', 'test 2', 1, '00000065', 'testsetstset2', '00000065', '00000065', 'estset2setse', 1, '2', 'te2stetsetse', 2, 'tests2et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 3', 0, 'test aja 3', 1, 'test 3', 1, null, '2016-08-25', 'test 3', '00000065', 2, '00000065', null, null, '00000065', 'test 3', 1, '00000065', 'testsetstset3', '00000065', '00000065', 'estset3setse', 1, '2', 'te3stetsetse', 2, 'tests3et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 4', 0, 'test aja 4', 1, 'test 4', 1, null, '2016-08-25', 'test 4', '00000065', 2, '00000065', null, null, '00000065', 'test 4', 1, '00000065', 'testsetstset4', '00000065', '00000065', 'estset4setse', 1, '2', 'te4stetsetse', 2, 'tests4et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 5', 0, 'test aja 5', 1, 'test 5', 1, null, '2016-08-25', 'test 5', '00000065', 2, '00000065', null, null, '00000065', 'test 5', 1, '00000065', 'testsetstset5', '00000065', '00000065', 'estset5setse', 1, '2', 'te5stetsetse', 2, 'tests5et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 6', 0, 'test aja 6', 1, 'test 6', 1, null, '2016-08-25', 'test 6', '00000065', 2, '00000065', null, null, '00000065', 'test 6', 1, '00000065', 'testsetstset6', '00000065', '00000065', 'estset6setse', 1, '2', 'te6stetsetse', 2, 'tests6et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 7', 0, 'test aja 7', 1, 'test 7', 1, null, '2016-08-25', 'test 7', '00000065', 2, '00000065', null, null, '00000065', 'test 7', 1, '00000065', 'testsetstset7', '00000065', '00000065', 'estset7setse', 1, '2', 'te7stetsetse', 2, 'tests7et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 8', 0, 'test aja 8', 1, 'test 8', 1, null, '2016-08-25', 'test 8', '00000065', 2, '00000065', null, null, '00000065', 'test 8', 1, '00000065', 'testsetstset8', '00000065', '00000065', 'estset8setse', 1, '2', 'te8stetsetse', 2, 'tests8et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 9', 0, 'test aja 9', 1, 'test 9', 1, null, '2016-08-25', 'test 9', '00000065', 2, '00000065', null, null, '00000065', 'test 9', 1, '00000065', 'testsetstset9', '00000065', '00000065', 'estset9setse', 1, '2', 'te9stetsetse', 2, 'tests9et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 10', 0, 'test aja 10', 1, 'test 10', 1, null, '2016-08-25', 'test 10', '00000065', 2, '00000065', null, null, '00000065', 'test 10', 1, '00000065', 'testsetstset10', '00000065', '00000065', 'estset10setse', 1, '2', 'te10stetsetse', 2, 'tests10et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 11', 0, 'test aja 11', 1, 'test 11', 1, null, '2016-08-25', 'test 11', '00000065', 2, '00000065', null, null, '00000065', 'test 11', 1, '00000065', 'testsetstset11', '00000065', '00000065', 'estset11setse', 1, '2', 'te11stetsetse', 2, 'tests11et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 12', 0, 'test aja 12', 1, 'test 12', 1, null, '2016-08-25', 'test 12', '00000065', 2, '00000065', null, null, '00000065', 'test 12', 1, '00000065', 'testsetstset12', '00000065', '00000065', 'estset12setse', 1, '2', 'te12stetsetse', 2, 'tests12et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 13', 0, 'test aja 13', 1, 'test 13', 1, null, '2016-08-25', 'test 13', '00000065', 2, '00000065', null, null, '00000065', 'test 13', 1, '00000065', 'testsetstset13', '00000065', '00000065', 'estset13setse', 1, '2', 'te13stetsetse', 2, 'tests13et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 14', 0, 'test aja 14', 1, 'test 14', 1, null, '2016-08-25', 'test 14', '00000065', 2, '00000065', null, null, '00000065', 'test 14', 1, '00000065', 'testsetstset14', '00000065', '00000065', 'estset14setse', 1, '2', 'te14stetsetse', 2, 'tests14et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 15', 0, 'test aja 15', 1, 'test 15', 1, null, '2016-08-25', 'test 15', '00000065', 2, '00000065', null, null, '00000065', 'test 15', 1, '00000065', 'testsetstset15', '00000065', '00000065', 'estset15setse', 1, '2', 'te15stetsetse', 2, 'tests15et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 16', 0, 'test aja 16', 1, 'test 16', 1, null, '2016-08-25', 'test 16', '00000065', 2, '00000065', null, null, '00000065', 'test 16', 1, '00000065', 'testsetstset16', '00000065', '00000065', 'estset16setse', 1, '2', 'te16stetsetse', 2, 'tests16et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 17', 0, 'test aja 17', 1, 'test 17', 1, null, '2016-08-25', 'test 17', '00000065', 2, '00000065', null, null, '00000065', 'test 17', 1, '00000065', 'testsetstset17', '00000065', '00000065', 'estset17setse', 1, '2', 'te17stetsetse', 2, 'tests17et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 18', 0, 'test aja 18', 1, 'test 18', 1, null, '2016-08-25', 'test 18', '00000065', 2, '00000065', null, null, '00000065', 'test 18', 1, '00000065', 'testsetstset18', '00000065', '00000065', 'estset18setse', 1, '2', 'te18stetsetse', 2, 'tests18et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 19', 0, 'test aja 19', 1, 'test 19', 1, null, '2016-08-25', 'test 19', '00000065', 2, '00000065', null, null, '00000065', 'test 19', 1, '00000065', 'testsetstset19', '00000065', '00000065', 'estset19setse', 1, '2', 'te19stetsetse', 2, 'tests19et', '00000065', 1, '03:45:38.0000000', 1);
INSERT INTO dbo.observation VALUES ('testestsetst 20', 0, 'test aja 20', 1, 'test 20', 1, null, '2016-08-25', 'test 20', '00000065', 2, '00000065', null, null, '00000065', 'test 20', 1, '00000065', 'testsetstset20', '00000065', '00000065', 'estset20setse', 1, '2', 'te20stetsetse', 2, 'tests20et', '00000065', 1, '03:45:38.0000000', 1);

INSERT INTO dbo.report (created_date, description, name, path) VALUES ('2016-08-24', 'Observation Report', 'Observation', 'Observation');
INSERT INTO dbo.report (created_date, description, name, path) VALUES ('2016-08-24', 'Team Observation Report', 'Team Observation', 'TeamObservation');
INSERT INTO dbo.report (created_date, description, name, path) VALUES ('2016-08-24', 'Observer Performance Report', 'Observer Performance', 'ObservationPerformance');
INSERT INTO dbo.report (created_date, description, name, path) VALUES ('2016-08-24', 'Academic Staff Observation Overview', 'Academic Staff Observation Overview', 'AcademicStaffObsOverview');

INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value) VALUES (1,1,'Observation Id', 'Char', '3000-01-01');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value) VALUES (2,1,'Observation Id', 'Char', '3000-01-01');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value) VALUES (3,1,'Teachers Name', 'Staff', '00000065');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value) VALUES (3,1,'Start Date', 'Date', '2016-01-01');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value) VALUES (3,1,'End Date', 'Date', '3000-01-01');
INSERT INTO academic_observation.dbo.parameter (report_id,mandatory,name,type,value) VALUES (4,1,'Department', 'Char', 'test');

-- update dbo.staff set username = 'ben' where staff_id = '00000065';
-- update dbo.staff set username = 'bob' where staff_id = '00000216';
-- update dbo.staff set username = 'qauser' where staff_id = '00000332';
-- update dbo.staff set username = 'admin' where staff_id = '00000486';
