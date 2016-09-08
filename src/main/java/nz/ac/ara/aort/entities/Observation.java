package nz.ac.ara.aort.entities;


import lombok.Data;
import nz.ac.ara.aort.entities.master.Staff;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.sql.Date;
import java.sql.Time;
import java.util.List;

/**
 * Created by a9jr5626 on 8/11/16.
 * @author Sulthonyh
 * @version 1.0
 * @created 12-Aug-2016 4:11:46 PM
 */
@Data
@Entity
@Table(name = "observation")
public class Observation implements Comparable<Observation> {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "observation_date")
	private Date date;

	@Column(name = "observation_time")
	private Time time;

	@Column(name = "late_no_learners")
	private Integer lateLearners;

	@Column(name = "campus_location", columnDefinition = "nvarchar(50)")
	private String location;
	
	@Column(name = "is_moderated")
	private Boolean moderated;

	@Column(name = "programme", columnDefinition = "nvarchar(100)")
	private String programme;
	
	@Column(name = "programme_level")
	private Integer programmeLevel;

	@Column(name = "notes", columnDefinition = "nvarchar(MAX)")
	private String notes;
	
	@Column(name = "rating_summary_eval", columnDefinition = "nvarchar(250)")
	private String ratingSummary;
	
	@Column(name = "register_no_learners")
	private Integer registeredLearners;
	
	@Column(name = "session_context", columnDefinition = "nvarchar(250)")
	private String sessionContext;

	@Column(name = "lesson_plan")
	private Boolean lessonPlan;
	
	@Column(name = "lesson_plan_comment", columnDefinition = "nvarchar(250)") 
	private String lessonPlanComment;
	
	@Column(name = "course_outline")
	private Boolean courseOutline;
	
	@Column(name = "course_outline_comment", columnDefinition = "nvarchar(250)")
	private String courseOutlineComment;

	@Column(name = "start_no_learners")
	private Integer startLearners;
	
	@Column(name = "total_no_learners")
	private Integer totalLearners;
	
	@Column(name = "additional_comments", columnDefinition = "nvarchar(250)")
	private String additionalComments;

	@Column(name = "course_code", columnDefinition = "nvarchar(20)")
	private String courseCode;

	@Column(name = "course_level")
	private Integer courseLevel;
	
	@Column(name = "course_name", columnDefinition = "nvarchar(100)")
	private String courseName;

	@Column(name = "department", columnDefinition = "nvarchar(50)")
	private String department;

	@Column(name = "moderator", columnDefinition = "nvarchar(50)")
	private String moderatorId;
	@Transient
	private Staff moderator;
	@Transient
	private String moderatorFirstName;
	@Transient
	private String moderatorLastName;

	@Column(name = "observer_primary", columnDefinition = "nvarchar(50)")
	private String observerPrimaryId;
	@Transient
	private Staff observerPrimary;
	@Transient
	private String observerPrimaryFirstName;
	@Transient
	private String observerPrimaryLastName;

	@Column(name = "observer_secondary", columnDefinition = "nvarchar(50)")
	private String observerSecondaryId;
	@Transient
	private Staff observerSecondary;
	@Transient
	private String observerSecondaryFirstName;
	@Transient
	private String observerSecondaryLastName;
	
	@Column(name = "rating_reference_id", columnDefinition = "nvarchar(50)")
	private String ratingReferenceId;
	@Transient
	private RatingReference ratingReference;

	@Column(name = "staff_id", columnDefinition = "nvarchar(50)")
	private String staffId;
	@Transient
	private Staff staff;
	@Transient
	private String staffFirstName;
	@Transient
	private String staffLastName;

	@Column(name = "learning_coach", columnDefinition = "nvarchar(50)")
	private String learningCoachId;
	@Transient
	private Staff learningCoach;
	@Transient
	private String learningCoachFirstName;
	@Transient
	private String learningCoachLastName;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "observation_id")
	private List<StrengthImprovement> strengthImprovements;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "observation_id")
	private List<ObservationRecommendation> observationRecommendations;

	@Column(name = "line_manager", columnDefinition = "nvarchar(50)")
	private String lineManagerId;
	@Transient
	private Staff lineManager;
	@Transient
	private String lineManagerFirstName;
	@Transient
	private String lineManagerLastName;

	@Column(name = "head_of_department", columnDefinition = "nvarchar(50)")
	private String hodId;
	@Transient
	private Staff HOD;
	@Transient
	private String hodFirstName;
	@Transient
	private String hodLastName;

	@Transient
	private String access;

	@Column(name = "completed")
	private Boolean completed;
	
	public Observation(){
	}

	public void finalize() throws Throwable {
	}

	@Override
	public int compareTo(Observation obs) {
		final int BEFORE = -1;
		final int EQUAL = 0;
		final int AFTER = 1;
		
//		
//		if (Objects.equals(this.getStaffName(), obs.getStaffName()))
//			return EQUAL;
//		else if (this )
//		
		return EQUAL;		
	}
}