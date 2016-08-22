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
public class Observation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	public Long getObservationId() {
		return this.getId();
	}
	
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

	@Column(name = "notes", columnDefinition = "nvarchar(1000)")
	private String notes;
	
	@Column(name = "rating_summary_eval", columnDefinition = "nvarchar(250)")
	private String ratingSummary;
	
	@Column(name = "register_no_learners")
	private Integer registeredLearners;
	
	@Column(name = "session_context", columnDefinition = "nvarchar(250)")
	private String sessionContext;

	@Column(name = "start_no_learners")
	private Integer startLearners;
	
	@Column(name = "strengths_to_share", columnDefinition = "nvarchar(250)")
	private String strengthsShare;

	@Column(name = "total_no_learners")
	private Integer totalLearners;
	
	@Column(name = "additional_comments", columnDefinition = "nvarchar(250)")
	private String additionalComments;
	
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

	@Column(name = "observer_primary", columnDefinition = "nvarchar(50)")
	private String observerPrimaryId;
	@Transient
	private Staff observerPrimary;

	@Column(name = "observer_secondary", columnDefinition = "nvarchar(50)")
	private String observerSecondaryId;
	@Transient
	private Staff observerSecondary;

	@Column(name = "rating_reference_id", columnDefinition = "nvarchar(50)")
	private String ratingReferenceId;
	@Transient
	private RatingReference ratingReference;

	@Column(name = "staff_id", columnDefinition = "nvarchar(50)")
	private String staffId;
	@Transient
	private Staff staff;

	@Column(name = "learning_coach", columnDefinition = "nvarchar(50)")
	private String learningCoachId;
	@Transient
	private Staff learningCoach;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
	@JoinColumn(name = "observation_id")
	private List<StrengthImprovement> strengthImprovements;

	@Column(name = "line_manager", columnDefinition = "nvarchar(50)")
	private String lineManagerId;
	@Transient
	private Staff lineManager;

	@Column(name = "head_of_department", columnDefinition = "nvarchar(50)")
	private String hodId;
	@Transient
	private Staff HOD;
	
	public Observation(){
	}

	public void finalize() throws Throwable {
	}

}