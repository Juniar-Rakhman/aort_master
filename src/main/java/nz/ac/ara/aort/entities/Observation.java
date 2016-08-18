package nz.ac.ara.aort.entities;


import lombok.Data;
import nz.ac.ara.aort.entities.master.Staff;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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

	@OneToOne
	@JoinColumn(name="moderator")
	private Staff moderator;

	@OneToOne
	@JoinColumn(name="observer_primary")
	private Staff observerPrimary;

	@OneToOne
	@JoinColumn(name="observer_secondary")
	private Staff observerSecondary;

	@OneToOne
	@JoinColumn(name="rating_reference_id")
	private RatingReference ratingReference;

	@OneToOne
	@JoinColumn(name="staff_id")
	private Staff staff;

	@OneToOne
	@JoinColumn(name="learning_coach")
	private Staff learningCoach;

	@OneToMany(mappedBy="id")
	private List<StrengthImprovement> strengthImprovements;

	@OneToOne
	@JoinColumn(name="line_manager")
	private Staff lineManager;

	@OneToOne
	@JoinColumn(name="head_of_department")
	private Staff HOD;
	
	public Observation(){
	}

	public void finalize() throws Throwable {
	}

}