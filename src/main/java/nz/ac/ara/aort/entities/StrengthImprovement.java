package nz.ac.ara.aort.entities;


import lombok.Data;

import javax.persistence.*;

/**
 * Created by a9jr5626 on 8/11/16.
 * @author Sulthonyh
 * @version 1.0
 * @updated 12-Aug-2016 4:11:46 PM
 */
@Data
@Entity
@Table(name = "strength_improvement")
public class StrengthImprovement {

	@Column(name = "evidence")
	public String evidence;
	@Id@GeneratedValue(strategy = GenerationType.AUTO)
	public Long id;
	@Column(name = "improvement")
	public Boolean improvement;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="observation_id")
	public Observation observation;
	@Column(name = "strength")
	public Boolean strength;
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="strength_improvement_reference_id")
	public StrengthImprovementReference strImpRef;

	public StrengthImprovement(){

	}

	public void finalize() throws Throwable {

	}

}