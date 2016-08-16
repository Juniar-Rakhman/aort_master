package nz.ac.ara.aort.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
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
	
	@Id@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "late_no_learners")
	private Integer lateLearners;

	@Column(name = "campus_location", columnDefinition = "nvarchar(50)")
	private String location;
	
	@Column(name = "is_moderated")
	private Boolean moderated;
	
	@OneToOne
	@JoinColumn(name="moderator")
	private Staff moderator;
	
	@Column(name = "notes", columnDefinition = "nvarchar(MAX)")
	private String notes;
	
	@OneToOne
	@JoinColumn(name="observer_primary")
	private Staff observerPrimary;
	
	@OneToOne
	@JoinColumn(name="observer_secondary")
	private Staff observerSecondary;
	
	@Column(name = "programme", columnDefinition = "nvarchar(100)")
	private String programme;
	
	@Column(name = "programme_level")
	private Integer programmeLevel;
	
	@OneToOne
	@JoinColumn(name="rating_reference_id")
	private RatingReference ratingReference;
	
	@Column(name = "rating_summary_eval", columnDefinition = "nvarchar(250)")
	private String ratingSummary;
	
	@Column(name = "register_no_learners")
	private Integer registeredLearners;
	
	@Column(name = "session_context", columnDefinition = "nvarchar(250)")
	private String sessionContext;
	
	@OneToOne
	@JoinColumn(name="staff_id")
	private Staff staff;
	
	@Column(name = "start_no_learners")
	private Integer startLearners;
	
	@OneToMany(mappedBy="id")
	private List<StrengthImprovement> strengthImprovements;
	
	@Column(name = "strengths_to_share", columnDefinition = "nvarchar(250)")
	private String strengthsShare;
	
	@Column(name = "observation_time")
	private Date time;
	
	@Column(name = "total_no_learners")
	private Integer totalLearners;
	
	@Column(name = "additional_comments", columnDefinition = "nvarchar(250)")
	private String additionalComments;
	
	@Column(name = "course_level")
	private Integer courseLevel;
	
	@Column(name = "course_name", columnDefinition = "nvarchar(100)")
	private String courseName;
	
	@Column(name = "observation_date")
	private Date date;
	
	@Column(name = "department", columnDefinition = "nvarchar(50)")
	private String department;
	
	@OneToOne
	@JoinColumn(name="head_of_department")
	private Staff HOD;
	
	public Observation(){
	}

	public void finalize() throws Throwable {
	}

}