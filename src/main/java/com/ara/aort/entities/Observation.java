package com.ara.aort.entities;


import javax.persistence.*;
import java.sql.Time;
import java.sql.Date;

/**
 * Created by a9jr5626 on 8/11/16.
 */
@Entity
@Table(name = "observation")
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "observation_date")
    private Date date;

    @Column(name = "observation_time")
    private Time time;

    @OneToOne
    private Staff staff;

    @OneToOne
    private Staff primaryObserver;

    @OneToOne
    private Staff secondaryObserver;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_level")
    private Integer courseLevel;

    @Column(name = "programme")
    private String programme;

    @Column(name = "programme_level")
    private Integer programmeLevel;

    @Column(name = "register_no_learners")
    private Integer registeredLearners;

    @Column(name = "start_no_learners")
    private Integer startLearners;

    @Column(name = "late_no_learners")
    private Integer lateLearners;

    @Column(name = "total_no_learners")
    private Integer totalLearners;

    @Column(name = "location")
    private String location;

    @Column(name = "department")
    private String department;

    @Column(name = "session_context")
    private String sessionContext;

    @Column(name = "notes")
    private String notes;

    @OneToOne
    private ReferenceRating refRating;

    @Column(name = "rating_summary_eval")
    private String ratingSummary;

    @Column(name = "strengths_to_share")
    private String strengthsShare;

    @Column(name = "additional_comments")
    private String additionalComments;

    @Column(name = "is_moderated")
    private String isModerated;

    @OneToOne
    private Staff moderator;

    @OneToOne
    private Staff learningCoach;

    @OneToOne
    private Staff lineManager;

    @OneToOne
    private Staff HOD;

    //getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public Staff getPrimaryObserver() {
        return primaryObserver;
    }

    public void setPrimaryObserver(Staff primaryObserver) {
        this.primaryObserver = primaryObserver;
    }

    public Staff getSecondaryObserver() {
        return secondaryObserver;
    }

    public void setSecondaryObserver(Staff secondaryObserver) {
        this.secondaryObserver = secondaryObserver;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Integer getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(Integer courseLevel) {
        this.courseLevel = courseLevel;
    }

    public String getProgramme() {
        return programme;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

    public Integer getProgrammeLevel() {
        return programmeLevel;
    }

    public void setProgrammeLevel(Integer programmeLevel) {
        this.programmeLevel = programmeLevel;
    }

    public Integer getRegisteredLearners() {
        return registeredLearners;
    }

    public void setRegisteredLearners(Integer registeredLearners) {
        this.registeredLearners = registeredLearners;
    }

    public Integer getStartLearners() {
        return startLearners;
    }

    public void setStartLearners(Integer startLearners) {
        this.startLearners = startLearners;
    }

    public Integer getLateLearners() {
        return lateLearners;
    }

    public void setLateLearners(Integer lateLearners) {
        this.lateLearners = lateLearners;
    }

    public Integer getTotalLearners() {
        return totalLearners;
    }

    public void setTotalLearners(Integer totalLearners) {
        this.totalLearners = totalLearners;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSessionContext() {
        return sessionContext;
    }

    public void setSessionContext(String sessionContext) {
        this.sessionContext = sessionContext;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public ReferenceRating getRefRating() {
        return refRating;
    }

    public void setRefRating(ReferenceRating refRating) {
        this.refRating = refRating;
    }

    public String getRatingSummary() {
        return ratingSummary;
    }

    public void setRatingSummary(String ratingSummary) {
        this.ratingSummary = ratingSummary;
    }

    public String getStrengthsShare() {
        return strengthsShare;
    }

    public void setStrengthsShare(String strengthsShare) {
        this.strengthsShare = strengthsShare;
    }

    public String getAdditionalComments() {
        return additionalComments;
    }

    public void setAdditionalComments(String additionalComments) {
        this.additionalComments = additionalComments;
    }

    public String getIsModerated() {
        return isModerated;
    }

    public void setIsModerated(String isModerated) {
        this.isModerated = isModerated;
    }

    public Staff getModerator() {
        return moderator;
    }

    public void setModerator(Staff moderator) {
        this.moderator = moderator;
    }

    public Staff getLearningCoach() {
        return learningCoach;
    }

    public void setLearningCoach(Staff learningCoach) {
        this.learningCoach = learningCoach;
    }

    public Staff getLineManager() {
        return lineManager;
    }

    public void setLineManager(Staff lineManager) {
        this.lineManager = lineManager;
    }

    public Staff getHOD() {
        return HOD;
    }

    public void setHOD(Staff HOD) {
        this.HOD = HOD;
    }
}
